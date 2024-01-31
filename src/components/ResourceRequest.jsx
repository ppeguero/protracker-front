import React, { useState } from 'react'
import Rafa from '../assets/images/Rafa.png'

function ResourceRequest() {

  const [data, setData] = useState({
    name: "Sistema de gestión de estadías",
    resourceType: "Humano",
    profilePic: "../assets/images/Rafa.png"
  })

  return (
    <div className='bg-[#8DA8C5] px-6 py-4 w-fit rounded-md flex justify-around items-center'>
        <div className='flex flex-col'>
            <p className='text-sm text-white'>{data.name}</p>
            <p className='text-sm text-gray-300 font-thin'>Tipo de recurso: {data.resourceType}</p>
        </div>
        <div>
            <img src={Rafa} className='w-8 h-8'></img>
        </div>
    </div>
  )
}

export default ResourceRequest