import React, { useState } from 'react'
import Header from '../../components/Header.jsx'
import ReturnButton from '../../components/ReturnButton.jsx'

function RequestResource() {

  const [data, setData] = useState({
    userName: "Pipa",
    email: "pipa@utcancun.edu.mx",
    project: "SGE",
    resourceName: "integrante",
    type: "Humano",
    amount: 1,
    date: "25-01-2024",
    limit: "28-01-2024",
    reason: "Necesito un integrante para mi proyecto"
  })

  const sendForm = (e) => {
    e.preventDefault();
    alert("Solicitud enviada");
    
  }

  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
        <Header/>
        <div className= "flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
          <div className='flex flex-col user-info mx-10'>
            <ReturnButton link={"/"}/>
            <div className='md:mx-10'>
              <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Solicitar Recurso</h1>
              <form className="flex flex-col md:gap-10 md:grid md:grid-cols-3 my-5" onSubmit={sendForm}>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                    Información del solicitante 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Nombre del solicitante</label>
                  <input required type="text" value={data.userName} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, userName: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
                  <input required type="text" value={data.email} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, email: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Proyecto</label>
                  <input required type="text" value={data.project} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, project: e.target.value })}/>

                  <button type='submit' className='hidden md:block bg-[#8DA8C5] p-2 px-3 md:my-16'>Realizar solicitud</button>
                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center my-5 mt-4 md:m-0 md:text-left">
                    Información del recurso 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre del recurso</label>
                  <input required type="text" value={data.resourceName} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, resourceName: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Tipo</label>
                  <input required type="text" value={data.type} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, type: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Cantidad</label>
                  <input required min={1} type="number" value={data.amount} className='bg-[#fff] p-2 px-3 text-[#13315C] md:my-2' onChange={(e) => setData({ ...data, amount: e.target.value })}/>

                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  ‎ 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light '>Fecha de disponibilidad del recurso</label>
                  <input required type="date" value={data.date} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, date: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Fecha limite, si aplica</label>
                  <input required type="date" value={data.limit} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, limit: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Razón detrás de la solicitud</label>
                  <textarea required type="text" value={data.reason} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, reason: e.target.value })}/>

                  <button type='submit' className=' md:hidden bg-[#8DA8C5] p-2 px-3 my-5'>Realizar solicitud</button>

                </div>
              </form>
            </div>
          </div>
        </div>
    </div>
  )
}

export default RequestResource