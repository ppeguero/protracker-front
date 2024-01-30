import React, {useState} from 'react';

//* Images
import bgImage from '../assets/images/bgImage.png';
import girlImage from '../assets/images/girlImage.png';

//* Icons
import { TfiEmail } from "react-icons/tfi";

function RestorePassword() {
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
                                        />
                                    </div>
                                </div>
                                <div className='text-center mt-8'>
                                    <button className='text-center bg-[#8DA9C4] py-2 px-10 font-bold rounded-md align-center text-white'>Restablecer Contraseña</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestorePassword;