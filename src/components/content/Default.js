import useAuth from '../useAuth';
import { useNavigate  } from 'react-router-dom';
import Loader from '../Loader';
import React, { useEffect } from 'react';
import '../../css/Default.css'; // Asegúrate de crear y referenciar un archivo CSS para los estilos

const Default = () => {

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

  return (
    <div className="default-container">
      <p>Bienvenido a la aplicación de OptimAl. <br/> Selecciona una opción del menú para comenzar.</p>
    </div>
  );
};

export default Default;
