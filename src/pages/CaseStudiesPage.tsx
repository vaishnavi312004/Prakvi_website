import React from 'react';
import { PageTransition } from '../components/layout/PageTransition';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SectionHeading } from '../components/common/SectionHeading';
import { ButtonLink } from '../components/ui/Button';

export const CaseStudiesPage: React.FC = () => (
  <PageTransition className="min-h-screen pt-20">
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Case Studies' }]} />
        <div className="mt-8">
          <SectionHeading badge="How We Help" title="Case Studies" description="A closer look at our work and the challenges we help businesses solve." />
        </div>
      </div>
    </section>
    <section className="bg-canvas py-section">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold">Case studies are coming soon</h2>
        <p className="mt-4">We are preparing detailed stories about our work. In the meantime, explore our services or read our latest blogs.</p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <ButtonLink to="/services" variant="secondary">Explore services</ButtonLink>
          <ButtonLink to="/insights" variant="secondary">Read our blogs</ButtonLink>
        </div>
      </div>
    </section>
  </PageTransition>
);
