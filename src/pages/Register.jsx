import React,{useState} from 'react';
import {Link} from 'react-router-dom';

//* Images
import registerImage from '../assets/images/registerImage.png'

//* Icons
import { IoMdArrowBack } from "react-icons/io";
import { ImEyeBlocked } from "react-icons/im";
import { ImEye } from "react-icons/im";

function Register(){

    //* Show password
    const [showPassword, setShowPassword] = useState(false);

    const seePassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    return(
        <div className='bg-[#EEF4ED] h-screen flex'>
            <div className='flex items-center w-full justify-evenly'>
                <div className='w-1/3'>
                    <h1 className='text-[#13315C] font-bold text-3xl'>P R O T R A C K E R</h1>
                    <Link className='flex flex-row items-center'>
                        <IoMdArrowBack/>
                        <p className='mx-2 my-8'>Regresar</p>
                    </Link>
                    <div className='bg-white p-8 items-center justify-center rounded-md my-12'>
                        <img className='' src={registerImage} alt="Register Image" />
                    </div>
                </div>
                <form className='w-1/4'>
                    {/* Title form */}
                    <h1 className='text-[#8DA8C5] font-bold text-3xl'>Crea una cuenta ahora,</h1>
                    <h1 className='text-[#134175] font-bold text-4xl mb-8'> totalmente gratis</h1>
                    {/* Form */}
                    <div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Nombre
                            </label>
                            <div className='flex items-center bg-white rounded-sm w-3/4'>
                                <input
                                    type='text'
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                            </div>
                        </div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Correo Electrónico
                            </label>
                            <div className='flex items-center bg-white rounded-sm w-3/4'>
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
                            <div className='flex items-center justify-between bg-white rounded-sm w-3/4'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                                <button onClick={seePassword} className='mx-4'>
                                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                </button>
                            </div>
                        </div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Confirmar contraseña
                            </label>
                            <div className='flex items-center justify-between bg-white rounded-sm w-3/4'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                                <button onClick={seePassword} className='mx-4'>
                                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                </button>
                            </div>
                            <div className='text-center w-3/4 mt-4'>
                                <button className='text-center bg-[#8DA8C5] py-2 px-10 font-bold rounded-md align-center text-white'>Registrarse</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;