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
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden pt-20">
        {/* 1. SERVICE SPECIFIC HERO */}
        <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src={service.featuredImage}
              alt={service.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/90 to-[#02060D]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/80" />
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-4">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  {service.badge || 'Enterprise Practice'}
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                {service.title}
              </h1>

              <p className="mt-4 text-lg sm:text-xl font-medium text-[#00F0FF]">
                {service.tagline}
              </p>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed text-balance font-light">
                {service.fullDesc}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
                >
                  <span>Consult with practice lead</span>
                  <ArrowRight className="w-4 h-4 text-[#02060D]" />
                </Link>
                <a
                  href="#capabilities"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-[#00F0FF]/40 transition-colors"
                >
                  <span>Explore capabilities</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTINUOUS UNIFIED PRACTICE CANVAS IN DARK OBSIDIAN NAVY
           ========================================================================= */}
        <div className="relative bg-[#02060D]">
          {/* 2. THE BUSINESS CHALLENGE & HOW PRAKVI HELPS */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {/* The Challenge */}
                <div className="p-8 sm:p-10 rounded-3xl bg-[#040E1E]/90 border border-rose-500/20 shadow-xl">
                  <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                    <AlertCircle className="w-4 h-4" />
                    <span>The Enterprise Challenge</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                    Navigating Complexity & Risk
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {service.businessChallenge}
                  </p>
                </div>

                {/* How Prakvi Helps */}
                <div className="p-8 sm:p-10 rounded-3xl bg-[#040E1E]/90 border border-[#00F0FF]/30 shadow-xl shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  <div className="flex items-center gap-2 text-[#00F0FF] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>The Prakvi Strategic Approach</span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-3">
                    Engineered for Measurable Impact
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {service.howWeHelp}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* SPECIAL REQUIREMENT: STAFFING RECRUITMENT TIMELINE & PRESERVED SECTORS */}
          {isStaffingPage && (
            <section className="py-20 border-t border-white/[0.06] bg-[#040E1E]/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                  badge="Recruitment Governance"
                  title="End-to-End Recruitment Process Timeline"
                  description="Our proven 5-stage recruitment framework guarantees vetted talent velocity, strict credentialing compliance, and post-onboarding retention."
                  theme="dark"
                  align="center"
                />

                <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-5">
                  {service.deliverySteps.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 shadow-lg relative flex flex-col justify-between transition-all group"
                    >
                      <div>
                        <div className="w-9 h-9 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] font-mono font-bold text-xs flex items-center justify-center mb-4 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.3)]">
                          {step.step}
                        </div>
                        <h4 className="font-display text-sm font-bold text-white mb-2">
                          {step.title}
                        </h4>
                        <p className="text-xs text-slate-300 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                      <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono text-[#00F0FF]">
                        Phase 0{idx + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preserved Specialized Staffing Verticals Highlight */}
                <div className="mt-16 pt-12 border-t border-white/10">
                  <div className="text-center max-w-2xl mx-auto mb-8">
                    <div className="text-xs font-mono font-semibold uppercase text-[#00F0FF] tracking-wider mb-2">
                      Comprehensive Sourcing Verticals
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white">
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
                        className="p-4 rounded-xl bg-[#040E1E] border border-white/10 hover:border-[#00F0FF]/30 flex items-center gap-2.5 text-slate-200 font-medium transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* SPECIAL REQUIREMENT: MOBILITY PRACTICE INTERACTIVE TABS */}
          {isMobilityPage && (
            <section className="py-20 border-t border-white/[0.06] bg-[#040E1E]/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SectionHeading
                  badge="Interactive Mobility Workbench"
                  title="Enterprise Mobility Governance Framework"
                  description="Explore how Prakvi balances employee choice with zero-trust defense-in-depth across endpoints."
                  theme="dark"
                  align="center"
                />

                {/* Interactive Tabs */}
                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {[
                    { id: 'byod', label: 'BYOD Architecture', icon: Users },
                    { id: 'cyod', label: 'CYOD Catalog', icon: Laptop },
                    { id: 'security', label: 'Endpoint Security & ZTNA', icon: Lock },
                    { id: 'tools', label: 'Platform & MDM Tools', icon: Layers },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setMobilityTab(tab.id as any)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                          mobilityTab === tab.id
                            ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                            : 'bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content Display */}
                <div className="mt-8 p-8 sm:p-10 rounded-3xl bg-[#040E1E]/90 border border-[#00F0FF]/25 shadow-2xl max-w-4xl mx-auto backdrop-blur-xl">
                  {mobilityTab === 'byod' && (
                    <div className="space-y-4">
                      <h4 className="font-display text-xl font-bold text-white">
                        Bring Your Own Device (BYOD) Sandbox
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        Our BYOD architecture strictly partitions corporate data from personal memories. Using encrypted container sandboxes, enterprise email, files, and chat are ring-fenced without compromising employee privacy or accessing personal browsing data.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Selective Remote Wipe:</strong> Erase only corporate partitions if a personal device is reported lost.
                        </div>
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Clipboard DLP:</strong> Prevent copy-pasting of confidential customer records into personal messengers.
                        </div>
                      </div>
                    </div>
                  )}

                  {mobilityTab === 'cyod' && (
                    <div className="space-y-4">
                      <h4 className="font-display text-xl font-bold text-white">
                        Choose Your Own Device (CYOD) Corporate Catalog
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        Standardized corporate device catalogs featuring pre-negotiated volume discounts and automated zero-touch enrollment. Employees select from certified iOS, macOS, Android, and Windows hardware.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Zero-Touch Enrollment:</strong> Devices unpack and auto-configure corporate VPN and profiles upon first power-on.
                        </div>
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Hardware Lifecycle:</strong> Automated refresh cycles every 24–36 months with certified asset disposal.
                        </div>
                      </div>
                    </div>
                  )}

                  {mobilityTab === 'security' && (
                    <div className="space-y-4">
                      <h4 className="font-display text-xl font-bold text-white">
                        Zero-Trust Mobile Security & Endpoint Telemetry
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        Continuous risk-based conditional access. Access to production clouds and ERP systems is constantly evaluated based on device OS patch health, geographic anomaly detection, and biometric confirmation.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 text-xs">
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Jailbreak Detection:</strong> Immediate quarantine of rooted or compromised operating system kernels.
                        </div>
                        <div className="p-4 bg-white/[0.03] rounded-xl border border-white/10 text-slate-200">
                          <strong className="text-[#00F0FF]">Per-App VPN:</strong> Secure tunnels routed only for enterprise apps, leaving personal internet traffic direct.
                        </div>
                      </div>
                    </div>
                  )}

                  {mobilityTab === 'tools' && (
                    <div className="space-y-4">
                      <h4 className="font-display text-xl font-bold text-white">
                        Unified MDM & EMM Tool Ecosystem
                      </h4>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        Certified implementation and managed operations across industry-leading Unified Endpoint Management (UEM) suites.
                      </p>
                      <div className="flex flex-wrap gap-2.5 pt-2">
                        {['Microsoft Intune', 'VMware Workspace ONE', 'Jamf Pro (Apple)', 'Samsung Knox', 'Okta Verify', 'Cisco AnyConnect'].map((tool, i) => (
                          <span key={i} className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/15 font-mono text-xs font-semibold text-[#00F0FF]">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* 3. CORE CAPABILITIES */}
          <section id="capabilities" className="py-20 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Technical Scope"
                title="Practice Capabilities & Deliverables"
                description="Detailed breakdown of the architectural pillars and services executed within this discipline."
                theme="dark"
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {service.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="p-7 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 shadow-xl transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mb-4 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <h4 className="font-display text-base font-bold text-white mb-2">
                        {cap.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                        {cap.description}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono text-[#00F0FF] uppercase font-semibold">
                      Enterprise Capability
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. BUSINESS BENEFITS */}
          <section className="py-20 border-t border-white/[0.06] bg-[#07192F]/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Strategic Value"
                title="Quantifiable Business Outcomes"
                description="The measurable improvements in velocity, security, and return on investment our clients realize."
                theme="dark"
              />

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {service.businessBenefits.map((ben, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 transition-all"
                  >
                    {ben.metric && (
                      <div className="font-display text-2xl font-extrabold text-[#00F0FF] mb-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">
                        {ben.metric}
                      </div>
                    )}
                    <h4 className="font-display text-sm font-bold text-white mb-1.5">
                      {ben.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-light">
                      {ben.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. FAQS */}
          <section className="py-20 border-t border-white/[0.06]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Inquiries"
                title="Common Client Inquiries"
                description="Direct answers from our senior practice architects regarding engagements, SLAs, and technical parameters."
                theme="dark"
                align="center"
              />

              <div className="mt-12 space-y-4">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#040E1E]/90 border border-white/10 overflow-hidden shadow-lg transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display text-sm sm:text-base font-bold text-white hover:text-[#00F0FF] transition-colors focus:outline-none"
                      aria-expanded={openFaqIndex === idx}
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#00F0FF] transition-transform duration-200 shrink-0 ${
                          openFaqIndex === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 font-light">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <CTASection
          title={`Accelerate Your ${service.title} Initiative`}
          subtitle="Schedule a technical discovery session with our practice leads to evaluate requirements, review architectures, or inspect talent profiles."
          primaryButtonText="Schedule Practice Consultation"
          primaryButtonLink="/contact"
        />
      </div>
    </PageTransition>
  );
};
