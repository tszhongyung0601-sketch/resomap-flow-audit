const pptxgen = require('pptxgenjs');
const path = require('path');
const IMG = (n) => path.join(__dirname, 'img', n + '.png');

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';           // 13.3 x 7.5
pres.author = 'Product Audit';
pres.title  = 'ResoMap 商家訂閱流程稽核';

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

const CJK = 'Microsoft JhengHei';
const NUM = 'Arial';

const sh = () => ({ type: 'outer', color: '1B2430', blur: 14, offset: 4, angle: 90, opacity: 0.20 });

// ---- helpers -------------------------------------------------------------
function darkSlide() {
  const s = pres.addSlide();
  s.background = { color: DARK };
  return s;
}
function lightSlide() {
  const s = pres.addSlide();
  s.background = { color: LIGHT };
  return s;
}

function head(s, opts) {
  const { num, kicker, title, tone } = opts;
  const c = tone === 'dead' ? RED : tone === 'flag' ? ORNG : TEAL;
  if (num) {
    s.addShape(pres.ShapeType.ellipse, { x: 0.6, y: 0.42, w: 0.64, h: 0.64, fill: { color: c } });
    s.addText(String(num), {
      x: 0.6, y: 0.42, w: 0.64, h: 0.64, align: 'center', valign: 'middle',
      fontFace: NUM, fontSize: String(num).length > 2 ? 14 : 19, bold: true, color: 'FFFFFF',
      margin: 0, isTextBox: true,
    });
  }
  const tx = num ? 1.42 : 0.6;
  if (kicker) {
    s.addText(kicker, {
      x: tx, y: 0.38, w: 11.3, h: 0.28, fontFace: CJK, fontSize: 11.5, bold: true,
      color: c, charSpacing: 2, margin: 0, isTextBox: true,
    });
  }
  s.addText(title, {
    x: tx, y: kicker ? 0.66 : 0.5, w: 11.3, h: 0.62, fontFace: CJK, fontSize: 27, bold: true,
    color: INK, margin: 0, isTextBox: true,
  });
}

function foot(s, txt) {
  s.addText(txt, {
    x: 0.6, y: 6.94, w: 12.1, h: 0.32, fontFace: CJK, fontSize: 9.5,
    color: MUTE, margin: 0, isTextBox: true,
  });
}

function phone(s, img, x, y, h) {
  const w = h * (1179 / 2556);
  s.addImage({ path: IMG(img), x, y, w, h, shadow: sh() });
  return w;
}

function caption(s, txt, x, y, w) {
  s.addText(txt, {
    x, y, w, h: 0.3, fontFace: CJK, fontSize: 10, color: MUTE,
    align: 'center', margin: 0, isTextBox: true,
  });
}

function problem(s, x, y, w, h, title, lines, tone) {
  const c = tone === 'dead' ? RED : ORNG;
  const bg = tone === 'dead' ? REDT : ORNGT;
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: bg }, rectRadius: 0.04 });
  s.addText(title, {
    x: x + 0.35, y: y + 0.24, w: w - 0.7, h: 0.36, fontFace: CJK, fontSize: 15, bold: true,
    color: c, margin: 0, isTextBox: true,
  });
  s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })), {
    x: x + 0.35, y: y + 0.70, w: w - 0.7, h: h - 0.94, fontFace: CJK, fontSize: 13,
    color: INK, lineSpacing: 21, margin: 0, isTextBox: true, valign: 'top',
  });
}

function note(s, x, y, w, h, title, lines) {
  s.addShape(pres.ShapeType.roundRect, { x, y, w, h, fill: { color: TINT }, rectRadius: 0.04 });
  s.addText(title, {
    x: x + 0.32, y: y + 0.22, w: w - 0.64, h: 0.34, fontFace: CJK, fontSize: 14, bold: true,
    color: INK, margin: 0, isTextBox: true,
  });
  s.addText(lines.map((t, i) => ({ text: t, options: { breakLine: i < lines.length - 1 } })), {
    x: x + 0.32, y: y + 0.64, w: w - 0.64, h: h - 0.86, fontFace: CJK, fontSize: 12.5,
    color: BODY, lineSpacing: 20, margin: 0, isTextBox: true, valign: 'top',
  });
}

function ring(s, x, y, w, h) {
  s.addShape(pres.ShapeType.ellipse, {
    x, y, w, h, fill: { color: 'FFFFFF', transparency: 100 }, line: { color: RED, width: 2.5 },
  });
}

// ============================================================ 1 COVER
{
  const s = darkSlide();
  s.addText('RESOMAP　／　商家訂閱流程稽核　／　2026.08.27', {
    x: 0.85, y: 0.95, w: 8.2, h: 0.3, fontFace: CJK, fontSize: 12, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('商家付了三千八，\n然後被留在原地', {
    x: 0.85, y: 1.5, w: 8.2, h: 2.5, fontFace: CJK, fontSize: 48, bold: true,
    color: 'FFFFFF', lineSpacing: 60, margin: 0, isTextBox: true,
  });
  s.addShape(pres.ShapeType.rect, { x: 0.85, y: 4.15, w: 1.5, h: 0.04, fill: { color: 'E09A50' } });
  s.addText([
    { text: '以商家身分實際走完「訂閱付款 → 語音上線」全流程，共 21 個步驟。', options: { breakLine: true } },
    { text: '付款只花 49 秒，之後的每一步都在猜、或在等。', options: { bold: true, color: 'FFFFFF' } },
  ], {
    x: 0.85, y: 4.5, w: 7.8, h: 1.1, fontFace: CJK, fontSize: 15,
    color: 'B8C2CE', lineSpacing: 27, margin: 0, isTextBox: true,
  });
  s.addText('實測店家「香記烤鴨」（台中南區台中路 252 號）　後台 backend.resomap.app・dev-1.0.0', {
    x: 0.85, y: 6.35, w: 8.2, h: 0.3, fontFace: CJK, fontSize: 10.5,
    color: '7C8A99', margin: 0, isTextBox: true,
  });
  phone(s, 's18', 9.7, 0.95, 5.55);
  s.addNotes('這是一份以商家視角實測的流程稽核。全程 21 步，付款只佔 5 步，其餘都需要商家自己猜或自己等。');
}

// ============================================================ 2 VERDICT
{
  const s = darkSlide();
  s.addText('一句話結論', {
    x: 0.85, y: 0.8, w: 11.6, h: 0.35, fontFace: CJK, fontSize: 12.5, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('付費與交付之間，\n產品裡沒有任何一條路把它們接起來。', {
    x: 0.85, y: 1.3, w: 11.6, h: 1.9, fontFace: CJK, fontSize: 34, bold: true,
    color: 'FFFFFF', lineSpacing: 52, margin: 0, isTextBox: true,
  });
  const cards = [
    ['付款當下，App 沒有變化', '沒有引導、沒有額度顯示，\n也沒有「我的景點」入口。\n付費前後的地圖一模一樣。'],
    ['內容 100% 由商家自己生產', '自己錄音、自己寫文案、\n自己拍照、自己認領。\n付費後工作量不減反增。'],
    ['主線由三個人工關卡串起來', '人工審核語音、人工開放認領、\n商家自己回來重試——\n商家一個都看不到。'],
  ];
  cards.forEach((c, i) => {
    const x = 0.85 + i * 3.95;
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.85, w: 3.6, h: 2.4, fill: { color: DARK2 }, rectRadius: 0.04 });
    s.addText(String(i + 1).padStart(2, '0'), {
      x: x + 0.32, y: 4.05, w: 1, h: 0.4, fontFace: NUM, fontSize: 15, bold: true,
      color: 'E09A50', margin: 0, isTextBox: true,
    });
    s.addText(c[0], {
      x: x + 0.32, y: 4.5, w: 2.96, h: 0.4, fontFace: CJK, fontSize: 15, bold: true,
      color: 'FFFFFF', margin: 0, isTextBox: true,
    });
    s.addText(c[1], {
      x: x + 0.32, y: 4.98, w: 2.96, h: 1.15, fontFace: CJK, fontSize: 12,
      color: 'AAB6C4', lineSpacing: 19, margin: 0, isTextBox: true,
    });
  });
  s.addNotes('核心問題不是某個 bug，是付費與交付之間沒有產品路徑。');
}

// ============================================================ 3 METRICS
{
  const s = lightSlide();
  head(s, { title: '實測數字', kicker: '流程稽核結果' });
  const stats = [
    ['21', '流程步驟總數', INK],
    ['5', '商家能靠自己完成的步驟\n（全部落在付款段）', INK],
    ['3', '死路\n（點下去無法前進）', RED],
    ['0', '全程收到的通知則數', RED],
    ['3', '純人工關卡\n（商家看不見）', ORNG],
    ['$3,800', '專業版年費 ／ 3 個景點', ORNG],
  ];
  stats.forEach((st, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.07, y = 1.9 + row * 2.42;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.77, h: 2.1, fill: { color: TINT }, rectRadius: 0.04 });
    s.addText(st[0], {
      x: x + 0.35, y: y + 0.26, w: 3.1, h: 0.88, fontFace: NUM, fontSize: st[0].length > 3 ? 38 : 50,
      bold: true, color: st[2], margin: 0, isTextBox: true, valign: 'middle',
    });
    s.addText(st[1], {
      x: x + 0.35, y: y + 1.22, w: 3.1, h: 0.72, fontFace: CJK, fontSize: 12.5,
      color: MUTE, lineSpacing: 19, margin: 0, isTextBox: true,
    });
  });
  foot(s, '資料來源：2026/08/26–08/27 實測截圖 21 張（含後台 2 張）');
  s.addNotes('21 步裡，商家能獨立完成的只有付款那 5 步。');
}

