import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { productsData } from '../data/productsData';
import {
  CheckCircle2,
  ArrowRight,
  Server,
  X,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const handleDemo = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsDemoModalOpen(false);
      setEmail('');
    }, 2500);
  };

  return (
    <PageTransition className="min-h-screen bg-[#02060D] text-slate-100 pt-20">
      {/* 1. HERO WITH BLENDED CANVAS */}
      <section className="bg-gradient-to-b from-[#02060D] via-[#040E1E] to-[#07192F] text-white py-20 relative overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 tech-grid-dark opacity-35 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Products', path: '/products' },
              { label: product.name },
            ]}
            variant="light"
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F0FF]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00F0FF]">
                {product.badge || 'Enterprise SaaS Platform'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-medium text-[#00F0FF]">
              {product.tagline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {product.fullDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#02060D] bg-gradient-to-r from-[#00F0FF] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all"
              >
                <span>Request Platform Demo</span>
                <ArrowRight className="w-4 h-4 text-[#02060D]" />
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.1] border border-white/15 hover:border-[#00F0FF]/40 transition-colors"
              >
                <span>Pricing & Deployment Inquiry</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS UNIFIED CANVAS: STATS, CAPABILITY & USE CASES */}
      <div className="bg-[#02060D]">
        {/* 2. STATS BAR */}
        <section className="py-12 border-b border-white/[0.06] bg-[#040E1E]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {product.stats.map((st, i) => (
                <div key={i} className="text-center p-6 rounded-2xl bg-[#040E1E] border border-white/10 shadow-lg">
                  <div className="font-display text-3xl font-extrabold text-[#00F0FF] tabular-nums drop-shadow-[0_0_8px_rgba(0,240,255,0.3)]">{st.value}</div>
                  <div className="text-xs text-slate-400 font-medium mt-1 font-mono">{st.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CORE FEATURES & ARCHITECTURE (Split Grid) */}
        <section className="py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Features (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <SectionHeading
                  badge="Capability Spectrum"
                  title="Engineered for High-Velocity Execution"
                  description="Built from the ground up for resilient multi-tenant enterprise scale, low-latency querying, and seamless integration with legacy backbones."
                  theme="dark"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {product.features.map((feature, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 shadow-md flex items-start gap-3 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights (5 cols) */}
              <div className="lg:col-span-5 p-8 sm:p-10 rounded-3xl bg-[#040E1E]/90 text-white border border-[#00F0FF]/30 shadow-2xl backdrop-blur-xl">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#00F0FF] mb-2">
                  Technical Specifications
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Architecture Blueprint
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-300 font-light">
                  {product.architecturePoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Server className="w-4 h-4 text-[#00F0FF] flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>SOC 2 Type II Audited</span>
                  <span>TLS 1.3 Encryption</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. BUSINESS BENEFITS & USE CASES */}
        <section className="py-20 lg:py-24 border-t border-white/[0.06] bg-[#07192F]/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Business Benefits (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <SectionHeading
                  badge="Measurable ROI"
                  title="Business Impact & Value Realization"
                  theme="dark"
                />
                <div className="space-y-3">
                  {product.benefits.map((ben, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 shadow-md flex items-start gap-3 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        ✓
                      </div>
                      <span className="text-sm text-slate-200 leading-relaxed font-light">
                        {ben}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Targeted Use Cases (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                <SectionHeading
                  badge="Deployment Scenarios"
                  title="Industry & Operational Use Cases"
                  theme="dark"
                />
                <div className="space-y-3">
                  {product.useCases.map((uc, i) => (
                    <div key={i} className="p-5 rounded-2xl bg-[#040E1E]/90 border border-white/10 hover:border-[#00F0FF]/30 shadow-md transition-colors">
                      <div className="text-xs font-mono font-bold text-[#00F0FF] mb-1">
                        SCENARIO 0{i + 1}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-light">
                        {uc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 5. DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#040E1E] rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-[#00F0FF]/30 text-white">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/[0.08] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#00F0FF]/15 border border-[#00F0FF]/40 text-[#00F0FF] flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Demo Request Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xs mx-auto leading-relaxed font-light">
                  We have queued your demo invitation for <strong>{product.name}</strong>. A solutions architect will reach out to <strong>{email}</strong> within 1 business day.
                </p>
              </div>
            ) : (
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-1">
                  Schedule Demo: {product.name}
                </h3>
                <p className="text-xs text-slate-400 mb-6 font-light">
                  See how {product.name} optimizes workflows in your enterprise stack.
                </p>

                <form onSubmit={handleDemo} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Corporate Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="executive@company.com"
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
                    Prototype demo confirmation • No persistent storage
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <CTASection
        title={`Deploy ${product.name} in Your Enterprise`}
        subtitle="Talk to our product specialists to discuss sandbox access, multi-tenant deployment options, and custom API integrations."
        primaryButtonText="Schedule Platform Walkthrough"
        primaryButtonLink="/contact"
      />
    </PageTransition>
  );
};
