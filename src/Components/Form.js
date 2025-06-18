/* global chrome */
/* global chrome */
import React, { useState, useEffect, useCallback } from 'react';
import { PiUserSwitchBold } from 'react-icons/pi';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.entry';
import mammoth from 'mammoth';
import './YourStylesheet.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;


const Form = ({ setCoverLetter, onSwitch }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [resume, setResume] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingFit, setCheckingFit] = useState(false);
  const [fitScore, setFitScore] = useState(null);
  const [fitExplanation, setFitExplanation] = useState('');
  const [recommendationLoading, setRecommendationLoading] = useState(false);
  const [resumeRecommendations, setResumeRecommendations] = useState([]);
  const [activeCard, setActiveCard] = useState(null);
  const [showRecommendationsView, setShowRecommendationsView] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(['jobDescription', 'resume'], (result) => {
      if (result.jobDescription) setJobDescription(result.jobDescription);
      if (result.resume) setResume(result.resume);
    });
  }, []);

  useEffect(() => {
    chrome.storage.local.set({ jobDescription, resume });
  }, [jobDescription, resume]);

  const handleScrapeJobDescription = () => {
    setLoading(true);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: 'getJobDescription' },
        (response) => {
          if (response && response.jobDescription) {
            setJobDescription(response.jobDescription);
            setError('');
          } else {
            setError('Job description not found. Please enter it manually.');
          }
          setLoading(false);
        }
      );
    });
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item) => item.str).join(' ') + '\n';
    }
    return text;
  };

  const extractTextFromDOCX = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const handleFileUpload = async (file) => {
    try {
      const extension = file.name.split('.').pop().toLowerCase();
      let text = '';
      if (extension === 'pdf') {
        text = await extractTextFromPDF(file);
      } else if (extension === 'docx') {
        text = await extractTextFromDOCX(file);
      } else {
        setError('Unsupported file format. Only PDF or DOCX allowed.');
        return;
      }
      setResume(text.trim());
      setError('');
    } catch (err) {
      setError('Error reading file: ' + err.message);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!jobDescription || !resume) {
      setError('Please provide both job description and resume.');
      return;
    }

    setLoading(true);
    const genAI = new GoogleGenerativeAI("_______________________"); /* Replace Your Gemini Api Here  */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Generate a cover letter for the following job description:\n\n${jobDescription}\n\nBased on this resume:\n\n${resume}`;

    try {
      const result = await model.generateContent(prompt);
      setCoverLetter(result.response.text());
      onSwitch();
    } catch (err) {
      setError('Error generating cover letter: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckFit = async () => {
    setError('');
    setFitScore(null);
    setFitExplanation('');

    if (!jobDescription || !resume) {
      setError('Please provide both job description and resume to check fit.');
      return;
    }

    setCheckingFit(true);
    const genAI = new GoogleGenerativeAI("_______________________"); /* Replace Your Gemini Api Here  */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Based on the resume and job description below, assess how well the candidate fits this role.
      Give:
      - A fit score out of 100
      - A brief explanation (max 3 sentences)
      Respond in the format:
      Score: [number]
      Explanation: [text]

      Job Description:
      ${jobDescription}

      Resume:
      ${resume}
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const scoreMatch = text.match(/Score:\s*(\d+)/i);
      const explanationMatch = text.match(/Explanation:\s*(.+)/is);

      if (scoreMatch) setFitScore(parseInt(scoreMatch[1]));
      if (explanationMatch) setFitExplanation(explanationMatch[1].trim());
    } catch (err) {
      setError('Error checking fit: ' + err.message);
    } finally {
      setCheckingFit(false);
    }
  };

  const handleResumeRecommendations = async () => {
    setError('');
    setResumeRecommendations([]);
    if (!jobDescription || !resume) {
      setError('Please provide both job description and resume to get recommendations.');
      return;
    }

    setRecommendationLoading(true);
    const genAI = new GoogleGenerativeAI("_______________________"); /* Replace Your Gemini Api Here  */
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Review the following resume in context of the job description.
      Provide section-wise suggestions (summary, skills, experience, education, etc.) to improve the resume's alignment with the job.
      Format:
      Section: [Name]
      Recommendation: [Brief Suggestion]

      Job Description:
      ${jobDescription}

      Resume:
      ${resume}
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const sections = text.split(/Section:\s*/g).slice(1).map(block => {
        const [title, ...rest] = block.split(/\n+/);
        const recommendation = rest.join(' ')
          .replace(/^Recommendation:\s*/i, '')
          .replace(/\*/g, '')
          .trim();
        return {
          title: title.trim(),
          recommendation,
        };
      });

      setResumeRecommendations(sections);
      setShowRecommendationsView(true);
    } catch (err) {
      setError('Error getting resume recommendations: ' + err.message);
    } finally {
      setRecommendationLoading(false);
    }
  };

  return (
    <div className="form-popup" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <h2 className="heading">
        Cover Letter Generator
        <PiUserSwitchBold onClick={onSwitch} style={{ cursor: 'pointer', marginLeft: '10px', fontSize: '24px' }} title="Switch to Result" />
      </h2>

      {!showRecommendationsView && (
        <form onSubmit={handleSubmit}>
          <label>Job Description:</label>
          <textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Enter job description" />

          <button type="button" onClick={handleScrapeJobDescription} disabled={loading} className="action-button">
            {loading ? "Scraping..." : "Scrape Job Description"}
          </button>

          <label>Resume:</label>
          <textarea value={resume} onChange={(e) => setResume(e.target.value)} placeholder="Paste resume or drop file below" />

          <input type="file" accept=".pdf,.docx" onChange={handleFileInput} className="action-button" />
          <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>You can also drag & drop PDF/DOCX resume here</p>

          <button type="button" onClick={handleCheckFit} disabled={checkingFit} className="action-button">
            {checkingFit ? "Checking Fit..." : "Check Fit for Job"}
          </button>

          {fitScore !== null && (
            <div className="fit-result">
              <strong>Fit Score:</strong>
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${fitScore}%`, backgroundColor: fitScore >= 75 ? '#4caf50' : fitScore >= 50 ? '#ff9800' : '#f44336' }}>
                  {fitScore}%
                </div>
              </div>
              <p className="fit-explanation">{fitExplanation}</p>
            </div>
          )}

          <button type="button" onClick={handleResumeRecommendations} disabled={recommendationLoading} className="action-button">
            {recommendationLoading ? "Analyzing Resume..." : "Get Resume Recommendations"}
          </button>

          <button type="submit" disabled={loading} className="action-button">
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>

          {error && <div className="error">{error}</div>}
        </form>
      )}

      {showRecommendationsView && (
        <div className="recommendation-view">
          <h3>Resume Recommendations</h3>
          {resumeRecommendations.map((rec, index) => (
            <div
              key={index}
              className="recommendation-card"
              onClick={() => setActiveCard(activeCard === index ? null : index)}
            >
              <div className="card-header">{rec.title}</div>
              {activeCard === index && (
                <div className="card-body">
                  <p>{rec.recommendation}</p>
                </div>
              )}
            </div>
          ))}
          <button className="action-button" onClick={() => setShowRecommendationsView(false)}>← Back</button>
        </div>
      )}

      <button className="close-button" onClick={() => window.close()}>Close</button>
    </div>
  );
};

export default Form;
