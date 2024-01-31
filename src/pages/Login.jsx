import React, {useState} from 'react';
import {Link} from 'react-router-dom';

//* Images
import bgImage from '../assets/images/bgImage.png';
import girlImage from '../assets/images/girlImage.png';

//* Icons
import { TfiEmail } from "react-icons/tfi";
import { FaKey } from "react-icons/fa";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

function Login() {
    
    //* Show password
    const [showPassword, setShowPassword] = useState(false);

    const seePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return (
        <div className='bg-[#8DA9C4] h-screen flex'>
            <div className='flex items-center justify-center w-full'>
                <div className='bg-[#EEF4ED] flex items-center justify-center h-[90vh] w-[140vh] rounded-xl'>
                    <div className='relative'>
                        <img src={bgImage} alt='Background image' />
                        <img className='absolute inset-20 h-4/5' src={girlImage} alt='Girl image' />
                    </div>
                    <div className='bg-white rounded-xl px-20 py-8'>
                        <form>
                            {/* Title Form */}
                            <h1 className='text-[#13315C] text-2xl font-bold'>¡Bienvenido a </h1>
                            <h1 className='text-[#13315C] text-3xl font-bold'>PROTRACKER!</h1>
                            <p className='mt-2'>Ingresa con tus credenciales y</p>
                            <p>empieza a trabajar.</p>
                            
                            {/* Form */}
                            <div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Correo Electrónico
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <TfiEmail className='text-black ml-4 mr-1' />
                                        <input
                                            type='email'
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Contraseña
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <FaKey className='text-black ml-4 mr-1' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                        <button onClick={seePassword} className='mr-2'>
                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                        </button>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <button className='text-center bg-[#8DA9C4] py-2 px-10 font-bold rounded-md align-center text-white'>Iniciar Sesión</button>
                                </div>
                            </div>

                            {/* Additional links section */}
                            <div className='flex flex-row mt-4'>
                                <Link to='/register' className='text-xs'>¿No tienes una cuenta?</Link>
                                <Link to='/register' className='text-xs text-[#13315C]'>Regístrate ahora</Link>
                            </div>
                            <div className='flex flex-row mt-1'>
                                <Link to='/restore-password' className='text-xs'>¿Olvidaste tu contraseña?</Link>
                                <Link to='/restore-password' className='text-xs text-[#13315C]'>Restablece tu contraseña</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;