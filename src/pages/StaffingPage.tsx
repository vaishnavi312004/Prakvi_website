import { motion, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import {
  ArrowRight,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ScrollRevealText } from '../components/common/ScrollRevealText';
import { ServiceHeroMedia } from '../components/common/ServiceHeroMedia';
import { PageTransition } from '../components/layout/PageTransition';
import { StaffingServiceFlow } from './StaffingServiceFlow';
import type { ServiceItem } from '../types';
import './StaffingPage.css';

export function StaffingPage({ service }: { service: ServiceItem }) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const entrance = (delay: number) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });
  return (
    <PageTransition revealServiceText>
      <div className={`staffing-page service-detail-page service-topic-${service.slug}`}>
        <section className="enterprise-hero service-video-hero staffing-hero staffing-video-hero relative isolate overflow-hidden" aria-labelledby="staffing-title">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 staffing-hero-content">
            <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: service.title }]} />
            <div className="enterprise-hero-copy">
              <motion.h1 id="staffing-title" className="enterprise-hero-title font-display font-extrabold tracking-tight" {...entrance(0.05)}>
                <ScrollRevealText text={service.tagline} highlight={service.tagline} />
              </motion.h1>
              <motion.p className="staffing-hero-copy enterprise-hero-description" {...entrance(0.18)}>
                {service.fullDesc}
              </motion.p>
              <div className="enterprise-hero-actions flex flex-wrap gap-3 sm:gap-4">
                <motion.div {...entrance(0.34)}>
                  <a href="#capabilities" className="btn-primary">
                    <span>Explore Services</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </a>
                </motion.div>
                <motion.div {...entrance(0.42)}>
                  <a href="#enterprise-process" className="btn-secondary">
                    <span>Our Process</span>
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
          <ServiceHeroMedia
            videoRef={videoRef}
            autoPlay={!reducedMotion}
            preload={reducedMotion ? 'none' : 'auto'}
          >
            {!reducedMotion && (
              <source
                src={`${import.meta.env.BASE_URL}videos/staffing-workforce.mp4`}
                type="video/mp4"
              />
            )}
          </ServiceHeroMedia>
        </section>

        <StaffingServiceFlow service={service} />
      </div>
    </PageTransition>
  );
}
