const circles = {};

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
    circles[id] = circle;
}

function handleTouchMove(event) {
    event.preventDefault();
    const touch = event.changedTouches[0];
    const circle = circles[touch.identifier];
    if (!circle) return;
    circle.style.left = `${touch.clientX - 50}px`;
    circle.style.top = `${touch.clientY - 50}px`;
}

function determineRandomPlayer() {
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    players = [];
    removeLosingCircles(randomPlayer);
    updatePlayerCounter();
}

function removeLosingCircles(winnerId) {
    Object.keys(circles).forEach(id => {
        if (id !== winnerId.toString()) {
            container.removeChild(circles[id]);
            delete circles[id];
        }
    });
}

