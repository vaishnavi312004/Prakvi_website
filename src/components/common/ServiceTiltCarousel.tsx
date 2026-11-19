import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import TiltedCard from './TiltedCard';

export interface ServiceCarouselItem {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  category: string;
  href: string;
}

interface CarouselGeometry {
  step: number;
  cardWidth: number;
  viewportWidth: number;
  maxDrag: number;
  maxIndex: number;
  visibleCount: number;
}

const initialGeometry: CarouselGeometry = {
  step: 0,
  cardWidth: 0,
  viewportWidth: 0,
  maxDrag: 0,
  maxIndex: 0,
  visibleCount: 1,
};

const ServiceSlide: React.FC<{
  item: ServiceCarouselItem;
  index: number;
  count: number;
  activeIndex: number;
  geometry: CarouselGeometry;
  trackX: MotionValue<number>;
}> = ({ item, index, count, activeIndex, geometry, trackX }) => {
  const reducedMotion = useReducedMotion();
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const distanceFromCenter = useTransform(trackX, (value) => {
    if (reducedMotion || geometry.step === 0) return 0;
    const offsetFromCenter =
      index * geometry.step + value + geometry.cardWidth / 2 - geometry.viewportWidth / 2;
    return Math.max(-2, Math.min(2, offsetFromCenter / geometry.step));
  });
  const rotateY = useTransform(distanceFromCenter, (distance) => -distance * 13);
  const depthScale = useTransform(distanceFromCenter, (distance) => 1 - Math.abs(distance) * 0.045);
  const depthY = useTransform(distanceFromCenter, (distance) => Math.abs(distance) * 8);
  const offset = Math.min(activeIndex * geometry.step, geometry.maxDrag);
  const outsideView = geometry.step > 0 && (
    index * geometry.step + geometry.cardWidth <= offset ||
    index * geometry.step >= offset + geometry.viewportWidth
  );

  return (
    <motion.article
      role="group"
      aria-roledescription="slide"
      aria-label={`${item.title}, ${index + 1} of ${count}`}
      aria-hidden={outsideView || undefined}
      inert={outsideView}
      className="service-tilt-carousel__slide"
      initial={reducedMotion ? false : { opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : Math.min(index % Math.max(1, geometry.visibleCount), 3) * 0.1 }}
    >
      <motion.div
        className="service-tilt-carousel__depth"
        style={{ rotateY, scale: depthScale, y: depthY, transformPerspective: 1100 }}
      >
      <div className="service-tilt-carousel__lift">
      <TiltedCard
        containerWidth="100%"
        containerHeight="100%"
        rotateAmplitude={3.5}
        scaleOnHover={1.015}
        glare={0.18}
        shadow={0.28}
        className="service-tilt-carousel__tilt"
      >
        <Link
          to={item.href}
          className="service-tilt-card"
          aria-label={`Explore ${item.title}`}
          draggable={false}
          onPointerDown={(event) => { pointerStart.current = { x: event.clientX, y: event.clientY }; }}
          onClick={(event) => {
            const start = pointerStart.current;
            // A swipe moves the carousel; only a click/tap opens the service.
            if (event.detail > 0 && start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 8) {
              event.preventDefault();
            }
            pointerStart.current = null;
          }}
        >
          <img
            className="service-tilt-card__image"
            src={item.image}
            alt={item.imageAlt}
            width={720}
            height={480}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
          <div className="service-tilt-card__content">
            <span className="service-tilt-card__category">{item.category}</span>
            <h3 className="service-tilt-card__title">{item.title}</h3>
            <div className="service-tilt-card__reveal" id={`service-details-${item.id}`}>
            <p className="service-tilt-card__description">{item.description}</p>
            <span className="service-tilt-card__link" aria-hidden="true">
              <span>Explore {item.title}</span>
              <ArrowRight size={17} aria-hidden="true" />
            </span>
            </div>
          </div>
        </Link>
      </TiltedCard>
      </div>
      </motion.div>
    </motion.article>
  );
};

