import { useEffect, useRef, useState, type CSSProperties, type TouchEvent } from 'react';
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { PracticeServiceArtwork, practiceCardTones, type PracticeCardTheme } from './PracticeServiceArtwork';
import { SectionHeading } from './SectionHeading';
import {
  getServiceCardDepthOrder,
  getServiceCardOpacity,
  getServiceCardTransform,
  ServiceCardClock,
  serviceCardEase,
  serviceCardEntranceDelay,
  serviceCardSelectionDuration,
  wrapServiceCardProgress,
} from './ServiceCardMotion';
import './PracticeServiceArtwork.css';

interface PracticeService {
  title: string;
  description: string;
}

interface VerticalAnimatedServiceCardsProps {
  title: string;
  description: string;
  cards: readonly PracticeService[];
  theme: PracticeCardTheme;
  icons: readonly LucideIcon[];
  detailIcons?: LucideIcon[][];
}

function MovingServiceCard({
  card,
  index,
  count,
  theme,
  icon: Icon,
  detailIcons,
  progress,
  reduced,
  inView,
}: {
  card: PracticeService;
  index: number;
  count: number;
  theme: PracticeCardTheme;
  icon: LucideIcon;
  detailIcons: LucideIcon[];
  progress: MotionValue<number>;
  reduced: boolean;
  inView: boolean;
}) {
  const offset = useTransform(progress, value => {
    // Reposition the farthest card outside the viewport, keeping one copy of each card.
    return (wrapServiceCardProgress((index / count) - value + 0.5) - 0.5) * count;
  });
  const transform = useTransform(offset, distance => (
    `translateY(calc(${distance * 100}% + ${distance} * var(--practice-card-gap))) ${getServiceCardTransform(distance, 'X')}`
  ));
  const opacity = useTransform(offset, getServiceCardOpacity);
  const zIndex = useTransform(offset, getServiceCardDepthOrder);
  const tones = practiceCardTones[theme];
  const animationStyle = {
    '--practice-main-duration': `${5 + (index % 4) * 0.45}s`,
    '--practice-side-one-duration': `${4.4 + (index % 3) * 0.55}s`,
    '--practice-side-two-duration': `${5.6 + (index % 3) * 0.4}s`,
    '--practice-route-duration': `${3.1 + (index % 3) * 0.55}s`,
    '--practice-motion-delay': `${index * -0.42}s`,
  } as CSSProperties;

  return (
    <motion.div className="practice-service-slot" style={reduced ? undefined : { transform, opacity, zIndex }}>
      <motion.article
        className="practice-service-card"
        data-practice={theme}
        data-index={index}
        data-tone={tones[index % tones.length]}
        style={animationStyle}
        onPointerMove={event => {
          if (reduced || event.pointerType === 'touch') return;
          const { left, top } = event.currentTarget.getBoundingClientRect();
          event.currentTarget.style.setProperty('--spot-x', `${event.clientX - left}px`);
          event.currentTarget.style.setProperty('--spot-y', `${event.clientY - top}px`);
        }}
        whileHover={reduced ? undefined : { y: -5 }}
      >
        <PracticeServiceArtwork theme={theme} index={index} icon={Icon} detailIcons={detailIcons} animate={inView && !reduced} />
        <div className="practice-service-card-body">
          <div className="practice-service-card-heading">
            <div className="practice-service-card-icon"><Icon className="w-6 h-6" aria-hidden="true" /></div>
            <h3 className="font-display text-lg font-bold text-foreground leading-snug">{card.title}</h3>
          </div>
          <p className="text-sm text-muted leading-relaxed">{card.description}</p>
        </div>
      </motion.article>
    </motion.div>
  );
}

export function VerticalAnimatedServiceCards({ title, description, cards, theme, icons, detailIcons }: VerticalAnimatedServiceCardsProps) {
  const viewport = useRef<HTMLDivElement>(null);
  const reduced = Boolean(useReducedMotion());
  const inView = useInView(viewport, { amount: 0.08 });
  const progress = useMotionValue(0);
  const [ready, setReady] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [selecting, setSelecting] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const selection = useRef<{ stop: () => void } | null>(null);
  const resumeTimer = useRef<number | undefined>(undefined);
  const count = cards.length;
  const moving = count > 1 && inView && ready && !reduced && !hovered && !focused && !touching && !selecting;

  useEffect(() => {
    if (!inView || ready || reduced) return;
    const timeout = window.setTimeout(() => setReady(true), serviceCardEntranceDelay);
    return () => window.clearTimeout(timeout);
  }, [inView, ready, reduced]);

  useEffect(() => () => {
    selection.current?.stop();
    window.clearTimeout(resumeTimer.current);
  }, []);

  const step = (direction: number, hold = false) => {
    if (count < 2 || reduced) return;
    selection.current?.stop();
    window.clearTimeout(resumeTimer.current);
    setSelecting(true);
    const target = (Math.round(progress.get() * count) + direction) / count;
    selection.current = animate(progress, target, {
      duration: serviceCardSelectionDuration,
      ease: serviceCardEase,
      onComplete: () => {
        progress.set(wrapServiceCardProgress(target));
        if (hold) {
          resumeTimer.current = window.setTimeout(() => setSelecting(false), serviceCardEntranceDelay);
        } else {
          setSelecting(false);
        }
      },
    });
  };

  const clearTouch = () => {
    touchStart.current = null;
    setTouching(false);
  };

  const finishSwipe = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStart.current;
    clearTouch();
    if (!start) return;

    const touch = event.changedTouches[0];
    const x = touch.clientX - start.x;
    const y = touch.clientY - start.y;
    // The reference uses horizontal swipes, leaving vertical gestures to page scrolling.
    if (Math.abs(x) >= 48 && Math.abs(x) >= Math.abs(y) * 1.15) step(x < 0 ? 1 : -1, true);
  };

  return (
    <section id="capabilities" className="mobility-section practice-service-section relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading title={title} description={description} align="center" />
        <div
          ref={viewport}
          className={`mt-9 ${reduced ? 'mobility-services-grid practice-service-grid' : 'practice-service-viewport'}`}
          role="region"
          aria-label={title}
          tabIndex={!reduced && count > 1 ? 0 : undefined}
          data-moving={moving}
          onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
          onPointerLeave={event => { if (event.pointerType === 'mouse') setHovered(false); }}
          onFocus={event => setFocused(event.currentTarget.matches(':focus-visible'))}
          onBlur={() => setFocused(false)}
          onKeyDown={event => {
            const previous = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
            if (!previous && event.key !== 'ArrowDown' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            step(previous ? -1 : 1);
          }}
          onTouchStart={event => {
            if (reduced) return;
            const touch = event.changedTouches[0];
            touchStart.current = { x: touch.clientX, y: touch.clientY };
            setTouching(true);
          }}
          onTouchEnd={finishSwipe}
          onTouchCancel={clearTouch}
        >
          {moving && <ServiceCardClock progress={progress} count={count} />}
          {cards.map((card, index) => (
            <MovingServiceCard
              key={card.title}
              card={card}
              index={index}
              count={count}
              theme={theme}
              icon={icons[index] ?? icons[0] ?? ArrowRight}
              detailIcons={detailIcons?.[index] ?? []}
              progress={progress}
              reduced={reduced}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
