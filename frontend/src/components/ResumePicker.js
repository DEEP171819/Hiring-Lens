import React, { useRef } from 'react';
import './ResumePicker.css';

function ResumePicker({ onUpload, loading }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onUpload(files);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="resume-picker">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        multiple
        accept=".pdf"
        style={{ display: 'none' }}
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="upload-btn"
      >
        {loading ? '⏳ Uploading...' : '📤 Select PDF Resumes'}
      </button>
      <p className="hint">Select one or multiple PDF files</p>
    </div>
  );
}

export default ResumePicker;
