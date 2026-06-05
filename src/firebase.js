import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3oS0lEwiItoLEP9-rY3wFuCVEIapxgUk",
  authDomain: "rent-nest-525b8.firebaseapp.com",
  databaseURL: "https://rent-nest-525b8-default-rtdb.firebaseio.com",
  projectId: "rent-nest-525b8",
  storageBucket: "rent-nest-525b8.firebasestorage.app",
  messagingSenderId: "820849206956",
  appId: "1:820849206956:web:2f35cf4b7b7fcd4769e109"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;