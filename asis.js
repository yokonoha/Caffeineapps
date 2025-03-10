////////////////////////////////////////
/// Account System Integration Script //
///         by Y.Yokoha               //
//       Display User images          //
////////////////////////////////////////

//HTML Implementation Example:
/*   <div class="G" style="position: absolute; top: 15vh; right: 5px;" id="accountdetails">
        <p id="closeaccount">close</p>
        <a href="#accountsettingsPageURL"><img src="./ic.png" style="height: 50px; border-radius: 500px;" id="accountview"></a>
        <div class="I" id="dropdownarea">
        <p><span id="username">User</span></p>
        <p><small>Account<br>(local)</small></p>
        
        </div>
    </div> */

//JP
/*    <div class="G" style="position: absolute; top: 15vh; right: 5px;" id="accountdetails">
        <p onclick="closeaccountdiv()" id="asis1">閉じる</p>
        <a href="https://caffeineapps.pages.dev/account" target="_blank"><img src="./ic.png" style="height: 50px; border-radius: 500px;" id="accountview"></a>
        <div class="I" id="dropdownarea">
        <p><span id="username" id="asis2">User</span></p>
        <p><small id="asis3">Caffeineアカウント<br>(ローカル)</small></p>
        
        </div>
    </div> */

const imgholder=document.getElementById("accountview");
const username=document.getElementById("username");
const dda=document.getElementById("dropdownarea");
const accountdiv=document.getElementById("accountdetails");
const closebtn=document.getElementById("asis1");

let usrname=localStorage.getItem("username");
let usrimg=localStorage.getItem("userimage");
//Show user name
if (usrname=="")
{
    username.innerText="User"; 
}
else
{
 username.innerText=usrname;   
}
closebtn.addEventListener("click",()=>{accountdiv.style.display="none";});
if(usrimg)
{
    imgholder.src=usrimg;
}


