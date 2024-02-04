import React, {useEffect, useState} from 'react'
import optionsIcon from '../assets/icons/options.png'

function TeamCard( { profilePhoto, team, tasks, idNumerico }) {

    console.log("team card", team);
    console.log("team card", tasks);
    const [userData, setUserData] = useState(null)

    useEffect(()=>{
        fetch(`https://localhost:8080/api/members-team/${team.id_equipo}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setUserData(data)
        })
    },[])

  return (
    userData && userData.length > 0 ? 
    (<li className=" list-none">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-[400px] bg-[#13315C] rounded-lg p-10 my-5 w-96 mr-10">
            <div className='flex justify-between'>
                <h4 className="text-[#EEF4ED] font-bold text-2xl">Líder del equipo</h4>
                <button>
                    <img src={optionsIcon} className=''></img>
                </button>
            </div>
            
            <div className='flex justify-around py-4'>
                <img src={profilePhoto} className='w-14 h-14'></img>
                <div>
                    <h5 className='text-white font-medium'>{team.nombre}</h5>
                    <p className='text-white font-extralight text-sm'>{userData[0].nombre_usuario}</p>
                </div>
            </div>
        <p className='text-white font-extralight'>Últimas tareas asignadas</p>
        <ul>
        {
            tasks.slice(0, 3).map((task, index) => {
                if (task.id_proyecto_id === idNumerico) {
                const date = new Date(task.fecha_limite);

                const day = date.getDate().toString().padStart(2, '0'); // Ensure two digits for the day
                const monthAbbreviation = date.toLocaleDateString(undefined, { month: 'short' });
                const year = date.getFullYear();

                const formattedDate = `${day}/${monthAbbreviation}/${year}`;

                return (
                    <li key={index}>
                    <div className="container">
                        <div className="flex h-full justify-center items-center my-2">
                        <h6 className='text-white font-medium text-xs text-center'>{formattedDate}</h6>
                        <div className="h-16 w-2 rounded-lg bg-[#8DA8C5] mr-4 ml-1"></div>
                        <div className='py-4'>
                            <h6 className='text-white font-medium text-xs'>{task.nombre}</h6>
                            <p className='text-white font-extralight truncate text-xs w-28'>{task.descripcion}</p>
                        </div>
                        </div>
                    </div>
                    </li>
                );
                }
                return null;
            })
            }




            
            <li></li>
        </ul>
        </div>
        </div>
    </li>)
    :
    (
       null

    )
  )
}

export default TeamCard