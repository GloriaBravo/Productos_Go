import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ListProducts } from "../components/ListProducts";
import { AddProducts } from "../components/AddProducts";
import { useAuth } from "../services/AuthService";
import { auth } from "../ProductContext/firebaseConfig"; // Ajusta la ruta según tu estructura
import "../styles/DASHBOARD.css"; // Asegúrate de que este archivo exista

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const { loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((loggedInUser) => {
      setUser(loggedInUser);
      if (!loggedInUser) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/login");
    } catch (error) {
      setError("Error al cerrar sesión. Intenta nuevamente.");
    }
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      {error && <div className="error-message">{error}</div>}
      <div className="header">
        <h2>Bienvenido, {user.displayName || "Usuario"}</h2>
        <button
          className="logout-button"
          onClick={handleLogout}
          disabled={loading}
        >
          {loading ? "Cerrando sesión..." : "Cerrar sesión"}
        </button>
      </div>

      <div className="productos-container">
        <div className="form-container">
          <AddProducts />
        </div>
        <div className="lista-container">
          <ListProducts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
