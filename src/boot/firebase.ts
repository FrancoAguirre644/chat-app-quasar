import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANeWNSQ9NCyAbEi4BTJaGMbORirZuM68A",
  authDomain: "chat-app-f1e9c.firebaseapp.com",
  projectId: "chat-app-f1e9c",
  storageBucket: "chat-app-f1e9c.appspot.com",
  messagingSenderId: "692660781495",
  appId: "1:692660781495:web:e9556d34b2a01ccade2832"
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);

export const auth = getAuth(app);


