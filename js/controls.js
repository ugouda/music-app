const playPause = document.getElementById('pp');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

window.onload(() => {
    window.addEventListener('keypress', (e) => {
        if (e === 'P') {
            playPause.click();
        } else if (e === 'D') {
            next.click();
        } else if (e === 'A') {
            prev.click();
        }
    })
})