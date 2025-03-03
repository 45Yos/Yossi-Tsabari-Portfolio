//Music On Background
const BackgroundMusic = new Audio('./music/BackgroundMusicMathTrivia.mp3');

//Onload Music
window.onload = () => {
    BackgroundMusic.volume = 0.2;
    BackgroundMusic.loop = true;
    BackgroundMusic.play();
}


// Variables
let count = 0;
let user = '';
let countWarnning = 0;
let sum = 0;
let correct = 0;


// Welcome Screen Div
const welcomeScreen = document.createElement('div');
welcomeScreen.id = 'welcomeScreen';

document.body.prepend(welcomeScreen);



// Welcome Title
const welcomeTitle = document.createElement('h1');
welcomeTitle.id = 'welcomeTitle';
welcomeTitle.innerText = 'Math Trivia';

welcomeScreen.appendChild(welcomeTitle);



// Welcome Text
const welcomeUser = document.createElement('p');
welcomeUser.id = 'welcomeUser';
welcomeUser.innerText = 'Welcome ';

welcomeScreen.appendChild(welcomeUser);


// User Input To Write His Name
let userInput = document.createElement('input');
userInput.id = 'userInput';
userInput.placeholder = 'Write Your Name Here';
userInput.autocomplete = 'off';
userInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitUser.click();
    }
});

welcomeScreen.appendChild(userInput);


// Welcome Description
const welcomeDescription = document.createElement('p');
welcomeDescription.id = 'welcomeP';

// User Title In Headline
const userTitle = document.getElementById('userTitle');


// Warning Message If User Name Is Empty
const warning = document.createElement('p');
warning.id = 'warning';



// Submit User Button To Write His Name
const submitUser = document.createElement('button');
submitUser.id = 'submitUser';
submitUser.innerText = 'Submit';

// Submit User Button On Click
submitUser.addEventListener('click', () => {

    if (userInput.value !== '') {

        user = userInput.value;
        console.log(user);

        warning.style.display = 'none';
        welcomeUser.style.display = 'none';
        userInput.style.display = 'none';
        submitUser.style.display = 'none';
        welcomeDescription.style.display = 'block';


        userTitle.innerHTML = `Good Luck, ${user}!`;


        welcomeDescription.innerHTML = `Welcome <span id='userText'> ${user} </span> To Math Trivia, You Will Be Given 10 Questions, Each Question Will Be A Math Problem, Try To Solve Them All Correctly, Good Luck!`;

        welcomeScreen.appendChild(welcomeDescription);


        const startGameButton = document.createElement('button');
        startGameButton.id = 'startGameButton';
        startGameButton.innerText = 'Start Game';
        startGameButton.addEventListener('click', () => {
            welcomeScreen.style.display = 'none';
            questions();
        })

        welcomeScreen.appendChild(startGameButton);

    } else if (userInput.value === '') {
        warning.innerHTML = 'Please Write Your Name!!';

        while (countWarnning <= 1) {
            countWarnning = 2;
            welcomeScreen.appendChild(warning);
        }
    }

});


welcomeScreen.appendChild(submitUser);




//Music Button
const musicButton = document.createElement('button');
musicButton.id = 'musicButton';
musicButton.innerHTML = 'Pause Music <i class="fa-solid fa-pause"></i>';

musicButton.addEventListener('click', () => {
    if (BackgroundMusic.paused) {
        BackgroundMusic.play();
        musicButton.innerHTML = 'Pause Music <i class="fa-solid fa-pause"></i>';
    } else {
        BackgroundMusic.pause();
        musicButton.innerHTML = `Play Music  <i class="fa-solid fa-play"></i>`;
    }
});

document.body.appendChild(musicButton);






// Questions Area
const questionTitle = document.getElementById('questionTitle');
const answerInput = document.getElementById('answerInput');
answerInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitAnswer.click();
    }
})



let questionsArray = [];
const counterText = document.getElementById('count');
counterText.id = 'counterText';


