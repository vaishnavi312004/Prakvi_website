import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence, motion, MotionValue, useAnimationFrame,
  useInView, useMotionValue, useReducedMotion, useTransform,
} from 'motion/react';
import {
  Boxes, Cloud, Container, Database, GitBranch, Layers,
  LockKeyhole, Map, Network, Route, Server, ShieldCheck, Target,
  Workflow, type LucideIcon,
} from 'lucide-react';
import { ServiceStackTab } from '../../types';
import { SectionHeading } from './SectionHeading';

const categoryIcons = [Target, Layers, Database, Server];
const capabilityIcons = [
  [Map, Route, Workflow, Target],
  [Boxes, ShieldCheck, Network, Layers],
  [ShieldCheck, Database, LockKeyhole, GitBranch],
  [Cloud, Server, Container, Workflow],
];
const transitionEase = [0.22, 1, 0.36, 1] as const;

export function continuousOrbitStep(deltaMs: number, revolutionMs: number, direction: 1 | -1) {
  return Math.min(Math.max(deltaMs, 0), 64) * 360 / revolutionMs * direction;
}

const CapabilityPanel: React.FC<{
  label: string; Icon: LucideIcon; index: number; count: number;
  phase: MotionValue<number>; onHoverChange: (hovered: boolean) => void;
}> = ({ label, Icon, index, count, phase, onHoverChange }) => {
  const radians = useTransform(phase, value => (index * 360 / count + value + 90) * Math.PI / 180);
  const x = useTransform(radians, value => `calc(var(--ea-orbit-x) * ${Math.cos(value)})`);
  const y = useTransform(radians, value => `calc(var(--ea-orbit-y) * ${Math.sin(value)})`);
  const z = useTransform(radians, value => Math.sin(value) * 40);
  const scale = useTransform(radians, value => 0.96 + Math.sin(value) * 0.04);
  const zIndex = useTransform(radians, value => Math.round((Math.sin(value) + 1) * 10) + 2);
  return (
    <motion.div role="listitem" className="ea-orbit-panel ea-orbit-capability" style={{ x, y, z, scale, zIndex }}
      onPointerEnter={event => { if (event.pointerType !== 'touch') onHoverChange(true); }}
      onPointerLeave={() => onHoverChange(false)}>
      <Icon aria-hidden="true" className="ea-orbit-panel-icon" /><span>{label}</span>
    </motion.div>
  );
};

export const ArchitectureCarousel: React.FC<{
  title: string; description?: string; categories: ServiceStackTab[];
}> = ({ title, description, categories }) => {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.15 });
  const phase = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const canAnimate = inView && pageVisible && !reducedMotion && !hovered;
  useAnimationFrame(useCallback((_time: number, delta: number) => {
    if (canAnimate) phase.set(phase.get() + continuousOrbitStep(delta, 18000, 1));
  }, [canAnimate, phase]));

  const current = categories[activeIndex];
  if (!current) return null;
  const HubIcon = categoryIcons[activeIndex] || Layers;

  return (
    <section ref={sectionRef} className="ea-carousel-section py-section" aria-label={title}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} align="center" />
        <div className="ea-carousel-interaction">
          <div className="ea-category-navigation">
            <div className="ea-category-tabs" role="tablist" aria-label="Enterprise Architecture categories">
              {categories.map((category, index) => {
                const Icon = categoryIcons[index] || Layers;
                return (
                  <motion.button key={category.label} type="button" role="tab"
                    id={`ea-category-${index}`} aria-controls="ea-carousel-capabilities"
                    aria-selected={activeIndex === index} tabIndex={activeIndex === index ? 0 : -1}
                    className={`ea-category-tab ${activeIndex === index ? 'is-active' : ''}`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    onKeyDown={event => {
                      let next = index;
                      if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length;
                      else if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
                      else if (event.key === 'Home') next = 0;
                      else if (event.key === 'End') next = categories.length - 1;
                      else return;
                      event.preventDefault();
                      setActiveIndex(next);
                      document.getElementById(`ea-category-${next}`)?.focus();
                    }}>
                    <Icon aria-hidden="true" /><span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div id="ea-carousel-capabilities" className="ea-carousel-capabilities" role="tabpanel"
            aria-labelledby={`ea-category-${activeIndex}`} tabIndex={0} aria-live="polite" aria-atomic="true"
            onPointerLeave={() => setHovered(false)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.label} className="ea-orbit-stage"
                role="list" aria-label={`${current.label} capabilities`}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: transitionEase }}>
                <div className="ea-orbit-ambient" aria-hidden="true" />
                <div className="ea-orbit-guide" aria-hidden="true" />
                <div className="ea-orbit-hub" aria-hidden="true"><HubIcon /><span>{current.label}</span></div>
                {current.items.map((item, index) => (
                  <CapabilityPanel key={item} label={item} Icon={capabilityIcons[activeIndex]?.[index] || Layers}
                    index={index} count={current.items.length} phase={phase} onHoverChange={setHovered} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
