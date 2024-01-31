import React, { useState } from "react";
import profilePicture from "../assets/images/pipa-img.png";

function TeamMember() {
  const [memberData, setMemberData] = useState({
    name: "Pipa",
    speciality: "Desarrolladora",
  });

  return (
    <div className="container">
      <div className="bg-[#EEF4ED] h-16 w-72 rounded-md flex items-center">
        <img src={profilePicture} className="w-12 mx-6"></img>
        <div className="ml-4">
          <p className="font-semibold text-[#134175]">{memberData.name}</p>
          <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;