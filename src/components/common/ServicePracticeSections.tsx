import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { SectionHeading } from './SectionHeading';
import { ServiceCapabilityOrbit } from './ServiceCapabilityOrbit';

const ease = [0.22, 1, 0.36, 1] as const;
interface PracticeContent {
  intro: { title: string; description: string };
  services: { title: string; description: string; cards: { title: string; description: string }[] };
  process: { title: string; description: string; steps: { number: number; title: string; description?: string; points?: string[] }[] };
  explorer: { title: string; description: string; tabs: { label: string; items: string[] }[] };
}
interface PracticeSectionsProps {
  content: PracticeContent;
  serviceIcons: LucideIcon[];
  featureIcons: LucideIcon[][];
  journeyIcons?: LucideIcon[];
  idPrefix: string;
  explorerLabel: string;
  className?: string;
  connectedServices?: boolean;
  introDecoration?: React.ReactNode;
  showIntroduction?: boolean;
}

export const ServicePracticeSections: React.FC<PracticeSectionsProps> = ({
  content, serviceIcons, featureIcons, journeyIcons, idPrefix, explorerLabel,
  className = '', connectedServices = false, introDecoration, showIntroduction = true,
}) => {
  const reducedMotion = useReducedMotion();
  const journeyRef = useRef<HTMLOListElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [orbitPaused, setOrbitPaused] = useState(false);
  const currentFeature = content.explorer.tabs[activeTab];
  const { scrollYProgress } = useScroll({ target: journeyRef, offset: ['start 75%', 'end 65%'] });

  const reveal = (delay = 0) => ({
    initial: reducedMotion ? false as const : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay, ease },
  });

  const moveHighlight = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  };

  return (
    <div className={`mobility-content ${className} relative isolate overflow-hidden`}>
      <motion.div
        aria-hidden="true"
        className="mobility-content-atmosphere pointer-events-none absolute inset-0"
        animate={reducedMotion ? undefined : { x: ['-2%', '2%', '-2%'], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      {showIntroduction && <section className="mobility-introduction relative" aria-labelledby={`${idPrefix}-introduction-title`}>
        {introDecoration}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.h2 id={`${idPrefix}-introduction-title`} className="font-display text-2xl sm:text-3xl font-extrabold text-foreground leading-tight" {...reveal()}>
              {content.intro.title}
            </motion.h2>
            <motion.p className="mt-4 text-base text-muted leading-relaxed" {...reveal(0.08)}>{content.intro.description}</motion.p>
            <motion.div className="mt-6 flex flex-wrap gap-3" {...reveal(0.16)}>
              <motion.a href="#capabilities" className="btn-primary" initial={connectedServices && !reducedMotion ? { opacity: 0, y: 6 } : false} whileInView={connectedServices ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.2 }}><span>Explore Services</span><ArrowRight className="arrow-shift" aria-hidden="true" /></motion.a>
              <motion.a href={`#${idPrefix}-process`} className="btn-secondary" initial={connectedServices && !reducedMotion ? { opacity: 0, y: 6 } : false} whileInView={connectedServices ? { opacity: 1, y: 0 } : undefined} viewport={{ once: true }} transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : 0.28 }}><span>Our Process</span><ArrowRight className="arrow-shift" aria-hidden="true" /></motion.a>
            </motion.div>
          </div>
        </div>
      </section>}

      <section id="capabilities" className="mobility-section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.services.title} description={content.services.description} align="center" />
          <div className={`mobility-services-grid${connectedServices ? ' relative' : ''} mt-9`}>
            {connectedServices && <svg className="practice-service-connectors" viewBox="0 0 1000 500" preserveAspectRatio="none" fill="none" aria-hidden="true"><motion.path d="M150 130 C300 90 360 170 500 130 S710 90 850 130 C940 150 760 340 700 360 S380 390 280 360" stroke={`url(#${idPrefix}-connector-gradient)`} strokeWidth="2" strokeDasharray="5 11" animate={reducedMotion ? undefined : { strokeDashoffset: [0, -32] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} /><defs><linearGradient id={`${idPrefix}-connector-gradient`}><stop stopColor="#119bd6"/><stop offset="0.6" stopColor="#15becb"/><stop offset="1" stopColor="#ed9a48"/></linearGradient></defs></svg>}
            {content.services.cards.map((card, index) => {
              const Icon = serviceIcons[index];
              return (
                <motion.article
                  key={card.title}
                  className="mobility-service-card relative overflow-hidden"
                  onPointerMove={moveHighlight}
                  whileHover={reducedMotion ? undefined : { y: -5 }}
                  {...reveal(index * 0.055)}
                >
                  <div className="mobility-service-icon"><Icon className="w-6 h-6" aria-hidden="true" /></div>
                  <h3 className="relative mt-5 font-display text-lg font-bold text-foreground leading-snug">{card.title}</h3>
                  <p className="relative mt-3 text-sm text-muted leading-relaxed">{card.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section id={`${idPrefix}-process`} className="mobility-section mobility-journey-section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.process.title} description={content.process.description} align="center" />
          <ol ref={journeyRef} className="mobility-journey relative mt-12">
            <li className="mobility-journey-line pointer-events-none" aria-hidden="true" role="presentation">
              <svg viewBox="0 0 80 700" preserveAspectRatio="none" className="w-full h-full" fill="none">
                <path d="M40 0 C62 35 18 65 40 100 S62 165 40 200 S18 265 40 300 S62 365 40 400 S18 465 40 500 S62 565 40 600 S18 665 40 700" stroke="#b9dced" strokeWidth="2" />
                <motion.path
                  d="M40 0 C62 35 18 65 40 100 S62 165 40 200 S18 265 40 300 S62 365 40 400 S18 465 40 500 S62 565 40 600 S18 665 40 700"
                  stroke="#089fdb" strokeWidth="3" strokeLinecap="round"
                  style={{ pathLength: reducedMotion ? 1 : scrollYProgress }}
                />
              </svg>
            </li>
            {content.process.steps.map((step, index) => (
              <motion.li key={step.number} className="mobility-journey-step" {...reveal()}>
                <motion.span
                  className="mobility-journey-number font-mono font-bold"
                  initial={false}
                  whileInView={{ backgroundColor: '#f28c45', borderColor: '#ffceb0', color: '#ffffff' }}
                  viewport={{ amount: 0.8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.35 }}
                  aria-hidden="true"
                >{String(step.number).padStart(2, '0')}</motion.span>
                <article className="mobility-journey-copy">
                  {journeyIcons ? <div className="flex items-center gap-3">{React.createElement(journeyIcons[index], { className: "practice-stage-icon w-6 h-6 shrink-0", "aria-hidden": true })}<h3 className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug">{step.title}</h3></div> : <h3 className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug">{step.title}</h3>}
                  {'description' in step && <p className="mt-3 text-sm sm:text-base text-muted leading-relaxed">{step.description}</p>}
                  {'points' in step && step.points && (
                    <ul className="mt-3 space-y-2 list-disc pl-5 text-sm sm:text-base text-muted leading-relaxed marker:text-accent">
                      {step.points.map(point => <li key={point}>{point}</li>)}
                    </ul>
                  )}
                </article>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section id={`${idPrefix}-explorer`} className="mobility-section relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title={content.explorer.title} description={content.explorer.description} align="center" />
          <div className="practice-orbit-explorer mx-auto mt-9 max-w-5xl">
            <div className="flex justify-center">
              <div className="mobility-explorer-tabs" role="tablist" aria-label={explorerLabel}>
                {content.explorer.tabs.map((tab, index) => (
                  <button
                    key={tab.label}
                    id={`${idPrefix}-feature-tab-${index}`}
                    type="button" role="tab"
                    aria-selected={activeTab === index}
                    aria-controls={`${idPrefix}-feature-panel`}
                    tabIndex={activeTab === index ? 0 : -1}
                    onClick={() => setActiveTab(index)}
                    onKeyDown={(event) => {
                      let next = index;
                      if (event.key === 'ArrowRight') next = (index + 1) % content.explorer.tabs.length;
                      else if (event.key === 'ArrowLeft') next = (index - 1 + content.explorer.tabs.length) % content.explorer.tabs.length;
                      else if (event.key === 'Home') next = 0;
                      else if (event.key === 'End') next = content.explorer.tabs.length - 1;
                      else return;
                      event.preventDefault();
                      setActiveTab(next);
                      document.getElementById(`${idPrefix}-feature-tab-${next}`)?.focus();
                    }}
                    className={`relative rounded-full px-4 sm:px-7 py-3 text-xs sm:text-sm font-bold transition-colors ${activeTab === index ? 'text-foreground' : 'text-muted hover:text-foreground'}`}
                  >
                    {activeTab === index && <motion.span layoutId={`${idPrefix}-feature-highlight`} className="mobility-explorer-highlight absolute inset-0 rounded-full" transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 430, damping: 34 }} aria-hidden="true" />}
                    <span className="relative">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div
              id={`${idPrefix}-feature-panel`}
              role="tabpanel"
              aria-labelledby={`${idPrefix}-feature-tab-${activeTab}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <ServiceCapabilityOrbit
                  key={activeTab}
                  label={currentFeature.label}
                  items={currentFeature.items}
                  icons={featureIcons[activeTab]}
                  paused={orbitPaused}
                  onTogglePause={() => setOrbitPaused(current => !current)}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
