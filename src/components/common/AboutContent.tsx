import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import {
  ArrowLeft, ArrowRight, Award, BadgeCheck, Compass, Globe2, Handshake, Heart, Leaf,
  Lightbulb, Palette, Rocket, ShieldCheck, Sparkles, Star, Target, Trophy, Users, Zap,
} from 'lucide-react';
import { companyData } from '../../data/companyData';
import { CTASection } from './CTASection';
import { SectionHeading } from './SectionHeading';
import './AboutContent.css';

const { about, values, culturePillars, achievements } = companyData;
const icons = { Lightbulb, Target, ShieldCheck, Award, Users, Heart, Leaf, Rocket, Handshake, Zap, Palette, Star, Trophy, BadgeCheck, Globe2, Sparkles };
const ease = [0.22, 1, 0.36, 1] as const;
const iconFor = (name: string) => icons[name as keyof typeof icons] ?? Sparkles;

function useAboutSelection(count: number) {
  const id = useId();
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelId = `${id}-panel`;
  const tabId = (index: number) => `${id}-${index}`;
  const select = (index: number) => setSelected((index + count) % count);

  const tabProps = (index: number) => ({
    id: tabId(index),
    type: 'button' as const,
    role: 'tab',
    tabIndex: index === selected ? 0 : -1,
    'aria-selected': index === selected,
    'aria-controls': panelId,
    ref: (node: HTMLButtonElement | null) => { tabs.current[index] = node; },
    onClick: () => select(index),
    onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const next = {
        ArrowRight: (index + 1) % count,
        ArrowLeft: (index - 1 + count) % count,
        Home: 0,
        End: count - 1,
      }[event.key];
      if (next === undefined) return;
      event.preventDefault();
      select(next);
      tabs.current[next]?.focus({ preventScroll: true });
    },
  });

  return {
    selected, select, tabs, tabProps,
    panelProps: { id: panelId, role: 'tabpanel', tabIndex: 0, 'aria-labelledby': tabId(selected) },
  };
}

