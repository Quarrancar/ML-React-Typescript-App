import React from 'react'

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
        <h1 className='font-regular'>Transcribe
              <span className='text-blue-400 font-bold'>Wizard</span>
        </h1>
        <button className='flex items-center gap-2'>
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
    </header>
  )
}
