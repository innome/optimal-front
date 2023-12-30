import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './components/Landing'; // Asegúrate de que el componente Landing está correctamente importado
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import DashboardContent from './components/content/Dashboard';
import Profile from './components/content/Profile';
import Homa from './components/content/Homa';
import './css/App.css';

function App() {

  return (
    <Router>
      <div>
        {/* <Header /> */}
        {/* Usa Routes en lugar de Switch */}
        <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard  />} />
          <Route path="/main" element={<DashboardContent />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/homa/:id" element={<Homa />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
