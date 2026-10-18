import { ResumeData } from '../types/resume';

export function generateMarkdown(resume: ResumeData): string {
  const { personal, summary, coreCompetencies, experience, education, certifications, achievements, languages } = resume;

  const contactPieces = [
    `Email: [${personal.email}](mailto:${personal.email})`,
    `Phone: ${personal.phone}`,
    `Location: ${personal.location}`,
  ];
  if (personal.linkedin) contactPieces.push(`LinkedIn: [${personal.linkedin}](https://${personal.linkedin})`);
  if (personal.github) contactPieces.push(`GitHub: [${personal.github}](https://${personal.github})`);

  let md = `# ${personal.fullName}
**${personal.headline}**  
${contactPieces.join(' | ')}

---

## PROFESSIONAL SUMMARY
${summary}

---

## TECHNICAL & PROFESSIONAL SKILLS
${coreCompetencies
  .map((category) => `**${category.name}:** ${category.skills.map((s) => s.name).join(', ')}`)
  .join('\n\n')}

---

## WORK EXPERIENCE

${experience
  .map(
    (exp) => `### ${exp.role} — ${exp.company}
*${exp.location} | ${exp.period}*

${exp.bullets.map((bullet) => `* ${bullet}`).join('\n')}

**Key Competencies/Tools:** ${exp.techStack.join(', ')}
`
  )
  .join('\n')}

---

## EDUCATION

${education
  .map(
    (edu) => `### ${edu.degree}
*${edu.institution}, ${edu.location}* | Graduated: ${edu.graduated} | CGPA/GPA: ${edu.cgpa}/${edu.maxCgpa}
${edu.honors ? `*${edu.honors}*` : ''}
`
  )
  .join('\n')}
`;

  if (achievements && achievements.length > 0) {
    md += `---

## ACHIEVEMENTS & EXTRACURRICULAR ACTIVITIES

${achievements
  .map(
    (ach) => `* **${ach.title}**: ${ach.description}`
  )
  .join('\n\n')}
`;
  }

  md += `---

## LANGUAGES
${languages.map((lang) => `* **${lang.language}**: ${lang.proficiency}`).join(' | ')}
`;

  return md;
}

export function generatePlainText(resume: ResumeData): string {
  const { personal, summary, coreCompetencies, experience, education, achievements, languages } = resume;

  const divider = '━'.repeat(58);

  let text = `${personal.fullName.toUpperCase()}
Location: ${personal.location}
Phone: ${personal.phone} | Email: ${personal.email}

${divider}
PROFESSIONAL SUMMARY
${divider}
${summary}

${divider}
TECHNICAL SKILLS & COMPETENCIES
${divider}
${coreCompetencies
  .map((category) => `${category.name.padEnd(28)}: ${category.skills.map((s) => s.name).join(', ')}`)
  .join('\n')}

${divider}
WORK EXPERIENCE
${divider}
${experience
  .map(
    (exp) => `${exp.role}
${exp.company}, ${exp.location} | ${exp.period}

${exp.bullets.map((b) => `• ${b}`).join('\n')}
Skills/Tools: ${exp.techStack.join(', ')}
`
  )
  .join('\n')}
${divider}
EDUCATION
${divider}
${education
  .map(
    (edu) => `${edu.degree}
${edu.institution}, ${edu.location} | Graduated: ${edu.graduated} | CGPA/GPA: ${edu.cgpa}/${edu.maxCgpa}
${edu.honors || ''}`
  )
  .join('\n\n')}
`;

  if (achievements && achievements.length > 0) {
    text += `\n${divider}
ACHIEVEMENTS & EXTRACURRICULAR ACTIVITIES
${divider}
${achievements.map((a) => `• ${a.title}: ${a.description}`).join('\n\n')}
`;
  }

  text += `\n${divider}
LANGUAGES
${divider}
${languages.map((l) => `${l.language}: ${l.proficiency}`).join(' | ')}
`;

  return text;
}

export function generateJsonResume(resume: ResumeData): string {
  const jsonResumeSchema = {
    basics: {
      name: resume.personal.fullName,
      label: resume.personal.headline,
      email: resume.personal.email,
      phone: resume.personal.phone,
      location: {
        city: 'Tongi-Gazipur',
        countryCode: 'BD',
      },
      summary: resume.summary,
    },
    work: resume.experience.map((exp) => ({
      name: exp.company,
      position: exp.role,
      startDate: exp.period.split(' – ')[0] || exp.period.split(' - ')[0],
      endDate: exp.period.split(' – ')[1] || exp.period.split(' - ')[1] || 'Present',
      highlights: exp.bullets,
    })),
    education: resume.education.map((edu) => ({
      institution: edu.institution,
      area: edu.degree,
      score: `${edu.cgpa}/${edu.maxCgpa}`,
      endDate: edu.graduated,
      honors: edu.honors,
    })),
    awards: (resume.achievements || []).map((a) => ({
      title: a.title,
      summary: a.description,
    })),
    skills: resume.coreCompetencies.map((cat) => ({
      name: cat.name,
      keywords: cat.skills.map((s) => s.name),
    })),
    languages: resume.languages.map((l) => ({
      language: l.language,
      fluency: l.proficiency,
    })),
  };

  return JSON.stringify(jsonResumeSchema, null, 2);
}

export function downloadFile(filename: string, content: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
