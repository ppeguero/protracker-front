import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar';

//* Icons
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function CrudUsers() {

    const [show, setShow] = useState(false);

    //* Test
    const [users, setUsers] = useState([
        {
            id_usuario: 1,
            usuario: 'Manuel',
            equipo: 'Equipo 1',
            especialidad: 'Diseñador',
        },
        {
            id_usuario: 2,
            usuario: 'Kevin',
            equipo: 'Equipo 2',
            especialidad: 'Programador',
        },
    ]);

    return (
        <div className='flex flex-col md:flex-row'>
            <Sidebar show={show} setShow={setShow}/>
            <div className='flex-1 md:ml-72'>
                <div className="p-4 w-full">
                    <h1 className="text-3xl font-bold mb-4">Gestionar Usuarios</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                <FaUserPlus className="inline-block mr-1" />
                                Agregar usuario
                            </button>
                        </div>
                        <h2 className="text-2xl mb-4">Miembros registrados:</h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Usuario</th>
                                    <th className="hidden md:table-cell px-4 py-2">Equipo</th>
                                    <th className="hidden md:table-cell px-4 py-2">Especialidad</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{user.usuario}</td>
                                        <td className="hidden md:table-cell px-4 py-2">{user.equipo}</td>
                                        <td className="hidden md:table-cell px-4 py-2">{user.especialidad}</td>
                                        <td className="px-4 py-2">
                                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mr-2">
                                            <FaEdit className="inline-block mr-1" />
                                            Actualizar
                                        </button>
                                        <button className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

export default CrudUsers;