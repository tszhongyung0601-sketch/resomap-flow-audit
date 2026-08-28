const sharp=require('sharp');const path=require('path');
const SRC='C:/Users/D1081493/Desktop/商家訂閱流程2';const OUT=path.join(__dirname,'img');
const f21='第二十一步驟 商家終於能認領 但沒有收到任何通知 只能憑感覺 靠運氣.png';
(async()=>{
  await sharp(path.join(SRC,f21)).extract({left:30,top:185,width:1120,height:960}).resize({width:900}).png().toFile(path.join(OUT,'c21_claim.png'));
  console.log('ok');
})();
