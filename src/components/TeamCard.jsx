import React, {useState, useEffect} from 'react'
import optionsIcon from '../assets/icons/options.png'
import jwt_decode from 'jwt-decode'; // Paquete para decodificar tokens JWT
import axios from 'axios';


function TeamCard( { infoTeam, profilePhoto }) {

    const token_jwt = localStorage.getItem('token');
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;

    const [user, setUser] = useState({
      token: token_jwt || null,
      permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
      id_user: decodedToken ? decodedToken.idUser : null,
      name: decodedToken ? decodedToken.user_name : null,
    });

    const [userTeamInfo, setUserTeamInfo] = useState([]);
    const [userTeamTaskInfo, setUserTeamTaskInfo] = useState([]);

    useEffect(() => {
        axios
          .get(`https://localhost:8080/api/users/teams/${user.id_user}`)
          .then((response) => setUserTeamInfo(response.data))
        //   .then(response => console.log(userTeamInfo[0]))
          .catch((error) => console.error('Error fetching project details:', error));
      }, []);

      useEffect(() => {
        axios
          .get(`https://localhost:8080/api/users/teams-task/${user.id_user}`)
          .then((response) => setUserTeamTaskInfo(response.data))
        //   .then(response => console.log(userTeamTaskInfo[0]))
          .catch((error) => console.error('Error fetching project details:', error));
      }, []);

      const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
      };

  return (
    userData && userData.length > 0 ? 
    (<li className=" list-none">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-[400px] bg-[#13315C] rounded-lg p-10 my-5 w-96 mr-10">
            <div className='flex justify-between'>
                <h4 className="text-[#EEF4ED] font-bold text-2xl">{userTeamInfo[infoTeam]?.nombre}</h4>
                <button>
                    <img src={optionsIcon} className=''></img>
                </button>
            </div>
            
            <div className='flex justify-around py-4'>
                <img src={profilePhoto} className='w-14 h-14'></img>
                <div>
                    <h5 className='text-white font-medium'>Lider de equipo</h5>
                    <p className='text-white font-extralight text-sm'>{userTeamInfo[infoTeam]?.nombre_usuario}</p>
                </div>
            </div>
        <p className='text-white font-extralight'>Últimas tareas asignadas</p>
        <ul>
            <li>
                { userTeamInfo[infoTeam]?.nombre === userTeamTaskInfo[infoTeam]?.nombre_equipo ?
                <>
                <div className="container">
                    <div className="flex h-full justify-center items-center my-2">
                        <h6 className='text-white font-medium text-xs text-center ml-2'>{formatDate(userTeamTaskInfo[infoTeam]?.fecha_limite)}</h6>
                        <div className="h-16 w-2 rounded-lg bg-[#8DA8C5] mr-4 ml-3"></div>
                        <div className='py-4'>
                            <h6 className='text-white font-medium text-xs'>{userTeamTaskInfo[infoTeam]?.nombre}</h6>
                            <p className='text-white font-extralight truncate text-xs w-28'>{userTeamTaskInfo[infoTeam]?.descripcion}</p>
                        </div>
                    </div>
                </div>
                </> : <> 
                    <div className='flex h-full justify-center items-center my-2 text-white'>Tu líder aún no te ha asignado ninguna tarea</div>
                </> }
            </li>
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