import React, { useState, useEffect } from 'react';
import teamMembers from '../assets/icons/participants.png';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

function AddNewTaskForm() {
  const [newTask, setNewTask] = useState({
    nombre : '',
    descripcion : '', 
    fecha_limite : '',
    id_proyecto_id : '',
    id_estado_id : '',
    id_miembro_id : '',
  });

  const [projects, setProjects] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [status, setStatus] = useState([]);

  const token_jwt = localStorage.getItem('token'); 
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userId = decodedToken ? decodedToken.idUser : null; 
  

  const handleAddTask = (e) => {
    e.preventDefault();

    fetch('https://localhost:8080/api/tasks/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al añadir el proyecto: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setNewTask({
          nombre : '',
          descripcion : '', 
          fecha_limite : '',
          id_proyecto_id : '',
          id_estado_id : '',
          id_miembro_id : '',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir la tarea.', 'error');
      });
  };

  const getProjects = () => {
    fetch('https://localhost:8080/api/projects/')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data);
        // console.log(data);
      })
  };

  const getMembers = () => {
    fetch('https://localhost:8080/api/members/')
      .then((response) => response.json())
      .then((data) => {
        setMiembros(data);
        console.log(data);
      })
  };

  const getStatus = () => {
    fetch('https://localhost:8080/api/status')
      .then(response => response.json())
      .then(data => {
        setStatus(data)
        // console.log(data);
      })
      .catch(error => {
        console.error(error);
      })
  };

  useEffect(() => {
    getProjects();
    getMembers();
    getStatus();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevProject) => ({ ...prevProject, [name]: value }));
  };

  // const handleProjectChange = (projectId) => {
  //   console.log("Id del proyecto: ", projectId);
  //   console.log(projects);
  //   // Actualizar la lista de miembros basándonos en el nuevo proyecto seleccionado
  //   const filteredProject = projects.find((project) => {
  //     console.log("El proyecto", project.id_proyecto, "No es igual a", projectId, " = ", projectId == project.id_proyecto);
  //     return projectId == project.id_proyecto ;
  //   });
    
    
  //   if (filteredProject) {
  //     const filteredMembers = miembros.filter((miembro) => miembro.id_equipo_id === filteredProject.id_equipo_id);
  //     setMiembros(filteredMembers);
  //     console.log(filteredMembers);
  //   } else {
  //     console.log("Proyecto no encontrado");
  //     // Puedes manejar este caso según tus necesidades
  //   }
  //   // Limpiar el miembro seleccionado cuando cambia el proyecto
  //   setNewTask((prevTask) => ({ ...prevTask, id_miembro_id: '' }));
  // };

  return (
    <div className='flex flex-col px-6 my-10'>
      <form className='space-y-6 flex flex-col' onSubmit={handleAddTask}>
        <div className='grid grid-cols-2 gap-14'>
              <div>
              <div className='space-y-1'>
                <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Nombre de la tarea</h3>
                <input required value={newTask.nombre} onChange={(e) => setNewTask({ ...newTask, nombre: e.target.value })} className='p-2 w-96'></input>
              </div>
              <div className='space-y-1'>
                <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Descripción</h3>
                <textarea required value={newTask.descripcion} onChange={(e) => setNewTask({ ...newTask, descripcion: e.target.value })} className='p-2 w-96 h-56' type='text-area' maxLength={255}></textarea>
              </div>
             
              </div>
              <div>
              <div className='space-y-1'>
                <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Fecha limite</h3>
                <input type="date" value={newTask.fecha_limite} onChange={(e) => setNewTask({ ...newTask, fecha_limite: e.target.value })} className='p-2 w-96'></input>
              </div>
              <div className='space-y-1'>
                  <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Proyecto</h3>
                  <select
                required
                className="w-full px-3 py-2 border rounded-md"
                name="id_proyecto_id"
                value={newTask.id_proyecto_id}
                onChange={(e) => {
                  handleInputChange(e); // Actualizar el estado del proyecto
                  // handleProjectChange(e.target.value); // Actualizar la lista de miembros
                }}
                placeholder="Selecciona un proyecto"
              >
                <option value="" disabled>Selecciona un proyecto</option>
                {projects && projects.filter((e) => e.id_usuario_id === userId).map((project) => {
                  if(project.id_estado_id !== 1){
                    return <option value={project.id_proyecto} key={project.id_proyecto}>{project.nombre}</option>
                  } 
                })}

              </select>
                </div>

                  <div className='space-y-1'>
                    <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Estado</h3>
                    <select
                    required
                    className="w-full px-3 py-2 border rounded-md"
                    name="id_estado_id"
                    value={newTask.id_estado_id}
                    onChange={handleInputChange}
                    placeholder="Estado de la tarea"
                  >
                    <option value="" disabled>Estado de la tarea</option>
                    {status && status.map((state) => {
                      if (state.id_estado !== 1) {
                        return <option value={state.id_estado} key={state.id_estado}>{state.nombre}</option>
                        
                      }
                    })}

                  </select>
                  </div>
                
                  <div className='space-y-1'>
                    <h3 className='pt-5 text-xl font-semibold text-[#13315C]'>Miembro</h3>
                    <select
                      required
                      className="w-full px-3 py-2 border rounded-md"
                      name="id_miembro_id"
                      value={newTask.id_miembro_id}
                      onChange={handleInputChange}
                      placeholder="Selecciona un miembro"
                    >
                      <option value="" disabled>Selecciona un Miembro</option>
                      {miembros && miembros.map((member) => {
                        return <option value={member.id_miembro} key={member.id_miembro}>{member.nombre_usuario}</option>
                      })}
                    </select>
                  </div>

              </div>
        </div>
        {/* <img src={teamMembers} className='w-20' alt="Team Members"></img> */}
        <button type='submit' className='bg-[#13315C] text-white p-2 w-full capitalize hover:bg-[#8DA8C5]'>Crear tarea</button>
      </form>
    </div>
  );
}

export default AddNewTaskForm;
