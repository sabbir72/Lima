/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Global TypeScript Interface Definitions
 * Description : Defines profile, experience, education, project, and reference contracts.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

/**
 * Interface representing a professional skill category
 */
export interface Skill {
  category: string;
  items: string[];
}

/**
 * Interface representing a professional work experience entry
 */
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

/**
 * Interface representing an educational degree or academic background
 */
export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  location: string;
  details?: string;
}

/**
 * Interface representing an education, media, or curriculum portfolio project
 */
export interface Project {
  id: string;
  title: string;
  type: 'Teaching' | 'Media' | 'Presentation' | 'Curriculum';
  description: string;
  image?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  tags: string[];
  link?: string;
}

/**
 * Interface representing professional reference contacts
 */
export interface Reference {
  id?: string;
  name: string;
  role: string;
  company: string;
  email: string;
  phone: string;
  quote?: string;
}
