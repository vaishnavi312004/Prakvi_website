import React from 'react';
import { ScrollRevealText } from './ScrollRevealText';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { productsData } from '../../data/productsData';
import { enterpriseServiceOrder, businessServiceOrder, productOrder, sortCatalog } from '../../data/catalogOrder';
import { ServiceTiltCarousel, type ServiceCarouselItem } from './ServiceTiltCarousel';

const serviceCardImages: Record<string, { src: string; alt: string }> = {
  staffing: {
    src: '/images/services/staffing.jpg',
    alt: 'Colleagues collaborating around laptops in a bright office.',
  },
  'business-intelligence': {
    src: '/images/services/business-intelligence.jpg',
    alt: 'Enterprise performance charts displayed on a computer dashboard.',
  },
  'workforce-solution': {
    src: '/images/services/workforce-solution.jpg',
    alt: 'A team collaborating around a laptop in a modern office.',
  },
  'cloud-services': {
    src: '/images/services/cloud-services.jpg',
    alt: 'Enterprise servers and network equipment in a data center.',
  },
  'infrastructure-management': {
    src: '/images/services/infrastructure-management.jpg',
    alt: 'Computer circuitry and components used in IT infrastructure.',
  },
  'enterprise-architecture': {
    src: '/images/services/enterprise-architecture.jpg',
    alt: 'Technology team mapping a project with a wall of planning diagrams.',
  },
  'project-management': {
    src: '/images/services/project-management.jpg',
    alt: 'Project team planning work together around a table.',
  },
  'mobility-practice': {
    src: '/images/services/mobility-practice.jpg',
    alt: 'A professional using a smartphone with a business app.',
  },
  'supply-chain-management': {
    src: '/images/services/supply-chain-management.jpg',
    alt: 'A large distribution warehouse with organized inventory racks.',
  },
  'system-integration': {
    src: '/images/services/system-integration.jpg',
    alt: 'Technology professionals collaborating at laptops.',
  },
  'business-analytics': {
    src: '/images/services/business-analytics.jpg',
    alt: 'Business charts and analytics displayed on a laptop.',
  },
  accounting: {
    src: '/images/services/accounting.jpg',
    alt: 'Financial documents and a calculator arranged on a desk.',
  },
  'it-consulting': {
    src: '/images/services/it-consulting.jpg',
    alt: 'Business professionals discussing technology around a table.',
  },
  'web-design': {
    src: '/images/services/web-design.jpg',
    alt: 'A web developer working with code at a desktop computer.',
  },
  'enterprise-solution': {
    src: '/images/services/enterprise-solution.jpg',
    alt: 'Enterprise technology team working together at laptops.',
  },
  'digital-marketing': {
    src: '/images/services/digital-marketing.jpg',
    alt: 'A smartphone displaying social media in a marketing workspace.',
  },
  'mobile-app-development': {
    src: '/images/services/mobile-app-development.jpg',
    alt: 'A mobile app interface displayed on a smartphone beside a laptop.',
  },
  'data-analytics': {
    src: '/images/services/data-analytics.jpg',
    alt: 'An analytics dashboard with charts displayed on a laptop.',
  },
  'hr-management-system': {
    src: '/images/services/hr-management-system.jpg',
    alt: 'Colleagues working together at a computer in an office.',
  },
  'vendor-management': {
    src: '/images/services/vendor-management.jpg',
    alt: 'A professional reviewing business documents and reports.',
  },
  'relationship-management': {
    src: '/images/services/relationship-management.jpg',
    alt: 'A professional interacting with a customer dashboard on a laptop.',
  },
};

const imageFor = (id: string) => {
  const image = serviceCardImages[id];
  if (!image) throw new Error(`Missing service card image for "${id}".`);
  return { image: image.src, imageAlt: image.alt };
};

// Keep the complete catalog in one compact homepage carousel.
const catalogItems: ServiceCarouselItem[] = [
  ...sortCatalog(servicesData, [...enterpriseServiceOrder, ...businessServiceOrder]).map((service) => ({
    id: service.id,
    title: service.title,
    description: service.shortDesc,
    ...imageFor(service.id),
    category: service.category === 'enterprise' ? 'IT Services' : 'Business Solutions',
    href: `/services/${service.slug}`,
  })),
  ...sortCatalog(productsData, productOrder).map((product) => ({
    id: product.id,
    title: product.name,
    description: product.shortDesc,
    ...imageFor(product.id),
    category: 'Products',
    href: `/products/${product.slug}`,
  })),
];

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
              <ScrollRevealText text="Comprehensive IT Solutions" highlight="IT Solutions" />
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              From cloud infrastructure to enterprise applications, we provide end-to-end technology solutions tailored to your business needs.
            </p>
          </div>
          <Link to="/services" className="btn-primary w-fit">
            <span>View All Services</span><ArrowRight className="arrow-shift" aria-hidden="true" />
          </Link>
        </motion.div>
        <div className="mt-7">
          <ServiceTiltCarousel items={catalogItems} label="Services and products" />
        </div>
      </div>
    </section>
  );
};
