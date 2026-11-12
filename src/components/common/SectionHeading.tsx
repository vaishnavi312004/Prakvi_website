import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  description,
  align = 'left',
  theme = 'dark',
  className = '',
}) => {
  const isDark = theme === 'dark';
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl ${alignClass} ${className}`}>
      {badge && (
        <div
          className={`text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${
            isDark ? 'text-[#00F0FF]' : 'text-[#009EDB]'
          }`}
        >
          {badge}
        </div>
      )}

      <h2
        className={`font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-balance ${
          isDark ? 'text-white' : 'text-[#071D3A]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-[#57708E]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
