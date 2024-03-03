import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyApsn7Rpey6Rfr32spfbIsyQAuSmpSkjV4",
  authDomain: "husban-ali.firebaseapp.com",
  databaseURL: "https://husban-ali-default-rtdb.firebaseio.com",
  projectId: "husban-ali",
  storageBucket: "husban-ali.appspot.com",
  messagingSenderId: "792290891629",
  appId: "1:792290891629:web:d817b1bca866e5c8746c64",
  measurementId: "G-1PZ2CVFNPH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// sign in with email and password
const signInWithEmail = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Signed in:", user);
      window.location.href = "./final.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/user-not-found") {
        alert("No account found with this email address.");
      } else if (errorCode === "auth/wrong-password") {
        alert("Incorrect password.");
      } else {
        alert("An error occurred. Please try again.");
      }

      console.error(errorCode, errorMessage);
    });
};

// sign in with google
const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      console.log("Signed in with Google:", user);
      window.location.href = "./final.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === "auth/popup-closed-by-user") {
        alert("Google sign-in was cancelled.");
      } else {
        alert("An error occurred. Please try again.");
      }

      console.error(errorCode, errorMessage);
    });
};

const signInForm = document.getElementById("signInForm");
signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in all fields.");
    return;
  }

  signInWithEmail(email, password);
});

const googleBtn = document.getElementById("signBtnGoogle");
googleBtn.addEventListener("click", signInWithGoogle);
