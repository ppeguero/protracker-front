import React, { useState } from "react";
import options from "../assets/icons/options.png";
import plusIcon from "../assets/icons/plus.png";
import TeamMember from "./TeamMember";

function TeamMembersCard() {
  // Añadir la validacion que si detecta que es el jefe de proyecto, se muestre el botón de añadir miembro

  const [manager, setManager] = useState(false);

  return (
    <div className="flex flex-col bg-[#8DA8C5] w-fit h-fit p-10 rounded-md space-y-4 mb-6">
      <div className="flex justify-evenly items-center">
        {manager && (
          <button className="bg-[#13315C] rounded-full w-10 h-10 flex justify-center items-center mr-4">
            <img src={plusIcon} className="w-6"></img>
          </button>
        )}
        <h3 className="text-[#13315C] text-3xl font-bold w-72">Miembros</h3>
        <button>
          <img src={options}></img>
        </button>
      </div>
      <div className="flex flex-col justify-center space-y-8 mx-auto">
        <TeamMember/>
        <TeamMember/>
        <TeamMember/>
        <TeamMember/>
      </div>
    </div>
  );
}

export default TeamMembersCard;
