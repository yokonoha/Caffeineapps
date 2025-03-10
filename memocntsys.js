/////////////////////////////////////
////      memocntsys.js          ////
////     MemoPad Controler       ////
////     Auto Save & Load        ////
////    ©2025 Y.Yokoha           ////
/////////////////////////////////////
const textlen1=document.getElementById("t1mj");//str [0/20000文字]
const textlen2=document.getElementById("t12mj");
const textlen3=document.getElementById("t13mj");
const textlen4=document.getElementById("t14mj");
const textremain1=document.getElementById("t1remain");//str [あと20000文字記録できます。]
const textremain2=document.getElementById("t12remain");
const textremain3=document.getElementById("t13remain");
const textremain4=document.getElementById("t14remain");
const textbox1=document.getElementById("textbox1");
const textbox2=document.getElementById("textbox2");
const textbox3=document.getElementById("textbox3");
const textbox4=document.getElementById("textbox4");
/*const copy1=document.getElementById("t01");
const copy2=document.getElementById("t201");
const copy3=document.getElementById("t301");
const copy4=document.getElementById("t401");
const paste1=document.getElementById("t02");
const paste2=document.getElementById("t202");
const paste3=document.getElementById("t302");
const paste4=document.getElementById("t402");
const replace1=document.getElementById("t03");
const replace2=document.getElementById("t203");
const replace3=document.getElementById("t303");
const replace4=document.getElementById("t403");
const repdiv1=document.getElementById("repdiv");
const repdiv2=document.getElementById("repdiv2");
const repdiv3=document.getElementById("repdiv3");
const repdiv4=document.getElementById("repdiv4");
const before1*/
textbox1.value=localStorage.getItem("tbox1");
textbox2.value=localStorage.getItem("tbox2");
textbox3.value=localStorage.getItem("tbox3");
textbox4.value=localStorage.getItem("tbox4");


setInterval(() => {
    localStorage.setItem("tbox1",textbox1.value);
    localStorage.setItem("tbox2",textbox2.value);
    localStorage.setItem("tbox3",textbox3.value);
    localStorage.setItem("tbox4",textbox4.value);
    let l1= textbox1.value.length;textlen1.innerText=l1+"/20000文字";let hikazan1=20000-l1;textremain1.innerText="あと"+hikazan1+"文字入力できます。";
let l2= textbox2.value.length;textlen2.innerText=l2+"/20000文字";let hikazan2=20000-l2;textremain2.innerText="あと"+hikazan2+"文字入力できます。";
let l3= textbox3.value.length;textlen3.innerText=l3+"/20000文字";let hikazan3=20000-l3;textremain3.innerText="あと"+hikazan3+"文字入力できます。";
let l4= textbox4.value.length;textlen4.innerText=l4+"/20000文字";let hikazan4=20000-l4;textremain4.innerText="あと"+hikazan4+"文字入力できます。";

}, 100);