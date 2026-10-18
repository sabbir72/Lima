import React, { useState } from 'react';
import { ResumeData } from '../types/resume';
import {
  generateMarkdown,
  generatePlainText,
  generateJsonResume,
  downloadFile,
} from '../utils/exporters';
import { Copy, Check, Download, Printer, X, FileText, Code } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExportModalProps {
  data: ResumeData;
  onClose: () => void;
  onTriggerPrint: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  data,
  onClose,
  onTriggerPrint,
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'plaintext' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const markdownContent = generateMarkdown(data);
  const plainTextContent = generatePlainText(data);
  const jsonContent = generateJsonResume(data);

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'plaintext':
        return plainTextContent;
      case 'json':
        return jsonContent;
      case 'markdown':
      default:
        return markdownContent;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCurrentContent());
    setCopied(true);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filenameBase = `${data.personal.fullName.toLowerCase().replace(/\s+/g, '_')}_resume`;
    if (activeTab === 'markdown') {
      downloadFile(`${filenameBase}.md`, markdownContent, 'text/markdown');
    } else if (activeTab === 'plaintext') {
      downloadFile(`${filenameBase}.txt`, plainTextContent, 'text/plain');
    } else {
      downloadFile(`${filenameBase}.json`, jsonContent, 'application/json');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm no-print">
      <div className="relative w-full max-w-3xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-4 bg-slate-950">
          <div>
            <h2 className="text-base font-bold text-white">Export & Share Resume</h2>
            <p className="text-xs text-slate-400">
              Download clean formats compatible with recruitment systems, LinkedIn & GitHub
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'markdown'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Markdown (.md)</span>
            </button>
            <button
              onClick={() => setActiveTab('plaintext')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'plaintext'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>ATS Plain Text (.txt)</span>
            </button>
            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeTab === 'json'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              <span>JSON Schema</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Content</span>
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>

        {/* Preview Code View */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs">
          <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 whitespace-pre-wrap font-mono leading-relaxed select-all">
            {getCurrentContent()}
          </pre>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-slate-950 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onTriggerPrint();
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:underline"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Open High-Res Print / Save as PDF</span>
          </button>
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-800 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
