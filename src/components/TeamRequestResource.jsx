import React, { useState, useEffect } from "react";
import options from "../assets/icons/options.png";
import plusIcon from "../assets/icons/plus.png";
import TeamMember from "./TeamMember";
import TeamRequestCard from "./TeamRequestCard";

function TeamRequestResource({ idNumerico }) {
  // Añadir la validacion que si detecta que es el jefe de proyecto, se muestre el botón de añadir miembro

  const [manager, setManager] = useState(false);
  const [showScrollMessage, setShowScrollMessage] = useState(true);
  // cosnt [idRequest, setIdRequest] = useState(null);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      setShowScrollMessage(scrollPos <= 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [resources, setResources] = useState([]);
  const [request, setRequest] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:8080/api/resource/request`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setResources(data);
      })
  }, []);
  
  useEffect(() => {
    if (resources) {
      const filtered = resources.filter(resource => resource.id_proyecto_id === idNumerico);
      console.log("filtr", filtered);
      setRequest(filtered);
    }
  }, [resources]);
  


  return (
    <div className="w-[1215px] flex flex-col bg-[#8DA8C5] h-fit py-10 rounded-md space-y-4 mb-10">
      <div className="flex justify-evenly items-center px-36">
        {manager && (
          <button className="bg-[#13315C] rounded-full w-10 h-10 flex justify-center items-center mr-4">
            <img src={plusIcon} className="w-6"></img>
          </button>
        )}
        <h3 className="text-[#13315C] text-4xl font-bold w-full">Solicitudes de Recursos</h3>
        <button>
          <img src={options}></img>
        </button>
      </div> 
      <div className="justify-start flex flex-col mx-auto overflow-y-auto h-[400px] px-1 scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin">
        {
          request && request.length > 0?
          request.map(resource => {
              return (
                <TeamRequestCard key={resource.id} resource={resource} />
              )
            })
            :
            null
        }

      </div>
      
    </div>
  );
}

export default TeamRequestResource;
