import React from 'react'

function ResourceRequestCard({title, description, profilePhoto}) {
  return (
    <div>
      <div className="container bg-[#8DA8C5] w-full flex justify-between px-10 py-5 rounded-xl">
        <div className=''>
            <h6 className='text-white font-medium text-xs'>{title}</h6>
            <p className='text-white font-extralight text-xs'>{description}</p>
        </div>
        <div>
          <img src={profilePhoto} className='w-14 h-14'></img>
        </div>
      </div>
    </div>
  )
}

export default ResourceRequestCard