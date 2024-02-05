import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

const AddTaskModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {

    
const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
const userRole = decodedToken ? decodedToken.rol_name : null; 
const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario


  const [task, setNewTask] = useState({
    nombre: '',
    descripcion: '',
    fecha_limite: '',
    id_proyecto_id: '',
    id_estado_id: '',
    id_miembro_id: '',
  });

  const [isAddingUser, setIsAddingUser] = useState(false);

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(task);

 // Validación de campos vacíos
 if (!task.nombre || !task.descripcion || !task.fecha_limite || !task.id_proyecto_id || !task.id_estado_id || !task.id_miembro_id) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!task.nombre.trim() || !task.descripcion.trim() || !task.fecha_limite.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!task.fecha_limite || task.fecha_limite < today) {
        Swal.fire('Error', 'La fecha de inicio del proyecto no puede estar en el pasado.', 'error');
        return;
    }

    if (!task.id_proyecto_id) {
      Swal.fire('Error', 'Selecciona un equipo para el proyecto.', 'error');
      return;
    }

    if (!task.id_estado_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }

    if (!task.id_miembro_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }


    setIsAddingUser(true); // Activa el estado para desactivar el botón

    fetch('https://localhost:8080/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir la tarea: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Usuario añadido con éxito:', data);
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'La tarea ha sido añadida.',
          icon: 'success',
        });
        setNewTask({
        nombre: '',
        descripcion: '',
        fecha_limite: '',
        id_proyecto_id: '',
        id_estado_id: '',
        id_miembro_id: '',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir la tarea.', 'error');
      })
      .finally(() => {
        setIsAddingUser(false); // Desactiva el estado después de que se complete la solicitud
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
      contentLabel="Añadir Usuario"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Tarea</h2>
      <form onSubmit={handleAddUser}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={task.nombre}
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
            value={task.descripcion}
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
            value={task.fecha_limite}
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
            value={task.id_proyecto_id}
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
            value={task.id_estado_id}
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
                value={task.id_miembro_id}
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

        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md ${
              isAddingUser ? 'opacity-50 cursor-not-allowed disabled' : ''
            }`}
            type="submit"
          >
            Añadir Usuario
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

export default AddTaskModal;
