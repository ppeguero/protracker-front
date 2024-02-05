import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import UrgentTasks from '../../components/UrgentTasks';
import ProjectCard from '../../components/ProjectCard';
import AddResourceButton from '../../components/AddResourceButton';
import TeamCard from '../../components/TeamCard';
import profilePhoto from '../../assets/images/pipa-img.png';
import jwt_decode from 'jwt-decode'; // Paquete para decodificar tokens JWT

function TeamMemberHome() {

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null,
    name: decodedToken ? decodedToken.user_name : null,
  });

  useEffect(() => {
    // console.log(user);
    // console.log(user.id_user);
  }, []); // Asegúrate de incluir token_jwt en la dependencia del useEffect si lo utilizas dentro


  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token) {
      const decodedToken = jwt_decode(token);
      setCurrentUser(decodedToken.user_name);
    }
    
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('es-MX', options);

    setCurrentDate(formattedDate);
  }, []);

  return (
    <div className='w-full container h-screen bg-[#EEF4ED]'>
      <Header/>
      <div className='flex justify-around px-12 pb-6 w-full h-auto bg-[#EEF4ED]'>
        <div className='container w-fit'>
          <div className='mb-6 flex flex-col space-y-2'>
            <h1 className='text-3xl font-extrabold text-[#13315C]'>Bienvenido, {currentUser}</h1>
            <p className='text-lg font-regular text-[#13315C]'>Aquí está tu agenda para hoy,
              <br></br>
              {currentDate}
            </p>
          </div>
          <div className='w-fit'>
            <UrgentTasks/>
          </div>
        </div>
        <div className='container w-fit flex flex-col'>
          <div className='projects'>
            <div>
              <h2 className='text-3xl font-bold text-[#13315C]'>Proyectos activos</h2>
            </div>
            <div>
              <ProjectCard infoProyect={0}/>
              <ProjectCard infoProyect={1}/>
            </div>
          </div>
          <div className='resources space-y-2'>
            <h2 className='text-3xl font-bold text-[#13315C]'>Recursos</h2>
            <AddResourceButton/>
          </div>
        </div>
        <div className='teams flex flex-col'>
          <h2 className='w-44 text-2xl font-bold text-[#13315C]'>Equipos a los que perteneces</h2>
          <TeamCard infoTeam = {0} profilePhoto={profilePhoto}/>
          <TeamCard infoTeam = {1} profilePhoto={profilePhoto}/>
        </div>
      </div>
    </div>
  )
}

export default TeamMemberHome;