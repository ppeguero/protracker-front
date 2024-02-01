import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ShowPassword from '../assets/icons/ShowPassword.png';
import Pipa from '../assets/images/pipa-img.png'; // Importa la imagen Pipa
import axios from 'axios';
import ReturnButton from '../components/ReturnButton';

function ProfileDetails() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        profileImage: null
    });
    const [previewImage, setPreviewImage] = useState(Pipa); // Establece la imagen Pipa por defecto

    useEffect(() => {
        axios.get('/api/user/profile')
            .then(response => {
                const user = response.data; 
                setUserData({
                    name: user.name,
                    email: user.email,
                    password: '',
                    profileImage: user.profileImage
                });
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }, []); 

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name);
        formData.append('email', userData.email);
        formData.append('password', userData.password);
        formData.append('profileImage', userData.profileImage);

        axios.put('/api/user/profile', formData)
            .then(response => {
                console.log('Cambios guardados exitosamente:', response.data);
                setPreviewImage(userData.profileImage); // Actualizar la imagen de vista previa después de guardar
            })
            .catch(error => {
                console.error('Error al guardar los cambios:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'profileImage') {
            setUserData(prevData => ({
                ...prevData,
                [name]: files[0]
            }));
            setPreviewImage(URL.createObjectURL(files[0])); // Crear una URL de objeto para la vista previa
        } else {
            setUserData(prevData => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    return (
        <div className="h-screen container bg-[#EEF4ED] w-full">
            <Header />
            <div className="flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
                <div className='flex flex-col user-info mx-5 md:mx-10'>
                    <ReturnButton/>
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
                            <input className='py-2 px-2 w-72' type="text" name="name" value={userData.name} onChange={handleChange} />
                        </label>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Correo Electrónico:</span>
                            <input className='py-2 px-2 w-72' type="email" name="email" value={userData.email} onChange={handleChange} />
                        </label>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Contraseña:</span>
                            <div className="relative">
                                <input className='py-2 px-2 w-72' type="password" name="password" value={userData.password} onChange={handleChange} />
                                <img src={ShowPassword} alt="Mostrar Contraseña" className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2 w-5 h-auto" />
                            </div>
                        </label>
                        <label className="mt-4 flex flex-col">
                            <span className='text-[#134175] text-lg'>Foto de Perfil:</span>
                            <input
                                className='py-2 px-2 w-72'
                                type="file"
                                name="profileImage"
                                onChange={handleChange}
                                accept="image/*"
                            />
                        </label>
                        <button className="mt-6 bg-[#8DA8C5] hover:bg-[#7a91ab] text-white font-semibold py-2 px-4 rounded">
                            Guardar Cambios
                        </button>
                    </form>
                </div>
                <div className="flex flex-col items-center md:ml-auto">
                    <img
                        className="mt-5 md:mt-0 w-42 h-42 rounded-full mx-96"
                        src={previewImage}
                        alt="Foto de perfil"
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
