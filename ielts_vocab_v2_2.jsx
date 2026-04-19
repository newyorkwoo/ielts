import React, { useState, useEffect, useRef, useCallback } from "react";

const UNITS = [
  { id:"P1L1", label:"P1-L1", zh:"L1 生命階段", part:"P1" },
  { id:"P1L2", label:"P1-L2", zh:"L2 家庭",     part:"P1" },
  { id:"P1L3", label:"P1-L3", zh:"L3 住所",     part:"P1" },
  { id:"P1L4", label:"P1-L4", zh:"L4 人際關係", part:"P1" },
  { id:"P1L5", label:"P1-L5", zh:"L5 角色",     part:"P1" },
  { id:"P1L6", label:"P1-L6", zh:"L6 個性",     part:"P1" },
  { id:"P1L7", label:"P1-L7", zh:"L7 第一印象", part:"P1" },
  { id:"P1L8", label:"P1-L8", zh:"L8 情緒",     part:"P1" },
  { id:"U02", label:"P2",  zh:"健康與運動" },
  { id:"U03", label:"P3",  zh:"學生與教育" },
  { id:"U04", label:"P4",  zh:"工作" },
  { id:"U05", label:"P5",  zh:"旅遊休閒娛樂" },
  { id:"U06", label:"P6",  zh:"文化與傳播" },
  { id:"U07", label:"P7",  zh:"藝術" },
  { id:"U08", label:"P8",  zh:"科學與科技" },
  { id:"U09", label:"P9",  zh:"政治與經濟" },
  { id:"U10", label:"P10", zh:"犯罪與法律" },
  { id:"U11", label:"P11", zh:"社會議題" },
  { id:"U12", label:"P12", zh:"自然與環境" },
  { id:"U13", label:"P13", zh:"未來發展" },
  { id:"U14", label:"P14", zh:"寫作詞彙" },
  { id:"U15", label:"延伸", zh:"延伸學習" },
];

const PARTS = [
  { id:"P1", label:"P1", zh:"人與成長環境",
    lessons:[
      { id:"P1L1", label:"Lesson 1", zh:"生命階段" },
      { id:"P1L2", label:"Lesson 2", zh:"家庭" },
      { id:"P1L3", label:"Lesson 3", zh:"住所" },
      { id:"P1L4", label:"Lesson 4", zh:"人際關係" },
      { id:"P1L5", label:"Lesson 5", zh:"角色" },
      { id:"P1L6", label:"Lesson 6", zh:"個性" },
      { id:"P1L7", label:"Lesson 7", zh:"第一印象" },
      { id:"P1L8", label:"Lesson 8", zh:"情緒" },
    ]
  },
  { id:"P2", label:"P2", zh:"健康與運動",
    lessons:[
      { id:"P2L1",  label:"Lesson 1",  zh:"身體系統" },
      { id:"P2L2",  label:"Lesson 2",  zh:"預防" },
      { id:"P2L3",  label:"Lesson 3",  zh:"疾病" },
      { id:"P2L4",  label:"Lesson 4",  zh:"慢性病" },
      { id:"P2L5",  label:"Lesson 5",  zh:"常見疾病" },
      { id:"P2L6",  label:"Lesson 6",  zh:"治療方法" },
      { id:"P2L7",  label:"Lesson 7",  zh:"運動" },
      { id:"P2L8",  label:"Lesson 8",  zh:"運動場地" },
      { id:"P2L9",  label:"Lesson 9",  zh:"極限運動" },
      { id:"P2L10", label:"Lesson 10", zh:"運動比賽" },
    ]
  },
  { id:"P3", label:"P3", zh:"學生與教育",
    lessons:[
      { id:"P3L1", label:"Lesson 1", zh:"教育體制" },
      { id:"P3L2", label:"Lesson 2", zh:"學費" },
      { id:"P3L3", label:"Lesson 3", zh:"科目" },
      { id:"P3L4", label:"Lesson 4", zh:"授課" },
      { id:"P3L5", label:"Lesson 5", zh:"評量" },
      { id:"P3L6", label:"Lesson 6", zh:"學習教材" },
      { id:"P3L7", label:"Lesson 7", zh:"學習方式" },
      { id:"P3L8", label:"Lesson 8", zh:"學位" },
    ]
  },
  { id:"P4", label:"P4", zh:"工作",
    lessons:[
      { id:"P4L1", label:"Lesson 1", zh:"行業" },
      { id:"P4L2", label:"Lesson 2", zh:"就業" },
      { id:"P4L3", label:"Lesson 3", zh:"人力資源" },
      { id:"P4L4", label:"Lesson 4", zh:"工會" },
      { id:"P4L5", label:"Lesson 5", zh:"條件" },
      { id:"P4L6", label:"Lesson 6", zh:"職業道德" },
      { id:"P4L7", label:"Lesson 7", zh:"動機" },
      { id:"P4L8", label:"Lesson 8", zh:"會議" },
    ]
  },
  { id:"P5", label:"P5", zh:"旅遊休閒娛樂",
    lessons:[
      { id:"P5L1",  label:"Lesson 1",  zh:"旅遊" },
      { id:"P5L2",  label:"Lesson 2",  zh:"觀光" },
      { id:"P5L3",  label:"Lesson 3",  zh:"花費" },
      { id:"P5L4",  label:"Lesson 4",  zh:"住宿" },
      { id:"P5L5",  label:"Lesson 5",  zh:"交通" },
      { id:"P5L6",  label:"Lesson 6",  zh:"風景" },
      { id:"P5L7",  label:"Lesson 7",  zh:"飲食" },
      { id:"P5L8",  label:"Lesson 8",  zh:"遊戲" },
      { id:"P5L9",  label:"Lesson 9",  zh:"興趣" },
      { id:"P5L10", label:"Lesson 10", zh:"習慣" },
    ]
  },
  { id:"P6", label:"P6", zh:"文化與傳播",
    lessons:[
      { id:"P6L1", label:"Lesson 1", zh:"宗教" },
      { id:"P6L2", label:"Lesson 2", zh:"節日" },
      { id:"P6L3", label:"Lesson 3", zh:"歷史" },
      { id:"P6L4", label:"Lesson 4", zh:"風俗" },
      { id:"P6L5", label:"Lesson 5", zh:"新聞" },
      { id:"P6L6", label:"Lesson 6", zh:"廣告" },
      { id:"P6L7", label:"Lesson 7", zh:"傳播方式" },
      { id:"P6L8", label:"Lesson 8", zh:"語言" },
    ]
  },
  { id:"P7", label:"P7", zh:"藝術",
    lessons:[
      { id:"P7L1", label:"Lesson 1", zh:"藝術史" },
      { id:"P7L2", label:"Lesson 2", zh:"藝術工作者" },
      { id:"P7L3", label:"Lesson 3", zh:"表演藝術" },
      { id:"P7L4", label:"Lesson 4", zh:"書法" },
      { id:"P7L5", label:"Lesson 5", zh:"文學" },
      { id:"P7L6", label:"Lesson 6", zh:"繪畫" },
      { id:"P7L7", label:"Lesson 7", zh:"電影" },
      { id:"P7L8", label:"Lesson 8", zh:"建築" },
    ]
  },
  { id:"P8", label:"P8", zh:"科學與科技",
    lessons:[
      { id:"P8L1", label:"Lesson 1", zh:"學科" },
      { id:"P8L2", label:"Lesson 2", zh:"科學家" },
      { id:"P8L3", label:"Lesson 3", zh:"研究" },
      { id:"P8L4", label:"Lesson 4", zh:"實驗" },
      { id:"P8L5", label:"Lesson 5", zh:"單位" },
      { id:"P8L6", label:"Lesson 6", zh:"影響" },
      { id:"P8L7", label:"Lesson 7", zh:"衝擊" },
      { id:"P8L8", label:"Lesson 8", zh:"設備" },
    ]
  },
  { id:"P9", label:"P9", zh:"政治與經濟",
    lessons:[
      { id:"P9L1", label:"Lesson 1", zh:"政治" },
      { id:"P9L2", label:"Lesson 2", zh:"政體" },
      { id:"P9L3", label:"Lesson 3", zh:"選舉" },
      { id:"P9L4", label:"Lesson 4", zh:"外交" },
      { id:"P9L5", label:"Lesson 5", zh:"援助" },
      { id:"P9L6", label:"Lesson 6", zh:"經濟" },
      { id:"P9L7", label:"Lesson 7", zh:"消費" },
      { id:"P9L8", label:"Lesson 8", zh:"稅" },
    ]
  },
  { id:"P10", label:"P10", zh:"犯罪與法律",
    lessons:[
      { id:"P10L1", label:"Lesson 1", zh:"逮捕與監禁" },
      { id:"P10L2", label:"Lesson 2", zh:"犯罪類型" },
      { id:"P10L3", label:"Lesson 3", zh:"嚴重犯罪" },
      { id:"P10L4", label:"Lesson 4", zh:"法律與合法性" },
      { id:"P10L5", label:"Lesson 5", zh:"法律體系" },
      { id:"P10L6", label:"Lesson 6", zh:"審判與訴訟" },
      { id:"P10L7", label:"Lesson 7", zh:"判決與懲罰" },
      { id:"P10L8", label:"Lesson 8", zh:"賠償與補償" },
    ]
  },
  { id:"P11", label:"P11", zh:"社會議題",
    lessons:[
      { id:"P11L1", label:"Lesson 1", zh:"失業" },
      { id:"P11L2", label:"Lesson 2", zh:"貧窮" },
      { id:"P11L3", label:"Lesson 3", zh:"老化" },
      { id:"P11L4", label:"Lesson 4", zh:"無家可歸" },
      { id:"P11L5", label:"Lesson 5", zh:"毒品" },
      { id:"P11L6", label:"Lesson 6", zh:"福利" },
      { id:"P11L7", label:"Lesson 7", zh:"霸凌" },
      { id:"P11L8", label:"Lesson 8", zh:"種族" },
    ]
  },
  { id:"P12", label:"P12", zh:"自然與環境",
    lessons:[
      { id:"P12L1", label:"Lesson 1", zh:"地球" },
      { id:"P12L2", label:"Lesson 2", zh:"太空" },
      { id:"P12L3", label:"Lesson 3", zh:"地理環境" },
      { id:"P12L4", label:"Lesson 4", zh:"自然災害" },
      { id:"P12L5", label:"Lesson 5", zh:"氣候變遷" },
      { id:"P12L6", label:"Lesson 6", zh:"動物" },
      { id:"P12L7", label:"Lesson 7", zh:"回收" },
      { id:"P12L8", label:"Lesson 8", zh:"天氣" },
      { id:"P12L9", label:"Lesson 9", zh:"能源" },
      { id:"P12L10", label:"Lesson 10", zh:"保育" },
    ]
  },
  { id:"P13", label:"P13", zh:"未來發展",
    lessons:[
      { id:"P13L1", label:"Lesson 1", zh:"都市化" },
      { id:"P13L2", label:"Lesson 2", zh:"人口" },
      { id:"P13L3", label:"Lesson 3", zh:"科技" },
      { id:"P13L4", label:"Lesson 4", zh:"醫學" },
      { id:"P13L5", label:"Lesson 5", zh:"媒體" },
      { id:"P13L6", label:"Lesson 6", zh:"工作" },
      { id:"P13L7", label:"Lesson 7", zh:"交通" },
      { id:"P13L8", label:"Lesson 8", zh:"農業" },
    ]
  },
  { id:"P14", label:"P14", zh:"寫作詞彙",
    lessons:[
      { id:"P14L1", label:"Lesson 1", zh:"圖表格式" },
      { id:"P14L2", label:"Lesson 2", zh:"趨勢動詞" },
      { id:"P14L3", label:"Lesson 3", zh:"變化與比較" },
      { id:"P14L4", label:"Lesson 4", zh:"比例與變化" },
      { id:"P14L5", label:"Lesson 5", zh:"副詞" },
      { id:"P14L6", label:"Lesson 6", zh:"形容詞" },
      { id:"P14L7", label:"Lesson 7", zh:"開頭與確定" },
      { id:"P14L8", label:"Lesson 8", zh:"論點與觀點" },
      { id:"P14L9", label:"Lesson 9", zh:"同意反對舉例" },
      { id:"P14L10", label:"Lesson 10", zh:"連接與總結" },
    ]
  },
  { id:"EXT", label:"延伸", zh:"延伸學習",
    lessons:[
      { id:"EXTL1", label:"Lesson 1", zh:"人與成長環境" },
      { id:"EXTL2", label:"Lesson 2", zh:"學生與教育" },
      { id:"EXTL3", label:"Lesson 3", zh:"工作" },
      { id:"EXTL4", label:"Lesson 4", zh:"旅遊休閒娛樂" },
      { id:"EXTL5", label:"Lesson 5", zh:"藝術" },
      { id:"EXTL6", label:"Lesson 6", zh:"科學與科技" },
      { id:"EXTL7", label:"Lesson 7", zh:"政治與經濟" },
      { id:"EXTL8", label:"Lesson 8", zh:"社會議題" },
      { id:"EXTL9", label:"Lesson 9", zh:"自然與環境議題" },
    ]
  },
];

const UNIT_PART = {
  P1L1:"P1",P1L2:"P1",P1L3:"P1",P1L4:"P1",P1L5:"P1",P1L6:"P1",P1L7:"P1",P1L8:"P1",
  P2L1:"P2",P2L2:"P2",P2L3:"P2",P2L4:"P2",P2L5:"P2",P2L6:"P2",P2L7:"P2",P2L8:"P2",P2L9:"P2",P2L10:"P2",
  P3L1:"P3",P3L2:"P3",P3L3:"P3",P3L4:"P3",P3L5:"P3",P3L6:"P3",P3L7:"P3",P3L8:"P3",
  P4L1:"P4",P4L2:"P4",P4L3:"P4",P4L4:"P4",P4L5:"P4",P4L6:"P4",P4L7:"P4",P4L8:"P4",
  P6L1:"P6",P6L2:"P6",P6L3:"P6",P6L4:"P6",P6L5:"P6",P6L6:"P6",P6L7:"P6",P6L8:"P6",
  P7L1:"P7",P7L2:"P7",P7L3:"P7",P7L4:"P7",P7L5:"P7",P7L6:"P7",P7L7:"P7",P7L8:"P7",
  P8L1:"P8",P8L2:"P8",P8L3:"P8",P8L4:"P8",P8L5:"P8",P8L6:"P8",P8L7:"P8",P8L8:"P8",
  P9L1:"P9",P9L2:"P9",P9L3:"P9",P9L4:"P9",P9L5:"P9",P9L6:"P9",P9L7:"P9",P9L8:"P9",
  P5L1:"P5",P5L2:"P5",P5L3:"P5",P5L4:"P5",P5L5:"P5",P5L6:"P5",P5L7:"P5",P5L8:"P5",P5L9:"P5",P5L10:"P5",
  P10L1:"P10",P10L2:"P10",P10L3:"P10",P10L4:"P10",P10L5:"P10",P10L6:"P10",P10L7:"P10",P10L8:"P10",
  P11L1:"P11",P11L2:"P11",P11L3:"P11",P11L4:"P11",P11L5:"P11",P11L6:"P11",P11L7:"P11",P11L8:"P11",
  P12L1:"P12",P12L2:"P12",P12L3:"P12",P12L4:"P12",P12L5:"P12",P12L6:"P12",P12L7:"P12",P12L8:"P12",P12L9:"P12",P12L10:"P12",
  P13L1:"P13",P13L2:"P13",P13L3:"P13",P13L4:"P13",P13L5:"P13",P13L6:"P13",P13L7:"P13",P13L8:"P13",
  P14L1:"P14",P14L2:"P14",P14L3:"P14",P14L4:"P14",P14L5:"P14",P14L6:"P14",P14L7:"P14",P14L8:"P14",P14L9:"P14",P14L10:"P14",
  EXTL1:"EXT",EXTL2:"EXT",EXTL3:"EXT",EXTL4:"EXT",EXTL5:"EXT",EXTL6:"EXT",EXTL7:"EXT",EXTL8:"EXT",EXTL9:"EXT",
};

const WORDS = [
  // U01 P1 Lesson 1: Life Stages 生命階段
  {id:101,word:"accommodate",ph:"/əˈkɒmədeit/",pos:"v.",en:"to adapt to or satisfy the needs of someone",zh:"迎合；配合",ex:"Parents always try their best to accommodate the desires of their progeny.",exZh:"父母總是盡他們最大努力迎合他們子女的願望。",diff:3,unit:"P1L1"},
  {id:102,word:"bring up",ph:"/brɪŋ ʌp/",pos:"v.",en:"to raise and care for a child",zh:"撫養；養育",ex:"Single parents often struggle to bring up their offspring on their own.",exZh:"單親父母常常獨自艱力地撫養他們的子女。",diff:2,unit:"P1L1"},
  {id:103,word:"imitate",ph:"/ˈɪmɪteɪt/",pos:"v.",en:"to copy the behaviour or actions of someone",zh:"模仿；仿效",ex:"It is a well-known fact that children imitate the behaviour of their parents.",exZh:"眾所皆知，小孩模仿他們父母的行為。",diff:2,unit:"P1L1"},
  {id:104,word:"nurture",ph:"/ˈnɜːrtʃər/",pos:"v.",en:"to care for and encourage the development of someone",zh:"養育；培育",ex:"A parent's duty is to nurture children in a safe environment.",exZh:"父母的職責是在安全的環境中養育孩子。",diff:3,unit:"P1L1"},
  {id:105,word:"stable",ph:"/ˈsteɪbl/",pos:"adj.",en:"not likely to change or fail; firmly established",zh:"穩定的",ex:"Young children deserve a stable family environment in order to develop well.",exZh:"幼兒應該擁有一個穩定的家庭環境以健全發展。",diff:2,unit:"P1L1"},
  {id:106,word:"accountable",ph:"/əˈkaʊntəbl/",pos:"adj.",en:"responsible for one's actions and expected to explain them",zh:"有責任的；負責的",ex:"Parents should hold children accountable for their actions.",exZh:"父母應該要求孩子對自己行為負責，以幫助他們為自己的行為承擔責任。",diff:3,unit:"P1L1"},
  {id:107,word:"influential",ph:"/ˌɪnfluˈenʃəl/",pos:"adj.",en:"having a strong effect on someone or something",zh:"有影響的；有影響力的",ex:"Parents and teachers are perhaps the most influential figures in a child's life.",exZh:"父母和老師可能是孩子一生中最具有影響力的人物。",diff:3,unit:"P1L1"},
  {id:108,word:"rewarding",ph:"/rɪˈwɔːdɪŋ/",pos:"adj.",en:"providing satisfaction or benefit; worth the effort",zh:"有回報的；值得的",ex:"Raising children can be as challenging as it is rewarding.",exZh:"撫養小孩可以是兼具挑戰性與回報性的。",diff:3,unit:"P1L1"},
  {id:109,word:"childhood",ph:"/ˈtʃaɪldhʊd/",pos:"n.",en:"the period of life when one is a child",zh:"童年；童年時期",ex:"Childhood should be a time of play and happy memories.",exZh:"童年應該是玩耍與快樂回憶的時期，而非學業與考試的時期。",diff:2,unit:"P1L1"},
  {id:110,word:"adolescence",ph:"/ˌædəˈlesns/",pos:"n.",en:"the period of development between childhood and adulthood",zh:"青春期；青少年時期",ex:"Most children become more egocentric during adolescence.",exZh:"除了身體上的成熟，大多數孩子在青春期變得更加自我中心。",diff:3,unit:"P1L1"},
  {id:111,word:"adulthood",ph:"/əˈdʌlthʊd/",pos:"n.",en:"the state or period of being fully grown and mature",zh:"成年；成年期",ex:"Allowing children to play when young encourages better emotional development in adulthood.",exZh:"允許孩子在年幼時玩耍會促進成年時有更好的情感發展。",diff:3,unit:"P1L1"},
  {id:112,word:"elder",ph:"/ˈeldər/",pos:"n.",en:"an older person, especially one with respect or authority",zh:"年長者；長輩",ex:"Elders often prefer the peace and quiet of the countryside.",exZh:"老年人往往喜歡鄉村的祥和與寧靜，而非城市的喧囂。",diff:2,unit:"P1L1"},
  // U01 P1 Lesson 2: Family 家庭
  {id:113,word:"raise",ph:"/reɪz/",pos:"v.",en:"to bring up a child; to care for until grown",zh:"撫養；養育",ex:"Many new parents struggle when raising their young for the first time.",exZh:"許多新手父母初次撫養他們的小孩時都很費力。",diff:2,unit:"P1L2"},
  {id:114,word:"adhere",ph:"/ədˈhɪər/",pos:"v.",en:"to stick firmly to a belief, rule or value",zh:"堅持；遵守",ex:"It's important for society to adhere to family values like being trustworthy and responsible.",exZh:"對社會而言，堅持家庭價值非常重要，如可信任的與負責的。",diff:3,unit:"P1L2"},
  {id:115,word:"adopt",ph:"/əˈdɒpt/",pos:"v.",en:"to take on or accept ideas, values, or a child legally",zh:"採用；收養",ex:"Many children adopt the thought patterns and values of their parents.",exZh:"許多孩子採用他們父母的思維模式與價值觀。",diff:2,unit:"P1L2"},
  {id:116,word:"spoil",ph:"/spɔɪl/",pos:"v.",en:"to harm the character of a child by being too indulgent",zh:"寵壞；溺愛",ex:"Parents may spoil children to make up for not spending enough time with them.",exZh:"父母可能會寵壞孩子以彌補沒有花足夠的時間陪他們。",diff:2,unit:"P1L2"},
  {id:117,word:"similar",ph:"/ˈsɪmɪlər/",pos:"adj.",en:"having resemblance; alike but not identical",zh:"相似的；類似的",ex:"It is not uncommon for pets to have similar characteristics to their owners.",exZh:"寵物與其主人有相似的性格並不少見。",diff:2,unit:"P1L2"},
  {id:118,word:"domestic",ph:"/dəˈmestɪk/",pos:"adj.",en:"relating to the home, family, or household",zh:"家庭的；家內的",ex:"There has been a rise in domestic disturbance among family members in recent years.",exZh:"近年來，家庭成員之間的家庭紛爭有所增加。",diff:2,unit:"P1L2"},
  {id:119,word:"beloved",ph:"/bɪˈlʌvɪd/",pos:"adj.",en:"greatly loved; very dear",zh:"心愛的；深受喜愛的",ex:"Fathers are often looked upon as beloved role models by their children.",exZh:"父親經常被他們的孩子視為心愛的榜樣。",diff:2,unit:"P1L2"},
  {id:120,word:"bittersweet",ph:"/ˈbɪtəswiːt/",pos:"adj.",en:"having both pleasant and unpleasant aspects",zh:"苦樂參半的",ex:"Childhood memories should be fond for everyone, not bittersweet.",exZh:"童年回憶對每個人應該都是美好的，而不是苦樂參半。",diff:3,unit:"P1L2"},
  {id:121,word:"ancestor",ph:"/ˈænsɪstər/",pos:"n.",en:"a person from whom one is descended",zh:"祖先；祖宗",ex:"Children can learn a lot about who they are by learning about their ancestors.",exZh:"孩童可以藉由瞭解他們的祖先來更加瞭解他們是誰。",diff:3,unit:"P1L2"},
  {id:122,word:"relative",ph:"/ˈrelətɪv/",pos:"n.",en:"a person connected by blood or marriage",zh:"親屬；親戚",ex:"The cost of caring for elderly relatives is unaffordable for some families.",exZh:"照顧年老親屬的費用對有些家庭來說是負擔不起的。",diff:2,unit:"P1L2"},
  {id:123,word:"offspring",ph:"/ˈɔːfsprɪŋ/",pos:"n.",en:"a person's child or children; an animal's young",zh:"子女；後代",ex:"Nowadays an increasing number of couples are choosing not to have any offspring.",exZh:"現今愈來愈多的夫妻選擇不生小孩。",diff:3,unit:"P1L2"},
  {id:124,word:"upbringing",ph:"/ˈʌpbrɪŋɪŋ/",pos:"n.",en:"the way a child is raised and educated",zh:"教養；成長方式",ex:"Older siblings often have a different upbringing to younger ones.",exZh:"較年長的孩子通常會有與年幼的弟妹不同的教養方式。",diff:3,unit:"P1L2"},
  {id:125,word:"kinship",ph:"/ˈkɪnʃɪp/",pos:"n.",en:"a close relationship or connection; family ties",zh:"親屬關係；親情",ex:"Working through problems often strengthens feelings of kinship within a family unit.",exZh:"解決問題往往能鞏固一個家庭單位內部的親屬關係。",diff:4,unit:"P1L2"},
  // U01 P1 Lesson 3: Housing 住所
  {id:126,word:"commute",ph:"/kəˈmjuːt/",pos:"v.",en:"to travel regularly between home and work",zh:"通勤；上下班",ex:"As cities become larger, more people are being forced to commute to work.",exZh:"隨著城市規模不合理地擴大，許多人被迫要通勤上下班。",diff:2,unit:"P1L3"},
  {id:127,word:"dwell",ph:"/dwel/",pos:"v.",en:"to live or reside in a place",zh:"居住；定居",ex:"While many people prefer to dwell in metropolitan areas, rural areas are proving increasingly popular.",exZh:"當許多人偏好住在大都市地區時，鄉村地區正在證明其愈來愈受歡迎。",diff:3,unit:"P1L3"},
  {id:128,word:"cohabit",ph:"/kəʊˈhæbɪt/",pos:"v.",en:"to live together as a couple without being married",zh:"同居；共同生活",ex:"More couples are choosing to cohabit over marry in most modern societies nowadays.",exZh:"在當今大多數現代社會中，愈來愈多的伴侶選擇同居而不是結婚。",diff:3,unit:"P1L3"},
  {id:129,word:"demolish",ph:"/dɪˈmɒlɪʃ/",pos:"v.",en:"to pull down or destroy a building",zh:"拆除；摧毀",ex:"It is common practice to demolish old buildings to make way for new construction.",exZh:"拆除舊建築為新建設騰出空間是普遍的做法。",diff:3,unit:"P1L3"},
  {id:130,word:"affordable",ph:"/əˈfɔːrdəbl/",pos:"adj.",en:"cheap enough for people to be able to buy",zh:"可負擔的；負擔得起的",ex:"Government-funded, affordable housing can help reduce the cost of living in large cities.",exZh:"政府資助的可負擔住宅能夠幫助降低居住在大城市的生活成本。",diff:2,unit:"P1L3"},
  {id:131,word:"residential",ph:"/ˌrezəˈdenʃəl/",pos:"adj.",en:"designed for people to live in; relating to housing",zh:"居住的；住宅的",ex:"Elderly people often receive professional care when housed in residential homes.",exZh:"老年人住在養老院時，通常受到專業的照顧。",diff:3,unit:"P1L3"},
  {id:132,word:"habitable",ph:"/ˈhæbɪtəbl/",pos:"adj.",en:"suitable to live in; fit for human occupation",zh:"適合居住的",ex:"The more light a dwelling receives, the more habitable it becomes.",exZh:"住宅接收的光線愈多，它就變得愈適合居住。",diff:3,unit:"P1L3"},
  {id:133,word:"substandard",ph:"/sʌbˈstændəd/",pos:"adj.",en:"below the expected or required standard",zh:"不合標準的；劣質的",ex:"Substandard accommodation in city areas forces poor families to cohabit.",exZh:"城市地區裡不合標準的住屋迫使貧窮的家庭共同居住而導致過度擁擠。",diff:4,unit:"P1L3"},
  {id:134,word:"flat",ph:"/flæt/",pos:"n.",en:"a set of rooms forming a home in a larger building",zh:"公寓；單元房",ex:"In the city, high housing prices mean most people live in flats.",exZh:"在城市裡，高房價意味著大多數人都住公寓。",diff:1,unit:"P1L3"},
  {id:135,word:"bungalow",ph:"/ˈbʌŋɡələʊ/",pos:"n.",en:"a low house with one storey",zh:"平房；平屋",ex:"The small size of bungalows makes them better suited to smaller families.",exZh:"平房的小面積使它們更適合小家庭居住，而非大家庭。",diff:3,unit:"P1L3"},
  {id:136,word:"townhouse",ph:"/ˈtaʊnhaʊs/",pos:"n.",en:"a tall narrow house, typically with several floors",zh:"獨棟房屋；聯排別墅",ex:"Many families dream of owning their own townhouse with a yard.",exZh:"許多家庭夢想擁有他們自己附帶院子的獨棟房屋。",diff:3,unit:"P1L3"},
  {id:137,word:"duplex",ph:"/ˈdjuːpleks/",pos:"n.",en:"a house divided into two separate apartments",zh:"複式房屋；雙拼住宅",ex:"The affordability of duplex housing makes it an attractive proposition for families.",exZh:"複式住宅的可負擔性使其對於家庭來說成為一個吸引人的選擇。",diff:3,unit:"P1L3"},
  // U01 P1 Lesson 4: Relationships 人際關係
  {id:138,word:"establish",ph:"/ɪˈstæblɪʃ/",pos:"v.",en:"to set up or create something on a firm basis",zh:"建立；創立",ex:"It is important for immigrants to establish ties with local residents.",exZh:"對移民來說，當他們遷入新社區時，與當地居民建立聯繫是重要的。",diff:2,unit:"P1L4"},
  {id:139,word:"acquaint",ph:"/əˈkweɪnt/",pos:"v.",en:"to make someone aware of or familiar with something",zh:"使瞭解；使認識",ex:"Through social media, people may acquaint themselves with others without ever meeting.",exZh:"透過社群媒體，人們無須親自見面就可讓他們自己與他人熟識。",diff:3,unit:"P1L4"},
  {id:140,word:"bear",ph:"/beər/",pos:"v.",en:"to endure or put up with something difficult",zh:"忍受；承受",ex:"Adolescents today cannot bear being apart from their cellular devices.",exZh:"現今的青少年無法忍受與他們的手機分離。",diff:2,unit:"P1L4"},
  {id:141,word:"manipulate",ph:"/məˈnɪpjuleɪt/",pos:"v.",en:"to control or influence someone in a clever or unfair way",zh:"操縱；控制",ex:"Marketing firms frequently manipulate customers through clever advertising techniques.",exZh:"行銷公司經常透過巧妙的廣告技巧操縱顧客。",diff:3,unit:"P1L4"},
  {id:142,word:"relate",ph:"/rɪˈleɪt/",pos:"v.",en:"to make or show a connection between things or people",zh:"使...有聯繫；交往",ex:"Nowadays technology governs the way in which people relate to each other.",exZh:"如今科技掌管著人們彼此交往的方式。",diff:2,unit:"P1L4"},
  {id:143,word:"distant",ph:"/ˈdɪstənt/",pos:"adj.",en:"far away in space, time, or relationship",zh:"遠方的；疏遠的",ex:"Social media allows everyone to keep in touch with even distant relatives.",exZh:"社群媒體使每個人都能保持聯繫，即便是遠親。",diff:2,unit:"P1L4"},
  {id:144,word:"intimate",ph:"/ˈɪntɪmɪt/",pos:"adj.",en:"closely acquainted; having a close personal relationship",zh:"親密的；親近的",ex:"Rural communities often share an intimate relationship missed by city dwellers.",exZh:"鄉村社區通常共同擁有城市居民所沒有的親密關係。",diff:3,unit:"P1L4"},
  {id:145,word:"parental",ph:"/pəˈrentl/",pos:"adj.",en:"relating to a parent or parents",zh:"父母的；親本的",ex:"In a well-functioning family, parental responsibilities should be shared equally by both parents.",exZh:"在一個功能健全的家庭中，父母的責任應由父母雙方平等分擔。",diff:3,unit:"P1L4"},
  {id:146,word:"marital",ph:"/ˈmærɪtl/",pos:"adj.",en:"relating to marriage",zh:"婚姻的；夫妻的",ex:"A generation gap exists between young people and their parents with regards to marital status.",exZh:"年輕人與其父母之間針對婚姻狀況有代溝存在。",diff:3,unit:"P1L4"},
  {id:147,word:"sibling",ph:"/ˈsɪblɪŋ/",pos:"n.",en:"a brother or sister",zh:"兄弟姐妹",ex:"Many people become closer to their siblings in adulthood than they were as children.",exZh:"許多人在成年期比在身為孩童時變得與其兄弟姊妹更加親近。",diff:2,unit:"P1L4"},
  {id:148,word:"spouse",ph:"/spaʊz/",pos:"n.",en:"a husband or wife",zh:"配偶；伴侶",ex:"Maintaining a long-distance relationship is hard for spouses who live far apart.",exZh:"對分居千里之外的配偶來說，維持一段遠距離關係是很困難的。",diff:2,unit:"P1L4"},
  {id:149,word:"companion",ph:"/kəmˈpænjən/",pos:"n.",en:"a person who shares time or activities with another",zh:"同伴；夥伴",ex:"Travelling with companions is safer, cheaper, and more fun than doing so alone.",exZh:"與同伴一起旅行比獨自旅行更安全、更便宜、更有趣。",diff:2,unit:"P1L4"},
  {id:150,word:"in-laws",ph:"/ˈɪnlɔːz/",pos:"n.",en:"the parents or relatives of one's spouse",zh:"姻親；配偶的家人",ex:"In some cultures, it is necessary for a woman to live with her in-laws after marriage.",exZh:"在某些文化中，女人婚後必須與她的姻親同住。",diff:2,unit:"P1L4"},
  // U01 P1 Lesson 5: Roles 角色
  {id:151,word:"perform",ph:"/pəˈfɔːm/",pos:"v.",en:"to carry out or execute a task or function",zh:"表現；履行；執行",ex:"It is difficult for many women to perform successfully in their careers and as caregivers.",exZh:"對許多女性而言，要在其職涯與擔任其家庭照顧者同時表現成功是困難的。",diff:2,unit:"P1L5"},
  {id:152,word:"provide",ph:"/prəˈvaɪd/",pos:"v.",en:"to supply or give something needed",zh:"提供；供給",ex:"A good manager provides both leadership and advice to employees.",exZh:"一個優秀的管理者提供領導能力及建議給員工。",diff:2,unit:"P1L5"},
  {id:153,word:"fulfil",ph:"/fʊlˈfɪl/",pos:"v.",en:"to carry out a duty or achieve a goal",zh:"履行；實現",ex:"Although doctors more than fulfil their duties to patients, most are severely underpaid.",exZh:"雖然醫生做的遠超過只是履行對病人的職責，但大多數的工資都嚴重不足。",diff:3,unit:"P1L5"},
  {id:154,word:"occupy",ph:"/ˈɒkjupaɪ/",pos:"v.",en:"to hold or fill a position or role",zh:"擔任；佔據",ex:"Men and women should occupy an equal number of positions in company management.",exZh:"男女都應在公司管理中擔任等同數量的職位。",diff:2,unit:"P1L5"},
  {id:155,word:"responsible",ph:"/rɪˈspɒnsəbl/",pos:"adj.",en:"having an obligation to do something; answerable for one's actions",zh:"負責的；有責任感的",ex:"Governments are responsible for the security and good health of their citizens.",exZh:"政府對其公民的安全與良好的健康負責任。",diff:2,unit:"P1L5"},
  {id:156,word:"dominant",ph:"/ˈdɒmɪnənt/",pos:"adj.",en:"most important, powerful, or influential",zh:"主要的；占主導地位的",ex:"English is the dominant language of science, technology and international business.",exZh:"英語是科學、科技與國際商業的主要語言。",diff:3,unit:"P1L5"},
  {id:157,word:"supportive",ph:"/səˈpɔːtɪv/",pos:"adj.",en:"giving help, encouragement, or emotional support",zh:"支持的；支援的",ex:"The teacher serves a supportive role, guiding students to achieve their goals.",exZh:"教師作為一個對學生支持的角色，引導學生去達成他們的目標。",diff:2,unit:"P1L5"},
  {id:158,word:"advisory",ph:"/ədˈvaɪzəri/",pos:"adj.",en:"having the function of giving advice or recommendations",zh:"顧問的；諮詢的",ex:"In addition to an educator, teachers often serve their students in an advisory capacity.",exZh:"除了教育工作者外，教師們通常還以顧問身分為學生服務。",diff:4,unit:"P1L5"},
  {id:159,word:"breadwinner",ph:"/ˈbredwɪnər/",pos:"n.",en:"the member of a family who earns the income",zh:"負擔生計的人；養家者",ex:"From a traditional perspective, the father is usually the breadwinner in a family.",exZh:"從傳統的角度來看，父親通常是家庭中負擔生計的人。",diff:3,unit:"P1L5"},
  {id:160,word:"guardian",ph:"/ˈɡɑːdiən/",pos:"n.",en:"a person who protects or is responsible for someone",zh:"保護者；監護人",ex:"Some say that zoos play an important function as guardians of the world's biodiversity.",exZh:"有些人說動物園扮演世界生物多樣性保護者般的重要功能。",diff:3,unit:"P1L5"},
  {id:161,word:"role model",ph:"/ˈrəʊl mɒdl/",pos:"n.",en:"a person looked up to as an example to follow",zh:"榜樣；模範",ex:"Both teachers and parents are the most important role models in the lives of young children.",exZh:"教師與父母都是幼兒生活中的重要榜樣。",diff:2,unit:"P1L5"},
  {id:162,word:"spokesman",ph:"/ˈspəʊksmən/",pos:"n.",en:"a person who speaks officially on behalf of a group",zh:"發言人；代言人",ex:"As leader of the country, a president is also its national spokesman at international events.",exZh:"作為國家領導人，總統在國際事件上也是其國家的發言人。",diff:3,unit:"P1L5"},
  // U01 P1 Lesson 6: Personality 個性
  {id:163,word:"form",ph:"/fɔːm/",pos:"v.",en:"to develop or create a mental impression or opinion",zh:"形成；養成",ex:"The majority of people form an opinion of someone within three seconds of first meeting.",exZh:"大多數人在初次見面的三秒內就形成了對某人的看法。",diff:2,unit:"P1L6"},
  {id:164,word:"reflect",ph:"/rɪˈflekt/",pos:"v.",en:"to show or express something about a quality or situation",zh:"反映；反射",ex:"A nation's culture reflects the diversity of its values, thoughts and beliefs.",exZh:"一個國家的文化反映出其價值觀、思想與信仰的多樣性。",diff:2,unit:"P1L6"},
  {id:165,word:"preserve",ph:"/prɪˈzɜːv/",pos:"v.",en:"to maintain or keep something in its original state",zh:"保留；保存",ex:"The renovation works tastefully preserved the character of the historic town house.",exZh:"修繕工程很有品味地保留了這樣歷史悠久的鎮公所特色。",diff:3,unit:"P1L6"},
  {id:166,word:"reveal",ph:"/rɪˈviːl/",pos:"v.",en:"to make previously unknown information known",zh:"透露；揭示",ex:"A downside of online dating is that online profiles seldom reveal a person's true character.",exZh:"網路約會的一個缺點是網路上的個人檔案很少透露一個人的真實性格。",diff:2,unit:"P1L6"},
  {id:167,word:"conscientious",ph:"/ˌkɒnʃiˈenʃəs/",pos:"adj.",en:"wishing to do one's work thoroughly and correctly",zh:"認真負責的；盡職的",ex:"Business leaders hope to employ hardworking and conscientious workers.",exZh:"商業領導者希望雇用勤勞且認真負責的勞工。",diff:4,unit:"P1L6"},
  {id:168,word:"distinctive",ph:"/dɪˈstɪŋktɪv/",pos:"adj.",en:"having a quality that makes something easily identifiable",zh:"獨特的；有特色的",ex:"Some food like stinky tofu have a distinctive aroma.",exZh:"像臭豆腐這樣的食物有一獨特的氣味。",diff:3,unit:"P1L6"},
  {id:169,word:"enigmatic",ph:"/ˌenɪɡˈmætɪk/",pos:"adj.",en:"mysterious and difficult to understand",zh:"神祕的；難以捉摸的",ex:"Many people strive to understand the enigmatic nature of dreams and their meaning.",exZh:"許多人努力想要理解夢的神祕本質與其意義。",diff:4,unit:"P1L6"},
  {id:170,word:"intrinsic",ph:"/ɪnˈtrɪnsɪk/",pos:"adj.",en:"belonging naturally; essential",zh:"內在的；固有的",ex:"An important part of being a teacher is giving students the intrinsic motivation.",exZh:"成為教師的一項重要職責是給予學生內在動機。",diff:4,unit:"P1L6"},
  {id:171,word:"obnoxious",ph:"/əbˈnɒkʃəs/",pos:"adj.",en:"extremely unpleasant or objectionable",zh:"令人討厭的；惹人反感的",ex:"The air pollution in some cities is truly obnoxious and deters tourists from visiting.",exZh:"一些城市的空氣污染確實令人討厭，並且讓遊客不想造訪該處。",diff:4,unit:"P1L6"},
  {id:172,word:"enthusiasm",ph:"/ɪnˈθjuːziæzəm/",pos:"n.",en:"intense and eager enjoyment or interest",zh:"熱誠；熱情",ex:"His enthusiasm for his work means he performs well in his job.",exZh:"他對工作的熱誠意味著他在工作上表現出色。",diff:3,unit:"P1L6"},
  {id:173,word:"charisma",ph:"/kəˈrɪzmə/",pos:"n.",en:"compelling attractiveness that inspires devotion in others",zh:"個人魅力；領袖魅力",ex:"Charisma is an innate quality that natural leaders are born with.",exZh:"個人魅力是天生領袖與生俱來的天賦能力。",diff:4,unit:"P1L6"},
  {id:174,word:"trait",ph:"/treɪt/",pos:"n.",en:"a distinguishing quality or characteristic",zh:"特徵；特點",ex:"Working hard is seen by many as a positive character trait in society.",exZh:"努力工作被許多人視為是社會中一種正向的性格特徵。",diff:3,unit:"P1L6"},
  {id:175,word:"narcissism",ph:"/ˈnɑːsɪsɪzəm/",pos:"n.",en:"excessive admiration of oneself; self-centredness",zh:"自戀；自我崇拜",ex:"The culture of taking 'selfies' may be regarded as a form of narcissism.",exZh:"拍「自拍照」的文化可被視為一種自戀的型態。",diff:5,unit:"P1L6"},
  // U01 P1 Lesson 7: First Impressions 第一印象
  {id:176,word:"avoid",ph:"/əˈvɔɪd/",pos:"v.",en:"to keep away from or stop oneself from doing something",zh:"避免；躲避",ex:"Most people avoid eye contact with others when meeting for the first time.",exZh:"大多數人初次見面時都避免與他人眼神接觸。",diff:2,unit:"P1L7"},
  {id:177,word:"come across",ph:"/kʌm əˈkrɒs/",pos:"v.",en:"to appear or seem in a certain way to others",zh:"表現得；給人...印象",ex:"Although she didn't mean to, she came across as overbearing in the interview.",exZh:"雖然她不是有意的，但是她在面試中表現得很專橫的樣子。",diff:2,unit:"P1L7"},
  {id:178,word:"glance",ph:"/ɡlɑːns/",pos:"v.",en:"to take a brief or quick look at something",zh:"看見；瞥見",ex:"We should neither judge a book by its cover, nor a stranger at first glance.",exZh:"我們不該以貌取人，也不該初次見面就評斷一個陌生人。",diff:2,unit:"P1L7"},
  {id:179,word:"reinforce",ph:"/ˌriːɪnˈfɔːs/",pos:"v.",en:"to strengthen or support an idea, feeling or habit",zh:"強化；加強",ex:"Ultra-thin fashion models reinforce the notion that being thin means being beautiful.",exZh:"極瘦的時裝模特兒強化了瘦就是美的這一種觀念。",diff:3,unit:"P1L7"},
  {id:180,word:"accurate",ph:"/ˈækjurɪt/",pos:"adj.",en:"correct in all details; free from errors",zh:"精確的；準確的",ex:"In an interview, it is preferable to give an accurate depiction of accomplishments.",exZh:"在面試中，對（自己的）才藝給予精確的描述是比較好的。",diff:2,unit:"P1L7"},
  {id:181,word:"convincing",ph:"/kənˈvɪnsɪŋ/",pos:"adj.",en:"capable of causing someone to believe something",zh:"有說服力的；令人信服的",ex:"Confident people are much more convincing than shy ones.",exZh:"自信的人比害羞的人更有說服力。",diff:3,unit:"P1L7"},
  {id:182,word:"overwhelming",ph:"/ˌəʊvəˈhwelmɪŋ/",pos:"adj.",en:"very strong or intense; difficult to deal with",zh:"崩潰的；難以承受的",ex:"Sharing our feelings with others prevents them becoming overwhelming.",exZh:"與他人分享我們的心情可避免情緒崩潰。",diff:3,unit:"P1L7"},
  {id:183,word:"vague",ph:"/veɪɡ/",pos:"adj.",en:"not clearly expressed or defined; uncertain",zh:"不明確的；模糊的",ex:"Someone who appears vague may also come across as untrustworthy.",exZh:"不明確的人也會讓人感到不能信任。",diff:3,unit:"P1L7"},
  {id:184,word:"risk-taker",ph:"/ˈrɪsk teɪkər/",pos:"n.",en:"a person who takes chances or acts boldly",zh:"冒險家；敢於冒險的人",ex:"Society tends to admire the risk-takers over the risk averse.",exZh:"社會傾向崇拜冒險家而非不願承擔風險的人。",diff:3,unit:"P1L7"},
  {id:185,word:"drama queen",ph:"/ˈdrɑːmə kwiːn/",pos:"n.",en:"a person who reacts to situations in an exaggerated way",zh:"反應誇張的人；大驚小怪的人",ex:"When I was younger, all my friends knew me as a bit of a drama queen.",exZh:"我年輕的時候，我所有朋友都知道我是一個反應有點誇張的人。",diff:2,unit:"P1L7"},
  {id:186,word:"hypocrite",ph:"/ˈhɪpəkrɪt/",pos:"n.",en:"a person who claims to have moral standards they do not follow",zh:"偽君子；虛偽的人",ex:"Politicians like to give the impression that they are honest, and their opponents are hypocrites.",exZh:"政客們喜歡給人他們很誠實，而他們的對手是偽君子的印象。",diff:4,unit:"P1L7"},
  {id:187,word:"social butterfly",ph:"/ˈsəʊʃl ˈbʌtəflaɪ/",pos:"n.",en:"a person who is very sociable and moves between social groups",zh:"交際花；善於社交的人",ex:"Social butterflies prefer life in the city where there are more opportunities to socialise.",exZh:"交際花喜歡去有更多機會社交的城市生活。",diff:3,unit:"P1L7"},
  // U01 P1 Lesson 8: Emotions 情緒
  {id:188,word:"handle",ph:"/ˈhændl/",pos:"v.",en:"to deal with or manage a situation or emotion",zh:"處理；應對",ex:"Meditation is a proven way to handle emotional highs and lows.",exZh:"冥想是一種處理情緒高低起伏經過驗證的方法。",diff:2,unit:"P1L8"},
  {id:189,word:"arouse",ph:"/əˈraʊz/",pos:"v.",en:"to stir up or awaken a feeling or emotion",zh:"喚起；激起",ex:"Conflict often arouses negative feelings that many people find hard to control.",exZh:"衝突往往會喚起許多人覺得難以控制的負面情緒。",diff:3,unit:"P1L8"},
  {id:190,word:"confront",ph:"/kənˈfrʌnt/",pos:"v.",en:"to face or deal with a difficult situation directly",zh:"面對；直面",ex:"It is easier to hide away our fears rather than confront them.",exZh:"隱藏我們的恐懼比面對它們更容易。",diff:3,unit:"P1L8"},
  {id:191,word:"release",ph:"/rɪˈliːs/",pos:"v.",en:"to allow a feeling or tension to be expressed or escape",zh:"釋放；發洩",ex:"Daily exercise is a useful way to keep fit and release pent-up stress.",exZh:"每日運動是保持健康與釋放壓抑已久壓力的有效方法。",diff:2,unit:"P1L8"},
  {id:192,word:"bottle up",ph:"/ˈbɒtl ʌp/",pos:"v.",en:"to suppress or hide one's feelings",zh:"掩飾；壓抑（情感）",ex:"If you bottle up your feelings, you may not be able to contain them for long.",exZh:"如果你掩飾你的感受，你可能無法長時間抑制它們。",diff:3,unit:"P1L8"},
  {id:193,word:"contradictory",ph:"/ˌkɒntrəˈdɪktəri/",pos:"adj.",en:"containing opposing elements; inconsistent",zh:"矛盾的；對立的",ex:"Rather than deal with contradictory feelings, most people choose to suppress them.",exZh:"比起處理矛盾的情緒，大多數人選擇壓抑它們。",diff:4,unit:"P1L8"},
  {id:194,word:"fragile",ph:"/ˈfrædʒaɪl/",pos:"adj.",en:"easily broken or damaged; not strong",zh:"脆弱的；易碎的",ex:"I was in a fragile emotional state after the death of my grandmother.",exZh:"在我祖母去世後，我處於一種脆弱的情緒狀態。",diff:3,unit:"P1L8"},
  {id:195,word:"raw",ph:"/rɔː/",pos:"adj.",en:"strong and undisguised; not processed",zh:"強烈的；赤裸裸的",ex:"It is difficult to handle the raw emotions that may erupt in highly charged situations.",exZh:"處理可能在高度緊張情況下爆發的強烈情緒是困難的。",diff:3,unit:"P1L8"},
  {id:196,word:"suppressed",ph:"/səˈprest/",pos:"adj.",en:"held back or prevented from being expressed",zh:"壓抑的；被抑制的",ex:"Suppressed feelings are more common among men than women.",exZh:"壓抑的情緒在男性中比在女性中更常見。",diff:3,unit:"P1L8"},
  {id:197,word:"anxiety",ph:"/æŋˈzaɪəti/",pos:"n.",en:"a feeling of worry, nervousness, or unease",zh:"焦慮；憂慮",ex:"Public speaking has been described as the biggest cause of anxiety in most people.",exZh:"公開演講被認為是導致大多數人焦慮的最大原因。",diff:3,unit:"P1L8"},
  {id:198,word:"gratitude",ph:"/ˈɡrætɪtjuːd/",pos:"n.",en:"the quality of being thankful; readiness to show appreciation",zh:"感激之情；感謝",ex:"All children owe their parents a debt of gratitude for raising them.",exZh:"所有孩子都應對父母提供的養育表達感激之情。",diff:3,unit:"P1L8"},
  {id:199,word:"nostalgia",ph:"/nɒsˈtældʒiə/",pos:"n.",en:"a sentimental longing for the past",zh:"懷舊；思鄉",ex:"The music is well known for the feelings of nostalgia that it arouses in the listener.",exZh:"這首音樂以在聽者中引起的懷舊之情而聞名。",diff:4,unit:"P1L8"},
  {id:200,word:"relief",ph:"/rɪˈliːf/",pos:"n.",en:"a feeling of reassurance after anxiety has been removed",zh:"緩解；解脫",ex:"Several methods that promote stress relief include sleeping, keeping fit and talking with friends.",exZh:"幾種促進緩解壓力的方法包括睡眠、保持健康及與朋友交談。",diff:2,unit:"P1L8"},

  // ── P2 Health & Sports 健康與運動 ─────────────────────────────
  // P2L1 Body System 身體系統
  {id:201,word:"accomplish",ph:"/əˈkɒmplɪʃ/",pos:"v.",en:"to succeed in doing or completing something",zh:"完成；實現",ex:"People accomplish little when sick and may in fact cause others to become infected.",exZh:"人們生病的時候徒勞無功，事實上，還可能會導致其他人被感染。",diff:2,unit:"P2L1"},
  {id:202,word:"perform",ph:"/pəˈfɔːm/",pos:"v.",en:"to function or work in a specified way",zh:"表現；運作",ex:"In order to perform well, the body must be well-rested, nourished, and exercised.",exZh:"為了表現良好，身體必須獲得充分的休息、營養和鍛鍊。",diff:2,unit:"P2L1"},
  {id:203,word:"process",ph:"/ˈprəʊses/",pos:"v.",en:"to perform a series of operations to change or preserve",zh:"處理；加工",ex:"The digestive system processes food into molecules suitable for nourishment by the body.",exZh:"消化系統將食物處理成適合身體的營養分子。",diff:2,unit:"P2L1"},
  {id:204,word:"serve",ph:"/sɜːv/",pos:"v.",en:"to perform a function or purpose",zh:"服務；發揮作用",ex:"If well cared for, the human body will serve its owner well for many years.",exZh:"如果得到妥善照顧，人體將為其主人好好地服務多年。",diff:2,unit:"P2L1"},
  {id:205,word:"efficient",ph:"/ɪˈfɪʃənt/",pos:"adj.",en:"working well with minimum waste of time or effort",zh:"有效的；效率高的",ex:"A balanced diet leads to an efficient and properly functioning metabolism.",exZh:"一個均衡的飲食能達到有效且適當運作的新陳代謝。",diff:2,unit:"P2L1"},
  {id:206,word:"essential",ph:"/ɪˈsenʃəl/",pos:"adj.",en:"absolutely necessary; extremely important",zh:"不可或缺的；必要的",ex:"Health education should be an essential part of primary school curriculums.",exZh:"健康教育應該是小學課程不可或缺的一部分。",diff:2,unit:"P2L1"},
  {id:207,word:"cellular",ph:"/ˈseljulər/",pos:"adj.",en:"relating to or consisting of cells",zh:"細胞的；細胞性的",ex:"Medical advancements in cellular microbiology are revealing exactly how cancer cells metastasise.",exZh:"細胞微生物學上的醫療進步正在揭示癌細胞是如何轉移的。",diff:4,unit:"P2L1"},
  {id:208,word:"specialised",ph:"/ˈspeʃəlaɪzd/",pos:"adj.",en:"requiring or involving detailed knowledge or skills",zh:"專業化的；專門的",ex:"Private healthcare plans offer more specialised treatment than state health services.",exZh:"私人醫療保健計畫比國家醫療服務提供更專業化的治療。",diff:3,unit:"P2L1"},
  {id:209,word:"circulatory system",ph:"/ˈsɜːkjulətəri ˈsɪstəm/",pos:"n.",en:"the system that circulates blood through the body",zh:"循環系統",ex:"Having a healthy circulatory system can lessen the chances of stroke or heart attack.",exZh:"擁有一個健康的循環系統可減少中風或心臟病的可能性。",diff:3,unit:"P2L1"},
  {id:210,word:"digestive system",ph:"/daɪˈdʒestɪv ˈsɪstəm/",pos:"n.",en:"the system that breaks down food for the body",zh:"消化系統",ex:"Dieticians recommend a diet high in fibre to maintain a healthy digestive system.",exZh:"營養學家建議高纖維飲食以維持一個健康的消化系統。",diff:3,unit:"P2L1"},
  {id:211,word:"immune system",ph:"/ɪˈmjuːn ˈsɪstəm/",pos:"n.",en:"the system that protects the body from disease",zh:"免疫系統",ex:"Sleeping eight hours a day is essential to maintaining a fully functioning immune system.",exZh:"每天睡八小時對於維持能完整運作的免疫系統至關重要。",diff:3,unit:"P2L1"},
  {id:212,word:"respiratory system",ph:"/ˈrespərətəri ˈsɪstəm/",pos:"n.",en:"the system used for breathing",zh:"呼吸系統",ex:"The human respiratory system is extremely sensitive and easily affected by traffic fumes.",exZh:"人體呼吸系統極其敏感，容易受到現代城市交通廢氣的影響。",diff:4,unit:"P2L1"},
  // P2L2 Prevention 預防
  {id:213,word:"occur",ph:"/əˈkɜː/",pos:"v.",en:"to happen; to take place",zh:"發生；出現",ex:"Symptoms of bipolar disorder usually occur during teenage years or early adulthood.",exZh:"雙極性疾患的症狀通常發生於青少年或成年初期。",diff:2,unit:"P2L2"},
  {id:214,word:"recommend",ph:"/ˌrekəˈmend/",pos:"v.",en:"to suggest something as being suitable or advisable",zh:"建議；推薦",ex:"Doctors recommend thirty minutes of physical activity each day to stay healthy.",exZh:"醫生建議每天三十分鐘的體育活動以維持健康。",diff:2,unit:"P2L2"},
  {id:215,word:"reduce",ph:"/rɪˈdjuːs/",pos:"v.",en:"to make something smaller or less in amount",zh:"降低；減少",ex:"The risk of dementia can be reduced by staying physically and mentally active throughout life.",exZh:"藉由維持終生身體和心理的活躍可降低失智症的風險。",diff:2,unit:"P2L2"},
  {id:216,word:"break out",ph:"/breɪk aʊt/",pos:"v.",en:"to start suddenly, especially of a disease or fire",zh:"爆發；突然發生",ex:"Vaccinations are a crucial part of preventing deadly diseases, like measles, from breaking out.",exZh:"疫苗接種是預防致命疾病如麻疹爆發的一大關鍵部分。",diff:2,unit:"P2L2"},
  {id:217,word:"harmful",ph:"/ˈhɑːmfəl/",pos:"adj.",en:"causing or likely to cause harm",zh:"有害的；造成傷害的",ex:"Smoking is harmful not only to smokers but to everyone around them.",exZh:"抽菸不止對抽菸者有害，也對周圍的人有害。",diff:2,unit:"P2L2"},
  {id:218,word:"alarming",ph:"/əˈlɑːmɪŋ/",pos:"adj.",en:"worrying or disturbing",zh:"驚人的；令人擔憂的",ex:"Cases of diabetes have been increasing at an alarming rate in recent decades.",exZh:"近幾十年來，糖尿病的病例以驚人的速度增加。",diff:3,unit:"P2L2"},
  {id:219,word:"notorious",ph:"/nəʊˈtɔːriəs/",pos:"adj.",en:"famous for something bad",zh:"惡名昭彰的；臭名遠播的",ex:"Salt is notorious for raising blood pressure and putting strain on the heart.",exZh:"鹽以升高血壓並使心臟緊張而惡名昭彰。",diff:3,unit:"P2L2"},
  {id:220,word:"wholesome",ph:"/ˈhəʊlsəm/",pos:"adj.",en:"conducive to good health",zh:"有益健康的；健全的",ex:"Vegetarian diets are more wholesome and may lead to healthier lives and longer lifespans.",exZh:"素食更有益健康，並且可能帶來更健康的生活與更長的壽命。",diff:3,unit:"P2L2"},
  {id:221,word:"diet",ph:"/ˈdaɪət/",pos:"n.",en:"the food a person regularly eats",zh:"特種飲食；飲食",ex:"While most people may begin following a diet, few stick to it after achieving their weight goals.",exZh:"雖然大多數人開始遵循特種飲食，但是很少人在達成體重目標之後堅持下去。",diff:2,unit:"P2L2"},
  {id:222,word:"protein",ph:"/ˈprəʊtiːn/",pos:"n.",en:"a nutrient essential for body growth and repair",zh:"蛋白質",ex:"A balanced diet should consist of protein, carbohydrates, fats, and nutrients.",exZh:"均衡的飲食應包含蛋白質、碳水化合物、脂肪與營養素。",diff:2,unit:"P2L2"},
  {id:223,word:"cholesterol",ph:"/kəˈlestərɒl/",pos:"n.",en:"a fatty substance in the blood that can be harmful in excess",zh:"膽固醇",ex:"A diet high in cholesterol blocks up arteries and is a leading cause of heart attacks.",exZh:"高膽固醇的飲食會阻塞動脈，而且是心臟病的主要原因。",diff:4,unit:"P2L2"},
  {id:224,word:"hygiene",ph:"/ˈhaɪdʒiːn/",pos:"n.",en:"conditions and practices that maintain health and prevent disease",zh:"衛生；衛生習慣",ex:"A strong sense of hygiene should be taught to children to ensure a healthy life as adults.",exZh:"應教導孩童強烈的衛生觀念，以確保成年後的健康生活。",diff:3,unit:"P2L2"},
  // P2L3 Diseases 疾病
  {id:225,word:"carry",ph:"/ˈkæri/",pos:"v.",en:"to be infected with a disease without showing symptoms",zh:"攜帶（病菌）；傳播",ex:"Diseases are often carried and spread by both humans and animals alike.",exZh:"疾病通常由人類和動物兩者共同攜帶與傳播。",diff:2,unit:"P2L3"},
  {id:226,word:"spread",ph:"/spred/",pos:"v.",en:"to cause to affect a larger area or group",zh:"散播；傳播",ex:"Immunisation is essential to prevent the spread of infections within our society.",exZh:"免疫接種對於防止傳染病在我們社會中的散播是很重要的。",diff:2,unit:"P2L3"},
  {id:227,word:"catch",ph:"/kætʃ/",pos:"v.",en:"to become infected with a disease",zh:"感染；染上",ex:"Despite what some believe, it is impossible to catch a disease from a vaccine.",exZh:"儘管有些人相信，但是從疫苗中染上疾病是不可能的。",diff:2,unit:"P2L3"},
  {id:228,word:"eradicate",ph:"/ɪˈrædɪkeɪt/",pos:"v.",en:"to completely destroy or get rid of something",zh:"根除；消滅",ex:"Mankind's relentless push to eradicate smallpox is one of the great successes of the twentieth century.",exZh:"人類努力不懈地根除天花，是二十世紀偉大的成就之一。",diff:4,unit:"P2L3"},
  {id:229,word:"inherited",ph:"/ɪnˈherɪtɪd/",pos:"adj.",en:"passed down from parent to child through genes",zh:"遺傳的；遺傳性的",ex:"Advances in DNA analysis mean that many inherited diseases can be diagnosed early.",exZh:"DNA 分析的進步意味著許多遺傳性疾病可以及早被診斷出來。",diff:3,unit:"P2L3"},
  {id:230,word:"occupational",ph:"/ˌɒkjuˈpeɪʃənl/",pos:"adj.",en:"relating to or caused by one's job",zh:"職業的；職業性的",ex:"Many occupational diseases are stress-related, and the majority are seldom treated.",exZh:"許多職業病與壓力有關，並且大多數很少得到治療。",diff:4,unit:"P2L3"},
  {id:231,word:"rare",ph:"/reər/",pos:"adj.",en:"not occurring very often; uncommon",zh:"罕見的；稀有的",ex:"Certain rare diseases are only prevalent in people genetically predisposed to developing them.",exZh:"某些罕見疾病只流行於遺傳上易患這些病的人身上。",diff:2,unit:"P2L3"},
  {id:232,word:"terminal",ph:"/ˈtɜːmɪnəl/",pos:"adj.",en:"of a disease that cannot be cured and will cause death",zh:"末期的；致命的",ex:"Early detection of many cancers greatly reduces the chance of such diseases becoming terminal.",exZh:"許多癌症的早期發現大大降低這種疾病成為末期疾病的可能性。",diff:3,unit:"P2L3"},
  {id:233,word:"sign",ph:"/saɪn/",pos:"n.",en:"an indication that something is present or likely",zh:"徵兆；跡象",ex:"Preventative medicine aims to help patients recognise early signs of disease.",exZh:"預防醫學的目標是藉由幫助病人識別疾病的早期徵兆來避免治療的需要。",diff:2,unit:"P2L3"},
  {id:234,word:"symptom",ph:"/ˈsɪmptəm/",pos:"n.",en:"a physical or mental feature indicating a disease",zh:"症狀；徵狀",ex:"Symptoms of depression include loss of appetite, fatigue, and a general sense of hopelessness.",exZh:"憂鬱症的症狀包括食慾不振、疲勞，以及普遍的絕望感。",diff:2,unit:"P2L3"},
  {id:235,word:"complication",ph:"/ˌkɒmplɪˈkeɪʃən/",pos:"n.",en:"a secondary disease or condition arising from another",zh:"併發症；複雜情況",ex:"Following major surgery, patients should continue to see the doctor to avoid life-threatening complications.",exZh:"大手術之後，病患應該繼續看醫生，以避免危及生命的併發症。",diff:3,unit:"P2L3"},
  {id:236,word:"incidence",ph:"/ˈɪnsɪdəns/",pos:"n.",en:"the occurrence, rate or frequency of a disease",zh:"發生率；發病率",ex:"As society ages, the incidence of cases of Alzheimer's is increasing.",exZh:"隨著社會老齡化，阿茲海默症病例的發生率也正在增加。",diff:4,unit:"P2L3"},
  // P2L4 Chronic Diseases 慢性病
  {id:237,word:"suffer",ph:"/ˈsʌfər/",pos:"v.",en:"to experience pain, illness, or hardship",zh:"患病；受苦",ex:"Poor posture from sitting for long periods of time can cause many office workers to suffer back pain.",exZh:"長時間坐著的不良姿勢會導致許多上班族患有背痛。",diff:2,unit:"P2L4"},
  {id:238,word:"circulate",ph:"/ˈsɜːkjuleɪt/",pos:"v.",en:"to move continuously through a system",zh:"循環；流通",ex:"A sedentary lifestyle affects how blood circulates, leading to major health problems like heart disease.",exZh:"久坐的生活方式影響血液如何循環，導致心臟病等重大健康問題。",diff:3,unit:"P2L4"},
  {id:239,word:"confine",ph:"/kənˈfaɪn/",pos:"v.",en:"to restrict or keep someone within certain limits",zh:"限制；使限於",ex:"Sufferers of long-term illnesses are often confined to their homes with little possibility of leaving.",exZh:"長期疾病的患者通常被限制在家中，離家的可能性小。",diff:3,unit:"P2L4"},
  {id:240,word:"persist",ph:"/pəˈsɪst/",pos:"v.",en:"to continue to exist despite difficulty",zh:"繼續存在；持續",ex:"For many cancer patients, the chance of a tumour returning often persists even after a full recovery.",exZh:"對許多癌症病患來說，即使在完全康復後，腫瘤復發的機率仍然存在。",diff:3,unit:"P2L4"},
  {id:241,word:"chronic",ph:"/ˈkrɒnɪk/",pos:"adj.",en:"persisting for a long time; recurring frequently",zh:"慢性的；長期的",ex:"For those with long-term chronic conditions, alternative therapies provide substantial relief.",exZh:"對那些患有長期慢性病的人來說，替代療法提供實質的緩解。",diff:3,unit:"P2L4"},
  {id:242,word:"cardiovascular",ph:"/ˌkɑːdiəʊˈvæskjulər/",pos:"adj.",en:"relating to the heart and blood vessels",zh:"心血管的",ex:"A sedentary lifestyle is responsible for an increase in cardiovascular diseases in industrialised nations.",exZh:"在工業化國家，久坐不動的生活方式導致心血管疾病的增加。",diff:5,unit:"P2L4"},
  {id:243,word:"lasting",ph:"/ˈlɑːstɪŋ/",pos:"adj.",en:"enduring for a long time; durable",zh:"持久的；長久的",ex:"There is no evidence that reading in dim light causes lasting damage to your eyes.",exZh:"沒有證據顯示在昏暗燈光下閱讀會對你的眼睛導致持久的傷害。",diff:2,unit:"P2L4"},
  {id:244,word:"injurious",ph:"/ɪnˈdʒʊəriəs/",pos:"adj.",en:"causing injury; harmful",zh:"有害的；造成傷害的",ex:"It is a well-known fact that tobacco smoking is injurious to health.",exZh:"抽菸有害健康是眾所皆知的事實。",diff:4,unit:"P2L4"},
  {id:245,word:"cancer",ph:"/ˈkænsər/",pos:"n.",en:"a disease caused by uncontrolled cell growth in the body",zh:"癌症",ex:"Medical breakthroughs are ensuring cancer is being detected and treated faster than in the past.",exZh:"醫學上的突破性進展正在確保癌症的檢測和治療比過去快速。",diff:2,unit:"P2L4"},
  {id:246,word:"obesity",ph:"/əʊˈbiːsɪti/",pos:"n.",en:"the condition of being extremely overweight",zh:"肥胖症；過度肥胖",ex:"With the increased consumption of fast and processed foods, obesity has soared over the last fifty years.",exZh:"隨著速食與加工食品消費量的增加，肥胖症在過去五十年中激增。",diff:4,unit:"P2L4"},
  {id:247,word:"arthritis",ph:"/ɑːˈθraɪtɪs/",pos:"n.",en:"inflammation of the joints causing pain and stiffness",zh:"關節炎",ex:"The risk of developing many types of arthritis increases with age.",exZh:"患多種類型關節炎的風險隨著年紀增加。",diff:4,unit:"P2L4"},
  {id:248,word:"asthma",ph:"/ˈæsmə/",pos:"n.",en:"a respiratory condition causing breathing difficulties",zh:"氣喘；哮喘",ex:"Passive smoking has been proven to cause respiratory diseases such as asthma in non-smokers.",exZh:"抽二手菸經證明會導致非抽菸者的呼吸系統疾病，例如氣喘。",diff:3,unit:"P2L4"},
  // P2L5 Common Illness 常見疾病
  {id:249,word:"ache",ph:"/eɪk/",pos:"v.",en:"to experience a continuous dull pain",zh:"疼痛；痠痛",ex:"Extreme stress increases strain on the skeleton and causes muscles and joints to ache.",exZh:"極端壓力會增加骨骼的壓力，並且導致肌肉和關節疼痛。",diff:2,unit:"P2L5"},
  {id:250,word:"cause",ph:"/kɔːz/",pos:"v.",en:"to make something happen",zh:"導致；引起",ex:"A lack of sleep can cause the body to become more susceptible to sickness.",exZh:"缺乏睡眠會導致身體更容易生病。",diff:1,unit:"P2L5"},
  {id:251,word:"recover",ph:"/rɪˈkʌvər/",pos:"v.",en:"to return to normal health after illness",zh:"復原；康復",ex:"Older people take longer to recover from sickness than younger ones.",exZh:"老年人比年輕人需要更長的時間才能從疾病中復原。",diff:2,unit:"P2L5"},
  {id:252,word:"lessen",ph:"/ˈlesn/",pos:"v.",en:"to make something smaller or less",zh:"減少；減輕",ex:"Taking daily vitamin supplements lessens the chance of people falling sick.",exZh:"每日服用維他命補充劑減少人們生病的機會。",diff:3,unit:"P2L5"},
  {id:253,word:"feign",ph:"/feɪn/",pos:"v.",en:"to pretend to have or feel something",zh:"假裝；裝作",ex:"Some employees may feign illness in order to avoid work in unsatisfying jobs.",exZh:"有些員工可能會假裝生病，以逃避不滿意的工作業務。",diff:4,unit:"P2L5"},
  {id:254,word:"acute",ph:"/əˈkjuːt/",pos:"adj.",en:"severe; of sudden onset and short duration",zh:"急性的；嚴重的",ex:"Acute stress is the most common form of stress, often resulting from high pressure at work.",exZh:"急性壓力是最常見的壓力類型，通常是由工作中的高度壓力引起。",diff:3,unit:"P2L5"},
  {id:255,word:"infectious",ph:"/ɪnˈfekʃəs/",pos:"adj.",en:"capable of spreading disease from one person to another",zh:"傳染的；傳染性的",ex:"Infectious diseases can typically be prevented by national vaccination campaigns.",exZh:"傳染病通常可以藉由全國性的疫苗接種活動來預防。",diff:3,unit:"P2L5"},
  {id:256,word:"prolonged",ph:"/prəˈlɒŋd/",pos:"adj.",en:"continuing for a long time",zh:"延長的；長期的",ex:"One of the benefits of regular exercise is a prolonged lifespan.",exZh:"規律運動的好處之一是延長壽命。",diff:3,unit:"P2L5"},
  {id:257,word:"debilitating",ph:"/dɪˈbɪlɪteɪtɪŋ/",pos:"adj.",en:"making someone very weak and infirm",zh:"使人衰弱的；令人虛弱的",ex:"Arthritis is a debilitating illness that affects millions of people each year.",exZh:"關節炎是一種使人衰弱的疾病，每年影響數百萬人。",diff:5,unit:"P2L5"},
  {id:258,word:"flu",ph:"/fluː/",pos:"n.",en:"influenza; a common infectious illness",zh:"流感；流行性感冒",ex:"When you have the flu, it's a good idea to drink plenty of fluids and get more rest.",exZh:"當你得了流感，多喝流質與多休息是個好主意。",diff:1,unit:"P2L5"},
  {id:259,word:"diarrhoea",ph:"/ˌdaɪəˈrɪə/",pos:"n.",en:"a condition of frequent loose bowel movements",zh:"腹瀉；拉肚子",ex:"Poor food hygiene can cause upset stomachs, diarrhoea, and even cholera.",exZh:"食品衛生不良會導致胃部不適、腹瀉甚至是霍亂。",diff:4,unit:"P2L5"},
  {id:260,word:"insomnia",ph:"/ɪnˈsɒmniə/",pos:"n.",en:"habitual sleeplessness; inability to sleep",zh:"失眠",ex:"Recent studies link increased time spent looking at device screens and a rise in insomnia.",exZh:"最近的研究將看裝置螢幕的時間增加與失眠率上升連結在一起。",diff:4,unit:"P2L5"},
  {id:261,word:"strain",ph:"/streɪn/",pos:"n.",en:"a particular variety of a virus or bacteria",zh:"類型；株（病毒）",ex:"Yearly flu strains make the virus difficult to vaccinate against.",exZh:"每年的流感類型使得病毒難以用接種病毒疫苗來對抗。",diff:3,unit:"P2L5"},
  // P2L6 Treatments 治療方法
  {id:262,word:"diagnose",ph:"/ˈdaɪəɡnəʊz/",pos:"v.",en:"to identify an illness by examining symptoms",zh:"診斷",ex:"Recent medical advancements have made it possible to diagnose cancer earlier than ever before.",exZh:"近來醫學的進步使得比以往更早診斷出癌症成為可能。",diff:3,unit:"P2L6"},
  {id:263,word:"prescribe",ph:"/prɪˈskraɪb/",pos:"v.",en:"to authorise the use of medicine for a patient",zh:"開（藥）；處方",ex:"Bacteria are becoming more resistant to antibiotics because doctors routinely over-prescribe these medications.",exZh:"細菌對抗生素的抗藥性愈來愈強，因為醫生經常過度開抗生素的處方。",diff:3,unit:"P2L6"},
  {id:264,word:"undergo",ph:"/ˌʌndəˈɡəʊ/",pos:"v.",en:"to experience or endure a process or treatment",zh:"接受（治療）；經歷",ex:"Increasing numbers of people are undergoing cosmetic surgery to improve their looks.",exZh:"愈來愈多人正在接受整容手術以改善他們的外表。",diff:3,unit:"P2L6"},
  {id:265,word:"medicate",ph:"/ˈmedɪkeɪt/",pos:"v.",en:"to treat with medicine",zh:"用藥治療；給藥",ex:"In poorer countries, people may have to self-medicate where doctors are unavailable or too expensive.",exZh:"在較貧窮的國家，人們可能不得不在醫生貧乏或太過昂貴的情況下自行用藥。",diff:4,unit:"P2L6"},
  {id:266,word:"medical",ph:"/ˈmedɪkəl/",pos:"adj.",en:"relating to medicine or the treatment of illnesses",zh:"醫療的；醫學的",ex:"Some claim that universal healthcare would actually lower medical bills.",exZh:"一些人主張全民健保計畫實際上將降低醫療費用。",diff:2,unit:"P2L6"},
  {id:267,word:"drastic",ph:"/ˈdræstɪk/",pos:"adj.",en:"likely to have a strong or far-reaching effect",zh:"極端的；激烈的",ex:"Patients in many less-developed countries often have to take drastic measures to receive treatment.",exZh:"許多較低度開發國家的病患通常必須採取極端的措施以接受治療。",diff:3,unit:"P2L6"},
  {id:268,word:"traditional",ph:"/trəˈdɪʃənl/",pos:"adj.",en:"following long-established customs or beliefs",zh:"傳統的",ex:"Traditional medical practices are still very common in many parts of the world, especially Asia.",exZh:"傳統療法在世界許多地方仍然很普遍，尤其是在亞洲。",diff:2,unit:"P2L6"},
  {id:269,word:"diagnostic",ph:"/ˌdaɪəɡˈnɒstɪk/",pos:"adj.",en:"relating to the identification of illness",zh:"診斷的",ex:"Older adults should have a yearly diagnostic medical check-up after the age of 50.",exZh:"年齡較大的成年人年過五十後，每年應該進行一次診斷性的醫學健康檢查。",diff:4,unit:"P2L6"},
  {id:270,word:"surgery",ph:"/ˈsɜːdʒəri/",pos:"n.",en:"medical treatment involving cutting into the body",zh:"手術；外科手術",ex:"Some people avoid surgery since they worry it will leave a permanent scar on their bodies.",exZh:"有些人避免動手術，因為他們擔心會在身體上留下永久性的疤痕。",diff:2,unit:"P2L6"},
  {id:271,word:"acupuncture",ph:"/ˈækjupʌŋktʃər/",pos:"n.",en:"treatment by inserting needles into specific body points",zh:"針灸",ex:"Alternative treatments such as acupuncture and therapeutic massage are becoming increasingly popular.",exZh:"針灸和治療性按摩等替代療法愈來愈受歡迎。",diff:4,unit:"P2L6"},
  {id:272,word:"chemotherapy",ph:"/ˌkeməʊˈθerəpi/",pos:"n.",en:"treatment of cancer using chemical substances",zh:"化療；化學療法",ex:"Despite its proven effectiveness, chemotherapy is often accompanied by severe side effects.",exZh:"儘管被證明有效，化療往往伴隨著嚴重的副作用。",diff:4,unit:"P2L6"},
  {id:273,word:"Chinese medicine",ph:"/ˈtʃaɪniːz ˈmedsɪn/",pos:"n.",en:"traditional medical practices originating from China",zh:"中醫；中藥",ex:"Many people turn to Chinese medicine when western medicine fails them.",exZh:"當西醫治療失敗時，許多人轉向中醫。",diff:2,unit:"P2L6"},
  // P2L7 Sports 運動
  {id:274,word:"exercise",ph:"/ˈeksəsaɪz/",pos:"v.",en:"to engage in physical activity for health",zh:"運動；鍛鍊",ex:"Some people opine that companies should provide employees with time to exercise every day.",exZh:"有些人認為公司應該提供員工時間每天去運動。",diff:2,unit:"P2L7"},
  {id:275,word:"play",ph:"/pleɪ/",pos:"v.",en:"to take part in a sport or game",zh:"參加（遊戲、比賽）；玩",ex:"When children play sport at school, they learn the value of teamwork.",exZh:"當孩童在學校參加體育活動時，他們學習到團隊合作的價值。",diff:1,unit:"P2L7"},
  {id:276,word:"train",ph:"/treɪn/",pos:"v.",en:"to practise or prepare for a sport or skill",zh:"訓練；練習",ex:"Professional athletes often train for up to ten hours per day when preparing for major competitions.",exZh:"專業運動員在準備重大比賽時，通常每天訓練達十小時。",diff:2,unit:"P2L7"},
  {id:277,word:"take up",ph:"/teɪk ʌp/",pos:"v.",en:"to start doing a hobby or activity",zh:"從事；開始做",ex:"Taking up a new sport has been known to help individuals fight depression and anxiety.",exZh:"從事一項新運動有助於個人抵抗憂鬱和焦慮是眾所皆知的。",diff:2,unit:"P2L7"},
  {id:278,word:"outdoor",ph:"/ˈaʊtdɔː/",pos:"adj.",en:"done or located outside",zh:"戶外的；室外的",ex:"Outdoor sports are typically more popular in the summer.",exZh:"戶外運動通常在夏天較受歡迎。",diff:2,unit:"P2L7"},
  {id:279,word:"professional",ph:"/prəˈfeʃənl/",pos:"adj.",en:"engaged in as a paid occupation rather than a hobby",zh:"職業的；專業的",ex:"Professional sports athletes are often held up as role models for younger children to aspire to.",exZh:"職業體育運動員通常被視為年輕孩子追求的榜樣。",diff:2,unit:"P2L7"},
  {id:280,word:"contact",ph:"/ˈkɒntækt/",pos:"adj.",en:"involving physical contact between participants",zh:"接觸的；接觸性的",ex:"Players of contact sports should wear proper head protection to avoid severe head trauma.",exZh:"接觸性運動的運動員應該配戴適當的頭部護具，才能避免嚴重的頭部創傷。",diff:2,unit:"P2L7"},
  {id:281,word:"inter-club",ph:"/ˈɪntəklʌb/",pos:"adj.",en:"occurring between different clubs or teams",zh:"俱樂部間的；跨俱樂部的",ex:"Inter-club tennis tournaments are a great way for children to develop their love of sport.",exZh:"俱樂部間的網球比賽是孩子培養對運動熱愛的絕佳方式。",diff:3,unit:"P2L7"},
  {id:282,word:"event",ph:"/ɪˈvent/",pos:"n.",en:"a sporting contest or competition",zh:"賽事；活動",ex:"The Olympics are perhaps the biggest sporting event in the world.",exZh:"奧運會也許是世界上最大的體育盛事。",diff:2,unit:"P2L7"},
  {id:283,word:"accomplishment",ph:"/əˈkɒmplɪʃmənt/",pos:"n.",en:"something achieved successfully; an achievement",zh:"成就；成績",ex:"Playing sport in school gives children a sense of accomplishment.",exZh:"在學校參加體育活動給予孩童成就感。",diff:3,unit:"P2L7"},
  {id:284,word:"coverage",ph:"/ˈkʌvərɪdʒ/",pos:"n.",en:"the reporting of news events by the media",zh:"新聞報導；報導",ex:"It is true that major sports competitions receive more televised coverage than minor ones.",exZh:"重大體育活動競賽的確比次要的比賽獲得更多電視報導。",diff:3,unit:"P2L7"},
  {id:285,word:"sportsmanship",ph:"/ˈspɔːtsmənʃɪp/",pos:"n.",en:"fair and generous behaviour in sport",zh:"運動家精神；體育精神",ex:"A key concept of sportsmanship is the ability to be gracious even in the face of defeat.",exZh:"運動家精神的一個關鍵概念是即使在面對失敗時仍有展現優雅的能力。",diff:4,unit:"P2L7"},
  // P2L8 Sports Venue 運動場地
  {id:286,word:"locate",ph:"/ləʊˈkeɪt/",pos:"v.",en:"to be situated in a particular place",zh:"位於；坐落於",ex:"Modern sports grounds are usually located on the outskirts of cities to provide easy access by car.",exZh:"現代體育場地通常位於城市郊外，以方便開車前往。",diff:2,unit:"P2L8"},
  {id:287,word:"provide",ph:"/prəˈvaɪd/",pos:"v.",en:"to supply or make available",zh:"提供；供給",ex:"Stadiums provide a home for local clubs, and a place for their fans to support them.",exZh:"體育館為當地俱樂部提供了一個主場，也是球迷支持他們的地方。",diff:2,unit:"P2L8"},
  {id:288,word:"hire",ph:"/ˈhaɪər/",pos:"v.",en:"to rent or let the use of something for payment",zh:"租；租用",ex:"Sports venues are sometimes also hired out for non-sporting events.",exZh:"有時運動場地也會出租給非體育賽事的活動。",diff:2,unit:"P2L8"},
  {id:289,word:"pack out",ph:"/pæk aʊt/",pos:"v.",en:"to fill completely with people",zh:"把...擠滿；客滿",ex:"The local stadium was packed out with local fans all cheering their team on.",exZh:"當地的體育館擠滿了為他們球隊加油的當地粉絲們。",diff:3,unit:"P2L8"},
  {id:290,word:"ideal",ph:"/aɪˈdiəl/",pos:"adj.",en:"most suitable; perfect for a purpose",zh:"理想的；完美的",ex:"The ideal sports centre for me would include a soccer pitch and a gym.",exZh:"我理想的運動中心應包括一個足球場和一間健身房。",diff:2,unit:"P2L8"},
  {id:291,word:"neutral",ph:"/ˈnjuːtrəl/",pos:"adj.",en:"not supporting either side; impartial",zh:"中立的；中性的",ex:"Professional sports should become more gender-neutral to encourage more equality in the field.",exZh:"職業體育應更加性別中立，以促進在該領域更加平等。",diff:2,unit:"P2L8"},
  {id:292,word:"prestigious",ph:"/presˈtɪdʒiəs/",pos:"adj.",en:"inspiring respect and admiration; highly regarded",zh:"有聲望的；聲名顯赫的",ex:"It is a given that some tournaments are more prestigious than others.",exZh:"有些比賽比其他比賽更有聲望，這是已知的事實。",diff:4,unit:"P2L8"},
  {id:293,word:"all-seater",ph:"/ˌɔːlˈsiːtər/",pos:"adj.",en:"having seats for all spectators with no standing areas",zh:"全座位的",ex:"All-seater stadiums are regarded as safer than those with standing areas.",exZh:"全座位的體育館被認為比那些有站立區的更安全。",diff:3,unit:"P2L8"},
  {id:294,word:"court",ph:"/kɔːt/",pos:"n.",en:"an area marked for playing tennis, basketball, etc.",zh:"場地；球場",ex:"It is common in Taiwan to see basketball courts in every community, whether urban or rural.",exZh:"在台灣，無論是在都市或鄉村，經常可以看到每個社區都有籃球場。",diff:2,unit:"P2L8"},
  {id:295,word:"range",ph:"/reɪndʒ/",pos:"n.",en:"a variety or selection of different things",zh:"範圍；各式各樣",ex:"Nowadays most sports stadiums provide services for a range of sports.",exZh:"如今大多數體育館都為各式各樣的運動比賽提供服務。",diff:2,unit:"P2L8"},
  {id:296,word:"track",ph:"/træk/",pos:"n.",en:"a prepared surface for racing or athletics",zh:"徑賽；跑道",ex:"In the Olympics, track and field events such as the 100m sprint are perhaps the most iconic.",exZh:"在奧運會上，像一百米短跑這樣的田徑項目或許是最具代表性的。",diff:2,unit:"P2L8"},
  {id:297,word:"pitch",ph:"/pɪtʃ/",pos:"n.",en:"an area of ground for outdoor sports",zh:"球場；運動場",ex:"The best seats are often behind the goals of a soccer pitch.",exZh:"足球場中最好的座位通常都在球門後方。",diff:2,unit:"P2L8"},
  // P2L9 Extreme Sports 極限運動
  {id:298,word:"boost",ph:"/buːst/",pos:"v.",en:"to increase or improve something",zh:"提高；增加",ex:"Extreme sports are often seen to boost self-confidence in participating athletes.",exZh:"極限運動通常被認為能夠提高參與運動員的自信心。",diff:2,unit:"P2L9"},
  {id:299,word:"increase",ph:"/ɪnˈkriːs/",pos:"v.",en:"to become or make larger in number or amount",zh:"增加；增長",ex:"As participation in dangerous sports has increased, taking part in more traditional ones has declined.",exZh:"隨著參加危險運動的人數增加，參與較傳統運動的人數已經下降了。",diff:2,unit:"P2L9"},
  {id:300,word:"conquer",ph:"/ˈkɒŋkər/",pos:"v.",en:"to overcome or gain control of",zh:"征服；克服",ex:"People often take up risky sports to conquer their fears and push their limits.",exZh:"人們經常從事冒險的運動來征服他們的恐懼和挑戰極限。",diff:3,unit:"P2L9"},
  {id:301,word:"constrain",ph:"/kənˈstreɪn/",pos:"v.",en:"to limit or restrict",zh:"限制；約束",ex:"Governments should not constrain extreme sports, but instead encourage their safe implementation.",exZh:"政府不應該限制極限運動，而應該鼓勵它們的安全實施。",diff:4,unit:"P2L9"},
  {id:302,word:"inspiring",ph:"/ɪnˈspaɪərɪŋ/",pos:"adj.",en:"making people feel motivated and enthusiastic",zh:"鼓舞人心的；激勵的",ex:"While regarded as risky, few would argue that adventure sports are, at the very least, inspiring.",exZh:"雖然被認為有風險，但幾乎沒有人會否認冒險運動至少是鼓舞人心的。",diff:3,unit:"P2L9"},
  {id:303,word:"reckless",ph:"/ˈrekləs/",pos:"adj.",en:"acting without thinking about risks",zh:"魯莽的；不計後果的",ex:"Incidents in extreme sports happen mostly due to amateurs taking reckless chances.",exZh:"極限運動中發生的事故主要是由業餘愛好者進行魯莽的冒險。",diff:3,unit:"P2L9"},
  {id:304,word:"risky",ph:"/ˈrɪski/",pos:"adj.",en:"involving the possibility of danger or harm",zh:"危險的；冒險的",ex:"While most people perceive extreme sports as risky, participants are often less frequently injured.",exZh:"雖然大多數人認為極限運動危險，但極限運動者受傷的頻率比常規運動低。",diff:2,unit:"P2L9"},
  {id:305,word:"transcendent",ph:"/trænsˈendənt/",pos:"adj.",en:"going beyond ordinary limits; surpassing",zh:"超凡的；卓越的",ex:"People enjoy pushing themselves to the extremes and enjoy the transcendent feelings.",exZh:"人們喜歡把自己推向極端並享受超凡的感受。",diff:5,unit:"P2L9"},
  {id:306,word:"limit",ph:"/ˈlɪmɪt/",pos:"n.",en:"the point beyond which something does not go",zh:"極限；限制",ex:"Pushing the body to its limits is one of the attractions of doing an extreme sport.",exZh:"把身體推向極限是從事極限運動的吸引力之一。",diff:2,unit:"P2L9"},
  {id:307,word:"risk",ph:"/rɪsk/",pos:"n.",en:"the possibility of something bad happening",zh:"風險；危險",ex:"The potential risk of bungee jumping is mitigated by the sport's high safety record.",exZh:"高空彈跳的潛在風險被這項運動的高安全記錄給減輕了。",diff:2,unit:"P2L9"},
  {id:308,word:"pursuit",ph:"/pəˈsjuːt/",pos:"n.",en:"an activity or hobby one regularly engages in",zh:"追求；消遣活動",ex:"I think it's important for people to have a range of pursuits to find out what they are good at.",exZh:"我認為人們要有一系列的追求以便找出他們擅長之處，我認為這很重要。",diff:3,unit:"P2L9"},
  {id:309,word:"thrill",ph:"/θrɪl/",pos:"n.",en:"a sudden feeling of excitement and pleasure",zh:"刺激；興奮感",ex:"Risky sports are in vogue these days and attract many young people looking for the latest thrill.",exZh:"如今冒險運動正流行，並且吸引許多尋找最新刺激的年輕人。",diff:2,unit:"P2L9"},
  // P2L10 Sports Competition 運動比賽
  {id:310,word:"claim",ph:"/kleɪm/",pos:"v.",en:"to state something as fact without proof",zh:"聲稱；宣稱",ex:"Some claim that international sporting events can have a negative effect on the lives of local people.",exZh:"有些人聲稱國際體育賽事會對當地居民的生活產生負面影響。",diff:2,unit:"P2L10"},
  {id:311,word:"defeat",ph:"/dɪˈfiːt/",pos:"v.",en:"to win against someone in a competition",zh:"擊敗；打敗",ex:"Competition in sports teaches children problem solving through finding ways to defeat an opponent.",exZh:"體育競賽透過找出擊敗對手的方法來教導孩子解決問題。",diff:2,unit:"P2L10"},
  {id:312,word:"tie",ph:"/taɪ/",pos:"v.",en:"to finish a game or competition with equal scores",zh:"平手；打平",ex:"It is common for both teams to tie in a game, yet still earn points in the competition.",exZh:"兩支隊伍在比賽中打到平手很常見，但在競賽中還是會贏得積分。",diff:2,unit:"P2L10"},
  {id:313,word:"poise",ph:"/pɔɪz/",pos:"v.",en:"to be ready or prepared to do something",zh:"使做好準備；蓄勢待發",ex:"Digital streaming is poised to revolutionise how audiences consume sports content at home.",exZh:"數位串流正準備改革觀眾在家觀看體育內容的方式。",diff:4,unit:"P2L10"},
  {id:314,word:"final",ph:"/ˈfaɪnl/",pos:"adj.",en:"coming at the end; last",zh:"最後的；決賽的",ex:"True sports fans watch every match in a tournament, not just the final one.",exZh:"真正的體育迷觀看錦標賽的每一場比賽，而不只是決賽。",diff:2,unit:"P2L10"},
  {id:315,word:"extraordinary",ph:"/ɪkˈstrɔːdənri/",pos:"adj.",en:"very unusual or remarkable",zh:"非凡的；不尋常的",ex:"The pressure of competition brings out extraordinary attributes in everyone.",exZh:"競爭的壓力帶出了每個人非凡的特質。",diff:4,unit:"P2L10"},
  {id:316,word:"agile",ph:"/ˈædʒaɪl/",pos:"adj.",en:"able to move quickly and easily",zh:"敏捷的；靈活的",ex:"Younger athletes tend to be more agile than their older counterparts.",exZh:"較年輕的運動員傾向比較年長的運動員更敏捷。",diff:3,unit:"P2L10"},
  {id:317,word:"famed",ph:"/feɪmd/",pos:"adj.",en:"known and recognised by many people; famous",zh:"聞名的；著名的",ex:"Successful basketball teams are famed for analysing every match in order to make improvements.",exZh:"成功的籃球隊以分析每場比賽來做出改善而聞名。",diff:3,unit:"P2L10"},
  {id:318,word:"athlete",ph:"/ˈæθliːt/",pos:"n.",en:"a person who competes in sports",zh:"運動員；競技選手",ex:"Athletes should be admired for their attitude toward the game, not just their ability to win.",exZh:"應該欽佩運動員對比賽的態度，而不只是他們獲勝的能力。",diff:2,unit:"P2L10"},
  {id:319,word:"commentator",ph:"/ˈkɒmənteɪtər/",pos:"n.",en:"a person who provides commentary on sports events",zh:"評論員；解說員",ex:"One of my favourite aspects of watching a soccer game is the excitable remarks from the commentators.",exZh:"我最喜歡看足球比賽的一部分是評論員的激動評論。",diff:3,unit:"P2L10"},
  {id:320,word:"enthusiast",ph:"/ɪnˈθjuːziæst/",pos:"n.",en:"a person who is very interested in a subject",zh:"愛好者；熱衷者",ex:"True sports enthusiasts support their team in every kind of weather.",exZh:"真正的體育愛好者會在各種天氣下支持他們的隊伍。",diff:3,unit:"P2L10"},
  {id:321,word:"referee",ph:"/ˌrefəˈriː/",pos:"n.",en:"an official who enforces the rules in a sport",zh:"裁判；仲裁者",ex:"Friendly matches can quickly turn violent on a controversial decision by the referee.",exZh:"友誼賽會因為裁判的一個爭議性判決而迅速演變為暴力衝突。",diff:3,unit:"P2L10"},

  // ── P3 Student and Education 學生與教育 ──────────────────────
  // P3L1 Education System 教育體制
  {id:322,word:"monitor",ph:"/ˈmɒnɪtər/",pos:"v.",en:"to observe and check the progress of something",zh:"監督；監控",ex:"The role of the teacher is to monitor the performance of students.",exZh:"教師的職責是監督學生的表現。",diff:2,unit:"P3L1"},
  {id:323,word:"supervise",ph:"/ˈsuːpəvaɪz/",pos:"v.",en:"to oversee and direct the work of others",zh:"管理；監督",ex:"Large classes are more difficult for an educator to supervise than small ones.",exZh:"大班對於教育工作者來說比小班更難管理。",diff:3,unit:"P3L1"},
  {id:324,word:"cultivate",ph:"/ˈkʌltɪveɪt/",pos:"v.",en:"to develop or foster a quality or skill",zh:"培養；培育",ex:"One of the aims of the education system is to cultivate a love of learning in children.",exZh:"教育體系的目標之一是培養孩童對學習的熱愛。",diff:3,unit:"P3L1"},
  {id:325,word:"orient",ph:"/ˈɔːriənt/",pos:"v.",en:"to direct someone towards a specific goal or situation",zh:"使熟悉；使適應",ex:"Vocational courses help orient students towards specific job roles or careers.",exZh:"職業課程幫助學生熟悉特定的工作角色或職業。",diff:3,unit:"P3L1"},
  {id:326,word:"academic",ph:"/ˌækəˈdemɪk/",pos:"adj.",en:"relating to education and scholarship",zh:"學術的；學院的",ex:"Yearly rankings enable parents to compare the academic performance of schools.",exZh:"年度排名使家長能夠比較學校的學術表現。",diff:2,unit:"P3L1"},
  {id:327,word:"potential",ph:"/pəˈtenʃəl/",pos:"adj.",en:"having the capacity to develop into something in the future",zh:"潛在的；有可能的",ex:"Good discipline in the classroom is important to prevent potential troublemakers disturbing the class.",exZh:"教室內的良好紀律對於防止潛在麻煩製造者騷擾課堂非常重要。",diff:3,unit:"P3L1"},
  {id:328,word:"innovative",ph:"/ˈɪnəʊveɪtɪv/",pos:"adj.",en:"featuring new methods or ideas",zh:"創新的；革新的",ex:"Democratic schools employ an innovative style of learning where children choose their own classes.",exZh:"民主的學校採用創新的學習方式，讓孩童選擇自己的課程。",diff:3,unit:"P3L1"},
  {id:329,word:"vocational",ph:"/vəʊˈkeɪʃənl/",pos:"adj.",en:"relating to an occupation or employment",zh:"職業的；職業訓練的",ex:"Opponents of general education claim that vocational training is essential for securing a good job.",exZh:"一般教育的反對者聲稱職業訓練對於獲得一份好工作至關重要。",diff:4,unit:"P3L1"},
  {id:330,word:"achievement",ph:"/əˈtʃiːvmənt/",pos:"n.",en:"a thing accomplished successfully with effort",zh:"成績；成就",ex:"There is a clear academic gap in the level of achievement between public and private schools.",exZh:"公私立學校之間在成績水準上存在明顯的學術差距。",diff:3,unit:"P3L1"},
  {id:331,word:"performance",ph:"/pəˈfɔːməns/",pos:"n.",en:"the execution of an action; how well someone performs",zh:"成績；表現",ex:"High academic performance is crucial for qualifying for the best universities and jobs.",exZh:"優異的學術成績對於獲得最佳大學和工作的資格至關重要。",diff:2,unit:"P3L1"},
  {id:332,word:"literacy",ph:"/ˈlɪtərəsi/",pos:"n.",en:"the ability to read and write",zh:"識字；讀寫能力",ex:"Both numeracy and literacy are essential in daily life.",exZh:"算術和識字兩者在日常生活裡都是不可或缺的。",diff:3,unit:"P3L1"},
  {id:333,word:"orientation",ph:"/ˌɔːriənˈteɪʃən/",pos:"n.",en:"an introduction for newcomers to a place or organisation",zh:"新生訓練；入職培訓",ex:"The process of orientation helps new students get acquainted with the culture and resources at a university.",exZh:"新生訓練的過程有助於新生瞭解大學的文化、期望和資源。",diff:4,unit:"P3L1"},
  // P3L2 Tuition Fee 學費
  {id:334,word:"charge",ph:"/tʃɑːdʒ/",pos:"v.",en:"to ask for payment for a service",zh:"收費；索價",ex:"Universities in many developed countries charge some of the highest tuition fees in the world.",exZh:"許多已開發國家的大學收取了某些世界上最高的學費。",diff:2,unit:"P3L2"},
  {id:335,word:"cover",ph:"/ˈkʌvər/",pos:"v.",en:"to be sufficient to pay for",zh:"足以支付；負擔",ex:"In many countries in continental Europe, tuition costs for students are fully covered by the state.",exZh:"在歐洲大陸的許多國家，學生的學費完全由國家支付。",diff:2,unit:"P3L2"},
  {id:336,word:"fund",ph:"/fʌnd/",pos:"v.",en:"to provide money for a project or activity",zh:"提供資金；資助",ex:"Many students take a part-time job to fund their studies at institutions of higher learning.",exZh:"許多學生做兼職工作以資助他們在高等學習機構的研讀。",diff:2,unit:"P3L2"},
  {id:337,word:"refund",ph:"/rɪˈfʌnd/",pos:"v.",en:"to pay back money that was previously paid",zh:"退款；退還",ex:"Universities seldom refund students who withdraw from their course mid-semester.",exZh:"大學很少退款給學期中退學的學生。",diff:3,unit:"P3L2"},
  {id:338,word:"financial",ph:"/faɪˈnænʃəl/",pos:"adj.",en:"relating to money and finances",zh:"資金的；財務的",ex:"Receiving financial aid from the government to attend school is contingent on many factors.",exZh:"獲得政府的就學助學金要取決於諸多因素。",diff:3,unit:"P3L2"},
  {id:339,word:"reasonable",ph:"/ˈriːznəbl/",pos:"adj.",en:"fair and appropriate in price or amount",zh:"合理的；公平的",ex:"By ensuring fees remain reasonable, governments ensure children from all backgrounds achieve a quality education.",exZh:"藉由確保學費維持合理，政府保證來自不同背景的孩童都能獲得優質的教育。",diff:2,unit:"P3L2"},
  {id:340,word:"eligible",ph:"/ˈelɪdʒəbl/",pos:"adj.",en:"qualified to participate or receive something",zh:"有資格的；合乎條件的",ex:"While many adolescents are eligible for scholarships, few manage to attain one.",exZh:"雖然很多青少年有獲得獎學金的資格，但是很少人能獲得獎學金。",diff:3,unit:"P3L2"},
  {id:341,word:"estimated",ph:"/ˈestɪmeɪtɪd/",pos:"adj.",en:"approximately calculated",zh:"估計的；預估的",ex:"By 2025, the estimated number of men and women attending college will be approximately equal.",exZh:"到 2025 年，估計上大學的男女人數將大致相等。",diff:3,unit:"P3L2"},
  {id:342,word:"income",ph:"/ˈɪnkʌm/",pos:"n.",en:"money received, especially on a regular basis",zh:"收入；所得",ex:"Children from families with low income can hardly afford the expensive costs of higher education.",exZh:"來自低收入戶家庭的孩子幾乎負擔不了高等教育的昂貴費用。",diff:2,unit:"P3L2"},
  {id:343,word:"loan",ph:"/ləʊn/",pos:"n.",en:"money borrowed that must be repaid",zh:"貸款；借款",ex:"Many students find themselves paying off their student loans long after they graduate from school.",exZh:"許多學生發現自己在畢業很久後才還清學生貸款。",diff:2,unit:"P3L2"},
  {id:344,word:"cheque",ph:"/tʃek/",pos:"n.",en:"a written order to a bank to pay a sum of money",zh:"支票",ex:"These days, very few parents pay for their offspring's higher education by cheque.",exZh:"如今，很少有家長用支票來支付子女的高等教育費用。",diff:2,unit:"P3L2"},
  {id:345,word:"scholarship",ph:"/ˈskɒləʃɪp/",pos:"n.",en:"a grant awarded to support a student's education",zh:"獎學金",ex:"Overseas universities offer scholarships to attract the best students.",exZh:"海外大學提供獎學金以吸引最優秀的學生。",diff:3,unit:"P3L2"},
  // P3L3 Subject 科目
  {id:346,word:"commit",ph:"/kəˈmɪt/",pos:"v.",en:"to dedicate oneself to a particular course of action",zh:"投入；致力於",ex:"High school students should consider carefully before committing to one field of study in tertiary education.",exZh:"高中生在投入高等教育的某一學習領域前，應慎重考慮。",diff:3,unit:"P3L3"},
  {id:347,word:"intrigue",ph:"/ɪnˈtriːɡ/",pos:"v.",en:"to arouse the curiosity or interest of",zh:"引起...興趣；使著迷",ex:"In order to produce meaningful results, teachers need to be taught how to motivate and intrigue their pupils.",exZh:"為了產生有意義的結果，教師需要被教導如何激勵並且引起他們學生的興趣。",diff:4,unit:"P3L3"},
  {id:348,word:"undertake",ph:"/ˌʌndəˈteɪk/",pos:"v.",en:"to carry out or commit to a task",zh:"進行；承擔",ex:"At the end of any program of study, students are usually required to undertake formal examinations.",exZh:"在任何學習課程結束時，學生通常被要求進行正式考試。",diff:3,unit:"P3L3"},
  {id:349,word:"retake",ph:"/riːˈteɪk/",pos:"v.",en:"to take an exam or course again after failing",zh:"重新參加；重考",ex:"For many high school seniors, retaking a GCSE exam is not an option.",exZh:"對許多高三學生來說，重新參加英國普通中等教育證書考試並非一項選擇。",diff:3,unit:"P3L3"},
  {id:350,word:"professional",ph:"/prəˈfeʃənl/",pos:"adj.",en:"relating to or connected with a profession",zh:"專業的；職業的",ex:"Professional standards in school ensure pupils receive the quality of education they deserve.",exZh:"學校裡的專業標準確保學生獲得他們應得的教育品質。",diff:2,unit:"P3L3"},
  {id:351,word:"compulsory",ph:"/kəmˈpʌlsəri/",pos:"adj.",en:"required by law or rule; mandatory",zh:"必修的；強制的",ex:"Many argue that cooking should be made a compulsory subject at secondary school.",exZh:"許多人認為烹飪應該成為中學的必修科目。",diff:3,unit:"P3L3"},
  {id:352,word:"technical",ph:"/ˈteknɪkəl/",pos:"adj.",en:"relating to practical and mechanical skills",zh:"技術的；技術性的",ex:"Technical subjects such as engineering benefit students who are more practical-minded.",exZh:"工程學等技術性科目有益於更注重實用性的學生。",diff:2,unit:"P3L3"},
  {id:353,word:"empirical",ph:"/emˈpɪrɪkəl/",pos:"adj.",en:"based on observation or experiment rather than theory",zh:"經驗的；實證的",ex:"Empirical evidence suggests that an arts education increases empathy among students.",exZh:"經驗跡象顯示，藝術教育能在學生中增加同理心。",diff:5,unit:"P3L3"},
  {id:354,word:"department",ph:"/dɪˈpɑːtmənt/",pos:"n.",en:"a section of a large organisation dealing with one area",zh:"部門；系所",ex:"Learning institutions usually ask students to rank their satisfaction with courses offered by each department.",exZh:"學習機構通常要求學生對各部門提供的課程進行滿意度排名。",diff:2,unit:"P3L3"},
  {id:355,word:"discipline",ph:"/ˈdɪsɪplɪn/",pos:"n.",en:"a branch of knowledge studied in school",zh:"學科；學術領域",ex:"In 2017, the most popular discipline for female undergraduates was medicine.",exZh:"在 2017 年，最受女大學生歡迎的學科是醫學。",diff:3,unit:"P3L3"},
  {id:356,word:"philosophy",ph:"/fɪˈlɒsəfi/",pos:"n.",en:"the study of fundamental questions about existence and knowledge",zh:"哲學",ex:"A philosophy degree offers potential job candidates' crucial soft skills.",exZh:"哲學學位提供潛在求職者關鍵的軟技能。",diff:3,unit:"P3L3"},
  {id:357,word:"psychology",ph:"/saɪˈkɒlədʒi/",pos:"n.",en:"the study of the human mind and behaviour",zh:"心理學",ex:"There has been a boom in the number of students, particularly female, studying psychology in recent years.",exZh:"近年來，學習心理學的學生人數激增，尤其是女性。",diff:3,unit:"P3L3"},
  // P3L4 Teaching 授課
  {id:1010,word:"deliver",ph:"/dɪˈlɪvə/",pos:"v.",en:"to provide or supply something to someone",zh:"提供；傳授",ex:"Personalised learning allows teachers to deliver a curriculum responsive to students' individual needs.",exZh:"個人化的學習允許老師提供響應學生個別需求的課程。",diff:2,unit:"P3L4"},
  {id:1011,word:"audit",ph:"/ˈɔːdɪt/",pos:"v.",en:"to attend a class without receiving credit",zh:"旁聽；稽查",ex:"Some students choose to audit a class for self-enrichment or to expand their academic knowledge.",exZh:"有些學生選擇旁聽一堂課，以充實自己或擴大他們的學術知識。",diff:3,unit:"P3L4"},
  {id:1012,word:"enroll",ph:"/ɪnˈrəʊl/",pos:"v.",en:"to officially register or sign up for a course",zh:"參加；註冊",ex:"Distance learning allows tens of thousands of individuals to enroll in the same course.",exZh:"遠端學習允許數以萬計的個人能夠參加同一個課程。",diff:2,unit:"P3L4"},
  {id:1013,word:"substitute",ph:"/ˈsʌbstɪtjuːt/",pos:"v.",en:"to replace one thing with another",zh:"取代；替代",ex:"Many educators worry they will one day be substituted by artificially enhanced robots.",exZh:"許多教育工作者擔心有朝一日他們會被人工強化的機器人所取代。",diff:3,unit:"P3L4"},
  {id:1014,word:"particular",ph:"/pəˈtɪkjʊlə/",pos:"adj.",en:"used to single out one specific thing",zh:"特定的；個別的",ex:"Large classes fail to address the particular needs of individual students.",exZh:"大班無法顧及個別學生的特定需求。",diff:2,unit:"P3L4"},
  {id:1015,word:"continuous",ph:"/kənˈtɪnjuəs/",pos:"adj.",en:"forming an unbroken series without interruption",zh:"連續的；持續的",ex:"Continuous assessment offers students an increased number of opportunities to master a subject.",exZh:"連續的評估為學生提供更多掌握一門學科的機會。",diff:3,unit:"P3L4"},
  {id:1016,word:"guest",ph:"/ɡest/",pos:"adj.",en:"invited to participate in an event or activity",zh:"客座的；特邀的",ex:"Guest lecturers bring different perspectives and teaching styles that enliven undergraduate classes.",exZh:"客座講師帶來了不同的觀點和教學風格，讓大學生的課堂更加生動。",diff:2,unit:"P3L4"},
  {id:1017,word:"introductory",ph:"/ˌɪntrəˈdʌktəri/",pos:"adj.",en:"serving as an introduction; basic or preliminary",zh:"入門的；介紹性的",ex:"Introductory classes broaden the range of courses accessible to students from all backgrounds.",exZh:"入門課程擴大了來自不同背景學生可參加的課程範圍。",diff:3,unit:"P3L4"},
  {id:1018,word:"curriculum",ph:"/kəˈrɪkjʊləm/",pos:"n.",en:"the subjects in a course of study at a school",zh:"課程；課程體系",ex:"Nowadays many governments emphasise STEM subjects in national curriculums.",exZh:"如今許多政府在全國課程中強調 STEM 學科。",diff:3,unit:"P3L4"},
  {id:1019,word:"methodology",ph:"/ˌmeθəˈdɒlədʒi/",pos:"n.",en:"a system of methods used in a particular field",zh:"教學法；方法論",ex:"The lecture remains the central methodology of traditional teaching at most universities.",exZh:"講課仍然是大多數大學傳統教學的主要教學法。",diff:4,unit:"P3L4"},
  {id:1020,word:"outline",ph:"/ˈaʊtlaɪn/",pos:"n.",en:"a general plan showing the main features of something",zh:"大綱；概要",ex:"Good professors should provide an outline at the start of a new course of lectures.",exZh:"好的教授應該在授課的新課程開始時就提供大綱。",diff:2,unit:"P3L4"},
  {id:1021,word:"syllabus",ph:"/ˈsɪləbəs/",pos:"n.",en:"the plan or outline of a course of study",zh:"教學大綱；課程大綱",ex:"Although teachers are held to the same standards in teaching a course syllabus, teaching quality varies widely.",exZh:"雖然教師們在教授課程大綱時被相同的標準約束，教學品質卻差別很大。",diff:3,unit:"P3L4"},
  // P3L5 Assessment 評量
  {id:358,word:"grade",ph:"/ɡreɪd/",pos:"v.",en:"to assess and assign a mark to work",zh:"替...評分；給分",ex:"These days teachers increasingly rely on computers to grade test papers.",exZh:"如今，老師愈來愈依賴電腦來替考卷評分。",diff:2,unit:"P3L5"},
  {id:359,word:"cite",ph:"/saɪt/",pos:"v.",en:"to quote or refer to a source in academic work",zh:"引用；援引",ex:"The student cited Edgar Alan Poe and Charles Dickens in his essay on comparative literature.",exZh:"這個學生在他的比較文學論文中引用了愛德格·艾倫·坡和查理斯·狄更斯。",diff:3,unit:"P3L5"},
  {id:360,word:"examine",ph:"/ɪɡˈzæmɪn/",pos:"v.",en:"to inspect or investigate closely",zh:"探討；檢視",ex:"Children need to be examined on their development, not simply how much knowledge they retain.",exZh:"孩童需要根據他們的發展被探討，而非僅僅看他們記住了多少知識。",diff:2,unit:"P3L5"},
  {id:361,word:"revise",ph:"/rɪˈvaɪz/",pos:"v.",en:"to reconsider and alter to make improvements",zh:"修改；修訂",ex:"Teachers often complain about the government's tendency to revise educational standards each year.",exZh:"教師們經常抱怨政府傾向於每年修改教育標準。",diff:2,unit:"P3L5"},
  {id:362,word:"ambiguous",ph:"/æmˈbɪɡjuəs/",pos:"adj.",en:"open to more than one interpretation; unclear",zh:"模稜兩可的；含糊的",ex:"One benefit of standardised tests is that they prevent ambiguous grading helping to eliminate marking bias.",exZh:"標準化測驗的一項好處是它們可以避免模稜兩可的評分，以消除評分上的偏見。",diff:4,unit:"P3L5"},
  {id:363,word:"comprehensive",ph:"/ˌkɒmprɪˈhensɪv/",pos:"adj.",en:"complete; including all or nearly all elements",zh:"綜合的；全面的",ex:"Comprehensive grading criteria assess both student's interpersonal and academic skills.",exZh:"綜合評分標準評估學生的人際交往及學術能力。",diff:4,unit:"P3L5"},
  {id:364,word:"rational",ph:"/ˈræʃənl/",pos:"adj.",en:"based on logic and reason rather than emotion",zh:"理性的；合理的",ex:"Modern curriculums place a greater emphasis on critical and rational thinking in school.",exZh:"現代課程更注重在學校的批判和理性思考。",diff:3,unit:"P3L5"},
  {id:365,word:"hypothetical",ph:"/ˌhaɪpəʊˈθetɪkəl/",pos:"adj.",en:"based on a suggested scenario rather than fact",zh:"假設的；假定的",ex:"Hypothetical scenarios in higher ability speaking tests require test-takers to demonstrate lateral thinking.",exZh:"在更高能力的口語測驗裡，假設性的場景要求考生展現出橫向思維。",diff:5,unit:"P3L5"},
  {id:366,word:"acknowledgement",ph:"/əkˈnɒlɪdʒmənt/",pos:"n.",en:"recognition or expression of gratitude for help received",zh:"致謝；承認",ex:"Due to the problem of plagiarism, students need to give acknowledgement if they use part of others' work.",exZh:"由於剽竊問題，學生若使用他人作品的部分，需提出致謝。",diff:4,unit:"P3L5"},
  {id:367,word:"bibliography",ph:"/ˌbɪbliˈɒɡrəfi/",pos:"n.",en:"a list of books and sources used in research",zh:"參考書目；書目",ex:"It is important to include a bibliography with research.",exZh:"將參考書目包含在研究裡是極其重要的。",diff:5,unit:"P3L5"},
  {id:368,word:"submission",ph:"/səbˈmɪʃən/",pos:"n.",en:"the act of handing in work for assessment",zh:"提交；呈交",ex:"Tight submission deadlines put increased pressure on students already suffering from a high workload.",exZh:"緊迫的提交截止日期給已經承受高工作量的學生增加了壓力。",diff:3,unit:"P3L5"},
  {id:369,word:"plagiarism",ph:"/ˈpleɪdʒərɪzəm/",pos:"n.",en:"taking someone else's work and presenting it as one's own",zh:"剽竊；抄襲",ex:"Since the advent of the Internet, plagiarism has become a major problem in education.",exZh:"自從網路出現以來，剽竊就成了教育界的一大問題。",diff:4,unit:"P3L5"},
  // P3L6 Study Materials 學習教材
  {id:370,word:"access",ph:"/ˈækses/",pos:"v.",en:"to obtain or make use of something",zh:"使用；取得",ex:"One advantage of studying at university is that students have access to specialist resources in the campus library.",exZh:"在大學讀書的一項優點就是學生可以使用校園圖書館的專業資源。",diff:2,unit:"P3L6"},
  {id:371,word:"browse",ph:"/braʊz/",pos:"v.",en:"to look through or search casually",zh:"瀏覽；隨意翻閱",ex:"Students often spend hours browsing the Internet searching for suitable evidence or citations.",exZh:"學生經常花數小時瀏覽網路，搜尋合適的證據或引文。",diff:2,unit:"P3L6"},
  {id:372,word:"paraphrase",ph:"/ˈpærəfreɪz/",pos:"v.",en:"to express something using different words",zh:"改述；換句話說",ex:"It is important to paraphrase literature to avoid plagiarizing the work of others.",exZh:"為了避免剽竊其他人的作品，去改述文獻是很重要的。",diff:4,unit:"P3L6"},
  {id:373,word:"elaborate",ph:"/ɪˈlæbəreɪt/",pos:"v.",en:"to give more details or explain something further",zh:"詳細闡述；詳盡說明",ex:"The Internet is the perfect medium in which to elaborate a lesson through multimedia.",exZh:"網路是透過多媒體詳細闡述一堂課的完美媒介。",diff:4,unit:"P3L6"},
  {id:374,word:"required",ph:"/rɪˈkwaɪəd/",pos:"adj.",en:"necessary or needed for a purpose",zh:"必要的；必需的",ex:"Enhanced eLearning in schools is required to better facilitate teachers and students alike.",exZh:"為了更好地幫助老師和學生兩者，提升學校裡的數位學習是必要的。",diff:2,unit:"P3L6"},
  {id:375,word:"alphabetical",ph:"/ˌælfəˈbetɪkəl/",pos:"adj.",en:"arranged in the order of the letters of the alphabet",zh:"字母排序的；按字母順序的",ex:"One thing I don't like about writing is having to prepare a bibliography in alphabetical order.",exZh:"關於寫作我不喜歡的一件事是必須按字母排序來準備書目。",diff:3,unit:"P3L6"},
  {id:376,word:"demanding",ph:"/dɪˈmɑːndɪŋ/",pos:"adj.",en:"requiring much effort, skill, or ability",zh:"使人吃力的；要求高的",ex:"Many part-time students find the workload of a full-time course too demanding.",exZh:"許多兼讀制學生認為全日制課程的課業負擔太過吃力。",diff:3,unit:"P3L6"},
  {id:377,word:"thorough",ph:"/ˈθʌrə/",pos:"adj.",en:"complete and careful in all details",zh:"徹底的；詳盡的",ex:"Teachers must be prepared to facilitate in students a thorough understanding of lesson content.",exZh:"教師們必須準備好以幫助學生對課堂內容有一徹底瞭解。",diff:3,unit:"P3L6"},
  {id:378,word:"text",ph:"/tekst/",pos:"n.",en:"a written or printed work",zh:"文本；課文",ex:"Students must be taught the necessary reading skills to handle lengthy texts.",exZh:"學生必須被教授必要的閱讀技巧以應付冗長的文本。",diff:1,unit:"P3L6"},
  {id:379,word:"manuscript",ph:"/ˈmænjuskrɪpt/",pos:"n.",en:"an author's handwritten or typed text before publication",zh:"手稿；原稿",ex:"A manuscript typically undergoes a rigorous peer review process before publication in a journal.",exZh:"一份手稿在期刊發表之前，通常要經過嚴格的同儕審查程序。",diff:4,unit:"P3L6"},
  {id:380,word:"journal",ph:"/ˈdʒɜːnəl/",pos:"n.",en:"a publication with articles in a specific subject area",zh:"期刊；學報",ex:"Every serious academic aspires to have their work published in a professional journal.",exZh:"每一位認真的學者都渴望將他們的作品發表在專業期刊上。",diff:2,unit:"P3L6"},
  {id:381,word:"thesis",ph:"/ˈθiːsɪs/",pos:"n.",en:"a long piece of writing on a subject for a degree",zh:"論文；學位論文",ex:"Many students lack originality in their doctoral thesis and rarely attempt to prove or disprove anything.",exZh:"許多學生在其博士論文中缺乏原創性，並很少試圖證明或反駁任何事。",diff:4,unit:"P3L6"},
  // P3L7 Ways of Learning 學習方式
  {id:382,word:"schedule",ph:"/ˈʃedʒuːl/",pos:"v.",en:"to plan or arrange for a particular time",zh:"制定（時間）表；安排",ex:"To schedule a study plan helps students to prioritise their learning and meet learning goals.",exZh:"制定學習計畫表有助於學生確定他們學習的優先順序，並且達到學習目標。",diff:2,unit:"P3L7"},
  {id:383,word:"commute",ph:"/kəˈmjuːt/",pos:"v.",en:"to travel regularly between home and work or school",zh:"通勤；上下班",ex:"Podcasts and audio books are a great way of learning while commuting to school or work.",exZh:"播客和有聲書是通勤上學或上班時學習的絕佳方式。",diff:2,unit:"P3L7"},
  {id:384,word:"distract",ph:"/dɪˈstrækt/",pos:"v.",en:"to prevent someone from concentrating",zh:"分心；使分心",ex:"Although technology can greatly enable learning, cellphones and other devices may distract from it the most.",exZh:"雖然科技可大大地促進學習，但手機和其他設備可能最容易使人從中分心。",diff:3,unit:"P3L7"},
  {id:385,word:"tutor",ph:"/ˈtjuːtər/",pos:"v.",en:"to teach someone as a private instructor",zh:"指導；個別輔導",ex:"Being tutored one-on-one may be the ultimate way to completely personalise your learning experience.",exZh:"被一對一指導也許是你學習體驗完全個人化的終極方式。",diff:3,unit:"P3L7"},
  {id:386,word:"flexible",ph:"/ˈfleksəbl/",pos:"adj.",en:"able to change or be changed easily",zh:"靈活的；彈性的",ex:"Teachers should be flexible in their teaching approaches to account for multiple learning styles in the classroom.",exZh:"教師在教學方法上應保持靈活，以考慮到課堂上的多種學習風格。",diff:2,unit:"P3L7"},
  {id:387,word:"cognitive",ph:"/ˈkɒɡnɪtɪv/",pos:"adj.",en:"relating to mental processes such as thinking and learning",zh:"認知的；認知方面的",ex:"Healthy school meals are as important to children's cognitive development as the way in which they learn.",exZh:"健康的學校飲食對兒童的認知發展和他們學習的方式同樣重要。",diff:4,unit:"P3L7"},
  {id:388,word:"distant",ph:"/ˈdɪstənt/",pos:"adj.",en:"far away; remote",zh:"遠距的；遙遠的",ex:"By streaming lectures live, teachers allow both face-to-face and distant students to learn simultaneously.",exZh:"透過現場直播講課，教師讓面對面和遠距的學生能夠同時學習。",diff:2,unit:"P3L7"},
  {id:389,word:"dominant",ph:"/ˈdɒmɪnənt/",pos:"adj.",en:"most important, powerful, or influential",zh:"主要的；主導的",ex:"Memorisation is currently the dominant learning method in many Asian societies.",exZh:"背誦是目前許多亞洲社會主要的學習方法。",diff:3,unit:"P3L7"},
  {id:390,word:"institution",ph:"/ˌɪnstɪˈtjuːʃən/",pos:"n.",en:"an established organisation of educational character",zh:"機構；學校",ex:"Allowing student feedback during class empowers learning institutions to meet their learner's needs.",exZh:"在課堂上允許學生有反饋意見，使學習機構能夠滿足學生需求。",diff:3,unit:"P3L7"},
  {id:391,word:"seminar",ph:"/ˈsemɪnɑː/",pos:"n.",en:"a small group meeting for discussion and study",zh:"研討會；研討課",ex:"Learning outcomes in seminars are usually better than lectures primarily due to smaller class sizes.",exZh:"研討會的學習成果通常比講座好，主要是因為課堂規模較小。",diff:3,unit:"P3L7"},
  {id:392,word:"tutorial",ph:"/tjuːˈtɔːriəl/",pos:"n.",en:"a period of instruction given by a tutor to an individual",zh:"個別指導；輔導課",ex:"Online tutorials allow struggling students to catch up with peers.",exZh:"線上個別指導讓學業有困難的學生能夠趕上同儕。",diff:3,unit:"P3L7"},
  {id:393,word:"workshop",ph:"/ˈwɜːkʃɒp/",pos:"n.",en:"a meeting for discussion or practical work on a subject",zh:"工作坊；研習會",ex:"Nations with the best education systems offer regular workshops to teachers.",exZh:"擁有最佳教育體系的國家會定期為教師提供工作坊。",diff:2,unit:"P3L7"},
  // P3L8 Degrees 學位
  {id:394,word:"complete",ph:"/kəmˈpliːt/",pos:"v.",en:"to finish something successfully",zh:"完成；完畢",ex:"Surveys show that adults completing a college education report greater life satisfaction than others.",exZh:"調查顯示，完成大學教育的成年人匯報的生活滿意度比其他人更高。",diff:2,unit:"P3L8"},
  {id:395,word:"award",ph:"/əˈwɔːd/",pos:"v.",en:"to formally give something as recognition",zh:"授予；頒發",ex:"In modern days, students from all over the world can now be awarded a degree from major overseas universities.",exZh:"在現今，來自世界各地的學生現在可以被授予海外一流大學的學位。",diff:2,unit:"P3L8"},
  {id:396,word:"suspend",ph:"/səsˈpend/",pos:"v.",en:"to temporarily stop or interrupt",zh:"休學；暫停",ex:"Postgraduate students may choose to suspend their studies in order to complete further research.",exZh:"研究生可選擇休學，以完成進一步的研究。",diff:3,unit:"P3L8"},
  {id:397,word:"expel",ph:"/ɪksˈpel/",pos:"v.",en:"to officially force someone to leave a school",zh:"開除；驅逐",ex:"Students who fail to meet the regulations of schools may be expelled.",exZh:"不符合學校規定的學生可能會被開除。",diff:3,unit:"P3L8"},
  {id:398,word:"available",ph:"/əˈveɪləbl/",pos:"adj.",en:"able to be obtained or used",zh:"可得到的；可利用的",ex:"Degrees from top universities are extremely competitive, resulting in a limited number of available places.",exZh:"頂尖大學的學位競爭非常激烈，因此可得到的名額有限。",diff:2,unit:"P3L8"},
  {id:399,word:"elementary",ph:"/ˌeləˈmentəri/",pos:"adj.",en:"relating to the most basic level of education",zh:"基礎的；初等的",ex:"Elementary education is compulsory in most countries and lasts six years.",exZh:"在大多數國家，基礎教育是義務的，為期六年。",diff:2,unit:"P3L8"},
  {id:400,word:"intermediate",ph:"/ˌɪntəˈmiːdiət/",pos:"adj.",en:"at a level between basic and advanced",zh:"中等的；中級的",ex:"After completing an intermediate education, many adolescents take a gap year before university.",exZh:"在完成中等教育後，許多青少年在上大學前會花一年的空檔時間去旅行或工作。",diff:3,unit:"P3L8"},
  {id:401,word:"qualified",ph:"/ˈkwɒlɪfaɪd/",pos:"adj.",en:"having the required skills or qualifications",zh:"合格的；有資格的",ex:"A lack of qualified teachers is becoming a common problem in many countries these days.",exZh:"缺乏合格的教師目前正成為許多國家普遍存在的問題。",diff:3,unit:"P3L8"},
  {id:402,word:"bachelor",ph:"/ˈbætʃələ/",pos:"n.",en:"a person who holds a first degree from a university",zh:"學士；學士學位",ex:"After 4 years studying in Communication Studies, I finally became a Bachelor of Arts.",exZh:"經過四年以來學習傳播研究，我終於成為一位藝術學士。",diff:2,unit:"P3L8"},
  {id:403,word:"doctorate",ph:"/ˈdɒktərɪt/",pos:"n.",en:"the highest academic degree awarded by a university",zh:"博士學位",ex:"The length of a conventional doctorate is discouraging to most undergraduates.",exZh:"對大多數大學生而言，傳統博士學位所需的時間令人氣餒。",diff:4,unit:"P3L8"},
  {id:404,word:"postgraduate",ph:"/ˌpəʊstˈɡrædʒuɪt/",pos:"n.",en:"a student studying for a higher degree after a first degree",zh:"研究生",ex:"Most postgraduates are students who are considering a career in an academic discipline.",exZh:"大部分研究生都是正在考慮從事某一學科領域職業的學生。",diff:4,unit:"P3L8"},
  {id:405,word:"undergraduate",ph:"/ˌʌndəˈɡrædʒuɪt/",pos:"n.",en:"a student at university who has not yet received a degree",zh:"大學生；大學部學生",ex:"Being an undergraduate overseas remains a dream for people who wish to study abroad.",exZh:"成為海外大學生對希望出國留學的人而言，仍然是個夢想。",diff:3,unit:"P3L8"},

  // ── P4 Work 工作 ──────────────────────────────────────────────
  // P4L1 Industries 行業
  {id:406,word:"encourage",ph:"/ɪnˈkʌrɪdʒ/",pos:"v.",en:"to give support or confidence to someone",zh:"鼓勵；鼓動",ex:"Governments should encourage industries and businesses to move to regional areas outside of cities.",exZh:"政府應鼓勵產業和企業遷移到城市以外的地區。",diff:2,unit:"P4L1"},
  {id:407,word:"subsidise",ph:"/ˈsʌbsɪdaɪz/",pos:"v.",en:"to support financially with a government grant",zh:"補助；資助",ex:"Agriculture is often subsidised by governments to ensure national food security.",exZh:"農業經常受到政府補助，以確保國家食品安全。",diff:3,unit:"P4L1"},
  {id:408,word:"interfere",ph:"/ˌɪntəˈfɪə/",pos:"v.",en:"to involve oneself in a situation without invitation",zh:"干預；妨礙",ex:"Proponents of laissez-faire economics state that governments should not interfere in free markets.",exZh:"自由放任經濟的擁護者聲稱政府不應干預自由市場。",diff:3,unit:"P4L1"},
  {id:409,word:"cripple",ph:"/ˈkrɪpl/",pos:"v.",en:"to cause serious damage or weakness to something",zh:"削弱；使癱瘓",ex:"Countries need good infrastructure to avoid crippling local companies' ability to get goods to market.",exZh:"各國需要良好的基礎設施，以避免削弱地方企業把商品推向市場的能力。",diff:4,unit:"P4L1"},
  {id:410,word:"financial",ph:"/faɪˈnænʃəl/",pos:"adj.",en:"relating to money or finance",zh:"財務的；金融的",ex:"Long-term unemployment may cause financial anxiety in unsuccessful job seekers.",exZh:"長期失業可能會導致不成功的求職者財務上的焦慮。",diff:3,unit:"P4L1"},
  {id:411,word:"catering",ph:"/ˈkeɪtərɪŋ/",pos:"adj.",en:"relating to the provision of food and drink services",zh:"餐飲的；飲食服務的",ex:"The catering industry is one of the prime beneficiaries of a boost in tourism.",exZh:"餐飲業是旅遊業推動中的主要受益者之一。",diff:3,unit:"P4L1"},
  {id:412,word:"agricultural",ph:"/ˌæɡrɪˈkʌltʃərəl/",pos:"adj.",en:"relating to farming and the cultivation of land",zh:"農業的；農業相關的",ex:"Without agricultural subsidies, many farmers would not be able to earn a living.",exZh:"沒有農業補助，許多農民將無法謀生。",diff:3,unit:"P4L1"},
  {id:413,word:"merchant-friendly",ph:"/ˈmɜːtʃəntˈfrendli/",pos:"adj.",en:"having policies that support commerce and business",zh:"商業友好的；對商業有利的",ex:"Merchant-friendly policies help countries to attract overseas investment and boost employment.",exZh:"商業友好政策有助於各國吸引海外投資以及促進就業。",diff:4,unit:"P4L1"},
  {id:414,word:"hospitality",ph:"/ˌhɒspɪˈtælɪti/",pos:"n.",en:"the business of providing food, drink, and accommodation",zh:"餐旅；好客款待",ex:"The hospitality sector would be the first to benefit from an uptick in tourism.",exZh:"餐旅業將會是第一個從旅遊業的興旺中受惠的行業。",diff:4,unit:"P4L1"},
  {id:415,word:"tourism",ph:"/ˈtʊərɪzəm/",pos:"n.",en:"the commercial organisation of holidays and travel",zh:"旅遊；觀光業",ex:"The tourism industry is vital for the economy of some countries.",exZh:"旅遊業對某些國家的經濟至關重要。",diff:2,unit:"P4L1"},
  {id:416,word:"manufacturing",ph:"/ˌmænjʊˈfæktʃərɪŋ/",pos:"n.",en:"the process of making goods in large quantities",zh:"製造業；製造",ex:"The threat of automation means that many modern jobs in manufacturing will soon become obsolete.",exZh:"自動化的威脅意味著許多製造業的現代工作很快就會過時。",diff:3,unit:"P4L1"},
  {id:417,word:"enterprise",ph:"/ˈentəpraɪz/",pos:"n.",en:"a business or company",zh:"企業；公司",ex:"Artificial intelligence is helping more and more enterprises function with greater efficiency.",exZh:"人工智慧正在幫助愈來愈多的企業以更高的效率運作。",diff:3,unit:"P4L1"},
  // P4L2 Employment 就業
  {id:418,word:"seek",ph:"/siːk/",pos:"v.",en:"to try to find or obtain something",zh:"尋找；謀求",ex:"Many college graduates spend years seeking a good job.",exZh:"許多大學畢業生花了好幾年時間尋找一份好工作。",diff:2,unit:"P4L2"},
  {id:419,word:"downsize",ph:"/ˈdaʊnsaɪz/",pos:"v.",en:"to reduce the size or workforce of a company",zh:"縮減；裁員",ex:"When companies need to cut back on costs, they usually downsize their workforce.",exZh:"當公司需要削減成本時，它們通常會縮減它們的勞動力。",diff:3,unit:"P4L2"},
  {id:420,word:"resign",ph:"/rɪˈzaɪn/",pos:"v.",en:"to voluntarily leave a job or position",zh:"辭職；辭去",ex:"Many workers often resign over poor working conditions.",exZh:"許多勞工常常因為工作條件不佳而辭職。",diff:2,unit:"P4L2"},
  {id:421,word:"retain",ph:"/rɪˈteɪn/",pos:"v.",en:"to keep someone in a position or employment",zh:"留住；保留",ex:"Good companies value their workers, and do all they can to retain them.",exZh:"好的公司重視他們的員工，並會盡力留住他們。",diff:3,unit:"P4L2"},
  {id:422,word:"secure",ph:"/sɪˈkjʊə/",pos:"v.",en:"to obtain something, especially with difficulty",zh:"獲得；確保得到",ex:"Good jobs are hard to come by and candidates must work hard to secure a desired position.",exZh:"好的工作很難得到，求職者必須努力以獲得理想的職位。",diff:3,unit:"P4L2"},
  {id:423,word:"blue-collar",ph:"/ˌbluːˈkɒlər/",pos:"adj.",en:"relating to manual or industrial workers",zh:"藍領階級的；勞工的",ex:"Blue-collar work is often stigmatised by society as low-paid and low-skilled.",exZh:"藍領階級的工作經常被社會汙衊為是低薪和低技能的。",diff:3,unit:"P4L2"},
  {id:424,word:"freelance",ph:"/ˈfriːlɑːns/",pos:"adj.",en:"working independently for different employers",zh:"從事自由職業的；自由接案的",ex:"More people are now turning to freelance work to supplement their monthly income.",exZh:"愈來愈多人正在開始轉向自由職業工作以補貼他們的月收入。",diff:3,unit:"P4L2"},
  {id:425,word:"laborious",ph:"/ləˈbɔːriəs/",pos:"adj.",en:"requiring considerable effort and time",zh:"費力的；辛苦的",ex:"In many industrialised countries, immigrants usually undertake laborious tasks.",exZh:"在許多工業化國家，移民通常從事費力的工作。",diff:4,unit:"P4L2"},
  {id:426,word:"white-collar",ph:"/ˌhwaɪtˈkɒlər/",pos:"adj.",en:"relating to professional or office workers",zh:"白領階級的；辦公室的",ex:"Many college graduates dream of a white-collar position with a large company.",exZh:"許多大學畢業生都夢想在一家大公司裡的白領職位。",diff:3,unit:"P4L2"},
  {id:427,word:"department",ph:"/dɪˈpɑːtmənt/",pos:"n.",en:"a division of an organisation dealing with a specific area",zh:"部門；科",ex:"A person who influenced me a lot is the head of my department at my last job.",exZh:"一個對我影響很大的人是在我前一份工作中的部門主管。",diff:2,unit:"P4L2"},
  {id:428,word:"employer",ph:"/ɪmˈplɔɪər/",pos:"n.",en:"a person or company that employs workers",zh:"雇主；僱用者",ex:"Some employers wish to keep in touch with employees outside of work.",exZh:"一些雇主希望在工作之外與員工保持聯繫。",diff:2,unit:"P4L2"},
  {id:429,word:"workaholic",ph:"/ˌwɜːkəˈhɒlɪk/",pos:"n.",en:"a person who works excessively and compulsively",zh:"工作狂",ex:"Some European countries limit their citizens' working hours to deter a workaholic culture.",exZh:"一些歐洲國家限制他們公民的工作時間，以抑止工作狂的文化。",diff:4,unit:"P4L2"},
  {id:430,word:"greenhorn",ph:"/ˈɡriːnhɔːn/",pos:"n.",en:"a person who is new and inexperienced",zh:"新手；菜鳥",ex:"When I first started work, I was a real greenhorn.",exZh:"當我開始工作時，我是一個真正的新手。",diff:3,unit:"P4L2"},
  // P4L3 Human Resources 人力資源
  {id:431,word:"administrate",ph:"/ədˈmɪnɪstreɪt/",pos:"v.",en:"to manage and organise the affairs of an organisation",zh:"管理；行政管理",ex:"It is the responsibility of the human resources department to administrate staff-related issues.",exZh:"管理員工相關事宜是人力資源部門的責任。",diff:4,unit:"P4L3"},
  {id:432,word:"allocate",ph:"/ˈæləkeɪt/",pos:"v.",en:"to distribute resources for a specific purpose",zh:"分配；撥出",ex:"Allocating a sufficient amount of funding to staff training enhances work performance.",exZh:"為員工培訓分配足夠的資金可提升工作績效。",diff:3,unit:"P4L3"},
  {id:433,word:"appoint",ph:"/əˈpɔɪnt/",pos:"v.",en:"to assign someone to a role or position",zh:"任命；指派",ex:"In cases of conflict between staff members, a mediator may be appointed by a company.",exZh:"如果員工之間發生衝突，調解人可由公司任命。",diff:2,unit:"P4L3"},
  {id:434,word:"oversee",ph:"/ˌəʊvəˈsiː/",pos:"v.",en:"to watch over and direct the execution of a task",zh:"監督；監管",ex:"A human resource manager would traditionally oversee conflicts between employees.",exZh:"人力資源經理通常會監督員工之間的衝突。",diff:3,unit:"P4L3"},
  {id:435,word:"quality",ph:"/ˈkwɒlɪti/",pos:"adj.",en:"of a high standard; excellent",zh:"高品質的；優質的",ex:"Companies must ensure that employees continually meet high quality standards.",exZh:"公司必須確保員工持續達到高品質水準。",diff:2,unit:"P4L3"},
  {id:436,word:"comprehensive",ph:"/ˌkɒmprɪˈhensɪv/",pos:"adj.",en:"complete; covering all aspects",zh:"綜合性的；全面的",ex:"A comprehensive new study has tied employee performance to happiness levels.",exZh:"一項綜合性的新研究把員工績效與幸福程度聯繫起來。",diff:4,unit:"P4L3"},
  {id:437,word:"precise",ph:"/prɪˈsaɪs/",pos:"adj.",en:"exact and accurate in every detail",zh:"精確的；準確的",ex:"Precise employee records are necessary to track performance.",exZh:"精確的員工記錄對於追蹤績效是必要的。",diff:3,unit:"P4L3"},
  {id:438,word:"strategic",ph:"/strəˈtiːdʒɪk/",pos:"adj.",en:"relating to achieving long-term goals",zh:"戰略的；戰略性的",ex:"The best companies have a strategic plan to find and recruit top talent.",exZh:"最優秀的公司都有找尋和招聘頂尖人才的戰略計畫。",diff:4,unit:"P4L3"},
  {id:439,word:"benefit",ph:"/ˈbenɪfɪt/",pos:"n.",en:"an advantage or positive outcome",zh:"好處；福利",ex:"There are many businesspeople who feel that too many meetings offer few benefits.",exZh:"有很多商界人士認為太多的會議不太會提供好處。",diff:2,unit:"P4L3"},
  {id:440,word:"guideline",ph:"/ˈɡaɪdlaɪn/",pos:"n.",en:"a rule or instruction giving practical guidance",zh:"準則；指導方針",ex:"Government guidelines for handling workplace disputes aim to ensure conflicts are dealt with equitably.",exZh:"政府對於處理職場糾紛的準則旨在確保衝突被公平處理。",diff:3,unit:"P4L3"},
  {id:441,word:"probation",ph:"/prəʊˈbeɪʃən/",pos:"n.",en:"a trial period to assess suitability for a position",zh:"試用；緩刑",ex:"A probation period may be assigned to new personnel to assess their suitability for a position.",exZh:"可以為新員工分配試用期，以評估他們對某一職位的合適性。",diff:4,unit:"P4L3"},
  {id:442,word:"redundancy",ph:"/rɪˈdʌndənsi/",pos:"n.",en:"the state of being dismissed as no longer needed",zh:"裁員；冗員",ex:"In the manufacturing industry, job redundancy is becoming a major issue.",exZh:"在製造業中，工作裁員正成為一個重大問題。",diff:4,unit:"P4L3"},
  // P4L4 Unions 工會
  {id:443,word:"represent",ph:"/ˌreprɪˈzent/",pos:"v.",en:"to act or speak officially on behalf of someone",zh:"象徵；代表",ex:"A trade union represents the rights of workers who group together to give themselves a voice.",exZh:"工會象徵了為聚集起來為自己發聲之員工們的權利。",diff:2,unit:"P4L4"},
  {id:444,word:"allege",ph:"/əˈledʒ/",pos:"v.",en:"to claim without proof that someone has done something wrong",zh:"指控；聲稱",ex:"Examples of company misconduct alleged by workers include racial discrimination and pension issues.",exZh:"員工指控公司不當行為的案例包括種族歧視和養老金問題。",diff:4,unit:"P4L4"},
  {id:445,word:"manipulate",ph:"/məˈnɪpjuleɪt/",pos:"v.",en:"to control or influence someone in a clever or unfair way",zh:"操控；操縱",ex:"A common complaint against large corporations is manipulating wages to cut labour costs.",exZh:"一個對大公司的普遍抱怨是操控薪資以削減勞動力成本。",diff:3,unit:"P4L4"},
  {id:446,word:"strike",ph:"/straɪk/",pos:"v.",en:"to refuse to work as a form of protest",zh:"罷工；停工",ex:"If workers strike, it can affect an entire company's ability to operate.",exZh:"如果員工罷工，它會影響整個公司的經營能力。",diff:2,unit:"P4L4"},
  {id:447,word:"corporate",ph:"/ˈkɔːpərɪt/",pos:"adj.",en:"relating to a large company or business",zh:"公司的；企業的",ex:"Employees deserve a say on corporate decisions that affect every member of staff.",exZh:"員工對於影響每個人員的公司決策應有發言權。",diff:3,unit:"P4L4"},
  {id:448,word:"targeted",ph:"/ˈtɑːɡɪtɪd/",pos:"adj.",en:"directed specifically at a particular group",zh:"針對性的；有針對的",ex:"Targeted discrimination is a problem for many female workers who are often paid less than male employees.",exZh:"針對性的歧視是許多薪水往往低於男性員工之女性工作者的一個問題。",diff:3,unit:"P4L4"},
  {id:449,word:"tight",ph:"/taɪt/",pos:"adj.",en:"strictly controlled; limited in amount",zh:"緊縮的；拮据的",ex:"As budgets become tighter, workers' wages are being cut and many more members of staff are being made redundant.",exZh:"隨著預算愈來愈緊縮，工人的薪資正被削減，更多員工被裁。",diff:2,unit:"P4L4"},
  {id:450,word:"retroactive",ph:"/ˌretrəʊˈæktɪv/",pos:"adj.",en:"taking effect from a date in the past",zh:"補發工資的；追溯的",ex:"Following negotiations between management and employees, reparations may be paid as retroactive pay.",exZh:"在管理層和員工的談判後，可能會支付補發工資作為賠償。",diff:5,unit:"P4L4"},
  {id:451,word:"attention",ph:"/əˈtenʃən/",pos:"n.",en:"notice or awareness given to something",zh:"注意；關注",ex:"Country-wide strikes are a last resort to garner national attention to worker issues.",exZh:"全國性的罷工是爭取全國關注勞工議題的最後手段。",diff:2,unit:"P4L4"},
  {id:452,word:"complaint",ph:"/kəmˈpleɪnt/",pos:"n.",en:"a statement of dissatisfaction or wrongdoing",zh:"抱怨；投訴",ex:"Poor wages are perhaps the most common complaint dealt with by unions.",exZh:"低薪或許是工會最常處理的抱怨。",diff:2,unit:"P4L4"},
  {id:453,word:"petition",ph:"/pɪˈtɪʃən/",pos:"n.",en:"a formal request signed by many people",zh:"請願書；請願",ex:"Petitions are circulated in a company to gather support for employee demands.",exZh:"請願書在公司內流通，以聚集對員工需求的支持。",diff:3,unit:"P4L4"},
  {id:454,word:"protest",ph:"/ˈprəʊtest/",pos:"n.",en:"a statement or action expressing disapproval",zh:"抗議；異議",ex:"Unfair work practices are the primary cause of protest among company employees.",exZh:"不公平的工作實務是公司員工中抗議的主要原因。",diff:2,unit:"P4L4"},
  // P4L5 Conditions 條件
  {id:455,word:"apply",ph:"/əˈplaɪ/",pos:"v.",en:"to make a formal request for something",zh:"申請；應徵",ex:"It is important to apply for a position before the deadline written in the job offer.",exZh:"在工作錄用書中寫明的截止日期前申請一個職位是很重要的。",diff:2,unit:"P4L5"},
  {id:456,word:"demand",ph:"/dɪˈmɑːnd/",pos:"v.",en:"to firmly ask for something as a right",zh:"要求；需求",ex:"If perceived as unfair, workers may protest to demand better working conditions.",exZh:"如果被認為不公平，勞工可能會抗議以要求改善工作條件。",diff:2,unit:"P4L5"},
  {id:457,word:"ensure",ph:"/ɪnˈʃʊə/",pos:"v.",en:"to make certain that something happens",zh:"確保；保證",ex:"A good contract ensures both employer and employee clearly understand the terms of employment.",exZh:"一份良好的合約確保雇主和雇員都清楚瞭解雇用條款。",diff:2,unit:"P4L5"},
  {id:458,word:"strive",ph:"/straɪv/",pos:"v.",en:"to make great efforts to achieve something",zh:"努力；力爭",ex:"In return for a monthly salary, employees are obligated to strive for excellence in their work.",exZh:"員工有義務努力在工作中追求卓越以作為月薪的回報。",diff:3,unit:"P4L5"},
  {id:459,word:"temporary",ph:"/ˈtempərəri/",pos:"adj.",en:"lasting for a limited time only",zh:"臨時的；暫時的",ex:"Temporary workers receive fewer benefits than full-time staff.",exZh:"臨時工享受的福利遠少於全職員工。",diff:2,unit:"P4L5"},
  {id:460,word:"adverse",ph:"/ˈædvɜːs/",pos:"adj.",en:"preventing success or harmful in effect",zh:"有害的；不利的",ex:"Working night shifts over the long term may easily result in adverse health effects.",exZh:"長期上夜班可能容易導致健康上不良的影響。",diff:3,unit:"P4L5"},
  {id:461,word:"contractual",ph:"/kənˈtræktʃuəl/",pos:"adj.",en:"agreed on and stated in a contract",zh:"合約的；契約上的",ex:"Employees are expected to fulfil their contractual obligations to the best of their abilities.",exZh:"員工應最大努力履行他們的合約義務。",diff:4,unit:"P4L5"},
  {id:462,word:"unsociable",ph:"/ʌnˈsəʊʃəbl/",pos:"adj.",en:"not conforming to normal social hours",zh:"非社交的；不合群的",ex:"Shift work requires people to work unsociable hours that are seldom popular with a workforce.",exZh:"輪班工作要求人們在非社交時間上班，這很少受到勞動人口的歡迎。",diff:4,unit:"P4L5"},
  {id:463,word:"shift",ph:"/ʃɪft/",pos:"n.",en:"a period of work hours in a rotating schedule",zh:"輪班；班次",ex:"It is much easier to attract talent if a company has established eight-hour shifts.",exZh:"如果公司建立了八小時輪班制，會更容易吸引人才。",diff:2,unit:"P4L5"},
  {id:464,word:"expertise",ph:"/ˌekspɜːˈtiːz/",pos:"n.",en:"expert skill or knowledge in a field",zh:"專業知識；專長",ex:"Staff members may be required to undergo regular training to expand their areas of expertise.",exZh:"工作人員可能需要接受定期培訓，以擴大他們的專業知識領域。",diff:3,unit:"P4L5"},
  {id:465,word:"pension",ph:"/ˈpenʃən/",pos:"n.",en:"a regular payment made after retirement",zh:"養老金；退休金",ex:"In most cases, full-time employment includes making monthly contributions towards a pension.",exZh:"在大多數情況下，全職工作包括每月繳納養老金。",diff:2,unit:"P4L5"},
  {id:466,word:"perquisite",ph:"/ˈpɜːkwɪzɪt/",pos:"n.",en:"a benefit received in addition to regular pay",zh:"額外津貼；附加福利",ex:"Companies offer perquisites as a means to attract the best job candidates to apply for new positions.",exZh:"公司提供額外津貼作為吸引最優秀求職者申請新職位的手段。",diff:5,unit:"P4L5"},
  // P4L6 Work Ethics 職業道德
  {id:467,word:"behave",ph:"/bɪˈheɪv/",pos:"v.",en:"to act in a particular way",zh:"舉止；表現",ex:"It is not unreasonable to expect all staff to behave ethically towards one another.",exZh:"期待所有員工對彼此舉止合乎道德操守並非不合理。",diff:2,unit:"P4L6"},
  {id:468,word:"demonstrate",ph:"/ˈdemənstreɪt/",pos:"v.",en:"to clearly show or prove something",zh:"演示；表現出",ex:"Employees should demonstrate a strong work ethic to achieve long-term and short-term career goals.",exZh:"員工應表現出強烈的職業道德，以實現長期和短期的職業目標。",diff:2,unit:"P4L6"},
  {id:469,word:"recognise",ph:"/ˈrekəɡnaɪz/",pos:"v.",en:"to identify and acknowledge something",zh:"認識；認可",ex:"Happy employees recognise the importance of a work-life balance.",exZh:"快樂的員工認識到工作和生活平衡的重要性。",diff:2,unit:"P4L6"},
  {id:470,word:"devote",ph:"/dɪˈvəʊt/",pos:"v.",en:"to give time or effort to a particular activity",zh:"致力於；奉獻",ex:"Good teamwork entails understanding that all members must devote themselves equally to a task.",exZh:"良好的團隊合作需要有所有成員必須同等致力於一個任務的領會。",diff:3,unit:"P4L6"},
  {id:471,word:"efficient",ph:"/ɪˈfɪʃənt/",pos:"adj.",en:"working productively with minimum wasted effort",zh:"有效率的；高效的",ex:"Prioritising tasks and following a work schedule may help staff become more efficient.",exZh:"確定任務的優先順序並遵循工作時程表可以幫助員工變得更有效率。",diff:2,unit:"P4L6"},
  {id:472,word:"consistent",ph:"/kənˈsɪstənt/",pos:"adj.",en:"acting or performing in the same way over time",zh:"一致的；始終如一的",ex:"Having a high standard of professionalism at work leads to consistent and high-quality work.",exZh:"在工作中具備高標準的專業精神，可帶來一致且高品質的工作成果。",diff:3,unit:"P4L6"},
  {id:473,word:"courteous",ph:"/ˈkɜːtiəs/",pos:"adj.",en:"polite and respectful in behaviour",zh:"有禮貌的；殷勤的",ex:"It costs nothing to be courteous to staff members and those around you.",exZh:"對員工和周遭的人彬彬有禮並不需要花錢。",diff:3,unit:"P4L6"},
  {id:474,word:"determinate",ph:"/dɪˈtɜːmɪnɪt/",pos:"adj.",en:"having exact and definite limits or goals",zh:"明確的；確定的",ex:"The manager emphasised the need for determinate goals to ensure the project's success.",exZh:"經理強調了制定明確目標以確保專案成功的必要性。",diff:4,unit:"P4L6"},
  {id:475,word:"obligation",ph:"/ˌɒblɪˈɡeɪʃən/",pos:"n.",en:"a duty or commitment one is required to fulfil",zh:"義務；責任",ex:"Contracts typically set out the obligations that new staff should adhere to.",exZh:"合約通常說明了新員工應遵守的義務。",diff:3,unit:"P4L6"},
  {id:476,word:"productivity",ph:"/ˌprɒdʌkˈtɪvɪti/",pos:"n.",en:"the efficiency of production or work output",zh:"生產力；生產率",ex:"Benchmarking allows companies to keep track of productivity gains and losses.",exZh:"基準評鑑讓公司能夠追蹤生產力的收益和損失。",diff:4,unit:"P4L6"},
  {id:477,word:"responsibility",ph:"/rɪˌspɒnsəˈbɪlɪti/",pos:"n.",en:"the state of being accountable for something",zh:"責任；職責",ex:"Employers look for recruits who can take responsibility for their behaviours.",exZh:"雇主尋找能夠對自己行為負責的新員工。",diff:3,unit:"P4L6"},
  {id:478,word:"dependability",ph:"/dɪˌpendəˈbɪlɪti/",pos:"n.",en:"the quality of being reliable and trustworthy",zh:"可靠性；值得信賴",ex:"Inspiring others and having dependability are core values of all great leaders.",exZh:"激勵他人及具有可靠性，是所有偉大領袖的核心價值。",diff:4,unit:"P4L6"},
  // P4L7 Motivation 動機
  {id:479,word:"contribute",ph:"/kənˈtrɪbjuːt/",pos:"v.",en:"to give or add something to a shared goal",zh:"貢獻；促成",ex:"A person will contribute more to a company when the values of both parties are aligned.",exZh:"當雙方價值觀一致時，一個人將會對公司貢獻更多。",diff:3,unit:"P4L7"},
  {id:480,word:"lack",ph:"/læk/",pos:"v.",en:"to be without or deficient in something",zh:"缺乏；缺少",ex:"Unclear expectations or goals in the workplace may cause workers to lack self-efficacy.",exZh:"工作場所中不明確的期望或目標可能導致勞工缺乏自我效能感。",diff:2,unit:"P4L7"},
  {id:481,word:"promote",ph:"/prəˈməʊt/",pos:"v.",en:"to further the progress or growth of something",zh:"促進；推動",ex:"A shared sense of purpose at a company promotes teamwork and employees' engagement with their work.",exZh:"公司的共同使命感可促進團隊合作以及員工對於自己工作的投入。",diff:2,unit:"P4L7"},
  {id:482,word:"succeed",ph:"/səkˈsiːd/",pos:"v.",en:"to achieve a desired aim or result",zh:"成功；達成",ex:"Staff motivation is crucial to allow management to succeed in meeting goals.",exZh:"員工的積極性對於讓管理階層成功達成目標至關重要。",diff:2,unit:"P4L7"},
  {id:483,word:"promising",ph:"/ˈprɒmɪsɪŋ/",pos:"adj.",en:"showing signs of future success",zh:"有前途的；有希望的",ex:"Offering a promising career path stimulates high-achieving workers.",exZh:"提供一條有前途的職業道路可以激勵高成就的員工。",diff:3,unit:"P4L7"},
  {id:484,word:"straightforward",ph:"/ˌstreɪtˈfɔːwəd/",pos:"adj.",en:"uncomplicated; direct and easy to understand",zh:"直接的；簡單明瞭的",ex:"Increasing an employee's sense of purpose leads to greater job satisfaction than straightforward cash rewards.",exZh:"提高員工的使命感比直接的現金獎勵更能帶來較高的工作滿意度。",diff:3,unit:"P4L7"},
  {id:485,word:"avid",ph:"/ˈævɪd/",pos:"adj.",en:"having a keen interest or enthusiasm",zh:"熱衷的；熱切的",ex:"Good leaders are often well-educated and understandably avid readers.",exZh:"優秀的領導者通常受過良好教育，而且往往是熱衷閱讀的人，這是可以理解的。",diff:3,unit:"P4L7"},
  {id:486,word:"underlying",ph:"/ˌʌndəˈlaɪɪŋ/",pos:"adj.",en:"forming a basis or cause that is not obvious",zh:"根本的；潛在的",ex:"One of the primary underlying reasons for job burnout is high levels of stress at work.",exZh:"職業倦怠的主要根本原因之一是工作壓力大。",diff:4,unit:"P4L7"},
  {id:487,word:"salary",ph:"/ˈsæləri/",pos:"n.",en:"fixed regular payment for employment",zh:"薪水；薪資",ex:"Increases in employee motivation are not always linked to salary gains.",exZh:"員工積極性的提高不一定總是與薪水增加有關。",diff:2,unit:"P4L7"},
  {id:488,word:"satisfaction",ph:"/ˌsætɪsˈfækʃən/",pos:"n.",en:"the feeling of contentment from achieving something",zh:"滿意度；滿足感",ex:"Employee satisfaction is important in an organisation.",exZh:"一個組織內的員工滿意度至關重要。",diff:2,unit:"P4L7"},
  {id:489,word:"incentive",ph:"/ɪnˈsentɪv/",pos:"n.",en:"something that motivates someone to take action",zh:"激勵；誘因",ex:"While work incentives are important, a positive work environment has a greater effect on worker productivity.",exZh:"雖然工作激勵措施很重要，但積極的工作環境對員工生產力有更大影響。",diff:3,unit:"P4L7"},
  {id:490,word:"momentum",ph:"/məʊˈmentəm/",pos:"n.",en:"the driving force gained from a series of events",zh:"動力；勢頭",ex:"Providing opportunities for people to succeed at work creates the momentum needed for further successes.",exZh:"為人們提供工作成功的機會，創造了進一步成功所需的動力。",diff:4,unit:"P4L7"},
  // P4L8 Meetings 會議
  {id:491,word:"address",ph:"/əˈdres/",pos:"v.",en:"to deal with or speak about a matter",zh:"處理；談及",ex:"A productive meeting is one in which every attendee has the chance to address their concerns.",exZh:"一個富有成效的會議，是每位出席者都有機會處理自身問題的會議。",diff:2,unit:"P4L8"},
  {id:492,word:"convene",ph:"/kənˈviːn/",pos:"v.",en:"to formally bring people together for a meeting",zh:"召開；召集",ex:"One primary reason to convene a meeting is to provide information to all staff members.",exZh:"召開會議的一項主要原因是向所有員工提供資訊。",diff:3,unit:"P4L8"},
  {id:493,word:"preside",ph:"/prɪˈzaɪd/",pos:"v.",en:"to be in charge of a meeting or ceremony",zh:"主持；主導",ex:"Presiding over a meeting or conference requires careful planning to ensure success.",exZh:"主持會議或討論會需要仔細規劃才能確保成功。",diff:3,unit:"P4L8"},
  {id:494,word:"adjourn",ph:"/əˈdʒɜːn/",pos:"v.",en:"to suspend or end a meeting until a later time",zh:"使中止；休會",ex:"Formal and informal meetings are typically adjourned in different ways.",exZh:"正式和非正式的會議通常都會以不同方式結束。",diff:4,unit:"P4L8"},
  {id:495,word:"decisive",ph:"/dɪˈsaɪsɪv/",pos:"adj.",en:"settling a matter quickly and clearly",zh:"果斷的；決定性的",ex:"Short, decisive meetings stick to an agenda and avoid protracted debates.",exZh:"簡短、果斷的會議堅持在一個議程，並避免持久的辯論。",diff:3,unit:"P4L8"},
  {id:496,word:"routine",ph:"/ruːˈtiːn/",pos:"adj.",en:"done as a regular and fixed procedure",zh:"例行的；常規的",ex:"For many organisations, morning meetings are a routine way to set daily agendas.",exZh:"對許多機構來說，晨會是制定日常議程的例行公事。",diff:2,unit:"P4L8"},
  {id:497,word:"futile",ph:"/ˈfjuːtaɪl/",pos:"adj.",en:"incapable of producing any useful result",zh:"無用的；徒勞的",ex:"While the majority of staff view regular meetings as futile, the problem is simple to rectify.",exZh:"雖然大多數員工認為定期會議是無用的，但問題很容易可以改正。",diff:4,unit:"P4L8"},
  {id:498,word:"preparatory",ph:"/prɪˈpærətəri/",pos:"adj.",en:"done in order to prepare for something",zh:"預備的；準備的",ex:"Preparatory meetings may be held before major official ones to review what decisions need making.",exZh:"預備會議可以在主要正式會議之前舉行，以查查需要做哪些決定。",diff:4,unit:"P4L8"},
  {id:499,word:"agenda",ph:"/ədʒˈendə/",pos:"n.",en:"a list of items to be discussed at a meeting",zh:"議程；議事日程",ex:"A clear agenda is necessary so that all attendees know what to expect.",exZh:"一個明確的議程是必要的，好讓所有出席者知悉有何期待。",diff:2,unit:"P4L8"},
  {id:500,word:"attendee",ph:"/əˈtendiː/",pos:"n.",en:"a person who attends a meeting or event",zh:"出席者；與會者",ex:"All meeting attendees should have a clear idea of the agenda and scope before attending.",exZh:"所有會議出席者在出席前都應清楚瞭解議程和範圍。",diff:3,unit:"P4L8"},
  {id:501,word:"likelihood",ph:"/ˈlaɪklɪhʊd/",pos:"n.",en:"the probability that something will happen",zh:"可能性；機率",ex:"In all likelihood, having excessive meetings to increase productivity would only be counterproductive.",exZh:"開過多會議來提高生產力很有可能只會適得其反。",diff:3,unit:"P4L8"},
  {id:502,word:"output",ph:"/ˈaʊtpʊt/",pos:"n.",en:"the amount of something produced",zh:"產出；輸出",ex:"New evidence suggests that holding meetings while walking increases creative output.",exZh:"新證據顯示，邊走路邊開會可以增加創意產出。",diff:2,unit:"P4L8"},

  // ── P6 Culture and Communication 文化與傳播 ──────────────────
  // P6L1 Religion 宗教
  {id:503,word:"confess",ph:"/kənˈfes/",pos:"v.",en:"to admit to something one feels guilty about",zh:"承認；坦白",ex:"Although I enjoy attending church, I must confess that I seldom go.",exZh:"雖然我喜歡上教堂，但我必須承認我很少去。",diff:2,unit:"P6L1"},
  {id:504,word:"vow",ph:"/vaʊ/",pos:"v.",en:"to make a solemn promise or commitment",zh:"發誓；許下誓言",ex:"Some people vow to lead a better life according to certain prescribed tenets.",exZh:"有些人發誓要依據某些信條過一個更好的生活。",diff:2,unit:"P6L1"},
  {id:505,word:"worship",ph:"/ˈwɔːʃɪp/",pos:"v.",en:"to show reverence and adoration for a deity",zh:"崇拜；敬奉",ex:"With regard to modern religions, the majority have followers who worship only one deity.",exZh:"在現代宗教中，大多數信徒僅崇拜一位神。",diff:2,unit:"P6L1"},
  {id:506,word:"renounce",ph:"/rɪˈnaʊns/",pos:"v.",en:"to formally give up or reject something",zh:"放棄；拋棄",ex:"Monks must renounce all worldly possessions in order to live a life as an ascetic.",exZh:"為了過苦行者的生活，僧侶必須放棄所有世俗財產。",diff:4,unit:"P6L1"},
  {id:507,word:"ritual",ph:"/ˈrɪtjuəl/",pos:"adj.",en:"relating to or done as a religious or solemn rite",zh:"儀式的；典禮的",ex:"People may see the ritual practices of their faith as bringing order to their life.",exZh:"人們可能認為他們信仰的儀式實踐為他們的生活帶來秩序。",diff:3,unit:"P6L1"},
  {id:508,word:"superstitious",ph:"/ˌsjuːpəˈstɪʃəs/",pos:"adj.",en:"having excessive belief in the supernatural",zh:"迷信的；好信迷信的",ex:"Research indicates that the poorer a nation is, the more strongly its people follow superstitious beliefs.",exZh:"研究指出，一個國家愈貧窮，其百姓就愈堅定地信奉迷信思想。",diff:4,unit:"P6L1"},
  {id:509,word:"tribal",ph:"/ˈtraɪbəl/",pos:"adj.",en:"relating to a tribe or tribal society",zh:"部落的；部族的",ex:"Despite the popularity of mainstream religions, tribal beliefs still persist in many places.",exZh:"儘管主流宗教的普及，部落信仰仍然存在許多地方。",diff:3,unit:"P6L1"},
  {id:510,word:"pagan",ph:"/ˈpeɪɡən/",pos:"adj.",en:"relating to a religion with many gods",zh:"多神教的；異教的",ex:"Pagan religions are still widely followed all over the globe.",exZh:"多神教在全球各地仍廣受信奉。",diff:3,unit:"P6L1"},
  {id:511,word:"Buddhism",ph:"/ˈbʊdɪzəm/",pos:"n.",en:"the religion founded by Siddhartha Gautama",zh:"佛教",ex:"Buddhism and vegetarianism often go hand in hand, but there are many Buddhists who do eat meat.",exZh:"佛教經常與素食主義密切相關，但仍有許多佛教徒會吃肉。",diff:2,unit:"P6L1"},
  {id:512,word:"Christian",ph:"/ˈkrɪstʃən/",pos:"n.",en:"a follower of the religion based on Jesus Christ",zh:"基督教；基督徒",ex:"Christians form the most populous religious group in the world.",exZh:"基督徒構成了世界上人口最多的宗教團體。",diff:2,unit:"P6L1"},
  {id:513,word:"Hinduism",ph:"/ˈhɪndʊɪzəm/",pos:"n.",en:"the dominant religion of India with many deities",zh:"印度教",ex:"In Hinduism, a caste system divides society based on occupation and family lineage.",exZh:"在印度教中，種姓制度根據職業和家族血統來劃分社會。",diff:3,unit:"P6L1"},
  {id:514,word:"Islam",ph:"/ˈɪzlɑːm/",pos:"n.",en:"the religion of Muslims, based on the Quran",zh:"伊斯蘭教",ex:"There are many misconceptions regarding Islam around the world.",exZh:"世界各地對伊斯蘭教有許多誤解。",diff:2,unit:"P6L1"},
  {id:515,word:"Taoism",ph:"/ˈtaʊɪzəm/",pos:"n.",en:"a Chinese philosophy emphasising harmony with nature",zh:"道教",ex:"Meditation and the art of mindfulness is an important aspect of Taoism.",exZh:"冥想和正念的藝術是道教很重要的一部分。",diff:3,unit:"P6L1"},
  // P6L2 Festival 節日
  {id:516,word:"attract",ph:"/əˈtrækt/",pos:"v.",en:"to cause someone to come to a place or event",zh:"吸引；引起興趣",ex:"Local festivals may attract crowds of tourists, but many feel this dilutes the cultural significance of the event.",exZh:"地方的節慶或許吸引大批遊客，但是很多人覺得這會削弱活動的文化意義。",diff:2,unit:"P6L2"},
  {id:517,word:"celebrate",ph:"/ˈselɪbreɪt/",pos:"v.",en:"to mark a special occasion with enjoyable activities",zh:"慶祝；慶賀",ex:"Many people enjoy celebrating festivals as a chance to dress up and socialise with loved ones.",exZh:"許多人喜歡慶祝節慶，當作是去裝扮自己並且與親人交流的一個機會。",diff:2,unit:"P6L2"},
  {id:518,word:"cheer",ph:"/tʃɪər/",pos:"v.",en:"to shout in approval or encouragement",zh:"歡呼；喝采",ex:"Music festivals are a convenient way for people to cheer for their favourite bands all in one place.",exZh:"音樂節是一個便利的方式，讓人們在同一地點為他們喜愛的樂隊歡呼。",diff:2,unit:"P6L2"},
  {id:519,word:"observe",ph:"/əbˈzɜːv/",pos:"v.",en:"to celebrate or commemorate an occasion",zh:"慶祝；紀念",ex:"National festivals, observed by citizens nationwide, serve to strengthen the patriotism of a population.",exZh:"全國性節日為全國公民所慶祝，有助於加強民眾的愛國心。",diff:2,unit:"P6L2"},
  {id:520,word:"cultural",ph:"/ˈkʌltʃərəl/",pos:"adj.",en:"relating to the ideas and customs of a society",zh:"文化的；文化上的",ex:"While festivals have clearly been commercialised, many still retain their cultural roots.",exZh:"儘管節日已經明顯商業化，許多仍然保留著其文化根源。",diff:2,unit:"P6L2"},
  {id:521,word:"international",ph:"/ˌɪntəˈnæʃənl/",pos:"adj.",en:"relating to more than one country",zh:"國際的；世界性的",ex:"Christmas is perhaps the world's most famous international festival.",exZh:"聖誕節也許是世界上最著名的國際節日。",diff:2,unit:"P6L2"},
  {id:522,word:"religious",ph:"/rɪˈlɪdʒəs/",pos:"adj.",en:"relating to religion or belief in a god",zh:"宗教的；虔誠的",ex:"The religious significance of many festivals is often forgotten by many attendees.",exZh:"許多節慶的宗教意義經常被參與者遺忘。",diff:2,unit:"P6L2"},
  {id:523,word:"festive",ph:"/ˈfestɪv/",pos:"adj.",en:"relating to or typical of a festival or celebration",zh:"節日的；喜慶的",ex:"One of the most exciting aspects of Chinese New Year is the festive atmosphere shared across Taiwan.",exZh:"農曆新年最令人興奮的一面是全台各地共享的節日氣氛。",diff:2,unit:"P6L2"},
  {id:524,word:"harvest",ph:"/ˈhɑːvɪst/",pos:"n.",en:"a seasonal festival celebrating crops and nature's bounty",zh:"收成；豐收節",ex:"Harvest is a seasonal festival in which people celebrate the bounties provided by nature.",exZh:"收成是季節性的節日，人們在此期間慶祝大自然的恩賜。",diff:2,unit:"P6L2"},
  {id:525,word:"carnival",ph:"/ˈkɑːnɪvəl/",pos:"n.",en:"a large festive event with entertainment and parades",zh:"嘉年華；狂歡節",ex:"Attendees of festivals like carnival can often number in the millions.",exZh:"像嘉年華這樣節慶的參加者通常能以百萬計。",diff:3,unit:"P6L2"},
  {id:526,word:"Passover",ph:"/ˈpɑːsəʊvər/",pos:"n.",en:"a Jewish festival commemorating the liberation from slavery",zh:"逾越節",ex:"Passover is important to people of the Jewish faith as it commemorates the liberation of the Jews from slavery.",exZh:"逾越節對猶太信仰的人很重要，因為它紀念猶太人從奴隸制中的解放。",diff:3,unit:"P6L2"},
  {id:527,word:"film festival",ph:"/fɪlm ˈfestɪvəl/",pos:"n.",en:"an event showcasing films to the public",zh:"電影節",ex:"Film festivals both help showcase new directors as well as support the local film community.",exZh:"電影節既有助於使新導演亮相，也有助於支持當地的電影圈。",diff:2,unit:"P6L2"},
  // P6L3 History 歷史
  {id:528,word:"trace",ph:"/treɪs/",pos:"v.",en:"to find or discover something by investigation",zh:"追蹤；追溯",ex:"It has become common to trace family lineage over the Internet through specialist websites.",exZh:"在網路上透過專業網站來追蹤家族血統已變得很普遍。",diff:2,unit:"P6L3"},
  {id:529,word:"coexist",ph:"/ˌkəʊɪɡˈzɪst/",pos:"v.",en:"to exist at the same time or in the same place",zh:"共存；並存",ex:"I would argue that traditions and technology can both coexist in modern cities.",exZh:"我會認為傳統和科技在現代城市中可以共存。",diff:3,unit:"P6L3"},
  {id:530,word:"distort",ph:"/dɪsˈtɔːt/",pos:"v.",en:"to give a false or misleading account of something",zh:"扭曲；歪曲",ex:"Television and movies tend to distort historical facts to produce a more audience-friendly narrative.",exZh:"電視和電影往往扭曲歷史事實，以產生更受觀眾歡迎的故事。",diff:3,unit:"P6L3"},
  {id:531,word:"vanish",ph:"/ˈvænɪʃ/",pos:"v.",en:"to disappear suddenly and completely",zh:"消失；消逝",ex:"It is a sad truth that by the next century, half of the world's languages will vanish.",exZh:"可悲的事實是，到了下個世紀，世界上一半的語言將會消失。",diff:2,unit:"P6L3"},
  {id:532,word:"ancient",ph:"/ˈeɪnʃənt/",pos:"adj.",en:"belonging to the very distant past",zh:"古代的；古老的",ex:"By studying ancient civilisations like the Greeks, school children gain a better understanding of the present.",exZh:"透過研究像希臘這樣的古代文明，學童能夠更深入理解當代世界。",diff:2,unit:"P6L3"},
  {id:533,word:"authentic",ph:"/ɔːˈθentɪk/",pos:"adj.",en:"real and genuine; not a copy or imitation",zh:"真實的；真正的",ex:"Students with access to authentic historical materials learn better by connecting with the past.",exZh:"可接觸到真實歷史資料的學生，藉由與過去連結而學習得更好。",diff:3,unit:"P6L3"},
  {id:534,word:"contemporary",ph:"/kənˈtempərəri/",pos:"adj.",en:"living or occurring at the same time; modern",zh:"當代的；現代的",ex:"The spread of global consumerism is a key outcome of contemporary history since 1945.",exZh:"全球消費主義的傳播是自1945年以來，當代歷史的一項重要成果。",diff:3,unit:"P6L3"},
  {id:535,word:"medieval",ph:"/ˌmediˈiːvəl/",pos:"adj.",en:"relating to the Middle Ages in Europe",zh:"中世紀的",ex:"Cambridge has lots of historical buildings and a medieval charm that tourists love.",exZh:"劍橋有許多歷史建築和遊客喜愛的中世紀魅力。",diff:3,unit:"P6L3"},
  {id:536,word:"generation",ph:"/ˌdʒenəˈreɪʃən/",pos:"n.",en:"all the people born and living at about the same time",zh:"世代；一代",ex:"It is harder for people of my grandparents' generation to understand and use computers.",exZh:"對於我祖父母世代的人，要瞭解和使用電腦是更困難的。",diff:2,unit:"P6L3"},
  {id:537,word:"heyday",ph:"/ˈheɪdeɪ/",pos:"n.",en:"the period of greatest success or popularity",zh:"全盛期；鼎盛時期",ex:"Some say that the heyday of the internal combustion engine has passed, and electric vehicles are the future.",exZh:"有人說內燃機的全盛期已經過去，電動汽車才是未來。",diff:4,unit:"P6L3"},
  {id:538,word:"millennium",ph:"/mɪˈleniəm/",pos:"n.",en:"a period of a thousand years",zh:"千禧年；千年",ex:"At the turn of the millennium in the year 2000, the Internet was becoming increasingly integral to the lives of people in developed countries.",exZh:"在兩千年的千禧年之交，網路已逐漸成為已開發國家人們生活中不可或缺的一部分。",diff:4,unit:"P6L3"},
  {id:539,word:"relic",ph:"/ˈrelɪk/",pos:"n.",en:"an object surviving from an earlier period",zh:"遺物；遺跡",ex:"The CD has become an outmoded relic of a bygone time.",exZh:"這張CD已經成為舊時代的過時遺物。",diff:3,unit:"P6L3"},
  // P6L4 Customs 風俗
  {id:540,word:"alert",ph:"/əˈlɜːt/",pos:"v.",en:"to make someone aware of a situation or danger",zh:"提醒；警告",ex:"Nations often alert arriving tourists at airports to important national traditions.",exZh:"各國經常提醒抵達機場的遊客注意重要的國家傳統。",diff:2,unit:"P6L4"},
  {id:541,word:"adhere",ph:"/ədˈhɪər/",pos:"v.",en:"to follow or stick firmly to a rule or belief",zh:"堅持；遵守",ex:"It seems that in a globalised world, a growing number of people are adhering to national customs.",exZh:"似乎在全球化的世界裡，愈來愈多人正在堅持民族風俗。",diff:3,unit:"P6L4"},
  {id:542,word:"conserve",ph:"/kənˈsɜːv/",pos:"v.",en:"to protect something from harm or destruction",zh:"保護；保存",ex:"A huge international effort is now being made to save and conserve the world's last remaining tribes.",exZh:"目前正在進行一項巨大的國際努力，來拯救和保護世界上僅存的一些部落。",diff:3,unit:"P6L4"},
  {id:543,word:"discard",ph:"/dɪsˈkɑːd/",pos:"v.",en:"to throw away or abandon something no longer useful",zh:"丟棄；拋棄",ex:"Some traditions will be discarded through globalisation and a non-stop work culture.",exZh:"有些傳統將會經由全球化以及不間斷的工作文化而被丟棄。",diff:3,unit:"P6L4"},
  {id:544,word:"conventional",ph:"/kənˈvenʃənl/",pos:"adj.",en:"following traditional or long-established customs",zh:"傳統的；慣常的",ex:"Millennials are currently redefining the rules of conventional weddings by making them more personal.",exZh:"藉由使傳統婚禮更加私人化，千禧世代目前正在重新定義其規則。",diff:3,unit:"P6L4"},
  {id:545,word:"indigenous",ph:"/ɪnˈdɪdʒɪnəs/",pos:"adj.",en:"originating or occurring naturally in a particular place",zh:"本土的；本地的",ex:"Many indigenous customs around the world are in danger of disappearing completely.",exZh:"世界各地許多本土風俗正處於完全消失的危險中。",diff:4,unit:"P6L4"},
  {id:546,word:"modish",ph:"/ˈməʊdɪʃ/",pos:"adj.",en:"following or in the fashion of the current style",zh:"流行的；時髦的",ex:"Some regions of the world have resisted the trend towards wearing modish, western-style garments.",exZh:"世界上一些地區對穿著流行的西式服裝趨勢持抵制態度。",diff:4,unit:"P6L4"},
  {id:547,word:"moribund",ph:"/ˈmɒrɪbʌnd/",pos:"adj.",en:"in decline; lacking vitality; at the point of death",zh:"即將滅亡的；衰退的",ex:"The Internet has led to the spreading of ideas that have made many old traditions moribund.",exZh:"網路已經導致使許多舊傳統瀕臨滅亡後果的思想傳播。",diff:5,unit:"P6L4"},
  {id:548,word:"spirit",ph:"/ˈspɪrɪt/",pos:"n.",en:"the characteristic quality or nature of something",zh:"精神；本質",ex:"Saving a language means retaining the spirit of a culture.",exZh:"保護一個語言意味著保留一個文化的精神。",diff:2,unit:"P6L4"},
  {id:549,word:"symbol",ph:"/ˈsɪmbəl/",pos:"n.",en:"a mark or object representing an idea or quality",zh:"象徵；符號",ex:"Cultural appropriation occurs when one culture wrongly misrepresents the symbols or styles of another.",exZh:"當一種文化錯誤地曲解另一種文化的象徵或風格時，就會發生文化挪用。",diff:2,unit:"P6L4"},
  {id:550,word:"culture shock",ph:"/ˈkʌltʃər ʃɒk/",pos:"n.",en:"disorientation felt when experiencing an unfamiliar culture",zh:"文化衝擊",ex:"When studying overseas for extended periods, many foreign students will undoubtedly experience culture shock.",exZh:"當在海外留學很長一段時間，許多外國學生無疑將會經歷文化衝擊。",diff:3,unit:"P6L4"},
  {id:551,word:"myth",ph:"/mɪθ/",pos:"n.",en:"a traditional story or widely held false belief",zh:"神話；誤解",ex:"Tourists attracted to the myths and traditions of indigenous tribes may be causing more harm than good.",exZh:"受土著部落的神話和傳說所吸引的遊客，可能帶來的弊大於利。",diff:3,unit:"P6L4"},
  // P6L5 Journalism 新聞
  {id:552,word:"censor",ph:"/ˈsensər/",pos:"v.",en:"to examine and remove unacceptable parts of media",zh:"審查；刪查",ex:"Some countries outright censor the national media and the Internet.",exZh:"有些國家徹底審查全國媒體和網路。",diff:3,unit:"P6L5"},
  {id:553,word:"invade",ph:"/ɪnˈveɪd/",pos:"v.",en:"to intrude on someone's private affairs without right",zh:"侵犯；侵入",ex:"The paparazzi often step over the line when they invade the privacy of famous people.",exZh:"狗仔隊在侵犯名人的隱私時經常越界。",diff:2,unit:"P6L5"},
  {id:554,word:"libel",ph:"/ˈlaɪbəl/",pos:"v.",en:"to publish a false statement harmful to a person's reputation",zh:"誹謗；中傷",ex:"Media outlets must exercise caution to prevent libel in their journalism.",exZh:"媒體機構必須謹慎行事，以防止在新聞報導中造成誹謗。",diff:4,unit:"P6L5"},
  {id:555,word:"plagiarise",ph:"/ˈpleɪdʒɪəraɪz/",pos:"v.",en:"to take and use another person's work as one's own",zh:"剽竊；抄襲",ex:"The vast size of the Internet makes it easy for many online authors to plagiarise the content of others.",exZh:"網路的龐大規模使得許多線上作者能輕易剽竊他人的內容。",diff:4,unit:"P6L5"},
  {id:556,word:"explicit",ph:"/ɪksˈplɪsɪt/",pos:"adj.",en:"stated clearly and in detail; not implied",zh:"明確的；清楚的",ex:"Print newspapers provide explicit facts and quotes used by the media at large in their reporting.",exZh:"印刷報紙提供明確的事實和引文，被媒體在其報導中充分使用。",diff:3,unit:"P6L5"},
  {id:557,word:"uniform",ph:"/ˈjuːnɪfɔːm/",pos:"adj.",en:"not changing; the same in all cases",zh:"相同的；一致的",ex:"The spread of cable news networks has led to uniform coverage of world events as they happen.",exZh:"有線新聞網的散佈使得全球事件在發生時的報導更趨一致。",diff:3,unit:"P6L5"},
  {id:558,word:"sensational",ph:"/senˈseɪʃənl/",pos:"adj.",en:"designed to cause excitement or shock; exaggerated",zh:"聳動的；轟動的",ex:"There is a tendency in the press to exaggerate and spend time on stories that are sensational.",exZh:"新聞界有一種去誇大和花時間在聳動報導上的傾向。",diff:3,unit:"P6L5"},
  {id:559,word:"well-founded",ph:"/ˌwelˈfaʊndɪd/",pos:"adj.",en:"based on good reasons or reliable evidence",zh:"有根據的；有理由的",ex:"Fears regarding the decline of journalism are well-founded as advertising revenue declines and newspapers close.",exZh:"隨著廣告收入下降以及報紙歇業，關於新聞業衰退的憂慮是有根據的。",diff:4,unit:"P6L5"},
  {id:560,word:"coverage",ph:"/ˈkʌvərɪdʒ/",pos:"n.",en:"the reporting of news and events by the media",zh:"報導；新聞報導",ex:"While the media love to cover sensational stories, important issues that affect our lives receive little coverage.",exZh:"當媒體喜歡報導聳動新聞記事的同時，會影響我們生活的重要議題卻獲得很少報導。",diff:3,unit:"P6L5"},
  {id:561,word:"headline",ph:"/ˈhedlaɪn/",pos:"n.",en:"the heading of a news article in large print",zh:"頭條新聞；標題",ex:"With the media's obsession with headlines, more people doubt the accuracy of the news they read.",exZh:"隨著媒體對頭條新聞的沈迷，愈來愈多人懷疑他們所閱讀新聞的準確性。",diff:2,unit:"P6L5"},
  {id:562,word:"credibility",ph:"/ˌkredɪˈbɪlɪti/",pos:"n.",en:"the quality of being trusted and believed in",zh:"可信度；公信力",ex:"Today people regard the media as having low credibility and public confidence continues to slip.",exZh:"今天，人們認為媒體有很低的可信度，公眾信心持續下滑。",diff:4,unit:"P6L5"},
  {id:563,word:"paparazzi",ph:"/ˌpɑːpəˈrɑːtsi/",pos:"n.",en:"photographers who pursue celebrities for photos",zh:"狗仔隊",ex:"Paparazzi challenge the carefully crafted images of celebrities, and thus their wealth, status and power.",exZh:"狗仔隊挑戰名人精心打造的形象，以及他們的財富、地位和權勢。",diff:4,unit:"P6L5"},
  // P6L6 Advertising 廣告
  {id:564,word:"advertise",ph:"/ˈædvətaɪz/",pos:"v.",en:"to promote a product or service publicly",zh:"宣傳；做廣告",ex:"Sponsoring sports has become a popular way for companies to advertise themselves.",exZh:"贊助體育運動已成為一種公司自我宣傳的流行方式。",diff:2,unit:"P6L6"},
  {id:565,word:"hype",ph:"/haɪp/",pos:"v.",en:"to promote or publicize something excessively",zh:"大肆宣傳；炒作",ex:"The best brands get creative when hyping their products across multiple advertising platforms.",exZh:"最佳品牌在多個廣告平台大力推廣其產品時表現出創意。",diff:3,unit:"P6L6"},
  {id:566,word:"proliferate",ph:"/prəˈlɪfəreɪt/",pos:"v.",en:"to increase rapidly in number",zh:"激增；擴散",ex:"Augmented reality ads are expected to proliferate in the next ten to twenty years.",exZh:"擴增實境廣告預計將在未來十年至二十年激增。",diff:4,unit:"P6L6"},
  {id:567,word:"edify",ph:"/ˈedɪfaɪ/",pos:"v.",en:"to instruct or improve morally or intellectually",zh:"薰陶；教化",ex:"Advertisers hope to edify the public with the selling points of their products.",exZh:"廣告客戶希望用他們產品的賣點來薰陶大眾。",diff:4,unit:"P6L6"},
  {id:568,word:"electronic",ph:"/ˌɪlekˈtrɒnɪk/",pos:"adj.",en:"relating to technology with electronic components",zh:"電子的；電子設備的",ex:"Content providers are increasingly turning to electronic advertising to generate revenue.",exZh:"內容供應商愈來愈多轉向電子廣告以創造收入。",diff:2,unit:"P6L6"},
  {id:569,word:"interactive",ph:"/ˌɪntəˈæktɪv/",pos:"adj.",en:"allowing two-way communication or response",zh:"互動式的；交互的",ex:"Interactive advertisements spark interest in products and attract customers' attention.",exZh:"互動式廣告激發對產品的興趣，並吸引顧客的注意。",diff:3,unit:"P6L6"},
  {id:570,word:"profound",ph:"/prəˈfaʊnd/",pos:"adj.",en:"very great or intense; having deep meaning",zh:"深刻的；深遠的",ex:"Society is experiencing a profound shift in how it purchases, advertises, and pays for products.",exZh:"社會在如何購買、廣告並支付產品上，正在經歷一個深刻的轉變。",diff:3,unit:"P6L6"},
  {id:571,word:"superficial",ph:"/ˌsuːpəˈfɪʃəl/",pos:"adj.",en:"existing or occurring at the surface; shallow",zh:"膚淺的；表面的",ex:"Without advertising, life would become much less consumer-focused and less superficial.",exZh:"如果沒有廣告，生活將變得不那麼以消費者為中心，也不那麼膚淺。",diff:3,unit:"P6L6"},
  {id:572,word:"commercial",ph:"/kəˈmɜːʃəl/",pos:"n.",en:"a television or radio advertisement",zh:"商業廣告",ex:"Commercials aimed at children should not be allowed on the basis that they are immoral.",exZh:"基於不道德的原因，不應允許針對兒童的商業廣告。",diff:2,unit:"P6L6"},
  {id:573,word:"current affairs",ph:"/ˌkʌrənt əˈfeəz/",pos:"n.",en:"events of political or social interest happening now",zh:"時事；時事新聞",ex:"The savviest marketing companies use current affairs to generate creative advertising campaigns.",exZh:"最精明的行銷公司利用時事來產生有創意的廣告活動。",diff:3,unit:"P6L6"},
  {id:574,word:"circulation",ph:"/ˌsɜːkjʊˈleɪʃən/",pos:"n.",en:"the number of copies sold of a newspaper or magazine",zh:"發行量；流通量",ex:"Declining circulation among newspapers has caused many to declare bankruptcy.",exZh:"報紙間衰退的發行量已經導致許多報紙宣布破產。",diff:3,unit:"P6L6"},
  {id:575,word:"stereotype",ph:"/ˈsterɪətaɪp/",pos:"n.",en:"a widely held but oversimplified idea about a group",zh:"刻板印象；老套",ex:"Gender stereotypes in adverts are now frowned upon in many civilised nations.",exZh:"在許多文明國家，廣告中的性別刻板印象現在已不被接受。",diff:3,unit:"P6L6"},
  // P6L7 Ways of Communication 傳播方式
  {id:576,word:"comment",ph:"/ˈkɒment/",pos:"v.",en:"to express an opinion about something",zh:"評論；發表意見",ex:"When commenting online, most people seldom take the time to write something insightful.",exZh:"在網上評論時，大部分的人很少會花時間寫一些見解深刻的東西。",diff:2,unit:"P6L7"},
  {id:577,word:"convey",ph:"/kənˈveɪ/",pos:"v.",en:"to communicate or express a message",zh:"傳達；傳遞",ex:"One of the key advantages of instant messaging is that it conveys information immediately to the recipient.",exZh:"即時通訊的主要優點之一是它能立刻傳達資訊給接收者。",diff:3,unit:"P6L7"},
  {id:578,word:"circulate",ph:"/ˈsɜːkjuleɪt/",pos:"v.",en:"to pass or spread widely among people",zh:"流傳；傳播",ex:"When something goes viral, it is circulated and shared by thousands of people online.",exZh:"當某事物爆紅時，它會在網上被成千上萬的人流傳和分享。",diff:3,unit:"P6L7"},
  {id:579,word:"enlighten",ph:"/ɪnˈlaɪtn/",pos:"v.",en:"to give someone greater knowledge or understanding",zh:"啟發；啟蒙",ex:"In order to enlighten the public, journalists strive to avoid opinions and to focus on the facts.",exZh:"為了啟發大眾，記者努力避免發表意見並關注事實。",diff:3,unit:"P6L7"},
  {id:580,word:"convincing",ph:"/kənˈvɪnsɪŋ/",pos:"adj.",en:"capable of causing someone to believe something",zh:"使人信服的；有說服力的",ex:"Readers should be careful of stories posted online that might seem convincing, but may turn out not to be true.",exZh:"讀者應留意網上那些聽起來令人信服但可能不真實的報導。",diff:3,unit:"P6L7"},
  {id:581,word:"critical",ph:"/ˈkrɪtɪkəl/",pos:"adj.",en:"expressing or involving careful analysis and judgment",zh:"批判性的；批評的",ex:"It is better to be critical when reading news sources and not accept information at face value.",exZh:"在閱讀新聞來源時最好帶有批判性，不要以字面意義接受資訊。",diff:3,unit:"P6L7"},
  {id:582,word:"trustworthy",ph:"/ˈtrʌstwɜːðɪ/",pos:"adj.",en:"able to be relied on as honest or truthful",zh:"可信的；可靠的",ex:"In an era of fake news, distinguishing which information is trustworthy is a difficult task.",exZh:"在「假新聞」的時代，區分哪些資訊可信是一項艱難的任務。",diff:3,unit:"P6L7"},
  {id:583,word:"manipulative",ph:"/məˈnɪpjuleɪtɪv/",pos:"adj.",en:"tending to control others through clever means",zh:"操控的；操縱性的",ex:"Social media has recently been used as a manipulative channel by politicians.",exZh:"社群媒體近期已經被政客們當作一種操控的管道。",diff:4,unit:"P6L7"},
  {id:584,word:"publication",ph:"/ˌpʌblɪˈkeɪʃən/",pos:"n.",en:"the action of making something publicly known",zh:"出版物；發行",ex:"Newsletter are a popular form of publication used by companies to support and engage staff.",exZh:"時事通訊是公司用來支持和吸引員工的一項受歡迎的出版物形式。",diff:3,unit:"P6L7"},
  {id:585,word:"correspondence",ph:"/ˌkɒrɪˈspɒndəns/",pos:"n.",en:"letters or emails sent between people",zh:"通信；書信往來",ex:"The continuing importance of correspondence in the business world cannot be understated.",exZh:"在商業世界中，通信的持續重要性是不容被低估的。",diff:4,unit:"P6L7"},
  {id:586,word:"editorial",ph:"/ˌedɪˈtɔːriəl/",pos:"n.",en:"a newspaper article giving the editor's opinion",zh:"社論；評論",ex:"An editorial serves an important function as the mouthpiece of a newspaper.",exZh:"社論如同報紙的喉舌，擔任重要的作用。",diff:4,unit:"P6L7"},
  {id:587,word:"telecommunication",ph:"/ˌtelɪkəmˌjuːnɪˈkeɪʃən/",pos:"n.",en:"communication over long distances by electronic means",zh:"電信；遠距通訊",ex:"Telecommunication is gradually replacing face-to-face meetings.",exZh:"電信正逐漸取代面對面的會議。",diff:4,unit:"P6L7"},
  // P6L8 Languages 語言
  {id:588,word:"translate",ph:"/trænsˈleɪt/",pos:"v.",en:"to express the meaning of something in another language",zh:"翻譯；轉換",ex:"Learners translating directly from their mother tongue into a second language may produce inconsistencies.",exZh:"學習者直接從其母語翻譯成第二種語言可能會產生不一致性。",diff:2,unit:"P6L8"},
  {id:589,word:"coin",ph:"/kɔɪn/",pos:"v.",en:"to invent a new word or phrase",zh:"創造（詞語）；杜撰",ex:"Shakespeare coined many of the world's most well-known phrases.",exZh:"莎士比亞創造了許多世界上最有名的慣用語。",diff:3,unit:"P6L8"},
  {id:590,word:"encode",ph:"/ɪnˈkəʊd/",pos:"v.",en:"to convert information into a coded form",zh:"編碼；轉化",ex:"The more information people have about an event, the more successfully it can be encoded into a memory.",exZh:"人們對事件得到的資訊愈多，就愈能成功將其編碼到記憶中。",diff:4,unit:"P6L8"},
  {id:591,word:"originate",ph:"/əˈrɪdʒɪneɪt/",pos:"v.",en:"to have or create as one's origin",zh:"源於；起源",ex:"Anxiety when speaking a foreign tongue usually originates from the speaker's sense of self.",exZh:"講外語時的焦慮通常源於講者的「自我」意識。",diff:3,unit:"P6L8"},
  {id:592,word:"bilingual",ph:"/baɪˈlɪŋɡwəl/",pos:"adj.",en:"speaking or expressed in two languages",zh:"雙語的；雙語者",ex:"Studies show that bilingual people have a much lower risk of developing age-related diseases.",exZh:"研究顯示雙語人士有更低的風險罹患老年相關疾病。",diff:3,unit:"P6L8"},
  {id:593,word:"coherent",ph:"/kəʊˈhɪərənt/",pos:"adj.",en:"logical and consistent; easy to understand",zh:"連貫的；條理清晰的",ex:"Semantic differences make it difficult for Mandarin speakers to write a coherent composition in English.",exZh:"語義上的差異性使說中文的人很難用英語寫出連貫的作文。",diff:3,unit:"P6L8"},
  {id:594,word:"written",ph:"/ˈrɪtn/",pos:"adj.",en:"expressed in writing rather than speech",zh:"書寫的；文字的",ex:"Chinese is one of the hardest written languages in the world.",exZh:"中文是世界上最難書寫的語言之一。",diff:2,unit:"P6L8"},
  {id:595,word:"linguistic",ph:"/lɪŋˈɡwɪstɪk/",pos:"adj.",en:"relating to language or linguistics",zh:"語言學的；語言的",ex:"According to some linguistic estimates, the total number of world languages is over thirty thousand.",exZh:"根據一些語言學的估計，世界上的語言總數超過三萬種。",diff:4,unit:"P6L8"},
  {id:596,word:"idiom",ph:"/ˈɪdiəm/",pos:"n.",en:"a phrase whose meaning differs from its literal words",zh:"慣用語；成語",ex:"Proficiency in a language may be truly attained when the learner masters its idioms.",exZh:"當學習者精通語言中的慣用語時，才能真正達到語言的熟練程度。",diff:3,unit:"P6L8"},
  {id:597,word:"sign language",ph:"/saɪn ˈlæŋɡwɪdʒ/",pos:"n.",en:"a visual language using hand shapes and movements",zh:"手語",ex:"Sign language has evolved differently around the world to produce hundreds of variations today.",exZh:"手語已在世界上以不同方式發展，現今產生了數百種的變化。",diff:2,unit:"P6L8"},
  {id:598,word:"slang",ph:"/slæŋ/",pos:"n.",en:"informal words used in casual speech",zh:"俚語；口語",ex:"Formal language tends to forego the slang that is more indicative of informal speech.",exZh:"正式語言傾向放棄那些更能說明非正式談話的俚語。",diff:3,unit:"P6L8"},
  {id:599,word:"irony",ph:"/ˈaɪərəni/",pos:"n.",en:"the use of words to mean the opposite of their literal meaning",zh:"諷刺；反語",ex:"Expressing a sense of irony is one of the highest achievements for a second language learner.",exZh:"對於第二語言學習者來說，表達出一種諷刺感是最高成就之一。",diff:4,unit:"P6L8"},

  // ── P7 Arts 藝術 ──────────────────────────────────────────────
  // P7L1 Art History 藝術史
  {id:600,word:"distinguish",ph:"/dɪˈstɪŋɡwɪʃ/",pos:"v.",en:"to recognise or show the difference between things",zh:"區分；辨別",ex:"Owing to a lack of art education, many people are unable to distinguish between various types of art.",exZh:"由於缺乏藝術教育，許多人無法區分各種類型的藝術。",diff:3,unit:"P7L1"},
  {id:601,word:"define",ph:"/dɪˈfaɪn/",pos:"v.",en:"to state or describe the nature of something",zh:"定義；界定",ex:"Art often encapsulates the social changes over time that define a society's progress.",exZh:"藝術通常概括了隨著時間推移的社會變化，而這些變化定義一個社會的進步。",diff:2,unit:"P7L1"},
  {id:602,word:"analyse",ph:"/ˈænəlaɪz/",pos:"v.",en:"to examine something in detail to understand it",zh:"分析；解析",ex:"When analysing artwork, art historians look at the material used and the artist's purpose.",exZh:"在分析藝術作品時，藝術歷史學家研究使用的材料及藝術家的目的。",diff:3,unit:"P7L1"},
  {id:603,word:"endeavour",ph:"/ɪnˈdevə/",pos:"v.",en:"to try hard to achieve something",zh:"努力；力圖",ex:"Some people feel that funding the arts is a wasted endeavour.",exZh:"有些人認為資助藝術是白費力氣。",diff:4,unit:"P7L1"},
  {id:604,word:"contemporary",ph:"/kənˈtempərəri/",pos:"adj.",en:"relating to the present time; modern",zh:"當代的；現代的",ex:"Most art galleries nowadays tend to curate contemporary art collections.",exZh:"現今大多數藝廊傾向安排當代藝術收藏品。",diff:3,unit:"P7L1"},
  {id:605,word:"abstract",ph:"/ˈæbstrækt/",pos:"adj.",en:"existing as an idea rather than a physical thing",zh:"抽象的；抽象派的",ex:"The 1960s was a time of reinvention characterised by the emergence of abstract art.",exZh:"60年代是一個以抽象藝術出現為特徵的重塑時期。",diff:3,unit:"P7L1"},
  {id:606,word:"aesthetic",ph:"/iːsˈθetɪk/",pos:"adj.",en:"concerned with beauty or the appreciation of beauty",zh:"審美的；美學的",ex:"Street art focuses more on delivering a message and less on aesthetic properties.",exZh:"街頭藝術更著重於傳遞訊息，較少關注審美屬性。",diff:4,unit:"P7L1"},
  {id:607,word:"comparable",ph:"/ˈkɒmpərəbl/",pos:"adj.",en:"similar in quality or nature and able to be compared",zh:"可相比的；類似的",ex:"In the near future, art produced by a machine will be comparable with that created by a human.",exZh:"在不久的將來，機器產出的藝術將可與人類創作的藝術相比擬。",diff:3,unit:"P7L1"},
  {id:608,word:"impressionism",ph:"/ɪmˈpreʃənɪzəm/",pos:"n.",en:"a 19th-century art movement emphasising light and movement",zh:"印象派；印象主義",ex:"During the impressionism period, artists eschewed traditional techniques to showcase the societal shifts.",exZh:"在印象派時期，藝術家避開傳統技巧以展現社會變遷。",diff:4,unit:"P7L1"},
  {id:609,word:"surrealism",ph:"/səˈrɪəlɪzəm/",pos:"n.",en:"an art movement featuring dreamlike and bizarre imagery",zh:"超現實主義",ex:"Sometimes art develops beyond being simply a style into a movement as was the case with surrealism.",exZh:"有時藝術超越單一風格的界限，發展成為一種運動，就像超現實主義那樣。",diff:4,unit:"P7L1"},
  {id:610,word:"renaissance",ph:"/rəˈneɪsəns/",pos:"n.",en:"a revival or renewed interest in something",zh:"復興；文藝復興",ex:"From time to time, art styles can experience a renaissance and become popular for a period.",exZh:"有時，藝術風格會經歷復興，並且流行一段時間。",diff:4,unit:"P7L1"},
  {id:611,word:"pop art",ph:"/pɒp ɑːt/",pos:"n.",en:"an art movement using imagery from popular culture",zh:"波普藝術",ex:"Pop art has its origins in popular culture as exemplified by Andy Warhol.",exZh:"波普藝術源自流行文化，以安迪·沃荷為典型例子。",diff:3,unit:"P7L1"},
  // P7L2 Artists and Artisans 藝術工作者
  {id:612,word:"express",ph:"/ɪksˈpres/",pos:"v.",en:"to convey thoughts or feelings through words or art",zh:"表達；表現",ex:"Artisans use art to express the richness of their culture.",exZh:"工匠們利用藝術來表達他們文化的豐富性。",diff:2,unit:"P7L2"},
  {id:613,word:"respect",ph:"/rɪˈspekt/",pos:"v.",en:"to admire or have a high opinion of someone or something",zh:"尊重；欽佩",ex:"Art teaches society how to appreciate and respect the perceptions of others.",exZh:"藝術教導社會如何欣賞和尊重他人的看法。",diff:2,unit:"P7L2"},
  {id:614,word:"audit",ph:"/ˈɔːdɪt/",pos:"v.",en:"to conduct an official examination of something",zh:"審核；審計",ex:"Collectors with large art collections must audit them from time to time for valuation purposes.",exZh:"有大量藝術收藏品的收藏家為了估價目的，必須不時審核它們。",diff:3,unit:"P7L2"},
  {id:615,word:"applaud",ph:"/əˈplɔːd/",pos:"v.",en:"to show approval by clapping or praising",zh:"讚賞；鼓掌",ex:"The art world applauds those artists who challenge convention.",exZh:"藝術界讚賞那些挑戰傳統的藝術家。",diff:3,unit:"P7L2"},
  {id:616,word:"creative",ph:"/kriˈeɪtɪv/",pos:"adj.",en:"involving the use of imagination to produce something new",zh:"有創意的；創造性的",ex:"Artists should be free to be creative but within the limits of the law.",exZh:"藝術家應當是可以自由發揮創意，但要在法律範圍內。",diff:2,unit:"P7L2"},
  {id:617,word:"visual",ph:"/ˈvɪʒuəl/",pos:"adj.",en:"relating to sight or the ability to see",zh:"視覺的；視覺上的",ex:"Studying visual art can make nascent artists think and see in ways that everyday life cannot teach.",exZh:"學習視覺藝術可以讓新興藝術家以日常生活無法教授的多種方式思考和觀察。",diff:2,unit:"P7L2"},
  {id:618,word:"refreshing",ph:"/rɪˈfreʃɪŋ/",pos:"adj.",en:"pleasantly new or different; reviving",zh:"使人耳目一新的；清新的",ex:"Interactive art exhibits could provide a more refreshing experience for visitors.",exZh:"互動的藝術展示品可以為遊客提供更令人耳目一新的體驗。",diff:3,unit:"P7L2"},
  {id:619,word:"avant-garde",ph:"/ˌævɒŋˈɡɑːd/",pos:"adj.",en:"new and experimental in art or culture",zh:"前衛的；先鋒的",ex:"Society relies on artists like the avant-garde movement to challenge the status-quo.",exZh:"社會仰賴前衛運動這樣的藝術家來挑戰現況。",diff:5,unit:"P7L2"},
  {id:620,word:"photographer",ph:"/fəˈtɒɡrəfər/",pos:"n.",en:"a person who takes photographs professionally",zh:"攝影師",ex:"A good photographer captures the essence of life in a place for all to experience.",exZh:"一個優秀攝影師在某處捕捉生活的本質，讓所有人去體驗。",diff:2,unit:"P7L2"},
  {id:621,word:"dramatist",ph:"/ˈdræmətɪst/",pos:"n.",en:"a person who writes plays",zh:"劇作家",ex:"Shakespeare is perhaps the most famous dramatist in the world.",exZh:"莎士比亞可能是世界上最有名的劇作家。",diff:4,unit:"P7L2"},
  {id:622,word:"conductor",ph:"/kənˈdʌktər/",pos:"n.",en:"a person who directs an orchestra or choir",zh:"指揮",ex:"If a composer of music is the chef, then the conductor is the waiter serving the meal.",exZh:"如果將作曲家比喻為主廚，那麼指揮則是端上佳餚的服務生。",diff:3,unit:"P7L2"},
  {id:623,word:"composer",ph:"/kəmˈpəʊzər/",pos:"n.",en:"a person who writes music",zh:"作曲家",ex:"Modern composers write music in multiple mediums from concerts to film scores and video games.",exZh:"現代作曲家從音樂會到電影配樂和電玩遊戲，在多種媒介中創作音樂。",diff:3,unit:"P7L2"},
  // P7L3 Performing Arts 表演藝術
  {id:624,word:"combine",ph:"/kəmˈbaɪn/",pos:"v.",en:"to join or merge things together",zh:"結合；合併",ex:"Taiwan's Cloud Gate Dance Company combines multiple performance styles in their shows.",exZh:"台灣的雲門舞集在其表演中結合了多種表演風格。",diff:2,unit:"P7L3"},
  {id:625,word:"compose",ph:"/kəmˈpəʊz/",pos:"v.",en:"to write music, poetry, or other creative work",zh:"創作（詩、曲）；作曲",ex:"People are often surprised by the amount of work that goes into composing and rehearsing a musical show.",exZh:"人們常常對於從事創作和排練一齣音樂劇的工作量感到驚訝。",diff:3,unit:"P7L3"},
  {id:626,word:"embody",ph:"/ɪmˈbɒdi/",pos:"v.",en:"to represent or express something in a tangible way",zh:"體現；具體表現",ex:"Exhibitions by well-known artists often embody certain themes like childhood nostalgia.",exZh:"知名藝術家的展覽經常體現某些主題，像是童年懷舊。",diff:4,unit:"P7L3"},
  {id:627,word:"rehearse",ph:"/rɪˈhɜːs/",pos:"v.",en:"to practise a performance before the actual event",zh:"排練；預演",ex:"Being a top performer requires rehearsing for hours each day.",exZh:"作為一個頂尖的表演者，需要每天花數小時排練。",diff:3,unit:"P7L3"},
  {id:628,word:"acoustic",ph:"/əˈkuːstɪk/",pos:"adj.",en:"relating to sound or the properties of sound",zh:"聲音的；原聲的",ex:"A well-functioning acoustic device is perhaps the most fundamental equipment to employ for street artists.",exZh:"一個功能完善的聲音設備或許是街頭藝術家所使用最基本的配備。",diff:4,unit:"P7L3"},
  {id:629,word:"classical",ph:"/ˈklæsɪkəl/",pos:"adj.",en:"relating to traditional forms of art, music, or literature",zh:"古典的；傳統的",ex:"Research shows that audience members have lower stress levels when engaging with classical music.",exZh:"研究顯示，聽眾成員在與古典音樂交會時有較低的壓力程度。",diff:2,unit:"P7L3"},
  {id:630,word:"harmonic",ph:"/hɑːˈmɒnɪk/",pos:"adj.",en:"relating to harmony in music; pleasantly combined",zh:"和諧的；和聲的",ex:"An orchestra allows multiple harmonic sounds to be produced at the same time.",exZh:"一個管弦樂團允許同時產生多個和諧之音。",diff:4,unit:"P7L3"},
  {id:631,word:"acrobatic",ph:"/ˌækrəˈbætɪk/",pos:"adj.",en:"relating to gymnastic feats requiring agility",zh:"雜技的；特技的",ex:"The acrobatic challenges of some dance forms mean that there is a demand for flexibility and athleticism.",exZh:"某些舞蹈形式的雜技挑戰意味著對靈活性和運動能力的需求。",diff:4,unit:"P7L3"},
  {id:632,word:"concert",ph:"/ˈkɒnsət/",pos:"n.",en:"a musical performance given in public",zh:"演奏會；音樂會",ex:"Nowadays technology plays a part in streaming concerts to a global audience of millions.",exZh:"現今科技在向全球數百萬觀眾的串流演奏會中扮演了關鍵角色。",diff:2,unit:"P7L3"},
  {id:633,word:"audience",ph:"/ˈɔːdiəns/",pos:"n.",en:"the people gathered to watch a performance",zh:"觀眾；聽眾",ex:"Some people worry that altering traditional art forms for tourists distorts their original meaning and misleads the audience.",exZh:"有些人擔心為遊客改變傳統藝術形式會扭曲其原意與誤導觀眾。",diff:2,unit:"P7L3"},
  {id:634,word:"opera",ph:"/ˈɒpərə/",pos:"n.",en:"a dramatic musical work performed by singers",zh:"歌劇",ex:"The popularity of opera has seen a huge resurgence in recent years.",exZh:"近年來歌劇的流行已經出現了大幅的復甦。",diff:2,unit:"P7L3"},
  {id:635,word:"repertoire",ph:"/ˈrepətwɑː/",pos:"n.",en:"the works that a performer knows and can perform",zh:"全部作品；節目單",ex:"Top performers often have a wide-ranging repertoire of performances to draw on.",exZh:"頂尖表演者通常有廣泛的表演作品可使用。",diff:5,unit:"P7L3"},
  // P7L4 Calligraphy 書法
  {id:636,word:"practice",ph:"/ˈpræktɪs/",pos:"v.",en:"to repeatedly do something to improve a skill",zh:"練習；實踐",ex:"With daily practice, most people can learn basic calligraphy style in around two weeks.",exZh:"經由每天練習，大多數的人可以在大約兩週內學習基本書法風格。",diff:2,unit:"P7L4"},
  {id:637,word:"grip",ph:"/ɡrɪp/",pos:"v.",en:"to hold something firmly",zh:"握；抓緊",ex:"It is difficult to achieve precise penmanship without gripping a pen correctly.",exZh:"沒有正確握好一支筆，就很難寫出精確的書法。",diff:2,unit:"P7L4"},
  {id:638,word:"grind",ph:"/ɡraɪnd/",pos:"v.",en:"to crush or reduce to powder by friction",zh:"磨；研磨",ex:"In traditional Chinese calligraphy, the writer must first grind ink using an ink stick and ink stone.",exZh:"在傳統中國書法中，作者必須先使用墨塊和硯台磨墨。",diff:3,unit:"P7L4"},
  {id:639,word:"seal",ph:"/siːl/",pos:"v.",en:"to stamp something with an official mark",zh:"蓋章；加封",ex:"Chinese calligraphers seal their work to prove its authenticity to the world.",exZh:"中國書法家在他們的作品上蓋章來向世界證明其真實性。",diff:2,unit:"P7L4"},
  {id:640,word:"subtle",ph:"/ˈsʌtl/",pos:"adj.",en:"delicate and difficult to notice; not obvious",zh:"細膩的；微妙的",ex:"The beauty of calligraphy lies in the subtle flicks and strokes that flow seamlessly together.",exZh:"書法之美在於共同無縫流動的細膩筆觸和筆畫。",diff:3,unit:"P7L4"},
  {id:641,word:"fluid",ph:"/ˈfluːɪd/",pos:"adj.",en:"able to flow freely; smooth and graceful",zh:"液體的；流暢的",ex:"Modern calligraphy uses fluid ink rather than an ink stick and inkstone.",exZh:"當代書法使用液體墨水而不是墨塊和硯台。",diff:3,unit:"P7L4"},
  {id:642,word:"unmatched",ph:"/ʌnˈmætʃt/",pos:"adj.",en:"not matched or equalled; incomparable",zh:"無與倫比的；無可匹敵的",ex:"While calligraphy is appreciated in many world cultures, its value in Chinese culture is also unmatched.",exZh:"當書法在許多世界文化中受到讚賞的同時，其在中國文化中的價值也是無與倫比的。",diff:4,unit:"P7L4"},
  {id:643,word:"cursive",ph:"/ˈkɜːsɪv/",pos:"adj.",en:"written with joined letters in a flowing style",zh:"草書的；連筆的",ex:"In an increasingly digital age, cursive handwriting is being taught less and less in schools.",exZh:"在愈加數位化的時代中，學校愈來愈少教授草書。",diff:4,unit:"P7L4"},
  {id:644,word:"stature",ph:"/ˈstætʃər/",pos:"n.",en:"respect and admiration earned by achievement",zh:"聲譽；威望",ex:"The art of calligraphy holds great stature among Eastern cultures of the world.",exZh:"書法藝術在世界上的東方文化中享有極大的聲譽。",diff:4,unit:"P7L4"},
  {id:645,word:"stroke",ph:"/strəʊk/",pos:"n.",en:"a single mark made by a pen or brush",zh:"一筆（書寫、繪畫）",ex:"Stroke order is a key element in writing beautiful Chinese characters.",exZh:"筆畫順序是書寫出漂亮中國文字的關鍵要素。",diff:2,unit:"P7L4"},
  {id:646,word:"inscription",ph:"/ɪnˈskrɪpʃən/",pos:"n.",en:"words written or carved on a surface",zh:"題詞；銘文",ex:"A traditional Chinese artwork requires an inscription detailing the author, setting and date of the piece.",exZh:"一個傳統的中國藝術作品需要一題詞詳述作品的作者、背景和日期。",diff:4,unit:"P7L4"},
  {id:647,word:"inkstone",ph:"/ˈɪŋkstəʊn/",pos:"n.",en:"a stone used for grinding ink in calligraphy",zh:"硯台",ex:"An inkstone is one of the four essential tools needed for calligraphy work.",exZh:"硯台是書法作品所需的四種基本工具之一。",diff:3,unit:"P7L4"},
  // P7L5 Literature 文學
  {id:648,word:"illustrate",ph:"/ˈɪləstreɪt/",pos:"v.",en:"to make something clear by giving examples",zh:"說明；闡明",ex:"Schools are now using English literature to illustrate social issues prevalent in society at large.",exZh:"學校現在正在使用英國文學來說明整個社會流行的社會議題。",diff:2,unit:"P7L5"},
  {id:649,word:"narrate",ph:"/næˈreɪt/",pos:"v.",en:"to give a spoken or written account of events",zh:"口述；講述",ex:"Audio books are on the rise, especially those narrated by celebrities.",exZh:"有聲書正在興起，特別是那些由名人所口述的。",diff:3,unit:"P7L5"},
  {id:650,word:"author",ph:"/ˈɔːθər/",pos:"v.",en:"to write or create a book or other work",zh:"著作；撰寫",ex:"By studying great works authored in the past, readers gain insight into the literary traditions of the time.",exZh:"透過研讀過去偉大的文學著作，讀者能深入理解當時的文學傳統。",diff:3,unit:"P7L5"},
  {id:651,word:"dictate",ph:"/dɪkˈteɪt/",pos:"v.",en:"to control or determine how something happens",zh:"規定；支配",ex:"The curator strictly dictates the placement and lighting of each artwork to ensure the exhibit's integrity.",exZh:"策展人嚴格規定每件藝術品的擺放和照明，以確保展覽的完整性。",diff:3,unit:"P7L5"},
  {id:652,word:"forthcoming",ph:"/ˌfɔːθˈkʌmɪŋ/",pos:"adj.",en:"about to happen or appear soon",zh:"即將的；即將出現的",ex:"Many great literary works of the past are inspiring many forthcoming TV shows.",exZh:"許多過去的偉大文學作品正啟發許多即將上映的電視節目。",diff:3,unit:"P7L5"},
  {id:653,word:"influential",ph:"/ˌɪnfluˈenʃəl/",pos:"adj.",en:"having great influence on people or events",zh:"有影響力的；有影響的",ex:"Studies show that reading literature is influential in people's empathy for others.",exZh:"研究顯示，閱讀文學對於人們對其他人的同理心是有影響力的。",diff:3,unit:"P7L5"},
  {id:654,word:"second-hand",ph:"/ˈsekəndˌhænd/",pos:"adj.",en:"having had a previous owner; not new",zh:"二手的；舊的",ex:"Second-hand bookstores are currently thriving in many places fuelled by the growth of the Internet.",exZh:"由於網路的發展刺激下，二手書店目前正在許多地方蓬勃發展。",diff:2,unit:"P7L5"},
  {id:655,word:"tedious",ph:"/ˈtiːdiəs/",pos:"adj.",en:"too long and boring; tiresome",zh:"乏味的；冗長的",ex:"In the past, books had to be handwritten – a tedious process often undertaken by monks.",exZh:"在過去，書籍必須用手寫——通常是由僧侶所進行的一項乏味程序。",diff:3,unit:"P7L5"},
  {id:656,word:"fiction",ph:"/ˈfɪkʃən/",pos:"n.",en:"literature describing imaginary events and people",zh:"小說；虛構作品",ex:"An important distinction in literature must be made between literary fiction and genre fiction.",exZh:"文學小說和體裁小說之間必須在文學上做出重要的區分。",diff:2,unit:"P7L5"},
  {id:657,word:"autobiography",ph:"/ˌɔːtəbaɪˈɒɡrəfi/",pos:"n.",en:"an account of one's own life written by oneself",zh:"自傳",ex:"Autobiographies provide telling insights into an author's development and perspectives.",exZh:"自傳提供了對作者個人發展與觀點的深刻理解。",diff:4,unit:"P7L5"},
  {id:658,word:"poetry",ph:"/ˈpəʊɪtri/",pos:"n.",en:"literary work written in verse",zh:"詩；詩歌",ex:"Perhaps the central characteristic of poetry is its indefinability due to its multiple forms and styles.",exZh:"或許詩的中心特徵在於其難以下定義，這是由於其多樣的形式與風格。",diff:3,unit:"P7L5"},
  {id:659,word:"epic",ph:"/ˈepɪk/",pos:"n.",en:"a long poem or story about heroic deeds",zh:"史詩",ex:"Homer's The Odyssey is one of the world's great epics.",exZh:"荷馬的《奧德賽》是世界上最偉大的史詩之一。",diff:3,unit:"P7L5"},
  // P7L6 Drawing 繪畫
  {id:660,word:"sketch",ph:"/sketʃ/",pos:"v.",en:"to make a rough drawing of something",zh:"畫素描；速寫",ex:"Anyone can learn to sketch nowadays through an abundance of online courses.",exZh:"現今任何人都可以經由豐富的線上課程學習畫素描。",diff:2,unit:"P7L6"},
  {id:661,word:"preserve",ph:"/prɪˈzɜːv/",pos:"v.",en:"to keep something in its original state",zh:"保存；保留",ex:"As a historical record, paintings can be a remarkable way to preserve the past.",exZh:"作為一種歷史紀錄，繪畫可以是保存過去的卓越方式。",diff:3,unit:"P7L6"},
  {id:662,word:"depict",ph:"/dɪˈpɪkt/",pos:"v.",en:"to represent or show in a picture or story",zh:"描繪；描述",ex:"A good artwork may depict life in such a way, but what is shown is interpreted differently by everyone.",exZh:"一件優秀的藝術作品可能會以特定方式描繪生活，但每個人對所展示的內容都有不同的解讀。",diff:3,unit:"P7L6"},
  {id:663,word:"doodle",ph:"/ˈduːdl/",pos:"v.",en:"to draw absent-mindedly",zh:"塗鴉；隨手亂畫",ex:"People doodle primarily to relieve stress.",exZh:"人們塗鴉主要是為了抒解壓力。",diff:2,unit:"P7L6"},
  {id:664,word:"still",ph:"/stɪl/",pos:"adj.",en:"not moving; showing inanimate objects",zh:"靜止的；靜物的",ex:"Still life artworks focus on the inanimate and allow artists to hone their drawing skills.",exZh:"靜物藝術品著重於無生命的物體，而且讓藝術家們磨練他們的繪畫技巧。",diff:2,unit:"P7L6"},
  {id:665,word:"literal",ph:"/ˈlɪtərəl/",pos:"adj.",en:"taking words or images in their basic sense",zh:"如實的；字面的",ex:"An artist's landscape pictures may not always be literal interpretations of the originals.",exZh:"一個藝術家的風景畫作可能不一定總是對原物的如實詮釋。",diff:3,unit:"P7L6"},
  {id:666,word:"one-dimensional",ph:"/ˌwʌndəˈmenʃənl/",pos:"adj.",en:"lacking depth; flat and uninteresting",zh:"乏味的；單一的",ex:"Paintings add interest and depth to the otherwise flat, one-dimensional monotony of empty walls in homes.",exZh:"繪畫對家中其他空牆的平淡與乏味單調，增添了趣味和深度。",diff:3,unit:"P7L6"},
  {id:667,word:"freehand",ph:"/ˈfriːhænd/",pos:"adj.",en:"drawn by hand without using instruments or guides",zh:"徒手的；徒手畫的",ex:"My passion for drawing developed when my art teacher taught us how to draw in a freehand style.",exZh:"當美術老師教我們如何以徒手方式畫畫時，我對繪畫的熱情油然而生。",diff:3,unit:"P7L6"},
  {id:668,word:"oil painting",ph:"/ɔɪl ˈpeɪntɪŋ/",pos:"n.",en:"a painting made using oil-based paints",zh:"油畫",ex:"The Mona Lisa is one of the world's most famous oil paintings.",exZh:"《蒙娜麗莎》是世界上最著名的油畫之一。",diff:2,unit:"P7L6"},
  {id:669,word:"watercolour",ph:"/ˈwɔːtəˌkʌlə/",pos:"n.",en:"a type of paint made with water-soluble pigments",zh:"水彩畫；水彩",ex:"For beginners, watercolours offer a clean, realistic way to put paint on a canvas.",exZh:"對初學者來說，水彩畫提供一種乾淨、寫實的方式將顏料塗抹在畫布上。",diff:3,unit:"P7L6"},
  {id:670,word:"graffiti",ph:"/ɡræˈfiːti/",pos:"n.",en:"writing or drawings made on walls in public places",zh:"塗鴉；街頭塗鴉",ex:"The graffiti artist Banksy is one of the UK's most famous artists.",exZh:"塗鴉藝術家班克斯是英國最著名的藝術家之一。",diff:3,unit:"P7L6"},
  {id:671,word:"charcoal",ph:"/ˈtʃɑːkəʊl/",pos:"n.",en:"a black material used for drawing",zh:"炭筆畫；木炭",ex:"Drawings in charcoal represent some of the earliest depictions of cave art in human history.",exZh:"炭筆畫代表了人類歷史上某些最早的洞穴繪畫藝術的描繪。",diff:3,unit:"P7L6"},
  // P7L7 Cinema 電影
  {id:672,word:"shoot",ph:"/ʃuːt/",pos:"v.",en:"to film a scene or movie",zh:"拍攝；拍片",ex:"By shooting in multiple locations around the world, movie studios aim to attract a global audience.",exZh:"藉由在世界各地多個地點拍攝，電影製片公司致力於吸引全球的觀眾。",diff:2,unit:"P7L7"},
  {id:673,word:"capture",ph:"/ˈkæptʃər/",pos:"v.",en:"to record something successfully on film or in writing",zh:"獲得；佔得",ex:"In terms of global audiences, American films still capture the lion's share of ticket sales.",exZh:"就全球觀眾而言，美國電影仍然獲得了票房銷售的最大份額。",diff:2,unit:"P7L7"},
  {id:674,word:"narrate",ph:"/næˈreɪt/",pos:"v.",en:"to provide a spoken commentary for a film",zh:"旁白；講述",ex:"Morgan Freeman has perhaps one of the world's most recognizable voices when narrating a movie.",exZh:"在為電影作旁白時，摩根·費里曼或許擁有世界上最容易辨識的聲音之一。",diff:3,unit:"P7L7"},
  {id:675,word:"direct",ph:"/dɪˈrekt/",pos:"v.",en:"to supervise and control the making of a film",zh:"導演；指導",ex:"In the future, a large proportion of movies will likely be directed using virtual reality.",exZh:"在未來，大部分的電影可能會使用虛擬實境技術來導演。",diff:2,unit:"P7L7"},
  {id:676,word:"silent",ph:"/ˈsaɪlənt/",pos:"adj.",en:"making no sound; without dialogue",zh:"無聲的；默片的",ex:"There is a certain artistic charm to watching silent movies.",exZh:"觀看默片有某種藝術魅力。",diff:2,unit:"P7L7"},
  {id:677,word:"animated",ph:"/ˈænɪmeɪtɪd/",pos:"adj.",en:"made using animation; lively and enthusiastic",zh:"動畫的；生氣勃勃的",ex:"Although I love the cinema, I miss the playfulness of traditional animated movies.",exZh:"雖然我喜歡電影，但我懷念傳統動畫電影的趣味性。",diff:2,unit:"P7L7"},
  {id:678,word:"fictional",ph:"/ˈfɪkʃənl/",pos:"adj.",en:"relating to or found in fiction; not real",zh:"虛構的；小說的",ex:"Movies based on true stories nearly always have fictional elements in them.",exZh:"基於真實故事的電影幾乎總是包含虛構的元素在裡面。",diff:2,unit:"P7L7"},
  {id:679,word:"overarching",ph:"/ˌəʊvəˈɑːtʃɪŋ/",pos:"adj.",en:"comprehensive; covering everything",zh:"整體的；總體的",ex:"One of the key attractions of superhero movies is that their overarching themes remain the same.",exZh:"超級英雄電影的主要吸引力之一是其整體主題維持不變。",diff:4,unit:"P7L7"},
  {id:680,word:"dialogue",ph:"/ˈdaɪəlɒɡ/",pos:"n.",en:"spoken words between characters in a film or play",zh:"對白；對話",ex:"Dialogue often takes a backseat to special effects in most films these days.",exZh:"現今大多數電影中的對白和特效相比已退居次要地位。",diff:2,unit:"P7L7"},
  {id:681,word:"blockbuster",ph:"/ˈblɒkˌbʌstə/",pos:"n.",en:"a film that is a great commercial success",zh:"賣座強片；大熱門",ex:"Notwithstanding the plethora of streaming choices available online, the cinema blockbuster seems far from dead.",exZh:"儘管網路上有大量的串流選擇，但電影賣座強片似乎絲毫沒有消亡。",diff:3,unit:"P7L7"},
  {id:682,word:"soundtrack",ph:"/ˈsaʊndtræk/",pos:"n.",en:"the recorded music from a film",zh:"配樂；原聲帶",ex:"Some of the most iconic movies of all time became so largely due to their outstanding soundtracks.",exZh:"一些成為有史以來最具代表性的電影之所以如此，很大程度上是因其出色的配樂。",diff:3,unit:"P7L7"},
  {id:683,word:"trailer",ph:"/ˈtreɪlər/",pos:"n.",en:"a short clip promoting an upcoming film",zh:"預告片",ex:"I avoid watching movie trailers as I find they frequently give away too much of the plot.",exZh:"我都避免觀看電影預告片，因為我發現它們經常透露太多劇情。",diff:2,unit:"P7L7"},
  // P7L8 Architecture 建築
  {id:684,word:"decorate",ph:"/ˈdekəreɪt/",pos:"v.",en:"to make something more attractive by adding ornaments",zh:"裝飾；裝潢",ex:"In gothic architecture, intricate stonework and vaulted ceilings were used to decorate landmark buildings like cathedrals.",exZh:"在哥德式建築中，錯綜複雜的石雕工藝和拱形天花板被用來裝飾地標性建築，例如大教堂。",diff:2,unit:"P7L8"},
  {id:685,word:"demolish",ph:"/dɪˈmɒlɪʃ/",pos:"v.",en:"to pull down a building or structure",zh:"拆除；摧毀",ex:"If building owners maintained buildings better, there would be less need to demolish them.",exZh:"如果建築物的所有者更妥善維護建築物，就較不需要將之拆除。",diff:3,unit:"P7L8"},
  {id:686,word:"renovate",ph:"/ˈrenəveɪt/",pos:"v.",en:"to repair and improve a building",zh:"修繕；翻新",ex:"When renovating classical buildings, ancient crafts are kept alive.",exZh:"在修繕古典建築時，古老工藝得以被保存。",diff:3,unit:"P7L8"},
  {id:687,word:"engrave",ph:"/ɪnˈɡreɪv/",pos:"v.",en:"to carve words or designs into a hard surface",zh:"刻上；雕刻",ex:"In ancient times, masons would engrave records of their work into the walls.",exZh:"在古代，石匠們會把他們的工作紀錄刻在牆上。",diff:3,unit:"P7L8"},
  {id:688,word:"concrete",ph:"/ˈkɒŋkriːt/",pos:"adj.",en:"specific and definite; relating to real things",zh:"具體的；實際的",ex:"Modernist architecture encompasses a more concrete conception of the function and efficiency.",exZh:"現代主義建築包含了對功能與效率更具體的概念。",diff:2,unit:"P7L8"},
  {id:689,word:"astonishing",ph:"/əsˈtɒnɪʃɪŋ/",pos:"adj.",en:"extremely surprising or impressive",zh:"令人驚嘆的；驚人的",ex:"The La Sagrada Familia cathedral in Spain is one of the world's most astonishing examples of organic architecture.",exZh:"西班牙的聖家堂是世界上最令人驚嘆的有機建築範例之一。",diff:3,unit:"P7L8"},
  {id:690,word:"interior",ph:"/ɪnˈtɪəriər/",pos:"adj.",en:"situated on the inside; relating to the inside of a building",zh:"室內的；內部的",ex:"Many cities have shown great initiative in repurposing disused interior spaces into other uses.",exZh:"許多城市在將廢棄的室內空間改做其他用途上已表現出很大的主動性。",diff:3,unit:"P7L8"},
  {id:691,word:"regional",ph:"/ˈriːdʒənl/",pos:"adj.",en:"relating to a particular region or area",zh:"地方性的；地區性的",ex:"There are many regional styles prevalent in buildings across America.",exZh:"美國各地的建築物中普遍存在許多地方風格。",diff:3,unit:"P7L8"},
  {id:692,word:"utility",ph:"/juːˈtɪlɪti/",pos:"n.",en:"the quality of being practical and useful",zh:"實用性；效用",ex:"Most modern buildings value utility over other forms.",exZh:"大多數現代建築重視實用性超過其他形式。",diff:3,unit:"P7L8"},
  {id:693,word:"ornament",ph:"/ˈɔːnəmənt/",pos:"n.",en:"a decorative object or feature",zh:"裝飾；裝飾品",ex:"Every city has iconic buildings that act as more than mere ornaments for the skyline.",exZh:"每個城市都有代表性的建築物，它們不僅僅是天際線的裝飾。",diff:3,unit:"P7L8"},
  {id:694,word:"sustainability",ph:"/səˌsteɪnəˈbɪlɪti/",pos:"n.",en:"the quality of being able to continue over time without harm",zh:"永續性；可持續性",ex:"Sustainability is an important buzzword used these days in the design of modern buildings.",exZh:"現今，永續性是用於現代建築設計中的重要術語。",diff:4,unit:"P7L8"},
  {id:695,word:"durability",ph:"/ˌdjʊərəˈbɪlɪti/",pos:"n.",en:"the ability to last for a long time without deteriorating",zh:"耐用性；持久性",ex:"Beauty, utility and durability were the three central tenets of early architecture.",exZh:"美觀、實用性和耐用性是早期建築的三大主要原則。",diff:4,unit:"P7L8"},

  // ── P8 Science and Technology 科學與科技 ────────────────────
  // P8L1 Studies 學科
  {id:696,word:"apply",ph:"/əˈplaɪ/",pos:"v.",en:"to make a formal request for something",zh:"申請；應用",ex:"There are thousands of organisations where researchers can apply for funding.",exZh:"有成千上萬個組織可以讓研究人員申請資助。",diff:2,unit:"P8L1"},
  {id:697,word:"reason",ph:"/ˈriːzn/",pos:"v.",en:"to think logically about something",zh:"推論；推理",ex:"Scientists may spend years reasoning through possible solutions to intractable problems.",exZh:"科學家可能會花費數年推論棘手問題的可能解決方法。",diff:3,unit:"P8L1"},
  {id:698,word:"lay out",ph:"/leɪ aʊt/",pos:"v.",en:"to explain or present something clearly",zh:"闡述；說明",ex:"A researcher must lay out how their objectives align with those of a funding agency.",exZh:"研究人員必須闡述他們的目標是如何與資助機構的目標一致。",diff:3,unit:"P8L1"},
  {id:699,word:"embed",ph:"/ɪmˈbed/",pos:"v.",en:"to fix something firmly in a surrounding mass",zh:"嵌入；使根深蒂固",ex:"The importance of embedding ethics at the heart of medical research studies cannot be understated.",exZh:"將倫理學嵌入醫學研究核心的重要性不容小覷。",diff:4,unit:"P8L1"},
  {id:700,word:"scientific",ph:"/ˌsaɪənˈtɪfɪk/",pos:"adj.",en:"relating to science or the methods of science",zh:"科學的；科學性的",ex:"Scientific evidence is mounting that planting trees could substantially mitigate mankind's global carbon footprint.",exZh:"科學證據日益顯示，種植樹木可以大幅減輕人類的全球碳足跡。",diff:2,unit:"P8L1"},
  {id:701,word:"technological",ph:"/ˌteknəˈlɒdʒɪkəl/",pos:"adj.",en:"relating to technology",zh:"技術的；科技的",ex:"Many industry-wide studies look at the impact of technological innovation.",exZh:"許多全產業的研究著眼於技術創新的影響。",diff:3,unit:"P8L1"},
  {id:702,word:"emerging",ph:"/ɪˈmɜːdʒɪŋ/",pos:"adj.",en:"becoming more prominent; newly arising",zh:"新興的；新出現的",ex:"An emerging trend is for research to be publicly available through open access journals online.",exZh:"一個新興的趨勢是透過線上開放取用期刊讓研究成果公開可用。",diff:3,unit:"P8L1"},
  {id:703,word:"worldwide",ph:"/ˌwɜːldˈwaɪd/",pos:"adj.",en:"extending throughout the entire world",zh:"全球的；世界性的",ex:"Worldwide collaboration between researchers has now become possible since the dawn of the Internet.",exZh:"自從網路出現以來，研究人員之間的全球合作已成為可能。",diff:2,unit:"P8L1"},
  {id:704,word:"biology",ph:"/baɪˈɒlədʒi/",pos:"n.",en:"the scientific study of living organisms",zh:"生物學",ex:"Immunology is an exciting new field of biology, especially in the fight against cancer.",exZh:"免疫學是生物學裡一個令人振奮的新領域，特別是在與癌症的對抗上。",diff:2,unit:"P8L1"},
  {id:705,word:"chemistry",ph:"/ˈkemɪstri/",pos:"n.",en:"the branch of science concerned with substances",zh:"化學",ex:"The answer to better recycling of the world's plastics may lie in chemistry.",exZh:"全世界塑膠製品回收利用的較佳解決辦法可能在於化學。",diff:2,unit:"P8L1"},
  {id:706,word:"mathematics",ph:"/ˌmæθɪˈmætɪks/",pos:"n.",en:"the abstract science of number and quantity",zh:"數學",ex:"Recent studies show that males are more likely to pursue a career in mathematics than females.",exZh:"最近研究顯示，男性比女性更可能追求在數學裡的職業。",diff:2,unit:"P8L1"},
  {id:707,word:"electrical engineering",ph:"/ɪˌlektrɪkl ˌendʒɪˈnɪərɪŋ/",pos:"n.",en:"the branch of engineering concerned with electricity",zh:"電機工程",ex:"Advancements in robotics are currently generating a lot of buzz in the field of electrical engineering.",exZh:"機器人技術的進步目前在電機工程領域引起熱烈的討論。",diff:3,unit:"P8L1"},
  // P8L2 Scientist 科學家
  {id:708,word:"devote",ph:"/dɪˈvəʊt/",pos:"v.",en:"to give time or effort to a particular activity",zh:"投入；奉獻",ex:"PhD students must devote hundreds of hours to their research before graduating.",exZh:"博士生畢業前必須投入數百小時到他們的研究中。",diff:3,unit:"P8L2"},
  {id:709,word:"humanise",ph:"/ˈhjuːmənaɪz/",pos:"v.",en:"to make something more humane or considerate",zh:"人性化；使人性化",ex:"An ongoing challenge in robotics is how to humanise robots in a way people can accept.",exZh:"機器人技術中一項持續的挑戰是，如何以人們能接受的方式使機器人員人性化。",diff:4,unit:"P8L2"},
  {id:710,word:"hypothesise",ph:"/haɪˈpɒθɪsaɪz/",pos:"v.",en:"to propose an explanation as a starting point",zh:"假設；提出假說",ex:"In fields like particle physics where evidence is lacking, scientists must hypothesise why things happen.",exZh:"在像粒子物理學這樣證據缺乏的領域，科學家必須假設事情為何發生。",diff:5,unit:"P8L2"},
  {id:711,word:"theorise",ph:"/ˈθɪəraɪz/",pos:"v.",en:"to form a theory or theories about something",zh:"理論化；建立理論",ex:"When lacking empirical evidence to explain something, scientists must theorise instead.",exZh:"當缺乏經驗證據來解釋某些事情時，科學家們必須改以理論化。",diff:4,unit:"P8L2"},
  {id:712,word:"eminent",ph:"/ˈemɪnənt/",pos:"adj.",en:"famous and respected within a particular field",zh:"著名的；傑出的",ex:"The dangers of 5G to the public were recently put forward by several eminent scientists.",exZh:"最近有好幾位著名科學家提出了5G對公眾的危害。",diff:3,unit:"P8L2"},
  {id:713,word:"fellow",ph:"/ˈfeləʊ/",pos:"adj.",en:"sharing a similar characteristic or occupation",zh:"同事的；同類的",ex:"Among their fellow scientists, those hunting for extra-terrestrial life are not very popular.",exZh:"在他們同行科學家的同行中，那些尋找外星生命的人並不是很受歡迎。",diff:2,unit:"P8L2"},
  {id:714,word:"interdisciplinary",ph:"/ˌɪntəˈdɪsɪplɪnəri/",pos:"adj.",en:"relating to more than one branch of knowledge",zh:"跨學科的；跨領域的",ex:"Online publication allows scientists to potentially reach more interdisciplinary collaborators.",exZh:"線上發布讓科學家有可能接觸更多跨學科的合作者。",diff:5,unit:"P8L2"},
  {id:715,word:"elitist",ph:"/eɪˈliːtɪst/",pos:"adj.",en:"favouring or relating to an elite; exclusive",zh:"精英的；精英主義的",ex:"There is a persistent sentiment in society that academia is elitist.",exZh:"社會上有一種持續的觀點，即學術界都是精英。",diff:4,unit:"P8L2"},
  {id:716,word:"biologist",ph:"/baɪˈɒlədʒɪst/",pos:"n.",en:"a scientist who studies living organisms",zh:"生物學家",ex:"A lot of controversy surrounds the work of biologists in the field of genetics these days.",exZh:"現今，很多爭議圍繞著生物學家在遺傳學領域的工作。",diff:3,unit:"P8L2"},
  {id:717,word:"chemist",ph:"/ˈkemɪst/",pos:"n.",en:"a scientist who specialises in chemistry",zh:"化學家",ex:"Noted chemist Marie Curie won the Nobel Prize twice for her work in chemistry and physics.",exZh:"著名化學家瑪麗·居禮，因她在化學和物理學方面的工作而獲得兩次諾貝爾獎。",diff:3,unit:"P8L2"},
  {id:718,word:"electrical engineer",ph:"/ɪˌlektrɪkl ˌendʒɪˈnɪər/",pos:"n.",en:"an engineer who works with electrical systems",zh:"電機工程師",ex:"Electrical engineers make innovations every day that make people's lives easier.",exZh:"電機工程師每天都在進行創新，讓人們的生活更加便利。",diff:3,unit:"P8L2"},
  {id:719,word:"mathematician",ph:"/ˌmæθɪməˈtɪʃən/",pos:"n.",en:"an expert in mathematics",zh:"數學家",ex:"Mathematicians claim that mathematics is the universal language in the universe.",exZh:"數學家聲稱數學是宇宙間的通用語言。",diff:4,unit:"P8L2"},
  // P8L3 Research 研究
  {id:720,word:"conduct",ph:"/kənˈdʌkt/",pos:"v.",en:"to organise and carry out an activity",zh:"進行；執行",ex:"Researchers should conduct a feasibility study before submitting an application for a funding grant.",exZh:"研究員在提交資助金給予申請之前，應該進行一項可行性的研究。",diff:2,unit:"P8L3"},
  {id:721,word:"suggest",ph:"/səˈdʒest/",pos:"v.",en:"to put forward for consideration",zh:"提議；建議",ex:"New research into blueberries suggests that, if consumed daily, they have many cancer-beating properties.",exZh:"新的研究提出，如果每天食用藍莓，它們具有許多抗癌的特性。",diff:2,unit:"P8L3"},
  {id:722,word:"computerise",ph:"/kəmˈpjuːtəraɪz/",pos:"v.",en:"to convert to or control by computer",zh:"使電腦化；電腦化",ex:"Risky, costly or time-consuming experiments can nowadays be computerised in a virtual environment.",exZh:"危險、昂貴或耗時的實驗現今可以在虛擬環境中電腦化。",diff:4,unit:"P8L3"},
  {id:723,word:"yield",ph:"/jiːld/",pos:"v.",en:"to produce or provide a result",zh:"產生；產出",ex:"Cancer drugs that are approved too quickly often tend to yield negative results later.",exZh:"被太快批准的癌症藥物往往會在以後產生負面成效。",diff:3,unit:"P8L3"},
  {id:724,word:"empirical",ph:"/emˈpɪrɪkəl/",pos:"adj.",en:"based on observation or experiment",zh:"經驗的；實證的",ex:"Providing empirical evidence is imperative for researchers to achieve scientific consensus.",exZh:"提供經驗證據對於研究員達成科學共識是必要的。",diff:5,unit:"P8L3"},
  {id:725,word:"experimental",ph:"/ɪksˌperɪˈmentl/",pos:"adj.",en:"relating to or based on experiments",zh:"實驗的；試驗性的",ex:"Some people take part in human trials for experimental drugs in order to make extra income.",exZh:"有些人為了賺取額外收入參加人體試驗以測試實驗性藥物。",diff:3,unit:"P8L3"},
  {id:726,word:"qualitative",ph:"/ˈkwɒlɪtətɪv/",pos:"adj.",en:"relating to quality rather than quantity",zh:"定性的；質性的",ex:"To understand the underlying reasons for a problem, data must be analysed in a qualitative manner.",exZh:"為了瞭解問題的根本原因，數據必須被以定性方式分析。",diff:4,unit:"P8L3"},
  {id:727,word:"quantitative",ph:"/ˈkwɒntɪtətɪv/",pos:"adj.",en:"relating to quantity; expressed in numbers",zh:"定量的；量化的",ex:"For accuracy, scientists need large amounts of data collected using quantitative research techniques.",exZh:"為了準確性，科學家需要大量使用定量研究方法收集的數據。",diff:4,unit:"P8L3"},
  {id:728,word:"conclusion",ph:"/kənˈkluːʒən/",pos:"n.",en:"a judgment reached by reasoning",zh:"結論；結果",ex:"Climatologists are coming to the conclusion that polar ice may be melting faster than previously thought.",exZh:"氣候學家得出的結論是，極地冰可能比先前所認為的更快融化。",diff:3,unit:"P8L3"},
  {id:729,word:"method",ph:"/ˈmeθəd/",pos:"n.",en:"a particular way of doing something",zh:"方法；辦法",ex:"Although methods have been invented to clear microplastics from the oceans, the problem is still unfathomable on scale.",exZh:"雖然已經發明出清除海洋中微塑料的方法，但此問題在規模上仍難以解決。",diff:2,unit:"P8L3"},
  {id:730,word:"purpose",ph:"/ˈpɜːpəs/",pos:"n.",en:"the reason for which something is done",zh:"目的；目標",ex:"Many people question the purpose of national space programmes.",exZh:"許多人質疑國家太空計畫的目的。",diff:2,unit:"P8L3"},
  {id:731,word:"phenomenon",ph:"/fɪˈnɒmɪnən/",pos:"n.",en:"a fact or event that is observed to exist",zh:"現象",ex:"An urban heat island is a phenomenon that is affecting the world.",exZh:"城市熱島是一種正在影響全世界的現象。",diff:4,unit:"P8L3"},
  // P8L4 Experimentation 實驗
  {id:732,word:"carry out",ph:"/ˈkæri aʊt/",pos:"v.",en:"to complete a task or activity",zh:"進行；執行",ex:"A growing number of scientists are employing amateurs to help carry out experiments in the field.",exZh:"愈來愈多的科學家正在雇用業餘愛好者來幫忙進行該領域的實驗。",diff:2,unit:"P8L4"},
  {id:733,word:"design",ph:"/dɪˈzaɪn/",pos:"v.",en:"to plan and create something for a specific purpose",zh:"設計；規劃",ex:"Experiments must be designed following the scientific method in order to be verifiable.",exZh:"實驗必須按照科學方法設計，以便能夠被驗證。",diff:2,unit:"P8L4"},
  {id:734,word:"probe",ph:"/prəʊb/",pos:"v.",en:"to investigate or explore something closely",zh:"探測；探查",ex:"Scientists have just invented a camera that uses electrons to probe matter to view its atomic structure.",exZh:"科學家剛剛發明一種利用電子來探測物質以觀察其原子結構的相機。",diff:3,unit:"P8L4"},
  {id:735,word:"exemplify",ph:"/ɪɡˈzemplifaɪ/",pos:"v.",en:"to be a typical example of something",zh:"例例證明；作為典型",ex:"Governments' commitment to funding research can be exemplified by the multibillion-dollar fusion reactor.",exZh:"數十億美元的核融合反應器可作為政府對資助研究承諾的證明。",diff:4,unit:"P8L4"},
  {id:736,word:"chemical",ph:"/ˈkemɪkəl/",pos:"adj.",en:"relating to chemistry or chemicals",zh:"化學的；化學性的",ex:"Scientists are continually looking for chemical clues as to the evolution of life on Earth.",exZh:"科學家不斷尋找有關地球生命演化的化學線索。",diff:2,unit:"P8L4"},
  {id:737,word:"magnetic",ph:"/mæɡˈnetɪk/",pos:"adj.",en:"relating to or having the properties of a magnet",zh:"磁性的；有磁性的",ex:"An exciting new magnetic way to remove plastics from oceans has recently been devised.",exZh:"最近研發出一種令人興奮的新磁性方法，用於清除海洋中的塑料。",diff:3,unit:"P8L4"},
  {id:738,word:"radioactive",ph:"/ˌreɪdiəʊˈæktɪv/",pos:"adj.",en:"emitting radiation as a result of nuclear decay",zh:"放射性的；有輻射的",ex:"Of major concern to the world is the high-level radioactive waste that has yet to be disposed properly.",exZh:"世界主要關注的是尚未妥善處理的高放射性廢物。",diff:4,unit:"P8L4"},
  {id:739,word:"revolutionary",ph:"/ˌrevəˈluːʃənəri/",pos:"adj.",en:"involving or causing a dramatic change",zh:"革命性的；革命的",ex:"The wide use of artificial intelligence in science is leading to revolutionary discoveries of late.",exZh:"科學中人工智慧的廣泛使用正在導致最近革命性的發現。",diff:3,unit:"P8L4"},
  {id:740,word:"database",ph:"/ˈdeɪtəbeɪs/",pos:"n.",en:"a structured set of data held in a computer",zh:"數據庫；資料庫",ex:"Data mining is the practice of examining existing databases in order to discover new information.",exZh:"數據挖掘是檢查現有數據庫以發現新資訊的做法。",diff:3,unit:"P8L4"},
  {id:741,word:"breakthrough",ph:"/ˈbreɪkθruː/",pos:"n.",en:"a sudden important development or discovery",zh:"突破；重大發現",ex:"Many amateur scientists are making breakthroughs despite a lack of funding.",exZh:"儘管缺乏資金，許多業餘科學家仍在取得突破。",diff:3,unit:"P8L4"},
  {id:742,word:"laboratory",ph:"/ləˈbɒrətəri/",pos:"n.",en:"a room for scientific experiments",zh:"實驗室",ex:"Some important inventions were the result of experiments in the laboratory that had gone wrong.",exZh:"一些重要的發明是實驗室裡出了錯的實驗之結果。",diff:3,unit:"P8L4"},
  {id:743,word:"specification",ph:"/ˌspesɪfɪˈkeɪʃən/",pos:"n.",en:"a detailed description of design or materials",zh:"規範；規格",ex:"New technology intended for public use must always comply with government-mandated specifications.",exZh:"為公眾所使用的新科技必須始終符合政府規定的規範。",diff:4,unit:"P8L4"},
  // P8L5 Units 單位
  {id:744,word:"calculate",ph:"/ˈkælkjuleɪt/",pos:"v.",en:"to determine mathematically",zh:"計算；估算",ex:"The thing I love about science is that even calculating the mass of the smallest particle is possible.",exZh:"我愛科學的是，即使是計算最小粒子的質量也是有可能做到的。",diff:2,unit:"P8L5"},
  {id:745,word:"measure",ph:"/ˈmeʒər/",pos:"v.",en:"to determine the size, amount, or degree of something",zh:"測量；衡量",ex:"Being able to control conditions in an experiment is essential to measure accurately and fairly.",exZh:"能夠控制實驗的條件對於能夠準確且公平的測量至關重要。",diff:2,unit:"P8L5"},
  {id:746,word:"formulate",ph:"/ˈfɔːmjuleɪt/",pos:"v.",en:"to create or devise a plan or system",zh:"制定；制訂",ex:"The scientific community is trying to formulate a method to predict volcanic eruptions.",exZh:"科學界在試圖制定一項預測火山爆發的方法。",diff:3,unit:"P8L5"},
  {id:747,word:"calibrate",ph:"/ˈkælɪbreɪt/",pos:"v.",en:"to mark or adjust a measuring instrument",zh:"校準；標定",ex:"It is necessary to calibrate your equipment to suit the environmental conditions of your experiment.",exZh:"校準你的儀器以適合你實驗的環境條件是必要的。",diff:4,unit:"P8L5"},
  {id:748,word:"decimal",ph:"/ˈdesɪməl/",pos:"adj.",en:"relating to a system based on the number ten",zh:"小數的；十進位的",ex:"Scientific measurements must be accurate to several decimal places.",exZh:"科學測量必須準確到小數點後幾位數。",diff:3,unit:"P8L5"},
  {id:749,word:"metric",ph:"/ˈmetrɪk/",pos:"adj.",en:"relating to the system of measurement based on metres",zh:"公制的；米制的",ex:"Most of the world utilises the metric system of measuring units.",exZh:"世界上大部分地區採用公制測量單位系統。",diff:2,unit:"P8L5"},
  {id:750,word:"square",ph:"/skweər/",pos:"adj.",en:"denoting a unit of measurement equal to a square",zh:"平方的；正方形的",ex:"The majority of the world's land area is measured using square meters.",exZh:"世界上的土地面積大部分是使用平方公尺來測量。",diff:2,unit:"P8L5"},
  {id:751,word:"imperial",ph:"/ɪmˈpɪəriəl/",pos:"adj.",en:"relating to the non-metric system of measurement",zh:"英制的；帝國的",ex:"America is perhaps the biggest proponent of the old imperial measurement system.",exZh:"美國可能是舊英制測量系統的最大支持者。",diff:3,unit:"P8L5"},
  {id:752,word:"density",ph:"/ˈdensɪti/",pos:"n.",en:"the degree of compactness of a substance",zh:"密度",ex:"The varying densities of oils allow many products to be made from them.",exZh:"油品不同的密度使得許多產品可以由其製成。",diff:3,unit:"P8L5"},
  {id:753,word:"mass",ph:"/mæs/",pos:"n.",en:"the quantity of matter in a body",zh:"質量；重量",ex:"Lower gravity on the moon means astronauts there have the same mass as on earth, but weigh less.",exZh:"月球上較低的引力代表太空人在那裡有跟地球一樣的質量，但是重量較輕。",diff:2,unit:"P8L5"},
  {id:754,word:"volume",ph:"/ˈvɒljum/",pos:"n.",en:"the amount of space occupied by a substance",zh:"體積；容量",ex:"Arctic scientists regularly use the volume of ice lost each year as an indicator of climate change.",exZh:"北極科學家經常使用每年流失的冰的體積作為氣候變遷的指標。",diff:2,unit:"P8L5"},
  {id:755,word:"ampere",ph:"/ˈæmpeər/",pos:"n.",en:"the basic unit of electrical current",zh:"安培",ex:"An ampere is the original term for amp, a basic unit of electrical current.",exZh:"安培是amp的原始術語，是電流的基本單位。",diff:4,unit:"P8L5"},
  // P8L6 Influence 影響
  {id:756,word:"defend",ph:"/dɪˈfend/",pos:"v.",en:"to protect from attack or criticism",zh:"保衛；捍衛",ex:"Science is increasingly having to defend itself against attacks from political groups.",exZh:"科學愈來愈需要保衛其免受於政治團體的攻擊。",diff:2,unit:"P8L6"},
  {id:757,word:"enhance",ph:"/ɪnˈhɑːns/",pos:"v.",en:"to increase or further improve quality or value",zh:"提升；增強",ex:"Promoting research into niche scientific areas via social media enhances their funding and exposure.",exZh:"藉由社交媒體促進對利基科學領域的研究，可提升其資金和曝光度。",diff:3,unit:"P8L6"},
  {id:758,word:"forecast",ph:"/ˈfɔːkɑːst/",pos:"v.",en:"to predict a future event or development",zh:"預測；預報",ex:"Many science fiction writers have shown a remarkable ability to forecast the future.",exZh:"許多科幻小說作家已表現出預測未來的驚人能力。",diff:3,unit:"P8L6"},
  {id:759,word:"generate",ph:"/ˈdʒenəreɪt/",pos:"v.",en:"to produce or create something",zh:"產生；生成",ex:"Publishing a research article in an Open Access journal generates more visibility than a traditional one.",exZh:"在開放取的期刊中發表一篇研究文章比傳統期刊能夠產生更多能見度。",diff:3,unit:"P8L6"},
  {id:760,word:"indispensable",ph:"/ˌɪndɪˈspensəbl/",pos:"adj.",en:"absolutely necessary; essential",zh:"不可或缺的；必不可少的",ex:"Peer review is an indispensable part of the scientific process.",exZh:"同行審查是科學程序中不可或缺的一部分。",diff:4,unit:"P8L6"},
  {id:761,word:"inevitable",ph:"/ɪnˈevɪtəbl/",pos:"adj.",en:"certain to happen; unavoidable",zh:"不可避免的；必然的",ex:"With controversial research studies, such as in nutrition, comes inevitable disagreement.",exZh:"對於有爭議的研究，例如營養學方面的研究，不可避免的會出現分歧。",diff:3,unit:"P8L6"},
  {id:762,word:"overwhelming",ph:"/ˌəʊvəˈhwelmɪŋ/",pos:"adj.",en:"very great in amount; impossible to resist",zh:"壓倒性的；難以抵擋的",ex:"Many scientists claim there is overwhelming evidence in support of evolution.",exZh:"許多科學家聲稱有壓倒性的證據支持進化論。",diff:3,unit:"P8L6"},
  {id:763,word:"pervasive",ph:"/pəˈveɪsɪv/",pos:"adj.",en:"spreading widely throughout an area or group",zh:"普遍的；無處不在的",ex:"There is pervasive concern over the growing influence of politics on science.",exZh:"人們普遍擔心政治對科學日益增長的影響力。",diff:4,unit:"P8L6"},
  {id:764,word:"notion",ph:"/ˈnəʊʃən/",pos:"n.",en:"a concept or belief about something",zh:"概念；觀念",ex:"Even Einstein's notions of gravity and general relativity are still being debated.",exZh:"即使是愛因斯坦的重力和廣義相對論的概念也仍在被爭論中。",diff:3,unit:"P8L6"},
  {id:765,word:"potential",ph:"/pəˈtenʃəl/",pos:"n.",en:"latent qualities or abilities that may be developed",zh:"可能；潛力",ex:"Gene editing has the potential to feed the world and radically alter mankind's approach to health.",exZh:"基因編輯有可能養活全世界，並且從根本上改變人類獲得健康的方法。",diff:3,unit:"P8L6"},
  {id:766,word:"correlation",ph:"/ˌkɒrɪˈleɪʃən/",pos:"n.",en:"a mutual relationship between two things",zh:"相關性；關聯",ex:"There is evidence that shows a correlation between satisfaction at being alone and intelligence.",exZh:"有證據顯示，獨處時的滿足感與智力之間有相關性。",diff:4,unit:"P8L6"},
  {id:767,word:"status quo",ph:"/ˌsteɪtəs ˈkwəʊ/",pos:"n.",en:"the existing state of affairs",zh:"現狀",ex:"Staying abreast of science news can be hard with so many new discoveries that challenge the status quo.",exZh:"有這麼多挑戰現狀的新發現，要與科學新聞與時並進可能很難。",diff:4,unit:"P8L6"},
  // P8L7 Impact 衝擊
  {id:768,word:"reflect",ph:"/rɪˈflekt/",pos:"v.",en:"to show or represent something",zh:"反映；體現",ex:"The importance of computer skills in the workplace reflects the ongoing computerisation of society.",exZh:"電腦技能在工作場所的重要性，反映出社會的持續不斷電腦化。",diff:2,unit:"P8L7"},
  {id:769,word:"clone",ph:"/kləʊn/",pos:"v.",en:"to make an identical copy of an organism",zh:"複製；克隆",ex:"The possibility that mankind could one day clone humans has many scientists worried.",exZh:"人類有一天可以複製人類的可能性讓許多科學家感到擔憂。",diff:3,unit:"P8L7"},
  {id:770,word:"intertwine",ph:"/ˌɪntəˈtwaɪn/",pos:"v.",en:"to twist or link together closely",zh:"使緊密關聯；相互交織",ex:"The topics of genetically modified foods and public health are closely intertwined.",exZh:"基因改造食品和公共健康的議題緊密關聯。",diff:4,unit:"P8L7"},
  {id:771,word:"intervene",ph:"/ˌɪntəˈviːn/",pos:"v.",en:"to become involved to alter a situation",zh:"介入；干預",ex:"I believe that world leaders should be doing more to intervene in the fight against global warming.",exZh:"我認為世界各國領導人應該更加努力去介入對抗全球暖化的戰鬥中。",diff:3,unit:"P8L7"},
  {id:772,word:"cumulative",ph:"/ˈkjuːmjulətɪv/",pos:"adj.",en:"increasing by successive additions",zh:"累積的；漸增的",ex:"Science is a cumulative process in which scientists question and build on past work.",exZh:"科學是一個累積的過程，科學家質疑過去的研究，並以此為基礎拓展。",diff:4,unit:"P8L7"},
  {id:773,word:"destructive",ph:"/dɪˈstrʌktɪv/",pos:"adj.",en:"causing great harm or damage",zh:"破壞性的；毀滅性的",ex:"Large asteroids from outer space are destructive threats to the planet's future.",exZh:"來自外太空的大型小行星是對地球未來一破壞性的威脅。",diff:3,unit:"P8L7"},
  {id:774,word:"far-reaching",ph:"/ˈfɑːˌriːtʃɪŋ/",pos:"adj.",en:"having a wide range of influence or effects",zh:"影響深遠的；廣泛的",ex:"Far-reaching claims are seldom believable unless they are backed up by hard evidence.",exZh:"除非有強而有力的證據，否則影響深遠的主張很少可信。",diff:4,unit:"P8L7"},
  {id:775,word:"marginal",ph:"/ˈmɑːdʒɪnəl/",pos:"adj.",en:"relating to a minor or small change",zh:"微小的；邊際的",ex:"Publicity notwithstanding, there have only been marginal improvements in gender equality in science.",exZh:"儘管有宣傳，科學界裡的兩性平等只有小幅改善。",diff:4,unit:"P8L7"},
  {id:776,word:"artificial intelligence",ph:"/ˌɑːtɪfɪʃl ɪnˈtelɪdʒəns/",pos:"n.",en:"computer systems performing tasks requiring human intelligence",zh:"人工智慧",ex:"The use of Artificial Intelligence has turbocharged the rate at which scientific discoveries are made.",exZh:"人工智慧的應用大幅加速了科學發現的進程。",diff:3,unit:"P8L7"},
  {id:777,word:"factor",ph:"/ˈfæktər/",pos:"n.",en:"a circumstance contributing to a result",zh:"因素；要素",ex:"Levels of air pollution are a significant factor in where people choose to live.",exZh:"空氣污染程度是影響人們選擇居住地的重要因素。",diff:2,unit:"P8L7"},
  {id:778,word:"radiation",ph:"/ˌreɪdiˈeɪʃən/",pos:"n.",en:"energy emitted in the form of waves or particles",zh:"輻射；放射",ex:"Investigations into the effect of radiation from 5G mobile phones are ongoing.",exZh:"針對5G手機輻射影響之調查目前正在進行中。",diff:3,unit:"P8L7"},
  {id:779,word:"virtual reality",ph:"/ˌvɜːtʃuəl riˈælɪti/",pos:"n.",en:"computer-generated simulation of a three-dimensional environment",zh:"虛擬實境",ex:"Virtual reality has important applications in travel and gaming.",exZh:"虛擬實境在旅遊和玩電腦遊戲上有重要的應用。",diff:3,unit:"P8L7"},
  // P8L8 Equipment 設備
  {id:780,word:"supply",ph:"/səˈplaɪ/",pos:"v.",en:"to provide with what is needed",zh:"提供；供應",ex:"The public may aid scientific studies by supplying computer power for the analysis of data.",exZh:"大眾可以透過提供電腦運算能力來協助科學研究進行資料分析。",diff:2,unit:"P8L8"},
  {id:781,word:"filter",ph:"/ˈfɪltər/",pos:"v.",en:"to pass a substance through a device to remove impurities",zh:"過濾；篩選",ex:"Coal-producing power stations must filter their carbon emissions to meet mandated limits.",exZh:"燃煤發電廠必須過濾其碳排放以符合法定的限制標準。",diff:2,unit:"P8L8"},
  {id:782,word:"solidify",ph:"/səˈlɪdɪfaɪ/",pos:"v.",en:"to make or become hard or solid",zh:"鞏固；使固化",ex:"Practical experiments in school help solidify students' understanding of their classes.",exZh:"學校的實驗活動有助於鞏固學生對課程的理解。",diff:3,unit:"P8L8"},
  {id:783,word:"distil",ph:"/dɪsˈtɪl/",pos:"v.",en:"to purify a liquid by heating and cooling",zh:"用蒸餾法提取；蒸餾",ex:"Desalination plants take seawater and distil the water by removing the salt.",exZh:"海水淡化廠獲取海水並經由脫鹽將水蒸餾出來。",diff:4,unit:"P8L8"},
  {id:784,word:"sensitive",ph:"/ˈsensɪtɪv/",pos:"adj.",en:"quick to detect or respond to slight changes",zh:"靈敏的；敏感的",ex:"Researchers in the field require gear that is sensitive enough to make the measurements they need.",exZh:"該領域中的研究員需要夠靈敏的設備來進行他們所需的測量。",diff:2,unit:"P8L8"},
  {id:785,word:"faulty",ph:"/ˈfɔːlti/",pos:"adj.",en:"not working or made correctly; defective",zh:"有缺陷的；故障的",ex:"Investment in quality equipment is essential in experiments, as faulty gear may lead to incorrect results.",exZh:"對高品質設備的投資在實驗中是必要的，因為故障的器材可能導致錯誤的結果。",diff:3,unit:"P8L8"},
  {id:786,word:"labour-saving",ph:"/ˈleɪbəˌseɪvɪŋ/",pos:"adj.",en:"designed to reduce the amount of work needed",zh:"節省勞力的；省力的",ex:"The labour-saving benefits of machines in industry have many people worried about their job security.",exZh:"在產業中，機器節省勞力的效益令許多人擔心他們工作的穩定性。",diff:3,unit:"P8L8"},
  {id:787,word:"volumetric",ph:"/ˌvɒljuˈmetrɪk/",pos:"adj.",en:"relating to measurement by volume",zh:"容量的；體積的",ex:"Volumetric flasks provide scientists with precise volumes with which to perform experiments.",exZh:"容量瓶為科學家提供精確的容量來用於進行實驗。",diff:5,unit:"P8L8"},
  {id:788,word:"gear",ph:"/ɡɪər/",pos:"n.",en:"equipment or apparatus used for a particular purpose",zh:"設備；裝備",ex:"There has been an explosion in wearable health-monitoring gear over the last decade.",exZh:"在過去十年，可穿戴式健康監測設備劇增。",diff:2,unit:"P8L8"},
  {id:789,word:"thermometer",ph:"/θəˈmɒmɪtər/",pos:"n.",en:"an instrument for measuring temperature",zh:"溫度計",ex:"Creating a homemade thermometer is a great way to get children interested in science.",exZh:"製作一個自製的溫度計，是讓小孩對科學感興趣的一個絕佳方法。",diff:3,unit:"P8L8"},
  {id:790,word:"alcohol lamp",ph:"/ˈælkəhɒl læmp/",pos:"n.",en:"a lamp burning alcohol used in laboratory work",zh:"酒精燈",ex:"Alcohol lamps produce open flames that are easy to control at a moderate temperature.",exZh:"酒精燈產生明火，在中等溫度下容易控制。",diff:2,unit:"P8L8"},
  {id:791,word:"glassware",ph:"/ˈɡlɑːsweər/",pos:"n.",en:"glass containers and equipment used in laboratories",zh:"玻璃器皿",ex:"Most laboratories utilise glassware equipment for its toughness and durability.",exZh:"大部分實驗室使用玻璃器皿是因為它堅固且耐用。",diff:3,unit:"P8L8"},

  // ── P9 Politics and Economy 政治與經濟 ───────────────────────
  // P9L1 Politics 政治
  {id:792,word:"abuse",ph:"/əˈbjuːz/",pos:"v.",en:"to use something in a wrong or harmful way",zh:"濫用；虐待",ex:"Nepotism is a good example of how members of government abuse their positions.",exZh:"裙帶關係是一個很好的例子，說明政府成員如何濫用職權。",diff:2,unit:"P9L1"},
  {id:793,word:"debate",ph:"/dɪˈbeɪt/",pos:"v.",en:"to argue or discuss a subject formally",zh:"辯論；討論",ex:"A functioning democracy is defined partially by its ability to allow open debate on all issues.",exZh:"一個正常運作的民主制度，其部分定義在於有能力允許所有議題的公開辯論。",diff:2,unit:"P9L1"},
  {id:794,word:"interfere",ph:"/ˌɪntəˈfɪər/",pos:"v.",en:"to involve oneself in affairs without invitation",zh:"干涉；干預",ex:"A common 21st century trend seems to be foreign nations interfering in the affairs of others.",exZh:"二十一世紀的一個共同趨勢似乎是外國干涉他國的事務。",diff:3,unit:"P9L1"},
  {id:795,word:"corrupt",ph:"/kəˈrʌpt/",pos:"v.",en:"to cause someone to act dishonestly",zh:"使腐敗；腐化",ex:"The reality is that money corrupts not only politicians but the trust of the public.",exZh:"事實是，金錢不僅使政治人物腐敗，也破壞了公眾之信任。",diff:3,unit:"P9L1"},
  {id:796,word:"extreme",ph:"/ɪksˈtriːm/",pos:"adj.",en:"reaching a high or the highest degree",zh:"極端的；過激的",ex:"Extreme activists often go too far in their fight for what they believe in.",exZh:"極端的激進分子往往在為其信仰而鬥爭時做得太過火。",diff:2,unit:"P9L1"},
  {id:797,word:"autonomous",ph:"/ɔːˈtɒnəməs/",pos:"adj.",en:"having self-government or independence",zh:"自治的；自主的",ex:"The UK is an example of a country composed of four autonomous regions.",exZh:"英國是由四個自治區組成國家的一個例子。",diff:4,unit:"P9L1"},
  {id:798,word:"comparative",ph:"/kəmˈpærətɪv/",pos:"adj.",en:"measured or judged by comparison with something else",zh:"相對的；比較的",ex:"China holds a comparative advantage over other nations in the products it can manufacture cheaply.",exZh:"中國在其能夠廉價製造的產品上，相較於其他國家擁有相對優勢。",diff:3,unit:"P9L1"},
  {id:799,word:"martial",ph:"/ˈmɑːʃəl/",pos:"adj.",en:"relating to war or the military",zh:"軍事的；戰爭的",ex:"Governments will instigate martial law in times of extreme civil unrest.",exZh:"在極端的國內動亂時期，政府將發起戒嚴令。",diff:4,unit:"P9L1"},
  {id:800,word:"authority",ph:"/əˈθɒrɪti/",pos:"n.",en:"the power to enforce laws or give orders",zh:"權力；當局",ex:"If governments overstep their authority according to the law, civil disorder may result.",exZh:"根據法律，如果政府越權，可能會導致內亂。",diff:2,unit:"P9L1"},
  {id:801,word:"opposition",ph:"/ˌɒpəˈzɪʃən/",pos:"n.",en:"resistance or conflict; the rival political party",zh:"反對；反對黨",ex:"Opposition parties are a natural part of any democracy and ensure all views are considered in parliament.",exZh:"反對黨是任何民主制度中一個自然組成的部分，並確保所有意見會在議會中受到考量。",diff:3,unit:"P9L1"},
  {id:802,word:"party",ph:"/ˈpɑːti/",pos:"n.",en:"an organised group seeking political power",zh:"政黨；黨",ex:"In a multi-party democratic system, it is unusual for one party to remain in power for a long time.",exZh:"在多黨民主制度中，一黨長期執政是很不尋常的。",diff:2,unit:"P9L1"},
  {id:803,word:"cabinet",ph:"/ˈkæbɪnɪt/",pos:"n.",en:"the group of most senior government ministers",zh:"內閣",ex:"A new president will typically appoint a cabinet of advisers when elected.",exZh:"新總統當選後通常會任命顧問內閣。",diff:3,unit:"P9L1"},
  // P9L2 Systems of Government 政體
  {id:804,word:"oppose",ph:"/əˈpəʊz/",pos:"v.",en:"to disagree with and work against something",zh:"反對；抗拒",ex:"It is the political parties' duty to oppose actions by a governing party that are bad for the nation.",exZh:"政黨有責任反對執政黨（做出）對國家有害的行為。",diff:2,unit:"P9L2"},
  {id:805,word:"incline",ph:"/ɪnˈklaɪn/",pos:"v.",en:"to tend towards a particular opinion or course of action",zh:"使傾向於；傾向",ex:"Most American voters say they are equally inclined to vote for a man or woman.",exZh:"大部分美國選民表示他們對於投票給男性或女性有同等傾向。",diff:3,unit:"P9L2"},
  {id:806,word:"mobilise",ph:"/ˈməʊbɪlaɪz/",pos:"v.",en:"to prepare and organise for action or war",zh:"動員；組織",ex:"In times of war, a nation's leaders will mobilise the army.",exZh:"在戰爭時期，國家的領導人將動員軍隊。",diff:3,unit:"P9L2"},
  {id:807,word:"revolt",ph:"/rɪˈvəʊlt/",pos:"v.",en:"to rise in rebellion against authority",zh:"反抗；起義",ex:"When a nation's people feel disenfranchised by their government, they are likely to revolt.",exZh:"當國家的人民感覺到被其政府剝奪公民權時，他們很有可能會反抗。",diff:3,unit:"P9L2"},
  {id:808,word:"imperial",ph:"/ɪmˈpɪəriəl/",pos:"adj.",en:"relating to an empire or emperor",zh:"皇帝的；帝國的",ex:"Presidents in some authoritarian governments may seek imperial levels of power.",exZh:"一些獨裁政府的總統可能會尋求皇權層級的權力。",diff:3,unit:"P9L2"},
  {id:809,word:"revolutionary",ph:"/ˌrevəˈluːʃənəri/",pos:"adj.",en:"involving or causing a complete change in a system",zh:"革命的；革命性的",ex:"Revolutionary uprisings are very often backed by a country's military.",exZh:"革命的起義通常受到國家軍隊的支持。",diff:3,unit:"P9L2"},
  {id:810,word:"successive",ph:"/səkˈsesɪv/",pos:"adj.",en:"following in order without interruption",zh:"相繼的；連續的",ex:"Successive governments are unlikely to follow the same policies as their predecessors.",exZh:"繼任政府不太可能遵循其前任（政府）的相同政策。",diff:3,unit:"P9L2"},
  {id:811,word:"transitional",ph:"/trænˈzɪʃənl/",pos:"adj.",en:"relating to a period of change between two states",zh:"過渡的；過渡時期的",ex:"A transitional government is traditionally established following the collapse of a previous governing body.",exZh:"傳統上，在前一執政機構崩潰後會建立過渡政府。",diff:4,unit:"P9L2"},
  {id:812,word:"communism",ph:"/ˈkɒmjunɪzəm/",pos:"n.",en:"a political system where property is owned collectively",zh:"共產主義",ex:"Communism is possibly still considered a practical way to run a country.",exZh:"共產主義可能仍被視為一種治理國家的有效方式。",diff:3,unit:"P9L2"},
  {id:813,word:"liberalism",ph:"/ˈlɪbərəlɪzəm/",pos:"n.",en:"a political ideology favouring individual freedoms",zh:"自由主義",ex:"A key factor of liberalism is increasing individual freedoms by limiting the power of governments.",exZh:"自由主義的一關鍵因素是藉由限制政府權力來增加個人自由。",diff:4,unit:"P9L2"},
  {id:814,word:"authoritarianism",ph:"/əˌθɒrɪˈteəriənɪzəm/",pos:"n.",en:"a political system with strict obedience to authority",zh:"獨裁主義；威權主義",ex:"There is a worrying rise in authoritarianism around the globe.",exZh:"全球獨裁主義的興起令人憂心。",diff:5,unit:"P9L2"},
  {id:815,word:"monarchism",ph:"/ˈmɒnəkɪzəm/",pos:"n.",en:"the support for rule by a monarch",zh:"君主制；君主主義",ex:"While support for unfettered monarchism remains low, most UK residents support having a monarch as a head of state.",exZh:"儘管對無限制君主制的支持度不高，大部分英國居民仍支持設有君主作為國家元首。",diff:5,unit:"P9L2"},
  // P9L3 Elections 選舉
  {id:816,word:"advocate",ph:"/ˈædvəkeɪt/",pos:"v.",en:"to publicly recommend or support something",zh:"支持；倡導",ex:"Successful political officers typically advocate issues important to the majority of people in a nation.",exZh:"成功的政治官員通常支持對國家大多數人民重要的議題。",diff:3,unit:"P9L3"},
  {id:817,word:"elect",ph:"/ɪˈlekt/",pos:"v.",en:"to choose by voting",zh:"選出；選舉",ex:"Voters should elect the candidate most capable, not the most popular.",exZh:"選民應該選出最有能力，而不是最受歡迎的候選人。",diff:2,unit:"P9L3"},
  {id:818,word:"re-elect",ph:"/ˌriːɪˈlekt/",pos:"v.",en:"to elect someone again to a position",zh:"再度選上；連任",ex:"Most politicians will seek to be re-elected by their constituents.",exZh:"大部分政治人物都會尋求其選民讓他們連任。",diff:2,unit:"P9L3"},
  {id:819,word:"vie",ph:"/vaɪ/",pos:"v.",en:"to compete eagerly with others",zh:"競爭；角逐",ex:"Most politicians vie for the hearts and minds of voters.",exZh:"大部分政治人物都在爭奪選民的感情和思想。",diff:4,unit:"P9L3"},
  {id:820,word:"fair and free",ph:"/feər ənd friː/",pos:"adj.",en:"conducted without bias or restriction",zh:"公平自由的",ex:"In fair and free elections, voters are free to choose candidates who are equally free to convey ideas.",exZh:"在公平自由的選舉中，選民可自由選擇同樣自由表達意見的候選人。",diff:2,unit:"P9L3"},
  {id:821,word:"upcoming",ph:"/ˈʌpkʌmɪŋ/",pos:"adj.",en:"about to happen; forthcoming",zh:"即將到來的；即將舉行的",ex:"Candidates often employ public relations companies to manage their images during upcoming elections.",exZh:"在即將到來的選舉期間，候選人通常聘請公關公司來管理他們的形象。",diff:2,unit:"P9L3"},
  {id:822,word:"contentious",ph:"/kənˈtenʃəs/",pos:"adj.",en:"causing or likely to cause disagreement",zh:"有爭議的；引起爭論的",ex:"Claims of tampering with electronic voting machines have made recent elections contentious in America.",exZh:"電子投票機竄改的主張使美國最近的選舉有爭議。",diff:4,unit:"P9L3"},
  {id:823,word:"multiparty",ph:"/ˈmʌltiˌpɑːti/",pos:"adj.",en:"involving or relating to multiple political parties",zh:"多黨的；多黨制的",ex:"A multiparty government depends heavily on the type of electoral system employed by the country.",exZh:"多黨制政府在很大程度上依賴於該國採用的選舉制度類型。",diff:3,unit:"P9L3"},
  {id:824,word:"campaign",ph:"/kæmˈpeɪn/",pos:"n.",en:"an organised effort to win an election or achieve a goal",zh:"競選運動；活動",ex:"The most successful political campaigns are usually the best funded.",exZh:"最成功的政治競選運動通常是資金最多的。",diff:2,unit:"P9L3"},
  {id:825,word:"democrat",ph:"/ˈdeməkræt/",pos:"n.",en:"a person who supports democracy",zh:"民主主義者；民主黨人",ex:"Most people in Western nations may be termed democrats.",exZh:"西方國家大多數人可以被稱為民主主義者。",diff:2,unit:"P9L3"},
  {id:826,word:"publicity",ph:"/pʌbˈlɪsɪti/",pos:"n.",en:"the notice or attention given to someone by the media",zh:"宣傳；公眾注意",ex:"An old adage states that there is no such thing as bad publicity.",exZh:"有句古老的諺語說，沒有什麼是不好的宣傳。",diff:3,unit:"P9L3"},
  {id:827,word:"electorate",ph:"/ɪˈlektərɪt/",pos:"n.",en:"all the people entitled to vote in an election",zh:"選民；全體選民",ex:"Electorate turnout in most industrialised nations tends to be consistently low.",exZh:"大部分工業化國家的選民投票率往往都很低。",diff:4,unit:"P9L3"},
  {id:828,word:"referendum",ph:"/ˌrefəˈrendəm/",pos:"n.",en:"a general vote on a specific political question",zh:"公民投票；全民公投",ex:"The number of referendums held globally has increased over the last few decades.",exZh:"過去幾十年裡，全球舉行的公民投票次數已經有所增加。",diff:4,unit:"P9L3"},
  // P9L4 Diplomacy 外交
  {id:829,word:"negotiate",ph:"/nɪˈɡəʊʃieɪt/",pos:"v.",en:"to reach an agreement through discussion",zh:"就...談判；協商",ex:"Countries may negotiate free trade deals in order to increase exports.",exZh:"各國可以就自由貿易協定談判以增加出口。",diff:3,unit:"P9L4"},
  {id:830,word:"conquer",ph:"/ˈkɒŋkər/",pos:"v.",en:"to overcome or defeat successfully",zh:"克服；征服",ex:"Economic diplomacy employs economic growth as a means to conquer poverty in developing nations.",exZh:"經濟外交利用經濟成長作為克服開發中國家貧困的手段。",diff:3,unit:"P9L4"},
  {id:831,word:"esteem",ph:"/ɪˈstiːm/",pos:"v.",en:"to respect and admire greatly",zh:"尊重；敬重",ex:"While diplomats are highly esteemed, foreign service remains greatly underfunded in many nations.",exZh:"儘管外交官僅受尊重，但在許多國家，外交服務仍然嚴重缺乏資金。",diff:3,unit:"P9L4"},
  {id:832,word:"reside",ph:"/rɪˈzaɪd/",pos:"v.",en:"to exist or be present in something",zh:"存在；居住",ex:"Some tensions between countries reside in conflicts dating back decades.",exZh:"一些國家之間的緊張關係存在於數十年前的衝突中。",diff:3,unit:"P9L4"},
  {id:833,word:"mutual",ph:"/ˈmjuːtʃuəl/",pos:"adj.",en:"experienced or done by each of two or more parties",zh:"相互的；共同的",ex:"Successful relationships between countries are based on mutual trust and cooperation.",exZh:"國與國之間成功的關係是基於相互信任與合作。",diff:2,unit:"P9L4"},
  {id:834,word:"de facto",ph:"/deɪ ˈfæktəʊ/",pos:"adj.",en:"existing in fact, though not officially established",zh:"事實上的；實際上的",ex:"Political groups who declare themselves the de facto government of a country are rarely democratically chosen.",exZh:"聲稱自己事實上是國家政府的政治團體，很少是透過民主方式選出的。",diff:5,unit:"P9L4"},
  {id:835,word:"maritime",ph:"/ˈmærɪtaɪm/",pos:"adj.",en:"relating to the sea or navigation",zh:"海事的；海上的",ex:"According to maritime treaties, international waters lie outside national jurisdictions.",exZh:"根據海事條約，國際水域在國家管轄範圍之外。",diff:4,unit:"P9L4"},
  {id:836,word:"trenchant",ph:"/ˈtrentʃənt/",pos:"adj.",en:"vigorous and direct in expression; sharp",zh:"銳利的；尖銳的",ex:"In diplomatic circles, trenchant criticism should be reserved for only the most extreme situations.",exZh:"在外交圈，銳利的批評只應保留給最極端的情況。",diff:5,unit:"P9L4"},
  {id:837,word:"ally",ph:"/ˈælaɪ/",pos:"n.",en:"a country or person that cooperates with another",zh:"盟友；同盟國",ex:"Every country has allies who may receive preferential treatment in areas such as trade or aid.",exZh:"每個國家都有在貿易或援助等領域可以獲得優惠待遇的盟友。",diff:2,unit:"P9L4"},
  {id:838,word:"embassy",ph:"/ˈembəsi/",pos:"n.",en:"the official residence of an ambassador in a foreign country",zh:"大使館",ex:"Embassies serve as the first line of diplomacy in diplomatic disputes.",exZh:"大使館在外交糾紛中擔任外交的第一道戰線。",diff:3,unit:"P9L4"},
  {id:839,word:"envoy",ph:"/ˈenvɔɪ/",pos:"n.",en:"a messenger or representative sent on a special mission",zh:"使節；特使",ex:"Specialists who are best able to handle an issue overseas may be appointed as a nation's special envoy.",exZh:"最有能力處理海外問題的專家可能被任命為一個國家的特使。",diff:4,unit:"P9L4"},
  {id:840,word:"statecraft",ph:"/ˈsteɪtkrɑːft/",pos:"n.",en:"the skill of managing state affairs",zh:"治國才能；政治手腕",ex:"Politicians should be elected for their abilities in statecraft, and not their level of popularity.",exZh:"政治家應當因為其治國才能當選，而不是他們受歡迎的程度。",diff:5,unit:"P9L4"},
  // P9L5 Aid 援助
  {id:841,word:"distribute",ph:"/dɪˈstrɪbjuːt/",pos:"v.",en:"to give or deliver to a number of people",zh:"分配；分發",ex:"Funds distributed through foreign aid do not always reach the people overseas who need it most.",exZh:"透過外援分配的資金並不總是能夠到達最需要它的海外人民手中。",diff:2,unit:"P9L5"},
  {id:842,word:"enlist",ph:"/ɪnˈlɪst/",pos:"v.",en:"to recruit or engage support for a cause",zh:"招募；徵召",ex:"Governments typically enlist the army in disaster relief efforts in extreme situations.",exZh:"在極端情況下的災難救援工作，政府通常會招募軍隊。",diff:3,unit:"P9L5"},
  {id:843,word:"induce",ph:"/ɪnˈdjuːs/",pos:"v.",en:"to succeed in persuading someone to do something",zh:"促使；誘使",ex:"Only foreign aid policies tied to strict developmental benchmarks can induce long-term economic growth.",exZh:"只有與嚴格發展基準緊密相關的外國援助政策才能促進長期的經濟增長。",diff:3,unit:"P9L5"},
  {id:844,word:"pledge",ph:"/pledʒ/",pos:"v.",en:"to commit to give or do something",zh:"保證給予；承諾",ex:"Aid agencies rely on the public to pledge or donate money to support them.",exZh:"援助機構仰賴大眾承諾捐助或捐款來支持它們。",diff:2,unit:"P9L5"},
  {id:845,word:"altruistic",ph:"/ˌæltruˈɪstɪk/",pos:"adj.",en:"showing unselfish concern for others",zh:"利他的；無私的",ex:"Most people in wealthy countries feel that overseas aid stems from altruistic motives.",exZh:"大部分富裕國家的人認為海外援助源於利他的動機。",diff:4,unit:"P9L5"},
  {id:846,word:"bilateral",ph:"/baɪˈlætərəl/",pos:"adj.",en:"involving two parties or countries",zh:"雙邊的；雙方的",ex:"Much foreign aid results from bilateral agreements between foreign leaders.",exZh:"許多國外援助來自於外國領導人之間的雙邊協議。",diff:4,unit:"P9L5"},
  {id:847,word:"humanitarian",ph:"/hjuːˌmænɪˈteəriən/",pos:"adj.",en:"concerned with human welfare and the reduction of suffering",zh:"人道主義的；人道的",ex:"An argument against humanitarian aid is that it promotes economic dependency among recipient countries.",exZh:"反對人道主義救援的一個論點是它促進了受援助國之間的經濟依賴。",diff:4,unit:"P9L5"},
  {id:848,word:"multilateral",ph:"/ˌmʌltiˈlætərəl/",pos:"adj.",en:"involving more than two parties or countries",zh:"多邊的；多方的",ex:"Many pressing challenges such as climate change require multilateral action more than ever.",exZh:"許多迫切的挑戰如氣候變遷，比以往任何時候更需要多邊行動。",diff:4,unit:"P9L5"},
  {id:849,word:"donor",ph:"/ˈdəʊnər/",pos:"n.",en:"a person or organisation that donates to a cause",zh:"捐助者；捐贈者",ex:"A recent alarming trend by donors has been to cut funding for humanitarian crises.",exZh:"一個最近令人擔憂的趨勢是，捐助者已削減對人道危機的資金。",diff:3,unit:"P9L5"},
  {id:850,word:"provision",ph:"/prəˈvɪʒən/",pos:"n.",en:"the action of providing or supplying something",zh:"提供；供應",ex:"Micro-finance is a type of economic assistance through the provision of small loans.",exZh:"微型信貸是一種透過小額貸款提供的經濟援助形式。",diff:3,unit:"P9L5"},
  {id:851,word:"endowment",ph:"/ɪnˈdaʊmənt/",pos:"n.",en:"a fund or property donated to an institution",zh:"捐贈基金；捐款",ex:"Individual overseas aid projects may be financed through regular grants from endowment funds.",exZh:"個別海外援助計畫可經由捐贈基金的定期補助金來被資助。",diff:4,unit:"P9L5"},
  {id:852,word:"subsidy",ph:"/ˈsʌbsɪdi/",pos:"n.",en:"money granted by the government to support an industry",zh:"補貼；補助金",ex:"In developing countries, the removal of subsidies may only increase reliance on foreign aid.",exZh:"在開發中國家，取消補貼可能只會增加對外國援助的依賴。",diff:4,unit:"P9L5"},
  // P9L6 Economy 經濟
  {id:853,word:"handle",ph:"/ˈhændl/",pos:"v.",en:"to manage or cope with a situation",zh:"應付；處理",ex:"People living paycheck to paycheck are not well-placed to handle an economic downturn.",exZh:"靠一份接著一份工資支票過活的人，不容易應對經濟衰退。",diff:2,unit:"P9L6"},
  {id:854,word:"barter",ph:"/ˈbɑːtər/",pos:"v.",en:"to exchange goods without using money",zh:"以物易物；物物交換",ex:"In remote parts of the world, people still barter for daily necessities.",exZh:"在世界上的偏遠地區，人們仍以物易物換取日常必需品。",diff:3,unit:"P9L6"},
  {id:855,word:"orient",ph:"/ˈɔːriənt/",pos:"v.",en:"to direct something towards a particular aim",zh:"使面向；調整方向",ex:"China has been trying to orient its economy away from export-led growth towards consumption.",exZh:"中國一直試圖將經濟從出口導向型成長轉向以消費為主。",diff:3,unit:"P9L6"},
  {id:856,word:"propel",ph:"/prəˈpel/",pos:"v.",en:"to drive or push something forward",zh:"推動；驅動",ex:"Economists see urbanisation as a key factor for countries wishing to propel economic growth.",exZh:"經濟學家認為都市化在希望推動經濟成長的國家中是一關鍵因素。",diff:3,unit:"P9L6"},
  {id:857,word:"depressed",ph:"/dɪˈprest/",pos:"adj.",en:"suffering from a period of economic decline",zh:"蕭條的；不景氣的",ex:"The financial crisis of 2008 caused depressed economic activity around the world.",exZh:"2008年的金融危機導致全世界經濟活動蕭條。",diff:3,unit:"P9L6"},
  {id:858,word:"bullish",ph:"/ˈbʊlɪʃ/",pos:"adj.",en:"optimistic about the economy or investments",zh:"充滿信心的；看漲的",ex:"When an economy is strong, investors will be bullish about a nation's future.",exZh:"當經濟強健，投資者就會對國家的未來充滿信心。",diff:4,unit:"P9L6"},
  {id:859,word:"elastic",ph:"/ɪˈlæstɪk/",pos:"adj.",en:"able to recover quickly from difficult situations",zh:"有彈性的；靈活的",ex:"Climate change is a long-term economic threat from which there may be no elastic recovery.",exZh:"氣候變遷是一種可能無法彈性復原的長期經濟威脅。",diff:4,unit:"P9L6"},
  {id:860,word:"overheated",ph:"/ˌəʊvəˈhiːtɪd/",pos:"adj.",en:"of an economy growing too fast, causing inflation",zh:"過熱的（經濟發展）",ex:"Signs of an overheated economy include extremely high employment rates and high rates of inflation.",exZh:"經濟過熱的跡象包括極高就業率和高通貨膨脹率。",diff:4,unit:"P9L6"},
  {id:861,word:"inflation",ph:"/ɪnˈfleɪʃən/",pos:"n.",en:"a general increase in prices over time",zh:"通貨膨脹",ex:"Inflation creates a problem where the cost of goods rises far faster than people's incomes.",exZh:"通貨膨脹造成了一個問題，即商品價格的上漲速度遠快於人們的收入增長。",diff:3,unit:"P9L6"},
  {id:862,word:"transaction",ph:"/trænˈzækʃən/",pos:"n.",en:"an instance of buying or selling",zh:"交易；買賣",ex:"Transactions that occur on the black market are not taxed, and thus generate no revenue for governments.",exZh:"黑市發生的交易不徵稅，因此不會為政府帶來收入。",diff:3,unit:"P9L6"},
  {id:863,word:"accrual",ph:"/əˈkruːəl/",pos:"n.",en:"the process of accumulating something over time",zh:"累積；應計",ex:"Property is usually seen as the best way to ensure the accrual of wealth over time.",exZh:"地產通常被視為確保財富隨時間累積的最佳方式。",diff:5,unit:"P9L6"},
  {id:864,word:"scarcity",ph:"/ˈskeəsɪti/",pos:"n.",en:"the state of being scarce or in short supply",zh:"短缺；稀少",ex:"Governments should build sufficient housing to avoid a housing bubble caused by a scarcity of the resource.",exZh:"政府應建造足夠的住宅，以避免因資源短缺引發的房地產泡沫。",diff:4,unit:"P9L6"},
  // P9L7 Consumerism 消費
  {id:865,word:"consume",ph:"/kənˈsjuːm/",pos:"v.",en:"to buy and use up goods and services",zh:"消費；消耗",ex:"Many young people are groomed to consume through thousands of ads viewed every day.",exZh:"許多年輕人被培養成透過每天看數千則廣告來消費。",diff:2,unit:"P9L7"},
  {id:866,word:"demand",ph:"/dɪˈmɑːnd/",pos:"v.",en:"to require or call for as a necessity",zh:"需要；要求",ex:"Global plastic use is set to rise as consumers increasingly demand more packaged convenience foods.",exZh:"隨著消費者對包裝便利食品的需求逐漸增加，全球塑膠使用量預計將上升。",diff:2,unit:"P9L7"},
  {id:867,word:"purchase",ph:"/ˈpɜːtʃəs/",pos:"v.",en:"to buy something",zh:"購買；採購",ex:"Companies strive to create a desire within consumers to continue to purchase more of their products.",exZh:"一些公司努力激發消費者持續購買更多他們產品的欲望。",diff:2,unit:"P9L7"},
  {id:868,word:"merchandise",ph:"/ˈmɜːtʃəndaɪz/",pos:"v.",en:"to promote and sell products commercially",zh:"銷售；推銷",ex:"Disney has been successful in merchandising its films.",exZh:"迪士尼在推銷其電影方面一直非常成功。",diff:3,unit:"P9L7"},
  {id:869,word:"customary",ph:"/ˈkʌstəməri/",pos:"adj.",en:"in accordance with usual practice",zh:"習慣的；慣常的",ex:"Where demand for a product is high, retailers may set a customary price according to consumer expectation.",exZh:"當產品需求量高時，零售商可能會根據消費者期望設定習慣價格。",diff:3,unit:"P9L7"},
  {id:870,word:"overdue",ph:"/ˌəʊvəˈdjuː/",pos:"adj.",en:"not done or dealt with when expected; long awaited",zh:"早該實現的；逾期的",ex:"An examination of the ways the world produces food is long overdue.",exZh:"對世界糧食生產方式的審查早就應該進行了。",diff:3,unit:"P9L7"},
  {id:871,word:"vicarious",ph:"/vɪˈkeəriəs/",pos:"adj.",en:"experienced through someone else's actions",zh:"感同身受的；代理的",ex:"Advertisers often design campaigns that arouse vicarious thrills or pleasures in the mind of the consumer.",exZh:"廣告商經常設計活動，喚起消費者心中感同身受的刺激或愉悅。",diff:5,unit:"P9L7"},
  {id:872,word:"volitional",ph:"/vəʊˈlɪʃənl/",pos:"adj.",en:"done from free will or personal choice",zh:"自願的；出於意志的",ex:"No one forces consumers to buy products, so all purchases may be thought of as volitional.",exZh:"沒有人強迫消費者購買產品，因此所有購買都可被認為是自願的。",diff:5,unit:"P9L7"},
  {id:873,word:"commodity",ph:"/kəˈmɒdɪti/",pos:"n.",en:"a raw material or product that can be bought and sold",zh:"商品；大宗商品",ex:"We need to create a circular economy where waste holds commodity value.",exZh:"我們需要創造一種循環經濟，讓廢棄物具有商品價值。",diff:3,unit:"P9L7"},
  {id:874,word:"invoice",ph:"/ˈɪnvɔɪs/",pos:"n.",en:"a list of goods or services with prices to be paid",zh:"（供之後支付的）費用清單；發票",ex:"The use of peer-to-peer invoice sharing with friends has increased through apps.",exZh:"透過應用程式，與朋友共享點對點費用清單的使用已有所增加。",diff:3,unit:"P9L7"},
  {id:875,word:"pattern",ph:"/ˈpætən/",pos:"n.",en:"a regular and repeatable form or sequence",zh:"模式；規律",ex:"A recent pattern is the increasing frequency with which fashionable clothing is being bought.",exZh:"最近的一種模式是，購買流行衣物的頻率不斷增加。",diff:2,unit:"P9L7"},
  {id:876,word:"overproduction",ph:"/ˌəʊvəprəˈdʌkʃən/",pos:"n.",en:"the production of more goods than can be sold",zh:"過度生產；生產過剩",ex:"Some people claim that overproduction of products is rapidly depleting global resources.",exZh:"有些人聲稱，產品過度生產正快速耗損全球資源。",diff:4,unit:"P9L7"},
  // P9L8 Tax 稅
  {id:877,word:"charge",ph:"/tʃɑːdʒ/",pos:"v.",en:"to formally accuse someone of a crime",zh:"控告；指控",ex:"Citizens who fail to fully pay their taxes may be charged with tax evasion.",exZh:"未能全額繳稅的公民可能被控告逃漏稅。",diff:2,unit:"P9L8"},
  {id:878,word:"impose",ph:"/ɪmˈpəʊz/",pos:"v.",en:"to enforce a tax or rule on someone",zh:"徵收；強加",ex:"One way in which countries may curb obesity is to impose a levy on companies producing processed food.",exZh:"一種國家可能抑制肥胖的方式是對生產加工食品的公司徵稅。",diff:3,unit:"P9L8"},
  {id:879,word:"audit",ph:"/ˈɔːdɪt/",pos:"v.",en:"to conduct an official financial examination",zh:"審核；審計",ex:"The UK government may audit a company's tax records as far back as six years.",exZh:"英國政府可以審核一間公司的納稅記錄，最早可追溯到六年前。",diff:3,unit:"P9L8"},
  {id:880,word:"levy",ph:"/ˈlevi/",pos:"v.",en:"to impose a tax or fee",zh:"徵收；課稅",ex:"Many governments levy a value added tax on products, which is ultimately paid for by the consumer.",exZh:"許多政府對產品徵收增值稅，最終由消費者負擔。",diff:3,unit:"P9L8"},
  {id:881,word:"duty-free",ph:"/ˌdjuːtiˈfriː/",pos:"adj.",en:"exempt from payment of customs duty",zh:"免稅的",ex:"Duty-free locations generate an extremely valuable income stream for airports and ports.",exZh:"免稅地點為機場和港口產生極有價值的收入來源。",diff:2,unit:"P9L8"},
  {id:882,word:"communal",ph:"/ˈkɒmjunəl/",pos:"adj.",en:"shared by all members of a community",zh:"公共的；共有的",ex:"A state cannot exist without the communal tax dollars paid from its citizens to keep it functioning.",exZh:"若沒有公民支付的公共稅收來支持運作，國家便無法存續。",diff:3,unit:"P9L8"},
  {id:883,word:"fiscal",ph:"/ˈfɪskəl/",pos:"adj.",en:"relating to government revenue and taxation",zh:"財政的；財政上的",ex:"Clear fiscal policy is vital for governments hoping to achieve the UN's Sustainable Development Goals.",exZh:"明確的財政政策對於希望實現聯合國永續發展目標的政府至關重要。",diff:4,unit:"P9L8"},
  {id:884,word:"supplementary",ph:"/ˌsʌplɪˈmentəri/",pos:"adj.",en:"additional; serving to supplement",zh:"補助的；補充的",ex:"Supplementary benefits are paid to individuals who cannot afford to support themselves.",exZh:"補助津貼是支付給無法自給自足的人。",diff:4,unit:"P9L8"},
  {id:885,word:"profit",ph:"/ˈprɒfɪt/",pos:"n.",en:"financial gain after all costs have been paid",zh:"利潤；盈利",ex:"Major companies, such as Amazon, often avoid paying taxes on their profits by exploiting government tax breaks.",exZh:"像亞馬遜這樣的大公司經常利用政府的減稅政策來避免繳交其利潤納稅。",diff:2,unit:"P9L8"},
  {id:886,word:"revenue",ph:"/ˈrevɪnjuː/",pos:"n.",en:"income generated by a government or business",zh:"稅收；收入",ex:"When a government's expenditure exceeds its tax revenue, it will run a budget deficit.",exZh:"當政府的支出超過其稅收時，就會出現預算赤字。",diff:3,unit:"P9L8"},
  {id:887,word:"exemption",ph:"/ɪɡˈzempʃən/",pos:"n.",en:"the state of being free from a duty or tax",zh:"免稅；豁免",ex:"Many people feel that the rich take advantage of tax exemptions in order to avoid paying their dues.",exZh:"許多人認為富人利用免稅來避免支付稅金。",diff:4,unit:"P9L8"},
  {id:888,word:"threshold",ph:"/ˈθreʃhəʊld/",pos:"n.",en:"the level at which something begins or changes",zh:"門檻；起點",ex:"Despite a higher poverty threshold, the poor in western countries still struggle to make ends meet.",exZh:"儘管貧窮門檻較高，西方國家的窮人仍在努力維持收支平衡。",diff:3,unit:"P9L8"},

  // ── P5 Travel, Leisure and Entertainment 旅遊、休閒與娛樂 ──────
  // P5L1 Travel 旅遊
  {id:889,word:"experience",ph:"/ɪksˈpɪəriəns/",pos:"v.",en:"to encounter or undergo something",zh:"體驗；經歷",ex:"Travelling is the ultimate opportunity for many young people to experience the world and develop character.",exZh:"旅行是許多年輕人體驗世界並培養性格的終極機會。",diff:2,unit:"P5L1"},
  {id:890,word:"purchase",ph:"/ˈpɜːtʃəs/",pos:"v.",en:"to buy something",zh:"購買；採購",ex:"The majority of young people today purchase vacation packages online.",exZh:"現今大多數年輕人在網路上購買假期套裝行程。",diff:2,unit:"P5L1"},
  {id:891,word:"undertake",ph:"/ˌʌndəˈteɪk/",pos:"v.",en:"to commit to and begin a task or journey",zh:"進行；從事",ex:"Backpackers tend to undertake a more spiritual journey than most kinds of traveller.",exZh:"背包客往往比大多數旅行者進行較靈性的旅程。",diff:3,unit:"P5L1"},
  {id:892,word:"amble",ph:"/ˈæmbl/",pos:"v.",en:"to walk slowly and in a relaxed way",zh:"漫步；緩行",ex:"On a city tour, tourists can take their time ambling from attraction to attraction.",exZh:"在市區觀光中，遊客可以悠哉地從一個景點漫步到另一個景點。",diff:3,unit:"P5L1"},
  {id:893,word:"independent",ph:"/ˌɪndɪˈpendənt/",pos:"adj.",en:"not requiring help or support from others",zh:"獨立的；自主的",ex:"As cheap air travel has proliferated, so has the number of independent travellers.",exZh:"隨著廉價航空旅遊激增，獨立旅行者的人數也隨之增加。",diff:2,unit:"P5L1"},
  {id:894,word:"frequent",ph:"/ˈfriːkwənt/",pos:"adj.",en:"occurring often; common",zh:"常見的；頻繁的",ex:"Air travel remains the most frequent mode of transportation for people travelling long distance.",exZh:"對於長途旅行的人來說，航空旅遊仍然是最常見的交通方式。",diff:2,unit:"P5L1"},
  {id:895,word:"all-inclusive",ph:"/ˌɔːlɪnˈkluːsɪv/",pos:"adj.",en:"including everything; no additional costs",zh:"全包式的；全包含的",ex:"All-inclusive travel vacation packages have become more affordable in recent years.",exZh:"近年來，全包式旅遊套裝行程變得更加實惠。",diff:3,unit:"P5L1"},
  {id:896,word:"unaccompanied",ph:"/ˌʌnəˈkʌmpənɪd/",pos:"adj.",en:"not having a companion; travelling alone",zh:"無人陪伴的；單獨的",ex:"Independent travellers prefer the freedom to journey wherever they like unaccompanied by others.",exZh:"獨立旅行者喜歡在無人陪伴下，去他們喜愛的任何地方旅遊的自由。",diff:4,unit:"P5L1"},
  {id:897,word:"travel agency",ph:"/ˈtrævl ˈeɪdʒənsi/",pos:"n.",en:"a business that arranges travel for customers",zh:"旅行社",ex:"The most common reason given by travellers for using a travel agency is to save time.",exZh:"旅客利用旅行社最常見的理由是要節省時間。",diff:2,unit:"P5L1"},
  {id:898,word:"customs",ph:"/ˈkʌstəmz/",pos:"n.",en:"the official procedure for checking goods and people at borders",zh:"海關",ex:"New technology like facial recognition will allow airports to accelerate customs procedures.",exZh:"新的科技如臉部辨識，將會使機場加快通關步驟。",diff:2,unit:"P5L1"},
  {id:899,word:"itinerary",ph:"/aɪˈtɪnərəri/",pos:"n.",en:"a planned route or journey schedule",zh:"行程；旅行計畫",ex:"Travelling with a tour group has the added benefit of a completely organised itinerary.",exZh:"跟旅遊團一起旅遊的額外好處是擁有一個完整規劃的行程。",diff:4,unit:"P5L1"},
  {id:900,word:"visa",ph:"/ˈviːzə/",pos:"n.",en:"an official document permitting entry to a country",zh:"簽證",ex:"The decline in the need for visas when traveling has contributed to a rise in international tourism.",exZh:"旅行時簽證需求的減少已促進國際旅遊業的增長。",diff:2,unit:"P5L1"},
  // P5L2 Tourism 觀光
  {id:901,word:"decline",ph:"/dɪˈklaɪn/",pos:"v.",en:"to decrease or fall in amount",zh:"下降；減少",ex:"Economies that overly depend on tourism suffer greatly when visitor numbers decline.",exZh:"當遊客數量下降時，過度依賴旅遊業的經濟體將損失巨大。",diff:2,unit:"P5L2"},
  {id:902,word:"depend on",ph:"/dɪˈpend ɒn/",pos:"v.",en:"to rely on something or someone",zh:"依靠；依賴",ex:"Tourism benefits local economies which depend on it to generate revenue and employment.",exZh:"旅遊業有利於依靠它來創造收入和就業的地方經濟。",diff:2,unit:"P5L2"},
  {id:903,word:"boom",ph:"/buːm/",pos:"v.",en:"to grow or increase rapidly",zh:"繁榮；激增",ex:"International air travel is currently booming which is putting greater strain on the environment.",exZh:"國際航空旅行目前正蓬勃發展，這對環境帶來了更大的壓力。",diff:2,unit:"P5L2"},
  {id:904,word:"embark",ph:"/ɪmˈbɑːk/",pos:"v.",en:"to begin a journey or course of action",zh:"著手；出發",ex:"Embarking on a journey around the world is still widely regarded as the trip of a lifetime.",exZh:"著手一趟環遊世界之旅仍被廣泛認為是一千載難逢的旅行。",diff:3,unit:"P5L2"},
  {id:905,word:"expanding",ph:"/ɪksˈpændɪŋ/",pos:"adj.",en:"growing or increasing in size",zh:"擴大的；擴張的",ex:"Expanding tourism in small places should be managed to avoid negatively affecting the local culture.",exZh:"小地方旅遊業的擴展應加以管理，避免對當地文化產生負面影響。",diff:3,unit:"P5L2"},
  {id:906,word:"flourishing",ph:"/ˈflɜːrɪʃɪŋ/",pos:"adj.",en:"growing and developing strongly",zh:"繁榮的；興旺的",ex:"A flourishing tourist industry is a big boon to any country.",exZh:"繁榮的旅遊業對任何國家都是一大恩賜。",diff:3,unit:"P5L2"},
  {id:907,word:"overcrowding",ph:"/ˌəʊvəˈkraʊdɪŋ/",pos:"adj.",en:"the condition of too many people in a space",zh:"過度擁擠的",ex:"Social media has only added to overcrowding at popular tourist sites around the world.",exZh:"社交媒體只會使世界各地熱門旅遊景點更加擁擠。",diff:3,unit:"P5L2"},
  {id:908,word:"touristy",ph:"/ˈtʊərɪsti/",pos:"adj.",en:"overly commercialised for tourists",zh:"擠滿遊客的；太商業化的",ex:"I prefer to stay away from touristy sites which tend to be overcrowded.",exZh:"我寧願遠離擠滿遊客的景點，那裡往往過度擁擠。",diff:3,unit:"P5L2"},
  {id:909,word:"destination",ph:"/ˌdestɪˈneɪʃən/",pos:"n.",en:"the place to which someone is travelling",zh:"目的地",ex:"Adventure tourism means more remote destinations are becoming commonplace.",exZh:"探險旅遊意味著更偏遠的目的地正變得愈來愈普遍。",diff:2,unit:"P5L2"},
  {id:910,word:"landmark",ph:"/ˈlændmɑːk/",pos:"n.",en:"an object or feature that is easily recognisable",zh:"地標；里程碑",ex:"As a result of too many tourists, many historical landmarks are being damaged beyond repair.",exZh:"由於遊客太多，許多歷史性地標正遭受無法修復的破壞。",diff:2,unit:"P5L2"},
  {id:911,word:"souvenir",ph:"/ˌsuːvəˈnɪər/",pos:"n.",en:"a thing kept as a reminder of a place visited",zh:"紀念品",ex:"An example of irresponsible tourism is when visitors to fragile ecosystems remove pieces of nature for souvenirs.",exZh:"不負責任旅遊的一個例子是當遊客面對脆弱的生態系統時，為了紀念品而移除大自然之物。",diff:3,unit:"P5L2"},
  {id:912,word:"bazaar",ph:"/bəˈzɑː/",pos:"n.",en:"a market in a Middle Eastern country",zh:"市集；集市",ex:"Bazaars are a wonderful place to pick up bargains and unusual souvenirs.",exZh:"市集是挑選便宜貨和特別紀念品的好地方。",diff:3,unit:"P5L2"},
  // P5L3 Expenses 花費
  {id:913,word:"exchange",ph:"/ɪksˈtʃeɪndʒ/",pos:"v.",en:"to convert money from one currency to another",zh:"兌換；交換",ex:"I never like to exchange money at the airport since the rates are always so expensive.",exZh:"我從不喜歡在機場兌換貨幣，因為價格總是很貴。",diff:2,unit:"P5L3"},
  {id:914,word:"break",ph:"/breɪk/",pos:"v.",en:"to change large notes into smaller ones",zh:"兌開；換零",ex:"Small businesses often find it difficult to break large bills into smaller ones.",exZh:"小商店經常發現很難把大鈔換成小鈔。",diff:2,unit:"P5L3"},
  {id:915,word:"cutback",ph:"/ˈkʌtbæk/",pos:"v.",en:"to reduce or limit spending",zh:"削減；縮減",ex:"A rise in the popularity of telecommuting has led many companies to cutback business trip expenses.",exZh:"遠程工作的普及促使許多公司削減出差費用。",diff:3,unit:"P5L3"},
  {id:916,word:"haggle",ph:"/ˈhæɡl/",pos:"v.",en:"to bargain or negotiate over a price",zh:"討價還價；砍價",ex:"It is expected to haggle in some local bazaars overseas.",exZh:"在海外的一些地方市集討價還價是預料之中的事。",diff:3,unit:"P5L3"},
  {id:917,word:"spare",ph:"/speər/",pos:"adj.",en:"extra; not being used",zh:"剩下的；多餘的",ex:"Rather than throwing away spare change at the end of a vacation, consider donating it to charity.",exZh:"與其在假期結束時拋掉剩下的零錢，不如考慮將其捐贈給慈善機構。",diff:2,unit:"P5L3"},
  {id:918,word:"unexpected",ph:"/ˌʌnɪkˈspektɪd/",pos:"adj.",en:"not anticipated; surprising",zh:"意外的；出乎意料的",ex:"Travel insurance protects the traveller against unexpected situations such as flight cancellations.",exZh:"旅遊保險保護旅客免受意外情況，如班機取消。",diff:2,unit:"P5L3"},
  {id:919,word:"budgetary",ph:"/ˈbʌdʒɪtəri/",pos:"adj.",en:"relating to a budget or financial plan",zh:"預算的；財政的",ex:"The majority of people have to keep in mind budgetary constraints when planning a big trip.",exZh:"大部分人在規劃一趟大旅行時，都必須考慮預算限制。",diff:4,unit:"P5L3"},
  {id:920,word:"extravagant",ph:"/ɪksˈtrævəɡənt/",pos:"adj.",en:"spending more money than is reasonable",zh:"奢侈的；揮霍的",ex:"For those living extravagant lifestyles, overseas travel is a minor expense.",exZh:"對那些活在奢侈生活型態的人來說，海外旅行是一筆小額費用。",diff:4,unit:"P5L3"},
  {id:921,word:"budget",ph:"/ˈbʌdʒɪt/",pos:"n.",en:"an estimate of income and expenditure",zh:"預算",ex:"Those who backpack around the world need to stick to a tight budget.",exZh:"那些在世界各地背包旅行的人需要堅持一緊縮的預算。",diff:2,unit:"P5L3"},
  {id:922,word:"currency",ph:"/ˈkɜːrənsi/",pos:"n.",en:"a system of money used in a country",zh:"貨幣；通貨",ex:"It is often claimed that airport currency exchange outlets charge extortionate rates.",exZh:"人們經常聲稱機場貨幣兌換口收取過高的費用。",diff:3,unit:"P5L3"},
  {id:923,word:"commission",ph:"/kəˈmɪʃən/",pos:"n.",en:"a fee charged for a financial transaction",zh:"佣金；手續費",ex:"Most banks nowadays offer no commission on foreign exchange.",exZh:"如今大多數銀行在國際匯兌上不需提供佣金。",diff:3,unit:"P5L3"},
  {id:924,word:"instalment",ph:"/ɪnˈstɔːlmənt/",pos:"n.",en:"each of several payments made over time",zh:"分期付款",ex:"One of the advantages of credit cards is the ability to pay for expensive items through instalments.",exZh:"信用卡的優點之一是能夠透過分期付款來支付昂貴的物品。",diff:4,unit:"P5L3"},
  // P5L4 Accommodation 住宿
  {id:925,word:"arrange",ph:"/əˈreɪndʒ/",pos:"v.",en:"to organise or plan something in advance",zh:"安排；籌備",ex:"The Internet means that arranging somewhere to stay while traveling has become easier than ever.",exZh:"網路使得在旅途中安排住宿地點變得比以往更容易。",diff:2,unit:"P5L4"},
  {id:926,word:"reserve",ph:"/rɪˈzɜːv/",pos:"v.",en:"to book something in advance",zh:"預訂；預留",ex:"In busy tourists' hotspots, reserving a room prior to arrival is a must.",exZh:"在繁忙的觀光客熱門地區，於抵達前先預訂房間是必要的。",diff:2,unit:"P5L4"},
  {id:927,word:"seek",ph:"/siːk/",pos:"v.",en:"to try to find or obtain something",zh:"尋找；搜尋",ex:"There has never before been such a wealth of choices for those seeking accommodation.",exZh:"對於那些尋找住宿的人來說，以前從未有過如此大量的選擇。",diff:2,unit:"P5L4"},
  {id:928,word:"secure",ph:"/sɪˈkjʊə/",pos:"v.",en:"to make something safe or protected",zh:"妥善保管；確保安全",ex:"Most decent hotels offer a facility to deposit and secure valuable possessions.",exZh:"大多數體面的飯店提供存放和保管貴重物品的設施。",diff:3,unit:"P5L4"},
  {id:929,word:"overnight",ph:"/ˌəʊvəˈnaɪt/",pos:"adj.",en:"happening during the night; staying for a night",zh:"過夜的；通宵的",ex:"An overnight stay at the airport is a last resort for most travellers.",exZh:"在機場過夜是大多數旅客最後的辦法。",diff:2,unit:"P5L4"},
  {id:930,word:"spacious",ph:"/ˈspeɪʃəs/",pos:"adj.",en:"having plenty of space; large and roomy",zh:"寬敞的；寬闊的",ex:"Spacious accommodation in big metropolitan areas is often hard to come by.",exZh:"在大都會區的寬敞住宿通常很難獲得。",diff:3,unit:"P5L4"},
  {id:931,word:"luxurious",ph:"/lʌɡˈʒʊəriəs/",pos:"adj.",en:"very comfortable and expensive",zh:"豪華的；奢華的",ex:"My dream vacation includes staying in a luxurious room with an expansive ocean view.",exZh:"我的夢想假期包括住在一個有遼闊海景的豪華房間。",diff:3,unit:"P5L4"},
  {id:932,word:"purpose-built",ph:"/ˈpɜːpəsbɪlt/",pos:"adj.",en:"built for a specific use",zh:"為特定目的建造的",ex:"Purpose-built hotels can easily be built to be accessible to all kinds of guests including those with disabilities.",exZh:"為特定目的建造的飯店可以輕易地被設計為適合所有類型的客人，包括殘疾人士。",diff:4,unit:"P5L4"},
  {id:933,word:"suite",ph:"/swiːt/",pos:"n.",en:"a set of connected rooms in a hotel",zh:"套房",ex:"A perk of staying in a hotel is the ability to order room service to your suite.",exZh:"入住飯店的一項好處是能替你的套房訂購客房服務。",diff:2,unit:"P5L4"},
  {id:934,word:"hotel",ph:"/həʊˈtel/",pos:"n.",en:"an establishment providing accommodation for payment",zh:"飯店；旅館",ex:"Staying in a B&B is often more hospitable than staying in a hotel.",exZh:"住在住宿加早餐的旅館通常比住在飯店招待更周到。",diff:1,unit:"P5L4"},
  {id:935,word:"guesthouse",ph:"/ˈɡesthaʊs/",pos:"n.",en:"a small hotel or private home offering accommodation",zh:"賓館；招待所",ex:"Guesthouses are usually smaller than hotels but offer a more intimate setting.",exZh:"賓館通常比飯店小，但提供較怡人的環境。",diff:2,unit:"P5L4"},
  {id:936,word:"hostel",ph:"/ˈhɒstəl/",pos:"n.",en:"a cheap accommodation with shared facilities",zh:"青年旅館；招待所",ex:"Hostels provide a cheap alternative to hotels when on the road.",exZh:"青年旅館提供在旅途中比飯店便宜的選擇。",diff:2,unit:"P5L4"},
  // P5L5 Transportation 交通
  {id:937,word:"delay",ph:"/dɪˈleɪ/",pos:"v.",en:"to make something late or slow",zh:"延誤；耽誤",ex:"Traffic congestion delays commuters getting to work which ultimately hurts the economy.",exZh:"交通擁塞延誤了通勤者上班，最終傷害經濟。",diff:2,unit:"P5L5"},
  {id:938,word:"transfer",ph:"/trænsˈfɜː/",pos:"v.",en:"to change from one vehicle to another",zh:"轉乘；轉機",ex:"Budget flights are seldom direct and usually require passengers to transfer airplanes several times.",exZh:"廉價航班很少直飛，通常要求旅客轉機好幾次。",diff:2,unit:"P5L5"},
  {id:939,word:"disembark",ph:"/ˌdɪsɪmˈbɑːk/",pos:"v.",en:"to leave a ship, aircraft or other vehicle",zh:"下車；下船；下機",ex:"Train travel affords travellers the opportunity to disembark in the centre of cities without traffic delays.",exZh:"火車旅行讓旅客有機會在無交通延誤的情況下直接在市中心下車。",diff:4,unit:"P5L5"},
  {id:940,word:"hitchhike",ph:"/ˈhɪtʃhaɪk/",pos:"v.",en:"to travel by getting free lifts from passing vehicles",zh:"搭便車；搭順風車",ex:"Owing to safety concerns, most individuals choose not to hitchhike.",exZh:"由於安全上的顧慮，大部分的人選擇不搭便車。",diff:3,unit:"P5L5"},
  {id:941,word:"round-trip",ph:"/ˈraʊndtrɪp/",pos:"adj.",en:"involving a journey to a place and back again",zh:"來回旅行的；往返的",ex:"A round-trip ticket is usually cheaper than two one-way tickets.",exZh:"來回票通常比兩張單程票便宜。",diff:2,unit:"P5L5"},
  {id:942,word:"congested",ph:"/kənˈdʒestɪd/",pos:"adj.",en:"overfull with traffic or people",zh:"擁擠的；堵塞的",ex:"While congested streets in cities around the world are a problem, there are several effective solutions.",exZh:"雖然世界各地城市擁擠的街道是一個問題，但有幾種有效的解決方式。",diff:3,unit:"P5L5"},
  {id:943,word:"fluctuating",ph:"/ˈflʌktjueɪtɪŋ/",pos:"adj.",en:"rising and falling irregularly",zh:"波動的；變動的",ex:"Fluctuating air ticket prices mean buying early is important to save money.",exZh:"波動的機票價格意味著提早購買對於省錢非常重要。",diff:4,unit:"P5L5"},
  {id:944,word:"long-haul",ph:"/lɒŋhɔːl/",pos:"adj.",en:"travelling a long distance",zh:"長途的；長距離的",ex:"Long-haul flights have been known to have severe health consequences in some individuals.",exZh:"長途飛行據瞭解會對某些人造成嚴重的健康問題。",diff:3,unit:"P5L5"},
  {id:945,word:"fare",ph:"/feər/",pos:"n.",en:"the price charged to travel",zh:"票價；車費",ex:"Discounted fares allow pensioners and students access to cheaper travel in metropolitan areas.",exZh:"折扣票價讓退休者和學生可以在大都會區享有較便宜的旅遊。",diff:2,unit:"P5L5"},
  {id:946,word:"coach",ph:"/kəʊtʃ/",pos:"n.",en:"a long-distance bus",zh:"巴士；長途客車",ex:"Touring by coach may be cheap but is often very time consuming.",exZh:"搭乘巴士旅遊可能很便宜，但通常很費時。",diff:2,unit:"P5L5"},
  {id:947,word:"terminal",ph:"/ˈtɜːmɪnl/",pos:"n.",en:"a building at an airport or bus station",zh:"航站；終點站",ex:"The chart illustrates year-on-year passenger delays at airport terminals in London, UK.",exZh:"該圖表顯示英國倫敦機場航站與去年同期數字相比的乘客延誤情況。",diff:3,unit:"P5L5"},
  {id:948,word:"stopover",ph:"/ˈstɒpˌəʊvə/",pos:"n.",en:"a break in a journey",zh:"中途停留；中途停靠",ex:"One of the best aspects of my most recent holiday was a short stopover in Berlin.",exZh:"我最近假期中最棒的一件事是在柏林的中途短暫停留。",diff:3,unit:"P5L5"},
  // P5L6 Scenery 風景
  {id:949,word:"change",ph:"/tʃeɪndʒ/",pos:"v.",en:"to become different",zh:"變化；改變",ex:"Watching the scenery change is one of the joys of travelling by train.",exZh:"觀看景色變化是搭乘火車旅遊的樂趣之一。",diff:1,unit:"P5L6"},
  {id:950,word:"conserve",ph:"/kənˈsɜːv/",pos:"v.",en:"to protect from harm or damage",zh:"保護；保存",ex:"People are more aware these days of the need to conserve the natural world around them.",exZh:"人們如今更加意識到保護他們周遭自然世界的必要性。",diff:3,unit:"P5L6"},
  {id:951,word:"dominate",ph:"/ˈdɒmɪneɪt/",pos:"v.",en:"to have a commanding influence over",zh:"佔據；主導",ex:"The skyline of Taipei is completely dominated by Taipei 101.",exZh:"台北的天際線完全被台北 101 所佔據。",diff:3,unit:"P5L6"},
  {id:952,word:"take in",ph:"/teɪk ɪn/",pos:"v.",en:"to observe and absorb a view",zh:"觀賞；欣賞",ex:"Travelling by bicycle allows one to take in more of the landscape.",exZh:"騎自行車旅遊讓人更能觀賞風景。",diff:2,unit:"P5L6"},
  {id:953,word:"coastal",ph:"/ˈkəʊstəl/",pos:"adj.",en:"relating to or near the sea coast",zh:"沿海的；海岸的",ex:"A drive down the coastal road of Eastern Taiwan is one of the main attractions of the island.",exZh:"沿著台灣東部的沿海公路駕車旅行是該島必遊項目之一。",diff:2,unit:"P5L6"},
  {id:954,word:"mountainous",ph:"/ˈmaʊntɪnəs/",pos:"adj.",en:"having many mountains; rugged",zh:"多山的；山地的",ex:"The mountainous vistas of central Taiwan make for some of the most breath-taking in the world.",exZh:"中台灣的山地景觀，造就了世上一些最令人屏息的美景。",diff:3,unit:"P5L6"},
  {id:955,word:"barren",ph:"/ˈbærən/",pos:"adj.",en:"too poor to produce vegetation",zh:"貧瘠的；不毛的",ex:"Reforestation efforts in mountainous areas hold the soil together and prevent the land becoming barren.",exZh:"山區的重新造林努力使土壤凝聚在一起，並且避免土地變得貧瘠。",diff:3,unit:"P5L6"},
  {id:956,word:"run-down",ph:"/ˈrʌndaʊn/",pos:"adj.",en:"in a poor or neglected condition",zh:"破舊的；衰落的",ex:"Taiwan has many run-down colonial buildings, and I think the current trend of restoring them is wonderful.",exZh:"台灣有許多破舊的殖民地建築，我認為目前修復它們的趨勢是很棒的。",diff:3,unit:"P5L6"},
  {id:957,word:"landscape",ph:"/ˈlændskeɪp/",pos:"n.",en:"all the visible features of an area of land",zh:"景觀；風景",ex:"While national parks aim to preserve the natural landscape, irresponsible tourists are having a devastating effect on it.",exZh:"雖然國家公園旨在保護自然景觀，不負責任的遊客正在對其造成敗壞性的影響。",diff:2,unit:"P5L6"},
  {id:958,word:"national park",ph:"/ˈnæʃənl pɑːk/",pos:"n.",en:"an area of countryside protected by the government",zh:"國家公園",ex:"One of the aspects of Taiwan I love the most are the country's vast and magnificent national parks.",exZh:"我最喜歡台灣的其中一方面是其遼闊壯麗的國家公園。",diff:2,unit:"P5L6"},
  {id:959,word:"peak",ph:"/piːk/",pos:"n.",en:"the pointed top of a mountain",zh:"山峰；頂峰",ex:"Jade Mountain is the highest peak in both North East Asia and Taiwan.",exZh:"玉山同時是東北亞和台灣的最高峰。",diff:2,unit:"P5L6"},
  {id:960,word:"village",ph:"/ˈvɪlɪdʒ/",pos:"n.",en:"a small settlement in a rural area",zh:"村落；村莊",ex:"A memorable trip I recently took was to an indigenous village in central Taiwan.",exZh:"我最近一次難忘的旅遊是去台灣中部一個原住民村落。",diff:2,unit:"P5L6"},
  // P5L7 Dining 飲食
  {id:961,word:"seat",ph:"/siːt/",pos:"v.",en:"to have enough seats for a number of people",zh:"可容納；有座位",ex:"Well-run restaurants can have a high customer turnover despite only seating 20 people at a time.",exZh:"經營良好的餐廳即便一次只能容納 20 人，也能維持高客流量。",diff:2,unit:"P5L7"},
  {id:962,word:"serve",ph:"/sɜːv/",pos:"v.",en:"to provide food or drink to someone",zh:"供應（飯菜）；服務",ex:"Tightened health regulations ensure customers are served food that is safe and hygienic.",exZh:"嚴格的衛生法規確保供應顧客安全、衛生的食物。",diff:2,unit:"P5L7"},
  {id:963,word:"dine",ph:"/daɪn/",pos:"v.",en:"to eat a formal or main meal",zh:"用餐；進食",ex:"I love to dine out at little restaurants by the sea whenever I go on holiday.",exZh:"每當我外出度假時，我喜歡在海邊的小餐館用餐。",diff:2,unit:"P5L7"},
  {id:964,word:"restrict",ph:"/rɪˈstrɪkt/",pos:"v.",en:"to put a limit on something",zh:"限制；約束",ex:"Environmentally inspired legislation is now restricting the use of single-use plastics.",exZh:"受環境啟示的法規正在限制一次性塑膠製品的使用。",diff:3,unit:"P5L7"},
  {id:965,word:"vegetarian",ph:"/ˌvedʒɪˈteəriən/",pos:"adj.",en:"not eating or containing meat",zh:"素食的；素食者的",ex:"While most traditional restaurants offer vegetarian options nowadays, choices remain limited.",exZh:"雖然現今大部分傳統餐廳都提供素食選項，但選擇仍然有限。",diff:3,unit:"P5L7"},
  {id:966,word:"all-you-can-eat",ph:"/ˌɔːljuːkænˈiːt/",pos:"adj.",en:"offering unlimited food for a fixed price",zh:"吃到飽的；無限量供應的",ex:"All-you-can-eat restaurants are proving increasingly popular around the world.",exZh:"吃到飽的餐廳正被證實在全世界愈來愈受歡迎。",diff:2,unit:"P5L7"},
  {id:967,word:"exotic",ph:"/ɪɡˈzɒtɪk/",pos:"adj.",en:"originating from a foreign country; unusual",zh:"異國的；奇特的",ex:"I love to visit night markets when I travel to try as many exotic foods as possible.",exZh:"旅遊時我喜歡逛夜市，盡可能多嘗試異國食物。",diff:3,unit:"P5L7"},
  {id:968,word:"sumptuous",ph:"/ˈsʌmptjuəs/",pos:"adj.",en:"splendid and expensive-looking",zh:"豐盛的；豪華的",ex:"Cruise lines offer an expansive range of sumptuous dishes for their passengers to sample.",exZh:"郵輪公司提供種類繁多的豐盛菜餚供乘客品嚐。",diff:4,unit:"P5L7"},
  {id:969,word:"course",ph:"/kɔːs/",pos:"n.",en:"a part of a meal served at one time",zh:"（一道）菜",ex:"Fine dining at a Michelin restaurant will offer many courses.",exZh:"在米其林餐廳的精緻用餐過程將會提供許多道菜。",diff:2,unit:"P5L7"},
  {id:970,word:"cuisine",ph:"/kwɪˈziːn/",pos:"n.",en:"a style of cooking from a particular country",zh:"菜餚；烹飪風格",ex:"It is impossible to truly experience Taiwan without trying the local cuisine.",exZh:"不品嚐地方菜餚，就不可能真正體驗台灣。",diff:3,unit:"P5L7"},
  {id:971,word:"side",ph:"/saɪd/",pos:"n.",en:"a dish served alongside a main course",zh:"配餐；副菜",ex:"Fast food usually comes served with a side order of French fries and a drink.",exZh:"速食通常附有薯條和飲料作為配餐。",diff:2,unit:"P5L7"},
  {id:972,word:"appetiser",ph:"/ˈæpɪtaɪzər/",pos:"n.",en:"a small dish served before the main course",zh:"開胃菜；前菜",ex:"A good appetiser can set the tone for the rest of the meal.",exZh:"一盤好的開胃菜可以為剩下的餐點定調。",diff:3,unit:"P5L7"},
  {id:973,word:"feast",ph:"/fiːst/",pos:"n.",en:"a large and impressive meal",zh:"宴會；盛宴",ex:"The range of food prepared for the wedding feast was quite a sight to behold.",exZh:"為婚宴準備的各種食物真是令人眼睛一亮。",diff:2,unit:"P5L7"},
  // P5L8 Games 遊戲
  {id:974,word:"beat",ph:"/biːt/",pos:"v.",en:"to defeat someone in a competition",zh:"打敗；擊敗",ex:"Competitive sports teach children confidence when they beat opponents and graciousness when defeated.",exZh:"競技型運動教導孩子在打敗對手時要有自信，在被擊敗時要有風度。",diff:2,unit:"P5L8"},
  {id:975,word:"draw",ph:"/drɔː/",pos:"v.",en:"to finish a game with equal scores",zh:"平手；平局",ex:"In tennis, players can only win or lose as there is no opportunity to draw.",exZh:"在網球運動中，球員只能贏或輸，因為沒有機會打成平手。",diff:2,unit:"P5L8"},
  {id:976,word:"relieve",ph:"/rɪˈliːv/",pos:"v.",en:"to reduce or remove stress or pain",zh:"緩解；減輕",ex:"Many people use games as a way to relieve their daily stress.",exZh:"許多人利用遊戲來緩解他們的日常壓力。",diff:2,unit:"P5L8"},
  {id:977,word:"give away",ph:"/ɡɪv əˈweɪ/",pos:"v.",en:"to lose an advantage or match carelessly",zh:"錯失；白白輸掉",ex:"In the high-stakes games of professional sports, one slip-up can give the match away.",exZh:"在高風險的職業運動比賽中，一次失誤可能導致輸掉比賽。",diff:3,unit:"P5L8"},
  {id:978,word:"competitive",ph:"/kəmˈpetɪtɪv/",pos:"adj.",en:"involving competition between people",zh:"競技的；競爭的",ex:"Encouraging children to play competitive activities teaches them both confidence and teamwork.",exZh:"鼓勵孩子參加競技型的活動可教導孩子自信和團隊合作。",diff:3,unit:"P5L8"},
  {id:979,word:"relaxing",ph:"/rɪˈlæksɪŋ/",pos:"adj.",en:"helping to reduce tension and anxiety",zh:"放鬆的；令人放鬆的",ex:"Games like puzzles are relaxing and help to sharpen the mind.",exZh:"像拼圖這樣的遊戲很放鬆，並有助於鍛鍊心智。",diff:2,unit:"P5L8"},
  {id:980,word:"violent",ph:"/ˈvaɪələnt/",pos:"adj.",en:"using or involving physical force intended to hurt",zh:"暴力的；激烈的",ex:"While most video games are suitable for all ages, many are violent and should be regulated.",exZh:"雖然大多數電玩適合所有年齡層，但許多是暴力的並且應該受到規範。",diff:2,unit:"P5L8"},
  {id:981,word:"sedentary",ph:"/ˈsednteri/",pos:"adj.",en:"involving little physical activity",zh:"久坐不動的；靜態的",ex:"Too much time immersed in sedentary activities is bad for people's health.",exZh:"太多時間沈浸在久坐不動的活動不利於人們的健康。",diff:4,unit:"P5L8"},
  {id:982,word:"board game",ph:"/ˈbɔːd ɡeɪm/",pos:"n.",en:"a game played on a flat surface with pieces or cards",zh:"桌遊；棋盤遊戲",ex:"Social media use has led to a resurgence of people getting together to play board games.",exZh:"社交媒體的使用促使人們重新聚集起來玩桌遊。",diff:2,unit:"P5L8"},
  {id:983,word:"poker",ph:"/ˈpəʊkər/",pos:"n.",en:"a card game usually played for money",zh:"撲克；撲克牌",ex:"The addictive nature of poker stems from the chance of winning big or the risk of losing everything.",exZh:"撲克的上癮本質源自贏得大獎的機會或失去一切的風險。",diff:2,unit:"P5L8"},
  {id:984,word:"mahjong",ph:"/mɑːˈdʒɒŋ/",pos:"n.",en:"a Chinese tile-based game for four players",zh:"麻將",ex:"Poker and mahjong are among the most widely played games on the Internet.",exZh:"在網路上最廣泛被玩的遊戲之中有撲克和麻將。",diff:2,unit:"P5L8"},
  {id:985,word:"Rubik's Cube",ph:"/ˈruːbɪks kjuːb/",pos:"n.",en:"a 3D puzzle cube with coloured squares",zh:"魔術方塊",ex:"Almost every child has owned or played with a Rubik's Cube.",exZh:"幾乎每個孩子都擁有或玩過魔術方塊。",diff:2,unit:"P5L8"},
  // P5L9 Interests 興趣
  {id:986,word:"stimulate",ph:"/ˈstɪmjuleɪt/",pos:"v.",en:"to encourage interest or activity",zh:"激勵；激發",ex:"Good teachers stimulate interest in life-long learning in their students.",exZh:"好的老師激勵他們的學生終生學習的興趣。",diff:3,unit:"P5L9"},
  {id:987,word:"sustain",ph:"/səsˈteɪn/",pos:"v.",en:"to keep going over a period of time",zh:"維持；持續",ex:"People should have a hobby to sustain their sense of life purpose once they stop working.",exZh:"人們一旦停止工作後，應擁有一項嗜好來維持他們的生活目標感。",diff:3,unit:"P5L9"},
  {id:988,word:"kindle",ph:"/ˈkɪndl/",pos:"v.",en:"to arouse or inspire a feeling or interest",zh:"激起；點燃（興趣）",ex:"It was my dad that kindled an interest of airplanes in me when I was young.",exZh:"在我年輕時，是我爸爸激起了我對飛機的興趣。",diff:4,unit:"P5L9"},
  {id:989,word:"revive",ph:"/rɪˈvaɪv/",pos:"v.",en:"to give new strength or energy to something",zh:"喚起；使復興",ex:"Watching that historical TV drama has revived my interest in the genre.",exZh:"觀看那部歷史電視劇喚起了我在該類型作品中的興趣。",diff:3,unit:"P5L9"},
  {id:990,word:"private",ph:"/ˈpraɪvɪt/",pos:"adj.",en:"not wanting to share feelings or personal life",zh:"孤僻的；私人的",ex:"I'm quite a private person and so share little of my life on social media.",exZh:"我是個相當孤僻的人，所以很少在社交媒體上分享我的生活。",diff:2,unit:"P5L9"},
  {id:991,word:"abiding",ph:"/əˈbaɪdɪŋ/",pos:"adj.",en:"enduring; long-lasting",zh:"持續的；持久的",ex:"I have had an abiding interest in geology since I was in junior high school.",exZh:"我從國中開始就對地質學有持續的興趣。",diff:4,unit:"P5L9"},
  {id:992,word:"absorbing",ph:"/əbˈsɔːbɪŋ/",pos:"adj.",en:"intensely interesting; engaging",zh:"引人入勝的；令人著迷的",ex:"Getting lost in a particularly absorbing book is a great way to relax after work.",exZh:"沈迷在一本特別引人入勝的書裡，是下班後放鬆的絕佳方法。",diff:4,unit:"P5L9"},
  {id:993,word:"wide-ranging",ph:"/ˈwaɪdreɪndʒɪŋ/",pos:"adj.",en:"covering a wide range of subjects or activities",zh:"廣泛的；涵蓋面廣的",ex:"Candidates with wide-ranging interests may be perceived as multitalented by employers.",exZh:"有廣泛興趣的候選人可能會被雇主視為多才多藝。",diff:3,unit:"P5L9"},
  {id:994,word:"amusement",ph:"/əˈmjuːzmənt/",pos:"n.",en:"the state of finding something entertaining",zh:"娛樂；消遣",ex:"Many people take up a musical instrument for their own amusement and not to entertain others.",exZh:"許多人學習樂器是為了他們自己的娛樂而不是去娛樂別人。",diff:3,unit:"P5L9"},
  {id:995,word:"pastime",ph:"/ˈpɑːstaɪm/",pos:"n.",en:"an activity done for enjoyment in spare time",zh:"消遣；嗜好",ex:"Some people say that shopping is the most popular pastime for young people nowadays.",exZh:"有人說購物是現今最受年輕人歡迎的消遣。",diff:2,unit:"P5L9"},
  {id:996,word:"taste",ph:"/teɪst/",pos:"n.",en:"a person's liking for particular things",zh:"愛好；品味",ex:"By having a hobby, people may learn more about their individual tastes.",exZh:"透過擁有一項嗜好，人們可以更瞭解他們的個人愛好。",diff:2,unit:"P5L9"},
  {id:997,word:"volunteering",ph:"/ˌvɒlənˈtɪərɪŋ/",pos:"n.",en:"freely offering time to do work without pay",zh:"志願服務；義工",ex:"The chart shows a range of volunteering activities undertaken by residents of Australia in 2000.",exZh:"該圖表顯示在 2000 年時，澳洲居民參與的一系列志願服務活動。",diff:3,unit:"P5L9"},
  // P5L10 Habits 習慣
  {id:998,word:"break",ph:"/breɪk/",pos:"v.",en:"to stop a habit",zh:"改掉（習慣）；戒除",ex:"Some bad habits like smoking are extremely hard to break.",exZh:"許多像是抽菸的壞習慣是非常難以改掉的。",diff:2,unit:"P5L10"},
  {id:999,word:"catch",ph:"/kætʃ/",pos:"v.",en:"to acquire a habit from someone else",zh:"（從別人）染上；習得",ex:"It is hard for people to catch themselves slipping back into bad habits.",exZh:"人們很難發現自己已再悄然染上惡習。",diff:2,unit:"P5L10"},
  {id:1000,word:"form",ph:"/fɔːm/",pos:"v.",en:"to develop a habit over time",zh:"形成；養成",ex:"It is often said that it takes up to a month to form a new habit.",exZh:"人們常說形成一個新習慣需要長達一個月的時間。",diff:2,unit:"P5L10"},
  {id:1001,word:"get into",ph:"/ɡet ˈɪntə/",pos:"v.",en:"to start doing something regularly",zh:"養成；開始習慣",ex:"I want to get into the habit of reading every day.",exZh:"我想要養成每天閱讀的習慣。",diff:2,unit:"P5L10"},
  {id:1002,word:"daily",ph:"/ˈdeɪli/",pos:"adj.",en:"happening every day",zh:"每日的；日常的",ex:"Writing out goals on a daily basis keeps people focused on their life priorities.",exZh:"每天寫出目標可讓人們專注於他們的生活優先事項。",diff:1,unit:"P5L10"},
  {id:1003,word:"regular",ph:"/ˈreɡjulər/",pos:"adj.",en:"done repeatedly at fixed intervals",zh:"規律的；定期的",ex:"Making acts of kindness a regular habit is good for your health and may slow aging.",exZh:"將行善作規律的習慣，對你的健康有益並且也可能延緩老化。",diff:2,unit:"P5L10"},
  {id:1004,word:"disconcerting",ph:"/ˌdɪskənˈsɜːtɪŋ/",pos:"adj.",en:"causing one to feel unsettled",zh:"令人尷尬的；令人不安的",ex:"Many people often find their colleagues' work habits disconcerting.",exZh:"許多人通常會發現他們同事的工作習慣令人尷尬。",diff:5,unit:"P5L10"},
  {id:1005,word:"eccentric",ph:"/ɪkˈsentrɪk/",pos:"adj.",en:"unconventional and slightly strange",zh:"古怪的；異乎尋常的",ex:"Some of the smartest people of all time have demonstrated some of the most eccentric behaviour.",exZh:"一些歷史上最聰明的人都表現出某些最古怪的行為。",diff:4,unit:"P5L10"},
  {id:1006,word:"consequence",ph:"/ˈkɒnsɪkwəns/",pos:"n.",en:"a result or effect of an action",zh:"後果；結果",ex:"For many people, harmless habits may incur serious consequences for our mental health.",exZh:"對許多人來說，「無害」的習慣可能會對心理健康造成嚴重後果。",diff:3,unit:"P5L10"},
  {id:1007,word:"force",ph:"/fɔːs/",pos:"n.",en:"a driving power or strength",zh:"力量；動力",ex:"To successful people, reading regularly is a force of habit.",exZh:"對成功人士而言，經常閱讀是一種習慣的力量。",diff:2,unit:"P5L10"},
  {id:1008,word:"process",ph:"/ˈprəʊses/",pos:"n.",en:"a series of actions to achieve a result",zh:"程序；過程",ex:"By following a clearly defined process, breaking a bad habit can be simple.",exZh:"藉由遵循一個定義明確的程序，改掉壞習慣可以變得簡單。",diff:2,unit:"P5L10"},
  {id:1009,word:"routine",ph:"/ruːˈtiːn/",pos:"n.",en:"a regular course of action",zh:"例行程序；慣例",ex:"My morning routine of getting ready for work usually takes around 45 minutes.",exZh:"我早上準備上班的例行程序通常需要四十五分鐘左右。",diff:2,unit:"P5L10"},

  // ── P10 Crime and Law 犯罪與法律 ──────────────────────────────
  // P10L1 逮捕與監禁 Arrest & Prison
  {id:1022,word:"arrest",ph:"/əˈrest/",pos:"v.",en:"to seize someone by legal authority",zh:"逮捕",ex:"As prison populations rise, increasing police powers to arrest more felons is not a good solution.",exZh:"隨著監獄人口增加，擴大警察權力以逮捕更多重罪犯並非良策。",diff:2,unit:"P10L1"},
  {id:1023,word:"commit",ph:"/kəˈmɪt/",pos:"v.",en:"to carry out or perpetrate a crime",zh:"犯（罪）",ex:"I believe that ex-convicts are perfectly suited to help deter teenagers from committing crimes.",exZh:"我認為前科犯非常適合幫助防止青少年犯罪。",diff:2,unit:"P10L1"},
  {id:1024,word:"reform",ph:"/rɪˈfɔːrm/",pos:"v.",en:"to make changes to improve something",zh:"改進；改過自新",ex:"Prisons offer convicts an excellent opportunity to reform through re-education programs.",exZh:"監獄透過再教育計畫為囚犯提供改過自新的絕佳機會。",diff:3,unit:"P10L1"},
  {id:1025,word:"release",ph:"/rɪˈliːs/",pos:"v.",en:"to set free from imprisonment",zh:"釋放",ex:"Many criminals reoffend as soon as they are released from jail.",exZh:"許多罪犯一從監獄釋放出來就再次犯罪。",diff:2,unit:"P10L1"},
  {id:1026,word:"habitual",ph:"/həˈbɪtʃuəl/",pos:"adj.",en:"done repeatedly or as a habit",zh:"習慣的；慣常的",ex:"A major problem with the prison system is its failure to correct the behaviour of a number of habitual offenders.",exZh:"監獄系統的一個主要問題是未能矯正一些慣犯的行為。",diff:3,unit:"P10L1"},
  {id:1027,word:"known",ph:"/noʊn/",pos:"adj.",en:"recognised or familiar",zh:"知名的",ex:"Governments are increasingly turning to facial recognition technology to catch known criminals in cities.",exZh:"政府正逐漸採用臉部辨識技術來捉捕城市中知名的罪犯。",diff:2,unit:"P10L1"},
  {id:1028,word:"mounting",ph:"/ˈmaʊntɪŋ/",pos:"adj.",en:"increasing in intensity",zh:"加劇的；不斷增加的",ex:"Police forces are currently under mounting pressure to find solutions to rising crime rates on limited budgets.",exZh:"警察部隊目前正面臨愈來愈大的壓力，要在有限預算下找到解決犯罪率上升的方法。",diff:3,unit:"P10L1"},
  {id:1029,word:"white-collar",ph:"/ˈhwaɪtˈkɒlər/",pos:"adj.",en:"relating to office or professional work",zh:"白領的",ex:"Financial motives are the primary reason behind the occurrence of white-collar crimes.",exZh:"財務動機是白領犯罪發生背後的主要原因。",diff:3,unit:"P10L1"},
  {id:1030,word:"defendant",ph:"/dɪˈfendənt/",pos:"n.",en:"a person accused in a court of law",zh:"被告",ex:"It is necessary for a jury to consider all circumstances surrounding a defendant before delivering a verdict.",exZh:"陪審團在做出判決前，必須考慮被告周圍所有情況。",diff:3,unit:"P10L1"},
  {id:1031,word:"custody",ph:"/ˈkʌstədi/",pos:"n.",en:"the protective care or guardianship of someone",zh:"拘留；監護",ex:"In the United Kingdom, police can only hold a suspect in custody for 24 hours without being charged with a crime.",exZh:"在英國，警方只能在嫌疑人未被起訴的情況下拘留其二十四小時。",diff:3,unit:"P10L1"},
  {id:1032,word:"hooligan",ph:"/ˈhuːlɪɡən/",pos:"n.",en:"a violent young troublemaker",zh:"流氓；小混混",ex:"Known hooligans who have caused trouble overseas are often not allowed to visit the same country twice.",exZh:"曾在海外惹事的知名流氓通常不被允許第二次造訪同一國家。",diff:3,unit:"P10L1"},
  {id:1033,word:"outlaw",ph:"/ˈaʊtlɔː/",pos:"n.",en:"a person who has broken the law and is hiding",zh:"不法之徒",ex:"Police in large nations like Australia sometimes find it hard to track outlaws on the run.",exZh:"在像澳洲這樣的大國，警察有時難以追蹤在逃的不法之徒。",diff:3,unit:"P10L1"},

  // P10L2 犯罪類型 Types of Crime
  {id:1034,word:"steal",ph:"/stiːl/",pos:"v.",en:"to take another person's property without permission",zh:"竊取",ex:"Stealing the identities of others is a new type of crime in this digital age.",exZh:"竊取他人身分在這個數位時代是一種新型犯罪。",diff:2,unit:"P10L2"},
  {id:1035,word:"harass",ph:"/ˈhærəs/",pos:"v.",en:"to subject someone to aggressive pressure or intimidation",zh:"騷擾",ex:"The prevalence of the Internet has made it easier for cyberbullies to harass their victims.",exZh:"網路的普及使網路霸凌者更容易騷擾他們的受害者。",diff:3,unit:"P10L2"},
  {id:1036,word:"set fire",ph:"/set ˈfaɪər/",pos:"v.",en:"to cause something to start burning",zh:"放火",ex:"In some countries, it is a crime to set fire to the national flag.",exZh:"在某些國家，放火燒國旗是一項犯罪行為。",diff:2,unit:"P10L2"},
  {id:1037,word:"vandalise",ph:"/ˈvændəlaɪz/",pos:"v.",en:"to deliberately destroy or damage property",zh:"任意破壞",ex:"Those who vandalise company property may damage both its image and its business.",exZh:"那些任意破壞公司財產的人可能會損害公司的形象和業務。",diff:3,unit:"P10L2"},
  {id:1038,word:"appalling",ph:"/əˈpɔːlɪŋ/",pos:"adj.",en:"causing shock or dismay; horrific",zh:"駭人聽聞的",ex:"Violent crime is appalling and causes long-term damage to its victims and their families.",exZh:"暴力犯罪是駭人聽聞的，並對受害者及其家庭造成長期的傷害。",diff:3,unit:"P10L2"},
  {id:1039,word:"sexual",ph:"/ˈsekʃuəl/",pos:"adj.",en:"relating to physical attraction or intimate physical contact",zh:"性的",ex:"Crimes of sexual assault continue to be underreported around the globe.",exZh:"性侵害犯罪在全球仍然持續被低報。",diff:3,unit:"P10L2"},
  {id:1040,word:"barbaric",ph:"/bɑːˈbærɪk/",pos:"adj.",en:"savagely cruel; exceedingly brutal",zh:"野蠻的",ex:"Capital punishment is widely considered as a barbaric form of punishment, ill-suited to a civilised society.",exZh:"死刑被廣泛認為是一種野蠻的懲罰形式，不適合文明社會。",diff:3,unit:"P10L2"},
  {id:1041,word:"victimless",ph:"/ˈvɪktɪmləs/",pos:"adj.",en:"having no identifiable victim",zh:"沒有受害者的",ex:"Financially motivated white-collar fraud is often regarded as a victimless crime.",exZh:"以經濟利益為動機的白領詐欺常被視為一種無受害者的犯罪。",diff:3,unit:"P10L2"},
  {id:1042,word:"assault",ph:"/əˈsɔːlt/",pos:"n.",en:"a physical attack on someone",zh:"攻擊；襲擊",ex:"Assault from other prisoners is a major issue in American jails.",exZh:"來自其他囚犯的攻擊是美國監獄的主要問題。",diff:3,unit:"P10L2"},
  {id:1043,word:"theft",ph:"/θeft/",pos:"n.",en:"the action of stealing",zh:"盜竊",ex:"Identity theft, where criminals impersonate someone else, is a growing risk that affects everyone.",exZh:"身分盜竊，即罪犯冒充他人身分行為，是一種日益增長的風險，影響著所有人。",diff:3,unit:"P10L2"},
  {id:1044,word:"arson",ph:"/ˈɑːrsn/",pos:"n.",en:"the criminal act of deliberately setting fire to property",zh:"縱火",ex:"A primary motive behind arson is often to illegally claim money from an insurance company.",exZh:"縱火背後的一個主要動機通常是非法向保險公司索賠金錢。",diff:3,unit:"P10L2"},
  {id:1045,word:"vandalism",ph:"/ˈvændəlɪzəm/",pos:"n.",en:"deliberate destruction of public or private property",zh:"故意破壞公物的行為",ex:"Vandalism is a common side effect when mass protests turn violent.",exZh:"當大規模抗議演變為暴力時，故意破壞公物是一種常見的附帶後果。",diff:3,unit:"P10L2"},

  // P10L3 嚴重犯罪 Serious Crimes
  {id:1046,word:"defraud",ph:"/dɪˈfrɔːd/",pos:"v.",en:"to illegally obtain money by deception",zh:"詐騙",ex:"A pyramid scheme is an illegal way designed to defraud innocent investors.",exZh:"金字塔模式是一種旨在詐騙無辜投資者的非法方式。",diff:3,unit:"P10L3"},
  {id:1047,word:"hack",ph:"/hæk/",pos:"v.",en:"to gain unauthorised access to a computer system",zh:"非法入侵；駭入",ex:"It is common to read news about millions of passwords being hacked from social media websites.",exZh:"關於數百萬個密碼從社交媒體網站被盜的新聞，經常可見。",diff:3,unit:"P10L3"},
  {id:1048,word:"kidnap",ph:"/ˈkɪdnæp/",pos:"v.",en:"to take someone away illegally by force",zh:"綁架",ex:"It is sad that in the 21st century, parents still worry about strangers kidnapping their children.",exZh:"可悲的是，在二十一世紀，父母仍擔心陌生人綁架他們的小孩。",diff:3,unit:"P10L3"},
  {id:1049,word:"smuggle",ph:"/ˈsmʌɡl/",pos:"v.",en:"to move goods illegally into or out of a country",zh:"走私",ex:"Millions of dollars of drugs are smuggled across international borders.",exZh:"數百萬美元的毒品被走私跨越國際邊界。",diff:3,unit:"P10L3"},
  {id:1050,word:"petty",ph:"/ˈpeti/",pos:"adj.",en:"of little importance; trivial",zh:"小規模的；輕微的",ex:"Many criminals begin with petty crime, and then move on to more serious felonies.",exZh:"許多罪犯從輕微的罪開始，然後轉向更嚴重的重罪。",diff:2,unit:"P10L3"},
  {id:1051,word:"recorded",ph:"/rɪˈkɔːrdɪd/",pos:"adj.",en:"set down in writing or other permanent form",zh:"已記錄的",ex:"Recorded hate crimes have recently been rising in Western Europe, especially against immigrants.",exZh:"近來，西歐記錄在案的仇恨犯罪，尤其是針對移民的案件正在上升。",diff:3,unit:"P10L3"},
  {id:1052,word:"vicious",ph:"/ˈvɪʃəs/",pos:"adj.",en:"deliberately cruel or violent",zh:"惡毒的；兇殘的",ex:"Serial murderers of the 21st century committed some of the most vicious acts.",exZh:"二十一世紀的連環殺人犯犯下了一些最惡毒的行為。",diff:3,unit:"P10L3"},
  {id:1053,word:"copycat",ph:"/ˈkɒpikæt/",pos:"adj.",en:"denoting an imitation of another's actions",zh:"模仿的",ex:"Glamorizing major crime in the media may be one of the reasons why copycat offenses occur.",exZh:"媒體美化重大犯罪，可能是模仿犯罪行為發生的原因之一。",diff:3,unit:"P10L3"},
  {id:1054,word:"blackmail",ph:"/ˈblækmeɪl/",pos:"n.",en:"the action of demanding money by threats",zh:"勒索",ex:"Blackmail can create an on-going hell for victims and cause long-lasting emotional damage.",exZh:"勒索會讓受害者陷入持續不斷的困境，並造成長期的情感傷害。",diff:3,unit:"P10L3"},
  {id:1055,word:"fraud",ph:"/frɔːd/",pos:"n.",en:"wrongful deception intended to result in financial gain",zh:"詐欺",ex:"A rise in online fraud and identity theft has left many people feeling insecure.",exZh:"網路詐欺和身分盜竊的增加讓許多人感到不安。",diff:3,unit:"P10L3"},
  {id:1056,word:"kidnapping",ph:"/ˈkɪdnæpɪŋ/",pos:"n.",en:"the crime of taking someone away by force",zh:"綁架",ex:"Terrorists often resort to kidnapping as a means to demand ransoms.",exZh:"恐怖分子經常以綁架作為要求贖金的手段。",diff:3,unit:"P10L3"},
  {id:1057,word:"smuggling",ph:"/ˈsmʌɡlɪŋ/",pos:"n.",en:"the illegal movement of goods across borders",zh:"走私",ex:"Even in jail, inmates are often caught smuggling contraband.",exZh:"即使在監獄中，囚犯經常被抓獲走私違禁品。",diff:3,unit:"P10L3"},

  // P10L4 法律與合法性 Law & Legality
  {id:1058,word:"ban",ph:"/bæn/",pos:"v.",en:"to officially prohibit something",zh:"禁止",ex:"In countries that have banned firearms, gun-related deaths have fallen rapidly.",exZh:"在已經禁止槍枝的國家，與槍枝有關的死亡人數已迅速下降。",diff:2,unit:"P10L4"},
  {id:1059,word:"abide",ph:"/əˈbaɪd/",pos:"v.",en:"to accept or act in accordance with a rule",zh:"遵守",ex:"People generally tend to abide by the law and most only ever succumb to minor infractions.",exZh:"人們普遍傾向遵守法律，大多數只會屈從於輕微的違規行為。",diff:3,unit:"P10L4"},
  {id:1060,word:"abolish",ph:"/əˈbɒlɪʃ/",pos:"v.",en:"to formally put an end to a system or practice",zh:"廢除",ex:"Many governments wish to abolish international tax havens used by the rich to avoid paying tax.",exZh:"許多政府希望廢除富人用來逃避繳稅的國際避稅天堂。",diff:3,unit:"P10L4"},
  {id:1061,word:"legalise",ph:"/ˈliːɡəlaɪz/",pos:"v.",en:"to make something that was previously illegal permissible by law",zh:"使合法化",ex:"There are strong arguments for legalising most drugs.",exZh:"支持使大多數毒品合法化的理由非常充分。",diff:3,unit:"P10L4"},
  {id:1062,word:"illegal",ph:"/ɪˈliːɡəl/",pos:"adj.",en:"contrary to or forbidden by law",zh:"不合法的；非法的",ex:"Making alcohol illegal may be an effective measure against crime.",exZh:"將酒精列為非法可能是打擊犯罪的一項有效措施。",diff:2,unit:"P10L4"},
  {id:1063,word:"just",ph:"/dʒʌst/",pos:"adj.",en:"based on what is morally right and fair",zh:"公正的",ex:"For a legal system to be just, its courts must remain independent from political or commercial interests.",exZh:"為了讓法律制度能夠公正，其法院必須保持獨立於政治或商業利益之外。",diff:2,unit:"P10L4"},
  {id:1064,word:"statutory",ph:"/ˈstætʃutɔːri/",pos:"adj.",en:"required or enacted by statute",zh:"法定的",ex:"In New York, fast food outlets must limit soda portion sizes to comply with a new statutory requirement.",exZh:"在紐約，速食店必須限制汽水的分量，以符合新的法定要求。",diff:4,unit:"P10L4"},
  {id:1065,word:"proportionate",ph:"/prəˈpɔːʃənɪt/",pos:"adj.",en:"corresponding in size or amount to something else",zh:"相稱的；成比例的",ex:"A punishment should be proportionate to the crime committed.",exZh:"懲罰應該與所犯罪行相稱。",diff:4,unit:"P10L4"},
  {id:1066,word:"guilt",ph:"/ɡɪlt/",pos:"n.",en:"the fact of having committed an offence",zh:"罪；罪行",ex:"Prosecutors must prove beyond all reasonable doubt that a defendant is guilty of a criminal act.",exZh:"檢察官必須排除所有合理懷疑，證明被告在犯罪行為中有罪。",diff:2,unit:"P10L4"},
  {id:1067,word:"offence",ph:"/əˈfens/",pos:"n.",en:"a breach of a law or rule; an illegal act",zh:"犯罪行為",ex:"In many American states, smoking cannabis is now only a fineable offence.",exZh:"在美國許多州，吸食大麻現在僅被視為罰款的犯罪行為。",diff:3,unit:"P10L4"},
  {id:1068,word:"plea",ph:"/pliː/",pos:"n.",en:"a formal statement by a defendant",zh:"答辯",ex:"In a plea bargain, a defendant pleads guilty in return for a more lenient sentence.",exZh:"在認罪辯訴協議中，被告認罪以換取更寬大的判決。",diff:3,unit:"P10L4"},
  {id:1069,word:"warrant",ph:"/ˈwɒrənt/",pos:"n.",en:"a document authorising police to make an arrest or search",zh:"搜查令",ex:"Law enforcement officials are increasingly applying for warrants to search for criminals on social media platforms.",exZh:"執法人員愈來愈頻繁地申請搜查令，以在社交媒體平台上搜索罪犯。",diff:3,unit:"P10L4"},

  // P10L5 法律體系 Legal System
  {id:1070,word:"appeal",ph:"/əˈpiːl/",pos:"v.",en:"to apply to a higher court for a reversal of a decision",zh:"上訴",ex:"Criminals are always free to appeal their sentences.",exZh:"罪犯總是可以自由對其判決提出上訴。",diff:2,unit:"P10L5"},
  {id:1071,word:"assume",ph:"/əˈsjuːm/",pos:"v.",en:"to take on a responsibility or role",zh:"承擔",ex:"Most personal injury lawyers will assume all legal costs in return for a portion of the final settlement.",exZh:"大多數人身傷害律師會承擔所有法律費用，以換取最終和解金的一部分作為回報。",diff:3,unit:"P10L5"},
  {id:1072,word:"defend",ph:"/dɪˈfend/",pos:"v.",en:"to represent in court; to argue in favour of",zh:"辯護",ex:"In the event that defendants cannot afford a lawyer, they may defend themselves.",exZh:"如果被告無法負擔律師費用，他們可以自行辯護。",diff:2,unit:"P10L5"},
  {id:1073,word:"testify",ph:"/ˈtestɪfaɪ/",pos:"v.",en:"to give evidence as a witness in court",zh:"作證",ex:"Under American law, a spouse cannot be compelled to testify against their husband or wife.",exZh:"根據美國法律，配偶不能被強迫作出對其丈夫或妻子不利的證詞。",diff:3,unit:"P10L5"},
  {id:1074,word:"civil",ph:"/ˈsɪvɪl/",pos:"adj.",en:"relating to private relations between citizens",zh:"民事的",ex:"Whether civil or criminal, legal cases in countries like Kenya can take years to get to trial.",exZh:"無論是民事還是刑事，在肯亞這樣的國家法律案件可能需要花費數年才能開始審判。",diff:3,unit:"P10L5"},
  {id:1075,word:"criminal",ph:"/ˈkrɪmɪnəl/",pos:"adj.",en:"relating to crime",zh:"犯罪的；刑事的",ex:"Possessing a criminal record makes it difficult for ex-convicts to find a job.",exZh:"擁有犯罪記錄使前科犯很難找工作。",diff:2,unit:"P10L5"},
  {id:1076,word:"constitutional",ph:"/ˌkɒnstɪˈtjuːʃənl/",pos:"adj.",en:"relating to a political constitution",zh:"憲法的",ex:"The constitutional right of Americans to bear arms is a contentious issue.",exZh:"美國人擁有武器的憲法權利是一個有爭議的議題。",diff:4,unit:"P10L5"},
  {id:1077,word:"supreme",ph:"/suˈpriːm/",pos:"adj.",en:"highest in rank or authority",zh:"最高的",ex:"The supreme court is the highest court in most countries and has the final say in judicial cases.",exZh:"最高法院是大多數國家中最高級別的法院，對司法案件擁有最終裁決權。",diff:3,unit:"P10L5"},
  {id:1078,word:"judge",ph:"/dʒʌdʒ/",pos:"n.",en:"a public official who decides cases in court",zh:"法官",ex:"Above all, judges must be impartial and objective when considering the facts of a case.",exZh:"最重要的是，當法官在考慮案件的事實時，必須保持公正客觀。",diff:2,unit:"P10L5"},
  {id:1079,word:"alibi",ph:"/ˈælɪbaɪ/",pos:"n.",en:"a claim that one was elsewhere when a crime was committed",zh:"不在場證明",ex:"Recent studies on memory formation have called into question the reliability of alibis in court cases.",exZh:"最近有關記憶形成的研究，已對法庭案件中不在場證明的可靠性提出質疑。",diff:4,unit:"P10L5"},
  {id:1080,word:"testimony",ph:"/ˈtestɪməni/",pos:"n.",en:"a formal written or spoken statement given in court",zh:"證詞",ex:"Before giving a testimony, a witness will usually swear an oath upon a Bible in court.",exZh:"在作證之前，證人通常會在法庭上對聖經宣誓。",diff:3,unit:"P10L5"},
  {id:1081,word:"barrister",ph:"/ˈbærɪstər/",pos:"n.",en:"a lawyer qualified to argue cases in higher courts",zh:"出庭律師",ex:"There is a lack of gender diversity among barristers in the UK.",exZh:"英國的出庭律師中缺乏性別多元性。",diff:4,unit:"P10L5"},

  // P10L6 審判與訴訟 Trial & Prosecution
  {id:1082,word:"acquit",ph:"/əˈkwɪt/",pos:"v.",en:"to declare someone not guilty of a criminal charge",zh:"宣判無罪",ex:"Suspects may be acquitted of all charges when evidence to indict them is insufficient.",exZh:"當證據不足以起訴嫌疑犯時，他們的所有指控可能都會被宣判無罪。",diff:4,unit:"P10L6"},
  {id:1083,word:"condemn",ph:"/kənˈdem/",pos:"v.",en:"to express complete disapproval of; to sentence",zh:"譴責",ex:"Criminals who commit major crimes are often condemned by society and sentenced to spend long periods in prison.",exZh:"犯下重大罪行的罪犯通常會被社會譴責，並被判處長期監禁。",diff:3,unit:"P10L6"},
  {id:1084,word:"deprive",ph:"/dɪˈpraɪv/",pos:"v.",en:"to take something away from someone",zh:"剝奪",ex:"Whatever the crime may be, no one should be deprived of the right to a fair trial.",exZh:"無論是什麼罪行，任何人都不應被剝奪公平受審的權利。",diff:3,unit:"P10L6"},
  {id:1085,word:"prosecute",ph:"/ˈprɒsɪkjuːt/",pos:"v.",en:"to institute legal proceedings against someone",zh:"起訴",ex:"Cyber criminals are difficult to prosecute when they reside outside of the country where they commit the crime.",exZh:"當網路罪犯居住在犯罪發生國之外時，要起訴他們很困難。",diff:3,unit:"P10L6"},
  {id:1086,word:"accusatory",ph:"/əˈkjuːzətəri/",pos:"adj.",en:"indicating or suggesting that someone has done something wrong",zh:"指責的",ex:"One may point an accusatory finger at media violence as a cause of juvenile crime.",exZh:"人們可能會將指責的矛頭對準媒體中的暴力，認為這是導致青少年犯罪的原因之一。",diff:4,unit:"P10L6"},
  {id:1087,word:"authoritative",ph:"/əˈθɒrɪteɪtɪv/",pos:"adj.",en:"commanding and self-confident; reliable",zh:"有權威的",ex:"The older the accusation, the more authoritative the supporting evidence must be.",exZh:"指控愈久遠，所需的支持證據就必須愈有權威。",diff:4,unit:"P10L6"},
  {id:1088,word:"unjust",ph:"/ˌʌnˈdʒʌst/",pos:"adj.",en:"not based on or behaving according to what is morally right",zh:"不公正的",ex:"Mandatory sentences that must be imposed by a judge regardless of the situation are proved to be subsequently unjust.",exZh:"法官在任何情況下都必須作出的強制性判決，事後被證明是不公正的。",diff:3,unit:"P10L6"},
  {id:1089,word:"indictable",ph:"/ɪnˈdaɪtəbl/",pos:"adj.",en:"of an offence that warrants a formal charge and trial",zh:"可以起訴的",ex:"An indictable offense is a serious charge whereby the accused usually faces trial in a higher court.",exZh:"公訴罪是一項嚴重的指控，通常需要被告在高等法院接受審判。",diff:5,unit:"P10L6"},
  {id:1090,word:"lawsuit",ph:"/ˈlɔːsjuːt/",pos:"n.",en:"a claim or dispute brought to a court of law",zh:"訴訟",ex:"Civil lawsuits usually only involve paying damages to the plaintiff.",exZh:"民事訴訟通常只涉及向原告支付賠償金。",diff:3,unit:"P10L6"},
  {id:1091,word:"victim",ph:"/ˈvɪktɪm/",pos:"n.",en:"a person harmed or suffering as a result of a crime",zh:"受害者",ex:"The majority of crime victims never report what happened to the police.",exZh:"大多數犯罪受害者從未向警方報告發生何事。",diff:2,unit:"P10L6"},
  {id:1092,word:"witness",ph:"/ˈwɪtnɪs/",pos:"n.",en:"a person who sees an event and can give evidence about it",zh:"證人",ex:"The witness protection program serves people whose lives may be in danger before they give testimony.",exZh:"證人保護計畫為那些在作證前生命可能面臨威脅的人提供服務。",diff:2,unit:"P10L6"},
  {id:1093,word:"prosecutor",ph:"/ˈprɒsɪkjuːtər/",pos:"n.",en:"a legal official who conducts proceedings against a defendant",zh:"檢察官",ex:"Prosecutors for the International Criminal Court investigate the most serious crimes against humanity.",exZh:"國際刑事法庭的檢察官調查最嚴重的危害人類罪。",diff:3,unit:"P10L6"},

  // P10L7 判決與懲罰 Sentencing & Punishment
  {id:1094,word:"fine",ph:"/faɪn/",pos:"v.",en:"to impose a monetary penalty on someone",zh:"罰款",ex:"People who commit minor offenses are normally fined.",exZh:"犯輕罪的人通常會被罰款。",diff:2,unit:"P10L7"},
  {id:1095,word:"judge",ph:"/dʒʌdʒ/",pos:"v.",en:"to form an opinion or decide on a case in court",zh:"判決",ex:"Juries tend to judge a case based on its emotional appeal in addition to the facts.",exZh:"除了事實之外，陪審團傾向根據其情感訴求來判決一個案件。",diff:2,unit:"P10L7"},
  {id:1096,word:"sentence",ph:"/ˈsentəns/",pos:"v.",en:"to declare the punishment for a convicted person",zh:"判決",ex:"Criminals accused of minor crimes, such as petty theft, are often sentenced to community service.",exZh:"被控輕罪的罪犯，例如小型竊盜，通常會被判處社區服務。",diff:2,unit:"P10L7"},
  {id:1097,word:"execute",ph:"/ˈeksɪkjuːt/",pos:"v.",en:"to carry out a death sentence on a convicted person",zh:"處決",ex:"Opponents of the death penalty assert that to execute someone breaches that person's human right to life.",exZh:"死刑的反對者聲稱，處決某人侵犯了該人的生命權利。",diff:3,unit:"P10L7"},
  {id:1098,word:"guilty",ph:"/ˈɡɪlti/",pos:"adj.",en:"culpable of a specified wrongdoing",zh:"有罪的",ex:"Media coverage may sway whether the defendant is found guilty or not in highly publicised cases.",exZh:"媒體報導可能影響在備受關注的案件中，被告是否被判有罪。",diff:2,unit:"P10L7"},
  {id:1099,word:"innocent",ph:"/ˈɪnəsənt/",pos:"adj.",en:"not guilty of a crime or offence",zh:"無罪的",ex:"A founding principle of English common law is that all suspects are innocent until proven guilty.",exZh:"英國普通法的一項創始原則是，所有嫌犯在被證明有罪之前都是無罪的。",diff:2,unit:"P10L7"},
  {id:1100,word:"admissible",ph:"/ədˈmɪsəbl/",pos:"adj.",en:"acceptable or valid, especially as evidence in court",zh:"可接受的",ex:"Evidence must be both relevant and credible to be admissible in a court of law.",exZh:"證據必須相關且可信，在法庭上才能被接受。",diff:4,unit:"P10L7"},
  {id:1101,word:"condemned",ph:"/kənˈdemd/",pos:"adj.",en:"sentenced to death",zh:"被判死刑的",ex:"On average, condemned inmates can spend up to 20 years on death row.",exZh:"平均來說，死刑犯在死刑執行前可等待長達二十年。",diff:3,unit:"P10L7"},
  {id:1102,word:"corporal punishment",ph:"/ˈkɔːpərəl ˈpʌnɪʃmənt/",pos:"n.",en:"physical punishment such as caning or flogging",zh:"體罰",ex:"The relevance of corporal punishment is questionable in the 21st century.",exZh:"在二十一世紀，體罰的適當性值得懷疑。",diff:3,unit:"P10L7"},
  {id:1103,word:"custody",ph:"/ˈkʌstədi/",pos:"n.",en:"the legal right to care for a child after divorce",zh:"監護權",ex:"Mothers are awarded custody of children more often than fathers in cases of divorce or separation.",exZh:"在離婚或分居的情況下，母親比父親更常獲得孩子的監護權。",diff:3,unit:"P10L7"},
  {id:1104,word:"leniency",ph:"/ˈliːniənsi/",pos:"n.",en:"the quality of being more merciful than expected",zh:"寬大",ex:"The defendant may appeal for leniency on the grounds of mental instability.",exZh:"被告可以以精神不穩定為由請求從寬處理。",diff:4,unit:"P10L7"},
  {id:1105,word:"spell",ph:"/spel/",pos:"n.",en:"a short period of time",zh:"一段時間",ex:"Many criminals begin a career in crime after multiple short spells in custody as juveniles.",exZh:"許多罪犯在少年時期經歷多次短期的拘留後，開始了犯罪生涯。",diff:2,unit:"P10L7"},

  // P10L8 賠償與補償 Compensation & Restitution
  {id:1106,word:"compensate",ph:"/ˈkɒmpenseɪt/",pos:"v.",en:"to give something in recognition of loss or suffering",zh:"補償",ex:"There is a belief that governments should compensate one parent so that the other may work.",exZh:"有人認為政府應該補償父母的一方，以讓另一方可以工作。",diff:3,unit:"P10L8"},
  {id:1107,word:"deny",ph:"/dɪˈnaɪ/",pos:"v.",en:"to refuse to give something requested or desired",zh:"拒絕",ex:"Victims who are denied compensation through court may often apply to government funds instead.",exZh:"被法院拒絕賠償的受害者通常會申請政府資金來作為替代。",diff:2,unit:"P10L8"},
  {id:1108,word:"grant",ph:"/ɡrɑːnt/",pos:"v.",en:"to agree to give or allow something requested",zh:"准予",ex:"Suspects who are granted bail must comply with a set of restrictions after arrest until their court date.",exZh:"被准予保釋的嫌犯必須遵守一連串的限制，直至開庭日期。",diff:2,unit:"P10L8"},
  {id:1109,word:"defray",ph:"/dɪˈfreɪ/",pos:"v.",en:"to provide money to pay for costs or expenses",zh:"承擔（費用）",ex:"Private prisons are seen as a practical way to help the public sector defray operating costs.",exZh:"私人監獄被視為幫助公共部門分攤營運成本的一種實際方法。",diff:4,unit:"P10L8"},
  {id:1110,word:"equivalent",ph:"/ɪˈkwɪvələnt/",pos:"adj.",en:"equal in value, function, or meaning",zh:"同等的",ex:"When unable to pay a fine, courts may impose an equivalent number of hours in community service.",exZh:"當無法支付罰款時，法院可能會判處相等時數的社區服務。",diff:3,unit:"P10L8"},
  {id:1111,word:"monetary",ph:"/ˈmɒnətəri/",pos:"adj.",en:"relating to money or currency",zh:"金錢的",ex:"If offenders are found guilty, they may be required to pay monetary restitution to the victim.",exZh:"如果罪犯被判有罪，他們可能會被要求向受害者支付金錢賠償。",diff:3,unit:"P10L8"},
  {id:1112,word:"sufficient",ph:"/səˈfɪʃənt/",pos:"adj.",en:"enough; adequate",zh:"足夠的",ex:"For victims, financial restitution may not be sufficient to cover years of emotional distress.",exZh:"對於受害者而言，金錢賠償可能不足以彌補多年的精神痛苦。",diff:3,unit:"P10L8"},
  {id:1113,word:"compensatory",ph:"/kəmˈpensətəri/",pos:"adj.",en:"intended to compensate for a loss or hardship",zh:"賠償性的",ex:"In the event of a wrongful conviction, the state should provide compensatory remuneration.",exZh:"假如發生錯誤定罪，國家應提供賠償性補償。",diff:4,unit:"P10L8"},
  {id:1114,word:"indemnity",ph:"/ɪnˈdemnɪti/",pos:"n.",en:"security or protection against loss or damage",zh:"賠償",ex:"Indemnity insurance typically protects homeowners against potential future issues with their property.",exZh:"賠償保險通常保護屋主及其財產未來的潛在問題。",diff:4,unit:"P10L8"},
  {id:1115,word:"remuneration",ph:"/rɪˌmjuːnəˈreɪʃən/",pos:"n.",en:"money paid for work or a service; compensation",zh:"賠償",ex:"The majority of cases are usually settled out of court for an agreed amount of remuneration.",exZh:"大多數案件通常都會以商定的賠償金額進行庭外和解。",diff:4,unit:"P10L8"},
  {id:1116,word:"scheme",ph:"/skiːm/",pos:"n.",en:"a plan or arrangement, often dishonest",zh:"騙局",ex:"Many scammers run elaborate Ponzi schemes designed to lure investors.",exZh:"許多騙子運作精心設計的龐氏騙局，以引誘投資者上當。",diff:3,unit:"P10L8"},
  {id:1117,word:"quittance",ph:"/ˈkwɪtəns/",pos:"n.",en:"a release from a debt or obligation; compensation",zh:"賠償",ex:"If negligence is proven, companies may pay quittance for bodily harm caused to plaintiffs.",exZh:"如果被證明有過失，公司可能會對原告造成的身體傷害支付賠償金。",diff:5,unit:"P10L8"},

  // ── P11 Social Issues 社會議題 ──────────────────────────────────
  // P11L1 失業 Unemployment
  {id:1118,word:"suffer",ph:"/ˈsʌfər/",pos:"v.",en:"to experience something bad or unpleasant",zh:"遭受",ex:"For those who suffer layoffs from their company, the mental health toll may equal the financial one.",exZh:"那些在公司遭到裁員的人，心理健康的損失可能與財務損失相當。",diff:2,unit:"P11L1"},
  {id:1119,word:"alleviate",ph:"/əˈliːvieɪt/",pos:"v.",en:"to make suffering or a problem less severe",zh:"緩解",ex:"Vocational courses and retraining for the unemployed help alleviate their numbers over the long term.",exZh:"為失業人口提供職業課程和再培訓有助於長期緩解失業人數。",diff:3,unit:"P11L1"},
  {id:1120,word:"combat",ph:"/ˈkɒmbæt/",pos:"v.",en:"to take action to reduce or prevent something bad",zh:"對抗",ex:"Investing in the education of a workforce is the best way to combat unemployment.",exZh:"投資於勞動力教育是對抗失業的最佳方式。",diff:3,unit:"P11L1"},
  {id:1121,word:"vacate",ph:"/veɪˈkeɪt/",pos:"v.",en:"to leave a position or place",zh:"辭去",ex:"Older workers are often reluctant to vacate their positions in a jobs market where ageism is an issue.",exZh:"在存在年齡歧視的就業市場中，年長工作者通常不願意辭去職位。",diff:3,unit:"P11L1"},
  {id:1122,word:"jobless",ph:"/ˈdʒɒblɪs/",pos:"adj.",en:"without a paid job; unemployed",zh:"失業的",ex:"There is often a strong correlation between high average earnings and a low jobless rate.",exZh:"高平均收入和低失業率之間通常有很強的相關性。",diff:2,unit:"P11L1"},
  {id:1123,word:"able-bodied",ph:"/ˈeɪblˈbɒdɪd/",pos:"adj.",en:"physically strong and healthy",zh:"健全的",ex:"The number of able-bodied male workers is decreasing in an aging Japan.",exZh:"在高齡化的日本，體格健全的男性勞工人數正在減少。",diff:3,unit:"P11L1"},
  {id:1124,word:"cyclical",ph:"/ˈsaɪklɪkl/",pos:"adj.",en:"occurring in cycles; recurring regularly",zh:"週期性的",ex:"Cyclical unemployment tends to result from cycles of contraction and expansion.",exZh:"週期性失業往往起因於收縮和擴張週期。",diff:4,unit:"P11L1"},
  {id:1125,word:"redundant",ph:"/rɪˈdʌndənt/",pos:"adj.",en:"no longer needed or useful; surplus",zh:"多餘的",ex:"As automation makes more jobs redundant, workers have to train harder to stay relevant.",exZh:"隨著自動化使更多工作變得多餘，勞工必須更加努力訓練，才能保持自身的競爭力。",diff:3,unit:"P11L1"},
  {id:1126,word:"job vacancy",ph:"/dʒɒb ˈveɪkənsi/",pos:"n.",en:"an unfilled position in a company",zh:"職位空缺",ex:"In a recession, the number of job vacancies decreases as companies make spending cutbacks.",exZh:"在經濟衰退時，隨著公司削減開支，職位空缺的數量減少。",diff:2,unit:"P11L1"},
  {id:1127,word:"recession",ph:"/rɪˈseʃən/",pos:"n.",en:"a period of temporary economic decline",zh:"經濟衰退",ex:"A high unemployment rate is usually a strong indicator of a looming recession.",exZh:"高失業率通常是預示經濟衰退即將到來的重要指標。",diff:3,unit:"P11L1"},
  {id:1128,word:"jobseeker",ph:"/ˈdʒɒbsiːkər/",pos:"n.",en:"a person looking for employment",zh:"求職者",ex:"Some worry that excessive immigration may increase the number of jobseekers on the market.",exZh:"有些人擔心過多的移民可能會增加市場上求職者的數量。",diff:2,unit:"P11L1"},
  {id:1129,word:"upheaval",ph:"/ʌpˈhiːvəl/",pos:"n.",en:"a violent or sudden change or disruption",zh:"劇變",ex:"Constant migration from villages to cities is causing major social upheaval in many developing countries.",exZh:"從農村到城市的持續遷移正在許多發展中國家引起重大的社會劇變。",diff:4,unit:"P11L1"},

  // P11L2 貧窮 Poverty
  {id:1130,word:"oppress",ph:"/əˈpres/",pos:"v.",en:"to keep someone in hardship by unjust use of power",zh:"壓迫",ex:"Opponents of globalisation claim that it oppresses the poor, making it harder for them to escape poverty.",exZh:"全球化的反對者聲稱，全球化壓迫窮人，使他們更難擺脫貧困。",diff:3,unit:"P11L2"},
  {id:1131,word:"degrade",ph:"/dɪˈɡreɪd/",pos:"v.",en:"to lower the quality or value of something",zh:"降低",ex:"Some property owners claim that having homeless people in an area degrades land values.",exZh:"一些業主聲稱，一個地區有無家可歸的人會降低土地價值。",diff:3,unit:"P11L2"},
  {id:1132,word:"eradicate",ph:"/ɪˈrædɪkeɪt/",pos:"v.",en:"to completely destroy or get rid of something",zh:"根除",ex:"The United Nations' sustainable development goals aim to eradicate extreme poverty by 2030.",exZh:"聯合國的永續發展目標旨在 2030 年前根除極端貧困。",diff:4,unit:"P11L2"},
  {id:1133,word:"impoverish",ph:"/ɪmˈpɒvərɪʃ/",pos:"v.",en:"to make a person or area poor",zh:"使窮困",ex:"Poverty impoverishes human beings by withholding their basic rights to shelter, clothing, food, and water.",exZh:"藉由剝奪人類對住所、衣物、食物和水的基本權利，貧窮使人陷入困頓。",diff:4,unit:"P11L2"},
  {id:1134,word:"destitute",ph:"/ˈdestɪtjuːt/",pos:"adj.",en:"extremely poor and lacking the means to provide for oneself",zh:"貧窮的",ex:"Recent studies in America show that destitute people live, on average, thirty years less than rich people.",exZh:"美國最近的研究顯示，貧困人口的壽命平均比富裕人口少三十年。",diff:4,unit:"P11L2"},
  {id:1135,word:"down-and-out",ph:"/ˈdaʊnəndˈaʊt/",pos:"adj.",en:"without money, a job, or a place to live",zh:"窮困潦倒的",ex:"Becoming down-and-out is never a choice, though millions live this way around the world.",exZh:"淪落至一貧如洗絕非出於選擇，然而全世界卻有數百萬人過著這樣的生活。",diff:3,unit:"P11L2"},
  {id:1136,word:"indigent",ph:"/ˈɪndɪdʒənt/",pos:"adj.",en:"poor; needy",zh:"貧困的",ex:"Indigent families are often the worst affected in times of disaster.",exZh:"窮困家庭往往是在災難時受影響最嚴重的群體。",diff:4,unit:"P11L2"},
  {id:1137,word:"penurious",ph:"/pɪˈnjʊəriəs/",pos:"adj.",en:"extremely poor; poverty-stricken",zh:"貧窮的",ex:"Penurious living conditions in the world's slums result in the rapid spread of disease there.",exZh:"世界貧民窟的惡劣生活條件導致疾病在當地快速傳播。",diff:5,unit:"P11L2"},
  {id:1138,word:"austerity",ph:"/ɒsˈterɪti/",pos:"n.",en:"difficult economic conditions created by government measures to reduce spending",zh:"緊縮",ex:"Some argue that austerity measures in developed nations are politically motivated.",exZh:"有人認為，已開發國家的緊縮政策是出於政治動機。",diff:4,unit:"P11L2"},
  {id:1139,word:"poverty line",ph:"/ˈpɒvəti laɪn/",pos:"n.",en:"the minimum level of income deemed adequate for living",zh:"貧窮線",ex:"Globally there are more women living below the poverty line than men.",exZh:"在全球範圍內，生活在貧窮線以下的女性多於男性。",diff:3,unit:"P11L2"},
  {id:1140,word:"slum",ph:"/slʌm/",pos:"n.",en:"a squalid and overcrowded urban area",zh:"貧民區",ex:"Slums are a common feature of cities in developing nations.",exZh:"貧民區是開發中國家城市裡的一個共同特徵。",diff:2,unit:"P11L2"},
  {id:1141,word:"standard of living",ph:"/ˈstændəd əv ˈlɪvɪŋ/",pos:"n.",en:"the degree of wealth and comfort available to a person",zh:"生活水準",ex:"The Fairtrade movement aims to pay farmers a price that will allow them a reasonable standard of living.",exZh:"公平貿易運動旨在為農民提供讓他們維持合理生活水準的價格。",diff:3,unit:"P11L2"},

  // P11L3 老化 Aging
  {id:1142,word:"age",ph:"/eɪdʒ/",pos:"v.",en:"to grow old or show signs of growing old",zh:"老化",ex:"As developed societies age, they must plan for the increased healthcare costs that older people require.",exZh:"隨著發達社會老化，社會必須為老年人所需愈來愈高的醫療保健費用進行規劃。",diff:2,unit:"P11L3"},
  {id:1143,word:"qualify",ph:"/ˈkwɒlɪfaɪ/",pos:"v.",en:"to be entitled to a benefit by fulfilling a condition",zh:"具有資格",ex:"People over 65 years of age qualify for senior benefits in many advanced nations.",exZh:"在許多先進國家，65 歲以上的人具有享受老年福利的資格。",diff:2,unit:"P11L3"},
  {id:1144,word:"retire",ph:"/rɪˈtaɪər/",pos:"v.",en:"to leave one's job and stop working permanently",zh:"退休",ex:"One solution to a greying society may be to increase the age at which people retire.",exZh:"老化社會的一項解決之道可能是提高人們退休的年齡。",diff:2,unit:"P11L3"},
  {id:1145,word:"cease",ph:"/siːs/",pos:"v.",en:"to come or bring to an end; to stop",zh:"終止",ex:"Rather than ceasing to be useful, older people can be supportive, productive members of the community.",exZh:"老年人可以成為社區中具支持性且富有生產力的成員，而不是變得無用。",diff:3,unit:"P11L3"},
  {id:1146,word:"aging",ph:"/ˈeɪdʒɪŋ/",pos:"adj.",en:"growing old; becoming older",zh:"老齡化的",ex:"Aging societies will face fiscal problems as people of working age decrease.",exZh:"隨著勞動年齡人口減少，高齡化社會將面臨財政問題。",diff:2,unit:"P11L3"},
  {id:1147,word:"susceptible",ph:"/səˈseptəbl/",pos:"adj.",en:"likely to be influenced or harmed by something",zh:"易受影響的",ex:"The elderly are more susceptible to healthcare issues than younger people.",exZh:"老年人比年輕人更容易受到健康問題的影響。",diff:4,unit:"P11L3"},
  {id:1148,word:"decrepit",ph:"/dɪˈkrepɪt/",pos:"adj.",en:"worn out or ruined because of age or neglect",zh:"衰老的",ex:"The perception that older people are decrepit results from a misguided stereotype present in many nations.",exZh:"認為老年人年邁體衰的這個觀念是源於許多國家中普遍存在的一種誤導性刻板印象。",diff:4,unit:"P11L3"},
  {id:1149,word:"regenerative",ph:"/rɪˈdʒenərətɪv/",pos:"adj.",en:"able to or tending to regenerate; restorative",zh:"再生的",ex:"Regenerative medicine is one of the fastest growing markets worldwide.",exZh:"再生醫學是全球成長最快的市場之一。",diff:5,unit:"P11L3"},
  {id:1150,word:"life cycle",ph:"/ˈlaɪf saɪkl/",pos:"n.",en:"the series of stages a living thing goes through",zh:"生命週期",ex:"The human life cycle occurs in several stages beginning in childhood and ending in old age.",exZh:"人類的生命週期發生在幾個階段，從童年開始，老年結束。",diff:2,unit:"P11L3"},
  {id:1151,word:"senior citizen",ph:"/ˈsiːniər ˈsɪtɪzən/",pos:"n.",en:"an elderly person, especially one who is retired",zh:"老年人",ex:"Recent studies show that the mental health of senior citizens is directly tied to their health condition.",exZh:"最近研究顯示，老年人的心理健康與他們的健康狀況直接相關。",diff:2,unit:"P11L3"},
  {id:1152,word:"ageism",ph:"/ˈeɪdʒɪzəm/",pos:"n.",en:"prejudice or discrimination based on a person's age",zh:"年齡歧視",ex:"In many societies, ageism continues to result in discrimination against older people.",exZh:"在許多社會中，年齡歧視仍然導致對老年人的歧視行為。",diff:3,unit:"P11L3"},
  {id:1153,word:"senility",ph:"/sɪˈnɪlɪti/",pos:"n.",en:"the condition of being old and weak, especially mentally",zh:"衰老",ex:"A healthy lifestyle as people age helps to prevent senility.",exZh:"隨著人們變老，健康的生活方式有助於防止衰老。",diff:4,unit:"P11L3"},

  // P11L4 無家可歸 Homelessness
  {id:1154,word:"exclude",ph:"/ɪksˈkluːd/",pos:"v.",en:"to deny someone access to or shut out from a group",zh:"排斥",ex:"Many homeless people feel excluded by their families, which adds to their sense of isolation.",exZh:"許多無家可歸者感到被家人排斥，這加深了他們的孤立感。",diff:2,unit:"P11L4"},
  {id:1155,word:"rescue",ph:"/ˈreskjuː/",pos:"v.",en:"to save someone from a dangerous or harmful situation",zh:"援救",ex:"Many NGOs are working day and night to rescue children off the streets of India.",exZh:"許多非政府組織正在日以繼夜將印度的孩童從街上援救出來。",diff:2,unit:"P11L4"},
  {id:1156,word:"render",ph:"/ˈrendər/",pos:"v.",en:"to cause to be or become",zh:"使變得",ex:"Lack of housing and joblessness are two of the main reasons that render people homeless.",exZh:"缺乏住房和失業是使得人們無家可歸的兩個主要原因。",diff:3,unit:"P11L4"},
  {id:1157,word:"panhandle",ph:"/ˈpæn.hændl/",pos:"v.",en:"to beg for money in a public place",zh:"乞討",ex:"Starved of income, many homeless people are forced to panhandle to survive.",exZh:"由於缺乏收入，許多無家可歸的人被迫乞討求生。",diff:3,unit:"P11L4"},
  {id:1158,word:"homeless",ph:"/ˈhəʊmlɪs/",pos:"adj.",en:"without a home; having no place to live",zh:"無家可歸的",ex:"Many homeless individuals struggle to access basic necessities such as shelter, food, and healthcare.",exZh:"許多無家可歸的人難以獲取基本生活必需品，例如住所、食物和醫療服務。",diff:2,unit:"P11L4"},
  {id:1159,word:"minimum",ph:"/ˈmɪnɪməm/",pos:"adj.",en:"the least or smallest amount possible",zh:"最低的",ex:"Advocates of having a minimum wage argue that it prevents many poor people from losing their homes.",exZh:"提倡擁有最低工資的人認為這可防止許多窮人失去家園。",diff:2,unit:"P11L4"},
  {id:1160,word:"temporary",ph:"/ˈtempərəri/",pos:"adj.",en:"lasting for only a limited period of time",zh:"臨時的",ex:"Many homeless people choose to make temporary abodes in places like train stations, bridges, or parks.",exZh:"許多無家可歸者選擇將火車站、橋樑或公園等地作為臨時住所。",diff:2,unit:"P11L4"},
  {id:1161,word:"vulnerable",ph:"/ˈvʌlnərəbl/",pos:"adj.",en:"susceptible to physical or emotional harm",zh:"易受影響的",ex:"In addition to having no home, many vagrants are vulnerable to drug and alcohol addiction.",exZh:"除了無家可歸，許多遊民還容易受到毒品和酗酒成癮的影響。",diff:3,unit:"P11L4"},
  {id:1162,word:"shelter",ph:"/ˈʃeltər/",pos:"n.",en:"a place giving protection from bad weather or danger",zh:"收容所",ex:"Shelters provide food and accommodation to people sleeping rough who have nowhere else to go.",exZh:"收容所為無處可去的露宿者提供食物和住宿。",diff:2,unit:"P11L4"},
  {id:1163,word:"abode",ph:"/əˈbəʊd/",pos:"n.",en:"a place of residence; a house or home",zh:"住所",ex:"Despite lacking a fixed abode, many of those who are homeless maintain a strong sense of community.",exZh:"儘管沒有固定住所，許多無家可歸的人仍然保持強烈的社群意識。",diff:3,unit:"P11L4"},
  {id:1164,word:"plight",ph:"/plaɪt/",pos:"n.",en:"a dangerous or difficult situation",zh:"困境",ex:"The plight of being homeless is exemplified by the conditions they experienced during the winter months.",exZh:"無家可歸的困境，可由他們在冬季所經歷的情況作為例證。",diff:3,unit:"P11L4"},
  {id:1165,word:"tramp",ph:"/træmp/",pos:"n.",en:"a person who travels from place to place on foot and has no home",zh:"流浪漢",ex:"Some individuals in the UK dress like tramps in order to scam people into donating money to them.",exZh:"在英國，有些人為了騙取人們捐給他們錢而打扮得像流浪漢。",diff:3,unit:"P11L4"},

  // P11L5 毒品 Drugs & Substances
  {id:1166,word:"abuse",ph:"/əˈbjuːz/",pos:"v.",en:"to use something to bad effect or for a bad purpose",zh:"濫用",ex:"Millions more Americans die from abusing legal drugs like alcohol than from illegal ones.",exZh:"死於濫用例如酒精這類合法藥物的美國人比死於非法藥物的人多數百萬。",diff:2,unit:"P11L5"},
  {id:1167,word:"addict",ph:"/əˈdɪkt/",pos:"v.",en:"to cause someone to become dependent on something",zh:"上癮",ex:"Sharing needles among people addicted to heroin is one of the primary causes of HIV infection.",exZh:"在海洛因成癮者之間共用針具，是導致愛滋病毒感染的主要原因之一。",diff:3,unit:"P11L5"},
  {id:1168,word:"overdose",ph:"/ˈəʊvədəʊs/",pos:"v.",en:"to take an excessive and dangerous dose of a drug",zh:"過量服用",ex:"On average, men overdose on illegal drugs and alcohol more often than women.",exZh:"平均而言，男性比女性更經常過量服用非法藥物和酒精。",diff:3,unit:"P11L5"},
  {id:1169,word:"rehabilitate",ph:"/ˌriːhəˈbɪlɪteɪt/",pos:"v.",en:"to restore someone to health through training and therapy",zh:"使戒毒",ex:"An argument states that it is better to rehabilitate drug addicts than to incarcerate them.",exZh:"有論點指出，讓吸毒成癮者戒毒比監禁他們更好。",diff:4,unit:"P11L5"},
  {id:1170,word:"problematic",ph:"/ˌprɒblɪˈmætɪk/",pos:"adj.",en:"constituting or presenting a problem",zh:"有問題的",ex:"Opioid addiction in the USA has not only become problematic, it is turning into an epidemic.",exZh:"類鴉片藥物成癮在美國不僅變得問題重重，還正轉變為一種泛濫。",diff:3,unit:"P11L5"},
  {id:1171,word:"addictive",ph:"/əˈdɪktɪv/",pos:"adj.",en:"causing a strong and harmful need to take something regularly",zh:"上癮的",ex:"Humans have been using addictive drugs like opium and cocaine since ancient times.",exZh:"自古以來人類就一直在使用成癮藥物，像是鴉片和古柯鹼。",diff:3,unit:"P11L5"},
  {id:1172,word:"intoxicated",ph:"/ɪnˈtɒksɪkeɪtɪd/",pos:"adj.",en:"drunk or under the influence of drugs",zh:"喝醉的",ex:"Millions of college students are hospitalised each year after becoming intoxicated through binge drinking.",exZh:"每年有數百萬名大學生因酗酒喝醉而住院治療。",diff:4,unit:"P11L5"},
  {id:1173,word:"prescribed",ph:"/prɪˈskraɪbd/",pos:"adj.",en:"recommended by a medical practitioner as a remedy",zh:"處方的",ex:"Of all prescribed drugs, pain killers are often the most addictive.",exZh:"在所有處方藥中，止痛藥通常是最容易上癮的。",diff:3,unit:"P11L5"},
  {id:1174,word:"alcohol",ph:"/ˈælkəhɒl/",pos:"n.",en:"a colourless volatile liquid that is the intoxicating constituent of drinks",zh:"酒精",ex:"Many youths view alcohol as integral to having a good time.",exZh:"許多年輕人認為酒精是玩得開心所不可或缺的。",diff:2,unit:"P11L5"},
  {id:1175,word:"possession",ph:"/pəˈzeʃən/",pos:"n.",en:"the state of having or owning something",zh:"擁有",ex:"In many countries, drug possession is as much a crime as using them.",exZh:"在許多國家，持有毒品與使用毒品同樣是犯罪行為。",diff:2,unit:"P11L5"},
  {id:1176,word:"substance",ph:"/ˈsʌbstəns/",pos:"n.",en:"a particular kind of matter with uniform properties",zh:"物質",ex:"Marijuana is by far the most commonly abused illegal substance in the world today.",exZh:"到目前為止，大麻仍是當今世界上最普遍濫用的非法物質。",diff:3,unit:"P11L5"},
  {id:1177,word:"substitute",ph:"/ˈsʌbstɪtjuːt/",pos:"n.",en:"a thing acting or used in place of another",zh:"替代物",ex:"Drug addicts in rehabilitation programs have to take narcotic substitutes while in recovery.",exZh:"參與康復計畫的毒品成癮者在康復期間必須服用毒品替代物。",diff:3,unit:"P11L5"},

  // P11L6 福利 Welfare
  {id:1178,word:"employ",ph:"/ɪmˈplɔɪ/",pos:"v.",en:"to make use of something",zh:"使用",ex:"The United States employs a food stamp program to limit how people spend welfare payments.",exZh:"美國採用食物券計畫來限制人們如何使用福利金。",diff:2,unit:"P11L6"},
  {id:1179,word:"introduce",ph:"/ˌɪntrəˈdjuːs/",pos:"v.",en:"to bring something into use or operation for the first time",zh:"推行",ex:"An ongoing issue for governments is the constant need to introduce measures against welfare fraud.",exZh:"政府面臨的一項持續挑戰是必須不斷推出防範福利詐欺的措施。",diff:2,unit:"P11L6"},
  {id:1180,word:"target",ph:"/ˈtɑːɡɪt/",pos:"v.",en:"to select as an object of attention or attack",zh:"以……為目標",ex:"Social security budgets are often the first to be targeted for cost-cutting in times of austerity.",exZh:"在緊縮政策時期，社會安全預算往往是先被削減的成本目標。",diff:2,unit:"P11L6"},
  {id:1181,word:"channel",ph:"/ˈtʃænl/",pos:"v.",en:"to direct towards a particular purpose",zh:"傳送",ex:"Welfare programmes aim to channel income into the hands of the neediest sections of society.",exZh:"福利計畫的目的是將收入引導到社會最需要幫助的群體手中。",diff:3,unit:"P11L6"},
  {id:1182,word:"benevolent",ph:"/bɪˈnevələnt/",pos:"adj.",en:"well-meaning and kindly; charitable",zh:"慈善的",ex:"Benevolent microloans provide an effective way for people to escape poverty.",exZh:"慈善小額貸款為人們提供了一種擺脫貧窮的有效方法。",diff:4,unit:"P11L6"},
  {id:1183,word:"equitable",ph:"/ˈekwɪtəbl/",pos:"adj.",en:"fair and impartial",zh:"公平的",ex:"The Affordable Care Act ensured a more equitable distribution of healthcare insurance among Americans.",exZh:"《可負擔健保法案》確保了醫療保險在美國人之間更公平的分配。",diff:4,unit:"P11L6"},
  {id:1184,word:"far-reaching",ph:"/ˌfɑːˈriːtʃɪŋ/",pos:"adj.",en:"having a wide range of influence or effect",zh:"影響深遠的",ex:"Welfare schemes are far-reaching in that they cover every aspect of society.",exZh:"福利計畫影響深遠，因為它們涵蓋了社會的方方面面。",diff:3,unit:"P11L6"},
  {id:1185,word:"subsidiary",ph:"/səbˈsɪdiəri/",pos:"adj.",en:"less important than but related to something",zh:"輔助的",ex:"Welfare schemes play a more subsidiary role as people become more financially independent.",exZh:"隨著人們在財務上變得更加獨立，福利計畫扮演了更加輔助性的角色。",diff:4,unit:"P11L6"},
  {id:1186,word:"healthcare",ph:"/ˈhelθ.keə/",pos:"n.",en:"the maintenance and improvement of health via medical services",zh:"醫療保健",ex:"Healthcare is often the single largest welfare expense faced by developed nations.",exZh:"醫療保健通常是已開發國家面臨的最大單一福利開支。",diff:2,unit:"P11L6"},
  {id:1187,word:"pension",ph:"/ˈpenʃən/",pos:"n.",en:"a regular payment made to retired people",zh:"養老金",ex:"Few young people are saving enough money in their pensions to ensure a decent life upon retirement.",exZh:"很少有年輕人在養老金中存入足夠的錢以確保退休後能過上體面的生活。",diff:2,unit:"P11L6"},
  {id:1188,word:"meals on wheels",ph:"/miːlz ɒn wiːlz/",pos:"n.",en:"a service delivering meals to elderly or disabled people",zh:"上門送餐服務",ex:"Meals on wheels programs help seniors lead fuller, more independent lives.",exZh:"上門送餐服務計畫幫助年長者過上更充實、更獨立的生活。",diff:3,unit:"P11L6"},
  {id:1189,word:"vocational training",ph:"/vəʊˈkeɪʃənl ˈtreɪnɪŋ/",pos:"n.",en:"education that prepares people for a specific trade",zh:"職業培訓",ex:"State vocational training programmes get people back to work quickly.",exZh:"國家職業培訓計畫讓人們能迅速重返工作崗位。",diff:3,unit:"P11L6"},

  // P11L7 霸凌 Bullying
  {id:1190,word:"insult",ph:"/ɪnˈsʌlt/",pos:"v.",en:"to speak to or treat with disrespect",zh:"侈辱",ex:"Bullies may insult a person's ethnicity or religion to increase their power in the eyes of their peers.",exZh:"霸凌者可能會侈辱他人的種族或宗教，以提升他們在同儕眼中的影響力。",diff:2,unit:"P11L7"},
  {id:1191,word:"agitate",ph:"/ˈædʒɪteɪt/",pos:"v.",en:"to campaign or argue publicly for a cause",zh:"大聲疾呼",ex:"It is a sad truth that transgender people must continue to agitate for equitable treatment in today's society.",exZh:"令人遺憾的事實是，跨性別者在當今社會仍然必須為公平待遇大聲疾呼。",diff:4,unit:"P11L7"},
  {id:1192,word:"inflict",ph:"/ɪnˈflɪkt/",pos:"v.",en:"to cause something unpleasant to be suffered by someone",zh:"使遭受",ex:"Bullying can inflict significant emotional harm on victims, causing them to suffer from anxiety and low self-esteem.",exZh:"霸凌可能使受害者遭受嚴重的情感傷害，導致他們陷入焦慮和自卑之中。",diff:3,unit:"P11L7"},
  {id:1193,word:"mob",ph:"/mɒb/",pos:"v.",en:"to crowd around someone in a disorderly way",zh:"圍攻",ex:"Playground bullies may mob their victims with the help of peers to maximise the effect of their actions.",exZh:"運動場上的霸凌者可能會在同儕協助下圍攻受害者，以最大化他們的行為效果。",diff:3,unit:"P11L7"},
  {id:1194,word:"aggressive",ph:"/əˈɡresɪv/",pos:"adj.",en:"ready or likely to attack or confront",zh:"攻擊性的",ex:"Bullying is aggressive behaviour aimed at harming or humiliating others repeatedly over time.",exZh:"霸凌是一種具有攻擊性的行為，旨在隨時間推移不斷地傷害或羹辱他人。",diff:2,unit:"P11L7"},
  {id:1195,word:"hostile",ph:"/ˈhɒstaɪl/",pos:"adj.",en:"unfriendly; antagonistic",zh:"敵意的",ex:"One solution to hostile workplaces is the promotion of equal opportunity policies.",exZh:"對於充滿敵意的工作場所，其中一個解決之道是推行同等機會政策。",diff:3,unit:"P11L7"},
  {id:1196,word:"verbal",ph:"/ˈvɜːbəl/",pos:"adj.",en:"relating to or in the form of words",zh:"言語的",ex:"Victims of verbal harassment at school demonstrate frequent absenteeism.",exZh:"在學校遭受言語騷擾的受害者表現出經常性的曠課。",diff:3,unit:"P11L7"},
  {id:1197,word:"savage",ph:"/ˈsævɪdʒ/",pos:"adj.",en:"extremely cruel or violent",zh:"野蠻的",ex:"Savage verbal or physical attacks by bullies can lead to suicide in sufferers.",exZh:"霸凌者野蠻的言語或身體攻擊可能導致受害者輕生。",diff:3,unit:"P11L7"},
  {id:1198,word:"bully",ph:"/ˈbʊli/",pos:"n.",en:"a person who habitually seeks to harm or intimidate others",zh:"霸凌者",ex:"Enabling children to work out their differences is preferable to labelling them as bully and victim.",exZh:"讓孩童自己解決分歧，比將他們貼上霸凌者與受害者的標籤更好。",diff:2,unit:"P11L7"},
  {id:1199,word:"tactic",ph:"/ˈtæktɪk/",pos:"n.",en:"a strategy planned to achieve a specific end",zh:"策略",ex:"Cyber bullying is a new tactic adopted by bullies who harass their victims anonymously online.",exZh:"網路霸凌是霸凌者採用的新策略，他們匿名在線上騷擾受害者。",diff:3,unit:"P11L7"},
  {id:1200,word:"exclusion",ph:"/ɪksˈkluːʒən/",pos:"n.",en:"the process of excluding or being excluded",zh:"排斥",ex:"Victims of school bullying often undergo social exclusion too.",exZh:"學校霸凌的受害者通常也遭受社會排斥。",diff:3,unit:"P11L7"},
  {id:1201,word:"peer abuse",ph:"/pɪər əˈbjuːs/",pos:"n.",en:"mistreatment by people of the same age or status",zh:"同儕虐待",ex:"Peer abuse is not unique only to the playground but is surprisingly common in the workplace too.",exZh:"同儕虐待不僅限於運動場，在工作場所也意外地普遍。",diff:3,unit:"P11L7"},

  // P11L8 種族 Race & Ethnicity
  {id:1202,word:"discriminate",ph:"/dɪˈskrɪmɪneɪt/",pos:"v.",en:"to make an unjust distinction in the treatment of people",zh:"歧視",ex:"Political correctness means treating everyone fairly and not discriminating against any one group.",exZh:"政治正確意指公平對待每個人，並且不歧視任何一個群體。",diff:3,unit:"P11L8"},
  {id:1203,word:"identify",ph:"/aɪˈdentɪfaɪ/",pos:"v.",en:"to associate or align oneself closely with",zh:"認同",ex:"A person's ancestral background typically forms the basis of which race they identify with.",exZh:"一個人的祖先背景通常構成了他們所認同種族的基礎。",diff:2,unit:"P11L8"},
  {id:1204,word:"prejudice",ph:"/ˈpredʒʊdɪs/",pos:"n.",en:"preconceived opinion not based on reason or experience",zh:"偏見",ex:"Modern laws prevent prejudice against individuals based on their race, ethnicity, religion, or gender.",exZh:"現代法律防止基於種族、族裔、宗教或性別而對個人產生偏見。",diff:3,unit:"P11L8"},
  {id:1205,word:"acculturate",ph:"/əˈkʌltʃəreɪt/",pos:"v.",en:"to assimilate to a different culture",zh:"使適應新的文化",ex:"Children of ethnic immigrants acculturate themselves to a country differently from their parents.",exZh:"種族移民的孩子以不同於父母的方式適應一個國家的文化。",diff:5,unit:"P11L8"},
  {id:1206,word:"patriotic",ph:"/ˌpætrɪˈɒtɪk/",pos:"adj.",en:"having or expressing devotion to one's country",zh:"愛國的",ex:"Nationalist groups often cite patriotic reasons to vindicate their actions.",exZh:"民族主義團體通常引用愛國的理由來為他們的行動辯護。",diff:3,unit:"P11L8"},
  {id:1207,word:"interracial",ph:"/ˌɪntəˈreɪʃəl/",pos:"adj.",en:"existing between or involving different races",zh:"不同種族間的",ex:"Couples in interracial relationships often work hard to overcome cultural differences.",exZh:"不同種族間的夫妻關係通常需要努力克服文化差異。",diff:4,unit:"P11L8"},
  {id:1208,word:"mixed-race",ph:"/ˌmɪkstˈreɪs/",pos:"adj.",en:"of parents of different racial backgrounds",zh:"混血的",ex:"A major challenge for mixed-race children is knowing which race they should identify as.",exZh:"混血兒的主要挑戰是要知道他們應該認定自己是哪個種族。",diff:3,unit:"P11L8"},
  {id:1209,word:"xenophobic",ph:"/ˌzenəˈfəʊbɪk/",pos:"adj.",en:"having a dislike of or prejudice against people from other countries",zh:"仇外的",ex:"Xenophobic rhetoric against immigrants in Europe has sharply risen in the last few decades.",exZh:"過去幾十年以來，歐洲對於移民的仇外言論急遲上升。",diff:5,unit:"P11L8"},
  {id:1210,word:"minority",ph:"/maɪˈnɒrɪti/",pos:"n.",en:"a smaller group differing from the majority",zh:"少數",ex:"Children from ethnic minorities now comprise over half of all students in American schools.",exZh:"來自少數民族的孩童目前佔美國學校所有學生的一半以上。",diff:2,unit:"P11L8"},
  {id:1211,word:"racism",ph:"/ˈreɪsɪzəm/",pos:"n.",en:"prejudice or discrimination directed against a person based on their race",zh:"種族主義",ex:"Research shows that racism is less prevalent among better-educated people.",exZh:"研究顯示，種族主義在受過良好教育的人群中較不普遍。",diff:3,unit:"P11L8"},
  {id:1212,word:"desegregation",ph:"/diːˌseɡrɪˈɡeɪʃən/",pos:"n.",en:"the ending of a policy of racial segregation",zh:"廢除種族隔離",ex:"Desegregation of society was a major goal of the American long-running civil rights movement.",exZh:"廢除社會的種族隔離是美國長期民權運動的一個主要目標。",diff:5,unit:"P11L8"},
  {id:1213,word:"genocide",ph:"/ˈdʒenəsaɪd/",pos:"n.",en:"the deliberate killing of a large group of people",zh:"種族滅絕",ex:"The 20th century had many of the worst genocides in recorded history.",exZh:"二十世紀發生了許多歷史記載中最嚴重的種族滅絕事件。",diff:4,unit:"P11L8"},

  // ── P12 Nature & Environment 自然與環境 ─────────────────────────
  // P12L1 地球 Earth & Geography
  {id:1214,word:"deposit",ph:"/dɪˈpɒzɪt/",pos:"v.",en:"to lay down matter gradually as a layer",zh:"使沉積",ex:"A glacier can deposit millions of tons of sediment and debris.",exZh:"一座冰川可以沉積數百萬噸的沉積物和碎屑。",diff:3,unit:"P12L1"},
  {id:1215,word:"erode",ph:"/ɪˈrəʊd/",pos:"v.",en:"to gradually wear away by wind, water, or other natural agents",zh:"侵蝕",ex:"Despite mankind's best efforts, the sea's power to erode coastlines can only be partially controlled.",exZh:"儘管人類盡了最大努力，海洋侵蝕海岸線的力量也只能受到部分控制。",diff:3,unit:"P12L1"},
  {id:1216,word:"shed light on",ph:"/ʃed laɪt ɒn/",pos:"v.",en:"to help to explain or clarify something",zh:"揭露",ex:"Scientists have recently used seismic waves generated by earthquakes to shed light on Earth's interior.",exZh:"科學家們最近利用地震產生的地震波來揭示地球內部的奧祕。",diff:3,unit:"P12L1"},
  {id:1217,word:"weather",ph:"/ˈweðər/",pos:"v.",en:"to wear away or change by long exposure to the atmosphere",zh:"使風化",ex:"To create just one centimeter of soil, geological processes must weather rocks for hundreds of years.",exZh:"要形成僅僅一公分的土壤，地質過程必須使岩石風化數百年。",diff:3,unit:"P12L1"},
  {id:1218,word:"mountainous",ph:"/ˈmaʊntɪnəs/",pos:"adj.",en:"having many mountains",zh:"多山的",ex:"Mountains constitute much of the terrain of Nepal, making it a mountainous nation.",exZh:"山脈構成了尼泊爾大部分的地形，使其成為一個多山的國家。",diff:2,unit:"P12L1"},
  {id:1219,word:"mineral",ph:"/ˈmɪnərəl/",pos:"adj.",en:"relating to or containing minerals",zh:"有礦物質的",ex:"Plants and vegetables obtain nourishment through a mineral uptake process.",exZh:"植物和蔬菜藉由礦物質攝取過程獲得營養。",diff:3,unit:"P12L1"},
  {id:1220,word:"terrestrial",ph:"/tɪˈrestriəl/",pos:"adj.",en:"relating to the earth or dry land",zh:"陸地的",ex:"The advent of satellite imaging has allowed scientists to map the Earth's terrestrial landscape.",exZh:"衛星成像的出現已讓科學家能夠繪製出地球的陸地景觀。",diff:4,unit:"P12L1"},
  {id:1221,word:"oceanic",ph:"/ˌəʊʃɪˈænɪk/",pos:"adj.",en:"relating to the ocean",zh:"海洋的",ex:"Oceanic tectonic plates are lighter and less dense than their continental counterparts.",exZh:"海洋板塊比大陸板塊更輕且密度更低。",diff:4,unit:"P12L1"},
  {id:1222,word:"altitude",ph:"/ˈæltɪtjuːd/",pos:"n.",en:"the height of an object above sea level",zh:"海拔",ex:"Glaciers at high altitudes are regarded as the Earth's third pole.",exZh:"在高海拔的冰川被認為是地球的第三個極點。",diff:3,unit:"P12L1"},
  {id:1223,word:"equator",ph:"/ɪˈkweɪtər/",pos:"n.",en:"an imaginary line around the middle of the earth",zh:"赤道",ex:"Rainforests along the Earth's equator are estimated to hold half of all its known biodiversity.",exZh:"地球赤道沿線的雨林估計擁有其已知生物多樣性的一半。",diff:3,unit:"P12L1"},
  {id:1224,word:"latitude",ph:"/ˈlætɪtjuːd/",pos:"n.",en:"the angular distance of a place north or south of the equator",zh:"緯度",ex:"Scientists predict that two thirds of Earth's glaciers at latitudes outside the poles will disappear this century.",exZh:"科學家預測，地球兩極以外緯度地區三分之二的冰河將於本世紀消失。",diff:4,unit:"P12L1"},
  {id:1225,word:"fault",ph:"/fɔːlt/",pos:"n.",en:"a fracture in the earth's crust where movement has occurred",zh:"斷層",ex:"Los Angeles is situated on one of the most seismically active faults in the world.",exZh:"洛杉磯位於世界上地震最活躍的斷層之一。",diff:3,unit:"P12L1"},

  // P12L2 太空 Space & Cosmos
  {id:1226,word:"compose",ph:"/kəmˈpəʊz/",pos:"v.",en:"to make up or form a whole",zh:"組成",ex:"Scientists believe that about 95 percent of the universe is composed of dark matter and dark energy.",exZh:"科學家認為，宇宙大約 95% 是由暗物質和暗能量所組成。",diff:3,unit:"P12L2"},
  {id:1227,word:"cluster",ph:"/ˈklʌstər/",pos:"v.",en:"to come together in a group",zh:"群集",ex:"As stars group together into galaxies, galaxies cluster together to form galaxy clusters.",exZh:"恆星聚集形成星系，星系群集在一起則形成星系團。",diff:3,unit:"P12L2"},
  {id:1228,word:"postulate",ph:"/ˈpɒstjuleɪt/",pos:"v.",en:"to suggest as a basis for reasoning or discussion",zh:"假設",ex:"Due to a lack of evidence, astronomers can only postulate about what happened before the Big Bang.",exZh:"由於缺乏證據，天文學家只能對大爆炸之前發生的事進行假設。",diff:4,unit:"P12L2"},
  {id:1229,word:"speculate",ph:"/ˈspekjuleɪt/",pos:"v.",en:"to form a theory without firm evidence",zh:"推測",ex:"For now, mankind can only speculate about the existence of extraterrestrial life in the universe.",exZh:"目前，人類只能推測宇宙中是否存在外星生命。",diff:3,unit:"P12L2"},
  {id:1230,word:"celestial",ph:"/sɪˈlestʃəl/",pos:"adj.",en:"positioned in or relating to the sky or outer space",zh:"天體的",ex:"Celestial objects are those whose origins lie outside of the solar system.",exZh:"天體是指那些起源於太陽系之外的物體。",diff:4,unit:"P12L2"},
  {id:1231,word:"cosmic",ph:"/ˈkɒzmɪk/",pos:"adj.",en:"relating to the universe or cosmos",zh:"宇宙的",ex:"Astronauts exposed to long doses of cosmic rays in space would be more likely to develop cancer.",exZh:"在太空中長時間暴露於宇宙射線下的太空人更可能罹患癌症。",diff:3,unit:"P12L2"},
  {id:1232,word:"lunar",ph:"/ˈluːnər/",pos:"adj.",en:"relating to the moon",zh:"月球上的",ex:"Several nations are once again discussing returning to the moon to explore the lunar surface.",exZh:"有幾個國家正在再次討論重返月球以探索月球表面。",diff:3,unit:"P12L2"},
  {id:1233,word:"planetary",ph:"/ˈplænɪtəri/",pos:"adj.",en:"relating to a planet or planets",zh:"行星的",ex:"Meteorological satellites have allowed scientists to better predict planetary weather systems.",exZh:"氣象衛星讓科學家能更準確預測行星的天氣系統。",diff:4,unit:"P12L2"},
  {id:1234,word:"astronaut",ph:"/ˈæstrənɔːt/",pos:"n.",en:"a person trained to travel in a spacecraft",zh:"太空人",ex:"With the advent of space tourism, thousands of regular people will soon be able to become astronauts.",exZh:"隨著太空旅遊的出現，成千上萬的普通人很快就能成為太空人。",diff:2,unit:"P12L2"},
  {id:1235,word:"black hole",ph:"/blæk həʊl/",pos:"n.",en:"a region in space with gravitational pull so strong nothing can escape",zh:"黑洞",ex:"It is believed that super massive black holes lie at the center of all major galaxies.",exZh:"據信，超大質量黑洞位於所有主要星系的中心。",diff:3,unit:"P12L2"},
  {id:1236,word:"cosmos",ph:"/ˈkɒzməs/",pos:"n.",en:"the universe seen as a well-ordered whole",zh:"宇宙",ex:"Many believe humankind's destiny is to explore the cosmos, but that dream lies far in the future.",exZh:"許多人相信人類的命運是探索宇宙，但是這個夢想位於遙遠的未來。",diff:3,unit:"P12L2"},
  {id:1237,word:"galaxy",ph:"/ˈɡæləksi/",pos:"n.",en:"a system of millions of stars held together by gravity",zh:"星系",ex:"Few people fail to be awestruck by the sight of Earth's galaxy\u2014the Milky Way.",exZh:"很少有人在看到地球的星系\u2014\u2014銀河系時不感到驚嘆。",diff:2,unit:"P12L2"},

  // P12L3 地理環境 Physical Geography
  {id:1238,word:"shrink",ph:"/ʃrɪŋk/",pos:"v.",en:"to become smaller in size or amount",zh:"縮小",ex:"Major aquifers in the US are shrinking due to over-pumping of groundwater during periods of drought.",exZh:"由於在乾旱時期地下水的過度抽取，美國主要的含水層正在縮小。",diff:2,unit:"P12L3"},
  {id:1239,word:"sink",ph:"/sɪŋk/",pos:"v.",en:"to go down below the surface",zh:"下陷",ex:"Over extraction of natural resources is causing huge areas of Texas to sink.",exZh:"自然資源的過度開採正導致德州的廣大地區下陷。",diff:2,unit:"P12L3"},
  {id:1240,word:"drift",ph:"/drɪft/",pos:"v.",en:"to be carried slowly by a current",zh:"漂移",ex:"A major geologic theory posits that continents have been drifting apart for billions of years.",exZh:"一項主要的地質學理論假定，大陸已經漂移了數十億年。",diff:2,unit:"P12L3"},
  {id:1241,word:"erupt",ph:"/ɪˈrʌpt/",pos:"v.",en:"to burst out suddenly and violently",zh:"爆發",ex:"Large volcanoes can erupt with enough power to cool the Earth.",exZh:"大型火山爆發時可能有足夠的能量來冷却地球。",diff:2,unit:"P12L3"},
  {id:1242,word:"barren",ph:"/ˈbærən/",pos:"adj.",en:"too poor to produce much vegetation",zh:"貧瘉的",ex:"In barren regions of Africa, denizens may walk up to twenty kilometers each day to obtain drinking water.",exZh:"在非洲的貧瘉地區，居民每天可能要走上二十公里才能獲取飲用水。",diff:3,unit:"P12L3"},
  {id:1243,word:"continental",ph:"/ˌkɒntɪˈnentl/",pos:"adj.",en:"forming or belonging to a continent",zh:"大陸的",ex:"Continental tourism initiatives are providing unparalleled job opportunities for people in Africa.",exZh:"與大陸相關的旅遊計畫正在為非洲的人們提供前所未有的就業機會。",diff:3,unit:"P12L3"},
  {id:1244,word:"endemic",ph:"/enˈdemɪk/",pos:"adj.",en:"regularly found in a particular area",zh:"流行的",ex:"The threat of malaria is its propensity to spread to nations where it is not naturally endemic.",exZh:"瘧疾的威脅在於其傾向於傳播到非自然流行的國家。",diff:4,unit:"P12L3"},
  {id:1245,word:"polar",ph:"/ˈpəʊlər/",pos:"adj.",en:"relating to the North or South Pole",zh:"極地的",ex:"Warming icecaps are prompting some nations to push to open polar regions to oil exploration.",exZh:"變暖的冰帽正促使一些國家推動開放極地地區的石油勘探。",diff:3,unit:"P12L3"},
  {id:1246,word:"rainforest",ph:"/ˈreɪnˌfɒrɪst/",pos:"n.",en:"a dense tropical forest with consistently heavy rainfall",zh:"雨林",ex:"One understated benefit of the Internet is in spreading news internationally regarding localised rainforest destruction.",exZh:"網路一項被低估的好處是在國際上傳播關於當地雨林破壞的新聞。",diff:3,unit:"P12L3"},
  {id:1247,word:"volcano",ph:"/vɒlˈkeɪnəʊ/",pos:"n.",en:"a mountain with a crater through which lava erupts",zh:"火山",ex:"A super volcano that erupted in 1815 cooled the world so much that it caused global food shortages.",exZh:"1815 年爆發的一座超級火山使世界大幅降溫，導致全球糧食短缺。",diff:2,unit:"P12L3"},
  {id:1248,word:"iceberg",ph:"/ˈaɪsbɜːɡ/",pos:"n.",en:"a large floating mass of ice detached from a glacier",zh:"冰山",ex:"City-size icebergs are now a common occurrence off the coast of Antarctica.",exZh:"城市大小的冰山現在在南極海岸外已成為一種常見現象。",diff:2,unit:"P12L3"},
  {id:1249,word:"soil erosion",ph:"/sɔɪl ɪˈrəʊʒən/",pos:"n.",en:"the wearing away of topsoil by natural forces",zh:"水土流失",ex:"Soil erosion in India is threatening desertification of much of the nation.",exZh:"印度的水土流失正威脅著該國大部分地區的沙漠化。",diff:3,unit:"P12L3"},

  // P12L4 自然災害 Natural Disasters
  {id:1250,word:"expose",ph:"/ɪkˈspəʊz/",pos:"v.",en:"to reveal or make something visible",zh:"暴露",ex:"Natural disasters tend to expose the differences between the poor and the rich.",exZh:"自然災害往往暴露出窮人和富人之間的差異。",diff:2,unit:"P12L4"},
  {id:1251,word:"prevent",ph:"/prɪˈvent/",pos:"v.",en:"to keep from happening",zh:"避免",ex:"Evacuation is a major way to prevent fatalities in the occurrence of a natural disaster.",exZh:"疑散是在自然災害發生時避免死亡事故的一個主要方法。",diff:2,unit:"P12L4"},
  {id:1252,word:"survive",ph:"/səˈvaɪv/",pos:"v.",en:"to continue to live or exist despite danger",zh:"生存",ex:"In areas prone to natural disasters, a disaster readiness kit can help people survive in difficult times.",exZh:"在容易發生自然災害的區域，一個災難準備工具包有助於人們在困難時期生存。",diff:2,unit:"P12L4"},
  {id:1253,word:"wreak",ph:"/riːk/",pos:"v.",en:"to cause a large amount of damage or harm",zh:"引起（災害等）",ex:"Climate change may be magnifying the strength of natural disasters that already wreak havoc across the globe.",exZh:"氣候變化可能放大了已經在全球引起重大災難的自然災害之強度。",diff:4,unit:"P12L4"},
  {id:1254,word:"calculated",ph:"/ˈkælkjuleɪtɪd/",pos:"adj.",en:"determined by mathematical analysis",zh:"計算出的",ex:"The calculated strength of an earthquake is rated against the Richter scale.",exZh:"地震計算強度是對照芮氏規模來被評定的。",diff:3,unit:"P12L4"},
  {id:1255,word:"disastrous",ph:"/dɪˈzɑːstrəs/",pos:"adj.",en:"causing great damage",zh:"災難性的",ex:"Flooding, droughts, and hurricanes are some of the most disastrous natural catastrophes.",exZh:"洪水、乾旱和颶風是最具災難性的幾種自然災害。",diff:3,unit:"P12L4"},
  {id:1256,word:"resilient",ph:"/rɪˈzɪliənt/",pos:"adj.",en:"able to withstand or recover quickly from difficult conditions",zh:"有彈性的",ex:"As evidence of increasing natural disasters rises, the need for resilient infrastructure is paramount.",exZh:"隨著自然災害增加的跡象愈來愈多，對於韌性基礎設施的需求變得至關重要。",diff:4,unit:"P12L4"},
  {id:1257,word:"tidal",ph:"/ˈtaɪdl/",pos:"adj.",en:"relating to or affected by tides",zh:"潮汐的",ex:"Tidal energy is a sustainable resource that harnesses the power of ocean tides to generate electricity.",exZh:"潮汐能是一種可持續的資源，利用海洋潮汐的力量來發電。",diff:3,unit:"P12L4"},
  {id:1258,word:"drought",ph:"/draʊt/",pos:"n.",en:"a prolonged period of abnormally low rainfall",zh:"乾旱",ex:"Drought and floods are disastrous for farmers who tend to bear the brunt of such disasters.",exZh:"乾旱和洪水對於往往首當其衝遭受這類災害的農民來說是極為嚴重的。",diff:3,unit:"P12L4"},
  {id:1259,word:"flooding",ph:"/ˈflʌdɪŋ/",pos:"n.",en:"an overflowing of water onto land that is normally dry",zh:"洪水",ex:"Flooding in China has historically been responsible for millions of deaths.",exZh:"中國的洪水在歷史上曾造成數百萬人死亡。",diff:2,unit:"P12L4"},
  {id:1260,word:"hurricane",ph:"/ˈhʌrɪkeɪn/",pos:"n.",en:"a storm with a violent wind",zh:"颶風",ex:"As the number of yearly hurricanes increases, some see them as a manmade disaster.",exZh:"隨著每年颶風數量的增加，有人將其視為人為災害。",diff:2,unit:"P12L4"},
  {id:1261,word:"tsunami",ph:"/tsʊˈnɑːmi/",pos:"n.",en:"a long high sea wave caused by an earthquake",zh:"海嘲",ex:"After the 2004 tsunami, the UN has helped install an international warning system.",exZh:"在 2004 年的海嘲之後，聯合國協助建立了一個國際預警系統。",diff:3,unit:"P12L4"},

  // P12L5 氣候變遷 Climate Change
  {id:1262,word:"aggravate",ph:"/ˈæɡrəveɪt/",pos:"v.",en:"to make a problem or situation worse",zh:"加劇",ex:"Research shows that global warming is aggravating the severity of climate change.",exZh:"研究顯示，全球暖化正在加劇氣候變遷的嚴重性。",diff:3,unit:"P12L5"},
  {id:1263,word:"constrain",ph:"/kənˈstreɪn/",pos:"v.",en:"to restrict or limit",zh:"限制",ex:"According to the 2016 Paris agreement, all signatory countries aimed to constrain global CO2 emissions.",exZh:"根據 2016 年的巴黎協議，所有簽署國旨在限制全球二氧化碳排放。",diff:3,unit:"P12L5"},
  {id:1264,word:"contaminate",ph:"/kənˈtæmɪneɪt/",pos:"v.",en:"to make impure by exposure to a polluting substance",zh:"污染",ex:"Flooding resulting from global warming is bad for farmland where it contaminates drinking water.",exZh:"全球暖化造成的洪水對農田有害，污染該區飲用水。",diff:3,unit:"P12L5"},
  {id:1265,word:"decarbonise",ph:"/diːˈkɑːbənaɪz/",pos:"v.",en:"to reduce or eliminate carbon dioxide emissions",zh:"使脫碳",ex:"Although oceans naturally decarbonise the atmosphere, they are now becoming overly acidic.",exZh:"雖然海洋自然地幫助大氣脫碳，但它們現在卻變得過於酸性。",diff:5,unit:"P12L5"},
  {id:1266,word:"abnormal",ph:"/æbˈnɔːməl/",pos:"adj.",en:"deviating from what is normal or usual",zh:"異常的",ex:"Abnormal heat waves are setting historical records in traditionally cool places like Europe.",exZh:"異常的熱浪正在像歐洲這樣傳統上涼爽的地方創下歷史紀錄。",diff:2,unit:"P12L5"},
  {id:1267,word:"alarmed",ph:"/əˈlɑːmd/",pos:"adj.",en:"anxious or disturbed",zh:"震驚的",ex:"Many Europeans are alarmed by global warming and support legislation to slow it down.",exZh:"許多歐洲人對全球暖化感到震驚，並支持立法以減緩其進程。",diff:2,unit:"P12L5"},
  {id:1268,word:"ultraviolet",ph:"/ˌʌltrəˈvaɪəlɪt/",pos:"adj.",en:"of electromagnetic radiation with wavelengths shorter than visible light",zh:"紫外線的",ex:"The Earth's ozone layer protects the planet from harmful ultraviolet radiation emitted by the sun.",exZh:"地球的臭氧層保護地球免受太陽射線的有害紫外線輻射。",diff:4,unit:"P12L5"},
  {id:1269,word:"anthropogenic",ph:"/ˌænθrəpəˈdʒenɪk/",pos:"adj.",en:"originating from human activity",zh:"人為因素的",ex:"Anthropogenic global warming began with the start of the Industrial Revolution 150 years ago.",exZh:"人為因素的全球暖化始於 150 年前工業革命的開始。",diff:5,unit:"P12L5"},
  {id:1270,word:"emission",ph:"/ɪˈmɪʃən/",pos:"n.",en:"the production and discharge of something, especially gas",zh:"排放物",ex:"If nations fail to reduce global emissions, sea levels could rise by a meter by 2100.",exZh:"如果各國不能減少全球排放物，到 2100 年時海平面可能會上升一公尺。",diff:3,unit:"P12L5"},
  {id:1271,word:"acid rain",ph:"/ˈæsɪd reɪn/",pos:"n.",en:"rainfall made acidic by atmospheric pollution",zh:"酸雨",ex:"Due to successful government policy, acid rain severity has declined since the 1980s.",exZh:"由於成功的政府政策，自從 1980 年代以來，酸雨的嚴重性已經降低。",diff:3,unit:"P12L5"},
  {id:1272,word:"carbon footprint",ph:"/ˈkɑːbən ˈfʊtprɪnt/",pos:"n.",en:"the amount of carbon dioxide released by a person's activities",zh:"碳足跪",ex:"Decreasing everyone's carbon footprint is a measurable way to prevent climate change.",exZh:"減少每個人的碳足跪是防止氣候變化的一種可量化方法。",diff:3,unit:"P12L5"},
  {id:1273,word:"smog",ph:"/smɒɡ/",pos:"n.",en:"fog or haze combined with smoke and chemical fumes",zh:"煙霧",ex:"Smog detrimentally affects city residents and is particularly bad in the winter.",exZh:"煙霧對城市居民有不利影響，並且在冬季時特別嚴重。",diff:2,unit:"P12L5"},

  // P12L6 動物 Animals & Wildlife
  {id:1274,word:"breed",ph:"/briːd/",pos:"v.",en:"to produce offspring by mating",zh:"繁殖",ex:"Endangered species like pandas have proven extremely reluctant to breed in captivity.",exZh:"像熊貓這樣的瀑臨絕種物種已被證明在圈養環境中極度不願繁殖。",diff:2,unit:"P12L6"},
  {id:1275,word:"domesticate",ph:"/dəˈmestɪkeɪt/",pos:"v.",en:"to tame an animal for human use",zh:"馴養",ex:"To domesticate animals, certain traits, such as hierarchy and non-territoriality, are required.",exZh:"要馴養動物，需要具備某些特質，例如階層性和非地域性。",diff:4,unit:"P12L6"},
  {id:1276,word:"poach",ph:"/pəʊtʃ/",pos:"v.",en:"to illegally hunt or catch game or fish",zh:"偷獵",ex:"Developing nations often don't possess the resources to protect endangered wildlife from hunters who poach them.",exZh:"發展中國家往往不具備資源可以保護瀑危野生動物免受獵人偷獵。",diff:3,unit:"P12L6"},
  {id:1277,word:"snatch",ph:"/snætʃ/",pos:"v.",en:"to quickly seize something",zh:"搶",ex:"Many wild animals are snatched from their mothers when young to be sold to pet collectors.",exZh:"許多野生動物年幼時就從他們母親身邊被搶走，賣給寵物收藏家。",diff:3,unit:"P12L6"},
  {id:1278,word:"endangered",ph:"/ɪnˈdeɪndʒəd/",pos:"adj.",en:"seriously at risk of extinction",zh:"瀑臨絕種的",ex:"Habitat loss is one of the key factors leading to animal species becoming endangered.",exZh:"棲息地喪失是導致動物物種瀑臨絕種的關鍵因素之一。",diff:3,unit:"P12L6"},
  {id:1279,word:"high-powered",ph:"/ˌhaiˈpaʊəd/",pos:"adj.",en:"having great power or force",zh:"強有力的",ex:"Trophy hunters use high-powered rifles to hunt big game for personal self-gratification.",exZh:"戰利品獵人使用威力強大的步槍來獵取大型獵物以獲得個人的自我滿足。",diff:3,unit:"P12L6"},
  {id:1280,word:"invasive",ph:"/ɪnˈveɪsɪv/",pos:"adj.",en:"tending to spread in an undesirable way",zh:"入侵的",ex:"Some invasive animal species in the USA were originally imported as exotic pets.",exZh:"某些（外來）入侵的動物物種，在美國原本是作為異國寵物進口的。",diff:3,unit:"P12L6"},
  {id:1281,word:"life-threatening",ph:"/ˈlaɪfˌθretnɪŋ/",pos:"adj.",en:"potentially fatal",zh:"威脅生命的",ex:"Proponents of animal testing claim it helps develop drugs for life-threatening diseases.",exZh:"動物實驗的支持者聲稱這有助於開發威脅生命疾病的藥物。",diff:3,unit:"P12L6"},
  {id:1282,word:"breed",ph:"/briːd/",pos:"n.",en:"a particular variety of animal",zh:"品種",ex:"Too many breeds of dogs and cats are abandoned by owners who are ill-prepared to look after them.",exZh:"太多品種的狗和貓被尚未準備好照顧牠們的主人遺棄。",diff:2,unit:"P12L6"},
  {id:1283,word:"habitat",ph:"/ˈhæbɪtæt/",pos:"n.",en:"the natural home of an animal or plant",zh:"棲息地",ex:"Mankind's unrelenting need for land is removing the habitat animals depend on to exist.",exZh:"人類對於土地堅定不移的需求正在移除動物賴以生存的棲息地。",diff:2,unit:"P12L6"},
  {id:1284,word:"prey",ph:"/preɪ/",pos:"n.",en:"an animal that is hunted by another for food",zh:"獵物",ex:"Warming oceans are affecting the distribution patterns of prey and the marine animals that feed on them.",exZh:"變暖的海洋正影響著獵物以及靠牠們為食的海洋動物的分布模式。",diff:3,unit:"P12L6"},
  {id:1285,word:"fauna",ph:"/ˈfɔːnə/",pos:"n.",en:"the animals of a particular region or period",zh:"動物群",ex:"There could be thousands of undiscovered faunas in the wildlife-rich Amazon rainforest.",exZh:"在野生動植物豐富的亞馬遜雨林，可能有數千種未被發現的動物群。",diff:4,unit:"P12L6"},

  // P12L7 回收 Recycling & Waste
  {id:1286,word:"remove",ph:"/rɪˈmuːv/",pos:"v.",en:"to take away from a place",zh:"移除",ex:"Certain supermarkets are now removing non-recyclable parts from their in-house products.",exZh:"某些超市目前正在從其內部產品中移除不可回收的零件。",diff:2,unit:"P12L7"},
  {id:1287,word:"classify",ph:"/ˈklæsɪfaɪ/",pos:"v.",en:"to arrange in categories",zh:"將……分類",ex:"I think governments can do more to classify products according to how they should be recycled.",exZh:"我認為政府可以採取更多行動，依據產品的回收方式將它們進行分類。",diff:2,unit:"P12L7"},
  {id:1288,word:"surcharge",ph:"/ˈsɜːtʃɑːdʒ/",pos:"n.",en:"an additional charge or fee",zh:"附加費用",ex:"Many supermarkets now levy a surcharge on plastic bags to encourage customers to bring their own.",exZh:"許多超市現在對塑膠袋徵收附加費，以鼓勵顧客帶自己的購物袋。",diff:3,unit:"P12L7"},
  {id:1289,word:"biodegrade",ph:"/ˌbaɪəʊdɪˈɡreɪd/",pos:"v.",en:"to be decomposed by bacteria or other living organisms",zh:"生物降解",ex:"Plastics like polyethylene can take up to 1000 years to biodegrade in landfills.",exZh:"像聚乙烯這樣的塑膠在垃圾掌埋場裡可能需要長達一千年的時間才能生物降解。",diff:4,unit:"P12L7"},
  {id:1290,word:"disposable",ph:"/dɪˈspəʊzəbl/",pos:"adj.",en:"intended to be used once and then thrown away",zh:"一次性使用的",ex:"Disposable products prioritise convenience over the environment.",exZh:"一次性產品優先考慮便利性而非環境。",diff:3,unit:"P12L7"},
  {id:1291,word:"recyclable",ph:"/rɪˈsaɪkləbl/",pos:"adj.",en:"able to be recycled",zh:"可回收的",ex:"Many recyclable items are often too contaminated to be recycled.",exZh:"許多可回收物品往往受到嚴重污染而無法被回收。",diff:3,unit:"P12L7"},
  {id:1292,word:"renewable",ph:"/rɪˈnjuːəbl/",pos:"adj.",en:"capable of being renewed or replenished",zh:"可再生的",ex:"Some plastics or bioplastics are made from renewable sources, like plants designed to break down quickly.",exZh:"有一些塑膠或生物塑料是由可再生能源製成，像是設計成可迅速分解的植物。",diff:3,unit:"P12L7"},
  {id:1293,word:"ubiquitous",ph:"/juːˈbɪkwɪtəs/",pos:"adj.",en:"present everywhere at the same time",zh:"無所不在的",ex:"Plastic waste is as ubiquitous in the Earth's oceans as fish.",exZh:"塑膠廢棄物就像魚一樣，在地球的海洋裡無所不在。",diff:5,unit:"P12L7"},
  {id:1294,word:"litter",ph:"/ˈlɪtər/",pos:"n.",en:"trash or garbage left in an open area",zh:"垃圾",ex:"Nowadays, it is illegal in many countries to pollute the environment by dropping litter.",exZh:"現今，在許多國家亂丟垃圾而污染環境是不合法的。",diff:2,unit:"P12L7"},
  {id:1295,word:"refuse",ph:"/ˈrefjuːs/",pos:"n.",en:"matter thrown away as worthless; rubbish",zh:"垃圾",ex:"Progressive countries like the UK have a collection service that removes household refuse regularly.",exZh:"像英國這樣進步的國家，有定期清除家庭垃圾的收集服務。",diff:3,unit:"P12L7"},
  {id:1296,word:"food waste",ph:"/fuːd weɪst/",pos:"n.",en:"uneaten food that is discarded",zh:"廚餘",ex:"The secret to recycling food waste is knowing which edibles can be recycled and which can't.",exZh:"回收廚餘的訣竅是知道哪些食品可回收，哪些不能。",diff:2,unit:"P12L7"},
  {id:1297,word:"landfill",ph:"/ˈlændfɪl/",pos:"n.",en:"a site for the disposal of waste by burial",zh:"垃圾掌埋場",ex:"The majority of our trash unfortunately ends up in landfills where it may lie for thousands of years.",exZh:"我們大部分的垃圾不幸地最終都會在垃圾掌埋場，可能會放置數千年。",diff:3,unit:"P12L7"},

  // P12L8 天氣 Weather & Climate
  {id:1298,word:"forecast",ph:"/ˈfɔːkɑːst/",pos:"v.",en:"to predict future weather or events",zh:"預報",ex:"Current computer algorithms can forecast weather patterns two weeks in advance.",exZh:"目前電腦演算法能夠提前兩週預報天氣模式。",diff:2,unit:"P12L8"},
  {id:1299,word:"worsen",ph:"/ˈwɜːsən/",pos:"v.",en:"to make or become worse",zh:"惡化",ex:"Extreme weather events are expected to worsen on the African continent over the next decade.",exZh:"預計未來十年，非洲大陸的極端天氣事件將進一步惡化。",diff:2,unit:"P12L8"},
  {id:1300,word:"wither",ph:"/ˈwɪðər/",pos:"v.",en:"to become dry and shrivelled",zh:"枯萎",ex:"Extended heat waves starve crops of water which causes them to wither and die.",exZh:"長時間的熱浪使作物缺水，導致它們枯萎死亡。",diff:3,unit:"P12L8"},
  {id:1301,word:"bluster",ph:"/ˈblʌstər/",pos:"v.",en:"to blow in loud gusts",zh:"（風）狂吹",ex:"The gale-force winds that blustered through the town last night left serious damage in their wake.",exZh:"昨夜颶風級強風席捲城鎮，所到之處留下嚴重損害。",diff:4,unit:"P12L8"},
  {id:1302,word:"moist",ph:"/mɔɪst/",pos:"adj.",en:"slightly wet; damp",zh:"潮濕的",ex:"In the future, the United Kingdom's already moist climate may get even wetter.",exZh:"在未來，英國已經潮濕的氣候可能會變得更加潮濕。",diff:2,unit:"P12L8"},
  {id:1303,word:"temperate",ph:"/ˈtempərɪt/",pos:"adj.",en:"relating to a mild climate",zh:"溫和的",ex:"Northern and southern latitudes have a temperate climate with four distinct seasons.",exZh:"北部和南部緯度地區擁有溫和的氣候，且四季分明。",diff:3,unit:"P12L8"},
  {id:1304,word:"tropical",ph:"/ˈtrɒpɪkəl/",pos:"adj.",en:"relating to the tropics",zh:"熱帶的",ex:"Tropical climates usually experience only two seasons, dry and rainy.",exZh:"熱帶氣候通常只經歷兩個季節，乾燥和多雨。",diff:2,unit:"P12L8"},
  {id:1305,word:"sultry",ph:"/ˈsʌltri/",pos:"adj.",en:"hot and humid",zh:"悶熱的",ex:"In Taipei, rains often bring a welcome respite from the sultry summer heat.",exZh:"在台北，雨水經常為悶熱的夏季炎熱帶來令人愉快的短暫舒緩。",diff:3,unit:"P12L8"},
  {id:1306,word:"rainfall",ph:"/ˈreɪnfɔːl/",pos:"n.",en:"the amount of rain falling within a given area",zh:"降雨量",ex:"Above average rainfall during the monsoon leads to heavy regional flooding.",exZh:"在雨季期間，高於平均的降雨量導致嚴重的區域性洪水。",diff:2,unit:"P12L8"},
  {id:1307,word:"hail",ph:"/heɪl/",pos:"n.",en:"pellets of frozen rain falling in showers",zh:"冰雹",ex:"Hail creates treacherous driving conditions and may cause damage during extreme storms.",exZh:"冰雹會造成危險的駕駛狀況，並且可能在極端風暴期間造成損壞。",diff:2,unit:"P12L8"},
  {id:1308,word:"monsoon",ph:"/mɒnˈsuːn/",pos:"n.",en:"a seasonal prevailing wind bringing rain",zh:"雨季",ex:"Millions of farmers across India are affected by the amount of rain delivered by yearly monsoons.",exZh:"印度各地數百萬的農民受到每年雨季帶來雨量的影響。",diff:3,unit:"P12L8"},
  {id:1309,word:"convection",ph:"/kənˈvekʃən/",pos:"n.",en:"the movement of heat through a fluid",zh:"對流",ex:"Convection is the transportation of heat, water, and moisture from hot surfaces to cooler ones.",exZh:"對流是將熱、水和濕氣從高溫表面到低溫表面的傳輸。",diff:4,unit:"P12L8"},

  // P12L9 能源 Energy
  {id:1310,word:"pollute",ph:"/pəˈluːt/",pos:"v.",en:"to contaminate with harmful substances",zh:"污染",ex:"The main downside to nuclear energy is the danger that radioactive waste may pollute the environment.",exZh:"核能的主要缺點是其放射性廢物可能污染環境的危險。",diff:2,unit:"P12L9"},
  {id:1311,word:"utilise",ph:"/ˈjuːtɪlaɪz/",pos:"v.",en:"to make practical use of something",zh:"利用",ex:"All governments need to utilise a renewable energy plan to increase usage efficiency and avoid waste.",exZh:"所有政府都要利用可再生能源計畫，以提高使用效率並避免浪費。",diff:3,unit:"P12L9"},
  {id:1312,word:"exhaust",ph:"/ɪɡˈzɔːst/",pos:"v.",en:"to emit gas or steam",zh:"排出",ex:"Gases exhausted from coal-fired power stations are responsible for much of the smog.",exZh:"燃煤發電站排出的氣體，是大部分煙霧的起因。",diff:3,unit:"P12L9"},
  {id:1313,word:"radiate",ph:"/ˈreɪdieɪt/",pos:"v.",en:"to emit energy in the form of rays or waves",zh:"發射",ex:"LEDs emit more light and radiate far less heat than conventional light bulbs.",exZh:"LED 比傳統燈泡發出更多光線，而且放射更少熱能。",diff:3,unit:"P12L9"},
  {id:1314,word:"atomic",ph:"/əˈtɒmɪk/",pos:"adj.",en:"relating to the nucleus of an atom",zh:"原子的",ex:"Despite the potential of atomic power, the world still has no plan to dispose of its toxic waste.",exZh:"儘管原子動力具有潛能，世界仍然沒有計畫處理其有毒廢物。",diff:3,unit:"P12L9"},
  {id:1315,word:"limitless",ph:"/ˈlɪmɪtlɪs/",pos:"adj.",en:"without end or limit; boundless",zh:"無限的",ex:"Renewable sources of power hold limitless potential to generate all the world's energy needs.",exZh:"可再生能源擁有無限的潛力，足以滿足全世界的能源需求。",diff:3,unit:"P12L9"},
  {id:1316,word:"resourceful",ph:"/rɪˈsɔːsfəl/",pos:"adj.",en:"having the ability to find quick and clever solutions",zh:"富於機智的",ex:"The world needs to be resourceful in its approach to generating energy and producing zero waste.",exZh:"世界需要在能源生產和零廢棄物的方法上展現機智。",diff:4,unit:"P12L9"},
  {id:1317,word:"generative",ph:"/ˈdʒenərətɪv/",pos:"adj.",en:"capable of producing or generating",zh:"有生產力的",ex:"Hydroelectric power is generally seen as the most generative renewable energy source.",exZh:"水力發電通常被視為最具生產力的可再生能源。",diff:4,unit:"P12L9"},
  {id:1318,word:"coal",ph:"/kəʊl/",pos:"n.",en:"a combustible black sedimentary rock used as fuel",zh:"煤",ex:"Much of the world still relies on coal to generate the majority of its electricity.",exZh:"世界大部分地區仍仰賴煤來產生大部分的電力。",diff:2,unit:"P12L9"},
  {id:1319,word:"fuel",ph:"/fjuːəl/",pos:"n.",en:"material used to produce heat or power",zh:"燃料",ex:"The energy density of non-renewable fuels makes them more practical than alternative energy sources.",exZh:"不可再生燃料的能源密度使其比替代能源更實用。",diff:2,unit:"P12L9"},
  {id:1320,word:"biofuels",ph:"/ˈbaɪəʊˌfjuːəlz/",pos:"n.",en:"fuel derived from biological sources",zh:"生物燃料",ex:"Biofuels represent a step forward in weaning the world away from nonrenewable fossil fuels.",exZh:"生物燃料代表著世界在擺脫不可再生化石燃料方面向前邁出一步。",diff:4,unit:"P12L9"},
  {id:1321,word:"nuclear energy",ph:"/ˈnjuːkliər ˈenədʒi/",pos:"n.",en:"energy released during nuclear reactions",zh:"核能",ex:"The most controversial issue of using nuclear energy is its waste disposal.",exZh:"使用核能最具爭議的議題是其廢物的處理。",diff:3,unit:"P12L9"},

  // P12L10 保育 Conservation
  {id:1322,word:"preserve",ph:"/prɪˈzɜːv/",pos:"v.",en:"to maintain something in its original state",zh:"保存",ex:"Lack of regulation in developing countries regarding changes in land cover challenges global efforts to preserve natural habitats.",exZh:"開發中國家在土地覆蓋變化方面缺乏規範，對全球保存自然棲息地的努力構成了挑戰。",diff:3,unit:"P12L10"},
  {id:1323,word:"entail",ph:"/ɪnˈteɪl/",pos:"v.",en:"to involve something as a necessary part",zh:"使必要",ex:"Self-sustaining urbanisation entails a system in which all outputs are consumed rather than discarded.",exZh:"自我維持的都市化必須要有一個制度，其中所有的產出都被消耗而非被丟棄。",diff:4,unit:"P12L10"},
  {id:1324,word:"restore",ph:"/rɪˈstɔːr/",pos:"v.",en:"to bring back to a former condition",zh:"恢復",ex:"Marine protected reserves restore not only fish stocks but also entire ecosystems.",exZh:"海洋保護區不僅恢復了魚類種群，還有整個生態系統。",diff:2,unit:"P12L10"},
  {id:1325,word:"reclaim",ph:"/rɪˈkleɪm/",pos:"v.",en:"to retrieve or recover something for reuse",zh:"改造",ex:"Rewilding is where nature reclaims degraded agricultural land for native fauna to thrive.",exZh:"再野化是指大自然重新利用退化的農業用地，讓本地動物繁衍生息。",diff:3,unit:"P12L10"},
  {id:1326,word:"ongoing",ph:"/ˈɒnˌɡəʊɪŋ/",pos:"adj.",en:"continuing; still in progress",zh:"持續進行的",ex:"Fishing quotas are part of a greater ongoing effort to sustainably utilise the ocean's resources.",exZh:"漁業配額是更大規模持續努力的一部分，旨在永續利用海洋資源。",diff:2,unit:"P12L10"},
  {id:1327,word:"eco-friendly",ph:"/ˌiːkəʊˈfrendli/",pos:"adj.",en:"not harmful to the environment",zh:"生態友好的",ex:"Scaling back on red meat consumption would make food consumption eco-friendlier.",exZh:"減少紅肉消費將使食品消費更加生態友好。",diff:3,unit:"P12L10"},
  {id:1328,word:"everlasting",ph:"/ˌevəˈlɑːstɪŋ/",pos:"adj.",en:"lasting forever or for a very long time",zh:"無窮無盡的",ex:"Drinking water is not everlasting, and climate change is exhausting supplies in hot climates.",exZh:"飲用水並不是無窮無盡的，而氣候變化正在消耗炎熱氣候時的供應量。",diff:3,unit:"P12L10"},
  {id:1329,word:"indefinite",ph:"/ɪnˈdefɪnɪt/",pos:"adj.",en:"lasting for an unknown or unstated length of time",zh:"無限期的",ex:"Most people believe potable water supplies to be indefinite, but the opposite is true.",exZh:"大部分人認為飲用水的供應是無限期的，但事實剛好相反。",diff:3,unit:"P12L10"},
  {id:1330,word:"species",ph:"/ˈspiːʃiːz/",pos:"n.",en:"a group of similar organisms capable of interbreeding",zh:"物種",ex:"Governments need to manage nature sustainably, so that all species on this planet can survive together.",exZh:"政府需永續經營大自然，以確保這個星球上所有物種都能共存。",diff:2,unit:"P12L10"},
  {id:1331,word:"biodiversity",ph:"/ˌbaɪəʊdaɪˈvɜːsəti/",pos:"n.",en:"the variety of plant and animal life in a habitat",zh:"生物多樣性",ex:"Concern is growing on how to slow the rate of loss of biodiversity in global environments.",exZh:"人們愈來愈關注如何減緩全球環境中生物多樣性的喪失速度。",diff:4,unit:"P12L10"},
  {id:1332,word:"vegetation",ph:"/ˌvedʒɪˈteɪʃən/",pos:"n.",en:"plants in general or the plants of a particular area",zh:"植被",ex:"People living in poverty rely heavily on local vegetation as fuel for cooking and heating.",exZh:"生活貧困的人高度依賴當地植被作為烹飪和取暖的燃料。",diff:3,unit:"P12L10"},
  {id:1333,word:"afforestation",ph:"/əˌfɒrɪˈsteɪʃən/",pos:"n.",en:"the establishment of a forest on land not previously forested",zh:"植樹造林",ex:"Afforestation offsets CO\u2082 emissions by storing the carbon mankind emits.",exZh:"植樹造林透過儲存人類排放的碳來抵銷二氧化碳的排放。",diff:5,unit:"P12L10"},

  // ── P13 Future Development 未來發展 ─────────────────────────
  // P13L1 都市化 Urbanisation
  {id:1334,word:"migrate",ph:"/ˈmaɪɡreɪt/",pos:"v.",en:"to move from one place to another",zh:"移居",ex:"Urbanisation is driven largely by rural folk migrating and seeking a better life in nearby cities.",exZh:"都市化主要由鄉村居民移居至鄰近城市尋求更好的生活所推動。",diff:2,unit:"P13L1"},
  {id:1335,word:"predominate",ph:"/prɪˈdɒmɪneɪt/",pos:"v.",en:"to be the strongest or main element",zh:"佔主導地位",ex:"The allure of the city that predominates in developing nations has greatly increased the number of megacities globally.",exZh:"在開發中國家佔主導地位的城市魅力，已大幅增加了全球特大城市的數量。",diff:4,unit:"P13L1"},
  {id:1336,word:"mushroom",ph:"/ˈmʌʃruːm/",pos:"v.",en:"to increase or develop rapidly",zh:"迅速增長",ex:"As urban populations mushroom, citywide infrastructure often struggles to keep up.",exZh:"隨著都市人口迅速增長，全市的基礎建設往往難以跟上。",diff:3,unit:"P13L1"},
  {id:1337,word:"pedestrianise",ph:"/pɪˈdestriənaɪz/",pos:"v.",en:"to make a street accessible only to pedestrians",zh:"使成徒步區",ex:"In order to create more liveable cities, local governments should pedestrianise thoroughfares.",exZh:"為了創造更適合居住的城市，地方政府應該使大街成為徒步區。",diff:5,unit:"P13L1"},
  {id:1338,word:"metropolitan",ph:"/ˌmetrəˈpɒlɪtən/",pos:"adj.",en:"relating to a large city",zh:"大都市的",ex:"Hong Kong's MTR services not only the city but also its greater metropolitan area.",exZh:"香港的大眾快速運輸系統不僅服務於城市，還涵蓋其更大的都會區。",diff:4,unit:"P13L1"},
  {id:1339,word:"rural",ph:"/ˈrʊərəl/",pos:"adj.",en:"relating to the countryside",zh:"鄉村的",ex:"Some believe that to solve transportation problems people should live in cities rather than rural areas.",exZh:"一些人認為，要解決交通問題，人們應住在城市而非鄉村地區。",diff:2,unit:"P13L1"},
  {id:1340,word:"built-up",ph:"/ˈbɪltʌp/",pos:"adj.",en:"densely covered with buildings",zh:"建築物密集的",ex:"As fertility rates decline, built-up areas have grown faster than populations nowadays.",exZh:"隨著生育率下降，建築物密集的地區如今已增長得比人口還要快。",diff:3,unit:"P13L1"},
  {id:1341,word:"civic",ph:"/ˈsɪvɪk/",pos:"adj.",en:"relating to a city or its citizens",zh:"公民的",ex:"Low-income migrants to large cities should be given the same civic rights.",exZh:"大城市裡的低收入戶移民應被賦予相同的公民權利。",diff:3,unit:"P13L1"},
  {id:1342,word:"amenity",ph:"/əˈmiːnɪti/",pos:"n.",en:"a desirable feature of a place",zh:"便利設施",ex:"Possessing green amenities is seen as important to making a city liveable.",exZh:"擁有綠色便利設施被視為讓城市宜居的重要條件。",diff:4,unit:"P13L1"},
  {id:1343,word:"sanitation",ph:"/ˌsænɪˈteɪʃən/",pos:"n.",en:"conditions relating to public health and cleanliness",zh:"公共衛生",ex:"If wastewater were treated, the sanitation needs of cities could easily be satisfied.",exZh:"如果廢水得到處理，城市的公共衛生需求就能輕鬆滿足。",diff:3,unit:"P13L1"},
  {id:1344,word:"settlement",ph:"/ˈsetlmənt/",pos:"n.",en:"a place where people establish a community",zh:"定居地",ex:"Visionaries like Elon Musk see settlements on the moon within the next fifty years.",exZh:"像伊隆·馬斯克這樣有遠見的人預見了未來五十年月球上的定居地。",diff:3,unit:"P13L1"},
  {id:1345,word:"agglomeration",ph:"/əˌɡlɒmərˈeɪʃən/",pos:"n.",en:"a mass or collection of things clustered together",zh:"聚集",ex:"Green belts of countryside around cities may be a reasonable way to limit urban agglomeration.",exZh:"城市周圍的綠帶綠化帶可能是限制都市聚集的一個合理方法。",diff:5,unit:"P13L1"},

  // P13L2 人口 Population
  {id:1346,word:"lurk",ph:"/lɜːk/",pos:"v.",en:"to be present in a hidden or unseen way",zh:"潛伏",ex:"With relentless population growth, there are many potential issues lurking for society at large.",exZh:"隨著持續的人口增長，整個社會潛伏著許多潛在問題。",diff:3,unit:"P13L2"},
  {id:1347,word:"overshoot",ph:"/ˌəʊvəˈʃuːt/",pos:"v.",en:"to go past or exceed a limit",zh:"超過",ex:"There is concern over whether population numbers will overshoot the Earth's capacity to sustain them.",exZh:"人們擔心人口數量是否會超過地球供養他們的能力。",diff:4,unit:"P13L2"},
  {id:1348,word:"play out",ph:"/pleɪ aʊt/",pos:"v.",en:"to develop or unfold over time",zh:"發展",ex:"Declining global fertility rates will largely affect how future population growth plays out.",exZh:"正在下降的全球生育率將大幅影響未來人口成長會如何發展。",diff:3,unit:"P13L2"},
  {id:1349,word:"stand (at)",ph:"/stænd/",pos:"v.",en:"to be at a specified level",zh:"（某數字）達到",ex:"By the end of the 21st century, world population figures are projected to stand at 11 billion people.",exZh:"到二十一世紀末，世界人口數預計將達到一百一十億人。",diff:2,unit:"P13L2"},
  {id:1350,word:"demographic",ph:"/ˌdeməˈɡræfɪk/",pos:"adj.",en:"relating to the structure of populations",zh:"人口的",ex:"Sex education is causing profound demographic shifts worldwide.",exZh:"性教育正在全世界造成強烈的人口轉變。",diff:4,unit:"P13L2"},
  {id:1351,word:"imbalanced",ph:"/ɪmˈbælənst/",pos:"adj.",en:"not evenly distributed or proportioned",zh:"不平衡的",ex:"China's one-child policy has significantly caused an imbalanced sex ratio.",exZh:"中國的一胎化政策已經嚴重地造成性別比例不平衡。",diff:3,unit:"P13L2"},
  {id:1352,word:"overpopulated",ph:"/ˌəʊvəˈpɒpjuleɪtɪd/",pos:"adj.",en:"having too many people for the available resources",zh:"人口過剩的",ex:"Population growth in the 21st century is likely to result in some overpopulated nations.",exZh:"二十一世紀的人口成長可能造成一些國家人口過剩。",diff:3,unit:"P13L2"},
  {id:1353,word:"populous",ph:"/ˈpɒpjuləs/",pos:"adj.",en:"having a large population",zh:"人口多的",ex:"In the future, the most populous countries in the world will continue to be China and India.",exZh:"未來，世界上人口最多的國家將仍是中國和印度。",diff:3,unit:"P13L2"},
  {id:1354,word:"trend",ph:"/trend/",pos:"n.",en:"a general direction of change",zh:"趨勢",ex:"The UK's population is greying rapidly and this trend is only expected to continue.",exZh:"英國的人口正快速老齡化，而這個趨勢預計只會持續下去。",diff:2,unit:"P13L2"},
  {id:1355,word:"baby boom",ph:"/ˈbeɪbi buːm/",pos:"n.",en:"a temporary marked increase in the birth rate",zh:"嬰兒潮",ex:"A sudden increase in a nation's birth rate signals a baby boom.",exZh:"一個國家出生率的突然增長表明出現了一次嬰兒潮。",diff:2,unit:"P13L2"},
  {id:1356,word:"fertility rate",ph:"/fɜːˈtɪləti reɪt/",pos:"n.",en:"the average number of children born per woman",zh:"生育率",ex:"Low fertility rates in developed nations like Japan are projected to result in population decline.",exZh:"日本等已開發國家的低生育率預計會造成人口下降。",diff:3,unit:"P13L2"},
  {id:1357,word:"Anthropocene",ph:"/ˈænθrəpəˌsiːn/",pos:"n.",en:"the current geological age viewed as the period of significant human impact",zh:"人類世",ex:"Many scientists now claim that mankind has entered a new developmental era called the Anthropocene.",exZh:"許多科學家現在聲稱，人類已經進入一個稱為人類世的新發展時代。",diff:5,unit:"P13L2"},

  // P13L3 科技 Technology
  {id:1358,word:"patent",ph:"/ˈpeɪtənt/",pos:"v.",en:"to obtain a patent for an invention",zh:"取得專利",ex:"Opponents of patenting new inventions view it as an expensive process that stifles innovation.",exZh:"為新發明取得專利的反對者認為這是一個昂貴的過程，會抑制創新。",diff:3,unit:"P13L3"},
  {id:1359,word:"revolutionise",ph:"/ˌrevəˈluːʃənaɪz/",pos:"v.",en:"to change something radically",zh:"徹底改革",ex:"In the future, 3D printing has the potential to revolutionise on-demand manufacturing.",exZh:"在未來，3D 列印可能徹底改革新按需製造模式。",diff:4,unit:"P13L3"},
  {id:1360,word:"spur",ph:"/spɜː/",pos:"v.",en:"to encourage or promote",zh:"鼓勵",ex:"Governments demonstrate business-friendly policies that spur innovation.",exZh:"政府展現了商業友好的政策，以激勵創新。",diff:3,unit:"P13L3"},
  {id:1361,word:"future-proof",ph:"/ˈfjuːtʃə.pruːf/",pos:"v.",en:"to make something unlikely to become obsolete",zh:"使……不過時",ex:"Manufacturers are able to future-proof their vehicles through over-the-air updates.",exZh:"製造商能夠利用無線更新使他們的車輛不過時。",diff:4,unit:"P13L3"},
  {id:1362,word:"cloud-based",ph:"/ˈklaʊd.beɪst/",pos:"adj.",en:"using remote servers on the internet for data storage",zh:"以雲端為基礎的",ex:"Cloud-based computing allows users instant access to their data everywhere.",exZh:"以雲端為基礎的運算允許使用者在任何地方即時使用數據。",diff:3,unit:"P13L3"},
  {id:1363,word:"pioneering",ph:"/ˌpaɪəˈnɪərɪŋ/",pos:"adj.",en:"involving new ideas or methods",zh:"開創性的",ex:"Pioneering research in nuclear fusion designs means that cheap energy may soon be achievable.",exZh:"核融合設計方面的開創性研究意味著廉價能源可能很快就能實現。",diff:4,unit:"P13L3"},
  {id:1364,word:"user-friendly",ph:"/ˌjuːzəˈfrendli/",pos:"adj.",en:"easy to use or understand",zh:"用戶友好的",ex:"The Amazon Echo is a user-friendly product changing the way people interact with technology.",exZh:"Amazon Echo 是一個用戶友好的產品，改變了人們與科技互動的方式。",diff:3,unit:"P13L3"},
  {id:1365,word:"bleeding-edge",ph:"/ˌbliːdɪŋˈedʒ/",pos:"adj.",en:"at the very forefront of technology",zh:"尖端的",ex:"Bleeding-edge technologies promise instant access to data-intensive services like virtual reality shows.",exZh:"尖端技術承諾提供即時存取數據密集型服務，例如虛擬實境節目。",diff:5,unit:"P13L3"},
  {id:1366,word:"norm",ph:"/nɔːm/",pos:"n.",en:"something that is usual or standard",zh:"常態",ex:"Rapid innovation has become the norm for young consumers.",exZh:"快速的創新已成為年輕消費者們的常態。",diff:2,unit:"P13L3"},
  {id:1367,word:"gadget",ph:"/ˈɡædʒɪt/",pos:"n.",en:"a small mechanical or electronic device",zh:"小裝置",ex:"The computer is equipped with all the latest gadgets.",exZh:"這台電腦配備了所有最新的小裝置。",diff:2,unit:"P13L3"},
  {id:1368,word:"spin-off",ph:"/ˈspɪnɒf/",pos:"n.",en:"a by-product or incidental result of a larger project",zh:"附加效果",ex:"Often research in the medical field produces spin-offs that may lead to the development of new products.",exZh:"醫學領域的研究往往會產生附加效果，這可能促成新產品的開發。",diff:4,unit:"P13L3"},
  {id:1369,word:"technophile",ph:"/ˈteknəfaɪl/",pos:"n.",en:"a person who is enthusiastic about new technology",zh:"科技愛好者",ex:"In an age full of technophiles, consumers are very comfortable with changing technology.",exZh:"在一個充滿科技愛好者的時代，消費者對於不斷變化的科技非常滣意。",diff:4,unit:"P13L3"},

  // P13L4 醫學 Medicine & Health
  {id:1370,word:"monitor",ph:"/ˈmɒnɪtər/",pos:"v.",en:"to observe and check over a period of time",zh:"監測",ex:"Advances in wearable technology have resulted in sensors that can monitor people's health.",exZh:"可穿戴技術的進步已經使得感測器能夠監測人們的健康。",diff:2,unit:"P13L4"},
  {id:1371,word:"tackle",ph:"/ˈtækl/",pos:"v.",en:"to make determined efforts to deal with",zh:"處理",ex:"Personalised gene medicine will allow doctors to tackle rare and untreatable diseases.",exZh:"個人化基因醫學將使醫生能夠處理罕見和無法治療的疾病。",diff:2,unit:"P13L4"},
  {id:1372,word:"detect",ph:"/dɪˈtekt/",pos:"v.",en:"to discover or identify the presence of",zh:"檢測",ex:"New artificial intelligence algorithms can accurately detect potential skin abnormalities.",exZh:"新的人工智慧演算法能夠準確地檢測出潛在性的皮膚異常。",diff:2,unit:"P13L4"},
  {id:1373,word:"transplant",ph:"/trænsˈplɑːnt/",pos:"v.",en:"to transfer tissue or an organ from one body to another",zh:"移植",ex:"Growing organs from stem cells may lessen the overdependence on transplanting body parts.",exZh:"從幹細胞培養器官可能減少對身體器官移植的過度依賴。",diff:3,unit:"P13L4"},
  {id:1374,word:"genetic",ph:"/dʒɪˈnetɪk/",pos:"adj.",en:"relating to genes or heredity",zh:"基因的",ex:"Genetic databanks hold the potential to diagnose and treat previously incurable rare diseases.",exZh:"基因數據庫具有診斷並治療以前無法治癒的罕見疾病的潛力。",diff:3,unit:"P13L4"},
  {id:1375,word:"intermittent",ph:"/ˌɪntəˈmɪtənt/",pos:"adj.",en:"occurring at irregular intervals",zh:"間歇性的",ex:"Intermittent fasting claims to lengthen lifespans, improve memory, and slow aging.",exZh:"間歇性斷食聲稱可以延長壽命、提升記憶力和延緩老化。",diff:4,unit:"P13L4"},
  {id:1376,word:"proactive",ph:"/prəʊˈæktɪv/",pos:"adj.",en:"creating or controlling a situation rather than responding to it",zh:"主動的",ex:"Proactive medicine aims to make health changes in individuals before problems develop.",exZh:"主動醫學旨在於問題發生之前，對個人的健康狀況進行改變。",diff:3,unit:"P13L4"},
  {id:1377,word:"remote-care",ph:"/rɪˈməʊt.keə/",pos:"adj.",en:"providing medical care from a distance",zh:"遠程護理的",ex:"Smartphone apps offer remote-care treatment to rural patients.",exZh:"智慧型手機的應用程式提供了遠程護理治療方式給鄉村病患。",diff:3,unit:"P13L4"},
  {id:1378,word:"antibiotic",ph:"/ˌæntibaɪˈɒtɪk/",pos:"n.",en:"a medicine that inhibits the growth of bacteria",zh:"抗生素",ex:"Medical experts are worried about the resistance to antibiotics demonstrated by bacteria.",exZh:"醫學專家擔心細菌已展現對抗生素的抗藥性。",diff:3,unit:"P13L4"},
  {id:1379,word:"mutation",ph:"/mjuːˈteɪʃən/",pos:"n.",en:"a change in the structure of a gene",zh:"突變",ex:"Gene editing aims to correct harmful DNA mutations before infants are even born.",exZh:"基因編輯旨在於嬰兒出生前，修正有害的 DNA 突變。",diff:4,unit:"P13L4"},
  {id:1380,word:"ultrasound",ph:"/ˈʌltrəsaʊnd/",pos:"n.",en:"sound waves used in medical imaging",zh:"超音波",ex:"Some research shows that ultrasound may have a role in boosting brain function.",exZh:"一些研究顯示，超音波可能在增強大腦功能方面可以發揮作用。",diff:3,unit:"P13L4"},
  {id:1381,word:"nanoscience",ph:"/ˈnænəʊˌsaɪəns/",pos:"n.",en:"the branch of science dealing with dimensions of less than 100 nanometres",zh:"奈米科學",ex:"With advances in nanoscience, it is possible that one day nanobots regenerate our bodies.",exZh:"隨著奈米科學的進步，有一天奈米機器人可能讓我們的身體再生。",diff:5,unit:"P13L4"},

  // P13L5 媒體 Media & Digital
  {id:1382,word:"subscribe",ph:"/səbˈskraɪb/",pos:"v.",en:"to arrange to receive something regularly",zh:"訂閱",ex:"In an age of Vlogs and Instagram, everybody is looking for people to subscribe to their channel.",exZh:"在 Vlogs 和 Instagram 的時代，每個人都在尋找人們訂閱他們的頻道。",diff:2,unit:"P13L5"},
  {id:1383,word:"bombard",ph:"/bɒmˈbɑːd/",pos:"v.",en:"to subject to a continuous flow of",zh:"轟炸",ex:"Social media platforms tend to bombard users with targeted advertisements that can be overwhelming.",exZh:"社交媒體平台傾向用令人難以抵擋的、有針對性的廣告轟炸用戶。",diff:3,unit:"P13L5"},
  {id:1384,word:"commoditise",ph:"/kəˈmɒdɪtaɪz/",pos:"v.",en:"to turn into a commodity",zh:"商品化",ex:"As the media commoditises, innovation will set apart those companies who succeed and those who fail.",exZh:"隨著媒體商品化，創新會使那些成功與失敗的公司區隔開來。",diff:4,unit:"P13L5"},
  {id:1385,word:"scroll",ph:"/skrəʊl/",pos:"v.",en:"to move text or images up or down on a screen",zh:"滾動",ex:"It seems unusual not to see people perpetually scrolling on their smartphones nowadays.",exZh:"如今，看不到人們不停地滾動手機似乎不尋常。",diff:2,unit:"P13L5"},
  {id:1386,word:"virtual",ph:"/ˈvɜːtʃuəl/",pos:"adj.",en:"existing in a computer-generated environment",zh:"虛擬的",ex:"Social media companies envisage a future where billions of people hang out in virtual spaces.",exZh:"社交媒體公司展望一個數十億人在虛擬空間開逛的未來。",diff:3,unit:"P13L5"},
  {id:1387,word:"immersive",ph:"/ɪˈmɜːsɪv/",pos:"adj.",en:"providing a deeply engaging experience",zh:"沉浸式的",ex:"Media companies plan to leverage 5G technology to bring immersive content to consumers.",exZh:"媒體公司計劃利用 5G 科技帶給消費者沉浸式的內容。",diff:4,unit:"P13L5"},
  {id:1388,word:"timeless",ph:"/ˈtaɪmlɪs/",pos:"adj.",en:"not affected by the passage of time",zh:"永不過時的",ex:"Many consumers show a sustained appetite for timeless entertainment shows like Friends.",exZh:"許多消費者對於《六人行》等永不過時的娛樂節目表現出持續的愛好。",diff:3,unit:"P13L5"},
  {id:1389,word:"wearable",ph:"/ˈweərəbl/",pos:"adj.",en:"able to be worn on the body",zh:"可穿戴的",ex:"The market for wearable gaming devices is about to explode.",exZh:"可穿戴遊戲裝置的市場將迅速增長。",diff:3,unit:"P13L5"},
  {id:1390,word:"recognition",ph:"/ˌrekəɡˈnɪʃən/",pos:"n.",en:"the action of identifying something",zh:"識別",ex:"AI-generated content is now so good that it makes the recognition of its source almost impossible for humans.",exZh:"人工智慧生成的內容現在已經非常好，以至於人類幾乎無法辨識其來源。",diff:3,unit:"P13L5"},
  {id:1391,word:"infographic",ph:"/ˌɪnfəʊˈɡræfɪk/",pos:"n.",en:"a visual representation of information or data",zh:"圖解資訊",ex:"Infographics are great tools to convey information since most people tend to remember visuals better.",exZh:"圖解資訊是傳達資訊的絕佳工具，因為大多數人傾向於記住視覺資料。",diff:4,unit:"P13L5"},
  {id:1392,word:"mindset",ph:"/ˈmaɪndset/",pos:"n.",en:"an established set of attitudes",zh:"心態",ex:"The digital mindset assumed by online denizens may create anxiety when comparing with real life.",exZh:"網民所假定的數位心態在與現實生活相比時，可能會產生焦慮。",diff:3,unit:"P13L5"},
  {id:1393,word:"convergence",ph:"/kənˈvɜːdʒəns/",pos:"n.",en:"the process of coming together from different directions",zh:"匯流",ex:"Digital convergence, where users can access similar media content on different devices, is set to increase.",exZh:"數位匯流讓用戶能在不同裝置上存取相似的媒體內容，這種現象將持續增加。",diff:4,unit:"P13L5"},

  // P13L6 工作 Work & Employment
  {id:1394,word:"augment",ph:"/ɔːɡˈment/",pos:"v.",en:"to make something greater by adding to it",zh:"增加",ex:"Finding work on an ad-hoc basis allows workers in a gig economy to augment their income.",exZh:"找臨時工作讓零工經濟的勞工可以增加他們的收入。",diff:4,unit:"P13L6"},
  {id:1395,word:"encroach",ph:"/ɪnˈkrəʊtʃ/",pos:"v.",en:"to gradually intrude on someone's territory or rights",zh:"侵佔",ex:"Many workers are already asking when automation will encroach on their jobs.",exZh:"許多工人已經在問，自動化何時會侵佔他們的工作。",diff:4,unit:"P13L6"},
  {id:1396,word:"freelance",ph:"/ˈfriːlɑːns/",pos:"v.",en:"to work as a self-employed person",zh:"自由接案",ex:"More people wish to freelance so as to create flexible schedules.",exZh:"愈來愈多人希望能夠自由接案，以建立彈性的時間表。",diff:3,unit:"P13L6"},
  {id:1397,word:"crowdsource",ph:"/ˈkraʊd.sɔːs/",pos:"v.",en:"to obtain information or services from a large group of people",zh:"（網上）眾包",ex:"Robots will soon be able to crowdsource new skills to robotic networks to accelerate their learning.",exZh:"機器人將很快能向機器人網絡眾包新技能以加快其學習。",diff:5,unit:"P13L6"},
  {id:1398,word:"multiple",ph:"/ˈmʌltɪpl/",pos:"adj.",en:"having several parts or elements",zh:"多個的",ex:"As the cost of living rises in modern cities, many people find themselves working multiple jobs.",exZh:"隨著現代城市生活成本上升，許多人發現自己從事多份工作。",diff:2,unit:"P13L6"},
  {id:1399,word:"remote",ph:"/rɪˈməʊt/",pos:"adj.",en:"done from a distance",zh:"遠程的",ex:"One of the impacts of remote work is that it seems to increase productivity and lower employee turnover.",exZh:"遠程工作的影響之一是，它似乎能提高生產力並降低員工流動率。",diff:2,unit:"P13L6"},
  {id:1400,word:"scalable",ph:"/ˈskeɪləbl/",pos:"adj.",en:"able to be changed in size or scale",zh:"可擴增的",ex:"Blogging is a scalable way to build up advertising revenue as a writer attracts more readers.",exZh:"寫部落格是一種可擴增的方式，隨著作家吸引更多讀者，可用來建立廣告收入。",diff:4,unit:"P13L6"},
  {id:1401,word:"off-balance",ph:"/ˌɒfˈbæləns/",pos:"adj.",en:"caught unprepared; unable to cope",zh:"措手不及的",ex:"In the push to go digital, new working methods may throw older workers off-balance.",exZh:"在推動數位化過程中，新工作方法可能會讓年長的勞工措手不及。",diff:3,unit:"P13L6"},
  {id:1402,word:"e-commerce",ph:"/ˈiːkɒməs/",pos:"n.",en:"commercial transactions conducted electronically",zh:"電子商務",ex:"Many graduates wish to work in e-commerce due to the high innovation and creativity of the industry.",exZh:"許多畢業生希望從事電子商務工作是由於其高度創新和創造力。",diff:3,unit:"P13L6"},
  {id:1403,word:"flexibility",ph:"/ˌfleksəˈbɪlɪti/",pos:"n.",en:"the quality of being easily adaptable",zh:"靈活性",ex:"More workers expect greater work hour flexibility when looking for a job.",exZh:"更多工人在找工作時，期待有更大的工時靈活性。",diff:3,unit:"P13L6"},
  {id:1404,word:"swarm",ph:"/swɔːm/",pos:"n.",en:"a large number moving together",zh:"一大批",ex:"Improved interconnectivity allows swarms of robots to work together to carry out jobs.",exZh:"改善的相互連結性讓一大批機器人能合作完成工作。",diff:3,unit:"P13L6"},
  {id:1405,word:"continuum",ph:"/kənˈtɪnjuəm/",pos:"n.",en:"a continuous sequence without clear divisions",zh:"連續",ex:"Outsourcing key tasks allows companies to ensure a continuum of a service in case of operational difficulties.",exZh:"外包重要工作讓公司在面臨營運困難的情況下，能夠確保服務的連續。",diff:5,unit:"P13L6"},

  // P13L7 交通 Transportation
  {id:1406,word:"elevate",ph:"/ˈelɪveɪt/",pos:"v.",en:"to raise to a higher position",zh:"抬高",ex:"By adopting sky train technology, cities can elevate commuters, and thus reduce traffic congestion.",exZh:"藉由採用空中列車技術，城市可以將通勤者抬升起來，從而紓解交通擁擠。",diff:3,unit:"P13L7"},
  {id:1407,word:"freight",ph:"/freɪt/",pos:"v.",en:"to transport goods in bulk",zh:"運送",ex:"One area of environmental concern is the growing volume of goods freighted globally by sea and air.",exZh:"環境問題的一個領域是全球海運和空運的貨品數量日益增加。",diff:3,unit:"P13L7"},
  {id:1408,word:"supersede",ph:"/ˌsuːpəˈsiːd/",pos:"v.",en:"to take the place of something previously used",zh:"取代",ex:"Sales of electric vehicles are poised to supersede their combustion engine counterparts by 2050.",exZh:"到 2050 年，電動汽車的銷售量正準備取代其內燃機對手。",diff:4,unit:"P13L7"},
  {id:1409,word:"predetermine",ph:"/ˌpriːdɪˈtɜːmɪn/",pos:"v.",en:"to establish or decide in advance",zh:"預先決定",ex:"A lack of interest among American teens in driving may predetermine transportation trends.",exZh:"美國青少年對駕駛缺乏興趣可能會預先決定運輸工具的趨勢。",diff:4,unit:"P13L7"},
  {id:1410,word:"driverless",ph:"/ˈdraɪvlɪs/",pos:"adj.",en:"operating without a human driver",zh:"無人駕駛的",ex:"One solution to easing traffic congestion could be autonomous driverless vehicles that work together.",exZh:"緩解交通擁擠的一種解決方法可能是能協同合作的自動無人駕駛車輛。",diff:3,unit:"P13L7"},
  {id:1411,word:"magnetic",ph:"/mæɡˈnetɪk/",pos:"adj.",en:"relating to or produced by magnetism",zh:"磁的",ex:"Magnetic levitation technology is set to transform mass transit systems in China.",exZh:"磁浮列車科技將開始改變中國的大運輸系統。",diff:3,unit:"P13L7"},
  {id:1412,word:"transformative",ph:"/trænsˈfɔːmətɪv/",pos:"adj.",en:"causing a major change",zh:"有改革能力的",ex:"Transformative technology such as self-driving cars aims to cut air pollution.",exZh:"像是自動駕駛汽車等變革性技術，旨在減少空氣污染。",diff:4,unit:"P13L7"},
  {id:1413,word:"unobstructed",ph:"/ˌʌnəbˈstrʌktɪd/",pos:"adj.",en:"not blocked or hindered",zh:"暢通無阻的",ex:"Thanks to the new underpass, the flow of traffic is now unobstructed significantly reducing commute times.",exZh:"多虧了新建的地下通道，現在交通流量已暢通無阻，大幅縮短了通勤時間。",diff:4,unit:"P13L7"},
  {id:1414,word:"vehicle",ph:"/ˈviːɪkl/",pos:"n.",en:"a machine used for transporting people or goods",zh:"車輛",ex:"Semi-autonomous vehicles have proven their ability to save lives.",exZh:"半自駕駛車輛已證明了它們拯救生命的能力。",diff:2,unit:"P13L7"},
  {id:1415,word:"carpool",ph:"/ˈkɑː.puːl/",pos:"n.",en:"an arrangement to share a car journey",zh:"共乘",ex:"Forming a carpool is a great way for multiple people to efficiently reduce their individual carbon footprints.",exZh:"組成共乘是多個人有效減少其個別碳足跡的絕佳方法。",diff:3,unit:"P13L7"},
  {id:1416,word:"hybrid",ph:"/ˈhaɪbrɪd/",pos:"n.",en:"something made by combining two different elements",zh:"混合（動力）",ex:"Hybrid cars containing an electric motor and a conventional engine have gained in popularity.",exZh:"配備電動馬達和傳統引擎的混合動力車愈來愈受歡迎。",diff:3,unit:"P13L7"},
  {id:1417,word:"micro mobility",ph:"/ˈmaɪkrəʊ məʊˈbɪləti/",pos:"n.",en:"lightweight transportation solutions for short distances",zh:"微型移動",ex:"The preponderance of scooters in world cities proves the market for micro mobility solutions.",exZh:"機車在世界城市中的普及證明了微型移動解決方案的市場。",diff:4,unit:"P13L7"},

  // P13L8 農業 Agriculture
  {id:1418,word:"halt",ph:"/hɔːlt/",pos:"v.",en:"to bring or come to an abrupt stop",zh:"停止",ex:"Farmers worldwide are beginning to halt the excessive use of fertiliser that can greatly degrade soil quality.",exZh:"全世界的農民正開始停止過量使用會嚴重降低土壤品質的肥料。",diff:2,unit:"P13L8"},
  {id:1419,word:"yield",ph:"/jiːld/",pos:"v.",en:"to produce or provide",zh:"產出",ex:"Hybrid seeds yield greater output per hectare than regular seeds.",exZh:"雜交種子每公頃比普通種子能產出更大的產量。",diff:2,unit:"P13L8"},
  {id:1420,word:"redeem",ph:"/rɪˈdiːm/",pos:"v.",en:"to compensate for faults; to save from sin",zh:"救贖",ex:"A green revolution in energy production is allowing humankind to redeem itself after years of polluting the planet.",exZh:"能源生產的一場綠色革命正使得人類在多年污染地球後能自我救贖。",diff:3,unit:"P13L8"},
  {id:1421,word:"toil",ph:"/tɔɪl/",pos:"v.",en:"to work extremely hard",zh:"辛苦工作",ex:"Drones have the potential to toil on behalf of farmers to more efficiently fertilise and monitor crops.",exZh:"無人機有可能代替農民努力工作，以便更有效地施肥和監測農作物。",diff:3,unit:"P13L8"},
  {id:1422,word:"organic",ph:"/ɔːˈɡænɪk/",pos:"adj.",en:"produced without artificial chemicals",zh:"有機的",ex:"Simply educating farmers in better organic planting techniques can raise yields and deter pests.",exZh:"簡單地教育農民更好的有機種植技術，能夠提高產量並且防止害蟲。",diff:2,unit:"P13L8"},
  {id:1423,word:"environmentally friendly",ph:"/ɪnˌvaɪrənˈmentəli ˈfrendli/",pos:"adj.",en:"not harmful to the environment",zh:"環境友善的",ex:"The green revolution may have led consumers to purchase more environmentally friendly products.",exZh:"綠色革命可能已導致消費者購買更環境友善的產品。",diff:3,unit:"P13L8"},
  {id:1424,word:"self-sufficient",ph:"/ˌself səˈfɪʃənt/",pos:"adj.",en:"able to provide for oneself without external help",zh:"自給自足的",ex:"Natural farming is a growing trend to achieve complete self-sufficiency without chemicals.",exZh:"自然農法是一個日益增長的趨勢，旨在實現完全不依賴化學品的自給自足。",diff:3,unit:"P13L8"},
  {id:1425,word:"fallow",ph:"/ˈfæləʊ/",pos:"adj.",en:"left unplanted to restore fertility",zh:"休耕的",ex:"Farmers are moving away from productivity farming and allowing land to lie fallow in order to recover.",exZh:"農民正在遠離生產力農業，讓土地休耕以恢復。",diff:4,unit:"P13L8"},
  {id:1426,word:"grain",ph:"/ɡreɪn/",pos:"n.",en:"a cereal crop used for food",zh:"穀物",ex:"Local seed banks hope to redeem varieties of indigenous grain lost during the 20th century.",exZh:"當地種子銀行希望能換回在二十世紀時失去的各種本土穀物。",diff:2,unit:"P13L8"},
  {id:1427,word:"shortage",ph:"/ˈʃɔːtɪdʒ/",pos:"n.",en:"a state of not having enough",zh:"短缺",ex:"High-yield crop strains bear the potential to forever prevent global food shortages.",exZh:"高產量作物品種有可能永遠避免全球糧食短缺。",diff:2,unit:"P13L8"},
  {id:1428,word:"exploitation",ph:"/ˌeksplɔɪˈteɪʃən/",pos:"n.",en:"the action of treating someone unfairly for benefit",zh:"前削",ex:"Western companies are accused of the exploitation of poor farmers.",exZh:"西方公司被指控前削貧窮農民。",diff:4,unit:"P13L8"},
  {id:1429,word:"famine",ph:"/ˈfæmɪn/",pos:"n.",en:"extreme scarcity of food",zh:"飢荒",ex:"To prevent a future famine caused by population growth, the world needs another green revolution.",exZh:"為了避免未來因人口增長引起的飢荒，世界需要另一場綠色革命。",diff:3,unit:"P13L8"},

  // ── P14 Writing Vocabulary 寫作詞彙 ─────────────────────────
  // P14L1 圖表格式 Chart Types & Writing Phrases
  {id:1430,word:"bar chart",ph:"/bɑːr tʃɑːrt/",pos:"n.",en:"a diagram using rectangular bars to show data",zh:"長條圖",ex:"The bar chart compares the percentage of male and female professionals in six fields.",exZh:"這張長條圖比較了六個領域的男女性專業人士的百分比。",diff:2,unit:"P14L1"},
  {id:1431,word:"line chart",ph:"/laɪn tʃɑːrt/",pos:"n.",en:"a graph using lines to show data changes over time",zh:"折線圖",ex:"The line chart depicts the percentage of Australian teenagers using the Internet over a period of two years.",exZh:"這張折線圖描述了在兩年期間使用網路的澳洲青少年百分比。",diff:2,unit:"P14L1"},
  {id:1432,word:"table",ph:"/ˈteɪbl/",pos:"n.",en:"a set of data arranged in rows and columns",zh:"表",ex:"The table illustrates the various types of pastimes enjoyed by four age cohorts in the UK.",exZh:"這張表說明了英國四個年齡組所享受的各種型態的娛樂。",diff:1,unit:"P14L1"},
  {id:1433,word:"pie chart",ph:"/paɪ tʃɑːrt/",pos:"n.",en:"a circular chart divided into sectors to show proportions",zh:"圓餅圖",ex:"The pie chart shows the four primary causes of farmland degradation globally today.",exZh:"這張圓餅圖顯示現今全球農田退化的四個主要原因。",diff:2,unit:"P14L1"},
  {id:1434,word:"map",ph:"/mæp/",pos:"n.",en:"a visual representation of an area",zh:"地圖",ex:"The maps depict the changes in the small town of Allsburgh between 1980 and 1995.",exZh:"這些地圖描繪出在 1980 到 1995 年間，奧爾斯堡小鎮的變化。",diff:1,unit:"P14L1"},
  {id:1435,word:"process",ph:"/ˈprəʊses/",pos:"n.",en:"a series of actions to achieve a result",zh:"過程",ex:"The process diagram illustrates how dairy products are produced, processed and packaged to be sold.",exZh:"該流程圖說明了乳製品如何製作、加工和包裝以供銷售。",diff:2,unit:"P14L1"},
  {id:1436,word:"indicate",ph:"/ˈɪndɪkeɪt/",pos:"v.",en:"to point out or show",zh:"顯示",ex:"Overall, the diagram indicates five stages that clean, filter and disinfect wastewater.",exZh:"整體而言，該圖顯示了清潔、過濾和消毒廢水的五個階段。",diff:2,unit:"P14L1"},
  {id:1437,word:"illustrate",ph:"/ˈɪləstreɪt/",pos:"v.",en:"to explain or make clear by examples",zh:"說明",ex:"The chart clearly illustrates key issues facing the environment around the world.",exZh:"這張圖清楚說明了全世界環境面臨的關鍵問題。",diff:2,unit:"P14L1"},
  {id:1438,word:"demonstrate",ph:"/ˈdemənstreɪt/",pos:"v.",en:"to clearly show the existence of",zh:"顯示",ex:"The line graph demonstrates the growth in mental health issues in four regions across the UK.",exZh:"這張折線圖顯示了橫跨英國四個地區心理健康議題的增長。",diff:3,unit:"P14L1"},
  {id:1439,word:"in summary",ph:"/ɪn ˈsʌməri/",pos:"phrase",en:"to conclude briefly",zh:"總結來說",ex:"In summary, agriculture was the primary user of freshwater.",exZh:"總結來說，農業是淡水的主要使用者。",diff:2,unit:"P14L1"},
  {id:1440,word:"to summarise",ph:"/tə ˈsʌməraɪz/",pos:"phrase",en:"to give a brief statement of the main points",zh:"總而言之",ex:"To summarise, while the majority of Australians keep fit, a higher proportion of women exercise than men.",exZh:"總而言之，雖然大多數澳洲人保持健康，但女性運動的比例高於男性。",diff:2,unit:"P14L1"},
  {id:1441,word:"to sum up",ph:"/tə sʌm ʌp/",pos:"phrase",en:"to state the main points briefly",zh:"總結起來",ex:"To sum up, there was a direct correlation between causes of deforestation worldwide and in Asia.",exZh:"總結起來，全世界和亞洲砍伐森林的原因之間有直接的關聯。",diff:2,unit:"P14L1"},

  // P14L2 趨勢動詞 Trend Verbs
  {id:1442,word:"increase",ph:"/ɪnˈkriːs/",pos:"v.",en:"to become greater in size or amount",zh:"增加",ex:"Commuting by car increased more dramatically than the other methods of commuting over the six-month period.",exZh:"在過去六個月裡，開車通勤的增加幅度比其他通勤方式更顯著。",diff:1,unit:"P14L2"},
  {id:1443,word:"climb",ph:"/klaɪm/",pos:"v.",en:"to increase gradually",zh:"逐漸上升",ex:"Complaints faced by the airline climbed five-fold from 1980 to 1990.",exZh:"從 1980 到 1990 年，該航空公司面臨的投訴逐漸上升五倍。",diff:2,unit:"P14L2"},
  {id:1444,word:"grow",ph:"/ɡrəʊ/",pos:"v.",en:"to increase in size or amount",zh:"成長",ex:"Similarly, CO2 emissions from European countries grew three times to equal those of the USA in 2010.",exZh:"同樣地在 2010 年，歐洲國家二氧化碳的排放成長三倍，與美國相當。",diff:1,unit:"P14L2"},
  {id:1445,word:"rise",ph:"/raɪz/",pos:"v.",en:"to move upwards",zh:"上升",ex:"The number of second-language learners rose rapidly throughout the period.",exZh:"第二語言學習者的數量在此時期迅速上升。",diff:1,unit:"P14L2"},
  {id:1446,word:"remain",ph:"/rɪˈmeɪn/",pos:"v.",en:"to continue to exist or stay the same",zh:"仍是",ex:"Overall television remained the most popular medium to advertise in over five years.",exZh:"整體而言，電視仍是在五年來打廣告最受歡迎的媒體。",diff:1,unit:"P14L2"},
  {id:1447,word:"maintain",ph:"/meɪnˈteɪn/",pos:"v.",en:"to keep at the same level",zh:"維持",ex:"Population levels are expected to maintain the same level over the next decade.",exZh:"人口層面預計在接下來十年將維持相同水平。",diff:2,unit:"P14L2"},
  {id:1448,word:"stabilise",ph:"/ˈsteɪbɪlaɪz/",pos:"v.",en:"to become or make stable",zh:"穩定",ex:"After increasing for five years, users of the Blackberry OS stabilised until 2010 when numbers began to decline.",exZh:"經過五年的增加後，黑莓機作業系統的用戶一直很穩定，直到 2010 年數量開始下降。",diff:3,unit:"P14L2"},
  {id:1449,word:"fluctuate",ph:"/ˈflʌktʃueɪt/",pos:"v.",en:"to rise and fall irregularly",zh:"波動",ex:"Demand for fossil fuels rose in the 1980s, then fluctuated over the following two decades.",exZh:"1980 年代化石燃料的需求上升，然後在接下來的二十年間波動。",diff:3,unit:"P14L2"},
  {id:1450,word:"level off",ph:"/ˈlevl ɒf/",pos:"v.",en:"to stop rising or falling and become steady",zh:"趨向平穩",ex:"With traffic safety improvements, fatalities due to car accidents levelled off between 2005 and 2010.",exZh:"隨著交通安全的改善，由於車禍引起的死亡人數在 2005 至 2010 年間趨向平穩。",diff:3,unit:"P14L2"},
  {id:1451,word:"decrease",ph:"/dɪˈkriːs/",pos:"v.",en:"to become smaller or fewer",zh:"減少",ex:"The number of people walking to work decreased over the decade shown.",exZh:"在顯示的十年裡，走路上班的人數減少了。",diff:1,unit:"P14L2"},
  {id:1452,word:"decline",ph:"/dɪˈklaɪn/",pos:"v.",en:"to gradually decrease",zh:"下降",ex:"Learners of French and Spanish declined from 2000 while those of Chinese increased.",exZh:"法語和西班牙語的學習者從 2000 年開始下降，而中文的學習者增加。",diff:2,unit:"P14L2"},
  {id:1453,word:"go down",ph:"/ɡəʊ daʊn/",pos:"v.",en:"to decrease or fall",zh:"下降",ex:"Power generated by hydroelectric power went down in 1995.",exZh:"水力發電產生的電力於 1995 年開始下降。",diff:1,unit:"P14L2"},
  {id:1454,word:"plunge",ph:"/plʌndʒ/",pos:"v.",en:"to fall or drop sharply",zh:"急降",ex:"Spending on advertising in print media plunged sharply from 2010 as expenditure on online ads rose.",exZh:"當網路廣告的花費上升，印刷媒體的廣告花費從 2010 年開始急劇下降。",diff:3,unit:"P14L2"},

  // P14L3 變化與比較 Change Verbs & Comparisons
  {id:1455,word:"plummet",ph:"/ˈplʌmɪt/",pos:"v.",en:"to fall or drop steeply and rapidly",zh:"驟然下跌",ex:"The amount of time spent having conversations online rose at the expense of face-to-face talks which plummeted.",exZh:"花費在網路對話的時間量增加了，代價是面對面談話時間驟然下跌。",diff:4,unit:"P14L3"},
  {id:1456,word:"plunge",ph:"/plʌndʒ/",pos:"v.",en:"to decrease suddenly and dramatically",zh:"驟降",ex:"Spending on print advertisements plunged from a peak of $3 billion in 2000 to $1.6 billion by 2015.",exZh:"印刷廣告的花費從 2000 年的三十億美元高峰驟降到 2015 年的十六億美元。",diff:3,unit:"P14L3"},
  {id:1457,word:"surge",ph:"/sɜːdʒ/",pos:"v.",en:"to increase suddenly and greatly",zh:"激增",ex:"As car ownership numbers surge, emissions due to traffic soared.",exZh:"隨著汽車擁有量激增，由交通造成的排放量也暴升。",diff:3,unit:"P14L3"},
  {id:1458,word:"rocket",ph:"/ˈrɒkɪt/",pos:"v.",en:"to increase very rapidly",zh:"迅速上升",ex:"The average distance commuted to work rocketed between 1960 and 1990.",exZh:"1960 至 1990 年間，通勤上班的平均距離迅速上升。",diff:3,unit:"P14L3"},
  {id:1459,word:"peak",ph:"/piːk/",pos:"v.",en:"to reach the highest point",zh:"達到高峰",ex:"The working age population of Germany peaked at over 65% in 1993.",exZh:"德國的勞動年齡人口於 1993 年達到了 65% 以上的高峰。",diff:2,unit:"P14L3"},
  {id:1460,word:"compare with",ph:"/kəmˈpeə wɪð/",pos:"phrase",en:"to examine similarities and differences",zh:"和……相比",ex:"About half of females exercised compared with only a third of males.",exZh:"大約一半的女性會運動，相比男性只有三分之一。",diff:2,unit:"P14L3"},
  {id:1461,word:"in contrast with",ph:"/ɪn ˈkɒntrɑːst wɪð/",pos:"phrase",en:"as opposed to; in comparison",zh:"和……相比",ex:"In contrast with young people, the number of elderly over 65 is projected to double by 2040.",exZh:"和年輕人相比，六十五歲以上老年人人數到 2040 年預計將增加一倍。",diff:3,unit:"P14L3"},
  {id:1462,word:"on the contrary",ph:"/ɒn ðə ˈkɒntrəri/",pos:"phrase",en:"used to introduce a statement that is the opposite",zh:"相反地",ex:"On the contrary, the consumption of hamburgers had fallen rapidly from 1990 to 2000.",exZh:"相反地，漢堡的消費量從 1990 到 2000 年之間迅速下滑。",diff:3,unit:"P14L3"},
  {id:1463,word:"differentiate from",ph:"/ˌdiˈfərenʃieɪt frəm/",pos:"phrase",en:"to distinguish or show differences",zh:"和……有區別",ex:"While similar in 1900, popular pastimes had become differentiated from each other by 2000.",exZh:"雖然在 1900 年很相似，但到 2000 年，流行的娛樂已經彼此有所區別。",diff:4,unit:"P14L3"},
  {id:1464,word:"whereas",ph:"/weərˈæz/",pos:"conj.",en:"in contrast or comparison with the fact that",zh:"儘管",ex:"Whereas cycling was the most popular exercise in 2005, running had taken its place by 2015.",exZh:"儘管騎自行車在 2005 年是最受歡迎的運動，到 2015 年，跑步已經取而代之。",diff:3,unit:"P14L3"},
  {id:1465,word:"while",ph:"/hwaɪl/",pos:"conj.",en:"at the same time; although",zh:"而",ex:"After school courses increased in popularity while the attraction of after school clubs diminished.",exZh:"課外課程愈來愈受歡迎，而課外俱樂部的吸引力卻減弱了。",diff:1,unit:"P14L3"},
  {id:1466,word:"as",ph:"/æz/",pos:"conj.",en:"during the time that; while",zh:"隨著",ex:"Overall, as the population aged, the percentage using the Internet decreased significantly.",exZh:"整體而言，隨著人口老化，使用網路的百分比顯著下降。",diff:1,unit:"P14L3"},
  {id:1467,word:"seeing that",ph:"/ˈsiːɪŋ ðæt/",pos:"conj.",en:"because; since",zh:"由於",ex:"Seeing that cell phone uptake increased rapidly from 2005, it follows that Internet usage increased as a result.",exZh:"由於從 2005 年開始，手機的使用迅速增加，接著導致網路使用增加。",diff:3,unit:"P14L3"},

  // P14L4 比例與變化 Proportions & Changes
  {id:1468,word:"comprise",ph:"/kəmˈpraɪz/",pos:"v.",en:"to consist of; to make up",zh:"構成",ex:"Urdu speakers comprised the largest foreign language speaking group in the UK in 1999.",exZh:"在 1999 年，烏爾都語說話者構成了英國最大的外語口說團體。",diff:4,unit:"P14L4"},
  {id:1469,word:"take up",ph:"/teɪk ʌp/",pos:"v.",en:"to occupy a proportion of",zh:"佔",ex:"Boston's universities took up the highest number of graduates with 66% followed by New Jersey State with 45%.",exZh:"波士頓的大學佔畢業生人數最多，為 66%，其次是紐澤西州，為 45%。",diff:2,unit:"P14L4"},
  {id:1470,word:"account for",ph:"/əˈkaʊnt fɔː/",pos:"v.",en:"to constitute a specified proportion",zh:"佔",ex:"The iPhone brand accounted for almost two thirds of the smartphones used by British lawyers in both years.",exZh:"iPhone 品牌在這兩年間佔英國律師所使用智慧型手機的近三分之二。",diff:3,unit:"P14L4"},
  {id:1471,word:"constitute",ph:"/ˈkɒnstɪtjuːt/",pos:"v.",en:"to be a part of a whole",zh:"構成",ex:"Overall, for both years, oil and gas constituted the most important sources of energy in the USA.",exZh:"總體而言，在這兩年間，石油和瓦斯構成了美國最重要的能源來源。",diff:4,unit:"P14L4"},
  {id:1472,word:"transform",ph:"/trænsˈfɔːm/",pos:"v.",en:"to change completely in form",zh:"轉變",ex:"By 2009, the village golf course had been transformed into a large housing estate.",exZh:"到 2009 年，村莊的高爾夫球場已經變成一個大型住宅區。",diff:2,unit:"P14L4"},
  {id:1473,word:"reconstruct",ph:"/ˌriːkənˈstrʌkt/",pos:"v.",en:"to build or form again",zh:"重建",ex:"The gardens and manor house adjacent to Main Street were reconstructed as a retirement home in 1997.",exZh:"鄰近主街的花園和莊園宅第已於 1997 年重建成一間養老院。",diff:3,unit:"P14L4"},
  {id:1474,word:"convert",ph:"/kənˈvɜːt/",pos:"v.",en:"to change in form or function",zh:"改造",ex:"The village green was converted into a five-star hotel in 1976.",exZh:"村莊綠地於 1976 年改造成一間五星級旅館。",diff:2,unit:"P14L4"},
  {id:1475,word:"redevelopment",ph:"/ˌriːdɪˈveləpmənt/",pos:"n.",en:"the action of developing something again",zh:"改建",ex:"Overall, a lot of redevelopment took place in Winchester over a century.",exZh:"整體而言，超過一個世紀以來，溫徹斯特進行了許多改建。",diff:4,unit:"P14L4"},
  {id:1476,word:"enlarge",ph:"/ɪnˈlɑːdʒ/",pos:"v.",en:"to make or become bigger",zh:"擴大",ex:"In addition to enlarging the sports store, the clothing store and electronics outlet were also expanded.",exZh:"除了擴大體育用品店以外，服裝店和電子產品折價店也都拓展了。",diff:2,unit:"P14L4"},
  {id:1477,word:"extend",ph:"/ɪksˈtend/",pos:"v.",en:"to make larger or longer",zh:"擴大",ex:"The biggest change over the decade was that the department store was extended to add more retail space.",exZh:"十年來最大的改變是百貨公司擴大以增加更多零售空間。",diff:2,unit:"P14L4"},
  {id:1478,word:"halve",ph:"/hɑːv/",pos:"v.",en:"to reduce by half",zh:"減半",ex:"The proportion of spending on radio advertisements halved between 1996 and 2006.",exZh:"1996 至 2006 年間，廣播廣告的花費比例減半。",diff:3,unit:"P14L4"},
  {id:1479,word:"reduce",ph:"/rɪˈdjuːs/",pos:"v.",en:"to make smaller in amount or degree",zh:"減少",ex:"There is little research to prove that the death penalty reduces major crime.",exZh:"很少有研究證明死刑能夠減少重大犯罪。",diff:1,unit:"P14L4"},

  // P14L5 副詞 Adverbs
  {id:1480,word:"drastically",ph:"/ˈdræstɪkli/",pos:"adv.",en:"in a way that is likely to have a strong effect",zh:"急劇地",ex:"The amount of time spent playing video games increased drastically for the youngest age group.",exZh:"最年輕的年齡族群花費在打電動的時間量急劇增加。",diff:3,unit:"P14L5"},
  {id:1481,word:"sharply",ph:"/ˈʃɑːpli/",pos:"adv.",en:"quickly and suddenly",zh:"急劇地",ex:"Coal use in energy generation has fallen sharply over the last 50 years.",exZh:"能源生產中的煤炭使用在過去 50 年間已急劇下降。",diff:2,unit:"P14L5"},
  {id:1482,word:"steeply",ph:"/ˈstiːpli/",pos:"adv.",en:"at a sharp angle; dramatically",zh:"急劇地",ex:"Subway ridership is projected to continue rising steeply to 6 million by 2035.",exZh:"至 2035 年，地鐵乘客量預計將持續急劇上升至六百萬。",diff:3,unit:"P14L5"},
  {id:1483,word:"remarkably",ph:"/rɪˈmɑːkəbli/",pos:"adv.",en:"to a notable degree",zh:"顯著地",ex:"Expenditure on digital advertising rose remarkably for the first five years shown.",exZh:"數位廣告的花費在顯示的前五年顯著上升。",diff:3,unit:"P14L5"},
  {id:1484,word:"approximately",ph:"/əˈprɒksɪmətli/",pos:"adv.",en:"close to an exact amount",zh:"大約地",ex:"Electric car ownership increased by approximately 50,000 vehicles by 2016.",exZh:"至 2016 年，電動車擁有量大約增加了五萬輛。",diff:3,unit:"P14L5"},
  {id:1485,word:"almost",ph:"/ˈɔːlməʊst/",pos:"adv.",en:"very nearly",zh:"幾乎",ex:"Almost as many males as females attended night school.",exZh:"上夜間部的男性幾乎和女性一樣多。",diff:1,unit:"P14L5"},
  {id:1486,word:"nearly",ph:"/ˈnɪəli/",pos:"adv.",en:"almost but not quite",zh:"將近",ex:"Tourism figures to island A fell by nearly 200,000 from 2001 to 2011.",exZh:"從 2001 年至 2011 年，到 A 島旅遊的人數下降了將近二十萬。",diff:1,unit:"P14L5"},
  {id:1487,word:"roughly",ph:"/ˈrʌfli/",pos:"adv.",en:"approximately",zh:"大約",ex:"In roughly half of the occupations surveyed, women held fewer managerial positions than men.",exZh:"在大約一半受到調查的職業中，女性比男性擔任更少管理職務。",diff:2,unit:"P14L5"},
  {id:1488,word:"steadily",ph:"/ˈstedili/",pos:"adv.",en:"in a regular and even manner",zh:"穩定地",ex:"Use of the Internet declined steadily as people aged, accounting for just 5% of the oldest age bracket.",exZh:"隨著人們變老，網路使用穩定下降，最老年齡層的只佔了 5%。",diff:2,unit:"P14L5"},
  {id:1489,word:"moderately",ph:"/ˈmɒdərətli/",pos:"adv.",en:"to a medium extent",zh:"適度地",ex:"The number of people who chose to commute by tram rose moderately over the period.",exZh:"在此期間，選擇乘電車通勤的人數適度上升。",diff:3,unit:"P14L5"},
  {id:1490,word:"mildly",ph:"/ˈmaɪldli/",pos:"adv.",en:"slightly; to a small degree",zh:"略微地",ex:"Sales of mobile phones fell rapidly until 2005, then rose mildly over the next five years.",exZh:"手機銷售量迅下滑直到 2005 年，然後在接下來五年略微上升。",diff:2,unit:"P14L5"},
  {id:1491,word:"gradually",ph:"/ˈɡrædʒuəli/",pos:"adv.",en:"in a gradual way; slowly",zh:"逐漸地",ex:"Gradually, over time, the tadpole's body enlarges while its tail grows and small legs emerge.",exZh:"逐漸地隨著時間過去，螿蚪的身體變大，而其尾巴變長，小腳顯露出來。",diff:1,unit:"P14L5"},

  // P14L6 形容詞 Adjectives
  {id:1492,word:"vital",ph:"/ˈvaɪtl/",pos:"adj.",en:"absolutely necessary; essential",zh:"至關重要的",ex:"It is vital that the world pay attention to the spectre of climate change before it is too late.",exZh:"至關重要的是全世界在為時已晚之前要關注氣候變化的可怕。",diff:2,unit:"P14L6"},
  {id:1493,word:"crucial",ph:"/ˈkruːʃəl/",pos:"adj.",en:"of great importance",zh:"重要的",ex:"Even more crucial than exercise, is the need to follow a balanced diet.",exZh:"比運動更加重要的是遵循均衡飲食的要求。",diff:2,unit:"P14L6"},
  {id:1494,word:"indispensable",ph:"/ˌɪndɪsˈpensəbl/",pos:"adj.",en:"absolutely necessary",zh:"不可缺少的",ex:"Being able to write is still an indispensable skill even in today's digital age.",exZh:"即使在現今數位化的時代，能夠寫作仍是一項不可缺少的技能。",diff:4,unit:"P14L6"},
  {id:1495,word:"imperative",ph:"/ɪmˈperətɪv/",pos:"adj.",en:"of vital importance; crucial",zh:"必要的",ex:"It is imperative that tourism be introduced to an area in a carefully orchestrated way.",exZh:"旅遊業有必要以精心策劃的方式被引進一個地區。",diff:4,unit:"P14L6"},
  {id:1496,word:"beneficial",ph:"/ˌbenɪˈfɪʃəl/",pos:"adj.",en:"resulting in good; favourable",zh:"有益的",ex:"The increasing use of E-books is beneficial to the environment since it results in fewer trees cut down.",exZh:"電子書的增加使用對於環境是有益的，因為它可以減少樹木的砍伐。",diff:3,unit:"P14L6"},
  {id:1497,word:"profitable",ph:"/ˈprɒfɪtəbl/",pos:"adj.",en:"yielding profit or beneficial results",zh:"有利可圖的",ex:"The market for skin-whitening product is a profitable one in some parts of the world.",exZh:"在世界上的某些地方，美白產品的市場是有利可圖的。",diff:2,unit:"P14L6"},
  {id:1498,word:"helpful",ph:"/ˈhelpfəl/",pos:"adj.",en:"giving or ready to give help",zh:"有幫助的",ex:"Personal tuition is especially helpful to students since it can be personalised to suit a child's needs.",exZh:"個人指導對於學生特別有幫助，因為其可以個人化，以適合孩童需求。",diff:1,unit:"P14L6"},
  {id:1499,word:"useful",ph:"/ˈjuːsfəl/",pos:"adj.",en:"able to be used for a practical purpose",zh:"有用的",ex:"Teachers play an important role in raising children to be useful members of society.",exZh:"教師在培養孩子成為對社會有用的人才方面發揮著重要作用。",diff:1,unit:"P14L6"},
  {id:1500,word:"baneful",ph:"/ˈbeɪnfəl/",pos:"adj.",en:"harmful; destructive",zh:"有害的",ex:"Smoking advertisements can have a baneful effect on minors especially when placed near to schools.",exZh:"吸菸廣告對未成年人會有有害的影響，特別是當放置在學校附近時。",diff:5,unit:"P14L6"},
  {id:1501,word:"detrimental",ph:"/ˌdetrɪˈmentl/",pos:"adj.",en:"tending to cause harm",zh:"有害的",ex:"The effects of obesity may be detrimental to children's long-term mental and physical health.",exZh:"肥胖的影響可能有害於孩童長期的心理和生理健康。",diff:4,unit:"P14L6"},
  {id:1502,word:"harmful",ph:"/ˈhɑːmfəl/",pos:"adj.",en:"causing or likely to cause harm",zh:"有害的",ex:"For instance, seeing smoking or drinking advertisements may have a harmful effect on minors.",exZh:"例如，看到吸菸或飲酒廣告可能對未成年人造成有害影響。",diff:1,unit:"P14L6"},
  {id:1503,word:"adverse",ph:"/ˈædvɜːs/",pos:"adj.",en:"preventing success; harmful",zh:"不利的",ex:"Large crowds of tourists may have an adverse influence on the local way of life in some areas.",exZh:"大批觀光客可能會對一些地區的本地生活方式造成不利影響。",diff:4,unit:"P14L6"},

  // P14L7 開頭與確定 Introductions & Certainty
  {id:1504,word:"in modern society",ph:"/ɪn ˈmɒdən səˈsaɪəti/",pos:"phrase",en:"in the current era of civilization",zh:"在現代社會",ex:"Opponents of capital punishment believe it to be intolerable in modern society.",exZh:"死刑的反對者認為這在現代社會是無法容忍的。",diff:2,unit:"P14L7"},
  {id:1505,word:"It is a fact that",ph:"",pos:"phrase",en:"it is true that",zh:"事實是",ex:"It is a fact that most people prefer to watch big-budget foreign films over domestically produced ones.",exZh:"事實是與國產電影相比，大多數人更喜歡看高預算的外國電影。",diff:2,unit:"P14L7"},
  {id:1506,word:"The issue of...",ph:"",pos:"phrase",en:"the problem or topic of",zh:"……問題",ex:"The issue of traffic congestion is one that affects many large cities.",exZh:"交通擁擠是影響許多大城市的一個問題。",diff:2,unit:"P14L7"},
  {id:1507,word:"Nowadays",ph:"/ˈnaʊədeɪz/",pos:"adv.",en:"at the present time",zh:"現今",ex:"Nowadays, many employees are able to take advantage of flexible work schedules.",exZh:"現今，許多員工都能利用有彈性的工作時間表。",diff:1,unit:"P14L7"},
  {id:1508,word:"undoubted",ph:"/ʌnˈdaʊtɪd/",pos:"adj.",en:"not questioned or doubted",zh:"無庸置疑的",ex:"International cooperation on climate change is of undoubted importance to the planet's future.",exZh:"關於氣候變化的國際合作，對於地球的未來是無庸置疑的重要。",diff:3,unit:"P14L7"},
  {id:1509,word:"undeniable",ph:"/ˌʌndɪˈnaɪəbl/",pos:"adj.",en:"unable to be denied or disputed",zh:"不可否認的",ex:"It is undeniable that terrorism is a major issue that harms thousands of innocents worldwide.",exZh:"不可否認，恐怖主義是傷害全世界成千上萬無辞者的一大問題。",diff:4,unit:"P14L7"},
  {id:1510,word:"doubtless",ph:"/ˈdaʊtlɪs/",pos:"adv.",en:"without doubt; certainly",zh:"無疑的",ex:"Lower speed limits would doubtless result in safer roads for drivers and pedestrians.",exZh:"較低速限無疑的將使得駕駛和行人有更安全的道路。",diff:3,unit:"P14L7"},
  {id:1511,word:"unquestionable",ph:"/ʌnˈkwestʃənəbl/",pos:"adj.",en:"not able to be disputed or doubted",zh:"毫無疑問的",ex:"The potential of co-working spaces to revolutionise how people work is unquestionable.",exZh:"共享辦公空間徹底改變人們工作方式的潛力是毫無疑問的。",diff:4,unit:"P14L7"},
  {id:1512,word:"well-known",ph:"/ˈwelˈnəʊn/",pos:"adj.",en:"known widely",zh:"眾所皆知的",ex:"Learning a second language is now well-known to have positive effects on mental acuity.",exZh:"現今眾所皆知的是，學習第二語言對智力敏銳度有正面影響。",diff:2,unit:"P14L7"},
  {id:1513,word:"widely recognised",ph:"/ˈwaɪdli ˈrekəɡnaɪzd/",pos:"phrase",en:"acknowledged by many people",zh:"普遍公認的",ex:"It is widely recognised that spending too much time looking at computer screens is bad for the eyes.",exZh:"普遍公認，花太多時間看電腦螢幕對眼睛有害。",diff:3,unit:"P14L7"},
  {id:1514,word:"commonly accepted",ph:"/ˈkɒmənli əkˈseptɪd/",pos:"phrase",en:"generally agreed upon",zh:"普遍接受的",ex:"It is now commonly accepted that climate change is a reality.",exZh:"人們現在普遍接受氣候變化是一個事實。",diff:2,unit:"P14L7"},
  {id:1515,word:"generally acknowledged",ph:"/ˈdʒenərəli əkˈnɒlɪdʒd/",pos:"phrase",en:"widely accepted as true",zh:"公認的",ex:"Electric vehicles are generally acknowledged as the future of transportation.",exZh:"電動汽車被公認是運輸工具的未來。",diff:3,unit:"P14L7"},

  // P14L8 論點與觀點 Arguments & Opinions
  {id:1516,word:"claim",ph:"/kleɪm/",pos:"v.",en:"to assert something as a fact",zh:"聲稱",ex:"Some claim that genetic engineering may threaten all life on earth.",exZh:"一些人聲稱基因工程可能會威脅地球上的所有生命。",diff:2,unit:"P14L8"},
  {id:1517,word:"believe",ph:"/bɪˈliːv/",pos:"v.",en:"to accept as true",zh:"相信",ex:"I believe there are several benefits to increased automation in manufacturing.",exZh:"我相信在製造業提升自動化有一些好處。",diff:1,unit:"P14L8"},
  {id:1518,word:"consider",ph:"/kənˈsɪdə/",pos:"v.",en:"to think carefully about",zh:"認為",ex:"Many people consider taking a year away from studying after high school to have several key benefits.",exZh:"許多人認為高中畢業後休學一年有一些重要的好處。",diff:1,unit:"P14L8"},
  {id:1519,word:"maintain",ph:"/meɪnˈteɪn/",pos:"v.",en:"to state something strongly as true",zh:"主張",ex:"Opponents of the death penalty maintain that the drawbacks outweigh the benefits.",exZh:"死刑的反對者主張死刑弊大於利。",diff:2,unit:"P14L8"},
  {id:1520,word:"first of all",ph:"/fɜːst əv ɔːl/",pos:"phrase",en:"before anything else",zh:"首先",ex:"First of all, learning a foreign tongue while in primary school allows children time to master a language.",exZh:"首先，在小學學習一門外語讓孩童有時間精通一門語言。",diff:1,unit:"P14L8"},
  {id:1521,word:"subsequently",ph:"/ˈsʌbsɪkwəntli/",pos:"adv.",en:"after a particular thing has happened",zh:"隨後",ex:"This subsequently gives them more confidence in their ability to learn other languages when older.",exZh:"隨後，這讓他們在長大後對學習其他語言的能力更有信心。",diff:3,unit:"P14L8"},
  {id:1522,word:"moreover",ph:"/mɔːrˈəʊvə/",pos:"adv.",en:"in addition; besides",zh:"此外",ex:"Moreover, children learn much faster while they are young, particularly under seven years old.",exZh:"此外，孩童在年幼時學習速度更快，特別是在七歲以下。",diff:2,unit:"P14L8"},
  {id:1523,word:"last",ph:"/lɑːst/",pos:"adv.",en:"finally; at the end",zh:"最後",ex:"Last, learning another language improves children's competency in key subjects like maths.",exZh:"最後，學習另一種語言可以提升孩童對於數學等關鍵學科的能力。",diff:1,unit:"P14L8"},
  {id:1524,word:"opinion",ph:"/əˈpɪnjən/",pos:"n.",en:"a personal view or judgement",zh:"看法",ex:"In my opinion, people must be careful about the news they read, and not take anything for granted.",exZh:"照我的看法，人們對於所閱讀的新聞必須謹慎，不要視一切為理所當然。",diff:1,unit:"P14L8"},
  {id:1525,word:"perspective",ph:"/pəˈspektɪv/",pos:"n.",en:"a particular way of regarding something",zh:"觀點",ex:"From my perspective, investing poorly in a nation's roads may hurt its economy in the long run.",exZh:"從我的角度來看，對於一個國家道路投資不足，長遠來看可能會傷害其經濟。",diff:3,unit:"P14L8"},
  {id:1526,word:"standpoint",ph:"/ˈstændpɔɪnt/",pos:"n.",en:"an attitude or point of view",zh:"觀點",ex:"From my standpoint, much of the news given today is overtly negative.",exZh:"從我的觀點來看，現今大部分提供的新聞明顯是負面的。",diff:3,unit:"P14L8"},
  {id:1527,word:"perception",ph:"/pəˈsepʃən/",pos:"n.",en:"the way something is regarded or understood",zh:"看法",ex:"Some people have the perception that chief executive officers (CEOs) should have limits imposed on their salaries.",exZh:"有些人有這樣的看法，認為執行長應該對他們的薪水加以限制。",diff:3,unit:"P14L8"},

  // P14L9 同意反對舉例 Agreement, Disagreement & Examples
  {id:1528,word:"in favour of",ph:"/ɪn ˈfeɪvər ɒv/",pos:"phrase",en:"in support of",zh:"贊成",ex:"In my opinion most people are in favour of gun control.",exZh:"在我看來，大多數人都贊成槍枝管制。",diff:2,unit:"P14L9"},
  {id:1529,word:"give approval",ph:"/ɡɪv əˈpruːvəl/",pos:"phrase",en:"to express agreement or consent",zh:"贊成",ex:"More people than ever before are giving their approval towards the legalisation of gay marriage.",exZh:"比以往更多的人贊成同性婚姻合法化。",diff:2,unit:"P14L9"},
  {id:1530,word:"in total agreement",ph:"/ɪn ˈtəʊtl əˈɡriːmənt/",pos:"phrase",en:"completely in accord",zh:"完全同意",ex:"Personally I am in total agreement with the statement that all firearms should be made illegal.",exZh:"我個人完全同意所有槍枝都應被設定為非法的說法。",diff:2,unit:"P14L9"},
  {id:1531,word:"advocate",ph:"/ˈædvəkeɪt/",pos:"v.",en:"to publicly recommend or support",zh:"提倡",ex:"Those who advocate for universal healthcare state that good health is a human right, not a choice.",exZh:"那些提倡全民醫療保健的人表示，良好的健康是一項人權，而不是一種選擇。",diff:3,unit:"P14L9"},
  {id:1532,word:"oppose",ph:"/əˈpəʊz/",pos:"v.",en:"to disagree with or resist",zh:"反對",ex:"The majority of the public opposes using animals for scientific research.",exZh:"公眾大多數反對利用動物作科學研究。",diff:2,unit:"P14L9"},
  {id:1533,word:"argue against",ph:"/ˈɑːɡjuː əˈɡenst/",pos:"phrase",en:"to give reasons against",zh:"反對",ex:"Most argue against giving tax breaks to the very wealthy in society.",exZh:"大部分的人反對給社會上非常富有的人減稅。",diff:2,unit:"P14L9"},
  {id:1534,word:"object to",ph:"/əbˈdʒekt tə/",pos:"phrase",en:"to express disapproval of",zh:"反對",ex:"I personally object to hunting on the grounds that it is unethical.",exZh:"我個人反對打獵，理由是這不道德。",diff:2,unit:"P14L9"},
  {id:1535,word:"in total disagreement",ph:"/ɪn ˈtəʊtl dɪsəˈɡriːmənt/",pos:"phrase",en:"completely opposed",zh:"完全不同意",ex:"I am in total disagreement with the statement that euthanasia is morally acceptable.",exZh:"我完全不同意安樂死在道德上可被接受的這項說法。",diff:3,unit:"P14L9"},
  {id:1536,word:"such as",ph:"/sʌtʃ əz/",pos:"phrase",en:"for example",zh:"像",ex:"Exams are usually given using a variety of question types such as multiple choice or essay questions.",exZh:"考試通常使用多種題型進行，像是多選題或作文題。",diff:1,unit:"P14L9"},
  {id:1537,word:"for instance",ph:"/fɔːr ˈɪnstəns/",pos:"phrase",en:"as an example",zh:"例如",ex:"For instance, for those with dementia, nursing homes provide 24-hour care.",exZh:"例如，對於患有失智症的人，療養院提供二十四小時的照顧。",diff:1,unit:"P14L9"},
  {id:1538,word:"namely",ph:"/ˈneɪmli/",pos:"adv.",en:"that is to say; specifically",zh:"即",ex:"Employers highly regard 21st Century skills, namely collaboration, creativity and communication.",exZh:"雇主高度重視二十一世紀的技能，即合作、創造力和溝通。",diff:2,unit:"P14L9"},
  {id:1539,word:"to illustrate",ph:"/tə ˈɪləstreɪt/",pos:"phrase",en:"to give an example to explain",zh:"舉例說明",ex:"To illustrate, in some states in the USA, strict punishments for minor offenses reduced crime levels overall.",exZh:"舉例說明，在一些國家，對於輕罪的嚴格懲罰降低了整體犯罪的數量。",diff:2,unit:"P14L9"},

  // P14L10 連接與總結 Connectors & Conclusions
  {id:1540,word:"however",ph:"/haʊˈevə/",pos:"adv.",en:"used to introduce a contrasting statement",zh:"然而",ex:"However, with age, people soon discover that wealth accumulation is a hollow accomplishment.",exZh:"然而，隨著年齡增長，人們很快發現財富的累積是一項空虛的成就。",diff:2,unit:"P14L10"},
  {id:1541,word:"yet",ph:"/jet/",pos:"conj.",en:"but at the same time; nevertheless",zh:"然而",ex:"Convenience food may be a boon to busy families, yet its consumption can be damaging to health.",exZh:"便利食品對忙碌的家庭可能是個好處，然而其食用會有害健康。",diff:2,unit:"P14L10"},
  {id:1542,word:"nevertheless",ph:"/ˌnevəðəˈles/",pos:"adv.",en:"in spite of that; however",zh:"然而",ex:"Nevertheless, while electric cars are becoming more popular, sales figures are still very low.",exZh:"然而，雖然電動車愈來愈受歡迎，但銷售數字仍很低。",diff:3,unit:"P14L10"},
  {id:1543,word:"even though",ph:"/ˈiːvən ðəʊ/",pos:"conj.",en:"despite the fact that",zh:"即使",ex:"Even though a year out allows students to save money, it may also lead to greater debt.",exZh:"即使高中畢業後有一年空檔會讓學生可以省錢，但也可能導致更大的債務。",diff:2,unit:"P14L10"},
  {id:1544,word:"as a result",ph:"/əz ə rɪˈzʌlt/",pos:"phrase",en:"consequently; therefore",zh:"因此",ex:"Underfunded bus services are not extensive enough for most people who must drive as a result.",exZh:"資金不足的公車服務範圍不夠廣泛，因此大多數的人必須開車。",diff:2,unit:"P14L10"},
  {id:1545,word:"by reason of",ph:"/baɪ ˈriːzən ɒv/",pos:"phrase",en:"because of",zh:"由於",ex:"By reason of its severity, capital punishment makes people think twice before committing crimes.",exZh:"由於其嚴重性，死刑讓人們在犯罪前會三思而後行。",diff:3,unit:"P14L10"},
  {id:1546,word:"therefore",ph:"/ˈðeəfɔː/",pos:"adv.",en:"for that reason; consequently",zh:"因此",ex:"All students need individual attention; therefore, teachers should design lessons carefully.",exZh:"所有學生都需要個別關注；因此，老師應該謹慎設計課程。",diff:2,unit:"P14L10"},
  {id:1547,word:"in brief",ph:"/ɪn briːf/",pos:"phrase",en:"in a few words; in short",zh:"簡言之",ex:"In brief, I believe it is better for teenagers to study rather than have a part-time job.",exZh:"簡言之，我相信青少年最好是讀書而不是有兼職工作。",diff:2,unit:"P14L10"},
  {id:1548,word:"in short",ph:"/ɪn ʃɔːt/",pos:"phrase",en:"briefly; to summarize",zh:"總之",ex:"In short, countries with a highly-skilled workforce, increase the standard of living for their citizens.",exZh:"總之，有高技能勞動力的國家提升了公民生活水準。",diff:2,unit:"P14L10"},
  {id:1549,word:"on the whole",ph:"/ɒn ðə həʊl/",pos:"phrase",en:"in general; all things considered",zh:"大致上",ex:"On the whole, spending on infrastructure not only improves the well-being of citizens but also a nation's economy.",exZh:"大致上，在基礎設施上的花費不僅提升了公民福利，也提升了一個國家的經濟。",diff:2,unit:"P14L10"},
  {id:1550,word:"as mentioned above",ph:"/əz ˈmenʃənd əˈbʌv/",pos:"phrase",en:"as stated previously",zh:"如上所述",ex:"As mentioned above, it seems that the world is taking positive steps to eventually tackle climate change.",exZh:"如上所述，世界似乎正在採取積極步驟，以期最終能解決氣候變化問題。",diff:2,unit:"P14L10"},

  // ── EXT 延伸學習 Extended Vocabulary ──────────────────
  // EXTL1 人與成長環境 People and Growing Environment
  {id:1551,word:"inherit",ph:"/ɪnˈherɪt/",pos:"v.",en:"to receive a quality or characteristic from parents",zh:"經遺傳而得",ex:"One school of thought claims that intelligence is inherited, while another states it can be learned.",exZh:"一種思想學派主張智力經遺傳而得，而另一派則主張可以由學習而得。",diff:3,unit:"EXTL1"},
  {id:1552,word:"foster",ph:"/ˈfɒstə/",pos:"v.",en:"to encourage the development of",zh:"培養",ex:"The game fosters a child's creativity while developing their imagination and emotional maturity.",exZh:"這個遊戲培養孩子的創造力，同時也發展他們的想像力與情感成熟度。",diff:3,unit:"EXTL1"},
  {id:1553,word:"expand",ph:"/ɪksˈpænd/",pos:"v.",en:"to become or make larger",zh:"擴大",ex:"The amount of low-cost housing needs to be expanded in modern cities due to increasing immigration rates.",exZh:"在現代城市的低成本住宅數量需要被擴大是由於一直上升的移民率。",diff:2,unit:"EXTL1"},
  {id:1554,word:"mediate",ph:"/ˈmiːdieɪt/",pos:"v.",en:"to intervene to resolve a dispute",zh:"調解",ex:"Teachers are often ill-prepared to mediate sudden conflicts that quickly erupt in the classroom.",exZh:"老師們通常沒有做好準備去調解在班上迅速爆發的意外衝突。",diff:4,unit:"EXTL1"},
  {id:1555,word:"conceal",ph:"/kənˈsiːl/",pos:"v.",en:"to keep from being seen; to hide",zh:"隱藏",ex:"Social media websites like Facebook, often highlight a person's life while concealing a more mundane reality.",exZh:"像 Facebook 這樣的社群網站通常突顯一個人的生活，同時隱藏一個更為平凡的真實生活。",diff:3,unit:"EXTL1"},
  {id:1556,word:"mature",ph:"/məˈtjʊə/",pos:"adj.",en:"fully grown or developed",zh:"成熟的",ex:"As children become more mature, parents typically take a more supporting role in their offspring's lives.",exZh:"隨著孩子們愈來愈成熟，父母通常會在子女的生活中扮演更具支持性的角色。",diff:2,unit:"EXTL1"},
  {id:1557,word:"close-knit",ph:"/ˈkləʊsˈnɪt/",pos:"adj.",en:"closely united by social or family ties",zh:"關係緊密的",ex:"Many young families dream of living in a close-knit community where everyone knows each other well.",exZh:"許多年輕的家庭夢想生活在一個關係緊密的社區中，在這裡人人都熟悉彼此。",diff:3,unit:"EXTL1"},
  {id:1558,word:"adequate",ph:"/ˈædɪkwɪt/",pos:"adj.",en:"sufficient for a specific need",zh:"足夠的",ex:"Some countries plan to build new towns to provide an adequate supply of housing for their growing populations.",exZh:"一些國家計劃建設新城鎮為其日益增加的人口提供足夠的住宅供應。",diff:2,unit:"EXTL1"},
  {id:1559,word:"companionate",ph:"/kəmˈpænjənɪt/",pos:"adj.",en:"relating to companionship",zh:"陪伴的",ex:"These days, people rely not only on blood relatives but also on companionate partners to support them through bad times.",exZh:"如今，人們不僅仅依賴血親，也可能是伴侶來支撐他們度過難關。",diff:5,unit:"EXTL1"},
  {id:1560,word:"prominent",ph:"/ˈprɒmɪnənt/",pos:"adj.",en:"important; famous",zh:"重要的",ex:"Throughout life, parents play a prominent role in the lives of their offspring, especially in the early stages.",exZh:"在整個人生中，父母在子女生活中扮演著重要的角色，特別是早期階段。",diff:3,unit:"EXTL1"},
  {id:1561,word:"misleading",ph:"/mɪsˈliːdɪŋ/",pos:"adj.",en:"giving the wrong idea or impression",zh:"誤導的",ex:"The prevalence of celebrities in today's media may give children a misleading impression of adulthood.",exZh:"現今媒體上的名人盛行可能會給孩子一種對於成年人的誤導印象。",diff:2,unit:"EXTL1"},
  {id:1562,word:"innermost",ph:"/ˈɪnəməʊst/",pos:"adj.",en:"closest to the centre; deepest",zh:"內心深處的",ex:"Only when truly close to someone, do you begin to learn their innermost thoughts and feelings.",exZh:"只有在真正親近某人的時候，你才能開始瞭解他們內心深處的想法和感受。",diff:3,unit:"EXTL1"},
  {id:1563,word:"infancy",ph:"/ˈɪnfənsi/",pos:"n.",en:"the earliest period of childhood",zh:"嘰兒期",ex:"During infancy, a child is fully dependent on its mother for all its physical needs.",exZh:"在嘰兒期，小孩完全依賴其母親滿足所有身體需求。",diff:3,unit:"EXTL1"},
  {id:1564,word:"studio apartment",ph:"/ˈstjuːdiəʊ əˈpɑːtmənt/",pos:"n.",en:"a small apartment with one main room",zh:"單房公寓",ex:"For students facing financial difficulties, sharing a studio apartment is the best choice of accommodation.",exZh:"對面臨財務困難的學生，共租一間單房公寓是最好的住宿選擇。",diff:3,unit:"EXTL1"},
  {id:1565,word:"descendent",ph:"/dɪˈsendənt/",pos:"n.",en:"a person descended from a particular ancestor",zh:"後代",ex:"Mankind should care for the planet now so that our descendants may enjoy it in the future.",exZh:"人類現在應該關心這個星球，好讓我們的後代將來可以享有它。",diff:3,unit:"EXTL1"},
  {id:1566,word:"mediator",ph:"/ˈmiːdieɪtə/",pos:"n.",en:"a person who mediates between parties",zh:"調解者",ex:"When encountering marital trouble, a mediator may be necessary to help both parties find common ground.",exZh:"當遇到婚姻糾紛時，可能需要調解者來幫助雙方找到共識。",diff:4,unit:"EXTL1"},
  {id:1567,word:"ego",ph:"/ˈiːɡəʊ/",pos:"n.",en:"a person's sense of self-importance",zh:"自我中心",ex:"In teamwork, team members must focus on working together and forget their individual egos.",exZh:"在團隊合作中，隊員必須專注在共同合作，並且忘記個人的自我中心。",diff:3,unit:"EXTL1"},
  {id:1568,word:"gentle soul",ph:"/ˈdʒentl səʊl/",pos:"n.",en:"a kind and mild-mannered person",zh:"溫柔的人",ex:"As far as she was concerned, her mother was the epitome of the gentle soul.",exZh:"就她而言，她的母親是溫柔之人的典範。",diff:3,unit:"EXTL1"},
  {id:1569,word:"pride",ph:"/praɪd/",pos:"n.",en:"a feeling of deep satisfaction from achievements",zh:"得意",ex:"Drawing provides young children with a way to express complex feelings like pride or jealousy.",exZh:"繪畫為年輕孩童提供了一種表達複雜情感的方式，例如得意或嫉妒。",diff:2,unit:"EXTL1"},

  // EXTL2 學生與教育 Student and Education
  {id:1570,word:"matriculate",ph:"/məˈtrɪkjʊleɪt/",pos:"v.",en:"to enrol at a college or university",zh:"錄取",ex:"Students from well-off families tend to matriculate to better schools than those from poor homes.",exZh:"來自富裕家庭的學生往往比來自貧困家庭的學生更能錄取較好的學校。",diff:5,unit:"EXTL2"},
  {id:1571,word:"reimburse",ph:"/ˌriːɪmˈbɜːs/",pos:"v.",en:"to repay money spent",zh:"償還",ex:"With not enough students attending teaching courses at college, governments could increase attendance by reimbursing student tuition fees.",exZh:"由於沒有足夠的學生參加大學教學課程，政府可以藉由補償學生學費來增加出席率。",diff:4,unit:"EXTL2"},
  {id:1572,word:"evaluate",ph:"/ɪˈvæljueɪt/",pos:"v.",en:"to assess the value or quality of",zh:"評估",ex:"In most British schools, teachers use a variety of methods to evaluate a student's learning progress.",exZh:"在大多數的英國學校，教師們使用各種方法來評估學生的學習進度。",diff:3,unit:"EXTL2"},
  {id:1573,word:"recognise",ph:"/ˈrekəɡnaɪz/",pos:"v.",en:"to acknowledge the existence or validity of",zh:"承認",ex:"Teaching learners to recognise their mistakes when they make them helps them improve much more quickly.",exZh:"教導學習者在犯錯時承認自己的錯誤，有助於他們更快速改進。",diff:2,unit:"EXTL2"},
  {id:1574,word:"specialise",ph:"/ˈspeʃəlaɪz/",pos:"v.",en:"to concentrate on a particular subject",zh:"專攻",ex:"Vocational degrees that specialise in an occupational subject allow students to quickly start work after graduation.",exZh:"專攻某一職業學科的職業學位讓學生在畢業後能夠快速開始工作。",diff:3,unit:"EXTL2"},
  {id:1575,word:"distinctive",ph:"/dɪˈstɪŋktɪv/",pos:"adj.",en:"characteristic of one person or thing",zh:"獨特的",ex:"There is a distinctive trend in the number of female students choosing art degrees over science degrees.",exZh:"女性學生選擇藝術學位而非理科學位的數量呈現出一種獨特的趨勢。",diff:3,unit:"EXTL2"},
  {id:1576,word:"approximate",ph:"/əˈprɒksɪmɪt/",pos:"adj.",en:"close to the actual but not exact",zh:"粗略的",ex:"Students with merely an approximate idea of what they wish to study should carefully consider their degree choice.",exZh:"對於希望研習的內容僅有粗略想法的學生應該仔細考慮他們的學位選擇。",diff:3,unit:"EXTL2"},
  {id:1577,word:"joint",ph:"/dʒɔɪnt/",pos:"adj.",en:"shared or done by two or more",zh:"聯合的",ex:"One way to increase student interest on courses may be to hold joint lectures between two departments.",exZh:"提高學生對課程興趣的一個方法可以是在兩個科系間舉辦聯合講座。",diff:2,unit:"EXTL2"},
  {id:1578,word:"descriptive",ph:"/dɪˈskrɪptɪv/",pos:"adj.",en:"serving to describe",zh:"描述性的",ex:"Although marking students' writing is subjective, many teachers typically fail to give sufficient descriptive details in their corrections.",exZh:"雖然給學生的寫作評分是主觀的，但許多教師在他們的批改中通常沒有給學生足夠的描述性細節。",diff:3,unit:"EXTL2"},
  {id:1579,word:"mock",ph:"/mɒk/",pos:"adj.",en:"not authentic; simulated",zh:"模擬的",ex:"Having mock exams enables students to prepare better for real tests by identifying individual strengths and weaknesses.",exZh:"參加模擬考試可以幫助學生透過找出自己的優缺點，更充分地準備真正的考試。",diff:2,unit:"EXTL2"},
  {id:1580,word:"conventional",ph:"/kənˈvenʃənl/",pos:"adj.",en:"based on traditional forms",zh:"傳統的",ex:"Conventional learning styles are already rapidly changing driven by new technologies such as augmented and virtual reality.",exZh:"傳統的學習方式在擴增和虛擬實境等新科技的推動下，已經在迅速改變。",diff:2,unit:"EXTL2"},
  {id:1581,word:"advanced",ph:"/ədˈvɑːnst/",pos:"adj.",en:"at a higher level",zh:"高等的",ex:"More employers are seeking graduates with an advanced degree like a master's in addition to a bachelor's degree.",exZh:"除了學士學位外，更多雇主正在尋找擁有像碩士學位等高等學位的畢業生。",diff:2,unit:"EXTL2"},
  {id:1582,word:"valedictorian",ph:"/ˌvælɪdɪkˈtɔːriən/",pos:"n.",en:"the student with the highest academic standing",zh:"致告別辭的學生代表",ex:"Being valedictorian is the highest honour for any pupil who puts their academic performance first.",exZh:"對於任何把學術成績放在首位的學生來說，成為致告別辭的學生代表是最高榮譽。",diff:5,unit:"EXTL2"},
  {id:1583,word:"grant",ph:"/ɡrɑːnt/",pos:"n.",en:"a sum of money given for a specific purpose",zh:"助學金",ex:"Whereas scholarships are merit-based, grants are often calculated based on the need of the applicant.",exZh:"獎學金是以成績為基礎，而助學金通常是根據申請人的需要而計算的。",diff:3,unit:"EXTL2"},
  {id:1584,word:"preference",ph:"/ˈprefərəns/",pos:"n.",en:"a greater liking for one over another",zh:"偏好",ex:"Whereas a clear proportion of men prefer science-based subjects, women show a preference for the Humanities.",exZh:"有明顯比例的男性更喜歡以科學為基礎的學科，而女性則表現出對人文學科的偏好。",diff:2,unit:"EXTL2"},
  {id:1585,word:"correspondence",ph:"/ˌkɒrɪˈspɒndəns/",pos:"n.",en:"communication by exchanging letters or emails",zh:"通信",ex:"Correspondence learning affords students the opportunity and flexibility to study away from school at their own pace.",exZh:"函授學習提供學生機會與彈性，以按照自己的進度在學校以外學習。",diff:4,unit:"EXTL2"},
  {id:1586,word:"diploma",ph:"/dɪˈpləʊmə/",pos:"n.",en:"a certificate awarded for completing a course",zh:"文憑",ex:"Diplomas are more suitable for professional development than a full-time degree since they require less time to complete.",exZh:"文憑比全日制學位更適合專業發展，因為它們需要完成的時間較少。",diff:3,unit:"EXTL2"},

  // EXTL3 工作 Work
  {id:1587,word:"possess",ph:"/pəˈzes/",pos:"v.",en:"to have or own",zh:"具有",ex:"HR professionals should possess multiple skills to deal with the ever-changing dynamics of the modern workplace.",exZh:"人力資源專業人員應具備多種技能，以應付現代職場不斷改變的變革動力。",diff:2,unit:"EXTL3"},
  {id:1588,word:"file",ph:"/faɪl/",pos:"v.",en:"to submit a formal document",zh:"提出",ex:"Whenever workers feel they have been wronged, they may file a complaint with their union representative.",exZh:"每當員工感覺自己受到委屈時，他們可以向工會代表提出申訴。",diff:2,unit:"EXTL3"},
  {id:1589,word:"compromise",ph:"/ˈkɒmprəmaɪz/",pos:"v.",en:"to weaken or damage",zh:"損害",ex:"Companies should never force workers to compromise their health in return for a few extra dollars.",exZh:"公司絕不應該強迫勞工為了多賺幾塊錢而損害他們的健康。",diff:3,unit:"EXTL3"},
  {id:1590,word:"strengthen",ph:"/ˈstreŋθən/",pos:"v.",en:"to make or become stronger",zh:"加強",ex:"A positive attitude at work strengthens connections with co-workers and creates a progressive work environment.",exZh:"工作上的積極態度強化了與同事的聯繫，並創造一個進步的工作環境。",diff:2,unit:"EXTL3"},
  {id:1591,word:"generate",ph:"/ˈdʒenəreɪt/",pos:"v.",en:"to produce or create",zh:"產生",ex:"Clear lines of communication between management and workers generate trust and goodwill.",exZh:"管理階層和勞工之間清晰的溝通管道可以產生信任和善意。",diff:2,unit:"EXTL3"},
  {id:1592,word:"dismiss",ph:"/dɪsˈmɪs/",pos:"v.",en:"to refuse to consider; to disregard",zh:"不考慮",ex:"Another drawback of meetings is that many participants feel their ideas are easily dismissed.",exZh:"會議的另一個缺點是許多參與者覺得他們的想法容易被忽略。",diff:2,unit:"EXTL3"},
  {id:1593,word:"retail",ph:"/ˈriːteɪl/",pos:"adj.",en:"relating to the sale of goods to the public",zh:"零售的",ex:"The retail sector is currently undergoing hard times due to a shift in shopping habits online.",exZh:"由於網上購物習慣的轉變，零售業現在正遭達困難時期。",diff:2,unit:"EXTL3"},
  {id:1594,word:"overall",ph:"/ˈəʊvərɔːl/",pos:"adj.",en:"including everything; total",zh:"整體的",ex:"Those employees who experience overall job satisfaction and personal growth will remain with a company the longest.",exZh:"那些經歷了整體工作滿意度和個人成長的員工將留在公司最久。",diff:1,unit:"EXTL3"},
  {id:1595,word:"confidential",ph:"/ˌkɒnfɪˈdenʃəl/",pos:"adj.",en:"intended to be kept secret",zh:"機密的",ex:"Negotiations between union members and company management are typically kept confidential until matters are finalised.",exZh:"工會成員和公司管理階層之間的協商通常會保密，直到問題最終定案。",diff:3,unit:"EXTL3"},
  {id:1596,word:"gainful",ph:"/ˈɡeɪnfəl/",pos:"adj.",en:"serving to increase wealth; profitable",zh:"有報酬的",ex:"All workers should have gainful employment in which employees receive steady work and payment from an employer.",exZh:"所有勞工都應從事有報酬的工作，屬員可從中得到穩定的工作和雇主的報酬。",diff:4,unit:"EXTL3"},
  {id:1597,word:"motivational",ph:"/ˌməʊtɪˈveɪʃənəl/",pos:"adj.",en:"providing encouragement or inspiration",zh:"激勵的",ex:"There is a difference between motivational high value activities like strategic planning and demotivating ones like micromanaging.",exZh:"激勵型高價值活動如戰略規劃以及使士氣低落的活動如微觀管理之間有差異性。",diff:4,unit:"EXTL3"},
  {id:1598,word:"essential",ph:"/ɪˈsenʃəl/",pos:"adj.",en:"absolutely necessary; indispensable",zh:"必要的",ex:"While some people view meetings as essential at work, others view them as a waste of time.",exZh:"雖然有些人認為會議在工作中是必要的，但有些人認為是浪費時間。",diff:2,unit:"EXTL3"},
  {id:1599,word:"conglomerate",ph:"/kənˈɡlɒmərɪt/",pos:"n.",en:"a large corporation formed by merging firms",zh:"企業集團",ex:"Working for a large conglomerate can make workers feel more like a number than an individual.",exZh:"為大型企業集團工作會讓員工感覺更像一個群體，而非一個個體。",diff:5,unit:"EXTL3"},
  {id:1600,word:"personnel",ph:"/ˌpɜːsəˈnel/",pos:"n.",en:"people employed in an organization",zh:"全體人員",ex:"In order for a company to remain competitive, ongoing professional development is crucial for all its personnel.",exZh:"為了使公司保持競爭力，持續的專業發展對全體人員都至關重要。",diff:3,unit:"EXTL3"},
  {id:1601,word:"beneficiary",ph:"/ˌbenɪˈfɪʃəri/",pos:"n.",en:"a person who benefits from something",zh:"受益者",ex:"Even when a company records high profits, executives are the main beneficiaries and not the employees.",exZh:"即使一間公司有很高的利潤，高級官員是主要受益者，而非員工。",diff:4,unit:"EXTL3"},
  {id:1602,word:"compensation",ph:"/ˌkɒmpenˈseɪʃən/",pos:"n.",en:"something given to make up for loss or injury",zh:"賠償",ex:"If a worker is injured through a job-related incident, he or she is entitled to compensation.",exZh:"如果勞工因為與工作相關的事件而受傷，他或她有權獲得賠償。",diff:3,unit:"EXTL3"},
  {id:1603,word:"professionalism",ph:"/prəˈfeʃənəlɪzəm/",pos:"n.",en:"the competence or skill expected of a professional",zh:"專業精神",ex:"When dealing with customers and each other, both management and employees must demonstrate professionalism at all times.",exZh:"在與客戶以及彼此之間打交道時，管理階層和員工必須始終展現出專業精神。",diff:4,unit:"EXTL3"},
  {id:1604,word:"career",ph:"/kəˈrɪə/",pos:"n.",en:"an occupation undertaken for a significant period",zh:"職業",ex:"A lack of career advancement after training is an area of concern to both management and employees.",exZh:"培訓之後缺乏職業發展是管理階層和員工共同關心的一個面向。",diff:2,unit:"EXTL3"},
  {id:1605,word:"registration",ph:"/ˌredʒɪˈstreɪʃən/",pos:"n.",en:"the action of registering",zh:"註冊",ex:"For larger conferences, organisers give participants the option of attending by requiring registration before arrival.",exZh:"對於大型會議，召集者要求在到達前註冊，讓參與會者有參加的選擇。",diff:3,unit:"EXTL3"},

  // EXTL4 旅遊休閒娛樂 Travel, Leisure and Entertainment
  {id:1606,word:"deport",ph:"/dɪˈpɔːt/",pos:"v.",en:"to expel a foreigner from a country",zh:"驅逐出境",ex:"Independent travellers who overstay their visa may quickly find themselves deported with a huge fine.",exZh:"居留超過簽證期限的獨立旅行者可能很快會發現自己被驅逐出境，附帶巨額罰款。",diff:4,unit:"EXTL4"},
  {id:1607,word:"promote",ph:"/prəˈməʊt/",pos:"v.",en:"to publicize or advertise",zh:"推廣",ex:"Medical tourism is promoted by certain nations as a way to offer overseas residents affordable healthcare.",exZh:"醫療旅遊被某些國家推廣，作為一種向海外居民提供可負擔醫療服務的方式。",diff:2,unit:"EXTL4"},
  {id:1608,word:"exceed",ph:"/ɪkˈsiːd/",pos:"v.",en:"to go beyond a set limit",zh:"超過",ex:"Travellers who exceed their credit card's spending limit may find themselves in trouble while overseas.",exZh:"超過信用卡消費額度的旅行者在國外時可能會遇到麻煩。",diff:2,unit:"EXTL4"},
  {id:1609,word:"voyage",ph:"/ˈvɔɪɪdʒ/",pos:"v.",en:"to go on a long journey by sea",zh:"（搭船）旅行",ex:"For many, the chance to voyage around the world by cruise ship is a dream come true.",exZh:"對許多人來說，有機會搭乘郵輪環遊世界是美夢成真。",diff:3,unit:"EXTL4"},
  {id:1610,word:"gamble",ph:"/ˈɡæmbl/",pos:"v.",en:"to play games of chance for money",zh:"賭博",ex:"In my opinion, few people have the self-control to limit how much money they gamble on sports.",exZh:"在我看來，很少人有自制力去限制他們在體育運動上賭多少錢。",diff:2,unit:"EXTL4"},
  {id:1611,word:"evince",ph:"/ɪˈvɪns/",pos:"v.",en:"to reveal or show clearly",zh:"表現",ex:"Unfortunately, most people are too busy these days to evince much of an interest in hobbies.",exZh:"不幸的是，現今大部分人都太忙了，無法在嗜好中表現出濃厚興趣。",diff:5,unit:"EXTL4"},
  {id:1612,word:"fall into",ph:"/fɔːl ˈɪntə/",pos:"v.",en:"to begin to be in a particular state",zh:"陷入（狀態）",ex:"It is a sad fact that many older drivers fall into bad, even dangerous, driving habits over the years.",exZh:"一個令人遺憾的事實是，許多老司機多年來養成了不良甚至危險的駕駛習慣。",diff:2,unit:"EXTL4"},
  {id:1613,word:"overseas",ph:"/ˌəʊvəˈsiːz/",pos:"adj.",en:"in or to a foreign country",zh:"海外的",ex:"While many tourists go on an overseas vacation each year, a greater number prefer to travel domestically.",exZh:"雖然每年有許多旅客到海外度假，但有更多旅客更喜歡國內旅遊。",diff:2,unit:"EXTL4"},
  {id:1614,word:"eco-friendly",ph:"/ˈiːkəʊˌfrendli/",pos:"adj.",en:"not harmful to the environment",zh:"對生態友好的",ex:"By recognising themselves as eco-friendly, vacation spots are able to attract more international visitors.",exZh:"藉由將自己標榜為對生態友好的，度假勝地能夠吸引到更多國際旅客。",diff:3,unit:"EXTL4"},
  {id:1615,word:"moderate",ph:"/ˈmɒdərɪt/",pos:"adj.",en:"average in amount or degree",zh:"中等的",ex:"Travellers booking a room at the last minute should only expect a moderate degree of success.",exZh:"在最後一刻預訂房間的旅客只能預期中等的成功機率。",diff:2,unit:"EXTL4"},
  {id:1616,word:"estimated",ph:"/ˈestɪmeɪtɪd/",pos:"adj.",en:"roughly calculated; approximate",zh:"估計的",ex:"In the UK, for example, motorists lose an estimated 30 hours a year through congestion.",exZh:"在英國，舉例來說，駕車者每年因交通擁擠而損失估計三十個小時。",diff:2,unit:"EXTL4"},
  {id:1617,word:"picturesque",ph:"/ˌpɪktʃəˈresk/",pos:"adj.",en:"visually attractive; charming",zh:"如畫的",ex:"Tourists travel to remote locations for the picturesque views, but they may also be detrimentally harming the environment.",exZh:"遊客們為了如畫般的風景而前往偏遠地區，但他們也可能正在對環境造成不利的傷害。",diff:4,unit:"EXTL4"},
  {id:1618,word:"fruitarian",ph:"/fruːˈteəriən/",pos:"adj.",en:"relating to a diet consisting mainly of fruit",zh:"果食主義的",ex:"People on a strict fruitarian diet must take nutrient supplements to maintain their health.",exZh:"嚴格的果食主義飲食者應該攝取營養補充品以維持他們的健康。",diff:5,unit:"EXTL4"},
  {id:1619,word:"burning",ph:"/ˈbɜːnɪŋ/",pos:"adj.",en:"intense; passionate",zh:"強烈的",ex:"I once had a burning interest in that author but lost interest after she was discredited.",exZh:"我曾經對那個作家有強烈的興趣，但在她名譽受損後就失去興趣。",diff:2,unit:"EXTL4"},
  {id:1620,word:"embassy",ph:"/ˈembəsi/",pos:"n.",en:"the official residence of an ambassador",zh:"大使館",ex:"On a recent trip abroad, my embassy was a great help after my passport was lost.",exZh:"最近一次出國旅行中，我的大使館在我的護照遺失後，幫了很大的忙。",diff:3,unit:"EXTL4"},
  {id:1621,word:"cathedral",ph:"/kəˈθiːdrəl/",pos:"n.",en:"the principal church of a diocese",zh:"大教堂",ex:"The central attraction of any large city is always its soaring cathedral.",exZh:"任何大城市中心景點始終是其高聳的大教堂。",diff:3,unit:"EXTL4"},
  {id:1622,word:"cheque",ph:"/tʃek/",pos:"n.",en:"a written order directing a bank to pay money",zh:"支票",ex:"In an era of cashless payments, the use of traveller's cheques has become almost obsolete.",exZh:"在這無現金支付的年代，旅行支票的使用已經幾乎過時。",diff:3,unit:"EXTL4"},
  {id:1623,word:"B&B",ph:"/ˌbiːənˈbiː/",pos:"n.",en:"bed and breakfast accommodation",zh:"住宿加早餐的旅館",ex:"Due to the websites like Airbnb, almost anyone can open a B&B nowadays.",exZh:"由於有像 Airbnb 這樣的網站，現在幾乎任何人都可以經營一間住宿加早餐的旅館。",diff:2,unit:"EXTL4"},
  {id:1624,word:"platform",ph:"/ˈplætfɔːm/",pos:"n.",en:"a raised surface beside a railway track",zh:"月台",ex:"Safety features such as clearly marked lines near the edges of platforms keep train stations safe.",exZh:"安全設施例如靠近月台邊緣的清晰標記線可以確保火車站的安全。",diff:2,unit:"EXTL4"},
  {id:1625,word:"metropolis",ph:"/mɪˈtrɒpəlɪs/",pos:"n.",en:"a very large and busy city",zh:"大都會",ex:"At weekends, many city dwellers flee the metropolis for the calm of the countryside.",exZh:"在週末，許多城市居民為了鄉村的寧靜而逃離大都會。",diff:4,unit:"EXTL4"},
  {id:1626,word:"approach",ph:"/əˈprəʊtʃ/",pos:"n.",en:"a way of dealing with something",zh:"方法",ex:"Being flexible is important for a manager when introducing a new management approach into the workplace.",exZh:"採用一項新的管理方法進入工作場所時，靈活應變對於經理來說是重要的。",diff:2,unit:"EXTL4"},

  // EXTL5 藝術 Arts
  {id:1627,word:"root",ph:"/ruːt/",pos:"v.",en:"to establish deeply",zh:"根源於",ex:"Many common perceptions about the world today can be seen rooted in artwork of the last few centuries.",exZh:"當今對於世界的許多普遍看法，可看出根源於過去幾個世紀的藝術作品。",diff:2,unit:"EXTL5"},
  {id:1628,word:"engage",ph:"/ɪnˈɡeɪdʒ/",pos:"v.",en:"to attract and hold attention",zh:"吸引",ex:"Art is an essential component of every healthy society in its ability to engage everyone at some level.",exZh:"藝術所含之某種程度吸引每個人的能力，是每個健康社會的一項必要構成要素。",diff:2,unit:"EXTL5"},
  {id:1629,word:"appreciate",ph:"/əˈpriːʃieɪt/",pos:"v.",en:"to recognize the value of",zh:"欣賞",ex:"While calligraphy may be a dying art in today's digital age, many still appreciate its beauty.",exZh:"雖然書法在現今數位時代中可能是門垂死的藝術，但仍有許多人欣賞它的美。",diff:2,unit:"EXTL5"},
  {id:1630,word:"reproduce",ph:"/ˌriːprəˈdjuːs/",pos:"v.",en:"to make a copy of",zh:"複製",ex:"Despite their best efforts, amateur painters usually struggle when trying to reproduce masterpieces.",exZh:"儘管他們已盡了最大努力，業餘畫家在試圖複製名作時通常仍感到吃力。",diff:3,unit:"EXTL5"},
  {id:1631,word:"release",ph:"/rɪˈliːs/",pos:"v.",en:"to make available to the public",zh:"發行",ex:"Many former A-list actors starred in films released direct-to-video which historically have lower viewing figures than the theatrical release.",exZh:"許多以前的一線演員主演直接發行 DVD 的影片，這些影片在歷史上的觀看數低於在戲院發行的影片。",diff:2,unit:"EXTL5"},
  {id:1632,word:"put up",ph:"/pʊt ʌp/",pos:"v.",en:"to construct or build",zh:"建造",ex:"Although there are some great examples of architecture here, I find most buildings put up in Taiwan too utilitarian.",exZh:"雖然在這裡有一些了不起的建築實例，但我覺得在台灣建造的大部分建築都還是太功利主義。",diff:2,unit:"EXTL5"},
  {id:1633,word:"post-modern",ph:"/ˈpəʊstˈmɒdən/",pos:"adj.",en:"relating to postmodernism",zh:"後現代的",ex:"Certain film directors are famous for repurposing the best of old movies into unique post-modern interpretations.",exZh:"某些電影導演以改編最優秀的老電影成獨特的後現代詮釋而聞名。",diff:4,unit:"EXTL5"},
  {id:1634,word:"budding",ph:"/ˈbʌdɪŋ/",pos:"adj.",en:"beginning to develop or show talent",zh:"嶄露頭角的",ex:"Most budding artists earn low salaries and therefore should receive government funding to continue their work.",exZh:"大部分初嶄露頭角的藝術家賺取低薪，因此應獲得政府的資助，以持續他們的創作。",diff:3,unit:"EXTL5"},
  {id:1635,word:"extant",ph:"/ɪksˈtænt/",pos:"adj.",en:"still in existence; surviving",zh:"現存的",ex:"It is remarkable that calligraphy has survived as an extant art form for thousands of years.",exZh:"值得注意的是，書法作為現存的藝術表現形式存活了數千年。",diff:5,unit:"EXTL5"},
  {id:1636,word:"independent",ph:"/ˌɪndɪˈpendənt/",pos:"adj.",en:"not affiliated with a major company",zh:"獨立製作的",ex:"To make money and recoup their investment, independent filmmakers must sell their movie's distribution rights in foreign territories.",exZh:"為了賺錢和補償其投資，獨立電影製作人必須出售他們電影在外國地區的發行權。",diff:3,unit:"EXTL5"},
  {id:1637,word:"devoid",ph:"/dɪˈvɔɪd/",pos:"adj.",en:"entirely lacking",zh:"缺乏",ex:"Some people say that contemporary architecture today is devoid of character, lacking the embellishments characteristic of earlier styles.",exZh:"有些人認為當代建築缺乏特色，也缺少早期風格中具有代表性的裝飾。",diff:4,unit:"EXTL5"},
  {id:1638,word:"art deco",ph:"/ˌɑːt ˈdekəʊ/",pos:"n.",en:"a decorative art style from the 1920s-30s",zh:"裝飾藝術",ex:"While my hometown is lacking in architectural styles like art deco, there are several famous landmarks.",exZh:"雖然我的家鄉缺乏像裝飾藝術的建築風格，但仍有幾個著名的地標。",diff:4,unit:"EXTL5"},
  {id:1639,word:"choreographer",ph:"/ˌkɒrɪˈɒɡrəfə/",pos:"n.",en:"a person who creates dance compositions",zh:"編舞家",ex:"Famed choreographers such as Lin Hwai-min have played a huge role in introducing contemporary dance in Asia.",exZh:"著名的編舞家，如林懷民，在將當代舞蹈引進亞洲方面發揮了重要作用。",diff:5,unit:"EXTL5"},
  {id:1640,word:"script",ph:"/skrɪpt/",pos:"n.",en:"a style of writing; handwriting",zh:"字體",ex:"Students of Chinese calligraphy must practice five major scripts representing the history of Chinese writing.",exZh:"中國書法的學生必須練習代表中國書寫歷史的五種主要字體。",diff:2,unit:"EXTL5"},
  {id:1641,word:"genre",ph:"/ˈʒɑːnrə/",pos:"n.",en:"a category of artistic composition",zh:"（藝術作品）體裁",ex:"Genre plays an important role in helping students and writers improve communication, creativity, and analytical skills.",exZh:"作品體裁在幫助學生和作家改善溝通、創意和分析能力方面發揮重要作用。",diff:3,unit:"EXTL5"},
  {id:1642,word:"mural",ph:"/ˈmjʊərəl/",pos:"n.",en:"a painting applied directly on a wall",zh:"壁畫",ex:"Many local governments are commissioning murals in an effort to brighten up city streets.",exZh:"許多地方政府正在委託繪製壁畫，以努力使街道生色。",diff:3,unit:"EXTL5"},
  {id:1643,word:"subtitle",ph:"/ˈsʌbˌtaɪtl/",pos:"n.",en:"captions displayed at the bottom of a screen",zh:"字幕",ex:"Overseas audiences seem to show a preference for subtitles over speech dubbing when watching foreign films.",exZh:"海外觀眾在看外國電影時，似乎對字幕而非配音表現出偏好。",diff:2,unit:"EXTL5"},
  {id:1644,word:"infrastructure",ph:"/ˈɪnfrəˌstrʌktʃə/",pos:"n.",en:"the basic physical structures needed for society",zh:"基礎建設",ex:"In some of the most creative examples of architecture in the world, the design challenges of certain infrastructure can be seen.",exZh:"在世界上一些最具創意的建築範例中，可以看到某些基礎建設上的設計挑戰。",diff:3,unit:"EXTL5"},

  // EXTL6 科學與科技 Science and Technology
  {id:1645,word:"formulate",ph:"/ˈfɔːmjʊleɪt/",pos:"v.",en:"to create or devise methodically",zh:"制定",ex:"Insights gained from industry reports help experts formulate strategies to identify growth opportunities in a market.",exZh:"從產業報告所獲得的深入理解幫助專家制定策略，以確定市場的成長機會。",diff:3,unit:"EXTL6"},
  {id:1646,word:"inquire",ph:"/ɪnˈkwaɪə/",pos:"v.",en:"to ask for information",zh:"詢問",ex:"In the scientific method, researchers must inquire, hypothesise, predict, and finally carry out experiments to test their hypothesis.",exZh:"在科學的方法中，研究人員必須詢問、假設、預測，並且最終進行實驗，以檢驗他們的假設。",diff:3,unit:"EXTL6"},
  {id:1647,word:"interfere",ph:"/ˌɪntəˈfɪə/",pos:"v.",en:"to prevent from continuing; to obstruct",zh:"干擾",ex:"The world's large telescopes are mostly built in remote locations where ambient light cannot interfere with their operation.",exZh:"世界上大型的望遠鏡多半建在環境光線不會干擾其運作的偏遠地區。",diff:3,unit:"EXTL6"},
  {id:1648,word:"derive",ph:"/dɪˈraɪv/",pos:"v.",en:"to obtain from a source",zh:"獲得",ex:"Sensitive instruments aboard space satellites are helping scientists derive important clues about how the earth's weather systems operate.",exZh:"太空衛星上的敏感儀器正在幫助科學家獲得有關地球氣候系統如何運作的重要線索。",diff:3,unit:"EXTL6"},
  {id:1649,word:"cement",ph:"/sɪˈment/",pos:"v.",en:"to strengthen or establish firmly",zh:"強化",ex:"A huge number of patents arising in Asia has cemented the region's status as a major scientific power.",exZh:"出現於亞洲的龐大數量專利權，強化了該地區作為首要科學強權的地位。",diff:3,unit:"EXTL6"},
  {id:1650,word:"hinder",ph:"/ˈhɪndə/",pos:"v.",en:"to create difficulties; to delay",zh:"阻礙",ex:"A growing movement of people believe that paywalls restricting access to academic content also hinder scientific progress.",exZh:"人們愈來愈傾向認為限制使用學術內容的付費牆也阻礙了科學進步。",diff:3,unit:"EXTL6"},
  {id:1651,word:"install",ph:"/ɪnˈstɔːl/",pos:"v.",en:"to place equipment in position for use",zh:"安裝",ex:"There are many applications nowadays that can be installed on cellular devices to aid science experiments.",exZh:"現今有許多應用程式可被安裝在行動裝置上，用於輔助科學實驗。",diff:2,unit:"EXTL6"},
  {id:1652,word:"intellectual",ph:"/ˌɪntɪˈlektʃʊəl/",pos:"adj.",en:"relating to the intellect",zh:"智慧的",ex:"Recent controversies have emerged over who should claim the intellectual property rights for inventions attributed to artificial intelligence.",exZh:"近來的爭議出現在誰應該對歸功於人工智慧的發明擁有智慧財產權。",diff:4,unit:"EXTL6"},
  {id:1653,word:"ground-breaking",ph:"/ˈɡraʊndˌbreɪkɪŋ/",pos:"adj.",en:"innovative; pioneering",zh:"開創性的",ex:"Ground-breaking breakthroughs in material science may lead to batteries with ten times the storage capacity of existing ones.",exZh:"材料科學的開創性突破可能使電池儲存容量達到現有的十倍。",diff:3,unit:"EXTL6"},
  {id:1654,word:"technical",ph:"/ˈteknɪkəl/",pos:"adj.",en:"relating to a particular subject or craft",zh:"技術性的",ex:"Despite many technical hurdles, 3D printing has application in materials science, construction and even biology.",exZh:"儘管有許多技術性的障礙，3D 列印在材料科學、建築甚至生物學都有所應用。",diff:2,unit:"EXTL6"},
  {id:1655,word:"dependent",ph:"/dɪˈpendənt/",pos:"adj.",en:"relying on someone or something",zh:"依賴的",ex:"These days, scientists are dependent on the Internet for the latest scientific developments rather than on traditional journals.",exZh:"如今，科學家依賴網路獲知最新科學發展，而非傳統的期刊。",diff:2,unit:"EXTL6"},
  {id:1656,word:"sophisticated",ph:"/səˈfɪstɪˌkeɪtɪd/",pos:"adj.",en:"highly developed and complex",zh:"精密的",ex:"As sophisticated equipment is often expensive, it is becoming more common for scientists to conduct experiments virtually.",exZh:"由於精密的機器通常很昂貴，科學家模擬地進行實驗的情況愈來愈普遍。",diff:4,unit:"EXTL6"},
  {id:1657,word:"physics",ph:"/ˈfɪzɪks/",pos:"n.",en:"the science of matter, energy, and their interactions",zh:"物理",ex:"According to the US Institute of Physics, there is near unanimity among scientists regarding global warming.",exZh:"根據美國物理協會表示，在科學家之間對於全球暖化幾乎是一致同意。",diff:2,unit:"EXTL6"},
  {id:1658,word:"procedure",ph:"/prəˈsiːdʒə/",pos:"n.",en:"an established way of doing something",zh:"程序",ex:"A crisis in reproducing scientific results stems from a lack of clarity in the procedures used in the original experiments.",exZh:"一項複製科學結果的危機源自於原始實驗使用的程序缺乏明確性。",diff:3,unit:"EXTL6"},
  {id:1659,word:"rate",ph:"/reɪt/",pos:"n.",en:"the speed of movement or change",zh:"速度",ex:"Methane, a harmful greenhouse gas, is being released into the earth's atmosphere at an unprecedented rate.",exZh:"甲烷是一種有害的溫室氣體，正以一種前所未見的速度釋放到地球大氣中。",diff:2,unit:"EXTL6"},
  {id:1660,word:"association",ph:"/əˌsəʊsiˈeɪʃən/",pos:"n.",en:"a connection or link between things",zh:"關聯",ex:"It seems that not a day goes by without hearing about an association between processed foods and cancer.",exZh:"似乎沒有一天不會聽到加工食品與癌症之間的關聯。",diff:3,unit:"EXTL6"},
  {id:1661,word:"precaution",ph:"/prɪˈkɔːʃən/",pos:"n.",en:"a measure taken in advance to prevent harm",zh:"預防措施",ex:"Many influential figures are arguing for regulation of artificial intelligence as a precaution against it gaining sentience.",exZh:"許多有影響力的人物正在主張對人工智慧的管理，作為防範其獲得知覺能力的預防措施。",diff:3,unit:"EXTL6"},
  {id:1662,word:"microscope",ph:"/ˈmaɪkrəskəʊp/",pos:"n.",en:"an instrument for viewing very small objects",zh:"顯微鏡",ex:"Electron microscopes allow scientists to study atoms, the fundamental building blocks that compose all matter.",exZh:"電子顯微鏡讓科學家得以研究構成所有物質原始基本組成部分的原子。",diff:3,unit:"EXTL6"},

  // EXTL7 政治與經濟 Politics and Economy
  {id:1663,word:"deprive",ph:"/dɪˈpraɪv/",pos:"v.",en:"to take something away from",zh:"剝奪",ex:"Corruption does nothing more than line the pockets of elected officials and deprive citizens of much needed funds.",exZh:"貪污無非是填滿民選官員的口袋，並剝奪公民急需的資金。",diff:3,unit:"EXTL7"},
  {id:1664,word:"manifest",ph:"/ˈmænɪfest/",pos:"v.",en:"to show or demonstrate clearly",zh:"表現",ex:"In an election, dissatisfaction with a government manifests through a change of power between political parties.",exZh:"在一選舉中，對政府的不滿經由政黨之間的權力輪替而表現出來。",diff:4,unit:"EXTL7"},
  {id:1665,word:"poll",ph:"/pəʊl/",pos:"v.",en:"to question people for their opinions",zh:"對……進行民調",ex:"When polled, most people show a profound distrust in politicians' ability to follow through on their campaign promises.",exZh:"在接受民調時，大多數人對政治人物堅持完成其選舉時承諾的能力深表不信任。",diff:3,unit:"EXTL7"},
  {id:1666,word:"renounce",ph:"/rɪˈnaʊns/",pos:"v.",en:"to formally give up",zh:"放棄",ex:"Most of the world still renounces the use of nuclear weapons in times of war.",exZh:"世界上大多數國家在戰爭時還是放棄使用核武。",diff:4,unit:"EXTL7"},
  {id:1667,word:"alleviate",ph:"/əˈliːvieɪt/",pos:"v.",en:"to make less severe",zh:"減輕",ex:"All governments have foreign aid programs designed to alleviate poverty, often by raising education and health standards.",exZh:"所有政府都有旨在減輕貧困的國外援助計畫，通常是藉由提高教育和衛生標準。",diff:4,unit:"EXTL7"},
  {id:1668,word:"invest",ph:"/ɪnˈvest/",pos:"v.",en:"to put money into for profit",zh:"投資",ex:"Rich countries are investing in renewable technologies today as a way to future-proof their economies tomorrow.",exZh:"現今富裕國正在投資可再生科技，作為未來使它們的經濟不過時的一種方式。",diff:2,unit:"EXTL7"},
  {id:1669,word:"recur",ph:"/rɪˈkɜː/",pos:"v.",en:"to occur again",zh:"再現",ex:"Sales of perishable goods in physical stores continue to recur, being one product category affected little by e-commerce.",exZh:"易腐壞貨物在實體商店的銷售持續再現，是一種受電子商務影響很小的產品類別。",diff:4,unit:"EXTL7"},
  {id:1670,word:"declare",ph:"/dɪˈkleə/",pos:"v.",en:"to make known formally",zh:"申報",ex:"Many richer individuals may be unwilling to declare to their governments any income held in offshore accounts.",exZh:"許多富人們可能不願意向其政府申報海外帳戶持有的任何收入。",diff:2,unit:"EXTL7"},
  {id:1671,word:"feministic",ph:"/ˌfeməˈnɪstɪk/",pos:"adj.",en:"relating to feminism",zh:"女權主義的",ex:"Despite the promotion of feministic values in today's society, gender equality in government is sadly lacking.",exZh:"儘管現今社會提倡女權主義的價值觀，可悲的是，政府中缺乏性別平等。",diff:4,unit:"EXTL7"},
  {id:1672,word:"federal",ph:"/ˈfedərəl/",pos:"adj.",en:"relating to a system of central government",zh:"聯邦的",ex:"Perhaps the best example of a federal government is the power-sharing agreement between American states and Washington D.C.",exZh:"或許聯邦政府最好的例子便是美國各州與華盛頓特區之間的權力分享協議。",diff:3,unit:"EXTL7"},
  {id:1673,word:"incumbent",ph:"/ɪnˈkʌmbənt/",pos:"adj.",en:"currently holding office",zh:"現任的",ex:"In general, people are more likely to vote for an incumbent senator than one they aren't familiar with.",exZh:"一般來說，人們更有可能投票給現任的參議員，而不是一個他們不熟悉的。",diff:4,unit:"EXTL7"},
  {id:1674,word:"diplomatic",ph:"/ˌdɪpləˈmætɪk/",pos:"adj.",en:"relating to diplomacy",zh:"外交的",ex:"Diplomatic relations between countries can be upgraded or downgraded based on the actions and ideals of each nation.",exZh:"國家之間的外交關係可以根據各國的行動和理想來提升或降低。",diff:3,unit:"EXTL7"},
  {id:1675,word:"recipient",ph:"/rɪˈsɪpiənt/",pos:"adj.",en:"receiving or capable of receiving",zh:"接受的",ex:"Proponents of international aid state that recipient countries move closer to attaining the United Nation's Sustainable Development Goals.",exZh:"國際援助的支持者表示，受援國對實現聯合國的永續發展目標更加接近了。",diff:3,unit:"EXTL7"},
  {id:1676,word:"speculative",ph:"/ˈspekjʊˌleɪtɪv/",pos:"adj.",en:"based on conjecture rather than knowledge",zh:"投機的",ex:"Speculative investments in the property sector can create a bubble that greatly damages an economy once burst.",exZh:"房地產業的投機性投資會造成泡沫，一旦破裂，就會大大破壞經濟。",diff:4,unit:"EXTL7"},
  {id:1677,word:"obsolescent",ph:"/ˌɒbsəˈlesnt/",pos:"adj.",en:"becoming outdated",zh:"逐漸被淘汰的",ex:"Many modern-day products are designed to become obsolescent after a certain period, ensuring manufacturers continue to earn revenue.",exZh:"許多現代產品被設計成在一段時間後會逐漸過時，以確保製造商能持續賺取收入。",diff:5,unit:"EXTL7"},
  {id:1678,word:"taxable",ph:"/ˈtæksəbl/",pos:"adj.",en:"subject to taxation",zh:"應繳稅的",ex:"An advantage of receiving income from cryptocurrencies is that it is not currently taxable in many jurisdictions.",exZh:"從加密貨幣獲得收入的一項優點是它目前在許多司法管轄區不需繳稅。",diff:3,unit:"EXTL7"},
  {id:1679,word:"Parliament",ph:"/ˈpɑːləmənt/",pos:"n.",en:"the highest legislative body in a country",zh:"議會",ex:"As the highest legislative body in a country, Parliament is beholden to the will of a country's citizenry.",exZh:"作為一個國家最高立法機構，議會對於國家公民的意願負有義務。",diff:3,unit:"EXTL7"},
  {id:1680,word:"socialism",ph:"/ˈsəʊʃəlɪzəm/",pos:"n.",en:"a political theory advocating collective ownership",zh:"社會主義",ex:"Although few sovereign states embrace full socialism, many include aspects of it in their constitutions.",exZh:"雖然很少有主權國家信奉完全的社會主義，但許多國家在其憲法中卻包含社會主義的觀點。",diff:4,unit:"EXTL7"},
  {id:1681,word:"diplomat",ph:"/ˈdɪpləmæt/",pos:"n.",en:"an official representing a country abroad",zh:"外交官",ex:"Digitalisation represents perhaps the biggest threat to the role of diplomats through instant communication.",exZh:"透過即時通訊，數位化對外交官的角色或許象徵了最大威脅。",diff:3,unit:"EXTL7"},
  {id:1682,word:"marketplace",ph:"/ˈmɑːkɪtpleɪs/",pos:"n.",en:"an arena for commercial activity",zh:"市場",ex:"According to the World Trade Organization (WTO), emerging economies are now redefining the global marketplace.",exZh:"根據世界貿易組織（WTO），新興經濟體現在正在重新定義全球市場。",diff:3,unit:"EXTL7"},
  {id:1683,word:"expenditure",ph:"/ɪksˈpendɪtʃə/",pos:"n.",en:"the action of spending money",zh:"花費",ex:"During Christmas, many households' expenditure will reach a yearly peak during the most consumer-oriented holiday of the year.",exZh:"聖誕節期間，許多家庭的花費將在全年最以消費為導向的節日時達到高峰。",diff:3,unit:"EXTL7"},
  {id:1684,word:"clawback",ph:"/ˈklɔːbæk/",pos:"n.",en:"recovery of money already distributed",zh:"彌補性收入",ex:"Tax reform may sometimes allow governments to enact a clawback of certain tax credits.",exZh:"稅收改革有時允許政府頒布某些扣抵稅額的彌補性收入。",diff:5,unit:"EXTL7"},
  {id:1685,word:"channel",ph:"/ˈtʃænl/",pos:"n.",en:"a medium for communication or distribution",zh:"管道",ex:"Sending donations through trusted channels like the United Nations reduces the chance of misappropriation along the way.",exZh:"透過像聯合國這樣可信賴的管道發送捐款，可以減少過程中被挪用的機會。",diff:2,unit:"EXTL7"},

  // EXTL8 社會議題 Social Issues
  {id:1686,word:"haemorrhage",ph:"/ˈhemərɪdʒ/",pos:"v.",en:"to lose something rapidly and in large amounts",zh:"大量流失",ex:"Stagnant economies tend to haemorrhage jobs as skilled workers look to other countries for better opportunities.",exZh:"停滯不前的經濟往往使工作大量流失，因為技術工人向其他國家尋求更好的機會。",diff:5,unit:"EXTL8"},
  {id:1687,word:"descend",ph:"/dɪˈsend/",pos:"v.",en:"to move or fall downward",zh:"陷入",ex:"Unbridled corruption and poor government policies have seen much of the population of Zimbabwe descend into poverty.",exZh:"肆無忌憚的腐敗和差勁的政府政策見證了辛巴威大部分的人口陷入貧困。",diff:3,unit:"EXTL8"},
  {id:1688,word:"surpass",ph:"/sɜːˈpɑːs/",pos:"v.",en:"to exceed or go beyond",zh:"超過",ex:"Scientists now believe recent medical advances will cause human life expectancy to surpass 120 years.",exZh:"科學家們現在相信，近代的醫療進步將使人類的預期壽命超過一百二十歲。",diff:3,unit:"EXTL8"},
  {id:1689,word:"evict",ph:"/ɪˈvɪkt/",pos:"v.",en:"to expel from a property",zh:"驅逐",ex:"Many Americans were evicted from their homes when they couldn't make debt payments during the economic crisis of 2008.",exZh:"許多美國人在 2008 年經濟危機期間因無法償還債務而被驅逐出家園。",diff:3,unit:"EXTL8"},
  {id:1690,word:"misuse",ph:"/mɪsˈjuːz/",pos:"v.",en:"to use wrongly or improperly",zh:"濫用",ex:"Recent research showed that one in five Americans misused prescription drugs by taking them for non-prescribed purposes.",exZh:"最近研究顯示，每五個美國人中就有一個藉著非處方目的濫用處方藥物。",diff:3,unit:"EXTL8"},
  {id:1691,word:"enact",ph:"/ɪˈnækt/",pos:"v.",en:"to make into law",zh:"實施",ex:"Despite efforts to enact cost-cutting reforms, spending on welfare continues to balloon in many western economies.",exZh:"儘管努力實施削減成本的改革，許多西方經濟體在福利上的支出仍然持續激增。",diff:3,unit:"EXTL8"},
  {id:1692,word:"coerce",ph:"/kəʊˈɜːs/",pos:"v.",en:"to persuade by using force or threats",zh:"強迫",ex:"Large nations are sometimes accused of coercing smaller ones into accepting one-sided policies that are not their own.",exZh:"大的國家有時被責備強迫小國接受不是他們自己的單方面政策。",diff:4,unit:"EXTL8"},
  {id:1693,word:"assimilate",ph:"/əˈsɪmɪleɪt/",pos:"v.",en:"to absorb and integrate into a wider society",zh:"融入",ex:"Countries should try harder to help immigrants assimilate into society easily, all the while maintaining their ethnic identities.",exZh:"各國應該更加努力幫助移民輕鬆融入社會，同時保持其民族特性。",diff:4,unit:"EXTL8"},
  {id:1694,word:"institutional",ph:"/ˌɪnstɪˈtjuːʃənəl/",pos:"adj.",en:"relating to an established organization",zh:"機構的",ex:"Few companies nowadays guarantee the type of institutional job for life common only a few decades ago.",exZh:"現今很少公司能保證十年前才常見的機構終身制工作類型。",diff:3,unit:"EXTL8"},
  {id:1695,word:"venerable",ph:"/ˈvenərəbl/",pos:"adj.",en:"accorded great respect due to age or wisdom",zh:"令人尊敬的",ex:"Conventional thinking states that people in the East view seniors as venerable members of society.",exZh:"傳統思想認為，東方人視老年人為社會上令人尊敬的成員。",diff:4,unit:"EXTL8"},
  {id:1696,word:"vagrant",ph:"/ˈveɪɡrənt/",pos:"adj.",en:"having no settled home",zh:"遊蕩的",ex:"While vagrant people often choose not to work or settle, homeless people simply lack a permanent abode.",exZh:"雖然無業遊民往往選擇不工作或不定居，但無家可歸的人只是缺乏一個永久的住所。",diff:5,unit:"EXTL8"},
  {id:1697,word:"intentional",ph:"/ɪnˈtenʃənəl/",pos:"adj.",en:"done on purpose; deliberate",zh:"故意的",ex:"Psychological bullying is an intentional effort to mentally harm a recipient through rumours, jokes or verbal abuse.",exZh:"心理霸凌是透過謠言、玩笑或言語虐待，故意在心理上傷害受害者的一種行為。",diff:3,unit:"EXTL8"},
  {id:1698,word:"racial",ph:"/ˈreɪʃəl/",pos:"adj.",en:"relating to race",zh:"種族的",ex:"Accusations of racial profiling by American police claim that people of colour are often arrested without sufficient evidence.",exZh:"對美國警方種族偏見的指控聲稱，有色人種往往在沒有足夠證據下就被逮捕。",diff:3,unit:"EXTL8"},
  {id:1699,word:"trap",ph:"/træp/",pos:"n.",en:"a situation from which it is difficult to escape",zh:"陷阱",ex:"Many jobseekers fall into the trap of assuming a well-qualified resume automatically guarantees them a job.",exZh:"許多求職者誤以為一份合格的履歷表能自動保證他們獲得一份工作，從而掉入陷阱。",diff:2,unit:"EXTL8"},
  {id:1700,word:"deprivation",ph:"/ˌdeprɪˈveɪʃən/",pos:"n.",en:"the lack of basic necessities",zh:"剝奪",ex:"In addition to being denied good healthcare, destitute children also suffer from education deprivation.",exZh:"除了沒有良好的醫療保健，貧窮孩童還遭受到教育剝奪。",diff:4,unit:"EXTL8"},
  {id:1701,word:"life expectancy",ph:"/laɪf ɪkˈspektənsi/",pos:"n.",en:"the average period a person may expect to live",zh:"預期壽命",ex:"Economic disparity results in a huge difference in life expectancy between advanced and developing nations.",exZh:"經濟上的差距導致在先進和開發中國家之間的預期壽命有巨大的差異。",diff:3,unit:"EXTL8"},
  {id:1702,word:"withdrawal symptoms",ph:"/wɪðˈdrɔːəl ˈsɪmptəmz/",pos:"n.",en:"adverse effects from stopping a substance",zh:"戒斷症狀",ex:"Quitting drugs can take years, with withdrawal symptoms being one of the biggest hurdles to overcome.",exZh:"戒毒可能需要數年時間，其中戒斷症狀是需要克服的最大障礙之一。",diff:4,unit:"EXTL8"},
  {id:1703,word:"insurance",ph:"/ɪnˈʃʊərəns/",pos:"n.",en:"a financial protection against loss",zh:"保險",ex:"While many European nations utilise a socialised healthcare model, America favours one based on private health insurance.",exZh:"雖然許多歐洲國家採用一個社會化的醫療保健模式，但是美國偏愛以私人健康保險為基礎的模式。",diff:2,unit:"EXTL8"},

  // EXTL9 自然與環境議題 Nature and Environmental Issues
  {id:1704,word:"remediate",ph:"/rɪˈmiːdieɪt/",pos:"v.",en:"to remedy or correct",zh:"補救",ex:"Limited land availability in cities means local governments must consider remediating polluted land to build new homes on.",exZh:"城市中有限的土地可用性意味著地方政府必須考慮治理被污染的土地，以便在其上建造新住宅。",diff:5,unit:"EXTL9"},
  {id:1705,word:"gravitate",ph:"/ˈɡrævɪteɪt/",pos:"v.",en:"to be drawn towards",zh:"被吸引",ex:"Tourists worldwide are gravitating towards natural dark-sky zones where low light pollution makes the Milky Way highly visible.",exZh:"世界上的遊客日漸被吸引到自然的黑暗天空地區，這裡的低光害使銀河非常清晰可見。",diff:4,unit:"EXTL9"},
  {id:1706,word:"perturb",ph:"/pəˈtɜːb/",pos:"v.",en:"to disturb or upset",zh:"擾亂",ex:"Human industrial activity has perturbed the delicate balance of natural forces that drive the world's weather system.",exZh:"人類的工業活動已擾亂了驅動全球氣候系統的自然力量之微妙平衡。",diff:5,unit:"EXTL9"},
  {id:1707,word:"decompose",ph:"/ˌdiːkəmˈpəʊz/",pos:"v.",en:"to break down into simpler parts",zh:"分解",ex:"Scientists are concerned that microbes in tropical soils may release unprecedented amounts of CO2 by decomposing plant and animal remains.",exZh:"科學家對熱帶土壤中的微生物可能會藉由分解植物和動物殘骸而釋放出前所未見的二氧化碳量感到擔憂。",diff:4,unit:"EXTL9"},
  {id:1708,word:"induce",ph:"/ɪnˈdjuːs/",pos:"v.",en:"to bring about or cause",zh:"誘發",ex:"In the past, China has been able to induce precipitation through a process known as cloud seeding.",exZh:"在過去，中國透過被稱為是人工降雨的過程，已經能夠誘發降雨。",diff:3,unit:"EXTL9"},
  {id:1709,word:"specify",ph:"/ˈspesɪfaɪ/",pos:"v.",en:"to state explicitly",zh:"明確指出",ex:"Measuring global biodiversity is a huge task, and indicators must be specified to help scientists accomplish this accurately.",exZh:"測量全球生物多樣性是一項艱鉅的任務以明確指標以幫助科學家準確完成這項工作。",diff:3,unit:"EXTL9"},
  {id:1710,word:"exploit",ph:"/ɪksˈplɔɪt/",pos:"v.",en:"to make use of a resource",zh:"開發",ex:"Northern countries like Russia see the melting Arctic as an opportunity to exploit untapped oil reserves there.",exZh:"像俄羅斯這樣的北方國家將北極融化視為開發那裡未開採石油儲量的一個機會。",diff:3,unit:"EXTL9"},
  {id:1711,word:"oil-bearing",ph:"/ˈɔɪlˌbeərɪŋ/",pos:"adj.",en:"containing oil",zh:"含油的",ex:"Discoveries of oil are typically made by drilling from the surface to reach oil-bearing rock layers underground.",exZh:"石油的發現通常是從地表鑽到地下的含油岩層。",diff:4,unit:"EXTL9"},
  {id:1712,word:"solar",ph:"/ˈsəʊlə/",pos:"adj.",en:"relating to the sun",zh:"太陽的",ex:"Extended periods of intense solar activity can disrupt communications satellites and even cause blackouts on Earth.",exZh:"長時間劇烈的太陽活動會擾亂通訊衛星，甚至會導致地球停電。",diff:2,unit:"EXTL9"},
  {id:1713,word:"arid",ph:"/ˈærɪd/",pos:"adj.",en:"extremely dry",zh:"乾燥的",ex:"Climate change research suggests that wet regions will become wetter while dry regions get even more arid.",exZh:"氣候變化的研究暗示潮濕地區將變得更潮濕，同時乾旱地區變得更加乾燥。",diff:3,unit:"EXTL9"},
  {id:1714,word:"seismic",ph:"/ˈsaɪzmɪk/",pos:"adj.",en:"relating to earthquakes",zh:"地震的",ex:"Scientists may be able to predict earthquakes by monitoring for unusual seismic activity in quake prone areas.",exZh:"科學家可能可以藉由監測地震易發地區的異常地震活動來預測地震。",diff:4,unit:"EXTL9"},
  {id:1715,word:"exhaustive",ph:"/ɪɡˈzɔːstɪv/",pos:"adj.",en:"thorough and comprehensive",zh:"詳盡的",ex:"Despite exhaustive computer modeling, some researchers claim simulations are not accurate enough to predict real climate change.",exZh:"儘管進行了詳盡的電腦模擬，一些研究人員仍聲稱這些模擬不足以準確預測真實的氣候變化。",diff:4,unit:"EXTL9"},
  {id:1716,word:"susceptible",ph:"/səˈseptəbl/",pos:"adj.",en:"likely to be affected by",zh:"易受",ex:"Some studies claim that certain chemicals in sunscreens make coral susceptible to bleaching.",exZh:"一些研究聲稱防曬乳中的某些化學物質會讓珊瑚礁容易被漂白。",diff:4,unit:"EXTL9"},
  {id:1717,word:"artificial",ph:"/ˌɑːtɪˈfɪʃəl/",pos:"adj.",en:"made by humans rather than nature",zh:"人工的",ex:"Artificial intelligence is driving efficiency improvements in energy generation and resource exploration.",exZh:"人工智慧正在推動能源生產和資源探勘的效率提升。",diff:2,unit:"EXTL9"},
  {id:1718,word:"alien",ph:"/ˈeɪliən/",pos:"adj.",en:"not native; foreign",zh:"外來的",ex:"Sustaining native fauna populations partially relies on protecting them from invasive alien species that can decimate their numbers.",exZh:"維持本地動物群的數量部分依賴於保護牠們免受外來入侵物種侵害，這些物種可能使其數量銳減。",diff:3,unit:"EXTL9"},
  {id:1719,word:"advantageous",ph:"/ˌædvənˈteɪdʒəs/",pos:"adj.",en:"involving or creating favorable conditions",zh:"有利的",ex:"Recycling electronic waste, or e-waste, is particularly advantageous since many devices contain many precious metals like gold.",exZh:"回收電子廢棄物特別有利，因為許多裝置都含有貴金屬，像是黃金。",diff:3,unit:"EXTL9"},
  {id:1720,word:"seasonal",ph:"/ˈsiːzənəl/",pos:"adj.",en:"relating to a particular season",zh:"季節性的",ex:"Greater variations in weather patterns throughout the year are worsening seasonal allergies in people and making society sicker.",exZh:"整年天氣模式更大的變化正使人們季節性過敏惡化，並使社會更加病態。",diff:2,unit:"EXTL9"},
  {id:1721,word:"glacier",ph:"/ˈɡlæsiə/",pos:"n.",en:"a slowly moving mass of ice",zh:"冰川",ex:"Some believe that the increased melt rate of the world's glaciers is indisputable evidence of climate change.",exZh:"一些人認為世界上冰川融化速度變快是氣候變化無可爭辯的證據。",diff:3,unit:"EXTL9"},
  {id:1722,word:"satellite",ph:"/ˈsætəlaɪt/",pos:"n.",en:"an object orbiting a planet",zh:"衛星",ex:"In the next few years, billions of people worldwide will be able to access the Internet cheaply via satellites.",exZh:"在接下來幾年內，全世界數十億人將能夠透過衛星便宜地上網。",diff:2,unit:"EXTL9"},
  {id:1723,word:"landform",ph:"/ˈlændˌfɔːm/",pos:"n.",en:"a natural feature of the earth's surface",zh:"地形",ex:"Governments increasingly view natural landforms like wetlands as long-lasting protection against coastal erosion by the sea.",exZh:"政府日益將濕地等自然地形視為防止海岸受到海水侵蝕的持久保護措施。",diff:3,unit:"EXTL9"},
  {id:1724,word:"wildfire",ph:"/ˈwaɪldˌfaɪə/",pos:"n.",en:"an uncontrolled fire in a natural area",zh:"野火",ex:"Wildfires in the Amazon rainforest result from irresponsible burning used to clear trees for cattle grazing.",exZh:"亞馬遜雨林的野火源於用於清除樹木以供牛群放牧的不負責任燃燒行為。",diff:2,unit:"EXTL9"},
  {id:1725,word:"ozone layer",ph:"/ˈəʊzəʊn ˌleɪə/",pos:"n.",en:"a layer of ozone in the stratosphere",zh:"臭氧層",ex:"Nitrogen oxide released from agriculture is a potent greenhouse gas that damages the Earth's ozone layer.",exZh:"農業中釋放的氮氧化物是一種強效的溫室氣體，會破壞地球的臭氧層。",diff:3,unit:"EXTL9"},
  {id:1726,word:"predator",ph:"/ˈpredətə/",pos:"n.",en:"an animal that hunts others for food",zh:"捕食性動物",ex:"The introduction of non-native predators like the weasel in New Zealand has decimated Kiwi populations there.",exZh:"在紐西蘭引進非本地的捕食性動物，像是黃鼠狼，已經使該國的奇異鳥總數銳減。",diff:3,unit:"EXTL9"},
  {id:1727,word:"downcycling",ph:"/ˈdaʊnˌsaɪklɪŋ/",pos:"n.",en:"recycling into lower-quality materials",zh:"降級回收",ex:"One solution to recycling higher quality plastic is downcycling — a process that involves breaking materials down into component elements.",exZh:"回收較高品質塑膠的一項解決方案是行降級回收——一過程包括將材料分解成組成元素。",diff:5,unit:"EXTL9"},
  {id:1728,word:"geothermal energy",ph:"/ˌdʒiːəʊˈθɜːməl ˈenədʒi/",pos:"n.",en:"heat energy from the earth's interior",zh:"地熱能",ex:"In nations with abundant geothermal energy, underground heat can be harnessed for use as electricity.",exZh:"在有豐富地熱能的國家，地下熱可被利用來當作電力使用。",diff:4,unit:"EXTL9"},
  {id:1729,word:"flora",ph:"/ˈflɔːrə/",pos:"n.",en:"the plants of a particular region",zh:"植物群",ex:"Eco-tourism promotes the sustainability of both fauna and flora in some of the world's most bio-diverse environments.",exZh:"生態旅遊促進了世界上一些最具生物多樣性環境中動物群和植物群的永續性。",diff:3,unit:"EXTL9"},
];

export function getWordsByUnit(unitId) { return WORDS.filter(w => w.unit === unitId); }
export function getWordsByPart(partId) { return WORDS.filter(w => UNIT_PART[w.unit] === partId); }


function initSRS(){return Object.fromEntries(WORDS.map(w=>[w.id,{ef:2.5,interval:1,reps:0,nextReview:Date.now()-1,lastScore:null}]));}
function updateSRS(c,score){let{ef,interval,reps}={...c};const q=score===1?2:score===2?4:5;if(q<3){reps=0;interval=1;}else{reps+=1;if(reps===1)interval=1;else if(reps===2)interval=6;else interval=Math.round(interval*ef);}ef=Math.max(1.3,ef+0.1-(5-q)*(0.08+(5-q)*0.02));return{ef,interval,reps,nextReview:Date.now()+interval*86400000,lastScore:score};}
const shuffle=arr=>[...arr].sort(()=>Math.random()-0.5);
const getOptions=word=>shuffle([...shuffle(WORDS.filter(w=>w.id!==word.id)).slice(0,3),word]);
const C={bg:"#0d0f1a",surface:"#141726",card:"#1b1f32",border:"#252a45",borderHi:"#3a4070",gold:"#f0c040",goldDim:"#9a7820",text:"#e8e2d6",textDim:"#7a7a9a",textFaint:"#4a4a6a",green:"#3ddb7e",red:"#f56060",blue:"#5ba8f5",purple:"#a78bfa"};
const pill=(color,size=11)=>({display:"inline-block",background:color+"22",color,borderRadius:20,padding:"2px 9px",fontSize:size,border:`1px solid ${color}44`,lineHeight:"1.6"});
const btn=(bg,color="#000")=>({background:bg,color,border:"none",borderRadius:10,padding:"11px 18px",fontSize:14,fontWeight:"700",cursor:"pointer",fontFamily:"Georgia,serif"});
const cs=(extra={})=>({background:C.card,border:`1px solid ${C.border}`,borderRadius:14,padding:"14px 16px",marginBottom:10,...extra});


// ── TTS SPEECH ─────────────────────────────────────────────────
// 女聲優先順序（自然度由高到低）
const FEMALE_VOICE_NAMES = [
  "samantha",      // macOS/iOS 最自然女聲
  "karen",         // Australian English female
  "victoria",      // macOS female
  "serena",        // British female
  "moira",         // Irish English female
  "kate",          // British female
  "susan",         // generic female
  "google us english", // Chrome 女聲
  "microsoft zira",    // Windows female
  "female",
];

function pickFemaleVoice(){
  const voices = window.speechSynthesis.getVoices();
  const engVoices = voices.filter(v=>v.lang.startsWith("en"));
  // 優先：名稱含女聲關鍵字的英語語音
  for(const kw of FEMALE_VOICE_NAMES){
    const v = engVoices.find(v=>v.name.toLowerCase().includes(kw));
    if(v) return v;
  }
  // 退而求其次：任何英語語音
  return engVoices.find(v=>v.localService) || engVoices[0] || null;
}

function speak(text, rate=0.85){
  if(!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = rate;
  u.pitch = 1.1;  // 略高音調偏向女聲
  const doSpeak = () => {
    const voice = pickFemaleVoice();
    if(voice) u.voice = voice;
    window.speechSynthesis.speak(u);
  };
  // 語音列表可能尚未載入，監聽 voiceschanged
  if(window.speechSynthesis.getVoices().length > 0){
    doSpeak();
  } else {
    window.speechSynthesis.addEventListener("voiceschanged", doSpeak, { once: true });
  }
}

function SpeakBtn({ text, rate=0.85, size=16 }){
  const [active, setActive] = React.useState(false);
  const handleClick = (e) => {
    e.stopPropagation();
    setActive(true);
    speak(text, rate);
    setTimeout(()=>setActive(false), 2000);
  };
  return(
    <button onClick={handleClick} title="播放發音" style={{
      background:"none", border:"none", cursor:"pointer", padding:"2px 4px",
      fontSize:size, lineHeight:1, color:active?"#5ba8f5":"#4a4a6a",
      transition:"color 0.2s", verticalAlign:"middle"
    }}>
      {active ? "🔊" : "🔈"}
    </button>
  );
}


// ── GAMIFICATION ──────────────────────────────────────────────
const XP_PER_LEVEL = 100;
const RANKS = ["新手學者","初學勇士","單字騎士","語言武士","詞彙將軍","雅思英雄","單字宗師","語言之神"];
function getLevel(xp){ return Math.floor(xp/XP_PER_LEVEL)+1; }
function getRank(lvl){ return RANKS[Math.min(lvl-1,RANKS.length-1)]; }
function getLevelXP(xp){ return xp % XP_PER_LEVEL; }

const ACHIEVEMENTS_DEF = [
  {id:"first",   icon:"⚔️",  name:"初次出擊",   desc:"第一次答對"},
  {id:"combo3",  icon:"🔥",  name:"三連擊",     desc:"連續答對3題"},
  {id:"combo5",  icon:"🌋",  name:"怒火連燃",   desc:"連續答對5題"},
  {id:"combo8",  icon:"💥",  name:"無法阻擋",   desc:"連續答對8題"},
  {id:"perfect", icon:"👑",  name:"完美無缺",   desc:"10題全部答對"},
  {id:"speed",   icon:"⚡",  name:"閃電學霸",   desc:"10秒內答對"},
  {id:"lvl3",    icon:"🎖️", name:"初入殿堂",   desc:"達到 3 級"},
  {id:"lvl5",    icon:"🏆",  name:"學霸誕生",   desc:"達到 5 級"},
  {id:"lvl10",   icon:"🌟",  name:"詞彙大師",   desc:"達到 10 級"},
  {id:"survive", icon:"🛡️", name:"鋼鐵意志",   desc:"HP<20仍獲勝"},
];
export default function App(){
  const[tab,setTab]=useState("book");
  const[srs,setSRS]=useState(()=>{try{const s=JSON.parse(localStorage.getItem("ielts_srs")||"{}");const f=initSRS();return Object.fromEntries(Object.entries(f).map(([k,v])=>[k,s[k]??v]));}catch{return initSRS();}});
  const[starred,setStarred]=useState(()=>{try{return JSON.parse(localStorage.getItem("ielts_starred")||"{}");}catch{return {};}});
  const[search,setSearch]=useState("");
  const[filterPart,setFilterPart]=useState("ALL");
  const[filterLesson,setFilterLesson]=useState("ALL");
  const[expanded,setExpanded]=useState({});
  const[reviewQueue,setReviewQueue]=useState([]);
  const[rIdx,setRIdx]=useState(0);
  const[rPhase,setRPhase]=useState("empty");
  const[rOpts,setROpts]=useState([]);
  const[rSelected,setRSelected]=useState(null);
  const[rStats,setRStats]=useState({correct:0,total:0});
  const[game,setGame]=useState(null);
  const timerRef=useRef(null);
  const [playerXP, setPlayerXP] = useState(()=>{try{return Number(localStorage.getItem("ielts_xp")||"0");}catch{return 0;}});
  const [unlockedAch, setUnlockedAch] = useState(()=>{try{return new Set(JSON.parse(localStorage.getItem("ielts_ach")||"[]"));}catch{return new Set();}});
  const [achPopup, setAchPopup]   = useState(null); // {icon,name}
  const [floats,   setFloats]     = useState([]);   // floating text
  const [shake,    setShake]      = useState(false);
  const [flash,    setFlash]      = useState(null); // 'hit'|'crit'|'dmg'
  const floatId = useRef(0);
  const playerLevel = getLevel(playerXP);

  // Persist progress across reloads / PWA re-opens
  useEffect(()=>{try{localStorage.setItem("ielts_srs",JSON.stringify(srs));}catch{}},[srs]);
  useEffect(()=>{try{localStorage.setItem("ielts_starred",JSON.stringify(starred));}catch{}},[starred]);
  useEffect(()=>{try{localStorage.setItem("ielts_xp",String(playerXP));}catch{}},[playerXP]);
  useEffect(()=>{try{localStorage.setItem("ielts_ach",JSON.stringify([...unlockedAch]));}catch{}},[unlockedAch]);

  const addFloat=(text,color="#f0c040",size=28,x=50)=>{
    const id=floatId.current++;
    setFloats(p=>[...p,{id,text,color,size,x}]);
    setTimeout(()=>setFloats(p=>p.filter(f=>f.id!==id)),1200);
  };
  const doShake=()=>{setShake(true);setTimeout(()=>setShake(false),400);};
  const doFlash=(type)=>{setFlash(type);setTimeout(()=>setFlash(null),300);};

  const unlockAch=(id)=>{
    if(unlockedAch.has(id)) return;
    setUnlockedAch(s=>{const n=new Set(s);n.add(id);return n;});
    const def=ACHIEVEMENTS_DEF.find(a=>a.id===id);
    if(def){ setAchPopup(def); setTimeout(()=>setAchPopup(null),2500); }
  };

  const earnXP=(amount)=>{
    setPlayerXP(prev=>{
      const newXP=prev+amount;
      const oldLv=getLevel(prev); const newLv=getLevel(newXP);
      if(newLv>oldLv){ addFloat(`LEVEL UP! Lv.${newLv}`,"#a78bfa",26,45); }
      if(newLv>=3) unlockAch("lvl3");
      if(newLv>=5) unlockAch("lvl5");
      if(newLv>=10) unlockAch("lvl10");
      return newXP;
    });
  };
  const dueCount=WORDS.filter(w=>srs[w.id].nextReview<=Date.now()).length;
  const masteredCount=WORDS.filter(w=>srs[w.id].reps>=3).length;

  const startReview=useCallback(()=>{const due=shuffle(WORDS.filter(w=>srs[w.id].nextReview<=Date.now()));setReviewQueue(due);setRIdx(0);setRPhase(due.length>0?"q":"empty");setRStats({correct:0,total:0});},[srs]);
  useEffect(()=>{if(tab==="review")startReview();},[tab]);
  useEffect(()=>{if(reviewQueue.length>0&&rIdx<reviewQueue.length&&rPhase==="q"){setROpts(getOptions(reviewQueue[rIdx]));setRSelected(null);}},[rIdx,reviewQueue,rPhase]);
  const handleRA=opt=>{const w=reviewQueue[rIdx];setRSelected(opt.id);setRPhase("a");setRStats(p=>({correct:p.correct+(opt.id===w.id?1:0),total:p.total+1}));};
  const handleScore=score=>{const w=reviewQueue[rIdx];setSRS(p=>({...p,[w.id]:updateSRS(p[w.id],score)}));const n=rIdx+1;if(n>=reviewQueue.length)setRPhase("done");else{setRIdx(n);setRPhase("q");}};

  const startGame=useCallback(()=>{clearInterval(timerRef.current);const pool=shuffle(WORDS).slice(0,10);setGame({pool,idx:0,playerHP:100,enemyHP:500,score:0,streak:0,maxStreak:0,phase:"q",opts:getOptions(pool[0]),selected:null,timeLeft:40,finished:false,xpEarned:0});setFloats([]);},[]);
  useEffect(()=>{if(!game||game.phase!=="q"||game.finished){clearInterval(timerRef.current);return;}clearInterval(timerRef.current);timerRef.current=setInterval(()=>setGame(g=>{if(!g||g.phase!=="q")return g;if(g.timeLeft<=1){clearInterval(timerRef.current);return{...g,timeLeft:0,playerHP:Math.max(0,g.playerHP-18),streak:0,phase:"timeout"};}return{...g,timeLeft:g.timeLeft-1};}),1000);return()=>clearInterval(timerRef.current);},[game?.idx,game?.phase]);
  const handleGA=opt=>{
    if(!game||game.phase!=="q")return;
    clearInterval(timerRef.current);
    const w=game.pool[game.idx];
    const c=opt.id===w.id;
    const ns=c?game.streak+1:0;
    const isCrit=ns>=3;
    const isSpeed=game.timeLeft>=30;
    const baseDmg=20+ns*10;
    const dmg=c?(isCrit?baseDmg*2:baseDmg):0;
    const pDmg=c?0:25;
    const xpGain=c?(isCrit?30:isSpeed?20:10):0;
    setSRS(p=>({...p,[w.id]:updateSRS(p[w.id],c?2:1)}));
    if(c){
      if(isCrit){doFlash("crit");addFloat("💥 CRITICAL!","#a78bfa",30,40);}
      else doFlash("hit");
      addFloat(`-${dmg}`,C.red,32,65);
      if(xpGain>0){addFloat(`+${xpGain} XP`,"#f0c040",20,30);}
      earnXP(xpGain);
      if(!unlockedAch.has("first")) unlockAch("first");
      if(ns>=3) unlockAch("combo3");
      if(ns>=5) unlockAch("combo5");
      if(ns>=8) unlockAch("combo8");
      if(isSpeed&&c) unlockAch("speed");
    } else {
      doShake(); doFlash("dmg");
      addFloat(`-${pDmg} HP`,"#f56060",26,40);
    }
    setGame(g=>({...g,phase:"a",selected:opt.id,streak:ns,maxStreak:Math.max(g.maxStreak||0,ns),score:g.score+(c?1:0),enemyHP:Math.max(0,g.enemyHP-dmg),playerHP:Math.max(0,g.playerHP-pDmg),xpEarned:(g.xpEarned||0)+xpGain}));
  };
  const nextGW=()=>{setGame(g=>{
    if(!g)return g;
    const n=g.idx+1;
    const done=n>=g.pool.length||g.playerHP<=0||g.enemyHP<=0;
    if(done){
      if(g.score===g.pool.length) unlockAch("perfect");
      if(g.enemyHP<=0&&g.playerHP<20) unlockAch("survive");
      return{...g,finished:true};
    }
    return{...g,idx:n,phase:"q",opts:getOptions(g.pool[n]),selected:null,timeLeft:40};
  });};

  // Compute activePart and filtered at component level
  const activePart = filterPart==="ALL" ? null : PARTS.find(p=>p.id===filterPart) || null;
  const needLesson = !!(activePart && activePart.lessons.length>0 && filterLesson==="ALL");

  const filtered = WORDS.filter(w=>{
    // Search filter
    if(search){
      const s=search.toLowerCase();
      if(!w.word.toLowerCase().includes(s)&&!w.zh.includes(search)&&!w.en.toLowerCase().includes(s)) return false;
    }
    // Part/Lesson filter
    if(filterPart==="ALL") return true;
    if(UNIT_PART[w.unit]!==filterPart) return false;
    if(filterLesson==="ALL") return true;
    return w.unit===filterLesson;
  });

  const renderBook=()=>{
    return(<div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 搜尋單字、中文或定義..." style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:10,padding:"9px 14px",color:C.text,fontSize:16,width:"100%",boxSizing:"border-box",fontFamily:"Georgia,serif",outline:"none",marginBottom:12}}/>

      {/* Part 篩選列 */}
      <div style={{overflowX:"auto",marginBottom:6,paddingBottom:2}}>
        <div style={{display:"flex",gap:6,width:"max-content"}}>
          <button onClick={()=>{setFilterPart("ALL");setFilterLesson("ALL");}} style={{...pill(filterPart==="ALL"?C.gold:C.textDim,11),cursor:"pointer",padding:"4px 11px",whiteSpace:"nowrap"}}>全部</button>
          {PARTS.map(p=>{
            const active=filterPart===p.id;
            return <button key={p.id} onClick={()=>{setFilterPart(p.id);setFilterLesson("ALL");}} style={{...pill(active?C.gold:C.textDim,11),cursor:"pointer",padding:"4px 10px",whiteSpace:"nowrap",fontWeight:active?"bold":"normal"}}>{p.label} {p.zh}</button>;
          })}
        </div>
      </div>

      {/* Lesson 篩選列 (只有選了有Lessons的Part才出現) */}
      {activePart&&activePart.lessons.length>0&&(
        <div style={{overflowX:"auto",marginBottom:10,paddingBottom:8,borderBottom:`1px solid ${C.border}`}}>
          <div style={{display:"flex",gap:6,width:"max-content"}}>
            <button onClick={()=>setFilterLesson("ALL")} style={{...pill(filterLesson==="ALL"?C.blue:C.textFaint,11),cursor:"pointer",padding:"4px 10px",whiteSpace:"nowrap"}}>全部</button>
            {activePart.lessons.map(l=>{
              const active=filterLesson===l.id;
              const cnt=WORDS.filter(w=>w.unit===l.id).length;
              return <button key={l.id} onClick={()=>setFilterLesson(l.id)} style={{...pill(active?C.blue:C.textFaint,11),cursor:"pointer",padding:"4px 10px",whiteSpace:"nowrap",fontWeight:active?"bold":"normal"}}>{l.label} {l.zh}({cnt})</button>;
            })}
          </div>
        </div>
      )}

      {/* 目前選擇的標題 */}
      {filterPart!=="ALL"&&(()=>{
        const lesson=activePart&&filterLesson!=="ALL"?activePart.lessons.find(l=>l.id===filterLesson):null;
        return <div style={cs({padding:"10px 14px",marginBottom:10,borderColor:C.gold+"44",background:C.gold+"08"})}>
          <div style={{fontSize:13,color:C.gold,fontWeight:"bold"}}>{activePart?.label} {activePart?.zh}{lesson?` › ${lesson.label} ${lesson.zh}`:""}</div>
          <div style={{fontSize:12,color:C.textDim}}>{filtered.length}個單字</div>
        </div>;
      })()}
      {/* 若選了有Lesson的Part但未選Lesson → 顯示提示，不顯示單字 */}
      {(()=>{
        if(needLesson) return(
          <div style={{textAlign:"center",padding:"40px 20px"}}>
            <div style={{fontSize:40,marginBottom:12}}>👆</div>
            <div style={{fontSize:15,color:C.gold,marginBottom:6}}>請選擇一個 Lesson</div>
            <div style={{fontSize:13,color:C.textDim}}>點擊上方 Lesson 按鈕來查看該課單字</div>
          </div>
        );
        if(!needLesson && filtered.length===0) return(
          <div style={{textAlign:"center",color:C.textDim,padding:32}}>找不到符合的單字</div>
        );
        return null;
      })()}
      {(()=>{
        if(needLesson) return null;
        return filtered.map(w=>{
        const sd=srs[w.id];const mastered=sd.reps>=3;const isOpen=expanded[w.id];const due=sd.nextReview<=Date.now();const unit=UNITS.find(u=>u.id===w.unit);
        return(<div key={w.id} style={cs({borderColor:mastered?C.green+"55":due?C.gold+"44":C.border,cursor:"pointer"})} onClick={()=>setExpanded(e=>({...e,[w.id]:!e[w.id]}))}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{display:"flex",alignItems:"center",gap:4,flexWrap:"wrap"}}>
              <span style={{fontSize:26,fontWeight:"bold",color:C.text}}>{w.word}</span>
              <SpeakBtn text={w.word} rate={0.8} size={22}/>
              <span style={{fontSize:14,color:C.goldDim}}>{w.pos}</span>
              {mastered&&<span style={{fontSize:12,color:C.green}}>✓熟練</span>}
              {due&&!mastered&&<span style={{fontSize:12,color:C.gold}}>⏰待複習</span>}
            </div>
            <div style={{display:"flex",gap:5,alignItems:"center"}}>
              <span style={pill(w.diff>=4?C.red:w.diff>=3?C.gold:C.green,13)}>{"★".repeat(w.diff)}</span>
              <button onClick={e=>{e.stopPropagation();setStarred(s=>({...s,[w.id]:!s[w.id]}));}} style={{background:"none",border:"none",color:starred[w.id]?C.gold:C.textFaint,fontSize:22,cursor:"pointer",padding:0,lineHeight:1}}>{starred[w.id]?"★":"☆"}</button>
            </div>
          </div>
          <div style={{fontSize:15,color:C.textDim,marginTop:2}}>{w.ph}</div>
          <div style={{fontSize:20,color:C.gold,marginTop:6,fontWeight:"600"}}>{w.zh}</div>
          {isOpen&&<div style={{marginTop:10,paddingTop:10,borderTop:`1px solid ${C.border}`}}>
            <div style={{fontSize:17,color:C.text,lineHeight:1.7,marginBottom:10}}>{w.en}</div>
            <div style={{marginBottom:10}}>
              <div style={{fontSize:15,color:C.textDim,fontStyle:"italic",lineHeight:1.7,display:"flex",alignItems:"flex-start",gap:4}}>
                <span style={{flex:1}}>"{w.ex}"</span>
                <SpeakBtn text={w.ex} rate={0.85} size={18}/>
              </div>
              {w.exZh&&<div style={{fontSize:15,color:C.blue+"cc",lineHeight:1.7,marginTop:4,paddingLeft:2}}>
                {w.exZh}
              </div>}
            </div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{unit&&<span style={pill(C.blue,10)}>{unit.label} {unit.zh}</span>}<span style={pill(C.textDim,10)}>複習{sd.reps}次</span>{sd.reps>0&&<span style={pill(C.textDim,10)}>間隔{sd.interval}天</span>}{sd.nextReview>Date.now()&&<span style={pill(C.purple,10)}>下次{Math.ceil((sd.nextReview-Date.now())/86400000)}天後</span>}</div>
          </div>}
        </div>);
      })
      })()}
    </div>
    );
  };

  const renderReview=()=>{
    if(rPhase==="empty")return(<div style={{textAlign:"center",padding:"48px 20px"}}><div style={{fontSize:56,marginBottom:16}}>🏆</div><div style={{fontSize:20,color:C.gold,marginBottom:8}}>今日複習完成！</div><div style={{color:C.textDim,fontSize:14}}>目前沒有到期的單字，明天再來！</div></div>);
    if(rPhase==="done"){const pct=Math.round((rStats.correct/rStats.total)*100);return(<div style={{textAlign:"center",padding:"32px 20px"}}><div style={{fontSize:52,marginBottom:12}}>{pct>=70?"🎉":"💪"}</div><div style={{fontSize:22,color:C.gold,marginBottom:6}}>複習完成！</div><div style={{fontSize:44,fontWeight:"bold",color:pct>=70?C.green:C.red,marginBottom:4}}>{pct}%</div><div style={{color:C.textDim,marginBottom:24}}>{rStats.correct}/{rStats.total} 答對</div><div style={{display:"flex",gap:10,justifyContent:"center"}}><button style={btn(C.gold)} onClick={startReview}>再次複習</button><button style={{...btn(C.surface,C.text),border:`1px solid ${C.border}`}} onClick={()=>setTab("book")}>單字書</button></div></div>);}
    const word=reviewQueue[rIdx];if(!word)return null;
    const unit=UNITS.find(u=>u.id===word.unit);
    return(<div>
      <div style={{background:C.border,borderRadius:4,height:5,marginBottom:14}}><div style={{background:C.gold,height:5,borderRadius:4,width:`${(rIdx/reviewQueue.length)*100}%`,transition:"width 0.3s"}}/></div>
      <div style={{display:"flex",justifyContent:"space-between",color:C.textDim,fontSize:12,marginBottom:16}}><span>{unit&&<span style={{color:C.blue}}>{unit.label} {unit.zh}</span>}</span><span>{rIdx+1}/{reviewQueue.length}</span></div>
      {rPhase==="q"?(<div>
        <div style={cs({textAlign:"center",padding:28,marginBottom:16,borderColor:C.borderHi})}><div style={{fontSize:11,color:C.textDim,marginBottom:10,letterSpacing:1}}>選出正確的中文意思</div><div style={{fontSize:34,fontWeight:"bold",color:C.text,marginBottom:6}}>{word.word}</div><div style={{fontSize:13,color:C.textDim}}>{word.ph} {word.pos}</div></div>
        {rOpts.map((opt,i)=><button key={opt.id} onClick={()=>handleRA(opt)} style={{display:"block",width:"100%",...cs({marginBottom:8,cursor:"pointer",textAlign:"left",padding:"13px 16px"}),color:C.text,fontSize:15,fontFamily:"Georgia,serif"}}><span style={{color:C.goldDim,marginRight:10}}>{["A","B","C","D"][i]}.</span>{opt.zh}</button>)}
      </div>):(<div>
        <div style={cs({textAlign:"center",padding:24,borderColor:rSelected===word.id?C.green:C.red,marginBottom:16})}><div style={{fontSize:16,color:rSelected===word.id?C.green:C.red,marginBottom:10}}>{rSelected===word.id?"✓ 答對了！":`✗ 正確答案：${word.zh}`}</div><div style={{fontSize:30,fontWeight:"bold",marginBottom:4}}>{word.word}</div><div style={{fontSize:17,color:C.gold,marginBottom:6}}>{word.zh}</div><div style={{fontSize:13,color:C.text,lineHeight:1.6,marginBottom:6}}>{word.en}</div><div style={{fontSize:12,color:C.textDim,fontStyle:"italic"}}>"{word.ex}"</div></div>
        <div style={{fontSize:13,color:C.textDim,textAlign:"center",marginBottom:10}}>這個單字記起來有多難？</div>
        <div style={{display:"flex",gap:8}}><button style={{...btn(C.red+"cc","#fff"),flex:1}} onClick={()=>handleScore(1)}>😓 難</button><button style={{...btn(C.gold),flex:1}} onClick={()=>handleScore(2)}>😊 普通</button><button style={{...btn(C.green,"#000"),flex:1}} onClick={()=>handleScore(3)}>😄 簡單</button></div>
      </div>)}
    </div>);
  };

  const renderGame=()=>{
    const flashBg = flash==="crit"?"rgba(167,139,250,0.25)":flash==="hit"?"rgba(61,219,126,0.15)":flash==="dmg"?"rgba(245,96,96,0.25)":"transparent";
    const wrapStyle={position:"relative",transition:"transform 0.05s",transform:shake?"translateX(-6px)":"none"};

    // ── LOBBY ──
    if(!game){
      const lvl=playerLevel; const rank=getRank(lvl); const xpPct=getLevelXP(playerXP);
      return(<div style={{padding:"20px 4px"}}>
        {/* Player Card */}
        <div style={{background:"linear-gradient(135deg,#1a1f38,#252a45)",border:`1px solid ${C.gold}44`,borderRadius:16,padding:"18px 20px",marginBottom:20,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:6}}>⚔️</div>
          <div style={{fontSize:22,fontWeight:"bold",color:C.gold}}>{rank}</div>
          <div style={{fontSize:13,color:C.textDim,marginBottom:12}}>Lv.{lvl} · {playerXP} XP 累計</div>
          <div style={{background:C.border,borderRadius:6,height:10,marginBottom:4,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(90deg,${C.gold},#ff8c00)`,height:10,borderRadius:6,width:`${xpPct}%`,transition:"width 0.5s"}}/>
          </div>
          <div style={{fontSize:11,color:C.textDim}}>{xpPct} / 100 XP → Lv.{lvl+1}</div>
        </div>
        {/* Rules */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
          {[{icon:"💥",label:"爆擊系統",desc:"連擊3+傷害翻倍"},{icon:"⚡",label:"速度獎勵",desc:"10秒內答對+10XP"},{icon:"🔥",label:"連擊火焰",desc:"連擊越多傷害越強"},{icon:"👑",label:"成就解鎖",desc:"完美通關超稀有"}].map(({icon,label,desc})=>(
            <div key={label} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px",textAlign:"center"}}>
              <div style={{fontSize:24,marginBottom:4}}>{icon}</div>
              <div style={{fontSize:12,color:C.gold,fontWeight:"bold"}}>{label}</div>
              <div style={{fontSize:11,color:C.textDim,marginTop:2}}>{desc}</div>
            </div>
          ))}
        </div>
        {/* Achievements */}
        {unlockedAch.size>0&&<div style={{marginBottom:20}}>
          <div style={{fontSize:13,color:C.gold,marginBottom:8}}>🏅 已解鎖成就</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {ACHIEVEMENTS_DEF.filter(a=>unlockedAch.has(a.id)).map(a=>(
              <div key={a.id} style={{...pill(C.gold,11),display:"inline-flex",alignItems:"center",gap:4}}>{a.icon} {a.name}</div>
            ))}
          </div>
        </div>}
        <button style={{...btn("linear-gradient(135deg,#f0c040,#ff8c00)","#000"),width:"100%",padding:"16px",fontSize:18,borderRadius:14,letterSpacing:1}} onClick={startGame}>⚔️ 開始戰鬥！</button>
      </div>);
    }

    // ── RESULT ──
    if(game.finished){
      const win=game.enemyHP<=0; const lost=game.playerHP<=0;
      const grade=game.score>=9?"S":game.score>=7?"A":game.score>=5?"B":"C";
      const gradeColor=grade==="S"?C.gold:grade==="A"?C.green:grade==="B"?C.blue:C.red;
      return(<div style={{textAlign:"center",padding:"24px 8px"}}>
        <div style={{fontSize:64,marginBottom:8,animation:"none"}}>{win?"🏆":lost?"💀":"⚔️"}</div>
        <div style={{fontSize:26,fontWeight:"bold",color:win?C.gold:C.red,marginBottom:4}}>{win?"攻城成功！":lost?"陣亡了...":"戰鬥結束"}</div>
        <div style={{fontSize:72,fontWeight:"900",color:gradeColor,marginBottom:4,textShadow:`0 0 20px ${gradeColor}`}}>{grade}</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginBottom:20}}>
          {[{l:"答對",v:`${game.score}/10`,c:C.green},{l:"最高連擊",v:`×${game.maxStreak||0}`,c:C.gold},{l:"獲得XP",v:`+${game.xpEarned||0}`,c:C.purple}].map(({l,v,c})=>(
            <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"12px 8px"}}>
              <div style={{fontSize:22,fontWeight:"bold",color:c}}>{v}</div>
              <div style={{fontSize:11,color:C.textDim,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        {/* Unlocked achievements this game */}
        {unlockedAch.size>0&&<div style={{marginBottom:20,textAlign:"left"}}>
          <div style={{fontSize:13,color:C.gold,marginBottom:8}}>🏅 累計成就 {unlockedAch.size}/{ACHIEVEMENTS_DEF.length}</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {ACHIEVEMENTS_DEF.filter(a=>unlockedAch.has(a.id)).map(a=>(
              <span key={a.id} style={pill(C.gold,11)}>{a.icon} {a.name}</span>
            ))}
          </div>
        </div>}
        <button style={{...btn("linear-gradient(135deg,#f0c040,#ff8c00)","#000"),width:"100%",padding:"14px",fontSize:17,borderRadius:12}} onClick={startGame}>⚔️ 再來一局</button>
      </div>);
    }

    const word=game.pool[game.idx];
    const unit=UNITS.find(u=>u.id===word.unit);
    const tc=game.timeLeft<=10?C.red:game.timeLeft<=20?C.gold:C.green;
    const enemyPct=(game.enemyHP/500)*100;
    const comboColor=game.streak>=5?"#a78bfa":game.streak>=3?"#ff6b35":"#f0c040";

    return(<div style={{...wrapStyle,background:flashBg,borderRadius:16,transition:"background 0.2s"}}>
      {/* Achievement Popup */}
      {achPopup&&<div style={{position:"fixed",top:"calc(70px + env(safe-area-inset-top,0px))",left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#252a45,#1a1f38)",border:`2px solid ${C.gold}`,borderRadius:16,padding:"12px 20px",zIndex:999,textAlign:"center",minWidth:220,boxShadow:"0 8px 32px rgba(0,0,0,0.6)"}}>
        <div style={{fontSize:32,marginBottom:4}}>{achPopup.icon}</div>
        <div style={{fontSize:13,color:C.gold,fontWeight:"bold"}}>成就解鎖！</div>
        <div style={{fontSize:16,color:C.text,fontWeight:"bold"}}>{achPopup.name}</div>
      </div>}

      {/* Floating texts */}
      <div style={{position:"relative",height:0,overflow:"visible"}}>
        {floats.map(f=>(
          <div key={f.id} style={{position:"absolute",left:`${f.x}%`,top:-20,color:f.color,fontSize:f.size,fontWeight:"900",pointerEvents:"none",animation:"floatUp 1.2s ease-out forwards",whiteSpace:"nowrap",textShadow:`0 2px 8px ${f.color}88`,zIndex:100}}>
            {f.text}
          </div>
        ))}
      </div>

      {/* CSS for float animation */}
      <style>{`@keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}60%{opacity:1;transform:translateY(-50px) scale(1.2)}100%{opacity:0;transform:translateY(-90px) scale(0.8)}}`}</style>

      {/* HUD - HP bars */}
      <div style={{background:"linear-gradient(135deg,#141726,#1b1f32)",border:`1px solid ${C.borderHi}`,borderRadius:14,padding:"14px 16px",marginBottom:14}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:22}}>🧙</div>
            <div style={{fontSize:11,color:C.green,fontWeight:"bold"}}>{game.playerHP} HP</div>
          </div>
          {/* Timer circle */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:28,fontWeight:"900",color:tc,lineHeight:1,textShadow:`0 0 12px ${tc}`}}>{game.timeLeft}</div>
            <div style={{fontSize:10,color:C.textDim}}>秒</div>
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:22}}>🏰</div>
            <div style={{fontSize:11,color:C.red,fontWeight:"bold"}}>{game.enemyHP} HP</div>
          </div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{flex:1,background:"#0d0f1a",borderRadius:6,height:12,overflow:"hidden"}}>
            <div style={{background:`linear-gradient(90deg,${game.playerHP>50?"#3ddb7e":game.playerHP>25?"#f0c040":"#f56060"},transparent)`,height:12,borderRadius:6,width:`${game.playerHP}%`,transition:"width 0.4s"}}/>
          </div>
          <span style={{fontSize:12,color:C.textDim,fontWeight:"bold"}}>VS</span>
          <div style={{flex:1,background:"#0d0f1a",borderRadius:6,height:12,overflow:"hidden"}}>
            <div style={{background:"linear-gradient(270deg,#f56060,#ff3333)",height:12,borderRadius:6,width:`${enemyPct}%`,transition:"width 0.4s",float:"right"}}/>
          </div>
        </div>
        {/* Combo display */}
        {game.streak>=2&&(
          <div style={{textAlign:"center",marginTop:10,padding:"6px",background:comboColor+"22",borderRadius:8,border:`1px solid ${comboColor}44`}}>
            <span style={{color:comboColor,fontWeight:"900",fontSize:game.streak>=5?18:15}}>
              {"🔥".repeat(Math.min(game.streak,5))} COMBO ×{game.streak}{game.streak>=3?" 💥CRIT!":""}
            </span>
          </div>
        )}
        {/* Progress */}
        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:C.textDim,marginTop:8}}>
          <span>{game.idx+1} / {game.pool.length} 題</span>
          <span style={{color:C.gold}}>得分 {game.score} ✓</span>
          <span>Lv.{playerLevel} {getRank(playerLevel)}</span>
        </div>
      </div>

      {/* Question or Result */}
      {game.phase==="timeout"?(
        <div>
          <div style={{background:"linear-gradient(135deg,#2a1515,#1b1f32)",border:`2px solid ${C.red}`,borderRadius:14,padding:"20px",marginBottom:14,textAlign:"center"}}>
            <div style={{color:C.red,fontSize:18,fontWeight:"bold",marginBottom:8}}>⏰ 時間到！ -25 HP</div>
            <div style={{fontSize:30,fontWeight:"bold",color:C.text}}>{word.word}</div>
            <div style={{color:C.gold,fontSize:17,marginTop:6}}>{word.zh}</div>
          </div>
          <button style={{...btn("linear-gradient(135deg,#f0c040,#ff8c00)","#000"),width:"100%",padding:"14px",fontSize:16,borderRadius:12}} onClick={nextGW}>繼續戰鬥 →</button>
        </div>
      ):game.phase==="q"?(
        <div>
          <div style={{background:"linear-gradient(135deg,#1b1f32,#252a45)",border:`1px solid ${C.borderHi}`,borderRadius:14,padding:"24px 20px",marginBottom:14,textAlign:"center"}}>
            {unit&&<div style={{marginBottom:8}}><span style={pill(C.blue,11)}>{unit.label} {unit.zh}</span></div>}
            <div style={{fontSize:36,fontWeight:"900",color:C.text,marginBottom:6,letterSpacing:1}}>{word.word}</div>
            <div style={{fontSize:14,color:C.textDim}}>{word.ph}</div>
          </div>
          {game.opts.map((opt,i)=>{
            const colors=["#5ba8f5","#3ddb7e","#f0c040","#a78bfa"];
            return(<button key={opt.id} onClick={()=>handleGA(opt)} style={{display:"block",width:"100%",background:`${colors[i]}12`,border:`1px solid ${colors[i]}44`,borderRadius:12,marginBottom:10,padding:"14px 18px",cursor:"pointer",textAlign:"left",color:C.text,fontSize:16,fontFamily:"Georgia,serif",transition:"all 0.15s"}}>
              <span style={{color:colors[i],fontWeight:"bold",marginRight:12,fontSize:14}}>{["A","B","C","D"][i]}</span>{opt.zh}
            </button>);
          })}
        </div>
      ):(
        <div>
          <div style={{background:game.selected===word.id?"linear-gradient(135deg,#0f2a1a,#1b1f32)":"linear-gradient(135deg,#2a1215,#1b1f32)",border:`2px solid ${game.selected===word.id?C.green:C.red}`,borderRadius:14,padding:"20px",marginBottom:14,textAlign:"center"}}>
            {game.selected===word.id?(
              <div>
                <div style={{fontSize:20,color:C.green,fontWeight:"bold",marginBottom:6}}>
                  {game.streak>=3?"💥 爆擊命中！":"⚔️ 命中！"} -{20+game.streak*10}{game.streak>=3?" ×2":""} HP
                </div>
                {game.streak>=3&&<div style={{fontSize:13,color:"#a78bfa",marginBottom:6}}>🔥 連擊加成！</div>}
              </div>
            ):(
              <div style={{fontSize:18,color:C.red,fontWeight:"bold",marginBottom:6}}>💔 答錯了！ -25 HP</div>
            )}
            <div style={{fontSize:32,fontWeight:"bold",color:C.text,marginBottom:4}}>{word.word}</div>
            <div style={{fontSize:20,color:C.gold,marginBottom:6}}>{word.zh}</div>
            <div style={{fontSize:14,color:C.textDim,lineHeight:1.6}}>{word.en}</div>
          </div>
          <button style={{...btn("linear-gradient(135deg,#f0c040,#ff8c00)","#000"),width:"100%",padding:"14px",fontSize:16,borderRadius:12}} onClick={nextGW}>繼續戰鬥 →</button>
        </div>
      )}
    </div>);
  };

  const renderStats=()=>{
    const mastered=WORDS.filter(w=>srs[w.id].reps>=3);const learning=WORDS.filter(w=>srs[w.id].reps>0&&srs[w.id].reps<3);const fresh=WORDS.filter(w=>srs[w.id].reps===0);const pct=Math.round((mastered.length/WORDS.length)*100);
    return(<div>
      <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:13,color:C.textDim,marginBottom:4}}>總學習進度</div><div style={{fontSize:44,fontWeight:"bold",color:C.gold}}>{pct}%</div><div style={{color:C.textDim,fontSize:13}}>{mastered.length}/{WORDS.length} 已熟練</div></div>
      <div style={{background:C.border,borderRadius:8,height:16,overflow:"hidden",marginBottom:8}}><div style={{display:"flex",height:"100%"}}><div style={{background:C.gold,width:`${(mastered.length/WORDS.length)*100}%`,transition:"width 0.6s"}}/><div style={{background:C.blue,width:`${(learning.length/WORDS.length)*100}%`}}/></div></div>
      <div style={{display:"flex",gap:14,marginBottom:20,fontSize:11,color:C.textDim}}><span><span style={{color:C.gold}}>■</span>熟練{mastered.length}</span><span><span style={{color:C.blue}}>■</span>學習中{learning.length}</span><span><span style={{color:C.textFaint}}>■</span>未開始{fresh.length}</span></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
        {[{l:"已熟練",v:mastered.length,c:C.gold},{l:"學習中",v:learning.length,c:C.blue},{l:"今日待複習",v:dueCount,c:C.red},{l:"單字總數",v:WORDS.length,c:C.purple}].map(({l,v,c})=>(
          <div key={l} style={{background:C.card,border:`1px solid ${C.border}`,borderRadius:12,padding:"16px 12px",textAlign:"center"}}><div style={{fontSize:30,fontWeight:"bold",color:c}}>{v}</div><div style={{fontSize:11,color:C.textDim,marginTop:2}}>{l}</div></div>
        ))}
      </div>
      <div style={{fontSize:14,color:C.gold,marginBottom:12}}>各 Part 進度</div>
      {PARTS.map(pt=>{
        const allLessons=pt.lessons.length>0?pt.lessons.map(l=>l.id):[pt.id.replace("P","U0").replace("P1","").trim()];
        const ptWords=WORDS.filter(w=>UNIT_PART[w.unit]===pt.id||w.unit===pt.id);
        if(ptWords.length===0)return null;
        const ptM=ptWords.filter(w=>srs[w.id].reps>=3).length;
        const p=Math.round((ptM/ptWords.length)*100);
        const isExpanded=pt.lessons.length>0;
        return(<div key={pt.id} style={{marginBottom:isExpanded?14:8}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:4}}>
            <span style={{color:C.text,fontWeight:"bold"}}><span style={{color:C.gold,marginRight:6}}>{pt.label}</span>{pt.zh}</span>
            <span style={{color:p===100?C.green:C.textDim,fontSize:12}}>{ptM}/{ptWords.length}</span>
          </div>
          <div style={{background:C.border,borderRadius:4,height:8,marginBottom:isExpanded?6:0}}>
            <div style={{background:p===100?C.green:C.gold,height:8,borderRadius:4,width:`${p}%`,transition:"width 0.5s"}}/>
          </div>
          {isExpanded&&pt.lessons.map(l=>{
            const lw=WORDS.filter(w=>w.unit===l.id);
            const lm=lw.filter(w=>srs[w.id].reps>=3).length;
            const lp=Math.round((lm/lw.length)*100);
            return(<div key={l.id} style={{marginLeft:12,marginBottom:5}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:2}}>
                <span style={{color:C.textDim}}>{l.label} {l.zh}</span>
                <span style={{color:lp===100?C.green:C.textFaint}}>{lm}/{lw.length}</span>
              </div>
              <div style={{background:C.border,borderRadius:3,height:5}}>
                <div style={{background:lp===100?C.green:C.blue,height:5,borderRadius:3,width:`${lp}%`,transition:"width 0.5s"}}/>
              </div>
            </div>);
          })}
        </div>);
      })}
      {Object.values(starred).some(Boolean)&&<div style={{marginTop:20}}><div style={{fontSize:14,color:C.gold,marginBottom:10}}>★ 已標記單字</div>{WORDS.filter(w=>starred[w.id]).map(w=><div key={w.id} style={cs({padding:"10px 14px",display:"flex",justifyContent:"space-between"})}><span style={{fontWeight:"bold"}}>{w.word}</span><span style={{color:C.gold}}>{w.zh}</span></div>)}</div>}
    </div>);
  };

  const TABS=[{id:"book",icon:"📖",label:"單字書"},{id:"review",icon:"🔁",label:`複習${dueCount>0?` (${dueCount})`:""}`},{id:"game",icon:"⚔️",label:"攻城"},{id:"stats",icon:"📊",label:"統計"}];
  return(
    <div style={{fontFamily:"Georgia,serif",background:C.bg,minHeight:"100dvh",color:C.text,maxWidth:500,margin:"0 auto"}}>
      {/* Global mobile resets injected once */}
      <style>{`
        * { -webkit-tap-highlight-color: transparent; }
        button, a { touch-action: manipulation; -webkit-user-select: none; user-select: none; }
        input { font-size: 16px; }
      `}</style>
      {/* Sticky header + tab bar as a single unit so they scroll away together cleanly */}
      <div style={{position:"sticky",top:0,zIndex:10,background:C.surface,borderBottom:`1px solid ${C.border}`}}>
        {/* Title bar — paddingTop absorbs the iOS status-bar / notch height */}
        <div style={{padding:"0 18px",paddingTop:"calc(13px + env(safe-area-inset-top,0px))",paddingBottom:"13px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{fontSize:17,fontWeight:"bold",color:C.gold}}>📚 IELTS Vocab</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>{dueCount>0&&<span style={{...pill(C.gold,11),fontWeight:"bold"}}>{dueCount}待複習</span>}<span style={{color:C.textDim,fontSize:12}}>{masteredCount}/{WORDS.length}</span></div>
        </div>
        <div style={{display:"flex"}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,padding:"10px 4px",background:"none",border:"none",borderBottom:tab===t.id?`2px solid ${C.gold}`:"2px solid transparent",color:tab===t.id?C.gold:C.textDim,fontSize:10.5,cursor:"pointer",fontFamily:"Georgia,serif"}}><div style={{fontSize:16,marginBottom:1}}>{t.icon}</div>{t.label}</button>)}
        </div>
      </div>
      {/* Content — paddingBottom absorbs the iOS home-indicator bar */}
      <div style={{padding:"16px 14px 0",paddingBottom:"calc(80px + env(safe-area-inset-bottom,0px))"}}>
        {tab==="book"&&renderBook()}
        {tab==="review"&&renderReview()}
        {tab==="game"&&renderGame()}
        {tab==="stats"&&renderStats()}
      </div>
    </div>
  );
}