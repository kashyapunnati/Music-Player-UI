const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const trackTitle = document.getElementById("trackTitle");
const playlist = document.getElementById("playlist");

const songs = [
    {
        name: "Song 1",
        file: "song(1).mp3"
    },
    {
        name: "Song 2",
        file: "song(2).mp3"
    },
    {
        name: "Song 3",
        file: "song(3).mp3"
    }
];

let currentSong = 0;

function loadSong(index) {

    currentSong = index;

    audio.src = songs[currentSong].file;

    trackTitle.textContent = songs[currentSong].name;

    displayPlaylist();
}

function playSong() {

    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
}

function previousSong() {

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();

    playBtn.textContent = "⏸";
}

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();

    playBtn.textContent = "⏸";
}

function formatTime(time) {

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

audio.addEventListener("timeupdate", function () {

    if (audio.duration) {

        const progressPercent =
            (audio.currentTime / audio.duration) * 100;

        progress.value = progressPercent;

        currentTime.textContent =
            formatTime(audio.currentTime);
    }
});

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);
});

progress.addEventListener("input", function () {

    if (audio.duration) {

        audio.currentTime =
            (progress.value / 100) * audio.duration;
    }
});

volume.addEventListener("input", function () {

    audio.volume = volume.value;
});

audio.addEventListener("ended", function () {

    nextSong();
});

function displayPlaylist() {

    playlist.innerHTML = "";

    songs.forEach(function (song, index) {

        const track = document.createElement("div");

        track.className = "track";

        if (index === currentSong) {
            track.classList.add("active");
        }

        track.textContent = song.name;

        track.addEventListener("click", function () {

            loadSong(index);

            audio.play();

            playBtn.textContent = "⏸";
        });

        playlist.appendChild(track);
    });
}

playBtn.addEventListener("click", playSong);

prevBtn.addEventListener("click", previousSong);

nextBtn.addEventListener("click", nextSong);

loadSong(0);