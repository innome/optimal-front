import React, { useState } from 'react';
import axios from 'axios';
import '../../css/content/addHoma.css'
import Notification from '../utils/Notification';

const AddHoma = () => {

    const initialState = {
        content: '',
        labels: '',
        version: '',
        url: '',
        description: ''
    };

    const [notification, setNotification] = useState({
        message: '',
        type: ''
      });

    const [formData, setFormData] = useState(initialState);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const idu = localStorage.getItem('idu');
    const cod_empresa = localStorage.getItem('cod_enterprise');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true); 
        // Procesar 'labels' para convertirlo en un arreglo
        const labelsArray = formData.labels.split(',').map(label => label.trim());

        const dataToSend = {
            ...formData,
            labels: JSON.stringify(labelsArray) // Convertir el arreglo a string JSON
        };

        // Obtener el token del almacenamiento local
        const token = localStorage.getItem('token');

        try {
            const response = await axios.post('http://129.148.24.238:8080/api/v1/addHoma', dataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                setNotification({
                    message: 'Homa insertado correctamente',
                    type: 'success'
                });
                setFormData(initialState); 
            }

            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
        } catch (error) {
            console.error('Hubo un error al enviar el formulario:', error);
            setNotification({
                message: 'Error al insertar Homa',
                type: 'error' 
              });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
        }
        setIsSubmitting(false); 
    };

    return (
        <div className="form-container">
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <h1>Añadir Nuevos HOMA</h1>
            <p>En el siguiente formulario puedes agregar nuevos HOMAS.</p>

            <form onSubmit={handleSubmit} className="add-homa-form">
                <input required type='text' name='idu' value={idu} onChange={handleChange} hidden/>
                <input required type='text' name='cod_enterprise' value={cod_empresa} onChange={handleChange} hidden/>
                <input required type="text" name="content" value={formData.content} onChange={handleChange} placeholder="Title" />
                <input required type="text" name="labels" value={formData.labels} onChange={handleChange} placeholder="Labels (separados por comas)" />
                <input required type="number" name="version" value={formData.version} onChange={handleChange} placeholder="Version" />
                <input required type="text" name="url" value={formData.url} onChange={handleChange} placeholder="URL" />
                <textarea required name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
                <button type="submit" disabled={isSubmitting}>Enviar</button>
            </form>
            <br></br>
            <p className="note">
                NOTA: Los labels deben estar separados por coma (,): titulo, cedula, etc.
            </p>
        </div>
    );
};

export default AddHoma;