const AboutStory = () => {
  const reduced = useReducedMotion();

  return (
    <section id="story" className="about-section">
      <div className="about-inner about-story">
        <div className="about-story-copy">
          <SectionHeading badge="Our Journey" title={about.story.title} />
          {about.story.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <motion.div
          initial={reduced ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: reduced ? 0 : 0.65, ease }}
        >
          <img className="about-story-image" src={about.hero.image} width={1376} height={768} alt="" loading="lazy" decoding="async" />
          <ul className="about-story-highlights">
            {about.story.highlights.map((item) => {
              const Icon = iconFor(item.icon);
              return (
                <li key={item.title}>
                  <Icon aria-hidden="true" />
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </li>
              );
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

const AboutValues = () => {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.2 });
  const { selected, tabProps, panelProps } = useAboutSelection(values.length);
  const active = values[selected];
  const ActiveIcon = iconFor(active.icon);

  return (
    <section ref={section} id="values" className="about-section" data-moving={inView && !reduced}>
      <div className="about-inner">
        <SectionHeading badge="Core Principles" {...about.valuesIntro} align="center" />
        <div className="about-values">
          <div className="about-orbit" role="tablist" aria-label={about.valuesIntro.title}>
            <div className="about-orbit-rings" aria-hidden="true" />
            <div className="about-orbit-core" aria-hidden="true">
              <AnimatePresence initial={false} mode="wait">
                <motion.span
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, scale: 0.78, rotate: -12 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.84, rotate: 12 }}
                  transition={{ duration: reduced ? 0 : 0.22 }}
                ><ActiveIcon /></motion.span>
              </AnimatePresence>
            </div>
            {values.map((value, index) => {
              const Icon = iconFor(value.icon);
              return <button key={value.id} className="about-value-node" {...tabProps(index)}>
                <span><Icon aria-hidden="true" /></span>{value.title}
              </button>;
            })}
          </div>
          <div className="about-value-detail" {...panelProps}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <ActiveIcon aria-hidden="true" />
                <h3>{active.title}</h3>
                <p>{active.short}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutDirection = () => {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section, { amount: 0.2 });
  return (
    <section ref={section} id="mission-vision" className="about-section" data-moving={inView && !reduced}>
      <div className="about-inner about-direction">
        {[about.mission, about.vision].map((item, index) => {
          const Icon = index === 0 ? Target : Compass;
          return (
            <motion.article
              key={item.title}
              className={`about-direction-item ${index === 0 ? 'about-mission' : 'about-vision'}`}
              initial={reduced ? false : { opacity: 0, x: index === 0 ? -22 : 22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: reduced ? 0 : 0.72, ease }}
            >
              <div className="about-direction-art" aria-hidden="true"><i /><i /><i /></div>
              <Icon aria-hidden="true" className="about-direction-icon" />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

const AboutCulture = () => {
  const reduced = useReducedMotion();
  return (
    <section id="culture" className="about-section">
      <div className="about-inner">
        <SectionHeading badge="Workplace Identity" {...about.cultureIntro} />
        <div className="about-bento">
          {culturePillars.map((pillar, index) => {
            const Icon = iconFor(pillar.icon);
            return (
              <motion.article
                key={pillar.id}
                className="about-culture-panel"
                tabIndex={0}
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : (index % 3) * 0.075, ease }}
                onPointerMove={(event) => {
                  const panel = event.currentTarget;
                  const box = panel.getBoundingClientRect();
                  panel.style.setProperty('--spot-x', `${event.clientX - box.left}px`);
                  panel.style.setProperty('--spot-y', `${event.clientY - box.top}px`);
                }}
              >
                <Icon aria-hidden="true" className="about-culture-motif" />
                <span className="about-culture-icon"><Icon aria-hidden="true" /></span>
                <h3>{pillar.title}</h3>
                <p>{pillar.desc}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const AboutRecognition = () => {
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const inView = useInView(section, { amount: 0.2 });
  const { selected, select, tabs, tabProps, panelProps } = useAboutSelection(achievements.length);
  const active = achievements[selected];
  const ActiveIcon = iconFor(active.icon);

  useEffect(() => {
    const viewport = strip.current;
    const tab = tabs.current[selected];
    if (!viewport || !tab || viewport.scrollWidth <= viewport.clientWidth) return;
    const outer = viewport.getBoundingClientRect();
    const inner = tab.getBoundingClientRect();
    if (inner.left >= outer.left && inner.right <= outer.right) return;
    viewport.scrollTo({
      left: viewport.scrollLeft + inner.left - outer.left - (outer.width - inner.width) / 2,
      behavior: reduced ? 'instant' : 'smooth',
    });
  }, [reduced, selected, tabs]);

  return (
    <section ref={section} id="recognition" className="about-section" data-moving={inView && !reduced}>
      <div className="about-inner">
        <SectionHeading badge="Milestones" {...about.recognitionIntro} align="center" />
        <div className="about-milestone-scroll" ref={strip}>
          <div className="about-milestone-track" role="tablist" aria-label={about.recognitionIntro.title}>
            <svg viewBox="0 0 1200 76" preserveAspectRatio="none" aria-hidden="true">
              <motion.path
                d="M100 37 Q200 61 300 37 T500 37 T700 37 T900 37 T1100 37"
                initial={reduced ? false : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduced ? 0 : 1.35, ease }}
              />
            </svg>
            {achievements.map((item, index) => {
              const Icon = iconFor(item.icon);
              return (
                <motion.button
                  key={item.id}
                  className="about-milestone"
                  {...tabProps(index)}
                  initial={reduced ? false : { opacity: 0, scale: 0.86 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduced ? 0 : 0.36, delay: reduced ? 0 : 0.1 + index * 0.085, ease }}
                >
                  <span><Icon aria-hidden="true" /></span>{item.title}
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="about-milestone-bottom">
          <div className="about-milestone-detail" {...panelProps}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={active.id}
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.2 }}
              >
                <ActiveIcon aria-hidden="true" />
                <div><h3>{active.title}</h3><p>{active.description}</p></div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="about-milestone-controls">
            <button type="button" aria-label="Previous milestone" onClick={() => select(selected - 1)}><ArrowLeft aria-hidden="true" /></button>
            <button type="button" aria-label="Next milestone" onClick={() => select(selected + 1)}><ArrowRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export const AboutContent = () => {
  const reduced = useReducedMotion();
  const content = useRef<HTMLDivElement>(null);
  const inView = useInView(content);
  return (
    <div ref={content} className="about-content" data-moving={inView && !reduced}>
      <div className="about-ambient" aria-hidden="true" />
      <AboutStory />
      <AboutValues />
      <AboutDirection />
      <AboutCulture />
      <AboutRecognition />
      <CTASection
        immersive
        title={about.cta.title}
        subtitle={about.cta.description}
        primaryButtonText={about.cta.buttonText}
        primaryButtonLink="/contact"
      />
    </div>
  );
};
