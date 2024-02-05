import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const AddUserModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {
  const [newUser, setNewUser] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    id_rol_id: '',
  });

  const [isAddingUser, setIsAddingUser] = useState(false);

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();


       // Validación de campos vacíos
    if (!newUser.nombre || !newUser.correo || !newUser.contraseña || !newUser.id_rol_id) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!newUser.nombre.trim() || !newUser.correo.trim() || !newUser.contraseña.trim() || !newUser.id_rol_id.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    if (!newUser.id_rol_id) {
      Swal.fire('Error', 'Selecciona un rol para el usuario.', 'error');
      return;
    }



    // Validación de espacios en blanco
    if (hasOnlySpaces(newUser.nombre) || hasOnlySpaces(newUser.contraseña) || hasOnlySpaces(newUser.id_rol_id)) {
      Swal.fire({
        title: '¡Error!',
        text: 'Los campos no pueden consistir solo en espacios en blanco.',
        icon: 'error',
      });
      return;
    }

    setIsAddingUser(true); // Activa el estado para desactivar el botón

    fetch('https://localhost:8080/api/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el usuario: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Usuario añadido con éxito:', data);
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'El usuario ha sido añadido.',
          icon: 'success',
        });
        setNewUser({
          nombre: '',
          correo: '',
          contraseña: '',
          id_rol_id: '',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir el usuario.', 'error');
      })
      .finally(() => {
        setIsAddingUser(false); // Desactiva el estado después de que se complete la solicitud
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Añadir Usuario"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Usuario</h2>
      <form onSubmit={handleAddUser}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Usuario:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={newUser.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Correo del Usuario:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="email"
            name="correo"
            value={newUser.correo}
            onChange={handleInputChange}
            placeholder="Correo"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="password"
            name="contraseña"
            value={newUser.contraseña}
            onChange={handleInputChange}
            placeholder="Contraseña"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Rol:</label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_rol_id"
            value={newUser.id_rol_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar Rol</option>
            <option value="1">Administrador</option>
            <option value="2">Project Manager</option>
            <option value="3">Miembro</option>
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

export default AddUserModal;
