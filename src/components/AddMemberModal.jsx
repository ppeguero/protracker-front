import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';


const AddMemberModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {
  const [newMember, setNewMember] = useState({
    id_usuario_id: '',
    id_equipo_id: '',
    id_especialidad_id: '',
  });

  const [isAddingMember, setIsAddingMember] = useState(false);


//   function hasOnlySpaces(str) {
//     return str.trim() === '';
//   }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleAddMember = (e) => {
    e.preventDefault()

//     // Validación de espacios en blanco
//   if (hasOnlySpaces(newUser.nombre) || hasOnlySpaces(newUser.descripcion) || hasOnlySpaces(newUser.id_rol_id)) {
//     Swal.fire({
//       title: '¡Error!',
//       text: 'Los campos no pueden consistir solo en espacios en blanco.',
//       icon: 'error',
//     });
//     return;
//   }

setIsAddingMember(true); // Activa el estado para desactivar el botón


    fetch('https://localhost:8080/api/members/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMember),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el miembro: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'El miembro ha sido añadido.',
          icon: 'success',
        })
        setNewUser({
            id_usuario_id: '',
            id_equipo_id: '',
            id_especialidad_id: '',
        })}).catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir el miembro.', 'error');
      }).finally(() => {
        setIsAddingMember(false); // Desactiva el estado después de que se complete la solicitud
      });;
  };
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Añadir Miembro"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Miembro</h2>
      <form onSubmit={(e)=>handleAddMember(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Equipo:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_equipo_id"
            value={newMember.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Usuario
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_usuario_id"
            value={newMember.id_usuario_id}
            onChange={handleInputChange}
            placeholder="Usuario"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Especialidad
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="id_especialidad_id"
            value={newMember.id_especialidad_id}
            onChange={handleInputChange}
            placeholder="Especialidad"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md ${isAddingMember ? 'opacity-50 cursor-not-allowed disabled' : ''}`}
            type="submit">
            Añadir Miembro
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

export default AddMemberModal;
