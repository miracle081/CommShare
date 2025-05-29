import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBxbYVo6BCGqMDjwoxToEjBy-wDO7DKrVQ",
    authDomain: "commshare-8adfd.firebaseapp.com",
    projectId: "commshare-8adfd",
    storageBucket: "commshare-8adfd.firebasestorage.app",
    messagingSenderId: "140773965686",
    appId: "1:140773965686:web:f9ba51de3b35db35100457"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)