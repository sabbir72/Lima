import React from 'react';
import { Target, Rocket, CheckCircle2, Compass, Sparkles, ArrowRight } from 'lucide-react';

export default function CareerVision() {
  const careerFlow = [
    { step: '01', title: 'Assistant Teacher (E.V)', type: 'active', badge: 'Current' },
    { step: '02', title: 'Media & Digital Content Specialist', type: 'active', badge: 'Active' },
    { step: '03', title: 'Lead English Curriculum Designer', type: 'next' },
    { step: '04', title: 'Pedagogical Workshop Facilitator', type: 'next' },
    { step: '05', title: 'Academic Coordinator', type: 'vision', badge: 'Goal' },
    { step: '06', title: 'School Principal & Institutional Head', type: 'vision', badge: 'Vision' },
  ];

  return (
    <section id="career-vision" className="relative py-24 bg-[var(--color-dark-bg,#080B11)] text-[#F3F4F6] overflow-hidden border-b border-white/[0.06] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 text-[var(--color-accent)] text-xs font-mono font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4 text-[var(--color-accent)]" />
            <span>Purpose & Direction</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight">
            Mission & Vision
          </h2>
          <p className="text-[#9CA3AF] text-sm sm:text-base font-light">
            Guiding educational philosophy driving my English pedagogy, classroom leadership, and instructional excellence.
          </p>
        </div>

        {/* Mission & Vision Side-by-Side Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission Card */}
          <div className="bg-[#12151C] border border-white/10 hover:border-[var(--color-accent)]/40 rounded-3xl p-8 space-y-5 transition-all duration-300 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[var(--color-accent)]/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 flex items-center justify-center text-[var(--color-accent)]">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[var(--color-accent)] uppercase tracking-wider font-bold bg-[var(--color-accent)]/10 px-3 py-1 rounded-full border border-[var(--color-accent)]/20">
                Educational Mission
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Empower Young Minds with English Fluency & Confident Self-Expression
              </h3>
              <p className="text-[#D1D5DB] text-sm leading-relaxed font-light">
                To transform primary and middle-school English education from passive rote-memorization into joyful, confident communication through student presentations, multimedia learning, and compassionate classroom leadership.
              </p>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-[#9CA3AF] font-sans border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Cultivate 100% active spoken participation across Grades 1–6 English Version classes.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span>Integrate digital storytelling and visual media into daily curriculum.</span>
              </li>
            </ul>
          </div>

          {/* Vision Card */}
          <div className="bg-[#12151C] border border-white/10 hover:border-emerald-500/40 rounded-3xl p-8 space-y-5 transition-all duration-300 relative overflow-hidden group shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Rocket className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                Long-Term Vision
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Pioneer Modern Pedagogy & Elevate Institutional Standards
              </h3>
              <p className="text-[#D1D5DB] text-sm leading-relaxed font-light">
                To evolve into an Academic Coordinator and Institutional Leader—designing curriculum frameworks that integrate bilingual fluency, environmental awareness, and digital literacy to inspire future generations.
              </p>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-[#9CA3AF] font-sans border-t border-white/5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Establish model presentation laboratories for primary English learners.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Publish educational research and conduct teacher-training workshops.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Career Progression Flow */}
        <div className="bg-[#12151C]/60 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--color-accent)]" />
              <span>Academic & Leadership Progression</span>
            </h3>
            <span className="text-xs font-mono text-[#9CA3AF]">Long-Term Growth</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {careerFlow.map((item, idx) => {
              const isActive = item.type === 'active';
              const isVision = item.type === 'vision';
              let cardStyle = 'bg-[#0B0D12]/70 border-white/10 text-gray-300';
              if (isActive) {
                cardStyle =
                  'bg-[#181C26] border-[var(--color-accent)] text-white shadow-lg ring-1 ring-[var(--color-accent)]/50';
              } else if (isVision) {
                cardStyle =
                  'bg-[#161224] border-purple-500/60 text-white shadow-lg ring-1 ring-purple-500/50';
              }

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${cardStyle}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                          isActive
                            ? 'bg-[var(--color-accent)] text-black'
                            : isVision
                            ? 'bg-purple-600 text-white'
                            : 'bg-white/10 text-gray-400'
                        }`}
                      >
                        {item.step}
                      </span>
                      {item.badge && (
                        <span
                          className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-bold ${
                            isActive
                              ? 'bg-[var(--color-accent)]/20 text-[var(--color-accent)] border-[var(--color-accent)]/30'
                              : 'bg-purple-500/20 text-purple-300 border-purple-500/30'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs font-bold leading-snug">{item.title}</h4>
                  </div>
                  {idx < careerFlow.length - 1 && (
                    <div className="hidden lg:flex justify-end mt-4">
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${
                          isActive ? 'text-[var(--color-accent)]' : 'text-gray-600'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
