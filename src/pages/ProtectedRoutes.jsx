import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({children, isAllowed, redirectTo='/login'}) => {
    if(!isAllowed){
        return <Navigate to={redirectTo}/>
    }

    return children ? children : <Outlet/>
}

export default ProtectedRoute