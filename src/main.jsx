import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MemberInformation from './pages/proyect-manager/MemberInformation.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {path: "/", element: <App/>},
  {path: "/member-information", element: <MemberInformation/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
