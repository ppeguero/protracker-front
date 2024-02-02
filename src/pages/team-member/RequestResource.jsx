import React, { useState } from 'react'
import Header from '../../components/Header.jsx'
import ReturnButton from '../../components/ReturnButton.jsx'
import { useParams } from 'react-router-dom';


function RequestResource({id_usuario, id_proyecto_id}) {

  const { id_recurso } = useParams(); 
  console.log(id_recurso)

  const [userData, setUserData] = useState({
    userName: "Pipa",
    email: "pipa@utcancun.edu.mx",
    project: "Proyecto SGE",
    id_proyecto_id: 4,
 // cambiar esto para cuando esten los modulos de proyecto para seleccionar el proyecto en el cual se esta solicitando los recursos
  }) // hacer un fetch ? para traer la informacion del usuario

  const [resourceName, setResourceName] = useState('');
  const [type, setType] = useState('')
  const [quantity, setQuantity] = useState(0)
  // const [date, setDate] = useState('')
  const [limitDate, setLimitDate] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmitRequest = async (e) => {
    e.preventDefault()

    if (!resourceName.trim() || !type.trim() || !limitDate.trim() || !reason.trim()){
      console.error("Los campos no pueden estar vacios!")
      return;
    }

    if (quantity === 0){
      console.error("La cantidad no puede ser cero!")
      return;
    }

    const requestBody = {
      "cantidad": quantity,
      "razon_de_solicitud": reason,
      "fecha_retorno": limitDate,
      "id_recurso_id": id_recurso, // cambiar al id_del recurso
      "id_proyecto_id": 4,
      "id_miembro_id": 3,
    }

    try {
      const response = await fetch('http://localhost:8080/protracker/resource/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Error al crear la solicitud');
    }
    console.log("Solicitud creada exitosamente")
  }
  catch (error) {
    console.log("Error al crear la solicitud", error)
  }
}

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
              <form onSubmit={handleSubmitRequest} className="flex flex-col md:gap-10 md:grid md:grid-cols-3 my-5">
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                    Información del solicitante 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Nombre del solicitante</label>
                  <input type="text" value={userData.userName} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, userName: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
                  <input type="text" value={userData.email} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, email: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Proyecto</label>
                  <input type="text" value={userData.project} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, project: e.target.value })}/>

                  <button type='submit' className='hidden md:block bg-[#8DA8C5] p-2 px-3 md:my-16'>Realizar solicitud</button>
                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center my-5 mt-4 md:m-0 md:text-left">
                    Información del recurso 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre del recurso</label>
                  <input type="text" value={resourceName} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setResourceName(e.target.value )}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Tipo</label>
                  <select value={type} onChange={(e) => setType(e.target.value)} className='p-2 w-30'>
                    <option value="">Seleccionar</option>
                    <option value="Humano">Humano</option>
                    <option value="Material">Material</option>
                    <option value="Otro">Otro</option>
                </select>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Cantidad</label>
                  <input min={1} type="number" value={quantity} className='bg-[#fff] p-2 px-3 text-[#13315C] md:my-2' onChange={(e) => setQuantity(parseInt(e.target.value))}/>

                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  ‎ 
                  </h3>
                  {/* <label htmlFor="" className='text-[#134175] text-xl font-light '>Fecha de disponibilidad del recurso</label>
                  <input type="date" value={date} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setData({ ...data, date: e.target.value })}/> */}

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Fecha limite, si aplica</label>
                  <input type="date" value={limitDate} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setLimitDate(e.target.value)}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Razón detrás de la solicitud</label>
                  <textarea type="text" value={reason} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setReason(e.target.value)}/>

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