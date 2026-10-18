import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertTriangle, Terminal as TerminalIcon, Cpu, Zap, Activity, Code, FileCode, Copy, Check } from 'lucide-react';
import { Project, TestLog } from '../types';
import { getStoredProjects, PORTFOLIO_UPDATED_EVENT } from '../utils/portfolioStore';

export default function InteractiveTestRunner() {
  const [projects, setProjects] = useState<Project[]>(() => getStoredProjects());
  const [selectedProjectId, setSelectedProjectId] = useState<string>(() => {
    const list = getStoredProjects();
    return list[0]?.id || 'proj-playwright-api';
  });

  useEffect(() => {
    const handleSync = () => {
      const updated = getStoredProjects();
      setProjects(updated);
      if (!updated.some(p => p.id === selectedProjectId)) {
        setSelectedProjectId(updated[0]?.id || '');
      }
    };
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, handleSync);
    return () => window.removeEventListener(PORTFOLIO_UPDATED_EVENT, handleSync);
  }, [selectedProjectId]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [activeLogs, setActiveLogs] = useState<TestLog[]>([]);
  const [passedAssertions, setPassedAssertions] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'terminal' | 'code'>('terminal');
  const [copiedCode, setCopiedCode] = useState(false);

  const consoleEndRef = useRef<HTMLDivElement>(null);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0] || {
    id: 'default',
    title: 'Playwright API Automation Framework',
    type: 'API' as const,
    description: '',
    tags: [],
    assertions: [],
    logs: [],
  };

  // Plan and workflow snippets for each educational project type
  const getProjectCode = (projectId: string) => {
    switch (projectId) {
      case 'proj-interactive-classroom':
        return `# ==============================================================================
# LESSON PLAN & STUDENT PRESENTATION SCRIPT
# Class: Grades 1–6 (English Version) | Subject: English 1 & 2
# Instructor: Tansom Akther Lima (Assistant Teacher & Media Support)
# ==============================================================================

1. INSTRUCTIONAL OBJECTIVE:
   - Eliminate student hesitation and stage fright in spoken English presentations.
   - Build active vocabulary retention through visual association and guided repetition.

2. WARM-UP & VOCABULARY DRILL (10 Mins):
   - Display PowerPoint / Canva visual cue slides on classroom projector.
   - Phonics warm-up: Pronunciation and syllable stress drills ("Excellence", "Stewardship").
   - Students pair up for 2-minute dialogue warm-up.

3. INTERACTIVE PRESENTATION ROUND (25 Mins):
   - 4 student teams take the podium to deliver prepared 2-minute English talks.
   - Whiteboard mind-map notes updated in real-time.
   - Constructive peer praise and instructor pronunciation feedback.

4. FORMATIVE ASSESSMENT & WRAP-UP (10 Mins):
   - Distribute leveled creative writing and sentence structure worksheets.
   - 95%+ student comprehension benchmark verified across class roster.`;

      case 'proj-school-media':
        return `# ==============================================================================
# SCHOOL MEDIA DOCUMENTATION & DIGITAL PRODUCTION WORKFLOW
# Institution: New Blown An Int'l Standard School, Dattapara Branch
# Lead: Tansom Akther Lima (Media Support Specialist)
# ==============================================================================

1. PRE-EVENT CAMERA CALIBRATION:
   - Primary Gear: DSLR camera with 50mm f/1.8 prime and 24-70mm zoom lenses.
   - Audio: Dual-channel wireless lavalier microphones for guest speakers and student reciters.
   - Visual storyboard prepared for opening assembly, prize giving, and stage recitations.

2. LIVE EVENT COVERAGE:
   - Capture high-resolution photo stills of academic awards and teacher presentations.
   - Film 1080p 60fps video clips of student performances and national anthem.
   - Verify proper white balance under mixed auditorium stage lighting.

3. POST-PROCESSING & CANVA DESIGN:
   - Ingest RAW media into digital editing suite; perform color grading and cropping.
   - Format promotional flyers and announcement cards on Canva (1080x1350 & 16:9).
   - Render highlight reel and export for school social channels and parent notice board.`;

      case 'proj-global-warming':
        return `# ==============================================================================
# ENVIRONMENTAL AWARENESS & CLIMATE ACTION PRESENTATION
# Forum: Certified Academic Seminar on Global Warming
# Speaker: Tansom Akther Lima (Certified Presentation Participant)
# ==============================================================================

1. INTRODUCTION & CLIMATE SCIENCE FOUNDATION:
   - Deconstruct greenhouse gas emissions and global temperature anomalies.
   - Present localized environmental case study: Bangladesh river delta and coastal resilience.

2. MULTIMEDIA PRESENTATION DECK:
   - Slide 1: Atmospheric CO2 Trends & Global Temperature Heatmaps.
   - Slide 2: Realities of Deforestation & Plastic Waste in Urban Waterways.
   - Slide 3: School & Community Green Solutions: 5 Actionable Campus Habits.

3. INTERACTIVE PARTICIPANT DIALOGUE:
   - Moderated Q&A with seminar audience and students.
   - Distributed campus tree plantation and energy-saving pledge checklists.
   - Official certified participant recognition recorded.`;

      case 'proj-grammar-workbook':
      default:
        return `# ==============================================================================
# LEVELED ENGLISH GRAMMAR & PHONICS WORKBOOK SERIES
# Target Learners: Grades 1–6 (English Version)
# Author: Tansom Akther Lima
# ==============================================================================

1. CURRICULUM PROGRESSION:
   - Level 1-2: Phonics, Digraphs, Capitalization, and Simple Sight Words.
   - Level 3-4: Parts of Speech (Nouns, Pronouns, Action Verbs, Descriptive Adjectives).
   - Level 5-6: Subject-Verb Agreement, Complex Tenses, and Paragraph Composition.

2. VISUAL PEDAGOGY & FORMATTING:
   - Styled in Canva with engaging child-friendly illustrations and clear font hierarchy.
   - Printable formatted worksheets in MS Word for classroom test administration.
   - Formative rubrics attached for parent-teacher progress evaluations.`;
    }
  };

  // Auto scroll console to bottom as logs append
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeLogs]);

  // Reset runner when selected project changes
  useEffect(() => {
    setIsRunning(false);
    setProgress(0);
    setActiveLogs([]);
    setPassedAssertions([]);
    setCompleted(false);
  }, [selectedProjectId]);

  const runTestSuite = () => {
    setIsRunning(true);
    setProgress(0);
    setActiveLogs([]);
    setPassedAssertions([]);
    setCompleted(false);
    setViewMode('terminal');

    const logs = selectedProject.logs;
    const assertions = selectedProject.assertions;
    const logInterval = 800; // interval between logs in ms
    const assertionRatio = Math.max(1, Math.floor(logs.length / assertions.length));

    let logIndex = 0;
    let assertionIndex = 0;

    const interval = setInterval(() => {
      if (logIndex < logs.length) {
        // Append a new log line
        const currentLog = logs[logIndex];
        setActiveLogs((prev) => [...prev, currentLog]);
        
        // Progress percentage calculation
        const currentProgress = Math.min(95, Math.round(((logIndex + 1) / logs.length) * 100));
        setProgress(currentProgress);

        // Periodically tick off assertions to match logs stream
        if (logIndex % assertionRatio === 0 && assertionIndex < assertions.length) {
          const currentAssertion = assertions[assertionIndex];
          if (currentAssertion.status === 'PASS') {
            setPassedAssertions((prev) => [...prev, currentAssertion.name]);
          }
          assertionIndex++;
        }

        logIndex++;
      } else {
        // Finish running
        clearInterval(interval);
        
        // Complete remaining assertions if any left
        assertions.forEach((a) => {
          if (a.status === 'PASS') {
            setPassedAssertions((prev) => {
              if (prev.includes(a.name)) return prev;
              return [...prev, a.name];
            });
          }
        });

        setProgress(100);
        setIsRunning(false);
        setCompleted(true);
      }
    }, logInterval);
  };

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(getProjectCode(selectedProjectId));
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section id="test-runner" className="py-24 bg-[#0B0D12] text-[#F3F4F6] px-4 sm:px-6 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <p className="text-xs font-mono font-bold text-[var(--color-accent)] tracking-widest uppercase mb-1">
            CLASSROOM & MEDIA SIMULATOR
          </p>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-white">
            Interactive Activity & Lesson Runner
          </h2>
          <p className="text-[#D1D5DB] text-sm sm:text-base leading-relaxed font-light">
            Select an educational or media project below to simulate real-time classroom execution, view step-by-step verified milestones, and inspect the underlying lesson plan / workflow script.
          </p>
        </div>

        {/* Project Selection Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProjectId(project.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all border cursor-pointer ${
                selectedProjectId === project.id
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)] font-bold shadow-lg shadow-[var(--color-accent)]/20'
                  : 'bg-[#12151C] border-white/10 text-[#D1D5DB] hover:border-[var(--color-accent)]/50 hover:text-white'
              }`}
            >
              [{project.type.toUpperCase()}] {project.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left panel: Project Specs */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 rounded-2xl glass-card border border-white/10">
            <div className="space-y-6">
              <div>
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                  {selectedProject.type.toUpperCase()} WORKFLOW SIMULATOR
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-4">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-[#D1D5DB] text-xs sm:text-sm leading-relaxed font-light">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#D1D5DB] text-[10px] font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Metrics */}
              {selectedProject.metrics && (
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {selectedProject.metrics.map((metric) => (
                    <div key={metric.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/10">
                      <p className="text-[10px] font-mono text-[#9CA3AF] uppercase tracking-wider">{metric.label}</p>
                      <p className="text-xs font-bold font-mono text-[var(--color-accent)] mt-0.5">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Run Button */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <button
                onClick={runTestSuite}
                disabled={isRunning}
                className={`flex-1 py-3.5 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                  isRunning
                    ? 'bg-white/10 text-[#9CA3AF] cursor-not-allowed'
                    : 'shimmer bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-lg shadow-[var(--color-accent)]/20'
                }`}
              >
                {isRunning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Executing... {progress}%</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Execute Test Suite</span>
                  </>
                )}
              </button>

              {completed && (
                <button
                  onClick={() => {
                    setProgress(0);
                    setActiveLogs([]);
                    setPassedAssertions([]);
                    setCompleted(false);
                  }}
                  className="p-3.5 bg-white/10 text-[#D1D5DB] hover:text-white rounded-full font-mono text-xs hover:bg-white/20 transition-colors"
                  title="Reset runner state"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right panel: Terminal / Code Viewer */}
          <div className="lg:col-span-7 flex flex-col justify-between overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs shadow-xl min-h-[440px]">
            {/* Terminal Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setViewMode('terminal')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    viewMode === 'terminal' ? 'bg-accent text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <TerminalIcon className="w-3.5 h-3.5" />
                  <span>LIVE CONSOLE</span>
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors ${
                    viewMode === 'code' ? 'bg-accent text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>TEST SCRIPT CODE</span>
                </button>
              </div>

              {viewMode === 'code' ? (
                <button
                  onClick={handleCopySnippet}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px]"
                >
                  {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode ? 'COPIED' : 'COPY SCRIPT'}</span>
                </button>
              ) : activeLogs.length > 0 ? (
                <button
                  onClick={() => {
                    setActiveLogs([]);
                    setProgress(0);
                    setPassedAssertions([]);
                    setCompleted(false);
                  }}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 text-[10px] transition-colors"
                  title="Clear console logs"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>CLEAR CONSOLE</span>
                </button>
              ) : null}
            </div>

            {/* Container Body */}
            <div className="flex-1 p-5 overflow-y-auto max-h-[390px]">
              {viewMode === 'code' ? (
                <pre className="text-zinc-300 text-[11px] font-mono leading-relaxed bg-zinc-900/60 p-4 rounded-xl border border-zinc-800/80 overflow-x-auto whitespace-pre">
                  {getProjectCode(selectedProjectId)}
                </pre>
              ) : (
                <div className="space-y-6">
                  {/* Idle Screen */}
                  {!isRunning && activeLogs.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-16 text-zinc-500 space-y-3">
                      <Cpu className="w-10 h-10 text-zinc-700 stroke-[1.5]" />
                      <div className="space-y-1">
                        <p className="text-zinc-400 font-bold">Runner Container: IDLE</p>
                        <p className="text-[11px] text-zinc-500 max-w-sm">Click "Execute Test Suite" to simulate live STLC runner assertions & logs stream.</p>
                      </div>
                    </div>
                  )}

                  {/* Logs Stream */}
                  {activeLogs.length > 0 && (
                    <div className="space-y-1.5">
                      <p className="text-zinc-500 border-b border-zinc-800 pb-1 mb-2 text-[10px] uppercase tracking-wider flex items-center justify-between">
                        <span>STDOUT Console Stream</span>
                        {isRunning && <span className="animate-pulse text-accent text-[9px]">● STREAMING</span>}
                      </p>
                      {activeLogs.map((log, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] leading-relaxed">
                          <span className="text-zinc-600 shrink-0 select-none">[{log.timestamp}]</span>
                          <span className={`shrink-0 font-bold uppercase select-none ${
                            log.level === 'PASS' ? 'text-emerald-400' :
                            log.level === 'FAIL' ? 'text-rose-500' :
                            log.level === 'WARN' ? 'text-amber-500' : 'text-accent'
                          }`}>[{log.level}]</span>
                          <span className="text-zinc-300 break-all">{log.message}</span>
                        </div>
                      ))}
                      <div ref={consoleEndRef} />
                    </div>
                  )}

                  {/* Dynamic Assertions */}
                  {(isRunning || completed) && (
                    <div className="pt-4 border-t border-zinc-800">
                      <p className="text-zinc-500 pb-2 text-[10px] uppercase tracking-wider flex items-center justify-between">
                        <span>Validation Assertions Checklist</span>
                        <span className="text-emerald-400 text-[10px] font-bold">{passedAssertions.length} / {selectedProject.assertions.length} PASSED</span>
                      </p>
                      <div className="space-y-2">
                        {selectedProject.assertions.map((assertion) => {
                          const isChecked = passedAssertions.includes(assertion.name);
                          return (
                            <div
                              key={assertion.name}
                              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                                isChecked
                                  ? 'bg-zinc-900 border-emerald-500/30 text-zinc-200'
                                  : 'bg-zinc-950 border-zinc-800 text-zinc-600'
                              }`}
                            >
                              <div className="flex items-center space-x-2.5">
                                <CheckCircle2 className={`w-4 h-4 shrink-0 ${
                                  isChecked ? 'text-emerald-400' : 'text-zinc-800'
                                }`} />
                                <span className="text-[11px] font-sans truncate pr-2">{assertion.name}</span>
                              </div>
                              {isChecked && assertion.duration && (
                                <span className="text-[9px] font-mono text-emerald-400 shrink-0 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  {assertion.duration}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Status Footer */}
            <div className="px-4 py-2.5 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between shrink-0 text-[10px]">
              <div className="flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-accent" />
                <span className="text-zinc-400">Container State:</span>
                <span className={`font-bold uppercase ${
                  isRunning ? 'text-accent animate-pulse' :
                  completed ? 'text-emerald-400' : 'text-zinc-500'
                }`}>
                  {isRunning ? 'EXECUTING SUITE' : completed ? '100% SUITE PASSED' : 'STBY'}
                </span>
              </div>
              <div className="flex items-center space-x-3 text-zinc-500">
                <span>ERR: 0</span>
                <span>WARN: 0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

