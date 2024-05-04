import React from 'react'

export default function DisplayAvailableFile(props) {
  const { userManualAudioReset, file, audioStream } = props

  return (
    <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center pb-24 pt-24'> 
      <h1 className='font-light text-5xl sm:text-6xl'>Your
        <span className='font-bold text-blue-400'>Audio File</span>
      </h1>
    </main>
  )
}