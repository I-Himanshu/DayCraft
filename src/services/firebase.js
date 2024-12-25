// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzv8Agq9iiHSvudDzC5yy9lngT4b-VFYA",
  authDomain: "day-craft-2025.firebaseapp.com",
  projectId: "day-craft-2025",
  storageBucket: "day-craft-2025.firebasestorage.app",
  messagingSenderId: "518792514045",
  appId: "1:518792514045:web:35ac66bd04ba90a18cf194",
  measurementId: "G-4TN52VX9E0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const firestore = getFirestore();