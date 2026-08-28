const sharp=require('sharp');const path=require('path');
const SRC='C:/Users/D1081493/Desktop/商家訂閱流程2';const OUT=path.join(__dirname,'img');
const f20b='第二十步驟後台權限全部通過不認領的話語音無法播放 .png';
(async()=>{
  await sharp(path.join(SRC,f20b)).extract({left:20,top:2150,width:1140,height:400}).resize({width:1100}).png().toFile(path.join(OUT,'c20b_play.png'));
  await sharp(path.join(SRC,f20b)).extract({left:40,top:880,width:1100,height:220}).resize({width:1100}).png().toFile(path.join(OUT,'c20b_list.png'));
  console.log('ok');
})();
