import React, {useState} from 'react'
import pipaImg from "../../assets/images/pipa-img.png"
import UserInfo from '../../components/UserInfo'
import Teams from '../../components/Teams'
import AssignedTasks from '../../components/AssignedTasks'
import Header from '../../components/Header'

function MemberInformation() {

  const [userData, setUserData] = useState({
    name: "Pipa",
    email: "pipa@utcancun.edu.mx",
    specialty: "Programadora",
  })

  const [teamsData, setTeamsData] = useState([])
  
  const [tasksData, setTasksData] = useState([])

  return (
    <div className="h-screen container">
        <Header/>
        <div className= "flex flex-col w-full h-full bg-[#EEF4ED] md:flex-row">
            <UserInfo name={userData.name} email={userData.email} specialty={userData.specialty} profilePhoto={pipaImg}/>
            <div>
                <Teams/>
                <AssignedTasks/>
            </div>
        </div>
    </div>
  )
}

export default MemberInformation