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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-[#009EDB] selection:text-white">
      {/* =========================================================================
          1. HERO (Deep Navy #071D3A)
         ========================================================================= */}
      <section className="bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white py-20 relative overflow-hidden border-b border-white/10">
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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-[#00D4EA]/30 backdrop-blur-md mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00D4EA] shadow-[0_0_8px_#00D4EA]" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#00D4EA]">
                {product.badge || 'Enterprise SaaS Platform'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-medium text-[#00D4EA]">
              {product.tagline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-light">
              {product.fullDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold text-[#071D3A] bg-gradient-to-r from-[#00D4EA] to-[#009EDB] hover:from-[#38BDF8] hover:to-[#00D4EA] shadow-[0_0_20px_rgba(0,212,234,0.35)] transition-all"
              >
                <span>Request Platform Demo</span>
                <ArrowRight className="w-4 h-4 text-[#071D3A]" />
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 hover:border-[#00D4EA]/50 transition-colors"
              >
                <span>Speak with an Architect</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. CORE FEATURES & ARCHITECTURE METRICS (Off-White #F7FAFC with White Cards)
         ========================================================================= */}
      <section className="py-20 bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071D3A]/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Feature List in White Card */}
            <div className="lg:col-span-7 space-y-6">
              <SectionHeading
                badge="Platform Capabilities"
                title="Engineered for Continuous Enterprise Execution"
                description="Designed from the ground up for modularity, strict data sovereignty, and high throughput."
                theme="light"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {product.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex items-start gap-2.5 text-xs sm:text-sm text-[#071D3A] font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#009EDB] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. ENTERPRISE ARCHITECTURE BLUEPRINT (Deep Navy #071D3A)
         ========================================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#071D3A] via-[#0B2952] to-[#071D3A] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Technical Specification"
            title="Architectural Standards & Security Blueprint"
            description="Our software suites conform to strict institutional audit requirements and high-throughput zero-latency workloads."
            theme="dark"
            align="center"
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.architecturePoints.map((point, idx) => (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-[#040E1E]/90 border border-[#00D4EA]/25 text-left shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-[#00D4EA]/10 border border-[#00D4EA]/30 text-[#00D4EA] flex items-center justify-center mb-4">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-white mb-2">
                  Architecture Layer 0{idx + 1}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. USE CASES & ENTERPRISE OUTCOMES (Off-White #F7FAFC)
         ========================================================================= */}
      <section className="py-20 bg-[#F7FAFC] text-[#172B45] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Deployment Context"
            title="Common Enterprise Use Cases"
            description="How multinational corporations leverage this platform to replace fragmented legacy tooling."
            theme="light"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.useCases.map((uc, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-xs font-mono font-bold text-[#009EDB] mb-2">
                  Use Case 0{idx + 1}
                </div>
                <p className="text-sm text-[#071D3A] font-semibold leading-relaxed">
                  {uc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200 text-[#172B45]">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#DDF4FF] border border-[#009EDB]/40 text-[#009EDB] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#071D3A]">
                  Session Scheduled!
                </h3>
                <p className="text-xs sm:text-sm text-[#57708E] max-w-xs mx-auto leading-relaxed">
                  We've sent an invitation and technical overview to <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemo} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#009EDB]">
                  Live Technical Walkthrough
                </div>
                <h3 className="font-display text-2xl font-extrabold text-[#071D3A]">
                  Demo {product.name}
                </h3>
                <p className="text-xs text-[#57708E] leading-relaxed">
                  Provide your enterprise work email to receive sandbox credentials and access to the interactive architecture blueprint.
                </p>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-[#071D3A] mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-[#071D3A] placeholder:text-slate-400 text-sm focus:outline-none focus:border-[#009EDB] focus:ring-1 focus:ring-[#009EDB]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-[#071D3A] hover:bg-[#009EDB] shadow-md transition-all"
                  >
                    Request Platform Sandbox
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <CTASection
        title={`Accelerate Your Operations with ${product.name}`}
        subtitle="Schedule a deep-dive consultation with our solution architects to review custom integrations and licensing models."
      />
    </PageTransition>
  );
};
