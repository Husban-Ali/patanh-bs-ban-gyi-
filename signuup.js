import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

const email = document.getElementById("mail");
const password = document.getElementById("pass");
const loginBtn = document.getElementById("signup");
const userName = document.getElementById("uname");

auth.onAuthStateChanged((user) => {
    if (user) {
        if (user.emailVerified) {
            window.location.href = "./index.html";
            console.log(userName.value + " you have signed up successfully!");
        } else {
            console.log("Email is not verified.");
        }
    } else {
        console.log("User is signed out.");
    }
});

const signUp = () => {
    const username = userName.value;
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            updateProfile(auth.currentUser, {
                displayName: username
            }).then(() => {
                alert("Username added successfully!" + username)
            }).catch((error) => {
                alert("Error occurred!")
            });
            const user = userCredential.user;
            sendEmailVerification(user).then(() => {
                alert("Verification email sent. Please verify your email before signing in.");
            }).catch((error) => {
                alert("Error sending verification email:", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("Problem detected: " + errorMessage);
        });
};

loginBtn.addEventListener('click', signUp);
