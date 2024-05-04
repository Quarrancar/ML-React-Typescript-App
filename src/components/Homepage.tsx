import React from 'react'

export default function Homepage() {
  return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center'>
            <h1 className='font-regular text-5xl sm:text-6xl'>Transcribe
              <span className='font-bold text-blue-400'>Wizard</span>
            </h1>
            <h3 className='font-medium'>Record 
                <span className='text-blue-400 ml-2 mr-2'>
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
                Transcribe
                <span className='text-blue-400 ml-2 mr-2'>
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
                Translate
            </h3>
        </main>
  )
}