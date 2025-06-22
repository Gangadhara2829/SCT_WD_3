// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVZ7aJqvALfPhB7lzGF1wdh4wQBKsoYJU",
  authDomain: "quiz-app-f0b2b.firebaseapp.com",
  projectId: "quiz-app-f0b2b",
  storageBucket: "quiz-app-f0b2b.appspot.com",
  messagingSenderId: "880241252847",
  appId: "1:880241252847:web:107f922e3619e1be8f7e1a",
  measurementId: "G-TE712E9LEG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Login handler
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log("Welcome,", user.displayName);
      // Redirect to dashboard
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      console.error("Login Error:", error.message);
      alert("Login failed: " + error.message);
    });
});
