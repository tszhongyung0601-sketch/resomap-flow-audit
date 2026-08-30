const pptxgen = require('pptxgenjs');
const path = require('path');
const IMG = (n) => path.join(__dirname, 'img', n + '.png');

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Product';
pres.title  = 'ResoMap 商家訂閱模式改版提案';

// ---- palette -------------------------------------------------------------
const DARK  = '1B2430';
const DARK2 = '2B3A4E';
const LIGHT = 'FFFFFF';
const TINT  = 'F1F4F7';
const INK   = '14181F';
const BODY  = '3A4552';
const MUTE  = '6B7684';
const RED   = 'B3251C';
const REDT  = 'FBEBE9';
const ORNG  = 'C06A22';
const ORNGT = 'FBF0E6';
const TEAL  = '1F6F6B';
const TEALT = 'E2EDEC';
const GOO   = '2F4A7A';      // Google 版
const GOOT  = 'E5EAF3';
const OSM   = '2E7D4F';      // OSM 版
const OSMT  = 'E3F0E8';

const CJK = 'Microsoft JhengHei';
const NUM = 'Arial';

const sh = () => ({ type: 'outer', color: '1B2430', blur: 14, offset: 4, angle: 90, opacity: 0.20 });

// ---- helpers -------------------------------------------------------------
const darkSlide = () => { const s = pres.addSlide(); s.background = { color: DARK }; return s; };
const lightSlide = () => { const s = pres.addSlide(); s.background = { color: LIGHT }; return s; };

function head(s, o) {
  const c = o.color || TEAL;
  if (o.num) {
    s.addShape(pres.ShapeType.ellipse, { x: 0.6, y: 0.42, w: 0.64, h: 0.64, fill: { color: c } });
    s.addText(String(o.num), {
      x: 0.6, y: 0.42, w: 0.64, h: 0.64, align: 'center', valign: 'middle',
      fontFace: NUM, fontSize: String(o.num).length > 2 ? 14 : 19, bold: true, color: 'FFFFFF',
      margin: 0, isTextBox: true,
    });
  }
  const tx = o.num ? 1.42 : 0.6;
  if (o.kicker) {
    s.addText(o.kicker, {
      x: tx, y: 0.38, w: 11.3, h: 0.28, fontFace: CJK, fontSize: 11.5, bold: true,
      color: c, charSpacing: 2, margin: 0, isTextBox: true,
    });
  }
  s.addText(o.title, {
    x: tx, y: o.kicker ? 0.66 : 0.5, w: 11.3, h: 0.62, fontFace: CJK, fontSize: 27, bold: true,
    color: INK, margin: 0, isTextBox: true,
  });
}

const foot = (s, t) => s.addText(t, {
  x: 0.6, y: 6.94, w: 12.1, h: 0.32, fontFace: CJK, fontSize: 9.5, color: MUTE, margin: 0, isTextBox: true,
});

function card(s, x, y, w, h, title, lines, fillC, titleC) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: fillC }, rectRadius: 0.04 });
  s.addText(title, {
    x: x + 0.32, y: y + 0.22, w: w - 0.64, h: 0.36, fontFace: CJK, fontSize: 14.5, bold: true,
    color: titleC, margin: 0, isTextBox: true,
  });
  if (lines && lines.length) {
    s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })), {
      x: x + 0.32, y: y + 0.66, w: w - 0.64, h: h - 0.9, fontFace: CJK, fontSize: 12,
      color: BODY, lineSpacing: 19, margin: 0, isTextBox: true, valign: 'top',
    });
  }
}

function section(letter, title, sub, tag) {
  const s = darkSlide();
  s.addText(letter, { x: 0.85, y: 1.85, w: 2.6, h: 1.6, fontFace: NUM, fontSize: 90, bold: true, color: DARK2, margin: 0, isTextBox: true });
  s.addText(title, { x: 0.85, y: 3.35, w: 10, h: 0.9, fontFace: CJK, fontSize: 38, bold: true, color: 'FFFFFF', margin: 0, isTextBox: true });
  s.addText(sub, { x: 0.85, y: 4.35, w: 9.5, h: 1.0, fontFace: CJK, fontSize: 14.5, color: 'A8B4C2', lineSpacing: 25, margin: 0, isTextBox: true });
  s.addText(tag, { x: 0.85, y: 5.55, w: 7, h: 0.35, fontFace: CJK, fontSize: 12, bold: true, color: 'E09A50', charSpacing: 2, margin: 0, isTextBox: true });
  return s;
}

