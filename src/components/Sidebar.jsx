import React, { useState } from "react";
import { Link } from "react-router-dom";

//* Images
import homeIcon from "../assets/icons/home.png";
import userIcon from "../assets/icons/user.png";
import profileImage from "../assets/images/pipa-img.png";
import { MdOutlineLogout } from "react-icons/md";
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";


function Sidebar({ show, setShow }) {

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return (
      show ? (
        <div className="bg-[#13315C] h-full md:h-screen w-full md:w-1/6 p-4 md:fixed md:flex md:flex-col md:items-center">
            <div className="md:hidden w-full flex justify-end items-center">
                <button
                    onClick={() => setShow(!show)}
                    className="w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg flex items-end justify-end">
                    <IoCloseOutline className="text-xl font-bold"/>

                </button>
            </div>
        <div className="flex items-center justify-center">
            <img className="w-2/3" src={profileImage} alt="Profile Image" />
          </div>
          <div className="flex flex-row justify-center">
            <div>
              <Link
                to="/users"
                className="w-11 h-11 bg-[#8DA8C5] p-2 rounded-lg m-5 items-center justify-center flex"
              >
                <img src={homeIcon}></img>
              </Link>
            </div>
            <div>
              {/* <Link
                to="/Profile-Details"
                onClick={() => setShow(!show)}
                className="w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex"
              >
                <img src={userIcon}></img>
              </Link> */}
            </div>
          </div>
          
          <div className="flex flex-col items-center md:pt-10">
          <Link to="/users" className="text-2xl">
              <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                Usuarios
              </div>
            </Link>
            <Link to="/projects" className="text-2xl">
              <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                Proyectos
              </div>
            </Link>
            <Link to="/teams" className="text-2xl">
              <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                Equipos
              </div>
            </Link>
            <Link to="/members" className="text-2xl">
              <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                Miembros
              </div>
            </Link>
            <button onClick={logout} className="block md:hidden text-2xl">
              <div className="flex justify-center items-center px-4 py-2 mt-5 text-white bg-red-600 hover:bg-red-700 rounded w-40 text-center">
                <MdOutlineLogout className="text-3xl text-white" />
                <p>Cerrar Sesión</p>
              </div>
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-[#13315C] h-full md:h-screen w-full md:w-1/6 p-4 md:fixed md:flex md:flex-col md:items-center">
          <div className="hidden md:flex md:flex-col md:justify-center md:items-center">
            <div className="flex items-center justify-center">
              <img className=" w-2/3" src={profileImage} alt="Profile Image" />
            </div>
            <div className="flex flex-row justify-center">
              <div>
                <Link
                  to="/users"
                  className="w-11 h-11 bg-[#8DA8C5] p-2 rounded-lg m-5 items-center justify-center flex"
                >
                  <img src={homeIcon}></img>
                </Link>
              </div>
              <div>
                {/* <Link
                  to="/Profile-Details"
                  className="w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex"
                >
                  <img src={userIcon}></img>
                </Link> */}
              </div>
            </div>
            <div className="flex flex-col items-center md:pt-10">
            <Link to="/users" className="text-2xl">
                <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                  Usuarios
                </div>
              </Link>
              <Link to="/projects" className="text-2xl">
                <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                  Proyectos
                </div>
              </Link>
              <Link to="/teams" className="text-2xl">
                <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                  Equipos
                </div>
              </Link>
              <Link to="/members" className="text-2xl">
              <div className="px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center">
                Miembros
              </div>
            </Link>
            </div>
            <div className="hidden md:flex flex-row justify-center bottom-0 absolute">
              <div>
                <button
                  onClick={logout}
                  className="flex relative bottom-0 w-11 h-11 bg-red-600 rounded-lg m-5 items-center justify-center"
                >
                  <MdOutlineLogout className="text-xl text-white" />
                </button>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <button
                onClick={() => setShow(!show)}
                className="w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg items-center justify-center flex">
                <HiOutlineMenu className="text-xl font-bold"/>

            </button>
          </div>
        </div>
      )
    
  );
}

export default Sidebar;
