import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import Notification from './utils/Notification';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggingIn, setIsLoggingIn] = useState(false); 
    const [notification, setNotification] = useState({
      message: '',
      type: ''
    });
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setIsLoggingIn(true);
        // Construye los datos del formulario
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
    
        try {
          const response = await fetch('http://129.148.24.238:8080/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'idu': username
            },
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const data = await response.json();
          localStorage.setItem('token', data.access_token); 
          localStorage.setItem('username', username); 

          setIsLoggingIn(false);
          navigate('/dashboard');
          
        } catch (error) {
          setIsLoggingIn(false);
          setNotification({
            message: 'Error al iniciar sesión',
            type: 'error' 
          });
          setTimeout(() => {
            setNotification({ message: '', type: '' });
          }, 3000);
          console.error('Error al iniciar sesión:', error);
          // Manejar el error de inicio de sesión aquí
        }
      };

  return (
    
    <div className="login-container">
      {notification.message && <Notification message={notification.message} type={notification.type} />}
      <div className="login-card">
        <h2>Iniciar Sesión</h2> 
        <form onSubmit={handleLogin} >
          <div className="input-group">
            <input type="text" id="username" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <input type="password" id="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-footer">
            <button type="submit" className="login-button2"> {isLoggingIn ? 'Cargando...' : 'Ingresar'}</button>
            <a href="/forgot-password" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
        <a href="/" className="login-button">Volver</a>
      </div>
    </div>
  );
}

export default Login;
