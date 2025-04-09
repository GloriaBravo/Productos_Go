import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, EmailAuthProvider, PhoneAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importar Firestore si lo necesitas

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDS421b5Cqxtq8WyxbrNCZLxdHNcgmvHQI",
    authDomain: "lista-de-productos-58644.firebaseapp.com",
    projectId: "lista-de-productos-58644",
    storageBucket: "lista-de-productos-58644.firebasestorage.app",
    messagingSenderId: "421139492537",
    appId: "1:421139492537:web:899c432d8e07e65b167568"
};

// Inicializar la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(app);
export const db = getFirestore(app); // Inicializar Firestore (si lo necesitas)

// Inicializar y configurar proveedores de autenticación
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account", // Esto ayuda a que el cuadro de selección de cuenta aparezca en todos los casos
});

export const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
    prompt: "select_account", // Opcional, para forzar la selección de cuenta
});

export const emailProvider = new EmailAuthProvider(); // Para autenticación con correo y contraseña

export const phoneProvider = new PhoneAuthProvider(auth); // Para autenticación con teléfono
