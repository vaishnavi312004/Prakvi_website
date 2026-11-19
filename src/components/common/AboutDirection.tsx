import React, { useRef, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, useInView } from 'motion/react';
import { companyData } from '../../data/companyData';
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
          {[mission, vision].map((item, index) => (
            <article key={item.title} className="about-direction-item">
              <motion.div
                initial={reduced ? false : index === 0 ? { opacity: 0, y: 18 } : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={storyViewport}
                transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.12 + index * 0.12, ease }}
              >
                {index === 0 ? <MissionAnimation reduced={reduced} /> : <VisionAnimation reduced={reduced} />}
              </motion.div>
              <motion.div
                className="about-direction-copy"
                initial={reduced ? false : { opacity: 0, y: 23 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={storyViewport}
                transition={{ duration: reduced ? 0 : 0.64, delay: reduced ? 0 : 0.13, ease }}
              >
                <h2>{item.title}</h2>
                <motion.p initial={reduced ? false : { opacity: 0, y: 11 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={storyViewport} transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 0.23, ease }}>{item.description}</motion.p>
              </motion.div>
            </article>
          ))}
        </div>
      </AnimatePresence>
    </section>
  );
}
