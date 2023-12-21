import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
    
        // Construye los datos del formulario
        const formData = new URLSearchParams();
        formData.append('username', username);
        formData.append('password', password);
    
        try {
          const response = await fetch('http://localhost:8080/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
          });
    
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
    
          const data = await response.json();
          localStorage.setItem('token', data.access_token); // Guarda el token
          localStorage.setItem('username', username); // Guarda el token
          navigate('/dashboard');
          
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          // Manejar el error de inicio de sesión aquí
        }
      };

  return (
    <div className="login-container">
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
            <button type="submit" className="login-button2">Ingresar</button>
            <a href="/forgot-password" className="forgot-password-link">¿Olvidaste tu contraseña?</a>
          </div>
        </form>
        <a href="/" className="login-button">Volver</a>
      </div>
    </div>
  );
}

export default Login;
