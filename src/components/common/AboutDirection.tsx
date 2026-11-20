import React, { useRef, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { companyData } from '../../data/companyData';
import { ScrollRevealText } from './ScrollRevealText';
import { VisionAnimation } from './VisionGlobe';
import { MissionAnimation } from './MissionAnimation';
import './AboutDirection.css';

const ease = [0.22, 1, 0.36, 1] as const;
const storyViewport = { once: true, amount: 0.23 } as const;
const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(update: () => void) {
  const preference = window.matchMedia(reducedMotionQuery);
  preference.addEventListener('change', update);
  return () => preference.removeEventListener('change', update);
}

export function AboutDirection() {
  const reduced = useSyncExternalStore(subscribeToMotionPreference, () => window.matchMedia(reducedMotionQuery).matches, () => false);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section);
  const { mission, vision } = companyData.about;

  return (
    <section ref={section} id="mission-vision" className="about-section about-direction-section" aria-label="Mission and vision" data-moving={inView && !reduced}>
      {/* Keep the scroll entrances active on direct visits, where the route skips its initial animation. */}
      <AnimatePresence>
        <div className="about-inner about-direction">
          {/* Row 1: Illustrations */}
          <div className="about-direction-cell mission-visual-cell">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={storyViewport}
              transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.12, ease }}
            >
              <MissionAnimation reduced={reduced} />
            </motion.div>
          </div>

          <div className="about-direction-cell vision-visual-cell">
            <motion.div
              initial={reduced ? false : { opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={storyViewport}
              transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.24, ease }}
            >
              <VisionAnimation reduced={reduced} />
            </motion.div>
          </div>

          {/* Row 2: Headings and Descriptions */}
          <div className="about-direction-cell mission-copy-cell">
            <div className="about-direction-copy">
              <h2>
                <ScrollRevealText text={mission.title} />
              </h2>
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 11 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={storyViewport}
                transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.23, ease }}
              >
                {mission.description}
              </motion.p>
            </div>
          </div>

          <div className="about-direction-cell vision-copy-cell">
            <div className="about-direction-copy">
              <h2>
                <ScrollRevealText text={vision.title} />
              </h2>
              <motion.p
                initial={reduced ? false : { opacity: 0, y: 11 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={storyViewport}
                transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.35, ease }}
              >
                {vision.description}
              </motion.p>
            </div>
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
}
