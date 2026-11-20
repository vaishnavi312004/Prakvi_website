import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  ChartNoAxesCombined,
  ClipboardCheck,
  Cloud,
  Compass,
  Database,
  GitBranch,
  Headset,
  Headphones,
  Handshake,
  Layers,
  Mail,
  MessagesSquare,
  Network,
  Paintbrush,
  PenLine,
  Plug,
  Search,
  Server,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Target,
  TrendingUp,
  Truck,
  Users,
  Warehouse,
  Wrench,
} from 'lucide-react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react';
import type { MotionValue } from 'motion/react';
import type { ServiceItem } from '../../types';
import { ScrollRevealText } from './ScrollRevealText';
import {
  getServiceCardDepthOrder,
  getServiceCardOpacity,
  getServiceCardTransform,
  ServiceCardClock,
  serviceCardEase as ease,
  serviceCardEntranceDelay,
  serviceCardSelectionDuration,
} from './ServiceCardMotion';
import { ServiceIllustration, type IllustrationCollection } from './serviceIllustrations/ServiceIllustration';
import './ArchitectureOfferingsWorkflow.css';

const serviceIcons = {
  Headphones, Server, Plug, Layers, Search, Target, Share2, PenLine, Mail, TrendingUp, ShieldCheck,
  Smartphone, Building2, ShoppingBag, GitBranch, Paintbrush, Wrench,
  CalendarDays, Handshake, MessagesSquare, BarChart3, Compass, ClipboardCheck, Headset, Network,
  Truck, Warehouse, ChartNoAxesCombined,
};
const revealViewport = { once: true, amount: 0.24 } as const;
type Offering = ServiceItem['capabilities'][number];

function getIcon(service: ServiceItem['capabilities'][number]) {
  return serviceIcons[service.icon as keyof typeof serviceIcons] ?? Layers;
}

function relativePosition(index: number, active: number, count: number, group: number) {
  const offset = group * count + index - (count + active);
  if (offset === 0) return { position: 'center', offset };
  if (offset === 1) return { position: 'right', offset };
  if (offset === -1) return { position: 'left', offset };
  if (Math.abs(offset) === 2) return { position: 'far', offset };
  return { position: 'hidden', offset };
}

