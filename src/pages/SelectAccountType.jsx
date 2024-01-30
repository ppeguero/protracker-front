import React from 'react'

//* Images
import projectManager from '../assets/icons/projectManager.png'
import teamMember from '../assets/icons/teamMember.png'

function SelectAccountType() {
  return (
      <div className='relative'>
        <h1 className='text-[#13315C] font-bold text-2xl absolute z-40 top-8 left-48'>P R O T R A C K E R</h1>
        <div className='bg-[#8DA8C5] h-screen flex flex-col items-center justify-center relative'>
          <div className='bg-white h-3/4 w-3/4 rounded-lg p-4 relative'>
              <div className='flex flex-col items-center'>
                <h1 className='text-[#134175] font-bold text-3xl mt-3'>Selecciona tu tipo de cuenta</h1>
                <hr className='my-4 w-2/3 border-t-1 border-[#13315C]'></hr>
              </div>
              <div className='flex flex-row relative'>
                <div className='w-1/2 bg-[#13315C] hover:bg-[#134175] flex flex-col items-center rounded-l-lg p-20'>
                  <img src={projectManager} alt="Project Manager"/>
                  <p className='text-white text-3xl'>Jefe de proyecto</p>
                </div>
                <div className='absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                  <div className='bg-white text-[#134175] p-1 rounded-full '>
                    <h1 className='font-extrabold text-3xl'>O</h1>
                  </div>
                </div>
                <div className='w-1/2 bg-[#13315C] hover:bg-[#134175] flex flex-col items-center rounded-r-lg p-20'>
                  <img src={teamMember} alt="Team Member" />
                  <p className='text-white text-3xl'>Miembro del equipo</p>
                </div>
              </div>
              <div className='text-center'>
                <button className='bg-[#134175] text-white px-8 py-2 rounded-md mt-12'>Continuar</button>
              </div>
            </div>
        </div>
      </div>
  )
}

export default SelectAccountType