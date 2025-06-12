import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: "AIzaSyBxbYVo6BCGqMDjwoxToEjBy-wDO7DKrVQ",
    // authDomain: "commshare-8adfd.firebaseapp.com",
    // projectId: "commshare-8adfd",
    // storageBucket: "commshare-8adfd.firebasestorage.app",
    // messagingSenderId: "140773965686",
    // appId: "1:140773965686:web:f9ba51de3b35db35100457"
    apiKey: "AIzaSyBpuHeiWgqh1RIx8Io0EFUB8qVfMUqZ41s",
    authDomain: "x-note-5fd32.firebaseapp.com",
    projectId: "x-note-5fd32",
    storageBucket: "x-note-5fd32.appspot.com",
    messagingSenderId: "220127384688",
    appId: "1:220127384688:web:f92c5814eba1d18c1050b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
