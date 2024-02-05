import React, { useState, useEffect } from 'react';
import optionsIcon from '../assets/icons/options.png';
import teamIcon2 from '../assets/icons/team2.png';
import { Link } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function ProjectCardMember({ infoProyect, idProject, link, title, description, fecha_inicio }) {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
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
          <>
            <h4 className="text-[#EEF4ED] mt-5 font-bold text-xl">
              {title}
            </h4>
            <p className="text-white font-extralight mt-2 text-xs">
              Fecha de inicio: {formatDate(fecha_inicio)}
            </p>
          </>
        </div>
      </div>
    </Link>
  );
}

export default ProjectCardMember;