// ============================================================ 1 COVER
{
  const s = darkSlide();
  s.addText('RESOMAP　／　商家訂閱模式改版提案　／　2026.08.29 會議', {
    x: 0.85, y: 1.15, w: 9.5, h: 0.3, fontFace: CJK, fontSize: 12, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('訂閱模式怎麼改，\nGoogle 版與 OSM 版各一套', {
    x: 0.85, y: 1.75, w: 10.5, h: 2.4, fontFace: CJK, fontSize: 44, bold: true,
    color: 'FFFFFF', lineSpacing: 58, margin: 0, isTextBox: true,
  });
  s.addShape(pres.ShapeType.rect, { x: 0.85, y: 4.3, w: 1.5, h: 0.04, fill: { color: 'E09A50' } });
  s.addText([
    { text: '依 21 步商家訂閱流程實測結果，重新設計付費與上架流程。', options: { breakLine: true } },
    { text: '兩版共用 9 步，真正不同的只有「怎麼找到／建立一個地點」。', options: { bold: true, color: 'FFFFFF' } },
  ], {
    x: 0.85, y: 4.62, w: 9.5, h: 1.0, fontFace: CJK, fontSize: 15, color: 'B8C2CE', lineSpacing: 27, margin: 0, isTextBox: true,
  });
  const tags = [['扣點數模型', 'E09A50'], ['流程改版', '5FBDB2'], ['Google 版', '8FAEDC'], ['OSM 版', '7FC79B']];
  tags.forEach((t, i) => {
    const x = 0.85 + i * 2.4;
    s.addShape(pres.ShapeType.roundRect, { x, y: 6.05, w: 2.15, h: 0.5, fill: { color: DARK2 }, rectRadius: 0.06 });
    s.addText(t[0], { x, y: 6.05, w: 2.15, h: 0.5, align: 'center', valign: 'middle', fontFace: CJK, fontSize: 12.5, bold: true, color: t[1], margin: 0, isTextBox: true });
  });
  s.addNotes('這份是提案，不是稽核。稽核那份是這份的依據。');
}

// ============================================================ 2 AGENDA
{
  const s = lightSlide();
  head(s, { title: '明天要談的三件事', kicker: '議程對齊' });
  const items = [
    ['01', 'Jay 提的「改成扣點數」', '目前方案是「幾個景點」的席位制，點數從未被定義也未被顯示。\n扣點數指的是哪一種模型？這一題不先確定，流程沒辦法畫。', ORNG, ORNGT],
    ['02', '商家訂閱流程怎麼改', '實測 21 步找到 3 處死路、0 則通知。\n最大的一項改動是：認領要從第 11 步往前移到第 3 步。', TEAL, TEALT],
    ['03', '沿用 Google，還是連 OSM 一起評估', '已確認：兩邊都要。\n本提案兩套流程都畫，並標出唯一真正不同的那一步。', GOO, GOOT],
  ];
  items.forEach((it, i) => {
    const y = 1.78 + i * 1.66;
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.48, fill: { color: it[4] }, rectRadius: 0.04 });
    s.addText(it[0], { x: 0.95, y: y + 0.24, w: 0.7, h: 0.36, fontFace: NUM, fontSize: 16, bold: true, color: it[3], margin: 0, isTextBox: true });
    s.addText(it[1], { x: 1.75, y: y + 0.2, w: 4.4, h: 0.4, fontFace: CJK, fontSize: 16, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(it[2], { x: 1.75, y: y + 0.68, w: 10.4, h: 0.66, fontFace: CJK, fontSize: 12.5, color: BODY, lineSpacing: 19, margin: 0, isTextBox: true });
  });
  foot(s, '資料來源：2026/08/26–08/27 商家訂閱流程實測（21 步，含後台 2 張截圖）。');
  s.addNotes('先對齊議程，避免會議發散。');
}

// ============================================================ 3 SECTION A
section('A', '訂閱模式', '先把「點數」講清楚。目前這個字在產品裡沒有定義，\n也沒有任何一個畫面顯示過餘額。', '扣點數模型');

// ============================================================ 4 CURRENT MODEL
{
  const s = lightSlide();
  head(s, { title: '現況：有「點」這個字，但沒有點數這個東西', kicker: '訂閱模式現況', color: RED });
  s.addImage({ path: IMG('s04'), x: 0.75, y: 1.7, w: 2.26, h: 4.9, shadow: sh() });
  s.addImage({ path: IMG('s06'), x: 3.25, y: 1.7, w: 2.26, h: 4.9, shadow: sh() });
  s.addText('方案頁', { x: 0.75, y: 6.62, w: 2.26, h: 0.3, align: 'center', fontFace: CJK, fontSize: 10, color: MUTE, margin: 0, isTextBox: true });
  s.addText('付款後的「我的訂閱」', { x: 3.05, y: 6.62, w: 2.66, h: 0.3, align: 'center', fontFace: CJK, fontSize: 10, color: MUTE, margin: 0, isTextBox: true });
  card(s, 5.85, 1.7, 6.85, 2.15, '方案叫「幾點」，實際上是「幾個景點」', [
    '入門 1 點／進階 2 點 $2,600／專業 3 點 $3,800，皆年費。',
    '括號寫「1 個景點」「2 個景點」「3 個景點」——',
    '所以「點」＝可上架的景點數，是席位，不是消耗品。',
  ], REDT, RED);
  card(s, 5.85, 4.0, 6.85, 2.7, '但整個 App 沒有任何地方顯示餘額', [
    '✕ 沒有「已使用 1／3」　✕ 沒有剩餘點數',
    '✕ 認領時不知道會不會扣　✕ 取消認領不知道會不會退',
    '✕ 沒有到期日、沒有下次扣款日、沒有試用剩餘天數',
    '',
    '商家付了 $3,800，看不到自己買了什麼、用掉多少。',
  ], REDT, RED);
  foot(s, '要改成扣點數之前，得先讓「點數」在畫面上存在。');
  s.addNotes('現況連席位餘額都沒顯示，直接跳到扣點制會更混亂。');
}

// ============================================================ 5 THREE MODELS
{
  const s = lightSlide();
  head(s, { title: '先確認：「扣點數」是哪一種？', kicker: '三種模型，對流程的影響完全不同', color: ORNG });
  const models = [
    ['A', '席位制（現況）', '點數 ＝ 同時可上架的景點數', [
      '認領時佔用 1 席，取消認領歸還。',
      '像座位授權，不會用完。',
      '',
      '適合：有 1–3 家店的商家',
      '流程影響：不用改，只要把餘額顯示出來',
    ], MUTE, TINT],
    ['B', '消耗制（純扣點）', '點數 ＝ 可上架的語音則數', [
      '每上架一則語音扣 N 點，用完要儲值。',
      '像預付卡。',
      '',
      '適合：內容量大、想多做幾則的商家',
      '流程影響：要加儲值流程與「點數不足」的擋點',
    ], ORNG, ORNGT],
    ['C', '混合制（建議）', '席位 ＋ 加值點數', [
      '景點佔席位；額外功能扣點數。',
      '兩套並存，UI 要分清楚。',
      '',
      '適合：大多數情況',
      '流程影響：兩者都要做，但可以分階段',
    ], TEAL, TEALT],
  ];
  models.forEach((m, i) => {
    const x = 0.6 + i * 4.07;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.78, w: 3.77, h: 4.55, fill: { color: m[5] }, rectRadius: 0.04 });
    s.addText(m[0], { x: x + 0.3, y: 1.98, w: 0.5, h: 0.32, fontFace: NUM, fontSize: 14, bold: true, color: m[4], margin: 0, isTextBox: true });
    s.addText(m[1], { x: x + 0.3, y: 2.32, w: 3.2, h: 0.36, fontFace: CJK, fontSize: 16, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(m[2], { x: x + 0.3, y: 2.74, w: 3.2, h: 0.55, fontFace: CJK, fontSize: 12, bold: true, color: m[4], lineSpacing: 18, margin: 0, isTextBox: true });
    s.addText(m[3].map((t, j) => ({ text: t, options: { breakLine: j < m[3].length - 1 } })), {
      x: x + 0.3, y: 3.34, w: 3.2, h: 2.85, fontFace: CJK, fontSize: 11.5, color: BODY, lineSpacing: 19, margin: 0, isTextBox: true,
    });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 6.45, w: 12.1, h: 0.42, fill: { color: TEALT }, rectRadius: 0.04 });
  s.addText('為什麼建議 C：餐廳通常只有 1–3 家店。純席位制買了就固定、沒有再消費的理由；純消耗制對只有一家店的商家沒有意義。混合才有持續營收。', {
    x: 0.92, y: 6.45, w: 11.5, h: 0.42, fontFace: CJK, fontSize: 11.5, bold: true, color: TEAL, valign: 'middle', margin: 0, isTextBox: true,
  });
  s.addNotes('這一頁是明天最該先問 Jay 的：他說的扣點數是哪一種。');
}

// ============================================================ 6 WHAT POINTS BUY
{
  const s = lightSlide();
  head(s, { title: '加值點數可以拿來買什麼', kicker: '混合制的「消耗」那一半', color: TEAL });
  const buys = [
    ['額外語音則數', '同一個景點多做幾則：中／英／日、季節限定、老闆的故事、幕後製程。'],
    ['多語言 AI 配音', '一次錄音，生成多語版本。實測檔名就是 AI 生成的，能力已經有了。'],
    ['地圖與首頁置頂曝光', '限時把自己的 pin 放大或置頂。這是最直接的曝光需求。'],
    ['自定義廣告版位', 'App 裡已經有「自定義廣告 0／50 字」的欄位，但沒有任何商業模式掛在上面。'],
    ['活動推播', '推給收藏過這個景點、或聽完語音的用戶。'],
    ['數據報表', '播放數、完聽率、來客時段。目前商家什麼數據都看不到。'],
  ];
  buys.forEach((b, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.07, y = 1.8 + row * 2.05;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.77, h: 1.85, fill: { color: TEALT }, rectRadius: 0.04 });
    s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.3, y: y + 0.2, w: 0.6, h: 0.28, fontFace: NUM, fontSize: 11, bold: true, color: TEAL, margin: 0, isTextBox: true });
    s.addText(b[0], { x: x + 0.3, y: y + 0.5, w: 3.2, h: 0.34, fontFace: CJK, fontSize: 14.5, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(b[1], { x: x + 0.3, y: y + 0.88, w: 3.2, h: 0.85, fontFace: CJK, fontSize: 11, color: BODY, lineSpacing: 16, margin: 0, isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 5.98, w: 12.1, h: 0.72, fill: { color: ORNGT }, rectRadius: 0.04 });
  s.addText('注意：第 4 項「自定義廣告」欄位現在就在 App 裡（步驟 21 認領成功後的畫面），做好了卻沒有收費機制掛上去——這是現成可以先變現的一塊。', {
    x: 0.95, y: 5.98, w: 11.5, h: 0.72, fontFace: CJK, fontSize: 12.5, bold: true, color: ORNG, valign: 'middle', margin: 0, isTextBox: true,
  });
  foot(s, '席位負責「進場」，加值點數負責「持續消費」。');
  s.addNotes('自定義廣告那個欄位是現成的，可以最快掛上點數。');
}

// ============================================================ 7 PLAN TABLE
{
  const s = lightSlide();
  head(s, { title: '方案改版建議', kicker: '席位 ＋ 內含點數 ＋ 可加購（價格為示意，由你們定）', color: TEAL });
  const COLS = [2.5, 1.5, 2.0, 2.1, 4.0];
  const X0 = 0.6, cx = [X0];
  for (let i = 0; i < COLS.length - 1; i++) cx.push(cx[i] + COLS[i]);
  const HDY = 1.85, HDH = 0.46, RH = 0.62;
  s.addShape(pres.ShapeType.rect, { x: X0, y: HDY, w: 12.1, h: HDH, fill: { color: TINT } });
  ['方案', '席位', '年費', '內含加值點', '適合誰'].forEach((t, i) => {
    s.addText(t, { x: cx[i] + 0.18, y: HDY, w: COLS[i] - 0.3, h: HDH, fontFace: CJK, fontSize: 12, bold: true, color: MUTE, valign: 'middle', margin: 0, isTextBox: true });
  });
  const rows = [
    ['免費版', '0', '—', '—', '瀏覽、體驗、聽別人的導覽', false],
    ['單店版', '1', '$1,800', '100 點／年', '單一店面的餐飲、旅宿、小店', true],
    ['多店版', '3', '$3,800', '300 點／年', '連鎖或有多個分店', true],
    ['加購席位', '+1', '$1,200', '—', '開了新分店，隨時加', false],
    ['點數包', '—', '$300／200 點', '—', '想多做語音或買曝光時加值', false],
  ];
  rows.forEach((r, i) => {
    const y = HDY + HDH + i * RH;
    s.addShape(pres.ShapeType.rect, { x: X0, y, w: 12.1, h: RH, fill: { color: r[5] ? TEALT : (i % 2 ? 'FFFFFF' : 'FAFBFC') } });
    s.addText(r[0], { x: cx[0] + 0.18, y, w: COLS[0] - 0.3, h: RH, fontFace: CJK, fontSize: 13.5, bold: true, color: r[5] ? TEAL : INK, valign: 'middle', margin: 0, isTextBox: true });
    [1, 2, 3].forEach((k) => {
      s.addText(r[k], { x: cx[k] + 0.18, y, w: COLS[k] - 0.3, h: RH, fontFace: NUM, fontSize: 13, bold: k === 2, color: INK, valign: 'middle', margin: 0, isTextBox: true });
    });
    s.addText(r[4], { x: cx[4] + 0.18, y, w: COLS[4] - 0.3, h: RH, fontFace: CJK, fontSize: 12, color: BODY, valign: 'middle', margin: 0, isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 5.85, w: 12.1, h: 0.85, fill: { color: ORNGT }, rectRadius: 0.04 });
  s.addText('三個要一起改的：① 訂閱頁要顯示「席位 1／3、點數 240」② 要有到期日與下次扣款日 ③ 28 天試用要顯示剩幾天。這些都是訂閱制的基本盤，目前全部沒有。', {
    x: 0.95, y: 5.85, w: 11.5, h: 0.85, fontFace: CJK, fontSize: 12.5, bold: true, color: ORNG, valign: 'middle', lineSpacing: 19, margin: 0, isTextBox: true,
  });
  foot(s, '現況：入門 1 點／進階 2 點 $2,600／專業 3 點 $3,800，年費，28 天試用。');
  s.addNotes('價格只是示意，重點是結構：席位進場 + 點數續消費。');
}

// ============================================================ 8 SECTION B
section('B', '流程改版', '最大的一項改動：認領要從第 11 步往前移到第 3 步。\n所有權先確立，再投入內容生產。', '兩版共用');

// ============================================================ 9 CLAIM MOVE
{
  const s = lightSlide();
  head(s, { title: '核心改動：認領往前移', kicker: '從第 11 步移到第 3 步', color: TEAL });

  s.addText('現況', { x: 0.6, y: 1.68, w: 3, h: 0.32, fontFace: CJK, fontSize: 13, bold: true, color: RED, margin: 0, isTextBox: true });
  const cur = ['搜尋', '上傳語音', '選類型', '文案照片', '送審', '後台審核', '後台開放認領', '商家認領', '上架'];
  cur.forEach((t, i) => {
    const x = 0.6 + i * 1.35;
    const bad = (i === 6 || i === 7);
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.06, w: 1.22, h: 0.72, fill: { color: bad ? REDT : TINT }, rectRadius: 0.04, line: bad ? { color: RED, width: 1 } : undefined });
    s.addText(t, { x, y: 2.06, w: 1.22, h: 0.72, align: 'center', valign: 'middle', fontFace: CJK, fontSize: 10.5, bold: bad, color: bad ? RED : BODY, margin: 0, isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 2.94, w: 12.1, h: 0.62, fill: { color: REDT }, rectRadius: 0.04 });
  s.addText('商家把語音、照片、文案全部做完、等審核過了，才被允許認領自己的店——而且按下去還可能跳「該景點目前不可被認領」。', {
    x: 0.95, y: 2.94, w: 11.5, h: 0.62, fontFace: CJK, fontSize: 12.5, bold: true, color: RED, valign: 'middle', margin: 0, isTextBox: true,
  });

  s.addText('改良', { x: 0.6, y: 3.86, w: 3, h: 0.32, fontFace: CJK, fontSize: 13, bold: true, color: TEAL, margin: 0, isTextBox: true });
  const nxt = ['訂閱／儲值', '找到我的店', '認領申請', '驗證通過', '扣 1 席位', '建立內容', '送審', '審核通過', '自動上架'];
  nxt.forEach((t, i) => {
    const x = 0.6 + i * 1.35;
    const good = (i >= 2 && i <= 4);
    s.addShape(pres.ShapeType.roundRect, { x, y: 4.24, w: 1.22, h: 0.72, fill: { color: good ? TEALT : TINT }, rectRadius: 0.04, line: good ? { color: TEAL, width: 1 } : undefined });
    s.addText(t, { x, y: 4.24, w: 1.22, h: 0.72, align: 'center', valign: 'middle', fontFace: CJK, fontSize: 10.5, bold: good, color: good ? TEAL : BODY, margin: 0, isTextBox: true });
  });

  const why = [
    ['所有權先確立', '認領是「這是我的店」的宣告，應該在投入成本之前完成，不是之後。'],
    ['扣點時機明確', '認領成功才扣 1 席位。商家清楚知道自己用掉了什麼、還剩多少。'],
    ['死路自然消失', '沒有「做完全部才發現不能認領」這件事，第 18 步那個矛盾畫面也不存在了。'],
  ];
  why.forEach((w, i) => {
    const x = 0.6 + i * 4.07;
    s.addShape(pres.ShapeType.roundRect, { x, y: 5.28, w: 3.77, h: 1.42, fill: { color: TEALT }, rectRadius: 0.04 });
    s.addText(w[0], { x: x + 0.3, y: 5.46, w: 3.2, h: 0.34, fontFace: CJK, fontSize: 14, bold: true, color: TEAL, margin: 0, isTextBox: true });
    s.addText(w[1], { x: x + 0.3, y: 5.84, w: 3.2, h: 0.75, fontFace: CJK, fontSize: 11.5, color: BODY, lineSpacing: 17, margin: 0, isTextBox: true });
  });
  foot(s, '這一項改動跟地圖服務無關，Google 版與 OSM 版都適用。');
  s.addNotes('這是整份提案裡最大的流程改動，也是最容易得到共識的一項。');
}

// ============================================================ 10 SHARED FLOW
{
  const s = lightSlide();
  head(s, { title: '改良後的通用流程（兩版共用 9 步）', kicker: '真正不同的只有第 2 步', color: TEAL });
  const steps = [
    ['1', '選方案／儲值', '訂閱頁直接顯示「席位 0／1、點數 100」。付款成功後不是彈窗就結束，而是帶到下一步。'],
    ['2', '找到我的店', '搜尋。這一步是 Google 版與 OSM 版唯一不同的地方。', true],
    ['3', '認領申請', '上傳營業登記或店面照片，說明「我是這家店的人」。'],
    ['4', '後台驗證 → 通知', '人工看一次。通過或退回都要推播，不要讓商家自己猜。'],
    ['5', '認領成功，扣 1 席位', '扣點時機在這裡。畫面明確顯示「已使用 1／3」。'],
    ['6', '建立內容', '錄音、文案、照片。此時商家已經確定這家店是他的了。'],
    ['7', '送審', '列表上出現「審核中」卡片與預計完成時間，不是消失不見。'],
    ['8', '審核通過 → 通知', '推播「你的語音已上架」，附一個直接跳過去的連結。'],
    ['9', '自動上架', '不需要再認領一次。前台立刻可播。'],
  ];
  steps.forEach((st, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.07, y = 1.8 + row * 1.68;
    const hl = st[3];
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.77, h: 1.5, fill: { color: hl ? GOOT : TINT }, rectRadius: 0.04, line: hl ? { color: GOO, width: 1.25 } : undefined });
    s.addShape(pres.ShapeType.ellipse, { x: x + 0.26, y: y + 0.22, w: 0.42, h: 0.42, fill: { color: hl ? GOO : TEAL } });
    s.addText(st[0], { x: x + 0.26, y: y + 0.22, w: 0.42, h: 0.42, align: 'center', valign: 'middle', fontFace: NUM, fontSize: 12, bold: true, color: 'FFFFFF', margin: 0, isTextBox: true });
    s.addText(st[1], { x: x + 0.8, y: y + 0.24, w: 2.75, h: 0.36, fontFace: CJK, fontSize: 14, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(st[2], { x: x + 0.3, y: y + 0.72, w: 3.2, h: 0.68, fontFace: CJK, fontSize: 10.5, color: BODY, lineSpacing: 15, margin: 0, isTextBox: true });
  });
  foot(s, '藍框的第 2 步是分岔點——接下來兩頁分別畫 Google 版與 OSM 版。');
  s.addNotes('九步裡有八步兩版完全一樣。');
}

// ---- before/after comparison helper -------------------------------------
function phoneAt(s, img, x, y, h) {
  const w = h * (560 / 1214);
  s.addImage({ path: IMG(img), x, y, w, h, shadow: sh() });
  return w;
}

function compare(s, o) {
  const H = 4.5, PW = H * (560 / 1214);   // 2.076
  const xA = 0.72, xB = 3.42;
  phoneAt(s, o.before, xA, 1.72, H);
  phoneAt(s, o.after, xB, 1.72, H);
  // arrow between the two phones
  s.addText('→', {
    x: xA + PW + 0.06, y: 3.72, w: 0.52, h: 0.5, align: 'center', valign: 'middle',
    fontFace: NUM, fontSize: 24, bold: true, color: MUTE, margin: 0, isTextBox: true,
  });
  s.addText(o.labelA || '現況', {
    x: xA - 0.3, y: 6.3, w: PW + 0.6, h: 0.3, align: 'center', fontFace: CJK, fontSize: 11.5,
    bold: true, color: o.labelAColor || RED, margin: 0, isTextBox: true,
  });
  s.addText(o.labelB || '改良後', {
    x: xB - 0.3, y: 6.3, w: PW + 0.6, h: 0.3, align: 'center', fontFace: CJK, fontSize: 11.5,
    bold: true, color: o.labelBColor || TEAL, margin: 0, isTextBox: true,
  });
  if (o.capA) s.addText(o.capA, { x: xA - 0.35, y: 6.58, w: PW + 0.7, h: 0.3, align: 'center', fontFace: CJK, fontSize: 9.5, color: MUTE, margin: 0, isTextBox: true });
  if (o.capB) s.addText(o.capB, { x: xB - 0.35, y: 6.58, w: PW + 0.7, h: 0.3, align: 'center', fontFace: CJK, fontSize: 9.5, color: MUTE, margin: 0, isTextBox: true });

  const X = 6.05, W2 = 6.65;
  card(s, X, 1.72, W2, o.hBad || 1.95, o.badTitle, o.bad, REDT, RED);
  card(s, X, 1.72 + (o.hBad || 1.95) + 0.16, W2, o.hGood || 2.72, o.goodTitle, o.good, TEALT, TEAL);
  const yLast = 1.72 + (o.hBad || 1.95) + 0.16 + (o.hGood || 2.72) + 0.16;
  const hWhy = Math.max(0.6, 6.7 - yLast);
  s.addShape(pres.ShapeType.roundRect, { x: X, y: yLast, w: W2, h: hWhy, fill: { color: o.whyBg || 'FFF3E0' }, rectRadius: 0.04 });
  s.addText('順在哪　' + o.why, {
    x: X + 0.32, y: yLast, w: W2 - 0.64, h: hWhy, fontFace: CJK, fontSize: 12.5,
    bold: true, color: o.whyColor || '9A5A18', valign: 'middle', lineSpacing: 19, margin: 0, isTextBox: true,
  });
}

// ============================================================ C1 訂閱頁
{
  const s = lightSlide();
  head(s, { num: '1', kicker: '步驟 1　訂閱／儲值', title: '訂閱頁要看得到自己買了什麼', color: TEAL });
  compare(s, {
    before: 's06', after: 'm1',
    capA: '只有一行方案名稱', capB: '席位、點數、扣款日、待辦',
    hBad: 1.75, hGood: 2.2,
    badTitle: '現況：整頁只有一行字', bad: [
      '「訂閱方案　專業版 (3 點)」＋ 兩顆按鈕，其餘全空白。',
      '不知道用掉幾個席位、不知道還剩幾個，',
      '沒有到期日、沒有下次扣款日、沒有試用剩餘天數。',
    ],
    goodTitle: '改良：一頁看完自己的狀態', good: [
      '・席位進度條「已使用 1 ／ 3」，一眼看懂',
      '・加值點數餘額 ＋ 儲值入口',
      '・下次扣款日與金額寫清楚',
      '・「你還有 2 個席位沒用」主動提醒，點了直接進下一步',
      '・下面直接列出「我的景點」，不必回地圖搜自己的店',
    ],
    why: '商家打開這一頁，就知道自己買了什麼、用到哪、接下來該做什麼。',
  });
  foot(s, '這一頁同時解掉「點數從未被顯示」與「找不到自己的店」兩個問題。');
  s.addNotes('訂閱頁是商家最常回來看的地方，資訊密度要夠。');
}

// ============================================================ C2 付款成功
{
  const s = lightSlide();
  head(s, { num: '1', kicker: '步驟 1 → 2　付款完成的那一秒', title: '付完錢，要立刻告訴他下一步', color: TEAL });
  compare(s, {
    before: 's05', after: 'm2',
    capA: '系統彈窗，按「好」就結束', capB: '完成頁 ＋ 三步驟預告 ＋ CTA',
    hBad: 1.55, hGood: 2.0,
    badTitle: '現況：按完「好」回到方案列表', bad: [
      '沒有歡迎頁、沒有待辦清單、沒有「接下來要做什麼」。',
      '漏斗最貴、意願最高的那一格被完全浪費。',
    ],
    goodTitle: '改良：專屬的完成頁', good: [
      '・「訂閱完成 · 你有 3 個景點席位」',
      '・預告接下來三步：找到你的店 → 認領 → 上傳語音',
      '・一顆大按鈕「開始：找到我的店」直接帶走',
      '・想晚點再弄的人可以按「稍後再說」，不強迫',
    ],
    why: '把漏斗最貴的那一格接起來——付完錢的下一秒就知道要幹嘛，不用自己回地圖亂找。',
  });
  foot(s, '同時發第 1 則推播，讓關掉 App 的人也接得回來。');
  s.addNotes('這是轉換率影響最大的一頁。');
}

// ============================================================ C3 找店 Google
{
  const s = lightSlide();
  head(s, { num: '2', kicker: '步驟 2　找到我的店（Google 版）', title: '別把商家丟回公用地圖', color: GOO });
  compare(s, {
    before: 's08', after: 'm3',
    capA: '回到首頁地圖，跟付費前一樣', capB: '專屬的搜尋頁 ＋ 認領按鈕',
    hBad: 1.6, hGood: 1.8,
    badTitle: '現況：付費前後的地圖一模一樣', bad: [
      '沒有自動定位、沒有「我的景點」入口、pin 沒有差別待遇。',
      '商家只能自己捲地圖，或用跟路人一樣的搜尋框打字找自己。',
    ],
    goodTitle: '改良：付款後直接進「找到我的店」', good: [
      '・專門的搜尋頁，不是公用地圖',
      '・每筆結果旁邊就是「這是我的店」按鈕',
      '・搜不到時明確說明原因，並提供留線索的表單',
    ],
    why: '流程順了，但天花板還在：Google 沒收錄的店還是進不來。',
    whyBg: REDT, whyColor: RED,
  });
  foot(s, 'Google 版能做的優化到此為止——下一頁是 OSM 版怎麼把這條路打開。');
  s.addNotes('Google 版流程可以改順，但服務範圍的天花板拆不掉。');
}

// ============================================================ C4 找店 OSM
{
  const s = lightSlide();
  head(s, { num: '2', kicker: '步驟 2　找到我的店（OSM 版）', title: '搜不到，就讓他自己建', color: OSM });
  compare(s, {
    before: 'm4', after: 'm5',
    labelA: '搜不到時', labelAColor: OSM, labelB: '手動建立地點', labelBColor: OSM,
    capA: '出現綠色「自己建」的出口', capB: '店名、地址、地圖選點、類別',
    hBad: 1.55, hGood: 2.45,
    badTitle: 'Google 版在這裡就斷了', bad: [
      '「沒有找到好味小館」——然後就沒有然後了。',
      '商家只能先去登錄 Google 商家，等審核，再回來。',
    ],
    goodTitle: 'OSM 版：多一個出口，流程不會斷', good: [
      '・店名（必填）',
      '・地址：用逆地理編碼預填，商家可以自己改',
      '・地圖選點：拖大頭針，這是最關鍵的一欄',
      '・類別：餐飲／旅宿／零售／景點',
      '・營業時間、電話（選填）',
      '・建立完直接進認領，不用重新搜尋一次',
    ],
    why: '新開幕的餐廳、夜市攤位、市場攤商、沒有店面的景點——當天就能上架。',
    whyBg: 'E3F0E8', whyColor: OSM,
  });
  foot(s, '新建地點的審核直接併進第 4 步的認領驗證一起看，不必多一道關卡。');
  s.addNotes('這一頁是 OSM 版唯一真正新增的畫面。');
}

// ============================================================ C5 認領申請
{
  const s = lightSlide();
  head(s, { num: '3', kicker: '步驟 3　認領這間店', title: '認領要在做內容之前，不是之後', color: TEAL });
  compare(s, {
    before: 's18', after: 'm6',
    capA: '第 11 步，而且按了會報錯', capB: '第 3 步，說清楚會扣什麼',
    hBad: 1.75, hGood: 2.0,
    badTitle: '現況：排在第 11 步，還自相矛盾', bad: [
      '畫面說「目前未被認領」，按鈕是亮的可以點，',
      '按下去卻跳「該景點目前不可被認領」。',
      '而且要等後台有人手動撥開關，商家完全不知道撥了沒。',
    ],
    goodTitle: '改良：往前移到第 3 步', good: [
      '・先講清楚「認領成功後會使用 1 個席位」',
      '・上傳營業登記或店面照片擇一，門檻不高',
      '・寫明「1 個工作天內確認」，不再是黑箱',
      '・不通過會說原因，可以補件重送',
    ],
    why: '所有權先確立再投入內容，扣點時機明確，矛盾畫面自然消失。',
  });
  foot(s, '這是整份提案裡最大的一項流程改動，而且跟地圖服務無關。');
  s.addNotes('認領前移是解掉死路的關鍵。');
}

// ============================================================ C6 審核中
{
  const s = lightSlide();
  head(s, { num: '7', kicker: '步驟 7　送審之後', title: '上傳的東西不能就這樣消失', color: TEAL });
  compare(s, {
    before: 's16', after: 'm7',
    capA: '剛上傳成功，卻顯示「尚無語音導覽」', capB: '審核中卡片 ＋ 預計時間',
    hBad: 1.75, hGood: 2.0,
    badTitle: '現況：剛送出的東西不見了', bad: [
      '上傳成功後回到景點頁，列表寫「尚無語音導覽」。',
      '後台看得到，商家自己的畫面上卻沒有任何痕跡——',
      '使用者無法分辨「審核中」和「上傳失敗」，就會重傳。',
    ],
    goodTitle: '改良：狀態一直看得見', good: [
      '・「審核中」卡片，標示送審日期與進度',
      '・寫明「預計 1 個工作天內完成，通過會通知你」',
      '・已上架的那則顯示播放次數，看得到成果',
      '・下方順勢推「想再多做幾則？」帶出加值點數',
    ],
    why: '不會有人以為失敗而重傳，也不用一直回來刷新看好了沒。',
  });
  foot(s, '這一步會直接減少重複上傳與客服工單。');
  s.addNotes('狀態可見性是最便宜、感受最強的改動之一。');
}

// ============================================================ C7 儀表板
{
  const s = lightSlide();
  head(s, { num: '9', kicker: '步驟 9　上架之後', title: '給他一個續訂的理由', color: TEAL });
  phoneAt(s, 'm9', 0.75, 1.72, 4.5);
  s.addText('改良後：商家儀表板', { x: 0.45, y: 6.3, w: 2.68, h: 0.3, align: 'center', fontFace: CJK, fontSize: 11.5, bold: true, color: TEAL, margin: 0, isTextBox: true });
  s.addText('目前這一頁完全不存在', { x: 0.4, y: 6.58, w: 2.78, h: 0.3, align: 'center', fontFace: CJK, fontSize: 9.5, color: MUTE, margin: 0, isTextBox: true });

  card(s, 3.55, 1.72, 4.4, 2.3, '現況：商家看不到任何數字', [
    '語音上架之後，商家不知道有沒有人聽、',
    '聽了多久、什麼時候聽的。',
    '',
    '續訂的時候，他沒有任何依據判斷',
    '這 $3,800 值不值得。',
  ], REDT, RED);
  card(s, 3.55, 4.18, 4.4, 2.52, '改良：把成效還給商家', [
    '・播放次數、完聽率、被收藏數',
    '・來客時段分布（幾點的人在聽）',
    '・席位與點數餘額就在同一頁',
    '・兩顆按鈕：新增語音 ／ 買曝光',
  ], TEALT, TEAL);

  card(s, 8.3, 1.72, 4.4, 2.3, '這頁是續訂的答案', [
    '「上個月 1,284 次播放、68% 完聽率」——',
    '這句話才能支撐明年再付一次錢。',
    '',
    '沒有數據的訂閱，續訂率只能靠運氣。',
  ], TEALT, TEAL);
  card(s, 8.3, 4.18, 4.4, 2.52, '也是加值點數的銷售入口', [
    '看到「12 點和 18 點的人最多」，',
    '商家自然會想在那個時段買曝光。',
    '',
    '看到完聽率高，就會想再多做幾則。',
    '',
    '數據是最好的加購理由。',
  ], ORNGT, ORNG);
  foot(s, '席位負責「進場」，數據負責「續訂」，加值點數負責「持續消費」。');
  s.addNotes('這頁把商業模式跟產品體驗接起來。');
}

// ============================================================ 11 NOTIFICATIONS
{
  const s = lightSlide();
  head(s, { title: '通知：從 0 則變成 5 則', kicker: '目前全程零通知，商家只能反覆回訪碰運氣', color: ORNG });
  s.addImage({ path: IMG('m8'), x: 0.6, y: 1.78, w: 2.4, h: 5.2, shadow: sh() });
  const notes = [
    ['付款成功', '「你有 1 個席位可以使用。下一步：找到你的店」＋ 直接跳轉按鈕', '取代目前按完「好」就沒事發生'],
    ['認領通過／退回', '「香記烤鴨 已通過認領」／「需要補件：照片看不到招牌」', '目前商家完全不知道後台開關撥了沒'],
    ['審核通過', '「你的語音已上架，去聽聽看」＋ 跳轉連結', '取代「不知道什麼時候審核完成」'],
    ['審核退回', '「需要修改」＋ 明確原因與可以直接編輯的入口', '目前沒有退回這條路徑'],
    ['到期前 7 天', '「訂閱將於 9/15 續訂，金額 $3,800」', '目前連到期日都看不到'],
  ];
  notes.forEach((n, i) => {
    const y = 1.8 + i * 1.0;
    s.addShape(pres.ShapeType.roundRect, { x: 3.25, y, w: 9.45, h: 0.88, fill: { color: i % 2 ? TINT : 'FAFBFC' }, rectRadius: 0.04 });
    s.addShape(pres.ShapeType.ellipse, { x: 3.5, y: y + 0.24, w: 0.4, h: 0.4, fill: { color: ORNG } });
    s.addText(String(i + 1), { x: 3.5, y: y + 0.24, w: 0.4, h: 0.4, align: 'center', valign: 'middle', fontFace: NUM, fontSize: 11.5, bold: true, color: 'FFFFFF', margin: 0, isTextBox: true });
    s.addText(n[0], { x: 4.05, y, w: 1.85, h: 0.88, fontFace: CJK, fontSize: 12.5, bold: true, color: INK, valign: 'middle', margin: 0, isTextBox: true });
    s.addText(n[1], { x: 5.95, y, w: 4.35, h: 0.88, fontFace: CJK, fontSize: 10.5, color: BODY, valign: 'middle', lineSpacing: 15, margin: 0, isTextBox: true });
    s.addText(n[2], { x: 10.45, y, w: 2.2, h: 0.88, fontFace: CJK, fontSize: 9.5, color: RED, valign: 'middle', lineSpacing: 13, margin: 0, isTextBox: true });
  });
  foot(s, '右欄是目前的狀況。四個關鍵狀態變化，商家現在收到 0 則通知。');
  s.addNotes('通知是最便宜、感受最強的一項改動。');
}

// ============================================================ 12 SECTION C
section('C', 'Google 版 vs OSM 版', '兩套流程只有第 2 步不同。\n差別不在地圖長什麼樣，在「搜不到的時候怎麼辦」。', '兩邊都要');

// ============================================================ 13 GOOGLE VERSION
{
  const s = lightSlide();
  head(s, { num: 'G', kicker: 'Google 版', title: '第 2 步：搜尋 Places，搜不到就沒有下一步', color: GOO });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 1.75, w: 12.1, h: 2.35, fill: { color: GOOT }, rectRadius: 0.04 });
  s.addText('第 2 步　找到我的店', { x: 0.95, y: 1.95, w: 5, h: 0.36, fontFace: CJK, fontSize: 16, bold: true, color: GOO, margin: 0, isTextBox: true });
  const gpath = [
    ['輸入店名', '呼叫 Google Places Text Search', TINT, BODY],
    ['有結果', '選擇 → 帶出店名與地址 → 進入第 3 步認領', TEALT, TEAL],
    ['沒有結果', '走不下去。只能請商家先去登錄 Google', REDT, RED],
  ];
  gpath.forEach((p, i) => {
    const x = 0.95 + i * 3.85;
    s.addShape(pres.ShapeType.roundRect, { x, y: 2.44, w: 3.6, h: 1.42, fill: { color: p[2] }, rectRadius: 0.04 });
    s.addText(p[0], { x: x + 0.28, y: 2.62, w: 3.05, h: 0.34, fontFace: CJK, fontSize: 14.5, bold: true, color: p[3], margin: 0, isTextBox: true });
    s.addText(p[1], { x: x + 0.28, y: 3.0, w: 3.05, h: 0.72, fontFace: CJK, fontSize: 11.5, color: BODY, lineSpacing: 17, margin: 0, isTextBox: true });
  });
  card(s, 0.6, 4.28, 5.95, 2.42, '可以先做的優化（不換地圖也能做）', [
    '① 搜尋結果加上「這是我的店嗎」的確認畫面，避免認錯',
    '② 搜不到時，明確告訴商家原因與該怎麼辦，',
    '　 並提供「通知我們幫忙處理」的表單留住線索',
    '③ 允許商家在認領後修改店名與地址（存自家欄位，',
    '　 顯示時優先用自家的）',
  ], GOOT, GOO);
  card(s, 6.75, 4.28, 5.95, 2.42, '但天花板拆不掉', [
    '不論怎麼優化，Google 沒收錄的店就是進不來。',
    '',
    '新開幕的餐廳、夜市攤位、市場攤商、路邊小店、',
    '廟宇分殿、步道涼亭——這些客群永遠卡在第 2 步。',
    '',
    'ResoMap 的獲客資格，還是由 Google 決定。',
  ], REDT, RED);
  foot(s, '第 1、3–9 步與 OSM 版完全相同。');
  s.addNotes('Google 版能做的優化有限，天花板是硬的。');
}

// ============================================================ 14 OSM VERSION
{
  const s = lightSlide();
  head(s, { num: 'O', kicker: 'OSM 版', title: '第 2 步：搜不到就自己建，路不會斷', color: OSM });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 1.75, w: 12.1, h: 2.35, fill: { color: OSMT }, rectRadius: 0.04 });
  s.addText('第 2 步　找到或建立我的店', { x: 0.95, y: 1.95, w: 6, h: 0.36, fontFace: CJK, fontSize: 16, bold: true, color: OSM, margin: 0, isTextBox: true });
  const opath = [
    ['輸入店名', '先查自家景點庫，沒有再查 OSM', TINT, BODY],
    ['有結果', '選擇 → 帶出店名與地址 → 進入第 3 步認領', TEALT, TEAL],
    ['沒有結果', '手動建立地點 → 直接進入第 3 步認領', OSMT, OSM],
  ];
  opath.forEach((p, i) => {
    const x = 0.95 + i * 3.85;
    s.addShape(pres.ShapeType.roundRect, {
      x, y: 2.44, w: 3.6, h: 1.42, fill: { color: p[2] }, rectRadius: 0.04,
      line: i === 2 ? { color: OSM, width: 1.5 } : undefined,
    });
    s.addText(p[0], { x: x + 0.28, y: 2.62, w: 3.05, h: 0.34, fontFace: CJK, fontSize: 14.5, bold: true, color: p[3], margin: 0, isTextBox: true });
    s.addText(p[1], { x: x + 0.28, y: 3.0, w: 3.05, h: 0.72, fontFace: CJK, fontSize: 11.5, color: BODY, lineSpacing: 17, margin: 0, isTextBox: true });
  });
  card(s, 0.6, 4.28, 5.95, 2.42, '「手動建立地點」要收哪些欄位', [
    '・店名（必填）',
    '・地址（用逆地理編碼預填，可自己改）',
    '・地圖選點（拖大頭針，這是最關鍵的欄位）',
    '・類別（餐飲／旅宿／零售／景點）',
    '・營業時間、電話（選填）',
    '',
    '提示文案：「這個地點會由 ResoMap 審核後建立」',
  ], OSMT, OSM);
  card(s, 6.75, 4.28, 5.95, 2.42, '新建地點要防的三件事', [
    '① 亂建：隨便標一個點佔位',
    '② 重複：同一家店被建成兩筆',
    '③ 假地點：根本不存在的店',
    '',
    '解法：新建地點的審核，直接併進第 4 步的認領驗證',
    '一起看——反正都要人工看一次，不必多一道關卡。',
  ], ORNGT, ORNG);
  foot(s, '第 1、3–9 步與 Google 版完全相同。');
  s.addNotes('新建審核併進認領驗證，是避免流程變長的關鍵。');
}

