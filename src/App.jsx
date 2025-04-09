import { useState, useEffect } from "react";
import { AddProducts } from "./components/AddProducts/AddProducts";
import { ListProducts } from "./components/ListProducts/ListProducts";
import { signInWithGoogle, signOutUser } from "./components/AuthService";
import { auth } from "./components/firebaseConfig";  // Importar desde firebaseConfig
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
            setUser(loggedInUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const loggedInUser = await signInWithGoogle();
            if (loggedInUser) {
                setUser(loggedInUser);
            }
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await signOutUser();
            setUser(null);
        } catch (error) {
            console.error("Error durante el cierre de sesión:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            {!user ? (
                <div className="login-container">
                    <h2>Bienvenidos MarketGo</h2>
                    <button 
                        className="login-button" 
                        onClick={handleLogin}
                        disabled={loading}
                    >
                        {loading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
                    </button>
                </div>
            ) : (
                <>
                    <div className="header">
                        <h2>Bienvenido, {user.displayName || "Usuario"}</h2>
                        <button className="logout-button" onClick={handleLogout} disabled={loading}>
                            {loading ? "Cerrando sesión..." : "Cerrar sesión"}
                        </button>
                    </div>

                    <div className="productos-container">
                        <div className="form-container">
                            <h2>Agregar Producto</h2>
                            <AddProducts />
                        </div>
                        <div className="lista-container">
                            <h2>Lista de Productos</h2>
                            <ListProducts />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
