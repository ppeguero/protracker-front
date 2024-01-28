import React from 'react'
import plusIcon from '../assets/icons/plus.png'

function AddResourceButton() {
  return (
    <div className='bg-[#8DA8C5] w-72 h-32 rounded-md flex flex-col justify-center items-center'>
        <button className='bg-[#13315C] p-4 rounded-full flex justify-center'>
            <img src={plusIcon} className='w-4 h-4'></img>
        </button>
        <p className='text-[#13315C] font-semibold text-lg'>Solicitar recurso</p>
    </div>
  )
}

export default AddResourceButton