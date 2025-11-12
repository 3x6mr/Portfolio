// Import the functions you need from the SDKs you need
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM6VCS3J9bsXYzw2Zg8mEyzYdELU1RhTI",
  authDomain: "interview-ai-58ef3.firebaseapp.com",
  projectId: "interview-ai-58ef3",
  storageBucket: "interview-ai-58ef3.firebasestorage.app",
  messagingSenderId: "1011433455841",
  appId: "1:1011433455841:web:9db59265d82c6888e177a0",
  measurementId: "G-CGBTR33WV1",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
