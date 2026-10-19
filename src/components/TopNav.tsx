import React from 'react';
import { ShieldCheck, Mail, Phone, Printer } from 'lucide-react';

interface TopNavProps {
  onPrint: () => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenContactModal?: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  onPrint,
  activeNav,
  setActiveNav,
  onNavigateSection,
  onOpenContactModal,
}) => {
  const handleNavClick = (sectionId: string) => {
    setActiveNav(sectionId);
    onNavigateSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-950/80 bg-[#05130e]/95 backdrop-blur-md no-print">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('about')}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-950/80 border border-emerald-700/50 text-[#00df82] shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            T.A<span className="text-[#00df82]"> Lima</span>
          </span>
        </button>

        {/* Center Navigation Links (Matching Screenshot) */}
        <nav className="hidden xl:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'about' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleNavClick('skills')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'skills' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Skills
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'projects' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick('experience')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'experience' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Experience
          </button>
          <button
            onClick={() => handleNavClick('mission-vision')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'mission-vision' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Mission & Vision
          </button>
          <button
            onClick={() => handleNavClick('education')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'education' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Education
          </button>
          <button
            onClick={() => handleNavClick('achievements')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'achievements' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Achievements
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors whitespace-nowrap hover:text-[#00df82] ${
              activeNav === 'contact' ? 'text-[#00df82] font-semibold' : ''
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons & Hire Me Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="tel:+8801617927883"
            title="Call Tansom"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-900/60 text-slate-300 hover:text-[#00df82] hover:border-emerald-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
          </a>
          <a
            href="mailto:limatansom89@gmail.com"
            title="Email Tansom"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/60 border border-emerald-900/60 text-slate-300 hover:text-[#00df82] hover:border-emerald-600 transition-colors"
          >
            <Mail className="h-4 w-4" />
          </a>

          <button
            onClick={onPrint}
            title="Download PDF CV"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:border-[#00df82] transition-colors"
          >
            <Printer className="h-3.5 w-3.5 text-[#00df82]" />
            <span>PDF CV</span>
          </button>

          <button
            onClick={() => {
              if (onOpenContactModal) {
                onOpenContactModal();
              } else {
                handleNavClick('contact');
              }
            }}
            className="inline-flex items-center gap-2 rounded-full bg-[#00df82] px-4 py-2 text-xs font-bold text-[#05130e] shadow-lg shadow-emerald-500/20 hover:bg-[#00c974] transition-all hover:scale-103 whitespace-nowrap"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Hire Me</span>
          </button>
        </div>
      </div>
    </header>
  );
};
