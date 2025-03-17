document.addEventListener("DOMContentLoaded", () => {
    let forceo=localStorage.getItem("forcetheme");
if (forceo=="1")
{
document.getElementById("themeacccss").checked="true";
}
else if(forceo=="2")
{
document.getElementById("themeacfsl").checked="true";
}
else
{
document.getElementById("themeacauto").checked="true";
}
setInterval(() => {
let a= document.querySelector(`input[name="tm"]:checked`).value;
if(a=="ccss")
{
    localStorage.setItem("forcetheme","1");
} 
else if (a=="fsl")     
{
    localStorage.setItem("forcetheme","2");
}
else
{
    localStorage.setItem("forcetheme","0")
}
let forceon=localStorage.getItem("forcetheme");
if (forceon=="1")
{
    linkcss.setAttribute("href","caffeine.css");
    footertext.setAttribute("href","https://github.com/yokonoha/Caffeine_CSS");
footertext.innerText="CaffeineCSS";
    console.log(`[ThemeACset] The Light Theme is now selected. (By user selection)`);
}
else if(forceon=="2")
{
    linkcss.setAttribute("href","fslinear.css");
    footertext.setAttribute("href","https://github.com/yokonoha/FSLinear");
    footertext.innerText="FSLinear";
    console.log(`[ThemeACset] The Dark Theme is now selected. (By user select)`); 
}

}, 200);

});