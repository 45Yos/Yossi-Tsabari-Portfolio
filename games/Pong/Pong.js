const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.style.width = window.innerWidth;
    canvas.style.height = window.innerHeight;
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 20;
}

resizeCanvas();


const paddleWidth = 10, paddleHeight = 100;
const playerY = (canvas.height - paddleHeight) / 2;
const aiY = (canvas.height - paddleHeight) / 2;
const paddleXOffset = 20;



// Draw the paddles
function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Left Player
    ctx.fillStyle = "white";
    ctx.fillRect(paddleXOffset, playerY, paddleWidth, paddleHeight);

    // Right Player
    ctx.fillRect(canvas.width - paddleXOffset - paddleWidth, aiY, paddleWidth, paddleHeight);
}

draw();






// Create The Ball

const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;



