import { useId, useRef, useState, type KeyboardEvent } from 'react';
import {
  Activity, ArrowUpRight, ClipboardCheck, CloudUpload,
  Database, Gauge, Headset, Layers, Map, Network, Server, ShieldCheck, Workflow,
} from 'lucide-react';
import { AnimatePresence, motion, useIsPresent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import type { ServiceItem, ServiceStackTab } from '../../types';
import { SectionHeading } from './SectionHeading';
import { serviceCardEase } from './ServiceCardMotion';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import './CloudServicesSections.css';

const milestoneIcons = [Map, ClipboardCheck, null, CloudUpload, Workflow, ArrowUpRight, Activity, ShieldCheck, Headset];
const capabilityIcons = [
  [Map, Layers, ShieldCheck],
  [Database, CloudUpload, Network],
  [Headset, Gauge, ShieldCheck],
];
const platformLogos: Record<string, string> = {
  AWS: 'aws',
  'Google Cloud': 'google-cloud',
  Azure: 'azure',
  Docker: 'docker',
  Kubernetes: 'kubernetes',
};
const revealViewport = { once: true, amount: 0.22 } as const;
const sectionContainer = 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8';

function CloudJourney({ service }: { service: ServiceItem }) {
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ['start 80%', 'end 65%'],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 260, damping: 30, restDelta: 0.001 });

  return (
    <section id="cloud-services-process" tabIndex={-1} className="cloud-section cloud-journey py-section">
      <div className={sectionContainer}>
        <SectionHeading
          badge="Our Process"
          title={service.processTitle || service.title}
          description={service.processSubtitle}
          animateWords
          animateWordsOnce={false}
          align="center"
        />
        <div ref={track} className="cloud-timeline">
          <div className="cloud-timeline-rail" aria-hidden="true">
            <motion.span style={{ scaleY: reduced ? 1 : scaleY, transformOrigin: 'top center' }} />
          </div>
          <ol className="cloud-milestones">
            {service.deliverySteps.map((step, index) => {
              const Icon = milestoneIcons[index];
              return (
                <motion.li
                  key={step.step}
                  className="cloud-milestone"
                  data-alignment={index % 2 === 0 ? 'left' : 'right'}
                  initial={reduced ? false : 'pending'}
                  whileInView="reached"
                  viewport={revealViewport}
                >
                  <motion.span
                    className="cloud-milestone-number font-mono text-sm font-extrabold"
                    variants={{
                      pending: { opacity: 0.35, scale: 0.88 },
                      reached: {
                        opacity: 1,
                        scale: 1,
                        boxShadow: '0 0 16px rgba(133, 126, 189, 0.45)',
                      },
                    }}
                    transition={{ duration: reduced ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {step.step}
                  </motion.span>
                  <motion.article
                    className="cloud-milestone-card"
                    variants={{
                      pending: { opacity: 0, x: index % 2 === 0 ? -28 : 28 },
                      reached: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: reduced ? 0 : 0.55, ease: serviceCardEase }}
                  >
                    {Icon && <span className="cloud-milestone-icon"><Icon size={20} aria-hidden="true" /></span>}
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
                      <p className="text-xs sm:text-sm text-muted leading-relaxed">{step.description}</p>
                    </div>
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

function CloudCapabilityCards({ tab, index }: { tab: ServiceStackTab; index: number }) {
  const reduced = useReducedMotion();
  const present = useIsPresent();
  const tools = tab.label === 'Cloud Tools';

  return (
    <motion.ul
      className="cloud-capability-grid"
      data-tone={index}
      data-tools={tools}
      aria-hidden={!present}
      initial={reduced ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: reduced ? 0 : 0.28, ease: serviceCardEase }}
    >
      {tab.items.map((item, position) => {
        const Icon = capabilityIcons[index]?.[position] ?? Server;
        const logo = tools ? platformLogos[item] : undefined;
        return (
          <motion.li
            key={item}
            className="cloud-capability-slot"
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.32,
              delay: reduced ? 0 : position * 0.04,
              ease: serviceCardEase,
            }}
          >
            <div className="cloud-capability-card">
              <span className="cloud-capability-mark" aria-hidden="true">
                {logo ? (
                  <img
                    src={`${import.meta.env.BASE_URL}images/cloud-platforms/${logo}.svg`}
                    alt=""
                    width="42"
                    height="42"
                  />
                ) : (
                  <Icon size={25} />
                )}
              </span>
              <span className="text-sm font-semibold text-foreground">{item}</span>
            </div>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

function CloudCapabilities({ service, tabs }: { service: ServiceItem; tabs: ServiceStackTab[] }) {
  const reduced = useReducedMotion();
  const [selected, setSelected] = useState(0);
  const id = useId();
  const panelId = `${id}-panel`;
  const tabId = (index: number) => `${id}-tab-${index}`;

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
    document.getElementById(tabId(next))?.focus();
  }

  return (
    <section className="cloud-section cloud-capabilities py-section">
      <div className={sectionContainer}>
        <SectionHeading
          badge="Capabilities & Stack"
          title={service.stackTitle || service.title}
          description={service.stackSummary}
          animateWords
          animateWordsOnce={false}
          align="center"
        />
        <div className="cloud-tablist" role="tablist" aria-label="Cloud Services capabilities">
          {tabs.map((tab, index) => (
            <button
              key={tab.label}
              id={tabId(index)}
              type="button"
              role="tab"
              aria-controls={panelId}
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={event => handleKey(event, index)}
              className="cloud-tab text-xs sm:text-sm font-semibold"
            >
              {selected === index && (
                <motion.span
                  className="cloud-tab-selection"
                  aria-hidden="true"
                  layoutId={reduced ? undefined : `${id}-selection`}
                  transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 32 }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
        <div id={panelId} className="cloud-tabpanel" role="tabpanel" aria-labelledby={tabId(selected)} tabIndex={0}>
          <AnimatePresence mode="wait" initial={false}>
            <CloudCapabilityCards key={tabs[selected].label} tab={tabs[selected]} index={selected} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export function CloudServicesSections({ service }: { service: ServiceItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow
        id="capabilities"
        title={service.offeringsTitle || 'Other Services Offered'}
        description={service.offeringsSubtitle || 'We provide end-to-end cloud services customized to meet your specific business requirements.'}
        services={service.capabilities}
        illustrationCollection="cloud-services"
        palette="cloud-services"
      />
      <CloudJourney service={service} />
      {!!service.stackTabs?.length && <CloudCapabilities service={service} tabs={service.stackTabs} />}
    </>
  );
}
