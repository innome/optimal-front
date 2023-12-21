// useAuth.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      try {
        // Suponiendo que tienes un endpoint en tu backend para validar el token
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }

        const response = await axios.get('http://129.148.24.238:8080/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Si el token es válido, se podría esperar recibir los datos del usuario
        if (response.data) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Si hay un error (por ejemplo, token inválido o expirado), maneja aquí la respuesta
        console.error('Token de autenticación inválido:', error);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  return { isAuthenticated, loading };
};

export default useAuth;
