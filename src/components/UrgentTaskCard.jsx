import React from 'react'
import warning from '../assets/icons/warning.png'

function Tasks({ profilePhoto }) {
  return (
    <li className='list-none'>
      <div className="container bg-[#8DA8C5] w-full flex items-center justify-around px-10 py-5 rounded-xl space-x-6">
        <div className=''>
            <h6 className='text-white font-medium text-xs'>Junta de análisis</h6>
            <p className='text-white font-extralight text-sm'>Equipo de análisis</p>
        </div>
        <div>
          <img src={profilePhoto} className='w-12 h-12'></img>
        </div>
        <img src={warning} className='w-6 h-6'></img>
      </div>
    </li>
  )
}

export default Tasks