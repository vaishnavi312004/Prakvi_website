import { AnimatePresence, animate, motion, useAnimationFrame, useInView, useIsPresent, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Briefcase, Building2, Handshake, Layers, Pause, Play, Search, UserCheck, Users,
  type LucideIcon,
} from 'lucide-react';
import { continuousOrbitStep, useOrbitAngle } from '../components/common/orbitMotion';
import type { ServiceStackTab } from '../types';
import './StaffingCapabilitiesOrbit.css';

const capabilityIcons: LucideIcon[] = [Search, Briefcase, UserCheck, Users, Building2, Handshake];
const desktopQuery = '(min-width: 40rem)';
const orbitDuration = 30000;
const ease = [0.22, 1, 0.36, 1] as const;

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

interface OrbitNodeProps {
  label: string;
  Icon: LucideIcon;
  index: number;
  count: number;
  phase: MotionValue<number>;
  desktop: boolean;
  active: boolean;
  onSelect: () => void;
  onMove: (direction: -1 | 1) => void;
}

function OrbitNode({ label, Icon, index, count, phase, desktop, active, onSelect, onMove }: OrbitNodeProps) {
  const angle = useOrbitAngle(phase, index, count, -90);
  const x = useTransform(angle, value => `calc(var(--staffing-orbit-x) * ${Math.cos(value)})`);
  const y = useTransform(angle, value => `calc(var(--staffing-orbit-y) * ${Math.sin(value)})`);

  return (
    <motion.li className="staffing-orbit-node" style={desktop ? { x, y } : { x: 0, y: 0 }}>
      <button
        type="button"
        className="staffing-orbit-card"
        aria-pressed={active}
        onClick={onSelect}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
            event.preventDefault();
            onMove(-1);
          } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
            event.preventDefault();
            onMove(1);
          }
        }}
      >
        <Icon aria-hidden="true" />
        <span>{label}</span>
      </button>
    </motion.li>
  );
}

