import React from 'react'
import ReturnButton from './ReturnButton.jsx'

function UserInfo({ name, email, specialty, profilePhoto}) {
  return (
    <div className="flex flex-col user-info mx-10">
        <ReturnButton link={"/"}/>
        <h1 className="text-[#13315C] text-3xl font-extrabold text-center">Información de Pipa</h1>
        <img src={profilePhoto} className='m-14'></img>
        <form className="flex flex-col ">
            <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre</label>
            <input type="text" value={name} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' disabled/>

            <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
            <input type="text" value={email} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' disabled/>

            <label htmlFor="" className='text-[#134175] text-xl font-light'>Especialidad</label>
            <input type="text" value={specialty} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' disabled/>
        </form>
    </div>
  )
}

export default UserInfo