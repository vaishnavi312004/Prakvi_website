import React from 'react';
import { useReducedMotion } from 'motion/react';
import { HeroScene } from '../3d/HeroScene';

export const HeroVisual: React.FC = () => {
  const reducedMotion = useReducedMotion();
  return (
    <div data-globe-anchor className="relative mx-auto h-[400px] w-full max-w-lg bg-transparent sm:h-[460px] lg:h-[500px] lg:max-w-none">
      {reducedMotion && (
        <div role="img" aria-label="Prakvi globe representing cloud engineering, enterprise solutions, talent, and analytics" className="absolute inset-0">
          <HeroScene />
        </div>
      )}
    </div>
  );
};
