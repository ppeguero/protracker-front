import React from 'react'
import TodayTask from './TodayTask'

function TasksForToday() {
  return (
    <div className='project mx-14 my-2'>
        <h3 className="text-xl font-extrabold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Tareas para hoy
        </h3>
        <ul className="grid md:gap-8 justify-center md:justify-start mt-4">
            <TodayTask/>
            <TodayTask/>
            <TodayTask/>
        </ul>
    </div>
  )
}

export default TasksForToday