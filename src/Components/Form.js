/* global chrome */
import React, { useState, useEffect } from 'react';
import { PiUserSwitchBold } from 'react-icons/pi'; // Import the user switch icon
import { GoogleGenerativeAI } from '@google/generative-ai'; // Import Google Generative AI
import './YourStylesheet.css'; // Import your stylesheet

const Form = ({ setCoverLetter, onSwitch }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button

  // Load saved data from chrome.storage when the component mounts
  useEffect(() => {
    chrome.storage.local.get(['jobDescription', 'resume'], (result) => {
      if (result.jobDescription) setJobDescription(result.jobDescription);
      if (result.resume) setResume(result.resume);
    });
  }, []);

  // Save jobDescription and resume to chrome.storage whenever they change
  useEffect(() => {
    chrome.storage.local.set({ jobDescription, resume });
  }, [jobDescription, resume]);

  const handleScrapeJobDescription = () => {
    setLoading(true); // Start loading state
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'getJobDescription' }, (response) => {
        if (response && response.jobDescription) {
          setJobDescription(response.jobDescription); // Set the job description in the input
          setError(''); // Clear any previous error
        } else {
          setError('Job description not found. Please enter it manually.');
        }
        setLoading(false); // Reset loading state
      });
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate inputs
    if (!jobDescription || !resume) {
      setError('Please provide both job description and resume.');
      return;
    }

    setLoading(true); // Start loading state

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI("-----------------"); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a cover letter for the following job description:\n\n${jobDescription}\n\nBased on this resume:\n\n${resume}`;

    try {
      const result = await model.generateContent(prompt);
      setCoverLetter(result.response.text());
      onSwitch(); // Switch to the Result page after generating the letter
    } catch (err) {
      setError('Error generating cover letter: ' + err.message);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="form-popup">
      <h2 className="heading">
        Cover Letter Generator 
        <PiUserSwitchBold 
          onClick={onSwitch} 
          style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '24px' }} // Adjust size as needed
        />
      </h2>
      
      <form onSubmit={handleSubmit}>
        <label>Job Description:</label>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Enter job description"
        />
        <button type="button" onClick={handleScrapeJobDescription} disabled={loading}>
          {loading ? "Scraping..." : "Scrape Job Description"}
        </button>

        <label>Resume:</label>
        <textarea
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="Enter resume"
        />

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Cover Letter"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>

      <button className="close-button" onClick={() => window.close()}>Close</button>
    </div>
  );
};

export default Form;
