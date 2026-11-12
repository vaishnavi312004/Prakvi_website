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
      <div className="bg-[#02060D] text-slate-100 overflow-x-hidden pt-20">
        {/* 1. HERO */}
        <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
          <div className="absolute inset-0 z-0 opacity-25">
            <img
              src="/src/assets/images/hero_enterprise_cinematic_1794479542547.jpg"
              alt="Prakvi Enterprise SaaS Suites"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#02060D] via-[#02060D]/90 to-[#02060D]/70" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-transparent to-[#02060D]/80" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Products' }]} variant="light" />

            <div className="mt-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-5">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                  Enterprise SaaS Suites
                </span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight text-balance">
                Mission-Critical Enterprise SaaS Platforms.
              </h1>

              <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed text-balance font-light">
                Purpose-built software platforms engineered to eliminate operational silos across real-time business intelligence, human resource lifecycles, third-party vendor procurement, and high-velocity B2B sales pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTINUOUS UNIFIED PRODUCTS CANVAS IN DARK OBSIDIAN NAVY
           ========================================================================= */}
        <div className="relative bg-[#02060D]">
          {/* 2. PRODUCT SHOWCASE GRID */}
          <section className="py-20 lg:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                badge="Product Portfolio"
                title="Four Pillars of Enterprise Operational Velocity"
                description="Explore our modular platforms engineered with cloud-native multi-tenancy, strict role-based access, and sub-second analytical latency."
                theme="dark"
              />

              <div className="mt-14 space-y-12">
                {productsData.map((product, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={product.id}
                      className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 rounded-3xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/40 shadow-xl hover:shadow-[0_0_30px_rgba(0,240,255,0.12)] transition-all ${
                        isEven ? '' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Left Column: Product Info (7 cols) */}
                      <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-xs font-mono font-semibold text-[#00F0FF]">
                          {product.badge || 'Enterprise Suite'}
                        </div>

                        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
                          {product.name}
                        </h2>

                        <p className="text-sm font-semibold text-[#00F0FF]">
                          {product.tagline}
                        </p>

                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                          {product.shortDesc}
                        </p>

                        {/* Stats cells */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                          {product.stats.map((st, i) => (
                            <div key={i} className="p-3.5 bg-[#02060D] rounded-xl border border-white/10 text-center">
                              <div className="font-display text-lg font-bold text-[#00F0FF] tabular-nums">{st.value}</div>
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">{st.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Top 3 Features */}
                        <div className="space-y-2 pt-1 text-xs text-slate-200">
                          {product.features.slice(0, 3).map((feat, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-2 rounded-lg bg-white/[0.03]">
                              <CheckCircle2 className="w-4 h-4 text-[#00F0FF] shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="pt-3 flex flex-wrap items-center gap-4">
                          <Link
                            to={`/products/${product.slug}`}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.35)] transition-all"
                          >
                            <span>Platform Specs</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          <button
                            onClick={() => setDemoModalProduct(product.name)}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.05] border border-white/15 hover:border-[#00F0FF]/40 hover:text-white transition-colors"
                          >
                            <span>Request Custom Demo</span>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: Platform Preview (5 cols) */}
                      <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#02060D] via-[#02060D]/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#02060D]/90 border border-[#00F0FF]/30 text-white text-xs backdrop-blur-md">
                            <span className="font-mono text-[#00F0FF] uppercase tracking-wider block text-[10px]">
                              Governance
                            </span>
                            <span className="font-semibold text-slate-200 mt-0.5 block">
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
        </div>

        {/* 3. REQUEST DEMO MODAL */}
        {demoModalProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="bg-[#040E1E] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#00F0FF]/30 text-white">
              <button
                onClick={() => setDemoModalProduct(null)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-slate-300" />
              </button>

              {demoSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Demo Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed font-light">
                    Thank you, <strong>{demoName}</strong>. Our enterprise solutions engineering team will contact <strong>{demoEmail}</strong> to schedule your customized walkthrough of {demoModalProduct}.
                  </p>
                  <div className="text-[10px] font-mono text-slate-500">
                    (Simulated Enterprise Prototype Demonstration)
                  </div>
                </div>
              ) : (
                <div>
                  <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#00F0FF] mb-1">
                    Interactive Walkthrough
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Schedule a Demo: {demoModalProduct}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 mb-6 font-light">
                    Experience a tailored platform demonstration with our solutions architects.
                  </p>

                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={demoName}
                        onChange={(e) => setDemoName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={demoEmail}
                        onChange={(e) => setDemoEmail(e.target.value)}
                        placeholder="sarah@enterprise.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        className="w-full px-4 py-2.5 rounded-xl bg-[#02060D] border border-white/15 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.4)] transition-all active:scale-95"
                    >
                      Confirm Demo Booking
                    </button>

                    <p className="text-[10px] text-center text-slate-500 font-mono">
                      Client-side prototype: no spam or external distribution.
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <CTASection
          title="Looking for Custom Enterprise Platform Engineering?"
          subtitle="Our team builds tailor-made SaaS architectures, mobile applications, and internal enterprise cockpits designed specifically for your workflows."
          primaryButtonText="Discuss Custom Development"
          primaryButtonLink="/contact"
        />
      </div>
    </PageTransition>
  );
};
