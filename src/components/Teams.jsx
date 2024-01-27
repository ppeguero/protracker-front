import React from 'react'
import TeamCard from './TeamCard'

function Teams() {
  return (
    <div className="teams">
        <h2 className="text-2xl font-bold text-[#13315C]">Equipos a los que pertenece</h2>
        <div>
            <ul>
            <TeamCard/>
            </ul>
        </div>
    </div>
  )
}

export default Teams