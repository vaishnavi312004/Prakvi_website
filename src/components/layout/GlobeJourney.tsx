import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { useReducedMotion } from 'motion/react';
import { HeroScene } from '../3d/HeroScene';

const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));

/** A single globe travels across every route, independent of animated page layouts. */
export const GlobeJourney: React.FC = () => {
  const { pathname } = useLocation();
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef({ theme: 0, progress: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    const main = document.getElementById('main-content');
    if (!stage || !main || reducedMotion) return;
    let frame = 0;
    let lastTime = 0;
    let initialized = false;
    let metrics = { left: 0, top: 0, width: 500, height: 500, heroHeight: 0, pageBottom: 0, hasAnchor: false };
    const current = { x: 0, y: 0, scale: 1, theme: 0 };
    const measure = () => {
      const anchor = pathname === '/' ? main.querySelector<HTMLElement>('[data-globe-anchor]') : null;
      const rect = anchor?.getBoundingClientRect();
      const footer = document.querySelector('footer[role="contentinfo"]');
      const bottom = footer ? footer.getBoundingClientRect().top + window.scrollY : document.documentElement.scrollHeight;
      const width = rect?.width || Math.min(500, window.innerWidth);
      const height = rect?.height || width;
      metrics = {
        left: rect?.left || 0, top: rect ? rect.top + window.scrollY : 0,
        width, height, heroHeight: anchor?.closest('section')?.offsetHeight || 0,
        pageBottom: bottom, hasAnchor: Boolean(anchor),
      };
      stage.style.width = `${width}px`;
      stage.style.height = `${height}px`;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(main);
    // Handles route replacement after AnimatePresence finishes its exit.
    const routeObserver = new MutationObserver(measure);
    routeObserver.observe(main, { childList: true, subtree: true });
    window.addEventListener('resize', measure);

    const tick = (time: number) => {
      const scroll = window.scrollY;
      const progress = clamp(scroll / Math.max(1, metrics.pageBottom - window.innerHeight));
      const raw = metrics.hasAnchor ? clamp((scroll - metrics.heroHeight * 0.12) / (metrics.heroHeight * 0.65)) : 1;
      const blend = raw * raw * (3 - 2 * raw);
      const compactWidth = window.innerWidth < 640 ? 110 : window.innerWidth < 1280 ? 170 : 230;
      const travel = Math.max(0, scroll - metrics.heroHeight * 0.65) / Math.max(2200, window.innerHeight * 3.2);
      // A continuous winding path crosses right, center, and left as scrolling advances.
      const horizontal = 0.5 + Math.cos(travel * Math.PI) * 0.5;
      const size = compactWidth * (0.94 + Math.cos(travel * Math.PI * 0.6) * 0.06);
      const margin = window.innerWidth < 640 ? 8 : 24;
      const roamX = margin + horizontal * Math.max(0, window.innerWidth - size - margin * 2);
      const roamY = clamp(window.innerHeight * (0.42 + Math.sin(travel * Math.PI * 0.8) * 0.08), 100, Math.max(100, window.innerHeight - size - 80));
      const target = {
        x: metrics.left * (1 - blend) + roamX * blend,
        y: (metrics.top - scroll) * (1 - blend) + roamY * blend,
        scale: 1 + (size / Math.max(metrics.width, 1) - 1) * blend,
      };
      const ease = initialized ? 1 - Math.exp(-Math.min((time - lastTime) / 1000, 0.05) * 5) : 1;
      current.x += (target.x - current.x) * ease;
      current.y += (target.y - current.y) * ease;
      current.scale += (target.scale - current.scale) * ease;
      current.theme += (blend - current.theme) * ease;
      const footerFade = clamp((metrics.pageBottom - scroll - window.innerHeight * 0.35) / (window.innerHeight * 0.4));
      stage.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) scale(${current.scale})`;
      stage.style.opacity = String((1 - current.theme * 0.82) * footerFade);
      stage.style.setProperty('--journey-cards-opacity', String(1 - current.theme));
      journeyRef.current = { theme: current.theme, progress };
      initialized = true;
      lastTime = time;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      routeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [pathname, reducedMotion]);

  if (reducedMotion || typeof document === 'undefined') return null;
  return createPortal(
    <div ref={stageRef} aria-hidden="true" className="scroll-globe-stage theme-dark">
      <HeroScene journeyRef={journeyRef} />
    </div>, document.body,
  );
};
