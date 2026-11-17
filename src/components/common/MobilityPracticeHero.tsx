import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';

export const MobilityPracticeHero: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) video.pause();
    else void video.play().catch(() => { /* Keep the static frame if autoplay is unavailable. */ });
  }, [reducedMotion]);

  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="enterprise-hero mobility-hero relative isolate overflow-hidden" aria-labelledby="mobility-hero-title">
      <div className="enterprise-hero-backdrop absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="enterprise-hero-colour-wash absolute inset-0" />
        <div className="enterprise-hero-video-overlay absolute inset-0" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />

        <div className="enterprise-hero-copy">
          <div className="enterprise-hero-label text-xs font-mono font-bold uppercase tracking-[0.2em]">
            {service.badge}
          </div>
          <motion.h1 id="mobility-hero-title" className="enterprise-hero-title font-display font-extrabold tracking-tight" {...entrance(0.05)}>
            {service.title}
          </motion.h1>
          <motion.p className="enterprise-hero-tagline font-semibold" {...entrance(0.13)}>
            {service.tagline}
          </motion.p>
          <motion.p className="enterprise-hero-description" {...entrance(0.21)}>
            {service.fullDesc}
          </motion.p>
          <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
            <motion.div {...entrance(0.3)}>
              <Link to="/contact" className="btn-primary">
                <span>Schedule Consultation</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </Link>
            </motion.div>
            <motion.div {...entrance(0.38)}>
              <a href="#capabilities" className="btn-secondary">
                <span>Explore Service Offerings</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <div className="mobility-hero-visual pointer-events-none" aria-hidden="true">
        <video
          ref={videoRef}
          className="mobility-hero-video"
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        >
          <source src="/assets/aistudio/mobility-practice-connectivity.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
};
