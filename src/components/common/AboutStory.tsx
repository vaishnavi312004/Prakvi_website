import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react';
import { AnimatePresence, motion, stagger, useInView, useScroll, useTransform } from 'motion/react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import './AboutStory.css';

type StoryValue = { title: string; description: string; Icon: LucideIcon };
type AboutStoryProps = { title: string; paragraphs: string[]; values: StoryValue[] };

const viewport = { once: true, amount: 0.24 } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const motionPreference = '(prefers-reduced-motion: reduce)';
const storyVideo = `${import.meta.env.BASE_URL}videos/prakvi-journey.mp4`;
const storyPoster = `${import.meta.env.BASE_URL}videos/prakvi-journey-poster.webp`;

function subscribeToMotionPreference(update: () => void) {
  const preference = window.matchMedia(motionPreference);
  preference.addEventListener('change', update);
  return () => preference.removeEventListener('change', update);
}

function subscribeToPageVisibility(update: () => void) {
  document.addEventListener('visibilitychange', update);
  return () => document.removeEventListener('visibilitychange', update);
}

function StoryVideo({ reduced }: { reduced: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const visible = useInView(frame, { amount: 0.38 });
  const foreground = useSyncExternalStore(subscribeToPageVisibility, () => !document.hidden, () => true);
  const playing = visible && foreground && !reduced;
  const { scrollYProgress } = useScroll({ target: frame, offset: ['start end', 'end start'] });
  const glowY = useTransform(scrollYProgress, [0, 1], [-5, 5]);

  useEffect(() => {
    const player = video.current;
    if (!player) return;

    if (playing) {
      void player.play().catch(() => { /* The poster remains available if autoplay is blocked. */ });
    } else {
      player.pause();
    }
    return () => player.pause();
  }, [playing]);

  return (
    <div ref={frame} className="about-story-film" aria-hidden="true" data-moving={playing}>
      <motion.div className="about-story-film-reveal"
        initial={reduced ? false : { opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={viewport}
        transition={{ duration: reduced ? 0 : 0.98, ease }}>
        <motion.div className="about-story-film-glow" style={reduced ? undefined : { y: glowY }} />
        <div className="about-story-film-window">
          {reduced ? (
            <img src={storyPoster} width={1280} height={720} alt="" decoding="async" />
          ) : (
            <video ref={video} src={storyVideo} poster={storyPoster} width={1280} height={720}
              autoPlay={playing} muted loop playsInline preload="metadata" />
          )}
        </div>
      </motion.div>
    </div>
  );
}

function FeatureRow({ value, selected, reduced, onSelect }: {
  value: StoryValue;
  selected: boolean;
  reduced: boolean;
  onSelect: () => void;
}) {
  const id = useId();
  const { Icon } = value;
  return (
    <motion.li className="about-story-feature" data-selected={selected}
      variants={{ hidden: { opacity: 0, y: 11 }, shown: { opacity: 1, y: 0 } }}
      transition={{ duration: reduced ? 0 : 0.48, ease }}>
      <div className="about-story-feature-content">
        <span className="about-story-feature-icon"><Icon aria-hidden="true" /></span>
        <div>
          <h3 id={`${id}-title`}>{value.title}</h3>
          <p id={`${id}-description`}>{value.description}</p>
        </div>
        <ArrowRight className="about-story-feature-arrow" aria-hidden="true" />
        <button type="button" className="about-story-feature-select"
          aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} aria-pressed={selected} onClick={onSelect} />
      </div>
    </motion.li>
  );
}

function FeatureRows({ values, reduced }: { values: StoryValue[]; reduced: boolean }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <motion.ul className="about-story-features" aria-label="Company values"
      initial={reduced ? false : 'hidden'}
      animate={reduced ? 'shown' : undefined}
      whileInView="shown" viewport={viewport}
      variants={{ shown: { transition: { delayChildren: reduced ? 0 : stagger(0.09, { startDelay: 0.25 }) } } }}>
      {values.map((value, index) => (
        <FeatureRow key={value.title} value={value} reduced={reduced} selected={selected === index}
          onSelect={() => setSelected(current => current === index ? null : index)} />
      ))}
    </motion.ul>
  );
}

export function AboutStory({ title, paragraphs, values }: AboutStoryProps) {
  const reduced = useSyncExternalStore(subscribeToMotionPreference, () => window.matchMedia(motionPreference).matches, () => false);

  return (
    <section id="story" className="about-section about-story-section" aria-labelledby="about-story-title">
      <div className="about-story-atmosphere" aria-hidden="true" />
      {/* Run the scroll entrances even when the route skips its initial animation. */}
      <AnimatePresence>
        <div className="about-inner about-story">
          <div className="about-story-copy">
            <motion.div
              className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={viewport}
              transition={{ duration: reduced ? 0 : 0.5, ease }}
            >Our Journey</motion.div>
            <div className="about-story-title-reveal">
              <motion.h2
                id="about-story-title"
                className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-foreground text-balance"
                initial={reduced ? false : { opacity: 0, y: 23 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.065, ease }}
              >{title}</motion.h2>
            </div>
            {paragraphs.map((paragraph, index) => (
              <motion.p key={paragraph}
                initial={reduced ? false : { opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : 0.1 + index * 0.11, ease }}
              >{paragraph}</motion.p>
            ))}
          </div>
          <div className="about-story-visual">
            <StoryVideo reduced={reduced} />
            <FeatureRows values={values} reduced={reduced} />
          </div>
        </div>
      </AnimatePresence>
    </section>
  );
}

