import React, { useState, useEffect, useRef } from 'react';
import { videoConfig } from '../../config/videos';

interface HeroVideoProps {
  videoKey?: 'heroVideo' | 'aboutVideo' | 'servicesVideo' | 'careersVideo';
  className?: string;
  overlayOpacity?: number;
  showCaption?: boolean;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoKey = 'heroVideo',
  className = '',
  overlayOpacity = 0.45,
  showCaption = true,
}) => {
  const config = videoConfig[videoKey] || videoConfig.heroVideo;
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check user preference for reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#071D3A] select-none rounded-2xl ${className}`}
    >
      {/* High-Fidelity Poster / Fallback Image (Always present to eliminate layout shift) */}
      <img
        src={config.posterImage}
        alt={config.caption}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          isLoaded && !hasError && !prefersReducedMotion ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* HTML5 Video Element (Autoplays silently when allowed, respects reduced-motion) */}
      {!hasError && !prefersReducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={config.posterImage}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={config.videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Cinematic Enterprise Navy/Blue Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071D3A] via-[#071D3A]/40 to-transparent pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Tech Grid Texture */}
      <div className="absolute inset-0 tech-grid-dark opacity-30 pointer-events-none" />

      {/* Subtle Cyan Corner Highlight */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4EA]/15 rounded-full blur-2xl pointer-events-none" />

      {/* Optional Caption Badge */}
      {showCaption && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071D3A]/85 border border-[#00D4EA]/30 backdrop-blur-md text-[11px] font-mono text-slate-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00D4EA] animate-pulse" />
            <span className="truncate">{config.caption}</span>
          </div>
        </div>
      )}
    </div>
  );
};
