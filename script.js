// First select all the required tags or elements

const wrapper = document.querySelector(".wrapper"),
    musicImg = wrapper.querySelector(".img-area img"),
    musicName = wrapper.querySelector(".song-details .name"),
    musicArtist = wrapper.querySelector(".song-details .artist"),
    mainAudio = wrapper.querySelector("#main-audio"),
    playPauseBtn = wrapper.querySelector(".play-pause"),
    prevBtn = wrapper.querySelector("#prev"),
    nextBtn = wrapper.querySelector("#next"),
    progressArea = wrapper.querySelector(".progress-area"),
    progressBar = wrapper.querySelector(".progress-bar"),
    repeatBtn = wrapper.querySelector("#repeat-plist"),
    musicList = wrapper.querySelector(".music-list"),
    showMoreBtn = wrapper.querySelector("#more-music"),
    hideMusicBtn = musicList.querySelector("#close");


//load random music on reload
let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);;

window.addEventListener("load", () => {
    loadMusic(musicIndex);
    playingNow();
});

//load music function

function loadMusic(indexNumb) {
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `Covers/${allMusic[indexNumb - 1].cover}`;
    mainAudio.src = `Songs/${allMusic[indexNumb - 1].song}.mp3`;
}
// play music function
function playMusic() {
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
}
// pause music function
function pauseMusic() {
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

// prevMusic function
function prevMusic() {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat": // if this icon is repeat, change it to repeat one.
            musicIndex--;
            break;
        case "repeat_one": //if this icon is repeat_one then change it to shuffle.
            musicIndex = musicIndex;
            break;
        case "shuffle": //if icon is shuffle then change it to repeat.
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);  //this loop will run untill the random Index becomes equall to current music Index.
            musicIndex = randIndex; // passing the randomIndex to musicIndex.;
            break;
    }
    // if musicIndex value become less than 1 then musicIndex will be 1;
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}

// nextMusic function
function nextMusic() {
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat": // if this icon is repeat, change it to repeat one.
            musicIndex++;
            break;
        case "repeat_one": //if this icon is repeat_one then change it to shuffle.
            musicIndex = musicIndex;
            break;
        case "shuffle": //if icon is shuffle then change it to repeat.
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);  //this loop will run untill the random Index becomes equall to current music Index.
            musicIndex = randIndex; // passing the randomIndex to musicIndex.;
            break;
    }
    // if musicIndex value become greater than allMusic length then musicIndex will be 1;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}
// paly or pause music button event
playPauseBtn.addEventListener("click", () => {
    const isMusicPaused = wrapper.classList.contains("paused");
    // if isMusicPause is true then call playMusic() else call pauseMusic()
    isMusicPaused ? pauseMusic() : playMusic();
    playingNow();
});

nextBtn.addEventListener("click", () => {
    // call the nextMusic function
    nextMusic();
});

prevBtn.addEventListener("click", () => {
    // call the prevMusic funciton
    prevMusic();
});

