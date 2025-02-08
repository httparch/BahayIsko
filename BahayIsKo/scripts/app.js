import { quiz } from "./data/quiz.js";
import { houses } from "./data/houses.js";
// Buttons
let start_button = document.querySelector('.begin-button');
const myArray = [];

// Containers
let quiz_page = document.querySelector('.quiz-page');
let start_page = document.querySelector('.start-page');
let result_page = document.querySelector('.result-page');

let index = 0;

function nextQuestion() {
    if (index >= quiz.length) {

        let result = describeResult(calculateResult());
        result_page.style.display = 'block';
        quiz_page.style.display = 'none';
        result_page.innerHTML = result;
        return;
    }

    let currentQuestion = quiz[index];

    let html = `
        <div class="quiz-container">
            <p class="question">Q${index+1}/Q10: ${currentQuestion.question}</p>
            <div class="image-container"><img class="quiz-image" src="${currentQuestion.image || ''}" alt="${currentQuestion.imageAlt || 'Question Image'}"></>
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
    console.log(typeof arrayOfHouse[0])
    return arrayOfHouse;
}

function describeResult(arrayOfHouse){

    let result = ``;

    if(arrayOfHouse.length == 1){ //solo
        const num1 = arrayOfHouse[0];
        result = `<p>You are from ${houses[num1].name}</p>
                    <img src="${houses[num1].image}" alt="">
                    <button class="restart">Take again</button>`
    }else if(arrayOfHouse.length == 2){ //dual
        const num1 = arrayOfHouse[0];
        const num2 = arrayOfHouse[1];
        result = `<p>You are mixed breed of ${houses[num1].name} and ${houses[num2].name}</p>
                    <img src="${houses[num1].image}" alt=""> 
                    <img src="${houses[num2].image}" alt=""> 
                    <button class="restart">Take again</button>`
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