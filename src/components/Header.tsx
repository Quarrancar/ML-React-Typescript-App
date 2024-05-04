import React from 'react';

interface HeaderProps {
  onTitleClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onTitleClick }) => {
  return (
    <header className='flex items-center justify-between gap-4 p-4'>
        <h1 onClick={onTitleClick} className='flex items-center font-light cursor-pointer'>
            <img src="/transcribewizard.svg" alt="TranscribeWizard Logo" className="mr-2" style={{ height: '2rem' }} />
            Transcribe
            <span className='font-bold text-blue-400'>Wizard</span>
        </h1>
        <button className='flex items-center gap-2 NavigationHeaderButton px-4 py-2 text-base rounded-md text-blue-400 hover:bg-blue-800 hover:text-white'>
          <p>New</p>
          <i className="fa-solid fa-plus"></i>
        </button>
    </header>
  );
};

export default Header;