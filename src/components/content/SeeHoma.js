import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import '../../css/content/seeHoma.css';
import Notification from '../utils/Notification';


const SeeHoma = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const DeleteConfirmationModal = () => {
        return (
            <div className="modal-background">
                <div className="modal-container">
                    <h2>¿Estás seguro de que quieres eliminar este Homa?</h2>
                    <div className='modal-confirmation-buttons'>
                        <button className='modal-confirmation-button' onClick={() => setShowDeleteModal(false)}>Cancelar</button>
                        <button className='modal-confirmation-button-submit' onClick={handleConfirmDelete} disabled={isDeleting}> {isDeleting ? 'Eliminando...' : 'Eliminar'} </button>
                    </div>
                </div>
            </div>
        );
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://127.0.0.1:8000/api/v1/homa', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                
                setData(response.data.data);
            } else {
                console.error('Error en la respuesta del servidor:', response.status);
            }
        } catch (error) {
            console.error('Error al hacer la petición:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const filteredData = searchTerm
        ? data.filter(homa =>
            homa.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            homa.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    // const handleEdit = (id) => {
    //     console.log('Editar:', id);
    // };

    const handleDelete = (id) => {
        setShowDeleteModal(true);
        setDeleteId(id);
    };

    const handleConfirmDelete = async () => {
        console.log('Confirmar Eliminación:', deleteId);
        setIsDeleting(true); 
        const deleted = await deleteHoma(deleteId);
        if (deleted) {
            fetchData(); // Esto recarga los datos del componente
        }
        setIsDeleting(false); // Habilita de nuevo el botón
        setShowDeleteModal(false); // Cierra el modal
    };

    const deleteHoma = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const idu = localStorage.getItem('idu');
            const cod_empresa = localStorage.getItem('cod_enterprise');
            const url = `http://127.0.0.1:8000/api/v1/delete/homa/${id}/${idu}/${cod_empresa}`;
            const response = await axios.delete(url, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setNotification({
                    message: 'Homa eliminado correctamente',
                    type: 'success'
                });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
                return true;
            } else {
                setNotification({
                    message: 'Error al eliminar el Homa',
                    type: 'error'
                });
                setTimeout(() => {
                    setNotification({ message: '', type: '' });
                }, 3000);
                console.error('Error en la respuesta del servidor:', response.status);
                return false;
            }
        } catch (error) {
            setNotification({
                message: 'Error al eliminar el Homa',
                type: 'error'
            });
            setTimeout(() => {
                setNotification({ message: '', type: '' });
            }, 3000);
            console.error('Error al hacer la petición:', error);
            return false;
        } finally{
            setIsLoading(false);
        }
    };

    return (
        <div className="see-homa-container">
            {notification.message && <Notification message={notification.message} type={notification.type} />}
            <h1>Listado de Homas</h1>
            <input
                type="text"
                placeholder="Buscar Homa..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {isLoading ? <Loader /> : (
                <table className="see-homa-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Contenido</th>
                            <th>Estado</th>
                            <th>Versión</th>
                            <th>Creado en</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((
                            homa) => (
                            <tr key={homa.id}>
                                <td>{homa.id}</td>
                                <td>{homa.content}</td>
                                <td>{homa.state}</td>
                                <td>{homa.version}</td>
                                <td>{homa.created_at}</td>
                                <td>{homa.description}</td>
                                <td>
                                    {/* <button hidden className='edit-btn' onClick={() => handleEdit(homa.id)}>Editar</button> */}
                                    <button className='delete-btn' onClick={() => handleDelete(homa.id)}>X</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} onClick={() => setCurrentPage(page)} disabled={currentPage === page}>
                        {page}
                    </button>
                ))}
            </div>
            {showDeleteModal && <DeleteConfirmationModal />}
        </div>
    );
};

export default SeeHoma;