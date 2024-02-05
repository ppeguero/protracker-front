import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import TeamCardProjectM from "../../components/TeamCardProjectM"
import TeamMembersCard from "../../components/TeamMembersCard";
import TeamRequestResource from "../../components/TeamRequestResource";
import profilePicture from "../../assets/images/pipa-img.png";
import jwt_decode from 'jwt-decode';
import { useParams } from 'react-router-dom';


function ProjectDetailsMember() {
  const [projectDetail, setProjectDetail] = useState({});
  const [show, setShow] = useState(false);
  const [project, setProject] = useState([]);
  const [miembros, setMiembros] = useState([]);
  const [team, setTeam] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [teams, setTeams] = useState([]);
  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null;
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });

  const [teamProjectId, setTeamProjectId] = useState(null);


  const { id } = useParams();
  const idNumerico = parseInt(id, 10);

  useEffect(() => {
    getProject();
    getTeams();
  }, []);

  useEffect(() => {   
    if(projectDetail.id_equipo_id){
      getTeam();
      getMembers();
      getTasks();
    }
  }, [projectDetail.id_equipo_id]);

  useEffect(() => {
    if(user.id_user && teamProjectId){
      getMemberWithIdprojectAndUserId();
    }
  }, [user.id_user, teamProjectId])

  const getMemberWithIdprojectAndUserId = () => {
    console.log(teamProjectId);
    console.log(user.id_user);
    fetch(`https://localhost:8080/api/members-project-user/${teamProjectId}/${user.id_user}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.length > 0){
          setShow(true);
        } else{
          location.href = '/team-member-home';
        }
        console.log(data.length);
        console.log(show);
      })
  }

  const getProject = () => {
    try {
      fetch(`https://localhost:8080/api/projects/${idNumerico}`)
        .then(response => response.json())
        .then(data => {
          setProjectDetail(data);
          console.log(data.id_equipo_id);
          setTeamProjectId(data.id_equipo_id);
        })
        .catch(error => {
          console.error('Error al obtener proyectos:', error);
        });
    } catch (error) {
      console.error('Error al obtener proyectos:', error);
    }
  };
  
  const getTeams = async () => {
    try {
      const response = await fetch(`https://localhost:8080/api/teams-member/${user.id_user}`);
      const data = await response.json();
      console.log(data);
      setTeams(data);
      // console.log("detalles de los equipos", data);
    } catch (error) {
      console.error(error);
    }
  }
  
  const getTeam = async () => {
    try {
      console.log(projectDetail.id_equipo_id);
      const response = await fetch(`https://localhost:8080/api/teams/${projectDetail.id_equipo_id}`);
      const data = await response.json();
      setTeam(data.equipo);
      console.log("detalles del equipo", data.equipo);
    } catch (error) {
      console.error(error);
    }
  };

  const getMembers = async () => {
    try {
      const response = await fetch(`https://localhost:8080/api/members-team/${projectDetail.id_equipo_id}`);
      const data = await response.json();
      setMiembros(data);
      setDataLoaded(true);
      console.log("detalles de los miembros", data);
    } catch (error) {
      console.error(error);
    }
    }

    const getTasks = async () => {
      try {
        const response = await fetch(`https://localhost:8080/api/tasks/`);
        const data = await response.json();
        setTasks(data);
        console.log("detalles de las tareas", data);
      } catch (error) {
        console.error(error);
      }
      }

  return (
    show && dataLoaded ? (
      <div className="h-screen container bg-[#EEF4ED] w-full ">
        <Header homeLink={userRole === "Project Manager"? '/project-manager-home' : '/team-member-home'}/>
        <div className="flex flex-col w-full h-auto bg-[#EEF4ED]">
              <div className="flex flex-col ml-28 h-fit">
                <ReturnButton/>
              </div>
          <div className="flex">
          
            <div className="flex flex-col md:flex-row ">
            <div className="flex flex-col ml-28 h-fit">
                <p></p>
              </div>
              <div className="h-fit flex flex-col mr-8">
                <h2 className="text-4xl text-[#134175] font-extrabold">Proyecto</h2>
                <ProjectDetailsCard idNumerico={idNumerico}/>
              </div>
            </div>
            <div className="">
              <div className="h-fit">
                <h2 className="text-4xl text-[#134175] font-extrabold">Equipo</h2>
                <div className="flex space-x-4">
                  <TeamCardProjectM profilePhoto={profilePicture} team={team} tasks={tasks} idNumerico={idNumerico}/>
                </div>
              </div>
            </div>
            <div className="">
              <div className="h-fit">
                <h2 className="text-4xl text-[#134175] font-extrabold">Miembros</h2>
                <div className="flex space-x-4">
                  <TeamMembersCard idNumerico={idNumerico} members={miembros}/>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-[110px]">
            {/* <TeamRequestResource/> */}
          </div>
        </div>
      </div>
    ) : null
  );
}

export default ProjectDetailsMember;
