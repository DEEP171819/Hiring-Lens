import React, { useState } from 'react';
import ResumeDetailPanel from './ResumeDetailPanel';
import './RankedResults.css';

function RankedResults({ results }) {
  const [selectedResume, setSelectedResume] = useState(null);

  if (!results || results.length === 0) {
    return <p>No results to display</p>;
  }

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'Shortlist':
        return '#d4edda';
      case 'Review':
        return '#fff3cd';
      case 'Reject':
        return '#f8d7da';
      default:
        return '#e2e3e5';
    }
  };

  const getDecisionTextColor = (decision) => {
    switch (decision) {
      case 'Shortlist':
        return '#155724';
      case 'Review':
        return '#856404';
      case 'Reject':
        return '#721c24';
      default:
        return '#383d41';
    }
  };

  return (
    <div className="ranked-results">
      <table className="results-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Candidate Name</th>
            <th>Match Score</th>
            <th>Decision</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr
              key={index}
              className="result-row"
              onClick={() => setSelectedResume(result)}
            >
              <td className="rank-cell">
                <span className="rank-badge">{result.rank}</span>
              </td>
              <td className="name-cell">{result.name}</td>
              <td className="score-cell">
                <div className="score-bar-container">
                  <div className="score-bar-bg">
                    <div
                      className="score-bar-fill"
                      style={{
                        width: `${result.score}%`,
                        backgroundColor:
                          result.score >= 70
                            ? '#28a745'
                            : result.score >= 40
                            ? '#ffc107'
                            : '#dc3545',
                      }}
                    />
                  </div>
                  <span className="score-text">{result.score.toFixed(1)}%</span>
                </div>
              </td>
              <td className="decision-cell">
                <span
                  className="decision-badge-small"
                  style={{
                    backgroundColor: getDecisionColor(result.decision),
                    color: getDecisionTextColor(result.decision),
                  }}
                >
                  {result.decision}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Detail Panel */}
      {selectedResume && (
        <ResumeDetailPanel
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
}

export default RankedResults;
