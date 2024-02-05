import React, { useState } from "react";
import profilePicture from "../assets/images/pipa-img.png";

function TeamMember({ key, member}) {
  console.log(member);
  const [memberData, setMemberData] = useState({
    name: "Pipa",
    speciality: "Desarrolladora",
  });

  return (
    member ?
    <div className="container pt-6" key={key}>
      <div className="bg-[#EEF4ED] h-16 w-72 rounded-md flex items-center">
        <img src={profilePicture} className="w-12 mx-6"></img>
        <div className="">
        <p className="font-semibold text-[#134175] max-w-[150px] overflow-hidden whitespace-nowrap overflow-ellipsis">{member.nombre_usuario}</p>
          <p className="text-sm text-[#134175] font-light">{member.nombre_especialidad}</p>
        </div>
      </div>
    </div>
    :
    null
  );
}

export default TeamMember;
