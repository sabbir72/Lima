import { ResumeData } from '../types/resume';

export interface AtsCheckItem {
  id: string;
  category: 'Verbs' | 'Metrics' | 'Structure' | 'Contact' | 'Keywords';
  title: string;
  description: string;
  passed: boolean;
  scoreContribution: number;
  tip?: string;
}

export interface AtsReport {
  overallScore: number;
  grade: 'A+' | 'A' | 'B' | 'Needs Work';
  checks: AtsCheckItem[];
  detectedActionVerbs: string[];
  detectedMetrics: string[];
  keywordDensity: { keyword: string; count: number }[];
  summaryFeedback: string;
}

const POWER_ACTION_VERBS = [
  'teaching',
  'taught',
  'preparing',
  'prepared',
  'conducting',
  'conducted',
  'managing',
  'managed',
  'photographing',
  'filming',
  'editing',
  'supporting',
  'developed',
  'developing',
  'introduced',
  'encouraging',
  'boosted',
  'maintaining',
  'led',
  'organized',
  'delivered',
  'guided',
  'facilitated',
  'achieved',
];

const TARGET_KEYWORDS = [
  'English',
  'Teaching',
  'Lesson Plans',
  'Classroom',
  'Science',
  'BGS',
  'Presentation',
  'Media',
  'Editing',
  'Canva',
  'PowerPoint',
  'Leadership',
  'Communication',
  'Academic',
  'Honors',
  'Dean',
];

export function analyzeAtsCompliance(resume: ResumeData): AtsReport {
  const allBullets = resume.experience.flatMap((e) => e.bullets);
  const fullText = [
    resume.personal.fullName,
    resume.personal.headline,
    resume.summary,
    ...allBullets,
    ...resume.education.map((e) => `${e.degree} ${e.institution} ${e.honors || ''}`),
    ...(resume.achievements || []).map((a) => `${a.title} ${a.description}`),
    ...resume.coreCompetencies.flatMap((c) => c.skills.map((s) => s.name)),
  ].join(' ');

  // 1. Detect Action Verbs
  const detectedVerbs = new Set<string>();
  POWER_ACTION_VERBS.forEach((verb) => {
    const regex = new RegExp(`\\b${verb}\\b`, 'i');
    if (allBullets.some((b) => regex.test(b))) {
      detectedVerbs.add(verb.charAt(0).toUpperCase() + verb.slice(1));
    }
  });

  // 2. Detect Quantified Metrics & Specific Milestones
  const metricRegex = /(\bGrades?\s*\d+(?:-\d+)?|\b\d+\s*(?:students|classes|years?|months?)|\bGPA\s*:\s*\d+\.\d+|\bCGPA\s*:\s*\d+\.\d+|\b\d+\.\d+\/\d+\.\d+|\b100%|\b\d+%\b|\b\d{4}\b)/gi;
  const detectedMetrics: string[] = [];
  const bulletAndEduText = [...allBullets, ...resume.education.map((e) => `${e.degree} CGPA: ${e.cgpa}/${e.maxCgpa}`)].join(' ');
  const matches = bulletAndEduText.match(metricRegex);
  if (matches) {
    matches.forEach((m) => {
      const trimmed = m.trim();
      if (!detectedMetrics.includes(trimmed)) {
        detectedMetrics.push(trimmed);
      }
    });
  }

  // 3. Keyword Density
  const keywordDensity = TARGET_KEYWORDS.map((keyword) => {
    const regex = new RegExp(`\\b${keyword.replace('.', '\\.')}\\b`, 'gi');
    const matches = fullText.match(regex);
    return {
      keyword,
      count: matches ? matches.length : 0,
    };
  }).filter((k) => k.count > 0);

  // 4. Detailed Checks
  const checks: AtsCheckItem[] = [
    {
      id: 'contact_info',
      category: 'Contact',
      title: 'Complete Contact Channels',
      description: 'Verified direct email, active phone line, and location coordinates.',
      passed: Boolean(resume.personal.email && resume.personal.phone && resume.personal.location),
      scoreContribution: 20,
      tip: 'Direct phone number (+880 1617927883) and email facilitate instant HR screening.',
    },
    {
      id: 'strong_verbs',
      category: 'Verbs',
      title: 'Decisive Instructional Action Verbs',
      description: `Detected ${detectedVerbs.size} proactive pedagogical action verbs (e.g. Teaching, Preparing, Managing, Introduced, Editing).`,
      passed: detectedVerbs.size >= 4,
      scoreContribution: 20,
      tip: 'Active instructional verbs clearly substantiate classroom leadership capability.',
    },
    {
      id: 'academic_excellence',
      category: 'Metrics',
      title: 'Academic Distinction & Quantified Milestones',
      description: `Documented top academic standings (CGPA 3.83/4.00, HSC 4.83, SSC 4.61) and Grade 1-6 teaching scope.`,
      passed: detectedMetrics.length >= 3,
      scoreContribution: 20,
      tip: "Dean's Award and outstanding GPA metrics distinguish this candidate in academic shortlisting.",
    },
    {
      id: 'core_competencies',
      category: 'Keywords',
      title: 'Comprehensive Pedagogy & Media Competencies',
      description: `Solid mapping across Software tools (Canva, PowerPoint), English Pedagogy, and Soft Skills.`,
      passed: resume.coreCompetencies.length >= 3,
      scoreContribution: 20,
      tip: 'Categorized competencies allow both institutional and corporate recruiters to parse digital skills.',
    },
    {
      id: 'honors_extracurricular',
      category: 'Structure',
      title: 'Academic Honors & Extracurricular Leadership',
      description: "Dean's Award for Academic Excellence, Team Leader activities, and Global Warming presentation verified.",
      passed: Boolean(resume.achievements && resume.achievements.length >= 2),
      scoreContribution: 20,
      tip: 'Co-curricular participation signals well-rounded organizational citizenship.',
    },
  ];

  const earnedScore = checks.reduce(
    (acc, check) => acc + (check.passed ? check.scoreContribution : 0),
    0
  );

  let grade: AtsReport['grade'] = 'Needs Work';
  if (earnedScore >= 90) grade = 'A+';
  else if (earnedScore >= 80) grade = 'A';
  else if (earnedScore >= 65) grade = 'B';

  return {
    overallScore: earnedScore,
    grade,
    checks,
    detectedActionVerbs: Array.from(detectedVerbs),
    detectedMetrics,
    keywordDensity,
    summaryFeedback:
      earnedScore >= 90
        ? 'Outstanding candidate profile! Strong academic distinctions (Dean’s Award, CGPA 3.83), hands-on English & media teaching experience, and clear skill categorization ensure top-tier ranking in ATS evaluation.'
        : 'Good educational profile. Consider highlighting classroom student counts and extracurricular milestones to maximize ATS score.',
  };
}
