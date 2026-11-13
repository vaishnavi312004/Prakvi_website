import React from 'react';
interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  /** Retained for existing callers; all sections now share the dark theme. */
  theme?: 'dark' | 'light';
  className?: string;
}
export const SectionHeading: React.FC<SectionHeadingProps> = ({ badge, title, description, align = 'left', className = '' }) => (
  <div className={`max-w-3xl ${align === 'center' ? 'text-center mx-auto' : 'text-left'} ${className}`}>
    {badge && <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-accent">{badge}</div>}
    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-foreground text-balance">{title}</h2>
    {description && <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">{description}</p>}
  </div>
);
