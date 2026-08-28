const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/D1081493/Desktop/商家訂閱流程2';
const OUT = path.join(__dirname, 'img');
fs.mkdirSync(OUT, { recursive: true });

const F = {
  s01: '第一步打開app.png',
  s02: '第二步前往我的頁面.png',
  s03: '第三步選擇我的訂閱.png',
  s04: '第四步選擇訂閱方案.png',
  s05: '第五步選擇購買方案.png',
  s06: '第六步查看我的點數.png',
  s08: '第八步  返回首頁地圖上我找不到我的店在哪.png',
  s09: '第九步 我要透過上面打字搜尋到我的店.png',
  s10: '第十步  我要自己錄音上傳景點.png',
  s11: '第十一步我錄音好了上傳.png',
  s12: '第十二步我選擇商家景點.jpg',
  s13: '第十三步 我要自己打文案介紹 拍照片.png',
  s14: '第十四步輸入文案輸入我景點介紹名稱.png',
  s15: '第十五步驟 我錄音上傳成功 等待後台審核不知道什麼時候審核完成.jpg',
  s16: '第十六步驟 原來 商家要點右上角.jpg',
  s17: '第十七步 等待審核期間點了三顆點我要自己去管理景點.png',
  s18: '第十八步 商家不知道何時才能認領景點.png',
  s19: '第十九步驟 後台開放語音管理權限通過.jpg',
  s20: '第二十驟 後台開放景點認領.jpg',
  s20b:'第二十步驟後台權限全部通過不認領的話語音無法播放 .png',
  s21: '第二十一步驟 商家終於能認領 但沒有收到任何通知 只能憑感覺 靠運氣.png',
};

(async () => {
  // full-size resizes
  for (const [k, f] of Object.entries(F)) {
    const p = path.join(SRC, f);
    const meta = await sharp(p).metadata();
    const wide = meta.width > meta.height;
    await sharp(p)
      .resize({ width: wide ? 1500 : 560 })
      .png({ quality: 92 })
      .toFile(path.join(OUT, k + '.png'));
    console.log(k, meta.width + 'x' + meta.height, '->', f);
  }

  const crop = async (key, src, region, w) => {
    await sharp(path.join(SRC, F[src]))
      .extract(region)
      .resize({ width: w })
      .png()
      .toFile(path.join(OUT, key + '.png'));
    console.log('crop', key, JSON.stringify(region));
  };

  // 1. terms line cut off (step 4)
  await crop('c04_terms', 's04', { left: 55, top: 1765, width: 1070, height: 95 }, 1200);
  // 2. markdown not rendered (step 15)
  await crop('c15_md', 's15', { left: 12, top: 88, width: 420, height: 135 }, 1200);
  // 3. contradiction banner + claim row (step 18)
  await crop('c18_err', 's18', { left: 30, top: 185, width: 1120, height: 960 }, 900);
  // 4. admin voice mgmt row (step 19)
  await crop('c19_row', 's19', { left: 330, top: 640, width: 1500, height: 240 }, 1400);
  // 5. admin spot mgmt: voice count 0
  await crop('c20_zero', 's20', { left: 380, top: 565, width: 560, height: 235 }, 900);
  // 6. admin spot mgmt: manual claim toggle
  await crop('c20_toggle', 's20', { left: 1640, top: 565, width: 470, height: 235 }, 900);
  // 7. three dots circled (step 16)
  await crop('c16_dots', 's16', { left: 0, top: 0, width: 458, height: 430 }, 900);
  // 8. cannot play (step 20b)
  await crop('c20b_play', 's20b', { left: 30, top: 1560, width: 1120, height: 480 }, 1000);
  console.log('done');
})();
