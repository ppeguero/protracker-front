import React, {useState} from 'react';
import {Link } from 'react-router-dom';

//* Images
import bgImage from '../assets/images/bgImage.png';
import girlImage from '../assets/images/girlImage.png';
import { TfiEmail } from 'react-icons/tfi';
import { FaKey } from 'react-icons/fa';
import { ImEyeBlocked, ImEye } from 'react-icons/im';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [loginError, setLoginError] = useState('');

    const seePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value.trim(); // Eliminar espacios vacíos al principio y al final
        setEmail(value);
        setEmailErrorMessage('');
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        setPasswordErrorMessage('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Correo: ' + email);
        console.log('Contraseña: ' + password);
    
        if (!email || !password) {
            setEmailErrorMessage('Por favor, ingresa tu correo electrónico');
            setPasswordErrorMessage('Por favor, ingresa tu contraseña');
            return;
        }
    
        try {
            const response = await fetch('https://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
    
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
    
            const data = await response.json();
    
            console.log('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token);
            // console.log(data.token);
            // console.log(data.usuario.nombre_rol );
    
            if (data.usuario.nombre_rol === 'Miembro') {
                // navigate('/team-member-home');
                location.href = '/team-member-home';
            } else if (data.usuario.nombre_rol === 'Project Manager') {
                // navigate('/project-manager-home');
                location.href = '/project-manager-home';
            } else if (data.usuario.nombre_rol === 'Administrador') {
                location.href = '/projects';
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            setLoginError(
                'Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo más tarde'
            );
        }
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
                        <form onSubmit={handleSubmit}>
                            <h1 className='text-[#13315C] text-2xl font-bold'>¡Bienvenido a </h1>
                            <h1 className='text-[#13315C] text-3xl font-bold'>PROTRACKER!</h1>
                            <p className='mt-2'>Ingresa con tus credenciales y</p>
                            <p>empieza a trabajar.</p>

                            <div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Correo Electrónico
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <TfiEmail className='text-black ml-4 mr-1' />
                                        <input
                                            type='email'
                                            value={email}
                                            onChange={handleEmailChange}
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                    </div>
                                    {emailErrorMessage && (
                                        <div className='text-red-600'>{emailErrorMessage}</div>
                                    )}
                                </div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Contraseña
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <FaKey className='text-black ml-4 mr-1' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={handlePasswordChange}
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                        <button type="button" onClick={seePassword} className='mr-2'>
                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                        </button>
                                    </div>
                                    {passwordErrorMessage && (
                                        <div className='text-red-600'>{passwordErrorMessage}</div>
                                    )}
                                </div>

                                <div className='text-center'>
                                    <button type="submit" className='text-center bg-[#8DA9C4] hover:bg-[#7da2c5] py-2 px-10 font-bold rounded-md align-center text-white'>Iniciar Sesión</button>
                                </div>
                                {loginError && (
                                    <div className='text-red-600 mt-2'>{loginError}</div>
                                )}
                            </div>
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
