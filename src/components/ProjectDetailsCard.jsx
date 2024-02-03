import React, { useState, useEffect } from "react";
import optionsIcon from "../assets/icons/options.png";
import profilePhoto from "../assets/images/pipa-img.png";
import arrowDown from "../assets/icons/arrow-down.png";

function ProjectDetailsCard({ idNumerico }) {

  const [projectDetail, setProjectDetail] = useState({})


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

  useEffect(() => {
    // Realizar la solicitud al endpoint de proyectos aquí
    // Puedes usar fetch, axios u otro método para obtener la información
  
    // Ejemplo usando fetch
    fetch(`https://localhost:8080/api/projects/${idNumerico}`)
      .then(response => response.json())
      .then(data => {
        setProjectDetail(data);
        console.log("Proyecto:", data);
        if(data.id_usuario_id !== user.id_user){
          window.location.href = "/project-manager-home";
        }else{
          setShow(true);
        }
      })
      .catch(error => console.error('Error al obtener proyectos:', error));
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente
  

  console.log(projectDetail);

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
            {projectDetail.nombre}
          </h2>
          <button>
            <img src={optionsIcon} className=""></img>
          </button>
        </div>
        <div className="flex justify-between items-center space-x-6 py-2">
          <div className="w-22">
            <p className="text-white font-extralight w-48">
              {projectDetail.descripcion}
            </p>
          </div>
          <div className="flex flex-col p-3 justify-center items-center">
            <img src={profilePhoto} className="my-4 w-24"></img>
            <div className="flex flex-col text-center text-[#134175] mb-2">
              <h2 className="font-semibold">Jefe de proyecto</h2>
              <h4 className="font-thin">{projectDetail.nombre_usuario}</h4>
            </div>
            <button className="bg-white hover:bg-[#D9D9D9] text-black font-semibold flex items-center w-[111px] justify-around h-[36px] rounded-md">
              <p>{projectDetail.nombre_estado}</p>
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
