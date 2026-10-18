import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import { initialResumeData } from '../data/resumeData';
import { X, RotateCcw, Plus, Trash2, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ResumeEditorDrawerProps {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onClose: () => void;
}

export const ResumeEditorDrawer: React.FC<ResumeEditorDrawerProps> = ({
  data,
  onChange,
  onClose,
}) => {
  const [formData, setFormData] = useState<ResumeData>(JSON.parse(JSON.stringify(data)));
  const [savedNotice, setSavedNotice] = useState(false);

  const handlePersonalChange = (field: keyof ResumeData['personal'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        [field]: value,
      },
    }));
  };

  const handleSummaryChange = (val: string) => {
    setFormData((prev) => ({ ...prev, summary: val }));
  };

  const handleBulletChange = (expIdx: number, bulletIdx: number, val: string) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[expIdx].bullets[bulletIdx] = val;
      return { ...prev, experience: nextExp };
    });
  };

  const handleAddBullet = (expIdx: number) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[expIdx].bullets.push('Organized interactive classroom learning activities fostering student participation and confidence.');
      return { ...prev, experience: nextExp };
    });
  };

  const handleDeleteBullet = (expIdx: number, bulletIdx: number) => {
    setFormData((prev) => {
      const nextExp = [...prev.experience];
      nextExp[expIdx].bullets = nextExp[expIdx].bullets.filter((_, i) => i !== bulletIdx);
      return { ...prev, experience: nextExp };
    });
  };

  const handleSave = () => {
    onChange(formData);
    setSavedNotice(true);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.5 } });
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details back to Tansom Akther Lima default template?')) {
      const reset = JSON.parse(JSON.stringify(initialResumeData));
      setFormData(reset);
      onChange(reset);
    }
  };

  // Educational summary presets
  const applySummaryPreset = (preset: 'teaching' | 'media' | 'academic') => {
    let text = '';
    if (preset === 'teaching') {
      text =
        'Dedicated and enthusiastic teacher with strong academic performance. Skilled in teaching, communication, and leadership. Seeking an opportunity to apply my knowledge, enhance my skills, and contribute effectively to the organization’s success.';
    } else if (preset === 'media') {
      text =
        'Versatile educator and media support specialist skilled in English instruction, educational photography, and video editing for promotional school activities. Passionate about creating engaging visual storytelling and student-centered learning environments.';
    } else {
      text =
        'High-achieving English graduate (Dean’s Award recipient, CGPA 3.83/4.00) with demonstrated classroom teaching experience and leadership capabilities. Dedicated to fostering student academic excellence, self-expression, and communication skills.';
    }
    setFormData((prev) => ({ ...prev, summary: text }));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm no-print">
      <div className="relative w-full max-w-xl h-full bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div>
            <h2 className="text-base font-bold text-white">Customize Resume Content</h2>
            <p className="text-xs text-slate-400">
              Live updates reflect instantly across both showcase and printable PDF modes
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Personal Info */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-1">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium">Full Name</label>
                <input
                  type="text"
                  value={formData.personal.fullName}
                  onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Location</label>
                <input
                  type="text"
                  value={formData.personal.location}
                  onChange={(e) => handlePersonalChange('location', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 font-medium">Professional Title / Headline</label>
              <input
                type="text"
                value={formData.personal.headline}
                onChange={(e) => handlePersonalChange('headline', e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-400 font-medium">Email Address</label>
                <input
                  type="email"
                  value={formData.personal.email}
                  onChange={(e) => handlePersonalChange('email', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-medium">Phone Number</label>
                <input
                  type="text"
                  value={formData.personal.phone}
                  onChange={(e) => handlePersonalChange('phone', e.target.value)}
                  className="mt-1 w-full rounded-lg border border-slate-800 bg-slate-950 p-2 text-white focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-1">
              <h3 className="font-semibold text-white text-sm">Professional Summary</h3>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-500">Presets:</span>
                <button
                  type="button"
                  onClick={() => applySummaryPreset('teaching')}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-blue-300 hover:bg-slate-700"
                >
                  Teaching
                </button>
                <button
                  type="button"
                  onClick={() => applySummaryPreset('media')}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300 hover:bg-slate-700"
                >
                  Media Support
                </button>
                <button
                  type="button"
                  onClick={() => applySummaryPreset('academic')}
                  className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-purple-300 hover:bg-slate-700"
                >
                  Academic
                </button>
              </div>
            </div>
            <textarea
              rows={4}
              value={formData.summary}
              onChange={(e) => handleSummaryChange(e.target.value)}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 p-2.5 text-white leading-relaxed focus:border-blue-500 focus:outline-none"
            />
          </div>

          {/* Work Experience Bullets */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white text-sm border-b border-slate-800 pb-1">
              Work Experience Bullets
            </h3>
            {formData.experience.map((exp, expIdx) => (
              <div key={exp.id} className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-xs">{exp.role}</h4>
                    <p className="text-[11px] text-slate-400">{exp.company}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(expIdx)}
                    className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[11px] font-medium text-blue-400 hover:bg-slate-700"
                  >
                    <Plus className="h-3 w-3" />
                    <span>Add Bullet</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.bullets.map((bullet, bulletIdx) => (
                    <div key={bulletIdx} className="flex items-start gap-2">
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => handleBulletChange(expIdx, bulletIdx, e.target.value)}
                        className="flex-1 rounded-lg border border-slate-800 bg-slate-900 p-2 text-white leading-relaxed text-xs focus:border-blue-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(expIdx, bulletIdx)}
                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded"
                        title="Remove bullet"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset to Default</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
            >
              {savedNotice ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Applied!</span>
                </>
              ) : (
                <span>Save & Apply</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
