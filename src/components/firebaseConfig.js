import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDS421b5Cqxtq8WyxbrNCZLxdHNcgmvHQI",
    authDomain: "lista-de-productos-58644.firebaseapp.com",
    projectId: "lista-de-productos-58644",
    storageBucket: "lista-de-productos-58644.firebasestorage.app",
    messagingSenderId: "421139492537",
    appId: "1:421139492537:web:899c432d8e07e65b167568"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Se exporta `auth`
export const googleProvider = new GoogleAuthProvider(); // Se exporta `googleProvider`


