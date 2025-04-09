import React, { useState } from "react";
import { useHistory } from "react-router-dom"; // Para redirigir después de la autenticación
import { signInWithGoogle } from "../AuthService";

const Login = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Estado de carga
  const history = useHistory(); // Usamos useHistory para la redirección

  const handleLogin = async () => {
    setError(null); // Reseteamos el error antes de intentar iniciar sesión
    setLoading(true); // Inicia el estado de carga

    const user = await signInWithGoogle();

    if (user && user.displayName) {
      alert(`Bienvenido, ${user.displayName}`);
      history.push("/dashboard"); // Redirige a la página principal después del login
    } else {
      setError("No se pudo iniciar sesión. Inténtalo de nuevo.");
    }

    setLoading(false); // Detener el estado de carga
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p className="error-message">{error}</p>}
      
      <button onClick={handleLogin} className="login-button" disabled={loading}>
        {loading ? "Iniciando sesión..." : "Iniciar sesión con Google"}
      </button>
    </div>
  );
};

export default Login;




