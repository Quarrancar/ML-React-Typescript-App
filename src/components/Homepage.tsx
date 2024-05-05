import React, { useState, useEffect, useRef } from 'react';

export default function Homepage(props: {
  setFile: (file: File) => void;
  setAudioStream: (stream: Blob) => void;
}) {

  const { setAudioStream, setFile } = props;

  const [recordingStatus, setRecordingStatus] = useState<string>('inactive');
  const [audioChunks, setAudioChunks] = useState<BlobPart[]>([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const mimeType = 'audio/webm';

  async function startRecording(): Promise<void> {
    console.log('Start recording');
  
    try {
      // Requesting audio access without video.
      const streamData = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false
      });
  
      // Store the stream data if access is successful.
      mediaRecorder.current = new MediaRecorder(streamData, {
        mimeType: 'audio/webm'
      });
  
      // Start recording.
      mediaRecorder.current.start();
  
      // Updating recording status to the state.
      setRecordingStatus('recording');
  
      // Handle the available data from media recorder.
      mediaRecorder.current.ondataavailable = (event) => {
        // Handle data (e.g., push to an array or state)
        console.log(event.data);
      };
  
      // Optional: Listen to stop event to do something when recording stops.
      mediaRecorder.current.onstop = () => {
        console.log('Recording stopped.');
      };
    } catch (err: unknown) {
      // Handle errors in accessing the microphone.
      if (err instanceof Error) {
        console.error('Error accessing the microphone:', err.message);
      } else {
        console.error('An unexpected error occurred:', err);
      }
      // Optionally set status or alert user
      setRecordingStatus('error');
    }
  }

  async function stopRecording() {
    if (mediaRecorder.current) {
      setRecordingStatus('inactive');
      console.log('Stop recording');

      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        setAudioStream(audioBlob);
        setAudioChunks([]);
        setDuration(0);
      };
    }
  }

  useEffect(() => {
    if (recordingStatus !== 'inactive') {
      const interval = setInterval(() => {
        setDuration(curr => curr + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [recordingStatus]);

  
  return (
    <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center pb-24 pt-24">
      <h1 className="font-light text-5xl sm:text-6xl">
        Transcribe
        <span className="font-bold text-blue-400">Wizard</span>
      </h1>
      <h3 className="font-medium md:text-lg mb-4">
        Record
        <span className="text-blue-400 ml-2 mr-2">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Transcribe
        <span className="text-blue-400 ml-2 mr-2">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        Translate
      </h3>
      <button onClick={recordingStatus  ===  'recording'  ?  stopRecording  :  startRecording} className="flex items-center text-base justify-between gap-4    my-4 mx-auto w-72 max-w-full RecordButton px-4 py-2 text-blue hover:text-white   rounded-md bg-blue-400 hover:bg-blue-800">
        <p>{recordingStatus === 'inactive' ? 'Record'  : `Stop recording`}</p>
        <span className="ml-2 mr-2 hover:text-white flex items-center gap-2">
          {duration !== 0 && (<p className='text-sm'>{duration}s</p>)}
          <i className={"fa-solid fa-microphone " + (recordingStatus ===    'recording' ? 'text-red-300' : "")}></i>
        </span>
      </button>
      <p>
        <label className="text-basetext-blue cursor-pointer duration-200 ml-4">
          Or <span className="text-blue-400 hover:text-blue-800 mr-1">upload</span>
          an .mp3 or .wav file{" "}
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.files && e.target.files.length > 0) {
                const uploadFile = e.target.files[0];
                if (uploadFile.type === "audio/mpeg" || uploadFile.type === "audio/   wav") {
                  setFile(uploadFile);
                } else {
                  alert("Only .MP3 or .WAV/.WAVE files are allowed.");
                }
              }
            }}
            className="hidden"
            type="file"
            accept=".mp3, .wav"
          />
        </label>
      </p>
      <p className="text-slate-400 italic mt-12 mb-4">
        Let's create some verbal magic
        <i className="fa-solid fa-wand-magic-sparkles ml-2"></i>
      </p>
    </main> 
  );
}
