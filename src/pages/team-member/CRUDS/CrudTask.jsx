import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Sidebar from '../../../components/Sidebar';
import AddUserModal from '../../../components/AddUserModal';
import UpdateUserModal from '../../../components/UpdateUserModal';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';

function CrudTasks() {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const token_jwt = localStorage.getItem('token'); 
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const idUser = decodedToken ? decodedToken.idUser : null; 
    



  useEffect(() => {
    fetch("https://localhost:8080/api/tasks-info/")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setTasks(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);

  const updateUser = (id_usuario) => {
    // Lógica para cargar los datos del usuario seleccionado y abrir el modal de actualización
    const userToUpdate = users.find(user => user.id_usuario === id_usuario);
    setSelectedUser(userToUpdate);
    setUpdateModalOpen(true);
  };

  const deleteUser = (id_usuario) => {
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
        fetch(`https://localhost:8080/api/users/${id_usuario}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error al eliminar el usuario: ${response.statusText}`);
            }
            console.log("Usuario eliminado con éxito");
            Swal.fire('¡Eliminado!', 'El usuario ha sido eliminado.', 'success');
            // Actualizar el estado local eliminando el usuario de la lista
            setUsers(prevUsers => prevUsers.filter(user => user.id_usuario !== id_usuario));
          })
          .catch(error => {
            console.error("Fetch error:", error);
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'El usuario esta enlazado a un equipo.',
            });
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
    // Limpiar los datos del usuario seleccionado cuando se cierra el modal de actualización
    setSelectedUser({});
  };

  const handleAddOrUpdate = ({ title, text, icon }) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    }).then(() => {
      // Operaciones que deben ocurrir después de mostrar el SweetAlert
      fetch("https://localhost:8080/api/users/")
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

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }
  
  

  return (
    <div className='flex flex-col md:flex-row bg-[#EEF4ED] h-fit min-h-screen '>
      <Sidebar show={show} setShow={setShow} />
      <div className='flex-1 md:ml-72'>
        <div className="p-4 w-full">
          <h1 className="text-3xl font-bold mb-4">Gestionar Tareas</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <FaUserPlus className="inline-block mr-1" />
                Agregar tarea
              </button>
            </div>
            <h2 className="text-2xl mb-4">Tareas:</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="hidden md:table-cell px-4 py-2">Descripción</th>
                  <th className="hidden md:table-cell px-4 py-2">Proyecto</th>
                  <th className="hidden md:table-cell px-4 py-2">Estado</th>
                  <th className="hidden md:table-cell px-4 py-2">Asignada a</th>
                  <th className="hidden md:table-cell px-4 py-2">Fecha límite</th>
                  <th className="px-4 py-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => {
                  return(
                    <tr key={index}>
                      <td className="px-4 py-2 text-center">{task.nombre_tarea}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{task.descripcion}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{task.nombre_proyecto}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{task.nombre_estado}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{task.nombre_usuario}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{formatDate(task.fecha_limite)}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => updateTask(task.id_usuario)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mr-2">
                          <FaEdit className="inline-block mr-1" />
                          Actualizar
                        </button>
                        <button onClick={() => deleteTask(task.id_usuario)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                          <FaTrash className="inline-block mr-1" />
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  )
                }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

        {/* Modal para añadir usuario */}
        <AddUserModal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          handleAddOrUpdate={handleAddOrUpdate}
        />

        {/* Modal para actualizar usuario */}
        <UpdateUserModal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          handleAddOrUpdate={handleAddOrUpdate}
          selectedUser={selectedUser}
        />
    </div>
  );
}

export default CrudTasks;
