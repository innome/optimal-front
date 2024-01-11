import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../css/content/addUser.css';
import Notification from '../utils/Notification';

const AddUser = () => {
    const [enterprises, setEnterprises] = useState([]);
    const [isLoadingEnterprises, setIsLoadingEnterprises] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        enterpriseId: '',
        roleId: '',
        password: '',
        confirmPassword: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [passwordError, setPasswordError] = useState(false);

    const userRole = localStorage.getItem('idr');
    const userEnterpriseId = localStorage.getItem('cod_enterprise');
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (userRole === '1') {
            fetchEnterprises();
        } else {
            setFormData(f => ({ ...f, enterpriseId: userEnterpriseId }));
        }
    }, [userRole, userEnterpriseId]);

    const fetchEnterprises = async () => {
        setIsLoadingEnterprises(true);
        try {   
            const response = await axios.get('http://127.0.0.1:8000/api/v1/get_enterprises', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setEnterprises(response.data.data);
            setIsLoadingEnterprises(false);
        } catch (error) {
            console.error('Error al obtener empresas:', error);
            setIsLoadingEnterprises(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log('formData: ', formData);
        if (formData.password !== formData.confirmPassword) {
            setPasswordError(true);
            setTimeout(() => setPasswordError(false), 2000);
            setNotification({
                message: 'Las contraseñas no coinciden',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/add_user', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setNotification({
                    message: 'Usuario añadido correctamente',
                    type: 'success'
                });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
                setFormData({
                    name: '',
                    email: '',
                    enterpriseId: userRole === '1' ? '' : userEnterpriseId,
                    roleId: '',
                    password: '',
                    confirmPassword: ''
                });
            } else {
                setNotification({
                    message: 'Error al añadir usuario',
                    type: 'error'
                });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
            }
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            setNotification({
                message: 'Error al añadir usuario',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderRoleOptions = () => {
        if (userRole === '1') {
            return (
                <>
                    <option value="2">Admin</option>
                    <option value="3">Usuario</option>
                </>
            );
        } else if (userRole === '2') {
            return <option value="3">Usuario</option>;
        }
    };

    return (
        <div className="form-container">
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <h1>Añadir Usuario</h1>
            <form onSubmit={handleSubmit} className="add-user-form">
                <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre de usuario" />
                <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                {userRole === '1' && (
                    <select 
                        name="enterpriseId" 
                        value={isLoadingEnterprises ? '' : formData.enterpriseId} 
                        onChange={handleChange} 
                        disabled={isLoadingEnterprises}
                    >
                        {isLoadingEnterprises ? (
                            <option value="">Cargando Empresas...</option>
                            ) : (
                                enterprises.map((enterprise) => (
                                    <option key={enterprise.id} value={enterprise.id}>{enterprise.name}</option>
                                    ))
                        )}
                    </select>
                )}
                <select name="roleId" value={formData.roleId} onChange={handleChange} required>
                    <option value="">Seleccione un rol</option>
                    {renderRoleOptions()}
                </select>
                <input type="password" style={{ borderColor: passwordError ? 'red' : '' }} name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
                <input type="password" style={{ borderColor: passwordError ? 'red' : '' }} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirmar Contraseña" required />
                <button type="submit" disabled={isSubmitting}>Añadir Usuario</button>
            </form>
        </div>
    );
};

export default AddUser;