// ============================================================ 4 FLOW MAP
{
  const s = lightSlide();
  head(s, { title: '流程全貌：斷點在哪裡', kicker: '21 步驟 ／ 6 個階段' });

  const groups = [
    { label: 'A　訂閱付款', items: [1, 2, 3, 4, 5, 6, 7] },
    { label: 'B　找店', items: [8, 9] },
    { label: 'C　自製內容', items: [10, 11, 12, 13, 14] },
    { label: 'D　審核黑箱', items: [15, 16, 17, 18] },
    { label: 'E　後台', items: ['19', '20', '20b'] },
    { label: 'F　收尾', items: [21] },
  ];
  const dead = new Set(['8', '16', '18', '20b']);
  const flag = new Set(['4', '5', '6', '7', '10', '11', '12', '15', '17', '20', '21']);

  const BOX = 0.44, GAPI = 0.085, GAPG = 0.26;
  let x = 0.6;
  const yTop = 2.5;
  groups.forEach((g) => {
    const gw = g.items.length * BOX + (g.items.length - 1) * GAPI;
    s.addText(g.label, {
      x, y: yTop - 0.5, w: Math.max(gw, 1.6), h: 0.3, fontFace: CJK, fontSize: 11, bold: true,
      color: TEAL, margin: 0, isTextBox: true,
    });
    g.items.forEach((it, j) => {
      const key = String(it);
      const bx = x + j * (BOX + GAPI);
      const isDead = dead.has(key), isFlag = flag.has(key);
      const opt = {
        x: bx, y: yTop, w: BOX, h: BOX,
        fill: { color: isDead ? RED : isFlag ? ORNGT : TINT }, rectRadius: 0.03,
      };
      if (isFlag && !isDead) opt.line = { color: ORNG, width: 1 };
      s.addShape(pres.ShapeType.roundRect, opt);
      s.addText(key, {
        x: bx, y: yTop, w: BOX, h: BOX, align: 'center', valign: 'middle',
        fontFace: NUM, fontSize: key.length > 2 ? 8 : 11, bold: true,
        color: isDead ? 'FFFFFF' : isFlag ? ORNG : MUTE, margin: 0, isTextBox: true,
      });
    });
    x += gw + GAPG;
  });

  const leg = [[TINT, '正常', false, 1.55], [ORNGT, '有問題', true, 1.85], [RED, '死路：無法靠自己前進', false, 4]];
  let lx = 0.6;
  leg.forEach((l) => {
    const o = { x: lx, y: 3.42, w: 0.3, h: 0.3, fill: { color: l[0] }, rectRadius: 0.03 };
    if (l[2]) o.line = { color: ORNG, width: 1 };
    s.addShape(pres.ShapeType.roundRect, o);
    s.addText(l[1], { x: lx + 0.42, y: 3.42, w: 3.2, h: 0.3, fontFace: CJK, fontSize: 11, color: MUTE, valign: 'middle', margin: 0, isTextBox: true });
    lx += l[3];
  });

  const dl = [
    ['08', '回到首頁地圖，找不到自己的店'],
    ['16', '剛上傳成功的語音，在自己頁面上消失'],
    ['18', '「未被認領」＋可點的按鈕，按下去說「不可被認領」'],
    ['20b', '遊客看到有語音，按播放卻被拒絕（C 端被連坐）'],
  ];
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 4.15, w: 12.1, h: 2.55, fill: { color: REDT }, rectRadius: 0.04 });
  s.addText('三處死路 ＋ 一處 C 端連坐', {
    x: 0.95, y: 4.34, w: 6, h: 0.36, fontFace: CJK, fontSize: 15, bold: true, color: RED, margin: 0, isTextBox: true,
  });
  dl.forEach((d, i) => {
    const y = 4.83 + i * 0.44;
    s.addText(d[0], { x: 0.95, y, w: 0.62, h: 0.34, fontFace: NUM, fontSize: 13, bold: true, color: RED, margin: 0, isTextBox: true, valign: 'middle' });
    s.addText(d[1], { x: 1.64, y, w: 10.6, h: 0.34, fontFace: CJK, fontSize: 13, color: INK, margin: 0, isTextBox: true, valign: 'middle' });
  });
  foot(s, '流程圖中沒有第 7 步——付款完成到下一個有意義的動作之間，產品沒有給出任何東西可以截圖。');
  s.addNotes('三處死路都不是邊緣情境，而是主線上的必經節點。');
}

// ---- section divider helper ----
function section(letter, title, sub, steps) {
  const s = darkSlide();
  s.addText(letter, {
    x: 0.85, y: 1.85, w: 2.4, h: 1.6, fontFace: NUM, fontSize: 90, bold: true,
    color: DARK2, margin: 0, isTextBox: true,
  });
  s.addText(title, {
    x: 0.85, y: 3.35, w: 9, h: 0.9, fontFace: CJK, fontSize: 38, bold: true,
    color: 'FFFFFF', margin: 0, isTextBox: true,
  });
  s.addText(sub, {
    x: 0.85, y: 4.35, w: 8.6, h: 1.0, fontFace: CJK, fontSize: 14.5,
    color: 'A8B4C2', lineSpacing: 25, margin: 0, isTextBox: true,
  });
  s.addText(steps, {
    x: 0.85, y: 5.55, w: 6, h: 0.35, fontFace: CJK, fontSize: 12, bold: true,
    color: 'E09A50', charSpacing: 2, margin: 0, isTextBox: true,
  });
  return s;
}

// ============================================================ 5 SECTION A
section('A', '訂閱付款', '這一段商家可以靠自己完成，也是整段流程中\n唯一不需要猜的部分——只花了 49 秒。', '步驟 01 – 07');

// ============================================================ 6 STEPS 1-3
{
  const s = lightSlide();
  head(s, { title: '打開 App → 我的 → 我的訂閱', kicker: '步驟 01 – 03' });
  const ims = [
    ['s01', '01　地圖首頁', '與一般遊客看到的完全相同'],
    ['s02', '02　我的頁面', '上傳語音 0 則、總播放 0 次'],
    ['s03', '03　我的訂閱', '「免費版」＋兩顆按鈕'],
  ];
  ims.forEach((im, i) => {
    const x = 0.78 + i * 2.62;
    phone(s, im[0], x, 1.75, 4.05);
    s.addText(im[1], { x: x - 0.2, y: 5.95, w: 2.3, h: 0.3, fontFace: CJK, fontSize: 12.5, bold: true, color: INK, align: 'center', margin: 0, isTextBox: true });
    s.addText(im[2], { x: x - 0.3, y: 6.28, w: 2.5, h: 0.55, fontFace: CJK, fontSize: 10.5, color: MUTE, align: 'center', lineSpacing: 15, margin: 0, isTextBox: true });
  });
  note(s, 8.6, 1.75, 4.1, 2.15, '這三步本身還沒有問題', [
    '畫面都能運作，商家也找得到入口。',
    '真正的斷點從第 4 步開始出現。',
  ]);
  problem(s, 8.6, 4.15, 4.1, 2.55, '但徵兆已經看得到', [
    '「我的訂閱」整頁只有一行方案',
    '名稱加兩顆按鈕，其餘全空白。',
    '',
    '「檢視認領中的景點」在商家最',
    '需要它的時候，必定是空的。',
  ], 'flag');
  foot(s, '截圖時間 11:44　實測帳號 TszHong Yung');
  s.addNotes('前三步沒有明顯問題，但「我的訂閱」頁的資訊密度已經接近零。');
}

