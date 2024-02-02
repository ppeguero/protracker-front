import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import ProjectStatistics from "../../components/ProjectStatistics";
import TeamCard from "../../components/TeamCard"
import profilePicture from "../../assets/images/pipa-img.png"
import CompletedTaskHistory from "../../components/CompletedTaskHistory";
import TeamMembersCard from "../../components/TeamMembersCard";
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';


function ProjectDetails() {

  const [projectDetail, setProjectDetail] = useState({})
  const { id } = useParams();
  const idNumerico = parseInt(id, 10);
  const [show, setShow] = useState(false);

  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });

  // useEffect(() => {
  //   console.log(user);
  //   console.log(user.id_user);
  // }, []); // Asegúrate de incluir token_jwt en la dependencia del useEffect si lo utilizas dentro
  useEffect(() => {
    // Realizar la solicitud al endpoint de proyectos aquí
    // Puedes usar fetch, axios u otro método para obtener la información
  
    // Ejemplo usando fetch
    fetch(`https://localhost:8080/api/projects/${idNumerico}`)
      .then(response => response.json())
      .then(data => {
        setProjectDetail(data);
        console.log("Proyecto:", data);
        if(data.id_usuario_id !== user.id_user){
          window.location.href = "/project-manager-home";
        }else{
          setShow(true);
        }
      })
      .catch(error => console.error('Error al obtener proyectos:', error));
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente
  


  return (
    
      show ? 
      <div className="h-screen container bg-[#EEF4ED] w-full ">
      <Header />
      <div className="flex w-full h-auto bg-[#EEF4ED]">
        <div className="flex flex-col  md:flex-row ">
          <div className="flex flex-col ml-6 h-fit">
            <ReturnButton/>
          </div>
          <div className="h-fit flex flex-col mr-8">
            <ProjectDetailsCard idNumerico={idNumerico}/>
            <ProjectStatistics />
          </div>
        </div>
        <div className="">
          <div className="h-fit">
            <h2 className="text-4xl text-[#134175] font-extrabold">Equipos</h2>
            <div className="flex space-x-4">
              <TeamCard profilePhoto={profilePicture}/>
              <TeamCard profilePhoto={profilePicture}/>
              <TeamCard profilePhoto={profilePicture}/>
            </div>      
            <div className="flex justify-around">
              <CompletedTaskHistory/>
              <TeamMembersCard/>
            </div>      
          </div>
        </div>
      </div>
    </div>
    :
    null
  );
}

export default ProjectDetails;
