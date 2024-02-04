// CrudTeams.js
import React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/Sidebar';
import AddTeamModal from '../../../components/AddTeamModal.jsx'; // Importa el componente AddTeamModal
import UpdateTeamModal from '../../../components/UpdateTeamModal.jsx'; // Importa el componente UpdateTeamModal
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';

function CrudTeams() {
  const [show, setShow] = useState(false);
  const [teams, setTeams] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState({});


  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
        const response = await fetch('https://localhost:8080/api/teams');
        if (!response.ok) {
            throw new Error(`Error al obtener equipos: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Asegúrate de que la propiedad "equipos" existe en la respuesta
        const equipos = data?.equipos || [];

        setTeams(equipos);
        console.log(equipos);
    } catch (error) {
        console.error('Error al obtener equipos:', error);
    }
};

  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);

  const openUpdateModal = () => setUpdateModalOpen(true);
  const closeUpdateModal = () => setUpdateModalOpen(false);

  const deleteTeam = async (id_equipo) => {
    try {
      // Mostrar mensaje de confirmación
      const confirmResult = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará el equipo permanentemente.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
      });
  
      // Verificar si el usuario confirmó la eliminación
      if (confirmResult.isConfirmed) {
        const response = await fetch(`https://localhost:8080/api/teams/${id_equipo}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`Error al eliminar el equipo: ${response.statusText}`);
        }
  
        // Actualizar la lista de equipos después de eliminar uno
        fetchTeams();
  
        // Mostrar un mensaje de éxito
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El equipo ha sido eliminado exitosamente.',
          icon: 'success',
        });
      } else {
        // Mostrar un mensaje de cancelación
        Swal.fire({
          title: 'Cancelado',
          text: 'La eliminación del equipo ha sido cancelada.',
          icon: 'info',
        });
      }
    } catch (error) {
      console.error('Error al eliminar el equipo:', error);
      // Mostrar un mensaje de error
      Swal.fire({
        title: 'Error',
        text: 'Hubo un error al eliminar el equipo.',
        icon: 'error',
      });
    }
  };

  const updateTeam = (id_equipo) => {
    const teamToUpdate = teams.find(team => team.id_equipo === id_equipo);
    setSelectedTeam(teamToUpdate);
    setUpdateModalOpen(true);
  };

  const handleAddOrUpdate = ({ title, text, icon }) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    }).then(() => {
      // Operaciones que deben ocurrir después de mostrar el SweetAlert
      fetch("https://localhost:8080/api/teams/")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUsers(data);
        })
        .catch(error => console.error("Fetch error:", error));
  
      closeAddModal();
      closeUpdateModal();
    });
  };
  

  return (
    <div className='flex flex-col md:flex-row bg-[#EEF4ED]'>
      <Sidebar show={show} setShow={setShow} />
      <div className='flex-1 md:ml-72'>
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-4">Gestionar Equipos</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={openAddModal}>
                <FaUserPlus className="inline-block mr-1" />
                Agregar equipo
              </button>
            </div>
            <h2 className="text-2xl mb-4">Equipos registrados:</h2>
            <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Equipo</th>
                                    <th className="px-4 py-2">Creador</th>
                                    {/* <th className="px-4 py-2">Miembros</th> */}
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(teams) && teams.map((team, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 text-center">{team.nombre}</td>
                                        <td className="px-4 py-2 text-center">{team.nombreUsuario}</td>
                                        {/* <td className="px-4 py-2 text-center">{team.miembros}</td> */}
                                        <td className="px-4 py-2 text-center">
                                            <button onClick={() => updateTeam(team.id_equipo)}  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mr-2">
                                                <FaEdit className="inline-block mr-1" />
                                                Actualizar
                                            </button>
                                            <button onClick={()=>deleteTeam(team.id_equipo)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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

      {/* Renderiza el componente del modal de agregar equipo */}
      <AddTeamModal isOpen={isAddModalOpen} onRequestClose={closeAddModal} />

      {/* Renderiza el componente del modal de actualizar equipo */}
      <UpdateTeamModal isOpen={isUpdateModalOpen} onRequestClose={closeUpdateModal} handleAddOrUpdate={handleAddOrUpdate}
        selectedTeam={selectedTeam}/>
    </div>
  );
}

export default CrudTeams;