// ============================================================ 7 STEP 4
{
  const s = lightSlide();
  head(s, { num: '04', kicker: '步驟 04　選擇訂閱方案', title: '一進頁面，最便宜的方案就是殘缺的', tone: 'flag' });
  phone(s, 's04', 0.78, 1.65, 4.9);
  ring(s, 0.98, 2.53, 1.02, 0.42);
  s.addText('入門版（1 點）只剩兩行，\n名稱與價格在畫面外', {
    x: 3.18, y: 2.42, w: 3.0, h: 0.6, fontFace: CJK, fontSize: 10.5, color: RED, bold: true, lineSpacing: 15, margin: 0, isTextBox: true,
  });
  problem(s, 6.35, 1.65, 6.35, 1.95, '① 頁面初始捲動位置錯誤', [
    '進入「變更訂閱」時，畫面已經捲過第一個方案，',
    '只剩「1 個景點／28 天免費試用」兩行。',
    '最便宜的選項在預設視野裡是看不完整的。',
  ], 'flag');
  s.addImage({ path: IMG('c04_terms'), x: 6.35, y: 3.95, w: 6.35, h: 0.5, shadow: sh() });
  problem(s, 6.35, 4.62, 6.35, 2.08, '② 自動續訂條款被容器裁斷', [
    '「…除非在當前訂閱期結束前至少 24 小時關閉。付款將在確」',
    '句子在這裡就沒了，上下也被切掉半個字高。',
    '',
    '這不是排版瑕疵——是訂閱制商品的揭露義務問題，',
    '也是 App Store 審核的常見退件點。',
  ], 'flag');
  foot(s, '另：$3,800 的專業版預設已被勾選，而畫面上沒有任何標示指出使用者目前是免費版。');
  s.addNotes('條款顯示不全是合規問題，不是美觀問題。');
}

// ============================================================ 8 STEPS 5-6
{
  const s = lightSlide();
  head(s, { num: '05', kicker: '步驟 05 – 06　付款完成', title: '付了錢，然後什麼都沒有發生', tone: 'flag' });
  phone(s, 's05', 0.78, 1.65, 4.9);
  phone(s, 's06', 3.35, 1.65, 4.9);
  caption(s, '05　「你的購買已成功」', 0.3, 6.58, 3.2);
  caption(s, '06　回到「我的訂閱」', 2.9, 6.58, 3.2);
  problem(s, 6.35, 1.65, 6.35, 2.35, '按下「好」之後，回到原本的方案列表', [
    '沒有歡迎頁、沒有待辦清單、沒有「接下來要做什麼」。',
    '',
    '整個漏斗最貴、使用者意願最高的那一格，',
    '被完全浪費掉。',
  ], 'flag');
  problem(s, 6.35, 4.2, 6.35, 2.5, '整頁唯一的變化：一行字', [
    '「免費版」→「專業版 (3 點)」。除此之外：',
    '',
    '✕ 沒有點數餘額（買了 3 點，用掉幾點？）',
    '✕ 沒有到期日、沒有下次扣款日與金額',
    '✕ 沒有 28 天試用的剩餘天數',
    '✕ 沒有取消入口、沒有發票或收據',
  ], 'flag');
  foot(s, '付了 $3,800／年的人，在 App 裡看不到自己何時會被扣款。');
  s.addNotes('付款成功是使用者意願最高的一刻，這個產品在這裡什麼都沒做。');
}

