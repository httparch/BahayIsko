import { quiz } from "./data/quiz.js";

// Buttons
let start_button = document.querySelector('.begin-button');
const myArray = [];

// Containers
let quiz_page = document.querySelector('.quiz-page');
let start_page = document.querySelector('.start-page');

let index = 0;

function nextQuestion() {
    if (index >= quiz.length) {
        calculateResult()
        quiz_page.innerHTML = `<p>Congratulations! You've completed the quiz.</p>`;
        return;
    }

    let currentQuestion = quiz[index];

    let html = `
        <div class="quiz-container">
            <p class="question">${currentQuestion.question}</p>
            <img src="${currentQuestion.image || ''}" alt="${currentQuestion.imageAlt || 'Question Image'}">
            <button class="choices" data-question-id="1">${currentQuestion.choices.A}</button>
            <button class="choices" data-question-id="2">${currentQuestion.choices.B}</button>
            <button class="choices" data-question-id="3">${currentQuestion.choices.C}</button>
            <button class="choices" data-question-id="4">${currentQuestion.choices.D}</button>
            <button class="choices" data-question-id="5">${currentQuestion.choices.E}</button>
        </div>
    `;

    quiz_page.innerHTML = html; 
}

function calculateResult(){
    myArray.forEach(item => {

    })
}


start_button.addEventListener('click', () => {
    quiz_page.style.display = 'block';
    start_page.style.display = 'none';
    nextQuestion(); 
});


quiz_page.addEventListener('click', (e) => {
    if (e.target.classList.contains('choices')) {
        let choice = e.target.dataset.questionId;
        myArray.push(choice);

        index++;  
        nextQuestion(); 
    }
});

