//////////////////////////////////////
////     Prevent displaying       ////
////           Beta!              ////
//////////////////////////////////////

//  <script src="./das.js"></script>

//Variable
let protectionlevel=2;//Default value is 1 Range 1~2 (2 is the highest.)
console.log("[das] das service is now activated. Trying to protect your important site.");
if (protectionlevel=1)
{
if (navigator.userAgent.includes("ia_archiver"))
{
    console.log("[das] Suspicious UA detected. Trying to protect content by hiding...");
    document.body.style.display="none";
}

}
else
{
    if (navigator.userAgent.includes("archive"))
        {
            console.log("[das] Suspicious UA detected. Trying to protect content by hiding...");
            document.body.style.display="none";
            
        }
        else if(navigator.userAgent.includes("ia_"))
        {
            console.log("[das lev2] Suspicious UA detected. Trying to protect content by hiding...");
            document.body.style.display="none";
        }
    else if(navigator.userAgent.includes("crawl"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("20100101"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("IAHarvester"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("org_bot"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("wpull"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("Archive"))
    {
        hidecontents();
    }
        else if(navigator.userAgent.includes("/faq/"))
    {
        hidecontents();
    }
    else if(navigator.userAgent.includes("/115.0.0.0"))
    {
        hidecontents();
    }    
}


function hidecontents()
{
                console.log("[das lev2] Suspicious UA detected. Trying to protect content by hiding...");
            document.body.style.display="none";
            alert("コンテンツ保護機能が作動しました。誤作動である場合はブラウザーを更新するか、ブラウザーを変更してください。");
}
