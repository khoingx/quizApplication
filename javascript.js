const seconds = 60;
let currentQuestionIndex = 0;
const remainingSecondSpan = document.querySelector("#remaining-seconds");

setInterval(function() {
    remainingSecondSpan.textContent = seconds;
    seconds--;
}, 1000 );


const myQuestion = questions[0];

function getChoiceElement(choice) {
    const element = document.createElement("div");

}

// const myQuestion = questions[0];

function renderQuestion(questions) {
    document.querySelector("#question").textContent = questions.title;

    const choiceContainer = document.querySelector("#choices-container");

    choiceContainer.innerHTML = '' ;

    for (let index = 0; index < questions.choices.length; index++) {
        const choice = questions.choices[index];
        const element = document.createElement("div");
        element.textContent = choice;
        choiceContainer.appendChild(element);

    }
}

renderQuestion(myQuestion);

document.querySelector("#choices-container").addEventListener("click" , function(event) {

    const target = event.target;

    if (target.classList.contains("choice")) {
        const answer = target.textContent;
        const correctAnswer = myQuestion.answer;

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