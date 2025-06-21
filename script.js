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
const restartBtn = document.getElementById("restart");
const celebrationEl = document.getElementById("celebration");

// Firebase login/logout
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMsg = document.getElementById("welcomeMsg");

loginBtn.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    const user = result.user;
    welcomeMsg.textContent = `Welcome, ${user.displayName}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    document.getElementById("user-input").style.display = "block";
  });
});

logoutBtn.addEventListener("click", () => {
  firebase.auth().signOut().then(() => {
    welcomeMsg.textContent = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    document.getElementById("user-input").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
  });
});

function getUserName() {
  return firebase.auth().currentUser?.displayName || "User";
}

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
      restartBtn.style.display = "block";
      celebrationEl.style.display = "block";
      resultEl.textContent = `${getUserName()}, you scored ${score} out of ${quizData.length}`;
    }
  }, 1500);
});

restartBtn.addEventListener("click", () => {
  document.getElementById("user-input").style.display = "block";
  document.getElementById("quiz-section").style.display = "none";
  resultEl.textContent = "";
  feedbackEl.textContent = "";
  celebrationEl.style.display = "none";
  submitBtn.style.display = "block";
});
