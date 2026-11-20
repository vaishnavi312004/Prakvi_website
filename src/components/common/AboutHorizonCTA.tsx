import React, { useEffect, useId, useRef, useSyncExternalStore } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { ArrowRight, Box, CheckCircle2, MessageSquare, Network, Orbit, Sparkles } from 'lucide-react';
import { ScrollRevealText } from './ScrollRevealText';
import { ButtonLink } from '../ui/Button';
import './AboutHorizonCTA.css';

type HorizonProps = {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText: string;
  secondaryButtonLink: string;
};

const ease = [0.22, 1, 0.36, 1] as const;
const viewport = { once: true, amount: 0.18 } as const;
const motionPreference = '(prefers-reduced-motion: reduce)';
const indicators = ['99.9% Uptime Reliability', '24/7 Monitoring & Support', 'Delhi & Nashik Delivery Centers'];
const decorations = [Network, Box, Sparkles, Orbit];
const trails = [
  { path: 'M-174 360 C20 430 136 285 236 230 S504 131 690 217 S1060 214 1200 162 S1395 80 1614 151', color: '#77aeca', duration: 15.4 },
  { path: 'M1614 303 C1451 341 1340 147 1200 162 S987 287 800 306 S435 303 236 230 S54 125 -174 169', color: '#a291c1', duration: 17.2 },
  { path: 'M-174 448 C47 387 203 471 389 401 S733 311 942 390 S1279 436 1614 353', color: '#a5bacd', duration: 13.8 },
  { path: 'M1614 465 C1451 490 1325 365 1159 334 S827 396 609 437 S181 357 -174 424', color: '#cd9c84', duration: 16.6 },
  { path: 'M-174 245 C67 172 246 130 451 191 S783 305 984 270 S1329 202 1614 241', color: '#adc8dd', duration: 14.7 },
];

function subscribeToMotionPreference(update: () => void) {
  const preference = window.matchMedia(motionPreference);
  preference.addEventListener('change', update);
  return () => preference.removeEventListener('change', update);
}

function HorizonTrails({ moving, reduced }: { moving: boolean; reduced: boolean }) {
  const id = useId();
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (moving) svg.current?.unpauseAnimations();
    else svg.current?.pauseAnimations();
  }, [moving]);

  const renderTrail = ({ path, color, duration }: typeof trails[number], index: number) => (
    <g key={path} className="horizon-wave" data-wave={index} style={{ animationDuration: `${duration}s`, animationDelay: `${index * -2.1}s` }}>
      <path id={`${id}-wave-${index}`} d={path} stroke={color} vectorEffect="non-scaling-stroke" />
      {!reduced && [0, 1].map(particle => {
        const start = -duration * (particle * 0.47 + index * 0.16);
        return (
          <circle key={particle} className="horizon-wave-particle" r={particle ? 4.6 : 6.2} fill={`url(#${id}-signal)`} opacity="0">
            <animateMotion dur={`${duration}s`} begin={`${start}s`} repeatCount="indefinite"><mpath href={`#${id}-wave-${index}`} /></animateMotion>
            <animate attributeName="opacity" values="0;0.93;0.93;0" keyTimes="0;0.12;0.88;1" dur={`${duration}s`} begin={`${start}s`} repeatCount="indefinite" />
          </circle>
        );
      })}
    </g>
  );

  return (
    <svg ref={svg} className="horizon-trails" viewBox="0 0 1440 570" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-readability`} gradientUnits="userSpaceOnUse" x1="0" x2="1440">
          <stop stopColor="#fff" /><stop offset="0.21" stopColor="#fff" />
          <stop offset="0.45" stopColor="#575757" /><stop offset="0.58" stopColor="#575757" />
          <stop offset="0.82" stopColor="#fff" /><stop offset="1" stopColor="#fff" />
        </linearGradient>
        <mask id={`${id}-center`} maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="570">
          <rect width="1440" height="570" fill={`url(#${id}-readability)`} />
        </mask>
        <radialGradient id={`${id}-signal`}>
          <stop offset="0.12" stopColor="#fff" /><stop offset="0.38" stopColor="#b6e0f4" />
          <stop offset="1" stopColor="#a1d4ee" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g mask={`url(#${id}-center)`}>
        <g className="horizon-wave-pair">
          {trails.slice(0, 2).map(renderTrail)}
          {!reduced && <>
            <circle className="horizon-intersection" cx="236" cy="230" r="13" fill={`url(#${id}-signal)`} />
            <circle className="horizon-intersection" cx="1200" cy="162" r="12" fill={`url(#${id}-signal)`} />
          </>}
        </g>
        {trails.slice(2).map((trail, index) => renderTrail(trail, index + 2))}
      </g>
    </svg>
  );
}

