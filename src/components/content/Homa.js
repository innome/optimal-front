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
                headers: {}
            });
            if (response.status === 200) {
                setModalData(response.data.data);
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
            }
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
                <div key={index} className="form-field">
                    <label htmlFor={key}>{key}</label>
                    <input
                        type="text"
                        name={key}
                        value={formData[key] || ''}
                        onChange={handleChange}
                        placeholder={key}
                        required
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
                        <br></br>
                        <p>{modalData.description}</p>
                        <br></br>
                        <form onSubmit={handleSubmit}>
                            {renderFormFields()}
                            <div className="form-field">
                                <label htmlFor="file">Subir Archivo</label>
                                <input type="file" name="file" />
                            </div>
                        <div className="modal-footer">
                            <button onClick={closeModal}>Cerrar</button>
                            <button type="submit" className="submit-button">Enviar</button>
                        </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default Homa;
