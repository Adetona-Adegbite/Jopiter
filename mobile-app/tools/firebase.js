// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAYApCGWFXn9n8PE-wmYNYhi2Hu0GAFSWA",
  authDomain: "react-auth-7f9ff.firebaseapp.com",
  projectId: "react-auth-7f9ff",
  storageBucket: "react-auth-7f9ff.appspot.com",
  messagingSenderId: "31005795024",
  appId: "1:31005795024:web:c1348a0560a1e955c2f4d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
