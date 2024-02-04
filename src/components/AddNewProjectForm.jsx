import React, {useEffect, useState} from 'react'
import teamMembers from '../assets/icons/participants.png'
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';


function AddNewProjectForm() {

  const [tokenData, setTokenData] = useState()
  const [teams, setTeams] = useState([])
  const [status, setStatus] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };


  useEffect(()=>{
    const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
    if(decodedToken){
        setTokenData(decodedToken)
        setNewProject({ ...newProject, id_usuario_id: decodedToken.idUser });
      }

      fetch(`https://localhost:8080/api/teams`)
          .then(response => response.json())
          .then(data => {
            setTeams(data.equipos)
          });

      fetch('https://localhost:8080/api/status')
          .then(response => response.json())
          .then(data => {
            setStatus(data)
          })
          .catch(error => {
            console.error(error);
          })

  }, [])

  const [newProject, setNewProject] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    id_usuario_id: '',
    id_estado_id: '',
    id_equipo_id: ''
  });


  const handleAddProject = (e) => {
    e.preventDefault()
    
     // Validación de campos vacíos
   if (!newProject.nombre || !newProject.descripcion || !newProject.fecha_inicio || !newProject.id_equipo_id || !newProject.id_estado_id) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!newProject.nombre.trim() || !newProject.descripcion.trim() || !newProject.fecha_inicio.trim() || !newProject.id_equipo_id.trim() || !newProject.id_estado_id.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!newProject.fecha_inicio || newProject.fecha_inicio < today) {
        Swal.fire('Error', 'La fecha de inicio del proyecto no puede estar en el pasado.', 'error');
        return;
    }

    if (!newProject.id_equipo_id) {
      Swal.fire('Error', 'Selecciona un equipo para el proyecto.', 'error');
      return;
    }

    if (!newProject.id_estado_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }


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
        Swal.fire('Añadido!', 'El proyecto ha sido añadido.', 'success')

        setNewProject({
        nombre: '',
        descripcion: '',
        fecha_inicio: '',
        id_usuario_id: tokenData.idUser,
        id_estado_id: 1,
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
          <input required value={newProject.nombre}  onChange={(e) => setNewProject({ ...newProject, nombre: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Descripción</h3>
          <textarea required value={newProject.descripcion} onChange={(e) => setNewProject({ ...newProject, descripcion: e.target.value })} className='p-2 w-80 h-24' type='text-area' maxLength={255}></textarea>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Fecha inicio</h3>
          <input required type="date" value={newProject.fecha_inicio} onChange={(e) => setNewProject({ ...newProject, fecha_inicio: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Equipo</h3>
          {/* <input required value={newProject.id_equipo_id}  onChange={(e) => setNewProject({ ...newProject, id_equipo_id: e.target.value })} className='p-2 w-80'></input> */}
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_equipo_id"
            value={newProject.id_equipo_id}
            onChange={handleInputChange}
            placeholder="Equipo a cargo"
          >
            <option value="">Equipo a cargo</option>
            {

            teams.filter((team) => team.id_usuario_id === tokenData.idUser).map((team) => (
                <option value={team.id_equipo}>{team.nombre}</option>
              ))
            }
          </select>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Estado</h3>
          <select
            required
            className="w-full px-3 py-2 border rounded-md"
            name="id_estado_id"
            value={newProject.id_estado_id}
            onChange={handleInputChange}
            placeholder="Estado del proyecto"
          >
            <option value="">Estado del proyecto</option>
            {status && status.map((state) => {
              if(state.id_estado !== 1){
                return <option value={state.id_estado}>{state.nombre}</option>
              }
            })}
          </select>
        </div>
        {/* <img src={teamMembers} className='w-20'></img> */}
        <button type='submit' className='bg-[#13315C] text-white p-2 w-80 capitalize hover:bg-[#8DA8C5]'>Crear proyecto</button>
      </form>
    </div>
  )
}

export default AddNewProjectForm