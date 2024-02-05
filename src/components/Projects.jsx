import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import jwt_decode from 'jwt-decode';

function Projects({ link }) {
  const [projects, setProjects] = useState([]);

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });



  useEffect(() => {

    fetch('https://localhost:8080/api/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error al obtener proyectos:', error));

  }, []); 

  // console.log(projects);

  return (
    <div className='project mx-14 my-2 w-full h-[600px] overflow-auto scrollbar-track-transparent scrollbar-thumb-[#134175] scrollbar-thumb-rounded-7xl scrollbar-thin'>
      <h3 className="text-xl font-extrabold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
        Proyectos
      </h3>
      <ul className="overflow-auto grid md:grid-cols-3 md:gap-8 justify-center md:justify-start mt-4">
        {projects
          .filter(project => project.id_usuario_id === user.id_user) // Filtrar proyectos según el id_user
          .map(project => (
            <ProjectCard key={project.id} title={project.nombre} idProject={project.id_proyecto} link={link} description={project.descripcion} fecha_inicio={project.fecha_inicio}/>
          ))}
      </ul>
    </div>
  );
}

export default Projects;
