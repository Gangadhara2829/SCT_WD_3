const quizTopics = {
  html: [
    { question: "What does HTML stand for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"], answer: "Hyper Text Markup Language", explanation: "HTML is used to structure web content." },
    { question: "What element is used for JavaScript?", options: ["<js>", "<javascript>", "<script>", "<code>"], answer: "<script>", explanation: "Use <script> to embed JS in HTML." }
  ],
  css: [
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"], answer: "Cascading Style Sheets", explanation: "CSS styles the appearance of HTML." },
    { question: "Property to change background color?", options: ["color", "bgcolor", "background-color", "background"], answer: "background-color", explanation: "Use background-color to change background." }
  ],
  javascript: [
    { question: "Which company developed JavaScript?", options: ["Google", "Microsoft", "Sun Microsystems", "Netscape"], answer: "Netscape", explanation: "JS was developed by Netscape." },
    { question: "Single-line comment in JS?", options: ["//", "<!-- -->", "#", "--"], answer: "//", explanation: "Use // for single-line comments." }
  ]
};

let quizData = [], currentQuestion = 0, score = 0;
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit");
const celebrationEl = document.getElementById("celebration");
const finishBtn = document.getElementById("finish");

document.getElementById("startQuiz").addEventListener("click", () => {
  const topic = document.getElementById("topic").value;
  quizData = quizTopics[topic];
  currentQuestion = 0;
  score = 0;
  document.getElementById("quiz-section").style.display = "block";
  loadQuestion();
});

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  feedbackEl.textContent = "";
  answersEl.innerHTML = "";
  current.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `<label><input type="radio" name="answer" value="${option}" /> ${option}</label>`;
    answersEl.appendChild(li);
  });
}

submitBtn.addEventListener("click", () => {
  const selected = document.querySelector('input[name="answer"]:checked');
  if (!selected) return alert("Please select an answer");
  const answer = selected.value;
  const current = quizData[currentQuestion];
  if (answer === current.answer) {
    score++;
    feedbackEl.textContent = "✅ Correct! " + current.explanation;
  } else {
    feedbackEl.textContent = "❌ Incorrect! " + current.explanation;
  }
  currentQuestion++;
  submitBtn.disabled = true;
  setTimeout(() => {
    if (currentQuestion < quizData.length) {
      loadQuestion();
      submitBtn.disabled = false;
    } else {
      questionEl.textContent = "Quiz Completed!";
      answersEl.innerHTML = "";
      submitBtn.style.display = "none";
      finishBtn.style.display = "block";
      celebrationEl.style.display = "block";
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizTotal", quizData.length);
    }
  }, 1500);
});
