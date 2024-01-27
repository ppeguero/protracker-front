import React, {useState} from 'react'
    import optionsIcon from '../assets/icons/options.png'

function TeamCard( { profilePhoto }) {

    // Apartir del id del equipo, hacer un filter para poder saber que tareas pertenecen a que equipo y poder mostrarlas en la tarjeta
    // const [tasks, setTasks] = useState([])

  return (
    <li className="">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-80 bg-[#13315C] rounded-lg p-10 my-5 w-72">
            <div className='flex justify-between'>
                <h4 className="text-[#EEF4ED] font-bold text-2xl">Desarrollo</h4>
                <button>
                    <img src={optionsIcon} className=''></img>
                </button>
            </div>
            
            <div className='flex justify-around py-4'>
                <img src={profilePhoto} className='w-14 h-14'></img>
                <div>
                    <h5 className='text-white font-medium'>Lider de equipo</h5>
                    <p className='text-white font-extralight text-sm'>Pedrito Sola</p>
                </div>
            </div>
        <p className='text-white font-extralight'>Últimas tareas asignadas</p>
        <ul>
            <li>
                <div className="container">
                    <div className="flex h-full justify-center items-center my-2">
                        <h6 className='text-white font-medium text-xs text-center'>21 de agosto</h6>
                        <div className="h-16 w-2 rounded-lg bg-[#8DA8C5] mr-4 ml-1"></div>
                        <div className='py-4'>
                            <h6 className='text-white font-medium text-xs'>Presentar propuesta</h6>
                            <p className='text-white font-extralight truncate text-xs w-28'>Diseñar la propuesta de aplicación para la aplicacion de afd fwfewfsdf kasdasdada sdadasssssss ssssssssssdnlfj fsdlf</p>
                        </div>
                    </div>
                </div>
            </li>
            <li></li>
        </ul>
        </div>
        </div>
    </li>
  )
}

export default TeamCard