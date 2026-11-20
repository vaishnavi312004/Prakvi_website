import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform,
  type MotionValue,
} from 'motion/react';
import {
  Activity, BarChart3, CheckCircle2, Cloud, Database, Layers, Monitor, Network,
  Search, Server, Sparkles, Target, TrendingUp, Workflow, Wrench, Zap,
  type LucideIcon,
} from 'lucide-react';
import { ServiceStackTab } from '../../types';
import { continuousOrbitStep, useOrbitAngle } from './orbitMotion';

export const businessAnalyticsCategoryIcons: LucideIcon[] = [BarChart3, Sparkles, Database, Layers];
const businessAnalyticsTechnologyIcons: LucideIcon[][] = [
  [BarChart3, Monitor, Activity, Search],
  [Zap, Sparkles, Target, TrendingUp],
  [Database, Server, Cloud, Layers],
  [Cloud, Server, Workflow, Network, Wrench],
];
const transitionEase = [0.22, 1, 0.36, 1] as const;

const OrbitTechnology: React.FC<{
  label: string;
  Icon: LucideIcon;
  index: number;
  count: number;
  phase: MotionValue<number>;
  staggerNodes: boolean;
}> = ({ label, Icon, index, count, phase, staggerNodes }) => {
  const radians = useOrbitAngle(phase, index, count, 90);
  const x = useTransform(radians, value => `calc(var(--ea-orbit-x) * ${Math.cos(value)})`);
  const y = useTransform(radians, value => `calc(var(--ea-orbit-y) * ${Math.sin(value)})`);
  const z = useTransform(radians, value => Math.sin(value) * 40);
  const scale = useTransform(radians, value => 0.96 + Math.sin(value) * 0.04);
  const zIndex = useTransform(radians, value => Math.round((Math.sin(value) + 1) * 10) + 2);

  return (
    <motion.div
      role="listitem"
      className="ea-orbit-panel ea-orbit-capability"
      initial={staggerNodes ? { opacity: 0 } : false}
      animate={staggerNodes ? { opacity: 1 } : undefined}
      transition={staggerNodes ? { duration: 0.32, delay: index * 0.1, ease: transitionEase } : undefined}
      style={{ x, y, z, scale, zIndex }}
    >
      <Icon aria-hidden="true" className="ea-orbit-panel-icon" />
      <span>{label}</span>
    </motion.div>
  );
};

export const BusinessAnalyticsStackOrbit: React.FC<{
  category: ServiceStackTab;
  activeIndex: number;
  staggerNodes?: boolean;
  categoryIcons?: readonly LucideIcon[];
  technologyIconSets?: readonly (readonly LucideIcon[])[];
  className?: string;
}> = ({
  category,
  activeIndex,
  staggerNodes = false,
  categoryIcons = businessAnalyticsCategoryIcons,
  technologyIconSets = businessAnalyticsTechnologyIcons,
  className,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const phase = useMotionValue(0);
  const reducedMotion = useReducedMotion();
  const inView = useInView(stageRef, { amount: 0.15 });
  const [hovered, setHovered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const canAnimate = inView && pageVisible && !reducedMotion && !hovered;

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useAnimationFrame(useCallback((_time, delta) => {
    if (canAnimate) phase.set((phase.get() + continuousOrbitStep(delta, 18000, 1)) % 360);
  }, [canAnimate, phase]));

  const HubIcon = categoryIcons[activeIndex] || CheckCircle2;
  const stage = (
    <motion.div
      key={category.label}
      className="ea-orbit-stage"
      role="list"
      aria-label={`${category.label} technologies`}
      initial={reducedMotion ? false : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.98 }}
      transition={{ duration: reducedMotion ? 0 : 0.25, ease: transitionEase }}
    >
      <div className="ea-orbit-guide" aria-hidden="true" />
      <div className="ea-orbit-hub" aria-hidden="true">
        <HubIcon />
        <span>{category.label}</span>
      </div>
      {category.items.map((item, index) => (
        <OrbitTechnology
          key={item}
          label={item}
          Icon={technologyIconSets[activeIndex]?.[index] || CheckCircle2}
          index={index}
          count={category.items.length}
          phase={phase}
          staggerNodes={staggerNodes && !reducedMotion}
        />
      ))}
    </motion.div>
  );

  return (
    <div
      ref={stageRef}
      className={`ba-stack-orbit ea-carousel-capabilities${className ? ` ${className}` : ''}`}
      onPointerEnter={event => {
        if (event.pointerType !== 'touch') setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
    >
      {staggerNodes ? stage : (
        <AnimatePresence mode="wait" initial={false}>
          {stage}
        </AnimatePresence>
      )}
    </div>
  );
};
