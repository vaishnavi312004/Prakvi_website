import React from 'react';
import { HeroScene } from '../3d/HeroScene';

export const HeroVisual: React.FC = () => (
  <div
    className="relative mx-auto w-full max-w-[540px] lg:mt-0 lg:max-w-none select-none"
    role="img"
    aria-label="Animated 3D Prakvi brand emblem morphing between the infinity flow loop and geometric P mark with soft ground shadow"
  >
    <div className="relative h-[350px] w-full sm:h-[400px] lg:h-[430px]">
      <HeroScene />
    </div>
  </div>
);
