import React from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReturnButton from '../components/ReturnButton';
import jwt_decode from 'jwt-decode';
import errorImage from '../assets/images/errorimage.png'


function NotFound() {
  const token_jwt = localStorage.getItem('token'); // Obtén el token del localStorage o del lugar donde lo estás almacenando
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const nombre_rol = decodedToken ? decodedToken.rol_name : null; // Esto contendrá el rol o los permisos del usuario
  return (
    <div className='flex flex-col items-start justify-center h-screen bg-gray-100 relative'>
      <div className='w-full p-10 '>
        <h1 className='text-6xl mb-3 font-bold text-[#13315C]'>¡Oops, algo ha salido mal!</h1>
        <p className='text-3xl mb-4'>No te preocupes, puedes hacer lo siguiente:</p>
      </div>
      <div className='absolute left-[43rem] bottom-[0rem]'>
        <img src={errorImage}></img>
      </div>
      {token_jwt?
      <div>
        {/* <p className='text-xl mb-4'>Por favor, regresa a la sesión anterior o accede a otra con los permisos necesarios</p> */}
        <div className='flex justify-around space-x-2 ml-[10rem]'>

        {
          nombre_rol === "Miembro"?
          
            <button onClick={() => location.href="/team-member-home"} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
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
          null

        }
        
        <button onClick={() => {
            localStorage.removeItem('token');
            location.href = '/'
        }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2'>
        Cambiar de cuenta
        </button>
        </div>
      </div>
      :
      <Link to={'/'} className='bg-[#13315C] hover:bg-blue-700 text-white text-2xl font-thin py-2 px-4 rounded-md ml-[15rem]'>
        Inicia Sesión
      </Link>
      }
      
      
    </div>
  );
}

export default NotFound;
