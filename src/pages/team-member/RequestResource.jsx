import React, { useState, useEffect } from 'react';
import Header from '../../components/Header.jsx';
import ReturnButton from '../../components/ReturnButton.jsx';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

function RequestResource({ id_usuario }) {
  const { id_recurso } = useParams();
  console.log(id_recurso);

  const token_jwt = localStorage.getItem('token');
  const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const userRole = decodedToken ? decodedToken.rol_name : null;
  const user_email = decodedToken ? decodedToken.user_email : null;
  const user_name = decodedToken ? decodedToken.user_name : null;
  const [user, setUser] = useState({
    token: token_jwt || null,
    permissions: decodedToken ? decodedToken.rol_permissions.split(', ') : [],
    id_user: decodedToken ? decodedToken.idUser : null
  });

  const initialRequestData = {
    userName: user_name,
    email: user_email,
    id_proyecto_id: "",
    name_resource: "",
    type_resource: "",
    quantity_resource: 1,
    date_resource: "",
    limit_date_resource: "",
    reason_resource: "",
    id_recurso_id: "",
    id_miembro_id: user.id_user,
  };

  const [requestData, setRequestData] = useState(initialRequestData);
  const [projects, setProjects] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/projects/');
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

    // return (console.log({
    //   cantidad: requestData.quantity_resource,
    //   razon_de_solicitud: requestData.reason_resource,
    //   fecha_de_inicio: requestData.date_resource,
    //   fecha_retorno: requestData.limit_date_resource,
    //   aprobado: false,
    //   id_proyecto_id: projectId,
    //   id_miembro_id: requestData.id_usuario
    // }))

    if (!validateForm()) {
      console.error('El formulario contiene errores');
      return;
    }

    const selectedProject = projects.find(project => project.nombre === requestData.id_proyecto_id);
    const projectId = selectedProject ? selectedProject.id : null;
    
      const requestBody = {
        cantidad: requestData.quantity_resource,
        razon_de_solicitud: requestData.reason_resource,
        fecha_de_inicio: requestData.date_resource,
        fecha_retorno: requestData.limit_date_resource,
        aprobado: null,
        id_recurso_id: requestData.id_recurso_id,
        id_proyecto_id: requestData.id_proyecto_id,
        id_miembro_id: user.id_user
      };
  
      try {
        const response = await fetch('https://localhost:8080/api/resource/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(requestBody)
        });
  
        if (!response.ok) {
          throw new Error('Error al crear la solicitud');
        }
  
        Swal.fire({
          icon: 'success',
          title: '¡Solicitud enviada!',
          text: 'La solicitud de recurso ha sido enviada correctamente.',
        });
  
        // Restablecer los datos del formulario después del envío exitoso
        setRequestData(initialRequestData);
        setErrors({});
  
        console.log("Solicitud creada exitosamente");
      } catch (error) {
        console.error("Error al crear la solicitud:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar la solicitud',
          text: 'Hubo un error al enviar la solicitud de recurso. Por favor, inténtalo de nuevo.',
        });
      }
    
  };



  const [resources, setResources] = useState([]);

  useEffect(()=>{
  fetch("https://localhost:8080/api/resource")
    .then(response => response.json())
    .then(data => {
      setResources(data);
      console.log(data);
    })
  }, [])





  // const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);
  const [uniqueTeams, setUniqueTeams] = useState(new Set());
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDate, setCurrentDate] = useState('');

  // const token_jwt = localStorage.getItem('token');
  // const decodedToken = token_jwt ? jwt_decode(token_jwt) : null;
  const idUser = decodedToken ? decodedToken.idUser : null;
  const link = '/project-details-tm';
  const [idMiembro, setIdMiembro] = useState([]);

  useEffect(() => {
    fetch(`https://localhost:8080/api/teams-member/${idUser}`)
      .then(response => response.json())
      .then(data => {
        setTeams(data);
        setUniqueTeams(new Set(data.map(team => team.id_equipo)));
        // console.log(data);
      })
      .catch(error => console.error('Error al obtener equipos:', error));

      fetch(`https://localhost:8080/api/members/`)
      .then(response => response.json())
      .then(data => {
        const miembrosFiltrados = data.filter(miembro => miembro.id_usuario === idUser);
        setIdMiembro(miembrosFiltrados[0]?.id_miembro);
        // console.log(miembrosFiltrados[0]?.id_miembro);
      })
  }, [idUser]); 





  useEffect(() => {
    if (uniqueTeams.size > 0) {
      const teamPromises = Array.from(uniqueTeams).map(teamId => {
        return fetch(`https://localhost:8080/api/projects-team/${teamId}`)
          .then(response => response.json());
      });

      Promise.all(teamPromises)
        .then(data => {
          const flattenedProjects = data.flat();
          setProjects(flattenedProjects);
          // console.log(flattenedProjects);
        })
        .catch(error => console.error('Error al obtener proyectos de los equipos:', error));
    }
  }, [uniqueTeams]); 
























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

    if (!requestData.id_proyecto_id.trim()) {
      newErrors.id_proyecto_id = 'El proyecto es requerido';
      isValid = false;
    } else {
      newErrors.id_proyecto_id = '';
    }

    // if (!requestData.name_resource.trim()) {
    //   newErrors.name_resource = 'El nombre del recurso es requerido';
    //   isValid = false;
    // } else {
    //   newErrors.name_resource = '';
    // }

    if (!requestData.type_resource.trim()) {
      newErrors.type_resource = 'El tipo de recurso es requerido';
      isValid = false;
    } else {
      newErrors.type_resource = '';
    }

    if (requestData.quantity_resource <= 0 || isNaN(requestData.quantity_resource)) {
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
                required
                  type="text"
                  disabled
                  value={requestData.userName}
                  className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.userName ? 'border-red-500' : ''}`}
                  onChange={(e) => setRequestData({ ...requestData, userName: e.target.value })}
                />
                {errors.userName && <span className="text-red-500 text-sm">{errors.userName}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Correo electrónico</label>
                <input
                required

                  type="text"
                  value={requestData.email}
                  disabled
                  className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.email ? 'border-red-500' : ''}`}
                  onChange={(e) => setRequestData({ ...requestData, email: e.target.value })}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Proyecto</label>
                <select
                required
                  value={requestData.id_proyecto_id}
                  onChange={(e) => setRequestData({ ...requestData, id_proyecto_id: e.target.value })}
                  className={`p-2 w-30 ${errors.id_proyecto_id ? 'border-red-500' : ''}`}
                >
                  <option value="" disabled>Seleccionar</option>
                  {projects.map(project => {
                    console.log(project);
                    return(
                      <option key={project.id} value={project.id_proyecto}>{project.nombre}</option>
                    )
                  })}
                </select>

                {errors.id_proyecto_id && <span className="text-red-500 text-sm">{errors.id_proyecto_id}</span>}

                <button type='submit' className='hidden md:block bg-[#8DA8C5] p-2 px-3 md:my-16'>Realizar solicitud</button>
              </div>
              <div className='flex flex-col'>
                <h3 className="text-xl font-bold text-[#13315C] text-center my-5 mt-4 md:m-0 md:text-left">
                  Información del recurso
                </h3>
                <label htmlFor="" className='text-[#134175] text-xl font-light '>Nombre del recurso</label>
                
                <select
                required
                  value={requestData.id_recurso_id}
                  onChange={(e) => setRequestData({ ...requestData, id_recurso_id: e.target.value })}
                  className={`p-2 w-30 ${errors.id_proyecto_id ? 'border-red-500' : ''}`}
                >
                  <option value="" disabled>Seleccionar</option>
                  {resources.map(resource => {
                    console.log(resource);
                    return(
                      <option key={resource.id} value={resource.id_recurso}>{resource.nombre}</option>
                    )
                  })}
                </select>

                {/* {errors.name_resource && <span className="text-red-500 text-sm">{errors.name_resource}</span>} */}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Tipo</label>
                <select
                required
                  value={requestData.type_resource}
                  onChange={(e) => setRequestData({ ...requestData, type_resource: e.target.value })}
                  className={`p-2 w-30 ${errors.type_resource ? 'border-red-500' : ''}`}
                >
                  <option value="" disabled>Seleccionar</option>
                  {resources.map(resource => {
                    console.log(resource);
                    return(
                      <option key={resource.id} value={resource.id_recurso}>{resource.tipo}</option>
                    )
                  })}
                </select>

                {errors.type_resource && <span className="text-red-500 text-sm">{errors.type_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Cantidad</label>
                <input required min={1} type="number" value={requestData.quantity_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] md:my-2 ${errors.quantity_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, quantity_resource: e.target.value })} />
                {errors.quantity_resource && <span className="text-red-500 text-sm">{errors.quantity_resource}</span>}
              </div>
              <div className='flex flex-col'>
                <h3 className="text-xl font-bold text-[#13315C] text-center mt-4 md:m-0 md:text-left">
                  ‎
                </h3>
                <label htmlFor="" className='text-[#134175] text-xl font-light '>Fecha de disponibilidad del recurso</label>
                <input
                required
                  type="date"
                  value={requestData.date_resource}
                  className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.date_resource ? 'border-red-500' : ''}`}
                  onChange={(e) => setRequestData({ ...requestData, date_resource: e.target.value })}
                />
                {errors.date_resource && <span className="text-red-500 text-sm">{errors.date_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Fecha límite, si aplica</label>
                <input required type="date" value={requestData.limit_date_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.limit_date_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, limit_date_resource: e.target.value })} />
                {errors.limit_date_resource && <span className="text-red-500 text-sm">{errors.limit_date_resource}</span>}

                <label htmlFor="" className='text-[#134175] text-xl font-light'>Razón detrás de la solicitud</label>
                <textarea required type="text" value={requestData.reason_resource} className={`bg-[#fff] p-2 px-3 text-[#13315C] my-2 ${errors.reason_resource ? 'border-red-500' : ''}`} onChange={(e) => setRequestData({ ...requestData, reason_resource: e.target.value })} />
                {errors.reason_resource && <span className="text-red-500 text-sm">{errors.reason_resource}</span>}

                <button type='submit' className=' md:hidden bg-[#8DA8C5] p-2 px-3 my-5'>Realizar solicitud</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestResource;