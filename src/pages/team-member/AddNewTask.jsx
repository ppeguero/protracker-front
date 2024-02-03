import React from 'react'
import Header from '../../components/Header'
import Calendar from '../../components/Calendar'
import AddNewTaskForm from '../../components/AddNewTaskForm'

function AddNewTask() { 

  return (
    <div className='w-full container h-screen bg-[#EEF4ED]'>
    <Header/>
    <div className='flex w-full h-auto bg-[#EEF4ED] px-12 mt-2 justify-around'>
      <div>
        <h2 className='text-3xl font-extrabold text-[#13315C] capitalize mb-6'>Añadir nueva tarea</h2>
        <AddNewTaskForm/>
      </div>
      <Calendar/>
    </div>
  </div>
  )
}

export default AddNewTask;