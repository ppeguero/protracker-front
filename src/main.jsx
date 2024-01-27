import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MemberInformation from './pages/proyect-manager/MemberInformation.jsx'
import RequestResource from './pages/team-member/RequestResource.jsx'
import ProjectManagerHome from './pages/proyect-manager/ProjectManagerHome.jsx'
import RestorePassword from './pages/RestorePassword.jsx'

import './index.css'
import Login from './pages/Login.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/login", element: <Login/>},
  {path: "/member-information", element: <MemberInformation/>},
  {path: "/request-resource", element: <RequestResource/>},
  {path: "/project-manager-home", element: <ProjectManagerHome/>},
  {path: "/restore-password", element: <RestorePassword/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
