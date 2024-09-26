import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjXAfUpZ-WWOCPQPXhwUAAgnzA1qWhAb8",
  authDomain: "complain-nstu.firebaseapp.com",
  projectId: "complain-nstu",
  storageBucket: "complain-nstu.appspot.com",
  messagingSenderId: "71111904151",
  appId: "1:71111904151:web:fc5619671ddb8c4aa892d2",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
