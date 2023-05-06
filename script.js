const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const playersCount = document.getElementById('playersCount');
const timerElement = document.getElementById('timer');

let players = {};
let timer = 5;
let countdown;
let gameFinished = false;
let sessionColors = {}; // переменная для хранения цветов всех участников

canvas.addEventListener('touchstart', (e) => {
    if (gameFinished) return;
    e.preventDefault();
    for (const touch of e.touches) {
        const id = touch.identifier;
        const color = getSessionColor(id); // переходите к цвету сессии для текущего участника
        const x = touch.pageX - canvas.offsetLeft;
        const y = touch.pageY - canvas.offsetTop;

        players[id] = { color, x, y };
        playersCount.textContent = Object.keys(players).length;

        if (!countdown) {
            timer = 5;
            startCountdown();
        }
    }
});

canvas.addEventListener('touchmove', (e) => {
    if (gameFinished) return;
    e.preventDefault();
    for (const touch of e.touches) {
        const id = touch.identifier;
        const x = touch.pageX - canvas.offsetLeft;
        const y = touch.pageY - canvas.offsetTop;

        if (players[id]) {
            players[id].x = x;
            players[id].y = y;
        }
    }
});

canvas.addEventListener('touchend', (e) => {
    if (gameFinished) return;
    e.preventDefault();
    for (const touch of e.changedTouches) {
        delete players[touch.identifier];
    }
    playersCount.textContent = Object.keys(players).length;
});

function getSessionColor(id) {
    if (!sessionColors[id]) {
        sessionColors[id] = randomColor(); // создать новый случайный цвет, если его нет
    }
    return sessionColors[id]; // вернуть текущий цвет сессии для участника с этим идентификатором
}

function randomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

function startCountdown() {
    timerElement.textContent = timer;
    countdown = setInterval(() => {
        timer--;
        timerElement.textContent = timer;

        if (timer <= 0) {
            clearInterval(countdown);
            countdown = null;
            selectWinner();
        }
    }, 1000);
}

function selectWinner() {
    const playerIds = Object.keys(players);
    if (playerIds.length > 1) {
        const winnerId = playerIds[Math.floor(Math.random() * playerIds.length)];

        for (const id of playerIds) {
            if (id !== winnerId) {
                delete players[id];
            }
        }
        playersCount.textContent = "1 (winner)";
    }
    
    gameFinished = true;

    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        players = {};
        playersCount.textContent = "0";
        timerElement.textContent = "0";
        gameFinished = false;
    }, 5000);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const id in players) {
        const player = players[id];
        ctx.beginPath();
        ctx.arc(player.x, player.y, 50, 0, Math.PI * 2); // увеличено исходное значение с 20 на 50 (2.5 раза)
        ctx.fillStyle = player.color;
        ctx.fill();
    }

    requestAnimationFrame(draw);
}

draw();

