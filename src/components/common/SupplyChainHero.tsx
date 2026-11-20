import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';
import { ScrollRevealText } from './ScrollRevealText';
import { ServiceHeroMedia } from './ServiceHeroMedia';

export const SupplyChainHero: React.FC<{ service: ServiceItem }> = ({ service }) => {
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
    <section className="enterprise-hero service-video-hero supply-chain-hero relative isolate overflow-hidden" aria-labelledby="supply-chain-hero-title">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />

        <div className="enterprise-hero-copy">
          <div className="enterprise-hero-label text-xs font-mono font-bold uppercase tracking-[0.2em]">
            {service.badge}
          </div>
          <motion.h1 id="supply-chain-hero-title" className="enterprise-hero-title font-display font-extrabold tracking-tight" {...entrance(0.05)}>
            <ScrollRevealText text={service.title} highlight={service.title} />
          </motion.h1>
          <motion.p className="enterprise-hero-description" {...entrance(0.21)}>
            {service.fullDesc}
          </motion.p>
          <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
            <motion.div {...entrance(0.3)}>
              <a href="#capabilities" className="btn-primary">
                <span>Explore Services</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </a>
            </motion.div>
            <motion.div {...entrance(0.38)}>
              <a href="#scm-process" className="btn-secondary">
                <span>Our Process</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
      <ServiceHeroMedia videoRef={videoRef} autoPlay={!reducedMotion} poster="/assets/aistudio/supply-chain-management-poster.webp">
        <source src="/assets/aistudio/supply-chain-management.mp4" type="video/mp4" />
      </ServiceHeroMedia>
    </section>
  );
};
