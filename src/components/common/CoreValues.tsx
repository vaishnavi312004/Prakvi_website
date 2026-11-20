import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { Pause, Play, type LucideIcon } from 'lucide-react';
import { ScrollRevealText } from './ScrollRevealText';
import './CoreValues.css';

type Value = { id: string; title: string; short: string; Icon: LucideIcon };
type Point = { x: number; y: number };
const nodes = [
  { x: 50, y: 13, dx: 2.2, dy: 7, period: 4800, phase: 0.8 },
  { x: 81, y: 27, dx: 6, dy: 6.5, period: 6600, phase: 2.2 },
  { x: 81, y: 73, dx: 6.8, dy: 5.2, period: 5600, phase: 3.4 },
  { x: 50, y: 87, dx: 7, dy: 2.6, period: 7300, phase: 4.8 },
  { x: 19, y: 73, dx: 4.4, dy: 6.8, period: 4900, phase: 5.1 },
  { x: 19, y: 27, dx: 5.8, dy: 6, period: 6100, phase: 1.5 },
];
const cycle = 4600;
const turn = Math.PI * 2;
const ease = [0.22, 1, 0.36, 1] as const;
const entrance = { once: true, amount: 0.2 } as const;
const reducedQuery = '(prefers-reduced-motion: reduce)';

function subscribeToPreference(update: () => void) {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener('change', update);
  return () => query.removeEventListener('change', update);
}

function nodeOffset(index: number, time: number, pointer: Point, scale: number, reduced: boolean): Point {
  if (reduced) return { x: 0, y: 0 };
  const { dx, dy, period, phase } = nodes[index];
  const angle = time / period * turn + phase;
  const depth = 2.8 + (index % 3) * 1.45;
  return {
    x: (Math.sin(angle) * dx + pointer.x * depth) * scale,
    y: (Math.cos(angle + index * 0.32) * dy + pointer.y * depth) * scale,
  };
}

function FlowClock({ onFrame }: { onFrame: (delta: number) => void }) {
  useAnimationFrame(useCallback((_time, delta) => onFrame(Math.min(delta, 64)), [onFrame]));
  return null;
}