// ============================================================ 9 STEP 7
{
  const s = darkSlide();
  s.addText('步驟 07', {
    x: 0.85, y: 1.7, w: 5, h: 0.4, fontFace: CJK, fontSize: 13, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('流程圖裡沒有第七步。', {
    x: 0.85, y: 2.3, w: 11.6, h: 1.05, fontFace: CJK, fontSize: 42, bold: true,
    color: 'FFFFFF', margin: 0, isTextBox: true,
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: 3.8, w: 11.6, h: 2.0, fill: { color: DARK2 }, rectRadius: 0.04 });
  s.addText([
    { text: '實測者的截圖，從第 6 步直接跳到第 8 步。', options: { breakLine: true, color: 'DDE4EB' } },
    { text: '', options: { breakLine: true, fontSize: 8 } },
    { text: '這個空缺本身就是發現：付款完成到下一個有意義的動作之間，', options: { breakLine: true, bold: true, color: 'FFFFFF' } },
    { text: '產品沒有給出任何東西可以截圖。', options: { bold: true, color: 'FFFFFF' } },
  ], {
    x: 1.3, y: 4.15, w: 10.7, h: 1.35, fontFace: CJK, fontSize: 17, lineSpacing: 30, margin: 0, isTextBox: true,
  });
  s.addNotes('缺的這一步，正是產品該做 onboarding 的位置。');
}

// ============================================================ 10 SECTION B
section('B', '找到自己的店', '付費身分不會改變地圖上的任何東西。\n商家必須自己把自己的店找出來。', '步驟 08 – 09');

// ============================================================ 11 DEAD END 1
{
  const s = lightSlide();
  head(s, { num: '08', kicker: '死路 ①　步驟 08', title: '付費前與付費後的地圖，一模一樣', tone: 'dead' });
  phone(s, 's01', 0.78, 1.7, 4.55);
  phone(s, 's08', 3.32, 1.7, 4.55);
  caption(s, '付費前（步驟 01）', 0.35, 6.4, 3.0);
  caption(s, '付費後（步驟 08）', 2.9, 6.4, 3.0);
  problem(s, 6.35, 1.7, 6.35, 2.6, '商家找不到自己的店', [
    '地圖上散落數個灰色 pin，沒有任何一個標示為「你的店」。',
    '',
    '✕ 沒有自動定位到自己的景點',
    '✕ 沒有「我的景點」入口',
    '✕ pin 沒有任何差別待遇',
  ], 'dead');
  problem(s, 6.35, 4.5, 6.35, 2.2, '根因：訂閱綁帳號，內容綁景點', [
    '系統從頭到尾不知道「這個付費帳號」和',
    '「哪一間店」是同一件事。',
    '',
    '後面所有的混亂，都源自這一點。',
  ], 'dead');
  foot(s, '死路定義：使用者在此處無法靠產品本身的引導前進。');
  s.addNotes('這是全流程最根本的問題：付費身分在產品裡不存在。');
}

// ============================================================ 12 STEP 9
{
  const s = lightSlide();
  head(s, { num: '09', kicker: '步驟 09', title: '唯一的辦法：自己打字搜尋店名', tone: 'flag' });
  phone(s, 's09', 0.78, 1.7, 4.9);
  ring(s, 0.86, 2.42, 2.09, 0.33);
  problem(s, 6.35, 1.7, 6.35, 2.3, '商家只能用「搜尋景點」找自己', [
    '在搜尋框輸入「香記烤鴨」，紅色 pin 才出現。',
    '',
    '這是商家找到自己店家的唯一路徑——',
    '和一個完全沒付費的路人，用的是同一個功能。',
  ], 'flag');
  note(s, 6.35, 4.2, 6.35, 2.5, '這個流程「應該」長什麼樣', [
    '付款完成 → 選擇你的店 → 綁定 → 進入商家後台。',
    '',
    '目前的產品把這三件事全部省略，直接把商家丟回公用',
    '地圖，讓他自己用搜尋功能找回自己。',
    '',
    '訂閱資料與景點資料之間，沒有任何關聯被建立。',
  ]);
  foot(s, '截圖時間 7:59　電量 36%');
  s.addNotes('搜尋自己的店，是這個流程最荒謬也最有代表性的一步。');
}

// ============================================================ 13 SECTION C
section('C', '自製內容', '付了 $3,800 之後，工作量不減反增。\n錄音、文案、照片，全部由商家自己生產。', '步驟 10 – 14');

// ============================================================ 14 STEPS 10-11
{
  const s = lightSlide();
  head(s, { num: '10', kicker: '步驟 10 – 11', title: '對付費商家，說著給遊客聽的話', tone: 'flag' });
  phone(s, 's10', 0.78, 1.7, 4.55);
  phone(s, 's11', 3.32, 1.7, 4.55);
  caption(s, '10　景點頁', 0.35, 6.4, 3.0);
  caption(s, '11　上傳音檔', 2.9, 6.4, 3.0);
  problem(s, 6.35, 1.7, 6.35, 1.75, '① 全 App 只有一種語氣', [
    '「這個地點目前還沒有語音導覽唷！」——剛付完 $3,800 的',
    '商家，看到的是這句寫給觀光客的話。',
  ], 'flag');
  problem(s, 6.35, 3.65, 6.35, 1.65, '② 規則出現在錯誤的時機', [
    '「音檔時長至少 30 秒，且不得超過 5 分鐘」印在上傳按鈕的',
    '下方。使用者是先錄完、先選完檔，才看到這條規則。',
  ], 'flag');
  problem(s, 6.35, 5.5, 6.35, 1.2, '③ 原始檔名未清洗直接外露', [
    'Neo_渝函_預設-## 一隻烤.mp3　連檔名裡的「##」都照樣顯示。',
  ], 'flag');
  foot(s, '一個付費商家與一個路人，在這兩個畫面上看到的內容完全相同。');
  s.addNotes('商家視角在這個產品裡不存在，只有一套給遊客的文案。');
}

// ============================================================ 15 STEP 12
{
  const s = lightSlide();
  head(s, { num: '12', kicker: '步驟 12', title: '決定金流的分岔，做成一個沒防呆的勾選框', tone: 'flag' });
  s.addImage({ path: IMG('s12'), x: 0.78, y: 1.7, w: 3.02, h: 4.99, shadow: sh() });
  ring(s, 0.90, 3.18, 0.92, 0.36);
  problem(s, 4.4, 1.7, 8.3, 2.35, '商家要自己判斷「我算不算商家」', [
    '「請先確認本地點屬於何種景點？」兩個外觀相同的方框：',
    '一般景點／商家景點。勾選商家景點後才提示「需付費才能上架」。',
    '',
    '一個直接決定要不要收費的分岔，被放在上傳音檔之後、',
    '沒有防呆、沒有說明差異、也沒有預設判斷。',
  ], 'flag');
  problem(s, 4.4, 4.25, 8.3, 2.45, '更關鍵：這裡跟第 5 步的付款完全沒有連動', [
    '商家在第 5 步已經付過錢了。',
    '',
    '系統卻在這裡再次告訴他「需付費才能上架該地點導覽語音」。',
    '',
    '付款狀態、點數餘額、景點類型三者之間，沒有任何一條資料是通的。',
  ], 'dead');
  foot(s, '商家如果誤勾「一般景點」，他剛付的 $3,800 在這條路徑上完全用不到。');
  s.addNotes('這一步暴露了付款狀態沒有回流到產品流程裡。');
}

// ============================================================ 16 STEPS 13-14
{
  const s = lightSlide();
  head(s, { num: '13', kicker: '步驟 13 – 14', title: '$3,800 買到的東西，全部要自己做', tone: 'dead' });
  phone(s, 's13', 0.78, 1.7, 4.55);
  phone(s, 's14', 3.32, 1.7, 4.55);
  caption(s, '13　自己寫文案、自己拍照', 0.1, 6.4, 3.5);
  caption(s, '14　輸入內文送出（506／2047）', 2.65, 6.4, 3.5);
  problem(s, 6.35, 1.7, 6.35, 2.6, '交付物 100% 由商家自己生產', [
    '✕ 錄音：商家自己錄',
    '✕ 文案：商家自己寫（實測 506 字）',
    '✕ 照片：商家自己拍、自己上傳',
    '✕ 上架：還要等後台人工審核',
    '✕ 認領：商家自己回來點',
  ], 'dead');
  problem(s, 6.35, 4.5, 6.35, 2.2, '商業模式與產品交付互相矛盾', [
    '收費 $3,800／年，而流程上完全看不出',
    '這筆錢換到了什麼服務。',
    '',
    '這會是商家投訴與退費的第一個切入點。',
  ], 'dead');
  foot(s, '請對方在這 21 張截圖裡，指出哪一個畫面是這筆錢換來的東西。');
  s.addNotes('這一頁是跟老闆談判時最有力的一頁。');
}

// ============================================================ 17 SECTION D
section('D', '審核黑箱', '上傳成功之後，商家失去所有可見度：\n不知道審核要多久，也不知道自己的東西還在不在。', '步驟 15 – 18');

// ============================================================ 18 STEP 15
{
  const s = lightSlide();
  head(s, { num: '15', kicker: '步驟 15', title: 'Markdown 沒有被解析，原始標記直接印出來', tone: 'flag' });
  s.addImage({ path: IMG('s15'), x: 0.78, y: 1.7, w: 2.92, h: 4.91, shadow: sh() });
  s.addImage({ path: IMG('c15_md'), x: 4.3, y: 1.75, w: 8.4, h: 2.7, shadow: sh() });
  ring(s, 6.40, 3.90, 0.82, 0.40);
  problem(s, 4.3, 4.7, 4.05, 2.0, '① 前後端沒有內容格式共識', [
    '後端存 Markdown、前端當純',
    '文字輸出。',
    '',
    '簡介印出「## 一隻烤鴨…」，',
    '內文印出「**香記烤鴨**」。',
  ], 'flag');
  problem(s, 8.65, 4.7, 4.05, 2.0, '② 沒說審核要多久', [
    '「審核通過後即可上架」——',
    '沒有預估時間、沒有進度、',
    '沒有查詢入口、沒有通知。',
    '',
    '對商家而言是完全的黑箱。',
  ], 'flag');
  foot(s, '這個欄位從來沒有人定義過規格：誰負責存、誰負責 render、允不允許 Markdown。');
  s.addNotes('Markdown 未解析是低成本高可見度的缺陷，代表沒有基本的驗收。');
}

// ============================================================ 19 DEAD END 2
{
  const s = lightSlide();
  head(s, { num: '16', kicker: '死路 ②　步驟 16 – 17', title: '剛上傳成功的語音，在自己的畫面上消失了', tone: 'dead' });
  s.addImage({ path: IMG('c16_dots'), x: 0.78, y: 1.7, w: 4.55, h: 4.27, shadow: sh() });
  s.addText('實測者自己圈出那三個點，註記：「原來，商家要點右上角」', {
    x: 0.78, y: 6.12, w: 4.55, h: 0.32, fontFace: CJK, fontSize: 10, color: MUTE, margin: 0, isTextBox: true,
  });
  problem(s, 5.8, 1.7, 6.9, 2.45, '上傳成功 → 回到景點頁 →「尚無語音導覽」', [
    '後台看得到這筆資料，商家自己的畫面上卻沒有任何痕跡。',
    '',
    '沒有「審核中」卡片、沒有灰色佔位、沒有狀態標籤。',
    '使用者無法區分「審核中」與「上傳失敗」——會直接重傳。',
  ], 'dead');
  problem(s, 5.8, 4.35, 6.9, 2.35, '付費功能的唯一入口，藏在右上角三個點裡', [
    '「景點管理」沒有出現在「我的」頁面、沒有出現在訂閱頁，',
    '也沒有出現在景點頁的主要區域。選單裡只有這一個選項。',
    '',
    '截圖上那句「原來」，本身就是一次可用性測試的結論。',
  ], 'dead');
  foot(s, '這一步會直接製造重複上傳與客服工單。');
  s.addNotes('「原來」兩個字就是可用性測試的結果，不需要再另外做測試。');
}

// ============================================================ 20 DEAD END 3
{
  const s = lightSlide();
  head(s, { num: '18', kicker: '死路 ③　步驟 18', title: '同一個畫面，自己跟自己矛盾', tone: 'dead' });
  s.addImage({ path: IMG('c18_err'), x: 0.78, y: 1.7, w: 5.82, h: 4.96, shadow: sh() });
  s.addShape(pres.ShapeType.roundRect, { x: 7.15, y: 1.7, w: 5.55, h: 2.3, fill: { color: REDT }, rectRadius: 0.04 });
  s.addText([
    { text: '畫面說：', options: { fontSize: 13, color: MUTE, breakLine: true } },
    { text: '「目前未被認領」＋亮色可點的「我要認領」', options: { fontSize: 16, bold: true, color: INK, breakLine: true } },
    { text: '', options: { fontSize: 9, breakLine: true } },
    { text: '按下去說：', options: { fontSize: 13, color: MUTE, breakLine: true } },
    { text: '「該景點目前不可被認領」', options: { fontSize: 16, bold: true, color: RED } },
  ], { x: 7.5, y: 1.96, w: 4.9, h: 1.8, fontFace: CJK, lineSpacing: 25, margin: 0, isTextBox: true, valign: 'top' });
  problem(s, 7.15, 4.2, 5.55, 1.3, '前端沒拿真實狀態就把按鈕點亮', [
    '沒有 disable、沒有灰階、沒有說明，直接交給後端去擋。',
  ], 'dead');
  problem(s, 7.15, 5.65, 5.55, 1.05, '錯誤訊息不說原因也不說下一步', [
    '為什麼？要等什麼？等多久？找誰？一個字都沒有。',
  ], 'dead');
  foot(s, '最典型的「前端不 disable、後端才擋」寫法。使用者被騙點一次，換來一則無用的紅色橫幅。');
  s.addNotes('這一頁可以直接拿去對工程師談，責任非常明確。');
}

// ============================================================ 21 SECTION E
section('E', '後台與收尾', '真正的關卡在商家看不到的地方：\n兩個人工開關，決定他的付費功能能不能用。', '步驟 19 – 21');

// ============================================================ 22 BACKEND MISMATCH
{
  const s = lightSlide();
  head(s, { num: '19', kicker: '步驟 19 vs 20', title: '後台兩張表，對不起來', tone: 'dead' });
  s.addText('語音管理：已上架、審核完成', {
    x: 0.78, y: 1.6, w: 6, h: 0.32, fontFace: CJK, fontSize: 13, bold: true, color: TEAL, margin: 0, isTextBox: true,
  });
  s.addImage({ path: IMG('c19_row'), x: 0.78, y: 1.98, w: 11.9, h: 2.04, shadow: sh() });
  s.addText('景點管理：同一間店，語音數量 0、收聽數 0', {
    x: 0.78, y: 4.28, w: 8, h: 0.32, fontFace: CJK, fontSize: 13, bold: true, color: RED, margin: 0, isTextBox: true,
  });
  s.addImage({ path: IMG('c20_zero'), x: 0.78, y: 4.66, w: 5.6, h: 1.46, shadow: sh() });
  problem(s, 6.75, 4.66, 5.95, 2.0, '同一份資料，兩個模組讀出兩種結果', [
    'App 端顯示「尚無語音導覽」，',
    '極可能就是讀到這個 0。',
    '',
    '後台自己都不知道這間店有沒有語音。',
  ], 'dead');
  foot(s, '兩張截圖來自同一個後台、同一個時間點、同一筆景點「香記烤鴨」。');
  s.addNotes('這是可以直接驗證的資料一致性缺陷。');
}

// ============================================================ 23 MANUAL TOGGLE
{
  const s = lightSlide();
  head(s, { num: '20', kicker: '步驟 20 – 21', title: '能不能用付費功能，取決於有沒有人記得撥開關', tone: 'dead' });
  s.addImage({ path: IMG('c20_toggle'), x: 0.78, y: 1.72, w: 4.3, h: 2.15, shadow: sh() });
  s.addText('後台的「是否開放認領」——一個純人工開關', {
    x: 0.78, y: 3.94, w: 4.3, h: 0.3, fontFace: CJK, fontSize: 10, color: MUTE, margin: 0, isTextBox: true,
  });
  problem(s, 5.5, 1.72, 7.2, 2.3, '主線由三個純人工關卡串起來', [
    '① 人工審核語音　② 人工打開「是否開放認領」　③ 商家自己回來重試',
    '',
    '沒有排程、沒有 SLA、沒有對外揭露，也沒有任何畫面告訴商家',
    '「你現在卡在第幾關」。',
  ], 'dead');
  s.addImage({ path: IMG('c21_claim'), x: 0.78, y: 4.35, w: 2.72, h: 2.33, shadow: sh() });
  problem(s, 3.85, 4.35, 8.85, 2.33, '開關撥開了，但商家沒有收到任何通知', [
    '✕ 沒有推播　✕ 沒有 Email　✕ 沒有站內信　✕ 沒有紅點　✕ 沒有待辦中心',
    '',
    '付款成功、審核完成、開放認領、認領成功——四個關鍵狀態變化，商家收到 0 則通知。',
    '',
    '實測者的註記：「商家終於能認領，但沒有收到任何通知，只能憑感覺、靠運氣。」',
  ], 'dead');
  foot(s, '這不是產品流程，是把人力流程外包給了付費客戶。');
  s.addNotes('零通知是這條流程最不可辯解的一點。');
}

// ============================================================ 24 C-SIDE
{
  const s = lightSlide();
  head(s, { num: '20b', kicker: '死路 ④　步驟 20b', title: '遊客看得到語音，但按下去不給聽', tone: 'dead' });
  s.addText('遊客看到：有封面、有時長、有標題、有作者', {
    x: 0.78, y: 1.63, w: 7, h: 0.32, fontFace: CJK, fontSize: 12.5, bold: true, color: TEAL, margin: 0, isTextBox: true,
  });
  s.addImage({ path: IMG('c20b_list'), x: 0.78, y: 2.0, w: 7.2, h: 1.44, shadow: sh() });
  s.addText('按下播放：', {
    x: 0.78, y: 3.68, w: 7, h: 0.32, fontFace: CJK, fontSize: 12.5, bold: true, color: RED, margin: 0, isTextBox: true,
  });
  s.addImage({ path: IMG('c20b_play'), x: 0.78, y: 4.05, w: 7.2, h: 2.62, shadow: sh() });
  problem(s, 8.4, 1.63, 4.3, 2.6, 'C 端被內部流程連坐', [
    '「此景點未被管理，',
    '　無法播放錄音」',
    '——這是給一般遊客看的訊息。',
    '',
    '一個他完全無法理解、',
    '也完全無法解決的內部狀態。',
  ], 'dead');
  problem(s, 8.4, 4.43, 4.3, 2.24, '壞得比「暫無內容」更難看', [
    '不是沒東西，是有東西但不給聽。',
    '',
    '商家付了錢，成果對外卻是壞的，',
    '而且壞在一個他沒辦法解釋給',
    '客人聽的理由上。',
  ], 'dead');
  foot(s, '同時傷害 C 端體驗與 B 端信任——這是唯一一個會擴散到付費客戶之外的問題。');
  s.addNotes('這一點會影響品牌，不只是影響單一商家。');
}

// ============================================================ 25 SUMMARY TABLE
{
  const s = lightSlide();
  head(s, { title: '問題清單與責任歸屬', kicker: '三個層級' });
  const cols = [
    {
      h: '一、工程實作缺陷', who: '責任：前端／後端／QA', c: RED,
      items: [
        ['致命', '按鈕可點但後端拒絕（18）'],
        ['致命', '後台兩張表資料不一致（19↔20）'],
        ['致命', '上傳後沒有「審核中」狀態（16）'],
        ['嚴重', 'Markdown 未解析（15）'],
        ['嚴重', '續訂條款顯示不全（4）'],
        ['嚴重', '錯誤訊息不說原因（18、20b）'],
        ['待改', '方案頁初始捲動位置錯誤（4）'],
        ['待改', '「回復購買」幾乎不可見（4）'],
        ['待改', '上傳檔名未清洗（11）'],
        ['待改', '「取消認領」無二次確認（21）'],
        ['待改', '營運後台掛 dev-1.0.0'],
      ],
    },
    {
      h: '二、產品設計缺失', who: '責任：PM／設計', c: ORNG,
      items: [
        ['致命', '付款成功後零引導（5→8）'],
        ['致命', '訂閱綁帳號、內容綁景點，兩者不通'],
        ['致命', '「認領」這個步驟不該存在'],
        ['嚴重', '「點數」從未被定義也未被顯示'],
        ['嚴重', '訂閱頁缺到期日／扣款日／取消入口'],
        ['嚴重', '唯一商家入口藏在三個點裡（16）'],
        ['嚴重', '「檢視認領中的景點」必定是空的'],
        ['嚴重', '全程 0 則通知'],
        ['嚴重', '商家與遊客共用同一套文案'],
        ['嚴重', '金流分岔做成無防呆勾選框（12）'],
        ['待改', '音檔規則出現在錯誤時機（11）'],
      ],
    },
    {
      h: '三、流程與管理層', who: '責任：公司／專案管理', c: DARK,
      items: [
        ['致命', '主線三個人工關卡，商家全看不到'],
        ['致命', 'C 端被內部流程連坐（20b）'],
        ['致命', '商業模式與交付互相矛盾'],
        ['致命', '這條主線沒有被內部走過一次'],
        ['嚴重', '21 步裡商家只能獨立完成 5 步'],
        ['嚴重', '三處死路都在主線必經節點上'],
      ],
    },
  ];
  cols.forEach((col, i) => {
    const x = 0.6 + i * 4.07;
    s.addShape(pres.ShapeType.roundRect, { x, y: 1.75, w: 3.77, h: 5.0, fill: { color: TINT }, rectRadius: 0.04 });
    s.addText(col.h, { x: x + 0.28, y: 1.94, w: 3.25, h: 0.36, fontFace: CJK, fontSize: 15, bold: true, color: col.c, margin: 0, isTextBox: true });
    s.addText(col.who, { x: x + 0.28, y: 2.32, w: 3.25, h: 0.28, fontFace: CJK, fontSize: 10, color: MUTE, margin: 0, isTextBox: true });
    col.items.forEach((it, j) => {
      const y = 2.76 + j * 0.355;
      const sc = it[0] === '致命' ? RED : it[0] === '嚴重' ? ORNG : MUTE;
      s.addText(it[0], { x: x + 0.28, y, w: 0.54, h: 0.32, fontFace: CJK, fontSize: 9.5, bold: true, color: sc, margin: 0, isTextBox: true, valign: 'middle' });
      s.addText(it[1], { x: x + 0.86, y, w: 2.7, h: 0.32, fontFace: CJK, fontSize: 10.5, color: INK, margin: 0, isTextBox: true, valign: 'middle' });
    });
  });
  // closing note in the third column's empty space
  s.addShape(pres.ShapeType.roundRect, { x: 9.02, y: 5.05, w: 3.33, h: 1.4, fill: { color: REDT }, rectRadius: 0.04 });
  s.addText('缺的不是工程能力，是驗收。\n\n第 8、16、18 步的問題，只要有人\n實際付一次錢走一次，就不可能\n看不到。', {
    x: 9.28, y: 5.22, w: 2.85, h: 1.1, fontFace: CJK, fontSize: 10.5, color: RED,
    bold: true, lineSpacing: 16, margin: 0, isTextBox: true,
  });
  foot(s, '括號內數字為對應的流程步驟編號。');
  s.addNotes('第三欄才是這份稽核真正的重點——缺的不是工程能力，是驗收。');
}

// ============================================================ 26 THREE ASKS
{
  const s = darkSlide();
  s.addText('可以直接問對方的三個問題', {
    x: 0.85, y: 0.72, w: 11.6, h: 0.62, fontFace: CJK, fontSize: 30, bold: true,
    color: 'FFFFFF', margin: 0, isTextBox: true,
  });
  s.addText('沒有一個需要技術背景，也沒有一個能用「這是小 bug，之後修」帶過。', {
    x: 0.85, y: 1.42, w: 11.6, h: 0.35, fontFace: CJK, fontSize: 13.5,
    color: 'A8B4C2', margin: 0, isTextBox: true,
  });
  const asks = [
    ['上線之前，團隊裡有沒有任何一個人，以商家身分、用自己的信用卡，從付款一路走到語音真的能被播放？',
     '如果有，第 8、16、18 步不可能長這樣。如果沒有，問題就不在工程師身上，而在誰該負責驗收這條路徑。'],
    ['「認領」這個步驟是為了解決什麼問題？它為什麼不能在付款完成的當下自動完成？',
     '如果答案是「防止有人亂認領別人的店」，那該做的是身分驗證，不是把一個需要後台手動開關的按鈕丟給付費客戶自己猜。'],
    ['商家付的 $3,800，買到的交付物具體是哪一個畫面？',
     '錄音自己錄、文案自己寫、照片自己拍、認領自己點。請對方在這 21 張截圖裡指出來。'],
  ];
  asks.forEach((a, i) => {
    const y = 2.1 + i * 1.6;
    s.addShape(pres.ShapeType.roundRect, { x: 0.85, y, w: 11.6, h: 1.4, fill: { color: DARK2 }, rectRadius: 0.04 });
    s.addText(String(i + 1), {
      x: 1.1, y: y + 0.3, w: 0.62, h: 0.62, fontFace: NUM, fontSize: 27, bold: true,
      color: 'E09A50', align: 'center', margin: 0, isTextBox: true, valign: 'middle',
    });
    s.addText(a[0], {
      x: 1.88, y: y + 0.2, w: 10.4, h: 0.58, fontFace: CJK, fontSize: 15, bold: true,
      color: 'FFFFFF', lineSpacing: 22, margin: 0, isTextBox: true,
    });
    s.addText(a[1], {
      x: 1.88, y: y + 0.82, w: 10.4, h: 0.5, fontFace: CJK, fontSize: 11.5,
      color: 'A8B4C2', lineSpacing: 17, margin: 0, isTextBox: true,
    });
  });
  s.addText('這 21 步的流程圖，是使用者第一次幫這個團隊走完的。缺的不是工程能力，是驗收。', {
    x: 0.85, y: 6.85, w: 11.6, h: 0.35, fontFace: CJK, fontSize: 12.5, bold: true,
    color: 'E09A50', margin: 0, isTextBox: true,
  });
  s.addNotes('用這三個問題收尾，對方無法用技術細節迴避。');
}

// ============================================================ 27 APPENDIX DIVIDER
section('F', '附錄：地圖服務評估', '先列出商家在前台實際怎麼操作，再看換 OSM 哪一步會不同。\n結論：12 步裡只有 2 步真的碰到 Google。', '追加評估 ・ 第二版 ・ 2026.08.28');

// ============================================================ 28 REFRAME
{
  const s = lightSlide();
  head(s, { title: '先修正前一版的框架', kicker: '評估方法' });
  problem(s, 0.6, 1.75, 6.0, 2.35, '前一版把影響範圍講得太大了', [
    '第一版整份架在「景點主鍵可能是 place_id」這個假設上，',
    '結論寫成「這不是換底圖，是換資料庫」。',
    '',
    '主鍵那一題仍然是真的、也仍然要問——但它是一項有界的',
    '工程任務，不是整條流程都建在 Google 上。',
  ], 'flag');
  note(s, 0.6, 4.3, 6.0, 2.4, '這一版改用逐步標記', [
    '把商家在前台實際的每一步列出來，各自標記：',
    '',
    '① 這一步確定是 ResoMap 自己的資料',
    '② 這一步依賴 Google 地點搜尋',
    '③ 這一步從前台無法確認',
    '④ 換 OSM 後這一步會有什麼不同',
  ]);
  const tally = [
    ['9', 'ResoMap 自己的商業流程\n換 OSM 完全不變', TEAL],
    ['2', '真正依賴 Google 地點搜尋\n會變的就這兩步', RED],
    ['1', '目前不存在、換 OSM 後\n必須補上的一步', '2F4A7A'],
    ['4', '從前台無法確認\n需工程師回覆', ORNG],
  ];
  tally.forEach((t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 6.8 + col * 3.0, y = 1.75 + row * 2.48;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 2.85, h: 2.25, fill: { color: TINT }, rectRadius: 0.04 });
    s.addText(t[0], {
      x: x + 0.3, y: y + 0.3, w: 2.2, h: 0.85, fontFace: NUM, fontSize: 48, bold: true,
      color: t[2], margin: 0, isTextBox: true, valign: 'middle',
    });
    s.addText(t[1], {
      x: x + 0.3, y: y + 1.25, w: 2.3, h: 0.85, fontFace: CJK, fontSize: 11.5,
      color: MUTE, lineSpacing: 17, margin: 0, isTextBox: true,
    });
  });
  foot(s, '訂閱、圖片、文案、語音、送審、審核、上架這些本來就是 ResoMap 自己的東西，換地圖服務動不到它們。');
  s.addNotes('先承認前一版框架過頭，再用逐步標記重做。');
}

