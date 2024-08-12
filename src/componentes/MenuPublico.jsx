// src/componentes/MenuPublico.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './menu-home.css';

const MenuPublico = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">NeonFlix</NavLink>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link active" to="/login">Login</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default MenuPublico;
