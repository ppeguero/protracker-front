import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import TeamCard from "../../components/TeamCard"
import TeamMembersCard from "../../components/TeamMembersCard";
import TeamRequestResource from "../../components/TeamRequestResource";
import profilePicture from "../../assets/images/pipa-img.png";
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const [projectDetail, setProjectDetail] = useState({});
  const [show, setShow] = useState(false);
  const [project, setProject] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [team, setTeam] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null;
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });

  const { id } = useParams();
  const idNumerico = parseInt(id, 10);

  useEffect(() => {
    const fetchData = async () => {
      await getProject();
      await getTeam();
      await getMembers();
      setDataLoaded(true);
    };
    fetchData();
  }, []);

  const getProject = async () => {
    try {
      const response = await fetch(`https://localhost:8080/api/projects/${idNumerico}`);
      const data = await response.json();
      setProjectDetail(data);
      if (data.id_usuario_id !== user.id_user) {
        window.location.href = "/project-manager-home";
      } else {
        setShow(true);
      }
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };

  const getTeam = async () => {
    try {
      const response = await fetch(`https://localhost:8080/api/teams/${projectDetail.id_equipo_id}`);
      const data = await response.json();
      // console.log("team filter", data);
      setTeam(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch('https://localhost:8080/api/members/');
      const data = await response.json();
      if (data && Array.isArray(data)) {
        const membersFilter = data.filter(member => member.id_equipo_id === projectDetail.id_equipo_id);
        // console.log("members filter", membersFilter);
        setMiembros(membersFilter);
      } else {
        console.error("La respuesta de la API no contiene un array de miembros:", data);
      }
    } catch (error) {
      console.error("Error al obtener miembros:", error);
    }
  };

  return (
    dataLoaded ? (
      <div className="h-screen container bg-[#EEF4ED] w-full ">
        <Header homeLink={userRole === "Project Manager"? '/project-manager-home' : '/team-member-home'}/>
        <div className="flex flex-col w-full h-auto bg-[#EEF4ED]">
          <div className="flex">
            <div className="flex flex-col md:flex-row ">
              <div className="flex flex-col ml-6 h-fit">
                <ReturnButton/>
              </div>
              <div className="h-fit flex flex-col mr-8">
                <h2 className="text-4xl text-[#134175] font-extrabold pt-10">Proyecto</h2>
                <ProjectDetailsCard idNumerico={idNumerico}/>
              </div>
            </div>
            <div className="">
              <div className="h-fit mt-10">
                <h2 className="text-4xl text-[#134175] font-extrabold">Equipo</h2>
                <div className="flex space-x-4">
                  <TeamCard profilePhoto={profilePicture} team={team}/>
                </div>
              </div>
            </div>
            <div className="">
              <div className="h-fit mt-10">
                <h2 className="text-4xl text-[#134175] font-extrabold">Miembros</h2>
                <div className="flex space-x-4">
                  <TeamMembersCard idNumerico={idNumerico} members={miembros}/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-[110px]">
            <TeamRequestResource/>
          </div>
        </div>
      </div>
    ) : null
  );
}

export default ProjectDetails;
