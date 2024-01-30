import React from 'react'
import ProjectCard from './ProjectCard'

function Projects() {
  return (
    <div className='project mx-14 my-2'>
        <h3 className="text-xl font-extrabold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Proyectos
        </h3>
        <ul className="grid md:grid-cols-3 md:gap-8 justify-center md:justify-start mt-4">
            <ProjectCard/>
            <ProjectCard/>
            <ProjectCard/>
        </ul>
    </div>
  )
}

export default Projects