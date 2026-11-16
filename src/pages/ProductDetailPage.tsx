import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { productsData } from '../data/productsData';
import { ArrowRight, CheckCircle2, Server, X } from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [activeStackTab, setActiveStackTab] = useState(0);

  useEffect(() => {
    setActiveStackTab(0);
  }, [slug]);

  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const stackTabs = product.stackTabs || [];
  const currentStack = stackTabs[activeStackTab] || stackTabs[0];

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
      {/* 1. PRODUCT HERO */}
      <section className="hero-clay-canvas py-section relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs
            items={[
              { label: 'Products', path: '/products' },
              { label: product.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent">
                {product.badge || 'Prakvi Platform'}
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {product.name}
              </h1>

              <p className="text-lg sm:text-xl font-semibold text-accent">
                {product.tagline}
              </p>

              <p className="text-base text-muted leading-relaxed">{product.fullDesc}</p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => setIsDemoModalOpen(true)}
                  className="btn-primary"
                >
                  <span>Request Platform Demo</span>
                  <ArrowRight className="arrow-shift" aria-hidden="true" />
                </button>

                <Link to="/contact" className="btn-secondary">
                  <span>Schedule Consultation</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="clay-card p-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 sm:h-80 object-cover rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CAPABILITIES & BENEFITS */}
      <section className="py-section bg-canvas text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <SectionHeading
            badge="Key Features"
            title={`Comprehensive ${product.name} Capabilities`}
            description="Modular functionality tailored to simplify complex workflows and centralize enterprise reporting."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="clay-card clay-card-interactive p-6 flex items-start gap-3 text-sm text-foreground"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span className="leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. METHODOLOGY / IMPLEMENTATION STEPS */}
      {product.deliverySteps && product.deliverySteps.length > 0 && (
        <section className="py-section bg-surface/75 text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Implementation Process"
              title={`Why Choose Prakvi for ${product.name}?`}
              description="A proven methodology ensuring smooth integration, user adoption, and ongoing optimization."
              align="center"
            />

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.deliverySteps.map((step) => (
                <div key={step.step} className="clay-card p-7">
                  <div className="clay-icon-box w-10 h-10 font-mono font-extrabold text-sm flex items-center justify-center mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. INTERACTIVE STACK & TOOLS MATRIX */}
      {stackTabs.length > 0 && (
        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Platform Modules & Stack"
              title={product.stackTitle || product.name}
              description={product.stackSummary}
              align="center"
            />

            <div className="mt-10 clay-card p-6 sm:p-10">
              <div className="flex flex-wrap justify-center gap-2.5 pb-6 border-b border-line">
                {stackTabs.map((tab, idx) => {
                  const active = activeStackTab === idx;
                  return (
                    <button
                      key={tab.label}
                      type="button"
                      onClick={() => setActiveStackTab(idx)}
                      className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                        active
                          ? 'bg-accent text-white shadow-sm'
                          : 'bg-surface text-muted hover:text-foreground border border-line'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {currentStack && (
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentStack.items.map((item) => (
                    <div
                      key={item}
                      className="clay-soft px-5 py-4 flex items-center gap-3 text-sm font-semibold text-foreground"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" aria-hidden="true" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. ARCHITECTURE & USE CASES */}
      <section className="py-section bg-surface/75 text-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Technical Architecture & Use Cases"
            title="Built for Scalable Enterprise Adoption"
            align="center"
          />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.architecturePoints.map((point, idx) => (
              <div key={idx} className="clay-card p-7">
                <div className="clay-icon-box w-10 h-10 flex items-center justify-center mb-4">
                  <Server className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2">
                  Platform Pillar 0{idx + 1}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {product.useCases.map((uc, idx) => (
              <div key={idx} className="clay-pastel p-6">
                <div className="text-xs font-mono font-bold text-accent mb-2">
                  Use Case 0{idx + 1}
                </div>
                <p className="text-sm text-foreground font-semibold leading-relaxed">{uc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO MODAL */}
      {isDemoModalOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-slate-900/30 backdrop-blur-sm"
        >
          <div
            data-lenis-prevent
            className="clay-card max-h-[calc(100dvh-2rem)] overflow-y-auto max-w-md w-full p-6 sm:p-8 relative text-foreground"
          >
            <button
              type="button"
              onClick={() => setIsDemoModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-muted hover:text-foreground rounded-xl hover:bg-surface transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-4">
                <div className="clay-icon-box w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  Session Requested
                </h3>
                <p className="text-sm text-muted max-w-xs mx-auto leading-relaxed">
                  We have logged your demo request for <strong>{email}</strong>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemo} className="space-y-4">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                  Live Product Demo
                </div>
                <h3 className="font-display text-2xl font-extrabold text-foreground">
                  Demo {product.name}
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  Enter your work email to schedule a guided product walkthrough with our team.
                </p>

                <div className="pt-2">
                  <label htmlFor="product-demo-email" className="field-label">
                    Work Email *
                  </label>
                  <input
                    id="product-demo-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="field"
                  />
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full btn-primary">
                    Request Platform Demo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* CTA */}
      <CTASection
        title={`Transform Your Operations with ${product.name}`}
        subtitle="Schedule a consultation with Prakvi’s specialists to explore tailored modules and integration pathways."
      />
    </PageTransition>
  );
};
