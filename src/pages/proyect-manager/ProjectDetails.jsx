import React from "react";
import Header from "../../components/Header";
import ReturnButton from "../../components/ReturnButton";
import ProjectDetailsCard from "../../components/ProjectDetailsCard";
import ProjectStatistics from "../../components/ProjectStatistics";
import TeamCard from "../../components/TeamCard"
import profilePicture from "../../assets/images/pipa-img.png"
import CompletedTaskHistory from "../../components/CompletedTaskHistory";
import TeamMembersCard from "../../components/TeamMembersCard";

import ProjectResources from "../../components/ProjectResources";

function ProjectDetails() {

  const id_project = 4;

  return (
    <div className="h-screen container bg-[#EEF4ED] w-full ">
      <Header />
      <div className="flex w-full h-auto bg-[#EEF4ED]">
        <div className="flex flex-col  md:flex-row ">
          <div className="flex flex-col ml-6 h-fit">
            <ReturnButton link={"/"} />
          </div>
          <div className="h-fit flex flex-col mr-8">
            <ProjectDetailsCard />
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
              <ProjectResources id_project={id_project}/>
              <TeamMembersCard/>
            </div>      
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
