import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';

//* Icons
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import AddMemberModal from '../../../components/AddMemberModal';
import UpdateMemberModal from '../../../components/UpdateMemberModal';

function CrudMembers() {

    const [show, setShow] = useState(false);
    const [members, setMembers] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState({});

    useEffect(() => {
        fetch("https://localhost:8080/api/members/")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setMembers(data);
          })
          .catch(error => console.error("Fetch error:", error));
      }, []);

      const updateMember = (id_miembro) => {
        const memberToUpdate = members.find(member => member.id_miembro == id_miembro);
        setSelectedMembers(memberToUpdate);
        setUpdateModalOpen(true);
      };

      const deleteMember = (id_miembro) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://localhost:8080/api/members/${id_miembro}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error al eliminar el miembro: ${response.statusText}`);
                }
                console.log("Miembro eliminado con éxito");
                Swal.fire('¡Eliminado!', 'El miembro ha sido eliminado.', 'success');
                setMembers(prevMembers => prevMembers.filter(member => member.id_miembro !== id_miembro));
              })
              .catch(error => {
                console.error("Fetch error:", error);
                Swal.fire('Error', 'Hubo un error al eliminar al miembro.', 'error');
              });
          }
        });
      };

      const openAddModal = () => {
        setAddModalOpen(true);
      };
    
      const closeAddModal = () => {
        setAddModalOpen(false);
      };
    
      const openUpdateModal = () => {
        setUpdateModalOpen(true);
      };
    
      const closeUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedMembers({});
      };

      const handleAddOrUpdate = ({ title, text, icon }) => {
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
        }).then(() => {
          fetch("https://localhost:8080/api/members/")
            .then(response => response.json())
            .then(data => {
              console.log(data);
              setProjects(data);
            })
            .catch(error => console.error("Fetch error:", error));
      
          closeAddModal();
          closeUpdateModal();
        });
      };


    return (
        <div className='flex flex-col md:flex-row bg-[#EEF4ED]'>
            <Sidebar show={show} setShow={setShow}/>
            {
                !show ?
            <div className='flex-1 md:ml-72'>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Gestionar Miembros</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-4">
                            <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 text-center px-4 rounded">
                                <FaUserPlus className="inline-block mr-1" />
                                Agregar miembro
                            </button>
                        </div>
                        <h2 className="text-2xl mb-4">Miembros registrados:</h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-center">Nombre del usuario</th>
                                    <th className="px-4 py-2 text-center">Nombre del equipo</th>
                                    <th className="hidden md:table-cell px-4 py-2 text-center">Especialidad</th>
                                    <th className="px-4 py-2 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {members.map((member, index) => 
                                (
                                    <tr key={index}>
                                            <td className="px-4 py-2 text-center">{member.nombre_usuario}</td>
                                            <td className="px-4 py-2 text-center">{member.nombre_equipo}</td>
                                        <td className="hidden md:table-cell px-4 py-2 text-center">{member.nombre_especialidad}</td>
                                        <td className="px-4 py-2 text-center">
                                        <button onClick={() => updateMember(member.id_miembro)}  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-center px-4 rounded mb-2 md:mr-2">
                                            <FaEdit className="inline-block mr-1" />
                                            Actualizar
                                        </button>
                                        <button onClick={() => deleteMember(member.id_miembro)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 text-center px-4 rounded">
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
                {/* Modal para añadir proyecto */}
                <AddMemberModal
                    isOpen={isAddModalOpen}
                    onRequestClose={closeAddModal}
                    handleAddOrUpdate={handleAddOrUpdate}
                />

                {/* Modal para actualizar proyecto */}

                <UpdateMemberModal
                    isOpen={isUpdateModalOpen}
                    onRequestClose={closeUpdateModal}
                    handleAddOrUpdate={handleAddOrUpdate}
                    selectedMembers={selectedMembers}
                />

            </div>
            :
            null
            }
        </div>
    )
}

export default CrudMembers;