import React, { useState } from 'react';
import '../css/Sidebar.css';

const Sidebar = ({ isOpen, setActiveContent  }) => {


    const [selected, setSelected] = useState(''); // Estado para manejar el elemento seleccionado

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
                {/* Añade más elementos de menú según sea necesario */}
            </ul>
        </div>
    );



};

export default Sidebar;
