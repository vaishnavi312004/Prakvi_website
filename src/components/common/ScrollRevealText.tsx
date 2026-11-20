import React, { useLayoutEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

/** Masked letter rise for headings, replayed on viewport re-entry by default. */
export function ScrollRevealText({ text, highlight, preserveLayout = false, once = false }: {
  text: string;
  highlight?: string;
  preserveLayout?: boolean;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { amount: 0.1, margin: '0px 0px -5% 0px', once });
  const reducedMotion = useReducedMotion();
  useLayoutEffect(() => {
    const element = ref.current;
    const parent = element?.parentElement;
    if (!preserveLayout || !element || !parent) return;

    const preserveWordWidths = () => {
      const parentRect = parent.getBoundingClientRect();
      const scale = parent.offsetWidth > 0 && parentRect.width > 0 ? parentRect.width / parent.offsetWidth : 1;

      element.querySelectorAll<HTMLElement>('.scroll-title__word').forEach(word => {
        const letters = [...word.querySelectorAll<HTMLElement>('.scroll-title__letter')];
        if (letters.length < 2) return;

        const probe = document.createElement('span');
        probe.className = 'scroll-title__word';
        probe.textContent = word.textContent;
        probe.style.cssText = 'position:absolute;left:-10000px;top:0;visibility:hidden;pointer-events:none;';
        parent.appendChild(probe);
        const nativeWidth = probe.getBoundingClientRect().width / scale;
        probe.remove();

        const letterWidth = letters.reduce((width, letter) => width + letter.getBoundingClientRect().width / scale, 0);
        const spacing = (nativeWidth - letterWidth) / (letters.length - 1);
        letters.forEach((letter, index) => {
          letter.style.setProperty('--scroll-title-letter-spacing', index < letters.length - 1 ? `${spacing}px` : '0px');
        });
      });
    };

    preserveWordWidths();
    if (typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver(preserveWordWidths);
    observer.observe(parent);
    return () => observer.disconnect();
  }, [preserveLayout]);
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
                      className={`scroll-title__letter${accented ? ' text-accent-text' : ''}`}
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
