import React from 'react'

function CalendarTask({ team, teamName, title, description}) {
  return (
    <li>
        <div className="container">
            <div className="flex h-full justify-center items-center my-2">
                <div>
                    <h6 className='text-white font-medium text-xs text-start'>{team}</h6>
                    <h6 className='text-white font-light text-xs text-start'>{teamName}</h6>
                </div>
                <div className="h-14 w-1 rounded-lg bg-[#8DA8C5] mr-4 ml-4"></div>
                <div className='py-4'>
                    <h6 className='text-white font-medium text-xs'>{title}</h6>
                    <p className='text-white font-extralight truncate text-xs w-28'>{description}</p>
                </div>
            </div>
        </div>
    </li>
  )
}

export default CalendarTask