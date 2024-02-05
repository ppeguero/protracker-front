import React from "react";
import Resource from "./Resource";
import plus from "../assets/icons/plus.png";
import { Link } from "react-router-dom";

function ProjectResources({id_project}) {

  
  // hacer la funcion de distinguir si es un miembro de equipo o un jefe de proyecto
  // para mostrar el boton de añadir recurso o no

  const isAdmin = false;

  return (
    <div className="flex flex-col bg-[#8DA8C5] w-fit p-10 rounded-md space-y-4 mb-6">
      <div className="flex justify-around items-center">
        <h3 className="text-[#13315C] text-3xl font-bold w-72">
          Recursos del proyecto
        </h3>
        {isAdmin && (
          <Link to={"/add-resource"} id_proyecto={id_project} className="bg-[#13315C] w-12 h-12 rounded-full flex justify-center items-center">
          <img src={plus} className="w-4 h-4"></img>
        </Link>
        )}
      </div>
      <div className="flex flex-col space-y-6">
        <Resource id_project={id_project}/>
      </div>
    </div>
  );
}

export default ProjectResources;
