import React, { useState, useEffect } from 'react';
import warning from '../assets/icons/warning.png';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function Tasks({ infoTask, profilePhoto }) {
  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;

  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null,
    name: decodedToken ? decodedToken.user_name : null,
  });

  const [userTaskInfo, setUserTaskInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:8080/api/users/task/${user.id_user}`)
      .then((response) => setUserTaskInfo(response.data))
      .catch((error) => console.error('Error fetching project details:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const isDateApproaching = (dateString) => {
    const currentDate = new Date();
    const taskDate = new Date(dateString);
  
    // Si la fecha de la tarea es hoy o en el pasado
    return taskDate <= currentDate; 
  };

  return (
    <li className='list-none'>
      {userTaskInfo[infoTask] && (
        <div className={`container w-full flex items-center justify-around px-10 py-5 rounded-xl space-x-6 ${isDateApproaching(userTaskInfo[infoTask]?.fecha_limite) ? 'bg-[#8DA8C5]' : 'bg-[#8DA8C5]' }`}>
          <div>
            <h6 className='text-white font-medium text-xs'>{userTaskInfo[infoTask]?.nombre}</h6>
            <p className='text-white font-extralight text-sm'>{userTaskInfo[infoTask]?.descripcion}</p>
            <p className='text-white font-extralight text-sm'>{userTaskInfo[infoTask]?.nombre_proyecto}</p>
            <p className='text-white font-extralight text-sm'>{formatDate(userTaskInfo[infoTask]?.fecha_limite)}</p>
          </div>
          <div>
            <img src={profilePhoto} className='w-12 h-12'></img>
          </div>
          {isDateApproaching(userTaskInfo[infoTask]?.fecha_limite) && <img src={warning} className='w-6 h-6'></img>}
        </div>
      )}
    </li>
  );
}

export default Tasks;