import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

const AddMemberModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; 
  const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario

  const [newMember, setNewMember] = useState({
    id_usuario_id: '',
    id_equipo_id: '',
    id_especialidad_id: '',
  });

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMember((prevMember) => ({ ...prevMember, [name]: value }));
  };

  const handleAddMember = (e) => {
    e.preventDefault()

            // Validación de campos vacíos
            if (!newMember.id_usuario_id || !newMember.id_equipo_id || !newMember.id_especialidad_id) {
            Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
            return;
            }

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
        setNewMember({
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

  useEffect(() => {
    fetch("https://localhost:8080/api/users/")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUsers(data);
        })
        .catch(error => console.error("Fetch error:", error));

    fetch(`https://localhost:8080/api/teams`)
      .then(response => response.json())
      .then(data => {
        setTeams(data.equipos);
        console.log(data.equipos);
      })
      .catch(error => console.error("Fetch error:", error));
  }, [])
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Añadir Miembro"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Miembro</h2>
      <form onSubmit={(e)=>handleAddMember(e)}>
        {
            userRole === 'Administrador' ?
            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Equipo:
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_equipo_id"
                value={newMember.id_equipo_id}
                onChange={handleInputChange}
                placeholder="Seleccionar Equipo"
              >
                <option value="" disabled>Seleccionar Equipo</option>
                {teams.map((team) => { 
                  return(
                    <option value={team.id_equipo}>{team.nombre}</option>
                  )
                  
                })}
              </select>
        </div>
          :
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Equipo:
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_equipo_id"
                value={newMember.id_equipo_id}
                onChange={handleInputChange}
                placeholder="Equipo"
              >
                <option value="" disabled>Seleccionar Equipo</option>
                {teams.map((team) => { 
                  if(team.id_usuario_id === iduser){
                    return (<option value={team.id_equipo}>{team.nombre}</option>)
                  }
                })}
              </select>
        </div>
          }


            <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Usuario:
              </label>
              <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_usuario_id"
                value={newMember.id_usuario_id}
                onChange={handleInputChange}
                placeholder="Equipo"
              >
                <option value="" disabled>Seleccionar Usuario</option>
                {users.map((user) => {
                  
                  if(user.id_rol_id != 3){
                    return null;
                  }
                  
                  return(
                    <option value={user.id_usuario}>{user.nombre}</option>
                  )
                  
                })}
              </select>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Especialidad
          </label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_especialidad_id"
            value={newMember.id_especialidad_id}
            onChange={handleInputChange}
          >
            <option value="">Seleccionar Rol</option>
            <option value="1">Programador</option>
            <option value="2">Diseñador</option>
          </select>
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