// ============================================================ 29 FLOW TABLE
{
  const s = lightSlide();
  head(s, { title: '前台實測流程，逐步標記', kicker: '依實際操作順序，非產品文件順序' });

  const COLS = [0.5, 3.05, 1.0, 1.75, 5.8];
  const X0 = 0.6;
  const cx = [X0];
  for (let i = 0; i < COLS.length - 1; i++) cx.push(cx[i] + COLS[i]);
  const HDY = 1.68, HDH = 0.36, ROWH = 0.386;

  s.addShape(pres.ShapeType.rect, { x: X0, y: HDY, w: 12.1, h: HDH, fill: { color: TINT } });
  ['#', '前台實際操作', '實測', '歸屬', '換成 OSM 之後'].forEach((t, i) => {
    s.addText(t, {
      x: cx[i] + 0.14, y: HDY, w: COLS[i] - 0.24, h: HDH, fontFace: CJK, fontSize: 10.5, bold: true,
      color: MUTE, valign: 'middle', margin: 0, isTextBox: true,
    });
  });

  const OWN = 'own', GOO = 'goo', NEW = 'new';
  const rows = [
    ['1',  '訂閱付款',              '步驟 3–6',   OWN, '走 Apple 內購，與地圖無關。完全不變'],
    ['2',  '搜尋店家',              '步驟 9',     GOO, '會變：台灣小型商家搜不到的比例明顯上升'],
    ['3',  '找到店家：帶出店名地址', '步驟 10',    GOO, '會變：地址常缺門牌或缺里，要讓商家能補'],
    ['4',  '建立景點／商家',        '目前沒有',   NEW, '要新增：搜不到 → 手動輸入 → 地圖選點'],
    ['5',  '選景點類型（一般／商家）', '步驟 12',  OWN, '自家商業規則。不變'],
    ['6',  '上傳語音檔',            '步驟 11',    OWN, '自家儲存與時長規則。不變'],
    ['7',  '上傳導覽配圖',          '步驟 13',    OWN, '商家自己拍、自己傳。不變'],
    ['8',  '填寫名稱與介紹文案',    '步驟 13–14', OWN, '商家自己寫（實測 506 字）。不變'],
    ['9',  '送審',                  '步驟 15',    OWN, '不變'],
    ['10', '後台審核通過',          '步驟 19',    OWN, '不變'],
    ['11', '後台開放認領 → 商家認領', '步驟 20–21', 'unk', '綁自家 ID 就不變；綁 place_id 要重新對應'],
    ['12', '前台顯示與播放',        '步驟 20b',   OWN, '由認領狀態決定，自家邏輯。不變'],
  ];
  const PILL = {
    own: ['ResoMap', '235F45', 'E4EFE8'],
    goo: ['依賴 Google', RED, REDT],
    new: ['目前不存在', '2F4A7A', 'E5EAF3'],
    unk: ['ResoMap／待確認', ORNG, ORNGT],
  };
  rows.forEach((r, i) => {
    const y = HDY + HDH + i * ROWH;
    const kind = r[3];
    const rowBg = kind === GOO ? REDT : kind === NEW ? 'E5EAF3' : (i % 2 ? 'FFFFFF' : 'FAFBFC');
    s.addShape(pres.ShapeType.rect, { x: X0, y, w: 12.1, h: ROWH, fill: { color: rowBg } });
    s.addText(r[0], {
      x: cx[0] + 0.1, y, w: COLS[0] - 0.16, h: ROWH, fontFace: NUM, fontSize: 10, bold: true,
      color: MUTE, valign: 'middle', margin: 0, isTextBox: true,
    });
    s.addText(r[1], {
      x: cx[1] + 0.14, y, w: COLS[1] - 0.24, h: ROWH, fontFace: CJK, fontSize: 10.5, bold: true,
      color: INK, valign: 'middle', margin: 0, isTextBox: true,
    });
    s.addText(r[2], {
      x: cx[2] + 0.1, y, w: COLS[2] - 0.16, h: ROWH, fontFace: CJK, fontSize: 9.5,
      color: MUTE, valign: 'middle', margin: 0, isTextBox: true,
    });
    const p = PILL[kind];
    s.addShape(pres.ShapeType.roundRect, {
      x: cx[3] + 0.12, y: y + 0.055, w: COLS[3] - 0.3, h: ROWH - 0.11,
      fill: { color: p[2] }, line: { color: p[1], width: 0.75 }, rectRadius: 0.02,
    });
    s.addText(p[0], {
      x: cx[3] + 0.12, y: y + 0.055, w: COLS[3] - 0.3, h: ROWH - 0.11, align: 'center',
      fontFace: CJK, fontSize: 9, bold: true, color: p[1], valign: 'middle', margin: 0, isTextBox: true,
    });
    s.addText(r[4], {
      x: cx[4] + 0.14, y, w: COLS[4] - 0.24, h: ROWH, fontFace: CJK, fontSize: 10.5,
      color: (kind === GOO || kind === NEW) ? INK : BODY, bold: (kind === GOO || kind === NEW),
      valign: 'middle', margin: 0, isTextBox: true,
    });
  });
  foot(s, '順帶一個發現：認領是第 11 步，不是第 4 步——排在上傳、送審、後台審核全部做完之後，跟直覺完全相反。');
  s.addNotes('這張表就是陳醫師要的「前台實測流程逐步標記」。');
}

