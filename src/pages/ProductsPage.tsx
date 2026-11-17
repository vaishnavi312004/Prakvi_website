import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { CTASection } from '../components/common/CTASection';
import { PageTransition } from '../components/layout/PageTransition';
import { IosModal } from '../components/ui/IosModal';
import { productsData } from '../data/productsData';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const reducedMotion = useReducedMotion();
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
      <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
        {/* 1. PRODUCTS HERO */}
        <section className="hero-clay-canvas py-section relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Breadcrumbs items={[{ label: 'Products' }]} />

            <div className="mt-8 max-w-3xl">
              <div className="mb-3 text-xs font-mono font-bold uppercase tracking-[0.2em] text-accent-text">
                Enterprise Software Suites
              </div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight text-balance">
                Purpose-Built Enterprise Business Platforms.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-muted leading-relaxed text-balance">
                Discover Prakvi’s three proprietary software platforms—Data Analytics, Vendor Management, and Relationship Management—engineered to streamline operations and empower faster decisions.
              </p>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT PORTFOLIO */}
        <section className="py-section bg-canvas text-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              badge="Product Portfolio"
              title="Three Core Platforms for Modern Operations"
              description="Modular software suites featuring automated workflows, predictive intelligence, and secure cloud access."
            />

            <div className="mt-12 space-y-10">
              {productsData.map((product, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <motion.div
                    key={product.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                      duration: reducedMotion ? 0 : 0.44,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="clay-card clay-card-interactive grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-7 sm:p-10"
                  >
                    <div className={`lg:col-span-7 space-y-5 ${isEven ? '' : 'lg:order-2'}`}>
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-text">
                        {product.badge || 'Enterprise Platform'}
                      </div>

                      <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-foreground">
                        {product.name}
                      </h2>

                      <p className="text-sm font-semibold text-accent-text">{product.tagline}</p>

                      <p className="text-sm sm:text-base text-muted leading-relaxed">
                        {product.shortDesc}
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                        {product.stats.map((st, i) => (
                          <div key={i} className="clay-soft p-3 text-center">
                            <div className="font-display text-base font-bold text-foreground tabular-nums">
                              {st.value}
                            </div>
                            <div className="text-[11px] text-muted font-mono mt-0.5">
                              {st.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 pt-1 text-xs text-foreground">
                        {product.features.slice(0, 3).map((feat, i) => (
                          <div
                            key={i}
                            className="clay-soft flex items-start gap-2.5 p-3"
                          >
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex flex-wrap items-center gap-4">
                        <Link to={`/products/${product.slug}`} className="btn-primary">
                          <span>Platform Details</span>
                          <ArrowRight className="arrow-shift" aria-hidden="true" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setDemoModalProduct(product.name)}
                          className="btn-secondary"
                        >
                          <span>Request Custom Demo</span>
                        </button>
                      </div>
                    </div>

                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                      <div className="clay-soft p-3">
                        <div className="relative rounded-2xl overflow-hidden group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          <div className="p-4 bg-card/95 border-t border-line">
                            <span className="font-mono text-accent-text uppercase tracking-wider block text-[10px] font-bold">
                              Deployment
                            </span>
                            <span className="font-semibold text-foreground text-sm mt-0.5 block">
                              Cloud-Accessible · Role-Based Security · ERP Ready
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 3. REQUEST DEMO MODAL (iOS Spring Sheet) */}
        <IosModal
          open={Boolean(demoModalProduct)}
          onClose={() => setDemoModalProduct(null)}
          ariaLabel={`Request demo for ${demoModalProduct || 'product'}`}
          maxWidthClass="max-w-md"
        >
          {demoSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="clay-icon-box w-14 h-14 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">
                Demo Request Received
              </h3>
              <p className="text-sm text-muted max-w-xs mx-auto leading-relaxed">
                Thank you, <strong>{demoName}</strong>. Our team will contact{' '}
                <strong>{demoEmail}</strong> to schedule your walkthrough of{' '}
                {demoModalProduct}.
              </p>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit} className="space-y-4">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-accent-text">
                Platform Walkthrough
              </div>
              <h3 className="font-display text-2xl font-extrabold text-foreground pr-8">
                Request Demo: {demoModalProduct}
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Provide your details to schedule a live technical walkthrough with our product specialists.
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <label htmlFor="demo-name" className="field-label">
                    Full Name *
                  </label>
                  <input
                    id="demo-name"
                    type="text"
                    required
                    value={demoName}
                    onChange={(e) => setDemoName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="field"
                  />
                </div>

                <div>
                  <label htmlFor="demo-email" className="field-label">
                    Work Email *
                  </label>
                  <input
                    id="demo-email"
                    type="email"
                    required
                    value={demoEmail}
                    onChange={(e) => setDemoEmail(e.target.value)}
                    placeholder="aarav@company.com"
                    className="field"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full btn-primary">
                  Schedule Walkthrough
                </button>
              </div>
            </form>
          )}
        </IosModal>

        {/* CTA */}
        <CTASection />
      </div>
    </PageTransition>
  );
};
