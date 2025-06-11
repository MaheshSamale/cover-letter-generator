// src/Components/Result.js

import React, { useState } from 'react';
import { PiUserSwitchBold } from 'react-icons/pi'; // Import the user switch icon
import './YourStylesheet.css'; // Import your stylesheet

const Result = ({ coverLetter, onSwitch }) => {
  const [editableCoverLetter, setEditableCoverLetter] = useState(coverLetter);
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCoverLetter);
    setCopyMessage('Copied to clipboard! ✅');
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([editableCoverLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'HireWrite_CoverLetter.txt';
    link.href = url;
    link.click();
  };

  return (
    <div className="result-popup">
      <h2 className="heading">
        HireWrite Result ✨
        <PiUserSwitchBold 
          onClick={onSwitch} 
          style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '24px' }} 
          title="Switch Back"
        />
      </h2>

      <textarea
        value={editableCoverLetter}
        onChange={(e) => setEditableCoverLetter(e.target.value)}
        rows={10}
        readOnly={false}
      />

      <button onClick={handleCopy}>
        {copyMessage ? "Copied ✅" : "Copy to Clipboard"}
      </button>

      <button onClick={handleDownload} style={{ marginTop: '10px' }}>
        Download as .txt
      </button>

      {copyMessage && <div className="copy-message">{copyMessage}</div>}
    </div>
  );
};

export default Result;
