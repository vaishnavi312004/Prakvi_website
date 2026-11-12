import React from 'react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { companyData } from '../data/companyData';
import {
  Target,
  Compass,
  CheckCircle,
  Lightbulb,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  Leaf,
  Calendar,
} from 'lucide-react';

const valueIconMap: Record<string, React.FC<{ className?: string }>> = {
  Lightbulb,
  ShieldCheck,
  Award,
  Users,
  Sparkles,
  Leaf,
};

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
        {/* =========================================================================
            1. HERO WITH COMPANY POSITIONING (Deep Navy #071D3A)
           ========================================================================= */}
        <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-20 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
              alt="Prakvi Corporate Identity"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071D3A] via-[#071D3A]/90 to-[#071D3A]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A] via-transparent to-[#071D3A]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'About Us' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                  Institutional Identity & Governance
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Pioneering Enterprise Resilience and Human Potential.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-200 leading-relaxed text-balance font-light">
                Prakvi Techno Solutions Private Limited is an enterprise technology and workforce solutions firm partnering with global leaders to modernize infrastructure, mobilize hybrid workforces, and deploy cognitive software systems.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. OUR GENESIS & PURPOSE (Clean Off-White #F7FAFC)
           ========================================================================= */}
        <section className="py-20 lg:py-24 bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <SectionHeading
                  badge="Our Genesis & Purpose"
                  title="Built on the Convergence of Software Engineering and Talent Velocity"
                  theme="light"
                />

                <div className="space-y-4 text-base text-[#57708E] leading-relaxed">
                  <p>
                    Established in 2011, Prakvi began with an unambiguous insight: technology transformations do not fail because of software alone; they fail when specialized human talent and technical architectures are disconnected.
                  </p>
                  <p>
                    Over the past decade and a half, we have grown from an elite IT consulting and staffing unit into a comprehensive multi-disciplinary technology organization. Today, our teams architect unified multi-cloud environments, deploy Zero-Trust enterprise mobility frameworks, supply mission-critical healthcare staffing across North America, and engineer proprietary SaaS analytics products.
                  </p>
                  <p>
                    We operate with the agility of a specialized engineering lab backed by the rigorous governance, SLA commitments, and compliance frameworks required by tier-1 enterprise organizations.
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-[#071D3A]">
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#009EDB]" />
                    <span>15+ Years Industry Footprint</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#009EDB]" />
                    <span>CIN Registered Private Limited</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
                    <CheckCircle className="w-4 h-4 text-[#009EDB]" />
                    <span>Multi-National Delivery Centers</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                  <img
                    src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
                    alt="Prakvi Corporate Headquarters"
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/60 via-transparent to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. MISSION & VISION (White Background with Light-Blue Gradient Cards)
           ========================================================================= */}
        <section className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-[#DDF4FF]/40 border border-slate-200 shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#009EDB]/15 border border-[#009EDB]/30 flex items-center justify-center text-[#009EDB] mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB] mb-2">
                  Our Mission
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#071D3A] mb-4">
                  Engineering Resilient Business Velocity
                </h3>
                <p className="text-sm sm:text-base text-[#57708E] leading-relaxed">
                  To empower global enterprises by architecting robust, secure, and future-ready technology platforms while providing specialized, agile workforce solutions that transform operational friction into enduring competitive advantage.
                </p>
              </div>

              {/* Vision Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white to-[#DDF4FF]/40 border border-slate-200 shadow-md hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-2xl bg-[#009EDB]/15 border border-[#009EDB]/30 flex items-center justify-center text-[#009EDB] mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB] mb-2">
                  Our Vision
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#071D3A] mb-4">
                  The Global Standard for Intelligent Enterprise Delivery
                </h3>
                <p className="text-sm sm:text-base text-[#57708E] leading-relaxed">
                  To be recognized as the premier corporate technology catalyst, known for absolute engineering integrity, human-centered innovation, and seamless modernization across high-consequence global industries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. CORE VALUES (Off-White #F7FAFC with Premium White Cards)
           ========================================================================= */}
        <section className="py-20 lg:py-24 bg-[#F7FAFC] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our North Star"
              title="The Principles That Govern Every Line of Code and Client Commitment"
              description="Our cultural values define our technical execution, our workforce integrity, and our institutional accountability."
              theme="light"
              align="center"
            />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companyData.values.map((v) => {
                const IconComp = valueIconMap[v.icon] || ShieldCheck;
                return (
                  <div
                    key={v.id}
                    className="p-7 rounded-2xl bg-white border border-slate-200/80 hover:border-[#009EDB]/40 hover:shadow-lg transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#DDF4FF] border border-[#009EDB]/25 flex items-center justify-center text-[#009EDB] mb-4 group-hover:bg-[#009EDB] group-hover:text-white transition-all">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-base font-bold text-[#071D3A] mb-2">
                      {v.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#57708E] leading-relaxed">
                      {v.short}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. MILESTONE TIMELINE (Deep Navy #071D3A)
           ========================================================================= */}
        <section className="py-24 bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Our Trajectory"
              title="A Decade and a Half of Measured Growth & Innovation"
              description="Key milestones tracing our evolution from an IT consulting & staffing boutique to a full-scale corporate solutions provider."
              theme="dark"
              align="center"
            />

            <div className="mt-16 relative">
              {/* Timeline Center Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#00D4EA]/60 via-[#009EDB]/40 to-transparent -translate-x-1/2" />

              <div className="space-y-10 lg:space-y-12">
                {companyData.journeyMilestones.map((m, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={m.year}
                      className={`relative flex flex-col lg:flex-row items-center ${
                        isEven ? 'lg:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline Node Marker */}
                      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#071D3A] border-2 border-[#00D4EA] shadow-[0_0_12px_#00D4EA] items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-[#00D4EA]" />
                      </div>

                      {/* Content Box */}
                      <div className="w-full lg:w-1/2 px-0 lg:px-10">
                        <div className="p-6 rounded-2xl bg-[#040E1E]/90 border border-[#00D4EA]/25 shadow-xl hover:border-[#00D4EA] transition-all">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xl font-extrabold font-display text-[#00D4EA]">
                              {m.year}
                            </span>
                            <span className="text-[11px] font-mono text-slate-300 px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/10">
                              {m.tag}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2">{m.title}</h4>
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6. FINAL CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
