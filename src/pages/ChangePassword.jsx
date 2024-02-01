import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//* Images
import bgImage from '../assets/images/bgImage.png';
import girlImage from '../assets/images/girlImage.png';

//* Icons
import { FaKey } from 'react-icons/fa';
import { ImEyeBlocked, ImEye } from 'react-icons/im';

function ChangePassword() {
    //* State for password visibility and form data
    const [showPassword, setShowPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        password: '',
        confirmPassword: ''
    });

    //* Function to toggle password visibility
    const seePassword = () => {
        setShowPassword(!showPassword);
    };

    //* Function to handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    //* Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Ensure passwords match
        if (passwordData.password !== passwordData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Send new password to server
        axios.post('/api/user/change-password', { newPassword: passwordData.password })
            .then(response => {
                console.log('Contraseña cambiada exitosamente:', response.data);
                // Aquí puedes agregar lógica adicional, como redirigir a otra página
            })
            .catch(error => {
                console.error('Error al cambiar la contraseña:', error);
                // Aquí puedes agregar lógica adicional, como mostrar un mensaje de error
            });
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
                            {/* Title Form */}
                            <h1 className='text-[#13315C] text-2xl font-bold'>Cambiar Contraseña</h1>
                            
                            {/* Form */}
                            <div className='mt-10'>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Contraseña
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <FaKey className='text-black ml-4 mr-1' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            value={passwordData.password}
                                            onChange={handleChange}
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                        <button type='button' onClick={seePassword} className='mr-2'>
                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Confirmar Contraseña
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <FaKey className='text-black ml-4 mr-1' />
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            name='confirmPassword'
                                            value={passwordData.confirmPassword}
                                            onChange={handleChange}
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                        <button type='button' onClick={seePassword} className='mr-2'>
                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                        </button>
                                    </div>
                                </div>
                                <div className='text-center mt-8'>
                                    <button type='submit' className='text-center bg-[#8DA9C4] py-2 px-10 font-bold rounded-md align-center text-white'>Cambiar Contraseña</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;
