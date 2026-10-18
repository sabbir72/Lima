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

import { Skill, Experience, Education, Project, BugReport, Reference } from './types';

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
    type: 'Manual',
    description:
      'Structured interactive presentation methodology implemented across Grades 1–6 English Version classes, fostering noticeable improvements in student vocabulary retention and public speaking confidence.',
    metrics: [
      { label: 'Students Instructed', value: 'Grades 1–6' },
      { label: 'Confidence Boost', value: '100% Participation' },
      { label: 'Core Curriculum', value: 'Eng 1, 2, Sci, BGS' },
      { label: 'Outcome', value: 'Measurable Fluency' },
    ],
    assertions: [
      { name: 'Weekly Spoken English Presentation Executed', status: 'PASS', duration: '45 mins' },
      { name: 'Vocabulary & Reading Fluency Benchmark Met', status: 'PASS', duration: 'Term-1' },
      { name: 'Differentiated Lesson Plans Formulated', status: 'PASS', duration: 'Weekly' },
      { name: 'Parent-Teacher Progress Milestone Achieved', status: 'PASS', duration: 'Monthly' },
    ],
    logs: [
      { timestamp: '09:00 AM', level: 'INFO', message: 'Initialized daily English 1 & 2 interactive lesson module.' },
      { timestamp: '09:15 AM', level: 'PASS', message: 'Conducted student visual presentation round on whiteboard.' },
      { timestamp: '09:40 AM', level: 'PASS', message: 'Reviewed student creative writing worksheets with 95% pass rate.' },
      { timestamp: '10:00 AM', level: 'INFO', message: 'Logged student spoken confidence milestones in academic tracker.' },
    ],
    tags: ['English Pedagogy', 'Interactive Learning', 'Presentation Skills', 'Canva', 'PowerPoint'],
  },
  {
    id: 'proj-school-media',
    title: 'School Media Documentation & Digital Storytelling',
    type: 'Automation',
    description:
      'Spearheaded media support at New Blown An Int’l Standard School, capturing professional photography and video coverage for assemblies, academic fairs, and campus celebrations, followed by Canva social curation.',
    metrics: [
      { label: 'Media Production', value: 'Photo & Video' },
      { label: 'Event Coverage', value: 'Assemblies & Fairs' },
      { label: 'Design Tools', value: 'Canva & Video Suite' },
      { label: 'Social Reach', value: 'School Community' },
    ],
    assertions: [
      { name: 'Event Photography & Videography Captured', status: 'PASS', duration: 'High-Res' },
      { name: 'Visual Social Media Notices Published', status: 'PASS', duration: 'Same Day' },
      { name: 'Student Milestone Archive Maintained', status: 'PASS', duration: 'Quarterly' },
      { name: 'Campus Audio-Visual Calibration Verified', status: 'PASS', duration: 'Pre-Event' },
    ],
    logs: [
      { timestamp: '10:00 AM', level: 'INFO', message: 'Setup camera gear & audio equipment for annual school assembly.' },
      { timestamp: '11:30 AM', level: 'PASS', message: 'Recorded prize giving ceremony and student English speeches.' },
      { timestamp: '02:00 PM', level: 'PASS', message: 'Color graded photos and formatted Canva social flyer for school page.' },
      { timestamp: '03:30 PM', level: 'PASS', message: 'Archived media reel to school digital drive.' },
    ],
    tags: ['Digital Photography', 'Video Editing', 'Canva Design', 'Social Media Management', 'Event Media'],
  },
  {
    id: 'proj-global-warming',
    title: 'Awareness Presentation on Global Warming & Climate Action',
    type: 'API',
    description:
      'Award-recognized presentation analyzing environmental challenges, plastic reduction, greenhouse emissions, and practical school-level conservation habits.',
    metrics: [
      { label: 'Presentation Type', value: 'Certified Forum' },
      { label: 'Audience', value: 'Academic Seminar' },
      { label: 'Visual Aids', value: 'Infographics Deck' },
      { label: 'Recognition', value: 'Certified Speaker' },
    ],
    assertions: [
      { name: 'Climate Science Core Concepts Outlined', status: 'PASS', duration: '30 mins' },
      { name: 'Slide Deck Visual Infographics Delivered', status: 'PASS', duration: 'Full HD' },
      { name: 'Interactive Q&A Session Moderated', status: 'PASS', duration: '15 mins' },
      { name: 'Participation Certificate Validated', status: 'PASS', duration: 'Official' },
    ],
    logs: [
      { timestamp: '11:00 AM', level: 'INFO', message: 'Commenced presentation on Global Warming & Environmental Sustainability.' },
      { timestamp: '11:20 AM', level: 'PASS', message: 'Presented visual data on greenhouse gases and regional climate impacts.' },
      { timestamp: '11:40 AM', level: 'PASS', message: 'Conducted interactive discussion with seminar attendees.' },
      { timestamp: '12:00 PM', level: 'PASS', message: 'Awarded formal presentation certificate.' },
    ],
    tags: ['Global Warming', 'Public Speaking', 'Environmental Science', 'Presentation', 'Canva'],
  },
  {
    id: 'proj-grammar-workbook',
    title: 'Interactive Grammar & Phonics Leveled Diagnostic Series',
    type: 'Performance',
    description:
      'A structured series of worksheets and illustrative grammar drills designed in MS Word and Canva to reinforce parts of speech, vocabulary, and phonetics for primary students.',
    metrics: [
      { label: 'Grade Range', value: 'Grades 1–6' },
      { label: 'Subject Scope', value: 'Grammar & Phonics' },
      { label: 'Format', value: 'Printable Worksheets' },
      { label: 'Improvement', value: '94% Test Score' },
    ],
    assertions: [
      { name: 'Phonics & Syllable Progression Verified', status: 'PASS', duration: 'Unit 1-4' },
      { name: 'Illustrative Grammar Exercises Formatted', status: 'PASS', duration: 'Canva' },
      { name: 'Diagnostic Assessment Rubric Integrated', status: 'PASS', duration: 'Printable' },
      { name: 'Teacher Guidance Notes Attached', status: 'PASS', duration: 'Complete' },
    ],
    logs: [
      { timestamp: '08:30 AM', level: 'INFO', message: 'Drafting structured grammar lesson exercises in MS Word.' },
      { timestamp: '09:00 AM', level: 'PASS', message: 'Styled visual sentence builder flashcards in Canva.' },
      { timestamp: '09:30 AM', level: 'PASS', message: 'Administered student assessment with 94% retention rate.' },
      { timestamp: '10:00 AM', level: 'PASS', message: 'Finalized printable workbook series for Grades 1–6.' },
    ],
    tags: ['Curriculum Design', 'MS Word', 'Canva', 'Grammar Foundations', 'Diagnostic Assessment'],
  },
];

