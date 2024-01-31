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

function ChangePassword() {
    
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
                            <h1 className='text-[#13315C] text-2xl font-bold'>Restablecer Contraseña</h1>
                            
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
                                            className='bg-transparent text-black p-2 focus:outline-none'
                                        />
                                        <button onClick={seePassword} className='mr-2'>
                                            {showPassword ? <ImEye /> : <ImEyeBlocked />}
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col mb-4 mt-2'>
                                    <label className='mb-1 font-bold'>
                                        Confirmar contraseña
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
                                <div className='text-center mt-8'>
                                    <button className='text-center bg-[#8DA9C4] py-2 px-10 font-bold rounded-md align-center text-white'>Cambiar Contraseña</button>
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