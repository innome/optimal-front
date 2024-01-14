import React, { useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ isOpen, setActiveContent  }) => {


    const [selected, setSelected] = useState(''); // Estado para manejar el elemento seleccionado
    const userRole = localStorage.getItem('idr');

    const handleItemClick = (name) => {
        setSelected(name);
        setActiveContent(name);
    };

    return (
        <div className={isOpen ? 'sidebar open' : 'sidebar'}>
            <ul>
                <li>
                    <a
                        className={selected === 'default' ? 'selected' : ''}
                        onClick={() => handleItemClick('default') }
                    >
                        Inicio
                    </a>
                </li>
                <li>
                    <a
                         className={selected === 'dashboard' ? 'selected' : ''}
                         onClick={() => handleItemClick('dashboard') }
                    >
                        Dashboard
                    </a>
                </li>
                {userRole === '1' && (
                <li>
                    <a
                        className={selected === 'AddHoma' ? 'selected' : ''}
                        onClick={() => handleItemClick('AddHoma')}
                    >
                        Añadir Homa
                    </a>
                </li>
                )}
                {userRole === '1' && (
                <li>
                    <a
                        className={selected === 'AddUser' ? 'selected' : ''}
                        onClick={() => handleItemClick('AddUser')}
                    >
                        Añadir Usuario
                    </a>
                </li>
                )}
                {userRole === '1' && (
                <li>
                    <a
                        className={selected === 'seeHoma' ? 'selected' : ''}
                        onClick={() => handleItemClick('seeHoma')}
                    >
                        Ver Homas
                    </a>
                </li>
                )}
                {/* Añade más elementos de menú según sea necesario */}
            </ul>
        </div>
    );



};

export default Sidebar;
