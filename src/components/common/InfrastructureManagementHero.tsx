import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';
import { ScrollRevealText } from './ScrollRevealText';
import { ServiceHeroMedia } from './ServiceHeroMedia';
import './InfrastructureManagementHero.css';

const videoPath = `${import.meta.env.BASE_URL}videos/infrastructure-management.mp4`;
const posterPath = `${import.meta.env.BASE_URL}videos/infrastructure-management-poster.webp`;

export const InfrastructureManagementHero: React.FC<{
  service: ServiceItem;
  onSectionLink: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ service, onSectionLink }) => {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    const reportPlaybackError = (error: unknown) => {
      if (error instanceof Error && (error.name === 'AbortError' || error.name === 'NotAllowedError')) return;
      console.error('Infrastructure Management hero video failed to play.', {
        source: video.currentSrc,
        error,
      });
    };
    const reportMediaError = () => {
      console.error('Infrastructure Management hero video failed to load.', {
        source: video.currentSrc,
        code: video.error?.code,
        message: video.error?.message,
      });
    };
    let isInViewport = false;
    const resumePlayback = () => {
      if (isInViewport && document.visibilityState === 'visible' && video.paused) {
        void video.play().catch(reportPlaybackError);
      }
    };
    const visibility = new IntersectionObserver(([entry]) => {
      isInViewport = entry.isIntersecting && entry.intersectionRatio >= 0.12;
      if (isInViewport) resumePlayback();
      else video.pause();
    }, { threshold: 0.12 });
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') resumePlayback();
      else video.pause();
    };

    visibility.observe(video);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    video.addEventListener('loadeddata', resumePlayback);
    video.addEventListener('error', reportMediaError);
    return () => {
      visibility.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      video.removeEventListener('loadeddata', resumePlayback);
      video.removeEventListener('error', reportMediaError);
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <section
      className="enterprise-hero service-video-hero infrastructure-management-hero relative isolate overflow-hidden"
      aria-labelledby="infrastructure-management-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs variant="dark" items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />

        <div className="enterprise-hero-copy infrastructure-management-hero-copy">
          <div className="enterprise-hero-label text-xs font-mono font-bold uppercase tracking-[0.2em]">
            {service.badge || 'IT Infrastructure Solutions'}
          </div>

          <h1
            id="infrastructure-management-hero-title"
            className="enterprise-hero-title font-display font-extrabold tracking-tight"
          >
            <ScrollRevealText text={service.tagline} preserveLayout once />
          </h1>

          <p className="enterprise-hero-description">
            {service.fullDesc}
          </p>

          <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
            <a href="#capabilities" onClick={onSectionLink} className="btn-primary">
              <span>Explore Services</span>
              <ArrowRight className="arrow-shift" aria-hidden="true" />
            </a>
            <a href="#infrastructure-process" onClick={onSectionLink} className="btn-secondary">
              <span>Our Process</span>
              <ArrowRight className="arrow-shift" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <ServiceHeroMedia
        videoRef={videoRef}
        autoPlay={!reducedMotion}
        poster={posterPath}
        preload={reducedMotion ? 'none' : 'metadata'}
      >
        {!reducedMotion && <source src={videoPath} type="video/mp4" />}
      </ServiceHeroMedia>
    </section>
  );
};
