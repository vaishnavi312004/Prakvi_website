import { memo, useEffect, useId, useRef } from 'react';
import type { CSSProperties, ReactElement } from 'react';
import { integrationScenes, mobilityScenes, projectScenes, supplyScenes } from './practiceScenes';
import { marketingScenes, mobileScenes } from './growthScenes';
import { analyticsScenes, crmScenes, hrScenes, vendorScenes } from './businessScenes';
import './ServiceIllustration.css';

const collections = {
  'project-management': projectScenes,
  'mobility-practice': mobilityScenes,
  'supply-chain-management': supplyScenes,
  'system-integration': integrationScenes,
  'digital-marketing': marketingScenes,
  'mobile-app-development': mobileScenes,
  'data-analytics': analyticsScenes,
  'hr-management-system': hrScenes,
  'vendor-management': vendorScenes,
  'relationship-management': crmScenes,
} satisfies Record<string, Record<string, ReactElement>>;

export type IllustrationCollection = keyof typeof collections;

// Use one observer for the visible carousel. The SVG's clipping ancestors
// exclude the off-track copies without adding per-frame work to the track.
let visibilityObserver: IntersectionObserver | undefined;
let observedScenes = 0;

function observeScene(node: SVGSVGElement) {
  visibilityObserver ??= new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.setAttribute('data-animate', String(entry.isIntersecting && entry.intersectionRatio >= 0.25));
    }
  }, { threshold: 0.25 });
  visibilityObserver.observe(node);
  observedScenes += 1;
  return () => {
    visibilityObserver?.unobserve(node);
    node.removeAttribute('data-animate');
    observedScenes -= 1;
    if (observedScenes === 0) {
      visibilityObserver?.disconnect();
      visibilityObserver = undefined;
    }
  };
}

export const ServiceIllustration = memo(function ServiceIllustration({ collection, title, animate }: {
  collection: IllustrationCollection;
  title: string;
  animate: boolean;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId();
  // Some displays prefix titles with a dash. The stored wording stays intact.
  const key = title.replace(/^[–—]\s*/, '');
  const scenes: Record<string, ReactElement> = collections[collection];
  const scene = scenes[key];

  useEffect(() => {
    if (!scene || !ref.current || !animate || typeof IntersectionObserver === 'undefined') return;
    return observeScene(ref.current);
  }, [scene, animate]);

  if (!scene) return null;
  const variables = {
    '--art-glass': `url(#${id}-glass)`,
    '--art-ground': `url(#${id}-ground)`,
  } as CSSProperties;
  return (
    <svg ref={ref} className="svc-illustration" viewBox="0 0 320 180"
      data-collection={collection} data-service-scene={key}
      style={variables} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-glass`} x2=".82" y2="1">
          <stop stopColor="white" />
          <stop offset=".6" stopColor="var(--art-paper)" />
          <stop offset="1" stopColor="var(--art-panel-bottom)" />
        </linearGradient>
        <radialGradient id={`${id}-ground`}>
          <stop stopColor="var(--art-accent)" stopOpacity=".26" />
          <stop offset="1" stopColor="var(--art-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="161" rx="143" ry="16" className="art-ground" />
      {scene}
    </svg>
  );
});
