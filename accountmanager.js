////////////////////////////////////////////
////        Account Manager Script      ////
////    Change Username & Erase Data    ////
////            Export & Import         ////
////////////////////////////////////////////

function decidename()
{
    let desiredname=document.getElementById("usernametextbox").value;
    console.log("[accountmanager] Name fetched"+desiredname);
    localStorage.setItem("username",desiredname);
    
    document.getElementById("currentname").innerText=localStorage.getItem("username");
    document.getElementById("currentname2").innerText=localStorage.getItem("username");
    document.getElementById("currentname3").innerText=localStorage.getItem("username");
    const detectlang=navigator.language||navigator.languages[0];
    if (detectlang.includes("ja"))
        {
    alert("設定が完了しました。システム全体への反映には数秒間がかかる場合があります。")
        }
        else
        {
            alert("Configuration is complete. It may take a few seconds for the entire system to reflect the changes.");
        }
}
//Init
if (localStorage.getItem("username")!="")
{
document.getElementById("currentname").innerText=localStorage.getItem("username");
document.getElementById("currentname2").innerText=localStorage.getItem("username");
document.getElementById("currentname3").innerText=localStorage.getItem("username");
}


