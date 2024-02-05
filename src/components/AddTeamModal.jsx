import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

const AddTeamModal = ({ isOpen, onRequestClose, handleAddTeam, handleAddOrUpdate }) => {


  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; 
  const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevProject) => ({ ...prevProject, [name]: value }));
  };

    const [data, setData] = useState({
        nombre: '',
        miembros: [],
        id_usuario_id: (userRole !== 'Administrador' ? iduser : '')
    });

    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Obtener lista de usuarios del servidor
        fetch('https://localhost:8080/api/users')
            .then(response => response.json())
            .then(users => setUsuarios(users))
            .catch(error => console.error('Error al obtener usuarios:', error));
    }, []);

    const addTeam = (e) => {
        e.preventDefault();

           // Validación de campos vacíos
    if (!data.nombre || !data.id_usuario_id) {
        Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
        return;
        }
        // Validación de campos vacíos
        if (!data.nombre.trim()) {
          Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
          return;
        }
    
        if (!data.id_usuario_id) {
          Swal.fire('Error', 'Selecciona un usuario.', 'error');
          return;
        }
    
        // Enviar solicitud para agregar el equipo al servidor
        fetch('https://localhost:8080/api/teams', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Error al agregar el equipo: ${response.statusText}`);
            }
            return response.json();
          })
          .then((newTeam) => {
            handleAddOrUpdate({
                title: 'Añadido!',
                text: 'El equipo ha sido añadido.',
                icon: 'success',
              });
              setData({
                nombre: '',
                miembros: [],
                id_usuario_id: (userRole !== 'Administrador' ? iduser : '')
              });
            // Manejar la respuesta exitosa del servidor
            console.log('Equipo agregado con éxito:', newTeam);
            // Puedes realizar acciones adicionales después de agregar el equipo si es necesario
            handleAddTeam();
          })
          .catch((error) => {
            // Manejar errores durante la solicitud
            console.error('Error al agregar el equipo:', error);
            // Puedes mostrar un mensaje de error al usuario si es necesario
          })
          .finally(() => {
            // Cerrar el modal independientemente del resultado de la solicitud
            onRequestClose();
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
            contentLabel="Agregar Equipo"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-3/6 bg-white p-8 rounded-md shadow-md"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <h2 className="text-2xl font-bold mb-4">Agregar Equipo</h2>
            <form onSubmit={(e) => addTeam(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Nombre
                    </label>
                    <input
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        type="text"
                        name="nombre"
                        value={data.nombre}
                        onChange={(e) => setData({ ...data, nombre: e.target.value })}
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
                value={data.id_usuario_id}
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
                        Agregar Equipo
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

export default AddTeamModal;
