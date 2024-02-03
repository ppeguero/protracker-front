import React from 'react'
import { Link } from 'react-router-dom'

function ReturnButton({ link }) {
  return (
    <div className='my-2'>
        <button onClick={() => window.history.back()} to={link}>
            <p className='text-xs'><strong className='font-extrabold'>{'< '}</strong>R E G R E S A R</p>
        </button>
    </div>
  )
}

export default ReturnButton