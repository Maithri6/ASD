import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyAa6-3o7U_4Y6EkIkr8RxosWuXIyGdjsJs",
  authDomain: "autism-e8db0.firebaseapp.com",
  projectId: "autism-e8db0",
  storageBucket: "autism-e8db0.firebasestorage.app",
  messagingSenderId: "286437109901",
  appId: "1:286437109901:web:06f438a0839811d4c032c4",
  measurementId: "G-DBVDG5KZ2L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);