// ============================================================ 30 BLOCKED MERCHANT
{
  const s = lightSlide();
  head(s, { num: '!', kicker: 'Google 版真正的問題', title: '新開的店，現在根本進不來', tone: 'dead' });
  s.addShape(pres.ShapeType.roundRect, { x: 0.6, y: 1.72, w: 12.1, h: 1.35, fill: { color: REDT }, rectRadius: 0.04 });
  s.addText('一家上個月才開的餐廳，想付錢做語音導覽——但他做不到。', {
    x: 0.95, y: 1.9, w: 11.4, h: 0.42, fontFace: CJK, fontSize: 20, bold: true, color: RED, margin: 0, isTextBox: true,
  });
  s.addText('因為 ResoMap 的第 2 步是搜 Google。Google 還沒收錄這家店，所以商家在 ResoMap 裡搜不到自己，整條付費流程從第 2 步就走不下去。', {
    x: 0.95, y: 2.38, w: 11.4, h: 0.55, fontFace: CJK, fontSize: 13, color: INK, lineSpacing: 20, margin: 0, isTextBox: true,
  });

  const chain = [
    ['1', '餐廳新開幕', '最需要曝光、最願意付錢做導覽的時候。', INK],
    ['2', 'ResoMap 搜不到', '因為 Google 上還沒有這個地點。', RED],
    ['3', '先去登錄 Google 商家', '填資料、等審核、可能要驗證明信片。', INK],
    ['4', '等 Google 通過', '數天到數週，而且不保證會過。', INK],
    ['5', '才回來用 ResoMap', '如果那時候他還記得、還想付這筆錢。', INK],
  ];
  chain.forEach((c, i) => {
    const x = 0.6 + i * 2.44;
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.35, w: 2.26, h: 2.05, fill: { color: c[3] === RED ? REDT : TINT }, rectRadius: 0.04 });
    s.addText(c[0], { x: x + 0.24, y: 3.52, w: 0.8, h: 0.3, fontFace: NUM, fontSize: 13, bold: true, color: c[3] === RED ? RED : TEAL, margin: 0, isTextBox: true });
    s.addText(c[1], { x: x + 0.24, y: 3.86, w: 1.85, h: 0.62, fontFace: CJK, fontSize: 13, bold: true, color: c[3], lineSpacing: 19, margin: 0, isTextBox: true });
    s.addText(c[2], { x: x + 0.24, y: 4.5, w: 1.85, h: 0.78, fontFace: CJK, fontSize: 10.5, color: MUTE, lineSpacing: 15, margin: 0, isTextBox: true });
  });

  problem(s, 0.6, 5.62, 12.1, 1.08, 'ResoMap 現在的獲客資格，是由 Google 決定的', [
    '平台不能自己決定要服務誰——只能服務「已經被 Google 收錄的店」。而新開幕的店，正是最想曝光的客群。',
  ], 'dead');
  foot(s, '這是目前就在發生的商業損失，不是遷移之後才會有的風險。');
  s.addNotes('這一頁是換 OSM 最有力的商業理由，比省錢更重要。');
}

