// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../ProductContext/firebaseConfig";
import "../styles/Login.css";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState("");
  const { signInWithGoogle, signInWithGithub, signInWithPhone, signInWithEmail } = useAuth();
  const navigate = useNavigate();

  // Inicializar reCAPTCHA
  useEffect(() => {
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              console.log("reCAPTCHA resuelto:", response);
            },
            "expired-callback": () => {
              console.log("reCAPTCHA expirado");
              setError("reCAPTCHA expirado. Por favor, recarga la página.");
            },
          },
          auth
        );
        console.log("reCAPTCHA inicializado correctamente");
      }
    } catch (error) {
      console.error("Error al inicializar reCAPTCHA:", error);
      setError("Error al inicializar reCAPTCHA: " + error.message);
    }
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log("Inicio de sesión con Google exitoso:", user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      setError("Error al iniciar sesión con Google: " + error.message);
    }
  };

  const handleLoginWithGithub = async () => {
    try {
      const user = await signInWithGithub();
      if (user) {
        console.log("Inicio de sesión con GitHub exitoso:", user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con GitHub:", error);
      setError("Error al iniciar sesión con GitHub: " + error.message);
    }
  };

  const handleLoginWithPhone = async () => {
    try {
      // Asegurarse de que el número de teléfono tenga el formato correcto
      let formattedPhoneNumber = phoneNumber;
      if (!phoneNumber.startsWith("+")) {
        // Asumimos que el usuario es de Colombia (+57) si no especifica el código de país
        formattedPhoneNumber = `+57${phoneNumber}`;
      }

      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        throw new Error("reCAPTCHA no está inicializado. Por favor, recarga la página.");
      }

      const result = await signInWithPhone(formattedPhoneNumber, appVerifier);
      setConfirmationResult(result);
      console.log("Código de verificación enviado:", result);
    } catch (error) {
      console.error("Error al iniciar sesión con teléfono:", error);
      if (error.code === "auth/invalid-phone-number") {
        setError("Número de teléfono inválido. Asegúrate de incluir el código de país (por ejemplo, +57).");
      } else if (error.code === "auth/argument-error") {
        setError("Error en los argumentos. Verifica el número de teléfono y recarga la página.");
      } else {
        setError("Error al iniciar sesión con teléfono: " + error.message);
      }
    }
  };

  const handleConfirmCode = async () => {
    try {
      const user = await confirmationResult.confirm(code);
      if (user) {
        console.log("Código confirmado, usuario autenticado:", user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al confirmar código:", error);
      setError("Código incorrecto. Intenta de nuevo: " + error.message);
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmail(email, password);
      if (user) {
        console.log("Inicio de sesión con correo exitoso:", user);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con correo:", error);
      if (error.message.includes("auth/wrong-password")) {
        setError("Contraseña incorrecta. Por favor, intenta de nuevo.");
      } else if (error.message.includes("auth/user-not-found")) {
        setError("No se encontró un usuario con este correo. Por favor, regístrate.");
      } else {
        setError("Error al iniciar sesión con correo: " + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <img src="/assets/img/logo_inicial.png" alt="MarketGo Logo" className="login-logo" />
      <h2>Bienvenidos a MarketGo</h2>

      {/* Formulario para correo y contraseña */}
      <form onSubmit={handleLoginWithEmail}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={!email || !password}>
          Iniciar sesión con Correo
        </button>
      </form>

      <button onClick={handleLoginWithGoogle}>
        Iniciar sesión con Google
      </button>

      <button onClick={handleLoginWithGithub}>
        Iniciar sesión con GitHub
      </button>

      {/* Autenticación con teléfono */}
      {!confirmationResult ? (
        <>
          <input
            type="tel"
            placeholder="Ingresa tu número de teléfono (ej. +573197252865)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button onClick={handleLoginWithPhone} disabled={!phoneNumber}>
            Iniciar sesión con Teléfono
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Ingresa el código SMS"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleConfirmCode} disabled={!code}>
            Confirmar Código
          </button>
        </>
      )}

      <div id="recaptcha-container"></div>

      {error && <div className="error-message">{error}</div>}

      <p>
        ¿No tienes una cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;