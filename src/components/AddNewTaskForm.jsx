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
  const [project, setProject] = useState();
  const [miembros, setMiembros] = useState([]);
  const [status, setStatus] = useState([]);
  

  const token_jwt = localStorage.getItem('token'); 
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userId = decodedToken ? decodedToken.idUser : null; 
  

  const handleAddTask = (e) => {
    e.preventDefault();


  // Validación de campos vacíos
  if (!newTask.nombre || !newTask.descripcion || !newTask.fecha_limite || !newTask.id_proyecto_id || !newTask.id_estado_id || !newTask.id_miembro_id) {
    Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
    return;
    }
    // Validación de campos vacíos
    if (!newTask.nombre.trim() || !newTask.descripcion.trim() || !newTask.fecha_limite.trim() || !newTask.id_proyecto_id.trim() || !newTask.id_estado_id.trim() || !newTask.id_miembro_id.trim()) {
      Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    if (!newTask.fecha_limite || newTask.fecha_limite < today) {
        Swal.fire('Error', 'La fecha de inicio del proyecto no puede estar en el pasado.', 'error');
        return;
    }

    if (!newTask.id_proyecto_id) {
      Swal.fire('Error', 'Selecciona un equipo para el proyecto.', 'error');
      return;
    }

    if (!newTask.id_estado_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }

    if (!newTask.id_miembro_id) {
      Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
      return;
    }

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
        Swal.fire('Añadido!', 'El proyecto ha sido añadido.', 'success')
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

  const getProject = () => {
    fetch(`https://localhost:8080/api/projects/${newTask.id_proyecto_id}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        console.log(data);
      })
  };


  const getMembers = () => {
    console.log(project.id_equipo_id);
    fetch(`https://localhost:8080/api/members-team/${project.id_equipo_id}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMiembros(data);
          console.log(data);
        } else {
          console.error("API response for members is not an array:", data);
          setMiembros([]); // Set empty array if API response is not an array
          Swal.fire({
            title: "Opps!...",
            text: "El equipo seleccionado no tiene miembros",
            icon: "warning",
          })        }
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
      });
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
    getStatus();
  }, []);
  
  useEffect(() => {
    if (newTask.id_proyecto_id) {
      getProject();
    }
  }, [newTask.id_proyecto_id]);
  
  useEffect(() => {
    if (project) {
      getMembers();
    }
  }, [project]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevProject) => ({ ...prevProject, [name]: value }));
  };



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
