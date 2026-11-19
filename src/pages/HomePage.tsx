import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { PageTransition } from '../components/layout/PageTransition';
import { AboutImageCollage } from '../components/common/AboutImageCollage';
import { ScrollRevealText } from '../components/common/ScrollRevealText';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { ServicesCards } from '../components/common/ServicesCards';
import { WhyPrakviBenefits } from '../components/common/WhyPrakviBenefits';
import { AccordionGallery } from '../components/common/AccordionGallery';
import { RotatingText } from '../components/common/RotatingText';
import { TechOrbitEcosystem } from '../components/common/TechOrbitEcosystem';
import { CompanyStatistics } from '../components/common/CompanyStatistics';
import { homeData } from '../data/homeData';
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const introReveal = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden selection:bg-accent selection:text-white">
        {/* 1. COMPACT INTERACTIVE TAB-BASED HERO WITH P-LOGO BACKGROUND VIDEO */}
        <section className="hero-clay-canvas relative flex min-h-[100svh] w-full items-center overflow-hidden pt-24 pb-10 text-foreground lg:pt-26 lg:pb-12">
          {/* Full-Bleed Animated P-Logo Background Video */}
          {/* Anchor the video to the viewport, not the expandable preview's height.
              Opening a card must never resize or recrop the animated P. */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh] overflow-hidden" aria-hidden="true">
            <video
              autoPlay={!reducedMotion}
              muted
              loop
              playsInline
              preload="auto"
              className="h-full w-full object-cover object-[74%_center] lg:object-center"
            >
              <source
                src="/assets/aistudio/Designing_software_website_anima__db660b55_1080p_52e46a57.mp4"
                type="video/mp4"
              />
            </video>
            {/* Soft Left-Side Scrim for High-Contrast Typography While Preserving Right-Side P Logo */}
            <div className="absolute inset-0 bg-gradient-to-b from-canvas/85 via-canvas/68 to-canvas/30 lg:bg-gradient-to-r lg:from-canvas/88 lg:via-canvas/52 lg:to-transparent" />
            {/* Subtle Bottom Seam Blend into Canvas */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas via-canvas/25 to-transparent" />
          </div>

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
                  <ScrollRevealText text={homeData.hero.headlinePrefix} />{' '}
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
                    highlightColor="var(--theme-accent)"
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
                  <ScrollRevealText text={homeData.hero.headlineSuffix} />
                </h1>

                <p className="max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {homeData.hero.description}
                </p>

                <div className="pt-1">
                  <Link to="/contact" className="btn-primary">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>

              {/* Right Column (5 cols): Framing Space for the Video's Animated 3D P Logo */}
              <div
                className="hidden lg:block lg:col-span-5 min-h-[360px]"
                aria-hidden="true"
              />
            </div>
          </div>
        </section>

        {/* 2. COMPANY INTRODUCTION */}
        <section className="bg-canvas py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
              <motion.div
                initial={reducedMotion ? false : 'hidden'}
                whileInView="visible"
                viewport={{ once: false, amount: 0.02 }}
                variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.06 } } }}
                className="space-y-6 lg:col-span-6"
              >
                <motion.div variants={reducedMotion ? undefined : introReveal}>
                <SectionHeading
                  animate={false}
                  animateWords
                  badge={homeData.intro.kicker}
                  title={homeData.intro.title}
                  highlightWord="Innovative Enterprise Solutions"
                />
                </motion.div>

                <motion.div variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.04 } } }} className="space-y-4 text-base leading-relaxed text-muted">
                  {homeData.intro.paragraphs.map((p, idx) => (
                    <motion.p key={idx} variants={reducedMotion ? undefined : introReveal}>{p}</motion.p>
                  ))}
                </motion.div>

                <motion.div
                  variants={{ visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.04 } } }}
                  className="space-y-2.5 pt-1"
                >
                  {homeData.intro.proofPoints.map((point) => (
                    <motion.div
                      key={point}
                      variants={reducedMotion ? undefined : introReveal}
                      className="intro-proof-point clay-soft flex items-center gap-3 px-4 py-3 text-sm font-medium text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{point}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div variants={reducedMotion ? undefined : introReveal} className="pt-2">
                  <Link to={homeData.intro.ctaPath} className="btn-primary">
                    <span>{homeData.intro.ctaText}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, x: 28, scale: 0.97 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.32, 0.72, 0, 1] }}
                className="lg:col-span-6"
              >
                <AboutImageCollage />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 3. BLUE-DOMINANT COMPREHENSIVE IT SOLUTIONS SHOWCASE */}
        <ServicesCards />

        {/* 4. CIRCULAR ROTATIONAL TECHNOLOGY & SKILLS ORBITAL ECOSYSTEM */}
        <TechOrbitEcosystem animateTitles />

        {/* 6. WHY CHOOSE PRAKVI */}
        <section className="bg-canvas py-section">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-14">
              <div>
                <SectionHeading
                  animate={false}
                  badge={homeData.whyPrakvi.kicker}
                  title={homeData.whyPrakvi.title}
                  highlightWord="Prakvi?"
                  description={homeData.whyPrakvi.description}
                />
                <div className="mt-7">
                  <WhyPrakviBenefits />
                </div>
              </div>
              <AccordionGallery
                items={[
                  {
                    image: '/assets/why-prakvi/expert-team.webp',
                    label: 'Expert Team',
                    alt: 'IT professionals collaborating around a laptop in a modern office',
                  },
                  {
                    image: '/assets/why-prakvi/monitoring-support.webp',
                    label: 'Monitoring & Support',
                    alt: 'Technology team working together at a computer',
                  },
                  {
                    image: '/assets/why-prakvi/it-infrastructure.webp',
                    label: 'IT Infrastructure',
                    alt: 'Rows of enterprise servers in a data center',
                  },
                  {
                    image: '/assets/why-prakvi/security-practices.webp',
                    label: 'Security & Best Practices',
                    alt: 'Close-up of circuit-board traces and components representing secure IT infrastructure',
                  },
                  {
                    image: '/assets/why-prakvi/business-partnership.webp',
                    label: 'Business Partnership',
                    alt: 'Business and technology professionals collaborating on a laptop',
                  },
                ]}
                defaultIndex={2}
                expandRatio={0.52}
                duration={0.6}
                grayscale
              />
            </div>
          </div>
        </section>

        <CompanyStatistics />

        {/* 9. CONSULTATION CTA */}
        <CTASection compact title="Let's Start Your" titleAccent="Digital Transformation" />
      </div>
    </PageTransition>
  );
};