function ValueNode({ value, index, selected, time, pointerX, pointerY, scale, reduced, tabRef, arrivalRef, onSelect, onPreview, onKeyDown, id, panelId }: {
  value: Value; index: number; selected: boolean; time: MotionValue<number>; pointerX: MotionValue<number>;
  pointerY: MotionValue<number>; scale: MotionValue<number>; reduced: boolean;
  tabRef: (node: HTMLButtonElement | null) => void; arrivalRef: (node: HTMLSpanElement | null) => void;
  onSelect: () => void; onPreview: (index: number | null) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLButtonElement>; id: string; panelId: string;
}) {
  const anchor = nodes[index];
  const pose = useTransform(() => nodeOffset(index, time.get(), { x: pointerX.get(), y: pointerY.get() }, scale.get(), reduced));
  const x = useTransform(pose, point => point.x);
  const y = useTransform(pose, point => point.y);
  const { Icon } = value;
  return (
    <div className="core-node-anchor" style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}>
      <motion.div className="core-node-drift" style={{ x, y }}>
        <motion.div initial={reduced ? false : { opacity: 0, x: (anchor.x - 50) * 0.38, y: (anchor.y - 50) * 0.33 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={entrance}
          transition={{ duration: reduced ? 0 : 0.56, delay: reduced ? 0 : 0.12 + index * 0.065, ease }}>
          <motion.button ref={tabRef} type="button" id={id} role="tab" tabIndex={selected ? 0 : -1}
            aria-selected={selected} aria-controls={panelId} className="core-value-node" data-value={value.id}
            animate={{ scale: !reduced && selected ? 1.075 : 1 }} initial={false}
            transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 175, damping: 20 }}
            onPointerEnter={event => { if (event.pointerType === 'mouse') onPreview(index); }}
            onPointerLeave={() => onPreview(null)} onClick={onSelect} onKeyDown={onKeyDown}>
            <span className="core-node-arrival" ref={arrivalRef} aria-hidden="true" />
            <Icon aria-hidden="true" />
            <span>{value.title}</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export function CoreValues({ values, title, description }: { values: Value[]; title: string; description: string }) {
  const id = useId();
  const scene = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const signals = useRef<(SVGCircleElement | null)[]>([]);
  const arrivals = useRef<(HTMLSpanElement | null)[]>([]);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const pulse = useRef<SVGCircleElement>(null);
  const gradient = useRef<SVGLinearGradientElement>(null);
  const size = useRef({ width: 0, height: 0 });
  const pulseStart = useRef(0);
  const reduced = useSyncExternalStore(subscribeToPreference, () => window.matchMedia(reducedQuery).matches, () => false);
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [keyboardFocus, setKeyboardFocus] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [entered, setEntered] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const time = useMotionValue(0);
  const progress = useMotionValue(0);
  const scale = useMotionValue(1);
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const pointerX = useSpring(targetX, { stiffness: 100, damping: 23 });
  const pointerY = useSpring(targetY, { stiffness: 100, damping: 23 });
  const rotateY = useTransform(pointerX, [-1, 1], [-10, 10]);
  const rotateX = useTransform(pointerY, [-1, 1], [8, -8]);
  const ambientX = useTransform(pointerX, [-1, 1], [-15, 15]);
  const ambientY = useTransform(pointerY, [-1, 1], [-10, 10]);
  const inView = useInView(scene, { amount: 0.14 });
  const moving = inView && pageVisible && entered && !reduced;
  const shown = hovered ?? selected;
  const { Icon: ActiveIcon } = values[shown];

  const draw = useCallback((now: number) => {
    const { width, height } = size.current;
    if (!width || !height) return;
    const centerX = width / 2;
    const centerY = height / 2;
    const pointer = { x: pointerX.get(), y: pointerY.get() };
    const pulseTime = (now - pulseStart.current) / 1050;
    gradient.current?.setAttribute('gradientTransform', `translate(${(Math.sin(now / 2600) * 0.14).toFixed(3)} 0)`);
    nodes.forEach((anchor, index) => {
      const offset = nodeOffset(index, now, pointer, scale.get(), reduced);
      const x = anchor.x * width / 100 + offset.x;
      const y = anchor.y * height / 100 + offset.y;
      const dx = x - centerX;
      const dy = y - centerY;
      const bend = index % 2 ? -0.22 : 0.23;
      const x1 = centerX + dx * 0.26 - dy * bend;
      const y1 = centerY + dy * 0.22 + dx * bend;
      const x2 = centerX + dx * 0.74 - dy * bend * 0.38;
      const y2 = centerY + dy * 0.72 + dx * bend * 0.38;
      paths.current[index]?.setAttribute('d', `M${centerX} ${centerY} C${x1.toFixed(1)} ${y1.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`);
      const phase = (now / (2400 + index * 185) + index * 0.277) % 1;
      const place = (dot: SVGCircleElement | null, t: number, alpha: number) => {
        const a = 1 - t;
        dot?.setAttribute('cx', (a ** 3 * centerX + 3 * a * a * t * x1 + 3 * a * t * t * x2 + t ** 3 * x).toFixed(1));
        dot?.setAttribute('cy', (a ** 3 * centerY + 3 * a * a * t * y1 + 3 * a * t * t * y2 + t ** 3 * y).toFixed(1));
        dot?.setAttribute('opacity', alpha.toFixed(2));
      };
      if (width >= 430 || index % 2 === 0 || index === shown) {
        place(signals.current[index], phase, Math.min(1, phase * 7, (1 - phase) * 9));
      } else signals.current[index]?.setAttribute('opacity', '0');
      if (index === shown) {
        const t = Math.min(1, pulseTime);
        place(pulse.current, t, Math.min(1, t * 7, (1 - t) * 6));
      }
      if (arrivals.current[index]) {
        const arriving = Math.max(0, 1 - Math.abs(0.92 - phase) / 0.13);
        const response = index === shown ? Math.max(0, 1 - Math.abs(pulseTime - 0.9) / 0.16) : 0;
        arrivals.current[index]!.style.opacity = String(Math.max(arriving * 0.45, response * 0.78));
      }
    });
  }, [pointerX, pointerY, reduced, scale, shown]);

  useLayoutEffect(() => {
    pulseStart.current = time.get();
    draw(time.get());
  }, [shown, draw, time]);

  useLayoutEffect(() => {
    const element = scene.current;
    if (!element) return;
    const measure = () => {
      size.current = { width: element.clientWidth, height: element.clientHeight };
      scale.set(element.clientWidth < 430 ? 0.58 : 1);
      svg.current?.setAttribute('viewBox', `0 0 ${element.clientWidth} ${element.clientHeight}`);
      draw(time.get());
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [draw, scale, time]);

  useEffect(() => {
    const update = () => setPageVisible(!document.hidden);
    update();
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);

  const tick = useCallback((delta: number) => {
    const nextTime = time.get() + delta;
    time.set(nextTime);
    draw(nextTime);
    if (!playing || hovered !== null || keyboardFocus) return;
    const next = progress.get() + delta / cycle;
    progress.set(next % 1);
    if (next >= 1) setSelected(index => (index + 1) % values.length);
  }, [draw, hovered, keyboardFocus, playing, progress, time, values.length]);

  const select = (index: number) => { setHovered(null); setSelected(index); progress.set(0); };
  const tabId = (index: number) => `${id}-tab-${index}`;
  const panelId = `${id}-panel`;

  return (
    <section id="values" className="about-section about-core-values" data-moving={moving}
      onFocusCapture={event => setKeyboardFocus(event.target.matches(':focus-visible'))}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocus(false); }}>
      <div className="about-inner">
        <div className="core-values-heading">
          <motion.div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text"
            initial={reduced ? false : { opacity: 0, y: 13 }} whileInView={{ opacity: 1, y: 0 }} viewport={entrance}
            transition={{ duration: reduced ? 0 : 0.58, ease }}>Core Principles</motion.div>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground text-balance"><ScrollRevealText text={title} /></h2>
          <motion.p className="mt-4 text-base sm:text-lg leading-relaxed text-muted" initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={entrance} transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.13, ease }}>{description}</motion.p>
        </div>
        <div className="core-values-layout">
          {moving && <FlowClock onFrame={tick} />}
          <div ref={scene} className="core-ecosystem" role="tablist" aria-label={title}
            onPointerMove={event => {
              if (reduced || event.pointerType !== 'mouse') return;
              const rect = event.currentTarget.getBoundingClientRect();
              targetX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
              targetY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
            }} onPointerLeave={() => { targetX.set(0); targetY.set(0); setHovered(null); }}>
            <motion.div className="core-ecosystem-ambient" aria-hidden="true" style={reduced ? undefined : { x: ambientX, y: ambientY }}><span /><i /><i /><i /></motion.div>
            <motion.svg ref={svg} className="core-ecosystem-links" viewBox="0 0 600 400" aria-hidden="true"
              initial={reduced ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={entrance}
              transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.14, ease }} onAnimationComplete={() => setEntered(true)}>
              <defs>
                <linearGradient id={`${id}-flow`} ref={gradient} x1="0" y1="0" x2="1" y2="1" spreadMethod="reflect">
                  <stop stopColor="#a0c8e7" /><stop offset="0.47" stopColor="#9badd5" /><stop offset="1" stopColor="#78c8e3" />
                </linearGradient>
                <radialGradient id={`${id}-light`}><stop offset="0.15" stopColor="#fff" /><stop offset="0.38" stopColor="#7cddf6" /><stop offset="1" stopColor="#63bde5" stopOpacity="0" /></radialGradient>
              </defs>
              {values.map((value, index) => <g key={value.id} data-current={index === shown}>
                <motion.path ref={node => { paths.current[index] = node; }} className="core-connection" stroke={`url(#${id}-flow)`} vectorEffect="non-scaling-stroke"
                  initial={reduced ? false : { pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={entrance}
                  transition={{ duration: reduced ? 0 : 1.05, delay: reduced ? 0 : 0.08 + index * 0.075, ease }} />
                {!reduced && <circle className="core-connection-signal" ref={node => { signals.current[index] = node; }} r="6.4" fill={`url(#${id}-light)`} opacity="0" />}
              </g>)}
              {!reduced && <circle ref={pulse} className="core-selection-pulse" r="9" fill={`url(#${id}-light)`} opacity="0" />}
            </motion.svg>
            <div className="core-sphere-anchor" aria-hidden="true">
              <motion.div className="core-sphere-arrival" initial={reduced ? false : { opacity: 0, scale: 0.78 }} whileInView={{ opacity: 1, scale: 1 }} viewport={entrance}
                transition={{ duration: reduced ? 0 : 0.66, ease }}>
                <motion.div className="core-sphere-tilt" style={reduced ? undefined : { rotateX, rotateY }}>
                  <div className="core-sphere-aura" /><div className="core-sphere-ring" /><div className="core-sphere-ring core-sphere-ring-outer" />
                  <div className="core-sphere-orbit"><i /><i /></div>
                  <div className="core-sphere-face">
                    <AnimatePresence initial={false} mode="wait">
                      <motion.span key={values[shown].id} initial={reduced ? false : { opacity: 0, scale: 0.76 }}
                        animate={{ opacity: 1, scale: 1 }} exit={reduced ? undefined : { opacity: 0, scale: 0.84, transition: { duration: 0.17, ease } }}
                        transition={reduced ? { duration: 0 } : { opacity: { duration: 0.22 }, scale: { type: 'spring', stiffness: 165, damping: 22 } }}><ActiveIcon /></motion.span>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            {values.map((value, index) => <ValueNode key={value.id} value={value} index={index} selected={index === shown} time={time} pointerX={pointerX} pointerY={pointerY} scale={scale} reduced={reduced}
              id={tabId(index)} panelId={panelId} tabRef={node => { tabs.current[index] = node; }} arrivalRef={node => { arrivals.current[index] = node; }}
              onSelect={() => select(index)} onPreview={setHovered} onKeyDown={event => {
                if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
                const next = { ArrowRight: (index + 1) % values.length, ArrowDown: (index + 1) % values.length,
                  ArrowLeft: (index - 1 + values.length) % values.length, ArrowUp: (index - 1 + values.length) % values.length, Home: 0, End: values.length - 1 }[event.key];
                if (next === undefined) return;
                event.preventDefault(); select(next); tabs.current[next]?.focus({ preventScroll: true });
              }} />)}
          </div>
          <motion.div className="core-value-panel" data-value={values[shown].id}
            initial={reduced ? false : { opacity: 0, x: 22 }} whileInView={{ opacity: 1, x: 0 }} viewport={entrance}
            transition={{ duration: reduced ? 0 : 0.66, delay: reduced ? 0 : 0.16, ease }}>
            <div className="core-panel-reflection" aria-hidden="true" />
            <div className="core-panel-copy" id={panelId} role="tabpanel" tabIndex={0} aria-labelledby={tabId(shown)}>
              {values.map(({ id: key, title: name, short, Icon }, index) => {
                const visible = shown === index;
                return <motion.div className="core-panel-entry" key={key} aria-hidden={!visible} inert={!visible} initial={false} animate={visible ? 'show' : 'hide'}
                  variants={{ show: { opacity: 1, visibility: 'visible', transition: { opacity: { duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.12 }, staggerChildren: reduced ? 0 : 0.065, delayChildren: reduced ? 0 : 0.1 } }, hide: { opacity: 0, transitionEnd: { visibility: 'hidden' }, transition: { duration: reduced ? 0 : 0.14 } } }}>
                  <Icon className="core-panel-watermark" aria-hidden="true" />
                  <motion.span className="core-panel-icon" variants={{ show: { opacity: 1, scale: 1 }, hide: { opacity: 0, scale: reduced ? 1 : 0.76 } }}><Icon aria-hidden="true" /></motion.span>
                  <motion.h3 variants={{ show: { y: 0 }, hide: { y: reduced ? 0 : 10 } }}>{name}</motion.h3>
                  <motion.p variants={{ show: { opacity: 1, y: 0 }, hide: { opacity: 0, y: reduced ? 0 : 5 } }}>{short}</motion.p>
                </motion.div>;
              })}
            </div>
            <div className="core-panel-controls">
              <div className="core-panel-progress" role="group" aria-label="Select a core value">
                {values.map((value, index) => <button type="button" key={value.id} aria-label={value.title} aria-pressed={shown === index} onClick={() => select(index)}>
                  <span>{shown === index && <motion.i style={{ scaleX: reduced || shown !== selected ? 1 : progress }} />}</span>
                </button>)}
              </div>
              {!reduced && <button type="button" className="core-panel-playback" aria-label={playing ? 'Pause core values autoplay' : 'Resume core values autoplay'} onClick={() => setPlaying(current => !current)}>
                {playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
              </button>}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
