import { useCallback, useEffect, useRef, useState } from 'react';
import {
  motion, type MotionValue, useAnimationFrame, useInView, useIsPresent,
  useMotionValue, useTransform,
} from 'motion/react';
import { Layers, Pause, Play, type LucideIcon } from 'lucide-react';
import { continuousOrbitStep, useOrbitAngle } from './orbitMotion';
import './ServiceCapabilityOrbit.css';

interface OrbitCardProps {
  label: string;
  Icon: LucideIcon;
  index: number;
  count: number;
  phase: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
}

function OrbitCard({ label, Icon, index, count, phase, active, onSelect }: OrbitCardProps) {
  const angle = useOrbitAngle(phase, index, count, -90);
  const x = useTransform(angle, value => `calc(var(--service-orbit-x) * ${Math.cos(value)})`);
  const y = useTransform(angle, value => `calc(var(--service-orbit-y) * ${Math.sin(value)})`);

  return (
    <motion.li className="service-orbit-item" style={{ x, y }}>
      <button type="button" className="service-orbit-card" aria-pressed={active} onClick={onSelect}>
        <Icon aria-hidden="true" />
        <span>{label}</span>
      </button>
    </motion.li>
  );
}

interface ServiceCapabilityOrbitProps {
  label: string;
  items: string[];
  icons: LucideIcon[];
  paused: boolean;
  onTogglePause: () => void;
}

const wideOrbit = '(min-width: 45rem)';
const reducedOrbit = '(prefers-reduced-motion: reduce)';
const ease = [0.22, 1, 0.36, 1] as const;

export function ServiceCapabilityOrbit({ label, items, icons, paused, onTogglePause }: ServiceCapabilityOrbitProps) {
  const stage = useRef<HTMLDivElement>(null);
  const phase = useMotionValue(0);
  const present = useIsPresent();
  const inView = useInView(stage, { amount: 0.15 });
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [wide, setWide] = useState(() => window.matchMedia(wideOrbit).matches);
  const [reduced, setReduced] = useState(() => window.matchMedia(reducedOrbit).matches);
  const [visible, setVisible] = useState(() => !document.hidden);
  const moving = present && inView && wide && visible && !reduced && !paused && !hovered && !focused;

  useEffect(() => {
    const query = window.matchMedia(wideOrbit);
    const preference = window.matchMedia(reducedOrbit);
    const updateWidth = () => setWide(query.matches);
    const updateMotion = () => setReduced(preference.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    query.addEventListener('change', updateWidth);
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      query.removeEventListener('change', updateWidth);
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useAnimationFrame(useCallback((_time, delta) => {
    if (moving) phase.set((phase.get() + continuousOrbitStep(delta, 30000, 1)) % 360);
  }, [moving, phase]));

  const HubIcon = icons[0] ?? Layers;
  const DetailIcon = selected === null ? null : icons[selected] ?? Layers;

  return (
    <motion.div
      className="service-orbit"
      data-moving={moving}
      inert={!present}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -6 }}
      transition={{ duration: reduced ? 0 : 0.22, ease }}
    >
      <div ref={stage} className="service-orbit-stage">
        <div className="service-orbit-guide" aria-hidden="true" />
        <div className="service-orbit-hub">
          <HubIcon aria-hidden="true" />
          <span>{label}</span>
        </div>
        <ul
          className="service-orbit-items"
          onPointerEnter={event => {
            if (event.pointerType !== 'touch') setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {items.map((item, index) => (
            <OrbitCard
              key={item}
              label={item}
              Icon={icons[index] ?? Layers}
              index={index}
              count={items.length}
              phase={phase}
              active={selected === index}
              onSelect={() => setSelected(current => current === index ? null : index)}
            />
          ))}
        </ul>
        {wide && !reduced && (
          <button
            type="button"
            className="service-orbit-playback"
            aria-label={paused ? 'Play orbit animation' : 'Pause orbit animation'}
            onClick={onTogglePause}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        )}
        <div className="service-orbit-detail" role="status">
          {selected !== null && DetailIcon && (
            <motion.p
              key={selected}
              initial={reduced ? false : { opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.18, ease }}
            >
              <DetailIcon aria-hidden="true" />
              <span>{items[selected]}</span>
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
