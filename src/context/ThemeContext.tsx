import React, { createContext, useContext, useEffect, useState } from 'react';

export type PrakviThemeId = 'soft-innovation' | 'lavender-mist' | 'fresh-mint';

export interface ThemeOption {
  id: PrakviThemeId;
  name: string;
  description: string;
  swatchPrimary: string;
  swatchSecondary: string;
  swatchCanvas: string;
}

export const PRAKVI_THEMES: ThemeOption[] = [
  {
    id: 'soft-innovation',
    name: 'Prakvi Signature',
    description: 'Warm ivory, midnight charcoal, Prakvi blue & orange',
    swatchPrimary: '#F97316',
    swatchSecondary: '#009EDB',
    swatchCanvas: '#FBF8F2',
  },
  {
    id: 'lavender-mist',
    name: 'Lavender Frost',
    description: 'Frosted lavender, royal indigo & sky glass',
    swatchPrimary: '#6D5CE6',
    swatchSecondary: '#3B9EE8',
    swatchCanvas: '#F7F5FC',
  },
  {
    id: 'fresh-mint',
    name: 'Fresh Mint',
    description: 'Frosted mint, aqua & deep teal glass',
    swatchPrimary: '#0D9488',
    swatchSecondary: '#0EA5E9',
    swatchCanvas: '#F3FAF7',
  },
];

const STORAGE_KEY = 'prakvi-theme';

interface ThemeContextValue {
  theme: PrakviThemeId;
  setTheme: (theme: PrakviThemeId) => void;
  activeThemeMeta: ThemeOption;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<PrakviThemeId>(() => {
    if (typeof window === 'undefined') return 'soft-innovation';
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as PrakviThemeId | null;
      if (saved && PRAKVI_THEMES.some((t) => t.id === saved)) {
        return saved;
      }
    } catch {
      // Ignore storage access restrictions
    }
    return 'soft-innovation';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const setTheme = (nextTheme: PrakviThemeId) => {
    setThemeState(nextTheme);
  };

  const activeThemeMeta =
    PRAKVI_THEMES.find((t) => t.id === theme) || PRAKVI_THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, activeThemeMeta }}>
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
