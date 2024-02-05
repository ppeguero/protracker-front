import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import participants from "../../assets/icons/participants.png"
import options from "../../assets/icons/options.png"
import Rafa from "../../assets/images/Rafa.png"
import attach from "../../assets/icons/attach.png"
import { useParams } from 'react-router-dom';
import ReturnButton from '../../components/ReturnButton';
import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";

function TaskDetails() {

  const [task, setTask] = useState([]);
  const [taskData, setTaskData] = useState([]);

  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const idUser = decodedToken ? decodedToken.idUser : null;
  const [idMiembro, setIdMiembro] = useState(null);
  const [show, setShow] = useState(false);

  const { id } = useParams();
  const idNumerico = parseInt(id, 10);
  useEffect(() => {
    getMemberID();
  }, []);
  
  const getMemberID = () => {
    fetch(`https://localhost:8080/api/members/`)
      .then(response => response.json())
      .then(data => {
        const miembrosFiltrados = data.filter(miembro => miembro.id_usuario === idUser);
        setIdMiembro(miembrosFiltrados[0]?.id_miembro);
        console.log(miembrosFiltrados);
      })
      .catch(error => console.error('Error al obtener miembros:', error));
  }
  
  useEffect(() => {
    if (idMiembro !== null) {
      getTask();
    }
  }, [idMiembro]);
  
  const getTask = async () => {
    try {
      const response = await fetch(`https://localhost:8080/api/task/${idNumerico}`);
      const data = await response.json();
      setTask(data);
      console.log(data);
      console.log(idMiembro);
  
      // Utilizamos data.length en lugar de idMiembro.length
      if (data.length > 0 && idMiembro !== null) {
        // Utilizamos la función find para buscar el id_miembro_id
        const taskWithDifferentId = data.find(task => task.id_miembro_id !== idMiembro);
  
        if (taskWithDifferentId) {
          // Redirigir al usuario de nuevo al inicio
          console.log("expulsado");
          window.location.href = '/team-member-home';
        }else{
          setShow(true);
        }
      }
  
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    fetch(`https://localhost:8080/api/teams-member/${idUser}`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        setUniqueTeams(new Set(data.map(team => team.id_equipo)));
        console.log(data);
      })
      .catch(error => console.error('Error al obtener equipos:', error));

      fetch(`https://localhost:8080/api/members/`)
      .then(response => response.json())
      .then(data => {
        const miembrosFiltrados = data.filter(miembro => miembro.id_usuario === idUser);
        setIdMiembro(miembrosFiltrados[0]?.id_miembro);
        console.log(miembrosFiltrados[0]?.id_miembro);

      })
  }, [idUser]); 

  
    return (
      show && task ?
        <div className="h-screen container bg-[#EEF4ED] w-full">
          <Header />
          <div className="flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
            <div className='flex flex-col user-info mx-5 md:mx-10'>
              <div className='md:mx-10'>
              <ReturnButton/>
              </div>
              <div className='flex flex-col md:flex-row justify-between items-center md:mx-24'>
                <div>
                  <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Detalle de la tarea entregada</h1>
                </div>
              </div>
              <div className='flex bg-[#8DA8C5] rounded-md my-4 mx-24 h-[550px] w-[1300px]'>
                <div className='w-3/4 p-4 ml-10 mt-6'>
                  <h2 className='text-2xl font-bold text-[#13315C]'>Tarea: {task[0]?.nombre}</h2>
                  <p className='text-xl font-bold mt-8 text-[#13315C] '>
                    Descripción:
                  </p>
                  <div className='bg-[#8DA8C5] rounded-md my-4'>
                    <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                      {task[0]?.descripcion}
                    </p>
                    {/* <div className='ml-6 mt-6'>
                      <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                        <strong className='-ml-4 text-lg'>Objetivos de la Junta:</strong>
                        <ul className="ml-8">
                          <li className="font-bold">1. Revisión de Requisitos:</li>
                          <ul className="list-disc ml-12">
                            <li>Analizar y clarificar los requisitos del proyecto.</li>
                            <li>Identificar posibles lagunas o ambigüedades en los requisitos.</li>
                          </ul>
                          <li className="font-bold">2. Discusión Técnica:</li>
                          <ul className="list-disc ml-12">
                            <li>Abordar problemas técnicos específicos y explorar soluciones potenciales.</li>
                            <li>Evaluar la viabilidad técnica de las propuestas y tomar decisiones informadas.</li>
                          </ul>
                          <li className="font-bold">3. Planificación Estratégica:</li>
                          <ul className="list-disc ml-12">
                            <li>Definir estrategias de implementación para diferentes aspectos del proyecto.</li>
                            <li>Establecer hitos y plazos para garantizar un progreso constante.</li>
                          </ul>
                          <li className="font-bold">4. Identificación de Obstáculos:</li>
                          <ul className="list-disc ml-12">
                            <li>Identificar posibles obstáculos que podrían afectar el desarrollo.</li>
                            <li>Proponer soluciones preventivas y mitigadoras.</li>
                          </ul>
                        </ul>
                      </p>
                    </div> */}
                    <div className='ml-6'>
                      {/* <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                        <strong className='-ml-4 text-lg'>Participantes:</strong>
                      </p>
                      <div className='my-4 -ml-5'>
                        <img src={participants} alt="participants" />
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className='w-1/4 bg-[#8DA8C5] rounded-md'>
                <div className='mt-6 flex flex-col  mr-4 items-center justify-center'> {/* Ajuste aquí */}
                <img src={options} alt="options" className='mb-4 items-end' style={{ marginRight: '-250px' }} />
                <img src={Rafa} alt="Rafa" className="my-4 w-44 h-auto" />

                <p className='text-xl font-bold mt-2 text-center text-[#13315C] '>
                      Jefe de proyecto
                    </p>
                    <p className='text-xl mt-2 text-center text-[#13315C] '>
                    {task[0]?.nombre_usuario}
                                        </p>
    
                      {/* <img src={attach} alt="options" className='my-5 items-end' /> */}
                      {/* <button className='bg-[#D9D9D9] text-[#13315C] font-bold text-2xl mt-4 rounded-md py-4 px-4 hover:bg-[#d1d1d1]'>
                        Entregar
                      </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        null
      );
    }
    

export default TaskDetails
