import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

/** Masked letter rise for homepage headings, replayed on viewport re-entry. */
export function ScrollRevealText({ text, highlight }: { text: string; highlight?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: '0px 0px -5% 0px' });
  const reducedMotion = useReducedMotion();
  const highlightStart = highlight ? text.indexOf(highlight) : -1;
  const words = Array.from(text.matchAll(/\S+/g));
  const stagger = Math.min(0.012, 0.32 / Math.max(1, text.length));

  return (
    <span ref={ref} className="scroll-title" data-visible={visible || reducedMotion}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((match, wordIndex) => (
          <React.Fragment key={match.index}>
            <span className="scroll-title__word">
              {Array.from(match[0]).map((letter, letterIndex) => {
                const position = match.index + letterIndex;
                const accented = highlightStart >= 0 && position >= highlightStart && position < highlightStart + (highlight?.length ?? 0);
                return (
                  <span className="scroll-title__mask" key={letterIndex}>
                    <span
                      className={`scroll-title__letter${accented ? ' text-accent' : ''}`}
                      style={{ '--title-delay': `${position * stagger}s` } as React.CSSProperties}
                    >{letter}</span>
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </React.Fragment>
        ))}
      </span>
    </span>
  );
}
