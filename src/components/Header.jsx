import React from 'react'
import homeIcon from '../assets/icons/home.png'
import { MdOutlineDashboardCustomize } from "react-icons/md";
import userIcon from '../assets/icons/user.png'
import searchIcon from '../assets/icons/search.png'
import { Link } from 'react-router-dom'
import { MdOutlineLogout } from "react-icons/md";
import { useState } from 'react';
import jwt_decode from 'jwt-decode';

function logout() {
    localStorage.removeItem("token");
    window.location.href = "/login";
}



function Header( { homeLink }) {

  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null;
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });

  return (
    <div className='flex justify-between box-border md:px-20 bg-[#EEF4ED]'>
        <div>
            <Link to={homeLink} className='w-11 h-11 bg-[#8DA8C5] p-2 rounded-lg m-5 items-center justify-center flex'>
                <img src={homeIcon}></img>
            </Link>
        </div>
        <div className='flex justify-center items-center'>
            {/* <Link className='hidden md:flex bg-white p-2 px-4'>
                <input value="" placeholder='Buscar en la aplicación' className='placeholder:text-[#134175] focus:border-none focus:outline-none'>
                </input>
                <span>
                    <img src={searchIcon} className='w-6'></img>
                </span>
                
            </Link> */}
            {/* <Link to='/Profile-Details' className='w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex'>
                <img src={userIcon}></img>
            </Link> */}
            {
                userRole == 'Administrador'  || userRole == 'Project Manager' ? 
                <Link to="/users" className='w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex'>
                <MdOutlineDashboardCustomize className='text-2xl'/>
            </Link> :
            null
            }
            <button
                  onClick={logout}
                  className="w-11 h-11 bg-red-600 p-3 rounded-lg m-5 items-center justify-center flex"
                >
                  <MdOutlineLogout className="text-xl text-white" />
                </button>
        </div>
        
    </div>
  )
}

export default Header