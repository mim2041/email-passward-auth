// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAypmfIwBUvZ_oWUKZ4NG7JoeaeoNRb5Y",
  authDomain: "email-password-auth-dfc0e.firebaseapp.com",
  projectId: "email-password-auth-dfc0e",
  storageBucket: "email-password-auth-dfc0e.appspot.com",
  messagingSenderId: "497630406213",
  appId: "1:497630406213:web:667190bea970c62468252c",
  measurementId: "G-KX0PJKYF2G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;