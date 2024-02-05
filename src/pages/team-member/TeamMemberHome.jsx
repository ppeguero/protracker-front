import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import UrgentTasks from '../../components/UrgentTasks';
import ProjectCardMember from '../../components/ProjectCardMember';
import AddResourceButton from '../../components/AddResourceButton';
import TeamCard from '../../components/TeamCard';
import profilePhoto from '../../assets/images/pipa-img.png';
import jwt_decode from 'jwt-decode';

function TeamMemberHome() {
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const idUser = decodedToken ? decodedToken.idUser : null;
  const link = '/project-details-tm';

  useEffect(() => {
    fetch(`https://localhost:8080/api/teams-member/${idUser}`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        setUniqueTeams(new Set(data.map(team => team.id_equipo)));
        console.log(data);
      })
      .catch(error => console.error('Error al obtener equipos:', error));
  }, [idUser]); 

  useEffect(() => {
    if (uniqueTeams.size > 0) {
      const teamPromises = Array.from(uniqueTeams).map(teamId => {
        return fetch(`https://localhost:8080/api/projects-team/${teamId}`)
          .then(response => response.json());
      });

      Promise.all(teamPromises)
        .then(data => {
          const flattenedProjects = data.flat();
          setProjects(flattenedProjects);
          console.log(flattenedProjects);
        })
        .catch(error => console.error('Error al obtener proyectos de los equipos:', error));
    }
  }, [uniqueTeams]); 

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
      <Header />
      <div className='flex justify-around px-12 pb-6 w-full h-auto bg-[#EEF4ED]'>
        <div className='container w-fit'>
          <div className='mb-6 flex flex-col space-y-2'>
            <h1 className='text-3xl font-extrabold text-[#13315C]'>Bienvenido, {currentUser}</h1>
            <p className='text-lg font-regular text-[#13315C]'>
              Aquí está tu agenda para hoy,
              <br />
              {currentDate}
            </p>
          </div>
          <div className='w-fit'>
            <UrgentTasks />
          </div>
        </div>
        <div className='container w-fit flex flex-col'>
          <div className='projects pt-16'>
            <div>
              <h2 className='text-3xl font-bold text-[#13315C] mb-5'>Proyectos activos</h2>
            </div>
            <div className=' h-[610px] overflow-y-scroll scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin pr-2'>
              {projects.map(project => (
                <ProjectCardMember
                  key={project.id_proyecto}
                  title={project.nombre}
                  idProject={project.id_proyecto}
                  link={link}
                  description={project.descripcion}
                  fecha_inicio={project.fecha_inicio}
                />
              ))}
            </div>
          </div>
          <div className='resources space-y-2 '>
            <h2 className='text-3xl font-bold text-[#13315C] mt-4'>Recursos</h2>
            <AddResourceButton />
          </div>
        </div>
        <div className='teams flex flex-col pt-8'>
          <h2 className='w-44 text-2xl font-bold text-[#13315C]'>Equipos a los que perteneces</h2>
          {teams.map(team => (
            <TeamCard key={team.id_equipo} idTeam={team.id_equipo} name={team.nombre_equipo} leader={team.nombre_usuario} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamMemberHome;
