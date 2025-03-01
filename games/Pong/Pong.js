
const mobileScreen = document.createElement("div");
mobileScreen.id = "mobileScreen";
mobileScreen.innerHTML = "This Game Is Not Supported On Mobile Devices";
document.body.appendChild(mobileScreen);



const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 10;
}


window.addEventListener("resize", resizeCanvas);



// Sound Effects

// Hit Sound Effects
const hitsSoundEffects = [
    new Audio('./Sound/Hits/Hit 1.wav'),
    new Audio('./Sound/Hits/Hit 2.wav'),
    new Audio('./Sound/Hits/Hit 3.wav'),
    new Audio('./Sound/Hits/Hit 4.wav'),
    new Audio('./Sound/Hits/Hit 5.wav'),
    new Audio('./Sound/Hits/Hit 6.wav'),
    new Audio('./Sound/Hits/Hit 7.wav'),
    new Audio('./Sound/Hits/Hit 8.wav'),
    new Audio('./Sound/Hits/Hit 9.wav'),
    new Audio('./Sound/Hits/Hit 10.wav'),
    new Audio('./Sound/Hits/Hit 11.wav'),
    new Audio('./Sound/Hits/Hit 12.wav'),
];


// When Hits The Wall Sound
const wallSound = new Audio('./Sound/HitWall.wav');




// Win Sound
const winSound = [
    new Audio('./Sound/Win/Win1.mp3'),
    new Audio('./Sound/Win/Win2.wav'),
    new Audio('./Sound/Win/Win3.wav'),
    new Audio('./Sound/Win/Win4.wav'),
    new Audio('./Sound/Win/Win5.wav'),
];


// Lose Sound
const loseSound = [
    new Audio('./Sound/Lose/Lose1.wav'),
    new Audio('./Sound/Lose/Lose2.wav'),
    new Audio('./Sound/Lose/Lose3.wav'),
    new Audio('./Sound/Lose/Lose4.wav'),
];






// Welcome Screen
const welcomeScreen = document.createElement("div");
welcomeScreen.id = "welcomeScreen";

const welcomeTitle = document.createElement("h1");
welcomeTitle.textContent = "Welcome to Pong!";
welcomeTitle.style.fontSize = "48px";
welcomeTitle.style.fontWeight = "bold";
welcomeTitle.style.textShadow = "2px 2px 4px rgba(0, 0, 0, 0.5)";

const welcomeText = document.createElement("p");
welcomeText.textContent = "The classic Pong game! Move your paddle up and down to hit the ball and score points!";
welcomeText.id = "welcomeText";


const difficultyLevel = document.createElement("select");
difficultyLevel.id = "difficultyLevel";

const easy = document.createElement("option");
easy.textContent = "Easy";
easy.value = "easy";

const medium = document.createElement("option");
medium.textContent = "Medium";
medium.value = "medium";

const hard = document.createElement("option");
hard.textContent = "Hard";
hard.value = "hard";

const veryHard = document.createElement("option");
veryHard.textContent = "Very Hard";
veryHard.value = "veryHard";

difficultyLevel.appendChild(easy);
difficultyLevel.appendChild(medium);
difficultyLevel.appendChild(hard);
difficultyLevel.appendChild(veryHard);

let aiSpeed = 3;





const startButton = document.createElement("button");
startButton.textContent = "Start Game";
startButton.id = "startButton";

startButton.addEventListener("click", () => {
    document.documentElement.requestFullscreen();
    welcomeScreen.remove();
    startGame();


    // Rules Of Difficulty
    if (difficultyLevel.value === "easy") {
        aiSpeed = 5;
    } else if (difficultyLevel.value === "medium") {
        aiSpeed = 10;
    } else if (difficultyLevel.value === "hard") {
        aiSpeed = 18;
    } else if (difficultyLevel.value === "veryHard") {
        aiSpeed = 50;
    }

});


const exitLink = document.createElement("a");
exitLink.href = "./direct-Pong.html";

const exitButton = document.createElement("button");
exitButton.textContent = "Exit Game";
exitButton.id = "exitButton";
exitButton.href = "./direct-Pong.html";

welcomeScreen.appendChild(welcomeTitle);
welcomeScreen.appendChild(welcomeText);
welcomeScreen.appendChild(difficultyLevel);
welcomeScreen.appendChild(startButton);
welcomeScreen.appendChild(exitLink);
exitLink.appendChild(exitButton);

document.body.appendChild(welcomeScreen);







