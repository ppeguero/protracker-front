import React from 'react'
import optionsIcon from '../assets/icons/options.png'
import teamIcon1 from '../assets/icons/team1.png'
import teamIcon2 from '../assets/icons/team2.png'
import { Link } from 'react-router-dom'

function ProjectCard({ title , idProject, link}) {
  return (
    <Link to={`${link}/${idProject}`} className="">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-56 bg-[#134175] rounded-lg p-8 my-5 w-72">
            <div className='flex justify-between'>
                <div className=''>
                    <img src={teamIcon2}></img>
                </div>
                <button>
                    <img src={optionsIcon} className=''>

                    </img>
                </button>
            </div>
            <h4 className="text-[#EEF4ED] font-bold mt-5 text-xl w-48">{title}</h4>
        <p className='text-white font-extralight mt-6 text-xs'>15 tareas | 80%</p>
        </div>
        </div>
    </Link>
  )
}

export default ProjectCard