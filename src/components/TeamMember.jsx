import React, { useState } from "react";
import profilePicture from "../assets/images/pipa-img.png";

function TeamMember({ memberData}) {
  // const [memberData, setMemberData] = useState({
  //   name: "Pipa",
  //   speciality: "Desarrolladora",
  // });

  return (
    <div className="container pt-6">
      <div className="bg-[#EEF4ED] h-16 w-72 rounded-md flex items-center">
        <img src={profilePicture} className="w-12 mx-6"></img>
        <div className="ml-4">
          <p className="font-semibold text-[#134175]">{memberData.nombre_usuario}</p>
          <p className="text-sm text-[#134175] font-light">{memberData.nombre_especialidad}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;
