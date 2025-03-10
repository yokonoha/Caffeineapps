///////////////////////////////////////////////
//          Player Assisist Script           //
//               by Y.Yokoha                 //
//An Essential handler for Caffeine MovieUI  //
///////////////////////////////////////////////
const vdiv=document.getElementById("playdiv");
const ctl=document.getElementById("cntl");
const ctl2=document.getElementById("cntl2");
let usuku;
let hide;

function mieruyo()
{
    showmouse();
    ctl.style.opacity="1";
    ctl.style.display="block";
    ctl2.style.opacity="0.8";
    ctl2.style.display="block";


clearTimeout(usuku);
clearTimeout(hide);

//5s=>0.4
usuku=setTimeout(()=>{ctl.style.opacity="0.4";ctl2.style.opacity="0.4";},5000);
//10s=> invisible
hide=setTimeout(() => {ctl.style.display="none"; ctl.style.opacity="1";ctl2.style.display="none"; ctl2.style.opacity="1"; mousehide();}, 10000);
}

function sugukesuyo()
{
    console.log("[assistsc] Mouse clicked /Changing controlers' visibilities....")
    clearTimeout(usuku);
    clearTimeout(hide);
    if(ctl.style.display=="none")
    {
        ctl.style.opacity="1";
        ctl.style.display="block";
        ctl2.style.opacity="0.8";
        ctl2.style.display="block";
        showmouse();
    }
    else
    {
    ctl.style.display="none"; ctl.style.opacity="1";ctl2.style.display="none"; ctl2.style.opacity="1";
    mousehide();
    }
}

function mousehide()
{
    vdiv.style.cursor="none";
}
function showmouse()
{
vdiv.style.cursor="default";
}

//マウス動作チェック
function movechecker()
{
vdiv.addEventListener("mousemove",mieruyo);
vdiv.addEventListener("click",sugukesuyo);
vdiv.addEventListener("touchstart",sugukesuyo);
}

movechecker();


    
