import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { servicesData } from '../data/servicesData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('category');
  const [filterCategory, setFilterCategory] = useState<'all' | 'enterprise' | 'business'>(
    initialCat === 'enterprise' || initialCat === 'business' ? initialCat : 'all',
  );

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat === 'enterprise' || cat === 'business') {
      setFilterCategory(cat);
    } else {
      setFilterCategory('all');
    }
  }, [searchParams]);

  const filteredServices = servicesData.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <PageTransition revealServiceText>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. SERVICES HERO */}
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Services' }]} />

            <div className="mt-8 max-w-3xl">
              <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text">
                Enterprise & Business Capabilities
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                Comprehensive Technology & Workforce Services.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed text-balance">
                Explore Prakvi’s 13 Enterprise Solutions and 4 Business Solutions covering specialized staffing, mobility frameworks, cloud architecture, business intelligence, system integration, accounting, and custom software delivery.
              </p>
            </div>
          </div>
        </section>

        {/* 2. FILTER & SERVICES CATALOG */}
        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-line">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                  Explore Our Practices
                </h2>
                <p className="text-sm text-muted mt-1">
                  Select a track to explore specific service offerings, methodology steps, and technology stacks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 p-1.5 clay-soft rounded-full">
                {[
                  { id: 'all', label: `All Services (${servicesData.length})` },
                  { id: 'enterprise', label: 'Enterprise Solutions (13)' },
                  { id: 'business', label: 'Business Solutions (4)' },
                ].map((tab) => {
                  const active = filterCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setFilterCategory(tab.id as 'all' | 'enterprise' | 'business')}
                      className={`relative px-4 py-2 rounded-full text-xs font-semibold transition-colors active:scale-95 ${
                        active
                          ? 'text-white'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="services-filter-pill"
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 440, damping: 32 }
                          }
                          className="absolute inset-0 rounded-full bg-accent shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-12 space-y-10">
              {filteredServices.map((service, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={service.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.42,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="clay-card clay-card-interactive grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-7 sm:p-10"
                  >
                    <div className={`lg:col-span-7 space-y-4 ${isEven ? '' : 'lg:order-2'}`}>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-text">
                        {service.badge || (service.category === 'enterprise' ? 'Enterprise Solution' : 'Business Solution')}
                      </div>

                      <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                        {service.title}
                      </h3>

                      <p className="text-sm font-semibold text-accent-text">{service.tagline}</p>

                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {service.shortDesc}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        {service.capabilities.slice(0, 4).map((cap, i) => (
                          <div
                            key={i}
                            className="clay-soft flex items-start gap-2.5 p-3 text-xs text-foreground"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                            <span className="font-semibold">{cap.title}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3">
                        <Link to={`/services/${service.slug}`} className="btn-primary">
                          <span>View Service Details</span>
                          <ArrowRight className="arrow-shift" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="clay-soft p-3">
                        <div className="relative rounded-2xl overflow-hidden group">
                          <img
                            src={service.featuredImage}
                            alt={service.title}
                            className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="p-4 bg-card/95 border-t border-line">
                            <span className="font-mono text-accent-text uppercase tracking-wider block text-[10px] font-bold">
                              Delivery Focus
                            </span>
                            <span className="font-bold text-foreground text-sm mt-0.5 block">
                              {service.businessBenefits[0]?.title || service.tagline}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. LIFECYCLE OVERVIEW */}
        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Methodology"
              title="Structured Enterprise Delivery"
              description="Every Prakvi engagement follows a documented discovery, design, engineering, validation, and ongoing optimization lifecycle."
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-5">
              {[
                { step: '01', title: 'Discovery & Assessment', desc: 'Clarify objectives, audit infrastructure, and map requirements.' },
                { step: '02', title: 'Architecture & Planning', desc: 'Define roadmaps, policies, compliance controls, and resource plans.' },
                { step: '03', title: 'Build & Integration', desc: 'Implement scalable systems, analytics models, or curated talent teams.' },
                { step: '04', title: 'Testing & Validation', desc: 'Verify usability, accuracy, security readiness, and SLA benchmarks.' },
                { step: '05', title: 'Support & Optimization', desc: 'Monitor performance, refine operations, and scale continuously.' },
              ].map((item) => (
                <div key={item.step} className="clay-card p-6 text-center">
                  <div className="font-mono text-2xl font-extrabold text-accent mb-2">
                    {item.step}
                  </div>
                  <h4 className="font-display text-sm font-bold text-foreground mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
