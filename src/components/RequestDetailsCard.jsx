import React, { useState } from 'react'
import accept from '../assets/icons/accept.png'
import deny from '../assets/icons/deny.png'

function RequestDetailsCard() {

    const [applicantData, setApplicantData] = useState({
        name: "Pipa",
        project: "Sistema de gestión de estadías",
        email: "pipa@utcancun.edu.mx",
        date: "25-01-2024",
        reason: "Solicito un nuevo integrante para el equipo debido a un aumento en la carga de trabajo."
    })

    const [resourceData, setResourceData] = useState({
        name: "Integrante",
        type: "Humano",
        quantity: 1,
        date: "28-01-2024"
    })

  return (
    <div className='bg-[#8DA8C5] mx-16 rounded-lg py-4 flex justify-around w-[1000px] h-full '>
        <div className='flex flex-col space-y-4 justify-center'>
            <h3 className='text-[#134175] text-3xl font-bold'>Información del solicitante</h3>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Nombre del solicitante</h4>
                <p className='text-[#134175] font-thin ml-4'>{applicantData.name}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Proyecto</h4>
                <p className='text-[#134175] font-thin ml-4'>{applicantData.project}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Correo</h4>
                <p className='text-[#134175] font-thin ml-4'>{applicantData.email}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Fecha de disponibilidad</h4>
                <p className='text-[#134175] font-thin ml-4'>{applicantData.date}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Razón detrás de la solicitud</h4>
                <p className='text-[#134175] font-thin ml-4 w-64'>{applicantData.reason}</p>
            </div>
        </div>
        <div className='flex flex-col space-y-4 justify-start mt-12'>
            <h3 className='text-[#134175] text-lg font-bold'>Información del recurso</h3>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Nombre del recurso</h4>
                <p className='text-[#134175] font-thin ml-4'>{resourceData.name}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Tipo</h4>
                <p className='text-[#134175] font-thin ml-4'>{resourceData.type}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Cantidad</h4>
                <p className='text-[#134175] font-thin ml-4'>{resourceData.quantity}</p>
            </div>
            <div className='space-y-2'>
                <h4 className='text-[#134175] font-semibold'>Fecha de límite, si aplica</h4>
                <p className='text-[#134175] font-thin ml-4'>{applicantData.date}</p>
            </div>
            <div className='flex space-x-4 justify-center items-center'>
                <button className='flex flex-col justify-center items-center hover:bg-green-600 rounded-sm p-2'>
                    <img src={accept} className='w-8 h-8'></img>
                    <p className='text-sm font-semibold text-white'>Aceptar</p>
                </button>
                <button className='flex flex-col justify-center items-center hover:bg-red-600 rounded-sm p-2'>
                    <img src={deny} className='w-10 h-10'></img>
                    <p className='text-sm font-semibold text-white'>Denegar</p>
                </button>
            </div>
        </div>
    </div>
  )
}

export default RequestDetailsCard