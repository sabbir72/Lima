/**
 * -----------------------------------------
 * Project     : Tansom Akther Lima Educator Portfolio
 * Module      : Unified Single System Lock Store
 * Description : Consolidated single system-wide lock across Portfolio, Blog,
 *               ATS Resume Suite, Cover Letter Suite, and Admin CMS.
 *               Eliminates separate conflicting per-module locks in favor of
 *               one global lock state + single Admin Passcode unlock.
 * Author      : Tansom Akther Lima
 * -----------------------------------------
 */

import { isAdminAuthenticated } from './adminAuth';

export interface SystemLocks {
  // Master Single System Lock (Controls the entire application uniformly)
  systemLocked: boolean;

  // Derived synchronized fields kept for compatibility across components
  blogLocked: boolean;
  blogPublicBrowsing: boolean;
  blogArticleEditingLocked: boolean;
  resumeLocked: boolean;
  resumeDownloadLocked: boolean;
  coverLetterLocked: boolean;
  coverLetterExportLocked: boolean;
  projectsLocked: boolean;
  experienceLocked: boolean;
  skillsLocked: boolean;
  profileLocked: boolean;

  lastModified: string;
}

const STORAGE_KEY_LOCKS = 'tansom_unified_system_lock_v2';
export const LOCKS_UPDATED_EVENT = 'sabbir_system_locks_updated';

function buildUnifiedLockState(systemLocked: boolean, lastModified?: string): SystemLocks {
  return {
    systemLocked,
    blogLocked: systemLocked,
    blogPublicBrowsing: true, // Public visitors can always read published articles
    blogArticleEditingLocked: systemLocked,
    resumeLocked: systemLocked,
    resumeDownloadLocked: systemLocked,
    coverLetterLocked: systemLocked,
    coverLetterExportLocked: systemLocked,
    projectsLocked: systemLocked,
    experienceLocked: systemLocked,
    skillsLocked: systemLocked,
    profileLocked: systemLocked,
    lastModified: lastModified || new Date().toISOString(),
  };
}

export const DEFAULT_LOCKS: SystemLocks = buildUnifiedLockState(true);

/**
 * Retrieve current unified system lock state
 */
export function getSystemLocks(): SystemLocks {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LOCKS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (typeof parsed?.systemLocked === 'boolean') {
        return buildUnifiedLockState(parsed.systemLocked, parsed.lastModified);
      }
    }
  } catch (e) {
    console.error('Error reading unified lock state:', e);
  }
  return { ...DEFAULT_LOCKS };
}

/**
 * Returns true if protected actions currently require the Admin Passcode.
 * When Admin is authenticated OR the Master System Lock is turned off, returns false.
 */
export function isSystemActionLocked(): boolean {
  if (isAdminAuthenticated()) return false;
  return getSystemLocks().systemLocked;
}

/**
 * Set the single global system lock ON or OFF
 */
export function setMasterSystemLock(locked: boolean): SystemLocks {
  const updated = buildUnifiedLockState(locked);
  try {
    localStorage.setItem(STORAGE_KEY_LOCKS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(LOCKS_UPDATED_EVENT, { detail: updated }));
  } catch (e) {
    console.error('Error saving unified lock state:', e);
  }
  return updated;
}

/**
 * Update system lock configuration (maps any lock update to the single unified lock)
 */
export function updateSystemLocks(updates: Partial<SystemLocks>): SystemLocks {
  const current = getSystemLocks();
  const nextLocked =
    typeof updates.systemLocked === 'boolean'
      ? updates.systemLocked
      : current.systemLocked;
  return setMasterSystemLock(nextLocked);
}

/**
 * Toggle the single unified system lock
 */
export function toggleSystemLock(_lockKey?: keyof Omit<SystemLocks, 'lastModified'>): SystemLocks {
  const current = getSystemLocks();
  return setMasterSystemLock(!current.systemLocked);
}

/**
 * 1-Click Master Lock: Enable single unified system lock
 */
export function lockAllSystems(): SystemLocks {
  return setMasterSystemLock(true);
}

/**
 * 1-Click Master Unlock: Turn off system lock globally
 */
export function unlockAllSystems(): SystemLocks {
  return setMasterSystemLock(false);
}

/**
 * Reset to standard protected mode (Single System Lock ON)
 */
export function resetSystemLocks(): SystemLocks {
  return setMasterSystemLock(true);
}
