const playPause = document.getElementById('pp');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

document.body.addEventListener('keyup', (e) => {
    if (e.keyCode === 32) {
        playPause.click();
    } else if (e.keyCode === 39) {
        next.click();
    } else if (e.keyCode === 37) {
        prev.click();
    }
})