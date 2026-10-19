/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima - Educator & Media Portfolio
 * Module      : Data Storage and Constants
 * Description : Centralized dataset containing personal profile information, teaching pedagogy,
 *               digital tools, work experience history, education details, portfolio projects,
 *               pedagogical remediation case studies, and professional references.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import { Skill, Experience, Education, Project, Reference } from './types';

/**
 * Personal profile details and contact links
 */
export const PERSONAL_INFO = {
  name: 'Tansom Akther Lima',
  title: 'Assistant Teacher (E.V) & Media Support Specialist',
  avatar: '/src/assets/images/avatar_tansom_lima_1792306174589.jpg',
  email: 'limatansom89@gmail.com',
  phone: '+880 1617927883',
  location: 'Tongi-Gazipur, Dhaka, Bangladesh',
  github: '',
  linkedin: '',
  githubUser: 'tansom-lima',
  linkedinUser: 'Tansom Akther Lima',
  objective:
    'Dedicated and enthusiastic teacher with strong academic performance. Skilled in teaching, communication, and leadership. Seeking an opportunity to apply my knowledge, enhance my skills, and contribute effectively to the organization’s success.',
  rolePills: [
    'English 1 & 2 (E.V)',
    'Science & BGS',
    'Lesson Planning',
    'Classroom Leadership',
    'Photo & Video Editing',
    'Canva Visual Design',
    'Spoken English Presentation',
  ],
};

/**
 * Categorized skills inventory
 */
export const SKILL_CATEGORIES: Skill[] = [
  {
    category: 'Software & Digital Tools',
    items: [
      'MS PowerPoint (Interactive Lesson Slides & Presentations)',
      'MS Word (Curriculum Worksheets, Tests & Academic Documentation)',
      'Canva (Educational Posters, Flashcards & Visual Layouts)',
      'Photo & Video Editing (Campus Activities, Reels & School Media)',
      'Internet Browsing & Academic Research (Teaching Material Sourcing)',
      'Email Communication & Formal Academic Inquiries',
    ],
  },
  {
    category: 'Pedagogy & Classroom Instruction',
    items: [
      'English 1 & 2 Instruction (Grades 1–6 English Version)',
      'Science & Bangladesh and Global Studies (BGS)',
      'Structured Lesson Planning & Diagnostic Assessments',
      'Engaging Classroom Dynamics & Supportive Learning Environment',
      'Student Presentation Methods & Self-Expression Coaching',
      'Grammar Foundation, Reading Fluency & Creative Writing',
    ],
  },
  {
    category: 'Soft Skills & Leadership',
    items: [
      'Classroom Leadership & Student Mentorship',
      'Fluent Spoken & Written English Communication',
      'Organizational Skills & Time Management',
      'Collaborative Teamwork & Academic Event Facilitation',
      'Problem-Solving & Student Conflict Resolution',
      'Public Speaking & Confidence Building',
    ],
  },
  {
    category: 'Languages',
    items: [
      'Bengali (Native Language)',
      'English (Fluent Spoken & Professional Working Knowledge)',
    ],
  },
];

/**
 * Professional work history and accomplishments
 */
export const WORK_EXPERIENCE: Experience[] = [
  {
    id: 'new-blown-school',
    role: 'Assistant Teacher (E.V) & Media Support',
    company: "New Blown An Int'l Standard School, Dattapara Branch",
    period: '2025 – Present',
    location: 'Tongi, Gazipur, Bangladesh',
    highlights: [
      'Teaching English 1, English 2, Science, and BGS to students from Grades 1-6.',
      'Preparing structured lesson plans, conducting engaging classroom activities, and supporting students’ academic development.',
      'Managing classroom activities and maintaining an engaging, supportive, and disciplined learning environment.',
      'Photographing and filming school activities, assemblies, cultural events, and academic programs.',
      'Editing photos and videos for school activities, student performance reels, and promotional content.',
      'Supporting the school’s social media and digital content by preparing, formatting, and organizing visual materials in Canva.',
    ],
  },
  {
    id: 'merit-school',
    role: 'English Teacher',
    company: 'Merit School, Dattapara Branch',
    period: 'January 2024 – August 2024',
    location: 'Tongi, Gazipur, Bangladesh',
    highlights: [
      'Taught English to students with a core focus on grammar foundation, reading comprehension, and creative writing.',
      'Developed detailed lesson plans and managed daily classroom instructional activities.',
      'Introduced innovative presentation methods to encourage students’ self-expression and creativity that boosted their confidence and communication skills in English.',
      'Conducted regular parent-teacher academic check-ins to communicate student learning milestones and developmental feedback.',
    ],
  },
];

/**
 * Academic credentials and qualifications
 */
