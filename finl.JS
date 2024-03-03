//<------------Import FireBase------------------->
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js"; 
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js"; 
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

//<--------------API Key------------->
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

//<---------Initilize FireBase------------->

const app = initializeApp(firebaseConfig); 
const auth = getAuth(app); 
const db = getFirestore(app);

//<--------------Initilize HTML----------->

const blogsContainer = document.getElementById("blogsContainer"); 
blogsContainer.innerHTML = "";

// Get a reference to the logout button 
const logoutButton = document.getElementById('logout-button');

// Add a click event listener to the logout button 
logoutButton.addEventListener('click', () => { 
    // Sign out the user 
    auth.signOut() 
        .then(() => { 
            // Redirect the user to the login page or show a success message 
            window.location.href = 'index.html'; 
            // replace with your login page URL 
        }) 
        .catch((error) => { 
            // Handle any errors that occur during the sign out process 
            console.error(error); 
        }); 
}); 

//<------------Functions------------>
//<------------Functions------------>

/// Function to toggle the input field when clicking on the post
const toggleInput = (event) => {
  const post = event.currentTarget;
  const input = post.querySelector("input");
  input.style.display = input.style.display === "block" ? "none" : "block";
  // Increase the height of the post div when the input field is shown
  if (input.style.display === "block") {
    post.style.minHeight = "150px"; // Adjust the height as needed
  } else {
    post.style.minHeight = "100px"; // Reset the height when input field is hidden
  }
};

//<--------------Fetch Blogs from Firebase-------------->

getDocs(collection(db, "Blogs")).then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const blogData = doc.data();
    const blogElement = document.createElement("div");
    blogElement.className = "post text-white pt-2 px-3 pb-1 bg-[#242526] w-[80%] my-[10px] mx-[auto]";
    blogElement.innerHTML = `
      <h2 class="text-3xl font-semibold">${blogData.title}</h2>
      <p>${blogData.description}</p>
      <span class="font-semibold"><i class="fa-solid fa-user font-semibold"></i> ${blogData.username}</span>

    `;

    // Add event listener to toggle input field when clicking on the post
    blogElement.addEventListener("click", toggleInput);

    blogsContainer.appendChild(blogElement);
  });
}).catch((error) => {
  console.error("Error getting blogs: ", error);
});

const checkLogin =(e)=>{
  e.preventDefault();
  onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;

      // Extracting the filename from the URL path
      const path = window.location.pathname;
      const page = path.split("/").pop(); // gets the last element after splitting by "/"

      // Check if the current page is not "ask.html"
      if(page !== "ask.html"){
        window.location.href="ask.html"
      }
  
      // ...
    } else {
      // User is signed out
      window.location.href="login.html";
      console.log("failed")
    }
  });
}

writeBtn && writeBtn.addEventListener("click",checkLogin)

const checkLogin2 =()=>{
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      // Log current user
      console.log(auth.currentUser)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
}

checkLogin2()
