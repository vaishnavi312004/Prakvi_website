import React, { useEffect, useRef, useState } from 'react';
import { Check, Palette } from 'lucide-react';
import { PRAKVI_THEMES, PrakviThemeId, usePrakviTheme } from '../../context/ThemeContext';

interface ThemeSelectorProps {
  compact?: boolean;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ compact = false }) => {
  const { theme, setTheme, activeThemeMeta } = usePrakviTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <div
        role="group"
        aria-label="Website color theme switcher"
        className={`inline-flex items-center gap-1.5 rounded-full border border-line bg-card/90 shadow-sm ${
          compact ? 'px-2 py-1' : 'px-2.5 py-1.5'
        }`}
      >
        {PRAKVI_THEMES.map((option) => {
          const isActive = theme === option.id;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTheme(option.id)}
              aria-label={`Switch theme to ${option.name}`}
              aria-pressed={isActive}
              title={option.name}
              className={`relative flex items-center justify-center rounded-full transition-transform duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                compact ? 'h-5 w-5' : 'h-6 w-6'
              } ${
                isActive
                  ? 'scale-110 ring-2 ring-accent ring-offset-2 ring-offset-card'
                  : 'opacity-85 hover:scale-105 hover:opacity-100'
              }`}
              style={{
                background: `linear-gradient(135deg, ${option.swatchPrimary} 42%, ${option.swatchSecondary} 78%, ${option.swatchAccent} 100%)`,
                boxShadow:
                  'inset 0 2px 3px rgba(255,255,255,0.5), 0 2px 6px rgba(23,43,69,0.16)',
              }}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" aria-hidden="true" />
              )}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label={`Theme details: ${activeThemeMeta.name}`}
          title={`Theme: ${activeThemeMeta.name}`}
          className={`flex items-center justify-center rounded-full border border-line transition-colors ${
            compact ? 'h-5 w-5' : 'h-6 w-6'
          } ${
            open
              ? 'bg-accent text-white border-accent'
              : 'bg-surface text-muted hover:text-accent'
          }`}
        >
          <Palette className="h-3 w-3" aria-hidden="true" />
        </button>
      </div>

      {open && (
        <div className="clay-card absolute right-0 top-full mt-3 z-50 w-76 p-3 shadow-xl border border-line bg-card/95 backdrop-blur-xl">
          <div className="px-2 pb-1.5 text-[11px] font-semibold text-accent-text">
            Prakvi Visual Themes
          </div>
          <div className="space-y-1">
            {PRAKVI_THEMES.map((option) => {
              const active = theme === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setTheme(option.id as PrakviThemeId);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                    active
                      ? 'bg-soft-blue text-foreground ring-1 ring-accent/40'
                      : 'hover:bg-surface text-foreground'
                  }`}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-full border border-white/60 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, ${option.swatchPrimary} 45%, ${option.swatchSecondary} 80%, ${option.swatchAccent} 100%)`,
                    }}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold leading-tight text-foreground">
                      {option.name}
                    </span>
                    <span className="block truncate text-[11px] text-muted mt-0.5">
                      {option.description}
                    </span>
                  </span>
                  {active && <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
