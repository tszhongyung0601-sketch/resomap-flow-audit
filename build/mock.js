// Generates redesigned-screen mockups for the ResoMap merchant subscription flow.
const sharp = require('sharp');
const path = require('path');
const OUT = path.join(__dirname, 'img');

const W = 560, H = 1214;
const ORANGE = '#D2782F', CREAM = '#FDF6F0', CARD = '#FFFFFF', TINT = '#FBF0E6';
const BLUE = '#4A90C4', BLUEL = '#E7F1F8', INK = '#2A2E35', MUTE = '#8A9099';
const GREEN = '#2E7D4F', GREENL = '#E3F0E8', RED = '#C0392B', REDL = '#FBEBE9';
const LINE = '#E9E0D8', F = 'Microsoft JhengHei, Noto Sans TC, sans-serif';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const T = (x, y, t, o = {}) =>
  `<text x="${x}" y="${y}" font-family="${F}" font-size="${o.s || 22}" ` +
  `font-weight="${o.b ? 700 : 400}" fill="${o.c || INK}" ` +
  `text-anchor="${o.a || 'start'}">${esc(t)}</text>`;

const R = (x, y, w, h, o = {}) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.r === undefined ? 12 : o.r}" ` +
  `fill="${o.f || CARD}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 2}"` : ''}` +
  `${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`;

// chrome ---------------------------------------------------------------
function chrome(title) {
  return `
    <rect width="${W}" height="${H}" fill="${CREAM}"/>
    <rect width="${W}" height="118" fill="${ORANGE}"/>
    ${T(30, 40, '9:41', { s: 20, b: true, c: '#FFFFFF' })}
    ${T(W - 30, 40, '5G ▮', { s: 18, c: '#FFFFFF', a: 'end' })}
    ${T(30, 92, '‹', { s: 34, b: true, c: '#FFFFFF' })}
    ${T(W / 2, 92, 'ResoMap', { s: 26, b: true, c: '#FFFFFF', a: 'middle' })}
    ${title ? T(32, 168, title, { s: 30, b: true }) : ''}
  `;
}

function btn(x, y, w, h, label, o = {}) {
  return R(x, y, w, h, { f: o.f || BLUE, r: o.r === undefined ? 10 : o.r }) +
    T(x + w / 2, y + h / 2 + 9, label, { s: o.s || 24, b: true, c: o.c || '#FFFFFF', a: 'middle' });
}

function pill(x, y, label, o = {}) {
  const w = o.w || (String(label).length * (o.s || 18) * 0.95 + 26);
  return R(x, y, w, o.h || 34, { f: o.f || GREENL, r: 6, st: o.st, sw: 1.5 }) +
    T(x + w / 2, y + (o.h || 34) / 2 + 7, label, { s: o.s || 18, b: true, c: o.c || GREEN, a: 'middle' });
}

function bar(x, y, w, pct, o = {}) {
  return R(x, y, w, 14, { f: o.bg || '#EDE3DA', r: 7 }) +
    R(x, y, Math.max(14, w * pct), 14, { f: o.f || BLUE, r: 7 });
}

const wrap = (body) => `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body}</svg>`;

// ============================== M1 我的訂閱 ==============================
const m1 = wrap(chrome('我的訂閱') + `
  ${R(32, 200, 496, 250, { f: CARD })}
  ${T(56, 246, '專業版', { s: 28, b: true })}
  ${pill(160, 222, '訂閱中', { c: GREEN })}
  ${T(504, 246, '$3,800／年', { s: 20, c: MUTE, a: 'end' })}

  ${T(56, 306, '景點席位', { s: 20, c: MUTE })}
  ${T(504, 306, '已使用 1 ／ 3', { s: 20, b: true, a: 'end' })}
  ${bar(56, 322, 448, 1 / 3)}

  ${T(56, 388, '加值點數', { s: 20, c: MUTE })}
  ${T(320, 390, '240 點', { s: 26, b: true, a: 'end' })}
  ${btn(348, 366, 156, 42, '＋ 儲值', { f: BLUEL, c: BLUE, s: 20 })}

  ${R(32, 466, 496, 92, { f: TINT })}
  ${T(56, 502, '下次扣款', { s: 20, c: MUTE })}
  ${T(504, 502, '2027／08／28', { s: 20, b: true, a: 'end' })}
  ${T(56, 538, '試用剩餘', { s: 20, c: MUTE })}
  ${T(504, 538, '已結束（正式訂閱中）', { s: 20, a: 'end' })}

  ${R(32, 578, 496, 132, { f: '#FFF6E8', st: ORANGE, sw: 2 })}
  ${T(56, 622, '你還有 2 個席位沒有用', { s: 24, b: true, c: '#9A5A18' })}
  ${T(56, 658, '每個席位可以認領一間店，開始做語音導覽。', { s: 19, c: '#9A5A18' })}
  ${btn(56, 676, 200, 0, '', {})}
  ${T(56, 692, '立即使用 →', { s: 21, b: true, c: ORANGE })}

  ${btn(32, 742, 240, 62, '變更方案')}
  ${btn(288, 742, 240, 62, '管理我的景點')}

  ${T(32, 872, '我的景點', { s: 24, b: true })}
  ${R(32, 894, 496, 104, { f: CARD })}
  ${T(56, 936, '香記烤鴨', { s: 24, b: true })}
  ${pill(186, 914, '已認領', { c: GREEN })}
  ${T(56, 972, '1 則語音 · 播放 1,284 次', { s: 19, c: MUTE })}
  ${T(504, 950, '›', { s: 34, c: MUTE, a: 'end' })}

  ${R(32, 1014, 496, 84, { f: 'none', st: LINE, sw: 2, dash: '8 6' })}
  ${T(280, 1064, '＋ 認領第 2 間店', { s: 22, b: true, c: BLUE, a: 'middle' })}
