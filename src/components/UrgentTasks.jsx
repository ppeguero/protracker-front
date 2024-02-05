import React from 'react'
import profilePhoto from '../assets/images/pipa-img.png'
import UrgentTaskCard from '../components/UrgentTaskCard'

function UrgentTasks() {
  return (
    <div className='p-8 h-[800px] w-fit bg-[#13315C] flex flex-col space-x-4 rounded-lg'>
        <h2 className='text-white text-xl font-semibold mb-6'>Tareas para realizar</h2>
        <div className='flex flex-col space-y-4'>
            <UrgentTaskCard infoTask={0} profilePhoto={profilePhoto}/>
            <UrgentTaskCard infoTask={1} profilePhoto={profilePhoto}/>
            <UrgentTaskCard infoTask={2} profilePhoto={profilePhoto}/>
            <UrgentTaskCard infoTask={3} profilePhoto={profilePhoto}/>
            <UrgentTaskCard infoTask={4} profilePhoto={profilePhoto}/>
            <UrgentTaskCard infoTask={5} profilePhoto={profilePhoto}/>
        </div>
    </div>
  )
}

export default UrgentTasks