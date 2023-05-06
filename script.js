let players = [];

const container = document.getElementById('container');
const playerCounter = document.getElementById('player-counter');
container.addEventListener('touchstart', handleTouchStart);
container.addEventListener('touchend', handleTouchEnd);
container.addEventListener('touchmove', handleTouchMove);

function handleTouchStart(event) {
    if (players.length === 0) {
        setTimeout(() => {
            if (players.length > 0) {
                determineRandomPlayer();
            }
        }, 5000);
    }
    const touchId = event.changedTouches[0].identifier;
    players.push(touchId);
    drawCircle(touchId, event.changedTouches[0].clientX, event.changedTouches[0].clientY);
    updatePlayerCounter();
}

function handleTouchEnd(event) {
    const touchId = event.changedTouches[0].identifier;
    const playerIndex = players.indexOf(touchId);
    if (playerIndex !== -1) {
        players.splice(playerIndex, 1);
    }
    updatePlayerCounter();
}

function drawCircle(id, x, y) {
    const circle = document.createElement('div');
    circle.style.width = '100px';
    circle.style.height = '100px';
    circle.style.backgroundColor = getRandomColor();
    circle.style.left = `${x - 50}px`;
    circle.style.top = `${y - 50}px`;
    circle.classList.add('circle');
    circle.dataset.touchId = id;
    container.appendChild(circle);
}

function handleTouchMove(event) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const circle = getCircleByTouchId(touch.identifier);
    if (!circle) return;
    circle.style.left = `${touch.clientX - 50}px`;
    circle.style.top = `${touch.clientY - 50}px`;
}

function getCircleByTouchId(touchId) {
    return [...document.getElementsByClassName('circle')].find(
        el => el.dataset.touchId == touchId
    );
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function updatePlayerCounter() {
    playerCounter.innerText = `Игроков: ${players.length}`;
}

function determineRandomPlayer() {
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    players = [];
    removeLosingCircles(randomPlayer);
    updatePlayerCounter();
}

function removeLosingCircles(winnerId) {
    const circles = document.getElementsByClassName('circle');
    Array.from(circles).forEach(circle => {
        if (circle.dataset.touchId != winnerId) {
            container.removeChild(circle);
        }
    });
}

