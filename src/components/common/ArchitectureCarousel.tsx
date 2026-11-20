import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import {
  AnimatePresence, motion, MotionValue, useAnimationFrame,
  useInView, useMotionValue, useReducedMotion, useTransform,
} from 'motion/react';
import {
  Boxes, Cloud, Container, Database, GitBranch, Layers,
  LockKeyhole, Map, Network, Pause, Play, Route, Server, ShieldCheck, Target,
  Workflow, type LucideIcon,
} from 'lucide-react';
import { ServiceStackTab } from '../../types';
import { SectionHeading } from './SectionHeading';
import { continuousOrbitStep, useOrbitAngle } from './orbitMotion';

export { continuousOrbitStep } from './orbitMotion';

const categoryIcons = [Target, Layers, Database, Server];
const capabilityIcons = [
  [Map, Route, Workflow, Target],
  [Boxes, ShieldCheck, Network, Layers],
  [ShieldCheck, Database, LockKeyhole, GitBranch],
  [Cloud, Server, Container, Workflow],
];
const transitionEase = [0.22, 1, 0.36, 1] as const;

interface ArchitectureCarouselProps {
  sectionId?: string;
  title: string;
  description?: string;
  categories: ServiceStackTab[];
  icons?: { tabs: LucideIcon[]; panels: LucideIcon[][] };
  variant?: 'mobile-app' | 'digital-marketing';
  interactiveNodes?: boolean;
}

const CapabilityPanel: React.FC<{
  label: string; Icon: LucideIcon; index: number; count: number;
  phase: MotionValue<number>; onHoverChange: (hovered: boolean) => void;
  onSelect?: () => void; selected?: boolean; onFocusChange?: (focused: boolean) => void;
}> = ({ label, Icon, index, count, phase, onHoverChange, onSelect, selected, onFocusChange }) => {
  const radians = useOrbitAngle(phase, index, count, 90);
  const x = useTransform(radians, value => `calc(var(--ea-orbit-x) * ${Math.cos(value)})`);
  const y = useTransform(radians, value => `calc(var(--ea-orbit-y) * ${Math.sin(value)})`);
  const z = useTransform(radians, value => Math.sin(value) * 40);
  const scale = useTransform(radians, value => 0.96 + Math.sin(value) * 0.04);
  const zIndex = useTransform(radians, value => Math.round((Math.sin(value) + 1) * 10) + 2);
  const content = <><Icon aria-hidden="true" className="ea-orbit-panel-icon" /><span>{label}</span></>;
  return (
    <motion.div role="listitem" className="ea-orbit-panel ea-orbit-capability" style={{ x, y, z, scale, zIndex }}
      onPointerEnter={event => { if (event.pointerType !== 'touch') onHoverChange(true); }}
      onPointerLeave={() => onHoverChange(false)}>
      {onSelect ? (
        <button className="ea-orbit-node-button" type="button" onClick={onSelect} aria-pressed={selected}
          onFocus={() => onFocusChange?.(true)} onBlur={() => onFocusChange?.(false)}>
          {content}
        </button>
      ) : content}
    </motion.div>
  );
};

export const ArchitectureCarousel: React.FC<ArchitectureCarouselProps> = ({
  sectionId, title, description, categories, icons, variant, interactiveNodes,
}) => {
  const id = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.15 });
  const phase = useMotionValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const canAnimate = inView && pageVisible && !reducedMotion && !hovered && !focused && !paused;
  useAnimationFrame(useCallback((_time: number, delta: number) => {
    if (canAnimate) phase.set(phase.get() + continuousOrbitStep(delta, 18000, 1));
  }, [canAnimate, phase]));

  const current = categories[activeIndex];
  if (!current) return null;
  const tabIcons = icons?.tabs ?? categoryIcons;
  const panelIcons = icons?.panels ?? capabilityIcons;
  const HubIcon = tabIcons[activeIndex] || Layers;
  const panelId = variant ? `${id}-capabilities` : 'ea-carousel-capabilities';
  const tabId = variant ? `${id}-tab` : 'ea-category';
  const selectCategory = (index: number) => {
    if (index !== activeIndex) setSelectedNode(null);
    setActiveIndex(index);
  };

  return (
    <section id={sectionId} ref={sectionRef} className="ea-carousel-section py-section" aria-label={title} data-variant={variant}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} align="center" animateWords />
        <div className="ea-carousel-interaction">
          <div className="ea-category-navigation">
            <div className="ea-category-tabs" role="tablist"
              aria-label={variant === 'mobile-app' ? 'Mobile App Development categories' : `${title} categories`}>
              {categories.map((category, index) => {
                const Icon = tabIcons[index] || Layers;
                return (
                  <motion.button key={category.label} type="button" role="tab"
                    ref={node => { tabRefs.current[index] = node; }}
                    id={`${tabId}-${index}`} aria-controls={panelId}
                    aria-selected={activeIndex === index} tabIndex={activeIndex === index ? 0 : -1}
                    className={`ea-category-tab ${activeIndex === index ? 'is-active' : ''}`}
                    onClick={() => selectCategory(index)}
                    whileHover={reducedMotion ? undefined : { y: -2 }}
                    onKeyDown={event => {
                      let next = index;
                      if (event.key === 'ArrowLeft') next = (index - 1 + categories.length) % categories.length;
                      else if (event.key === 'ArrowRight') next = (index + 1) % categories.length;
                      else if (event.key === 'Home') next = 0;
                      else if (event.key === 'End') next = categories.length - 1;
                      else return;
                      event.preventDefault();
                      selectCategory(next);
                      tabRefs.current[next]?.focus();
                    }}>
                    <Icon aria-hidden="true" /><span>{category.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
          <div id={panelId} className="ea-carousel-capabilities" role="tabpanel"
            aria-labelledby={`${tabId}-${activeIndex}`} tabIndex={0} aria-live="polite" aria-atomic="true"
            onPointerLeave={() => setHovered(false)}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={current.label} className="ea-orbit-stage" data-item-count={current.items.length}
                role="list" aria-label={`${current.label} capabilities`}
                initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
                transition={{ duration: reducedMotion ? 0 : 0.25, ease: transitionEase }}>
                <div className="ea-orbit-guide" aria-hidden="true" />
                <div className="ea-orbit-hub" aria-hidden="true"><HubIcon /><span>{current.label}</span></div>
                {current.items.map((item, index) => (
                  <CapabilityPanel key={item} label={item} Icon={panelIcons[activeIndex]?.[index] || Layers}
                    index={index} count={current.items.length} phase={phase} onHoverChange={setHovered}
                    selected={selectedNode === index} onFocusChange={interactiveNodes ? setFocused : undefined}
                    onSelect={interactiveNodes ? () => setSelectedNode(value => value === index ? null : index) : undefined} />
                ))}
              </motion.div>
            </AnimatePresence>
            {interactiveNodes && (
              <div className="ea-orbit-controls">
                <p role="status">{selectedNode === null ? null : current.items[selectedNode]}</p>
                {!reducedMotion && (
                  <button type="button" className="ea-orbit-playback"
                    aria-label={paused ? 'Play orbit animation' : 'Pause orbit animation'}
                    onClick={() => setPaused(value => !value)}>
                    {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
