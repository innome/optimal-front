import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ toggleSidebar, setActiveContent }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); // Utiliza useNavigate aquí
    const username = localStorage.getItem('username'); // Asume que el username se guarda con esta clave en localStorage

    const toggleDropdown = () => {
        console.log('Toggle dropdown');
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handleLogout = () => {
        // Borra el token de localStorage y redirige al usuario al login
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login'); // Usa navigate para redirigir
        setIsDropdownOpen(false); // Cierra el menú desplegable
    };

  return (
        <nav className="navbar">
            <MdMenu className="menu-icon" onClick={toggleSidebar} />
            <div className="navbar-user" onClick={toggleDropdown}>
                {username}
                {isDropdownOpen && (
                    <div className="navbar-dropdown">
                        <ul>
                            <li onClick={() => setActiveContent('profile')}><a  href="#close">Perfil</a></li>
                            {/* <li onClick={() => setActiveContent('settings')}><a  href="#close">Configuración</a></li> */}
                            <li onClick={handleLogout}><a  href="#close">Cerrar sesión</a></li>
                        </ul>
                    </div>
                )}
            </div>
            {/* Otros elementos del Navbar */}
        </nav>
    );
};

export default Navbar;
