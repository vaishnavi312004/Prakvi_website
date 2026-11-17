import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { projectManagementData } from '../../data/projectManagementData';
import { Breadcrumbs } from './Breadcrumbs';

export const ProjectManagementHero: React.FC<{ service: ServiceItem }> = ({ service }) => {
  const reducedMotion = useReducedMotion();
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <section className="enterprise-hero mobility-hero project-hero relative isolate overflow-hidden" aria-labelledby="project-hero-title">
      <div className="enterprise-hero-backdrop absolute inset-0 z-[1] pointer-events-none" aria-hidden="true">
        <div className="enterprise-hero-colour-wash absolute inset-0" />
        <div className="enterprise-hero-video-overlay absolute inset-0" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />
        <div className="enterprise-hero-copy">
          <motion.h1 id="project-hero-title" className="enterprise-hero-title font-display font-extrabold tracking-tight" {...entrance(0.05)}>{projectManagementData.intro.title}</motion.h1>
          <motion.p className="enterprise-hero-description" {...entrance(0.16)}>{projectManagementData.intro.description}</motion.p>
          <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
            <motion.div {...entrance(0.25)}><a href="#capabilities" className="btn-primary"><span>Explore Services</span><ArrowRight className="arrow-shift" aria-hidden="true" /></a></motion.div>
            <motion.div {...entrance(0.33)}><a href="#project-process" className="btn-secondary"><span>Our Process</span><ArrowRight className="arrow-shift" aria-hidden="true" /></a></motion.div>
          </div>
        </div>
      </div>
      <div className="mobility-hero-visual pointer-events-none" aria-hidden="true">
        <motion.img
          className="mobility-hero-video"
          src="/assets/aistudio/project-management-hero.webp"
          width={1672} height={941} alt=""
          fetchPriority="high" decoding="async"
          animate={reducedMotion ? undefined : { y: [0, -3, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </section>
  );
};
