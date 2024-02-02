import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReturnButton from '../components/ReturnButton';
import jwt_decode from 'jwt-decode';


function NotFound() {
  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRoles = decodedToken ? decodedToken.rol : null; // Esto contendrá el rol o los permisos del usuario
    
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <div className='w-full p-10 '>
        
      </div>
      <FaExclamationCircle className='text-red-500 text-6xl mb-4' />
      <h1 className='text-5xl mb-3'>No esta autorizado para acceder a esta página</h1>
      <p className='text-xl mb-4'></p>
      {token_jwt?
      <div>
        <p className='text-xl mb-4'>Por favor, regresa a la sesión anterior o accede a otra con los permisos necesarios</p>
        <div className='flex justify-around'>

        <button onClick={() => window.history.back()} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
        Regresar a la sesión
        </button>
        <button onClick={() => {
            localStorage.removeItem('token');
            location.href = '/'
        }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
        Cambiar de cuenta
        </button>
        </div>
      </div>
      :
      
      <Link to={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Inicia Sesión
      </Link>
      }
      
      
    </div>
  );
}

export default NotFound;
