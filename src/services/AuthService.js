// src/services/AuthService.js
import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPhoneNumber } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../ProductContext/firebaseConfig";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("signInWithGoogle - Resultado:", result);
      return result.user;
    } catch (error) {
      console.error("signInWithGoogle - Error:", error);
      throw new Error("Error al iniciar sesión con Google: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGithub = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("signInWithGithub - Resultado:", result);
      return result.user;
    } catch (error) {
      console.error("signInWithGithub - Error:", error);
      throw new Error("Error al iniciar sesión con GitHub: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phoneNumber, appVerifier) => {
    setLoading(true);
    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      console.log("signInWithPhone - Resultado:", confirmationResult);
      return confirmationResult;
    } catch (error) {
      console.error("signInWithPhone - Error:", error);
      throw new Error("Error al iniciar sesión con teléfono: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("signInWithEmail - Resultado:", result);
      return result.user;
    } catch (error) {
      console.error("signInWithEmail - Error:", error);
      throw new Error("Error al iniciar sesión con correo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log("registerWithEmail - Resultado:", result);
      return result.user;
    } catch (error) {
      console.error("registerWithEmail - Error:", error);
      throw new Error("Error al registrarse con correo: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await auth.signOut();
      console.log("signOut - Sesión cerrada exitosamente");
    } catch (error) {
      console.error("signOut - Error:", error);
      throw new Error("Error al cerrar sesión: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    signInWithGoogle,
    signInWithGithub,
    signInWithPhone,
    signInWithEmail,
    registerWithEmail,
    signOut,
    loading,
  };
};