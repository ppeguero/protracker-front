import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


function Home() {

    return <Navigate to={'/login'}/>

  return (
    <div>Home</div>
  )
}

export default Home