import React, { useState, useEffect } from "react";
import options from "../assets/icons/options.png";
import { Link } from "react-router-dom";

function Resource({ id_project }) {
  const [resources, setResources] = useState([]);
  useEffect(() => {
    fetchResources();
  }, []);

  const [idRecurso, setIdRecurso] = useState('')

  // hacer distincion entre si es jefe de proyecto o miembro del equipo para poder solicitar recurso
  const isAdmin = false;

  console.log(id_project)

  const fetchResources = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/protracker/resource-by-project?id_proyecto_id=${id_project}`, // solo busca los recursos del mismo proyecto
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      if (!response.ok) {
        throw new Error("Error al obtener los recursos");
      }

      const data = await response.json();
      setResources(data);
    } catch (error) {
      console.error("Error al obtener los recursos:", error);
    }
  };

  return (
    <div className="container">
          {resources.map((resource, index) => (
            <div className="bg-[#13315C] h-fit w-72 rounded-md flex justify-around p-6 shadow-sm">
              <div key={index} className="space-y-[-4px]">
                <h3 className="text-white text-center">{resource.nombre}</h3>
                <div className="flex justify-around space-x-4 text-sm">
                  <p className="text-white font-thin">
                    Tipo de recurso: {resource.tipo}
                  </p>  
                  <p className="text-white font-thin">
                    Cantidad: {resource.cantidad}
                  </p>
                </div>
                {!isAdmin && (
                 <Link to={`/request-resource?id_recurso=${resource.id_recurso}`} className="text-center text-[#8DA8C5] underline uppercase">Solicitar recurso</Link> 
                )}
              </div>
            </div>
          ))}
    </div>
  );
}

export default Resource;
