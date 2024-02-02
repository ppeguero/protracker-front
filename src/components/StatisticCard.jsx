import React from 'react'

function StatisticCard( { data, description, color, textColor}) {

  const cardStyle = {
    backgroundColor: color,
  }

  const textStyle = {
    color: textColor,
  }

  return (
    <div className="">
        {/* <li className="bg-[#134175]">Equipo 2</li> */}
        <div className="container">
        <div style={cardStyle} className="flex flex-col h-40 rounded-lg p-2 px-8 w-40">
            <div className='flex justify-between'>
                <div className=''>
                </div>
                <button>
                </button>
            </div>
            <h4 style={textStyle} className=" font-bold mt-5 text-4xl">{data}</h4>
        <p className='text-white font-extralight mt-6 text-xs'>{description}</p>
        </div>
        </div>
    </div>
  )
}

export default StatisticCard