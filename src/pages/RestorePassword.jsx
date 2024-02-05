import React, { useState } from 'react';
import { TfiEmail } from "react-icons/tfi";
import axios from 'axios'; // Importa axios para realizar solicitudes HTTP

//* Images
import bgImage from '../assets/images/bgImage.png';
import girlImage from '../assets/images/girlImage.png';

function RestorePassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://localhost:8080/api/reset-password', { correo: email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
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
                        <form onSubmit={handleResetPassword}>
                            {/* Title Form */}
                            <h1 className='text-[#13315C] text-2xl font-bold'>Restablecer Contraseña</h1>
                            <p className='mt-2'>Por favor, introduce la dirección de correo </p>
                            <p>electrónico asociada a tu cuenta.</p>
                            
                            {/* Form */}
                            <div className='mt-10'>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Correo Electrónico
                                    </label>
                                    <div className='flex items-center bg-[#D9D9D9] rounded-sm'>
                                        <TfiEmail className='text-black ml-4 mr-1' />
                                        <input
                                            type='email'
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='text-center mt-8'>
                                    <button type='submit' className='text-center bg-[#8DA9C4] py-2 px-10 font-bold rounded-md align-center text-white'>Restablecer Contraseña</button>
                                </div>
                            </div>
                        </form>
                        {message && <p className='text-red-500 mt-4'>{message}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestorePassword;