// ============================================================ 31 WHO IS BLOCKED
{
  const s = lightSlide();
  head(s, { title: '現在有哪些客群進不來', kicker: '每一種都會踩到，不是邊緣情況' });
  const cases = [
    ['新開幕的店', 'Google 還沒收錄，最想曝光的客群反而被擋在門外。'],
    ['夜市攤位、市場攤商、路邊小店', '很多根本不會出現在 Google Places。'],
    ['改過名的店', 'Google 還是舊招牌，商家在 ResoMap 搜到的是自己的舊名字。'],
    ['搬過家的店', '地址是舊的，帶進 ResoMap 的地址也跟著錯，而商家改不掉。'],
    ['沒有店面的景點', '廟宇分殿、私人園區、步道涼亭、地方故事點位常常沒有。'],
    ['Google 上重複或錯誤的 POI', '商家認領到錯的那一個，而平台沒有工具能修。'],
  ];
  cases.forEach((c, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 6.2, y = 1.8 + row * 1.66;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 5.9, h: 1.48, fill: { color: REDT }, rectRadius: 0.04 });
    s.addText('✕', { x: x + 0.3, y: y + 0.24, w: 0.4, h: 0.35, fontFace: CJK, fontSize: 15, bold: true, color: RED, margin: 0, isTextBox: true });
    s.addText(c[0], { x: x + 0.78, y: y + 0.24, w: 4.85, h: 0.36, fontFace: CJK, fontSize: 15, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(c[1], { x: x + 0.78, y: y + 0.68, w: 4.85, h: 0.62, fontFace: CJK, fontSize: 12, color: BODY, lineSpacing: 18, margin: 0, isTextBox: true });
  });
  foot(s, '這些正好是最需要語音導覽、也最沒有其他曝光管道的客群。');
  s.addNotes('把「Google 不準」具體化成六種會實際發生的情況。');
}

