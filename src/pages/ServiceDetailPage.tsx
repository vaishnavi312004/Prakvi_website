import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnterpriseArchitectureHero } from '../components/common/EnterpriseArchitectureHero';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { ArchitectureCarousel } from '../components/common/ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { MobilityPracticeHero } from '../components/common/MobilityPracticeHero';
import { MobilityPracticeSections } from '../components/common/MobilityPracticeSections';
import { SupplyChainHero } from '../components/common/SupplyChainHero';
import { SupplyChainSections } from '../components/common/SupplyChainSections';
import { SystemIntegrationSections } from '../components/common/SystemIntegrationSections';
import { SystemIntegrationHero } from '../components/common/SystemIntegrationHero';
import { ProjectManagementHero } from '../components/common/ProjectManagementHero';
import { ProjectManagementSections } from '../components/common/ProjectManagementSections';
import { ScrollRevealText } from '../components/common/ScrollRevealText';
import { ServiceHeroMedia } from '../components/common/ServiceHeroMedia';
import { SectionHeading } from '../components/common/SectionHeading';
import { BusinessAnalyticsHelix } from '../components/common/BusinessAnalyticsHelix';
import { CTASection } from '../components/common/CTASection';
import { DigitalMarketingSections } from '../components/common/DigitalMarketingSections';
import { MobileAppDevelopmentSections, mobileProcessId } from '../components/common/MobileAppDevelopmentSections';
import { PageTransition } from '../components/layout/PageTransition';
import { scrollToSection } from '../components/layout/SmoothScroll';
import { servicesData } from '../data/servicesData';
import { StaffingPage } from './StaffingPage';
import { WorkforceSolutionsPage } from './WorkforceSolutionsPage';
import { BusinessIntelligencePage } from './BusinessIntelligencePage';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Laptop,
  Layers,
  Lock,
  Users,
} from 'lucide-react';
import './MobileAppDevelopmentHero.css';
import './DigitalMarketingHero.css';
import './ServicePageDesign.css';

const standardizedServiceSlugs = new Set([
  'enterprise-architecture',
  'project-management',
  'mobility-practice',
  'supply-chain-management',
  'system-integration',
  'digital-marketing',
  'mobile-app-development',
]);

const mobilityTabs = [
  { id: 'byod', label: 'BYOD Architecture', icon: Users },
  { id: 'cyod', label: 'CYOD Catalog', icon: Laptop },
  { id: 'security', label: 'Endpoint Security', icon: Lock },
  { id: 'tools', label: 'MDM / UEM Toolchain', icon: Layers },
] as const;
type MobilityTabId = (typeof mobilityTabs)[number]['id'];

function followSectionLink(event: React.MouseEvent<HTMLAnchorElement>) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = event.currentTarget.hash;
  const target = document.getElementById(hash.slice(1));
  if (!target) return;
  event.preventDefault();
  event.stopPropagation();
  window.history.replaceState(window.history.state, '', hash);
  scrollToSection(target);
}

