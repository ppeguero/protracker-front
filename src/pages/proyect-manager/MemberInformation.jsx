import React, {useState} from 'react'
import profilePhoto from "../../assets/images/pipa-img.png"
import UserInfo from '../../components/UserInfo'
import Teams from '../../components/Teams'
import AssignedTasks from '../../components/AssignedTasks'
import Header from '../../components/Header'

function MemberInformation() {

  const [userData, setUserData] = useState({
    name: "Pipa",
    email: "pipa@utcancun.edu.mx",
    specialty: "Programadora",
    profilePhoto: profilePhoto
  })

  const [teamsData, setTeamsData] = useState([])
  
  const [tasksData, setTasksData] = useState([])

  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
        <Header homeLink={'/team-member-home'}/>
        <div className= "flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
            <UserInfo name={userData.name} email={userData.email} specialty={userData.specialty} profilePhoto={profilePhoto}/>
            <div>
                <Teams profilePhoto={userData.profilePhoto}/>
                <AssignedTasks profilePhoto={userData.profilePhoto}/>
            </div>
        </div>
    </div>
  )
}

export default MemberInformation