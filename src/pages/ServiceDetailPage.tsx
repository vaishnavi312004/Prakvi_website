import React, { useEffect, useState } from 'react';
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
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { servicesData } from '../data/servicesData';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Database,
  Laptop,
  Layers,
  Lock,
  Server,
  Target,
  Users,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeStackTab, setActiveStackTab] = useState(0);
  const [mobilityTab, setMobilityTab] = useState<'byod' | 'cyod' | 'security' | 'tools'>('byod');

  useEffect(() => {
    setActiveStackTab(0);
    setOpenFaqIndex(0);
  }, [slug]);

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

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const isStaffingPage = service.slug === 'staffing';
  const isMobilityPage = service.slug === 'mobility-practice';
  const isEnterpriseArchitecturePage = service.slug === 'enterprise-architecture';
  const offeringsTitle = service.offeringsTitle || `${service.title} Offerings`;
  const offeringsDescription = service.offeringsSubtitle ||
    'Comprehensive service modules engineered for reliability, compliance, and long-term performance.';
  const processTitle = service.processTitle || `Why Choose Prakvi for ${service.title}?`;
  const processDescription = service.processSubtitle || 'A proven methodology that ensures successful project delivery.';

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const stackTabs = service.stackTabs || [];
  const currentStack = stackTabs[activeStackTab] || stackTabs[0];
  const ArchitectureStackIcon = [Target, Layers, Database, Server][activeStackTab] || Layers;

  return (
    <PageTransition>
      <div className={`overflow-x-hidden pt-20 selection:bg-accent selection:text-white${isEnterpriseArchitecturePage ? ' ea-service-page' : ''}`}>
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
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Services', path: '/services' },
                { label: service.title },
              ]}
            />

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                  {service.badge || 'Prakvi Service'}
                </div>

                <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                  {service.title}
                </h1>

                <p className="text-lg sm:text-xl font-semibold text-accent">
                  {service.tagline}
                </p>

                <p className="text-base text-muted leading-relaxed">
                  {service.fullDesc}
                </p>

                <div className="pt-2 flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary">
                    <span>Schedule Consultation</span>
                    <ArrowRight className="arrow-shift" aria-hidden="true" />
                  </Link>
                  <a href="#capabilities" className="btn-secondary">
                    <span>Explore Service Offerings</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="clay-card p-3">
                  <img
                    src={service.featuredImage}
                    alt={service.title}
                    className="w-full h-72 sm:h-80 object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        )}

        {/* 2. CHALLENGE & APPROACH */}
        {isMobilityPage ? <MobilityPracticeSections /> : service.slug === 'supply-chain-management' ? <SupplyChainSections /> : service.slug === 'system-integration' ? <SystemIntegrationSections /> : service.slug === 'project-management' ? <ProjectManagementSections /> : (
        <>
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

        {/* 3. CORE SERVICE OFFERINGS */}
        {isEnterpriseArchitecturePage ? (
          <ArchitectureOfferingsWorkflow
            title={offeringsTitle}
            description={offeringsDescription}
            services={service.capabilities}
          />
        ) : (
        <section id="capabilities" className="py-section bg-section-alt">
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
                <div className="inline-flex flex-wrap justify-center gap-1.5 rounded-full p-1.5 clay-soft">
                  {[
                    { id: 'byod', label: 'BYOD Architecture', icon: Users },
                    { id: 'cyod', label: 'CYOD Catalog', icon: Laptop },
                    { id: 'security', label: 'Endpoint Security', icon: Lock },
                    { id: 'tools', label: 'MDM / UEM Toolchain', icon: Layers },
                  ].map((tab) => {
                    const IconComp = tab.icon;
                    const active = mobilityTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMobilityTab(tab.id as 'byod' | 'cyod' | 'security' | 'tools')}
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
        ) : (
        <section className={`py-section ${isMobilityPage ? 'bg-surface/75' : 'bg-canvas'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Process"
              title={processTitle}
              description={processDescription}
              align="center"
            />

            <div
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
            </div>

            {isStaffingPage && (
              <div className="mt-14 pt-10 border-t border-line">
                <h3 className="font-display text-xl font-bold text-foreground text-center mb-6">
                  Sourcing Verticals & Engagement Scope
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                  {[
                    'Executive Search & Leadership',
                    'IT & Software Contracting',
                    'Healthcare & Pharma Staffing',
                    'Full-Time & Team Augmentation',
                    'Cybersecurity & Data Science',
                    'BFSI & Manufacturing',
                    'Project-Based Roles',
                    'R&D and Engineering Labs',
                  ].map((item) => (
                    <div
                      key={item}
                      className="clay-soft p-4 flex items-center gap-2.5 text-foreground font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        )}

        {/* 6. INTERACTIVE STACK & CAPABILITY MATRIX */}
        {isEnterpriseArchitecturePage ? (
          <ArchitectureCarousel title={service.stackTitle || service.title} description={service.stackSummary} categories={stackTabs} />
        ) : stackTabs.length > 0 && (
          <section className="py-section bg-surface/65">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge={isEnterpriseArchitecturePage ? undefined : 'Capabilities & Stack'}
                title={service.stackTitle || service.title}
                description={service.stackSummary}
                align="center"
              />

              <div className="mt-10 clay-card p-6 sm:p-10">
                <div className={`flex pb-6 border-b border-line ${isEnterpriseArchitecturePage ? 'overflow-x-auto sm:justify-center' : 'justify-center'}`}>
                  <div className={`inline-flex justify-center gap-1.5 rounded-full bg-surface/80 p-1.5 border border-line ${isEnterpriseArchitecturePage ? 'shrink-0' : 'flex-wrap'}`} role={isEnterpriseArchitecturePage ? 'tablist' : undefined} aria-label={isEnterpriseArchitecturePage ? 'Enterprise Architecture' : undefined}>
                    {stackTabs.map((tab, idx) => {
                      const active = activeStackTab === idx;
                      return (
                        <button
                          key={tab.label}
                          type="button"
                          role={isEnterpriseArchitecturePage ? 'tab' : undefined}
                          id={isEnterpriseArchitecturePage ? `enterprise-tab-${idx}` : undefined}
                          aria-selected={isEnterpriseArchitecturePage ? active : undefined}
                          aria-controls={isEnterpriseArchitecturePage ? 'enterprise-tab-panel' : undefined}
                          onKeyDown={isEnterpriseArchitecturePage ? (event) => {
                            let nextTab = idx;
                            if (event.key === 'ArrowRight') nextTab = (idx + 1) % stackTabs.length;
                            else if (event.key === 'ArrowLeft') nextTab = (idx - 1 + stackTabs.length) % stackTabs.length;
                            else if (event.key === 'Home') nextTab = 0;
                            else if (event.key === 'End') nextTab = stackTabs.length - 1;
                            else return;
                            event.preventDefault();
                            setActiveStackTab(nextTab);
                            document.getElementById(`enterprise-tab-${nextTab}`)?.focus();
                          } : undefined}
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
                      key={activeStackTab}
                      id={isEnterpriseArchitecturePage ? 'enterprise-tab-panel' : undefined}
                      role={isEnterpriseArchitecturePage ? 'tabpanel' : undefined}
                      aria-labelledby={isEnterpriseArchitecturePage ? `enterprise-tab-${activeStackTab}` : undefined}
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
                          {isEnterpriseArchitecturePage ? (
                            <ArchitectureStackIcon className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                          )}
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
        <section className="py-section bg-section-alt">
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
        <CTASection
          title={`Let's Discuss Your ${service.title} Goals`}
          subtitle="Connect with Prakvi’s specialists to plan your implementation roadmap, staffing requirements, or managed support SLA."
        />
        </>
        )}
        </>
        )}
      </div>
    </PageTransition>
  );
};
