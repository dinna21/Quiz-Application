const questions = [
    {
        question: "which is the largest animal in the World?",
        answers: [
            {text: "Shark",correct: false},
            {text: "Blue Whale",correct: true},
            {text: "Elephant",correct: false},
            {text: "Giraffe",correct: false}
        ]
    },
    {
        question: "which is the Smallest animal in the World?",
        answers: [
            {text: "Rat",correct: true},
            {text: "Blue Whale",correct: false},
            {text: "Elephant",correct: false},
            {text: "Giraffe",correct: false}
        ]
    },
    {
        question: "which is the most famous vehicle in the World?",
        answers: [
            {text: "toyota",correct: false},
            {text: "Tesla",correct: true},
            {text: "Nissan",correct: false},
            {text: "Honda",correct: false}
        ]
    },
    {
        question: "which is the most famous Bike in the World?",
        answers: [
            {text: "Dukati",correct: false},
            {text: "BMW",correct: true},
            {text: "Nissan",correct: false},
            {text: "Honda",correct: false}
        ]
    }
]
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

function selectAnswer(e)
{
    const selectButton = e.target;
    const isCorrect = selectButton.dataset.correct === 'true';
    if(isCorrect)
    {
        selectButton.classList.add("correct");
        scoreBoard++;
    }
    else{
        selectButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button=>
    {
        if(button.dataset.correct==='true'){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
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