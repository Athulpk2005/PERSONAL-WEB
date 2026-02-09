import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDGoZOgl9K7aLDGlBh42v-HZ459JsC_PpM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-36eaf.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-36eaf",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-36eaf.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "651955508421",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:651955508421:web:5901eed2303374d68c8cac",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-XBXKVNWVF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth, collection, addDoc, getDocs, doc, updateDoc, serverTimestamp, signInWithEmailAndPassword, signOut, onAuthStateChanged };
