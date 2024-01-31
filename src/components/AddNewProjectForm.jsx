import React, {useState} from 'react'
import teamMembers from '../assets/icons/participants.png'

function AddNewProjectForm() {

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('')
  const [members, setMembers] = useState('')

  const handleCreateProject = async (e) => {
    e.preventDefault()
  }

  // hacer una busquda con un nombre de usuario para desplegar al miembro e invitarlo ?

  return (
    <div className='flex flex-col px-6'>
      <form onSubmit={handleCreateProject} className='space-y-6'>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Nombre del proyecto</h3>
          <input value={projectName} onChange={(e) => setProjectName(e.target.value)} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Descripción</h3>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='p-2 w-80 h-24' type='text-area' maxLength={255}></textarea>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Miembros</h3>
          <input className='p-2 w-80' placeholder='Buscar miembros...'></input>
        </div>
        <img src={teamMembers} className='w-20'></img>
        <button className='bg-[#13315C] text-white p-2 w-80 capitalize hover:bg-[#8DA8C5]'>Crear proyecto</button>
      </form>
    </div>
  )
}

export default AddNewProjectForm