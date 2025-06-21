// firebase-login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVZ7aJqvALfPhB7lzGF1wdh4wQBKsoYJU",
  authDomain: "quiz-app-f0b2b.firebaseapp.com",
  projectId: "quiz-app-f0b2b",
  storageBucket: "quiz-app-f0b2b.firebasestorage.app",
  messagingSenderId: "880241252847",
  appId: "1:880241252847:web:107f922e3619e1be8f7e1a",
  measurementId: "G-TE712E9LEG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMsg = document.getElementById("welcomeMsg");
const proceedBtn = document.getElementById("proceedBtn");

loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      welcomeMsg.textContent = `Welcome, ${user.displayName}!`;
      localStorage.setItem("quizUser", user.displayName);
      loginBtn.style.display = "none";
      logoutBtn.style.display = "inline-block";
      proceedBtn.style.display = "inline-block";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});

logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    welcomeMsg.textContent = "";
    localStorage.removeItem("quizUser");
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    proceedBtn.style.display = "none";
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    welcomeMsg.textContent = `Welcome, ${user.displayName}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    proceedBtn.style.display = "inline-block";
  }
});
