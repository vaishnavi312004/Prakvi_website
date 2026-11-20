
import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';

import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { AboutContent } from '../components/common/AboutContent';
import { PageTransition } from '../components/layout/PageTransition';
import { ScrollRevealText } from '../components/common/ScrollRevealText';
import { companyData } from '../data/companyData';

const ABOUT_ROBOT_VIDEO_SRC = '/assets/aistudio/about_robot_clean.mp4';

const smoothEase: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];

export const AboutPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { about } = companyData;

  const robotVideoRef = useRef<HTMLVideoElement>(null);
  const mobileRobotVideoRef = useRef<HTMLVideoElement>(null);

  const prefersReducedMotion = reducedMotion;

  useEffect(() => {
    const video = mobileRobotVideoRef.current;

    if (!video) return;

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
      <div className="about-page-theme overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        <section
          className="about-hero-backdrop relative w-full overflow-hidden pt-12 pb-0 sm:pt-16 lg:py-20 lg:min-h-[640px] xl:min-h-[680px] lg:flex lg:items-center"
        >
          <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'About Us' }]} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={
                  reducedMotion
                    ? false
                    : { opacity: 0, y: 16 }
                }
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.45,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="space-y-5"
              >
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text">
                  {about.hero.kicker}
                </div>

                {/* Merged heading:
                    Original styling + ScrollRevealText animation */}
                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                  <ScrollRevealText text={about.hero.title} />
                </h1>

                <p className="text-base sm:text-lg text-muted leading-relaxed">
                  {about.hero.description}
                </p>
              </motion.div>
            </div>
          </div>

          {/* Desktop robot video */}
          <motion.div
            initial={
              reducedMotion
                ? false
                : { opacity: 0 }
            }
            animate={{ opacity: 1 }}
            transition={{
              duration: reducedMotion ? 0 : 0.75,
              delay: reducedMotion ? 0 : 0.08,
              ease: smoothEase,
            }}
            className="about-hero-robot-desktop pointer-events-none select-none absolute inset-y-0 -right-[8%] hidden lg:flex items-center w-[72%]"
          >
            <motion.div className="relative w-full aspect-video overflow-hidden">
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
                className="w-full h-full object-contain block select-none"
              />
            </motion.div>
          </motion.div>

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
            className="lg:hidden relative z-10 mt-6 w-full pointer-events-none select-none"
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

        <AboutContent />
      </div>
    </PageTransition>
  );
};
