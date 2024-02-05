import React, {useState} from 'react'

function AddNewResourceForm({id_project}) {

  const [resourceName, setResourceName] = useState('');
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleCreateProject = async (e) => {
    e.preventDefault();

    if (quantity === 0){
        console.error('La cantidad no puede ser 0!')
        return;
    }

    if (
        !resourceName.trim() || 
        !description.trim() || 
        !type.trim()
      ) {
        console.error('Todos los campos son obligatorios');
        return;
      }


  
    const requestBody = {
      nombre: resourceName,
      descripcion: description,
      tipo: type,
      cantidad: quantity,
      id_proyecto_id: 4 // cambiar cuando ya esté los modulos de proyecto por el prop
      // para jalar el id segun el proyecto al cual se va a añadir un recurso
    };
  
    try {
      const response = await fetch('http://localhost:8080/protracker/resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
  
      if (!response.ok) {
        throw new Error('Error al crear el recurso');
      }
  
      console.log('Recurso creado exitosamente');
    } catch (error) {
      console.error('Error al crear el recurso:', error);
    }
  }
  


  return (
    <div className='flex flex-col px-6'>
      <form onSubmit={handleCreateProject} className='space-y-6'>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Nombre del recurso</h3>
          <input value={resourceName} onChange={(e) => setResourceName(e.target.value)} className='p-2 w-80'></input>
        </div>
        <div className='space-y-1'>
          <h3 className='text-xl font-semibold text-[#13315C]'>Descripción</h3>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='p-2 w-80 h-24' type='text-area' maxLength={255}></textarea>
        </div>
        <div className='space-y-1 flex justify-between items-center'>
            <div className='space-y-1'>
                <h3 className='text-xl font-semibold text-[#13315C]'>Tipo</h3>
                  <select value={type} onChange={(e) => setType(e.target.value)} className='p-2 w-30'>
                      <option value="">Seleccionar</option>
                      <option value="Humano">Humano</option>
                      <option value="Material">Material</option>
                      <option value="Otro">Otro</option>
                  </select>
            </div>
            <div>
                <h3 className='text-xl font-semibold text-[#13315C]'>Cantidad</h3>
                <input className='p-2 w-20' type='number' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}></input>
            </div>
        </div>
        <button type='submit' className='bg-[#13315C] text-white p-2 w-80 capitalize hover:bg-[#8DA8C5]'>Crear recurso</button>
      </form>
    </div>
  )
}

export default AddNewResourceForm