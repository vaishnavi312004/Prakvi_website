import { useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  Activity, ChartNoAxesCombined, Check, ClipboardCheck, Cloud, Database,
  Fingerprint, Gauge, HardDrive, Headset, KeyRound, Layers,
  LockKeyhole, MoveDiagonal, Network, ScanLine, ServerCog,
  Settings2, ShieldCheck, SlidersHorizontal, Workflow,
} from 'lucide-react';
import { AnimatePresence, motion, useIsPresent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import type { ServiceItem, ServiceStackTab } from '../../types';
import { SectionHeading } from './SectionHeading';
import { serviceCardEase } from './ServiceCardMotion';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import './InfrastructureManagementSections.css';

const container = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';
const viewport = { once: true, amount: 0.22 } as const;
const lifecycleIcons = [ScanLine, ClipboardCheck, Workflow, Activity, ShieldCheck, Headset];
const capabilityIcons = [
  [Activity, ServerCog, Network, SlidersHorizontal],
  [Gauge, Workflow, Settings2, Database],
  [ShieldCheck, KeyRound, LockKeyhole, ScanLine],
  [Cloud, MoveDiagonal, Layers, ChartNoAxesCombined],
];

function Checklist({ items, className }: { items: string[]; className: string }) {
  return (
    <ul className={`infra-checklist ${className}`}>
      {items.map(item => (
        <li key={item}><Check size={15} aria-hidden="true" /><span>{item}</span></li>
      ))}
    </ul>
  );
}

function InfrastructureLifecycle({ service }: { service: ServiceItem }) {
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 80%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 260, damping: 30, restDelta: 0.001 });

  return (
    <section id="infrastructure-process" tabIndex={-1} className="infra-section infra-lifecycle">
      <div className={container}>
        <SectionHeading
          badge="Our Process"
          title={service.processTitle || service.title}
          description={service.processSubtitle}
          align="center"
          animateWords
          animateWordsOnce={false}
        />
        <div className="infra-timeline" ref={track}>
          <div className="infra-timeline-track" aria-hidden="true">
            <motion.span style={{ scaleY: reduced ? 1 : scaleY, transformOrigin: 'top center' }} />
          </div>
          <ol className="infra-milestones">
            {service.deliverySteps.map((step, index) => {
              const Icon = lifecycleIcons[index];
              return (
                <motion.li
                  key={step.step}
                  className="infra-milestone"
                  initial={reduced ? false : 'pending'}
                  whileInView="reached"
                  viewport={viewport}
                >
                  <motion.span
                    className="infra-milestone-number font-mono text-sm font-extrabold"
                    variants={{
                      pending: { opacity: 0.35, scale: 0.88 },
                      reached: {
                        opacity: 1,
                        scale: 1,
                        boxShadow: '0 0 16px rgba(105, 87, 130, 0.45)',
                      },
                    }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.step}
                  </motion.span>
                  <motion.article
                    className="infra-milestone-card"
                    variants={{
                      pending: { opacity: 0, x: index % 2 === 0 ? -28 : 28 },
                      reached: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: serviceCardEase }}
                  >
                    <div className="infra-milestone-heading">
                      {Icon && <span className="infra-icon"><Icon size={20} aria-hidden="true" /></span>}
                      <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
                    </div>
                    {step.points
                      ? <Checklist items={step.points} className="text-xs sm:text-sm text-muted leading-relaxed" />
                      : <p className="text-xs sm:text-sm text-muted leading-relaxed">{step.description}</p>}
                  </motion.article>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function InfrastructureCapabilityCards({ tab, index }: { tab: ServiceStackTab; index: number }) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  return (
    <motion.ul
      className="infra-capability-grid"
      data-tone={index}
      aria-hidden={!present}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: serviceCardEase }}
    >
      {tab.items.map((item, position) => {
        const Icon = capabilityIcons[index]?.[position] ?? HardDrive;
        return (
          <motion.li
            key={item}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.32,
              delay: reduced ? 0 : position * 0.04,
              ease: serviceCardEase,
            }}
          >
            <div className="infra-capability-card">
              <span className="infra-icon"><Icon size={23} aria-hidden="true" /></span>
              <span className="text-sm font-semibold text-foreground">{item}</span>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function InfrastructureCapabilities({ service, tabs }: { service: ServiceItem; tabs: ServiceStackTab[] }) {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const id = useId();
  const panelId = `${id}-panel`;
  const tabId = (index: number) => `${id}-tab-${index}`;
  const tabIcons = [Activity, Gauge, Fingerprint, MoveDiagonal];

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case 'ArrowLeft': next = (index + tabs.length - 1) % tabs.length; break;
      case 'ArrowRight': next = (index + 1) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    setSelected(next);
    document.getElementById(tabId(next))?.focus({ preventScroll: true });
  }

  return (
    <section className="infra-section infra-capabilities py-section">
      <div className={container}>
        <SectionHeading
          badge="Capabilities & Stack"
          title={service.stackTitle || service.title}
          description={service.stackSummary}
          animateWords
          animateWordsOnce={false}
        />
        <div className="infra-tablist" role="tablist" aria-label="Infrastructure Management capabilities">
          {tabs.map((tab, index) => {
            const Icon = tabIcons[index];
            return (
              <button
                key={tab.label}
                id={tabId(index)}
                type="button"
                role="tab"
                aria-controls={panelId}
                aria-selected={selected === index}
                tabIndex={selected === index ? 0 : -1}
                className="infra-tab text-xs sm:text-sm font-semibold"
                onClick={() => setSelected(index)}
                onKeyDown={event => handleKey(event, index)}
              >
                {selected === index && (
                  <motion.span
                    className="infra-tab-selection"
                    aria-hidden="true"
                    layoutId={reduced ? undefined : `${id}-selection`}
                    transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                {Icon && <Icon size={16} aria-hidden="true" />}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div id={panelId} className="infra-tabpanel" role="tabpanel" aria-labelledby={tabId(selected)} tabIndex={0}>
          <AnimatePresence mode="wait" initial={false}>
            <InfrastructureCapabilityCards key={tabs[selected].label} tab={tabs[selected]} index={selected} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function InfrastructureManagementSections({ service }: { service: ServiceItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow
        id="capabilities"
        title={service.offeringsTitle || 'Additional Service Offerings'}
        description={service.offeringsSubtitle || 'Our Infrastructure Management Services are meticulously designed to align with your specific business requirements.'}
        services={service.capabilities}
        illustrationCollection="infrastructure-management"
        palette="infrastructure-management"
      />
      <InfrastructureLifecycle service={service} />
      {!!service.stackTabs?.length && <InfrastructureCapabilities service={service} tabs={service.stackTabs} />}
    </>
  );
}
