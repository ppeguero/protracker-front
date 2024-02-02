import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UpdateTeamModal = ({ isOpen, onRequestClose, handleUpdateTeam, selectedTeam }) => {
  const [updatedTeam, setUpdatedTeam] = useState({
    nombre: selectedTeam.nombre || '',
    miembros: selectedTeam.miembros || [],
  });

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

  const handleCheckboxChange = (userId) => {
    setUpdatedTeam(prevData => {
      if (prevData.miembros.includes(userId)) {
        // Si el usuario ya está en la lista de miembros, quítalo
        return {
          ...prevData,
          miembros: prevData.miembros.filter(memberId => memberId !== userId)
        };
      } else {
        // Si el usuario no está en la lista de miembros, agrégalo
        return {
          ...prevData,
          miembros: [...prevData.miembros, userId]
        };
      }
    });
  };

  const updateTeam = (e) => {
    e.preventDefault();

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

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actualizar Equipo"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
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
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Miembros
          </label>
          <div>
            {usuarios.map(usuario => (
              <div key={usuario.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`user_${usuario.id}`}
                  checked={updatedTeam.miembros.includes(usuario.id)}
                  onChange={() => handleCheckboxChange(usuario.id)}
                  className="mr-2"
                />
                <label htmlFor={`user_${usuario.id}`}>{usuario.nombre}</label>
              </div>
            ))}
          </div>
        </div>
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
