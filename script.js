const quizContainer = document.querySelector(".quiz-container");
const resultText = document.getElementById("result-text");
const optionButtons = document.querySelectorAll(".options button");

let score = 0;
let currentQuestion = 0;
let questions; // Variable to store fetched questions

async function fetchQuizData() {
  try {
    const response = await fetch("questions.json");
    if (!response.ok) {
      throw new Error("Failed to fetch quiz data.");
    }
    questions = await response.json();
  } catch (error) {
    console.error(error);
    questions = [];
  }
}

async function buildQuiz() {
  if (!questions) {
    await fetchQuizData();
  }

  if (currentQuestion < 5 && currentQuestion < questions.length) {
    const question = questions[currentQuestion];
    const questionText = document.getElementById("question-text");
    questionText.textContent = `Question ${currentQuestion + 1}/${5}: ${question.question}`;

    optionButtons.forEach((button, index) => {
      button.textContent = question.options[index];
      button.disabled = false; // Re-enable the button
      button.removeEventListener("click", handleAnswer); // Remove previous event listener
      button.addEventListener("click", handleAnswer);
    });
  } else if (currentQuestion === 5) {
    showResults();
  }
}

function handleAnswer() {
  const selectedOption = this.textContent;
  const correctAnswer = questions[currentQuestion].answer;

  if (selectedOption === correctAnswer) {
    score++;
  }

  currentQuestion++;
  buildQuiz();
}

function showResults() {
  resultText.textContent = `You scored ${score} out of 5 questions!`;
}

buildQuiz();