/**
 * Pedagogical and Classroom Remediation Case Studies (Interactive Tracker)
 */
export const BUG_REPORTS: BugReport[] = [
  {
    id: 'CASE-001',
    title: 'Student Hesitation & Stage Fright in Spoken English Presentations',
    project: 'Grades 3–4 English Version Spoken Curriculum',
    severity: 'Major',
    description:
      'Students displayed hesitation and anxiety when speaking at the front of the classroom, frequently pausing or reverting to native language when reading aloud.',
    stepsToReproduce: [
      'Call individual student to front podium without preparatory warmup.',
      'Prompt student with an open-ended English question without visual cues.',
      'Observe hesitation, low vocal projection, and pauses exceeding 20 seconds.',
    ],
    expectedResult:
      'Student speaks 3–4 coherent sentences with clear voice, eye contact, and basic grammatical confidence.',
    actualResult:
      'Student remains hesitant or freezes due to stage fright and fear of grammatical mistakes.',
    status: 'Resolved',
  },
  {
    id: 'CASE-002',
    title: 'Conceptual Gap between English 1 and Science (E.V) Terminology',
    project: 'Grade 5 Science & BGS English Version Instruction',
    severity: 'Minor',
    description:
      'Students memorized complex scientific terms (e.g., ecosystem, photosynthesis) phonetically without comprehending the underlying concepts in English.',
    stepsToReproduce: [
      'Assign standard textbook paragraph on plant biology to read.',
      'Ask open-ended application questions on plant energy cycles.',
      'Observe verbatim rote memorization without contextual understanding.',
    ],
    expectedResult:
      'Students explain biological cycles in simple, descriptive English sentences using visual diagrams.',
    actualResult:
      'Students quote textbook lines verbatim but fail to explain what the process represents.',
    status: 'Resolved',
  },
  {
    id: 'CASE-003',
    title: 'School Assembly Projector Aspect Ratio & Audio Sync Calibration',
    project: 'Campus Media Support & Audio-Visual Setup',
    severity: 'Minor',
    description:
      'Annual cultural program video presentation displayed stretched on widescreen auditorium projector with uneven audio amplification.',
    stepsToReproduce: [
      'Connect media laptop HDMI output to school auditorium projector.',
      'Play 4:3 video format on a 16:9 projection screen.',
      'Transmit audio directly through public address amplifier.',
    ],
    expectedResult:
      'Video projects sharply in native 16:9 1080p resolution with normalized stereo audio levels.',
    actualResult:
      'Video appeared horizontally stretched with audio clipping during high-volume music tracks.',
    status: 'Resolved',
  },
];

/**
 * Professional references list
 */
export const PROFESSIONAL_REFERENCES: Reference[] = [
  {
    name: 'Academic Coordinator',
    role: 'English Version In-Charge',
    company: "New Blown An Int'l Standard School, Dattapara Branch",
    email: 'academics.newblown@gmail.com',
    phone: '+880 1617927883 (Contact via School Office)',
  },
  {
    name: 'Senior Faculty Member',
    role: 'Department of English',
    company: 'Uttara University, Dhaka',
    email: 'english.dept@uttarauniversity.edu.bd',
    phone: '+880 2-8919651',
  },
];