// update progressBar width according to current time of music
mainAudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime; // geting current time
    const duration = e.target.duration; //getting total duration

    let progresswidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progresswidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current");
    mainAudio.addEventListener("loadeddata", () => {
        musicDuration = wrapper.querySelector(".max-duration");

        //update song total duration
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });
    //update playing song current time
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if (currentSec < 10) {
        currentSec = `0${currentSec}`
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

// update palying sonf=g current time to progress bar width;

progressArea.addEventListener("click", (e) => {
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration;
});

// repeat,shuffle button
repeatBtn.addEventListener("click", () => {
    // first we will get the innerText of the icon then we'll change according.
    let getText = repeatBtn.innerText;
    // change different icon on click using switch
    switch (getText) {
        case "repeat": // if this icon is repeat, change it to repeat one.
            repeatBtn.innerText = "repeat_one";
            repeatBtn.setAttribute("title", "Song looped");
            break;
        case "repeat_one": //if this icon is repeat_one then change it to shuffle.
            repeatBtn.innerText = "shuffle";
            repeatBtn.setAttribute("title", "Playback Shuffle");
            break;
        case "shuffle": //if icon is shuffle then change it to repeat.
            repeatBtn.innerText = "repeat";
            repeatBtn.setAttribute("title", "Playlist looped");
            break;
    }
});

// creating repeat, shuffle and repeat one function

mainAudio.addEventListener("ended", () => {
    // we will do according to the icon set by users means if he has set the icon as repeat_one we will repat the same song
    // and it the icon is set as shufffle, then we will shuffle the playlist.
    let getText = repeatBtn.innerText;
    switch (getText) {
        case "repeat": // if this icon is repeat, we call the netMusic function.
            nextMusic();
            break;
        case "repeat_one": //if this icon is repeat_one then change the mainAudio.currentTime equals to zero.
            mainAudio.currentTime = 0;  //The same song will restart from 0 time.
            loadMusic(musicIndex);
            playMusic();
            break;
        case "shuffle": //if icon is shuffle then change the index to any random index between the max range of array length.
            let randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            do {
                randIndex = Math.floor((Math.random() * allMusic.length) + 1);
            } while (musicIndex == randIndex);  //this loop will run untill the random Index becomes equall to current music Index.
            musicIndex = randIndex; // passing the randomIndex to musicIndex.
            loadMusic(musicIndex);
            playMusic();
            playingNow();
            break;
    }
});

// Show and hide Music List

showMoreBtn.addEventListener("click", () => {
    musicList.classList.toggle("show");
});
hideMusicBtn.addEventListener("click", () => {
    showMoreBtn.click();
});

const ulTag = wrapper.querySelector("ul");
// create li according to array length.

for (let i = 0; i < allMusic.length; i++){
    // pass the song name, artist etc to li tag from array 
    let liTag = `<li li-index="${i+1}">
    <div class="row">
        <span>${allMusic[i].name}</span>
        <p>${allMusic[i].artist}</p>
    </div>
    <audio class="${allMusic[i].song}" src="Songs/${allMusic[i].song}.mp3"></audio>
    <span id="${allMusic[i].song}" class="audio-duration"></span>
</li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);
    
    let liAudioDuaration = ulTag.querySelector(`#${allMusic[i].song}`);
    let liAudioTag = ulTag.querySelector(`.${allMusic[i].song}`);

    liAudioTag.addEventListener("loadeddata", () => {
        let audioDuration = liAudioTag.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);
        if (totalSec < 10) {
            totalSec = `0${totalSec}`;
        }
        liAudioDuaration.innerText = `${totalMin}:${totalSec}`;
        // We will use this to set the duration again after playing
        liAudioDuaration.setAttribute("t-duration", `${totalMin}:${totalSec}`)
    });
}

// Playingthe music on click

const allLiTags = ulTag.querySelectorAll("li");
function playingNow() {
    for (let j = 0; j < allLiTags.length; j++){

        let audioTag = allLiTags[j].querySelector(".audio-duration");
        //remove playing class from all li except the last one which was clicked.
        if (allLiTags[j].classList.contains("playing")) {
            allLiTags[j].classList.remove("playing");
            let addDuration = audioTag.getAttribute("t-duration");
            audioTag.innerText = addDuration;
        }

        //if there is an li tag which li-index is equal to musicIndex then this music is 
        //playing, so we add playing class to it's classList.
        if (allLiTags[j].getAttribute("li-index") == musicIndex) {
            allLiTags[j].classList.add("playing");
            audioTag.innerText = "Playing";
        }
        
        //adding onclick attribute in all li tags
        allLiTags[j].setAttribute("onclick", "clicked(this)");
    }
}

//clicked() function

function clicked(element) {
    // getting li index of particular clicked li tag
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //passing that liindex to musicIndex
    loadMusic(musicIndex);
    playMusic();
    playingNow();
}