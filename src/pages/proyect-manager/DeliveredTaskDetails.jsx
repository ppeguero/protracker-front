import React from 'react';
import Header from '../../components/Header';
import participants from "../../assets/icons/participants.png"
import options from "../../assets/icons/options.png"
import Rafa from "../../assets/images/Rafa.png"
import PDF from "../../assets/icons/PDF.png"

function DeliveredTaskDetails() {
  return (
    <div className="h-screen container bg-[#EEF4ED] w-full">
      <Header />
      <div className="flex flex-col w-full h-auto bg-[#EEF4ED] md:flex-row">
        <div className='flex flex-col user-info mx-5 md:mx-10'>
          <div className='md:mx-10'>
            <p className='text-black -mt-2'><strong>{"<"}</strong> REGRESAR</p>
          </div>
          <div className='flex flex-col md:flex-row justify-between items-center md:mx-24'>
            <div>
              <h1 className="text-[#13315C] text-3xl font-extrabold md:text-left text-center mt-2">Detalle de la tarea entregada</h1>
            </div>
          </div>
          <div className='flex bg-[#8DA8C5] rounded-md my-4 mx-24'>
            <div className='w-3/4 p-4 ml-10 mt-6'>
              <h2 className='text-2xl font-bold text-[#13315C]'>Tarea: Junta de análisis</h2>
              <p className='text-xl font-bold mt-8 text-[#13315C] '>
                Descripción:
              </p>
              <div className='bg-[#8DA8C5] rounded-md my-4'>
                <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                  Como parte del proceso de desarrollo de nuestro nuevo proyecto de software, se ha programado una "Junta de Análisis" para abordar aspectos clave del proyecto y garantizar una comprensión integral de los requisitos, desafíos y soluciones propuestas. La junta está diseñada para fomentar la colaboración entre los miembros del equipo y otros stakeholders, así como para establecer una base sólida para el éxito del proyecto.
                </p>
                <div className='ml-6 mt-6'>
                  <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                    <strong className='-ml-4 text-lg'>Objetivos de la Junta:</strong>
                    <ul className="ml-8">
                      <li className="font-bold">1. Revisión de Requisitos:</li>
                      <ul className="list-disc ml-12">
                        <li>Analizar y clarificar los requisitos del proyecto.</li>
                        <li>Identificar posibles lagunas o ambigüedades en los requisitos.</li>
                      </ul>
                      <li className="font-bold">2. Discusión Técnica:</li>
                      <ul className="list-disc ml-12">
                        <li>Abordar problemas técnicos específicos y explorar soluciones potenciales.</li>
                        <li>Evaluar la viabilidad técnica de las propuestas y tomar decisiones informadas.</li>
                      </ul>
                      <li className="font-bold">3. Planificación Estratégica:</li>
                      <ul className="list-disc ml-12">
                        <li>Definir estrategias de implementación para diferentes aspectos del proyecto.</li>
                        <li>Establecer hitos y plazos para garantizar un progreso constante.</li>
                      </ul>
                      <li className="font-bold">4. Identificación de Obstáculos:</li>
                      <ul className="list-disc ml-12">
                        <li>Identificar posibles obstáculos que podrían afectar el desarrollo.</li>
                        <li>Proponer soluciones preventivas y mitigadoras.</li>
                      </ul>
                    </ul>
                  </p>
                </div>
                <div className='ml-6'>
                  <p className='text-xl-2 mt-2 text-[#EEF4ED] '>
                    <strong className='-ml-4 text-lg'>Participantes:</strong>
                  </p>
                  <div className='my-4 -ml-5'>
                    <img src={participants} alt="participants" />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-1/4 bg-[#8DA8C5] rounded-md'>
              <div className='mt-6 flex flex-col  mr-4 items-center justify-center'> {/* Ajuste aquí */}
              <p className='text-[#EEF4ED]'>Entregado: 25-01-2024</p>
                <img src={options}  alt="options" className='mb-4 -mt-5 items-end' style={{ marginRight: '-250px' }} />
                <img src={Rafa} alt="Rafa" className="my-4 w-44 h-auto" />

                <p className='text-xl font-bold text-center text-[#13315C] '>
                  Jefe de proyecto
                </p>
                <p className='text-xl mt-2 text-center text-[#13315C] '>
                  Rafael Villegaz
                </p>

                <img src={PDF} alt="options" className='my-5 items-end' />
                <p className='text-[#EEF4ED] font-semibold '>Entregado por: Pipa</p>
                <button className='bg-[#D9D9D9] text-[#13315C] font-bold text-2xl mt-4 rounded-md py-4 px-4 hover:bg-[#d1d1d1]'>
                  Entregar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveredTaskDetails;
