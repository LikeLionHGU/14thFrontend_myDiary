import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyACEp-czrFvst56ucKB-wBIREfCCVPbdWU",
    authDomain: "diary-fca5f.firebaseapp.com",
    projectId: "diary-fca5f",
    storageBucket: "diary-fca5f.firebasestorage.app",
    messagingSenderId: "825469985611",
    appId: "1:825469985611:web:0b876b870cfa4454afbece",
    measurementId: "G-35ZLF958RG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);