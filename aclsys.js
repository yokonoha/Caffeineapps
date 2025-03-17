////////////////////////////////////////
////  Analog Clock System Script    ////
//// Rev.1.0+Optimized for Caffeine ////
////           Y.Yokoha             ////
////////////////////////////////////////

/*
実装(HTML[Pre-styled])

    <div class="mojiban" style="display: flex; justify-content: center; align-items: center; width: 60vw; height: 60vw; max-width: 900px; border-radius: 50%; border-style: dotted; border-width: 5px; background-color: #111; border-color: #fff; ">
        <div class="hosei" style="width: 100%; height: 100%; position: relative;">
            <div class="mijikaihari" style="position: absolute; left: 50%; bottom: 50%; transform-origin: bottom; transform: translateX(-50%); transition-timing-function: steps(1); width: 3%; height: 25%; background-color: #12f32a; border-radius: 8vw;"></div>
            <div class="nagaihari" style="position: absolute; left: 50%; bottom: 50%; transform-origin: bottom; transform: translateX(-50%); transition-timing-function: steps(1); width: 4%; height: 45%; background-color: aquamarine; border-radius: 6vw;"></div>
            <div class="byoushin" style="position: absolute; left: 50%; bottom: 50%; transform-origin: bottom; transform: translateX(-50%); transition-timing-function: steps(1); width: 1%; height: 50%; background-color: coral; border-radius: 3vw;"></div>
        </div>

<script src="./aclsys.js"></script>
*/


const nagaihari=document.querySelector(".nagaihari");
const mijikaihari=document.querySelector(".mijikaihari");
const byoushin=document.querySelector(".byoushin");
const mojiban=document.querySelector(".mojiban");
function time2analog()
{

let timemgr=new Date;
let hour=timemgr.getHours();
let min=timemgr.getMinutes();
let sec=timemgr.getSeconds();

let calc_mijikaihari_no_ichi=(hour%12+min/60)*30;
//1h=>30deg 1.5h=>45deg (1/60=>59/60[60/60是1h])
let calc_nagaihari_no_ichi=(min+sec/60)*6;
//*6=>360deg/60min
let calc_byoushin_no_ichi=sec*6;
nagaihari.style.transform=`translateX(-50%) rotate(${calc_nagaihari_no_ichi}deg)`;
mijikaihari.style.transform=`translateX(-50%) rotate(${calc_mijikaihari_no_ichi}deg)`;
byoushin.style.transform=`translateX(-50%) rotate(${calc_byoushin_no_ichi}deg)`;

}

//Caffeine Original function
function mojibanchanger()
{
    if(localStorage.getItem("userimage")!==null&&localStorage.getItem("userimage")!=="")
    {
        console.log("[aclsys] Detect User Img Setting...");
    let accountimg=localStorage.getItem("userimage");
    mojiban.style.backgroundImage=`url(`+accountimg+`)`;
    mojiban.style.backgroundSize="cover";
    mojiban.style.borderStyle="none";
    mojiban.style.filter="brightness(90%)";
    }
    else
    {
        mojiban.style.borderStyle="dotted";
        mojiban.style.filter="brightness(100%)";
        mojiban.style.backgroundImage=`none`;
        document.getElementById("nodeco").style.display="none";
    }
}
setInterval(time2analog,100);
time2analog();
mojibanchanger();