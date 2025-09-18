// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDakyllJhso6UHY7W31nbGlQnT_oaVfgKY",
  authDomain: "recipe-journal-e4b96.firebaseapp.com",
  projectId: "recipe-journal-e4b96",
  storageBucket: "recipe-journal-e4b96.firebasestorage.app",
  messagingSenderId: "441315654511",
  appId: "1:441315654511:web:24378e02d3e121ea8bc69a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore for use in app
export const auth = getAuth(app);
export const db = getFirestore(app);
