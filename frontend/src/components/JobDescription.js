import React from 'react';
import './JobDescription.css';

function JobDescription({ value, onChange }) {
  return (
    <div className="job-description">
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste the job description here..."
        className="textarea"
      />
      <p className="hint">Include skills, experience, and qualifications needed</p>
    </div>
  );
}

export default JobDescription;
