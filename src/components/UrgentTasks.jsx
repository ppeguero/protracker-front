import React from 'react'
import profilePhoto from '../assets/images/pipa-img.png'
import UrgentTaskCard from '../components/UrgentTaskCard'

function UrgentTasks() {
  return (
    <div className='p-8 h-fit w-fit bg-[#13315C] flex flex-col space-x-4 rounded-lg'>
        <h2 className='text-white text-xl font-semibold mb-6'>Tareas urgentes</h2>
        <div className='flex flex-col space-y-4'>
            <UrgentTaskCard profilePhoto={profilePhoto}/>
            <UrgentTaskCard profilePhoto={profilePhoto}/>
            <UrgentTaskCard profilePhoto={profilePhoto}/>
            <UrgentTaskCard profilePhoto={profilePhoto}/>
            <UrgentTaskCard profilePhoto={profilePhoto}/>

        </div>
    </div>
  )
}

export default UrgentTasks