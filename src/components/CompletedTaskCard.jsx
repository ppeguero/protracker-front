import React, { useState } from "react";
import profilePicture from "../assets/images/pipa-img.png";

function CompletedTaskCard({}) {
  const [taskDetails, setTaskDetails] = useState({
    taskName: "Junta de análisis",
    teamName: "Equipo análisis",
    dueDate: "19 de agosto de 2024",
  });

  return (
    <div className="container">
      <div className="bg-[#13315C] h-24 w-72 rounded-md flex justify-around p-6 shadow-sm">
        <div className="flex flex-col justify-center">
          <div className="space-y-[-4px]">
            <h3 className="text-white">{taskDetails.taskName}</h3>
            <p className="text-white font-thin">{taskDetails.teamName}</p>
          </div>
          <p className="text-[#8DA8C5] text-xs mt-2">{taskDetails.dueDate}</p>
        </div>
        <img src={profilePicture} className="w-12 h-12"></img>
        <div class="flex items-center">
          <input
            checked
            id="checked-checkbox"
            type="checkbox"
            value=""
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>
    </div>
  );
}

export default CompletedTaskCard;
