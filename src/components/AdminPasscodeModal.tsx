/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Unified System Lock & Passcode Modal (Mobile Keyboard Friendly)
 * Description : Single unified passcode dialog designed specifically so mobile
 *               virtual keyboards never cover the input or Unlock button, never
 *               trigger forced browser auto-zoom (16px font), and support smooth
 *               one-handed touch entry with Show/Hide toggle.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import React, { useState, useEffect, useRef } from 'react';
import { Lock, KeyRound, ShieldAlert, X, Check, Loader2, Eye, EyeOff } from 'lucide-react';
import { verifyAdminPasscode } from '../utils/adminAuth';

interface AdminPasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  description?: string;
}

export default function AdminPasscodeModal({
  isOpen,
  onClose,
  onSuccess,
  title,
  description,
}: AdminPasscodeModalProps) {
  const [passcode, setPasscode] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [viewportStyle, setViewportStyle] = useState<React.CSSProperties>({});
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);

  // Adapt modal height & top offset dynamically to mobile visualViewport when phone keyboard opens
  useEffect(() => {
    if (!isOpen) return;

    setErrorMsg('');
    setPasscode('');

    // Only auto-focus on desktop devices with a mouse/trackpad so mobile keyboards don't jump abruptly
    if (typeof window !== 'undefined' && window.matchMedia?.('(pointer: fine)').matches) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
    }

    const vv = typeof window !== 'undefined' ? window.visualViewport : null;
    if (!vv) return;

    const updateViewport = () => {
      const keyboardVisible = vv.height < window.innerHeight * 0.82;
      setIsKeyboardOpen(keyboardVisible);
      setViewportStyle({
        height: `${vv.height}px`,
        top: `${vv.offsetTop}px`,
      });
    };

    updateViewport();
    vv.addEventListener('resize', updateViewport);
    vv.addEventListener('scroll', updateViewport);

    return () => {
      vv.removeEventListener('resize', updateViewport);
      vv.removeEventListener('scroll', updateViewport);
      setViewportStyle({});
      setIsKeyboardOpen(false);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputFocus = () => {
    // Ensure submit button and input stay comfortably visible above mobile keyboard
    setTimeout(() => {
      submitBtnRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 220);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim() || isSubmitting) return;

    setErrorMsg('');
    setIsSubmitting(true);

    try {
      const isValid = await verifyAdminPasscode(passcode);
      if (isValid) {
        inputRef.current?.blur();
        setPasscode('');
        onSuccess();
        onClose();
      } else {
        setErrorMsg('পাসকোডটি সঠিক নয়। সঠিক অ্যাডমিন পাসকোড দিন।');
      }
    } catch (err) {
      setErrorMsg('অথেনটিকেশন সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={viewportStyle}
      className={`fixed inset-x-0 top-0 z-[100] min-h-[100dvh] overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md animate-fadeIn flex justify-center px-4 ${
        isKeyboardOpen
          ? 'items-start pt-3 pb-6'
          : 'items-start sm:items-center pt-10 sm:pt-4 pb-10'
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) {
          onClose();
        }
      }}
    >
      <div
        className={`relative w-full max-w-md bg-[#0E1422] border border-white/15 rounded-3xl shadow-2xl text-white transition-all ${
          isKeyboardOpen ? 'p-5 space-y-4' : 'p-6 sm:p-8 space-y-5'
        }`}
        style={{ borderColor: 'var(--color-border-subtle, rgba(0,210,255,0.3))' }}
      >
        {/* Close button (>= 44px touch target) */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lock modal"
          className="absolute top-3.5 right-3.5 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/15 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Compact Header (auto-compacts when phone keyboard is open) */}
        <div className={`text-center ${isKeyboardOpen ? 'space-y-1.5 pr-8 text-left flex items-center gap-3' : 'space-y-2.5'}`}>
          <div
            className={`inline-flex rounded-2xl border text-[var(--color-accent)] shrink-0 ${
              isKeyboardOpen ? 'p-2.5' : 'p-3'
            }`}
            style={{
              backgroundColor: 'rgba(var(--color-accent-rgb, 0, 210, 255), 0.12)',
              borderColor: 'rgba(var(--color-accent-rgb, 0, 210, 255), 0.3)',
            }}
          >
            <Lock className={isKeyboardOpen ? 'w-5 h-5' : 'w-7 h-7'} />
          </div>

          <div className="space-y-1">
            <h3 className={`font-display font-extrabold text-white ${isKeyboardOpen ? 'text-base' : 'text-xl'}`}>
              {title || 'System Lock'}
            </h3>
            {!isKeyboardOpen && (
              <p className="text-xs font-mono text-[#9CA3AF] max-w-xs mx-auto leading-relaxed">
                {description || 'সম্পূর্ণ সিস্টেম আনলক করতে আপনার অ্যাডমিন পাসকোড দিন।'}
              </p>
            )}
          </div>
        </div>

        {/* Error Feedback */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Mobile Keyboard-Friendly Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="unified-system-passcode"
              className="text-xs font-mono text-[#D1D5DB] font-semibold flex items-center gap-1.5"
            >
              <KeyRound className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Admin Passcode</span>
            </label>

            <div className="relative flex items-center">
              <input
                ref={inputRef}
                id="unified-system-passcode"
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onFocus={handleInputFocus}
                placeholder="Enter passcode..."
                autoComplete="current-password"
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                enterKeyHint="go"
                disabled={isSubmitting}
                /* text-base (16px) prevents iOS Safari & Android Chrome auto-zoom on focus */
                className="w-full min-h-[48px] pl-4 pr-12 py-3 rounded-xl bg-white/[0.06] border border-white/20 text-base font-mono text-white placeholder:text-white/35 focus:border-[var(--color-accent)] focus:bg-white/[0.09] focus:outline-none transition-all disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() => setShowPasscode((prev) => !prev)}
                aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
                className="absolute right-1 w-11 h-11 flex items-center justify-center rounded-lg text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
              >
                {showPasscode ? (
                  <EyeOff className="w-4 h-4 text-[var(--color-accent)]" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-1 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="min-h-[46px] px-5 py-2.5 rounded-xl sm:rounded-full bg-white/5 hover:bg-white/10 text-[#D1D5DB] font-mono text-xs font-medium cursor-pointer transition-colors disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              ref={submitBtnRef}
              type="submit"
              disabled={isSubmitting || !passcode.trim()}
              className="shimmer min-h-[48px] px-6 py-3 rounded-xl sm:rounded-full text-black font-mono text-xs sm:text-sm font-bold shadow-lg cursor-pointer flex items-center justify-center space-x-2 transition-all disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 8px 20px -5px var(--color-accent-glow)',
              }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-black" />
                  <span>Unlocking...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Unlock System</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
