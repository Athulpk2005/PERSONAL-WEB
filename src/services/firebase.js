import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyD1NvgcidrdUCHdxTJ2CYUzJ6T2jKodqUw",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "athul-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "athul-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "athul-dev.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "636522335240",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:636522335240:web:e7f76fffa640948b6dd5bd",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-1S7LN8PKNP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, signInWithEmailAndPassword, signOut, onAuthStateChanged };
