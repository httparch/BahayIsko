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

        let result = describeResult(calculateResult())
        quiz_page.innerHTML = `<p>Congratulations! You've completed the quiz.</p> ${result}`;
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

    let houseCount = [0, 0, 0, 0, 0];
    let arrayOfHouse = [];
    let otherHouse;

    myArray.forEach(item => {
        houseCount[item - 1]++;
    })

    let maxCount = Math.max(...houseCount);
    let maxCountIndex = houseCount.indexOf(Math.max(...houseCount));
    arrayOfHouse.push(maxCountIndex+1)
    
    for(var i = 0; i < houseCount.length -1; i++){
        if((maxCount == houseCount[i]) && maxCountIndex != i){
            otherHouse = i+1;
            arrayOfHouse.push(otherHouse);
        }
    }

    return arrayOfHouse;
}

function getMeaning(index){
    let meaning = ``;
    switch(index){
        case 1:
            meaning = `Hawks`;
            break;
        case 2:
            meaning = `Wolves`;
            break;
        case 3:
            meaning = `Foxes`;
            break;
        case 4:
            meaning = `Dolphins`;
            break;
        case 5:
            meaning = `Owls`;
            break;
        default:
            break;
    }

    return meaning;
}

function describeResult(arrayOfHouse){

    let result = ``;

    if(arrayOfHouse.length == 1){ //solo
        result = `You are a ${getMeaning(arrayOfHouse[0])}`;
    }else if(arrayOfHouse.length == 2){ //dual
        result = `You are a both ${getMeaning(arrayOfHouse[0])} and ${getMeaning(arrayOfHouse[1])}`;
    }

    return result;
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

start_button.addEventListener('mouseover', (e) =>{
    console.log('ger')
    if (e.target.classList.contains('begin')) {
        e.target.style.src = `../assets/beginbutton-hover.svg`;
    }
})