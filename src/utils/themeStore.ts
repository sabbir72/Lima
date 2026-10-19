/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Dynamic Theme & Color View Manager
 * Description : Centralized color theme system providing refined palettes
 *               for an educator and educational media portfolio.
 *               Persists user selection across sessions with live CSS custom property injection.
 * Author      : Tansom Akther Lima
 * Last Updated: 2026-10-14
 * -----------------------------------------
 */

export interface ColorTheme {
  id: string;
  name: string;
  subtitle: string;
  primary: string;
  light: string;
  hover: string;
  glow: string;
  rgb: string;
  bgDark: string;
  cardDark: string;
  borderSubtle: string;
  gradientBadge: string;
}

export const COLOR_THEMES: Record<string, ColorTheme> = {
  'rose-corporate': {
    id: 'rose-corporate',
    name: 'Rose Executive',
    subtitle: 'Professional, elegant, and refined for a clean corporate identity',
    primary: '#C79D89',
    light: '#EAD9CF',
    hover: '#A77F68',
    glow: 'rgba(199, 157, 137, 0.24)',
    rgb: '199, 157, 137',
    bgDark: '#243544',
    cardDark: '#2E4355',
    borderSubtle: 'rgba(199, 157, 137, 0.22)',
    gradientBadge: 'from-[#C79D89]/20 to-[#A77F68]/5'
  },
  'plum-royal': {
    id: 'plum-royal',
    name: 'Plum Royal',
    subtitle: 'Premium executive styling with refined feminine authority',
    primary: '#A66BEA',
    light: '#D8C3FF',
    hover: '#7D4FBD',
    glow: 'rgba(166, 107, 234, 0.28)',
    rgb: '166, 107, 234',
    bgDark: '#2B2940',
    cardDark: '#393550',
    borderSubtle: 'rgba(166, 107, 234, 0.25)',
    gradientBadge: 'from-[#A66BEA]/20 to-[#7D4FBD]/5'
  },
  'ink-rose': {
    id: 'ink-rose',
    name: 'Ink Rose',
    subtitle: 'Deep navy with soft rose highlights for a formal profile aesthetic',
    primary: '#E68FB4',
    light: '#F8D9E5',
    hover: '#C5678F',
    glow: 'rgba(230, 143, 180, 0.28)',
    rgb: '230, 143, 180',
    bgDark: '#20364A',
    cardDark: '#2D455A',
    borderSubtle: 'rgba(230, 143, 180, 0.25)',
    gradientBadge: 'from-[#E68FB4]/20 to-[#C5678F]/5'
  },
  'sage-glass': {
    id: 'sage-glass',
    name: 'Deep Ocean',
    subtitle: 'Professional navy and aqua palette for a polished corporate identity',
    primary: '#4CC9F0',
    light: '#D9F9FF',
    hover: '#2595C9',
    glow: 'rgba(76, 201, 240, 0.28)',
    rgb: '76, 201, 240',
    bgDark: '#1E3B52',
    cardDark: '#2A4D66',
    borderSubtle: 'rgba(76, 201, 240, 0.25)',
    gradientBadge: 'from-[#4CC9F0]/20 to-[#2595C9]/5'
  },
  'champagne-gold': {
    id: 'champagne-gold',
    name: 'Champagne Gold',
    subtitle: 'Elegant gold and stone tones for a formal premium presentation',
    primary: '#D9B77A',
    light: '#F2E2B8',
    hover: '#B28E52',
    glow: 'rgba(217, 183, 122, 0.28)',
    rgb: '217, 183, 122',
    bgDark: '#2B3D52',
    cardDark: '#374D63',
    borderSubtle: 'rgba(217, 183, 122, 0.25)',
    gradientBadge: 'from-[#D9B77A]/20 to-[#B28E52]/5'
  }
};

const THEME_STORAGE_KEY = 'tansom_edu_theme_id_v1';
export const DEFAULT_THEME_ID = 'sage-glass';

/**
 * Applies the given theme parameters to the root document CSS custom variables
 */
export function applyThemeToDocument(theme: ColorTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  
  root.style.setProperty('--color-accent', theme.primary);
  root.style.setProperty('--color-accent-light', theme.light);
  root.style.setProperty('--color-accent-hover', theme.hover);
  root.style.setProperty('--color-accent-glow', theme.glow);
  root.style.setProperty('--color-accent-rgb', theme.rgb);
  root.style.setProperty('--color-dark-bg', theme.bgDark);
  root.style.setProperty('--color-dark-card', theme.cardDark);
  root.style.setProperty('--color-border-subtle', theme.borderSubtle);
  root.style.setProperty('--color-text-primary', '#edf3f8');
  root.style.setProperty('--color-text-secondary', '#ced8e3');
  root.style.setProperty('--color-text-muted', '#aab7c6');

  // Update meta theme-color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute('content', theme.bgDark);
  }
}

/**
 * Retrieves the currently saved theme ID or default
 */
export function getSavedThemeId(): string {
  try {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      if (saved && COLOR_THEMES[saved]) {
        return saved;
      }
    }
  } catch (err) {
    console.warn('Failed to read theme preference from storage', err);
  }
  return DEFAULT_THEME_ID;
}

/**
 * Sets and applies a theme by ID
 */
export function setAndApplyTheme(themeId: string): ColorTheme {
  const selected = COLOR_THEMES[themeId] || COLOR_THEMES[DEFAULT_THEME_ID];
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, selected.id);
    }
  } catch (err) {
    console.warn('Failed to save theme preference', err);
  }

  applyThemeToDocument(selected);

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lima_theme_changed', { detail: selected }));
  }

  return selected;
}

/**
 * Initializes theme on early page load
 */
export function initializeTheme(): ColorTheme {
  const currentId = getSavedThemeId();
  const theme = COLOR_THEMES[currentId] || COLOR_THEMES[DEFAULT_THEME_ID];
  applyThemeToDocument(theme);
  return theme;
}
