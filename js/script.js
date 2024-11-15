console.log("Started");

// Define songs and metadata
const songs = [
    {
        src: "./musics/[iSongs.info] 03 - Kaanunna Kalyanam.mp3",
        title: 'Kaanunna Kalyanam',
        artists: 'Vishal ChandraShekhar, Anurag Kulkarni, Sindhuri Vishal',
        img: './images/big/ab67616d00001e0285efa87a5eafe030b2495b7e.jpg'
    },
    {
        src: "./musics/128-Kun Faaya Kun - Rockstar 128 Kbps.mp3",
        title: 'Kun Faaya Kun',
        artists: 'A. R. Rahman, Javed Ali, Mohit Chauhan',
        img: './images/big/ab67616d00001e0254e544672baa16145d67612b.jpg'
    },
    {
        src: "./musics/Manasilaayo - Vettaiyan (pagalall.com).mp3",
        title: 'Manasilaayo',
        artists: 'Anirudh Ravichander, Malaysia Vasudevan, Deepthi Suresh',
        img: './images/big/ab67616d00001e02da8d29ecfc096bb69dff7ac1.jpg'
    },
    {
        src: "./musics/One-Of-The-Girls(PagalNew.Com.Se).mp3",
        title: 'One Of The Girl',
        artists: 'The Weeknd, JENNIE, Lily-Rose Depp',
        img: './images/big/ab67616d00001e02b0dd6a5cd1dec96c4119c262.jpg'
    }, 
    {
        src: "./musics/anuv-jain-jo-tum-mere-ho-official-video-128-ytshorts.savetube.me.mp3", 
        title: 'Jo Tum Mere Ho', 
        artists: 'Anuv Jain', 
        img: './images/big/ab67616d00001e0272a77d038887cdc425f5ee55.jpeg'
    }
];

// HTML Elements
const ppButton = document.getElementById("pp");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const title = document.getElementById('title');
const artists = document.getElementById('artists');
const img = document.getElementById('img');
let duration = document.getElementById('duration');
let currentTimeElement = document.getElementById('currentTime');
let progressBar = document.getElementById('range');

// State Variables
let currentIndex = 0;
let currentSong = new Audio(songs[currentIndex].src);

// Utility Functions
const formattedTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
};

// Update UI with Song Details
const updateUI = () => {
    console.log(currentSong)
    title.textContent = songs[currentIndex].title;
    artists.textContent = songs[currentIndex].artists;
    img.src = songs[currentIndex].img;
    duration.textContent = '0:00';
    currentTimeElement.textContent = '0:00';
    progressBar.value = 0;
};

// Load Song and Metadata
const loadSong = () => {
    currentSong.src = songs[currentIndex].src; // **Change 1:** Updated to explicitly set `src` each time.
    currentSong.load(); // **Change 2:** Ensures the song is properly loaded before playing.
    updateUI();

    currentSong.addEventListener('loadedmetadata', () => {
        progressBar.max = Math.floor(currentSong.duration);
        duration.textContent = formattedTime(currentSong.duration);
    });

    currentSong.addEventListener('timeupdate', () => {
        progressBar.value = Math.floor(currentSong.currentTime);
        currentTimeElement.textContent = formattedTime(currentSong.currentTime);
    });

    currentSong.addEventListener('ended', () => {
        changeSong('next');
    });
};

// Play or Pause Current Song
const togglePlayPause = () => {
    const icon = ppButton.firstElementChild;
    if (currentSong.paused) {
        currentSong.play(); // **Change 3:** Ensures the song plays when toggled.
        icon.setAttribute('class', 'ph-bold ph-pause');
    } else {
        currentSong.pause();
        icon.setAttribute('class', 'ph-bold ph-play');
    }
};

// Change to Next or Previous Song
const changeSong = (direction) => {
    currentSong.pause();
    currentSong.currentTime = 0;

    // **Change 4:** Updated index management to prevent out-of-bounds errors.
    if (direction === 'next') {
        currentIndex = (currentIndex + 1) % songs.length;
    } else if (direction === 'prev') {
        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    }

    loadSong(); // **Change 5:** Load the new song and update the UI.
    currentSong.play(); // **Change 6:** Explicitly play the song after loading.
    ppButton.firstElementChild.setAttribute('class', 'ph-bold ph-pause');
};

// Event Listeners
ppButton.addEventListener('click', togglePlayPause);
nextButton.addEventListener('click', () => changeSong('next'));
prevButton.addEventListener('click', () => changeSong('prev'));

progressBar.addEventListener('input', () => {
    currentSong.currentTime = progressBar.value; // **Change 7:** Allows user to seek within the song.
});

// Initial Setup
loadSong(); // **Change 8:** Initialize the first song and update UI.
