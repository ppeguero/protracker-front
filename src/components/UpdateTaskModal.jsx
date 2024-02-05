import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

const UpdateTaskModal = ({ isOpen, onRequestClose, handleAddOrUpdate, selectedUser }) => {

    const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
    const userRole = decodedToken ? decodedToken.rol_name : null; 
    const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario
    
    
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
      


  const [updatedTask, setUpdatedTask] = useState({
    nombre: selectedUser.nombre_tarea || '',
    descripcion: selectedUser.descripcion || '',
    fecha_limite: formatDate(selectedUser.fecha_limite) || '',
    id_proyecto_id: selectedUser.id_proyecto_id || '',
    id_estado_id: selectedUser.id_estado_id || '',
    id_miembro_id: selectedUser.id_miembro_id || '', // Por defecto, mantén el ID de rol del usuario seleccionado
  });

  

  useEffect(() => {
    setUpdatedTask({
        nombre: selectedUser.nombre_tarea || '',
        descripcion: selectedUser.descripcion || '',
        fecha_limite: formatDate(selectedUser.fecha_limite) || '',
        id_proyecto_id: selectedUser.id_proyecto_id || '',
        id_estado_id: selectedUser.id_estado_id || '',
        id_miembro_id: selectedUser.id_miembro_id || '', // Por defecto, mantén el ID de rol del usuario seleccionado
    });
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTask((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const { value } = e.target;
    // Asigna el ID de rol correspondiente al valor seleccionado
    setUpdatedTask((prevUser) => ({ ...prevUser, id_rol_id: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();


 // Validación de campos vacíos
 if (!updatedTask.nombre || !updatedTask.descripcion || !updatedTask.fecha_limite || !updatedTask.id_proyecto_id || !updatedTask.id_estado_id || !updatedTask.id_miembro_id) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!updatedTask.nombre.trim() || !updatedTask.descripcion.trim() || !updatedTask.fecha_limite.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!updatedTask.fecha_limite || updatedTask.fecha_limite < today) {
        Swal.fire('Error', 'La fecha de inicio del proyecto no puede estar en el pasado.', 'error');
        return;
    }

    if (!updatedTask.id_proyecto_id) {
      Swal.fire('Error', 'Selecciona un equipo para el proyecto.', 'error');
      return;
    }

    if (!updatedTask.id_estado_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }

    if (!updatedTask.id_miembro_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }


    // Realizar la petición de actualizar usuario
    fetch(`https://localhost:8080/api/tasks/${selectedUser.id_tarea}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar la tarea: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Tarea actualizada con éxito:', data);
        handleAddOrUpdate({
          title: '¡Actualizado!',
          text: 'La tarea ha  sido actualizada.',
          icon: 'success',
        });
      }).catch((error) => {
        console.error('Fetch error:', error);
        // Muestra detalles adicionales del error
        console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
        Swal.fire('Error', 'Hubo un error al actualizar la tarea.', 'error');
      });
  };

  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);


  useEffect(() => {
    fetch("https://localhost:8080/api/members/")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUsers(data);
        })
        .catch(error => console.error("Fetch error:", error));

    fetch(`https://localhost:8080/api/projects`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        console.log(data);
      })
      .catch(error => console.error("Fetch error:", error));
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actualizar Usuario"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Tarea</h2>
      {/* Contenido del formulario para actualizar usuario */}
      <form onSubmit={handleUpdateUser}>
      <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={updatedTask.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">descripcion:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="descripcion"
            value={updatedTask.descripcion}
            onChange={handleInputChange}
            placeholder="descripcion"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Fecha límite:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="date"
            name="fecha_limite"
            value={updatedTask.fecha_limite}
            onChange={handleInputChange}
            placeholder="Fecha límite"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Proyecto: </label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_proyecto_id"
            value={updatedTask.id_proyecto_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar Proyecto</option>
            {teams.map((team) => { 
                if(iduser != team.id_usuario_id){
                    return null;
                }

                  return(
                    <option value={team.id_proyecto}>{team.nombre}</option>
                  )
                  
                })}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Estado: </label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_estado_id"
            value={updatedTask.id_estado_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar Estado</option>
            <option value="2" >En Proceso</option>
            <option value="3" >Pendiente</option>

          </select>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Miembro:
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_miembro_id"
                value={updatedTask.id_miembro_id}
                onChange={handleInputChange}
                placeholder="Miembro"
              >
                <option value="" disabled>Seleccionar Miembro</option>
                {users.map((user) => {
                  
                  if(user.id_rol_id != 3){
                    return null;
                  }
                  
                  return(
                    <option value={user.id_miembro}>{user.nombre_usuario}</option>
                  )
                  
                })}
              </select>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Actualizar Usuario
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

export default UpdateTaskModal;
