// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBETIeD-kChRoJ23Es3ltjiFKuDQ9lDwPE",
  authDomain: "projet-fin-etudes-8fd33.firebaseapp.com",
  projectId: "projet-fin-etudes-8fd33",
  storageBucket: "projet-fin-etudes-8fd33.appspot.com",
  messagingSenderId: "383408524224",
  appId: "1:383408524224:web:11838f1a9e406eb6221625",
  measurementId: "G-98GECG9D0Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);