import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { BriefcaseBusiness, Building2, ClipboardList } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { SectionHeading } from '../components/common/SectionHeading';
import { PageTransition } from '../components/layout/PageTransition';
import { StaffingCapabilitiesOrbit } from './StaffingCapabilitiesOrbit';
import type { ServiceItem } from '../types';
import './WorkforceSolutionsPage.css';

const offeringIcons = [BriefcaseBusiness, ClipboardList, Building2];
const workforcePoster = `${import.meta.env.BASE_URL}images/services/workforce-solutions-video-poster.webp`;
const workforceVideo = `${import.meta.env.BASE_URL}videos/workforce-solutions-hero.webm`;

function WorkforceHeroMedia() {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !window.IntersectionObserver) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => { /* Keep the poster when playback is blocked. */ });
      else video.pause();
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reducedMotion]);

  return (
    <div className="workforce-hero-media" aria-hidden="true">
      <img src={workforcePoster} alt="" width={1280} height={720} fetchPriority="high" />
      {!reducedMotion && (
        <video
          ref={videoRef}
          src={workforceVideo}
          poster={workforcePoster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          data-visible={hasFrame}
          onPlaying={() => setHasFrame(true)}
          onError={() => setHasFrame(false)}
        />
      )}
    </div>
  );
}

export function WorkforceSolutionsPage({ service }: { service: ServiceItem }) {
  return (
    <PageTransition revealServiceText>
      <div className="workforce-page">
        <section className="workforce-hero" aria-labelledby="workforce-hero-title">
          <div className="workforce-wrap workforce-hero-content">
            <div className="workforce-hero-copy">
              <Breadcrumbs items={[{ label: 'Services', path: '/services' }, { label: 'Workforce Solutions' }]} />
              <p className="mt-2.5 font-mono text-xs font-bold tracking-[0.2em] text-accent-text uppercase">Workforce Solutions</p>
              <h1 id="workforce-hero-title" className="mt-2.5 mb-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-[3.35rem]">
                {service.tagline}
              </h1>
              <div className="grid max-w-xl gap-3 text-sm leading-relaxed text-muted sm:text-base">
                {service.fullDesc.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
              <div className="workforce-actions">
                <a className="btn-primary" href="#capabilities">Explore Services</a>
                <a className="btn-secondary" href="#enterprise-process">Our Process</a>
              </div>
            </div>
          </div>
          <WorkforceHeroMedia />
        </section>

        <section className="workforce-wrap workforce-section" id="capabilities">
          <SectionHeading title={service.offeringsTitle || 'Our Other Services Offered'} description={service.offeringsSubtitle} align="center" />
          <div className="workforce-offerings">
            {service.capabilities.map(({ title, description, points }, index) => {
              const Icon = offeringIcons[index];
              return (
                <article className="workforce-offering" key={title}>
                  <Icon className="workforce-offering-icon" aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                  {points?.length ? <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul> : null}
                </article>
              );
            })}
          </div>
        </section>

        <EnterpriseArchitectureJourney
          title={service.processTitle || 'Why Choose Prakvi for Workforce Solutions?'}
          description={service.processSubtitle || ''}
          steps={service.deliverySteps}
          ariaLabel="Workforce Solutions"
        />

        <StaffingCapabilitiesOrbit
          title={service.stackTitle || 'Workforce Solutions'}
          description={service.stackSummary || ''}
          tabs={service.stackTabs || []}
          idPrefix="workforce-solution-capability"
        />

      </div>
    </PageTransition>
  );
}
