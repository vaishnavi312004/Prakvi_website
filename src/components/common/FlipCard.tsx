import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  axis?: 'x' | 'y';
  flipOnClick?: boolean;
  draggable?: boolean;
  dragDistance?: number;
  tilt?: boolean;
  tiltMax?: number;
  glare?: boolean;
  glareOpacity?: number;
  hoverScale?: number;
  perspective?: number;
  stiffness?: number;
  damping?: number;
  width?: number;
  height?: number;
  radius?: number;
  background?: string;
  color?: string;
  shadow?: boolean;
  shadowColor?: string;
  shadowOpacity?: number;
  onFlipChange?: (flipped: boolean) => void;
  label?: string;
}

export default function FlipCard({ front, back, axis = 'y', flipOnClick = true, draggable = true,
  dragDistance = 0, tilt = true, tiltMax = 12, glare = true, glareOpacity = 0.22,
  hoverScale = 1.03, perspective = 1100, stiffness = 170, damping = 20,
  width = 270, height = 300, radius = 22, background = 'var(--glass-bg)', color = 'var(--theme-foreground)',
  shadow = true, shadowColor = '#132B47', shadowOpacity = 0.16, onFlipChange, label = 'card',
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const reducedMotion = useReducedMotion();
  const start = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);
  const rx = useMotionValue(0), ry = useMotionValue(0), zoom = useMotionValue(1), shine = useMotionValue(0);
  const gx = useMotionValue(50), gy = useMotionValue(50);
  const spring = { stiffness, damping };
  const rotateX = useSpring(rx, spring), rotateY = useSpring(ry, spring), scale = useSpring(zoom, spring), opacity = useSpring(shine, spring);
  const highlight = useTransform([gx, gy], ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, white, transparent 65%)`);
  const flip = () => { const next = !flipped; setFlipped(next); onFlipChange?.(next); };
  const reset = () => { rx.set(0); ry.set(0); zoom.set(1); shine.set(0); };
  const interactive = (target: EventTarget) => target instanceof Element && Boolean(target.closest('a, button, input, select, textarea'));
  const faceStyle: React.CSSProperties = { borderRadius: radius, background, color };

  return (
    <div className="flip-card" style={{ width, maxWidth: '100%', height, perspective, touchAction: 'pan-y' }}
      onPointerDown={event => {
        suppressClick.current = false;
        if (draggable && !interactive(event.target)) start.current = { x: event.clientX, y: event.clientY };
      }}
      onPointerMove={event => {
        if (reducedMotion || event.pointerType !== 'mouse') return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        if (tilt) { rx.set((0.5 - y) * tiltMax * 2); ry.set((x - 0.5) * tiltMax * 2); }
        zoom.set(hoverScale); shine.set(glare ? glareOpacity : 0); gx.set(x * 100); gy.set(y * 100);
      }}
      onPointerUp={event => {
        if (!start.current) return;
        const dx = event.clientX - start.current.x, dy = event.clientY - start.current.y;
        start.current = null;
        if (Math.abs(dx) > Math.max(12, dragDistance) && Math.abs(dx) > Math.abs(dy)) { suppressClick.current = true; flip(); }
      }}
      onPointerLeave={() => { start.current = null; reset(); }}
      onPointerCancel={() => { start.current = null; reset(); }}
      onClick={event => {
        if (suppressClick.current) { suppressClick.current = false; return; }
        if (flipOnClick && !interactive(event.target)) flip();
      }}>
      <motion.div className="flip-card-tilt" style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, scale: reducedMotion ? 1 : scale, borderRadius: radius }}>
        <motion.div className="flip-card-rotor" animate={axis === 'y' ? { rotateY: flipped ? 180 : 0 } : { rotateX: flipped ? 180 : 0 }} transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness, damping }} style={{ borderRadius: radius, boxShadow: shadow ? `0 10px 25px color-mix(in srgb, ${shadowColor} ${Math.max(0, Math.min(1, shadowOpacity)) * 100}%, transparent)` : undefined }}>
          <div data-lenis-prevent className="flip-card-face" style={faceStyle} inert={flipped} aria-hidden={flipped || undefined}>{front}</div>
          <div data-lenis-prevent className="flip-card-face flip-card-reverse" style={{ ...faceStyle, transform: axis === 'y' ? 'rotateY(180deg)' : 'rotateX(180deg)' }} inert={!flipped} aria-hidden={!flipped}>{back}</div>
        </motion.div>
        <motion.div className="flip-card-shine" aria-hidden="true" style={{ borderRadius: radius, background: highlight, opacity: reducedMotion ? 0 : opacity }} />
        <button type="button" className="flip-card-toggle" aria-label={`${flipped ? 'Show front of' : 'Show details for'} ${label}`} aria-pressed={flipped} onClick={flip}>{flipped ? 'Back to overview' : 'View details'}</button>
      </motion.div>
    </div>
  );
}
