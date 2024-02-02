import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

const UpdateMemberModal = ({ isOpen, onRequestClose, handleAddOrUpdate, selectedMembers }) => {
  const [updatedMember, setUpdatedMember] = useState({
    id_usuario_id: selectedMembers.id_usuario_id || '',
    id_equipo_id: selectedMembers.id_equipo_id || '',
    id_especialidad_id: selectedMembers.id_especialidad_id || '',
  });

  const [isUpdatingMember, setIsUpdatingMember] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  useEffect(() => {
    setUpdatedMember({
      id_usuario_id: selectedMembers.id_usuario_id || '',
      id_equipo_id: selectedMembers.id_equipo_id || '',
      id_especialidad_id: selectedMembers.id_especialidad_id || '',
    });
  }, [selectedMembers]);

  const handleUpdateMember = (e) => {
    e.preventDefault();

    setIsUpdatingMember(true);

    fetch(`https://localhost:8080/api/members/${selectedMembers.id_miembro}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMember),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al actualizar el miembro: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        handleAddOrUpdate({
          title: 'Actualizado!',
          text: 'El miembro ha sido actualizado.',
          icon: 'success',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al actualizar el miembro.', 'error');
      })
      .finally(() => {
        setIsUpdatingMember(false);
        onRequestClose(); // Cierra el modal después de actualizar
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Actualizar Miembro"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Actualizar Miembro</h2>
      <form onSubmit={(e) => handleUpdateMember(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Equipo:
          </label>
          <input
            
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_equipo_id"
            value={updatedMember.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Usuario
          </label>
          <input
            
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_usuario_id"
            value={updatedMember.id_usuario_id}
            onChange={handleInputChange}
            placeholder="Usuario"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Especialidad
          </label>
          <input
            
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_especialidad_id"
            value={updatedMember.id_especialidad_id}
            onChange={handleInputChange}
            placeholder="Especialidad"
          />
        </div>  

        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded-md ${
              isUpdatingMember ? 'opacity-50 cursor-not-allowed disabled' : ''
            }`}
            type="submit"
          >
            Actualizar Miembro
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

export default UpdateMemberModal;