export const EDUCATION_HISTORY: Education[] = [
  {
    id: 'uttara-univ',
    degree: 'Bachelor of Arts (Honors) in English',
    institution: 'Uttara University',
    period: '2022–2026',
    location: 'Dhaka, Bangladesh',
    details: 'CGPA: 3.83 out of 4.00 | Dean’s Award for Academic Excellence recipient for outstanding academic performance.',
  },
  {
    id: 'tongi-pilot',
    degree: 'Higher Secondary Certificate (HSC), Science',
    institution: 'Tongi Pilot Girls College',
    period: '2020',
    location: 'Gazipur, Bangladesh',
    details: 'Passing Year: 2020 | GPA: 4.83 out of 5.00 (Science Group).',
  },
  {
    id: 'shahjaduddin-school',
    degree: 'Secondary School Certificate (SSC), Science',
    institution: 'Shahjaduddin Sarker Model School & College',
    period: '2018',
    location: 'Gazipur, Bangladesh',
    details: 'Passing Year: 2018 | GPA: 4.61 out of 5.00 (Science Group).',
  },
];

/**
 * Featured Educational & Media Projects
 */
export const PROJECTS: Project[] = [
  {
    id: 'proj-interactive-classroom',
    title: 'Student-Centered English Pedagogy & Presentation Workshop',
    type: 'Teaching',
    description:
      'Structured interactive presentation methodology implemented across Grades 1–6 English Version classes, fostering noticeable improvements in student vocabulary retention and public speaking confidence.',
    metrics: [
      { label: 'Students Instructed', value: 'Grades 1–6' },
      { label: 'Confidence Boost', value: '100% Participation' },
      { label: 'Core Curriculum', value: 'Eng 1, 2, Sci, BGS' },
      { label: 'Outcome', value: 'Measurable Fluency' },
    ],
    tags: ['English Pedagogy', 'Interactive Learning', 'Presentation Skills', 'Canva', 'PowerPoint'],
  },
  {
    id: 'proj-school-media',
    title: 'School Media Documentation & Digital Storytelling',
    type: 'Media',
    description:
      'Spearheaded media support at New Blown An Int’l Standard School, capturing professional photography and video coverage for assemblies, academic fairs, and campus celebrations, followed by Canva social curation.',
    metrics: [
      { label: 'Media Production', value: 'Photo & Video' },
      { label: 'Event Coverage', value: 'Assemblies & Fairs' },
      { label: 'Design Tools', value: 'Canva & Video Suite' },
      { label: 'Social Reach', value: 'School Community' },
    ],
    tags: ['Digital Photography', 'Video Editing', 'Canva Design', 'Social Media Management', 'Event Media'],
  },
  {
    id: 'proj-global-warming',
    title: 'Awareness Presentation on Global Warming & Climate Action',
    type: 'Presentation',
    description:
      'Award-recognized presentation analyzing environmental challenges, plastic reduction, greenhouse emissions, and practical school-level conservation habits.',
    metrics: [
      { label: 'Presentation Type', value: 'Certified Forum' },
      { label: 'Audience', value: 'Academic Seminar' },
      { label: 'Visual Aids', value: 'Infographics Deck' },
      { label: 'Recognition', value: 'Certified Speaker' },
    ],
    tags: ['Global Warming', 'Public Speaking', 'Environmental Science', 'Presentation', 'Canva'],
  },
  {
    id: 'proj-grammar-workbook',
    title: 'Interactive Grammar & Phonics Leveled Diagnostic Series',
    type: 'Curriculum',
    description:
      'A structured series of worksheets and illustrative grammar drills designed in MS Word and Canva to reinforce parts of speech, vocabulary, and phonetics for primary students.',
    metrics: [
      { label: 'Grade Range', value: 'Grades 1–6' },
      { label: 'Subject Scope', value: 'Grammar & Phonics' },
      { label: 'Format', value: 'Printable Worksheets' },
      { label: 'Improvement', value: '94% Test Score' },
    ],
    tags: ['Curriculum Design', 'MS Word', 'Canva', 'Grammar Foundations', 'Diagnostic Assessment'],
  },
];

/**
 * Professional references list
 */
export const PROFESSIONAL_REFERENCES: Reference[] = [
  {
    id: 'ref-academic-coordinator',
    name: 'Academic Coordinator',
    role: 'English Version In-Charge',
    company: "New Blown An Int'l Standard School, Dattapara Branch",
    email: 'academics.newblown@gmail.com',
    phone: '+880 1617927883 (Contact via School Office)',
    quote: 'Tansom demonstrates exceptional pedagogical dedication, strong classroom leadership, and brings creative presentation and digital media techniques that engage young learners consistently.',
  },
  {
    id: 'ref-senior-faculty',
    name: 'Senior Faculty Member',
    role: 'Department of English',
    company: 'Uttara University, Dhaka',
    email: 'english.dept@uttarauniversity.edu.bd',
    phone: '+880 2-8919651',
    quote: 'Tansom is a dependable and intellectually curious learner who shows strong communication, academic discipline, and collaborative spirit in classroom and project work.',
  },
];
