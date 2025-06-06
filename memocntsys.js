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
const copy1=document.getElementById("t01");
const copy2=document.getElementById("t201");
const copy3=document.getElementById("t301");
const copy4=document.getElementById("t401");
const paste1=document.getElementById("t02");
const paste2=document.getElementById("t202");
const paste3=document.getElementById("t302");
const paste4=document.getElementById("t402");
const replace1=document.getElementById("t04");
const replace2=document.getElementById("t204");
const replace3=document.getElementById("t304");
const replace4=document.getElementById("t404");
const del1=document.getElementById("t03");
const del2=document.getElementById("t203");
const del3=document.getElementById("t303");
const del4=document.getElementById("t403");
const repdiv1=document.getElementById("repdiv");
const repdiv2=document.getElementById("repdiv2");
const repdiv3=document.getElementById("repdiv3");
const repdiv4=document.getElementById("repdiv4");
const before1=document.getElementById("t06");
const before2=document.getElementById("t206");
const before3=document.getElementById("t306");
const before4=document.getElementById("t406");
const after1=document.getElementById("t07");
const after2=document.getElementById("t207");
const after3=document.getElementById("t307");
const after4=document.getElementById("t407");
textbox1.value=localStorage.getItem("tbox1");
textbox2.value=localStorage.getItem("tbox2");
textbox3.value=localStorage.getItem("tbox3");
textbox4.value=localStorage.getItem("tbox4");
const recovery=document.getElementById("recovery");
const timertexrea=document.getElementById("countdowntext");
const recoverypause=document.getElementById("recoverypause");
const exportbtn=document.getElementById("exportdata");
const exportbtn2=document.getElementById("exportdata2");
const exportbtn3=document.getElementById("exportdata3");
const exportbtn4=document.getElementById("exportdata4");
const exportallbtn=document.getElementById("exportall");
//リカバリー:localstorageに保存されないtextarea。 スペース1~4のテキストを30秒間隔で日付と時間の見出しを付けて追記する。全スペース共通。
let recoveryInterval=setInterval(() => {
    const now = new Date();
    const timestamp = now.toLocaleString();
    const recoveryText = `\n\n---\n${timestamp} 復元用履歴\nスペース1:\n${textbox1.value}\nスペース2:\n${textbox2.value}\nスペース3:\n${textbox3.value}\nスペース4:\n${textbox4.value}`;
    let currentRecovery = recovery.value;
    // 既存のリカバリーテキストがある場合は改行してから追加
    if (currentRecovery) {
        recovery.value = recoveryText+currentRecovery;
    } else {
        recovery.value = recoveryText;
    }
}, 15000);
//タイマー:リカバリーのテキストエリアの下に、リカバリーテキストが更新されるまでのタイマーを表示。0.5秒ごとに更新。
let countdown = 15;
let cd=setInterval(() => {
    countdown -= 0.5;
    if (countdown <= 0) {
        countdown = 15; // リセット
    }
    
    const seconds = Math.floor(countdown % 60);
    timertexrea.innerHTML = `あと${seconds}秒で復元用コピーが自動作成されます。`;
}, 500);

