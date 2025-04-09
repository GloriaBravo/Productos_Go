import { useState } from "react"; // Asegúrate de importar useState desde React
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "./firebaseConfig"; // Importar desde firebaseConfig
import { useNavigate } from "react-router-dom"; // Usar `useNavigate` en lugar de `useHistory`

// Hook para manejar la autenticación
export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // Usar useNavigate para redirección

    // Retornar los estados de carga y error
    return { loading, error, navigate, setLoading, setError };
};

// Función para iniciar sesión con Google
export const signInWithGoogle = async (navigate, setLoading, setError) => {
    setLoading(true);
    setError(null);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Usuario autenticado:", result.user);
        // Redirigir al usuario a una página después de iniciar sesión
        navigate("/dashboard"); // Cambia la ruta según tu estructura
        return result.user;
    } catch (error) {
        console.error("Error en la autenticación con Google:", error);
        setError("Hubo un error al iniciar sesión con Google. Inténtalo nuevamente.");
    } finally {
        setLoading(false);
    }
};

// Función para cerrar sesión
export const signOutUser = async (navigate, setLoading, setError) => {
    setLoading(true);
    setError(null);
    try {
        await signOut(auth);
        console.log("Usuario cerró sesión");
        // Redirigir a la página de inicio de sesión después de cerrar sesión
        navigate("/login");
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        setError("Hubo un error al cerrar sesión. Inténtalo nuevamente.");
    } finally {
        setLoading(false);
    }
};
