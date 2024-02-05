import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Sidebar from '../../../components/Sidebar';
import UpdateResourceModal from '../../../components/UpdateResourceModal';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import jwt_decode from 'jwt-decode';
import AddResourceModal from '../../../components/AddResourceModal';

function CrudTasks() {
  const [show, setShow] = useState(false);
  const [resources, setResources] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState({});

  const token_jwt = localStorage.getItem('token'); 
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const idUser = decodedToken ? decodedToken.idUser : null; 
    



  useEffect(() => {
    fetch("https://localhost:8080/api/resource")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResources(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);

  const updateResource = (id_recurso) => {
    // Lógica para cargar los datos del usuario seleccionado y abrir el modal de actualización
    const resourceToUpdate = resources.find(resource => resource.id_recurso === id_recurso);
    setSelectedResource(resourceToUpdate);
    setUpdateModalOpen(true);
  };

  const deleteResource = (id_recurso) => {
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
        fetch(`https://localhost:8080/api/resource/${id_recurso}`, {
          method: 'DELETE',
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`Error al eliminar el recurso: ${response.statusText}`);
            }
            console.log("Recurso eliminado con éxito");
            Swal.fire('¡Eliminado!', 'El recurso ha sido eliminado.', 'success');
            // Actualizar el estado local eliminando el usuario de la lista
            setResources(prevResource => prevResource.filter(resource => resource.id_recurso !== id_recurso));
          })
          .catch(error => {
            console.error("Fetch error:", error);
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: 'El recurso esta enlazado a un equipo.',
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
    setSelectedResource({});
  };

  const handleAddOrUpdate = ({ title, text, icon }) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    }).then(() => {
      // Operaciones que deben ocurrir después de mostrar el SweetAlert
      fetch("https://localhost:8080/api/resource/")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setResources(data);
        })
        .catch(error => console.error("Fetch error:", error));
  
      closeAddModal();
      closeUpdateModal();
    });
  };
  

  return (
    <div className='flex flex-col md:flex-row bg-[#EEF4ED] h-fit min-h-screen '>
      <Sidebar show={show} setShow={setShow} />
      <div className='flex-1 md:ml-72'>
        <div className="p-4 w-full">
          <h1 className="text-3xl font-bold mb-4">Gestionar Recursos</h1>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="mb-4">
              <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                <FaUserPlus className="inline-block mr-1" />
                Agregar recurso
              </button>
            </div>
            <h2 className="text-2xl mb-4">Recursos:</h2>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="hidden md:table-cell px-4 py-2">Descripción</th>
                  <th className="hidden md:table-cell px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {resources.map((resource, index) => {
                  return(
                    <tr key={index}>
                      <td className="px-4 py-2 text-center">{resource.nombre}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{resource.descripcion}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{resource.tipo}</td>
                      <td className="hidden md:table-cell px-4 py-2 text-center">{resource.cantidad}</td>
                      <td className="px-4 py-2">
                        <button onClick={() => updateResource(resource.id_recurso)} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mr-2">
                          <FaEdit className="inline-block mr-1" />
                          Actualizar
                        </button>
                        <button onClick={() => deleteResource(resource.id_recurso)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
        <AddResourceModal
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
          handleAddOrUpdate={handleAddOrUpdate}
        />

        {/* Modal para actualizar usuario */}
        <UpdateResourceModal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          handleAddOrUpdate={handleAddOrUpdate}
          selectedResource={selectedResource}
        />
    </div>
  );
}

export default CrudTasks;
