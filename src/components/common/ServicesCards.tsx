import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Monitor,
  Receipt,
  Server,
  UserCheck,
  Users,
} from 'lucide-react';
import { homeData } from '../../data/homeData';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Monitor,
  Layers,
  Server,
  Users,
  UserCheck,
  Receipt,
};

const bentoSpanClasses = [
  'sm:col-span-7',
  'sm:col-span-5',
  'sm:col-span-5',
  'sm:col-span-7',
  'sm:col-span-7',
  'sm:col-span-5',
];

export const ServicesCards: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(homeData.featuredHomeServices[1]?.id || homeData.featuredHomeServices[0].id);

  const activeService =
    homeData.featuredHomeServices.find((s) => s.id === activeId) ||
    homeData.featuredHomeServices[0];
  const ActiveIcon = iconMap[activeService.iconName] || Layers;

  return (
    <section
      aria-labelledby="services-cards-title"
      className="relative overflow-hidden bg-surface py-section"
    >
      {/* Subtle Blue Ambient Depth */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[760px] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--theme-soft-blue) 90%, transparent) 0%, transparent 72%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading — Explicitly Blue Brand Primary */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
              Our Services
            </div>
            <h2
              id="services-cards-title"
              className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-[2.65rem]"
            >
              Comprehensive{' '}
              <span className="text-accent">IT Solutions</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
              From cloud infrastructure to enterprise applications, we provide end-to-end technology solutions tailored to your business needs.
            </p>
          </div>

          <Link to="/services" className="btn-blue w-fit">
            <span>View All 17 IT Solutions</span>
            <ArrowRight className="arrow-shift" aria-hidden="true" />
          </Link>
        </div>

        {/* Blue-Dominant Asymmetric Showcase: Left Spotlight + Right Interlocking 7/5 Bento */}
        <div className="mt-12 grid grid-cols-1 items-stretch gap-7 lg:grid-cols-12">
          {/* LEFT: Blue Clay Spotlight Card (5 cols) */}
          <motion.div
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between rounded-[1.75rem] border border-accent/25 p-7 sm:p-9 shadow-xl"
            style={{
              background:
                'linear-gradient(155deg, #FFFFFF 0%, color-mix(in srgb, var(--theme-soft-blue) 92%, #FFFFFF) 100%)',
              boxShadow:
                '0 20px 44px -16px color-mix(in srgb, var(--theme-accent) 22%, transparent), inset 0 2px 4px rgba(255,255,255,0.95)',
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeService.id}
                initial={reducedMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.99 }}
                transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.32, 0.72, 0, 1] }}
                className="flex flex-1 flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className="clay-icon-box flex h-14 w-14 items-center justify-center rounded-2xl ring-4 ring-accent-secondary/20"
                      style={{
                        background: 'linear-gradient(145deg, #079CEB 0%, #16C6D4 100%)',
                        color: '#FFFFFF',
                      }}
                    >
                      <ActiveIcon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-text">
                      Prakvi Core Practice
                    </span>
                  </div>

                  <h3 className="mt-7 font-display text-2xl font-extrabold text-foreground sm:text-[1.7rem] leading-tight">
                    {activeService.title}
                  </h3>

                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted">
                    {activeService.description}
                  </p>

                  <div className="mt-6 space-y-2.5 border-t border-accent/15 pt-5">
                    {[
                      'Enterprise-grade architecture & governance',
                      'Dedicated Delhi & Nashik delivery specialists',
                    ].map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-2.5 text-xs sm:text-sm font-medium text-foreground"
                      >
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                  <Link to={activeService.path} className="btn-primary">
                    <span>Explore {activeService.title}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                  <Link to="/contact" className="btn-secondary">
                    <span>Consult Team</span>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* RIGHT: Asymmetric 7/5 Interactive Blue Clay Bento Grid (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
            {homeData.featuredHomeServices.map((service, index) => {
              const Icon = iconMap[service.iconName] || Layers;
              const isSelected = activeService.id === service.id;
              const spanClass = bentoSpanClasses[index] || 'sm:col-span-6';

              return (
                <motion.article
                  key={service.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.12 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  transition={{
                    duration: 0.45,
                    delay: reducedMotion ? 0 : index * 0.05,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  className={`${spanClass} group relative cursor-pointer rounded-[1.5rem] border p-5 sm:p-6 transition-all duration-200 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-card border-accent/60 shadow-lg ring-2 ring-accent/20 -translate-y-0.5'
                      : 'clay-card hover:border-accent/40 hover:-translate-y-1'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition-all ${
                          isSelected
                            ? 'bg-accent text-white shadow-md shadow-accent/30'
                            : 'clay-icon-box'
                        }`}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <Link
                        to={service.path}
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`Open ${service.title} details`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface/80 text-accent-text hover:bg-accent hover:text-white hover:border-accent transition-colors"
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </div>

                    <h3 className="mt-4 font-display text-lg font-bold text-foreground group-hover:text-accent-text transition-colors">
                      {service.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-line/70 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-accent-text">
                      {isSelected ? 'Viewing in Spotlight' : 'Preview Capability'}
                    </span>
                    <Link
                      to={service.path}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-xs font-bold text-accent-text hover:text-highlight"
                    >
                      <span>Details</span>
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
