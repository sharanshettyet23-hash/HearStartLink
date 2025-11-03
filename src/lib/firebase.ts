// firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your actual config from Firebase Console (paste below)
const firebaseConfig = {
  apiKey: "AIzaSyAEXAMPLExxxxxx",
  authDomain: "your-app-id.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef12345"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services you use
export const auth = getAuth(app);
export const db = getFirestore(app);
