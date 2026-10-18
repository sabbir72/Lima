export interface SkillCategory {
  name: string;
  skills: {
    name: string;
    level: 'Expert' | 'Advanced' | 'Intermediate';
    years: number;
    popular?: boolean;
  }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  isCurrent?: boolean;
  bullets: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduated: string;
  cgpa: string;
  maxCgpa: string;
  honors?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  credentialId?: string;
  verificationUrl?: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  period: string;
  highlights: string[];
  techStack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export interface LanguageItem {
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational';
}

export interface AchievementItem {
  id: string;
  title: string;
  category?: string;
  description: string;
  highlight?: boolean;
}

export interface MissionVisionItem {
  mission: string;
  vision: string;
  coreValues: string[];
}

export interface ResumeData {
  personal: {
    fullName: string;
    headline: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolioUrl?: string;
    avatarUrl: string;
  };
  summary: string;
  heroPills?: string[];
  missionVision?: MissionVisionItem;
  coreCompetencies: SkillCategory[];
  experience: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  achievements?: AchievementItem[];
  languages: LanguageItem[];
  featuredProjects: ProjectItem[];
}

export type ResumeTheme = 'executive' | 'swiss' | 'silicon' | 'ats_classic';
export type ViewMode = 'showcase' | 'document';
