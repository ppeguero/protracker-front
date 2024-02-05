import React from 'react';
import optionsIcon from '../assets/icons/options.png';
import teamIcon2 from '../assets/icons/team2.png';
import { Link } from 'react-router-dom';

function ProjectCard({ title, idProject, link, description, fecha_inicio }) {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <Link to={`${link}/${idProject}`} className="">
      <div className="container">
        <div className="flex flex-col h-56 bg-[#134175] rounded-lg p-8 my-5 w-72">
          <div className='flex justify-between'>
            <div className=''>
              <img src={teamIcon2} alt="Team Icon" />
            </div>
            {/* <button>
              <img src={optionsIcon} className=''></img>
            </button> */}
          </div>
          <h4 className="text-[#EEF4ED] font-bold mt-5 text-xl w-48">{title}</h4>
          <h4 className="text-[#EEF4ED] font-extralight mt-5 text-xs">Fecha Inicio: {formatDate(fecha_inicio)}</h4>
          {/* <p className='text-white font-extralight mt-6 text-xs'>15 tareas | 80%</p> */}
          {/* <p className='text-white font-extralight mt-6 text-xs text-wrap truncate'>{description}</p> */}
        </div>
      </div>
    </Link>
  );
}

export default ProjectCard;
