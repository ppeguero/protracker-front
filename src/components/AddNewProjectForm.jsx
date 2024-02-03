import React, {useState} from 'react'
import teamMembers from '../assets/icons/participants.png'
import Swal from 'sweetalert2';

function AddNewProjectForm() {

  const [newProject, setNewProject] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    id_usuario_id: '44',
    id_estado_id: '1',
    id_equipo_id: ''
  });

  const handleAddProject = (e) => {
    e.preventDefault()

//     // Validación de espacios en blanco
//   if (hasOnlySpaces(newUser.nombre) || hasOnlySpaces(newUser.descripcion) || hasOnlySpaces(newUser.id_rol_id)) {
//     Swal.fire({
//       title: '¡Error!',
//       text: 'Los campos no pueden consistir solo en espacios en blanco.',
//       icon: 'error',
//     });
//     return;
//   }

    fetch('https://localhost:8080/api/projects/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el proyecto: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setNewUser({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        id_estado_id: '',
        id_usuario_id: '',
        id_equipo_id: ''
        })}).catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir el proyecto.', 'error');
      })
  };

  // hacer una busquda con un nombre de usuario para desplegar al miembro e invitarlo ?

  return (
    <div className='flex flex-col px-6'>
      <form className='space-y-6' onSubmit={handleAddProject}>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Nombre del proyecto</h3>
          <input value={newProject.nombre}  onChange={(e) => setNewProject({ ...newProject, nombre: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Descripción</h3>
          <textarea value={newProject.descripcion} onChange={(e) => setNewProject({ ...newProject, descripcion: e.target.value })} className='p-2 w-80 h-24' type='text-area' maxLength={255}></textarea>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Fecha inicio</h3>
          <input type="date" value={newProject.fecha_inicio} onChange={(e) => setNewProject({ ...newProject, fecha_inicio: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Equipo</h3>
          <input value={newProject.id_equipo_id}  onChange={(e) => setNewProject({ ...newProject, id_equipo_id: e.target.value })} className='p-2 w-80'></input>
        </div>
        <img src={teamMembers} className='w-20'></img>
        <button type='submit' className='bg-[#13315C] text-white p-2 w-80 capitalize hover:bg-[#8DA8C5]'>Crear proyecto</button>
      </form>
    </div>
  )
}

export default AddNewProjectForm