import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HeroScene } from '../3d/HeroScene';
import { HeroVideo } from './HeroVideo';
import { Globe2, Video } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeMode, setActiveMode] = useState<'globe' | 'video'>('globe');

  return (
    <div className="relative w-full max-w-lg lg:max-w-none mx-auto">
      {/* Ambient Cyan Radial Blur behind the container */}
      <div className="absolute -inset-2 bg-gradient-to-r from-accent/20 to-accent/25 rounded-3xl blur-2xl opacity-70 pointer-events-none" />

      {/* Floating Animated Container */}
      <motion.div
        animate={reducedMotion ? { y: 0 } : { y: [0, -4, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="relative w-full h-[400px] sm:h-[460px] lg:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-surface via-canvas to-canvas border border-accent/30 shadow-[0_20px_50px_rgba(0,174,239,0.25)] flex flex-col"
      >
        {/* Subtle top cyan hairline glow */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent z-20" />

        {/* View Mode Switcher Header */}
        <div className="relative z-20 flex items-center justify-between gap-2 px-4 py-3 bg-canvas/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
            <span className="hidden sm:block text-[10px] font-semibold uppercase tracking-wider text-muted">
              {activeMode === 'globe' ? 'Global Network Telemetry' : 'Cinematic Operations'}
            </span>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-medium">
            <button
              onClick={() => setActiveMode('globe')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                activeMode === 'globe'
                  ? 'bg-accent/15 text-accent font-bold shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
              title="View 3D Digital Network Globe"
            >
              <Globe2 className="w-3.5 h-3.5" />
              <span>3D Globe</span>
            </button>
            <button
              onClick={() => setActiveMode('video')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg transition-all ${
                activeMode === 'video'
                  ? 'bg-accent/15 text-accent font-bold shadow-sm'
                  : 'text-muted hover:text-white'
              }`}
              title="View Cinematic Enterprise Video"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Video</span>
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative flex-1 w-full overflow-hidden">
          {activeMode === 'globe' ? (
            <div className="w-full h-full relative">
              <HeroScene />
              {/* Overlay telemetry info */}
              <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                <div className="px-3 py-1.5 rounded-xl bg-canvas/80 border border-accent/25 backdrop-blur-md text-[11px] font-mono text-muted">
                  <span className="text-accent font-bold">10 Global Enterprise Hubs</span> • Active Data Mesh
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative">
              <HeroVideo
                videoKey="heroVideo"
                className="w-full h-full"
                overlayOpacity={0.4}
                showCaption={true}
              />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
