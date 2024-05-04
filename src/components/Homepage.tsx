import React from 'react'

export default function Homepage(props) {

const { setFile, setAudioStream } = props

  return (
        <main className='flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center pb-24 pt-24'> 
            <h1 className='font-light text-5xl sm:text-6xl'>Transcribe
              <span className='font-bold text-blue-400'>Wizard</span>
            </h1>
            <h3 className='font-medium md:text-lg mb-4'>Record 
                <span className='text-blue-400 ml-2 mr-2'>
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
                Transcribe
                <span className='text-blue-400 ml-2 mr-2'>
                    <i class="fa-solid fa-arrow-right"></i>
                </span>
                Translate
            </h3>
            <button className='flex items-center text-base justify-between gap-4 my-4 mx-auto w-72 max-w-full RecordButton px-4 py-2 text-blue hover:text-white rounded-md bg-blue-400 hover:bg-blue-800'>
                <p>Record</p>
                <span className='ml-2 mr-2 hover:text-white'>
                    <i className="fa-solid fa-microphone"></i>
                </span>
            </button>
            <p>
                <label className='text-basetext-blue cursor-pointer duration-200 ml-4'>
                    Or <span className='text-blue-400 hover:text-blue-800'>upload</span> an .mp3 or .wav file <input 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.files && e.target.files.length > 0) {
                            const uploadFile = e.target.files[0];
                            // Check for file type if necessary
                            if (uploadFile.type === "audio/mpeg" || uploadFile.type === "audio/wav") {
                              setFile(uploadFile);
                            } else {
                              alert('Only .MP3 or .WAV/.WAVE files are allowed.');
                            }
                          }
                        }} 
                        className='hidden' 
                        type='file' 
                        accept='.mp3, .wav'  // Corrected .wave to .wav
                        />
                </label>
            </p>
            <p className='text-slate-400 italic mt-12 mb-4'>
                Let's create some verbal magic
                <i class="fa-solid fa-wand-magic-sparkles ml-2"></i>
            </p>
        </main>
  )
}