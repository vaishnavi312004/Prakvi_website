import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { statsData } from '../../data/statsData';
import './CompanyStatistics.css';

export function CompanyStatistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const counters = useRef<Array<HTMLSpanElement | null>>([]);
  const entered = useInView(sectionRef, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();
  const { metrics } = statsData;

  useEffect(() => {
    const renderValues = (progress: number) => {
      metrics.forEach(({ value, suffix }, index) => {
        const counter = counters.current[index];
        const text = `${Math.floor(progress * value)}${suffix}`;
        if (counter && counter.textContent !== text) counter.textContent = text;
      });
    };

    if (reducedMotion) {
      renderValues(1);
      return;
    }

    renderValues(0);
    if (!entered) return;

    let frame: number;
    let start: number | undefined;
    const step = (time: number) => {
      start ??= time;
      const progress = Math.min((time - start) / 2000, 1);
      renderValues(1 - (1 - progress) ** 3);
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [entered, metrics, reducedMotion]);

  return (
    <section ref={sectionRef} aria-label="Company statistics" className="bg-canvas py-section">
      <ul role="list" className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 gap-y-9 px-4 text-center sm:gap-x-8 sm:px-6 lg:grid-cols-4 lg:px-8">
        {metrics.map(({ label, description, value, suffix }, index) => {
          const reveal = (delay: number) => ({
            initial: reducedMotion ? false as const : { opacity: 0, y: 15 },
            animate: entered || reducedMotion ? { opacity: 1, y: 0 } : undefined,
            transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay + index * 0.05, ease: 'easeOut' as const },
          });

          return (
            <li key={label} className="min-w-0 space-y-2.5">
              <motion.div {...reveal(0)} className={`font-display text-[clamp(2rem,6vw,4.5rem)] leading-none font-extrabold tracking-tight tabular-nums ${index % 2 === 0 ? 'text-orange-text' : 'text-accent-text'}`}>
                <span className="sr-only">{value}{suffix}</span>
                <span className="company-statistics__number" aria-hidden="true" ref={(node) => { counters.current[index] = node; }}>
                  {reducedMotion ? value : 0}{suffix}
                </span>
              </motion.div>
              <motion.h3 {...reveal(0.08)} className="text-base font-bold text-foreground sm:text-lg">{label}</motion.h3>
              <motion.p {...reveal(0.16)} className="mx-auto max-w-[28ch] text-sm leading-relaxed text-muted">{description}</motion.p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
