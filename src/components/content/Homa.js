import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/content/homa.css'
import Loader from '../Loader';
import Notification from '../utils/Notification';

const Homa = ({ data, closeModal }) => {
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchModalData = async () => {
            try {
                const response = await axios.get(`http://129.148.24.238:8080/api/v1/homa/${data}`, {
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
    }, [data, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post(modalData.url, formData, {
                headers: {}
            });
            if (response.status === 200) {
                setShowConfirmation(true);
                setModalData(response.data.data);
            } else {
                setNotification({
                    message: 'Error al enviar el HOMA',
                    type: 'error'
                });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
                console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            setNotification({
                message: 'Error al enviar el HOMA',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            console.error('Error al enviar formulario:', error);
        }
        finally {
            setIsSubmitting(false); // Ocultar modal de carga
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

    const renderConfirmation = () => {
        setShowConfirmation(false);
        closeModal();
    }

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className="modal-background">
            {notification.message && <Notification message={notification.message} type={notification.type} />}
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
                                <button  disabled={isSubmitting}  onClick={closeModal}>Cerrar</button>
                                <button  disabled={isSubmitting}  type="submit" className="submit-button">Enviar</button>
                            </div>
                        </form>
                    </>
                )}
            </div>
            {isSubmitting && (
                <div className="loading-modal">
                    <div className="loader-container">
                        <div className="loader"></div>
                    </div>
                    <i>Gnomos procesando su solicitud...</i>
                </div>
            )}
            {showConfirmation && (
                <div className="confirmation-modal">
                    <i>Éxito, tu resultado ha sido enviado a tu correo.</i>
                    <button onClick={() => renderConfirmation()} className="success-button">Cerrar</button>
                </div>
            )}
        </div>
    );
};

export default Homa;
