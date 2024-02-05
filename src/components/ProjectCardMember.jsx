import React, { useState, useEffect } from 'react';
import optionsIcon from '../assets/icons/options.png';
import teamIcon2 from '../assets/icons/team2.png';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function ProjectCardMember({ infoProyect, idProject, link }) {
  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;

  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null,
    name: decodedToken ? decodedToken.user_name : null,
  });

  const [userProjectInfo, setUserProjectInfo] = useState([]);

  useEffect(() => {
    axios
      .get(`https://localhost:8080/api/users/proyect/${user.id_user}`)
      .then((response) => setUserProjectInfo(response.data))
      .catch((error) => console.error('Error fetching project details:', error));
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Link to={`${link}/${idProject}`} className="">
      <div className="container">
        <div className="flex flex-col h-56 bg-[#134175] rounded-lg p-9 mb-5 w-96">
          <div className="flex justify-between">
            <div>
              <img src={teamIcon2} alt="Team Icon" />
            </div>
            <button>
              <img src={optionsIcon} alt="Options Icon" />
            </button>
          </div>
          {userProjectInfo[infoProyect] ? (
            <>
              <h4 className="text-[#EEF4ED] mt-5 font-bold text-xl">
                Nombre del proyecto: {userProjectInfo[infoProyect]?.nombre}
              </h4>
              <p className="text-white font-extralight mt-4 text-xs">
                Descripción: {userProjectInfo[infoProyect]?.descripcion}
              </p>
              <p className="text-white font-extralight mt-2 text-xs">
                Fecha de inicio: {formatDate(userProjectInfo[infoProyect]?.fecha_inicio)}
              </p>
            </>
          ) : (
            <p className="text-white font-extralight mt-10 text-xs">No hay información de algún proyecto disponible.</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCardMember;