/*global questions*/

const startButton = document.getElementById('start-btn');
const skipButton = document.getElementById('skip-btn');
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question');
const scoreElement = document.getElementById('total');
const answerButtonsElement = document.getElementById('answer-buttons');
const totalScore = document.getElementById('prize');
const currentRoundPrize = document.getElementById('current-prize');
const gameOver = document.getElementById('game-over');
startButton.addEventListener('click', startGame);
const oneMillion = 1000000;



let points , currentPrize;
let shuffledQuestions, currentQuestionIndex;

answerButtonsElement.children[0].addEventListener('click', function(){
    isCorrect(shuffledQuestions[currentQuestionIndex], 0);
});
answerButtonsElement.children[1].addEventListener('click', function(){
    isCorrect(shuffledQuestions[currentQuestionIndex], 1);
});
answerButtonsElement.children[2].addEventListener('click', function(){
    isCorrect(shuffledQuestions[currentQuestionIndex], 2);
});
answerButtonsElement.children[3].addEventListener('click', function(){
    isCorrect(shuffledQuestions[currentQuestionIndex], 3);
});

let uniqueQ = [questions[0]];
let flag = false
for (let i = 0 ; i<questions.length; i++){
    flag = false;
    for (let j = 0 ; j<uniqueQ.length; j++){
        if (questions[i].question!==uniqueQ[j].question){
            flag = true;
        } else {
            flag = false;
            break;
        }
}
if (flag === true){
    uniqueQ[uniqueQ.length]=questions[i];
}
}


function startGame() {
    currentPrize = 100;
    points = 0;
    console.log('started');
    shuffledQuestions = uniqueQ.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    scoreElement.classList.remove('hide');
    skipButton.classList.remove('hide');
    gameOver.classList.add('game-over');
 
    skipButton.addEventListener('click',disableButton);
    
    setNextQuestion();
}

function setNextQuestion() {
    if(points >= oneMillion) {
        winner();
    }
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(asd) {
    questionElement.innerHTML = asd.question;
    currentRoundPrize.innerHTML = 'Prize on current round: ' + currentPrize;
    totalScore.innerHTML = 'Total prize: ' + points;
    for(let i=0;i<asd.content.length;i++) {
    answerButtonsElement.children[i].innerHTML = asd.content[i];
    }
}

function disableButton() {
    skipButton.classList.add('hide');
    currentQuestionIndex++;
    setNextQuestion();
}

function gameIsOver() {
    questionContainerElement.classList.add('hide');
    scoreElement.classList.add('hide');
    skipButton.classList.add('hide');
    gameOver.classList.remove('game-over');
    gameOver.innerHTML = 'Game over. Your prize is: ' + points ;
    points = 0;
    currentPrize = 100;
    currentQuestionIndex = 0;
}

function winner() {
    questionContainerElement.classList.add('hide');
    scoreElement.classList.add('hide');
    skipButton.classList.add('hide');
    gameOver.classList.remove('game-over');
    gameOver.innerHTML = 'Congratulations! You won ' + points + ' .';
    points = 0;
    currentPrize = 100;
    currentQuestionIndex = 0;
}

function isCorrect(asd, i) {
    
   if(i === asd.correct) {
        points += currentPrize;
        currentPrize = currentPrize * 2;
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        gameIsOver();
   }
}


