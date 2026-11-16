import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Monitor, Receipt, Server, UserCheck, Users } from 'lucide-react';
import FlipCard from './FlipCard';
import { homeData } from '../../data/homeData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Monitor,
  Layers,
  Server,
  Users,
  UserCheck,
  Receipt,
};

export const ServicesCards: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const tablet = window.matchMedia('(min-width: 640px)');
    const desktop = window.matchMedia('(min-width: 1024px)');
    const updateColumns = () => setColumns(desktop.matches ? 3 : tablet.matches ? 2 : 1);
    updateColumns();
    tablet.addEventListener('change', updateColumns);
    desktop.addEventListener('change', updateColumns);
    return () => {
      tablet.removeEventListener('change', updateColumns);
      desktop.removeEventListener('change', updateColumns);
    };
  }, []);

  return (
    <section aria-labelledby="services-cards-title" className="py-section bg-canvas">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent">
            Our Services
          </div>
          <h2
            id="services-cards-title"
            className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
          >
            Comprehensive IT Solutions
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            From cloud infrastructure to enterprise applications, we provide end-to-end technology solutions tailored to your business needs.
          </p>
        </div>

        <div className="service-flip-grid mt-12 grid justify-center gap-7">
          {homeData.featuredHomeServices.map((service, index) => {
            const Icon = iconMap[service.iconName] || Layers;
            return (
              <motion.article
                key={service.id}
                initial={reducedMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.6,
                  delay: reducedMotion ? 0 : (index % columns) * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex justify-center"
              >
                <FlipCard
                  label={service.title}
                  axis="y"
                  flipOnClick
                  draggable
                  dragDistance={0}
                  tilt
                  tiltMax={7}
                  glare
                  glareOpacity={0.18}
                  hoverScale={1.02}
                  perspective={1100}
                  stiffness={140}
                  damping={24}
                  width={310}
                  height={320}
                  radius={24}
                  background="linear-gradient(155deg, #FFFFFF 0%, var(--theme-surface) 100%)"
                  color="var(--theme-foreground)"
                  shadow
                  shadowColor="var(--theme-accent)"
                  shadowOpacity={0.14}
                  front={
                    <div className="flex h-full flex-col p-6 pb-16">
                      <div className="clay-icon-box mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-4">
                        {service.description}
                      </p>
                    </div>
                  }
                  back={
                    <div className="flex min-h-full flex-col justify-between p-6 pb-16">
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent">
                          Prakvi Practice
                        </div>
                        <h3 className="mt-1 font-display text-lg font-bold leading-snug text-foreground">
                          {service.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {service.description}
                        </p>
                      </div>
                      <Link
                        to={service.path}
                        className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-soft-accent px-4 py-2 text-xs font-bold text-accent hover:bg-accent hover:text-white transition-colors"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        <span>Explore Solution</span>
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  }
                />
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/services" className="btn-secondary">
            <span>View All 17 Enterprise & Business Services</span>
            <ArrowRight className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
