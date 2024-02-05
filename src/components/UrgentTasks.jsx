import React from 'react'
import profilePhoto from '../assets/images/pipa-img.png'
import UrgentTaskCard from '../components/UrgentTaskCard'
import { CiCircleAlert } from "react-icons/ci";

function UrgentTasks( { idMiembro }) {

  const [notTask, setNotTasks] = React.useState(false)

  return (
    <div className='p-8 h-[800px] w-[500px] bg-[#13315C] flex flex-col space-x-4 rounded-lg'>
        <h2 className='text-white text-xl font-semibold mb-6'>Tareas para realizar</h2>
        <div className='flex flex-col space-y-4'>
            <UrgentTaskCard infoTask={0} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            <UrgentTaskCard infoTask={1} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            <UrgentTaskCard infoTask={2} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            <UrgentTaskCard infoTask={3} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            <UrgentTaskCard infoTask={4} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            <UrgentTaskCard infoTask={5} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
            
             { notTask ?
            <div className='flex flex-col justify-center items-center'>
              <h2 className='text-white text-4xl font-semibold text-start'>No hay tareas pendientes</h2>
              <CiCircleAlert className='text-white text-7xl text-center mt-10 mr-5'/>

            </div>
:
              null
             }
        </div>
    </div>
  )
}

export default UrgentTasks