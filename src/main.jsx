import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import NotFound from './pages/NotFound.jsx'
import Register from './pages/Register.jsx'
import MemberInformation from './pages/proyect-manager/MemberInformation.jsx'
import RequestResource from './pages/team-member/RequestResource.jsx'
import ProjectManagerHome from './pages/proyect-manager/ProjectManagerHome.jsx'
import RestorePassword from './pages/RestorePassword.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import SelectAccountType from './pages/SelectAccountType.jsx'
import ProjectDetails from './pages/proyect-manager/ProjectDetails.jsx'
import ProjectDetailsMember from './pages/team-member/ProjectDetailsMember.jsx'
import TeamMemberHome from './pages/team-member/TeamMemberHome.jsx'
import DeliveredTaskDetails from './pages/proyect-manager/DeliveredTaskDetails.jsx'
import TaskDetails from './pages/team-member/TaskDetails.jsx'
import ProfileDetails from './pages/ProfileDetails.jsx'
import RequestDetails from './pages/proyect-manager/RequestDetails.jsx'
import AddNewProject from './pages/proyect-manager/AddNewProject.jsx'

import CrudProjects from './pages/team-member/CRUDS/CrudProjects.jsx'
import CrudTeams from './pages/team-member/CRUDS/CrudTeams.jsx'
import CrudUsers from './pages/team-member/CRUDS/CrudUsers.jsx'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { element } from 'prop-types'

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "*", element: <NotFound/>},
  {path: "/register", element: <Register/>},
  {path: "/login", element: <Login/>},
  {path: "/member-information", element: <MemberInformation/>},
  {path: "/request-resource", element: <RequestResource/>},
  {path: "/project-manager-home", element: <ProjectManagerHome/>},
  {path: "/restore-password", element: <RestorePassword/>},
  {path: "/change-password", element: <ChangePassword/>},
  {path: "/select-account-type", element: <SelectAccountType/>},
  {path: "/project-details-pj", element: <ProjectDetails/>},
  {path: "/project-details-tm", element: <ProjectDetailsMember/>},
  {path: "/team-member-home", element: <TeamMemberHome/>},
  {path: "/delivered-task-details", element: <DeliveredTaskDetails/>},
  {path: "/task-details", element: <TaskDetails/>},
  {path: "/Profile-Details", element: <ProfileDetails/>},
  {path: "/project-details-pj", element: <ProjectDetails/>},
  {path: "/project-details-tm", element: <ProjectDetailsMember/>},
  {path: "/team-member-home", element: <TeamMemberHome/>},
  {path: "/restore-password", element: <RestorePassword/>},
  {path: "/change-password", element: <ChangePassword/>},
  {path: "/select-account-type", element: <SelectAccountType/>},
  {path: "/request-details", element: <RequestDetails/>},
  {path: "/add-new-project", element: <AddNewProject/>},

  //* CRUDS
  {path: "/projects", element: <CrudProjects/>},
  {path: "/teams", element: <CrudTeams/>},
  {path: "/users", element: <CrudUsers/>},
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
