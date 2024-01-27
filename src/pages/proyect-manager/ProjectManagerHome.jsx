import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Link } from 'react-router-dom'
import Projects from '../../components/Projects';
import TasksForToday from '../../components/TasksForToday';
import Statistics from '../../components/Statistics';
import Calendar from '../../components/Calendar';
import ResourcesRequests from '../../components/ResourcesRequests';
import profilePhoto from '../../assets/images/pipa-img.png'

function ProjectManagerHome() {

  const [data, setData] = useState({
    name: "Rafael"
  })

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
                  <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Hola, {data.name}</h1>
                  <p className="text-[#13315C] text-xl font-light md:text-left text-center mt-2">Hoy es {currentDate}</p>
                </div>
                <div className='my-10 md:mx-10'>
                  <Link className='bg-[#13315C] text-white px-8 py-3 rounded-xl'>Añadir nuevo proyecto</Link>
                </div>
              </div>
              <Projects/>
              <div className='flex flex-col md:flex-row'>
                <TasksForToday/>
                <Statistics/>
              </div>
          </div>
          <div>
            <Calendar/>
            <ResourcesRequests profilePhoto={profilePhoto}/>
          </div>
          
        </div>
    </div>
  )
}

export default ProjectManagerHome