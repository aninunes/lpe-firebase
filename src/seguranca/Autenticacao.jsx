// src/seguranca/Autenticacao.jsx
import { auth, loginWithGithub, logout } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

// Função para capturar o usuário autenticado
export const getUsuario = () => {
  return auth.currentUser;
};

// Função para monitorar mudanças de autenticação
export const monitorAuthState = (callback) => {
  onAuthStateChanged(auth, callback);
};

export { loginWithGithub, logout };
