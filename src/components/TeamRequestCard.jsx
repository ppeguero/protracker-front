import React, { useState } from "react";
import profilePicture from "../assets/images/pipa-img.png";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { MdOutlineDone } from "react-icons/md";
import { Link } from "react-router-dom";

function TeamRequestCard({ idRequest }) {
  const [memberData, setMemberData] = useState({
    name: "Pipa",
    speciality: "Desarrolladora",
  });

  return (
    <div className="bg-[#EEF4ED] h-fit w-[1000px] rounded-md flex justify-between items-center p-5 mt-5">
    <Link to={`/request-details/${idRequest}`} className="container">
        <div className="flex">
            <img src={profilePicture} className="w-12 mx-6"></img>
            <div className="ml-4">
            <p className="font-semibold text-[#134175]">{memberData.name}</p>
            <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
            </div>
            <div className="ml-4">
            <p className="font-semibold text-[#134175]">{memberData.name}</p>
            <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
            </div>
            <div className="ml-4">
            <p className="font-semibold text-[#134175]">{memberData.name}</p>
            <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
            </div>
            <div className="ml-4">
            <p className="font-semibold text-[#134175]">{memberData.name}</p>
            <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
            </div>
            <div className="ml-4">
            <p className="font-semibold text-[#134175]">{memberData.name}</p>
            <p className="text-sm text-[#134175] font-light">{memberData.speciality}</p>
            </div>
        </div>
        
    </Link>
    <div className="flex">
            <button className="ml-4 flex flex-col justify-center items-center pr-2">
                <p className="font-semibold text-green-500">Aceptar</p>
                <div className="border-2 rounded-full p-0.5 text-green-600 border-green-500 m-1">
                    <MdOutlineDone className="border-"/>

                </div>
            </button>
            <button className="ml-4 flex flex-col justify-center items-center">
                <p className="font-semibold text-red-600">Denegar</p>
                <IoIosCloseCircleOutline className="text-red-600 text-3xl"/>
            </button>
    </div>
    </div>
  );
}

export default TeamRequestCard;
