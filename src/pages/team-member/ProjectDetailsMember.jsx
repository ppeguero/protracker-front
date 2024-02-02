import React from 'react'
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import LongStatisticsCard from '../../components/LongStatisticsCard';
import TeamCard from "../../components/TeamCard"
import profilePicture from "../../assets/images/pipa-img.png"
import CompletedTaskHistory from "../../components/CompletedTaskHistory";
import TeamMembersCard from "../../components/TeamMembersCard";
import Calendar from "../../components/Calendar"
import ProjectResources from '../../components/ProjectResources'

function ProjectDetailsMember() {

  const id_project = 4;


  return (
    <div className='h-screen container bg-[#EEF4ED] w-full'>
      <Header/>
      <div className="flex w-full h-auto bg-[#EEF4ED] space-x-6">
        <div className="flex flex-col md:flex-row ">
          <div className="flex flex-col ml-6 h-fit">
            <ReturnButton link={"/"} />
          </div>
          <div className="h-fit flex flex-col mr-8 space-y-6">
            <ProjectDetailsCard />
            <LongStatisticsCard completedTasks={15} totalTasks={19} description={"tareas completadas de"} color={"#134175"} textColor={"white"}/>
          </div>
        </div>
        <div className="flex flex-col justify-around ">
          <div className="h-fit space-y-6">
            <h2 className="text-4xl text-[#134175] font-extrabold mt-[-6px]">Equipo del proyecto</h2>
              <div className="flex space-x-4">
                <TeamMembersCard/>
              </div>            
          </div>
          <div className='flex justify-around'>
            <ProjectResources id_project={id_project}/>
          </div>
        </div>
        <Calendar/>
      </div>
    </div>
  )
}

export default ProjectDetailsMember