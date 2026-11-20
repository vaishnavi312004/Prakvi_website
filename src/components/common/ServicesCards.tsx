import React from 'react';
import { ScrollRevealText } from './ScrollRevealText';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { homeData } from '../../data/homeData';
import { ServiceTiltCarousel, type ServiceCarouselItem } from './ServiceTiltCarousel';

const serviceCardImages: Record<string, { src: string; alt: string }> = {
  staffing: {
    src: '/images/services/staffing.jpg',
    alt: 'Colleagues collaborating around laptops in a bright office.',
  },
  'it-consulting': {
    src: '/images/services/it-consulting.jpg',
    alt: 'Business professionals discussing technology around a table.',
  },
  'project-management': {
    src: '/images/services/project-management.jpg',
    alt: 'Project team planning work together around a table.',
  },
  'workforce-solution': {
    src: '/images/services/workforce-solution.jpg',
    alt: 'A team collaborating around a laptop in a modern office.',
  },
  'enterprise-solution': {
    src: '/images/services/enterprise-solution.jpg',
    alt: 'Enterprise technology team working together at laptops.',
  },
  'hr-management-system': {
    src: '/images/services/hr-management-system.jpg',
    alt: 'Colleagues working together at a computer in an office.',
  },
};

const staffingItems: ServiceCarouselItem[] = homeData.services.cards.map(({ imageKey, ...card }) => {
  const { src, alt } = serviceCardImages[imageKey];
  return { ...card, image: src, imageAlt: alt };
});

export const ServicesCards: React.FC = () => {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-labelledby="home-services-title" className="relative overflow-hidden bg-canvas py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text">Our Services</div>
            <h2 id="home-services-title" className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]">
              <ScrollRevealText text={homeData.services.title} highlight="Staffing & Business Solutions" />
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              {homeData.services.description}
            </p>
          </div>
          <Link to="/services" className="btn-primary w-fit">
            <span>View All Services</span><ArrowRight className="arrow-shift" aria-hidden="true" />
          </Link>
        </motion.div>
        <div className="mt-7">
          <ServiceTiltCarousel items={staffingItems} label="Staffing and business solutions" />
        </div>
      </div>
    </section>
  );
};
