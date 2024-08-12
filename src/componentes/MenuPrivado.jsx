// src/componentes/MenuPrivado.jsx
import React, { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { getUsuario, logout } from '../seguranca/Autenticacao';
import './menu-home.css';

const MenuPrivado = () => {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = getUsuario();
    if (user) {
      setUsuario(user);
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/privado">NeonFlix</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/privado">Home</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Manutenções
                </a>
                <ul className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
                  <li><NavLink className="dropdown-item text-light" to="generos">Gêneros</NavLink></li>
                  <li><NavLink className="dropdown-item text-light" to="filmes">Filmes</NavLink></li>
                </ul>
              </li>
            </ul>
            {usuario ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {usuario.displayName || "Usuário"}
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end bg-dark" aria-labelledby="userDropdown">
                    <li><NavLink className="dropdown-item text-light" onClick={logout} to="/">Logout</NavLink></li>
                  </ul>
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <span className="navbar-text text-light">Carregando...</span>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MenuPrivado;