recoverypause.addEventListener("click", () => {
    if (recoverypause.innerText === "履歴記録を一時停止") {
        recoverypause.innerText = "履歴記録を再開";
        clearInterval(recoveryInterval);
clearInterval(cd);
        recoveryInterval = null;
        countdown = 15; // タイマーをリセット
        
        timertexrea.innerHTML = "履歴記録が一時停止中です。再開するにはボタンをクリックしてください。";
    } else {
        recoverypause.innerText = "履歴記録を一時停止";
        recoveryInterval = setInterval(() => {
            const now = new Date();
            const timestamp = now.toLocaleString();
            const recoveryText = `\n\n---\n${timestamp} 復元用履歴\nスペース1:\n${textbox1.value}\nスペース2:\n${textbox2.value}\nスペース3:\n${textbox3.value}\nスペース4:\n${textbox4.value}`;
            let currentRecovery = recovery.value;
            // 既存のリカバリーテキストがある場合は改行してから追加
            if (currentRecovery) {
                recovery.value = recoveryText+currentRecovery;
            } else {
                recovery.value = recoveryText;
            }
        }, 15000);
        cd=setInterval(() => {
            countdown -= 0.5;
            if (countdown <= 0) {
                countdown = 15; // リセット
            }
            
            const seconds = Math.floor(countdown % 60);
            timertexrea.innerHTML = `あと${seconds}秒で復元用コピーが自動作成されます。`;
        }, 500);
    }
});

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
copy1.addEventListener("click",()=>{
    navigator.clipboard.writeText(textbox1.value);
});
copy2.addEventListener("click",()=>{
    navigator.clipboard.writeText(textbox2.value);
});
copy3.addEventListener("click",()=>{
    navigator.clipboard.writeText(textbox3.value);
});
copy4.addEventListener("click",()=>{
    navigator.clipboard.writeText(textbox4.value);
});
paste1.addEventListener("click",async()=>{
    const text=await navigator.clipboard.readText();
    bk1=textbox1.value;
    textbox1.value=bk1+text;
});
paste2.addEventListener("click",async()=>{
    const text=await navigator.clipboard.readText();
    bk2=textbox2.value;
    textbox2.value=bk2+text;
});
paste3.addEventListener("click",async()=>{
    const text=await navigator.clipboard.readText();
    bk3=textbox3.value;
    textbox3.value=bk3+text;
});
paste4.addEventListener("click",async()=>{
    const text=await navigator.clipboard.readText();
    bk4=textbox4.value;
    textbox4.value=bk4+text;
});
del1.addEventListener("click",()=>{
    //削除確認ダイアログ
    if(confirm("このメモを削除しますか？")) {
        textbox1.value="";
        localStorage.setItem("tbox1","");
    }
});
del2.addEventListener("click",()=>{
    //削除確認ダイアログ
    if(confirm("このメモを削除しますか？")) {
        textbox2.value="";
        localStorage.setItem("tbox2","");
    }
});
del3.addEventListener("click",()=>{
    //削除確認ダイアログ
    if(confirm("このメモを削除しますか？")) {
        textbox3.value="";
        localStorage.setItem("tbox3","");
    }
});
del4.addEventListener("click",()=>{
    //削除確認ダイアログ
    if(confirm("このメモを削除しますか？")) {
        textbox4.value="";
        localStorage.setItem("tbox4","");
    }
});
replace1.addEventListener("click",()=>{
    repdiv1.style.display="block";
});
replace2.addEventListener("click",()=>{
    repdiv2.style.display="block";
});
replace3.addEventListener("click",()=>{
    repdiv3.style.display="block";
});
replace4.addEventListener("click",()=>{
    repdiv4.style.display="block";
});
function reptxt() {
    let before=before1.value;
    let after=after1.value;
    let text=textbox1.value;
    if(before==""||after=="") {
        alert("置換前と置換後の文字列を入力してください。");
        return;
    }
    textbox1.value=text.replaceAll(before,after);
    alert("置換が完了しました。");
    repdiv1.style.display="none";
}
function reptxt2() {
    let before=before2.value;
    let after=after2.value;
    let text=textbox2.value;
    if(before==""||after=="") {
        alert("置換前と置換後の文字列を入力してください。");
        return;
    }
    textbox2.value=text.replaceAll(before,after);
    alert("置換が完了しました。");
    repdiv2.style.display="none";
}
function reptxt3() {
    let before=before3.value;
    let after=after3.value;
    let text=textbox3.value;
    if(before==""||after=="") {
        alert("置換前と置換後の文字列を入力してください。");
        return;
    }
    textbox3.value=text.replaceAll(before,after);
    alert("置換が完了しました。");
    repdiv3.style.display="none";
}
function reptxt4() {
    let before=before4.value;
    let after=after4.value;
    let text=textbox4.value;
    if(before==""||after=="") {
        alert("置換前と置換後の文字列を入力してください。");
        return;
    }
    textbox4.value=text.replaceAll(before,after);
    alert("置換が完了しました。");
    repdiv4.style.display="none";
}

//txtエクスポート
exportbtn.addEventListener("click", () => {
    const blob = new Blob([textbox1.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo1.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
exportbtn2.addEventListener("click", () => {
    const blob = new Blob([textbox2.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo2.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
exportbtn3.addEventListener("click", () => {
    const blob = new Blob([textbox3.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo3.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
exportbtn4.addEventListener("click", () => {
    const blob = new Blob([textbox4.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'memo4.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});
exportallbtn.addEventListener("click", () => {
    const allText = `スペース1:\n${textbox1.value}\n\nスペース2:\n${textbox2.value}\n\nスペース3:\n${textbox3.value}\n\nスペース4:\n${textbox4.value}`;
    const blob = new Blob([allText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all_memos.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});