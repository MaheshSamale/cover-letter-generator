// src/App.js
import React, { useState } from 'react';
import Form from './Components/Form';
import Result from './Components/Result';

const App = () => {
  const [coverLetter, setCoverLetter] = useState('');
  const [showResult, setShowResult] = useState(false); // State to manage which component to show

  const handleSwitch = () => {
    setShowResult(prev => !prev); // Toggle between Form and Result
  };

  return (
    <div className="app">
      {showResult ? (
        <Result coverLetter={coverLetter} onSwitch={handleSwitch} />
      ) : (
        <Form setCoverLetter={setCoverLetter} onSwitch={handleSwitch} />
      )}
    </div>
  );
};

export default App;
