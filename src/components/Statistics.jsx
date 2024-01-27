import React from 'react'
import StatisticCard from './StatisticCard'

function Statistics() {
  return (
    <div className='project md:mx-14 my-2'>
        <h3 className="text-xl font-extrabold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Estadísticas
        </h3>
        <ul className="grid grid-cols-2 gap-8 justify-center md:justify-start mt-4">
            <StatisticCard data={45} description={"Tareas Completadas en total"}/>
            <StatisticCard data={9} description={"Equipos trabajando"}/>
            <StatisticCard data={"77%"} description={"De cumplimiento en tiempo y forma"}/>
            <StatisticCard data={"77%"} description={"De cumplimiento en tiempo y forma"}/>
        </ul>
    </div>
  )
}

export default Statistics