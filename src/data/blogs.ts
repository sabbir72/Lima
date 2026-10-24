export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  coverImage: string;
  publishDate: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  status?: 'Published' | 'Draft';
  inlineImages?: Record<string, string>;
  author: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
  };
}

export const BLOG_CATEGORIES = [
  'All',
  'English Pedagogy',
  'Educational Media',
  'Lesson Design',
  'Classroom Leadership',
  'Academic Growth',
];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Fostering Student Confidence Through Interactive English Presentations',
    slug: 'interactive-english-presentations-confidence',
    category: 'English Pedagogy',
    description:
      'How structured presentation methods in elementary English education transform passive grammar memorization into enthusiastic self-expression and spoken fluency.',
    publishDate: 'August 14, 2026',
    readingTime: '5 min read',
    tags: ['English Pedagogy', 'Classroom Presentation', 'Student Confidence', 'Spoken English'],
    featured: true,
    coverImage: '/images/showcase_interactive_classroom.jpg',
    author: {
      name: 'Tansom Akther Lima',
      role: 'Assistant Teacher (E.V) & Media Support Specialist',
      avatar: '/images/lima.jpeg',
      bio: 'BA (Hons) in English, Dean’s Award recipient, and Assistant Teacher (E.V) specializing in interactive classroom pedagogy and school digital media.',
    },
    content: `# Fostering Student Confidence Through Interactive English Presentations

In traditional language classrooms, English is often treated purely as an exam subject—memorizing grammatical formulas, filling in blanks, and silent reading. However, true language acquisition occurs when learners actively communicate their own thoughts with confidence.

During my teaching tenure at **Merit School** and **New Blown An Int’l Standard School**, I pioneered an interactive student presentation methodology tailored for Grades 1–6 English Version students.

---

## 1. Moving from Passive to Active Spoken English

Elementary learners often hesitate to speak English due to fear of making grammatical errors in front of their peers. To break this barrier:

- **Low-Stakes Show-and-Tell**: Students begin by introducing a favourite toy, drawing, or storybook in 2–3 simple sentences.
- **Visual Cue Cards**: Using Canva-designed flashcards that prompt sentence starters (*"Today I want to share...", "In my opinion..."*).
- **Celebratory Peer Culture**: Establishing a classroom norm where applause follows every spoken effort, regardless of minor grammatical flaws.

---

## 2. The Multi-Sensory Approach: Combining PowerPoint & Visual Props

Children absorb concepts exponentially faster when visual stimuli accompany spoken words. By integrating colorful PowerPoint slides and interactive board prompts:

- Students connect abstract vocabulary (*e.g., habitat, photosynthesis, historical chronology*) with concrete imagery.
- Presentation turns become exciting classroom milestones rather than stressful examinations.

---

## 3. Measurable Outcomes

Within just one academic term of implementing weekly presentation sessions:

1. **Self-Expression**: 85% of previously hesitant students voluntarily raised hands to lead morning discussions.
2. **Vocabulary Retention**: Spoken vocabulary scores improved markedly on mid-term evaluations.
3. **Collaborative Teamwork**: Students learned active listening, courteous turn-taking, and peer encouragement.

Teaching English is not merely about rules; it is about providing young minds with a voice to express their dreams to the world.`,
  },
  {
    id: '2',
    title: 'School Media Documentation: Capturing Classroom Milestones with Creative Photography',
    slug: 'school-media-documentation-storytelling',
    category: 'Educational Media',
    description:
      'A practical guide to educational photography, event recording, and creative social media curation for modern international-standard schools.',
    publishDate: 'July 28, 2026',
    readingTime: '6 min read',
    tags: ['School Media', 'Digital Storytelling', 'Educational Photography', 'Canva Design'],
    featured: false,
    coverImage: '/images/showcase_school_media.jpg',
    author: {
      name: 'Tansom Akther Lima',
      role: 'Assistant Teacher (E.V) & Media Support Specialist',
      avatar: '/images/lima.jpeg',
      bio: 'BA (Hons) in English, Dean’s Award recipient, and Assistant Teacher (E.V) specializing in interactive classroom pedagogy and school digital media.',
    },
    content: `# School Media Documentation: Capturing Classroom Milestones with Creative Photography

Behind every thriving school is a vibrant community of curious learners, passionate educators, and proud parents. In modern educational institutions, **media support is the bridge that connects daily classroom miracles with the broader community**.

At **New Blown An Int’l Standard School**, managing media support alongside classroom teaching has taught me how intentional documentation elevates school pride and engagement.

---

## 1. Principles of Respectful Educational Photography

- **Candid Over Staged**: The most touching school photos are not students rigidly smiling at a camera—they are authentic moments of a child solving a math puzzle, collaborating on an art project, or receiving a merit certificate.
- **Natural Light First**: Classrooms illuminated with soft daylight produce welcoming, authentic portraits that reflect the warmth of the learning environment.
- **Safety & Dignity**: Always adhering to student privacy protocols and ensuring every child is portrayed with dignity and respect.

---

## 2. Video Storytelling for Seasonal Assemblies & Science Fairs

Video brings school memories alive. Key techniques:

- **B-Roll Captures**: Short 3-second clips of students arranging experiment test tubes, teachers guiding handcrafts, and parents applauding.
- **Crisp Audio**: Ensuring school anthems and student speeches are recorded clearly without wind distortion.
- **Dynamic Pacing**: Editing highlight reels under 90 seconds for optimal engagement on school social channels.

---

## 3. Curation via Canva & Social Channels

A great photograph achieves its full potential when paired with tasteful typography and thoughtful captions. Using Canva, I create uniform branded templates for:

- Weekly student achievement highlights
- Seasonal school event notices
- Holiday greetings and academic announcements

Through disciplined documentation, we preserve precious milestones that students and families will cherish for a lifetime.`,
  },
  {
    id: '3',
    title: 'The Art of Lesson Planning: Designing Differentiated Instruction for Grades 1–6',
    slug: 'lesson-planning-differentiated-instruction',
    category: 'Lesson Design',
    description:
      'Essential strategies for designing flexible lesson plans that cater to diverse learning paces across English 1, 2, Science, and Bangladesh & Global Studies (BGS).',
    publishDate: 'June 15, 2026',
    readingTime: '5 min read',
    tags: ['Lesson Planning', 'Differentiated Learning', 'Classroom Leadership', 'Curriculum'],
    featured: false,
    coverImage: '/images/showcase_interactive_classroom.jpg',
    author: {
      name: 'Tansom Akther Lima',
      role: 'Assistant Teacher (E.V) & Media Support Specialist',
      avatar: '/images/lima.jpeg',
      bio: 'BA (Hons) in English, Dean’s Award recipient, and Assistant Teacher (E.V) specializing in interactive classroom pedagogy and school digital media.',
    },
    content: `# The Art of Lesson Planning: Designing Differentiated Instruction for Grades 1–6

A well-crafted lesson plan is a teacher’s compass. It ensures every minute of the 45-minute class period serves an intentional pedagogical purpose, while remaining flexible enough to adapt when a student needs extra guidance.

---

## The 4-Stage Classroom Arc

1. **The 5-Minute Hook**: A riddle, an intriguing photograph, or a quick question that sparks immediate curiosity.
2. **Concept Exploration (15 mins)**: Direct instruction using dual-channel delivery—spoken explanation paired with board diagrams or slides.
3. **Active Student Application (15 mins)**: Pair work, worksheets, or spoken drills where students apply the new concept hands-on.
4. **Summary & Reflection (10 mins)**: Exit tickets or quick student summaries: *"What was the most exciting thing we learned today?"*

---

## Differentiating for Diverse Learners

In any classroom of 25–30 students, children learn at different speeds:

- **Auditory Learners**: Benefit from rhythmic grammar chants and teacher read-alouds.
- **Visual Learners**: Excel when instructions are color-coded with highlighters and charts.
- **Kinesthetic Learners**: Master science and BGS through map-pointing and classroom demonstrations.

When a teacher plans with intentionality and empathy, no student is left behind.`,
  },
];

export const BLOG_POSTS = DEFAULT_BLOG_POSTS;

