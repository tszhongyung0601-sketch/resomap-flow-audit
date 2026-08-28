// Wraps the artifact-authored report HTML into standalone documents for GitHub Pages,
// and generates the landing page. Run: node build/pages.js
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'docs');
fs.mkdirSync(OUT, { recursive: true });

const RESET = `
    *, *::before, *::after { box-sizing: border-box; }
    img, svg { max-width: 100%; height: auto; }
    a { color: inherit; }
`;

function wrap(srcRel, outName) {
  const raw = fs.readFileSync(path.join(ROOT, srcRel), 'utf8');
  const i = raw.indexOf('</style>');
  if (i === -1) throw new Error('no </style> in ' + srcRel);
  const head = raw.slice(0, i + '</style>'.length);
  const body = raw.slice(i + '</style>'.length);
  const doc = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>${RESET}</style>
${head}
</head>
<body>
${body}
</body>
</html>
`;
  fs.writeFileSync(path.join(OUT, outName), doc, 'utf8');
  const title = (raw.match(/<title>([^<]*)<\/title>/) || [, outName])[1];
  console.log('wrote docs/' + outName + '  —  ' + title);
  return title;
}

wrap('reports/01-subscription-flow-audit.html', 'subscription-flow-audit.html');
wrap('reports/02-map-migration-assessment.html', 'map-migration-assessment.html');

const REPO = 'https://github.com/tszhongyung0601-sketch/resomap-flow-audit';

const index = `<!doctype html>
<html lang="zh-Hant">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ResoMap 商家訂閱流程稽核</title>
<meta name="description" content="以商家身分實際走完 ResoMap 訂閱付款到語音上線的 21 個步驟，逐步記錄流程斷點與責任歸屬。">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;700;900&family=Noto+Serif+TC:wght@600;700;900&display=swap">
<style>
  :root {
    --ground: #EDEFF2; --surface: #FFFFFF; --surface-2: #F5F7F9;
    --ink: #14171C; --ink-mid: #454E5A; --ink-soft: #6B7684;
    --line: #D2D8DF; --line-soft: #E3E7EC;
    --accent: #0E4749; --sev-1: #9E1B14; --sev-1-wash: #F7E4E2;
    --f-serif: "Noto Serif TC", "Songti TC", Georgia, serif;
    --f-sans: "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", system-ui, sans-serif;
    --f-mono: "IBM Plex Mono", ui-monospace, Menlo, monospace;
  }
  @media (prefers-color-scheme: dark) {
    :root:not([data-theme="light"]) {
      --ground: #101418; --surface: #171C22; --surface-2: #1D242B;
      --ink: #E7EAEE; --ink-mid: #B3BCC6; --ink-soft: #8B96A3;
      --line: #2C343D; --line-soft: #242B33;
      --accent: #5FBDB2; --sev-1: #F0837A; --sev-1-wash: #33191A;
    }
  }
  :root[data-theme="dark"] {
    --ground: #101418; --surface: #171C22; --surface-2: #1D242B;
    --ink: #E7EAEE; --ink-mid: #B3BCC6; --ink-soft: #8B96A3;
    --line: #2C343D; --line-soft: #242B33;
    --accent: #5FBDB2; --sev-1: #F0837A; --sev-1-wash: #33191A;
  }

  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0; background: var(--ground); color: var(--ink);
    font-family: var(--f-sans); font-size: 16px; line-height: 1.75;
    -webkit-font-smoothing: antialiased;
  }
  .wrap { max-width: 940px; margin: 0 auto; padding: 0 24px 88px; }

  header { padding: 72px 0 34px; border-bottom: 2px solid var(--ink); }
  .eyebrow {
    font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.18em;
    text-transform: uppercase; color: var(--accent); margin: 0 0 20px;
    display: flex; flex-wrap: wrap; gap: 8px 14px;
  }
  .eyebrow .sep { color: var(--line); }
  h1 {
    font-family: var(--f-serif); font-weight: 900;
    font-size: clamp(32px, 5.6vw, 52px); line-height: 1.2;
    margin: 0 0 18px; text-wrap: balance; letter-spacing: -0.01em;
  }
  .lede { font-size: clamp(16px, 2.2vw, 18.5px); color: var(--ink-mid); max-width: 60ch; margin: 0; }
  .lede strong { color: var(--ink); font-weight: 700; }

  .metrics {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1px; background: var(--line); border: 1px solid var(--line); margin: 40px 0 64px;
  }
  .metric { background: var(--surface); padding: 18px 16px 16px; }
  .metric b {
    display: block; font-family: var(--f-mono); font-weight: 600; font-size: 27px;
    line-height: 1; margin-bottom: 7px; font-variant-numeric: tabular-nums;
  }
  .metric .bad { color: var(--sev-1); }
  .metric span { font-size: 12.5px; color: var(--ink-soft); line-height: 1.5; }

  h2 {
    font-family: var(--f-serif); font-weight: 700; font-size: 22px;
    margin: 0 0 20px; padding-bottom: 10px; border-bottom: 1px solid var(--ink);
  }
  section { margin-bottom: 60px; }

  .cards { display: grid; gap: 14px; }
  a.card {
    display: block; background: var(--surface); border: 1px solid var(--line);
    padding: 26px 28px; text-decoration: none; color: inherit;
    transition: border-color .15s ease, transform .15s ease;
  }
  a.card:hover, a.card:focus-visible { border-color: var(--accent); transform: translateY(-2px); }
  a.card:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  .card .num { font-family: var(--f-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--accent); display: block; margin-bottom: 10px; }
  .card h3 { font-family: var(--f-serif); font-weight: 700; font-size: 21px; margin: 0 0 8px; line-height: 1.4; }
  .card p { margin: 0; font-size: 14.5px; color: var(--ink-mid); line-height: 1.7; }

  .files { display: grid; gap: 10px; }
  a.file {
    display: flex; align-items: baseline; gap: 14px; flex-wrap: wrap;
    background: var(--surface-2); border: 1px solid var(--line-soft);
    padding: 15px 20px; text-decoration: none; color: inherit; font-size: 14.5px;
  }
  a.file:hover, a.file:focus-visible { border-color: var(--accent); }
  a.file:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
  a.file b { font-weight: 700; }
  a.file span { color: var(--ink-soft); font-size: 13px; }
  a.file .tag {
    font-family: var(--f-mono); font-size: 10.5px; letter-spacing: 0.08em;
    color: var(--accent); border: 1px solid var(--accent); padding: 1px 7px; margin-left: auto;
  }

  .deadends { border: 1px solid var(--sev-1); background: var(--sev-1-wash); padding: 24px 28px; }
  .deadends h3 { margin: 0 0 14px; font-size: 16px; font-weight: 900; color: var(--sev-1); }
  .deadends ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
  .deadends li { display: grid; grid-template-columns: 46px 1fr; gap: 12px; font-size: 14.5px; line-height: 1.65; }
  .deadends li b { font-family: var(--f-mono); font-weight: 600; color: var(--sev-1); }

  footer {
    margin-top: 60px; padding-top: 20px; border-top: 1px solid var(--line);
    font-family: var(--f-mono); font-size: 11.5px; color: var(--ink-soft); line-height: 1.9;
  }
  footer a { color: var(--accent); }

  @media (max-width: 620px) {
    .wrap { padding: 0 18px 64px; }
    header { padding-top: 48px; }
    a.card { padding: 22px 20px; }
  }
