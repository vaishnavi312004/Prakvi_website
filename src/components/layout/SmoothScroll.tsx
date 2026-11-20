import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let activeScroller: Lenis | null = null;

export function scrollToTop() {
  if (activeScroller) activeScroller.scrollTo(0, { lerp: 0, duration: 1.1 });
  else window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

export function scrollToSection(target: HTMLElement) {
  const top = window.scrollY + target.getBoundingClientRect().top - 96;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.focus({ preventScroll: true });
  if (activeScroller) {
    activeScroller.resize();
    activeScroller.scrollTo(top, { immediate: reduced, force: true });
  } else {
    window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' });
  }
}

export function resetRouteScroll(smoothHash = false) {
  activeScroller?.resize();
  let target: HTMLElement | null = null;
  try { target = document.getElementById(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Ignore malformed fragment identifiers. */ }
  const smooth = smoothHash && target !== null && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (target && window.location.pathname === '/about') {
    // A numeric target applies the header offset once, independent of CSS anchor spacing.
    const top = window.scrollY + target.getBoundingClientRect().top - 96;
    if (activeScroller) activeScroller.scrollTo(top, { immediate: !smooth, force: true });
    else window.scrollTo({ top, behavior: smooth ? 'smooth' : 'instant' });
  } else if (activeScroller) activeScroller.scrollTo(target || 0, { immediate: true, force: true, offset: target ? -96 : 0 });
  else if (target) target.scrollIntoView({ behavior: 'instant' });
  else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
}

export const SmoothScroll: React.FC = () => {
  const { pathname, hash } = useLocation();
  const previousLocation = useRef({ pathname, hash });
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
    const previous = previousLocation.current;
    previousLocation.current = { pathname, hash };
    const aboutAnchorChanged = pathname === '/about' && previous.pathname === pathname && previous.hash !== hash;
    const frame = requestAnimationFrame(() => resetRouteScroll(aboutAnchorChanged));
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
};
