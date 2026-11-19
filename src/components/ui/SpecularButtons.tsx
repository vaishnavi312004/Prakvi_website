import { useEffect } from 'react';
import './SpecularButtons.css';

const buttonSelector = ':is(button, [role="button"], a:is(.btn-primary, .btn-secondary, .btn-blue)):not(:disabled, [aria-disabled="true"], [inert] *)';
const proximity = 250;

export function SpecularButtons() {
  useEffect(() => {
    const motion = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)');
    const active = new Set<HTMLElement>();
    let pointer: { x: number; y: number } | undefined;
    let frame: number | undefined;

    const clearButton = (button: HTMLElement) => {
      button.style.removeProperty('--specular-x');
      button.style.removeProperty('--specular-y');
      button.style.removeProperty('--specular-opacity');
    };

    const reset = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      pointer = undefined;
      active.forEach(clearButton);
      active.clear();
    };

    const update = () => {
      frame = undefined;
      if (!pointer) return;
      const { x, y } = pointer;
      const nearby = [];

      // Measure before writing styles so the buttons share a single layout pass.
      for (const button of document.querySelectorAll<HTMLElement>(buttonSelector)) {
        const { left, top, right, bottom, width, height } = button.getBoundingClientRect();
        if (!width || !height || right < 0 || bottom < 0 ||
          left > window.innerWidth || top > window.innerHeight) continue;

        const localX = Math.min(Math.max(x - left, 0), width);
        const localY = Math.min(Math.max(y - top, 0), height);
        const distance = Math.hypot(x - left - localX, y - top - localY);
        if (distance < proximity) nearby.push({ button, localX, localY, distance });
      }

      const previous = new Set(active);
      active.clear();
      for (const { button, localX, localY, distance } of nearby) {
        previous.delete(button);
        active.add(button);
        button.style.setProperty('--specular-x', `${localX}px`);
        button.style.setProperty('--specular-y', `${localY}px`);
        button.style.setProperty('--specular-opacity', String(1 - 0.65 * distance / proximity));
      }
      previous.forEach(clearButton);
    };

    const scheduleUpdate = () => {
      if (pointer && frame === undefined) frame = requestAnimationFrame(update);
    };

    const followPointer = (event: PointerEvent) => {
      if (!motion.matches || event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY };
      scheduleUpdate();
    };

    document.addEventListener('pointermove', followPointer, { passive: true });
    document.addEventListener('scroll', scheduleUpdate, { capture: true, passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    window.addEventListener('resize', scheduleUpdate);
    window.addEventListener('blur', reset);
    motion.addEventListener('change', reset);
    return () => {
      document.removeEventListener('pointermove', followPointer);
      document.removeEventListener('scroll', scheduleUpdate, true);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('blur', reset);
      motion.removeEventListener('change', reset);
      reset();
    };
  }, []);

  return null;
}
