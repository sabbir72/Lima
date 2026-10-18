import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Mail, Phone, Building2, Copy, Check, Users, Sparkles } from 'lucide-react';
import { EDUCATION_HISTORY, PROFESSIONAL_REFERENCES } from '../data';
import { getStoredReferences, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStore';
import { Reference } from '../types';

export default function EducationAndReferences() {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [references, setReferences] = useState<Reference[]>(() => getStoredReferences());

  useEffect(() => {
    const syncReferences = () => setReferences(getStoredReferences());
    syncReferences();
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, syncReferences);
    return () => window.removeEventListener(PORTFOLIO_UPDATED_EVENT, syncReferences);
  }, []);

  const ref = references[0] || PROFESSIONAL_REFERENCES[0];

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const achievements = [
    {
      title: "Dean's Award for Academic Excellence",
      organization: 'Uttara University, Dhaka',
      description:
        'Awarded for outstanding academic performance during the undergraduate BA (Hons) program while consistently maintaining a strong academic record (CGPA: 3.83/4.00).',
    },
    {
      title: 'Team Leader & Group Academic Projects',
      organization: 'Academic & Seminar Activities',
      description:
        'Actively participated as a leader in group presentations, classroom seminars, and collaborative academic research discussions.',
    },
    {
      title: 'Awareness Presentation on Global Warming',
      organization: 'Environmental Awareness Forum',
      description:
        'Certified participant delivering an impactful awareness presentation analyzing climate change challenges and practical environmental sustainability.',
    },
  ];

  return (
    <section
      id="education"
      className="py-24 bg-[var(--color-dark-bg,#243544)] text-[#F3F4F6] px-4 sm:px-6 border-t border-white/10 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Education & Academic Record (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest uppercase mb-1">
                ACADEMIC CREDENTIALS
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Education & Qualifications
              </h2>
            </div>

            <div className="space-y-4">
              {EDUCATION_HISTORY.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-[var(--color-dark-card,#2E4355)] p-7 rounded-2xl border border-white/10 relative group hover:border-[var(--color-accent)]/50 transition-all shadow-lg"
                >
                  <div className="absolute top-7 right-7 text-[#9CA3AF] group-hover:text-[var(--color-accent)] transition-colors">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[var(--color-accent)] bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 px-3 py-1 rounded-full">
                    {edu.period}
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-white mt-4">
                    {edu.degree}
                  </h3>

                  <p className="text-sm font-semibold text-[#D1D5DB] mt-1 font-mono">
                    {edu.institution}
                  </p>
                  <p className="text-xs font-mono text-[#9CA3AF] mt-1">{edu.location}</p>
                  {edu.details && (
                    <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed mt-3 pt-3 border-t border-white/10 font-light">
                      {edu.details}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Reference (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest uppercase mb-1">
                ENDORSEMENT
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Professional Reference
              </h2>
            </div>

            <div className="bg-[var(--color-dark-card,#2E4355)] p-7 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-all shadow-lg">
              <Building2 className="absolute right-4 bottom-4 w-36 h-36 text-white/5 pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-xl text-white">{ref.name}</h3>
                  <p className="text-sm font-semibold font-mono text-[var(--color-accent)]">
                    {ref.role}
                  </p>
                  <p className="text-xs font-mono text-[#9CA3AF]">{ref.company}</p>
                </div>

                <p className="text-[#D1D5DB] text-xs sm:text-sm leading-relaxed italic font-light">
                  {ref.quote || 'Tansom demonstrates exceptional pedagogical dedication, strong classroom leadership, and brings creative presentation and digital media techniques that engage young learners consistently.'}
                </p>

                {/* Contact details with quick copy */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  {/* Email */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs hover:border-[var(--color-accent)]/50 transition-colors">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                      <span className="text-[#F3F4F6] truncate font-mono select-all">
                        {ref.email}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(ref.email, 'email')}
                      className="p-1.5 text-[#9CA3AF] hover:text-[var(--color-accent)] hover:bg-white/10 rounded-lg transition-colors shrink-0"
                      title="Copy email to clipboard"
                    >
                      {copiedField === 'email' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs hover:border-[var(--color-accent)]/50 transition-colors">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                      <span className="text-[#F3F4F6] truncate font-mono select-all">
                        {ref.phone}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy(ref.phone, 'phone')}
                      className="p-1.5 text-[#9CA3AF] hover:text-[var(--color-accent)] hover:bg-white/10 rounded-lg transition-colors shrink-0"
                      title="Copy phone to clipboard"
                    >
                      {copiedField === 'phone' ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Extracurricular Activities Row */}
        <div id="achievements" className="pt-8 border-t border-white/10 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Honors & Co-Curricular</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-white">
              Achievements & Extracurricular Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((ach, idx) => (
              <div
                key={idx}
                className="bg-[var(--color-dark-card,#2E4355)] p-6 rounded-2xl border border-white/10 hover:border-[var(--color-accent)]/40 transition-all space-y-3 shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--color-accent)]">
                    0{idx + 1}.
                  </span>
                  <span className="text-[10px] font-mono text-[#9CA3AF] bg-white/5 px-2 py-0.5 rounded">
                    {ach.organization}
                  </span>
                </div>
                <h4 className="font-bold text-white text-sm sm:text-base">{ach.title}</h4>
                <p className="text-xs text-[#D1D5DB] leading-relaxed font-light">
                  {ach.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
