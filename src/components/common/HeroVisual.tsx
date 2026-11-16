import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cloud, Layers, Users, BarChart3 } from 'lucide-react';
import { HeroScene } from '../3d/HeroScene';

const cornerNodes = [
  {
    title: 'Cloud Engineering',
    subtitle: 'AWS · Azure · GCP',
    icon: Cloud,
    position: 'top-4 left-2 sm:left-4',
    delay: 0.45,
  },
  {
    title: 'Enterprise Systems',
    subtitle: 'TOGAF · Integration',
    icon: Layers,
    position: 'top-4 right-2 sm:right-4',
    delay: 0.55,
  },
  {
    title: 'Workforce Solutions',
    subtitle: 'IT & Healthcare Staffing',
    icon: Users,
    position: 'bottom-4 left-2 sm:left-4',
    delay: 0.65,
  },
  {
    title: 'Data & Analytics',
    subtitle: 'BI & Predictive AI',
    icon: BarChart3,
    position: 'bottom-4 right-2 sm:right-4',
    delay: 0.75,
  },
];

export const HeroVisual: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="relative mx-auto h-[410px] w-full max-w-[520px] sm:h-[470px] lg:h-[510px] lg:max-w-none select-none"
      role="img"
      aria-label="Interactive 3D Prakvi Innovation Globe with geometric P emblem reveal"
    >
      {/* Subtle radial clay aura behind globe (does not sit over WebGL canvas) */}
      <div
        className="pointer-events-none absolute inset-6 rounded-full opacity-75"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--theme-accent) 16%, transparent) 0%, color-mix(in srgb, var(--theme-pastel) 28%, transparent) 48%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      {/* Interactive 3D WebGL Globe */}
      <div className="relative h-full w-full">
        <HeroScene />
      </div>

      {/* Central Geometric Prakvi 'P' Medallion Reveal (exact proportions matching /public/img/prakvi-logo.png) */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div
          className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-3xl border border-white/85 bg-card/90 shadow-2xl"
          style={{
            boxShadow:
              '0 18px 42px -10px color-mix(in srgb, var(--theme-accent) 34%, rgba(23,43,69,0.12)), inset 0 2px 4px rgba(255,255,255,0.95)',
          }}
        >
          {/* SVG strictly honoring Prakvi's 3-part geometric 'P' emblem */}
          <svg
            viewBox="0 0 120 120"
            className="h-14 w-14 sm:h-16 sm:w-16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer P stem + top curve */}
            <motion.path
              d="M28 102V32C28 21.5 36.5 13 47 13H69C86.5 13 98 24.5 98 41C98 57.5 86.5 69 69 69H52"
              stroke="var(--theme-accent)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Inner vertical stem parallel bar */}
            <motion.path
              d="M44 102V38"
              stroke="var(--theme-highlight)"
              strokeWidth="9"
              strokeLinecap="round"
              initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Inner bowl horizontal D-bar accent */}
            <motion.path
              d="M52 33H67C74.5 33 80 37.5 80 41.5C80 45.5 74.5 50 67 50H52V33Z"
              fill="var(--theme-accent-2)"
              initial={reducedMotion ? false : { scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Four Clean Corner Capability Badges (positioned outside center emblem) */}
      {cornerNodes.map(({ title, subtitle, icon: Icon, position, delay }) => (
        <motion.div
          key={title}
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-none absolute ${position} hidden sm:flex items-center gap-2.5 rounded-2xl border border-line bg-card/95 px-3 py-2 shadow-lg`}
          style={{
            boxShadow:
              '0 12px 24px -8px var(--clay-shadow), inset 0 2px 3px rgba(255,255,255,0.95)',
          }}
        >
          <div className="clay-icon-box flex h-8 w-8 items-center justify-center rounded-xl">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </div>
          <div className="leading-tight">
            <div className="text-xs font-bold text-foreground">{title}</div>
            <div className="text-[10px] font-medium text-muted">{subtitle}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
