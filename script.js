import { questions } from './questions.js';
const questionElement = document.getElementById("quiz");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let scoreBoard = 0;

function startQuiz()
{
    currentQuestionIndex=0;
    scoreBoard=0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    //Dispaly the answers
    currentQuestion.answers.forEach(answer =>
    {
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn")
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    }
    )
}
startQuiz()
function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.correct === 'true';
    
    if (isCorrect) {
        selectButton.classList.add("correct");
        scoreBoard++;
    } else {
        selectButton.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;  // Fixed: should be a boolean, not a string
    });

    // Optional: remove the need to click the "Next" button
    // Show next question after a short delay (e.g., 1.5 seconds)
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            handleNextButton();
        } else {
            showScore();
        }
    }, 1500); // 1500 milliseconds = 1.5 seconds
}

function showScore()
{
    resetState();
    questionElement.innerHTML = `You Scored ${scoreBoard} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton()
{
    currentQuestionIndex++;
    if (currentQuestionIndex<questions.length) {
        showQuestion();
    }
    else
    {
        showScore();
    }
}
nextButton.addEventListener("click",()=>
{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }
    else{
        startQuiz();
    }
})