// ============================================================ 32 OSM UPSIDE
{
  const s = lightSlide();
  head(s, { title: '換 OSM 有哪些好處', kicker: '大部分不是變好一點，是從不可能變成可能' });
  const bens = [
    ['01', '可以自己建立地點', 'OSM 允許任何人新增節點。可以做成「搜不到 → 手動輸入 → 地圖選點 → 建立商家」，當場把人留住。'],
    ['02', '新開的店當天就能上架', '不用等 Google 審核、不用等明信片驗證。開幕當天就能買訂閱、上傳語音。'],
    ['03', '資料錯了可以自己修', '店名改了、搬家了、少了門牌，平台自己就能改，客服終於有工具處理。'],
    ['04', '沒有查詢配額與費用壓力', 'Places Text Search 是帳單最貴的一項，又在最高頻路徑上。沒有計費壓力後，搜尋能做得更好用。'],
    ['05', '資料可以合法留在自己手上', 'Google 條款限制快取 Places 內容、也限制顯示在非 Google 底圖上。目前的用法值得法務看一眼。'],
    ['06', '商家補的資料變成平台資產', '累積下來就是一份 Google 沒有的在地 POI 庫——攤商、小店、地方景點，正好是 Google 覆蓋最差的類別。'],
  ];
  bens.forEach((b, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.07, y = 1.78 + row * 1.72;
    s.addShape(pres.ShapeType.roundRect, { x, y, w: 3.77, h: 1.55, fill: { color: 'E4EFE8' }, rectRadius: 0.04 });
    s.addText(b[0], { x: x + 0.28, y: y + 0.18, w: 1, h: 0.28, fontFace: NUM, fontSize: 11, bold: true, color: '235F45', margin: 0, isTextBox: true });
    s.addText(b[1], { x: x + 0.28, y: y + 0.46, w: 3.25, h: 0.34, fontFace: CJK, fontSize: 13.5, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(b[2], { x: x + 0.28, y: y + 0.82, w: 3.25, h: 0.66, fontFace: CJK, fontSize: 10.5, color: BODY, lineSpacing: 15, margin: 0, isTextBox: true });
  });
  const warns = [
    ['OSM 的弱項要誠實承認', '台灣道路與門牌不差，弱的是商家 POI 與部分中文標註。底圖會比 Google 空、公車站圖層要自己接、導航跳轉沒有對等替代。但商家 POI 正好是 01、06 可以自己補的。'],
    ['ODbL 不等於無條件免費', 'OSM 採 ODbL，有 share-alike 義務。若把 OSM 資料與自家資料合併成衍生資料庫，可能被要求以同樣授權釋出。換之前要先確認資料模型。'],
  ];
  warns.forEach((w, i) => {
    const x = 0.6 + i * 6.2;
    s.addShape(pres.ShapeType.roundRect, { x, y: 5.28, w: 5.9, h: 1.42, fill: { color: ORNGT }, rectRadius: 0.04 });
    s.addText('注意　' + w[0], { x: x + 0.3, y: 5.44, w: 5.3, h: 0.32, fontFace: CJK, fontSize: 13, bold: true, color: ORNG, margin: 0, isTextBox: true });
    s.addText(w[1], { x: x + 0.3, y: 5.78, w: 5.3, h: 0.8, fontFace: CJK, fontSize: 10.5, color: BODY, lineSpacing: 15, margin: 0, isTextBox: true });
  });
  foot(s, '好處集中在「搜不到就自己建」這一件事上——它把一條目前完全走不通的路打開。');
  s.addNotes('01 是最大的一項，其他都是它的延伸。');
}

// ============================================================ 33 QUESTIONS
{
  const s = lightSlide();
  head(s, { title: '從前台無法確認、需要工程師回覆的', kicker: '前一版列了八題，逐步標記之後只剩四題' });
  const qs = [
    ['01', '第 2 步的搜尋框，打的是 Google Places 還是自家景點資料庫？',
      '實測時搜到的店還沒有任何語音內容，看起來是 Google。確認後第 2、3 步的判斷才算定案。', true],
    ['02', '第 11 步的認領，綁定的是 Google place_id 還是自家 ID？',
      '這是主鍵那一題唯一真正落地的地方。綁自家 ID 就只是換搜尋來源；綁 place_id 才要重新對應。', true],
    ['03', '店名與地址是搜尋當下存進資料庫，還是每次即時打 API？',
      '存起來的話舊資料可以原地保留，只有新建的走 OSM；即時打的話換掉當天全部景點一起變。', false],
    ['04', '首頁的「顯示周邊景點」打 Nearby Search，還是查自家座標範圍？',
      '後者幾乎零遷移成本，前者要重做。這是除了搜尋以外唯一可能還藏著 Google 呼叫的地方。', false],
  ];
  qs.forEach((q, i) => {
    const y = 1.8 + i * 1.24;
    s.addShape(pres.ShapeType.roundRect, {
      x: 0.6, y, w: 12.1, h: 1.1, fill: { color: q[3] ? REDT : TINT }, rectRadius: 0.04,
    });
    s.addText(q[0], { x: 0.92, y: y + 0.2, w: 0.6, h: 0.34, fontFace: NUM, fontSize: 15, bold: true, color: q[3] ? RED : MUTE, margin: 0, isTextBox: true });
    s.addText(q[1], { x: 1.62, y: y + 0.18, w: 10.8, h: 0.36, fontFace: CJK, fontSize: 15, bold: true, color: INK, margin: 0, isTextBox: true });
    s.addText(q[2], { x: 1.62, y: y + 0.6, w: 10.8, h: 0.36, fontFace: CJK, fontSize: 11.5, color: MUTE, margin: 0, isTextBox: true });
  });
  foot(s, '紅底兩題是前提：只要這兩題有答案，遷移範圍就能算得出來。');
  s.addNotes('題數從八題收斂到四題，是因為逐步標記排除了大部分不確定性。');
}

// ============================================================ 34 CLOSING
{
  const s = darkSlide();
  s.addText('結論', {
    x: 0.85, y: 0.78, w: 11.6, h: 0.4, fontFace: CJK, fontSize: 13, bold: true,
    color: 'E09A50', charSpacing: 2.5, margin: 0, isTextBox: true,
  });
  s.addText('ResoMap 真正的產品是語音導覽，\n地點只是掛語音的鉤子。', {
    x: 0.85, y: 1.32, w: 11.6, h: 1.7, fontFace: CJK, fontSize: 34, bold: true,
    color: 'FFFFFF', lineSpacing: 50, margin: 0, isTextBox: true,
  });
  const blocks = [
    ['不會變的', '訂閱、圖片、文案、語音、送審、審核、認領、上架——這九步是 ResoMap 的商業流程，換地圖服務動不到它們。', '5FBDB2'],
    ['會變的', '只有「怎麼找到或建立一個地點」這件事。底圖會空一點、地址品質要靠自己補、要新增一個手動建立地點的流程。', 'E09A50'],
    ['換來的', '「搜不到就自己建」——把一條目前完全走不通的路打開。新開幕的店、夜市攤位、地方景點，終於收得了。', 'E08A7A'],
  ];
  blocks.forEach((b, i) => {
    const x = 0.85 + i * 3.95;
    s.addShape(pres.ShapeType.roundRect, { x, y: 3.4, w: 3.6, h: 2.15, fill: { color: DARK2 }, rectRadius: 0.04 });
    s.addText(b[0], { x: x + 0.32, y: 3.6, w: 2.9, h: 0.32, fontFace: CJK, fontSize: 12, bold: true, color: b[2], charSpacing: 2, margin: 0, isTextBox: true });
    s.addText(b[1], { x: x + 0.32, y: 4.02, w: 2.96, h: 1.35, fontFace: CJK, fontSize: 12, color: 'C4CEDA', lineSpacing: 20, margin: 0, isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, { x: 0.85, y: 5.78, w: 11.6, h: 0.92, fill: { color: '3A2420' }, rectRadius: 0.04 });
  s.addText('目前把「找到地點」外包給 Google 的代價，不是底圖好不好看，是平台不能決定自己要服務誰。', {
    x: 1.25, y: 5.98, w: 10.8, h: 0.5, fontFace: CJK, fontSize: 15, bold: true,
    color: 'F0A99A', margin: 0, isTextBox: true, valign: 'middle',
  });
  s.addText('本版依陳醫師的方法重做，取代第一版以「主鍵風險」為主軸的框架。', {
    x: 0.85, y: 6.88, w: 11.6, h: 0.32, fontFace: CJK, fontSize: 11.5,
    color: '8B98A6', margin: 0, isTextBox: true,
  });
  s.addNotes('收在商業層面：這不是技術偏好問題，是能不能服務客戶的問題。');
}

pres.writeFile({ fileName: path.join(__dirname, 'ResoMap商家訂閱流程稽核.pptx') })
  .then(f => console.log('WROTE', f));
