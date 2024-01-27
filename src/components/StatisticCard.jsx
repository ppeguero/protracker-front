import React from 'react'

function StatisticCard( { data, description}) {
  return (
    <div className="">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div className="flex flex-col h-40 bg-[#8DA8C5] rounded-lg p-2 px-8 w-40">
            <div className='flex justify-between'>
                <div className=''>
                </div>
                <button>
                </button>
            </div>
            <h4 className="text-[#13315C] font-bold mt-5 text-4xl   ">{data}</h4>
        <p className='text-white font-extralight mt-6 text-xs'>{description}</p>
        </div>
        </div>
    </div>
  )
}

export default StatisticCard