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
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden pt-20">
        {/* 1. HERO WITH COMPANY POSITIONING */}
        <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
              alt="Prakvi Corporate Identity"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/90 to-[#02060D]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'About Us' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Institutional Identity & Governance
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Pioneering Enterprise Resilience and Human Potential.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed text-balance font-light">
                Prakvi Techno Solutions Private Limited is an enterprise technology and workforce solutions firm partnering with global leaders to modernize infrastructure, mobilize hybrid workforces, and deploy cognitive software systems.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTINUOUS UNIFIED STORYTELLING CANVAS IN DARK NAVY OBSIDIAN
           ========================================================================= */}
        <div className="relative bg-[#02060D]">
          {/* 2. OUR STORY & WHO WE ARE */}
          <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <SectionHeading
                    badge="Our Genesis & Purpose"
                    title="Built on the Convergence of Software Engineering and Talent Velocity"
                    theme="dark"
                  />

                  <div className="space-y-4 text-base text-slate-300 leading-relaxed font-light">
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

                  <div className="pt-2 flex flex-wrap gap-6 text-sm font-semibold text-slate-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                      <span>15+ Years Industry Footprint</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                      <span>CIN Registered Private Limited</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-[#00F0FF]" />
                      <span>Multi-National Delivery Centers</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
                    <img
                      src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
                      alt="Prakvi Corporate Headquarters"
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-[#02060D]/50 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-[#02060D]/90 border border-[#00F0FF]/30 text-white backdrop-blur-md">
                      <div className="text-[11px] font-mono text-[#00F0FF] uppercase">Global Headquarters</div>
                      <div className="text-sm font-bold text-white mt-0.5">Mindspace Tech Park Zone, HITEC City, Hyderabad</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MISSION & VISION */}
          <section className="py-16 border-t border-white/[0.06] bg-[#040E1E]/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Mission Box */}
                <div className="p-8 sm:p-10 rounded-3xl bg-[#07192F]/80 border border-[#00F0FF]/20 shadow-xl relative overflow-hidden group hover:border-[#00F0FF]/50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    <Target className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF] mb-2">
                    Our Corporate Mission
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-3">
                    To empower global enterprises through resilient technology and exceptional human capital.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    We are dedicated to removing operational friction, de-risking technological evolution, and delivering measurable business outcomes through disciplined software engineering and rapid specialized staffing.
                  </p>
                </div>

                {/* Vision Box */}
                <div className="p-8 sm:p-10 rounded-3xl bg-[#07192F]/80 border border-[#00F0FF]/20 shadow-xl relative overflow-hidden group hover:border-[#00F0FF]/50 transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF] mb-2">
                    Our Long-Term Vision
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-3">
                    To be the most trusted technology catalyst for high-stakes enterprise modernization.
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    We envision a connected business landscape where enterprises leverage intelligent cloud platforms, secure mobile perimeters, and precision-matched talent pipelines to innovate fearlessly.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. CORE VALUES */}
          <section className="py-20 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Institutional Ethics"
                title="Our Core Guiding Values"
                description="The foundational principles that guide every client architecture, candidate engagement, and code deployment."
                theme="dark"
                align="center"
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyData.values.map((val) => (
                  <div
                    key={val.id}
                    className="p-7 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 hover:shadow-[0_0_25px_rgba(0,240,255,0.15)] transition-all group"
                  >
                    <div className="text-xs font-mono font-bold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">
                      {val.title}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {val.short}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. OUR CULTURE PILLARS */}
          <section className="py-20 border-t border-white/[0.06] bg-[#07192F]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="The Prakvi Way"
                title="Our Engineering & Delivery Culture"
                description="We build environments where technical curiosity thrives, transparency is paramount, and outcomes speak louder than presentations."
                theme="dark"
              />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {companyData.culturePillars.map((pillar, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 transition-all"
                  >
                    <div className="text-[11px] font-mono text-[#00F0FF] uppercase mb-1.5 font-bold">
                      {pillar.metric}
                    </div>
                    <h4 className="font-display text-base font-bold text-white mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. LEADERSHIP PLACEHOLDERS */}
          <section className="py-20 border-t border-white/[0.06]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-3xl mb-12">
                <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Governance & Structure
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Practice Leadership & Executive Council
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
                  Structured executive practice profiles. Formal bios and verified executive announcements are currently undergoing corporate review.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyData.leadershipPlaceholders.map((leader, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-[#00F0FF] mb-4 font-mono text-xs">
                        EXEC
                      </div>
                      <div className="text-[11px] font-mono text-[#00F0FF] uppercase font-semibold">
                        {leader.unit}
                      </div>
                      <h4 className="font-display text-sm font-bold text-white mt-1 mb-2">
                        {leader.role}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed font-light">
                        {leader.focus}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-white/10 text-[10px] font-mono text-slate-400">
                      {leader.placeholderLabel}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. COMPANY JOURNEY (Timeline) */}
          <section className="py-20 border-t border-white/[0.06] bg-[#040E1E]/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Milestones"
                title="The Prakvi Journey"
                description="Fifteen years of continuous adaptation, technical depth, and enterprise client partnerships."
                theme="dark"
                align="center"
              />

              <div className="mt-14 max-w-4xl mx-auto space-y-6 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:w-0.5 before:bg-[#00F0FF]/30">
                {companyData.journeyMilestones.map((m, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={idx}
                      className={`relative flex items-center ${
                        isEven ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Central Node Badge */}
                      <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#02060D] border-2 border-[#00F0FF] flex items-center justify-center text-white text-xs z-10 shadow-[0_0_10px_#00F0FF]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                      </div>

                      {/* Milestone Card */}
                      <div className="ml-10 sm:ml-0 sm:w-1/2 sm:px-6">
                        <div className="p-6 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-display text-lg font-bold text-[#00F0FF]">
                              {m.year}
                            </span>
                            <span className="text-[10px] font-mono bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/30 px-2 py-0.5 rounded-full font-semibold">
                              {m.tag}
                            </span>
                          </div>
                          <h4 className="font-display text-sm font-bold text-white mb-1.5">
                            {m.title}
                          </h4>
                          <p className="text-xs text-slate-300 leading-relaxed font-light">
                            {m.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <CTASection
          title="Ready to Partner With Prakvi?"
          subtitle="Connect with our practice leaders to discuss your enterprise technology requirements, team augmentation, or custom platform demos."
        />
      </div>
    </PageTransition>
  );
};
