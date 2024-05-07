// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyBOWAxmW8lkW3kSlBrfohvCf6wPL489FDM",
  authDomain: "weather-d6041.firebaseapp.com",
  projectId: "weather-d6041",
  storageBucket: "weather-d6041.appspot.com",
  messagingSenderId: "852869360476",
  appId: "1:852869360476:web:d9605a976ace766d516f99",
  measurementId: "G-MPHT8WLX1Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);