import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';
import { ButtonLink } from '../ui/Button';
import './CTASection.css';

interface CTASectionProps {
  titleAccent?: string;
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  immersive?: boolean;
  compact?: boolean;
}

export const CTASection: React.FC<CTASectionProps> = ({
  titleAccent,
  title = "Let's Start Your Digital Transformation",
  subtitle = 'Get in touch with us today to discuss your project requirements and discover how we can help your business grow.',
  primaryButtonText = 'Schedule Consultation',
  primaryButtonLink = '/contact',
  secondaryButtonText = 'Explore Services',
  secondaryButtonLink = '/services',
  immersive = false,
  compact = false,
}) => {
  const reducedMotion = useReducedMotion();

  return (
    <section className={`relative overflow-hidden px-4 sm:px-6 lg:px-8 ${compact ? 'pt-5 pb-section sm:pt-8' : 'py-section'} ${immersive ? 'about-cta' : 'bg-canvas'}`}>
      {immersive && (
        <motion.div
          className="about-cta-trails"
          aria-hidden="true"
          whileInView={reducedMotion ? undefined : { x: [-10, 12, -10], y: [0, -5, 0] }}
          transition={{ duration: 10, ease: 'easeInOut', repeat: Infinity }}
        />
      )}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: immersive ? 0 : 18, scale: immersive ? 0.96 : 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reducedMotion ? 0 : 0.48, ease: [0.32, 0.72, 0, 1] }}
        className={`relative mx-auto max-w-6xl text-center ${immersive ? 'about-cta-content' : 'consultation-card rounded-[2rem] border border-accent/25 px-6 py-12 sm:px-12 sm:py-16'}${compact ? ' consultation-card--interactive' : ''}`}
        style={immersive ? undefined : {
          background:
            'linear-gradient(150deg, #FFFFFF 0%, color-mix(in srgb, var(--theme-soft-blue) 88%, #FFFFFF) 60%, color-mix(in srgb, var(--theme-lavender) 55%, #FFFFFF) 100%)',
        }}
      >
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-accent-text">
          Prakvi Techno Solutions
        </div>
        <h2 className="mx-auto max-w-4xl font-display text-3xl font-extrabold leading-tight text-foreground text-balance sm:text-4xl lg:text-5xl">
          {title}
          {titleAccent && <> <span className="text-accent-text">{titleAccent}</span></>}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
          <ButtonLink to={primaryButtonLink} variant="primary">
            <MessageSquare aria-hidden="true" />
            <span>{primaryButtonText}</span>
            <ArrowRight className="arrow-shift" aria-hidden="true" />
          </ButtonLink>
          <ButtonLink to={secondaryButtonLink} variant="blue">
            <span>{secondaryButtonText}</span>
            <ArrowRight className="arrow-shift" aria-hidden="true" />
          </ButtonLink>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-accent/15 pt-7 text-xs font-medium text-muted">
          {[
            '99.9% Uptime Reliability',
            '24/7 Monitoring & Support',
            'Delhi & Nashik Delivery Centers',
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-accent shrink-0" aria-hidden="true" />
              <span>{item}</span>
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
