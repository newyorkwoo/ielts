/**
 * Pure Node.js PNG icon generator — no external dependencies.
 * Draws a book-style icon: navy bg, gold spine, cream pages with gold text lines.
 * Run: node scripts/gen-icons.mjs
 */
import { deflateSync } from 'zlib'
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))

// ── CRC32 ──────────────────────────────────────────────────────────────────
const crcTable = new Uint32Array(256)
for (let n = 0; n < 256; n++) {
  let c = n
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
  crcTable[n] = c
}
function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  return (crc ^ 0xFFFFFFFF) >>> 0
}

// ── PNG chunk helpers ──────────────────────────────────────────────────────
function chunk(type, data) {
  const tb = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4); lenBuf.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4); crcBuf.writeUInt32BE(crc32(Buffer.concat([tb, data])))
  return Buffer.concat([lenBuf, tb, data, crcBuf])
}

// ── Pixel drawing ──────────────────────────────────────────────────────────
function setRGB(px, i, r, g, b) { px[i] = r; px[i+1] = g; px[i+2] = b }

function drawIcon(size) {
  const px = new Uint8Array(size * size * 3)
  const s = size

  // Palette
  const NAVY  = [13,  15,  26]   // #0d0f1a
  const DEEP  = [18,  22,  40]   // slightly lighter navy (book bg)
  const GOLD  = [240, 192, 64]   // #f0c040
  const SPINE = [170, 130, 30]   // darker gold for spine
  const CREAM = [240, 232, 210]  // page color
  const LINE  = [200, 160, 50]   // text-line gold on cream

  // Book rect (centered, 60% of size)
  const pad  = Math.round(s * 0.18)
  const bx   = pad
  const by   = Math.round(s * 0.16)
  const bw   = s - pad * 2
  const bh   = s - by * 2
  const spW  = Math.round(bw * 0.22)   // spine width

  // Rounded-rect helper (radius in pixels)
  const rr = Math.round(s * 0.08)

  for (let y = 0; y < s; y++) {
    for (let x = 0; x < s; x++) {
      const i = (y * s + x) * 3

      // Default background
      setRGB(px, i, ...NAVY)

      // Is pixel inside the book rounded-rect?
      const rx = x - bx, ry = y - by
      if (rx < 0 || rx >= bw || ry < 0 || ry >= bh) continue

      // Rounded corners
      const cx = rx < rr ? rr : rx > bw - rr - 1 ? bw - rr - 1 : rx
      const cy = ry < rr ? rr : ry > bh - rr - 1 ? bh - rr - 1 : ry
      const dx = rx - cx, dy = ry - cy
      if (dx * dx + dy * dy > rr * rr) continue

      if (rx < spW) {
        // Spine
        setRGB(px, i, ...SPINE)
      } else {
        // Page background
        setRGB(px, i, ...CREAM)

        // Gold text lines (6 lines, evenly spaced, shorter last line)
        const lineCount = 6
        const lineH     = 1 + Math.round(s * 0.012)
        const totalLineArea = bh - rr * 2 - Math.round(s * 0.06)
        const spacing   = Math.round(totalLineArea / (lineCount + 1))
        const lineStart = by + rr + Math.round(s * 0.03)

        for (let l = 0; l < lineCount; l++) {
          const lineY = lineStart + spacing * (l + 1)
          if (y >= lineY && y < lineY + lineH) {
            const maxLen = l === lineCount - 1 ? 0.55 : 0.88
            const lineLeft  = bx + spW + Math.round(bw * 0.06)
            const lineRight = bx + spW + Math.round((bw - spW) * maxLen)
            if (x >= lineLeft && x < lineRight) {
              setRGB(px, i, ...LINE)
            }
          }
        }
      }
    }
  }
  return px
}

// ── Encode PNG ─────────────────────────────────────────────────────────────
function encodePNG(size, pixels) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(size, 0)
  ihdrData.writeUInt32BE(size, 4)
  ihdrData[8] = 8  // bit depth
  ihdrData[9] = 2  // color type: RGB

  const rows = []
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 3)
    row[0] = 0  // filter: None
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 3
      row[1 + x * 3]     = pixels[src]
      row[1 + x * 3 + 1] = pixels[src + 1]
      row[1 + x * 3 + 2] = pixels[src + 2]
    }
    rows.push(row)
  }

  const compressed = deflateSync(Buffer.concat(rows), { level: 9 })

  return Buffer.concat([sig, chunk('IHDR', ihdrData), chunk('IDAT', compressed), chunk('IEND', Buffer.alloc(0))])
}

// ── Generate ───────────────────────────────────────────────────────────────
const publicDir = join(__dir, '..', 'public')
mkdirSync(publicDir, { recursive: true })

for (const size of [192, 512]) {
  const pixels = drawIcon(size)
  const png    = encodePNG(size, pixels)
  const out    = join(publicDir, `icon-${size}.png`)
  writeFileSync(out, png)
  console.log(`✓ ${out}  (${png.length} bytes)`)
}
