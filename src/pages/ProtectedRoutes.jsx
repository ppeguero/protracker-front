import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children, isAllowed, redirectTo='/not-auth'}) => {
    if(!isAllowed){
        return <Navigate to={redirectTo}/>
    }

    return children ? children : <Outlet/>
}

export default ProtectedRoute