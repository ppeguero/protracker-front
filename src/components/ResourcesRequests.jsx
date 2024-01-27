import React from 'react'
import ResourceRequestCard from './ResourceRequestCard'

function ResourcesRequests( { profilePhoto }) {
  return (
    <div className="assignedTasks flex flex-col justify-center items-center">
      <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Tareas asignadas
      </h3>
      <div className="flex flex-col bg-[#13315C] rounded-lg my-5 w-80 overflow-hidden">
        <div className=" bg-[#13315C] rounded-lg overflow-hidden relative scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin">
          <ul className={`grid gap-4 p-5 scrollbar-thin`}>
            <ResourceRequestCard title="Sistema de gestión de estadías" description="Tipo de recurso: Humano" profilePhoto={profilePhoto}/>
            <ResourceRequestCard title="Sistema de gestión de estadías" description="Tipo de recurso: Humano" profilePhoto={profilePhoto}/>
            <ResourceRequestCard title="Sistema de gestión de estadías" description="Tipo de recurso: Humano" profilePhoto={profilePhoto}/>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ResourcesRequests