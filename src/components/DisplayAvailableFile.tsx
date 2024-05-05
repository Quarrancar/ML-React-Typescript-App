import { useRef, useEffect } from 'react';

export default function DisplayAvailableFile(props: {
    handleAudioReset: () => void;
    file: File | null;
    audioStream: Blob | null;
    handleFormSubmission: () => void;
}) {
    const { handleAudioReset, file, audioStream, handleFormSubmission } = props;
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
      const source = file ? file : audioStream;
      if (source && audioRef.current) {
        audioRef.current.src = URL.createObjectURL(source);
      }
    }, [audioStream, file]);
  
    return (
      <main className="flex-1 p-4 flex flex-col gap-3 sm:gap-4 md:gap-5 text-center justify-center pb-24 pt-24 w-fit max-w-full mx-auto">
        <h1 className="font-light text-4xl sm:text-5xl">
          Your
          <span className="font-bold text-blue-400 ml-4">Audio File</span>
        </h1>
        <div className="mx-auto flex flex-col text-center mt-4">
          <h3 className="font-semibold text-lg">File Name:</h3>
          <p>{file?.name || 'No file selected'}</p>
        </div>
        <audio ref={audioRef} controls style={{ maxWidth: '100%' }} />
        <div>
          <button
            onClick={handleFormSubmission}
            className="mx-auto flex items-center gap-2 text-center mt-4 flex px-4 py-2 text-base rounded-md text-blue-400 hover:bg-blue-800 hover:text-white font-regular AfterFileUploadButton">
            <i className="fa-solid fa-wand-magic-sparkles ml-1 mr-2 duration-100"></i>
            Transcribe
          </button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleAudioReset}
            className="mx-auto flex flex-col text-center mt-4 flex px-4 py-2 text-base rounded-md text-blue-400 hover:text-blue-400 mt-8 text-1l sm:text-2l text-slate-400">
            Reset
          </button>
        </div>
      </main>
    );
}
