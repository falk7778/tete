const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const mainPlayBtn = document.getElementById('main-play-btn');
const playIcon = document.getElementById('play-icon');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');

let isPlaying = false;

// Format time (e.g., 215 seconds -> 3:35)
function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

// Play or pause the audio
function togglePlayPause() {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
        mainPlayBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        audioPlayer.play().catch(e => console.log("Áudio não encontrado ou autoplay bloqueado:", e));
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
        mainPlayBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    isPlaying = !isPlaying;
}

// Update progress bar as song plays
audioPlayer.addEventListener('timeupdate', () => {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    currentTimeEl.innerText = formatTime(currentTime);
});

// Update total duration once audio metadata is loaded
audioPlayer.addEventListener('loadedmetadata', () => {
    totalTimeEl.innerText = formatTime(audioPlayer.duration);
});

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    
    if (duration) {
        audioPlayer.currentTime = (clickX / width) * duration;
    }
});

// Attach event listeners to buttons
playPauseBtn.addEventListener('click', togglePlayPause);
mainPlayBtn.addEventListener('click', togglePlayPause);

// Allow clicking a song row to play
function playSong() {
    if (!isPlaying) {
        togglePlayPause();
    } else {
        // Restart if already playing
        audioPlayer.currentTime = 0;
    }
}

// Topbar scroll effect
const mainContent = document.querySelector('.main-content');
const topbar = document.querySelector('.topbar');

mainContent.addEventListener('scroll', () => {
    if (mainContent.scrollTop > 50) {
        topbar.style.backgroundColor = 'rgba(18, 18, 18, 0.9)';
    } else {
        topbar.style.backgroundColor = 'transparent';
    }
});

// Change header gradient based on the page load to make it feel alive
window.onload = () => {
    const colors = [
        '#4a4a4a', // Default dark gray
        '#6B2D5C', // Deep romantic pink
        '#45212A', // Dark red
        '#2C4A3B'  // Dark green
    ];
    // Randomize the start color of the gradient for a nice effect
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    mainContent.style.background = `linear-gradient(to bottom, ${randomColor} 0%, var(--bg-base) 100%)`;
};
