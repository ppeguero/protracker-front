import React, {useState} from 'react'
import Header from '../../components/Header.jsx'
import Calendar from '../../components/Calendar'
import AddNewResourceForm from '../../components/AddNewResourceForm.jsx'

function AddResource({id_project}) {
    // conseguir el id_project
    return (
        <div className='w-full container h-screen bg-[#EEF4ED]'>
        <Header/>
        <div className='flex w-full h-auto bg-[#EEF4ED] px-12 mt-2 justify-around'>
          <div>
            <h2 className='text-3xl font-extrabold text-[#13315C] capitalize mb-6'>Añadir nuevo recurso</h2>
            <AddNewResourceForm id_project={id_project}/>
          </div>
          <Calendar/>
        </div>
      </div>
  )
}

export default AddResource