import React, { useState, useEffect } from 'react';
import CalendarTask from './CalendarTask';
import Axios from 'axios';

function Calendar() {
  const [currentDate, setCurrentDate] = useState('');
  const [dateNext, setDateNext] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentDateFormat, setCurrentDateFormat] = useState('')
  const [dateNextFormat, setDateNextFormat] = useState('')

  useEffect(() => {
    const today = new Date();
    setCurrentDate(today.toISOString().split('T')[0]);
  }, []);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setDateNext(tomorrow.toISOString().split('T')[0]);
  }, []);

  //* DATES FORMAT
  useEffect(() => {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-MX', options);

    const dayName = formattedDate.split(', ')[0];
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    setCurrentDateFormat(formattedDayName + ', ' + formattedDate.substring(formattedDayName.length + 2));
  }, []);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = tomorrow.toLocaleDateString('es-MX', options);

    const dayName = formattedDate.split(', ')[0];
    const formattedDayName = dayName.charAt(0).toUpperCase() + dayName.slice(1);

    setDateNextFormat(formattedDayName + ', ' + formattedDate.substring(formattedDayName.length + 2));
  }, []);

  const IdUsuario = 1; //* Cambiar por el del localStorage

  useEffect(() => {
    Axios.get(`https://localhost:8080/api/tasks/${IdUsuario}`)
      .then((res) => {
        // console.log('All tasks:', res.data);

        const tasksData = res.data.filter((task) => {
          const taskDate = new Date(task.fecha_limite).toISOString().split('T')[0];

          return taskDate === currentDate || taskDate === dateNext;
        });

        // console.log('Filtered tasks:', tasksData);

        setTasks(tasksData);
      })
      .catch((err) => console.log(err));
  }, [currentDate, dateNext]);

  return (
    <div className="">
      <div className="container flex justify-center">
        <div className="flex flex-col bg-[#13315C] rounded-lg p-10 my-5 w-80 overflow-hidden">
          <div className='flex justify-between'>
            <h4 className="text-[#EEF4ED] font-bold text-2xl">Calendario</h4>
          </div>

          <ul className='h-90 overflow-y-auto'>
            <p className='text-white font-extralight my-2'>{currentDateFormat}</p>
            {tasks
              .filter((task) => new Date(task.fecha_limite).toISOString().split('T')[0] === currentDate)
              .slice(0, 2)
              .map((task) => (
                <CalendarTask
                  key={task.id_tarea}
                  team="Equipo 1"
                  teamName="Desarrollo"
                  title={task.nombre}
                  description={task.descripcion}
                />
              ))}
            <p className='text-white font-extralight my-2'>{dateNextFormat}</p>
            {tasks
              .filter((task) => new Date(task.fecha_limite).toISOString().split('T')[0] === dateNext)
              .slice(0, 2)
              .map((task) => (
                <CalendarTask
                  key={task.id_tarea}
                  team="Equipo 1"
                  teamName="Desarrollo"
                  title={task.nombre}
                  description={task.descripcion}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Calendar;
