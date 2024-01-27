import React from 'react'
import TeamCard from './TeamCard'

function Teams( { profilePhoto }) {
  return (
    <div className="teams">
        <h2 className="text-2xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">Equipos a los que pertenece</h2>
        <div>
            <ul className='flex flex-col justify-center items-center md:grid-cols-3 md:gap-6 md:justify-items-center md:items-center md:flex-row md:m-0'>
            <TeamCard profilePhoto={profilePhoto}/>
            <TeamCard profilePhoto={profilePhoto}/>
            <TeamCard profilePhoto={profilePhoto}/>
            </ul>
        </div>
    </div>
  )
}

export default Teams