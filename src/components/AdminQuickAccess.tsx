/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Unified System Lock Floating Access Dock
 * Description : Mobile-friendly single lock/unlock dock. Automatically hides
 *               when phone virtual keyboard opens so it never blocks typing,
 *               and ensures >= 44px touch targets on mobile screens.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, X, ChevronRight } from 'lucide-react';
import { isAdminAuthenticated } from '../utils/adminAuth';
import { navigateTo } from '../utils/router';

interface AdminQuickAccessProps {
  currentPath?: string;
  onOpenLogin?: () => void;
  onLogout?: () => void;
}

export default function AdminQuickAccess({
  currentPath = '/',
  onOpenLogin,
  onLogout,
}: AdminQuickAccessProps) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => isAdminAuthenticated());
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMobileKeyboardActive, setIsMobileKeyboardActive] = useState<boolean>(false);

  // Sync admin authentication state across tabs & events
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAdmin(isAdminAuthenticated());
    };

    window.addEventListener('admin_auth_changed', handleAuthChange);
    return () => window.removeEventListener('admin_auth_changed', handleAuthChange);
  }, []);

  // Hide floating dock while user is typing with a mobile virtual keyboard
  useEffect(() => {
    const checkKeyboard = () => {
      const vv = window.visualViewport;
      if (vv && window.innerWidth < 768) {
        setIsMobileKeyboardActive(vv.height < window.innerHeight * 0.78);
      } else {
        setIsMobileKeyboardActive(false);
      }
    };

    const handleFocusIn = (e: FocusEvent) => {
      if (window.innerWidth >= 768) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        setIsMobileKeyboardActive(true);
      }
    };

    const handleFocusOut = () => {
      setTimeout(checkKeyboard, 150);
    };

    window.visualViewport?.addEventListener('resize', checkKeyboard);
    window.addEventListener('focusin', handleFocusIn);
    window.addEventListener('focusout', handleFocusOut);

    return () => {
      window.visualViewport?.removeEventListener('resize', checkKeyboard);
      window.removeEventListener('focusin', handleFocusIn);
      window.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Keyboard shortcut listener: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (isAdmin) {
          navigateTo('/admin');
        } else if (onOpenLogin) {
          onOpenLogin();
        } else {
          navigateTo('/admin');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdmin, onOpenLogin]);

  // Do not show floating dock on /admin or while mobile keyboard is active
  if (currentPath === '/admin' || currentPath.startsWith('/admin') || isMobileKeyboardActive) {
    return null;
  }

  const handleOpenAdmin = () => {
    if (isAdmin) {
      navigateTo('/admin');
    } else if (onOpenLogin) {
      onOpenLogin();
    } else {
      navigateTo('/admin');
    }
  };

  // Locked state: clean 44x44px mobile-friendly single lock trigger
  if (!isAdmin) {
    return (
      <aside
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 select-none font-mono"
        aria-label="System Lock Access"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <button
          onClick={handleOpenAdmin}
          className="group flex items-center justify-center w-11 h-11 rounded-full bg-[#12151C]/90 hover:bg-[#12151C] border border-white/15 hover:border-[var(--color-accent)]/60 text-[#9CA3AF] hover:text-[var(--color-accent)] shadow-xl backdrop-blur-md transition-all duration-300 active:scale-95 cursor-pointer"
          title="Unlock System (Admin Passcode)"
          aria-label="Unlock System"
        >
          <Lock className="w-4 h-4 group-hover:rotate-6 transition-transform" />
        </button>

        {isHovered && (
          <div className="hidden sm:block absolute -top-9 right-0 bg-[#090A0E] text-[#D1D5DB] border border-white/15 px-2.5 py-1 rounded-md text-[10px] whitespace-nowrap shadow-xl pointer-events-none animate-fadeIn">
            System Lock <kbd className="px-1 py-0.5 rounded bg-white/10 text-white font-semibold ml-1">Ctrl+Shift+A</kbd>
          </div>
        )}
      </aside>
    );
  }

  // Unlocked state: Unified Admin System pill with 1-tap Lock button
  return (
    <aside
      className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 select-none font-mono animate-fadeIn"
      aria-label="System Unlocked Dock"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="group flex items-center justify-center w-11 h-11 rounded-full shadow-2xl transition-all duration-300 backdrop-blur-xl border border-emerald-500/50 hover:border-emerald-400 bg-[#12151C]/95 text-emerald-400 shadow-emerald-500/20 active:scale-95 cursor-pointer relative"
          title="Expand Admin Panel"
          aria-label="Expand Admin Dock"
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0B0D12] bg-emerald-400 animate-pulse" />
        </button>
      ) : (
        <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-2xl backdrop-blur-xl border border-emerald-500/40 hover:border-emerald-400 bg-[#12151C]/95 shadow-emerald-950/40 transition-all duration-300">
          <button
            onClick={handleOpenAdmin}
            className="min-h-[38px] flex items-center space-x-2 text-left group cursor-pointer px-1"
            title="Open Portfolio Admin Panel"
          >
            <div className="p-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 text-emerald-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="flex flex-col pr-0.5">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-xs font-bold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                  Admin Panel
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-emerald-400/80 font-light mt-0.5 leading-none">
                System Unlocked
              </span>
            </div>

            <ChevronRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-white transition-all" />
          </button>

          {/* 1-Tap Lock System Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onLogout) {
                onLogout();
              }
            }}
            className="w-9 h-9 flex items-center justify-center rounded-full text-red-400 hover:text-red-300 hover:bg-red-500/15 transition-colors cursor-pointer"
            title="Lock System"
            aria-label="Lock System"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Minimize Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#9CA3AF] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Minimize"
            aria-label="Minimize Admin Dock"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </aside>
  );
}
