import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const UpdateTeamModal = ({ isOpen, onRequestClose, handleUpdateTeam, handleAddOrUpdate, selectedTeam }) => {
  
  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; 
  const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario


  const [updatedTeam, setUpdatedTeam] = useState({
    nombre: selectedTeam.nombre || '',
    miembros: selectedTeam.miembros || [],
    id_usuario_id: (userRole !== 'Administrador' ? iduser : selectedTeam.id_usuario_id)
  });

  useEffect(() => {
    console.log(selectedTeam);
    // Actualizar los datos cuando cambia el usuario seleccionado
    setUpdatedTeam({
      nombre: selectedTeam.nombre || '',
      miembros: selectedTeam.miembros || [],
      id_usuario_id: (userRole !== 'Administrador' ? iduser : selectedTeam.id_usuario_id)
    });
  }, [selectedTeam]);

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Obtener lista de usuarios del servidor
    fetch('https://localhost:8080/api/users')
      .then(response => response.json())
      .then(users => setUsuarios(users))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTeam((prevData) => ({ ...prevData, [name]: value }));
  };

  const updateTeam = (e) => {
    e.preventDefault();
    console.log(updatedTeam.id_usuario_id);
    console.log(updatedTeam.nombre);
    // Validación de campos vacíos
    if (!updatedTeam.nombre || !updatedTeam.id_usuario_id) {
      Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
      return;
      }
      // Validación de campos vacíos
      if (!updatedTeam.nombre.trim()) {
        Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
        return;
      }
  
      if (!updatedTeam.id_usuario_id) {
        Swal.fire('Error', 'Selecciona un usuario.', 'error');
        return;
      }
          

    // Lógica de actualización del equipo
    fetch(`https://localhost:8080/api/teams/${selectedTeam.id_equipo}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTeam),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar el equipo: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Equipo actualizado con éxito:', data);
        handleAddOrUpdate({
          title: '¡Actualizado!',
          text: 'El equipo ha sido actualizado.',
          icon: 'success',
        });
        // Después de actualizar el equipo, llamar a la función handleUpdateTeam
        handleUpdateTeam();
        // Cerrar el modal
        onRequestClose();
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Muestra detalles adicionales del error
        console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
        // Puedes manejar el error como desees, por ejemplo, mostrar un mensaje de error al usuario
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
      contentLabel="Actualizar Equipo"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Equipo</h2>
      <form onSubmit={updateTeam}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={updatedTeam.nombre}
            onChange={handleInputChange}
            placeholder="Nombre del equipo"
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
                value={updatedTeam.id_usuario_id}
                onChange={handleInputChange}
                placeholder="Líder a cargo"
              >
                <option value="" disabled>Líder a cargo</option>
                {users.map((user) => { 
                  if(user.nombre_rol === 'Project Manager'){
                    return (<option value={user.id_usuario}>{user.nombre}</option>)
                  }
                })}
              </select>
         
        </div>
          :
          null
          }
       
        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Actualizar Equipo
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

export default UpdateTeamModal;
