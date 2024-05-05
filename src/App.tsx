import { useState, useRef, useEffect } from 'react';
import Header from './components/Header';
import Homepage from './components/Homepage';
import DisplayAvailableFile from './components/DisplayAvailableFile';
import Information from './components/Information';
import Transcribing from './components/Transcribing';
import { MessageTypes } from './utils/presets';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [audioStream, setAudioStream] = useState<Blob | null>(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);

  const isAudioAvailable = file || audioStream;

  const worker = useRef<Worker | null>(null);

  useEffect(() => {
    worker.current = new Worker(new URL("./utils/whisper.worker.js", import.meta.url), {
      type: "module",
    });

    const onMessageReceived = (e: MessageEvent) => {
      switch (e.data.type) {
        case "LOADING":
          setLoading(true);
          break;
        case "RESULT":
          setOutput(e.data.results);
          break;
        case "INFERENCE_DONE":
          setFinished(true);
          break;
      }
    };

    worker.current?.addEventListener("message", onMessageReceived);
    return () => worker.current?.removeEventListener("message", onMessageReceived);
  }, []);

  async function readAudioFrom(source: File | Blob): Promise<Float32Array> {
    const sampling_rate = 16000;
    const audioCTX = new AudioContext({ sampleRate: sampling_rate });
    const response = await source.arrayBuffer();
    const decoded = await audioCTX.decodeAudioData(response);
    return decoded.getChannelData(0);
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return;
    }

    const audio = await readAudioFrom(file || audioStream!);
    const model_name = `openai/whisper-tiny.en`;

    worker.current?.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  }

  function handleAudioReset() {
    setFile(null);
    setAudioStream(null);
  }

  return (
    <div className="flex flex-col max-w-[1200px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header onTitleClick={() => console.log('Title clicked')} />
        {output ? (
          <Information output={output} finished={finished} />
        ) : loading ? (
          <Transcribing downloading={loading} />
        ) : isAudioAvailable ? (
          <DisplayAvailableFile
            handleFormSubmission={handleFormSubmission}
            handleAudioReset={handleAudioReset}
            file={file}
            audioStream={audioStream}
          />
        ) : (
          <Homepage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>
      <footer></footer>
    </div>
  );
}

export default App;
