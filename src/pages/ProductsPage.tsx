import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { productsData } from '../data/productsData';
import {
  ArrowRight,
  CheckCircle2,
  X,
} from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [demoModalProduct, setDemoModalProduct] = useState<string | null>(null);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoName, setDemoName] = useState('');

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setDemoModalProduct(null);
      setDemoEmail('');
      setDemoName('');
    }, 3000);
  };

  return (
    <PageTransition>
      <div className="overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
        {/* =========================================================================
            1. HERO (Deep Navy #071D3A)
           ========================================================================= */}
        <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-20 relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
              alt="Prakvi Enterprise SaaS Suites"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071D3A] via-[#071D3A]/90 to-[#071D3A]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A] via-transparent to-[#071D3A]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Products' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                  Enterprise SaaS Suites
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Mission-Critical Enterprise SaaS Platforms.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-200 leading-relaxed text-balance font-light">
                Purpose-built software platforms engineered to eliminate operational silos across real-time business intelligence, human resource lifecycles, third-party vendor procurement, and high-velocity B2B sales pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            2. PRODUCT SHOWCASE GRID (Clean Off-White #F7FAFC with White Cards)
           ========================================================================= */}
        <section className="py-20 lg:py-24 bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Product Portfolio"
              title="Four Pillars of Enterprise Operational Velocity"
              description="Explore our modular platforms engineered with cloud-native multi-tenancy, strict role-based access, and sub-second analytical latency."
              theme="light"
            />

            <div className="mt-14 space-y-12">
              {productsData.map((product, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={product.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-xl transition-all ${
                      isEven ? '' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Left Column: Product Info (7 cols) */}
                    <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DDF4FF] border border-[#009EDB]/30 text-xs font-mono font-semibold text-[#009EDB]">
                        {product.badge || 'Enterprise Suite'}
                      </div>

                      <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#071D3A]">
                        {product.name}
                      </h2>

                      <p className="text-sm font-semibold text-[#009EDB]">
                        {product.tagline}
                      </p>

                      <p className="text-sm sm:text-base text-[#57708E] leading-relaxed">
                        {product.shortDesc}
                      </p>

                      {/* Stats cells in soft sky blue */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                        {product.stats.map((st, i) => (
                          <div key={i} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-center">
                            <div className="font-display text-lg font-bold text-[#071D3A] tabular-nums">{st.value}</div>
                            <div className="text-[10px] text-slate-500 font-mono mt-0.5">{st.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Top 3 Features */}
                      <div className="space-y-2 pt-1 text-xs text-slate-800">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200/60">
                            <CheckCircle2 className="w-4 h-4 text-[#009EDB] shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="pt-3 flex flex-wrap items-center gap-4">
                        <Link
                          to={`/products/${product.slug}`}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                        >
                          <span>Platform Specs</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>

                        <button
                          onClick={() => setDemoModalProduct(product.name)}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#071D3A] bg-white border border-slate-300 hover:border-[#009EDB] shadow-sm transition-colors"
                        >
                          <span>Request Custom Demo</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Platform Preview (5 cols) */}
                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/70 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/95 border border-slate-200 text-[#071D3A] text-xs backdrop-blur-md shadow-lg">
                          <span className="font-mono text-[#009EDB] uppercase tracking-wider block text-[10px] font-bold">
                            Governance
                          </span>
                          <span className="font-semibold text-[#071D3A] mt-0.5 block">
                            SOC 2 & ISO 27001 Ready • Multi-Tenant
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

        {/* 3. REQUEST DEMO MODAL */}
        {demoModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-[#172B45]">
              <button
                onClick={() => setDemoModalProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {demoSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#DDF4FF] border border-[#009EDB]/40 text-[#009EDB] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-[#071D3A]">
                    Demo Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#57708E] max-w-xs mx-auto leading-relaxed">
                    Thank you, <strong>{demoName}</strong>. Our enterprise solutions engineering team will contact <strong>{demoEmail}</strong> to schedule your customized walkthrough of {demoModalProduct}.
                  </p>
                  <div className="text-[10px] font-mono text-slate-400">
                    A verification receipt has been logged.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB]">
                    Live Architecture Walkthrough
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-[#071D3A]">
                    Request Demo: {demoModalProduct}
                  </h3>
                  <p className="text-xs text-[#57708E] leading-relaxed">
                    Please provide your corporate details to coordinate a technical sandbox session with our platform architects.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#071D3A] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoName}
                        onChange={(e) => setDemoName(e.target.value)}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#071D3A] placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#071D3A] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="alex@enterprise.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#071D3A] placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                    >
                      Schedule Technical Walkthrough
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* 4. CTA */}
        <CTASection
          title="Looking for a Tailored Enterprise Platform?"
          subtitle="Our engineering squads build bespoke extensions and on-premise deployments integrated directly with your ERP, HRIS, or CRM core."
        />
      </div>
    </PageTransition>
  );
};
