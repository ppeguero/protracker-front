import React from 'react'
import Tasks from './Tasks'

function AssignedTasks() {
  return (
    <div className="assignedTasks">
    <h3 className="text-xl font-bold text-[#13315C]">Tareas asignadas</h3>
    <div className="container">
    <div className="bg-[#8DA8C5] rounded-lg">
      <ul>
        <Tasks/>
      </ul>
    </div>
    </div>
</div>
  )
}

export default AssignedTasks