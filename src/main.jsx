import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MemberInformation from './pages/proyect-manager/MemberInformation.jsx'
import RequestResource from './pages/team-member/RequestResource.jsx'
import ProjectManagerHome from './pages/proyect-manager/ProjectManagerHome.jsx'
import ProjectDetails from './pages/proyect-manager/ProjectDetails.jsx'
import ProjectDetailsMember from './pages/team-member/ProjectDetailsMember.jsx'
import TeamMemberHome from './pages/team-member/TeamMemberHome.jsx'

import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/member-information", element: <MemberInformation/>},
  {path: "/request-resource", element: <RequestResource/>},
  {path: "/project-manager-home", element: <ProjectManagerHome/>},
  {path: "/project-details-pj", element: <ProjectDetails/>},
  {path: "/project-details-tm", element: <ProjectDetailsMember/>},
  {path: "/team-member-home", element: <TeamMemberHome/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
