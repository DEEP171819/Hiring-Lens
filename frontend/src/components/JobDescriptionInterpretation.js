import React from 'react';
import extractJDInsights from '../utils/extractJDInsights';
import './JobDescriptionInterpretation.css';

function JobDescriptionInterpretation({ jobDescription }) {
  const insights = extractJDInsights(jobDescription);

  if (!insights) {
    return (
      <div className="jd-interpretation">
        <div className="jd-empty-state">
          <p className="empty-icon">📋</p>
          <p className="empty-text">Add a job description to see interpreted requirements</p>
        </div>
      </div>
    );
  }

  return (
    <div className="jd-interpretation">
      <div className="jd-header">
        <h3>📋 JD Interpretation</h3>
        <p className="jd-subheader">What we're looking for</p>
      </div>

      {/* Role Summary */}
      <div className="jd-section">
        <div className="section-icon">🎯</div>
        <div className="section-content">
          <h4 className="section-title">Role Summary</h4>
          <p className="role-summary">{insights.roleSummary}</p>
        </div>
      </div>

      {/* Core Skills */}
      {insights.coreSkills.length > 0 && (
        <div className="jd-section">
          <div className="section-icon">⭐</div>
          <div className="section-content">
            <h4 className="section-title">Core Skills Required</h4>
            <div className="skills-container">
              {insights.coreSkills.map((skill, idx) => (
                <span key={idx} className="skill-chip-core">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Secondary Skills */}
      {insights.secondarySkills.length > 0 && (
        <div className="jd-section">
          <div className="section-icon">✨</div>
          <div className="section-content">
            <h4 className="section-title">Nice-to-Have Skills</h4>
            <div className="skills-container">
              {insights.secondarySkills.map((skill, idx) => (
                <span key={idx} className="skill-chip-secondary">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Experience Level */}
      <div className="jd-section">
        <div className="section-icon">📈</div>
        <div className="section-content">
          <h4 className="section-title">Experience Level</h4>
          <div className={`experience-badge experience-${insights.experienceLevel.toLowerCase().replace(' ', '-')}`}>
            {insights.experienceLevel}
          </div>
        </div>
      </div>

      {/* Matching Strategy */}
      <div className="jd-section jd-section-last">
        <div className="section-icon">🔍</div>
        <div className="section-content">
          <h4 className="section-title">Evaluation Method</h4>
          <p className="matching-strategy">
            Resumes are matched based on semantic skill overlap, project relevance, and core technology alignment.
          </p>
        </div>
      </div>
    </div>
  );
}

export default JobDescriptionInterpretation;
