// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYLShUPoHo83BXb-12ZP_hQjGGKIi80OE",
  authDomain: "flashcardsaas-93199.firebaseapp.com",
  projectId: "flashcardsaas-93199",
  storageBucket: "flashcardsaas-93199.appspot.com",
  messagingSenderId: "89158228948",
  appId: "1:89158228948:web:f31d722011d6ab18151441",
  measurementId: "G-EVSNL6GV6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
