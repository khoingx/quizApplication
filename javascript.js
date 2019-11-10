let seconds;
let currentQuestionIndex;
const remainingSecondSpan = document.querySelector("#remaining-seconds");
const totalQuestionNumber = questions.length;
let correct;
let incorrect;

const START_PAGE = "start-page";
const QUIZ_PAGE = "quiz-page";
const RESULT_PAGE = "result-page";
const LEADERBOARDS_PAGE = "leaderboard-page";
const allPages = [START_PAGE, QUIZ_PAGE, RESULT_PAGE, LEADERBOARDS_PAGE];
const LOCAL_STORAGE_KEY = "leaderboards";
let previousPage;


setInterval(function() {
    remainingSecondSpan.textContent = seconds;
    seconds--;
}, 1000 );

// function to load questions and choices from question object 



function showPage (page) {

    for (let index= 0; index < allPages.length; index++){
        const page = allPages[index];
        document.querySelector(`#${page}`).classList.add("hidden");

    }

    document.querySelector(`#${page}`).classList.remove("hidden");

}



function getUserScore() {
    return correct + seconds;

}

function renderScore() {
    showPage(RESULT_PAGE);
    document.querySelector(".score").textContent = correct +seconds;

}

showPage(START_PAGE);


document.querySelector("#start-quiz-button").addEventListener("click", function(event) {
    resetQuiz();
    renderQuestion();
    showPage(QUIZ_PAGE);
});

function resetQuiz () {
    seconds = 60;
    currentQuestionIndex = 0;
    correct = 0;
    incorrect = 0;
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
document.querySelector("#choices-container").addEventListener("click" , function(event) {

    const target = event.target;

    if (target.classList.contains("choice")) {
        const answer = target.textContent;
        const correctAnswer = questions[currentQuestionIndex].answer;

        if (answer.localeCompare(correctAnswer) === 0 ){
            correct++;
        }
        else {
            incorrect++;
        }

        currentQuestionIndex++;
        if (currentQuestionIndex > totalQuestionNumber) {
            renderQuestion();

        } else{
            renderScore();
        }
        
    }
});

document.querySelector("#submit-button").addEventListener("click", function() {
   
    const attempt = {
        name: document.querySelector("#name").value,
        score: getUserScore(),
    };

    let leaderboards = localStorage.getItem(LOCAL_STORAGE_KEY);

    if  (leaderboards === null) {
        leaderboards = [];
    } else {
        leaderboards = JSON.parse(leaderboards);
    }

    leaderboards.push(attempt);

    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(leaderboards));


});

document.querySelector("#show-leaderboards-button").addEventListener("click", function(){
    if ( document.querySelector(`#${LEADERBOARDS_PAGE}`).classList.contains("hidden"))  {
        const container = document.querySelector("#leaderboards-items-container");

        container.innerHTML = '';
        const leaderboards = getLeaderboards();

        for (let index = 0; index <leaderboards.length; index ++) {
            const attempt = leaderboards[index];
            const element = document.createElement("li");
            element.classList.add("list-group-item");
            element.textContent = `${attempt.name}` - `${attempt.score}`;
            container.appendChild(element);
        }

        showPage(LEADERBOARDS_PAGE);
    }
    else {
        showPage(START_PAGE);
    }
});