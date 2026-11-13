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
    <PageTransition className="min-h-screen overflow-x-hidden pt-20 selection:bg-accent selection:text-white">

      <section className="bg-gradient-to-b from-canvas via-surface to-canvas text-foreground py-section relative overflow-hidden">
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
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/[0.04] px-3.5 py-1.5">
              <span className="w-2 h-2 rounded-full bg-accent shadow-accent" />
              <span className="text-xs font-mono font-semibold uppercase tracking-widest text-accent">
                {product.badge || 'Enterprise SaaS Platform'}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
              {product.name}
            </h1>

            <p className="mt-4 text-lg sm:text-xl font-medium text-accent">
              {product.tagline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-muted leading-relaxed font-light">
              {product.fullDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="btn-primary"
              >
                <span>Request Platform Demo</span>
                <ArrowRight className="w-4 h-4 text-foreground" />
              </button>

              <Link
                to="/contact"
                className="btn-secondary"
              >
                <span>Speak with an Architect</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      <section className="py-section bg-canvas text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Preview */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-line group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent" />
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
                    className="p-4 rounded-xl bg-surface border border-line shadow-sm flex items-start gap-2.5 text-xs sm:text-sm text-foreground font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="py-section bg-gradient-to-b from-canvas via-surface to-canvas text-foreground">
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
                className="p-7 rounded-2xl bg-canvas/90 border border-accent/25 text-left shadow-xl"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center mb-4">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-display text-base font-bold text-foreground mb-2">
                  Architecture Layer 0{idx + 1}
                </h4>
                <p className="text-xs sm:text-sm text-muted leading-relaxed font-light">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="py-section bg-canvas text-foreground">
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
                className="p-6 rounded-2xl glass-panel border border-line  hover:shadow-accent transition-shadow"
              >
                <div className="text-xs font-mono font-bold text-accent mb-2">
                  Use Case 0{idx + 1}
                </div>
                <p className="text-sm text-foreground font-semibold leading-relaxed">
                  {uc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO MODAL */}
      {isDemoModalOpen && (
        <div data-lenis-prevent className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-canvas/80 backdrop-blur-md animate-fade-in">
          <div data-lenis-prevent className="glass-panel max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl max-w-md w-full p-6 sm:p-8  relative border border-line text-foreground">
            <button
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-surface border border-accent/40 text-accent flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Session Scheduled!
                </h3>
                <p className="text-xs sm:text-sm text-muted max-w-xs mx-auto leading-relaxed">
                  We've sent an invitation and technical overview to <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemo} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  Live Technical Walkthrough
                </div>
                <h3 className="font-display text-2xl font-extrabold text-foreground">
                  Demo {product.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Provide your enterprise work email to receive sandbox credentials and access to the interactive architecture blueprint.
                </p>

                <div className="pt-2">
                  <label className="block text-xs font-semibold text-foreground mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="architect@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-line text-foreground placeholder:text-muted text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-primary"
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
