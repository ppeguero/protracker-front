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
import AddNewTask from './pages/proyect-manager/AddNewTask.jsx';
import Home from './pages/Home.jsx';
import NotAuth from './pages/NotAuth.jsx';
import CrudResource from './pages/team-member/CRUDS/CrudResource.jsx';
import CrudTasks from './pages/team-member/CRUDS/CrudTask.jsx';


function AppRouter() {

    const token_jwt = localStorage.getItem('token'); 
    const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
    const userRole = decodedToken ? decodedToken.rol_name : null; 
    
    const [user, setUser] = useState({
      token: token_jwt || null,
      permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
      user_rol: userRole || '',
    });

    const [rolesPermissions, setRolesPermisos] = useState([]);

    useEffect(() => {
      fetch('https://localhost:8080/api/roles')
      .then(response => response.json())
      .then(data => {
        setRolesPermisos(data);
      })
      .catch(error => {
        console.error('Error al obtener los roles:', error);
      });
    }, [])

    function hasPermissions(user, requiredRole, requiredPermissions) {
      return (
        !!user.token &&
        user.user_rol === requiredRole &&
        requiredPermissions.every((permission) => user.permissions.includes(permission))
      );
    }


    return (
        rolesPermissions.length > 0 ?
        <>
          <Routes>
            {/* RUTAS PUBLICAS */}
            <Route path="/" element={<Home />} />
            <Route path="/not-auth" element={<NotAuth />} />

            <Route element={<ProtectedRoute
            isAllowed={ !user.token }
            />}>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register />} />
              <Route path="/restore-password" element={<RestorePassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
    
            {/* RUTAS PROTEGIDAS DEL USUARIO PROJECT MANAGER*/}
            <Route element={<ProtectedRoute
            isAllowed={hasPermissions(user, rolesPermissions[1].nombre, rolesPermissions[1].permisos.split(', '))}
            />}>
              <Route path="/project-manager-home" element={<ProjectManagerHome />} />
              <Route path="/add-new-project" element={<AddNewProject />} />
              <Route path="/add-new-task" element={<AddNewTask />} />
              <Route path="/delivered-task-details" element={<DeliveredTaskDetails />} />
              <Route path="/member-information" element={<MemberInformation />} />
              <Route path="/project-details-pj/:id" element={<ProjectDetails />} />
              <Route path="/request-details/:id" element={<RequestDetails />} />
              {/* <Route path="/Profile-Details" element={<ProfileDetails />} /> */}
            </Route>

            {/* RUTAS PROTEGIDAS DEL USUARIO MEMBERS*/}
            <Route element={<ProtectedRoute
            isAllowed={hasPermissions(user, rolesPermissions[2].nombre, rolesPermissions[2].permisos.split(', '))}
            />}>
              <Route path="/team-member-home" element={<TeamMemberHome />} />
              <Route path="/task-details/:id" element={<TaskDetails />} />
              <Route path="/project-details-tm/:id" element={<ProjectDetailsMember />} />
              <Route path="/request-resource" element={<RequestResource />} />
            </Route>
    
            {/* RUTAS PROTEGIDAS DEL ADMIN */}
            <Route element={<ProtectedRoute
              isAllowed={hasPermissions(user, rolesPermissions[0].nombre, rolesPermissions[0].permisos.split(', ')) ||
              hasPermissions(user, rolesPermissions[1].nombre, rolesPermissions[1].permisos.split(', '))}
            />}>
              <Route path='/projects' element={<CrudProjects />} />
              <Route path='/teams' element={<CrudTeams />} />
              <Route path='/users' element={<CrudUsers />} />
              <Route path='/members' element={<CrudMembers />} />
              <Route path='/resource' element={<CrudResource />} />
              <Route path='/tasks' element={<CrudTasks />} />
            </Route>
            
            {/* RUTA NO ENCONTRADA */}
            <Route path='/*' element={<NotFound />} />
          </Routes>
        </>
        :
        null
      );
    }

    export default AppRouter;