function CapabilityOrbit({ label, items }: { label: string; items: string[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const phase = useMotionValue(0);
  const present = useIsPresent();
  const inView = useInView(stage, { amount: 0.12 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [paused, setPaused] = useState(false);
  const [aligning, setAligning] = useState(false);
  const [desktop, setDesktop] = useState(() => window.matchMedia(desktopQuery).matches);
  const [visible, setVisible] = useState(() => !document.hidden);
  const reducedMotion = Boolean(useReducedMotion());
  const alignAnimation = useRef<ReturnType<typeof animate> | null>(null);
  const moving = present && inView && desktop && visible && !reducedMotion && !paused && !hovered && !focused && !aligning;
  const activeItem = items[activeIndex] ?? items[0];
  const ActiveIcon = capabilityIcons[activeIndex % capabilityIcons.length] ?? Layers;

  useEffect(() => {
    const query = window.matchMedia(desktopQuery);
    const updateDesktop = () => setDesktop(query.matches);
    const updateVisibility = () => setVisible(!document.hidden);
    query.addEventListener('change', updateDesktop);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      query.removeEventListener('change', updateDesktop);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => () => alignAnimation.current?.stop(), []);

  useAnimationFrame(useCallback((_time, delta) => {
    if (!moving || items.length < 2) return;
    const angle = normalizeAngle(phase.get() + continuousOrbitStep(delta, orbitDuration, 1));
    phase.set(angle);
    const step = 360 / items.length;
    const nextActive = Math.round(normalizeAngle(-angle) / step) % items.length;
    setActiveIndex(current => current === nextActive ? current : nextActive);
  }, [items.length, moving, phase]));

  const focusItem = (index: number) => {
    if (!items.length) return;
    const next = (index + items.length) % items.length;
    setActiveIndex(next);
    if (items.length < 2 || !desktop || reducedMotion) return;

    alignAnimation.current?.stop();
    setAligning(true);
    const currentAngle = phase.get();
    const desiredAngle = -next * 360 / items.length;
    const delta = normalizeAngle(desiredAngle - currentAngle + 180) - 180;
    const targetAngle = currentAngle + delta;
    alignAnimation.current = animate(phase, targetAngle, { duration: 0.85, ease });
    const animation = alignAnimation.current;
    void animation.then(() => {
      if (alignAnimation.current !== animation) return;
      phase.set(normalizeAngle(targetAngle));
      alignAnimation.current = null;
      setAligning(false);
    });
  };

  return (
    <motion.div
      key={label}
      className="staffing-orbit"
      data-moving={moving}
      inert={!present}
      initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -8, scale: 0.99 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, ease }}
    >
      <div
        ref={stage}
        className="staffing-orbit-stage"
        onPointerEnter={event => {
          if (event.pointerType !== 'touch') setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
      >
        <div className="staffing-orbit-guide" aria-hidden="true" />
        <AnimatePresence mode="wait" initial={false}>
          {activeItem && (
            <motion.div
              key={activeItem}
              className="staffing-orbit-hub"
              role="status"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: reducedMotion ? 0 : 0.22, ease }}
            >
              <ActiveIcon aria-hidden="true" />
              <span>{activeItem}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <ul
          className="staffing-orbit-nodes"
          aria-label={`${label} capabilities`}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {items.map((item, index) => (
            <OrbitNode
              key={item}
              label={item}
              Icon={capabilityIcons[index % capabilityIcons.length] ?? Layers}
              index={index}
              count={items.length}
              phase={phase}
              desktop={desktop}
              active={activeIndex === index}
              onSelect={() => focusItem(index)}
              onMove={direction => {
                const next = (index + direction + items.length) % items.length;
                focusItem(next);
                stage.current?.querySelectorAll<HTMLButtonElement>('.staffing-orbit-card')[next]?.focus();
              }}
            />
          ))}
        </ul>

        {desktop && !reducedMotion && items.length > 1 && (
          <button
            type="button"
            className="staffing-orbit-playback"
            aria-label={paused ? 'Play capability orbit' : 'Pause capability orbit'}
            onClick={() => setPaused(current => !current)}
          >
            {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function StaffingCapabilitiesOrbit({
  title,
  description,
  tabs,
  idPrefix = 'staffing-capability',
}: {
  title: string;
  description: string;
  tabs: ServiceStackTab[];
  idPrefix?: string;
}) {
  const reducedMotion = Boolean(useReducedMotion());
  const [activeTab, setActiveTab] = useState(0);
  const currentTab = tabs[activeTab] ?? tabs[0];

  return (
    <section id={`${idPrefix}-matrix`} className="staffing-capabilities" aria-labelledby={`${idPrefix}-title`}>
      <div className="staffing-capabilities__inner">
        <motion.h2
          id={`${idPrefix}-title`}
          initial={reducedMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: reducedMotion ? 0 : 0.62, ease }}
        >
          {title}
        </motion.h2>
        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: reducedMotion ? 0 : 0.61, delay: reducedMotion ? 0 : 0.13, ease }}
        >
          {description}
        </motion.p>

        <div className="staffing-capability-tabs" role="tablist" aria-label={title}>
          {tabs.map((tab, index) => {
            const active = activeTab === index;
            return (
              <button
                key={tab.label}
                id={`${idPrefix}-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`${idPrefix}-panel`}
                tabIndex={active ? 0 : -1}
                onClick={() => setActiveTab(index)}
                onKeyDown={event => {
                  let nextIndex = index;
                  if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
                  else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
                  else if (event.key === 'Home') nextIndex = 0;
                  else if (event.key === 'End') nextIndex = tabs.length - 1;
                  else return;
                  event.preventDefault();
                  setActiveTab(nextIndex);
                  document.getElementById(`${idPrefix}-tab-${nextIndex}`)?.focus();
                }}
              >
                {active && (
                  <motion.span
                    layoutId={`${idPrefix}-pill`}
                    transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 34 }}
                    aria-hidden="true"
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div id={`${idPrefix}-panel`} role="tabpanel" aria-labelledby={`${idPrefix}-tab-${activeTab}`}>
          <AnimatePresence mode="wait" initial={false}>
            {currentTab && (
              <CapabilityOrbit
                key={currentTab.label}
                label={currentTab.label}
                items={currentTab.items}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