function ServiceScene({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="ea-scene ea-scene-strategy" aria-hidden="true">
        <svg className="ea-scene-links" viewBox="0 0 320 190" fill="none">
          <path d="M92 68 156 49l68 34M92 68l33 77 99-62m-99 62 99 5" />
          <circle cx="92" cy="68" r="3" /><circle cx="156" cy="49" r="3" />
          <circle cx="224" cy="83" r="3" /><circle cx="125" cy="145" r="3" />
          <circle cx="224" cy="150" r="3" />
        </svg>
        <div className="ea-strategy-module ea-strategy-module-main"><Layers /></div>
        <div className="ea-strategy-module ea-strategy-module-top"><Activity /></div>
        <div className="ea-strategy-module ea-strategy-module-left"><Database /></div>
        <div className="ea-strategy-module ea-strategy-module-right"><Network /></div>
        <i className="ea-scene-particle ea-scene-particle-one" />
        <i className="ea-scene-particle ea-scene-particle-two" />
        <i className="ea-scene-particle ea-scene-particle-three" />
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="ea-scene ea-scene-infrastructure" aria-hidden="true">
        <div className="ea-infra-cloud"><Cloud /></div>
        <div className="ea-infra-racks">
          {[0, 1, 2].map(rack => (
            <div className="ea-infra-rack" key={rack}>
              <span><i /><i /><i /></span>
              <span><i /><i /><i /></span>
              <span><i /><i /><i /></span>
            </div>
          ))}
        </div>
        <div className="ea-infra-node ea-infra-node-one" />
        <div className="ea-infra-node ea-infra-node-two" />
        <div className="ea-infra-node ea-infra-node-three" />
        <i className="ea-infra-packet ea-infra-packet-one" />
        <i className="ea-infra-packet ea-infra-packet-two" />
      </div>
    );
  }

  if (index === 2) {
    return (
      <div className="ea-scene ea-scene-integration" aria-hidden="true">
        <svg className="ea-scene-links" viewBox="0 0 320 190" fill="none">
          <path d="M83 96h61m32 0h61M160 66v60" />
          <circle cx="144" cy="96" r="4" /><circle cx="176" cy="96" r="4" />
        </svg>
        <div className="ea-integration-module ea-integration-left"><Database /></div>
        <div className="ea-integration-module ea-integration-center"><Network /></div>
        <div className="ea-integration-module ea-integration-right"><Cloud /></div>
        <div className="ea-integration-module ea-integration-bottom"><Layers /></div>
        <i className="ea-integration-packet ea-integration-packet-one" />
        <i className="ea-integration-packet ea-integration-packet-two" />
      </div>
    );
  }

  return (
    <div className="ea-scene ea-scene-enterprise" aria-hidden="true">
      <div className="ea-dashboard">
        <div className="ea-dashboard-top"><span /><span /><span /><i><Users /></i></div>
        <div className="ea-dashboard-content">
          <div className="ea-dashboard-sidebar"><i /><i /><i /><i /></div>
          <div className="ea-dashboard-main">
            <div className="ea-dashboard-metrics"><span /><span /><span /></div>
            <div className="ea-dashboard-chart">
              <i /><i /><i /><i /><i /><i />
            </div>
          </div>
        </div>
      </div>
      <div className="ea-enterprise-customer"><Users /></div>
      <div className="ea-enterprise-chart"><BarChart3 /></div>
      <i className="ea-enterprise-spark ea-enterprise-spark-one" />
      <i className="ea-enterprise-spark ea-enterprise-spark-two" />
    </div>
  );
}

