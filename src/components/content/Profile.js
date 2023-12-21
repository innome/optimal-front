
import '../../css/Profile.css'
import useAuth from '../useAuth';
import { useNavigate  } from 'react-router-dom';
import Loader from '../Loader';
import React, { useEffect } from 'react';

const Perfil = () => {
    
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login'); // Redirige al usuario al login si no está autenticado
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <Loader /> ; // Mostrar algún tipo de indicador de carga
  }

  // Datos del usuario de ejemplo
  const userData = {
    nombre: 'Juan Pérez',
    correo: 'juanperez@example.com',
    // Puedes añadir más campos según sea necesario
  };

  return (
    <div className="perfil-container">
      <h1>Perfil del Usuario</h1>
      <div className="perfil-detalles">
        <p><strong>Nombre:</strong> {userData.nombre}</p>
        <p><strong>Correo Electrónico:</strong> {userData.correo}</p>
        {/* Más detalles del perfil aquí */}
      </div>
      <div className="perfil-acciones">
        <button onClick={() => { /* Lógica para editar perfil */ }}>Editar Perfil</button>
        <button onClick={() => { /* Lógica para cambiar contraseña */ }}>Cambiar Contraseña</button>
      </div>
    </div>
  );
};

export default Perfil;
