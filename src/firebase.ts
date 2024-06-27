// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrCkKggdem2rMSQsaDBwfES95iWS7414k",
  authDomain: "giwibi.firebaseapp.com",
  projectId: "giwibi",
  storageBucket: "giwibi.appspot.com",
  messagingSenderId: "101205248599",
  appId: "1:101205248599:web:3782b13ffebac3c053b112",
  measurementId: "G-2QER5YE4M0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
