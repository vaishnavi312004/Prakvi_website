import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Cloud,
  Layers,
  Server,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { productsData } from '../../data/productsData';

interface SubSolutionItem {
  id: string;
  label: string;
  title: string;
  summary: string;
  highlight: string;
  path: string;
}

interface HeroDomainTab {
  id: string;
  label: string;
  caption: string;
  accentType: 'blue' | 'cyan' | 'lavender' | 'orange';
  icon: React.FC<{ className?: string }>;
  subsections: SubSolutionItem[];
}

const findService = (slug: string) =>
  servicesData.find((s) => s.slug === slug);

const findProduct = (slug: string) =>
  productsData.find((p) => p.slug === slug);

const HERO_DOMAIN_TABS: HeroDomainTab[] = [
  {
    id: 'it-solutions',
    label: 'IT Solutions',
    caption: 'Cloud, Infra & Integration',
    accentType: 'blue',
    icon: Server,
    subsections: [
      {
        id: 'cloud-services',
        label: 'Cloud Services',
        title: findService('cloud-services')?.title || 'Cloud Services',
        summary:
          findService('cloud-services')?.shortDesc ||
          'Scalable cloud migration, hybrid architecture, and security governance.',
        highlight: 'Multi-Cloud & Hybrid Ready',
        path: '/services/cloud-services',
      },
      {
        id: 'infrastructure-management',
        label: 'Infrastructure',
        title:
          findService('infrastructure-management')?.title ||
          'Infrastructure Management',
        summary:
          findService('infrastructure-management')?.shortDesc ||
          'Proactive 24/7 monitoring, patch orchestration, and high-availability IT systems.',
        highlight: '99.9% Uptime Reliability',
        path: '/services/infrastructure-management',
      },
      {
        id: 'system-integration',
        label: 'System Integration',
        title: findService('system-integration')?.title || 'System Integration',
        summary:
          findService('system-integration')?.shortDesc ||
          'Unified enterprise software ecosystems and custom API integration pipelines.',
        highlight: 'Unified ERP & APIs',
        path: '/services/system-integration',
      },
      {
        id: 'enterprise-architecture',
        label: 'Architecture',
        title:
          findService('enterprise-architecture')?.title ||
          'Enterprise Architecture',
        summary:
          findService('enterprise-architecture')?.shortDesc ||
          'Strategic technology roadmaps and scalable architecture modernization.',
        highlight: 'TOGAF-Aligned Blueprints',
        path: '/services/enterprise-architecture',
      },
    ],
  },
  {
    id: 'workforce-consulting',
    label: 'Workforce & Advisory',
    caption: 'Staffing, Mobility & PMO',
    accentType: 'cyan',
    icon: Users,
    subsections: [
      {
        id: 'staffing',
        label: 'Staffing Services',
        title: findService('staffing')?.title || 'Staffing',
        summary:
          findService('staffing')?.shortDesc ||
          'Pre-vetted IT, engineering, and healthcare professionals for permanent and contract roles.',
        highlight: 'Day-One Ready Talent',
        path: '/services/staffing',
      },
      {
        id: 'workforce-solution',
        label: 'Workforce Solutions',
        title: findService('workforce-solution')?.title || 'Workforce Solution',
        summary:
          findService('workforce-solution')?.shortDesc ||
          'End-to-end workforce scaling, onboarding workflows, and compliance delivery.',
        highlight: '7-Stage Delivery Model',
        path: '/services/workforce-solution',
      },
      {
        id: 'mobility-practice',
        label: 'Mobility (BYOD/CYOD)',
        title:
          findService('mobility-practice')?.title ||
          'Mobility Practice (BYOD & CYOD)',
        summary:
          findService('mobility-practice')?.shortDesc ||
          'Custom BYOD & CYOD frameworks, MDM/EMM endpoint security, and enterprise mobile apps.',
        highlight: 'Zero-Trust Endpoints',
        path: '/services/mobility-practice',
      },
      {
        id: 'it-consulting',
        label: 'IT Consulting',
        title: findService('it-consulting')?.title || 'IT Consulting',
        summary:
          findService('it-consulting')?.shortDesc ||
          'Advisory on digital transformation, modernization, and technology governance.',
        highlight: 'Delhi & Nashik Delivery',
        path: '/services/it-consulting',
      },
    ],
  },
  {
    id: 'data-digital',
    label: 'Data & Digital',
    caption: 'BI, Analytics & Growth',
    accentType: 'lavender',
    icon: BarChart3,
    subsections: [
      {
        id: 'business-intelligence',
        label: 'Business Intelligence',
        title:
          findService('business-intelligence')?.title || 'Business Intelligence',
        summary:
          findService('business-intelligence')?.shortDesc ||
          'Actionable executive intelligence via modern data warehouses and dashboards.',
        highlight: 'Real-Time KPI Clarity',
        path: '/services/business-intelligence',
      },
      {
        id: 'business-analytics',
        label: 'Business Analytics',
        title: findService('business-analytics')?.title || 'Business Analytics',
        summary:
          findService('business-analytics')?.shortDesc ||
          'Predictive modeling, operational telemetry, and decision support analytics.',
        highlight: 'Forecasting & Insights',
        path: '/services/business-analytics',
      },
      {
        id: 'digital-marketing',
        label: 'Digital Marketing',
        title: findService('digital-marketing')?.title || 'Digital Marketing',
        summary:
          findService('digital-marketing')?.shortDesc ||
          'SEO, SEM, B2B lead generation, and measurable omni-channel growth.',
        highlight: 'Growth & Brand Reach',
        path: '/services/digital-marketing',
      },
      {
        id: 'mobile-app-development',
        label: 'Web & Mobile Apps',
        title:
          findService('mobile-app-development')?.title ||
          'Mobile App Development',
        summary:
          findService('mobile-app-development')?.shortDesc ||
          'Native iOS, Android, and modern web applications engineered for scale.',
        highlight: 'Cross-Platform Quality',
        path: '/services/mobile-app-development',
      },
    ],
  },
  {
    id: 'enterprise-platforms',
    label: 'Platforms',
    caption: 'Analytics, VMS & CRM',
    accentType: 'orange',
    icon: Layers,
    subsections: [
      {
        id: 'data-analytics',
        label: 'Data Analytics Suite',
        title: findProduct('data-analytics')?.name || 'Data Analytics',
        summary:
          findProduct('data-analytics')?.shortDesc ||
          'Enterprise data analytics suite turning raw operational records into predictive insights.',
        highlight: 'BI & Predictive Engine',
        path: '/products/data-analytics',
      },
      {
        id: 'vendor-management',
        label: 'Vendor Management',
        title: findProduct('vendor-management')?.name || 'Vendor Management',
        summary:
          findProduct('vendor-management')?.shortDesc ||
          'Centralize vendor onboarding, procurement approvals, SLAs, and contract lifecycles.',
        highlight: 'Supplier Governance',
        path: '/products/vendor-management',
      },
      {
        id: 'relationship-management',
        label: 'Relationship (CRM)',
        title:
          findProduct('relationship-management')?.name ||
          'Relationship Management',
        summary:
          findProduct('relationship-management')?.shortDesc ||
          'Unified 360-degree customer CRM, pipeline automation, and service workflows.',
        highlight: '360° Customer Hub',
        path: '/products/relationship-management',
      },
      {
        id: 'enterprise-solution',
        label: 'Enterprise Portals',
        title:
          findService('enterprise-solution')?.title || 'Enterprise Solution',
        summary:
          findService('enterprise-solution')?.shortDesc ||
          'Large-scale integrated enterprise systems built for complex organizational workflows.',
        highlight: 'Custom Core Systems',
        path: '/services/enterprise-solution',
      },
    ],
  },
];

