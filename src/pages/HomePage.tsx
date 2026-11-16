import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { ServicesCards } from '../components/common/ServicesCards';
import { HeroVisual } from '../components/common/HeroVisual';
import { AnimatedCounter } from '../components/common/AnimatedCounter';
import { homeData } from '../data/homeData';
import { statsData } from '../data/statsData';
import { servicesData } from '../data/servicesData';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const whyIconMap: Record<string, React.FC<{ className?: string }>> = {
  Award,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  Layers,
};

export const HomePage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [activeServiceId, setActiveServiceId] = useState(servicesData[0].id);
  const activeService =
    servicesData.find((s) => s.id === activeServiceId) || servicesData[0];

  return (
    <PageTransition>
      <div className="overflow-x-hidden selection:bg-accent selection:text-white">
        {/* 1. SIGNATURE LIGHT CLAYMORPHISM HERO */}
        <section className="relative w-full min-h-[92svh] flex items-center hero-clay-canvas text-foreground pt-28 pb-16 lg:pb-24 overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Column (7 cols) */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 space-y-6 text-left"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                  {homeData.hero.badge}
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-foreground text-balance">
                  {homeData.hero.headlinePrefix}{' '}
                  <span className="text-accent">
                    {homeData.hero.headlineHighlight}
                  </span>{' '}
                  {homeData.hero.headlineSuffix}
                </h1>

                <p className="text-base sm:text-lg text-muted max-w-2xl leading-relaxed">
                  {homeData.hero.description}
                </p>

                {/* Primary & Secondary CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link to={homeData.hero.primaryCta.path} className="btn-primary">
                    <span>{homeData.hero.primaryCta.label}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>

                  <Link to={homeData.hero.secondaryCta.path} className="btn-secondary">
                    <span>{homeData.hero.secondaryCta.label}</span>
                  </Link>
                </div>

                {/* Verified Hero Highlights */}
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                  {homeData.hero.highlights.map((item) => (
                    <div
                      key={item.value}
                      className="clay-card px-5 py-4 flex items-center gap-3.5"
                    >
                      <div className="clay-icon-box h-10 w-10 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-display text-base font-extrabold text-foreground tabular-nums">
                          {item.value}
                        </div>
                        <div className="text-xs text-muted">{item.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Right Column (5 cols) — Innovation Globe + Geometric 'P' Reveal */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 w-full flex justify-center"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. COMPANY INTRODUCTION */}
        <section className="py-section bg-surface/65">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <SectionHeading
                  badge={homeData.intro.kicker}
                  title={homeData.intro.title}
                />

                <div className="space-y-4 text-base text-muted leading-relaxed">
                  {homeData.intro.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="space-y-2.5 pt-1">
                  {homeData.intro.proofPoints.map((point) => (
                    <div
                      key={point}
                      className="clay-soft px-4 py-3 flex items-center gap-3 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to={homeData.intro.ctaPath} className="btn-primary">
                    <span>{homeData.intro.ctaText}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="clay-card p-3 sm:p-4">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={homeData.intro.image}
                      alt="Prakvi Techno Solutions modern enterprise office campus"
                      className="w-full h-80 sm:h-96 object-cover"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FEATURED SERVICES FLIP CARDS */}
        <ServicesCards />

        {/* 4. INTERACTIVE DOMAIN CAPABILITIES SHOWCASE */}
        <section className="py-section bg-surface/75">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <SectionHeading
                badge="Practice Explorer"
                title="Specialized Enterprise & Business Practices"
                description="Explore our full-spectrum capabilities across staffing, mobility, BI, cloud engineering, analytics, and modern application delivery."
              />
              <Link
                to="/services"
                className="text-sm font-bold text-accent hover:text-highlight inline-flex items-center gap-1.5 shrink-0 transition-colors"
              >
                <span>View all {servicesData.length} practices</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="clay-card overflow-hidden">
              {/* Practice Selector Tabs */}
              <div className="flex overflow-x-auto border-b border-line bg-surface/70 p-3 gap-2">
                {servicesData.slice(0, 8).map((service) => {
                  const active = activeServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className={`shrink-0 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? 'bg-accent text-white shadow-md'
                          : 'bg-card text-muted hover:text-foreground border border-line'
                      }`}
                    >
                      {service.title.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {/* Active Practice Preview */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
                <div className="lg:col-span-7 space-y-5">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                    {activeService.badge || 'Enterprise Practice'}
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
                    {activeService.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {activeService.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {activeService.capabilities.slice(0, 4).map((cap, i) => (
                      <div
                        key={i}
                        className="clay-soft p-4 flex items-start gap-2.5 text-xs text-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                        <div>
                          <div className="font-bold text-foreground">{cap.title}</div>
                          <div className="text-muted line-clamp-2 mt-0.5">{cap.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 flex flex-wrap items-center gap-4">
                    <Link to={`/services/${activeService.slug}`} className="btn-primary">
                      <span>Explore {activeService.title.split('(')[0].trim()}</span>
                      <ArrowRight className="arrow-shift" aria-hidden="true" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-accent hover:text-highlight transition-colors"
                    >
                      Schedule consultation →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="clay-soft p-3">
                    <div className="relative rounded-2xl overflow-hidden group">
                      <img
                        src={activeService.featuredImage}
                        alt={activeService.title}
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="p-4 bg-card/95 border-t border-line">
                        <div className="text-[11px] font-mono text-accent uppercase tracking-wider font-bold">
                          Practice Focus
                        </div>
                        <div className="text-base font-bold font-display text-foreground mt-0.5">
                          {activeService.businessBenefits[0]?.title || activeService.tagline}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE PRAKVI (6 AUTHENTIC PILLARS IN BENTO CLAY GRID) */}
        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge={homeData.whyPrakvi.kicker}
              title={homeData.whyPrakvi.title}
              description={homeData.whyPrakvi.description}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeData.whyPrakvi.pillars.map((pillar, index) => {
                const IconComp = whyIconMap[pillar.iconName] || Award;
                const isHighlighted = index === 0 || index === 3;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className={`${
                      isHighlighted ? 'clay-pastel' : 'clay-card'
                    } clay-card-interactive p-7 flex flex-col justify-between`}
                  >
                    <div>
                      <div className="clay-icon-box w-12 h-12 flex items-center justify-center mb-5">
                        <IconComp className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground mb-2">
                        {pillar.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. VERIFIED STATISTICS PANEL */}
        <section className="py-section bg-surface/65">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="metrics-panel grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {statsData.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="font-display text-4xl sm:text-5xl font-extrabold text-accent tracking-tight tabular-nums">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-sm font-bold text-foreground pt-1">
                    {metric.label}
                  </div>
                  <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. CAREERS PREVIEW SPLIT */}
        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="clay-card p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent">
                  {homeData.careersPreview.kicker}
                </div>

                <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                  {homeData.careersPreview.title}
                </h2>

                <p className="text-base text-muted leading-relaxed">
                  {homeData.careersPreview.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to={homeData.careersPreview.primaryCta.path} className="btn-primary">
                    <span>{homeData.careersPreview.primaryCta.label}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>

                  <Link to={homeData.careersPreview.secondaryCta.path} className="btn-secondary">
                    <span>{homeData.careersPreview.secondaryCta.label}</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-6">
                <div className="overflow-hidden rounded-2xl border border-line shadow-md">
                  <img
                    src={homeData.careersPreview.image}
                    alt="Prakvi Collaborative Engineering Culture"
                    className="w-full h-72 sm:h-80 object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 8. CONSULTATION CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
