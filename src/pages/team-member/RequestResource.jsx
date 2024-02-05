import React, { useState } from 'react'
import Header from '../../components/Header.jsx'
import ReturnButton from '../../components/ReturnButton.jsx'
import { useParams } from 'react-router-dom';


function RequestResource({id_usuario, id_proyecto_id}) {

  const { id_recurso } = useParams(); 
  console.log(id_recurso)

  const [requestData, setRequestData] = useState({
    userName: "",
    email: "",
    project: "",
    id_proyecto_id: 4,
    name_resource: "Recurso 1",
    type_resource: "Tipo 1",
    quantity_resource: 1,
    date_resource: "2023-04-01",
    limit_date_resource: "2023-04-10",
    reason_resource: "Razon 1"
 // cambiar esto para cuando esten los modulos de proyecto para seleccionar el proyecto en el cual se esta solicitando los recursos
  }) // hacer un fetch ? para traer la informacion del usuario

  const [resourceName, setResourceName] = useState('');
  const [type, setType] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [date, setDate] = useState('')
  const [limitDate, setLimitDate] = useState('')
  const [reason, setReason] = useState('')

  const handleSubmitRequest = async (e) => {
    e.preventDefault()

  //   if (!resourceName.trim() || !type.trim() || !limitDate.trim() || !reason.trim()){
  //     console.error("Los campos no pueden estar vacios!")
  //     return;
  //   }

  //   if (quantity === 0){
  //     console.error("La cantidad no puede ser cero!")
  //     return;
  //   }

  //     // Validación de campos vacíos
  //  if (!resourceName.nombre || !resourceName.descripcion || !resourceName.fecha_inicio || !resourceName.id_equipo_id || !resourceName.id_estado_id) {
  //   Swal.fire('Error', 'Todos los campos son obligatorios. Por favor, completa todos los campos.', 'error');
  //   return;
  //   }
  //   // Validación de campos vacíos
  //   if (!resourceName.nombre.trim() || !resourceName.descripcion.trim() || !resourceName.fecha_inicio.trim() || !resourceName.id_equipo_id.trim() || !resourceName.id_estado_id.trim()) {
  //     Swal.fire('Error', 'Los valores de los campos no pueden ser espacios. Por favor, completa todos los campos.', 'error');
  //     return;
  //   }

  //   const today = new Date().toISOString().split('T')[0];
  //   if (!resourceName.fecha_inicio || resourceName.fecha_inicio < today) {
  //       Swal.fire('Error', 'La fecha de inicio del proyecto no puede estar en el pasado.', 'error');
  //       return;
  //   }

  //   if (!resourceName.id_equipo_id) {
  //     Swal.fire('Error', 'Selecciona un equipo para el proyecto.', 'error');
  //     return;
  //   }

  //   if (!resourceName.id_estado_id) {
  //     Swal.fire('Error', 'Selecciona un estado para el proyecto.', 'error');
  //     return;
  //   }


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

  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
        <Header homeLink={'/team-member-home'}/>
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
                  <input type="text" value={requestData.userName} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, userName: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
                  <input type="text" value={requestData.email} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, email: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Proyecto</label>
                  <select value={requestData.id_proyecto_id} onChange={(e) => setRequestData({ ...data, id_proyecto_id: e.target.value })} className='p-2 w-30'>
                    <option value="">Seleccionar</option>
                    <option value="Humano">Proyecto 1</option>
                    <option value="Material">Proyecto 2</option>
                    <option value="Otro">Proyecto 3</option>
                  </select>

                  <button type='submit' className='hidden md:block bg-[#8DA8C5] p-2 px-3 md:my-16'>Realizar solicitud</button>
                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center my-5 mt-4 md:m-0 md:text-left">
                    Información del recurso 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre del recurso</label>
                  <input type="text" value={requestData.name_resource} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, name_resource: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Tipo</label>
                  <select value={requestData.type_resource} onChange={(e) => setRequestData({ ...data, type_resource: e.target.value })} className='p-2 w-30'>
                    <option value="">Seleccionar</option>
                    <option value="Humano">Humano</option>
                    <option value="Material">Material</option>
                    <option value="Otro">Otro</option>
                </select>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Cantidad</label>
                  <input min={1} type="number" value={requestData.quantity_resource} className='bg-[#fff] p-2 px-3 text-[#13315C] md:my-2' onChange={(e) => setRequestData({ ...data, quantity_resource: e.target.value })}/>

                </div>
                <div className='flex flex-col'>
                  <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  ‎ 
                  </h3>
                  <label htmlFor="" className='text-[#134175] text-xl font-light '>Fecha de disponibilidad del recurso</label>
                  <input type="date" value={requestData.date_resource} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, date_resource: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Fecha limite, si aplica</label>
                  <input type="date" value={requestData.limit_date_resource} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, limit_date_resource: e.target.value })}/>

                  <label htmlFor="" className='text-[#134175] text-xl font-light'>Razón detrás de la solicitud</label>
                  <textarea type="text" value={requestData.reason_resource} className='bg-[#fff] p-2 px-3 text-[#13315C] my-2' onChange={(e) => setRequestData({ ...data, reason_resource: e.target.value })}/>

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