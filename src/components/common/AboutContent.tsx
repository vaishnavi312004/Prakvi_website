import React, { useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import {
  Award, BadgeCheck, Globe2, Handshake, Heart, Leaf,
  Lightbulb, Palette, Rocket, ShieldCheck, Sparkles, Star, Target, Trophy, Users, Zap,
} from 'lucide-react';
import { companyData } from '../../data/companyData';
import { CTASection } from './CTASection';
import { CultureOrbit } from './CultureOrbit';
import { CoreValues } from './CoreValues';
import { RecognitionGallery } from './RecognitionGallery';
import { SectionHeading } from './SectionHeading';
import { AboutStory } from './AboutStory';
import { AboutDirection } from './AboutDirection';
import './AboutContent.css';

const { about, values, culturePillars, achievements } = companyData;
const icons = { Lightbulb, Target, ShieldCheck, Award, Users, Heart, Leaf, Rocket, Handshake, Zap, Palette, Star, Trophy, BadgeCheck, Globe2, Sparkles };
const iconFor = (name: string) => icons[name as keyof typeof icons] ?? Sparkles;

const AboutCulture = () => {
  return (
    <section id="culture" className="about-section about-culture-section">
      <div className="about-inner">
        <SectionHeading badge="Workplace Identity" {...about.cultureIntro} />
        <CultureOrbit cards={culturePillars.map(pillar => ({ ...pillar, Icon: iconFor(pillar.icon) }))} />
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
      <AboutStory
        title={about.story.title}
        paragraphs={about.story.paragraphs}
        values={about.story.highlights.map(item => ({ ...item, Icon: iconFor(item.icon) }))}
      />
      <CoreValues {...about.valuesIntro} values={values.map(value => ({ ...value, Icon: iconFor(value.icon) }))} />
      <AboutDirection />
      <AboutCulture />
      <RecognitionGallery {...about.recognitionIntro} items={achievements.map(item => ({ ...item, Icon: iconFor(item.icon) }))} />
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
