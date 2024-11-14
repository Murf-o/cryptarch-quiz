// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAgtdl4so1Bd7mF-h3Q0bVeIqMeOoHhU44",
  authDomain: "cryptarch-quiz.firebaseapp.com",
  projectId: "cryptarch-quiz",
  storageBucket: "cryptarch-quiz.firebasestorage.app",
  messagingSenderId: "528108940169",
  appId: "1:528108940169:web:ea50c63566e82db3288f58",
  measurementId: "G-JMTGFJ4XD2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { app, auth };
