import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import jwt_decode from 'jwt-decode';

const AddTeamModal = ({ isOpen, onRequestClose, handleAddTeam }) => {


    const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
    const iduser = decodedToken ? decodedToken.idUser : null; // Esto contendrá el rol o los permisos del usuario
  

    const [data, setData] = useState({
        nombre: '',
        miembros: [],
        id_usuario_id: iduser
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

    const handleCheckboxChange = (userId) => {
        setData(prevData => {
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
                                    checked={data.miembros.includes(usuario.id)}
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
