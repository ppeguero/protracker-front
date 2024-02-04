import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  const token_jwt = localStorage.getItem('sesion_token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRoles = decodedToken ? decodedToken.rol : null; // Esto contendrá el rol o los permisos del usuario
    
  return (
    <div className='flex justify-center bg-[#8DA9C4] h-screen'>
      <div className='flex items-center justify-center w-full flex-col'>
        <FaExclamationCircle className='text-red-500 text-6xl mb-4' />
        <h1 className='text-5xl mb-3'>404 - Página no encontrada</h1>
        <p className='text-xl mb-4'>Lo sentimos, la página que buscas no existe.</p>
        <Link to={'/'} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
