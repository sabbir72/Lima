import { ResumeData } from '../types/resume';

export const initialResumeData: ResumeData = {
  personal: {
    fullName: 'TANSOM AKTHER LIMA',
    headline: 'Assistant Teacher (E.V) & Media Support Specialist | English Pedagogy & Digital Content',
    email: 'limatansom89@gmail.com',
    phone: '+880 1617927883',
    location: 'Tongi-Gazipur, Bangladesh',
    portfolioUrl: 'tansom-lima.edu',
    avatarUrl: '/src/assets/images/avatar_tansom_lima_1792306174589.jpg',
  },
  summary:
    'Dedicated and enthusiastic teacher with strong academic performance. Skilled in teaching, communication, and leadership. Seeking an opportunity to apply my knowledge, enhance my skills, and contribute effectively to the organization’s success.',
  heroPills: [
    'English Language (E.V)',
    'Lesson Planning & Prep',
    'Classroom Management',
    'Photo & Video Editing',
    'Canva & Digital Media',
    'Presentation-Based Learning',
  ],
  missionVision: {
    mission:
      'To empower young learners with robust English communication, creative self-expression, and conceptual clarity through structured pedagogical methods and modern visual media tools.',
    vision:
      'To foster a supportive, joyful, and disciplined academic environment where students gain unshakable confidence, linguistic fluency, and moral integrity.',
    coreValues: [
      'Academic Excellence (Dean’s Award standard)',
      'Student-Centered Pedagogy',
      'Creative Self-Expression',
      'Digital Media & Visual Learning',
      'Continuous Learning & Leadership',
    ],
  },
  coreCompetencies: [
    {
      name: 'Software & Digital Tools',
      skills: [
        { name: 'MS PowerPoint', level: 'Expert', years: 4, popular: true },
        { name: 'MS Word', level: 'Expert', years: 4, popular: true },
        { name: 'Canva Design', level: 'Expert', years: 3, popular: true },
        { name: 'Photo & Video Editing', level: 'Advanced', years: 3, popular: true },
        { name: 'Internet Browsing & Research', level: 'Expert', years: 5 },
        { name: 'Email Communication', level: 'Expert', years: 4 },
      ],
    },
    {
      name: 'Pedagogy & Classroom Skills',
      skills: [
        { name: 'English 1 & 2 Instruction', level: 'Expert', years: 3, popular: true },
        { name: 'Science & BGS Teaching', level: 'Advanced', years: 2, popular: true },
        { name: 'Lesson Planning & Prep', level: 'Expert', years: 3, popular: true },
        { name: 'Classroom Management', level: 'Expert', years: 3, popular: true },
        { name: 'Presentation-Based Learning', level: 'Expert', years: 2, popular: true },
        { name: 'Student Mentorship', level: 'Advanced', years: 3 },
      ],
    },
    {
      name: 'Soft Skills & Leadership',
      skills: [
        { name: 'Organizational Skills', level: 'Expert', years: 4, popular: true },
        { name: 'Leadership & Team Guidance', level: 'Expert', years: 3, popular: true },
        { name: 'Effective Communication', level: 'Expert', years: 4, popular: true },
        { name: 'Teamwork & Collaboration', level: 'Expert', years: 4 },
        { name: 'Problem-Solving', level: 'Advanced', years: 3 },
        { name: 'Time Management', level: 'Expert', years: 4 },
      ],
    },
  ],
  experience: [
    {
      id: 'new-blown-school',
      role: 'Assistant Teacher (E.V) & Media Support',
      company: "New Blown An Int'l Standard School, Dattapara Branch",
      location: 'Tongi, Gazipur',
      period: '2025 – Present',
      isCurrent: true,
      bullets: [
        'Teaching English 1, English 2, Science, and Bangladesh & Global Studies (BGS) to English Version students from Grades 1 to 6.',
        'Preparing structured lesson plans, conducting engaging classroom activities, and actively supporting individual students’ academic development.',
        'Managing classroom dynamics and maintaining an engaging, positive, and supportive learning environment that promotes student curiosity.',
        'Photographing and filming school activities, seasonal celebrations, cultural events, and official programs with creative attention to detail.',
        'Editing high-quality photos and videos for school promotional showcases, student project highlights, and official records.',
        'Supporting the school’s digital presence and social media channels by designing, curating, and organizing attractive visual materials.',
      ],
      metrics: [
        { label: 'Grades Instructed', value: 'Grades 1-6' },
        { label: 'Core Subjects', value: 'Eng, Sci, BGS' },
        { label: 'Media Production', value: 'Photo & Video' },
        { label: 'Digital Reach', value: 'Social Channels' },
      ],
      techStack: [
        'English (E.V)',
        'Lesson Planning',
        'MS PowerPoint',
        'Canva',
        'Video Editing',
        'Digital Photography',
        'Social Media',
      ],
    },
    {
      id: 'merit-school',
      role: 'English Teacher',
      company: 'Merit School, Dattapara Branch',
      location: 'Tongi, Gazipur',
      period: 'January 2024 – August 2024',
      isCurrent: false,
      bullets: [
        'Taught English to students with a dedicated instructional focus on fundamental grammar rules, reading fluency, and creative writing techniques.',
        'Developed customized lesson plans and managed classroom activities to ensure steady learning milestones for diverse learning paces.',
        'Introduced innovative student presentation methods to encourage self-expression and creativity, substantially boosting student confidence and spoken communication skills in English.',
      ],
      metrics: [
        { label: 'Specialization', value: 'Grammar & Writing' },
        { label: 'Methodology', value: 'Interactive Presentations' },
        { label: 'Student Impact', value: 'Boosted Confidence' },
      ],
      techStack: [
        'English Grammar',
        'Reading & Writing',
        'Student Presentations',
        'Classroom Management',
        'MS Word',
      ],
    },
  ],
  education: [
    {
      id: 'uttara-univ',
      degree: 'Bachelor of Arts (Honors) in English',
      institution: 'Uttara University',
      location: 'Dhaka, Bangladesh',
      graduated: '2022–2026',
      cgpa: '3.83',
      maxCgpa: '4.00',
      honors: "Dean's Award for Academic Excellence | High Distinction",
    },
    {
      id: 'tongi-pilot',
      degree: 'Higher Secondary Certificate (HSC), Science',
      institution: 'Tongi Pilot Girls College',
      location: 'Gazipur, Bangladesh',
      graduated: '2020',
      cgpa: '4.83',
      maxCgpa: '5.00',
      honors: 'Science Group | Excellent Academic Standing',
    },
    {
      id: 'shahjaduddin-school',
      degree: 'Secondary School Certificate (SSC), Science',
      institution: 'Shahjaduddin Sarker Model School & College',
      location: 'Gazipur, Bangladesh',
      graduated: '2018',
      cgpa: '4.61',
      maxCgpa: '5.00',
      honors: 'Science Group | Board Examination',
    },
  ],
  certifications: [
    {
      id: 'deans-award-cert',
      name: "Dean's Award for Academic Excellence",
      issuer: 'Uttara University, Dhaka',
      year: '2024',
      highlight: true,
    },
    {
      id: 'climate-cert',
      name: 'Awareness Presentation on Global Warming',
      issuer: 'Environmental & Academic Forum',
      year: '2023',
      highlight: true,
    },
  ],
  achievements: [
    {
      id: 'deans-award',
      title: "Dean's Award for Academic Excellence",
      category: 'Academic Honor',
      description:
        'Awarded for outstanding academic performance during the undergraduate BA (Hons) program while consistently maintaining a top-tier CGPA of 3.83/4.00.',
      highlight: true,
    },
    {
      id: 'team-leader',
      title: 'Team Leader & Group Academic Projects',
      category: 'Leadership',
      description:
        'Actively participated as a leader in group presentations, classroom seminars, and collaborative academic research discussions.',
      highlight: true,
    },
    {
      id: 'global-warming',
      title: 'Awareness Presentation on Global Warming',
      category: 'Public Speaking & Environmental Advocacy',
      description:
        'Certified participant delivering an impactful awareness presentation analyzing climate change challenges and practical environmental sustainability.',
      highlight: false,
    },
  ],
  languages: [
    { language: 'Bengali', proficiency: 'Native' },
    { language: 'English', proficiency: 'Fluent' },
  ],
  featuredProjects: [
    {
      id: 'interactive-classroom',
      title: 'Student-Centered English Pedagogy & Presentation Workshop',
      subtitle: 'Confidence-building methodology through classroom presentations & multimedia learning',
      description:
        'Engineered an interactive student presentation curriculum at Merit School and New Blown School. Guided Grade 1-6 students to deliver spoken presentations and express their ideas with enthusiasm, fostering noticeable improvements in English vocabulary and public confidence.',
      image: '/src/assets/images/showcase_interactive_classroom_1792306176262.jpg',
      period: '2024 – Present',
      highlights: [
        'Integrated creative visual aids and PowerPoint presentations for elementary learners',
        'Facilitated student group discussions that improved active English participation',
        'Supported differentiated instruction across English 1, 2, Science, and BGS',
      ],
      techStack: ['Interactive Pedagogy', 'Presentation Skills', 'English 1 & 2', 'Canva', 'MS PowerPoint'],
    },
    {
      id: 'school-media-hub',
      title: 'School Media Documentation & Digital Storytelling',
      subtitle: 'Capturing school life, educational milestones, and social media content creation',
      description:
        'Spearheaded media support at New Blown An Int’l Standard School, capturing professional photography and video coverage for assemblies, academic fairs, and campus celebrations. Edited visual media and designed Canva promotional materials for digital distribution.',
      image: '/src/assets/images/showcase_school_media_1792306175676.jpg',
      period: '2025 – Present',
      highlights: [
        'Photographed and recorded school milestones, seasonal celebrations, and academic programs',
        'Curated and edited promotional visual content for the institution’s social media channels',
        'Designed creative visual notices and event materials using Canva and photo editing suites',
      ],
      techStack: ['Digital Photography', 'Video Editing', 'Canva Design', 'Social Media', 'Content Curation'],
    },
  ],
};
