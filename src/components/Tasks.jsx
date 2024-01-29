import React from 'react'

function Tasks({ profilePhoto }) {
  return (
    <li className='list-none'>
      <div className="container bg-[#13315C] w-full flex justify-between px-10 py-5 rounded-xl">
        <div className=''>
            <h6 className='text-white font-medium text-xs'>Tarea 1</h6>
            <p className='text-white font-extralight text-sm'>Equipo de análisis</p>
            <p className='text-white font-extralight truncate text-[10px] my-2 w-28'>19 de agosto 2024</p>
        </div>
        <div>
          <img src={profilePhoto} className='w-14 h-14'></img>
        </div>
      </div>
    </li>
  )
}

export default Tasks