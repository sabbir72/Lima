import { useEffect, useState } from 'react';
import { getStoredProfile, PORTFOLIO_UPDATED_EVENT } from './portfolioStore';
import type { ProfileData } from './portfolioStore';

export function usePortfolioProfile(): ProfileData {
  const [profile, setProfile] = useState<ProfileData>(() => getStoredProfile());

  useEffect(() => {
    const syncProfile = () => setProfile(getStoredProfile());
    window.addEventListener(PORTFOLIO_UPDATED_EVENT, syncProfile);
    return () => window.removeEventListener(PORTFOLIO_UPDATED_EVENT, syncProfile);
  }, []);

  return profile;
}
