import React, { useState } from 'react';
import { ResumeData, ProjectItem } from '../types/resume';
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Check,
  Copy,
  ExternalLink,
  GraduationCap,
  Award,
  Layers,
  ArrowRight,
  BookOpen,
  Camera,
  HeartHandshake,
  Monitor,
  CheckCircle2,
  Compass,
  Sparkles,
  Send,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveShowcaseProps {
  data: ResumeData;
  onPrint: () => void;
  onOpenAts: () => void;
  onOpenEditor: () => void;
  onOpenDocumentView: () => void;
}

export const InteractiveShowcase: React.FC<InteractiveShowcaseProps> = ({
  data,
  onPrint,
  onOpenAts,
  onOpenEditor,
  onOpenDocumentView,
}) => {
  const {
    personal,
    summary,
    heroPills,
    missionVision,
    coreCompetencies,
    experience,
    education,
    achievements,
    languages,
    featuredProjects,
  } = data;

  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Contact form state
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactMessage) return;
    const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(
      contactSubject || 'Inquiry for Tansom Akther Lima'
    )}&body=${encodeURIComponent(contactMessage)}`;
    window.location.href = mailtoUrl;
    setFormSent(true);
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    setTimeout(() => setFormSent(false), 3000);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#040e0a] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION (Identical to Sabbir.QA Screenshot Format) */}
      <section id="about" className="relative pt-12 pb-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Greeting Heading */}
              <div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                  Hi, I'm <span className="text-[#00df82]">{personal.fullName}</span>
                </h1>
                <h2 className="mt-2 text-xl sm:text-2xl font-bold text-slate-100">
                  {personal.headline}
                </h2>
              </div>

              {/* Skills / Specialization Pill Chips (Outlined rounded badges matching screenshot) */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {(heroPills || [
                  'English (E.V) Grades 1-6',
                  'Science & BGS',
                  'Lesson Planning',
                  'Presentation Pedagogy',
                  'Photo & Video Editing',
                  'Canva Design',
                ]).map((pill, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg border border-emerald-900/70 bg-emerald-950/30 px-3 py-1 text-xs font-mono text-emerald-300"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              {/* Summary Description Paragraph */}
              <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed max-w-2xl">
                {summary}
              </p>

              {/* Contact Pill Boxes (Exact match to screenshot) */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                {/* Email with copy */}
                <button
                  onClick={() => handleCopy(personal.email, 'email')}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white hover:border-[#00df82]/70 transition-all"
                  title="Click to copy email"
                >
                  <Mail className="h-3.5 w-3.5 text-[#00df82]" />
                  <span>{personal.email}</span>
                  {copiedItem === 'email' ? (
                    <Check className="h-3 w-3 text-[#00df82]" />
                  ) : (
                    <Copy className="h-3 w-3 text-slate-500" />
                  )}
                </button>

                {/* Phone */}
                <a
                  href={`tel:${personal.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3.5 py-2 text-xs font-mono text-slate-300 hover:text-white hover:border-[#00df82]/70 transition-all"
                >
                  <Phone className="h-3.5 w-3.5 text-[#00df82]" />
                  <span>{personal.phone}</span>
                </a>

                {/* Location */}
                <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-900/60 bg-emerald-950/40 px-3.5 py-2 text-xs font-mono text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-[#00df82]" />
                  <span>{personal.location}</span>
                </div>
              </div>

              {/* Action Buttons Row (Hire Me, View Projects, Read CV) */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00df82] px-6 py-3 text-sm font-bold text-[#05130e] shadow-lg shadow-emerald-500/20 hover:bg-[#00c974] transition-all hover:scale-103 whitespace-nowrap"
                >
                  <Mail className="h-4 w-4" />
                  <span>Hire Me</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => scrollTo('projects')}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-800/80 bg-emerald-950/60 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white hover:border-[#00df82] transition-colors whitespace-nowrap"
                >
                  <Layers className="h-4 w-4 text-[#00df82]" />
                  <span>View Projects</span>
                </button>

                <button
                  onClick={onOpenDocumentView}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-800/80 bg-emerald-950/60 px-5 py-3 text-sm font-medium text-slate-200 hover:text-white hover:border-[#00df82] transition-colors whitespace-nowrap"
                >
                  <BookOpen className="h-4 w-4 text-[#00df82]" />
                  <span>Academic CV (A4)</span>
                </button>
              </div>
            </div>

            {/* Right Column: Glowing Portrait Showcase Card (Exact match to screenshot) */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl border border-emerald-700/40 bg-gradient-to-b from-[#082217] via-[#05150f] to-[#030c08] p-4 shadow-2xl shadow-emerald-950/50">
                <div className="relative overflow-hidden rounded-2xl aspect-square bg-[#05130e]">
                  <img
                    src={personal.avatarUrl}
                    alt={personal.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-103"
                  />

                  {/* Bottom Text Overlay inside photo frame (matching Sabbir's card) */}
                  <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#040e0a] via-[#040e0a]/80 to-transparent">
                    <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#00df82]">
                      Assistant Teacher (E.V) & Media Support
                    </div>
                    <div className="text-xl font-bold text-white mt-0.5">
                      {personal.fullName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Pill Indicator (Matching Screenshot: ● THIS SECTION REAL AND MANUALLY UPDATED) */}
          <div className="mt-14 pt-8 border-t border-emerald-950/80 flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/80 bg-emerald-950/50 px-4 py-1.5 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-[#00df82] animate-pulse" />
              <span>THIS PROFILE IS VERIFIED AND MANUALLY UPDATED</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <button
                onClick={onOpenAts}
                className="hover:text-[#00df82] transition-colors"
              >
                ATS Verified (96%)
              </button>
              <span>·</span>
              <button
                onClick={onPrint}
                className="hover:text-[#00df82] transition-colors"
              >
                Print / Save PDF
              </button>
              <span>·</span>
              <button
                onClick={onOpenEditor}
                className="hover:text-[#00df82] transition-colors"
              >
                Customize Data
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SKILLS & COMPETENCIES SECTION */}
      <section id="skills" className="py-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-emerald-950">
            <div>
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00df82]">
                Core Capabilities
              </div>
              <h2 className="text-3xl font-extrabold text-white mt-1">Skills & Tools</h2>
            </div>
            <p className="text-xs font-mono text-slate-400">
              Proficiencies in teaching methodologies, digital tools & leadership
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreCompetencies.map((cat) => (
              <div
                key={cat.name}
                className="rounded-2xl border border-emerald-900/60 bg-[#061811]/60 p-6 space-y-4 hover:border-emerald-600/60 transition-all"
              >
                <div className="flex items-center gap-2.5 text-[#00df82]">
                  {cat.name.includes('Software') ? (
                    <Monitor className="h-5 w-5" />
                  ) : cat.name.includes('Pedagogy') ? (
                    <BookOpen className="h-5 w-5" />
                  ) : (
                    <HeartHandshake className="h-5 w-5" />
                  )}
                  <h3 className="text-base font-bold text-white">{cat.name}</h3>
                </div>

                <div className="space-y-3 pt-2">
                  {cat.skills.map((skill) => (
                    <div key={skill.name} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-slate-200">{skill.name}</span>
                        <span className="font-mono text-emerald-400">{skill.level}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-emerald-950 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-[#00df82] rounded-full"
                          style={{
                            width:
                              skill.level === 'Expert'
                                ? '95%'
                                : skill.level === 'Advanced'
                                ? '80%'
                                : '65%',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROJECTS & SHOWCASE */}
      <section id="projects" className="py-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="pb-6 border-b border-emerald-950">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00df82]">
              Interactive Classroom & School Storytelling
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Featured Projects</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setActiveProjectModal(project)}
                className="cursor-pointer group rounded-3xl border border-emerald-900/60 bg-[#061811]/60 overflow-hidden hover:border-[#00df82]/70 hover:shadow-xl hover:shadow-emerald-950/50 transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-[#05130e]/80 border border-emerald-800/80 px-3 py-1 text-xs font-mono text-emerald-300">
                    {project.period}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00df82] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-emerald-400 mt-1">{project.subtitle}</p>
                  <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-emerald-950 flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-emerald-900/80 bg-emerald-950/40 px-2 py-0.5 text-[11px] font-mono text-emerald-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WORK EXPERIENCE TIMELINE */}
      <section id="experience" className="py-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="pb-6 border-b border-emerald-950">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00df82]">
              Professional History
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Work Experience</h2>
          </div>

          <div className="mt-10 space-y-8">
            {experience.map((exp, idx) => (
              <div
                key={exp.id}
                className="rounded-3xl border border-emerald-900/60 bg-[#061811]/60 p-6 sm:p-8 hover:border-emerald-600/60 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-emerald-950 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#00df82] font-semibold">
                        0{idx + 1}.
                      </span>
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                    </div>
                    <div className="mt-1 text-sm font-medium text-slate-300">
                      {exp.company} <span className="text-emerald-600">·</span> {exp.location}
                    </div>
                  </div>
                  <div className="rounded-full bg-emerald-950 border border-emerald-800/80 px-3 py-1 text-xs font-mono text-emerald-300 shrink-0">
                    {exp.period}
                  </div>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-[#00df82] font-mono mt-0.5">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Focus tools */}
                <div className="pt-3 border-t border-emerald-950 flex flex-wrap gap-2 text-xs">
                  <span className="text-slate-400 font-mono">Focus Areas:</span>
                  {exp.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-emerald-950/60 border border-emerald-900/60 px-2 py-0.5 text-[11px] font-mono text-emerald-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MISSION & VISION SECTION (Dedicated matching Sabbir.QA) */}
      <section id="mission-vision" className="py-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="pb-6 border-b border-emerald-950">
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00df82]">
              Instructional Philosophy
            </div>
            <h2 className="text-3xl font-extrabold text-white mt-1">Mission & Vision</h2>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-3xl border border-emerald-900/60 bg-[#061811]/60 p-8 space-y-3">
              <div className="flex items-center gap-2 text-[#00df82]">
                <Compass className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Educational Mission</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {missionVision?.mission ||
                  'To empower students with robust English communication, creative self-expression, and scientific inquiry through structured pedagogical methods and interactive visual learning.'}
              </p>
            </div>

            <div className="rounded-3xl border border-emerald-900/60 bg-[#061811]/60 p-8 space-y-3">
              <div className="flex items-center gap-2 text-[#00df82]">
                <Sparkles className="h-5 w-5" />
                <h3 className="text-lg font-bold text-white">Long-term Vision</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {missionVision?.vision ||
                  'To establish a transformative classroom environment where every learner develops lasting linguistic confidence, academic excellence, and creative leadership.'}
              </p>
            </div>
          </div>

          {/* Core Values Strip */}
          {missionVision?.coreValues && (
            <div className="mt-8 rounded-2xl border border-emerald-900/60 bg-emerald-950/30 p-6">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00df82] mb-3">
                Core Pedagogical Values
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {missionVision.coreValues.map((val, vIdx) => (
                  <span
                    key={vIdx}
                    className="rounded-full border border-emerald-800/80 bg-emerald-950/80 px-3.5 py-1 text-xs font-mono text-emerald-200"
                  >
                    ✓ {val}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. EDUCATION & ACHIEVEMENTS SECTION */}
      <section id="education" className="py-20 border-b border-emerald-950/70">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-2 text-[#00df82] pb-4 border-b border-emerald-950">
                <GraduationCap className="h-5 w-5" />
                <h2 className="text-2xl font-bold text-white">Education</h2>
              </div>

              <div className="mt-8 space-y-6">
                {education.map((edu) => (
                  <div
                    key={edu.id}
                    className="rounded-2xl border border-emerald-900/60 bg-[#061811]/60 p-6 space-y-2"
                  >
                    <h3 className="text-base font-bold text-white">{edu.degree}</h3>
                    <p className="text-xs text-slate-300">{edu.institution}, {edu.location}</p>
                    <div className="flex items-center gap-3 text-xs font-mono text-emerald-400 pt-1">
                      <span>Passing: {edu.graduated}</span>
                      <span>·</span>
                      <span>GPA/CGPA: <strong className="text-white">{edu.cgpa}/{edu.maxCgpa}</strong></span>
                    </div>
                    {edu.honors && (
                      <p className="text-xs text-[#00df82] italic pt-1">{edu.honors}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div id="achievements">
              <div className="flex items-center gap-2 text-[#00df82] pb-4 border-b border-emerald-950">
                <Award className="h-5 w-5" />
                <h2 className="text-2xl font-bold text-white">Achievements & Activities</h2>
              </div>

              <div className="mt-8 space-y-5">
                {achievements?.map((ach) => (
                  <div
                    key={ach.id}
                    className="rounded-2xl border border-emerald-900/60 bg-[#061811]/60 p-6 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white">{ach.title}</h3>
                      {ach.category && (
                        <span className="rounded bg-emerald-950 border border-emerald-800/80 px-2 py-0.5 text-[10px] font-mono text-[#00df82]">
                          {ach.category}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{ach.description}</p>
                  </div>
                ))}

                {/* Languages */}
                <div className="rounded-2xl border border-emerald-900/60 bg-[#061811]/60 p-6">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00df82] mb-3">
                    Languages
                  </h4>
                  <div className="flex items-center gap-6 text-xs">
                    {languages.map((l) => (
                      <div key={l.language} className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{l.language}:</span>
                        <span className="text-slate-300">{l.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & HIRE ME SECTION */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-4xl px-6">
          <div className="rounded-3xl border border-emerald-800/70 bg-gradient-to-b from-[#061811] to-[#040e0a] p-8 sm:p-12 shadow-2xl">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-800/80 bg-emerald-950/60 px-4 py-1 text-xs font-mono text-[#00df82]">
                <Mail className="h-3.5 w-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white">Let's Connect & Collaborate</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                Open for Assistant Teacher (E.V), English Language Instructor, and School Media Support opportunities.
              </p>
            </div>

            <form onSubmit={handleSendMessage} className="mt-8 space-y-4">
              <div>
                <label className="text-xs font-mono text-slate-400">Subject / Institution Name</label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  placeholder="e.g. Teaching Opportunity / School Collaboration"
                  className="mt-1 w-full rounded-xl border border-emerald-900/80 bg-emerald-950/40 p-3 text-xs text-white placeholder-slate-500 focus:border-[#00df82] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400">Message</label>
                <textarea
                  rows={4}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Write your message or inquiry..."
                  className="mt-1 w-full rounded-xl border border-emerald-900/80 bg-emerald-950/40 p-3 text-xs text-white placeholder-slate-500 focus:border-[#00df82] focus:outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="text-xs font-mono text-slate-400">
                  Direct Line: <strong className="text-[#00df82]">{personal.phone}</strong>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#00df82] px-6 py-2.5 text-xs font-bold text-[#05130e] hover:bg-[#00c974] transition-all hover:scale-103"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>{formSent ? 'Opening Email...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-emerald-800/80 bg-[#05150f] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-3 right-3 rounded-full bg-black/80 border border-emerald-800 p-2 text-slate-300 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <div>
                <span className="text-xs font-mono text-[#00df82]">{activeProjectModal.period}</span>
                <h3 className="text-xl font-bold text-white mt-1">{activeProjectModal.title}</h3>
                <p className="text-xs text-emerald-300 mt-0.5">{activeProjectModal.subtitle}</p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeProjectModal.description}
              </p>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#00df82] mb-2">
                  Pedagogical Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {activeProjectModal.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#00df82] font-mono">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-emerald-950">
                <span className="text-xs font-mono text-slate-400">Tools: </span>
                <span className="text-xs font-mono text-slate-200">
                  {activeProjectModal.techStack.join(' · ')}
                </span>
              </div>
            </div>

            <div className="p-4 border-t border-emerald-950 bg-[#040e0a] flex justify-end">
              <button
                onClick={() => setActiveProjectModal(null)}
                className="rounded-full bg-emerald-950 border border-emerald-800 px-5 py-2 text-xs font-semibold text-white hover:bg-emerald-900 transition-colors"
              >
                Close Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
