import React, { useState, useEffect } from 'react'
import Sidebar from '../../../components/Sidebar';
import Swal from 'sweetalert2';

//* Icons
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import AddProjectModal from '../../../components/AddProjectModal.jsx';
import UpdateProjectModal from '../../../components/UpdateProjectModal.jsx';

function CrudProjects() {

    const [show, setShow] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState({});
    
    useEffect(() => {
        fetch("https://localhost:8080/api/projects/")
          .then(response => response.json())
          .then(data => {
            console.log(data);
            setProjects(data);
          })
          .catch(error => console.error("Fetch error:", error));
      }, []);

      
    
      const updateProject = (id_proyecto) => {
        const projectToUpdate = projects.find(project => project.id_proyecto === id_proyecto);
        setSelectedProject(projectToUpdate);
        setUpdateModalOpen(true);
      };
    
      const deleteProject = (id_proyecto) => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: '¡No podrás revertir esto!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminarlo',
          cancelButtonText: 'Cancelar',
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://localhost:8080/api/projects/${id_proyecto}`, {
              method: 'DELETE',
            })
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Error al eliminar el proyecto: ${response.statusText}`);
                }
                console.log("Proyecto eliminado con éxito");
                Swal.fire('¡Eliminado!', 'El proyecto ha sido eliminado.', 'success');
                setProjects(prevProjects => prevProjects.filter(project => project.id_proyecto !== id_proyecto));
              })
              .catch(error => {
                console.error("Fetch error:", error);
                MySwal.fire('Error', 'Hubo un error al eliminar el proyecto.', 'error');
              });
          }
        });
      };
    
      const openAddModal = () => {
        setAddModalOpen(true);
      };
    
      const closeAddModal = () => {
        setAddModalOpen(false);
      };
    
      const openUpdateModal = () => {
        setUpdateModalOpen(true);
      };
    
      const closeUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedProject({});
      };
    
      const handleAddOrUpdate = ({ title, text, icon }) => {
        Swal.fire({
          title: title,
          text: text,
          icon: icon,
        }).then(() => {
          fetch("https://localhost:8080/api/projects/")
            .then(response => response.json())
            .then(data => {
              // console.log(data);
              setProjects(data);
            })
            .catch(error => console.error("Fetch error:", error));
      
          closeAddModal();
          closeUpdateModal();
        });
      };
      

    return (
        <div className='flex flex-col md:flex-row bg-[#EEF4ED]'>
            <Sidebar show={show} setShow={setShow}/>
            {
                !show ?
                <div className='flex-1 md:ml-72'>
                <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">Gestionar Proyecto</h1>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                        <div className="mb-4">
                            <button onClick={openAddModal} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                                <FaUserPlus className="inline-block mr-1" />
                                Agregar proyecto
                            </button>
                        </div>
                        <h2 className="text-2xl mb-4">Proyectos registrados:</h2>
                        <table className="table-auto">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">Nombre</th>
                                    <th className="hidden md:table-cell px-4 py-2">Lider a Cargo</th>
                                    <th className="hidden md:table-cell px-4 py-2">Equipo Asignado</th>
                                    <th className="hidden md:table-cell px-4 py-2">Fecha Inicio</th>
                                    <th className="hidden md:table-cell px-4 py-2">Estado</th>
                                    <th className="px-4 py-2">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                            <td className="px-4 py-2 text-center">{project.nombre}</td>
                                        <td className="hidden md:table-cell px-4 py-2 text-center">{project.nombre_usuario}</td>
                                        <td className="hidden md:table-cell px-4 py-2 text-center">{project.nombre_equipo}</td>
                                        <td className="hidden md:table-cell px-4 py-2 text-center">{project.fecha_inicio.split('T')[0]}</td>
                                        <td className="hidden md:table-cell px-4 py-2 text-center">{project.nombre_estado}</td>
                                        <td className="px-4 py-2">
                                        <button onClick={() => updateProject(project.id_proyecto)}  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 md:mr-2">
                                            <FaEdit className="inline-block mr-1" />
                                            Actualizar
                                        </button>
                                        <button onClick={() => deleteProject(project.id_proyecto)} className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            <FaTrash className="inline-block mr-1" />
                                            Eliminar
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Modal para añadir proyecto */}
                <AddProjectModal
                    isOpen={isAddModalOpen}
                    onRequestClose={closeAddModal}
                    handleAddOrUpdate={handleAddOrUpdate}
                />

                {/* Modal para actualizar proyecto */}
                <UpdateProjectModal
                    isOpen={isUpdateModalOpen}
                    onRequestClose={closeUpdateModal}
                    handleAddOrUpdate={handleAddOrUpdate}
                    selectedProject={selectedProject}
                />
            </div>
            :
            null
            }
        </div>
    )
}

export default CrudProjects;