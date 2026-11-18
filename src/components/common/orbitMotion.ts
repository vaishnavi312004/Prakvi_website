import { type MotionValue, useTransform } from 'motion/react';

export function continuousOrbitStep(deltaMs: number, revolutionMs: number, direction: 1 | -1) {
  return Math.min(Math.max(deltaMs, 0), 64) * 360 / revolutionMs * direction;
}

export function useOrbitAngle(phase: MotionValue<number>, index: number, count: number, start: number) {
  return useTransform(phase, value => (index * 360 / count + value + start) * Math.PI / 180);
}
