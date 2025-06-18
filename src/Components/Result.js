// src/Components/Result.js

import React, { useState } from 'react';
import { PiUserSwitchBold } from 'react-icons/pi';
import './YourStylesheet.css';

const Result = ({ coverLetter, onSwitch }) => {
  const [editableCoverLetter, setEditableCoverLetter] = useState(coverLetter);
  const [copyMessage, setCopyMessage] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCoverLetter);
    setCopyMessage('Copied to clipboard! ✅');
    setTimeout(() => setCopyMessage(''), 2000);
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
      <div className="header-row">
        <h2 className="heading">🎯 Cover Letter Result</h2>
        <PiUserSwitchBold
          onClick={onSwitch}
          style={{ cursor: 'pointer', fontSize: '24px' }}
          title="Back to Generator"
        />
      </div>

      <div className="result-card">
        <label className="label">Your Generated Cover Letter:</label>
        <textarea
          value={editableCoverLetter}
          onChange={(e) => setEditableCoverLetter(e.target.value)}
          rows={12}
          className="result-textarea"
        />

        <div className="button-group">
          <button onClick={handleCopy} className="action-button primary">
            {copyMessage ? "✅ Copied!" : "Copy to Clipboard"}
          </button>
          <button onClick={handleDownload} className="action-button secondary">
            Download as .txt
          </button>
        </div>

        {copyMessage && <div className="copy-message show">{copyMessage}</div>}
      </div>

      <button className="close-button" onClick={() => window.close()}>
        Close
      </button>
    </div>
  );
};

export default Result;
