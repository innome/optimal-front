import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import '../../css/content/seeLogs.css';


const SeeLogs = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const getPageNumbers = () => {
        let pages = [];
        let startPage, endPage;

        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 2 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // Rellena el array de páginas a mostrar
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        // Incluye puntos suspensivos si es necesario
        if (startPage > 1) {
            pages.unshift('...');
            pages.unshift(1);
        }
        if (endPage < totalPages) {
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('https://back.hom-a.xyz/api/v1/logs', {
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
        ? data.filter(log =>
            log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
            log.created_at.toLowerCase().includes(searchTerm.toLowerCase()) ||
            log.enterprise.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : data;

    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

    const totalPages = Math.ceil(filteredData.length / recordsPerPage);

    return (
        <div className="see-log-container">
            <h1>Listado de logs</h1>
            <input
                type="text"
                placeholder="Buscar log..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {isLoading ? <Loader /> : (
                <table className="see-log-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Usuario</th>
                            <th>Empresa</th>
                            <th>Descripción</th>
                            <th>Creado en</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRecords.map((
                            log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.name}</td>
                                <td>{log.enterprise}</td>
                                <td>{log.message}</td>
                                <td>{log.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div className="pagination">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>←</button>
                {getPageNumbers().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        disabled={page === '...' || page === currentPage}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>→</button>
            </div>
        </div>
    );
};

export default SeeLogs;