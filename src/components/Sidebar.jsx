import React from 'react';
import { Link } from 'react-router-dom'

//* Images
import homeIcon from '../assets/icons/home.png'
import userIcon from '../assets/icons/user.png'
import profileImage from '../assets/images/pipa-img.png'

function Sidebar(){
    return(
        <div className='bg-[#13315C] h-screen w-1/6 p-4'>
            <div className='flex items-center justify-center '>
                <img className='w-2/3' src={profileImage} alt='Profile Image' />
            </div>
            <div className='flex flex-row justify-center'>
                <div>
                    <Link to='/' className='w-11 h-11 bg-[#8DA8C5] p-2 rounded-lg m-5 items-center justify-center flex'>
                        <img src={homeIcon}></img>
                    </Link>
                </div>
                <div>
                    <Link to='#' className='w-11 h-11 bg-[#8DA8C5] p-3 rounded-lg m-5 items-center justify-center flex'>
                        <img src={userIcon}></img>
                    </Link>
                </div>
            </div>
            <div className='flex flex-col items-center pt-10'>
                <div className='px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center'>
                    <Link to='/projects' className='text-2xl'>Proyectos</Link>
                </div>
                <div className='px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center'>
                    <Link to='/teams' className='text-2xl'>Equipos</Link>
                </div>
                <div className='px-4 py-2 mt-5 text-white bg-[#8DA8C5] hover:bg-[#6F849F] rounded w-40 text-center'>
                    <Link to='/members' className='text-2xl'>Miembros</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar;