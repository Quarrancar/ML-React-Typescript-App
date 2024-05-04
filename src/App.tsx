import { useState } from 'react';
import Header from './components/Header';
import Homepage from "./components/Homepage";
import DisplayAvailableFile from './components/DisplayAvailableFile'


function App() {
  const [file, setFile] = useState<File | null>(null);
  const [audioStream, setAudioStream] = useState<unknown | null>(null);
  const isAudioAvailable = file || audioStream;

  function userManualAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  function resetToHomepage() {
    userManualAudioReset();
  }

  return (
    <>
      <div className="flex flex-col max-w-[1200px] mx-auto w-full">
        <section className="min-h-screen flex flex-col">
          <Header onTitleClick={resetToHomepage} />
          {isAudioAvailable ? (
            <DisplayAvailableFile
              userManualAudioReset={userManualAudioReset}
              file={file}
              audioStream={audioStream}
            />
          ) : (
            <Homepage setFile={setFile} setAudioStream={setAudioStream} />
          )}
        </section>

        <footer></footer>
      </div>
    </>
  );
}

export default App
