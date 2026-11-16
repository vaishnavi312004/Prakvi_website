import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Cloud, Code2, LockKeyhole, Monitor, Server, Smartphone } from 'lucide-react';
import FlipCard from './FlipCard';
import { servicesData } from '../../data/servicesData';

const featuredServices = [
  { id: 'digital-marketing', icon: Monitor },
  { id: 'enterprise-solution', icon: LockKeyhole },
  { id: 'infrastructure-management', icon: Server },
  { id: 'cloud-services', icon: Cloud },
  { id: 'web-design', icon: Code2 },
  { id: 'mobile-app-development', icon: Smartphone },
];

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
  <section aria-labelledby="services-cards-title" className="services-cards-section py-section">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-bold text-white">Our Services</span>
        <h2 id="services-cards-title" className="mt-6 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Comprehensive IT Solutions</h2>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">From cloud infrastructure to enterprise applications, we provide end-to-end technology solutions tailored to your business needs.</p>
      </div>
      <div className="service-flip-grid mt-10 grid justify-center gap-6 lg:mt-12">
        {featuredServices.map(({ id, icon: Icon }, index) => {
          const service = servicesData.find(item => item.id === id);
          if (!service) return null;
          return (
            <motion.article key={service.id}
              initial={reducedMotion ? false : { opacity: 0, y: 36, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : (index % columns) * 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="service-card-reveal h-full">
            <FlipCard
              label={service.title}
              axis="y" flipOnClick draggable dragDistance={0}
              tilt tiltMax={8} glare glareOpacity={0.22} hoverScale={1.02}
              perspective={1100} stiffness={130} damping={24}
              width={270} height={300} radius={22}
              background="linear-gradient(145deg, #FFFFFF, var(--color-canvas))" color="var(--color-foreground)" shadow shadowColor="#755622" shadowOpacity={0.08}
              front={
                <div className="flex h-full flex-col p-6 pb-16">
                  <div className="mb-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold leading-snug text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.tagline}</p>
                </div>
              }
              back={
                <div className="flex min-h-full flex-col p-6 pb-16">
                  <h3 className="text-lg font-bold leading-snug text-foreground">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{service.shortDesc}</p>
                  <Link to={`/services/${service.slug}`} className="mt-5 inline-flex w-fit items-center gap-2 rounded py-1 text-sm font-semibold text-accent" aria-label={`Learn more about ${service.title}`}>Learn More<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
                </div>
              }
            />
            </motion.article>
          );
        })}
      </div>
    </div>
  </section>
  );
};
