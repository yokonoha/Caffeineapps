///////////////////////////////////
///    Warikan Advice Script    ///
///       Rev.1.0 Y.Yokoha　    ///
///////////////////////////////////
//ワリカンスクリプト
const lubi=document.getElementById("suji");
const ren=document.getElementById("suji2");
const pp=document.getElementById("perperson");
const adv=document.getElementById("adv");

setInterval(() => {
    if(lubi.value!=""&&ren.value!="")
    {
           let perp= lubi.value/ren.value;
           
    pp.innerHTML=perp.toLocaleString();
    console.log(typeof(perp));
    if(perp.toString().includes("."))
    {
        let amari=lubi.value%ren.value.toLocaleString();
        let hokanohito=Math.floor(perp).toLocaleString();
        
adv.innerHTML=`<br><br>どなたかが<h2>${amari}円</h2>多く支払い、他の方は<h2>${hokanohito}円</h2>支払うことで割り勘にできます。`;
    }
    else
    {
adv.innerHTML="<br><br>この金額であれば<h2>全員で同額支払うことができます。</h2>";
    } 
    }
    else{
        pp.innerHTML="0";
        adv.innerHTML="<br><br> 金額と人数に応じてアドバイスします。";
    }

}, 100);


function del()
{
    lubi.value="";
    ren.value="";
}