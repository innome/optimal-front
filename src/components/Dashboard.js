// Dashboard.js
import '../css/Dashboard.css'; // Asegúrate de que la ruta de importación es correcta
import useAuth from './useAuth';
import { useNavigate  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ContentArea from './ContentArea';


import Footer from './FooterContent';

function Dashboard() {

  const [activeContent, setActiveContent] = useState('default');
  const { isAuthenticated, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navigate = useNavigate();
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login'); // Redirige al usuario al login si no está autenticado
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <Loader /> ; // Mostrar algún tipo de indicador de carga
  }

  return (
    <div className="dashboard">
     <Navbar toggleSidebar={toggleSidebar} setActiveContent={setActiveContent} />
     <div className="dashboard-body">
        <Sidebar isOpen={isSidebarOpen} setActiveContent={setActiveContent} />
        <ContentArea activeContent={activeContent}/>
     </div>
      <Footer />
    </div>
  );
  
}

export default Dashboard;
