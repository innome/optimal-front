import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import axios from 'axios';
import Homa from './Homa'
import '../../css/DashboardContent.css';

const Dashboard = ({ setActiveContent }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://127.0.0.1:8000/api/v1/homa', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          console.log('Datos obtenidos:', response.data.data);
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

  const handleCardClick = (item) => {
    console.log('Item seleccionado:', item);
    setModalData(item);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); // Función para cerrar el modal
  };

  if (isLoading) {
    return <Loader /> ;
  }

  return (
    <div className="dashboard-container">
      {data.map((item, index) => (
        <div key={index}  onClick={() => handleCardClick(item.id)}>
          <div key={index} className="card">
            <div className="card-title">
              <h3>{item.content}</h3>
            </div>
            <div className="card-content">
              <p> {item.description}</p>
            </div>
            <div className="card-footer">
              <p>Version: {item.version}</p>
            </div>
          </div>
        </div>
      ))}
       {isModalOpen && <Homa data={modalData} closeModal={closeModal} />}
    </div>

  );
};

export default Dashboard;
