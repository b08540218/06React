// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ9LO8ka-zv-5XqgbVE-Jve81QikCmmWI",
  authDomain: "projectapps-b22bd.firebaseapp.com",
  projectId: "projectapps-b22bd",
  storageBucket: "projectapps-b22bd.firebasestorage.app",
  // storageBucket: "projectapps-b22bd.appspot.com", // ✅ 수정!!
  messagingSenderId: "242636432854",
  appId: "1:242636432854:web:a94321a874b940ac33f077",
  measurementId: "G-PSHWZQN6LM"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
