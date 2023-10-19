const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
        answer: "Blue Whale"
    },
    {
        question: "What is the powerhouse of the cell?",
        options: ["Mitochondria", "Nucleus", "Ribosome", "Vacuole"],
        answer: "Mitochondria"
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
        answer: "William Shakespeare"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionButtons = document.querySelectorAll(".options button");
const resultText = document.getElementById("result-text");

function showQuestion(question) {
    questionText.textContent = question.question;
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
    });
}

function checkAnswer(selectedOption) {
    if (selectedOption === questions[currentQuestionIndex].answer) {
        score++;
        resultText.textContent = "Correct!";
    } else {
        resultText.textContent = "Wrong. The correct answer is: " + questions[currentQuestionIndex].answer;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        showResult();
    }
}

function showResult() {
    questionText.textContent = "Quiz Completed!";
    resultText.textContent = "Your Score: " + score + " out of " + questions.length;
    optionButtons.forEach((button) => {
        button.style.display = "none";
    });
}

showQuestion(questions[currentQuestionIndex]);

optionButtons.forEach((button) => {
    button.addEventListener("click", () => checkAnswer(button.textContent));
});
