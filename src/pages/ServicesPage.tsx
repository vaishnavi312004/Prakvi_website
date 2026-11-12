import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { servicesData } from '../data/servicesData';
import {
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'enterprise' | 'business'>('all');

  const filteredServices = servicesData.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <PageTransition>
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden pt-20">
        {/* 1. HERO */}
        <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/cloud_data_datacenter_1794479543953.jpg"
              alt="Prakvi Services & Capabilities"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/90 to-[#02060D]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Services' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Enterprise Capabilities
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Enterprise Technology & Workforce Practices.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed text-balance font-light">
                We provide end-to-end capabilities spanning specialized IT and healthcare staffing, Zero-Trust enterprise mobility, multi-cloud engineering, system integration, and bespoke digital software.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTINUOUS UNIFIED SERVICES CANVAS IN DARK OBSIDIAN NAVY
           ========================================================================= */}
        <div className="relative bg-[#02060D]">
          {/* 2. CATEGORY SELECTOR & DIRECTORY */}
          <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-white/10">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Explore Our Core Practices
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1 font-light">
                    Select a practice track to view specialized capabilities, benefits, and delivery frameworks.
                  </p>
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center gap-1.5 p-1.5 bg-[#040E1E] rounded-2xl border border-white/10 shadow-lg">
                  <button
                    onClick={() => setFilterCategory('all')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterCategory === 'all'
                        ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    All Practices ({servicesData.length})
                  </button>
                  <button
                    onClick={() => setFilterCategory('enterprise')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterCategory === 'enterprise'
                        ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    Enterprise Solutions (13)
                  </button>
                  <button
                    onClick={() => setFilterCategory('business')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterCategory === 'business'
                        ? 'bg-[#00F0FF] text-[#02060D] font-bold shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    Business Solutions (4)
                  </button>
                </div>
              </div>

              {/* Seamless Alternating Services Showcase in Dark Cards */}
              <div className="mt-14 space-y-12">
                {filteredServices.map((service, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <div
                      key={service.id}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.12)] transition-all ${
                        isEven ? '' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Text Content (7 cols) */}
                      <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono font-semibold text-[#00F0FF]">
                          {service.badge || 'Practice Area'}
                        </div>

                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                          {service.title}
                        </h3>

                        <p className="text-sm font-semibold text-[#00F0FF]">
                          {service.tagline}
                        </p>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                          {service.shortDesc}
                        </p>

                        {/* 4 Key Capabilities */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          {service.capabilities.slice(0, 4).map((cap, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-2 rounded-xl bg-white/[0.03] text-xs text-slate-200">
                              <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                              <span className="font-medium">{cap.title}</span>
                            </div>
                          ))}
                        </div>

                        {/* Action Link */}
                        <div className="pt-4">
                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all"
                          >
                            <span>View Practice Detail & Case Studies</span>
                            <ArrowRight className="w-4 h-4 text-[#02060D]" />
                          </Link>
                        </div>
                      </div>

                      {/* Visual Asset (5 cols) */}
                      <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                          <img
                            src={service.featuredImage}
                            alt={service.title}
                            className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-[#02060D]/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#02060D]/90 border border-[#00F0FF]/30 text-white text-xs backdrop-blur-md">
                            <span className="font-mono text-[#00F0FF] uppercase tracking-wider block text-[10px]">
                              Key Outcome
                            </span>
                            <span className="font-bold text-white text-sm mt-0.5 block">
                              {service.businessBenefits[0]?.title || 'Proven ROI'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 3. ENTERPRISE DELIVERY FRAMEWORK */}
          <section className="py-20 border-t border-white/[0.06] bg-[#040E1E]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Execution Rigor"
                title="Our 5-Stage Enterprise Delivery Methodology"
                description="A disciplined lifecycle ensuring architectural soundness, risk mitigation, and continuous communication."
                theme="dark"
                align="center"
              />

              <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-5">
                <div className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all text-center group">
                  <div className="font-mono text-2xl font-extrabold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">01</div>
                  <h4 className="font-display text-sm font-bold text-white mb-1.5">Discovery & Audit</h4>
                  <p className="text-xs text-slate-300 font-light">Requirement mapping, debt assessment, and KPI benchmarking.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all text-center group">
                  <div className="font-mono text-2xl font-extrabold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">02</div>
                  <h4 className="font-display text-sm font-bold text-white mb-1.5">Architecture Blueprint</h4>
                  <p className="text-xs text-slate-300 font-light">Target topology design, schema models, and security governance.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all text-center group">
                  <div className="font-mono text-2xl font-extrabold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">03</div>
                  <h4 className="font-display text-sm font-bold text-white mb-1.5">Agile Sprint Execution</h4>
                  <p className="text-xs text-slate-300 font-light">Bi-weekly delivery sprints, automated CI/CD, and client demos.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all text-center group">
                  <div className="font-mono text-2xl font-extrabold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">04</div>
                  <h4 className="font-display text-sm font-bold text-white mb-1.5">Verification & Cutover</h4>
                  <p className="text-xs text-slate-300 font-light">Load testing, penetration auditing, and non-disruptive cutover.</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#07192F]/80 border border-white/10 hover:border-[#00F0FF]/40 transition-all text-center group">
                  <div className="font-mono text-2xl font-extrabold text-[#00F0FF] mb-2 group-hover:drop-shadow-[0_0_8px_#00F0FF]">05</div>
                  <h4 className="font-display text-sm font-bold text-white mb-1.5">SRE & SLA Handover</h4>
                  <p className="text-xs text-slate-300 font-light">24/7 telemetry monitoring, runbooks, and ongoing optimization.</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA */}
        <CTASection
          title="Discuss Your Next Technical Milestone"
          subtitle="Schedule a consultation with our practice architects to scope your requirements, review rate cards, or request a technical proposal."
        />
      </div>
    </PageTransition>
  );
};
