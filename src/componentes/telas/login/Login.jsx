import React from 'react';
import { loginWithGithub } from '../../../firebaseConfig';
import { Navigate } from 'react-router-dom';
import './signin.css'; // Certifique-se de adicionar um arquivo CSS para estilizar

function Login() {
    const [autenticado, setAutenticado] = React.useState(false);
    const [erro, setErro] = React.useState("");

    const handleLogin = async () => {
        try {
            await loginWithGithub();
            setAutenticado(true);
        } catch (error) {
            setErro("Erro ao fazer login com GitHub");
        }
    };

    if (autenticado) {
        return <Navigate to="/privado" />;
    }

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Bem-vindo ao NeonFlix</h2>
                <p className="login-subtitle">Faça login para continuar</p>
                <button onClick={handleLogin} className="login-button">
                    <i className="bi bi-github"></i> Login com GitHub
                </button>
                {erro && <p className="login-error">{erro}</p>}
            </div>
        </div>
    );
}

export default Login;
