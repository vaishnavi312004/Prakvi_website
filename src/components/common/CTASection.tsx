import React from 'react';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import { Card } from '../ui/Card';
interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}
export const CTASection: React.FC<CTASectionProps> = ({
  title = "Let's Build Your Next Digital Advantage.",
  subtitle = 'Whether modernizing mission-critical legacy architectures, scaling specialized workforce pods, or deploying cognitive analytics, our enterprise architects are ready to collaborate.',
  primaryButtonText = 'Start a Conversation', primaryButtonLink = '/contact',
  secondaryButtonText = 'Explore Enterprise Services', secondaryButtonLink = '/services',
}) => (
  <section className="relative overflow-hidden bg-canvas px-4 py-section sm:px-6 lg:px-8">
    <div className="pointer-events-none absolute inset-0 bg-radial-cyan" />
    <Card className="relative mx-auto max-w-7xl px-6 py-12 text-center sm:px-12 sm:py-16">
      <div className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-accent">Enterprise Strategic Consultation</div>
      <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight text-balance sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">{subtitle}</p>
      <div className="mt-9 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
        <ButtonLink to={primaryButtonLink}><MessageSquare /><span>{primaryButtonText}</span><ArrowRight /></ButtonLink>
        <ButtonLink to={secondaryButtonLink} variant="secondary">{secondaryButtonText}</ButtonLink>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-line pt-8 text-xs text-muted">
        {['SLA-Backed Deployments', 'ISO & HIPAA Compliant Frameworks', 'Rapid 24-Hour Discovery Response'].map(text => <span key={text} className="flex items-center gap-2"><span className="text-accent" aria-hidden="true">?</span>{text}</span>)}
      </div>
    </Card>
  </section>
);