export const HeroInteractiveTabs: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [hoveredTabId, setHoveredTabId] = useState<string | null>(null);
  const [pinnedTabId, setPinnedTabId] = useState<string | null>(null);
  const [activeSubId, setActiveSubId] = useState<string>('');
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const sync = () => setCanHover(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const activeTabId = hoveredTabId || pinnedTabId;
  const activeTab = HERO_DOMAIN_TABS.find((t) => t.id === activeTabId) || null;
  const activeSub =
    activeTab?.subsections.find((s) => s.id === activeSubId) ||
    activeTab?.subsections[0] ||
    null;

  const ensureValidSubForTab = (tab: HeroDomainTab) => {
    setActiveSubId((prev) =>
      tab.subsections.some((s) => s.id === prev) ? prev : tab.subsections[0].id
    );
  };

  const handleTabHover = (tab: HeroDomainTab) => {
    if (!canHover) return;
    setHoveredTabId(tab.id);
    ensureValidSubForTab(tab);
  };

  const handleTabClick = (tab: HeroDomainTab) => {
    if (pinnedTabId === tab.id) {
      setPinnedTabId(null);
      setHoveredTabId(null);
      return;
    }
    setPinnedTabId(tab.id);
    ensureValidSubForTab(tab);
  };

  const closeAllTabs = () => {
    setPinnedTabId(null);
    setHoveredTabId(null);
  };

  return (
    <div
      className="space-y-4"
      onMouseLeave={() => {
        if (canHover) {
          setHoveredTabId(null);
        }
      }}
    >
      {/* Compact Sculpted 4-Tab Interactive Selector (Only visible tabs initially!) */}
      <div
        role="tablist"
        aria-label="Explore Prakvi solution capabilities"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-4"
      >
        {HERO_DOMAIN_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabId === tab.id;
          const isOrange = tab.accentType === 'orange';

          return (
            <motion.button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onMouseEnter={() => handleTabHover(tab)}
              onClick={() => handleTabClick(tab)}
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 450, damping: 28 }}
              className={`group relative flex flex-col items-start gap-2 rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                isActive
                  ? isOrange
                    ? 'clay-pastel-orange -translate-y-0.5 border-orange/50 shadow-md ring-2 ring-orange/15'
                    : 'clay-pastel -translate-y-0.5 border-accent/50 shadow-md ring-2 ring-accent/15'
                  : 'clay-soft hover:-translate-y-0.5 hover:border-accent/35'
              }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`${
                    isOrange ? 'clay-icon-orange' : 'clay-icon-box'
                  } flex h-8 w-8 items-center justify-center rounded-xl transition-transform group-hover:scale-105`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <ChevronRight
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    isActive
                      ? 'rotate-90 text-accent-text'
                      : 'text-subtle group-hover:translate-x-0.5 group-hover:text-accent-text'
                  }`}
                  aria-hidden="true"
                />
              </div>

              <div className="min-w-0 w-full">
                <div className="truncate font-display text-xs font-extrabold text-foreground sm:text-[13px]">
                  {tab.label}
                </div>
                <div className="truncate text-[10px] font-medium text-muted">
                  {tab.caption}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Smooth Animated Nested Reveal Panel (Hidden until a tab is interacted with) */}
      <AnimatePresence initial={false}>
        {activeTab && activeSub && (
          <motion.div
            key={activeTab.id}
            role="tabpanel"
            initial={reducedMotion ? false : { opacity: 0, y: -8, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 380, damping: 30 }
            }
            className="glass-panel relative overflow-hidden p-4 sm:p-5"
          >
            {/* Nested Subsection Selector Row + Close Control */}
            <div className="flex items-start justify-between gap-3 border-b border-line/80 pb-3">
              <div className="flex flex-wrap gap-1.5 rounded-full bg-surface/65 p-1">
                {activeTab.subsections.map((sub) => {
                  const subActive = activeSub.id === sub.id;
                  return (
                    <button
                      key={sub.id}
                      type="button"
                      onMouseEnter={() => {
                        if (canHover) setActiveSubId(sub.id);
                      }}
                      onClick={() => setActiveSubId(sub.id)}
                      className={`relative rounded-full px-3 py-1.5 text-xs font-semibold transition-colors active:scale-95 ${
                        subActive
                          ? 'text-white'
                          : 'text-muted hover:text-foreground'
                      }`}
                    >
                      {subActive && (
                        <motion.span
                          layoutId="hero-sub-pill"
                          transition={
                            reducedMotion
                              ? { duration: 0 }
                              : { type: 'spring', stiffness: 460, damping: 32 }
                          }
                          className="absolute inset-0 rounded-full bg-accent shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                      <span className="relative z-10">{sub.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={closeAllTabs}
                aria-label="Collapse capability preview"
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-muted hover:bg-soft-blue hover:text-foreground active:scale-90 transition-all"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            {/* Active Nested Subsection Content */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSub.id}
                initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="mt-3.5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-accent-text">
                    <Sparkles className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
                    <span>{activeSub.highlight}</span>
                  </div>
                  <h3 className="font-display text-base font-extrabold text-foreground sm:text-lg">
                    {activeSub.title}
                  </h3>
                  <p className="max-w-lg text-xs leading-relaxed text-muted sm:text-sm">
                    {activeSub.summary}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2.5">
                  <Link
                    to={activeSub.path}
                    className="btn-primary !min-h-10 !px-4 !py-2 !text-xs"
                  >
                    <span>Explore {activeSub.label}</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiet Compact Action Footer shown when drawer is collapsed */}
      {!activeTab && (
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link to="/contact" className="btn-primary">
            <span>Schedule Consultation</span>
            <ArrowRight className="arrow-shift" aria-hidden="true" />
          </Link>

          <Link to="/services" className="btn-secondary">
            <Briefcase aria-hidden="true" />
            <span>Explore All 17 Services</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 pl-1 text-xs font-medium text-muted">
            <Cloud className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>Select a capability tab above to preview</span>
          </span>
        </div>
      )}
    </div>
  );
};
