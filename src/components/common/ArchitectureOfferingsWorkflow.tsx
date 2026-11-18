import React, { useEffect, useId, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { Headphones, Layers, Plug, Server } from 'lucide-react';
import type { ServiceItem } from '../../types';
import { SectionHeading } from './SectionHeading';
import './ArchitectureOfferingsWorkflow.css';

const serviceIcons = { Headphones, Server, Plug, Layers };
const path = 'M162 56.25 C162 113 438 112 438 168.75 C438 225 162 225 162 281.25 C162 338 438 337 438 393.75';
const viewWidth = 600;
const viewHeight = 450;
const ease = [0.22, 1, 0.36, 1] as const;
const pulseDuration = 650;

interface ArchitectureOfferingsWorkflowProps {
  title: string;
  description: string;
  services: ServiceItem['capabilities'];
}

export const ArchitectureOfferingsWorkflow: React.FC<ArchitectureOfferingsWorkflowProps> = ({
  title, description, services,
}) => {
  const [selection, setSelection] = useState({ index: 0, previous: 0 });
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const track = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const nodes = useRef<(HTMLDivElement | null)[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const cutouts = useRef<(SVGRectElement | null)[]>([]);
  const id = useId();
  const activeIndex = selection.index;
  const inView = useInView(track, { amount: 0.15 });
  const moving = inView && pageVisible && !reduced;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(preference.matches);
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
    if (moving) {
      svg.current?.unpauseAnimations();
    } else {
      svg.current?.pauseAnimations();
      setSelection((current) => current.index === current.previous ? current : { ...current, previous: current.index });
    }
  }, [moving]);

  useEffect(() => {
    if (!moving || selection.previous === selection.index) return;
    const timeout = window.setTimeout(() => {
      setSelection((current) => current === selection ? { ...current, previous: current.index } : current);
    }, pulseDuration);
    return () => window.clearTimeout(timeout);
  }, [moving, selection]);

  useEffect(() => {
    const stage = track.current;
    if (!stage) return;
    // Use the unanimated card footprints so the line stays behind the glass and its text.
    const measure = () => {
      const bounds = stage.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;
      const sx = viewWidth / bounds.width;
      const sy = viewHeight / bounds.height;
      nodes.current.forEach((node, index) => {
        const cutout = cutouts.current[index];
        if (!node || !cutout) return;
        const box = node.getBoundingClientRect();
        const inset = 4;
        cutout.setAttribute('x', String((box.left - bounds.left + inset) * sx));
        cutout.setAttribute('y', String((box.top - bounds.top + inset) * sy));
        cutout.setAttribute('width', String(Math.max(0, box.width - 2 * inset) * sx));
        cutout.setAttribute('height', String(Math.max(0, box.height - 2 * inset) * sy));
        cutout.setAttribute('rx', String(12 * sx));
        cutout.setAttribute('ry', String(12 * sy));
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    nodes.current.forEach((node) => { if (node) observer.observe(node); });
    measure();
    return () => observer.disconnect();
  }, [services.length]);

  const select = (index: number) => {
    setSelection((current) => current.index === index ? current : { index, previous: current.index });
  };

  return (
    <section id="capabilities" className="ea-offerings py-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} align="center" />

        <div className="ea-workflow" data-moving={moving}>
          <div className="ea-workflow-details">
            {services.map((service, index) => {
              const selected = index === activeIndex;
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Layers;
              return (
                <motion.article
                  key={service.title}
                  id={`${id}-panel-${index}`}
                  role="tabpanel"
                  aria-labelledby={`${id}-tab-${index}`}
                  aria-hidden={!selected}
                  tabIndex={selected ? 0 : -1}
                  className="ea-workflow-detail"
                  data-active={selected}
                  initial={false}
                  animate={{ opacity: selected ? 1 : 0, y: selected || reduced ? 0 : 9 }}
                  transition={reduced ? { duration: 0 } : {
                    opacity: { duration: selected ? 0.24 : 0.12, delay: selected ? 0.09 : 0, ease },
                    y: { duration: 0.32, ease },
                  }}
                >
                  <div className="ea-workflow-detail-heading">
                    <span className="ea-workflow-icon"><Icon aria-hidden="true" /></span>
                    <h3>{service.title}</h3>
                  </div>
                  <p>{service.description}</p>
                  {service.points && (
                    <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
                  )}
                </motion.article>
              );
            })}
          </div>

          <div ref={track} className="ea-workflow-track" role="tablist" aria-label={title} aria-orientation="vertical">
            <svg
              ref={svg}
              className="ea-workflow-path"
              viewBox={`0 0 ${viewWidth} ${viewHeight}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id={`${id}-current`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#74d8ef" />
                  <stop offset="48%" stopColor="#478fdb" />
                  <stop offset="100%" stopColor="#8bcbe9" />
                </linearGradient>
                <radialGradient id={`${id}-spark`}>
                  <stop offset="0%" stopColor="#f9feff" />
                  <stop offset="28%" stopColor="#d6f8ff" />
                  <stop offset="58%" stopColor="#71d4f1" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#71d4f1" stopOpacity="0" />
                </radialGradient>
                <mask id={`${id}-cards`} maskUnits="userSpaceOnUse" x="0" y="0" width={viewWidth} height={viewHeight}>
                  <rect width={viewWidth} height={viewHeight} fill="white" />
                  {services.map((service, index) => (
                    <rect key={service.title} ref={(node) => { cutouts.current[index] = node; }} fill="black" />
                  ))}
                </mask>
              </defs>
              <g mask={`url(#${id}-cards)`}>
                <path className="ea-workflow-path-aura" d={path} stroke={`url(#${id}-current)`} />
                <path className="ea-workflow-path-line" d={path} stroke={`url(#${id}-current)`} />
                {([0, -3.4, -6.8] as const).map((start) => (
                  <circle key={start} className="ea-workflow-particle" r="8" fill={`url(#${id}-spark)`} opacity="0">
                    <animateMotion dur="10.2s" begin={`${start}s`} repeatCount="indefinite" path={path} />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.07;0.93;1" dur="10.2s" begin={`${start}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {moving && selection.previous !== activeIndex && (
                  <path
                    key={activeIndex}
                    className="ea-workflow-pulse"
                    d={path}
                    pathLength={1}
                    style={{
                      animationDuration: `${pulseDuration}ms`,
                      '--pulse-from': 0.045 - selection.previous / (services.length - 1),
                      '--pulse-to': 0.045 - activeIndex / (services.length - 1),
                    } as React.CSSProperties}
                  />
                )}
              </g>
            </svg>

            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon as keyof typeof serviceIcons] ?? Layers;
              return (
                <div
                  key={service.title}
                  ref={(node) => { nodes.current[index] = node; }}
                  className="ea-workflow-node"
                >
                  <div className="ea-workflow-float">
                    <button
                      ref={(node) => { buttons.current[index] = node; }}
                      id={`${id}-tab-${index}`}
                      type="button"
                      role="tab"
                      aria-selected={index === activeIndex}
                      aria-controls={`${id}-panel-${index}`}
                      tabIndex={index === activeIndex ? 0 : -1}
                      onClick={() => select(index)}
                      onKeyDown={(event) => {
                        if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                        let next: number;
                        switch (event.key) {
                          case 'ArrowUp':
                          case 'ArrowLeft': next = (index - 1 + services.length) % services.length; break;
                          case 'ArrowDown':
                          case 'ArrowRight': next = (index + 1) % services.length; break;
                          case 'Home': next = 0; break;
                          case 'End': next = services.length - 1; break;
                          default: return;
                        }
                        event.preventDefault();
                        select(next);
                        buttons.current[next]?.focus();
                      }}
                    >
                      <span className="ea-workflow-icon"><Icon aria-hidden="true" /></span>
                      <span>{service.title}</span>
                      <i className="ea-workflow-indicator" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="sr-only" role="status">{services[activeIndex].title}</p>
        </div>
      </div>
    </section>
  );
};
