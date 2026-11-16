import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let activeScroller: Lenis | null = null;

export function scrollToTop() {
  if (activeScroller) activeScroller.scrollTo(0, { lerp: 0, duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

export function resetRouteScroll() {
  activeScroller?.resize();
  let target: HTMLElement | null = null;
  try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Ignore malformed fragment identifiers. */ }
  if (activeScroller) activeScroller.scrollTo(target || 0, { immediate: true, force: true, offset: target ? -96 : 0 });
  else if (target) target.scrollIntoView({ behavior: 'instant' });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export const SmoothScroll: React.FC = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const scroller = new Lenis({
      autoRaf: true,
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
      anchors: { offset: -96 },
      respectReducedMotion: true,
      stopInertiaOnNavigate: true,
    });
    activeScroller = scroller;
    return () => { activeScroller = null; scroller.destroy(); };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(resetRouteScroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};
