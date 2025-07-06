//////////////////////////////////////////////////////
//          Caffeine Movie by YokochaYokoha         //
//              System Script Rev.1.0               //
//          Works by Y.Yokoha Studio Project        //
//              🄫2024 YokochaYokoha                //
//         Licensed under Y.Yokoha B License       //
/////////////////////////////////////////////////////


const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const folderInput = document.getElementById('folder-input');
const readfile = document.getElementById('file-input');
const readfolder = document.getElementById('folder-input');
const audioPlayer = document.getElementById('video-player');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const speedControl = document.getElementById('speed-control');
const timeInfo = document.getElementById('time0');
const timetotal=document.getElementById("time1");
const titlePlaceholder = document.getElementById('title');
const artistPlaceholder = document.getElementById('artist');
const albumPlaceholder = document.getElementById('album');
const playlistDiv = document.getElementById('playlist');
const spdcon=document.getElementById("spd");
const previousButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const vcon = document.getElementById('volume-control');
let playlist = [];
let currentIndex = 0;
let isPlaying = false;

readfile.addEventListener("change",()=>mstore(readfile.files));
readfolder.addEventListener("change",()=>mstore(readfolder.files));

document.addEventListener("dragenter",()=>
{
    dropArea.classList.add("active");
}
);

document.addEventListener("dragleave",(event)=>
{
    if(event.relatedTarget===null||!dropArea.contains(event.relatedTarget))
    {
        dropArea.classList.remove("active");
    }
}
);

document.addEventListener("dragover",(event)=>
{
    event.preventDefault();
}
);


document.addEventListener("drop",(event)=>
{
    event.preventDefault();
    dropArea.classList.remove("active");
    const musicfiles=event.dataTransfer.items;
    processtask(musicfiles);
}
);

async function processtask(musicfiles)
{
    playlist=[];
    for(const items of musicfiles)
    {
        const entry=items.webkitGetAsEntry();
        if(entry)
        {
            if(entry.isFile)
            {
                const afiles=await new Promise((res)=>entry.file(res));
                if(afiles.type.startsWith("video/"))
                {
                    playlist.push(afiles);
                }
            }
            else if (entry.isDirectory)
            {
                await readDir(entry);
            }
        }
    }
    if(playlist.length>0)
    {
        currentIndex=0;
        updateplaylistDSP();
        loadAudio(playlist[currentIndex]);
    }
}


async function readDir(directoryEntry)
{
    const reader=directoryEntry.createReader();
    const foldercontents=await new Promise((resolve)=>reader.readEntries(resolve));
    for (const entry of foldercontents)
    {
        if(entry.isFile)
            {
                const afiles=await new Promise((res)=>entry.file(res));
                if(afiles.type.startsWith("video/"))
                {
                    playlist.push(afiles);
                }
            }
            else if (entry.isDirectory)
            {
                await readDir(entry);
            }
    }
}

function mstore(files)
{
    playlist = Array.from(files).filter(file => file.type.startsWith('video/'));
    if(playlist.length>0)
    {
        currentIndex=0;
        updateplaylistDSP();
        loadAudio(playlist[currentIndex]);
    }

}

function loadAudio(file)
{
    audioPlayer.src=URL.createObjectURL(file);
    audioPlayer.load();
    DSPmetadata(file);
    audioPlayer.play();
    isPlaying=true;
    playPauseButton.src="pause.png";
}

function DSPmetadata(file)
{
    titlePlaceholder.textContent = file.name;
}

function updateplaylistDSP() 
{
    playlistDiv.innerHTML = "";
    playlist.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'marks-r-o';
        item.innerHTML = `<img src="movie.png" alt="動画" style="width:20px;"><p><span>${file.name}</span></p>`;
        
        item.addEventListener('click', () => {
            currentIndex = index;
            loadAudio(file);
        });

        playlistDiv.appendChild(item);

    });
}

playPauseButton.addEventListener('click', () => 
    {
    if (audioPlayer.paused) {
        audioPlayer.play();
        isPlaying = true;
        playPauseButton.src = "pause.png";
    } else {
        audioPlayer.pause();
        isPlaying = false;
        playPauseButton.src = "play.png";
    }
});

seekBar.addEventListener("input",()=>
{
    audioPlayer.currentTime=seekBar.value;
}
);

audioPlayer.volume = vcon.value;
vcon.addEventListener('input', () => {
    audioPlayer.volume = vcon.value;

});

 audioPlayer.addEventListener('timeupdate', () => 
    {
 seekBar.max = audioPlayer.duration;
 seekBar.value = audioPlayer.currentTime;
 timeInfo.innerText = mktime(audioPlayer.currentTime) ;
 timetotal.innerText=mktime(audioPlayer.duration);
    });

    speedControl.addEventListener('input', () => {
        audioPlayer.playbackRate = speedControl.value;
        spdcon.innerText="Speed:"+speedControl.value+"x";
    });

function mktime(sec)
{
const min=Math.floor(sec/60);
const sc=Math.floor(sec%60);
return `${min}:${sc < 10 ? "0" : ""}${sc}`;
}

audioPlayer.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadAudio(playlist[currentIndex]);
});

function initsys()
{


    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: titlePlaceholder.textContent,
            artist: "Caffeine",
            album: "Movie",
            artwork: [
                { src: "./video.png", sizes: '96x96', type: 'image/png' },
                { src: "./video.png", sizes: '128x128', type: 'image/png' },
                { src: "./video.png", sizes: '192x192', type: 'image/png' },
                { src: "./video.png", sizes: '256x256', type: 'image/png' },
                { src: "./video.png", sizes: '384x384', type: 'image/png' },
                { src: "./video.png", sizes: '512x512', type: 'image/png' },
            ]
        });
    
        navigator.mediaSession.setActionHandler('play', () => {
            audioPlayer.play();
            playPauseButton.src = "pause.png";
        });
        navigator.mediaSession.setActionHandler('pause', () => {
            audioPlayer.pause();
            playPauseButton.src = "play.png";
        });
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
            loadAudio(playlist[currentIndex]);
        });
        navigator.mediaSession.setActionHandler('nexttrack', () => {
            currentIndex = (currentIndex + 1) % playlist.length;
            loadAudio(playlist[currentIndex]);
        });
    }
}

function updateBackground(picture) {
    const body = document.body;
    
    if (picture) {

        const base64String = btoa(new Uint8Array(picture.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
        const imageUrl = `data:${picture.format};base64,${base64String}`;
        body.style.backgroundImage = `url(${imageUrl})`;
        body.style.backgroundPosition = 'center';     
        body.style.backgroundSize = 'cover';          
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';    
        body.style.backdropFilter = 'blur(10px)';     
    } else {
        body.style.backgroundImage = ''; 
        body.style.backdropFilter = 'none';
        body.style.backgroundAttachment = ''; 
    }
}

previousButton.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length; 
    loadAudio(playlist[currentIndex]);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % playlist.length;
    loadAudio(playlist[currentIndex]);
});


