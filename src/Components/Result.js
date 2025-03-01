// src/Components/Result.js

import React, { useState } from 'react';
import { PiUserSwitchBold } from 'react-icons/pi'; // Import the user switch icon
import './YourStylesheet.css'; // Import your stylesheet

const Result = ({ coverLetter, onSwitch }) => {
  const [editableCoverLetter, setEditableCoverLetter] = useState(coverLetter);
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCoverLetter);
    setCopyMessage('Copied to clipboard!');

    // Clear the message after 2 seconds
    setTimeout(() => {
      setCopyMessage('');
    }, 2000);
  };

  return (
    <div className="result-popup">
      <h2>
        Generated Cover Letter
        <PiUserSwitchBold 
          onClick={onSwitch} 
          style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '24px' }} // Adjust size as needed
        />
      </h2>
      <textarea
        value={editableCoverLetter}
        onChange={(e) => setEditableCoverLetter(e.target.value)}
        rows={10} // Set the default number of rows
        readOnly={false} // Allow editing
      />
      <button onClick={handleCopy}>
        Copy to Clipboard
      </button>
      {copyMessage && <div className="copy-message">{copyMessage}</div>} {/* Notification Message */}
    </div>
  );
};

export default Result;