const questions = () => {

    if (count < 10) {

        count++;
        let randomNumber1 = Math.floor(Math.random() * 10 + 1);
        let randomNumber2 = Math.floor(Math.random() * 10 + 1);
        const operators = ['+', '-', '*', '/'];
        let op = operators[Math.floor(Math.random() * operators.length)];

        if (randomNumber1 < randomNumber2) {
            [randomNumber1, randomNumber2] = [randomNumber2, randomNumber1];
        }

        questionTitle.innerHTML = `What Is ${randomNumber1} ${op} ${randomNumber2}?`;
        counterText.innerHTML = `Question ${count} / 10`;

        if (op === '+') {
            sum = randomNumber1 + randomNumber2;
        } else if (op === '-') {
            sum = randomNumber1 - randomNumber2;
        } else if (op === '*') {
            sum = randomNumber1 * randomNumber2;
        } else if (op === '/') {
            sum = randomNumber1 / randomNumber2;
        }


        if (sum % 1 !== 0) {

            randomNumber1 = Math.floor(Math.random() * 10 + 1);
            randomNumber2 = Math.floor(Math.random() * 10 + 1);
            op = operators[Math.floor(Math.random() * operators.length)];

            if (randomNumber1 < randomNumber2) {
                [randomNumber1, randomNumber2] = [randomNumber2, randomNumber1];
            }

            questionTitle.innerHTML = `What Is ${randomNumber1} ${op} ${randomNumber2}?`;
            counterText.innerHTML = `Question ${count} / 10`;

            if (op === '+') {
                sum = randomNumber1 + randomNumber2;
            } else if (op === '-') {
                sum = randomNumber1 - randomNumber2;
            } else if (op === '*') {
                sum = randomNumber1 * randomNumber2;
            } else if (op === '/') {
                sum = randomNumber1 / randomNumber2;
            }
        }

        localStorage.setItem('randomNumber1', randomNumber1);
        localStorage.setItem('randomNumber2', randomNumber2);
        localStorage.setItem('op', op);

    }



}







const resultsContainer = document.getElementById('results-container');
const resultsText = document.getElementById('resultsText');
resultsText.innerHTML = `You got ${correct} / 10 correct!`;
const resultsTitle = document.getElementById('resultsTitle');
const historyDiv = document.getElementById('history');



const submitAnswer = document.getElementById('submitAnswer');
submitAnswer.addEventListener('click', () => {

    let userAnswer = parseFloat(answerInput.value);
    if (userAnswer == sum) {
        correct++;

    }



    if (answerInput.value !== '') {

        localStorage.setItem('userAnswer', userAnswer);
        if (count < 10) {




            sum = 0;
            questionTitle.innerHTML = '<br>';
            answerInput.value = '';
            resultsText.innerHTML = `You got ${correct} / 10 <span id='correct'>correct! </span>`;

            const randomNumber1 = localStorage.getItem('randomNumber1');
            const randomNumber2 = localStorage.getItem('randomNumber2');
            const op = localStorage.getItem('op');
            const userAnswerStorage = localStorage.getItem('userAnswer');

            const question = `
            <br><br>
            ${randomNumber1} ${op} ${randomNumber2} <br>
            = <br>
            ${userAnswerStorage}`;


            const lastQuestionDiv = document.createElement('div');
            lastQuestionDiv.id = 'lastQuestion';
            lastQuestionDiv.innerHTML = `Question ${count}: ${question}`;
            historyDiv.appendChild(lastQuestionDiv);


            questions();

        } else {


            resultsText.innerHTML = `You got ${correct} / 10 <span id='correct'>correct! </span>`;

            const randomNumber1 = localStorage.getItem('randomNumber1');
            const randomNumber2 = localStorage.getItem('randomNumber2');
            const op = localStorage.getItem('op');
            const userAnswerStorage = localStorage.getItem('userAnswer');

            const question = `
            <br><br>
            ${randomNumber1} ${op} ${randomNumber2} <br>
            = <br>
            ${userAnswerStorage}`;


            const lastQuestionDiv = document.createElement('div');
            lastQuestionDiv.id = 'lastQuestion';
            lastQuestionDiv.innerHTML = `Question ${count}: ${question}`;
            historyDiv.appendChild(lastQuestionDiv);




            resultsContainer.style.display = 'block';




            historyDiv.style.bottom = '0';
            historyDiv.style.left = '0';
            historyDiv.style.width = '100%';
            historyDiv.style.position = 'absolute';

            const correctText = document.getElementById('correct');
            correctText.style.color = 'green';
            correctText.style.textShadow = '0px 0px 2px white, 0px 0px 3px white, 0px 0px 5px white';

            const startAllOver = document.createElement('button');
            startAllOver.id = 'startAllOver';
            startAllOver.innerText = 'Start All Over';
            startAllOver.addEventListener('click', () => {
                location.reload();
            });
            resultsContainer.appendChild(startAllOver);

        }

    }

});
