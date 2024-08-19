const quizData = [
  {
    question: "1.what are the two methods of forms transfer?",
    choices: [
      "A)Get and receive",
      "B)Get and post",
      "C)Post and receive",
      "D)Post and take",
    ],
    correct: "B)Get and post",
  },
  {
    question: "2.what should be the very last thing in an HTML document?",
    choices: ["A)The heading", "Title", "C)Body", "D)Doc type"],
    correct: "D)Doc type",
  },
  {
    question: "3.What of the following is not an HTML tag?",
    choices: [
      "A)Doctype",
      "B)P",
      "C)table",
      "D)style",
    ],
    correct: "A)Doctype",
  },
  {
    question: "4.how many ways can apply colors in CSS?",
    choices: ["A)9", "B)5", "C)3", "D)7"],
    correct: "D)7",
  },
  {
    question: "5.How can you clear the floated element?",
    choices: [
      "A)Clear:both",
      "B)Press the delete key",
      "C)Tel tag",
      "D)Strike tag",
    ],
    correct: "A)Clear:both",
  },
  {
    question:
      "6.Which of the following is describe as a collection of images put in a single image?",
    choices: [
      ".A)Float",
      "B)Align",
      "C)sprite",
      "D)Image",
    ],
    correct: "C)sprite",
  },
  {
    question: "7.A collection of data containing both properities and methods is called?",
    choices: ["A)Tag", "B)Selector", "C)Object", "D)Class"],
    correct: "C)Object",
  },
  {
    question: "8.In javascript,'this' refers to the object that______the object. ",
    choices: [
      "A)receives;",
      "B)Depends;",
      "C)Owns;",
      "D)Direct;",
    ],
    correct: "C)Owns;",
  },
  {
    question: "9.what is the runtime complexity of fibonacci sequences?",
    choices: ["A)O(on)", "B)O(2n)", "C)(n)", "D)N(o)"],
    correct: "A)O(on)",
  },
  {
    question:
      "10.Which of the following is an instruction to the web browser about what version of the mark up language the page is written in?",
    choices: ["A)Markup", "B)Doctype", "C)DSS", "D)Meta tag"],
    correct: "B)Doctype",
  },
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const feedbackContainer = document.getElementById("feedback");
const submitBtn = document.getElementById("submitBtn");
const restartBtn = document.getElementById("restartBtn");
const resultContainer = document.getElementById("result");
const questionCounter = document.getElementById("questionCounter");
const feedbackForm = document.getElementById("feedbackForm");
const feedbackInput = document.getElementById("feedbackInput");
const sendFeedbackBtn = document.getElementById("sendFeedbackBtn");

function loadQuiz() {
  clearQuiz();
  const currentQuestion = quizData[currentQuestionIndex];
  const questionElement = document.createElement("div");
  questionElement.classList.add("question");
  questionElement.innerText = currentQuestion.question;
  quizContainer.appendChild(questionElement);

  const choicesList = document.createElement("ul");
  choicesList.classList.add("choices");

  currentQuestion.choices.forEach((choice) => {
    const choiceItem = document.createElement("li");
    const choiceButton = document.createElement("button");
    choiceButton.innerText = choice;
    choiceButton.addEventListener("click", () => selectAnswer(choice));
    choiceItem.appendChild(choiceButton);
    choicesList.appendChild(choiceItem);
  });

  quizContainer.appendChild(choicesList);
  updateQuestionCounter();
}

function selectAnswer(choice) {
  const currentQuestion = quizData[currentQuestionIndex];
  let feedback = "";

  if (choice === currentQuestion.correct) {
    score++;
    feedback = "Correct! Well done.";
  } else {
    feedback = `Incorrect. The correct answer is "${currentQuestion.correct}".`;
  }

  showFeedback(feedback);

  // Move to the next question after a short delay
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      loadQuiz();
    } else {
      showResults();
      showFeedbackForm();
    }
  }, 2000); // 2-second delay to show feedback
}

function showFeedback(feedback) {
  feedbackContainer.innerText = feedback;
}

function clearQuiz() {
  quizContainer.innerHTML = "";
  feedbackContainer.innerText = "";
}

function showResults() {
  clearQuiz();
  resultContainer.innerText = `You scored ${score} out of ${quizData.length}`;
  submitBtn.style.display = "none";
  restartBtn.style.display = "block";
}

function updateQuestionCounter() {
  questionCounter.innerText = `Question ${currentQuestionIndex + 1} of ${
    quizData.length
  }`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  submitBtn.style.display = "block";
  restartBtn.style.display = "none";
  feedbackForm.style.display = "none";
  sendFeedbackBtn.style.display = "none";
  loadQuiz();
}

function showFeedbackForm() {
  feedbackForm.style.display = "block";
  sendFeedbackBtn.style.display = "block";
}

function sendFeedback() {
  const feedbackText = feedbackInput.value;
  if (feedbackText.trim() !== "") {
    alert("Thank you for your feedback: " + feedbackText);
    feedbackInput.value = ""; // Clear the input field
  } else {
    alert("Please enter your feedback before sending.");
  }
}

// Initialize Quiz
loadQuiz();

// Add event listener to restart and send feedback buttons
restartBtn.addEventListener("click", restartQuiz);
sendFeedbackBtn.addEventListener("click", sendFeedback);
