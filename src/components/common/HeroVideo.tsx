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
      className={`relative w-full h-full overflow-hidden bg-canvas select-none rounded-2xl ${className}`}
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

      {/* Subtle Light Clay Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-canvas/85 via-canvas/20 to-transparent pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />

      {/* Optional Caption */}
      {showCaption && (
        <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none">
          <div className="clay-soft inline-flex items-center px-3.5 py-2 text-xs font-semibold text-foreground">
            <span className="truncate">{config.caption}</span>
          </div>
        </div>
      )}
    </div>
  );
};
