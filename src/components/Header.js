import React from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'; // Asegúrate de que la ruta de importación es correcta para tus estilos

function Header() {
  return (
    <header className="full-screen-header">
    <h1 className="glitch" title='HOMA' >HOMA</h1>
      {/* <button className="login-button">Login</button> */}
      <Link to="/login" className="login-button">Login</Link>
    </header>
  );
}

export default Header;