export const ServiceDetailPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeStackTab, setActiveStackTab] = useState(0);
  const [mobilityTab, setMobilityTab] = useState<MobilityTabId>('byod');
  const digitalMarketingHero = slug === 'digital-marketing';
  const mobileAppHero = slug === 'mobile-app-development';
  const hasSectionLinks = digitalMarketingHero || mobileAppHero;
  const heroStyle = digitalMarketingHero ? 'digital-marketing-hero' : mobileAppHero ? 'mobile-app-hero' : null;
  const heroVideo = useRef<HTMLVideoElement>(null);
  const [activeAnalyticsStep, setActiveAnalyticsStep] = useState(6);

  useEffect(() => {
    const video = heroVideo.current;
    if (!heroStyle || !video) return;
    const play = () => {
      void video.play().catch((error: unknown) => {
        if (error instanceof Error && (error.name === 'AbortError' || error.name === 'NotAllowedError')) return;
        console.error('Service hero video playback failed.', error);
      });
    };

    if (reducedMotion) {
      video.pause();
      return;
    }

    if (!digitalMarketingHero) {
      play();
      return () => video.pause();
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.12) play();
      else video.pause();
    }, { threshold: 0.12 });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [digitalMarketingHero, heroStyle, reducedMotion]);

  const slugAliases: Record<string, string> = {
    'staffing-workforce-solutions': 'staffing',
    'cloud-infrastructure-management': 'cloud-services',
    'ai-data-analytics-bi': 'business-intelligence',
    'enterprise-architecture-integration': 'system-integration',
    'digital-engineering-web-development': 'enterprise-solution',
    'it-consulting-strategic-advisory': 'it-consulting',
  };

  const resolvedSlug = slug ? slugAliases[slug] || slug : '';
  const service = servicesData.find(
    (s) => s.slug === resolvedSlug || s.id === resolvedSlug || s.slug === slug || s.id === slug
  );

  useEffect(() => {
    setActiveStackTab(0);
    setOpenFaqIndex(0);
    setMobilityTab('byod');
    const stepCount = service?.deliverySteps.length ?? 0;
    setActiveAnalyticsStep(
      service?.slug === 'business-analytics' && stepCount > 0
        ? Math.min(6, stepCount - 1)
        : 0
    );
  }, [slug, service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  if (service.slug === 'staffing') {
    return <StaffingPage service={service} />;
  }
  if (service.slug === 'workforce-solution') {
    return <WorkforceSolutionsPage service={service} />;
  }
  if (service.slug === 'business-intelligence') {
    return <BusinessIntelligencePage service={service} />;
  }
  const isMobilityPage = service.slug === 'mobility-practice';
  const isEnterpriseArchitecturePage = service.slug === 'enterprise-architecture';
  const hasDedicatedServiceSections = standardizedServiceSlugs.has(service.slug) && !isEnterpriseArchitecturePage;
  const offeringsTitle = service.offeringsTitle || `${service.title} Offerings`;
  const offeringsDescription = service.offeringsSubtitle ||
    'Comprehensive service modules engineered for reliability, compliance, and long-term performance.';
  const processTitle = service.processTitle || `Why Choose Prakvi for ${service.title}?`;
  const processDescription = service.processSubtitle || 'A proven methodology that ensures successful project delivery.';
  const isBusinessAnalyticsPage = service.slug === 'business-analytics';
  const servicePageClass = isEnterpriseArchitecturePage
    ? 'ea-service-page'
    : `service-detail-page service-topic-${service.slug}`;

  const toggleFaq = (index: number) => setOpenFaqIndex(current => current === index ? null : index);

  const stackTabs = service.stackTabs || [];
  const activeStackIndex = stackTabs.length
    ? Math.min(Math.max(activeStackTab, 0), stackTabs.length - 1)
    : 0;
  const currentStack = stackTabs[activeStackIndex];
  const analyticsStepIndex = service.deliverySteps.length
    ? Math.min(Math.max(activeAnalyticsStep, 0), service.deliverySteps.length - 1)
    : -1;
  const selectedAnalyticsStep = analyticsStepIndex >= 0
    ? service.deliverySteps[analyticsStepIndex]
    : undefined;
  const mobilityPanelId = `mobility-workbench-panel-${service.slug}`;
  const stackPanelId = `service-stack-panel-${service.slug}`;
  const mobilityTabId = (tab: MobilityTabId) => `mobility-tab-${service.slug}-${tab}`;
  const stackTabId = (index: number) => `service-stack-tab-${service.slug}-${index}`;

  const handleStackTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextTab = index;
    if (event.key === 'ArrowRight') nextTab = (index + 1) % stackTabs.length;
    else if (event.key === 'ArrowLeft') nextTab = (index - 1 + stackTabs.length) % stackTabs.length;
    else if (event.key === 'Home') nextTab = 0;
    else if (event.key === 'End') nextTab = stackTabs.length - 1;
    else return;

    event.preventDefault();
    setActiveStackTab(nextTab);
    document.getElementById(stackTabId(nextTab))?.focus();
  };

  const handleMobilityTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextTab = index;
    if (event.key === 'ArrowRight') nextTab = (index + 1) % mobilityTabs.length;
    else if (event.key === 'ArrowLeft') nextTab = (index - 1 + mobilityTabs.length) % mobilityTabs.length;
    else if (event.key === 'Home') nextTab = 0;
    else if (event.key === 'End') nextTab = mobilityTabs.length - 1;
    else return;

    event.preventDefault();
    const nextTabId = mobilityTabs[nextTab].id;
    setMobilityTab(nextTabId);
    document.getElementById(mobilityTabId(nextTabId))?.focus();
  };

  const serviceCta = (
    <CTASection
      title={`Let's Discuss Your ${service.title} Goals`}
      subtitle="Connect with Prakvi’s specialists to plan your implementation roadmap, staffing requirements, or managed support SLA."
      animateHeading={standardizedServiceSlugs.has(service.slug)}
    />
  );
  return (
    <PageTransition revealServiceText>
      <div className={`overflow-x-hidden pt-20 selection:bg-accent selection:text-white ${servicePageClass}`}>
        {/* 1. SERVICE HERO */}
        {isEnterpriseArchitecturePage ? (
          <EnterpriseArchitectureHero service={service} />
        ) : isMobilityPage ? (
          <MobilityPracticeHero service={service} />
        ) : service.slug === 'supply-chain-management' ? (
          <SupplyChainHero service={service} />
        ) : service.slug === 'project-management' ? (
          <ProjectManagementHero service={service} />
        ) : service.slug === 'system-integration' ? (
          <SystemIntegrationHero service={service} />
        ) : (
        <section
          className={`hero-clay-canvas py-section relative overflow-hidden${heroStyle ? ` ${heroStyle} isolate` : ''}${isBusinessAnalyticsPage ? ' business-analytics-hero' : ''}`}
        >
          <div
            className={`${
              isBusinessAnalyticsPage
                ? 'business-analytics-hero__content max-w-[1680px]'
                : 'max-w-7xl'
            } mx-auto px-4 sm:px-6 lg:px-8 relative z-10${heroStyle ? ` ${heroStyle}-content` : ''}`}
          >
            <Breadcrumbs
              items={[
                { label: 'Services', path: '/services' },
                { label: service.title },
              ]}
            />

            <div
              className={`${heroStyle ? `${heroStyle}-copy ` : ''}mt-8 grid grid-cols-1 ${
                isBusinessAnalyticsPage ? 'md:grid-cols-12' : 'lg:grid-cols-12'
              } gap-10 items-center`}
            >
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`space-y-5 ${
                  isBusinessAnalyticsPage
                    ? 'md:col-span-6 lg:col-span-5'
                    : 'lg:col-span-7'
                }`}
              >
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                  {service.badge || 'Prakvi Service'}
                </div>

                <h1 className="font-display text-3xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-foreground tracking-tight leading-[1.1] text-balance">
                  <ScrollRevealText text={service.title} highlight={service.title} />
                </h1>


                {!hasSectionLinks && <p className="text-lg sm:text-xl font-semibold text-accent">
                  {service.tagline}
                </p>}

                <p className="text-base text-muted leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  {hasSectionLinks ? (
                    <>
                      <a href="#capabilities" onClick={followSectionLink} className="btn-primary">Explore Services</a>
                      <a href={`#${mobileAppHero ? mobileProcessId : 'digital-marketing-process'}`} onClick={followSectionLink}
                        className="btn-secondary">Our Process</a>
                    </>
                  ) : (
                    <>
                      <Link to="/contact" className="btn-primary">
                        <span>Schedule Consultation</span>
                        <ArrowRight className="arrow-shift" aria-hidden="true" />
                      </Link>
                      <a href="#capabilities" className="btn-secondary">
                        <span>Explore Service Offerings</span>
                      </a>
                    </>
                  )}
                </div>
              </motion.div>

              {!isBusinessAnalyticsPage && (
                <motion.div
                  initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, delay: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:col-span-5"
                >
                  <div className="clay-card p-3">
                    <img
                      src={service.featuredImage}
                      alt={service.title}
                      className="service-hero-image w-full h-72 sm:h-80 object-cover rounded-2xl"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          {heroStyle && (
            <ServiceHeroMedia key={heroStyle} videoRef={heroVideo} autoPlay={!reducedMotion && !digitalMarketingHero} extendRightEdge
              poster={`${import.meta.env.BASE_URL}videos/${service.slug}-poster.webp`}
              preload={reducedMotion ? 'none' : 'metadata'}>
              {!reducedMotion && <source src={`${import.meta.env.BASE_URL}videos/${service.slug}.mp4`} type="video/mp4" />}
            </ServiceHeroMedia>
          )}
        </section>
        )}

        {/* 2. CHALLENGE & APPROACH */}
        {!isEnterpriseArchitecturePage && (
        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="clay-card p-8 sm:p-9">
                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Business Challenge</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Addressing Operational Bottlenecks
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {service.businessChallenge}
                </p>
              </div>

              <div className="clay-pastel p-8 sm:p-9">
                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>How Prakvi Helps</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Tailored, Scalable Execution
                </h2>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {service.howWeHelp}
                </p>
              </div>
            </div>
          </div>
        </section>
        )}

        {hasDedicatedServiceSections && (
          digitalMarketingHero ? (
            <DigitalMarketingSections service={service} />
          ) : mobileAppHero ? (
            <MobileAppDevelopmentSections service={service} />
          ) : isMobilityPage ? (
            <MobilityPracticeSections />
          ) : service.slug === 'supply-chain-management' ? (
            <SupplyChainSections />
          ) : service.slug === 'system-integration' ? (
            <SystemIntegrationSections />
          ) : (
            <ProjectManagementSections />
          )
        )}

        {/* 3. CORE SERVICE OFFERINGS */}
        {isEnterpriseArchitecturePage ? (
          <ArchitectureOfferingsWorkflow
            title={offeringsTitle}
            description={offeringsDescription}
            services={service.capabilities}
          />
        ) : !hasDedicatedServiceSections && (
        <section id="capabilities" className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Capabilities"
              title={offeringsTitle}
              description={offeringsDescription}
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.capabilities.map((cap, idx) => (
                <div key={idx} className="clay-card clay-card-interactive p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="clay-icon-box w-10 h-10 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground">
                      {cap.title}
                    </h3>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        )}

        {/* 4. BESPOKE MOBILITY PRACTICE WORKBENCH */}
        {isMobilityPage && (
          <section className="py-section bg-canvas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Interactive Mobility Workbench"
                title="BYOD & CYOD Governance Architecture"
                description="Explore how Prakvi balances employee device choice with enterprise endpoint security."
                align="center"
              />

              <div className="mt-10 flex justify-center">
                <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-full p-1.5 clay-soft" role="tablist" aria-label="Mobility practice workbench">
                  {mobilityTabs.map((tab, index) => {
                    const IconComp = tab.icon;
                    const active = mobilityTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={mobilityTabId(tab.id)}
                        aria-selected={active}
                        aria-controls={mobilityPanelId}
                        tabIndex={active ? 0 : -1}
                        onKeyDown={event => handleMobilityTabKeyDown(event, index)}
                        onClick={() => setMobilityTab(tab.id)}
                        className={`relative inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-colors active:scale-95 ${
                          active
                            ? 'text-white'
                            : 'text-muted hover:text-foreground'
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="mobility-tab-pill"
                            transition={
                              reducedMotion
                                ? { duration: 0 }
                                : { type: 'spring', stiffness: 440, damping: 32 }
                            }
                            className="absolute inset-0 rounded-full bg-accent shadow-md"
                            aria-hidden="true"
                          />
                        )}
                        <IconComp className="relative z-10 w-4 h-4" aria-hidden="true" />
                        <span className="relative z-10">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-8 clay-card p-8 sm:p-10 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={mobilityTab}
                    id={mobilityPanelId}
                    role="tabpanel"
                    aria-labelledby={mobilityTabId(mobilityTab)}
                    tabIndex={0}
                    initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                    transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {mobilityTab === 'byod' && (
                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          Bring Your Own Device (BYOD)
                        </h3>
                        <p className="text-sm sm:text-base text-muted leading-relaxed">
                          Device-agnostic access with user-centric policies and cloud sync management—separating corporate applications cleanly inside work containers (Android Work Profiles, Samsung Knox) without touching personal content.
                        </p>
                      </div>
                    )}
                    {mobilityTab === 'cyod' && (
                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          Choose Your Own Device (CYOD)
                        </h3>
                        <p className="text-sm sm:text-base text-muted leading-relaxed">
                          Pre-approved enterprise device catalogs with custom security configuration and centralized maintenance, giving teams choice while simplifying fleet governance.
                        </p>
                      </div>
                    )}
                    {mobilityTab === 'security' && (
                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          Security & Compliance Controls
                        </h3>
                        <p className="text-sm sm:text-base text-muted leading-relaxed">
                          Zero-trust secure access control, biometric & MFA enforcement, end-to-end data encryption, conditional access rules, and automated patch management.
                        </p>
                      </div>
                    )}
                    {mobilityTab === 'tools' && (
                      <div className="space-y-3">
                        <h3 className="font-display text-xl font-bold text-foreground">
                          MDM & Enterprise Mobility Tools
                        </h3>
                        <p className="text-sm sm:text-base text-muted leading-relaxed">
                          Seamless enrollment and continuous monitoring powered by Microsoft Intune, Mobile Device Management (MDM), Apple Business Manager, and Android Enterprise.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* 5. METHODOLOGY / DELIVERY PROCESS */}
        {isEnterpriseArchitecturePage ? (
          <EnterpriseArchitectureJourney title={processTitle} description={processDescription} steps={service.deliverySteps} />
        ) : !hasDedicatedServiceSections && (
        <section className={`py-section bg-canvas ${isBusinessAnalyticsPage ? 'business-analytics-process' : ''}`}>
          <div className={`${isBusinessAnalyticsPage ? 'max-w-[1060px]' : 'max-w-7xl'} mx-auto px-4 sm:px-6 lg:px-8`}>
            {isBusinessAnalyticsPage ? (
              <h2 className="business-analytics-process__heading">{processTitle}</h2>
            ) : (
              <SectionHeading
                badge="Our Process"
                title={processTitle}
                description={processDescription}
                align="center"
              />
            )}

            {isBusinessAnalyticsPage ? (
              <div className="business-analytics-process__layout">
                <div className="business-analytics-process__panel">
                  <div
                    key={analyticsStepIndex}
                    className="business-analytics-process__selected-step business-analytics-process__copy"
                    aria-live="polite"
                  >
                    {selectedAnalyticsStep && (
                      <>
                        <div className="business-analytics-process__heading-row">
                          <span className="business-analytics-process__number">
                            {selectedAnalyticsStep.step}
                          </span>
                          <h3 className="business-analytics-process__title">
                            {selectedAnalyticsStep.title}
                          </h3>
                        </div>
                        <p className="business-analytics-process__description">
                          {selectedAnalyticsStep.description}
                        </p>
                      </>
                    )}
                  </div>
                  <div className="business-analytics-process__progress">
                    {selectedAnalyticsStep && <span>Step {selectedAnalyticsStep.step}</span>}
                  </div>
                </div>

                <div className="business-analytics-process__cards-wrap">
                  <BusinessAnalyticsHelix reducedMotion={Boolean(reducedMotion)} />
                  <div className="business-analytics-process__cards" aria-label="Business analytics process steps">
                  {service.deliverySteps.map((step, idx) => {
                    const isActive = analyticsStepIndex === idx;
                    return (
                      <button
                        key={step.step}
                        type="button"
                        aria-pressed={isActive}
                        aria-label={`Step ${step.step}: ${step.title}${isActive ? ', selected' : ''}`}
                        onClick={() => setActiveAnalyticsStep(idx)}
                        className={`business-analytics-process__card${isActive ? ' is-active' : ''}`}
                      >
                        <span className="business-analytics-process__badge">
                          {step.step}
                        </span>
                        <span className="business-analytics-process__card-title">{step.title}</span>
                        <span className="business-analytics-process__dot" aria-hidden="true">✓</span>
                      </button>
                    );
                  })}
                  </div>
                </div>
              </div>
            ) : <div
              className={`mt-12 grid grid-cols-1 gap-5 ${
                service.deliverySteps.length <= 5
                  ? 'md:grid-cols-2 lg:grid-cols-5'
                  : 'md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {service.deliverySteps.map((step, idx) => (
                <div
                  key={idx}
                  className="clay-card p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="clay-icon-box w-10 h-10 font-mono font-extrabold text-sm flex items-center justify-center mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-display text-base font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-line text-[11px] font-mono text-accent font-semibold">
                    Step {step.step}
                  </div>
                </div>
              ))}
            </div>}

          </div>
        </section>
        )}

        {/* 6. INTERACTIVE STACK & CAPABILITY MATRIX */}
        {isEnterpriseArchitecturePage ? (
          <ArchitectureCarousel title={service.stackTitle || service.title} description={service.stackSummary} categories={stackTabs} />
        ) : !hasDedicatedServiceSections && stackTabs.length > 0 && (
          <section className="py-section bg-canvas">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Capabilities & Stack"
                title={service.stackTitle || service.title}
                description={service.stackSummary}
                align="center"
              />

              <div className="mt-10 clay-card p-6 sm:p-10">
                <div className="flex justify-center pb-6 border-b border-line">
                  <div
                    className="inline-flex flex-wrap justify-center gap-1.5 rounded-full bg-surface/80 p-1.5 border border-line"
                    role="tablist"
                    aria-label={`${service.stackTitle || service.title} stack`}
                  >
                    {stackTabs.map((tab, idx) => {
                      const active = activeStackIndex === idx;
                      return (
                        <button
                          key={tab.label}
                          type="button"
                          id={stackTabId(idx)}
                          role="tab"
                          aria-selected={active}
                          aria-controls={stackPanelId}
                          tabIndex={active ? 0 : -1}
                          onKeyDown={event => handleStackTabKeyDown(event, idx)}
                          onClick={() => setActiveStackTab(idx)}
                          className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors active:scale-95 ${
                            active
                              ? 'text-white'
                              : 'text-muted hover:text-foreground'
                          }`}
                        >
                          {active && (
                            <motion.span
                              layoutId="service-stack-pill"
                              transition={
                                reducedMotion
                                  ? { duration: 0 }
                                  : { type: 'spring', stiffness: 440, damping: 32 }
                              }
                              className="absolute inset-0 rounded-full bg-accent shadow-sm"
                              aria-hidden="true"
                            />
                          )}
                          <span className="relative z-10">{tab.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                  {currentStack && (
                    <motion.div
                      key={activeStackIndex}
                      id={stackPanelId}
                      role="tabpanel"
                      aria-labelledby={stackTabId(activeStackIndex)}
                      tabIndex={0}
                      initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                      transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
                      className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                      {currentStack.items.map((item) => (
                        <div
                          key={item}
                          className="clay-soft px-5 py-4 flex items-center gap-3 text-sm font-semibold text-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* 7. BUSINESS BENEFITS */}
        {!isEnterpriseArchitecturePage && (
        <>
        <section className="py-section bg-canvas">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Business Value"
              title="Key Operational Outcomes"
              description="How Prakvi translates technical execution into reliable performance and long-term business value."
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.businessBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className={`${idx === 1 ? 'clay-pastel' : 'clay-card'} p-8 text-center`}
                >
                  {b.metric && (
                    <div className="text-2xl sm:text-3xl font-extrabold font-display text-accent mb-3">
                      {b.metric}
                    </div>
                  )}
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FAQ */}
        <section className="py-section bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Frequently Asked Questions"
              title="Common Questions"
              align="center"
            />

            <div className="mt-10 space-y-4">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div key={idx} className="clay-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold text-sm sm:text-base text-foreground hover:text-accent active:scale-[0.995] transition-all"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0 ml-4 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={reducedMotion ? undefined : { opacity: 0, height: 0 }}
                          transition={{
                            duration: reducedMotion ? 0 : 0.28,
                            ease: [0.32, 0.72, 0, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-3 text-sm text-muted leading-relaxed border-t border-line">
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        {serviceCta}
        </>
        )}
      </div>
    </PageTransition>
  );
};
