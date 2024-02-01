import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import jwt_decode from 'jwt-decode';

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
import CrudMembers from './pages/team-member/CRUDS/CrudMembers.jsx'
import ProtectedRoute from './pages/ProtectedRoutes.jsx';

function AppRouter() {

    const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
    const userRole = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
    
    const [user, setUser] = useState({
      permissions: ['ok'],
      user_rol: userRole,
    });
    
    useEffect(() => {
      if (token_jwt) {
        const decodedToken = jwt_decode(token_jwt);
        const userRole = decodedToken.rol_name;
        const permissions = decodedToken.permissions || []; // Asegurarse de que permissions esté definido
        const user = { user_rol: userRole, permissions };
        setUser({
          permissions: ['ok'],
          user_rol: userRole,
        });
        console.log(decodedToken);
      } else {
        setUser({ user_rol: null, permissions: [] });
      }
    }, []);
    

      
    return (
        <>
          <Routes>
            {/* RUTAS PUBLICAS */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/restore-password" element={<RestorePassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/select-account-type" element={<SelectAccountType />} />
            <Route path="/request-details" element={<RequestDetails />} />
            <Route path="/add-new-project" element={<AddNewProject />} />
    
            {/* RUTAS PROTEGIDAS DEL USUARIO */}
            <Route element={<ProtectedRoute isAllowed={user.user_rol === "Usuario" && user.permissions.includes('ok') } />}>
              <Route path="/member-information" element={<MemberInformation />} />
              <Route path="/request-resource" element={<RequestResource />} />
              <Route path="/project-manager-home" element={<ProjectManagerHome />} />
              <Route path="/project-details-pj" element={<ProjectDetails />} />
              <Route path="/project-details-tm" element={<ProjectDetailsMember />} />
              <Route path="/team-member-home" element={<TeamMemberHome />} />
              <Route path="/delivered-task-details" element={<DeliveredTaskDetails />} />
              <Route path="/task-details" element={<TaskDetails />} />
              <Route path="/Profile-Details" element={<ProfileDetails />} />
              <Route path="/project-details-pj" element={<ProjectDetails />} />
              <Route path="/project-details-tm" element={<ProjectDetailsMember />} />
            </Route>
    
    
            {/* RUTAS PROTEGIDAS DEL ADMIN */}
            <Route element={<ProtectedRoute isAllowed={user.user_rol === "Administrador" && user.permissions.includes('ok')} />}>
              <Route path='/projects' element={<CrudProjects />} />
              <Route path='/teams' element={<CrudTeams />} />
              <Route path='/users' element={<CrudUsers />} />
              <Route path='/members' element={<CrudMembers />} />
            </Route>
            
            {/* RUTA NO ENCONTRADA */}
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </>
      );
    }

    export default AppRouter;