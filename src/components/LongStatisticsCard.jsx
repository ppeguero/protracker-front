import React from 'react'

function LongStatisticsCard({completedTasks, totalTasks, description, color, textColor}) {

    const cardStyle= {
        backgroundColor: color,
        color: textColor
    }

  return (
    <div className='container flex items-center justify-center'>
        <div style={cardStyle} className='flex justify-around h-24 rounded-lg p-2 px-8 w-80 items-center'>
            <h3 className='text-2xl font-bold'>{completedTasks}</h3>
            <p className='font-thin'>{description}</p>
            <h3 className='text-2xl font-bold'>{totalTasks}</h3>
        </div>
    </div>
  )
}

export default LongStatisticsCard