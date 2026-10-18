import React, { useState } from 'react';
import { AtsReport } from '../utils/atsScorer';
import { CheckCircle2, AlertCircle, Sparkles, X, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AtsScoreModalProps {
  report: AtsReport;
  onClose: () => void;
  onApplyImprovement?: (oldText: string, newText: string) => void;
}

export const AtsScoreModal: React.FC<AtsScoreModalProps> = ({ report, onClose }) => {
  const [copiedVerb, setCopiedVerb] = useState<string | null>(null);

  const triggerCelebration = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
    });
  };

  const handleCopyVerb = (verb: string) => {
    navigator.clipboard.writeText(verb);
    setCopiedVerb(verb);
    setTimeout(() => setCopiedVerb(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="text-sm font-bold font-mono">{report.grade}</span>
            </div>
            <div>
              <h2 className="text-base font-bold text-white">ATS Resume Health Score</h2>
              <p className="text-xs text-slate-400">
                Optimized for Workday, Greenhouse, Taleo & Lever parsing algorithms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Big Score Banner */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white font-mono tabular-nums">
                  {report.overallScore}
                </span>
                <span className="text-sm text-slate-500 font-mono">/ 100</span>
                <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Grade {report.grade} (Top Tier)
                </span>
              </div>
              <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                {report.summaryFeedback}
              </p>
            </div>
            <button
              onClick={triggerCelebration}
              className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              Verify & Celebrate 🎉
            </button>
          </div>

          {/* Audit Checks Checklist */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
              Standard Parsing Requirements
            </h3>
            <div className="space-y-2.5">
              {report.checks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-start justify-between gap-4 rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5"
                >
                  <div className="flex items-start gap-3">
                    {check.passed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="text-xs font-semibold text-white flex items-center gap-2">
                        <span>{check.title}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          +{check.scoreContribution} pts
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{check.description}</p>
                      {check.tip && (
                        <p className="text-[11px] text-slate-500 mt-1 italic">
                          Tip: {check.tip}
                        </p>
                      )}
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono shrink-0 ${
                      check.passed ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {check.passed ? 'PASSED' : 'CHECK'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quantified Metrics Detected */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                <span>Detected Metrics & Numbers</span>
                <span className="text-[11px] font-mono text-emerald-400">
                  {report.detectedMetrics.length} found
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {report.detectedMetrics.map((metric) => (
                  <span
                    key={metric}
                    className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-xs font-mono text-emerald-300"
                  >
                    {metric}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
              <h4 className="text-xs font-semibold text-white mb-2 flex items-center justify-between">
                <span>Verified Action Verbs</span>
                <span className="text-[11px] font-mono text-blue-400">
                  {report.detectedActionVerbs.length} used
                </span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {report.detectedActionVerbs.map((verb) => (
                  <button
                    key={verb}
                    onClick={() => handleCopyVerb(verb)}
                    className="flex items-center gap-1 rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-xs font-mono text-blue-300 hover:border-blue-500/50 transition-colors"
                    title="Click to copy verb"
                  >
                    <span>{verb}</span>
                    {copiedVerb === verb ? (
                      <Check className="h-2.5 w-2.5 text-emerald-400" />
                    ) : (
                      <Copy className="h-2.5 w-2.5 text-slate-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Keyword Density */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
            <h4 className="text-xs font-semibold text-white mb-2">
              Primary ATS Keyword Density
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {report.keywordDensity.slice(0, 8).map((kd) => (
                <div
                  key={kd.keyword}
                  className="flex items-center justify-between rounded bg-slate-900/60 p-2 border border-slate-800/80 text-xs"
                >
                  <span className="text-slate-300 truncate">{kd.keyword}</span>
                  <span className="font-mono text-blue-400 font-bold tabular-nums">
                    {kd.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-3 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close Audit
          </button>
        </div>
      </div>
    </div>
  );
};
