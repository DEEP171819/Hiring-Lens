
import React, { useState } from 'react';
import './App.css';
import ResumePicker from './components/ResumePicker';
import JobDescription from './components/JobDescription';
import JobDescriptionInterpretation from './components/JobDescriptionInterpretation';
import RankedResults from './components/RankedResults';

function App() {
  const [resumes, setResumes] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [rankedResults, setRankedResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

const API_BASE_URL = process.env.REACT_APP_API_URL || 
    'http://hiringlens-backend.localhost';
  const handleResumesUpload = async (files) => {
    try {
      setLoading(true);
      setError('');

      if (!files || files.length === 0) {
        throw new Error("No files selected");
      }

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('resumes', file);
      });

      const response = await fetch(`${API_BASE_URL}/health`, {
        method: 'GET',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error('Failed to connect to server');
      }

      const uploadResponse = await fetch(`${API_BASE_URL}/upload-resumes`, {
        method: 'POST',
        mode: 'cors',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload resumes');
      }

      const data = await uploadResponse.json();
      setResumes(data.resumes || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleRank = async () => {
    try {
      if (resumes.length === 0) {
        setError('Please upload resumes first');
        return;
      }

      if (!jobDescription.trim()) {
        setError('Please enter a job description');
        return;
      }

      setLoading(true);
      setError('');

      const response = await fetch(`${API_BASE_URL}/rank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumes: resumes,
          job_description: jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to rank resumes');
      }

      const data = await response.json();
      setRankedResults(data.ranked_resumes || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>🎯 HiringLens</h1>
        <p>ML-Based Resume Ranking System</p>
      </header>

      <div className="container">
        <div className="section">
          <h2>Step 1: Upload Resumes</h2>
          <ResumePicker onUpload={handleResumesUpload} loading={loading} />
          {resumes.length > 0 && (
            <p className="info">
              ✓ {resumes.length} resume(s) uploaded
            </p>
          )}
        </div>

        <div className="section">
          <h2>Step 2: Enter Job Description</h2>
          <JobDescription
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
        </div>

        {jobDescription.trim() && (
          <div className="section interpretation-section">
            <JobDescriptionInterpretation jobDescription={jobDescription} />
          </div>
        )}

        <div className="section">
          <button
            onClick={handleRank}
            disabled={loading || resumes.length === 0 || !jobDescription.trim()}
            className="rank-btn"
          >
            {loading ? 'Processing...' : 'Rank Resumes'}
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {rankedResults.length > 0 && (
          <div className="section">
            <h2>Step 3: Ranked Results</h2>
            <RankedResults results={rankedResults} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
