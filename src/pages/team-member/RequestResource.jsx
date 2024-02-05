import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import ReturnButton from '../../components/ReturnButton.jsx';
import { useParams } from 'react-router-dom';

function RequestResource({ id_usuario, id_proyecto_id }) {
  const { id_recurso } = useParams();
  console.log(id_recurso)

  const [requestData, setRequestData] = useState({
    userName: "",
    email: "",
    project: "",
    id_proyecto_id: 4,
    name_resource: "Recurso 1",
    type_resource: "Tipo 1",
    quantity_resource: 1,
    date_resource: "2023-04-01",
    limit_date_resource: "2023-04-10",
    reason_resource: "Razon 1"
  });

  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://localhost:8080/api/projects/');
        if (!response.ok) {
          throw new Error('Error al obtener los proyectos');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/${id_usuario}`);
        if (!response.ok) {
          throw new Error('Error al obtener la información del usuario');
        }
        const data = await response.json();
        setRequestData((prevData) => ({
          ...prevData,
          userName: data.nombre,
          email: data.correo,
        }));
      } catch (error) {
        console.error('Error al obtener la información del usuario:', error);
      }
    };

    fetchUserInfo();
  }, [id_usuario]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.error('El formulario contiene errores');
      return;
    }

    const requestBody = {
      cantidad: requestData.quantity_resource,
      razon_de_solicitud: requestData.reason_resource,
      fecha_retorno: requestData.limit_date_resource,
      id_recurso_id: id_recurso,
      id_proyecto_id: 4,
      id_miembro_id: 3,
    };

    try {
      const response = await fetch('http://localhost:8080/api/resource/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Error al crear la solicitud');
      }
      console.log("Solicitud creada exitosamente")
    }
    catch (error) {
      console.log("Error al crear la solicitud", error)
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!requestData.userName.trim()) {
      newErrors.userName = 'El nombre del solicitante es requerido';
      isValid = false;
    } else {
      newErrors.userName = '';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!requestData.email.trim() || !emailRegex.test(requestData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!requestData.name_resource.trim()) {
      newErrors.name_resource = 'El nombre del recurso es requerido';
      isValid = false;
    } else {
      newErrors.name_resource = '';
    }

    if (!requestData.type_resource.trim()) {
      newErrors.type_resource = 'El tipo de recurso es requerido';
      isValid = false;
    } else {
      newErrors.type_resource = '';
    }

    if (requestData.quantity_resource === 0 || isNaN(requestData.quantity_resource)) {
      newErrors.quantity_resource = 'La cantidad debe ser un número mayor que cero';
      isValid = false;
    } else {
      newErrors.quantity_resource = '';
    }

    if (!requestData.date_resource.trim()) {
      newErrors.date_resource = 'La fecha de disponibilidad del recurso es requerida';
      isValid = false;
    } else {
      newErrors.date_resource = '';
    }

    if (!requestData.limit_date_resource.trim()) {
      newErrors.limit_date_resource = 'La fecha límite es requerida';
      isValid = false;
    } else {
      newErrors.limit_date_resource = '';
    }

    if (!requestData.reason_resource.trim()) {
      newErrors.reason_resource = 'La razón detrás de la solicitud es requerida';
      isValid = false;
    } else {
      newErrors.reason_resource = '';
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
      <Header homeLink={'/team-member-home'} />
      <div className="flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
        <div className='flex flex-col user-info mx-10'>
          <ReturnButton link={"/"} />
          <div className='md:mx-10'>
            <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Solicitar Recurso</h1>
            <form onSubmit={handleSubmitRequest} className="flex flex-col md:gap-10 md:grid md:grid-cols-3 my-5">
              <div className='flex flex-col'>
                <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  Información del solicitante
                </h3>
                <label htmlFor="" className='text-[#134175] text-xl font-light'>Nombre del solicitante</label>
                <input
                  type="text"
                  value={requestData.userName}
                  className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.userName ? 'border-red-500' : ''}`}
                  onChange={(e) => setRequestData({ ...requestData, userName: e.target.value })}
                />
                {errors.userName && <span className="text-red-500 text-sm">{errors.userName}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
                <input
                  type="text"
                  value={requestData.email}
                  className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.email ? 'border-red-500' : ''}`}
                  onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Proyecto</label>
                <select value={requestData.id_proyecto_id} onChange={(e) => setRequestData({ ...requestData, id_proyecto_id: e.target.value })} className={`p-2 w-30 ${errors.project ? 'border-red-500' : ''}`}>
                  <option value="">Seleccionar</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.nombre}>{project.nombre}</option>
                  ))}
                </select>
                {errors.project && <span className="text-red-500 text-sm">{errors.project}</span>}

                <button type='submit' className='hidden md:block bg-[#8DA8C5] p-2 px-3 md:my-16'>Realizar solicitud</button>
              </div>
              <div className='flex flex-col'>
                <h3 className="text-xl font-bold text-[#13315C] text-center my-5 mt-4 md:m-0 md:text-left">
                  Información del recurso
                </h3>
                <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre del recurso</label>
                <input type="text" value={requestData.name_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.name_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, name_resource: e.target.value })} />
                {errors.name_resource && <span className="text-red-500 text-sm">{errors.name_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Tipo</label>
                <select value={requestData.type_resource} onChange={(e) => setRequestData({ ...requestData, type_resource: e.target.value })} className={`p-2 w-30 ${errors.type_resource ? 'border-red-500' : ''}`}>
                  <option value="">Seleccionar</option>
                  <option value="Humano">Humano</option>
                  <option value="Material">Material</option>
                  <option value="Otro">Otro</option>
                </select>
                {errors.type_resource && <span className="text-red-500 text-sm">{errors.type_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Cantidad</label>
                <input min={1} type="number" value={requestData.quantity_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] md:my-2 ${errors.quantity_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, quantity_resource: e.target.value })} />
                {errors.quantity_resource && <span className="text-red-500 text-sm">{errors.quantity_resource}</span>}
              </div>
              <div className='flex flex-col'>
                <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  ‎
                </h3>
                <label htmlFor="" className='text-[#134175] text-xl font-light '>Fecha de disponibilidad del recurso</label>
                <input type="date" value={requestData.date_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.date_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, date_resource: e.target.value })} />
                {errors.date_resource && <span className="text-red-500 text-sm">{errors.date_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Fecha límite, si aplica</label>
                <input type="date" value={requestData.limit_date_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.limit_date_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, limit_date_resource: e.target.value })} />
                {errors.limit_date_resource && <span className="text-red-500 text-sm">{errors.limit_date_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Razón detrás de la solicitud</label>
                <textarea type="text" value={requestData.reason_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.reason_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, reason_resource: e.target.value })} />
                {errors.reason_resource && <span className="text-red-500 text-sm">{errors.reason_resource}</span>}

                <button type='submit' className=' md:hidden bg-[#8DA8C5] p-2 px-3 my-5'>Realizar solicitud</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequestResource;
