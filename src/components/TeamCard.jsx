import React, {useState, useEffect} from 'react'
import optionsIcon from '../assets/icons/options.png'
import profilePhoto from '../assets/images/pipa-img.png'

function TeamCard( { idTeam, name, leader }) {

   
  return (
    <li className=" list-none" key={idTeam}>
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-50 bg-[#13315C] rounded-lg p-10 my-5 w-72">
            <div className='flex justify-between'>
                <h4 className="text-[#EEF4ED] font-bold text-2xl">{name}</h4>
                <button>
                    <img src={optionsIcon} className=''></img>
                </button>
            </div>
            
            <div className='flex justify-around py-4'>
                <img src={profilePhoto} className='w-14 h-14'></img>
                <div>
                    <h5 className='text-white font-medium'>Lider de equipo</h5>
                    <p className='text-white font-extralight text-sm'>{leader}</p>
                </div>
            </div>
       
        </div>
        </div>
    </li>
  )
}

export default TeamCard