
import { getAuth } from 'firebase/auth'
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDqJ9r7rJBBkQWRnlOWjZy6ohAJ5RSxfm8",
  authDomain: "chat-19455.firebaseapp.com",
  projectId: "chat-19455",
  storageBucket: "chat-19455.appspot.com",
  messagingSenderId: "1042517694453",
  appId: "1:1042517694453:web:dce364a05a64dafd8732bc"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();