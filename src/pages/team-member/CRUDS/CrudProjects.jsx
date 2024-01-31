import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar';

//* Icons
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function CrudProjects() {

    //* Test
    const [projects, setProjects] = useState([
        {
            id_proyecto: 1,
            proyecto: 'Sistema de estadias',
            fecha_inicio: '30/01/2024',
            estado: 'En proceso',
        },
        {
            id_proyecto: 2,
            proyecto: 'Sistema de coches',
            fecha_inicio: '30/01/2024',
            estado: 'Finalizado',
        },
    ]);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Gestionar Proyecto</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                <FaUserPlus className="inline-block mr-1" />
                                Agregar proyecto
                            </button>
                        </div>
                        <h2 className="text-2xl mb-4">Proyectos registrados:</h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Proyecto</th>
                                    <th className="px-4 py-2">Fecha Inicio</th>
                                    <th className="px-4 py-2">Estado</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{project.proyecto}</td>
                                        <td className="px-4 py-2">{project.fecha_inicio}</td>
                                        <td className="px-4 py-2">{project.estado}</td>
                                        <td className="px-4 py-2">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            <FaEdit className="inline-block mr-1" />
                                            Actualizar
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            <FaTrash className="inline-block mr-1" />
                                            Eliminar
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CrudProjects;