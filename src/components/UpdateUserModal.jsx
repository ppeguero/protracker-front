import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const UpdateUserModal = ({ isOpen, onRequestClose, handleAddOrUpdate, selectedUser }) => {
  const [updatedUser, setUpdatedUser] = useState({
    nombre: selectedUser.nombre || '',
    correo: selectedUser.correo || '',
    contraseña: '',  // Contraseña inicialmente vacía
    id_rol_id: selectedUser.id_rol_id || '',
  });

  useEffect(() => {
    // Actualizar los datos cuando cambia el usuario seleccionado
    setUpdatedUser({
      nombre: selectedUser.nombre || '',
      correo: selectedUser.correo || '',
      contraseña: '',  // Contraseña inicialmente vacía
      id_rol_id: selectedUser.id_rol_id || '',
    });
  }, [selectedUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleUpdateUser = (e) => {
    e.preventDefault()

//  // Validación de espacios en blanco
//  if (hasOnlySpaces(updatedUser.nombre) || hasOnlySpaces(updatedUser.contraseña) || hasOnlySpaces(updatedUser.id_rol_id)) {
//   Swal.fire({
//     title: '¡Error!',
//     text: 'Los campos no pueden consistir solo en espacios en blanco.',
//     icon: 'error',
//   });
//   return;
// }

    // Realizar la petición de actualizar usuario
    fetch(`https://localhost:8080/api/users/${selectedUser.id_usuario}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar el usuario: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Usuario actualizado con éxito:', data);
        handleAddOrUpdate({
          title: '¡Actualizado!',
          text: 'El usuario ha sido actualizado.',
          icon: 'success',
        })}).catch((error) => {
        console.error('Fetch error:', error);
        // Muestra detalles adicionales del error
        console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
        Swal.fire('Error', 'Hubo un error al actualizar el usuario.', 'error');
      });
    };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actualizar Usuario"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Usuario</h2>
      {/* Contenido del formulario para actualizar usuario */}
      <form onSubmit={handleUpdateUser}>
        {/* Campos del formulario */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Usuario:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            minLength={6}
            value={updatedUser.nombre}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo del Usuario:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="email"
            name="correo"
            value={updatedUser.correo}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Contraseña:
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="password"
            name="contraseña"
            value={updatedUser.contraseña}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            ID del Rol:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_rol_id"
            value={updatedUser.id_rol_id}
            onChange={handleInputChange}
          />
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

export default UpdateUserModal;
