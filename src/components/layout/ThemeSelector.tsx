import React from 'react';
import { PRAKVI_THEMES, PrakviThemeId, usePrakviTheme } from '../../context/ThemeContext';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const { theme, setTheme } = usePrakviTheme();

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-card/90 shadow-sm ${
        compact ? 'px-2 py-1' : 'px-2.5 py-1.5'
      }`}
    >
      {!compact && (
        <span className="hidden xl:inline-block pr-1 text-[11px] font-semibold tracking-wide text-muted">
          Theme
        </span>
      )}
      {PRAKVI_THEMES.map((option) => {
        const isActive = theme === option.id;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setTheme(option.id as PrakviThemeId)}
            aria-label={`Switch theme to ${option.name} (${option.description})`}
            aria-pressed={isActive}
            title={`${option.name} — ${option.description}`}
            className={`relative flex items-center justify-center rounded-full transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              compact ? 'h-5 w-5' : 'h-6 w-6'
            } ${isActive ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-white' : 'hover:scale-105 opacity-85 hover:opacity-100'}`}
            style={{
              background: `linear-gradient(135deg, ${option.swatchSecondary}, ${option.swatchPrimary})`,
              boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.6), 0 3px 8px rgba(23,43,69,0.12)',
            }}
          >
            {isActive && (
              <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" aria-hidden="true" />
            )}
          </button>
        );
      })}
    </div>
  );
};
