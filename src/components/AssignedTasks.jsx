import React from 'react';
import Tasks from './Tasks';

function AssignedTasks({ profilePhoto }) {
  return (
    <div className="assignedTasks">
      <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Tareas asignadas
      </h3>
      <div className="container my-5 scrollbar-thumb-rounded-7xl">
        <div className="m-12 bg-[#8DA8C5] rounded-lg overflow-hidden relative scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin">
          <ul className={`grid gap-4 p-5 scrollbar-thin`}>
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
            <Tasks profilePhoto={profilePhoto} />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AssignedTasks;
