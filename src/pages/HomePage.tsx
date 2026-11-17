import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { PageTransition } from '../components/layout/PageTransition';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { ServicesCards } from '../components/common/ServicesCards';
import { HeroVisual } from '../components/common/HeroVisual';
import { HeroInteractiveTabs } from '../components/common/HeroInteractiveTabs';
import { RotatingText } from '../components/common/RotatingText';
import { TechOrbitEcosystem } from '../components/common/TechOrbitEcosystem';
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

  const leadPillars = homeData.whyPrakvi.pillars.slice(0, 2);
  const supportPillars = homeData.whyPrakvi.pillars.slice(2);

  return (
    <PageTransition>
      <div className="overflow-x-hidden selection:bg-accent selection:text-white">
        {/* 1. COMPACT INTERACTIVE TAB-BASED HERO */}
        <section className="hero-clay-canvas relative flex min-h-[76svh] w-full items-center overflow-hidden pt-24 pb-10 text-foreground lg:pt-26 lg:pb-12">
          {/* Subtle Architectural Hairline Curves Framing Hero Copy Toward 3D Logo */}
          <svg
            viewBox="0 0 1440 680"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="heroFlowBlue" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="var(--theme-accent)" stopOpacity="0.03" />
                <stop offset="55%" stopColor="var(--theme-accent)" stopOpacity="0.14" />
                <stop offset="100%" stopColor="var(--theme-accent-2)" stopOpacity="0.20" />
              </linearGradient>
              <linearGradient id="heroFlowOrange" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="var(--theme-orange)" stopOpacity="0.02" />
                <stop offset="65%" stopColor="var(--theme-orange)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--theme-accent)" stopOpacity="0.08" />
              </linearGradient>
            </defs>
            <path
              d="M -60 440 C 260 440, 480 280, 760 330 C 920 358, 1020 320, 1120 300"
              fill="none"
              stroke="url(#heroFlowBlue)"
              strokeWidth="1.35"
            />
            <path
              d="M -40 500 C 310 530, 560 410, 820 385 C 940 374, 1040 350, 1110 330"
              fill="none"
              stroke="url(#heroFlowOrange)"
              strokeWidth="1.15"
            />
          </svg>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-8">
              {/* Left Column (7 cols): Compact Headline + Interactive Tab Explorer */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5 text-left lg:col-span-7"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text">
                  {homeData.hero.badge}
                </div>

                <h1 className="font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[3.35rem]">
                  {homeData.hero.headlinePrefix}{' '}
                  <RotatingText
                    texts={[
                      homeData.hero.headlineHighlight,
                      'Enterprise Solutions',
                      'Cloud Services',
                      'Workforce Solutions',
                    ]}
                    effect="slide"
                    direction="up"
                    highlight
                    highlightColor="#079CEB"
                    staggerFrom="last"
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                    rotationInterval={2200}
                    splitBy="characters"
                    blur={0}
                    auto
                    loop
                    pauseOnHover={false}
                  />{' '}
                  {homeData.hero.headlineSuffix}
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {homeData.hero.description}
                </p>

                {/* Compact Interactive 4-Tab Explorer with Nested Subsection Reveals */}
                <HeroInteractiveTabs />
              </motion.div>

              {/* Right Column (5 cols): Animated Original #0193DD Prakvi P Brand Emblem */}
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex w-full justify-center self-center lg:col-span-5"
              >
                <HeroVisual />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. COMPANY INTRODUCTION */}
        <section className="bg-canvas py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <div className="space-y-6 lg:col-span-6">
                <SectionHeading
                  badge={homeData.intro.kicker}
                  title={homeData.intro.title}
                  highlightWord="Innovative Enterprise Solutions"
                />

                <div className="space-y-4 text-base leading-relaxed text-muted">
                  {homeData.intro.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                <div className="space-y-2.5 pt-1">
                  {homeData.intro.proofPoints.map((point) => (
                    <div
                      key={point}
                      className="clay-soft flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <Link to={homeData.intro.ctaPath} className="btn-blue">
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
                      className="h-80 w-full object-cover sm:h-96"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. BLUE-DOMINANT COMPREHENSIVE IT SOLUTIONS SHOWCASE */}
        <ServicesCards />

        {/* 4. CIRCULAR ROTATIONAL TECHNOLOGY & SKILLS ORBITAL ECOSYSTEM */}
        <TechOrbitEcosystem />

        {/* 5. INTERACTIVE DOMAIN CAPABILITIES PRACTICE EXPLORER */}
        <section className="bg-section-alt/80 py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <SectionHeading
                badge="Practice Explorer"
                title="Specialized Enterprise & Business Practices"
                highlightWord="Enterprise & Business"
                description="Explore our full-spectrum capabilities across staffing, mobility, BI, cloud engineering, analytics, and modern application delivery."
              />
              <Link
                to="/services"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-accent-text transition-colors hover:text-highlight"
              >
                <span>View all {servicesData.length} practices</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="clay-card overflow-hidden">
              {/* Practice Selector Tabs */}
              <div className="flex gap-2 overflow-x-auto border-b border-line bg-surface/80 p-3">
                {servicesData.slice(0, 8).map((service) => {
                  const active = activeServiceId === service.id;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setActiveServiceId(service.id)}
                      className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-semibold transition-all sm:text-sm ${
                        active
                          ? 'bg-accent text-white shadow-md shadow-accent/25'
                          : 'border border-line bg-card text-muted hover:text-foreground'
                      }`}
                    >
                      {service.title.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>

              {/* Active Practice Preview */}
              <div className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
                <div className="space-y-5 lg:col-span-7">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-text">
                    {activeService.badge || 'Enterprise Practice'}
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                    {activeService.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted sm:text-base">
                    {activeService.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 gap-3 pt-1 sm:grid-cols-2">
                    {activeService.capabilities.slice(0, 4).map((cap, i) => (
                      <div
                        key={i}
                        className="clay-soft flex items-start gap-2.5 p-4 text-xs text-foreground"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                          aria-hidden="true"
                        />
                        <div>
                          <div className="font-bold text-foreground">{cap.title}</div>
                          <div className="mt-0.5 line-clamp-2 text-muted">
                            {cap.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <Link to={`/services/${activeService.slug}`} className="btn-primary">
                      <span>Explore {activeService.title.split('(')[0].trim()}</span>
                      <ArrowRight className="arrow-shift" aria-hidden="true" />
                    </Link>

                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-accent-text transition-colors hover:text-highlight"
                    >
                      Schedule consultation →
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="clay-soft p-3">
                    <div className="group relative overflow-hidden rounded-2xl">
                      <img
                        src={activeService.featuredImage}
                        alt={activeService.title}
                        className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="border-t border-line bg-card/95 p-4">
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-text">
                          Practice Focus
                        </div>
                        <div className="mt-0.5 font-display text-base font-bold text-foreground">
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

        {/* 6. WHY CHOOSE PRAKVI — DISTINCT 2-TIER ASYMMETRIC CLAY ARCHITECTURE */}
        <section className="bg-canvas py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                badge={homeData.whyPrakvi.kicker}
                title={homeData.whyPrakvi.title}
                highlightWord="Prakvi?"
                description={homeData.whyPrakvi.description}
              />
              <Link to="/about" className="btn-secondary w-fit">
                <span>About Our Governance</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </Link>
            </div>

            {/* Tier 1: Flagship Dual Asymmetric Cards (7 / 5 split) */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
              {leadPillars.map((pillar, idx) => {
                const IconComp = whyIconMap[pillar.iconName] || Award;
                const isFirst = idx === 0;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.48, delay: idx * 0.08 }}
                    className={`${
                      isFirst ? 'lg:col-span-7 clay-pastel' : 'lg:col-span-5 clay-pastel-orange'
                    } clay-card-interactive flex flex-col justify-between p-7 sm:p-8`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <div
                          className={`${
                            isFirst ? 'clay-icon-box' : 'clay-icon-orange'
                          } flex h-12 w-12 items-center justify-center`}
                        >
                          <IconComp className="h-6 w-6" aria-hidden="true" />
                        </div>
                        <span
                          className={`font-mono text-xs font-bold ${
                            isFirst ? 'text-accent-text' : 'text-orange-text'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                      </div>
                      <h3 className="mt-6 font-display text-xl font-extrabold text-foreground sm:text-2xl">
                        {pillar.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Tier 2: 4 Supporting Precision Clay Tiles */}
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {supportPillars.map((pillar, idx) => {
                const IconComp = whyIconMap[pillar.iconName] || Award;
                return (
                  <motion.div
                    key={pillar.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.45, delay: 0.12 + idx * 0.06 }}
                    className="clay-card clay-card-interactive flex flex-col justify-between p-6"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div className="clay-icon-box flex h-10 w-10 items-center justify-center rounded-xl">
                          <IconComp className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <span className="font-mono text-[11px] font-bold text-subtle">
                          0{idx + 3}
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. VERIFIED STATISTICS PANEL WITH STRATEGIC ORANGE ACCENT NUMBERS */}
        <section className="bg-surface py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="metrics-panel grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
              {statsData.metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div
                    className={`font-display text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl ${
                      index % 2 === 0 ? 'text-orange' : 'text-accent'
                    }`}
                  >
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="pt-1 text-sm font-bold text-foreground">
                    {metric.label}
                  </div>
                  <p className="mx-auto max-w-xs text-xs leading-relaxed text-muted">
                    {metric.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. CAREERS PREVIEW SPLIT */}
        <section className="bg-canvas py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="clay-card grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:p-12">
              <div className="space-y-5 lg:col-span-6">
                <div className="text-xs font-mono font-bold uppercase tracking-widest text-accent-text">
                  {homeData.careersPreview.kicker}
                </div>

                <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-foreground text-balance sm:text-4xl">
                  {homeData.careersPreview.title}
                </h2>

                <p className="text-base leading-relaxed text-muted">
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
                    className="h-72 w-full object-cover sm:h-80"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. CONSULTATION CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
