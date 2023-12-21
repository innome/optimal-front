import React, { useState, useEffect } from 'react';

import axios from 'axios';
import '../../css/DashboardContent.css'; // Asegúrate de tener estilos para tus cards

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Asume que el token se guarda en localStorage
        const response = await axios.post('URL_DE_TU_API', {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          setData(response.data.data);
        } else {
          console.error('Error en la respuesta del servidor:', response.status);
        }
      } catch (error) {
        console.error('Error al hacer la petición:', error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="dashboard-container">
      {data.map((item, index) => (
        <div key={index} className="card">
          {Object.entries(item).map(([key, value]) => (
            <p key={key}>{key}: {value}</p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
