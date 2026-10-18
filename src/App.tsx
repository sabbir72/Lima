import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsGrid from './components/SkillsGrid';
import Projects from './components/Projects';
import BlogSection from './components/BlogSection';
import ExperienceTimeline from './components/ExperienceTimeline';
import CareerVision from './components/CareerVision';
import EducationAndReferences from './components/EducationAndReferences';
import Contact from './components/Contact';
import ResumeBuilderModal from './components/ResumeBuilderModal';
import CoverLetterGeneratorModal from './components/CoverLetterGeneratorModal';
import ThemeSelectorModal from './components/ThemeSelectorModal';
import AdminPasscodeModal from './components/AdminPasscodeModal';
import AdminPortal from './components/AdminPortal';
import AdminQuickAccess from './components/AdminQuickAccess';
import VisitorCounter from './components/VisitorCounter';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { getCurrentRoute, navigateTo, navigateToHomeSection, AppRoute } from './utils/router';
import { isAdminAuthenticated, logoutAdmin, verifyOwnerWithServer } from './utils/adminAuth';
import { initializePortfolioStoreFromServer } from './utils/portfolioStore';
import { ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from './data';

export default function App() {
  const [route, setRoute] = useState<AppRoute>(() => getCurrentRoute());
  const [dark, setDark] = useState<boolean>(true);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState<boolean>(false);
  const [isCoverLetterModalOpen, setIsCoverLetterModalOpen] = useState<boolean>(false);
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [isAdminPasscodeModalOpen, setIsAdminPasscodeModalOpen] = useState<boolean>(false);
  const [adminChallengeAction, setAdminChallengeAction] = useState<'resume' | 'coverLetter' | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [, setIsOwnerVerified] = useState<boolean>(false);

  // Sync client-side routing on URL popstate
  useEffect(() => {
    const handlePopState = () => {
      setRoute(getCurrentRoute());
    };

    const syncAdmin = async () => {
      const authenticated = isAdminAuthenticated();
      setIsAdmin(authenticated);
      if (authenticated) {
        const verified = await verifyOwnerWithServer();
        setIsOwnerVerified(verified);
      } else {
        setIsOwnerVerified(false);
      }
    };

    syncAdmin();
    initializePortfolioStoreFromServer();

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('admin_auth_changed', syncAdmin);

    const interval = setInterval(() => {
      const authenticated = isAdminAuthenticated();
      setIsAdmin(authenticated);
      if (!authenticated) {
        setIsOwnerVerified(false);
      }
    }, 4000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('admin_auth_changed', syncAdmin);
    };
  }, [isAdmin]);

  const handleOpenResumeBuilder = () => {
    setIsResumeModalOpen(true);
  };

  const handleOpenCoverLetter = () => {
    setIsCoverLetterModalOpen(true);
  };

  const handleOpenThemeSelector = () => {
    setIsThemeModalOpen(true);
  };

  const handleOpenAdminLogin = () => {
    setAdminChallengeAction(null);
    setIsAdminPasscodeModalOpen(true);
  };

  const handleLogoutAdmin = () => {
    logoutAdmin();
    setIsAdmin(false);
    setIsOwnerVerified(false);
    if (route.type === 'admin') {
      navigateTo('/');
    }
  };

  const handleAdminPasscodeSuccess = () => {
    setIsAdmin(true);
    setIsAdminPasscodeModalOpen(false);
    if (adminChallengeAction === 'resume') {
      setIsResumeModalOpen(true);
    } else if (adminChallengeAction === 'coverLetter') {
      setIsCoverLetterModalOpen(true);
    } else {
      navigateTo('/admin');
    }
    setAdminChallengeAction(null);
  };

  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg,#243544)] text-[var(--color-text-primary,#edf3f8)] flex flex-col font-sans selection:bg-[var(--color-accent,#00D2FF)] selection:text-black transition-colors duration-300" style={{ backgroundImage: 'radial-gradient(circle at top left, var(--color-accent-glow), transparent 30%), radial-gradient(circle at bottom right, rgba(76, 201, 240, 0.08), transparent 32%)' }}>
      {/* Navigation Header */}
      <Navbar
        dark={dark}
        setDark={setDark}
        onOpenResumeBuilder={handleOpenResumeBuilder}
        onOpenCoverLetter={handleOpenCoverLetter}
        currentPath={currentPath}
      />

      {/* Main Page Sections or Blog Page or Admin Page */}
      <main className="flex-grow">
        {route.type === 'admin' && (
          <AdminPortal
            onBack={() => navigateTo('/')}
            initialTab={route.initialTab || 'projects'}
            onOpenResumeBuilder={handleOpenResumeBuilder}
            onOpenCoverLetter={handleOpenCoverLetter}
          />
        )}

        {route.type === 'blog-list' && (
          <BlogList onSelectPost={(slug) => navigateTo(`/blog/${slug}`)} />
        )}

        {route.type === 'blog-post' && (
          <BlogPost
            slug={route.slug}
            onBackToBlog={() => navigateTo('/blog')}
            onSelectPost={(slug) => navigateTo(`/blog/${slug}`)}
            onOpenContact={() => navigateToHomeSection('#contact')}
          />
        )}

        {route.type === 'home' && (
          <>
            <Hero
              onOpenResumeBuilder={handleOpenResumeBuilder}
              onOpenCoverLetter={handleOpenCoverLetter}
            />
            <SkillsGrid />
            <Projects />
            <BlogSection
              onSelectPost={(slug) => navigateTo(`/blog/${slug}`)}
              onViewAllBlog={() => navigateTo('/blog')}
            />
            <ExperienceTimeline />
            <CareerVision />
            <EducationAndReferences />
            <Contact onOpenResumeBuilder={handleOpenResumeBuilder} />
          </>
        )}
      </main>

      {/* Interactive Resume Builder Modal */}
      {isResumeModalOpen && (
        <ResumeBuilderModal
          isOpen={isResumeModalOpen}
          onClose={() => setIsResumeModalOpen(false)}
          onOpenCoverLetter={() => {
            setIsResumeModalOpen(false);
            setIsCoverLetterModalOpen(true);
          }}
        />
      )}

      {/* AI Cover Letter Generator Modal */}
      {isCoverLetterModalOpen && (
        <CoverLetterGeneratorModal
          isOpen={isCoverLetterModalOpen}
          onClose={() => setIsCoverLetterModalOpen(false)}
        />
      )}

      {/* Theme Customizer Modal */}
      {isThemeModalOpen && (
        <ThemeSelectorModal
          isOpen={isThemeModalOpen}
          onClose={() => setIsThemeModalOpen(false)}
        />
      )}

      {/* Passcode Challenge Modal */}
      {isAdminPasscodeModalOpen && (
        <AdminPasscodeModal
          isOpen={isAdminPasscodeModalOpen}
          onClose={() => {
            setIsAdminPasscodeModalOpen(false);
            setAdminChallengeAction(null);
          }}
          onSuccess={handleAdminPasscodeSuccess}
          title={
            adminChallengeAction === 'resume'
              ? 'Resume Builder Admin Access'
              : adminChallengeAction === 'coverLetter'
              ? 'Cover Letter Generator Admin Access'
              : 'Admin Portal Access'
          }
          description="Enter the admin passcode to access administrative settings and content management."
        />
      )}

      {/* Footer */}
      <footer className="bg-[var(--color-dark-bg,#080B11)] border-t border-white/10 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Main Footer Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            {/* Branding & Subtitle */}
            <div className="flex items-center space-x-3 text-center sm:text-left">
              <div className="bg-[var(--color-accent)]/10 p-2 rounded-xl border border-[var(--color-accent)]/25 shrink-0">
                <ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <div>
                <span className="font-display font-extrabold text-white text-base tracking-tight block">
                  Tansom<span className="text-[var(--color-accent)]">.Edu</span>
                </span>
                <span className="text-xs text-[#9CA3AF] font-mono">
                  {PERSONAL_INFO.title}
                </span>
              </div>
            </div>

            {/* Formal Verified Traffic Counter */}
            <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-sm">
              <span className="text-xs font-mono text-[#9CA3AF] tracking-wide">Live Traffic:</span>
              <VisitorCounter variant="navbar" tooltipPlacement="top" />
            </div>
          </div>

          {/* Sub-Footer Copyright & Credits */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#9CA3AF] text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
              {isAdmin && (
                <>
                  <span className="hidden sm:inline text-white/20">•</span>
                  <div className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Admin Session Active</span>
                    <button
                      onClick={handleLogoutAdmin}
                      className="ml-1 text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer"
                    >
                      (Logout)
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleOpenThemeSelector}
                className="text-xs font-mono text-[var(--color-accent)] hover:underline cursor-pointer"
              >
                Change Palette
              </button>
              <span className="text-white/20">•</span>
              <p className="font-sans text-[#D1D5DB] font-light">
                Designed & Developed by <span className="text-white font-medium">{PERSONAL_INFO.name}</span> — {PERSONAL_INFO.title}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Modern Admin Quick Access Dock */}
      <AdminQuickAccess
        currentPath={currentPath}
        onOpenLogin={handleOpenAdminLogin}
        onLogout={handleLogoutAdmin}
      />
    </div>
  );
}
