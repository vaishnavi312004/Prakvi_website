import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  highlightWord?: string;
  description?: string;
  align?: 'left' | 'center';
  /** Retained for backwards compatibility across page callers */
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  highlightWord,
  description,
  align = 'left',
  className = '',
}) => {
  const reducedMotion = useReducedMotion();

  const renderTitle = () => {
    if (!highlightWord || !title.includes(highlightWord)) {
      return title;
    }
    const idx = title.indexOf(highlightWord);
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlightWord.length);
    return (
      <>
        {before}
        <span className="text-accent">{highlightWord}</span>
        {after}
      </>
    );
  };

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reducedMotion ? 0 : 0.42, ease: [0.32, 0.72, 0, 1] }}
      className={`max-w-3xl ${
        align === 'center' ? 'text-center mx-auto' : 'text-left'
      } ${className}`}
    >
      {badge && (
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
          {badge}
        </div>
      )}
      <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground text-balance">
        {renderTitle()}
      </h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-muted">
          {description}
        </p>
      )}
    </motion.div>
  );
};
