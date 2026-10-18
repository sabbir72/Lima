import React from 'react';
import { ResumeData, ResumeTheme } from '../types/resume';
import { Mail, Phone, MapPin, Award, CheckCircle } from 'lucide-react';

interface ResumeDocumentProps {
  data: ResumeData;
  theme: ResumeTheme;
}

export const ResumeDocument: React.FC<ResumeDocumentProps> = ({ data, theme }) => {
  const { personal, summary, coreCompetencies, experience, education, achievements, languages } = data;

  // Theme-specific styling classes
  const getThemeClasses = () => {
    switch (theme) {
      case 'swiss':
        return {
          wrapper: 'bg-[#faf9f6] text-stone-900 border-stone-200 shadow-xl font-sans',
          header: 'border-b border-stone-300 pb-5',
          titleFont: 'font-serif-title tracking-normal text-3xl font-bold text-stone-950',
          roleFont: 'text-stone-700 font-medium text-sm tracking-wide',
          sectionHeading: 'font-serif-title text-base font-bold uppercase tracking-wider text-stone-900 border-b border-stone-300 pb-1 mt-5 mb-2.5',
          accentText: 'text-stone-800',
          bulletColor: 'text-stone-700',
          metaText: 'text-stone-500 text-xs',
        };
      case 'silicon':
        return {
          wrapper: 'bg-white text-slate-900 border-slate-200 shadow-xl font-sans',
          header: 'border-b border-slate-200 pb-5',
          titleFont: 'text-2xl font-extrabold tracking-tight text-slate-950',
          roleFont: 'text-teal-700 font-mono text-xs uppercase tracking-wider font-semibold',
          sectionHeading: 'text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-200 pb-1 mt-5 mb-2.5',
          accentText: 'text-teal-700',
          bulletColor: 'text-slate-700',
          metaText: 'text-slate-500 text-xs font-mono',
        };
      case 'ats_classic':
        return {
          wrapper: 'bg-white text-black border-none shadow-none font-sans',
          header: 'border-b-2 border-black pb-3 text-center',
          titleFont: 'text-2xl font-bold tracking-tight text-black uppercase',
          roleFont: 'text-black font-semibold text-sm',
          sectionHeading: 'text-sm font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mt-4 mb-2',
          accentText: 'text-black',
          bulletColor: 'text-black',
          metaText: 'text-black text-xs',
        };
      case 'executive':
      default:
        return {
          wrapper: 'bg-white text-slate-900 border-slate-200 shadow-xl font-sans',
          header: 'border-b border-slate-200 pb-5',
          titleFont: 'text-2xl font-bold tracking-tight text-slate-950',
          roleFont: 'text-emerald-700 font-semibold text-sm tracking-tight',
          sectionHeading: 'text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mt-5 mb-2.5',
          accentText: 'text-emerald-700',
          bulletColor: 'text-slate-700',
          metaText: 'text-slate-500 text-xs',
        };
    }
  };

  const style = getThemeClasses();

  return (
    <div className="flex justify-center p-4 sm:p-8 no-print:bg-slate-900/50 min-h-screen">
      {/* A4 Document Sheet */}
      <div
        id="resume-document-content"
        className={`w-full max-w-[850px] p-8 sm:p-12 print-container ${style.wrapper} transition-all`}
        style={{ minHeight: '1100px' }}
      >
        {/* Header */}
        <header className={`${style.header} page-break-avoid`}>
          <div className={theme === 'ats_classic' ? 'text-center' : 'flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'}>
            <div>
              <h1 className={style.titleFont}>{personal.fullName}</h1>
              <p className={`${style.roleFont} mt-1`}>{personal.headline}</p>
            </div>

            {/* Quick Contact Line */}
            <div
              className={`flex flex-wrap gap-x-4 gap-y-1 text-xs ${style.metaText} ${
                theme === 'ats_classic' ? 'justify-center mt-2' : 'sm:text-right mt-2 sm:mt-0'
              }`}
            >
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3 no-print" />
                <span>{personal.location}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3 no-print" />
                <span>{personal.phone}</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3 no-print" />
                <a href={`mailto:${personal.email}`} className="hover:underline">
                  {personal.email}
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="page-break-avoid">
          <h2 className={style.sectionHeading}>Professional Summary</h2>
          <p className={`text-xs sm:text-[13px] leading-relaxed ${style.bulletColor}`}>
            {summary}
          </p>
        </section>

        {/* Work Experience */}
        <section>
          <h2 className={style.sectionHeading}>Work Experience</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-slate-950">{exp.role}</h3>
                    <div className="text-xs font-medium text-slate-700">
                      {exp.company} <span className="text-slate-400">·</span> {exp.location}
                    </div>
                  </div>
                  <div className={`text-xs ${style.metaText} font-medium`}>{exp.period}</div>
                </div>

                {/* Bullets */}
                <ul className="mt-2 space-y-1 list-disc list-outside pl-4 text-xs sm:text-[12px] leading-relaxed">
                  {exp.bullets.map((bullet, idx) => (
                    <li key={idx} className={style.bulletColor}>
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* Key Skills/Tools for this role */}
                {exp.techStack && exp.techStack.length > 0 && (
                  <div className="mt-1.5 text-[11px] text-slate-600">
                    <span className="font-semibold text-slate-800">Focus Areas & Tools: </span>
                    <span>{exp.techStack.join(' · ')}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="page-break-avoid">
          <h2 className={style.sectionHeading}>Education</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                <div>
                  <div className="font-bold text-slate-950 text-xs sm:text-[13px]">{edu.degree}</div>
                  <div className="text-slate-700 font-medium">
                    {edu.institution}, {edu.location}
                  </div>
                  {edu.honors && (
                    <div className="text-[11px] text-slate-600 italic mt-0.5">
                      {edu.honors}
                    </div>
                  )}
                </div>
                <div className={`text-xs ${style.metaText} font-medium sm:text-right shrink-0`}>
                  <div>{edu.graduated}</div>
                  <div>
                    GPA/CGPA: <strong className="text-slate-900 tabular-nums">{edu.cgpa}/{edu.maxCgpa}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills & Soft Skills */}
        <section className="page-break-avoid">
          <h2 className={style.sectionHeading}>Technical Skills & Core Competencies</h2>
          <div className="space-y-2 text-xs">
            {coreCompetencies.map((cat) => (
              <div key={cat.name} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-semibold text-slate-900 shrink-0 min-w-[170px]">
                  {cat.name}:
                </span>
                <span className={style.bulletColor}>
                  {cat.skills.map((s) => s.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements & Extracurricular Activities */}
        {achievements && achievements.length > 0 && (
          <section className="page-break-avoid">
            <h2 className={style.sectionHeading}>Achievements & Extracurricular Activities</h2>
            <div className="space-y-2 text-xs">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex items-start gap-2">
                  <span className="text-slate-900 font-bold shrink-0 mt-0.5">•</span>
                  <div>
                    <span className="font-bold text-slate-950">{ach.title}: </span>
                    <span className={style.bulletColor}>{ach.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        <section className="page-break-avoid">
          <h2 className={style.sectionHeading}>Languages</h2>
          <div className="flex items-center gap-6 text-xs text-slate-800">
            {languages.map((lang) => (
              <div key={lang.language} className="flex items-center gap-1.5">
                <span className="font-semibold text-slate-950">{lang.language}:</span>
                <span className="text-slate-600">{lang.proficiency}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
