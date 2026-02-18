import React from 'react';
import './ProgressBar.css';

function ProgressBar({ score }) {
  const getProgressColor = (score) => {
    if (score >= 70) return '#28a745';
    if (score >= 40) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="progress-container">
      <div className="progress-bar-wrapper">
        <div
          className="progress-bar-fill"
          style={{
            width: `${score}%`,
            backgroundColor: getProgressColor(score),
          }}
        />
      </div>
      <p className="progress-label">
        {score.toFixed(1)}% Match
      </p>
    </div>
  );
}

export default ProgressBar;
