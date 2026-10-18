import React from 'react';
import { ViewMode, ResumeTheme } from '../types/resume';
import {
  FileText,
  SlidersHorizontal,
  Share2,
  FileCheck,
  LayoutGrid,
} from 'lucide-react';

interface ResumeControlBarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  theme: ResumeTheme;
  setTheme: (theme: ResumeTheme) => void;
  atsScore: number;
  onOpenAtsModal: () => void;
  onOpenEditor: () => void;
  onOpenExport: () => void;
}

export const ResumeControlBar: React.FC<ResumeControlBarProps> = ({
  viewMode,
  setViewMode,
  theme,
  setTheme,
  atsScore,
  onOpenAtsModal,
  onOpenEditor,
  onOpenExport,
}) => {
  return (
    <div className="border-b border-emerald-950/80 bg-[#05130e]/90 px-6 py-3 no-print">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
        {/* Left: View Mode Segmented Switcher */}
        <div className="flex items-center gap-1 rounded-xl bg-[#040e0a] p-1 border border-emerald-950">
          <button
            onClick={() => setViewMode('showcase')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              viewMode === 'showcase'
                ? 'bg-emerald-950 text-[#00df82] border border-emerald-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="h-3.5 w-3.5" />
            <span>Showcase Portfolio</span>
          </button>
          <button
            onClick={() => setViewMode('document')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 ${
              viewMode === 'document'
                ? 'bg-emerald-950 text-[#00df82] border border-emerald-700/60 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Document Preview (A4)</span>
          </button>
        </div>

        {/* Center: Template Style Selector for Document View */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-emerald-400/80 hidden sm:inline whitespace-nowrap">
            CV Template:
          </span>
          <div className="flex items-center gap-1 rounded-xl bg-[#040e0a] p-1 border border-emerald-950">
            <button
              onClick={() => setTheme('executive')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                theme === 'executive'
                  ? 'bg-emerald-950 text-[#00df82] border border-emerald-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Executive
            </button>
            <button
              onClick={() => setTheme('swiss')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                theme === 'swiss'
                  ? 'bg-emerald-950 text-amber-300 border border-amber-600/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Editorial
            </button>
            <button
              onClick={() => setTheme('silicon')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                theme === 'silicon'
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/50'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Emerald Tech
            </button>
            <button
              onClick={() => setTheme('ats_classic')}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                theme === 'ats_classic'
                  ? 'bg-slate-800 text-white border border-slate-600'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              ATS Minimalist
            </button>
          </div>
        </div>

        {/* Right: Functional Action Modals */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAtsModal}
            className="flex items-center gap-1.5 rounded-full border border-emerald-600/50 bg-emerald-950/60 px-3.5 py-1.5 text-xs font-semibold text-[#00df82] hover:bg-emerald-900/60 transition-colors whitespace-nowrap shrink-0"
            title="ATS Compliance Review"
          >
            <FileCheck className="h-3.5 w-3.5 text-[#00df82]" />
            <span className="tabular-nums">ATS Score: {atsScore}%</span>
          </button>

          <button
            onClick={onOpenEditor}
            className="flex items-center gap-1.5 rounded-full border border-emerald-900/80 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-[#00df82] transition-colors whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Customize Data</span>
          </button>

          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 rounded-full border border-emerald-900/80 bg-emerald-950/40 px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-[#00df82] transition-colors whitespace-nowrap shrink-0"
          >
            <Share2 className="h-3.5 w-3.5" />
            <span>Export CV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
