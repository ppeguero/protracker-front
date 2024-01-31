import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      <FaExclamationCircle className='text-red-500 text-6xl mb-4' />
      <h1 className='text-5xl mb-3'>404 - Página no encontrada</h1>
      <p className='text-xl mb-4'>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Volver al inicio
      </Link>
    </div>
  );
}

export default NotFound;