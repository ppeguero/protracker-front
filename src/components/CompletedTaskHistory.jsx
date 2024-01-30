import React from 'react'
import CompletedTaskCard from './CompletedTaskCard'
import options from '../assets/icons/options.png'

function CompletedTaskHistory() {
  return (
    <div className="flex flex-col bg-[#8DA8C5] w-fit h-fit p-10 rounded-md space-y-4 mb-6">
    <div className='flex justify-around'>
        <h3 className="text-[#13315C] text-3xl font-bold w-72">Historial de tareas completadas</h3>
        <button>
            <img src={options}></img>
        </button>
    </div>
    <div className="flex flex-col space-y-6">
      <CompletedTaskCard/>
      <CompletedTaskCard/>
      <CompletedTaskCard/>
    </div>
  </div>
  )
}

export default CompletedTaskHistory