import { useState } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';


function App() {
  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const isAudioAvailable = file || audioStream

  function userManualAudioReset() {
    setFile(null)
    setAudioStream(null)
  }

  return (
    <>
      <div className='flex flex-col max-w-[1200px] mx-auto w-full'>
        <section className='min-h-screen flex flex-col'>
          <Header />
          { isAudioAvailable ? 
            ( <DisplayAvailableFile userManualAudioReset={userManualAudioReset} file={file} setAudioStream={setAudioStream}/>  )
          : 
            ( <Homepage setFile={setFile} setAudioStream={setAudioStream} />  )
          }
        </section>

        <footer>

        </footer>

      </div>
    </>
  )
}

export default App
