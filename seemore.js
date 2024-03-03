
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, query, onSnapshot, where, addDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";


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
document.addEventListener('DOMContentLoaded', function() {
  const messageInput = document.getElementById('messageInput');
  const sendMessageButton = document.getElementById('sendMessage');
  const messagesContainer = document.getElementById('messagesContainer');

  sendMessageButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message !== '') {
      const user = auth.currentUser;
      const userName = user ? user.displayName : "Anonymous";
      const timestamp = new Date(); // Use current date and time

      try {
        await addDoc(collection(db, 'messages'), {
          userName: userName,
          message: message,
          timestamp: timestamp
        });
        messageInput.value = ''; // Clear input field after sending message
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  });

  // Listen for new messages and display them
  const q = query(collection(db, 'messages'));
  onSnapshot(q, function(snapshot) {
    messagesContainer.innerHTML = ''; // Clear previous messages
    snapshot.forEach(function(doc) {
      const messageData = doc.data();
      displayMessage(messageData.userName, messageData.message, messageData.timestamp.toMillis());
    });
  });

  // Function to display messages
  function displayMessage(userName, message, timestamp) {
    const messageElement = document.createElement('div');
    const timeAgo = getTimeAgo(timestamp); // Calculate time ago
    messageElement.innerHTML = `<i class="fa-solid fa-user font-semibold"></i><strong>${userName}:</strong> (${timeAgo} ago)<br><br><p>${message}</p><hr>`;
    messagesContainer.appendChild(messageElement);
  }

  // Function to calculate time ago
  function getTimeAgo(timestamp) {
    const now = new Date().getTime();
    const seconds = Math.floor((now - timestamp) / 1000);

    // Convert seconds to minutes, hours, days, etc.
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(seconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  }
});


