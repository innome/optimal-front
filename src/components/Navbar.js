import React, { useState } from 'react';
import { MdMenu } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = ({ toggleSidebar, setActiveContent }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate(); 
    const username = localStorage.getItem('username'); 

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handleLogout = () => {
        
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login'); 
        setIsDropdownOpen(false); 
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
