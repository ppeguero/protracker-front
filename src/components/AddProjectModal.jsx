import React, { useState, useEffect} from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


const AddProjectModal = ({ isOpen, onRequestClose, handleAddOrUpdate }) => {

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
    })
  }, [])


  const [newProject, setNewProject] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    id_usuario_id: (userRole !== 'Administrador' ? iduser : ''),
    id_estado_id: '',
    id_equipo_id: ''
  });
  const [isAddingProject, setIsAddingProject] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  const handleAddProject = (e) => {
    e.preventDefault()

    console.log("proyecto actualizado", newProject);


  setIsAddingProject(true); // Activa el estado para desactivar el botón


    fetch('https://localhost:8080/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el proyecto: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        handleAddOrUpdate({
          title: 'Añadido!',
          text: 'El proyecto ha sido añadido.',
          icon: 'success',
        })
        setNewProject({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
id_usuario_id: (userRole !== 'Administrador' ? newProject.id_usuario_id : iduser),
        id_estado_id: '',
        id_equipo_id: ''
        })}).catch((error) => {
        console.error('Fetch error:', error);
        // Swal.fire('Error', 'Hubo un error al añadir el proyecto.', 'error');
      }).finally(() => {
        setIsAddingProject(false); // Desactiva el estado después de que se complete la solicitud
      });;
  };

  const [users, setUsers] = useState([]);

    useEffect(() => {
      fetch("https://localhost:8080/api/users/")
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUsers(data);
        })
        .catch(error => console.error("Fetch error:", error));
    }, []);
  

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Añadir Proyecto"
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:w-3/6 p-8 rounded-md shadow-md"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">Añadir Proyecto</h2>
      <form onSubmit={(e)=>handleAddProject(e)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre del Proyecto:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="nombre"
            value={newProject.nombre}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descripción:
          </label>
          <textarea
            required
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            name="descripcion"
            value={newProject.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fecha de inicio:
          </label>
          <input
            required
            className="w-full px-3 py-2 border rounded-md"
            type="date"
            name="fecha_inicio"
            value={newProject.fecha_inicio}
            onChange={handleInputChange}
            placeholder="Fecha de inicio"
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
                value={newProject.id_usuario_id}
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
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Estado:
          </label>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_estado_id"
            value={newProject.id_estado_id}
            onChange={handleInputChange}
          >
            <option value="" disabled>Seleccionar Rol</option>
            <option value="2">En proceso</option>
            <option value="3">Pendiente</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Equipo:
          </label>
          {/* teams */}
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_equipo_id"
            value={newProject.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo a cargo"
          >
            <option value="" disabled>Equipo a cargo</option>
            { userRole === 'Administrador' ?
              teams.map((team) => (
                <option value={team.id_equipo}>{team.nombre}</option>
              ))
              :
              teams.map((team) => {
                if(team.id_usuario_id === iduser){
                  return (<option value={team.id_equipo}>{team.nombre}</option>)
                }}
              )
            }
          </select>

        </div>


        <div className="grid grid-cols-2 gap-2">
          <button
            className={`bg-green-500 hover:bg-green-700 w-full text-white font-bold py-2 px-4 rounded-md ${isAddingProject ? 'opacity-50 cursor-not-allowed disabled' : ''}`}
            type="submit">
            Añadir Proyecto
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

export default AddProjectModal;
