import React, { useState, useEffect } from 'react';
import teamMembers from '../assets/icons/participants.png';
import Swal from 'sweetalert2';

function AddNewTaskForm() {
  const [newTask, setNewTask] = useState({
    nombre : '',
    descripcion : '', 
    fecha_de_entrega : '', 
    fecha_limite : '',
    ruta_documento : '',
    id_proyecto_id : '',
    id_estado_id : '',
    id_miembro_id : '',
  });

  const [equipos, setEquipos] = useState([]);
  const [miembros, setMiembros] = useState([]);

  const handleAddTask = (e) => {
    e.preventDefault();

    fetch('https://localhost:8080/api/task/', {
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
          nombre : newTask.nombre,
          descripcion : newTask.descripcion, 
          fecha_de_entrega : null, 
          fecha_limite : newTask.fecha_limite,
          ruta_documento : null,
          id_proyecto_id : newTask.id_proyecto_id,
          id_estado_id : '',
          id_miembro_id : '',
        });
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        Swal.fire('Error', 'Hubo un error al añadir la tarea.', 'error');
      });
  };

  const getEquipos = () => {
    fetch('https://localhost:8080/api/teams')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al obtener equipos: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.success && Array.isArray(data.equipos)) {
          setEquipos(data.equipos);
        } else {
          throw new Error('La respuesta de la API no tiene el formato esperado.');
        }
      })
      .catch((error) => console.error('Fetch error:', error));
  };

  useEffect(() => {
    getEquipos();
  }, []);

  const handleEquipoChange = (e) => {
    const selectedEquipoId = e.target.value;
    setNewTask({ ...newTask, id_equipo_id: selectedEquipoId });

    // Obtener miembros del equipo seleccionado
    fetch(`https://localhost:8080/api/teams/${selectedEquipoId}/members`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.miembros)) {
          setMiembros(data.miembros);
        } else {
          throw new Error('La respuesta de la API no tiene el formato esperado.');
        }
      })
      .catch((error) => console.error('Fetch error:', error));
  };

  return (
    <div className='flex flex-col px-6'>
      <form className='space-y-6' onSubmit={handleAddTask}>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Nombre de la tarea</h3>
          <input value={newTask.nombre} onChange={(e) => setNewTask({ ...newTask, nombre: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Descripción</h3>
          <textarea value={newTask.descripcion} onChange={(e) => setNewTask({ ...newTask, descripcion: e.target.value })} className='p-2 w-80 h-24' type='text-area' maxLength={255}></textarea>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Fecha limite</h3>
          <input type="date" value={newTask.fecha_limite} onChange={(e) => setNewTask({ ...newTask, fecha_limite: e.target.value })} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Equipo</h3>
          <select value={newTask.id_equipo_id} onChange={handleEquipoChange} className='p-2 w-80'>
            <option value='' disabled>Selecciona Equipo</option>
            {equipos.map((equipo) => (
              <option key={equipo.id_equipo} value={equipo.id_equipo}>
                {equipo.nombre}
              </option>
            ))}
          </select>
        </div>

        {miembros.length > 0 && (
          <div className='space-y-1'>
            <h3 className='text-xl font-semibold text-[#13315C]'>Miembro</h3>
            <select value={newTask.id_usuario_id} onChange={(e) => setNewTask({ ...newTask, id_usuario_id: e.target.value })} className='p-2 w-80'>
              <option value='' disabled>Selecciona Miembro</option>
              {miembros.map((miembro) => (
                <option key={miembro.id_miembro} value={miembro.id_miembro}>
                  {miembro.nombre_miembro}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* <img src={teamMembers} className='w-20' alt="Team Members"></img> */}
        <button type='submit' className='bg-[#13315C] text-white p-2 w-80 capitalize hover:bg-[#8DA8C5]'>Crear proyecto</button>
      </form>
    </div>
  );
}

export default AddNewTaskForm;
