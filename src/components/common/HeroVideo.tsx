import React, { useState } from 'react';
import { videoConfig } from '../../config/videos';

interface HeroVideoProps {
  videoKey?: 'heroVideo' | 'aboutVideo' | 'servicesVideo' | 'careersVideo';
  className?: string;
  overlayOpacity?: number;
}

export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoKey = 'heroVideo',
  className = '',
  overlayOpacity,
}) => {
  const config = videoConfig[videoKey] || videoConfig.heroVideo;
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const opacity = overlayOpacity !== undefined ? overlayOpacity : config.overlayOpacity ?? 0.6;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#071D3A] ${className}`}>
      {/* Fallback & Poster Image (ensures zero layout shift) */}
      <img
        src={config.posterImage}
        alt={config.caption}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded && !hasError ? 'opacity-0' : 'opacity-100'
        }`}
        loading="eager"
      />

      {/* HTML5 Video Element (Autoplays silently when available, falls back safely) */}
      {!hasError && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={config.posterImage}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <source src={config.videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Cinematic Enterprise Navy/Blue Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#071D3A] via-[#071D3A]/80 to-[#071D3A]/60 pointer-events-none"
        style={{ opacity }}
      />

      {/* Tech Grid Overlay for Cinematic Texture */}
      <div className="absolute inset-0 tech-grid-dark opacity-40 pointer-events-none" />
    </div>
  );
};
