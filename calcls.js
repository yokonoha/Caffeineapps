////////////////////////////////
//          calcls.js         //
//        LocalStorage        //
//         Data Usage         //
////////////////////////////////


const strhyouji=document.getElementById("datausage");
const progressbar=document.getElementById("datausagebar");
const container=document.getElementById("datausagecontainer");
let usingmb=0;
function calcls()
{
   
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i); // インデックスからキーを取得
        let value = localStorage.getItem(key); // キーを使って値を取得

        if (value) {
            let temp=usingmb;
            usingmb =temp+ key.length + value.length; // キーと値の長さを合計
        }
    }
}
calcls();
let mbkanzan=usingmb/(1024*1024);
let maximummb=5;
//Debug----
//mbkanzan=4;
//---------
let rate=(mbkanzan/maximummb)*100;
let rate2=rate.toFixed(2);//四捨五入

console.log("[Calcls Report] Data Usage:"+mbkanzan.toFixed(2)+"MB/"+maximummb+"MB("+rate2+"%) rawvalue:"+usingmb);
strhyouji.innerHTML=mbkanzan.toFixed(2)+"MB/"+maximummb+"MB("+rate2+"%)";
progressbar.value=rate2;
if (mbkanzan>4)
{
    container.style.backgroundColor="yellow";
    if (mbkanzan>=4.9)
    {
        container.style.backgroundColor="red";
    }
}

