import React from 'react'

function TodayTask() {
  return (
    <li className='bg-[#8DA8C5] pl-2 rounded-lg'>

      <div className="container bg-[#134175] w-96 flex justify-between items-center px-10 py-5 rounded-r-lg rounded-l-sm">
        
        <div className=''>
            <h6 className='text-white font-medium text-xl'>Mockups</h6>
            <p className='text-white font-extralight text-sm'>Equipo de análisis</p>
            <p className='text-white font-medium truncate text-[10px] w-28'>19 de agosto 2024</p>
        </div>
        <div>
            <input type="radio" className='bg-trasnparent'/>
        </div>
      </div>
    </li>
  )
}

export default TodayTask