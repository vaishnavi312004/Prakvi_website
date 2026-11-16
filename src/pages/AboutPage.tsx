import React from 'react';
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

export const AboutPage: React.FC = () => {
  const { about, values, culturePillars, achievements } = companyData;

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. ABOUT HERO */}
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'About Us' }]} />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                  {about.hero.kicker}
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                  {about.hero.title}
                </h1>

                <p className="text-base sm:text-lg text-muted leading-relaxed">
                  {about.hero.description}
                </p>
              </div>

              <div className="lg:col-span-5">
                <div className="clay-card p-3">
                  <img
                    src={about.hero.image}
                    alt="Prakvi Technology Innovation Studio"
                    className="w-full h-72 sm:h-80 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
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
                        <IconComp className="h-6 w-6" aria-hidden="true" />
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
        <section className="py-section bg-surface/75">
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
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{v.short}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. OUR CULTURE */}
        <section className="py-section bg-surface/75">
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
                    className={`${
                      idx % 2 === 0 ? 'clay-card' : 'clay-soft'
                    } clay-card-interactive p-7`}
                  >
                    <div className="clay-icon-box w-11 h-11 flex items-center justify-center mb-5">
                      <IconComp className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">{pillar.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 6. RECOGNITION & ACHIEVEMENTS */}
        <section id="recognition" className="py-section bg-canvas">
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
                      <IconComp className="w-5 h-5" aria-hidden="true" />
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
