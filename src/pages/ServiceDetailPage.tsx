import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { servicesData } from '../data/servicesData';
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ChevronDown,
  Users,
  Laptop,
  Lock,
  Layers,
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Mobility Practice Interactive Tab State
  const [mobilityTab, setMobilityTab] = useState<'byod' | 'cyod' | 'security' | 'tools'>('byod');

  const slugAliases: Record<string, string> = {
    'staffing-workforce-solutions': 'staffing',
    'cloud-infrastructure-management': 'cloud-services',
    'ai-data-analytics-bi': 'business-intelligence',
    'enterprise-architecture-integration': 'system-integration',
    'digital-engineering-web-development': 'enterprise-solution',
    'it-consulting-strategic-advisory': 'it-consulting',
  };

  const resolvedSlug = slug ? (slugAliases[slug] || slug) : '';
  const service = servicesData.find((s) => s.slug === resolvedSlug || s.id === resolvedSlug || s.slug === slug || s.id === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const isStaffingPage = service.slug === 'staffing' || service.slug === 'staffing-workforce-solutions';
  const isMobilityPage = service.slug === 'mobility-practice';

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

        <section className="bg-gradient-to-b from-canvas via-surface to-canvas text-foreground py-section relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={service.featuredImage}
              alt={service.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-canvas/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-canvas via-transparent to-canvas/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs
              items={[
                { label: 'Services', path: '/services' },
                { label: service.title },
              ]}
              variant="light"
            />

            <div className="mt-8 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/[0.04] px-3.5 py-1.5">
                <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                  {service.badge || 'Enterprise Practice'}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                {service.title}
              </h1>

              <p className="mt-4 text-lg sm:text-xl font-medium text-accent">
                {service.tagline}
              </p>

              <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed text-balance font-light">
                {service.fullDesc}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="btn-primary"
                >
                  <span>Consult with practice lead</span>
                  <ArrowRight className="w-4 h-4 text-foreground" />
                </Link>
                <a
                  href="#capabilities"
                  className="btn-secondary"
                >
                  <span>Explore capabilities</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {/* The Challenge */}
              <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-rose-200 ">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <AlertCircle className="w-4 h-4" />
                  <span>The Enterprise Challenge</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Navigating Complexity & Risk
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {service.businessChallenge}
                </p>
              </div>

              {/* How Prakvi Helps */}
              <div className="p-8 sm:p-10 rounded-3xl glass-panel border border-accent/30 ">
                <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>The Prakvi Strategic Approach</span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
                  Engineered for Measurable Impact
                </h3>
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {service.howWeHelp}
                </p>
              </div>
            </div>
          </div>
        </section>


        {isStaffingPage && (
          <section className="py-section bg-surface text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Recruitment Governance"
                title="End-to-End Recruitment Process Timeline"
                description="Our proven 5-stage recruitment framework guarantees vetted talent velocity, strict credentialing compliance, and post-onboarding retention."
                theme="light"
                align="center"
              />

              <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-5">
                {service.deliverySteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-canvas border border-line shadow-sm hover:shadow-md relative flex flex-col justify-between transition-all group"
                  >
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-surface border border-accent/30 text-accent font-mono font-bold text-xs flex items-center justify-center mb-4">
                        {step.step}
                      </div>
                      <h4 className="font-display text-sm font-bold text-foreground mb-2">
                        {step.title}
                      </h4>
                      <p className="text-xs text-muted leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-line text-[10px] font-mono text-accent font-semibold">
                      Phase 0{idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Preserved Specialized Staffing Verticals Highlight */}
              <div className="mt-16 pt-12 border-t border-line">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <div className="text-xs font-mono font-bold uppercase text-accent tracking-wider mb-2">
                    Comprehensive Sourcing Verticals
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    Healthcare, Technology & Executive Search
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 text-xs">
                  {[
                    'Healthcare Staffing & Travel Nursing',
                    'Clinical Informatics & EHR Specialists',
                    'IT Consulting & Cloud Engineers',
                    'Full-Stack & DevOps Pods',
                    'Permanent & Direct Hire Placements',
                    'Contract & Contingent Staffing',
                    'Executive Search & CXO Hiring',
                    'Enterprise MSA Partnerships',
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface border border-line flex items-center gap-2.5 text-foreground font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}


        {isMobilityPage && (
          <section className="py-section bg-surface text-foreground">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Interactive Mobility Workbench"
                title="Enterprise Mobility Governance Framework"
                description="Explore how Prakvi balances employee choice with zero-trust defense-in-depth across endpoints."
                theme="light"
                align="center"
              />

              {/* Interactive Tabs */}
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                {[
                  { id: 'byod', label: 'BYOD Architecture', icon: Users },
                  { id: 'cyod', label: 'CYOD Catalog', icon: Laptop },
                  { id: 'security', label: 'Endpoint Security & ZTNA', icon: Lock },
                  { id: 'tools', label: 'MDM / UEM Toolchain', icon: Layers },
                ].map((tab) => {
                  const IconComp = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setMobilityTab(tab.id as any)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        mobilityTab === tab.id
                          ? 'bg-accent/10 text-accent ring-1 ring-accent/40 font-bold'
                          : 'bg-surface text-muted hover:text-foreground hover:bg-surface'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content Display */}
              <div className="mt-8 p-8 rounded-3xl bg-canvas border border-line">
                {mobilityTab === 'byod' && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold font-display text-foreground">
                      Bring Your Own Device (BYOD) Containerization
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Our BYOD architecture enables employees to access corporate intranets and applications using personal smartphones and laptops without sacrificing personal privacy or enterprise security. Work data resides inside encrypted hardware partitions.
                    </p>
                  </div>
                )}
                {mobilityTab === 'cyod' && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold font-display text-foreground">
                      Choose Your Own Device (CYOD) Corporate Catalog
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Standardize enterprise procurement while giving employees autonomy from an audited catalog of pre-configured, tamper-resistant devices with automated zero-touch enrollment.
                    </p>
                  </div>
                )}
                {mobilityTab === 'security' && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold font-display text-foreground">
                      Zero-Trust Network Access & Remote Wipe
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Continuous endpoint compliance checks, selective remote corporate data wipe upon termination, micro-VPN tunneling, and per-app VPN routing prevent data leakage.
                    </p>
                  </div>
                )}
                {mobilityTab === 'tools' && (
                  <div className="space-y-4">
                    <h4 className="text-xl font-bold font-display text-foreground">
                      Multi-Platform MDM/MAM Toolchain Support
                    </h4>
                    <p className="text-sm text-muted leading-relaxed">
                      Certified integration and policy management across Microsoft Intune, VMware Workspace ONE, Jamf Pro, and Google Workspace Endpoint Management.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}


        <section id="capabilities" className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Practice Matrix"
              title="Core Engineering & Delivery Capabilities"
              description="A granular breakdown of the technical deliverables and operational assets provided by this practice."
              theme="light"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel border border-line  hover:shadow-accent transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-surface border border-accent/30 flex items-center justify-center text-accent">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-display text-base font-bold text-foreground">
                      {cap.title}
                    </h4>
                  </div>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {cap.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-section bg-gradient-to-b from-canvas via-surface to-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Business Outcomes"
              title="Measurable Operational Advantage"
              description="How our implementation of this practice translates into reduced costs, reduced risk, and higher business speed."
              theme="dark"
              align="center"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
              {service.businessBenefits.map((b, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-canvas/90 border border-accent/25 text-center shadow-xl"
                >
                  {b.metric && (
                    <div className="text-3xl sm:text-4xl font-extrabold font-display text-accent mb-3">
                      {b.metric}
                    </div>
                  )}
                  <h4 className="font-display text-lg font-bold text-foreground mb-2">{b.title}</h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
                    {b.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>


        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Frequently Asked Questions"
              title="Everything You Need to Know Before Engaging"
              theme="light"
              align="center"
            />

            <div className="mt-12 space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel border border-line overflow-hidden "
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-sm sm:text-base text-foreground hover:text-accent transition-colors focus:outline-none"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-accent transition-transform duration-200 shrink-0 ml-4 ${
                        openFaqIndex === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openFaqIndex === idx && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-muted leading-relaxed border-t border-line">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 7. FINAL CTA */}
        <CTASection
          title={`Ready to Modernize with ${service.title}?`}
          subtitle="Speak with our dedicated practice leaders to discuss architecture blueprints, staffing requirements, or delivery SLAs."
        />
      </div>
    </PageTransition>
  );
};
