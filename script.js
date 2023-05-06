let players = [];

const container = document.getElementById('container');
container.addEventListener('touchstart', handleTouchStart);
container.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
    if (players.length === 0) {
        setTimeout(() => {
            if (players.length > 0) {
                determineRandomPlayer();
            }
        }, 5000);
    }
    players.push(event.changedTouches[0].identifier);
    drawCircle(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
}

function drawCircle(x, y) {
    const circle = document.createElement('div');
    circle.style.width = '100px';
    circle.style.height = '100px';
    circle.style.backgroundColor = getRandomColor();
    circle.style.left = `${x - 50}px`;
    circle.style.top = `${y - 50}px`;
    circle.classList.add('circle');
    container.appendChild(circle);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function handleTouchEnd(event) {
    const touchId = event.changedTouches[0].identifier;
    const playerIndex = players.indexOf(touchId);
    if (playerIndex !== -1) {
        players.splice(playerIndex, 1);
    }
}

function determineRandomPlayer() {
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    players = [];
    displayRandomPlayer(randomPlayer);
}

function displayRandomPlayer(randomPlayer) {
    container.innerHTML = `<h1>Случайный игрок: ${randomPlayer}</h1>`;
    setTimeout(() => {
        container.innerHTML = '<h1>Коснитесь экрана и держите 5 секунд</h1>';
    }, 5000);
}


