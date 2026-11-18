import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { projectManagementData } from '../../data/projectManagementData';
import { Breadcrumbs } from './Breadcrumbs';
import { ServiceHeroMedia } from './ServiceHeroMedia';

const heroPoster = '/assets/aistudio/project-management-hero.webp';

export const ProjectManagementHero: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reducedMotion) {
      video.pause();
    } else {
      void video.play().catch(() => {
        /* Keep poster frame if autoplay is prevented */
      });
    }
  }, [reducedMotion]);

  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reducedMotion ? 0 : 0.6,
      delay: reducedMotion ? 0 : delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  });

  return (
    <section
      className="enterprise-hero service-video-hero project-hero relative isolate overflow-hidden"
      aria-labelledby="project-hero-title"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs variant="dark" items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />

        <div className="enterprise-hero-copy">
          <div className="enterprise-hero-label text-xs font-mono font-bold uppercase tracking-[0.2em]">
            {service.badge || 'PMO & Delivery Governance'}
          </div>

          <motion.h1
            id="project-hero-title"
            className="enterprise-hero-title font-display font-extrabold tracking-tight"
            {...entrance(0.05)}
          >
            {service.title}
          </motion.h1>

          <motion.p
            className="enterprise-hero-tagline font-semibold"
            {...entrance(0.12)}
          >
            {projectManagementData.intro.title}
          </motion.p>

          <motion.p
            className="enterprise-hero-description"
            {...entrance(0.19)}
          >
            {projectManagementData.intro.description}
          </motion.p>

          <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
            <motion.div {...entrance(0.26)}>
              <a href="#capabilities" className="btn-primary">
                <span>Explore Services</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </a>
            </motion.div>
            <motion.div {...entrance(0.33)}>
              <a href="#project-process" className="btn-secondary">
                <span>Our Process</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <ServiceHeroMedia videoRef={videoRef} autoPlay={!reducedMotion} poster={heroPoster}>
        <source src="/assets/aistudio/project-management-blue.webm" type="video/webm" />
        <source src="/assets/aistudio/project-management-blue.mp4" type="video/mp4" />
      </ServiceHeroMedia>
    </section>
  );
};
