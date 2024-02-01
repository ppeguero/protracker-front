import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImEyeBlocked, ImEye } from "react-icons/im";
import registerImage from '../assets/images/registerImage.png';
import { IoMdArrowBack } from 'react-icons/io';
import ReturnButton from '../components/ReturnButton'

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: ''
    });
    const [errors, setErrors] = useState({
        nombre: '',
        correo: '',
        contraseña: '',
        confirmarContraseña: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setErrors({
            ...errors,
            [e.target.name]: '' // Limpiar el mensaje de error al cambiar el valor del campo
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.contraseña !== formData.confirmarContraseña) {
            setErrors({
                ...errors,
                confirmarContraseña: 'Las contraseñas no coinciden'
            });
            return;
        }
        try {
            const response = await fetch('https://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                // Usuario creado exitosamente
                console.log('Usuario creado exitosamente');
            } else {
                // Error al crear el usuario
                console.error('Error al crear el usuario');
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const seePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='bg-[#EEF4ED] h-screen flex'>
            <div className='flex items-center w-full justify-evenly'>
                <div className='w-1/3'>
                    <h1 className='text-[#13315C] font-bold text-3xl'>P R O T R A C K E R</h1>
                        <ReturnButton/>
                    <div className='bg-white p-8 items-center justify-center rounded-md my-12'>
                        <img className='' src={registerImage} alt="Register Image" />
                    </div>
                </div>
                <form className='w-1/4' onSubmit={handleSubmit}>
                    <h1 className='text-[#8DA8C5] font-bold text-3xl'>Crea una cuenta ahora,</h1>
                    <h1 className='text-[#134175] font-bold text-4xl mb-8'> totalmente gratis</h1>
                    <div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Nombre
                            </label>
                            <div className='flex items-center bg-white rounded-sm w-3/4'>
                                <input
                                    type='text'
                                    name='nombre'
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                            </div>
                            {errors.nombre && (
                                <div className='text-red-600'>{errors.nombre}</div>
                            )}
                        </div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Correo Electrónico
                            </label>
                            <div className='flex items-center bg-white rounded-sm w-3/4'>
                                <input
                                    type='email'
                                    name='correo'
                                    value={formData.correo}
                                    onChange={handleChange}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                            </div>
                            {errors.correo && (
                                <div className='text-red-600'>{errors.correo}</div>
                            )}
                        </div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Contraseña
                            </label>
                            <div className='flex items-center justify-between bg-white rounded-sm w-3/4'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='contraseña'
                                    value={formData.contraseña}
                                    onChange={handleChange}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                                <button onClick={seePassword} className='mx-4'>
                                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                </button>
                            </div>
                            {errors.contraseña && (
                                <div className='text-red-600'>{errors.contraseña}</div>
                            )}
                        </div>
                        <div className='flex flex-col mb-4 mt-2'>
                            <label className='mb-1 font-bold'>
                                Confirmar Contraseña
                            </label>
                            <div className='flex items-center justify-between bg-white rounded-sm w-3/4'>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name='confirmarContraseña'
                                    value={formData.confirmarContraseña}
                                    onChange={handleChange}
                                    className='bg-transparent text-black p-2 focus:outline-none'
                                />
                                <button onClick={seePassword} className='mx-4'>
                                    {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                </button>
                            </div>
                            {errors.confirmarContraseña && (
                                <div className='text-red-600'>{errors.confirmarContraseña}</div>
                            )}
                        </div>
                        <div className='text-center w-3/4 mt-4'>
                            <button type='submit' className='text-center bg-[#8DA8C5] py-2 px-10 font-bold rounded-md align-center text-white'>Registrarse</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
