import React, { useState, useEffect } from "react";
import options from "../assets/icons/options.png";
import plusIcon from "../assets/icons/plus.png";
import TeamMember from "./TeamMember";
import TeamRequestCard from "./TeamRequestCard";

function TeamRequestResource() {
  // Añadir la validacion que si detecta que es el jefe de proyecto, se muestre el botón de añadir miembro

  const [manager, setManager] = useState(false);
  const [showScrollMessage, setShowScrollMessage] = useState(true);

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
  return (
    <div className="w-full flex flex-col bg-[#8DA8C5] h-fit py-10 rounded-md space-y-4 mb-10">
      <div className="flex justify-evenly items-center px-36">
        {manager && (
          <button className="bg-[#13315C] rounded-full w-10 h-10 flex justify-center items-center mr-4">
            <img src={plusIcon} className="w-6"></img>
          </button>
        )}
        <h3 className="text-[#13315C] text-4xl font-bold w-full">Solicitud de Recursos</h3>
        <button>
          <img src={options}></img>
        </button>
      </div> 
      <div className="flex flex-col justify-center mx-auto overflow-y-auto h-[400px] pt-48 px-5 scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin">
        <TeamRequestCard/>
        <TeamRequestCard/>
        <TeamRequestCard/>
        <TeamRequestCard/>
      </div>
      
    </div>
  );
}

export default TeamRequestResource;
