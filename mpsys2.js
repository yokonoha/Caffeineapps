//////////////////////////////////////////////////////
//          Caffeine Music by YokochaYokoha         //
//              System Script Rev.2.0               //
//          Works by Y.Yokoha Studio Project        //
//              🄫2025 YokochaYokoha                //
//         Licensed under Y.Yokoha B License       //
/////////////////////////////////////////////////////

const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const folderInput = document.getElementById('folder-input');
const readfile = document.getElementById('file-input');
const readfolder = document.getElementById('folder-input');
const audioPlayer = document.getElementById('audio-player');
const playPauseButton = document.getElementById('play-pause-button');
const seekBar = document.getElementById('seek-bar');
const speedControl = document.getElementById('speed-control');
const timeInfo = document.getElementById('time0');
const timetotal=document.getElementById("time1");
const titlePlaceholder = document.getElementById('title');
const artistPlaceholder = document.getElementById('artist');
const albumPlaceholder = document.getElementById('album');
const albumArtPlaceholder = document.getElementById('album-art');
const lyricsDiv = document.getElementById('lyricsDiv');
const playlistDiv = document.getElementById('playlist');
const spdcon=document.getElementById("spd");
const previousButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const vcon = document.getElementById('volume-control');
let playlist = [];
let currentIndex = 0;
let isPlaying = false;
let lrcmap=new Map();


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
    lrcmap.clear();
    for(const items of musicfiles)
    {
        const entry=items.webkitGetAsEntry();
        if(entry)
        {
            if(entry.isFile)
            {
                const afiles=await new Promise((res)=>entry.file(res));
                if(afiles.type.startsWith("audio/"))
                {
                    playlist.push(afiles);
                }
                else if(afiles.name.endsWith(".lrc"))
                {
                    await storekashi(afiles);
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
                if(afiles.type.startsWith("audio/"))
                {
                    playlist.push(afiles);
                }
                else if(afiles.name.endsWith(".lrc"))
                    {
                        await storekashi(afiles);
                    }
            }
            else if (entry.isDirectory)
            {
                await readDir(entry);
            }
    }
}
async function storekashi(file) 
{
    const nakami=await file.text();
    const kyokumei=file.name.replace(/\.lrc$/,"");
    lrcmap.set(kyokumei,parser(nakami))
}

//この先Rawcode 要注意安全。

function parser(text) {
    const lines = text.split("\n");
    const lyrics = [];

    for (const line of lines) {
        const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (match) {
            const minutes = parseInt(match[1]);
            const seconds = parseFloat(match[2]);
            const time = minutes * 60 + seconds;
            lyrics.push({ time, text: match[3] });
        }
    }

    return lyrics;
}
function displayLyrics(lyrics) {
    lyricsDiv.innerHTML = ""; // 一度クリア
    lyrics.forEach(({ time, text }) => {
        const p = document.createElement("p");
        p.textContent = text;
        p.setAttribute("data-time", time);
        lyricsDiv.appendChild(p);
    });
}

// 曲の進行に合わせて歌詞をハイライト
audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const lyrics = Array.from(lyricsDiv.children);

    for (let i = 0; i < lyrics.length; i++) {
        const time = parseFloat(lyrics[i].getAttribute("data-time"));
        if (currentTime >= time) {
            lyrics.forEach((p) => p.classList.remove("active"));
            lyrics[i].classList.add("active");
        }
    }
});


//おわり
////////////////////////////////////////////////////////////////////////////////////////////////////
function mstore(files)
{
    playlist = Array.from(files).filter(file => file.type.startsWith('audio/'));
    
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

    ///////////RAW 
    const songName = file.name.replace(/\..+$/, ""); // 拡張子を除いた曲名
    if (lrcmap.has(songName)) {
        displayLyrics(lrcmap.get(songName));
    } else {
        lyricsDiv.innerHTML = "<p>歌詞なし</p>";
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
}

function DSPmetadata(file)
{
    jsmediatags.read(file,
        {
            onSuccess: (tag)=>
                {
                    const { title, artist, album, picture } = tag.tags;
                    titlePlaceholder.textContent = title || "Music(タイトル情報不明)";
                    artistPlaceholder.textContent = artist || "アーティスト名不明";
                    albumPlaceholder.textContent = album || "アルバム名不明";
                    if (picture) 
                        {
                        const base64String = btoa(new Uint8Array(picture.data).reduce((data, byte) => data + String.fromCharCode(byte), ''));
                        albumArtPlaceholder.src = `data:${picture.format};base64,${base64String}`;
                    } 
                    else 
                    {
                        albumArtPlaceholder.src = "art.png";
                    }
                    updateBackground(picture);
                    initsys();
                },
                onError: (error) => 
                    {
                    console.error("Failed to Retrieve Metadata in the file/メタデータ読み取り失敗(エラーハンドラー):", error);
                    titlePlaceholder.textContent =  "Music";
                    artistPlaceholder.textContent = "アーティスト名不明";
                    albumPlaceholder.textContent = "アルバム名不明";
                    updateBackground(null);
                }
                }
        

    );
}

function updateplaylistDSP() 
{
    playlistDiv.innerHTML = "";
    playlist.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'marks-r-o';
        item.innerHTML = `<img src="music.png" alt="曲" style="width:20px;"><p><span>${file.name}</span></p>`;
        
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
            artist: artistPlaceholder.textContent,
            album: albumPlaceholder.textContent,
            artwork: [
                { src: albumArtPlaceholder.src, sizes: '96x96', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '128x128', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '192x192', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '256x256', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '384x384', type: 'image/png' },
                { src: albumArtPlaceholder.src, sizes: '512x512', type: 'image/png' },
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


