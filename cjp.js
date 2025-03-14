/////////////////////////////////
///  Calc Actual JPY Payment  ///
///     Rev.1   Y.Yokoha      ///
/////////////////////////////////


const komi=document.getElementById("zeikomi");
const sagaku=document.getElementById("zeigaku");
setInterval(() => {
  let jpy=document.getElementById("suji").value;
let trate=document.querySelector('input[name="zeiritsu"]:checked').value;
if(jpy)
{
    let tmp=jpy*trate
    console.log(tmp);
komi.innerHTML=tmp;
sagaku.innerHTML=komi.innerHTML-jpy;
}
else
{
    komi.innerHTML="0";
sagaku.innerHTML="0";
}

}, 100);

function del(){
    document.getElementById("suji").value="";
}