export const ServiceTiltCarousel: React.FC<{
  items: ServiceCarouselItem[];
  label: string;
}> = ({ items, label }) => {
  const reducedMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const trackX = useMotionValue(0);
  const trackOpacity = useMotionValue(1);
  const wrappingRef = useRef(false);
  const [wrapping, setWrapping] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [geometry, setGeometry] = useState(initialGeometry);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const firstSlide = track?.firstElementChild as HTMLElement | null;
    if (!viewport || !track || !firstSlide) return;

    const cardWidth = firstSlide.offsetWidth;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = cardWidth + gap;
    const viewportWidth = viewport.clientWidth;
    const trackWidth = items.length * cardWidth + Math.max(0, items.length - 1) * gap;
    const maxDrag = Math.max(0, trackWidth - viewportWidth);
    const nextGeometry = {
      step,
      cardWidth,
      viewportWidth,
      maxDrag,
      maxIndex: step > 0 ? Math.ceil(maxDrag / step) : 0,
      visibleCount: step > 0 ? Math.max(1, Math.ceil(viewportWidth / step)) : 1,
    };

    setGeometry((current) =>
      current.step === nextGeometry.step &&
      current.cardWidth === nextGeometry.cardWidth &&
      current.viewportWidth === nextGeometry.viewportWidth &&
      current.maxDrag === nextGeometry.maxDrag &&
      current.maxIndex === nextGeometry.maxIndex &&
      current.visibleCount === nextGeometry.visibleCount
        ? current
        : nextGeometry,
    );
    setActiveIndex((current) => Math.min(current, nextGeometry.maxIndex));
  }, [items.length]);

  useEffect(() => {
    measure();
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    observer?.observe(viewport);
    observer?.observe(track);
    window.addEventListener('resize', measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure, items.length]);

  const targetX = -Math.min(activeIndex * geometry.step, geometry.maxDrag);
  useEffect(() => {
    const animation = animate(
      trackX,
      targetX,
      reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 36 },
    );
    return () => animation.stop();
  }, [reducedMotion, targetX, trackX]);

  if (items.length === 0) return null;

  const goToIndex = (index: number) => {
    if (wrappingRef.current) return;
    const nextIndex = Math.max(0, Math.min(index, geometry.maxIndex));
    setActiveIndex(nextIndex);
    // Snap back even when a short drag resolves to the current index.
    animate(trackX, -Math.min(nextIndex * geometry.step, geometry.maxDrag),
      reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 340, damping: 36 });
  };

  const move = async (direction: number) => {
    if (wrappingRef.current) return;
    const next = activeIndex + direction;
    if (next >= 0 && next <= geometry.maxIndex) {
      goToIndex(next);
      return;
    }
    // Crossfade at the boundary rather than racing across the entire catalog.
    wrappingRef.current = true;
    setWrapping(true);
    try {
      await animate(trackOpacity, 0, { duration: reducedMotion ? 0 : 0.12 });
      const wrappedIndex = next < 0 ? geometry.maxIndex : 0;
      trackX.set(-Math.min(wrappedIndex * geometry.step, geometry.maxDrag));
      setActiveIndex(wrappedIndex);
      await animate(trackOpacity, 1, { duration: reducedMotion ? 0 : 0.18 });
    } finally {
      wrappingRef.current = false;
      setWrapping(false);
    }
  };

  return (
    <div
      ref={viewportRef}
      className="service-tilt-carousel"
      role="region"
      aria-label={`${label} carousel`}
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          void move(1);
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          void move(-1);
        } else if (event.key === 'Home') {
          event.preventDefault();
          goToIndex(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          goToIndex(geometry.maxIndex);
        }
      }}
    >
      <motion.div
        ref={trackRef}
        className="service-tilt-carousel__track"
        drag={geometry.maxDrag > 0 && !wrapping ? 'x' : false}
        dragConstraints={{ left: -geometry.maxDrag, right: 0 }}
        dragElastic={0.06}
        dragMomentum={false}
        style={{ x: trackX, opacity: trackOpacity }}
        onDragStart={() => trackX.stop()}
        onDragEnd={(_event, info) => {
          if (geometry.step === 0) return;
          const projectedX = Math.max(
            -geometry.maxDrag,
            Math.min(0, trackX.get() + info.velocity.x * 0.12),
          );
          goToIndex(Math.round(-projectedX / geometry.step));
        }}
      >
        {items.map((item, index) => (
          <ServiceSlide
            key={item.id}
            item={item}
            index={index}
            count={items.length}
            activeIndex={activeIndex}
            geometry={geometry}
            trackX={trackX}
          />
        ))}
      </motion.div>

      {geometry.maxIndex > 0 && (
        <div className="service-tilt-carousel__navigation">
          <div className="service-tilt-carousel__arrows">
            <button type="button" className="service-tilt-carousel__arrow" aria-label="Previous services" disabled={wrapping} onClick={() => void move(-1)}>
              <ArrowLeft size={18} aria-hidden="true" />
            </button>
            <span className="service-tilt-carousel__counter" role="status" aria-live="polite" aria-atomic="true">
              {String(Math.floor(Math.min(activeIndex * geometry.step, geometry.maxDrag) / geometry.step) + 1).padStart(2, '0')} / {items.length}
            </span>
            <button type="button" className="service-tilt-carousel__arrow" aria-label="Next services" disabled={wrapping} onClick={() => void move(1)}>
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="service-tilt-carousel__dots" aria-label={`${label} carousel pagination`}>
          {Array.from({ length: geometry.maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              type="button"
              className="service-tilt-carousel__dot"
              aria-label={`Show ${label} cards starting at position ${index + 1}`}
              aria-current={activeIndex === index ? 'true' : undefined}
              disabled={wrapping}
              onClick={() => goToIndex(index)}
            />
          ))}
          </div>
        </div>
      )}
      <p className="service-tilt-carousel__hint">Drag or swipe to explore, or use the arrow keys.</p>
    </div>
  );
};
