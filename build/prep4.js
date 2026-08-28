const sharp=require('sharp');const path=require('path');
const SRC='C:/Users/D1081493/Desktop/商家訂閱流程2';const OUT=path.join(__dirname,'img');
(async()=>{
  // step 10 header: name + Google formatted address
  await sharp(path.join(SRC,'第十步  我要自己錄音上傳景點.png'))
    .extract({left:40,top:390,width:1100,height:200}).resize({width:1100}).png()
    .toFile(path.join(OUT,'c10_addr.png'));
  // step 9 search bar with store name
  await sharp(path.join(SRC,'第九步 我要透過上面打字搜尋到我的店.png'))
    .extract({left:35,top:370,width:1110,height:200}).resize({width:1110}).png()
    .toFile(path.join(OUT,'c09_search.png'));
  // step 8 map showing Google's own POI + watermark region
  await sharp(path.join(SRC,'第八步  返回首頁地圖上我找不到我的店在哪.png'))
    .extract({left:0,top:600,width:1179,height:900}).resize({width:1000}).png()
    .toFile(path.join(OUT,'c08_poi.png'));
  console.log('ok');
})();
