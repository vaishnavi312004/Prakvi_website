import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  Activity,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Layers,
  Lock,
  Plug,
  Server,
  Smartphone,
  Users,
} from 'lucide-react';
import { SectionHeading } from './SectionHeading';

interface OrbitTechItem {
  id: string;
  name: string;
  shortLabel: string;
  category: string;
  description: string;
  practiceLabel: string;
  practicePath: string;
  ring: 'inner' | 'outer';
  angleDeg: number;
  icon: React.FC<{ className?: string }>;
  accentTone?: 'blue' | 'orange';
}

const ORBIT_TECHNOLOGIES: OrbitTechItem[] = [
  // Inner Ring (4 Core Enterprise Platforms, 30s CW)
  {
    id: 'cloud-platforms',
    name: 'AWS, Azure & Hybrid Cloud',
    shortLabel: 'Cloud',
    category: 'Cloud Architecture',
    description:
      'Multi-cloud provisioning, automated failover, serverless workloads, and resilient cloud governance built for enterprise uptime.',
    practiceLabel: 'Cloud Services',
    practicePath: '/services/cloud-services',
    ring: 'inner',
    angleDeg: 0,
    icon: Cloud,
    accentTone: 'blue',
  },
  {
    id: 'vendor-vms',
    name: 'Vendor Management Platform',
    shortLabel: 'VMS Core',
    category: 'Proprietary Product',
    description:
      'Centralized supplier onboarding, automated procurement approvals, SLA monitoring, and contract lifecycle control.',
    practiceLabel: 'Vendor Management',
    practicePath: '/products/vendor-management',
    ring: 'inner',
    angleDeg: 90,
    icon: BrainCircuit,
    accentTone: 'orange',
  },
  {
    id: 'analytics-bi',
    name: 'Power BI & Predictive Analytics',
    shortLabel: 'BI & Data',
    category: 'Business Intelligence',
    description:
      'Real-time executive dashboards, dimensional data modeling, and automated KPI forecasting across finance and operations.',
    practiceLabel: 'Business Intelligence',
    practicePath: '/services/business-intelligence',
    ring: 'inner',
    angleDeg: 180,
    icon: BarChart3,
    accentTone: 'blue',
  },
  {
    id: 'zero-trust',
    name: 'Zero-Trust Cybersecurity',
    shortLabel: 'Security',
    category: 'Cyber Defense',
    description:
      'Role-based access controls, endpoint encryption, continuous threat monitoring, and enterprise compliance readiness.',
    practiceLabel: 'Infrastructure Security',
    practicePath: '/services/infrastructure-management',
    ring: 'inner',
    angleDeg: 270,
    icon: Lock,
    accentTone: 'blue',
  },

  // Outer Ring (8 Specialized Engineering & Delivery Capabilities, 44s CCW)
  {
    id: 'react-ts',
    name: 'React, TypeScript & Next Web',
    shortLabel: 'React / TS',
    category: 'Digital Engineering',
    description:
      'Accessible, component-driven web platforms engineered with clean state architecture, fast load budgets, and scalable APIs.',
    practiceLabel: 'Web Design & Development',
    practicePath: '/services/web-design',
    ring: 'outer',
    angleDeg: 22.5,
    icon: Code2,
    accentTone: 'blue',
  },
  {
    id: 'mobile-emm',
    name: 'iOS, Android & MDM Mobility',
    shortLabel: 'Mobility',
    category: 'BYOD & CYOD',
    description:
      'Native and cross-platform enterprise apps paired with containerized BYOD/CYOD endpoint policies via Intune and EMM.',
    practiceLabel: 'Mobility Practice',
    practicePath: '/services/mobility-practice',
    ring: 'outer',
    angleDeg: 67.5,
    icon: Smartphone,
    accentTone: 'blue',
  },
  {
    id: 'api-integration',
    name: 'REST, GraphQL & ERP Connectors',
    shortLabel: 'API Mesh',
    category: 'System Integration',
    description:
      'Seamless middleware pipelines synchronizing SAP, CRM, ERP, and banking systems with reliable webhook orchestration.',
    practiceLabel: 'System Integration',
    practicePath: '/services/system-integration',
    ring: 'outer',
    angleDeg: 112.5,
    icon: Plug,
    accentTone: 'orange',
  },
  {
    id: 'data-warehousing',
    name: 'SQL, Data Lakes & ETL Pipelines',
    shortLabel: 'Data Lake',
    category: 'Data Management',
    description:
      'High-integrity transactional schemas, cleansing workflows, and unified master data repositories for enterprise reporting.',
    practiceLabel: 'Data Analytics Platform',
    practicePath: '/products/data-analytics',
    ring: 'outer',
    angleDeg: 157.5,
    icon: Database,
    accentTone: 'blue',
  },
  {
    id: 'devops-infra',
    name: '24/7 NOC & Infrastructure Ops',
    shortLabel: 'NOC / Ops',
    category: 'Managed Infrastructure',
    description:
      'Proactive server telemetry, patch orchestration, virtualization health checks, and 99.9% SLA reliability coverage.',
    practiceLabel: 'Infrastructure Management',
    practicePath: '/services/infrastructure-management',
    ring: 'outer',
    angleDeg: 202.5,
    icon: Server,
    accentTone: 'blue',
  },
  {
    id: 'enterprise-arch',
    name: 'Enterprise ERP & TOGAF Systems',
    shortLabel: 'ERP Core',
    category: 'Enterprise Architecture',
    description:
      'End-to-end organizational workflows unifying finance, inventory, HR, and executive visibility in one modular system.',
    practiceLabel: 'Enterprise Solution',
    practicePath: '/services/enterprise-solution',
    ring: 'outer',
    angleDeg: 247.5,
    icon: Layers,
    accentTone: 'blue',
  },
  {
    id: 'workforce-tech',
    name: 'Global IT Talent & Staffing Engine',
    shortLabel: 'Staffing',
    category: 'Workforce Solutions',
    description:
      'Pre-vetted engineers, cloud specialists, and healthcare professionals matched through structured technical screening.',
    practiceLabel: 'Staffing Solutions',
    practicePath: '/services/staffing',
    ring: 'outer',
    angleDeg: 292.5,
    icon: Users,
    accentTone: 'orange',
  },
  {
    id: 'itsm-support',
    name: 'ITSM & Multi-Tier Service Desk',
    shortLabel: 'ITSM',
    category: 'Support & Optimization',
    description:
      'Structured incident triage, root-cause automation, and continuous SLA monitoring across distributed client teams.',
    practiceLabel: 'IT Consulting & Support',
    practicePath: '/services/it-consulting',
    ring: 'outer',
    angleDeg: 337.5,
    icon: Activity,
    accentTone: 'blue',
  },
];

