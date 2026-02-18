import React from 'react';
import './SkillChip.css';

function SkillChip({ skill, type }) {
  const isMatched = type === 'matched';
  
  return (
    <span className={`skill-chip skill-chip-${type}`}>
      {isMatched ? '✓' : '✕'} {skill}
    </span>
  );
}

export default SkillChip;
