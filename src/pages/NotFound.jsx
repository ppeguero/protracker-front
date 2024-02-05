import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import notFound from '../assets/images/search_notfound.png'

function NotFound() {
  const token_jwt = localStorage.getItem('sesion_token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRoles = decodedToken ? decodedToken.rol : null; // Esto contendrá el rol o los permisos del usuario
    
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

        <button className='bg-sky-400 p-2 rounded-md w-36 text-white font-thin mt-3 hover:bg-sky-300'>
          <Link to="/">Ir al inicio</Link>
        </button>
      </div>
      <div className='flex flex-col justify-center '>
        <img src={notFound}></img>
      </div>
    </div>
  );
}

export default NotFound;
