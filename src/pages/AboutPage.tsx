
import React, { useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';

import {
  Award,
  BadgeCheck,
  Compass,
  Globe2,
  Handshake,
  Heart,
  Leaf,
  Lightbulb,
  Palette,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Lightbulb,
  Target,
  ShieldCheck,
  Award,
  Users,
  Heart,
  Leaf,
  Rocket,
  Handshake,
  Zap,
  Palette,
  Star,
  Trophy,
  BadgeCheck,
  Globe2,
  Sparkles,
};

const ABOUT_ROBOT_VIDEO_SRC =
  '/assets/aistudio/about_robot_seamless.mp4?v=3';

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const AboutPage: React.FC = () => {
  const { about, values, culturePillars, achievements } = companyData;

  const heroSectionRef = useRef<HTMLElement>(null);
  const robotVideoRef = useRef<HTMLVideoElement>(null);
  const mobileRobotVideoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });

  const rawParallaxY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  const parallaxY = useSpring(rawParallaxY, {
    stiffness: 110,
    damping: 26,
    mass: 0.45,
  });

  useEffect(() => {
    const videos = [
      robotVideoRef.current,
      mobileRobotVideoRef.current,
    ].filter((v): v is HTMLVideoElement => v !== null);

    videos.forEach((video) => {
      if (prefersReducedMotion) {
        video.pause();

        if (video.readyState >= 2) {
          video.currentTime = 2.0;
        }

        return;
      }

      const playPromise = video.play();

      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Autoplay may be blocked by browser policy.
          // Muted and playsInline handle standard cases.
        });
      }
    });
  }, [prefersReducedMotion]);

  const handleVideoLoadedData = (
    e: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
    if (!prefersReducedMotion) return;

    const video = e.currentTarget;
    video.pause();
    video.currentTime = 2.0;
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

        {/* 1. ABOUT HERO — Full-width background with animated AI robot */}

        <section
          ref={heroSectionRef}
          className="relative w-full overflow-hidden py-14 sm:py-18 md:py-20 lg:min-h-[560px] xl:min-h-[600px] md:flex md:items-center"
        >
          {/* Full-width atmospheric background */}

          <motion.div
            aria-hidden="true"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.85,
              ease: smoothEase,
            }}
            className="about-hero-backdrop pointer-events-none absolute inset-0"
          >
            {/* Animated background glow */}

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                    x: [0, 14, -8, 0],
                    y: [0, -10, 6, 0],
                    opacity: [0.65, 0.95, 0.72, 0.65],
                  }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                    duration: 11,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
              }
              className="absolute right-[4%] top-[8%] h-[80%] w-[48%] rounded-full bg-accent/14 blur-3xl"
            />

            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                    x: [0, -12, 10, 0],
                    y: [0, 8, -8, 0],
                    opacity: [0.55, 0.9, 0.6, 0.55],
                  }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                    duration: 13,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
              }
              className="absolute right-[12%] bottom-[8%] h-[66%] w-[40%] rounded-full bg-accent-secondary/16 blur-3xl"
            />
          </motion.div>

          {/* Desktop and tablet robot video */}

          <motion.div
            aria-hidden="true"
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.8,
              delay: prefersReducedMotion ? 0 : 0.08,
              ease: smoothEase,
            }}
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY }
            }
            className="hidden md:flex items-center justify-end pointer-events-none select-none absolute inset-y-0 right-0 md:w-[60%] lg:w-[64%] xl:w-[66%] xl:max-w-[1040px]"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                    y: [0, -6, 0],
                  }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
              }
              className="relative w-full aspect-video overflow-hidden"
            >
              <video
                ref={robotVideoRef}
                src={ABOUT_ROBOT_VIDEO_SRC}
                autoPlay={!prefersReducedMotion}
                muted
                loop={!prefersReducedMotion}
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoadedData}
                aria-label="Animated AI robot working on a laptop with floating code interfaces"
                className="w-full h-full object-contain object-right block select-none"
              />

              <div className="about-hero-edge-left pointer-events-none absolute inset-y-0 left-0 w-[12%]" />
              <div className="about-hero-edge-top pointer-events-none absolute inset-x-0 top-0 h-[5%]" />
              <div className="about-hero-edge-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[5%]" />
            </motion.div>
          </motion.div>

          {/* Left-side hero content */}

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div
              initial={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 0, y: 12 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.5,
                ease: smoothEase,
              }}
            >
              <Breadcrumbs items={[{ label: 'About Us' }]} />
            </motion.div>

            <div className="mt-8 md:max-w-[46%] lg:max-w-[47%] xl:max-w-[540px] space-y-5">
              <motion.div
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 14 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.55,
                  delay: prefersReducedMotion ? 0 : 0.06,
                  ease: smoothEase,
                }}
                className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text"
              >
                {about.hero.kicker}
              </motion.div>

              <motion.h1
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: prefersReducedMotion ? 0 : 0.14,
                  ease: smoothEase,
                }}
                className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance"
              >
                {about.hero.title}
              </motion.h1>

              <motion.p
                initial={
                  prefersReducedMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 18 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.65,
                  delay: prefersReducedMotion ? 0 : 0.24,
                  ease: smoothEase,
                }}
                className="text-base sm:text-lg text-muted leading-relaxed"
              >
                {about.hero.description}
              </motion.p>
            </div>
          </div>

          {/* Mobile robot video */}

          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 12 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0 : 0.75,
              delay: prefersReducedMotion ? 0 : 0.2,
              ease: smoothEase,
            }}
            className="md:hidden relative z-10 mt-6 w-full pointer-events-none select-none"
          >
            <motion.div
              animate={
                prefersReducedMotion
                  ? undefined
                  : {
                    y: [0, -5, 0],
                  }
              }
              transition={
                prefersReducedMotion
                  ? undefined
                  : {
                    duration: 5.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
              }
              className="relative w-full aspect-video overflow-hidden"
            >
              <video
                ref={mobileRobotVideoRef}
                src={ABOUT_ROBOT_VIDEO_SRC}
                autoPlay={!prefersReducedMotion}
                muted
                loop={!prefersReducedMotion}
                playsInline
                preload="auto"
                onLoadedData={handleVideoLoadedData}
                aria-label="Animated AI robot working on a laptop with floating code interfaces"
                className="w-full h-full object-contain block select-none"
              />

              <div className="about-hero-edge-left pointer-events-none absolute inset-y-0 left-0 w-[10%]" />
              <div className="about-hero-edge-top pointer-events-none absolute inset-x-0 top-0 h-[5%]" />
              <div className="about-hero-edge-bottom pointer-events-none absolute inset-x-0 bottom-0 h-[5%]" />
            </motion.div>
          </motion.div>
        </section>

        {/* 2. OUR STORY IS YOUR SUCCESS */}

        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 space-y-5">
                <SectionHeading
                  badge="Our Journey"
                  title={about.story.title}
                />

                <div className="space-y-4 text-base text-muted leading-relaxed">
                  {about.story.paragraphs.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                {about.story.highlights.map((item) => {
                  const IconComp = iconMap[item.icon] || Lightbulb;

                  return (
                    <div
                      key={item.title}
                      className="clay-card clay-card-interactive p-6 flex items-start gap-4"
                    >
                      <div className="clay-icon-box h-12 w-12 flex items-center justify-center shrink-0">
                        <IconComp
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>

                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {item.title}
                        </h3>

                        <p className="mt-1 text-sm text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3. OUR MISSION & OUR VISION */}

        <section className="py-section bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="clay-card p-8 sm:p-10">
                <div className="clay-icon-box w-12 h-12 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" aria-hidden="true" />
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  {about.mission.title}
                </h2>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {about.mission.description}
                </p>
              </div>

              <div className="clay-pastel p-8 sm:p-10">
                <div className="clay-icon-box w-12 h-12 flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" aria-hidden="true" />
                </div>

                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground mb-4">
                  {about.vision.title}
                </h2>

                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {about.vision.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. OUR CORE VALUES */}

        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Core Principles"
              title={about.valuesIntro.title}
              description={about.valuesIntro.description}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((v) => {
                const IconComp = iconMap[v.icon] || ShieldCheck;

                return (
                  <div
                    key={v.id}
                    className="clay-card clay-card-interactive p-7 flex flex-col"
                  >
                    <div className="clay-icon-box w-11 h-11 flex items-center justify-center mb-5">
                      <IconComp
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {v.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed">
                      {v.short}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. OUR CULTURE */}

        <section className="py-section bg-surface/65">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Workplace Identity"
              title={about.cultureIntro.title}
              description={about.cultureIntro.description}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {culturePillars.map((pillar, idx) => {
                const IconComp = iconMap[pillar.icon] || Rocket;

                return (
                  <div
                    key={pillar.id}
                    className={`${idx % 2 === 0 ? 'clay-card' : 'clay-soft'
                      } clay-card-interactive p-7`}
                  >
                    <div className="clay-icon-box w-11 h-11 flex items-center justify-center mb-5">
                      <IconComp
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. RECOGNITION & ACHIEVEMENTS */}

        <section id="recognition" className="py-section bg-section-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Milestones"
              title={about.recognitionIntro.title}
              description={about.recognitionIntro.description}
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((item) => {
                const IconComp = iconMap[item.icon] || Trophy;

                return (
                  <div
                    key={item.id}
                    className="clay-card clay-card-interactive p-7"
                  >
                    <div className="clay-icon-box w-11 h-11 flex items-center justify-center mb-5">
                      <IconComp
                        className="w-5 h-5"
                        aria-hidden="true"
                      />
                    </div>

                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}

        <CTASection
          title={about.cta.title}
          subtitle={about.cta.description}
          primaryButtonText={about.cta.buttonText}
          primaryButtonLink="/contact"
        />
      </div>
    </PageTransition>
  );
};
