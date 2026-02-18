import React from 'react';
import ProgressBar from './ProgressBar';
import SkillChip from './SkillChip';
import './ResumeDetailPanel.css';

function ResumeDetailPanel({ resume, onClose }) {
  if (!resume) return null;

  const getDecisionColor = (decision) => {
    switch (decision) {
      case 'Shortlist':
        return '#28a745';
      case 'Review':
        return '#ffc107';
      case 'Reject':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="panel-overlay" onClick={onClose}></div>

      {/* Side Panel */}
      <div className="resume-detail-panel">
        {/* Header */}
        <div className="panel-header">
          <h2>{resume.name}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="panel-content">
          {/* Decision Status */}
          <div className="decision-section">
            <p className="section-label">Decision</p>
            <p
              className="decision-badge"
              style={{ backgroundColor: getDecisionColor(resume.decision) }}
            >
              {resume.decision}
            </p>
            <p className="decision-reason">{resume.decision_reason}</p>
          </div>

          {/* Score Progress */}
          <div className="score-section">
            <p className="section-label">Match Score</p>
            <ProgressBar score={resume.score} />
          </div>

          {/* Matched Skills */}
          {resume.matched_keywords && resume.matched_keywords.length > 0 && (
            <div className="skills-section">
              <p className="section-label">Matched Skills</p>
              <div className="skills-list">
                {resume.matched_keywords.map((skill, idx) => (
                  <SkillChip key={idx} skill={skill} type="matched" />
                ))}
              </div>
            </div>
          )}

          {/* Missing Skills */}
          {resume.missing_skills && resume.missing_skills.length > 0 && (
            <div className="skills-section">
              <p className="section-label">Missing Skills</p>
              <div className="skills-list">
                {resume.missing_skills.map((skill, idx) => (
                  <SkillChip key={idx} skill={skill} type="missing" />
                ))}
              </div>
            </div>
          )}

          {/* Audit Summary */}
          {resume.audit_summary && (
            <div className="audit-section">
              <p className="section-label">Summary</p>
              <div className="audit-box">{resume.audit_summary}</div>
            </div>
          )}

          {/* Bias Flag Warning */}
          {resume.bias_flag && (
            <div className="bias-warning">
              ⚠️ Bias flag triggered - Manual review recommended
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResumeDetailPanel;
