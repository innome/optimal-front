import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/content/homa.css'
import Loader from '../Loader';


const Homa = ({ data, closeModal }) => {
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchModalData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://127.0.0.1:8000/api/v1/homa/${data}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200) {
                    console.log('Datos del modal obtenidos:', response.data);
                    setModalData(response.data.data);
                } else {
                    console.error('Error en la respuesta del servidor:', response.status);
                }
            } catch (error) {
                console.error('Error al hacer la petición:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchModalData();
    }, [data]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(modalData.url, formData, {
                headers: { }
            });
            console.log('Formulario enviado:', response);
            closeModal(); // Cierra el modal después del envío exitoso
        } catch (error) {
            console.error('Error al enviar formulario:', error);
        }
    };


    const renderFormFields = () => {
        if (!modalData || !modalData.labels) return null;
        const formattedLabels = modalData.labels.trim().startsWith('{')
        ? modalData.labels.trim()
        : `{${modalData.labels.trim()}}`;
    

        let parsedLabels;
        try {
            console.log('Labels:', modalData.labels);
            parsedLabels = JSON.parse(formattedLabels);
        } catch (error) {
            console.error('Error al parsear labels:', error);
            return null;
        }

        if (Array.isArray(parsedLabels)) {
            return parsedLabels.map((label, index) => (
                <div key={index}>
                    <label htmlFor={label.name}>{label.name}</label>
                    <input
                        type="text"
                        name={label.name}
                        value={formData[label.name] || ''}
                        onChange={handleChange}
                    />
                </div>
            ));
        } else {
            return Object.entries(parsedLabels).map(([key, value], index) => (
                <div key={index}>
                    <label htmlFor={key}>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                    />
                </div>
            ));
        }
    };


    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="modal-background">
            <div className="modal-container">
                {modalData && (
                    <>
                        <h3>{modalData.content}</h3>
                        <p>{modalData.description}</p>
                        <form onSubmit={handleSubmit}>
                            {renderFormFields()}
                            <button type="submit">Enviar</button>
                        </form>
                        <button onClick={closeModal}>Cerrsar</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Homa;