function ServiceCard({
  service,
  index,
  count,
  group,
  activeIndex,
  selectedIndex,
  reduced,
  iconScene,
  illustrationCollection,
  animateArtwork,
  progress,
  onSelect,
  onPreview,
  onClearPreview,
}: {
  service: Offering;
  index: number;
  count: number;
  group: number;
  activeIndex: number;
  selectedIndex: number;
  reduced: boolean;
  iconScene: boolean;
  illustrationCollection?: IllustrationCollection;
  animateArtwork: boolean;
  progress: MotionValue<number>;
  onSelect: (index: number) => void;
  onPreview: (index: number) => void;
  onClearPreview: () => void;
}) {
  const Icon = getIcon(service);
  const delay = `${index * -1.35}s`;
  const position = relativePosition(index, activeIndex, count, group);
  const globalIndex = group * count + index;
  const depthOffset = (value: number) => globalIndex - count - count * value;
  const depthTransform = useTransform(progress, value => getServiceCardTransform(depthOffset(value), 'Y'));
  const depthOpacity = useTransform(progress, value => getServiceCardOpacity(depthOffset(value)));
  const depthOrder = useTransform(progress, value => getServiceCardDepthOrder(depthOffset(value)));

  return (
    <motion.div
      className="ea-gallery-card"
      data-service={index}
      data-position={position.position}
      data-offset={position.offset}
      data-selected={selectedIndex === index}
      style={{
        transform: reduced ? 'none' : depthTransform,
        opacity: reduced ? 1 : depthOpacity,
        zIndex: reduced ? 1 : depthOrder,
      }}
    >
      <motion.div
        className="ea-gallery-card-entry"
        initial={reduced || group !== 1 ? false : { opacity: 0.86, y: 25, x: index % 2 ? 22 : -22 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        viewport={revealViewport}
        transition={{ duration: reduced ? 0 : 0.72, delay: reduced ? 0 : 0.12 + index * 0.09 + group * 0.04, ease }}
      >
        <div
          className="ea-gallery-card-float"
          style={{
            '--ea-float-delay': delay,
            '--ea-float-duration': `${6.1 + index * 0.47}s`,
          } as React.CSSProperties}
        >
          <button
            type="button"
            className="ea-gallery-card-surface"
            tabIndex={group === 1 && selectedIndex === index ? 0 : -1}
            aria-pressed={selectedIndex === index}
            onClick={() => onSelect(index)}
            onFocus={() => onSelect(index)}
            onPointerEnter={event => { if (event.pointerType === 'mouse') onPreview(index); }}
            onPointerLeave={event => { if (event.pointerType === 'mouse') onClearPreview(); }}
            onKeyDown={event => {
              if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                onSelect((index + count - 1) % count);
              } else if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                onSelect((index + 1) % count);
              }
            }}
          >
            <div className="ea-gallery-scene">
              {illustrationCollection ? (
                <ServiceIllustration collection={illustrationCollection} title={service.title} animate={animateArtwork} />
              ) : iconScene ? (
                <div className="ea-scene ea-gallery-icon-scene" aria-hidden="true"><span><Icon /></span></div>
              ) : <ServiceScene index={index} />}
              <span className="ea-gallery-scene-glint" />
            </div>
            <div className="ea-gallery-card-copy">
              <span className="ea-gallery-card-meta">
                <Icon aria-hidden="true" />
                <span>{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
              </span>
              <h3><ScrollRevealText text={service.title} preserveLayout /></h3>
            </div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceDetailCopy({ service }: { service: Offering }) {
  return (
    <div className="ea-gallery-detail-copy">
      <h3><ScrollRevealText text={service.title} preserveLayout /></h3>
      <p>{service.description}</p>
      {service.points?.length ? (
        <ul>{service.points.map(point => <li key={point}>{point}</li>)}</ul>
      ) : null}
    </div>
  );
}

function ServiceDetails({
  service,
  services,
  index,
  count,
  reduced,
  onSelect,
}: {
  service: Offering;
  services: Offering[];
  index: number;
  count: number;
  reduced: boolean;
  onSelect: (index: number) => void;
}) {
  const Icon = getIcon(service);
  const previous = (index - 1 + count) % count;
  const next = (index + 1) % count;

  return (
    <div className="ea-gallery-details">
      <div className="ea-gallery-details-content">
        <div className="ea-gallery-measurement" aria-hidden="true">
          {services.map(item => (
            <div key={item.title} className="ea-gallery-detail">
              <div className="ea-gallery-detail-icon" />
              <ServiceDetailCopy service={item} />
            </div>
          ))}
        </div>
        <div className="ea-gallery-live-detail" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={service.title}
              className="ea-gallery-detail"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: reduced ? 0 : serviceCardSelectionDuration, ease }}
            >
              <div className="ea-gallery-detail-icon"><Icon aria-hidden="true" /></div>
              <ServiceDetailCopy service={service} />
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
      <div className="ea-gallery-navigation" aria-label="Select a service">
        <button type="button" aria-label="Previous service" onClick={() => onSelect(previous)}>
          <ArrowLeft aria-hidden="true" />
        </button>
        <span>{String(index + 1).padStart(2, '0')} <i>/</i> {String(count).padStart(2, '0')}</span>
        <button type="button" aria-label="Next service" onClick={() => onSelect(next)}>
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

interface ArchitectureOfferingsWorkflowProps {
  id?: string;
  title: string;
  description?: string;
  services: Offering[];
  palette?: 'mobile-app' | 'digital-marketing' | 'project-management' | 'mobility' | 'supply' | 'integration';
  illustrationCollection?: IllustrationCollection;
}

export function ArchitectureOfferingsWorkflow({
  id = 'capabilities', title, description, services, palette, illustrationCollection,
}: ArchitectureOfferingsWorkflowProps) {
  const headingId = useId();
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualIndex, setManualIndex] = useState<number | null>(null);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === 'undefined' || !document.hidden);
  const [ready, setReady] = useState(false);
  const reduced = Boolean(useReducedMotion());
  const inView = useInView(section, { amount: 0.08 });
  const progress = useMotionValue(0);
  const trackOffset = useTransform(progress, value => `${-33.333333 - 33.333334 * value}%`);
  const moving = inView && pageVisible && ready && !reduced && !hovering && !focused;
  const visible = inView && pageVisible && !reduced;
  const selectedIndex = previewIndex ?? manualIndex ?? activeIndex;
  const selectedService = services[selectedIndex] ?? services[0];

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden);
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => document.removeEventListener('visibilitychange', updateVisibility);
  }, []);

  useEffect(() => {
    if (!inView || ready) return;
    if (reduced) {
      setReady(true);
      return;
    }
    const entranceDelay = window.setTimeout(() => setReady(true), serviceCardEntranceDelay);
    return () => window.clearTimeout(entranceDelay);
  }, [inView, ready, reduced]);

  const selectManually = (index: number) => {
    setManualIndex((index + services.length) % services.length);
  };

  const updateActiveService = (index: number) => {
    setManualIndex(null);
    setActiveIndex(index);
  };

  const startSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const finishSwipe = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart.current) return;
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) < Math.abs(deltaY) * 1.15) return;
    selectManually((selectedIndex + (deltaX < 0 ? 1 : -1) + services.length) % services.length);
  };

  return (
    <section
      ref={section}
      id={id}
      className="ea-offerings"
      aria-labelledby={headingId}
      tabIndex={palette ? -1 : undefined}
      data-palette={palette}
      data-visible={visible}
      data-reduced={reduced}
    >
      <div className="ea-workflow-inner">
        <header className="ea-workflow-heading">
          <motion.h2
            id={headingId}
            initial={reduced ? false : { opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: reduced ? 0 : 0.62, ease }}
          ><ScrollRevealText text={title} preserveLayout /></motion.h2>
          {description && <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={revealViewport}
            transition={{ duration: reduced ? 0 : 0.61, delay: reduced ? 0 : 0.13, ease }}
          >{description}</motion.p>}
        </header>

        <div
          className="ea-gallery-stage"
          data-moving={moving}
          onPointerEnter={event => { if (event.pointerType === 'mouse') setHovering(true); }}
          onPointerLeave={event => {
            if (event.pointerType === 'mouse') {
              setHovering(false);
              setPreviewIndex(null);
            }
          }}
          onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
          }}
        >
          {moving && services.length > 1 && (
            <ServiceCardClock progress={progress} count={services.length} onActiveChange={updateActiveService} />
          )}
          <div
            className="ea-gallery-viewport"
            aria-label={title}
            onTouchStart={startSwipe}
            onTouchEnd={finishSwipe}
          >
            <motion.div
              className="ea-gallery-track"
              data-moving={moving}
              style={{ x: reduced ? '0%' : trackOffset, y: reduced ? '0%' : '-50%' }}
            >
              {[0, 1, 2].map(group => (
                <div
                  className="ea-gallery-set"
                  key={group}
                  data-primary={group === 1}
                  aria-hidden={group !== 1}
                >
                  {services.map((service, index) => (
                    <ServiceCard
                      key={`${group}-${service.title}`}
                      service={service}
                      index={index}
                      count={services.length}
                      group={group}
                      activeIndex={activeIndex}
                      selectedIndex={selectedIndex}
                      reduced={reduced}
                      iconScene={Boolean(palette)}
                      illustrationCollection={illustrationCollection}
                      animateArtwork={visible}
                      progress={progress}
                      onSelect={index => {
                        selectManually(index);
                        setPreviewIndex(index);
                      }}
                      onPreview={setPreviewIndex}
                      onClearPreview={() => setPreviewIndex(null)}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          </div>

          {selectedService && (
            <ServiceDetails
              service={selectedService}
              services={services}
              index={selectedIndex}
              count={services.length}
              reduced={reduced}
              onSelect={index => {
                selectManually(index);
                setPreviewIndex(null);
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
