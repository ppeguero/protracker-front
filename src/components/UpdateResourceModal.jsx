import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

const UpdateResourceModal = ({ isOpen, onRequestClose, handleAddOrUpdate, selectedResource }) => {
    const [updatedResource, setUpdatedResource] = useState({
        nombre: selectedResource.nombre || '',
        descripcion: selectedResource.descripcion || '',
        tipo: selectedResource.tipo || '',
        cantidad: selectedResource.cantidad || '',
      }
      );



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
    setUpdatedResource({
        nombre: selectedResource.nombre || '',
        descripcion: selectedResource.descripcion || '',
        tipo: selectedResource.tipo || '',
        cantidad: selectedResource.cantidad || '',
      });
    
  }, [selectedResource]);

  useEffect(()=>{
    console.log(updatedResource);
  }, [updatedResource])

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
    setUpdatedResource((prevProject) => ({ ...prevProject, [name]: value }));
  };

  function hasOnlySpaces(str) {
    return str.trim() === '';
  }

  const handleUpdateProject = (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!updatedResource.nombre || !updatedResource.descripcion || !updatedResource.tipo || !updatedResource.cantidad) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!updatedResource.nombre.trim() || !updatedResource.descripcion.trim() || !updatedResource.tipo.trim()) {
        Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
        return;
    }


    // Realizar la petición de actualizar proyecto
    fetch(`https://localhost:8080/api/resource/${selectedResource.id_recurso}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedResource),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar el recurso: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Recurso actualizado con éxito:', data);
        handleAddOrUpdate({
          title: '¡Actualizado!',
          text: 'El recurso ha sido actualizado.',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        // Muestra detalles adicionales del error
        console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
        Swal.fire('Error', 'Hubo un error al actualizar el recurso.', 'error');
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
      contentLabel="Actualizar Recurso"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:w-3/6 p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Recurso</h2>
      {/* Contenido del formulario para actualizar proyecto */}
      <form onSubmit={handleUpdateProject}>
        {/* Campos del formulario */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Nombre del Recurso:</label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={updatedResource.nombre}
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
            value={updatedResource.descripcion}
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
            value={updatedResource.tipo}
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
            value={updatedResource.cantidad}
            onChange={handleInputChange}
          >
          </input>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md"
            type="submit"
          >
            Actualizar Recurso
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

export default UpdateResourceModal;
