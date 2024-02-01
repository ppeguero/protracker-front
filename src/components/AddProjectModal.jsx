import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';


const AddProjectModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {
  const [newProject, setNewProject] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    id_usuario_id: '',
    id_estado_id: '',
    id_equipo_id: ''
  });

  const [isAddingProject, setIsAddingProject] = useState(false);


//   function hasOnlySpaces(str) {
//     return str.trim() === '';
//   }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault()

//     // Validación de espacios en blanco
//   if (hasOnlySpaces(newUser.nombre) || hasOnlySpaces(newUser.descripcion) || hasOnlySpaces(newUser.id_rol_id)) {
//     Swal.fire({
//       title: '¡Error!',
//       text: 'Los campos no pueden consistir solo en espacios en blanco.',
//       icon: 'error',
//     });
//     return;
//   }

setIsAddingProject(true); // Activa el estado para desactivar el botón


    fetch('https://localhost:8080/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el proyecto: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'El proyecto ha sido añadido.',
          icon: 'success',
        })
        setNewUser({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        id_usuario_id: '',
        id_estado_id: '',
        id_equipo_id: ''
        })}).catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir el proyecto.', 'error');
      }).finally(() => {
        setIsAddingProject(false); // Desactiva el estado después de que se complete la solicitud
      });;
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Añadir Proyecto"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Proyecto</h2>
      <form onSubmit={(e)=>handleAddProject(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Proyecto:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            minLength={6}
            value={newProject.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción:
          </label>
          <textarea
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="descripcion"
            value={newProject.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de inicio:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="date"
            name="fecha_inicio"
            value={newProject.fecha_inicio}
            onChange={handleInputChange}
            placeholder="Fecha de inicio"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Lider a cargo:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_usuario_id"
            value={newProject.id_usuario_id}
            onChange={handleInputChange}
            placeholder="Lider a cargo"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Estado:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_estado_id"
            value={newProject.id_estado_id}
            onChange={handleInputChange}
            placeholder="Estado del proyecto"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Equipo:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_equipo_id"
            value={newProject.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo a cargo"
          />
        </div>


        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md ${isAddingProject ? 'opacity-50 cursor-not-allowed disabled' : ''}`}
            type="submit">
            Añadir Proyecto
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded-md"
            onClick={onRequestClose}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddProjectModal;
