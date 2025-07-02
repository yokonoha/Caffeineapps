///////////////////////////////////
////English Random Flash Script////
////    Rev.1.0   Y.Yokoha     ////
///////////////////////////////////

//自力で頭からひねり出した単語リスト(確認はしましたが、もしかしたらもしかすると間違いあるかも...)
//20250315 161words
const worddata="trap,oxygen,resurrection,remix,ambassador,authentication,ambient,administrator,agile,brick,bragging,breath,boast,core,crash,crush,constant,constraint,constellation,concatenate,cue,destination,delicate,dedicate,devote,duplicate,deprecate,distortion,enrollment,empower,epilogue,elastic,exile,exploit,flexible,function,flush,federal,fiber,folks,fork,fragment,fraction,fragile,fatal,gross,goat,guest,graphical,gist,hence,hash,harass,hammerhead,invert,impose,invaluable,illusion,immutable,immune,joint,justify,junk,justice,kitten,knit,knowledgeable,knot,lap,leap,loan,log,lightning,localization,mortgage,ministry,manner,manners,mutable,malicious,medium,meditation,nap,nasty,naughty,nest,normalization,orphan,operation,optional,ordinal,overture,observe,obey,obesity,pessimistic,placeholder,postpone,parse,porting,proportional,popped-up,questionnaire,quote,query,queue,restore,resurrection,remix,rectangle,rectify,reorganization,raw,redo,surrender,suspicious,split,specification,segment,silence,shallow,torrent,toast,texture,tendency,tremendously,thin,undo,unique,ugly,update,unable,unintended,voltage,void,vinegar,variable,valuable,wrap,wealth,weakness,wolves,wardrobe,warden,xylophone,x-ray,yield,yaw,yup,yogurt,zip,zine,zap,zucchini,zebra,zeal,Difficult expressions,milky way,vice versa,wage hike,zip code";
const list=worddata.split(",");
const withans="trap（罠）, oxygen（酸素）, resurrection（復活）, remix（リミックス）, ambassador（大使）, authentication（認証）, ambient（周囲の）, administrator（管理者）, agile（機敏な）, brick（レンガ）, bragging（自慢）, breath（息）, boast（誇る）, core（核心）, crash（クラッシュ）, crush（押しつぶす）, constant（一定の）, constraint（制約）, constellation（星座）, concatenate（連結する）, cue（合図）, destination（目的地）, delicate（繊細な）, dedicate（捧げる）, devote（ささげる）, duplicate（複製する）, deprecate（非推奨にする）, distortion（歪み）, enrollment（登録）, empower（力を与える）, epilogue（エピローグ）, elastic（弾力のある）, exile（追放）, exploit（搾取する/活用する）, flexible（柔軟な）, function（機能）, flush（流す）, federal（連邦の）, fiber（繊維）, folks（人々）, fork（フォーク/分岐）, fragment（断片）, fraction（分数/部分）, fragile（壊れやすい）, fatal（致命的な）, gross（総計の）, goat（ヤギ）, guest（客）, graphical（図的な）, gist（要点）, hence（それゆえに）, hash（ハッシュ/刻む）, harass（嫌がらせをする）, hammerhead（ハンマーヘッド）, invert（反転する）, impose（課す）, invaluable（非常に貴重な）, illusion（幻想）, immutable（不変の）, immune（免疫のある）, joint（関節/共同の）, justify（正当化する）, junk（ガラクタ）, justice（正義）, kitten（子猫）, knit（編む）, knowledgeable（知識が豊富な）, knot（結び目）, lap（膝/一周）, leap（跳ぶ）, loan（融資/貸付）, log（丸太/記録）, lightning（稲妻）, localization（ローカライズ/地域化）, mortgage（住宅ローン）, ministry（省/聖職）, manner（方法）, manners（礼儀作法）, mutable（変わりやすい）, malicious（悪意のある）, medium（媒体/中間の）, meditation（瞑想）, nap（昼寝）, nasty（不快な）, naughty（いたずらな）, nest（巣）, normalization（正規化）, orphan（孤児）, operation（操作/手術）, optional（任意の）, ordinal（序数の）, overture（序曲）, observe（観察する）, obey（従う）, obesity（肥満）, pessimistic（悲観的な）, placeholder（仮のもの）, postpone（延期する）, parse（構文解析する）, porting（移植）, proportional（比例した）, popped-up（ポップアップした）, questionnaire（アンケート）, quote（引用する）, query（問い合わせ/クエリ）, queue（列）, restore（復元する）, resurrection（復活）, remix（リミックス）, rectangle（長方形）, rectify（修正する）, reorganization（再編成）, raw（生の）, redo（やり直す）, surrender（降伏する）, suspicious（疑わしい）, split（分割する）, specification（仕様）, segment（部分）, silence（沈黙）, shallow（浅い）, torrent（急流/トレント）, toast（トースト/乾杯）, texture（質感）, tendency（傾向）, tremendously（ものすごく）, thin（薄い/細い）, undo（元に戻す）, unique（ユニークな）, ugly（醜い）, update（更新する）, unable（できない）, unintended（意図しない）, voltage（電圧）, void（無効の/空の）, vinegar（酢）, variable（変数/変わりやすい）, valuable（価値のある）, wrap（包む）, wealth（富）, weakness（弱点）, wolves（オオカミたち）, wardrobe（衣装ダンス）, warden（監視人）, xylophone（木琴）, x-ray（X線）, yield（産出する/屈する）, yaw（偏揺れ）, yup（うん）, yogurt（ヨーグルト）, zip（ジップ/圧縮する）, zine（同人誌）, zap（素早く攻撃する）, zucchini（ズッキーニ）, zebra（シマウマ）, zeal（熱意）, Difficult expressions（難しい表現）, milky way（天の川）, vice versa（逆もまた然り）, wage hike（賃上げ）, zip code（郵便番号）";
const list2=withans.split(",");

document.getElementById("draweng").addEventListener("click",()=>{
let randint=Math.floor(Math.random()*list.length);
document.getElementById("reseng").innerHTML=list[randint];
let a= list2[randint];
let comp=document.getElementById("unknownwords");
let title=document.createElement("h3");
title.innerHTML=a;
comp.appendChild(title);
});

function savewords() {
    if(document.getElementById("reseng").innerHTML)
    {
   let a= document.getElementById("reseng").innerHTML;
   let comp=document.getElementById("unknownwords");
   let title=document.createElement("h3");
   title.innerHTML=a;
   comp.appendChild(title);

}
}