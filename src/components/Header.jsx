import React from 'react'
import homeIcon from '../assets/icons/home.png'
import notificationIcon from '../assets/icons/notification.png'
import userIcon from '../assets/icons/user.png'
import searchIcon from '../assets/icons/search.png'
import { Link } from 'react-router-dom'

function Header( { homeLink }) {
  return (
    <div className='flex justify-between box-border md:px-20 bg-[#EEF4ED]'>
        <div>
            <Link to={homeLink} className='w-11 h-11 bg-[#8DA8C5] p-2 rounded-lg m-5 items-center justify-center flex'>
                <img src={homeIcon}></img>
            </Link>
        </div>
        <div className='flex justify-center items-center'>
            <Link className='hidden md:flex bg-white p-2 px-4'>
                <input value="" placeholder='Buscar en la aplicación' className='placeholder:text-[#134175] focus:border-none focus:outline-none'>
                </input>
                <span>
                    <img src={searchIcon} className='w-6'></img>
                </span>
                
            </Link>
            <Link to="#" className='w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex'>
                <img src={notificationIcon}></img>
            </Link>
            <Link to='/Profile-Details' className='w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex'>
                <img src={userIcon}></img>
            </Link>
        </div>
        
    </div>
  )
}

export default Header