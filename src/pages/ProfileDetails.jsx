import React from 'react';
import Header from '../components/Header';
import Pipa from '../assets/images/pipa-img.png'
import ShowPassword from '../assets/icons/ShowPassword.png'

function ProfileDetails() {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para guardar los cambios
    };

    return (
        <div className="h-screen container bg-[#EEF4ED] w-full">
            <Header />
            <div className="flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
                <div className='flex flex-col user-info mx-5 md:mx-10'>
                    <div className='md:mx-10'>
                        <p className='text-black -mt-2 -ml-3'><strong>{"<"}</strong> REGRESAR</p>
                    </div>
                    <div className='flex flex-col md:flex-row justify-between items-center md:mx-14'>
                        <div>
                            <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">
                                Perfil</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row justify-center items-center md:mx-14">
                <div className='flex bg-[#EEF4ED] rounded-md my-4'>
                    <form className="flex flex-col md:ml-10" onSubmit={handleSubmit}>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Nombre:</span>
                            <input className='py-2 px-2 w-72' type="text" name="name" />
                        </label>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Correo Electrónico:</span>
                            <input className='py-2 px-2 w-72' type="email" name="email" />
                        </label>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Contraseña:</span>
                            <div className="relative"> {/* Contenedor relativo para el texto y el input */}
                                <input className='py-2 px-2 w-72' type="password" name="password" />
                                <img src={ShowPassword} alt="Mostrar Contraseña" className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 w-5 h-auto" />
                            </div>
                        </label>
                        <button className="mt-6 bg-[#8DA8C5] hover:bg-[#7a91ab] text-white font-semibold py-2 px-4 rounded">
                            Guardar Cambios
                        </button>
                    </form>



                </div>
                <div className="flex flex-col items-center md:ml-auto">
                    <img
                        className="mt-5 md:mt-0 w-42 h-42 rounded-full mx-96"
                        src={Pipa}
                        alt="Avatar de Pipa"
                    />

                    <button className="mt-3 bg-[#8DA8C5] hover:bg-[#7a91ab] w-80 text-white font-semibold py-2 px-4 rounded">
                        Cambiar Foto de Perfil
                    </button>
                </div>
            </div>


        </div>
    );
}

export default ProfileDetails;