// ============================================================ 15 SIDE BY SIDE
{
  const s = lightSlide();
  head(s, { title: '兩版並排比較', kicker: '差在哪、要多做什麼、天花板在哪' });
  const COLS = [3.0, 4.55, 4.55];
  const X0 = 0.6, cx = [X0, X0 + COLS[0], X0 + COLS[0] + COLS[1]];
  const HDY = 1.75, HDH = 0.5, RH = 0.48;
  s.addShape(pres.ShapeType.rect, { x: X0, y: HDY, w: COLS[0], h: HDH, fill: { color: TINT } });
  s.addShape(pres.ShapeType.rect, { x: cx[1], y: HDY, w: COLS[1], h: HDH, fill: { color: GOO } });
  s.addShape(pres.ShapeType.rect, { x: cx[2], y: HDY, w: COLS[2], h: HDH, fill: { color: OSM } });
  s.addText('比較項目', { x: cx[0] + 0.18, y: HDY, w: COLS[0] - 0.3, h: HDH, fontFace: CJK, fontSize: 12.5, bold: true, color: MUTE, valign: 'middle', margin: 0, isTextBox: true });
  s.addText('Google 版', { x: cx[1] + 0.18, y: HDY, w: COLS[1] - 0.3, h: HDH, fontFace: CJK, fontSize: 13.5, bold: true, color: 'FFFFFF', valign: 'middle', margin: 0, isTextBox: true });
  s.addText('OSM 版', { x: cx[2] + 0.18, y: HDY, w: COLS[2] - 0.3, h: HDH, fontFace: CJK, fontSize: 13.5, bold: true, color: 'FFFFFF', valign: 'middle', margin: 0, isTextBox: true });
  const rows = [
    ['搜尋來源', 'Places Text Search', '自家景點庫 ＋ OSM', 0],
    ['搜不到怎麼辦', '走不下去', '手動建立地點', 2],
    ['可服務的商家', '只有 Google 收錄的', '全部', 2],
    ['新開幕的店', '要先等 Google 收錄', '當天就能上架', 2],
    ['店名地址錯了', '改不掉，只能跟 Google 申訴', '平台自己可以修', 2],
    ['每月成本', 'Places 查詢費（最高頻路徑）', '接近 0（自架服務另計）', 2],
    ['底圖與 POI 品質', '高，商家資料完整', '道路門牌不差，商家 POI 較弱', 1],
    ['要新增的開發', '認領前移、通知、點數 UI', '上述 ＋ 建立地點頁 ＋ 新建審核', 1],
    ['法務風險', 'Places 快取限制存在', '改為 ODbL 的 share-alike 義務', 0],
  ];
  rows.forEach((r, i) => {
    const y = HDY + HDH + i * RH;
    s.addShape(pres.ShapeType.rect, { x: X0, y, w: 12.1, h: RH, fill: { color: i % 2 ? 'FFFFFF' : 'FAFBFC' } });
    s.addText(r[0], { x: cx[0] + 0.18, y, w: COLS[0] - 0.3, h: RH, fontFace: CJK, fontSize: 12.5, bold: true, color: INK, valign: 'middle', margin: 0, isTextBox: true });
    const gWin = r[3] === 1, oWin = r[3] === 2;
    if (oWin) s.addShape(pres.ShapeType.rect, { x: cx[2], y, w: COLS[2], h: RH, fill: { color: OSMT } });
    if (gWin) s.addShape(pres.ShapeType.rect, { x: cx[1], y, w: COLS[1], h: RH, fill: { color: GOOT } });
    s.addText(r[1], { x: cx[1] + 0.18, y, w: COLS[1] - 0.3, h: RH, fontFace: CJK, fontSize: 12, bold: gWin, color: gWin ? GOO : BODY, valign: 'middle', margin: 0, isTextBox: true });
    s.addText(r[2], { x: cx[2] + 0.18, y, w: COLS[2] - 0.3, h: RH, fontFace: CJK, fontSize: 12, bold: oWin, color: oWin ? OSM : BODY, valign: 'middle', margin: 0, isTextBox: true });
  });
  foot(s, '底色標示的是該項比較占優的一邊。兩版在第 1、3–9 步完全相同。');
  s.addNotes('這張表可以直接拿來做決策討論。');
}

