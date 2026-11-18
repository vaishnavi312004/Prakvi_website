import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { Activity, Cable, Network, Pause, Play, Route, ScanSearch, ShieldCheck } from 'lucide-react';
import type { ServiceItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import './EnterpriseArchitectureJourney.css';

const stepIcons = [ScanSearch, Network, ShieldCheck, Route, Cable, Activity];
const journeyPath = 'M100 36 Q200 58 300 36 T500 36 T700 36 T900 36 T1100 36';

interface EnterpriseArchitectureJourneyProps {
  title: string;
  description: string;
  steps: ServiceItem['deliverySteps'];
}

export const EnterpriseArchitectureJourney: React.FC<EnterpriseArchitectureJourneyProps> = ({
  title, description, steps,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [detailHeight, setDetailHeight] = useState<number>();
  const sectionRef = useRef<HTMLElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGSVGElement>(null);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const swipeStart = useRef<{ x: number; y: number } | null>(null);
  const journeyId = useId();
  const inView = useInView(sectionRef, { amount: 0.35 });
  const animatePath = playing && !reducedMotion && pageVisible && inView;
  const progressing = animatePath && !hovered && !focused && !touching;
  const active = steps[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!progressing) return;
    const timeout = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % steps.length);
    }, 6000);
    return () => window.clearTimeout(timeout);
  }, [activeIndex, progressing, steps.length]);

  useEffect(() => {
    if (animatePath) pathRef.current?.unpauseAnimations();
    else pathRef.current?.pauseAnimations();
  }, [animatePath]);

  useEffect(() => {
    const content = detailContentRef.current;
    if (!content) return;
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (height > 0) setDetailHeight(height);
    });
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const selector = selectorRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!selector || !tab || selector.scrollWidth <= selector.clientWidth) return;

    const viewport = selector.getBoundingClientRect();
    const node = tab.getBoundingClientRect();
    if (node.left >= viewport.left && node.right <= viewport.right) return;

    // Reveal the selected step inside the horizontal strip without moving the page.
    selector.scrollTo({
      left: selector.scrollLeft + node.left - viewport.left - (viewport.width - node.width) / 2,
      behavior: reducedMotion ? 'instant' : 'smooth',
    });
  }, [activeIndex, reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="enterprise-process"
      className="ea-journey"
      aria-label={title}
      data-animated={animatePath}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
      onTouchStart={() => setTouching(true)}
      onTouchEnd={(event) => {
        if (event.touches.length === 0) setTouching(false);
      }}
      onTouchCancel={() => setTouching(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} align="center" className="ea-journey-heading" />

        <div className="ea-journey-scroll" ref={selectorRef}>
          <div className="ea-journey-track">
            <svg
              ref={pathRef}
              className="ea-journey-path"
              viewBox="0 0 1200 72"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`${journeyId}-line`}>
                  <stop offset="0%" stopColor="#309ccc" />
                  <stop offset="100%" stopColor="#d18a51" />
                </linearGradient>
                <radialGradient id={`${journeyId}-light`}>
                  <stop offset="0%" stopColor="#fffaf0" />
                  <stop offset="52%" stopColor="#f2b267" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#f2b267" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d={journeyPath} fill="none" stroke="#a1b8c7" strokeWidth="1.3" vectorEffect="non-scaling-stroke" />
              <motion.path
                d={journeyPath}
                fill="none"
                stroke={`url(#${journeyId}-line)`}
                strokeWidth="2"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: activeIndex / (steps.length - 1) }}
                transition={{ duration: reducedMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
              />
              <g className="ea-journey-light" opacity="0">
                <circle r="8" fill={`url(#${journeyId}-light)`} />
                <circle r="2.5" fill="#ffd9a1" />
                <animateMotion dur="8s" repeatCount="indefinite" path={journeyPath} />
                <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.08;0.92;1" dur="8s" repeatCount="indefinite" />
              </g>
            </svg>

            <div role="tablist" aria-label="Enterprise Architecture journey" className="ea-journey-nodes">
              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                const selected = index === activeIndex;

                return (
                  <button
                    key={step.step}
                    ref={(element) => { tabRefs.current[index] = element; }}
                    id={`${journeyId}-step-${index}`}
                    type="button"
                    role="tab"
                    tabIndex={selected ? 0 : -1}
                    aria-selected={selected}
                    aria-controls={`${journeyId}-detail`}
                    className="ea-journey-node"
                    onClick={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                      let next: number;
                      switch (event.key) {
                        case 'ArrowLeft': next = (index - 1 + steps.length) % steps.length; break;
                        case 'ArrowRight': next = (index + 1) % steps.length; break;
                        case 'Home': next = 0; break;
                        case 'End': next = steps.length - 1; break;
                        default: return;
                      }
                      event.preventDefault();
                      setActiveIndex(next);
                      tabRefs.current[next]?.focus({ preventScroll: true });
                    }}
                  >
                    <span className="ea-journey-node-icon" aria-hidden="true"><Icon /></span>
                    <span className="ea-journey-node-title">
                      <span className="ea-journey-step-number">{step.step}</span>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ea-journey-glass">
          <div
            id={`${journeyId}-detail`}
            className="ea-journey-detail"
            role="tabpanel"
            aria-labelledby={`${journeyId}-step-${activeIndex}`}
            tabIndex={0}
            style={{ height: detailHeight }}
            onTouchStart={(event) => {
              swipeStart.current = event.touches.length === 1
                ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
                : null;
            }}
            onTouchEnd={(event) => {
              const start = swipeStart.current;
              swipeStart.current = null;
              if (!start) return;
              const end = event.changedTouches[0];
              const dx = end.clientX - start.x;
              const dy = end.clientY - start.y;
              if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.4) {
                setActiveIndex((index) => (index + (dx < 0 ? 1 : -1) + steps.length) % steps.length);
              }
            }}
            onTouchCancel={() => { swipeStart.current = null; }}
          >
            <div ref={detailContentRef}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.step}
                  className="ea-journey-detail-content"
                  initial={reducedMotion ? false : { opacity: 0, y: 7 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -4 }}
                  transition={{ duration: reducedMotion ? 0 : 0.19, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <h3>{active.title}</h3>
                    <p>{active.description}</p>
                  </div>
                  {active.points && (
                    <ul>{active.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {!reducedMotion && (
            <button
              type="button"
              className="ea-journey-playback"
              aria-label={playing ? 'Pause automatic progression' : 'Resume automatic progression'}
              title={playing ? 'Pause automatic progression' : 'Resume automatic progression'}
              onClick={() => setPlaying((current) => !current)}
            >
              {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
