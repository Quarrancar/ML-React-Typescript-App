import React from 'react';

export default function Header() {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
        <h1 className='flex items-center font-light'>
            <img src="/transcribewizard.svg" alt="TranscribeWizard Logo" className="mr-2" style={{ height: '2rem' }} /> {/* Logo added here */}
            Transcribe
            <span className='font-bold text-blue-400'>Wizard</span>
        </h1>
        <button className='flex items-center gap-2 NavigationHeaderButton px-4 py-2 text-base rounded-md text-blue-400 hover:bg-blue-800 hover:text-white'>
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
    </header>
  );
}
