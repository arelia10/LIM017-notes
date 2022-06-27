// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.9/firebase-auth.js';
//import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqqWTRfNb0SG2to445gcGDNmDJ2lzof0Q",
  authDomain: "love-notes-d278f.firebaseapp.com",
  projectId: "love-notes-d278f",
  storageBucket: "love-notes-d278f.appspot.com",
  messagingSenderId: "467735356915",
  appId: "1:467735356915:web:64ca00e9a743ea071dde86",
  measurementId: "G-ZBCQDC5Y25"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(app);