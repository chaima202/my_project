// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApgxpctgCshPYmdjuLUqWCbxhEiOiLvXc",
  authDomain: "medicinetracker-35a0b.firebaseapp.com",
  projectId: "medicinetracker-35a0b",
  storageBucket: "medicinetracker-35a0b.firebasestorage.app",
  messagingSenderId: "495377267414",
  appId: "1:495377267414:web:6c46476c70a4e674a62777",
  measurementId: "G-F9Y1D85QYQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);


export const db=getFirestore(app)