export function AboutHorizonCTA({ title, subtitle, primaryButtonText, primaryButtonLink, secondaryButtonText, secondaryButtonLink }: HorizonProps) {
  const headingId = useId();
  const section = useRef<HTMLElement>(null);
  const reduced = useSyncExternalStore(subscribeToMotionPreference, () => window.matchMedia(motionPreference).matches, () => false);
  const inView = useInView(section);
  const moving = inView && !reduced;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerOpacity = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 26 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 26 });
  const opacity = useSpring(pointerOpacity, { stiffness: 94, damping: 24 });

  const entrance = (delay: number, distance = 14) => ({
    initial: reduced ? false as const : { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport,
    transition: { duration: reduced ? 0 : 0.65, delay: reduced ? 0 : delay, ease },
  });
  const buttonEntrance = (delay: number) => ({
    ...entrance(delay, 12),
    transition: reduced ? { duration: 0 } : { type: 'spring' as const, stiffness: 140, damping: 21, mass: 0.73, delay },
  });

  return (
    <section ref={section} className="about-horizon relative overflow-hidden px-4 py-section sm:px-6 lg:px-8" aria-labelledby={headingId}
      data-moving={moving}
      onPointerMove={event => {
        if (!moving || event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (opacity.get() < 0.05) {
          x.jump(event.clientX - bounds.left);
          y.jump(event.clientY - bounds.top);
        }
        pointerX.set(event.clientX - bounds.left);
        pointerY.set(event.clientY - bounds.top);
        pointerOpacity.set(1);
      }}
      onPointerLeave={() => pointerOpacity.set(0)}
    >
      <div className="horizon-atmosphere" aria-hidden="true" />
      <HorizonTrails moving={moving} reduced={reduced} />
      {!reduced && <motion.div className="horizon-cursor" style={{ x, y, opacity }} aria-hidden="true" />}
      <div className="horizon-decorations" aria-hidden="true">
        {decorations.map((Icon, index) => <div className="horizon-ornament" key={index}><Icon /></div>)}
      </div>
      <div className="horizon-content relative mx-auto max-w-6xl text-center">
        <motion.div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text" {...entrance(0, 5)}>Prakvi Techno Solutions</motion.div>
        <div className="horizon-heading-window">
          <h2 id={headingId} className="mx-auto max-w-4xl font-display text-3xl font-extrabold leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl horizon-heading">
            <ScrollRevealText text={title} />
          </h2>
        </div>
        <motion.p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg" {...entrance(0.23)}>{subtitle}</motion.p>
        <div className="horizon-actions mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <motion.div {...buttonEntrance(0.29)}>
            <ButtonLink to={primaryButtonLink} variant="primary" className="horizon-button horizon-button-primary">
              <MessageSquare aria-hidden="true" /><span>{primaryButtonText}</span><ArrowRight className="arrow-shift" aria-hidden="true" />
            </ButtonLink>
          </motion.div>
          <motion.div {...buttonEntrance(0.38)}>
            <ButtonLink to={secondaryButtonLink} variant="blue" className="horizon-button horizon-button-blue">
              <span>{secondaryButtonText}</span><ArrowRight className="arrow-shift" aria-hidden="true" />
            </ButtonLink>
          </motion.div>
        </div>
        <motion.div className="horizon-trust" {...entrance(0.47, 9)}>
          <div className="horizon-trust-line" aria-hidden="true"><span /></div>
          {indicators.map(item => (
            <span key={item} className="horizon-trust-item"><CheckCircle2 aria-hidden="true" /><span>{item}</span></span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
