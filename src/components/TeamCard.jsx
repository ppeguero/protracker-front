import React, {useState} from 'react'

function TeamCard() {

    // Apartir del id del equipo, hacer un filter para poder saber que tareas pertenecen a que equipo y poder mostrarlas en la tarjeta
    // const [tasks, setTasks] = useState([])

  return (
    <li className="">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex h-80 bg-[#13315C] rounded-lg">
            <h4 className="text-[#EEF4ED]">Desarrollo</h4>
        </div>
        <div>
            <img src=""></img>
            <div>
            <h5>Lider de equipo</h5>
            <p>Pedrito Sola</p>
            </div>
        </div>
        <p>Últimas tareas asignadas</p>
        <ul>
            <li>
            <div className="container">
                <div className="flex h-screen">
                <h6>21 de agosto</h6>
                <div className="h-full w-2 rounded-lg bg-[#8DA8C5]"></div>
                <div>
                    <h6>Presentar propuesta</h6>
                    <p>Diseñar la propuesta de aplicación...</p>
                </div>
                </div>
            </div>
            </li>
            <li></li>
        </ul>
        </div>
    </li>
  )
}

export default TeamCard