import React from 'react';
import Swal from 'sweetalert2';
import accept from '../assets/icons/accept.png';
import deny from '../assets/icons/deny.png';

function formatFecha(fecha) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const date = new Date(fecha);
  return date.toLocaleDateString('es-MX', options);
}

function RequestDetailsCard({ request }) {
  
  const aceptarSolicitud = () => {
    Swal.fire({
      title: '¿Estás seguro de aceptar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#4CAF50',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:8080/api/resource/accept-request/${request.id_solicitud_recurso}`,
          {
            method: 'POST',
            
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al obtener los datos');
            }
          })
          .then(data => {
            console.log('Solicitud aceptada:', data);
            Swal.fire({
                title: 'Aceptada con exito',
                icon: 'success',
                confirmButtonColor: '#4CAF50',
                confirmButtonText: 'Okay',
              }).then((result) => {
                location.href = '/project-manager-home';
              })
          })
          .catch(error => {
            console.error('Error al aceptar la solicitud:', error);
          });
      }
    });
  };

  const denegarSolicitud = () => {
    Swal.fire({
      title: '¿Estás seguro de denegar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#4CAF50',
      confirmButtonText: 'Denegar',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://localhost:8080/api/resource/decline-request/${request.id_solicitud_recurso}`,
        {
            method: 'POST',
            
          })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Error al obtener los datos');
            }
          })
          .then(data => {
            console.log('Solicitud denegada:', data);
            Swal.fire({
                title: 'Solicitud denegada con exito',
                icon: 'success',
                confirmButtonColor: '#4CAF50',
                confirmButtonText: 'Okay',
              }).then((result) => {
                location.href = '/project-manager-home';
              })
            
          })
          .catch(error => {
            console.error('Error al denegar la solicitud:', error);
          });
      }
    });
  };

  return (
    request ? 
    <div className='bg-[#8DA8C5] mx-16 rounded-lg py-4 flex justify-around w-[1000px] h-full '>
      <div className='flex items-start flex-col space-y-4 justify-center'>
        <div className='space-y-2'>
        <h3 className='text-[#134175] text-lg font-bold'>Información del recurso</h3>
        <div className='space-y-2'>
          <h4 className='text-[#134175] font-semibold'>Nombre del recurso</h4>
          <p className='text-[#134175] font-thin ml-4'>{request.nombre_recurso}</p>
        </div>
        <div className='space-y-2'>
          <h4 className='text-[#134175] font-semibold'>Cantidad</h4>
          <p className='text-[#134175] font-thin ml-4'>{request.cantidad}</p>
        </div>
        <div className='space-y-2'>
          <h4 className='text-[#134175] font-semibold'>Razón detrás de la solicitud</h4>
          <p className='text-[#134175] font-thin w-64'>{request.razon_de_solicitud}</p>
        </div>

          <h4 className='text-[#134175] font-semibold'>Fecha de disponibilidad</h4>
          <p className='text-[#134175] font-thin ml-4'>{formatFecha(request.fecha_de_inicio)}</p>
        </div>
       
        <div className='space-y-2'>
          <h4 className='text-[#134175] font-semibold'>Fecha de límite, si aplica</h4>
          <p className='text-[#134175] font-thin ml-4'>{formatFecha(request.fecha_retorno)}</p>
        </div>
        <div className='flex space-x-4 justify-center items-center pt-1'>
          <button onClick={aceptarSolicitud} className='flex flex-col justify-center items-center hover:bg-green-600 rounded-xl p-2 pt-3'>
            <img src={accept} className='w-[30px] h-[30px'></img>
            <p className='text-sm font-semibold text-white pt-[3px]'>Aceptar</p>
          </button>
          <button onClick={denegarSolicitud} className='flex flex-col justify-center items-center hover:bg-red-600 rounded-xl p-2'>
            <img src={deny} className='w-10 h-10'></img>
            <p className='text-sm font-semibold text-white'>Denegar</p>
          </button>
        </div>
      </div>
    </div>
    : null
  );
}

export default RequestDetailsCard;
