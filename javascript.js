let seconds;
let currentQuestionIndex;
const remainingSecondSpan = document.querySelector("#remaining-seconds");
const totalQuestionNumber = questions.length;
let correct;
let incorrect;

setInterval(function() {
    remainingSecondSpan.textContent = seconds;
    seconds--;
}, 1000 );


// function getChoiceElement(choice) {
//     const element = document.createElement("div");

// }

// function to load questions and choices from question object 

function resetQuiz () {
    seconds = 60;
    currentQuestionIndex = 0;
}

function renderQuestion(question) {

    const question = questions[currentQuestionIndex];

    document.querySelector("#question").textContent = question.title;

    const choiceContainer = document.querySelector("#choices-container");

    //clear choice container after loading new ones

    choiceContainer.innerHTML = '' ;

    //append new choices

    for (let index = 0; index < question.choices.length; index++) {
        const choice = question.choices[index];
        const element = document.createElement("div");
        element.classList.add("choice");
        element.textContent = choice;
        choiceContainer.appendChild(element);

    }
}

// const myQuestion = questions[0];
renderQuestion();

document.querySelector("#start-quiz-button").addEventListener("click", function(event) {
    resetQuiz();
    renderQuestion();

});

document.querySelector("#choices-container").addEventListener("click" , function(event) {

    const target = event.target;

    if (target.classList.contains("choice")) {
        const answer = target.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (answer.localeCompare(correctAnswer) === 0 ){
            console.log('you are correct');
        }
        else {
            console.log('you are wrong');
        }

        currentQuestionIndex++;
        if (currentQuestionIndex > totalQuestionNumber) {
            renderQuestion();

        } else
        {

        }
        renderQuestion();
    }
});