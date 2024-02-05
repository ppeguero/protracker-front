import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/search_notfound.png'
import jwt_decode from 'jwt-decode';

function NotFound() {
  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const nombre_rol = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  
  console.log(nombre_rol);

  return (
    <div className='w-full container h-screen bg-white flex p-8 justify-around items-center '>
      <div className='flex flex-col p-4 space-y-2'>
        <h1 className='text-5xl font-bold text-blue-500 uppercase w-96'>Parece que te has perdido...</h1>
          <p className='text-lg w-96'>No hemos podido encontrar la página que buscabas. <span className='text-blue-800 font-semibold'>Esto puede deberse a varios motivos:</span> </p>
        <div>
          <ul className=' list-disc ml-12'>
            <li>La página que buscabas fue eliminada</li>
            <li>Nuestro servidor puede estar sufriendo dificultades</li>
            <li>Has ingresado una dirección incorrecta en el navegador</li>
          </ul>
        </div>
        <p className='text-3xl w-96 text-blue-500 font-bold mt-2'>¡No te preocupes, siempre puedes regresar!</p>

        {
          nombre_rol === "Miembro"?
          
            <button onClick={() => location.href="/team-member-home"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 mt-4'>
            Regresar a la sesión
            </button>
          :
          nombre_rol === "Administrador" ?
          <button onClick={() => location.href="/users"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
            Regresar a la sesión
            </button>
          :
          nombre_rol === "Project Manager" ?
          <button onClick={() => location.href="/project-manager-home"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
            Regresar a la sesión
            </button>
          :
          <button onClick={() => location.href="/login"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
          Iniciar sesión
        </button>

        }
      </div>
      <div className='flex flex-col justify-center '>
        <img src={notFound}></img>
      </div>
    </div>
  );
}

export default NotFound;
