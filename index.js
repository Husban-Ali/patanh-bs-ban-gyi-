
// --------NAVBAR-------


let humburger = document.getElementById("humburger");

let buttonsDiv = document.querySelector(".buttons")
buttonsDiv.classList.add("menuShow")


humburger.addEventListener("click",()=>{
  buttonsDiv && buttonsDiv.classList.toggle("menuShow")
})

// --------FireBase Initilization-------

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


let writeBtn = document.getElementById("writeBtn");
let loginBtn = document.getElementById("loginBtn");
let currentPage = window.location.pathname.split('/').pop();



const checkLogin =(e)=>{
e.preventDefault();
onAuthStateChanged(auth, (user) => {
  if (user) {
   
    const uid = user.uid;
    if(currentPage !== "ask.html"){
      window.location.href="ask.html"
    }


    // ...
  } else {
    // User is signed out
    // ...
    window.location.href="login.html";
    console.log("failed")
  }

  
});
}

writeBtn && writeBtn.addEventListener("click",checkLogin)

// let user ;

const checkLogin2 =()=>{

onAuthStateChanged(auth, (user) => {
  if (user) {
   
    const uid = user.uid;
 
  //  user = auth.currentUser;
  console.log(auth.currentUser)
    // ...
  } else {
    // User is signed out
    // ...
  
  }

  
  
});
}

checkLogin2()