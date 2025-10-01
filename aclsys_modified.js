////////////////////////////////////////
////  Analog Clock System Script    ////
////            Rev.1.2             ////
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

const nagaihari = document.querySelector(".nagaihari");
const mijikaihari = document.querySelector(".mijikaihari");
const byoushin = document.querySelector(".byoushin");
const mojiban = document.querySelector(".mojiban");

// 回転速度（度/秒）
const speedHour = 180;    // 時針
const speedMinute = 560;  // 分針
const speedSecond = 1200;  // 秒針

let startTime = Date.now();

function spinClock() {
    let elapsed = (Date.now() - startTime) / 1000; // 経過秒

    let hourDeg = (elapsed * speedHour) % 360;
    let minuteDeg = (elapsed * speedMinute) % 360;
    let secondDeg = (elapsed * speedSecond) % 360;

    mijikaihari.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
    nagaihari.style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
    byoushin.style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
}

function mojibanchanger() {
    mojiban.style.borderStyle = "solid";
    mojiban.style.filter = "brightness(100%)";
    mojiban.style.backgroundImage = `none`;
    document.getElementById("nodeco").style.display = "none";
}

setInterval(spinClock, 16); // 約60fps
spinClock();
mojibanchanger();
