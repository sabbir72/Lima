import { useState, useEffect } from 'react';
import { ExternalLink, Github, CheckCircle2, Filter, Layers, FileCheck, Plus, Settings, BookOpen, Camera, Presentation } from 'lucide-react';
import { Project } from '../types';
import { getStoredProjects, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStore';
import { isAdminAuthenticated } from '../utils/adminAuth';
import { navigateTo } from '../utils/router';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [isAdmin, setIsAdmin] = useState(() => isAdminAuthenticated());
  const [selectedType, setSelectedType] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleSync = () => {
      setProjects(getStoredProjects());
      setIsAdmin(isAdminAuthenticated());
    };
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, handleSync);
    window.addEventListener('admin_auth_changed', handleSync);
    return () => {
      window.removeEventListener(PORTFOLIO_UPDATED_EVENT, handleSync);
      window.removeEventListener('admin_auth_changed', handleSync);
    };
  }, []);

  const categories = ['All', 'Teaching', 'Media', 'Presentation', 'Curriculum'];

  const filteredProjects = selectedType === 'All'
    ? projects
    : projects.filter((p) => p.type === selectedType);

  const getTypeBadgeStyle = (type: string) => {
    switch (type) {
      case 'Teaching':
        return 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30';
      case 'Media':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Presentation':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Curriculum':
        return 'bg-sky-500/10 text-sky-400 border-sky-500/30';
      default:
        return 'bg-white/10 text-[#D1D5DB] border-white/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Teaching':
        return <BookOpen className="w-3.5 h-3.5 text-[var(--color-accent)]" />;
      case 'Media':
        return <Camera className="w-3.5 h-3.5 text-emerald-400" />;
      case 'Presentation':
        return <Presentation className="w-3.5 h-3.5 text-amber-400" />;
      case 'Curriculum':
        return <FileCheck className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#D1D5DB]" />;
    }
  };

  return (
    <section id="projects" className="py-24 bg-[var(--color-dark-card,#141E2A)] text-[#F3F4F6] border-t border-white/10 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest uppercase mb-1 flex items-center justify-center gap-1.5">
            <Layers className="w-4 h-4 text-[var(--color-accent)]" />
            <span>CLASSROOM & MEDIA SHOWCASE</span>
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight">
            Featured Educational & Media Projects
          </h2>
          <p className="text-[#D1D5DB] text-sm sm:text-base leading-relaxed font-light">
            A curated showcase of interactive English presentation workshops, school digital media documentation, climate awareness seminars, and diagnostic curriculum series led by Tansom.
          </p>
        </div>

        {/* Filter Tabs & Admin CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <div className="flex items-center justify-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedType(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono transition-all border flex items-center gap-1.5 cursor-pointer ${
                  selectedType === cat
                    ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] font-bold shadow-lg shadow-[var(--color-accent)]/20'
                    : 'bg-[#12151C] border-white/10 text-[#D1D5DB] hover:border-[var(--color-accent)]/50 hover:text-white'
                }`}
              >
                {cat !== 'All' && getTypeIcon(cat)}
                <span>{cat}</span>
                {cat === 'All' && <span className="ml-1 text-[10px] text-white/60">({projects.length})</span>}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={() => navigateTo('/admin')}
              className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono transition-all cursor-pointer"
              title="Open Admin System to add/edit/delete projects"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add / Manage Projects</span>
            </button>
          )}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card glass-card-hover rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-5 relative group transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-xl hover:shadow-[var(--color-accent)]/10"
            >
              <div className="space-y-4">
                {/* Header: Type Badge & Action Link */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold border flex items-center gap-1.5 ${getTypeBadgeStyle(project.type)}`}>
                    {getTypeIcon(project.type)}
                    <span>{project.type.toUpperCase()}</span>
                  </span>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/[0.04] hover:bg-[var(--color-accent)]/20 border border-white/10 hover:border-[var(--color-accent)]/40 text-[#9CA3AF] hover:text-[var(--color-accent)] transition-all"
                      title="View Project Resource"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-white group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                  {project.title}
                </h3>

                {/* Project Details / Description */}
                <p className="text-xs sm:text-sm text-[#D1D5DB] font-light leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Metrics / Key highlights */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-0.5">
                        <p className="text-[10px] font-mono text-[#9CA3AF] uppercase truncate">{m.label}</p>
                        <p className="text-xs font-mono font-bold text-white truncate">{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Section: Tools Used Key & Modal Inspector */}
              <div className="space-y-4 pt-4 border-t border-white/10">
                {/* Relevant Skills and Resources */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#9CA3AF] flex items-center justify-between">
                    <span>Skills & Resources</span>
                    <span className="text-[9px] text-[var(--color-accent)]">{project.tags.length} Items</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/[0.04] border border-white/10 text-[#D1D5DB] group-hover:border-[var(--color-accent)]/30 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold flex items-center gap-1 group/btn"
                  >
                    <span>View Project Details</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>

                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-[#9CA3AF] hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Resource</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Inspector Modal */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#12151C] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto text-[#F3F4F6]">
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${getTypeBadgeStyle(activeModalProject.type)}`}>
                      {activeModalProject.type}
                    </span>
                    <span className="text-xs font-mono text-[#9CA3AF]">{activeModalProject.id}</span>
                  </div>
                  <h3 className="font-display font-extrabold text-xl text-white">
                    {activeModalProject.title}
                  </h3>
                </div>

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="p-1.5 rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors shrink-0"
                >
                  ✕
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider">Project Summary</h5>
                <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed font-light">{activeModalProject.description}</p>
              </div>

              {/* Tools Used */}
              <div className="space-y-2">
                <h5 className="text-xs font-mono font-bold text-[#9CA3AF] uppercase tracking-wider">Skills & Educational Resources</h5>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.tags.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/30 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                {activeModalProject.link ? (
                  <a
                    href={activeModalProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-mono font-bold flex items-center space-x-2 transition-all shadow-lg shadow-[var(--color-accent)]/20"
                  >
                    <span>View Project Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : <div />}

                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-[#D1D5DB] text-xs font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
