import React from 'react'
import profilePhoto from '../assets/images/pipa-img.png'
import UrgentTaskCard from '../components/UrgentTaskCard'
import { CiCircleAlert } from "react-icons/ci";

function UrgentTasks( { idMiembro }) {
  console.log(idMiembro);
  const [notTask, setNotTasks] = React.useState(false)

  return (
    <div className='p-8 h-[800px] w-[500px] bg-[#13315C] flex flex-col space-x-4 rounded-lg'>
        <h2 className='text-white text-xl font-semibold mb-6'>Tareas para realizar</h2>
        <div className='flex flex-col space-y-4'>
            <UrgentTaskCard infoTask={0} profilePhoto={profilePhoto} setNotTasks={setNotTasks} idMiembro={idMiembro}/>
        </div>
    </div>
  )
}

export default UrgentTasks