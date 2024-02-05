import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const AddResourceModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {
  const [newResource, setNewResource] = useState({
    nombre: "",
    descripcion: "",
    tipo: "",
    cantidad: 1
  }
  );

  const [isAddingUser, setIsAddingUser] = useState(false);

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();


       // Validación de campos vacíos
    if (!newResource.nombre || !newResource.descripcion || !newResource.tipo || !newResource.cantidad) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!newResource.nombre.trim() || !newResource.descripcion.trim() || !newResource.tipo.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    setIsAddingUser(true); // Activa el estado para desactivar el botón

    fetch('https://localhost:8080/api/resource/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newResource),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el recurso: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        // console.log('Usuario añadido con éxito:', data);
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'El recurso ha sido añadido.',
          icon: 'success',
        });
        setNewResource({
          nombre: '',
          descripcion: '',
          tipo: '',
          cantidad: '',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir el recurso.', 'error');
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
      <h2 className="text-2xl font-bold mb-4">Añadir Recurso</h2>
      <form onSubmit={handleAddUser}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Recurso:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={newResource.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Descripción:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="descripcion"
            value={newResource.descripcion}
            onChange={handleInputChange}
            placeholder="Descripcion"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Tipo:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="tipo"
            value={newResource.tipo}
            onChange={handleInputChange}
            placeholder="Tipo"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Cantidad:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            name="cantidad"
            type='number'
            min='1'
            value={newResource.cantidad}
            onChange={handleInputChange}
          >
          </input>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md ${
              isAddingUser ? 'opacity-50 cursor-not-allowed disabled' : ''
            }`}
            type="submit"
          >
            Añadir Recurso
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

export default AddResourceModal;
