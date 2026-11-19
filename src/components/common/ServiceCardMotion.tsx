import { useRef } from 'react';
import { useAnimationFrame, type MotionValue } from 'motion/react';

export const serviceCardEase = [0.22, 1, 0.36, 1] as const;
export const serviceCardEntranceDelay = 1250;
export const serviceCardSelectionDuration = 0.42;

export function getServiceCardTransform(offset: number, axis: 'X' | 'Y') {
  const depth = Math.abs(offset);
  const scale = depth <= 1 ? 1.08 - depth * 0.14 : Math.max(0.7, 0.94 - (depth - 1) * 0.08);
  const z = Math.max(-200, 28 - depth * 60);
  const rotation = (axis === 'Y' ? -1 : 1) * Math.sign(offset) * Math.min(depth * 7, 16);
  return `translate3d(0, 0, ${z}px) rotate${axis}(${rotation}deg) scale(${scale})`;
}

export function getServiceCardOpacity(offset: number) {
  const depth = Math.abs(offset);
  return depth <= 1 ? 1 - 0.05 * depth : Math.max(0.85, 0.95 - 0.1 * (depth - 1));
}

export function getServiceCardDepthOrder(offset: number) {
  const depth = Math.abs(offset);
  if (depth < 0.55) return 5;
  if (depth < 1.55) return 4;
  if (depth < 2.5) return 2;
  return 0;
}

export function wrapServiceCardProgress(progress: number) {
  return progress - Math.floor(progress);
}

export function ServiceCardClock({
  progress,
  count,
  onActiveChange,
}: {
  progress: MotionValue<number>;
  count: number;
  onActiveChange?: (index: number) => void;
}) {
  const active = useRef(Math.floor(progress.get() * count + 0.5) % count);

  useAnimationFrame((_time, delta) => {
    const next = wrapServiceCardProgress(progress.get() + Math.min(delta, 100) / 24000);
    progress.set(next);
    if (!onActiveChange) return;

    const nearest = Math.floor(next * count + 0.5) % count;
    if (nearest !== active.current) {
      active.current = nearest;
      onActiveChange(nearest);
    }
  });

  return null;
}
