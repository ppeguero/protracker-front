import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import Projects from '../../components/Projects';
import TasksForToday from '../../components/TasksForToday';
import Statistics from '../../components/Statistics';
import Calendar from '../../components/Calendar';
import ResourcesRequests from '../../components/ResourcesRequests';
import profilePhoto from '../../assets/images/pipa-img.png'
import jwt_decode from 'jwt-decode';

function ProjectManagerHome() {

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null,
    name: decodedToken ? decodedToken.user_name : null,
  });

  // useEffect(() => {
  //   console.log(user);
  //   console.log(user.id_user);
  // }, []); // Asegúrate de incluir token_jwt en la dependencia del useEffect si lo utilizas dentro

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-MX', options);

    setCurrentDate(formattedDate);
  }, []);


  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
        <Header/>
        <div className= "flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
          <div className='flex flex-col user-info mx-5 md:mx-10'>
              <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='md:mx-10'>
                  <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Hola, {user.name}</h1>
                  <p className="text-[#13315C] text-xl font-light md:text-left text-center mt-2">Hoy es {currentDate}</p>
                </div>
                <div className='flex flex-col md:flex-row'>
                  <div className='my-10'>
                    {/* <Link to='/add-new-project' className='bg-[#13315C] text-white px-8 py-3 rounded-xl'>Añadir nuevo proyecto</Link> */}
                  </div>
                  <div className=' md:my-10 md:mx-10'>
                    {/* <Link to='/add-new-task' className='bg-[#13315C] text-white px-8 py-3 rounded-xl'>Añadir nuevo tarea</Link> */}
                  </div>
                </div>
              </div>
              <Projects link={'/project-details-pj'}/>
              <div className='flex flex-col md:flex-row'>
                {/* <TasksForToday/> */}
              </div>
          </div>
          <div className='flex flex-col justify-between py-5'>
            {/* <Calendar/> */}
            <Statistics/>

            {/* <ResourcesRequests profilePhoto={profilePhoto}/> */}
          </div>
          
        </div>
    </div>
  )
}

export default ProjectManagerHome