</style>
</head>
<body>
<div class="wrap">

  <header>
    <p class="eyebrow">
      <span>ResoMap</span><span class="sep">/</span>
      <span>商家訂閱流程稽核</span><span class="sep">/</span>
      <span>2026.08</span>
    </p>
    <h1>商家付了三千八，<br>然後被留在原地</h1>
    <p class="lede">
      以商家身分實際走完「訂閱付款 → 語音上線」全流程，共 21 個步驟，逐步截圖記錄。
      <strong>付款只花 49 秒，之後的每一步都在猜、或在等。</strong>
    </p>
  </header>

  <div class="metrics">
    <div class="metric"><b>21</b><span>流程步驟總數</span></div>
    <div class="metric"><b>5</b><span>商家能靠自己完成的步驟</span></div>
    <div class="metric"><b class="bad">3</b><span>死路</span></div>
    <div class="metric"><b class="bad">0</b><span>全程收到的通知</span></div>
    <div class="metric"><b>3</b><span>商家看不見的人工關卡</span></div>
  </div>

  <section>
    <h2>報告</h2>
    <div class="cards">
      <a class="card" href="subscription-flow-audit.html">
        <span class="num">報告 01</span>
        <h3>ResoMap 訂閱流程稽核</h3>
        <p>21 個步驟的實測全紀錄，逐格標出斷點；問題清單依工程實作、產品設計、流程管理三層歸屬，並附三個可以直接問對方的問題。</p>
      </a>
      <a class="card" href="map-migration-assessment.html">
        <span class="num">報告 02</span>
        <h3>換 OSM，只有兩步會變</h3>
        <p>把商家前台實際的 12 個操作逐步標記：哪一步是 ResoMap 自己的、哪一步依賴 Google 地點搜尋、哪一步從前台無法確認。附「新開的店現在進不來」的商業分析。</p>
      </a>
    </div>
  </section>

  <section>
    <h2>地圖服務評估的重點</h2>
    <div class="deadends" style="border-color:var(--accent);background:var(--surface);">
      <h3 style="color:var(--accent)">12 步裡只有 2 步真的碰到 Google</h3>
      <ul>
        <li><b>9 步</b><span>訂閱、圖片、文案、語音、送審、審核、認領、上架——ResoMap 自己的商業流程，換地圖服務動不到。</span></li>
        <li><b>2 步</b><span>搜尋店家、帶出店名地址——真正依賴 Google 地點搜尋的就這兩步。</span></li>
        <li><b>1 步</b><span>建立景點／商家——目前完全不存在，換 OSM 後必須補上。</span></li>
      </ul>
      <p style="margin:16px 0 0;font-size:14.5px;line-height:1.75;color:var(--ink-mid)">
        而目前把「找到地點」外包給 Google 的代價是：<b style="color:var(--ink)">Google 沒收錄的店，ResoMap 就收不了錢</b>——
        新開幕的餐廳、夜市攤位、地方景點，全部卡在第 2 步。
      </p>
    </div>
  </section>

  <section>
    <h2>三處死路</h2>
    <div class="deadends">
      <h3>使用者在這些地方無法靠產品本身的引導前進</h3>
      <ul>
        <li><b>08</b><span>回到首頁地圖，找不到自己的店——付費前後的地圖一模一樣。</span></li>
        <li><b>16</b><span>上傳成功後回到景點頁顯示「尚無語音導覽」，剛上傳的東西在自己畫面上消失。</span></li>
        <li><b>18</b><span>畫面顯示「目前未被認領」＋可點的「我要認領」，按下去卻說「該景點目前不可被認領」。</span></li>
        <li><b>20b</b><span>C 端連坐：遊客看到有語音，按播放卻被拒絕——「此景點未被管理，無法播放錄音」。</span></li>
      </ul>
    </div>
  </section>

  <section>
    <h2>下載與原始檔</h2>
    <div class="files">
      <a class="file" href="${REPO}/raw/main/deck/ResoMap-flow-audit.pptx">
        <b>簡報（33 頁）</b><span>圖文對照，含地圖服務評估附錄</span><span class="tag">PPTX</span>
      </a>
      <a class="file" href="${REPO}/tree/main/evidence">
        <b>原始實測截圖</b><span>21 張，含後台 2 張</span><span class="tag">EVIDENCE</span>
      </a>
      <a class="file" href="${REPO}">
        <b>GitHub Repo</b><span>報告原始碼與簡報產生器</span><span class="tag">SOURCE</span>
      </a>
    </div>
  </section>

  <footer>
    稽核方法：以真實商家帳號完整走完訂閱至上線流程，逐步截圖記錄，共 21 個步驟。<br>
    本文只陳述觀察到的流程問題與責任歸屬，不含修復方案。<br>
    實測日期 2026/08/26–08/27 ・ 測試景點「香記烤鴨」 ・ <a href="${REPO}">原始碼</a>
  </footer>

</div>
</body>
</html>
`;

fs.writeFileSync(path.join(OUT, 'index.html'), index, 'utf8');
fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');
console.log('wrote docs/index.html');
console.log('wrote docs/.nojekyll');