// ============================================================ 16 SECTION D
section('D', '怎麼落地', '訂閱模式與流程改版跟地圖無關，可以先做。\n地圖那一題等兩個工程答案再決定。', '分兩階段');

// ============================================================ 17 PHASES
{
  const s = lightSlide();
  head(s, { title: '建議分兩階段走', kicker: '階段一不用決定地圖，馬上可以開始' });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 1.78, w: 5.95, h: 4.9, fill: { color: TEALT }, rectRadius: 0.04 });
  s.addText('階段一　訂閱模式與流程', { x: 0.95, y: 2.0, w: 5.2, h: 0.38, fontFace: CJK, fontSize: 17, bold: true, color: TEAL, margin: 0, isTextBox: true });
  s.addText('與 Google／OSM 完全無關，兩邊都要做', { x: 0.95, y: 2.42, w: 5.2, h: 0.3, fontFace: CJK, fontSize: 11.5, color: MUTE, margin: 0, isTextBox: true });
  const p1 = [
    '訂閱頁顯示席位與點數餘額、到期日、扣款日',
    '認領往前移到第 3 步，認領成功才扣席位',
    '上傳後顯示「審核中」卡片與預計時間',
    '五個通知（付款、認領、審核通過、退回、到期）',
    '「景點管理」入口從三個點移到明顯位置',
    '修掉三處死路（找不到店、內容消失、按鈕矛盾）',
    'Markdown 解析、續訂條款完整顯示',
    '加值點數的第一個商品：自定義廣告版位',
  ];
  p1.forEach((t, i) => {
    const y = 2.92 + i * 0.45;
    s.addText('▸', { x: 0.98, y, w: 0.25, h: 0.34, fontFace: CJK, fontSize: 11, color: TEAL, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText(t, { x: 1.3, y, w: 5.0, h: 0.34, fontFace: CJK, fontSize: 12, color: INK, valign: 'middle', margin: 0, isTextBox: true });
  });

  s.addShape(pres.ShapeType.roundRect, { x: 6.75, y: 1.78, w: 5.95, h: 4.9, fill: { color: GOOT }, rectRadius: 0.04 });
  s.addText('階段二　地圖服務', { x: 7.1, y: 2.0, w: 5.2, h: 0.38, fontFace: CJK, fontSize: 17, bold: true, color: GOO, margin: 0, isTextBox: true });
  s.addText('要先有兩個工程答案才能估工時', { x: 7.1, y: 2.42, w: 5.2, h: 0.3, fontFace: CJK, fontSize: 11.5, color: MUTE, margin: 0, isTextBox: true });
  const p2 = [
    '搜尋來源從 Places 切到 自家景點庫 ＋ OSM',
    '新增「手動建立地點」頁（店名／地址／選點／類別）',
    '新建地點審核，併進認領驗證一起看',
    '地址與店名改為可由商家修改、存自家欄位',
    '底圖換 OSM 圖磚，補中文標註的缺口',
    '公車站等圖層改接公部門資料（如 TDX）',
    '導航跳轉的替代方案',
    '確認 ODbL 對自家資料模型的影響',
  ];
  p2.forEach((t, i) => {
    const y = 2.92 + i * 0.45;
    s.addText('▸', { x: 7.13, y, w: 0.25, h: 0.34, fontFace: CJK, fontSize: 11, color: GOO, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText(t, { x: 7.45, y, w: 5.0, h: 0.34, fontFace: CJK, fontSize: 12, color: INK, valign: 'middle', margin: 0, isTextBox: true });
  });
  foot(s, '階段一做完，商家的體感改善最大，而且不需要先決定地圖要不要換。');
  s.addNotes('分兩階段可以讓明天的會議不必馬上決定地圖。');
}

// ============================================================ 18 DECISIONS
{
  const s = lightSlide();
  head(s, { title: '明天要決定的四件事', kicker: '前兩件不決定，後面畫不下去', color: ORNG });
  const ds = [
    ['01', '「扣點數」指的是哪一種模型？', '席位制／消耗制／混合制。這一題決定訂閱頁、扣點時機、儲值流程全部怎麼做。', true],
    ['02', '認領往前移到第 3 步，同意嗎？', '這是流程最大的一項改動，但也是解掉三處死路的關鍵。跟地圖無關。', true],
    ['03', '階段一先做，還是兩階段一起？', '階段一與地圖無關，可以立刻開工。等地圖決策會拖住整包。', false],
    ['04', '兩個工程問題什麼時候能有答案？', '① 搜尋框打的是 Places 還是自家 DB？② 認領綁 place_id 還是自家 ID？', false],
  ];
  ds.forEach((d, i) => {
    const y = 1.82 + i * 1.24;
    s.addShape(pres.ShapeType.roundRect, { x: 0.6, y, w: 12.1, h: 1.1, fill: { color: d[3] ? ORNGT : TINT }, rectRadius: 0.04 });
    s.addText(d[0], { x: 0.95, y: y + 0.2, w: 0.6, h: 0.34, fontFace: NUM, fontSize: 15, bold: true, color: d[3] ? ORNG : MUTE, margin: 0, isTextBox: true });
    s.addText(d[1], { x: 1.65, y: y + 0.16, w: 10.8, h: 0.4, fontFace: CJK, fontSize: 16, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(d[2], { x: 1.65, y: y + 0.6, w: 10.8, h: 0.4, fontFace: CJK, fontSize: 11.5, color: BODY, margin: 0, isTextBox: true });
  });
  foot(s, '橘底兩題是前提：沒有答案，訂閱頁與流程圖都畫不出來。');
  s.addNotes('用這四題收會議，避免只討論不決定。');
}

// ============================================================ 19 CLOSING
{
  const s = darkSlide();
  s.addText('結論', {
    x: 0.85, y: 0.78, w: 11.6, h: 0.4, fontFace: CJK, fontSize: 13, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('訂閱模式與流程要改的部分，\n跟換不換地圖沒有關係。', {
    x: 0.85, y: 1.32, w: 11.6, h: 1.7, fontFace: CJK, fontSize: 34, bold: true,
    color: 'FFFFFF', lineSpacing: 50, margin: 0, isTextBox: true,
  });
  const blocks = [
    ['兩版一樣的', '九步裡有八步完全相同：訂閱、認領、驗證、扣點、內容、送審、審核、上架。', '5FBDB2'],
    ['兩版不同的', '只有第 2 步。Google 版搜不到就走不下去；OSM 版搜不到可以自己建。', '8FAEDC'],
    ['真正的差別', '不是底圖好不好看，是平台能不能決定自己要服務誰。', 'E08A7A'],
  ];
  blocks.forEach((b, i) => {
    const x = 0.85 + i * 3.95;
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.4, w: 3.6, h: 2.05, fill: { color: DARK2 }, rectRadius: 0.04 });
    s.addText(b[0], { x: x + 0.32, y: 3.6, w: 2.9, h: 0.32, fontFace: CJK, fontSize: 12, bold: true, color: b[2], charSpacing: 2, margin: 0, isTextBox: true });
    s.addText(b[1], { x: x + 0.32, y: 4.02, w: 2.96, h: 1.25, fontFace: CJK, fontSize: 12, color: 'C4CEDA', lineSpacing: 20, margin: 0, isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: 5.7, w: 11.6, h: 1.0, fill: { color: '1E3A34' }, rectRadius: 0.04 });
  s.addText('建議：階段一（訂閱模式＋流程）現在就開始，不必等地圖決策。地圖那一題等兩個工程答案回來再定。', {
    x: 1.25, y: 5.7, w: 10.8, h: 1.0, fontFace: CJK, fontSize: 15.5, bold: true,
    color: '8FD6C4', margin: 0, isTextBox: true, valign: 'middle',
  });
  s.addText('依據：2026/08/26–08/27 商家訂閱流程實測 21 步。價格與點數配額為結構示意，實際數字由你們定。', {
    x: 0.85, y: 6.88, w: 11.6, h: 0.32, fontFace: CJK, fontSize: 11.5, color: '8B98A6', margin: 0, isTextBox: true,
  });
  s.addNotes('收在「階段一可以立刻開始」，讓會議有明確的下一步。');
}

pres.writeFile({ fileName: path.join(__dirname, 'ResoMap商家訂閱模式改版提案.pptx') })
  .then(f => console.log('WROTE', f));
