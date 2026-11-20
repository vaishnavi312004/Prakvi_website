import React, { createContext, useContext, useEffect, useState } from 'react';

export type PrakviThemeId = 'soft-innovation' | 'lavender-mist' | 'warm-innovation';

export interface ThemeOption {
  id: PrakviThemeId;
  name: string;
  description: string;
  swatchPrimary: string;
  swatchSecondary: string;
  swatchAccent: string;
}

export const PRAKVI_THEMES: ThemeOption[] = [
  {
    id: 'soft-innovation',
    name: 'Soft Innovation',
    description: 'Ice white, sky blue, soft cyan, lavender & selective orange CTAs',
    swatchPrimary: '#079CEB',
    swatchSecondary: '#16C6D4',
    swatchAccent: '#F28C45',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Mist',
    description: 'Soft lavender, pale violet, light sky blue & balanced orange highlights',
    swatchPrimary: '#7C6CE6',
    swatchSecondary: '#DDF1FF',
    swatchAccent: '#F28C45',
  },
  {
    id: 'warm-innovation',
    name: 'Warm Innovation',
    description: 'Warm beige, soft peach, sky blue, cyan & muted orange clay tones',
    swatchPrimary: '#E9DCC8',
    swatchSecondary: '#079CEB',
    swatchAccent: '#F28C45',
  },
];

const STORAGE_KEY = 'prakvi-theme-v4';

interface ThemeContextValue {
  theme: PrakviThemeId;
  setTheme: (theme: PrakviThemeId) => void;
  activeThemeMeta: ThemeOption;
  themes: ThemeOption[];
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode; persistTheme: boolean }> = ({ children, persistTheme }) => {
  const [theme, setThemeState] = useState<PrakviThemeId>(() => {
    if (!persistTheme || typeof window === 'undefined') return 'soft-innovation';
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as PrakviThemeId | null;
      if (saved && PRAKVI_THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage read restrictions
    }
    return 'soft-innovation';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-polarity', 'light');
    try {
      if (persistTheme) {
        window.localStorage.setItem(STORAGE_KEY, theme);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Ignore storage write errors
    }
  }, [theme, persistTheme]);

  const setTheme = (nextTheme: PrakviThemeId) => {
    setThemeState(nextTheme);
  };

  const activeThemeMeta =
    PRAKVI_THEMES.find((t) => t.id === theme) || PRAKVI_THEMES[0];

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        activeThemeMeta,
        themes: PRAKVI_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const usePrakviTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('usePrakviTheme must be used within a ThemeProvider');
  }
  return ctx;
};