export const TechOrbitEcosystem: React.FC<{ animateTitles?: boolean }> = ({ animateTitles = false }) => {
  const reducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(ORBIT_TECHNOLOGIES[0].id);
  const [innerPaused, setInnerPaused] = useState(false);
  const [outerPaused, setOuterPaused] = useState(false);

  const selectedTech =
    ORBIT_TECHNOLOGIES.find((t) => t.id === selectedId) || ORBIT_TECHNOLOGIES[0];
  const SelectedIcon = selectedTech.icon;

  const innerItems = ORBIT_TECHNOLOGIES.filter((t) => t.ring === 'inner');
  const outerItems = ORBIT_TECHNOLOGIES.filter((t) => t.ring === 'outer');

  return (
    <section
      aria-labelledby="tech-orbit-heading"
      className="py-section bg-canvas overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* LEFT: Circular Concentric Orbital Map (7 cols) */}
          <div className="lg:col-span-7">
            {/* Mobile (< md) clean 2-col interactive grid fallback */}
            <div className="grid grid-cols-2 gap-3 md:hidden">
              {ORBIT_TECHNOLOGIES.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`flex items-center gap-2.5 rounded-2xl p-3 text-left transition-all active:scale-95 ${
                      isSelected
                        ? 'clay-pastel border-accent/45 shadow-md'
                        : 'clay-soft hover:border-accent/30'
                    }`}
                  >
                    <span
                      className={`${
                        item.accentTone === 'orange' ? 'clay-icon-orange' : 'clay-icon-box'
                      } flex h-9 w-9 shrink-0 items-center justify-center rounded-xl`}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-foreground">
                        {item.shortLabel}
                      </span>
                      <span className="block truncate text-[10px] text-muted">
                        {item.category}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Tablet & Desktop (md+) Multi-Speed Rotational Orbital Ecosystem */}
            <div
              className="relative mx-auto hidden md:flex items-center justify-center h-[520px] w-[520px] lg:h-[560px] lg:w-[560px]"
              role="region"
              aria-label="Interactive rotating Prakvi technology and skills ecosystem"
            >
              {/* Soft Ambient Clay Backplate */}
              <div
                className="pointer-events-none absolute inset-6 rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, color-mix(in srgb, var(--theme-soft-blue) 58%, transparent) 0%, color-mix(in srgb, var(--theme-lavender) 38%, transparent) 52%, transparent 72%)',
                }}
                aria-hidden="true"
              />

              {/* Subtle Orbit Tracks */}
              <div
                className="pointer-events-none absolute h-[450px] w-[450px] lg:h-[490px] lg:w-[490px] rounded-full border border-dashed border-accent/25"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute h-[270px] w-[270px] lg:h-[296px] lg:w-[296px] rounded-full border border-accent/20 bg-card/25"
                aria-hidden="true"
              />

              {/* OUTER RING (44s Counter-Clockwise) */}
              <div
                className={`orbit-ring-ccw absolute inset-0 flex items-center justify-center ${
                  outerPaused ? 'orbit-paused' : ''
                }`}
                style={{ ['--orbit-duration' as string]: '46s' }}
              >
                {outerItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedId === item.id;
                  const rad = (item.angleDeg * Math.PI) / 180;
                  const radius = 234;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  return (
                    <div
                      key={item.id}
                      className="absolute"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      {/* Counter-rotation keeps label and icon strictly upright */}
                      <div
                        className="orbit-counter-cw"
                        style={{ ['--orbit-duration' as string]: '46s' }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => {
                            setOuterPaused(true);
                            setSelectedId(item.id);
                          }}
                          onMouseLeave={() => setOuterPaused(false)}
                          onFocus={() => {
                            setOuterPaused(true);
                            setSelectedId(item.id);
                          }}
                          onBlur={() => setOuterPaused(false)}
                          onClick={() => setSelectedId(item.id)}
                          aria-label={`${item.name} — ${item.category}`}
                          aria-pressed={isSelected}
                          className={`group flex flex-col items-center gap-1 rounded-2xl px-2.5 py-2 transition-all duration-200 active:scale-95 ${
                            isSelected
                              ? 'clay-card scale-110 border-accent/60 shadow-xl ring-2 ring-accent/20'
                              : 'clay-soft hover:scale-108 hover:border-accent/40'
                          }`}
                        >
                          <span
                            className={`${
                              item.accentTone === 'orange' ? 'clay-icon-orange' : 'clay-icon-box'
                            } flex h-9 w-9 items-center justify-center rounded-xl transition-transform group-hover:scale-105`}
                          >
                            <Icon className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <span className="text-[10px] font-bold text-foreground whitespace-nowrap">
                            {item.shortLabel}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* INNER RING (30s Clockwise) */}
              <div
                className={`orbit-ring-cw pointer-events-none absolute inset-0 flex items-center justify-center ${
                  innerPaused ? 'orbit-paused' : ''
                }`}
                style={{ ['--orbit-duration' as string]: '30s' }}
              >
                {innerItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = selectedId === item.id;
                  const rad = (item.angleDeg * Math.PI) / 180;
                  const radius = 140;
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;
                  return (
                    <div
                      key={item.id}
                      className="pointer-events-auto absolute"
                      style={{
                        transform: `translate(${x}px, ${y}px)`,
                      }}
                    >
                      <div
                        className="orbit-counter-ccw"
                        style={{ ['--orbit-duration' as string]: '30s' }}
                      >
                        <button
                          type="button"
                          onMouseEnter={() => {
                            setInnerPaused(true);
                            setSelectedId(item.id);
                          }}
                          onMouseLeave={() => setInnerPaused(false)}
                          onFocus={() => {
                            setInnerPaused(true);
                            setSelectedId(item.id);
                          }}
                          onBlur={() => setInnerPaused(false)}
                          onClick={() => setSelectedId(item.id)}
                          aria-label={`${item.name} — ${item.category}`}
                          aria-pressed={isSelected}
                          className={`group flex flex-col items-center gap-1 rounded-2xl px-2.5 py-2 transition-all duration-200 active:scale-95 ${
                            isSelected
                              ? 'clay-card scale-110 border-accent/60 shadow-xl ring-2 ring-accent/20'
                              : 'clay-soft hover:scale-108 hover:border-accent/40'
                          }`}
                        >
                          <span
                            className={`${
                              item.accentTone === 'orange' ? 'clay-icon-orange' : 'clay-icon-box'
                            } flex h-10 w-10 items-center justify-center rounded-xl`}
                          >
                            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                          </span>
                          <span className="text-[10px] font-bold text-foreground whitespace-nowrap">
                            {item.shortLabel}
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CENTRAL PRAKVI 'P' CLAY CORE HUB */}
              <div className="clay-card clay-float-slow relative z-10 flex h-32 w-32 flex-col items-center justify-center rounded-full border-2 border-accent/25 bg-card p-4 text-center shadow-xl">
                <svg
                  viewBox="0 0 64 64"
                  className="h-11 w-11"
                  aria-hidden="true"
                >
                  {/* Exact geometric 3-piece Prakvi 'P' symbol */}
                  <path
                    d="M12 10 H36 C49 10 55 18 52 30 C49 40 41 44 29 44 H25 L21 56 H13 L20 34 H31 C38 34 42 30 43 24 C44 19 39 17 33 17 H10 Z"
                    fill="var(--theme-accent)"
                  />
                  <path
                    d="M8 22 H21 L15 44 H9 L13 28 H6 Z"
                    fill="var(--theme-accent-2)"
                  />
                  <path
                    d="M25 22 H34 C38 22 39 25 38 28 C37 30 34 31 30 31 H23 Z"
                    fill="var(--theme-orange)"
                  />
                </svg>
                <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-accent-text">
                  Prakvi Core
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: Editorial Heading + Live Orbital Technology Inspector (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <SectionHeading
              animateWords={animateTitles}
              animate={!animateTitles}
              badge="Technology & Skills Ecosystem"
              title="Connected Platforms, Cloud & Engineering Mastery"
            />
            <p className="text-base leading-relaxed text-muted">
              Hover or select any capability around our orbital architecture to explore the cloud stacks, AI platforms, and engineering practices powering Prakvi client transformations.
            </p>

            {/* Interactive Clay Spotlight Panel */}
            <div className="clay-pastel p-6 sm:p-7 overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={selectedTech.id}
                  initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.985 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.99 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`${
                          selectedTech.accentTone === 'orange'
                            ? 'clay-icon-orange'
                            : 'clay-icon-box'
                        } flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl`}
                      >
                        <SelectedIcon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-text">
                          {selectedTech.category}
                        </div>
                        <h3
                          id="tech-orbit-heading"
                          className="font-display text-lg font-extrabold text-foreground leading-snug"
                        >
                          {selectedTech.name}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed text-muted">
                    {selectedTech.description}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-line/80">
                    <Link to={selectedTech.practicePath} className="btn-blue">
                      <span>Explore {selectedTech.practiceLabel}</span>
                      <ArrowRight className="arrow-shift" aria-hidden="true" />
                    </Link>

                  
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
