import React, { useState } from 'react'
import Sidebar from '../../../components/Sidebar';

//* Icons
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";

function CrudTeams() {

    //* Test
    const [teams, setTeams] = useState([
        {
            id_team: 1,
            nombre: 'Equipo 1',
            miembros: ['Kevin', 'Manuel']
        },
        {
            id_team: 2,
            nombre: 'Equipo 2',
        },
        {
            id_team: 3,
            nombre: 'Equipo 3',
        },
    ]);

    return (
        <div className='flex'>
            <Sidebar />
            <div className='flex-1'>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Gestionar Equipos</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-4">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                <FaUserPlus className="inline-block mr-1" />
                                Agregar equipo
                            </button>
                        </div>
                        <h2 className="text-2xl mb-4">Equipos registrados:</h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Equipo</th>
                                    <th className="px-4 py-2">Miembros</th>
                                    {/* <th className="px-4 py-2"></th> */}
                                    {/* <th className="px-4 py-2"></th> */}
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {teams.map((team, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2">{team.nombre}</td>
                                        <td className="px-4 py-2">{team.miembros}</td>
                                        {/* <td className="px-4 py-2">{team.fecha_inicio}</td> */}
                                        {/* <td className="px-4 py-2">{team.estado}</td> */}
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

export default CrudTeams;