import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css"; // 👈 Importar desde src
import logoCarrito from "/assets/img/logo_carrito.png"; // 👈 Importar desde src

function Home() {
  return (
    <div className="home-container">
      {/* Logo del carrito (con import directo desde src) */}
      <img
        src={logoCarrito}
        alt="Logo carrito"
        className="logo-carrito"
      />

      <h1 className="home-title">Bienvenidos a MarketGo</h1>
      <p className="home-description">
        Organiza tus compras de forma agradable y sencilla
      </p>

      <nav className="home-nav">
        <ul className="nav-list">
          <li>
            <Link className="nav-link login-link" to="/login">
              Iniciar Sesión
            </Link>
          </li>
          <li>
            <Link className="nav-link register-link" to="/register">
              Regístrate
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
