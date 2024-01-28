import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import axios from 'axios';
import Homa from './Homa'
import '../../css/DashboardContent.css';

const Dashboard = ({ setActiveContent }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalData, setModalData] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('https://back.hom-a.xyz/api/v1/homa', {
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
      if (error.response.status === 401) {
        localStorage.clear()
        navigate('/login'); 
      }
    }
    setIsLoading(false);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const handleCardClick = (item) => {
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
              <p>v{item.version}</p>
            </div>
          </div>
        </div>
      ))}
       {isModalOpen && <Homa data={modalData} closeModal={closeModal} />}
    </div>

  );
};

export default Dashboard;
