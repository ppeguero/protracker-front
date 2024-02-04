import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


const UpdateProjectModal = ({ isOpen, onRequestClose, handleAddOrUpdate, selectedProject }) => {
  const [updatedProject, setUpdatedProject] = useState({
    nombre: selectedProject.nombre || '',
    descripcion: selectedProject.descripcion || '',
    fecha_inicio: selectedProject.fecha_inicio || '',
    id_usuario_id: selectedProject.id_usuario_id || '',
    id_estado_id: selectedProject.id_estado_id || '',
    id_equipo_id: selectedProject.id_equipo_id || ''
  });

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; 
  const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario

  const [teams, setTeams] = useState([])



  useEffect(() => {
    fetch(`https://localhost:8080/api/teams`)
    .then(response => response.json())
    .then(data => {
      setTeams(data.equipos);
      // console.log(data.equipos);
    })
  }, [])

  useEffect(() => {
    // Actualizar los datos cuando cambia el proyecto seleccionado
    setUpdatedProject({
      nombre: selectedProject.nombre || '',
      descripcion: selectedProject.descripcion || '',
      fecha_inicio: formatDate(selectedProject.fecha_inicio) || '', // Convert the date format      id_usuario_id: selectedProject.id_usuario_id || '',
      id_estado_id: selectedProject.id_estado_id || '',
      id_equipo_id: selectedProject.id_equipo_id || ''
    });

  }, [selectedProject]);

  const formatDate = (dateString) => {
    try {
      if (!dateString) {
        return ''; // Return empty string for invalid or empty date
      }
  
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return ''; // Return empty string for invalid date
      }
  
      const formattedDate = date.toISOString().split('T')[0];
      return formattedDate;
    } catch (error) {
      console.error('Error formatting date:', error);
      return ''; // Return empty string for any unexpected error
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleUpdateProject = (e) => {
    e.preventDefault();

    // Validación de espacios en blanco
    if (hasOnlySpaces(updatedProject.nombre) || hasOnlySpaces(updatedProject.descripcion)) {
      Swal.fire({
        title: '¡Error!',
        text: 'Los campos no pueden consistir solo en espacios en blanco.',
        icon: 'error',
      });
      return;
    }

    // Realizar la petición de actualizar proyecto
    fetch(`https://localhost:8080/api/projects/${selectedProject.id_proyecto}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar el proyecto: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Proyecto actualizado con éxito:', data);
        handleAddOrUpdate({
          title: '¡Actualizado!',
          text: 'El proyecto ha sido actualizado.',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Muestra detalles adicionales del error
        console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
        Swal.fire('Error', 'Hubo un error al actualizar el proyecto.', 'error');
      })
      .finally(() => {
        onRequestClose(); // Cierra el modal después de la actualización
      });
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://localhost:8080/api/users/")
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        setUsers(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, []);


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actualizar Proyecto"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:w-3/6 p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Proyecto</h2>
      {/* Contenido del formulario para actualizar proyecto */}
      <form onSubmit={handleUpdateProject}>
        {/* Campos del formulario */}
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
            value={updatedProject.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción:
          </label>
          <textarea
            required
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            type="text"
            name="descripcion"
            value={updatedProject.descripcion}
            onChange={handleInputChange}
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
            value={updatedProject.fecha_inicio}
            onChange={handleInputChange}
          />
        </div>

        {
            userRole === 'Administrador' ?
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
            Líder a cargo:
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_usuario_id"
                value={updatedProject.id_usuario_id}
                onChange={handleInputChange}
                placeholder="Líder a cargo"
              >
                <option value="" disabled>Líder a cargo</option>
                {
                  users.map((user) => { 
                    if(user.nombre_rol === 'Project Manager'){
                      return(<option value={user.id_equipo}>{user.nombre}</option>)
                    }
                  })
                }
              </select>
         
        </div>
          :
          null
          }

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Estado:
          </label>
           <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_estado_id"
            value={updatedProject.id_estado_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar Rol</option>
            {/* <option value="1">Completado</option> */}
            <option value="2">En proceso</option>
            <option value="3">Pendiente</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Equipo a cargo:
          </label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_equipo_id"
            value={updatedProject.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo a cargo"
          >
            <option value="" disabled>Equipo a cargo</option>
            {
              teams.map((team) => (
                <option value={team.id_equipo}>{team.nombre}</option>
              ))
            }
          </select>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Actualizar Proyecto
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

export default UpdateProjectModal;
