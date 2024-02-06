import React from "react";
import profilePicture from "../assets/images/pipa-img.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";

function TeamRequestCard({ resource }) {
  console.log(resource);

  // Función para formatear las fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return resource && (resource.aprobado !== 0 && resource.aprobado !== 1) ? (
    <div className="bg-[#EEF4ED] h-fit w-[1000px] rounded-md flex justify-between items-center p-5 mt-5">
      <Link to={`/request-details/${resource.id_solicitud_recurso}`} className="container">
        <div className="flex">
          <img src={profilePicture} className="w-12 mx-6" alt="Profile"></img>
          <div className="ml-4">
            <p className="font-semibold text-[#134175] mr-6">Nombre del recurso</p>
            <p className="text-sm text-[#134175] font-light">{resource.nombre_recurso}</p>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-[#134175] mr-6">Cantidad</p>
            <p className="text-sm text-[#134175] mr-6 font-light">{resource.cantidad}</p>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-[#134175] mr-6">Fecha Inicio</p>
            <p className="text-sm text-[#134175] mr-6 font-light">{formatDate(resource.fecha_de_inicio)}</p>
          </div>
          <div className="ml-4">
            <p className="font-semibold text-[#134175] mr-6">Fecha de retorno</p>
            <p className="text-sm text-[#134175] mr-6 font-light">{formatDate(resource.fecha_retorno)}</p>
          </div>
        </div>
      </Link>
    </div>
  ) : null;
}

export default TeamRequestCard;
