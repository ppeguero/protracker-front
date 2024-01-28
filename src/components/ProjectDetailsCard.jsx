import React, { useState, useEffect } from "react";
import optionsIcon from "../assets/icons/options.png";
import profilePhoto from "../assets/images/pipa-img.png";
import arrowDown from "../assets/icons/arrow-down.png";

function ProjectDetailsCard() {
  const [projectData, setProjectData] = useState({
    name: "Sistema de gestión de estadías",
    description: `Diseñar un Sistema de Gestión de Estadías que
    permita organizar de manera efectiva la información
    crítica sobre proyectos, equipos y miembros del equipo.
    
    El sistema debe tener la capacidad de gestionar los 
    recursos y activos asociados a cada proyecto. Cada
    recurso, ya sea material o humano...`,
    managerName: "Rafael Villegas",
    state: "En curso",
    totalTasks: 18,
    completedTasks: 15,
  });

  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const percentage =
      (projectData.completedTasks * 100) / projectData.totalTasks;
    setCompletionPercentage(Math.round(percentage));
  }, [projectData.completedTasks, projectData.totalTasks]);

  return (
    <div className="container mt-12">
      <div className="flex flex-col h-fit bg-[#8DA8C5] rounded-lg p-8 w-fit">
        <div className="flex h-fit justify-between">
          <h2 className="text-[#134175] font-bold text-4xl w-80">
            {projectData.name}
          </h2>
          <button>
            <img src={optionsIcon} className=""></img>
          </button>
        </div>
        <div className="flex justify-between items-center space-x-6 py-2">
          <div className="w-22">
            <p className="text-white font-extralight w-48">
              {projectData.description}
            </p>
          </div>
          <div className="flex flex-col p-3 justify-center items-center">
            <img src={profilePhoto} className="my-4 w-24"></img>
            <div className="flex flex-col text-center text-[#134175] mb-2">
              <h2 className="font-semibold">Jefe de proyecto</h2>
              <h4 className="font-thin">{projectData.managerName}</h4>
            </div>
            <button className="bg-white hover:bg-[#D9D9D9] text-black font-semibold flex items-center w-[111px] justify-around h-[36px] rounded-md">
              <p>{projectData.state}</p>
              <img src={arrowDown}></img>
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <p className="text-white font-thin">{projectData.completedTasks} tareas completadas</p>
          <p className="text-[#134175] font-medium">{completionPercentage}%</p>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetailsCard;
