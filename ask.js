// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

// Initialize HTML elements
const saveBtn = document.getElementById("saveBtn");

// Event listener for save button
saveBtn.addEventListener("click", async () => {
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const type = document.querySelector('input[name="type"]:checked').value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const description = document.getElementById("description").value;
    const currentUser = auth.currentUser;
    const username = currentUser.displayName;

    // Check if user is signed in
    if (!currentUser) {
        alert("User not signed in!");
        console.error("Please Sign up first!");
        return;
    }

    try {
        // Add blog data to Firestore
        const docRef = await addDoc(collection(db, "Blogs"), {
            title: title,
            category: category,
            type: type,
            status: status,
            description: description,
            username: username,
        });
        console.log("Blog published with ID: ", docRef.id);
        // Redirect to index page or show success message
        window.location.href = "./final.html";
    } catch (error) {
        console.log("Error adding blog: ", error);
        alert("Something went wrong!")
    }
});

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

