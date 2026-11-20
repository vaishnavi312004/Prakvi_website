import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { ButtonLink } from '../components/ui/Button';
import { CTASection } from '../components/common/CTASection';
import { ArrowRight, Layers } from 'lucide-react';

export const CaseStudiesPage: React.FC = () => (
  <PageTransition>
    <div className="overflow-x-hidden pt-20 selection:bg-accent selection:text-white">
      <section className="hero-clay-canvas py-section relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs items={[{ label: 'Case Studies' }]} />
          <div className="mt-8">
            <SectionHeading
              title="Case Studies"
              description="A closer look at our work and the operational challenges we help enterprise businesses solve."
            />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-section">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="clay-card p-8 sm:p-12 text-center">
            <div className="clay-icon-box mx-auto mb-6">
              <Layers className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-foreground">
              Case studies are coming soon
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
              We are preparing documented stories covering our cloud migrations, BI dashboards, mobility deployments, and enterprise staffing engagements. In the meantime, explore our full service catalog or read our technical insights.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/services" variant="primary">
                <span>Explore Services</span>
                <ArrowRight className="arrow-shift" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink to="/insights" variant="secondary">
                Read Our Insights
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  </PageTransition>
);
