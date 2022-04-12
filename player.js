console.log("Welcome to JioShubham");

// Initialise the variable
let songIndex = 0;
let audioElement = new Audio('Image/music1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem = Array.from(document.getElementsByClassName('song'));
let songs = [
    {songsName: "Hamare Saath Shri Raghunath", filePath: "Image/music1.mp3", coverPath: "Image/cover1.jpg"},
    {songsName: "Hanuman Chalisa", filePath: "Image/music2.mp3", coverPath: "Image/cover2.jpg"},
    {songsName: "In the middle of Night", filePath: "Image/music3.mp3", coverPath: "Image/cover3.jpg"},
    {songsName: "EDM", filePath: "Image/music4.mp3", coverPath: "Image/cover4.jpg"},
]

songItem.forEach((element,i)=>{
    element.getElementsByClassName("cover")[0].src = songs[i].coverPath;
    element.getElementsByClassName('name')[0].innerText = songs[i].songsName;
})

// audioElement.play();


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('play');
        masterPlay.classList.add('pause');
        gif.style.opacity = 1;
        masterSongName.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('pause');
        masterPlay.classList.add('play');
        gif.style.opacity = 0;
        masterSongName.style.opacity = 0;
    }
})
// Listen to events

audioElement.addEventListener('timeupdate', ()=>{
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value*audioElement.duration)/100;
})
Array.from(document.getElementsByClassName('cover')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        songIndex = parseInt(e.target.id);
        audioElement.src =`Image/music${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songsName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterSongName.style.opacity = 1;
        masterPlay.classList.remove('play');
        masterPlay.classList.add('pause');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=4){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src =`Image/music${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('play');
    masterPlay.classList.add('pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 4;
    }
    else{
        songIndex-=1;
    }
    audioElement.src =`Image/music${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songsName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('play');
    masterPlay.classList.add('pause');
})