function startGame() {
    resizeCanvas();


    // Create The Players Paddle
    const paddleWidth = 10, paddleHeight = 100;
    let playerY = (canvas.height - paddleHeight) / 2;
    let aiY = (canvas.height - paddleHeight) / 2;
    let paddleXOffset = 20;



    // Scores
    let playerScore = 0;
    let aiScore = 0;







    // Create The Ball
    const ballSize = 10;
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;



    // Reset The Ball
    function resetBall() {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX *= -1;
        ballSpeedY = 5;
        ballSpeedX = 5;
    }


    // Check If The Paddle Collide With The Ball
    function checkPaddleCollision(paddleX, paddleY) {
        let nextBallX = ballX + ballSpeedX;
        let nextBallY = ballY + ballSpeedY;

        // Is The Ball Going To Hit The Paddle??
        let crossPaddle =
            (ballX < paddleX && nextBallX >= paddleX) ||
            (ballX > paddleX && nextBallX <= paddleX);

        if (crossPaddle) {
            if (nextBallY >= paddleY && nextBallY <= paddleY + paddleHeight) {
                ballSpeedX *= -1;
                hitsSoundEffects[Math.floor(Math.random() * hitsSoundEffects.length)].play();
            }
        }
    }





    // The Ball Movement
    let ballSpeedX = 5;
    let ballSpeedY = 5;


    function moveBall() {
        ballX += ballSpeedX;
        ballY += ballSpeedY;





        // Ball Collision
        if (ballY - ballSize <= 0 || ballY + ballSize >= canvas.height) { // If The Ball Hit The Top Or Bottom Screen It Will Change The Direction
            ballSpeedY *= -1; // Change The Direction To The Opposite Direction
            wallSound.play();

        }


        // Player Collision
        if (
            ballX - ballSize <= paddleXOffset + paddleWidth && // If The Ball Hit The Player Paddle
            ballY >= playerY && // And The Ball Y Position Is Greater Than The Player Paddle Y Position
            ballY <= playerY + paddleHeight // And The Ball Y Position Is Less Than The Player Paddle Y Position + The Paddle Height
        ) {
            ballSpeedX *= -1;
            ballSpeedX++;
            ballSpeedY++;
            hitsSoundEffects[Math.floor(Math.random() * hitsSoundEffects.length)].play();

        }


        // AI Collision
        if (
            ballX + ballSize >= canvas.width - paddleXOffset - paddleWidth && // If The Ball Hit The AI Paddle
            ballX - ballSpeedX < canvas.width - paddleXOffset - paddleWidth && // And The Ball X Position - The Ball Speed X Is Less Than The AI Paddle X Position + The Paddle Width
            ballY >= aiY && // And The Ball Y Position Is Greater Than The AI Paddle Y Position
            ballY <= aiY + paddleHeight // And The Ball Y Position Is Less Than The AI Paddle Y Position + The Paddle Height
        ) {
            ballSpeedX *= -1;
            hitsSoundEffects[Math.floor(Math.random() * hitsSoundEffects.length)].play();
        }


        // Check The Paddle Collision
        checkPaddleCollision(paddleXOffset, playerY);
        checkPaddleCollision(canvas.width - paddleXOffset - paddleWidth, aiY);




        // AI Score
        if (ballX - ballSize <= 0) {
            aiScore++;
            loseSound[Math.floor(Math.random() * loseSound.length)].play();
            resetBall();
        }

        // Player Score
        if (ballX + ballSize >= canvas.width) {
            playerScore++;
            winSound[Math.floor(Math.random() * winSound.length)].play();
            resetBall();
        }
    }






    // Draw The Scores
    function drawScores() {
        ctx.fillStyle = "white";
        ctx.font = "30px Arial";
        ctx.fillText('Player ' + ' ' + playerScore, canvas.width / 4, 50);
        ctx.fillText('To Exit Press F5 Or Ctrl (cmd) + R', canvas.width / 2 - 200, 50);
        ctx.fillText(aiScore + ' ' + ' Opponent', (canvas.width * 3) / 4, 50);
    }




    // Draw the Ball
    function drawBall() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
        ctx.fill();
    }




    // Draw The Half Line
    function drawHalfLine() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "white";
        ctx.lineWidth = 4;
        ctx.setLineDash([50, 0]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();
        ctx.setLineDash([]);
    }



    // Player Movement
    canvas.addEventListener("mousemove", function (event) {

        const canvasRect = canvas.getBoundingClientRect(); // Get The Canvas Limits
        const mouseY = event.clientY - canvasRect.top; // Get The Mouse Y Position
        playerY = mouseY - paddleHeight / 2; // Set The Player Y Position To The Mouse Y Position - The Paddle Height / 2


        // Prevent The Player From Going Out Of The Screen
        if (playerY < 0) playerY = 0;
        if (playerY + paddleHeight > canvas.height) playerY = canvas.height - paddleHeight; // If The Player Y Position + The Paddle Height Is Greater Than The Canvas Height Then Set The Player Y Position To The Canvas Height - The Paddle Height
    });





    // AI Movement
    function moveAI() {
        const aiCenter = aiY + paddleHeight / 2; // Get The AI Paddle Center
        const targetY = ballY - paddleHeight / 2; // Get The Target Y Position

        if (difficultyLevel.value === "veryHard") {
            aiY += (targetY - aiY) * 0.5
        } else {

            if (aiCenter < ballY - 10) { // If The AI Paddle Center Is Less Than The Ball Y Position - 10 Then Move The AI Paddle Down
                aiY += aiSpeed;
            } else if (aiCenter > ballY + 10) { // If The AI Paddle Center Is Greater Than The Ball Y Position + 10 Then Move The AI Paddle Up
                aiY -= aiSpeed;
            }
        }


        // Prevent The AI From Going Out Of The Screen
        if (aiY < 0) aiY = 0;
        if (aiY + paddleHeight > canvas.height) aiY = canvas.height - paddleHeight; // If The AI Y Position + The Paddle Height Is Greater Than The Canvas Height Then Set The AI Y Position To The Canvas Height - The Paddle Height
    }





    // Draw the Game
    function draw() {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw The Half Line
        drawHalfLine();

        // Left Player
        ctx.fillStyle = "white";
        ctx.fillRect(paddleXOffset, playerY, paddleWidth, paddleHeight);

        // Right Player
        ctx.fillRect(canvas.width - paddleXOffset - paddleWidth, aiY, paddleWidth, paddleHeight);

        // Ball
        drawBall();

        // Scores
        drawScores();
    }

    draw();











    // Update The Screen Game
    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear The Canvas
        moveBall(); // Move The Ball
        moveAI(); // Move The AI Paddle
        draw(); // Draw The Game
        requestAnimationFrame(update); // Call The Function Again
    }


    update();
}