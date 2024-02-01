// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import Login from './pages/Login.jsx'
// import NotFound from './pages/NotFound.jsx'
// import Register from './pages/Register.jsx'
// import MemberInformation from './pages/proyect-manager/MemberInformation.jsx'
// import RequestResource from './pages/team-member/RequestResource.jsx'
// import ProjectManagerHome from './pages/proyect-manager/ProjectManagerHome.jsx'
// import RestorePassword from './pages/RestorePassword.jsx'
// import ChangePassword from './pages/ChangePassword.jsx'
// import SelectAccountType from './pages/SelectAccountType.jsx'
// import ProjectDetails from './pages/proyect-manager/ProjectDetails.jsx'
// import ProjectDetailsMember from './pages/team-member/ProjectDetailsMember.jsx'
// import TeamMemberHome from './pages/team-member/TeamMemberHome.jsx'
// import DeliveredTaskDetails from './pages/proyect-manager/DeliveredTaskDetails.jsx'
// import TaskDetails from './pages/team-member/TaskDetails.jsx'
// import ProfileDetails from './pages/ProfileDetails.jsx'
// import RequestDetails from './pages/proyect-manager/RequestDetails.jsx'
// import AddNewProject from './pages/proyect-manager/AddNewProject.jsx'
// import CrudProjects from './pages/team-member/CRUDS/CrudProjects.jsx'
// import CrudTeams from './pages/team-member/CRUDS/CrudTeams.jsx'
// import CrudUsers from './pages/team-member/CRUDS/CrudUsers.jsx'
// import CrudMembers from './pages/team-member/CRUDS/CrudMembers.jsx'
// import ProtectedRoutes from './pages/ProtectedRoutes.jsx';
// import './index.css';
// import { createBrowserRouter,  RouterProvider } from "react-router-dom";
// import { element } from 'prop-types';

// const router = createBrowserRouter([
  
//   {path: "*", element: <NotFound/>},
//   {path: "/register", element: <Register/>} ,
//   {path: "/login", element: <Login/>},
//   {path: "/restore-password", element: <RestorePassword/>},
//   {path: "/change-password", element: <ChangePassword/>},
//   {path: "/select-account-type", element: <SelectAccountType/>},
//   {path: "/request-details", element: <RequestDetails/>},
//   {path: "/add-new-project", element: <AddNewProject/>},

//   // ! PROTEGIDOS PARA EL USUARIO
//   {path: "/", element: <ProtectedRoutes element={<App />} />},
//   {path: "/member-information", element: <ProtectedRoutes element={<MemberInformation />} />},
//   {path: "/request-resource", element: <ProtectedRoutes element={<RequestResource />} />},
//   {path: "/project-manager-home", element: <ProtectedRoutes element={<ProjectManagerHome />} />},
//   {path: "/project-details-pj", element: <ProtectedRoutes element={<ProjectDetails />} />},
//   {path: "/project-details-tm", element: <ProtectedRoutes element={<ProjectDetailsMember />} />},
//   {path: "/team-member-home", element: <ProtectedRoutes element={<TeamMemberHome />} />},
//   {path: "/delivered-task-details", element: <ProtectedRoutes element={<DeliveredTaskDetails />} />},
//   {path: "/task-details", element: <ProtectedRoutes element={<TaskDetails />} />},
//   {path: "/Profile-Details", element: <ProtectedRoutes element={<ProfileDetails />} />},
//   {path: "/project-details-pj", element: <ProtectedRoutes element={<ProjectDetails />} />},
//   {path: "/project-details-tm", element: <ProtectedRoutes element={<ProjectDetailsMember />} />},
//   {path: "/team-member-home", element: <ProtectedRoutes element={<TeamMemberHome />} />},

//   // ! PROTEGIDOS PARA EL ADMINISTRADOR
//   //* CRUDS
//   {path: "/projects", element: <ProtectedRoutes element={<CrudProjects />} />},
//   {path: "/teams", element: <ProtectedRoutes element={<CrudTeams />} />},
//   {path: "/users", element: <ProtectedRoutes element={<CrudUsers />} />},
//   {path: "/members", element: <ProtectedRoutes element={<CrudMembers />} />}
// ]);

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RouterProvider router={router}/>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();