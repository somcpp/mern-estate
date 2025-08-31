// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7860c.firebaseapp.com",
  projectId: "mern-estate-7860c",
  storageBucket: "mern-estate-7860c.firebasestorage.app",
  messagingSenderId: "911679839508",
  appId: "1:911679839508:web:b296eddf156dad6e133601"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);