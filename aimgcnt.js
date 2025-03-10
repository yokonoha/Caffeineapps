////////////////////////////////////
//      Account Image Control     //
//          save & load           //
////////////////////////////////////

const importfile=document.getElementById("import");
const canvas=document.getElementById("kagemusya");
const benrikit=canvas.getContext("2d");
const hyoujimado=document.getElementById("acimg");
const hyoujimado2=document.getElementById("acimg2");
const hyoujimado3=document.getElementById("acimg3");

let imgaspect=0;
importfile.addEventListener("change",(e)=>
    {
        const importedfile=e.target.files[0];
        if (importedfile)
        {
            const loader=new FileReader();
            
            //処理を先に記載。
            loader.onload=(e)=>
            {
                const usersamanoimg=new Image();
                usersamanoimg.src=e.target.result;
                usersamanoimg.onload=()=>
                    {
                        imgaspect=usersamanoimg.width/usersamanoimg.height;
                        canvassize=400;
                        let drawW,drawH,offsetX,offsetY;
                        if(imgaspect>1)
                        {
                            drawW=canvassize*imgaspect;
                            drawH=canvassize;
                            offsetX=(canvassize-drawW)/2;
                            offsetY=0;
                        }
                        else
                        {
                            drawW=canvassize;
                            drawH=canvassize/imgaspect;
                            offsetX=0;
                            offsetY=(canvassize-drawH)/2;
                        }
                        benrikit.clearRect(0,0,canvas.width,canvas.height);
                        benrikit.drawImage(usersamanoimg,offsetX,offsetY,drawW,drawH);

                        const resizedres=canvas.toDataURL("image/png");
                        localStorage.setItem("userimage",resizedres);
                        alert("Setting Image Task is done./画像の設定が完了しました。");
                        hanei();
                    };
                
            };
            //前述処理へ
            loader.readAsDataURL(importedfile)
        }
    });


    function hanei()
    {
        const getimg=localStorage.getItem("userimage");
        if(getimg)
        {
hyoujimado.src=getimg;
hyoujimado2.src=getimg;
hyoujimado3.src=geimg;
        }
    }
    const geimg=localStorage.getItem("userimage");
    if(geimg)
    {
hyoujimado.src=geimg;
hyoujimado2.src=geimg;
hyoujimado3.src=geimg;
console.log("[aimgcnt Report] initimg")
    }