// Utility function to extract and infer information from job description
function extractJDInsights(jobDescription) {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return null;
  }

  const text = jobDescription.toLowerCase();
  
  // Extract role summary - look for role keywords
  const roleKeywords = {
    'frontend': 'Frontend Developer',
    'backend': 'Backend Developer',
    'fullstack': 'Full-stack Developer',
    'full-stack': 'Full-stack Developer',
    'mobile': 'Mobile Developer',
    'android': 'Android Developer',
    'ios': 'iOS Developer',
    'flutter': 'Flutter Developer',
    'react': 'React Developer',
    'data scientist': 'Data Scientist',
    'devops': 'DevOps Engineer',
    'qa': 'QA Engineer',
    'ml engineer': 'ML Engineer',
  };

  let roleSummary = 'Software Developer';
  for (const [keyword, role] of Object.entries(roleKeywords)) {
    if (text.includes(keyword)) {
      roleSummary = role;
      break;
    }
  }

  // Core skills - high-priority keywords
  const coreSkillPatterns = [
    'flutter', 'dart', 'react', 'vue', 'angular', 'node', 'python', 'java', 'go', 'rust',
    'firebase', 'mongodb', 'postgresql', 'mysql', 'aws', 'gcp', 'azure',
    'git', 'docker', 'kubernetes', 'graphql', 'rest', 'api',
    'android', 'ios', 'swift', 'kotlin', 'javascript', 'typescript',
    'sql', 'nosql', 'redis', 'elasticsearch', 'rabbitmq', 'kafka',
  ];

  const coreSkills = [];
  const foundSkillsSet = new Set();

  for (const skill of coreSkillPatterns) {
    if (text.includes(skill) && !foundSkillsSet.has(skill)) {
      coreSkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
      foundSkillsSet.add(skill);
    }
  }

  // Secondary skills - nice-to-have patterns
  const secondarySkillPatterns = [
    'performance optimization', 'testing', 'ci/cd', 'agile', 'scrum',
    'ui/ux', 'responsive design', 'accessibility', 'seo', 'analytics',
    'microservices', 'caching', 'debugging', 'documentation', 'mentoring',
  ];

  const secondarySkills = [];
  for (const skill of secondarySkillPatterns) {
    if (text.includes(skill)) {
      secondarySkills.push(skill.charAt(0).toUpperCase() + skill.slice(1));
    }
  }

  // Infer experience level
  let experienceLevel = 'Intermediate';
  if (
    text.includes('senior') ||
    text.includes('principal') ||
    text.includes('lead') ||
    text.includes('architect')
  ) {
    experienceLevel = 'Advanced';
  } else if (
    text.includes('junior') ||
    text.includes('entry') ||
    text.includes('fresher') ||
    text.includes('graduate')
  ) {
    experienceLevel = 'Entry-level';
  }

  return {
    roleSummary: `${roleSummary}${
      coreSkills.length > 0
        ? ` with expertise in ${coreSkills.slice(0, 3).join(', ')}`
        : ''
    }`,
    coreSkills: coreSkills.slice(0, 6),
    secondarySkills: secondarySkills.slice(0, 4),
    experienceLevel,
  };
}

export default extractJDInsights;
