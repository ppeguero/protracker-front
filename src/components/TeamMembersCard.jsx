import React, { useState, useEffect } from "react";
import options from "../assets/icons/options.png";
import plusIcon from "../assets/icons/plus.png";
import TeamMember from "./TeamMember";

function TeamMembersCard({ idNumerico }) {
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
    <div className="flex flex-col bg-[#8DA8C5] w-fit h-[400px] p-10 rounded-md space-y-4 mt-5">
      <div className="flex justify-evenly items-center">
        {manager && (
          <button className="bg-[#13315C] rounded-full w-10 h-10 flex justify-center items-center mr-4">
            <img src={plusIcon} className="w-6"></img>
          </button>
        )}
        <h3 className="text-[#13315C] text-2xl font-bold w-72">Miembros del equipo</h3>
        <button>
          <img src={options}></img>
        </button>
      </div> 
      <div className="flex flex-col justify-center mx-auto overflow-y-auto pt-12 px-5 scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin">
        <TeamMember/>
        <TeamMember/>
        <TeamMember/>
        <TeamMember/>
      </div>
      
    </div>
  );
}

export default TeamMembersCard;
