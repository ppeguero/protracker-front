import React from 'react'
import plusIcon from '../assets/icons/plus.png'
import { Link } from 'react-router-dom'


function AddResourceButton() {
  return (
    <Link to='/request-resource' 
     className='bg-[#8DA8C5] w-96 h-32 rounded-md flex flex-col justify-center items-center'>
        <button className='bg-[#13315C] p-4 rounded-full flex justify-center'>
            <img src={plusIcon} className='w-4 h-4'></img>
        </button>
        <p className='text-[#13315C] font-semibold text-lg'>Solicitar recurso</p>
    </Link>
  )
}

export default AddResourceButton