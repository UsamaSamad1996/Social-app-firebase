// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const API_KEY = process.env.REACT_APP_FIREBASE_KEY;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "blog-app-firebase-6a9a6.firebaseapp.com",
  projectId: "blog-app-firebase-6a9a6",
  storageBucket: "blog-app-firebase-6a9a6.appspot.com",
  messagingSenderId: "434037738300",
  appId: "1:434037738300:web:61ca41c962c9ead2bd6c39",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