`);

// ============================== M2 付款成功 ==============================
const m2 = wrap(`
  <rect width="${W}" height="${H}" fill="${CREAM}"/>
  <rect width="${W}" height="118" fill="${ORANGE}"/>
  ${T(30, 40, '9:41', { s: 20, b: true, c: '#FFFFFF' })}
  ${T(W / 2, 92, 'ResoMap', { s: 26, b: true, c: '#FFFFFF', a: 'middle' })}

  <circle cx="280" cy="268" r="62" fill="${GREENL}"/>
  <path d="M252 268 l20 22 l38 -44" stroke="${GREEN}" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${T(280, 386, '訂閱完成', { s: 34, b: true, a: 'middle' })}
  ${T(280, 428, '專業版 · 你有 3 個景點席位', { s: 22, c: MUTE, a: 'middle' })}

  ${T(32, 508, '接下來三步就能上線', { s: 24, b: true })}

  ${R(32, 532, 496, 96, { f: CARD })}
  <circle cx="76" cy="580" r="22" fill="${BLUE}"/>
  ${T(76, 588, '1', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(116, 572, '找到你的店', { s: 23, b: true })}
  ${T(116, 604, '搜尋店名，或自己建立', { s: 19, c: MUTE })}

  ${R(32, 640, 496, 96, { f: CARD })}
  <circle cx="76" cy="688" r="22" fill="#C9D4DD"/>
  ${T(76, 696, '2', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(116, 680, '認領這間店', { s: 23, b: true })}
  ${T(116, 712, '上傳證明，我們一個工作天內確認', { s: 19, c: MUTE })}

  ${R(32, 748, 496, 96, { f: CARD })}
  <circle cx="76" cy="796" r="22" fill="#C9D4DD"/>
  ${T(76, 804, '3', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(116, 788, '上傳語音導覽', { s: 23, b: true })}
  ${T(116, 820, '錄音、文案、照片', { s: 19, c: MUTE })}

  ${btn(32, 900, 496, 70, '開始：找到我的店')}
  ${T(280, 1010, '稍後再說', { s: 21, c: MUTE, a: 'middle' })}
`);

// ============================== M3 找到我的店（Google 版） ==============================
const m3 = wrap(chrome('找到我的店') + `
  ${T(32, 208, '搜尋你的店名，找到後就能認領', { s: 20, c: MUTE })}
  ${R(32, 236, 496, 62, { f: CARD, st: BLUE, sw: 2 })}
  ${T(60, 276, '🔍', { s: 22 })}
  ${T(100, 276, '香記烤鴨', { s: 24, b: true })}

  ${T(32, 344, '搜尋結果', { s: 20, c: MUTE })}
  ${R(32, 362, 496, 130, { f: CARD })}
  ${T(56, 406, '香記烤鴨', { s: 25, b: true })}
  ${T(56, 442, '台中市南區台中路 252 號', { s: 19, c: MUTE })}
  ${btn(56, 462, 180, 0, '', {})}
  ${btn(320, 402, 184, 52, '這是我的店', { s: 20 })}

  ${R(32, 508, 496, 130, { f: CARD })}
  ${T(56, 552, '香記烤鴨（民權店）', { s: 25, b: true })}
  ${T(56, 588, '台中市北區民權路 88 號', { s: 19, c: MUTE })}
  ${btn(320, 548, 184, 52, '這是我的店', { s: 20 })}

  ${R(32, 686, 496, 168, { f: REDL, st: RED, sw: 2 })}
  ${T(56, 730, '找不到你的店？', { s: 24, b: true, c: RED })}
  ${T(56, 768, '這個版本只能搜到 Google 已收錄的店。', { s: 19, c: '#7A2A22' })}
  ${T(56, 800, '新開幕、攤位、小店可能還沒有。', { s: 19, c: '#7A2A22' })}
  ${T(56, 836, '告訴我們 →', { s: 21, b: true, c: RED })}

  ${T(32, 916, '⚠ Google 版的天花板', { s: 20, b: true, c: MUTE })}
  ${T(32, 950, '搜不到就走不下去，只能請商家先去', { s: 19, c: MUTE })}
  ${T(32, 982, '登錄 Google 商家，等審核通過再回來。', { s: 19, c: MUTE })}
`);

// ============================== M4 找到我的店（OSM 版） ==============================
const m4 = wrap(chrome('找到我的店') + `
  ${T(32, 208, '搜尋你的店名。找不到也沒關係，可以自己建。', { s: 20, c: MUTE })}
  ${R(32, 236, 496, 62, { f: CARD, st: BLUE, sw: 2 })}
  ${T(60, 276, '🔍', { s: 22 })}
  ${T(100, 276, '好味小館', { s: 24, b: true })}

  ${T(32, 344, '搜尋結果', { s: 20, c: MUTE })}
  ${R(32, 362, 496, 118, { f: CARD })}
  ${T(280, 412, '沒有找到「好味小館」', { s: 23, b: true, a: 'middle' })}
  ${T(280, 450, '這間店還不在地圖資料裡', { s: 19, c: MUTE, a: 'middle' })}

  ${R(32, 506, 496, 214, { f: GREENL, st: GREEN, sw: 2.5 })}
  ${T(56, 552, '自己建立這間店', { s: 26, b: true, c: GREEN })}
  ${T(56, 592, '填店名、地址，在地圖上點一下位置，', { s: 20, c: '#215C3C' })}
  ${T(56, 624, '就能直接認領、開始做語音導覽。', { s: 20, c: '#215C3C' })}
  ${btn(56, 648, 448, 60, '＋ 手動建立我的店', { f: GREEN, s: 23 })}

  ${T(32, 782, '✓ OSM 版的差別', { s: 20, b: true, c: GREEN })}
  ${T(32, 816, '新開幕的店、夜市攤位、市場攤商、', { s: 19, c: MUTE })}
  ${T(32, 848, '沒有店面的景點——當天就能上架，', { s: 19, c: MUTE })}
  ${T(32, 880, '不用先去等 Google 收錄。', { s: 19, c: MUTE })}

  ${R(32, 930, 496, 92, { f: TINT })}
  ${T(56, 972, '流程不會斷', { s: 22, b: true, c: '#9A5A18' })}
  ${T(56, 1006, '搜不到 → 自己建 → 直接進認領', { s: 19, c: '#9A5A18' })}
`);

// ============================== M5 手動建立地點 ==============================
const m5 = wrap(chrome('建立我的店') + `
  ${T(32, 206, '店名', { s: 20, c: MUTE })}
  ${R(32, 222, 496, 58, { f: CARD, st: LINE })}
  ${T(56, 260, '好味小館', { s: 23, b: true })}

  ${T(32, 322, '地址', { s: 20, c: MUTE })}
  ${T(504, 322, '已自動帶入，可修改', { s: 17, c: BLUE, a: 'end' })}
  ${R(32, 338, 496, 58, { f: CARD, st: LINE })}
  ${T(56, 376, '台中市西區向上路一段 100 號', { s: 21 })}

  ${T(32, 438, '在地圖上點出正確位置', { s: 20, c: MUTE })}
  ${T(504, 438, '最關鍵的欄位', { s: 17, b: true, c: RED, a: 'end' })}
  ${R(32, 454, 496, 250, { f: '#EFEBE4', r: 12 })}
  <g stroke="#D6CEC4" stroke-width="10" fill="none">
    <path d="M32 560 L528 528"/><path d="M240 454 L286 704"/>
    <path d="M32 650 L528 664"/>
  </g>
  <g stroke="#E4DED6" stroke-width="5" fill="none">
    <path d="M120 454 L150 704"/><path d="M400 454 L430 704"/>
  </g>
  <path d="M282 556 a26 26 0 1 1 0.1 0 M282 556 l0 44" stroke="${RED}" stroke-width="0" fill="none"/>
  <circle cx="282" cy="562" r="24" fill="${RED}"/>
  <path d="M262 578 L282 616 L302 578 Z" fill="${RED}"/>
  <circle cx="282" cy="562" r="9" fill="#FFFFFF"/>
  ${R(300, 646, 214, 44, { f: '#FFFFFFEE', r: 8 })}
  ${T(407, 676, '拖曳大頭針調整', { s: 18, c: INK, a: 'middle' })}

  ${T(32, 748, '類別', { s: 20, c: MUTE })}
  ${pill(32, 766, '餐飲', { f: BLUE, c: '#FFFFFF', s: 19, h: 40, w: 92 })}
  ${pill(136, 766, '旅宿', { f: CARD, c: MUTE, st: LINE, s: 19, h: 40, w: 92 })}
  ${pill(240, 766, '零售', { f: CARD, c: MUTE, st: LINE, s: 19, h: 40, w: 92 })}
  ${pill(344, 766, '景點', { f: CARD, c: MUTE, st: LINE, s: 19, h: 40, w: 92 })}

  ${R(32, 838, 496, 84, { f: TINT })}
  ${T(56, 878, '營業時間、電話（選填）', { s: 20, c: '#9A5A18' })}
  ${T(504, 878, '＋ 新增', { s: 20, b: true, c: ORANGE, a: 'end' })}

  ${R(32, 946, 496, 72, { f: BLUEL })}
  ${T(56, 992, 'ℹ 這個地點會由 ResoMap 審核後建立', { s: 19, c: '#2C6A94' })}

  ${btn(32, 1042, 496, 70, '建立並認領這間店', { f: GREEN })}
`);

// ============================== M6 認領申請 ==============================
const m6 = wrap(chrome('認領這間店') + `
  ${R(32, 200, 496, 106, { f: CARD })}
  ${T(56, 244, '香記烤鴨', { s: 26, b: true, c: '#E0526B' })}
  ${T(56, 282, '台中市南區台中路 252 號', { s: 19, c: MUTE })}

  ${R(32, 328, 496, 76, { f: BLUEL })}
  ${T(56, 362, '認領成功後會使用 1 個席位', { s: 21, b: true, c: '#2C6A94' })}
  ${T(56, 392, '目前：已使用 0 ／ 3，取消認領可歸還', { s: 18, c: '#2C6A94' })}

  ${T(32, 456, '證明這是你的店', { s: 26, b: true })}
  ${T(32, 492, '擇一上傳即可，我們會在 1 個工作天內確認。', { s: 19, c: MUTE })}

  ${R(32, 518, 240, 168, { f: CARD, st: BLUE, sw: 2, dash: '8 6' })}
  ${T(152, 592, '＋', { s: 44, b: true, c: BLUE, a: 'middle' })}
  ${T(152, 636, '營業登記', { s: 21, b: true, a: 'middle' })}
  ${T(152, 666, '或稅籍證明', { s: 17, c: MUTE, a: 'middle' })}

  ${R(288, 518, 240, 168, { f: CARD, st: LINE, sw: 2, dash: '8 6' })}
  ${T(408, 592, '＋', { s: 44, b: true, c: MUTE, a: 'middle' })}
  ${T(408, 636, '店面照片', { s: 21, b: true, a: 'middle' })}
  ${T(408, 666, '要看得到招牌', { s: 17, c: MUTE, a: 'middle' })}

  ${T(32, 736, '補充說明（選填）', { s: 20, c: MUTE })}
  ${R(32, 752, 496, 110, { f: CARD, st: LINE })}
  ${T(56, 794, '我是這間店的負責人…', { s: 20, c: '#B7BCC3' })}

  ${R(32, 890, 496, 92, { f: TINT })}
  ${T(56, 928, '審核不通過會告訴你原因，', { s: 19, c: '#9A5A18' })}
  ${T(56, 960, '可以補件後再送一次。', { s: 19, c: '#9A5A18' })}

  ${btn(32, 1010, 496, 70, '送出認領申請')}
`);

// ============================== M7 審核中狀態 ==============================
const m7 = wrap(chrome('') + `
  ${T(32, 172, '香記烤鴨', { s: 28, b: true, c: '#E0526B' })}
  ${pill(196, 150, '你已認領', { c: GREEN })}
  ${T(32, 208, '台中市南區台中路 252 號', { s: 19, c: MUTE })}
  <line x1="32" y1="240" x2="528" y2="240" stroke="${LINE}" stroke-width="2"/>

  ${T(32, 288, '導覽語音列表', { s: 26, b: true })}

  ${R(32, 314, 496, 178, { f: CARD, st: ORANGE, sw: 2 })}
  ${pill(56, 340, '審核中', { f: '#FFF1DF', c: '#9A5A18', st: ORANGE })}
  ${T(504, 364, '08／27 送審', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 424, '鴨霸子現烤', { s: 25, b: true })}
  ${T(56, 458, '01:52 · 中文 · 含配圖', { s: 19, c: MUTE })}
  ${bar(56, 472, 448, 0.62, { f: ORANGE })}
  ${T(56, 512, '', { s: 18 })}
  ${T(56, 508, '', { s: 18 })}

  ${T(56, 520, '', { s: 1 })}
  ${R(32, 506, 496, 60, { f: '#FFF6E8' })}
  ${T(56, 544, '預計 1 個工作天內完成，通過會通知你', { s: 19, c: '#9A5A18' })}

  ${R(32, 594, 496, 160, { f: CARD })}
  ${pill(56, 620, '已上架', { c: GREEN })}
  ${T(504, 644, '08／20 上架', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 704, '一鴨二吃的故事', { s: 25, b: true })}
  ${T(56, 738, '02:14 · 中文 · 播放 1,284 次', { s: 19, c: MUTE })}

  ${R(32, 786, 496, 84, { f: 'none', st: LINE, sw: 2, dash: '8 6' })}
  ${T(280, 836, '＋ 新增語音導覽', { s: 22, b: true, c: BLUE, a: 'middle' })}

  ${R(32, 902, 496, 156, { f: BLUEL })}
  ${T(56, 946, '想再多做幾則？', { s: 23, b: true, c: '#2C6A94' })}
  ${T(56, 984, '英文版、日文版、季節限定菜色，', { s: 19, c: '#2C6A94' })}
  ${T(56, 1016, '用加值點數就能加開。目前 240 點。', { s: 19, c: '#2C6A94' })}
  ${T(56, 1046, '', { s: 1 })}
`);

// ============================== M8 通知 ==============================
const m8 = wrap(`
  <rect width="${W}" height="${H}" fill="#2A2E35"/>
  ${T(280, 92, '9:41', { s: 44, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(280, 134, '8月 27日 星期四', { s: 20, c: '#B9BFC7', a: 'middle' })}

  ${R(32, 200, 496, 132, { f: '#FFFFFFF2' })}
  <rect x="56" y="226" width="36" height="36" rx="8" fill="${ORANGE}"/>
  ${T(74, 252, 'R', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(104, 250, 'ResoMap', { s: 19, b: true, c: MUTE })}
  ${T(504, 250, '現在', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 294, '訂閱完成，你有 3 個席位', { s: 23, b: true })}
  ${T(56, 322, '下一步：找到你的店 →', { s: 20, c: BLUE })}

  ${R(32, 352, 496, 132, { f: '#FFFFFFF2' })}
  <rect x="56" y="378" width="36" height="36" rx="8" fill="${ORANGE}"/>
  ${T(74, 404, 'R', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(104, 402, 'ResoMap', { s: 19, b: true, c: MUTE })}
  ${T(504, 402, '1 小時前', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 446, '香記烤鴨 已通過認領', { s: 23, b: true })}
  ${T(56, 474, '可以開始上傳語音導覽了', { s: 20, c: MUTE })}

  ${R(32, 504, 496, 132, { f: '#FFFFFFF2' })}
  <rect x="56" y="530" width="36" height="36" rx="8" fill="${ORANGE}"/>
  ${T(74, 556, 'R', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(104, 554, 'ResoMap', { s: 19, b: true, c: MUTE })}
  ${T(504, 554, '昨天', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 598, '你的語音已上架', { s: 23, b: true })}
  ${T(56, 626, '「鴨霸子現烤」現在遊客聽得到了 →', { s: 20, c: BLUE })}

  ${R(32, 656, 496, 132, { f: '#FFFFFFF2' })}
  <rect x="56" y="682" width="36" height="36" rx="8" fill="${ORANGE}"/>
  ${T(74, 708, 'R', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(104, 706, 'ResoMap', { s: 19, b: true, c: MUTE })}
  ${T(504, 706, '3 天前', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 750, '需要補件', { s: 23, b: true, c: RED })}
  ${T(56, 778, '店面照片看不到招牌，可以重傳', { s: 20, c: MUTE })}

  ${R(32, 808, 496, 132, { f: '#FFFFFFF2' })}
  <rect x="56" y="834" width="36" height="36" rx="8" fill="${ORANGE}"/>
  ${T(74, 860, 'R', { s: 22, b: true, c: '#FFFFFF', a: 'middle' })}
  ${T(104, 858, 'ResoMap', { s: 19, b: true, c: MUTE })}
  ${T(504, 858, '上週', { s: 18, c: MUTE, a: 'end' })}
  ${T(56, 902, '訂閱將於 9／15 續訂', { s: 23, b: true })}
  ${T(56, 930, '專業版 $3,800／年', { s: 20, c: MUTE })}

  ${T(280, 1020, '目前這五則，商家一則都收不到', { s: 22, b: true, c: '#E09A50', a: 'middle' })}
`);

// ============================== M9 商家儀表板 ==============================
const m9 = wrap(chrome('我的景點') + `
  ${R(32, 200, 496, 132, { f: CARD })}
  ${T(56, 246, '香記烤鴨', { s: 27, b: true, c: '#E0526B' })}
  ${pill(210, 222, '已上架', { c: GREEN })}
  ${T(56, 286, '台中市南區台中路 252 號', { s: 19, c: MUTE })}
  ${T(56, 318, '2 則語音導覽', { s: 19, c: MUTE })}

  ${T(32, 388, '這個月', { s: 24, b: true })}
  ${R(32, 408, 156, 132, { f: CARD })}
  ${T(110, 470, '1,284', { s: 34, b: true, c: BLUE, a: 'middle' })}
  ${T(110, 508, '播放次數', { s: 19, c: MUTE, a: 'middle' })}
  ${R(202, 408, 156, 132, { f: CARD })}
  ${T(280, 470, '68%', { s: 34, b: true, c: GREEN, a: 'middle' })}
  ${T(280, 508, '完聽率', { s: 19, c: MUTE, a: 'middle' })}
  ${R(372, 408, 156, 132, { f: CARD })}
  ${T(450, 470, '92', { s: 34, b: true, c: ORANGE, a: 'middle' })}
  ${T(450, 508, '被收藏', { s: 19, c: MUTE, a: 'middle' })}

  ${T(32, 598, '聽的人都幾點來', { s: 24, b: true })}
  ${R(32, 618, 496, 158, { f: CARD })}
  <g fill="${BLUE}">
    <rect x="64" y="716" width="34" height="30" rx="4"/>
    <rect x="112" y="700" width="34" height="46" rx="4"/>
    <rect x="160" y="674" width="34" height="72" rx="4"/>
    <rect x="208" y="656" width="34" height="90" rx="4" fill="#2C6A94"/>
    <rect x="256" y="688" width="34" height="58" rx="4"/>
    <rect x="304" y="704" width="34" height="42" rx="4"/>
    <rect x="352" y="668" width="34" height="78" rx="4" fill="#2C6A94"/>
    <rect x="400" y="694" width="34" height="52" rx="4"/>
    <rect x="448" y="718" width="34" height="28" rx="4"/>
  </g>
  ${T(64, 770, '10時', { s: 15, c: MUTE })}
  ${T(208, 770, '12時', { s: 15, c: MUTE })}
  ${T(352, 770, '18時', { s: 15, c: MUTE })}
  ${T(448, 770, '21時', { s: 15, c: MUTE })}

  ${R(32, 812, 496, 106, { f: TINT })}
  ${T(56, 856, '席位 1 ／ 3', { s: 22, b: true, c: '#9A5A18' })}
  ${T(504, 856, '加值點數 240 點', { s: 22, b: true, c: '#9A5A18', a: 'end' })}
  ${T(56, 894, '還可以認領 2 間店', { s: 18, c: '#9A5A18' })}

  ${btn(32, 946, 240, 66, '＋ 新增語音')}
  ${btn(288, 946, 240, 66, '買曝光', { f: ORANGE })}

  ${T(280, 1074, '目前商家看不到任何一個數字', { s: 20, b: true, c: RED, a: 'middle' })}
`);

const all = { m1, m2, m3, m4, m5, m6, m7, m8, m9 };
(async () => {
  for (const [k, svg] of Object.entries(all)) {
    await sharp(Buffer.from(svg)).png().toFile(path.join(OUT, k + '.png'));
    console.log('wrote img/' + k + '.png');
  }
})();
