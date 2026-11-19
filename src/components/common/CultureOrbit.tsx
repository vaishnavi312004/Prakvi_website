import React, { useCallback, useLayoutEffect, useRef, type RefObject } from 'react';
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { continuousOrbitStep, useOrbitAngle } from './orbitMotion';
import './CultureOrbit.css';

type CultureCard = { id: string; title: string; desc: string; Icon: LucideIcon };

const revolutionMs = 28000;
const camera = 2800;
const maxYaw = 13;
const maxPitch = 6;

export function getCultureWheelGeometry(width: number, cardWidth: number, cardHeight: number) {
  const radius = Math.max(cardHeight * 1.24, Math.min(325, Math.max(224, width * 0.285)));
  const edgeDepth = (cardWidth * Math.sin(maxYaw * Math.PI / 180) + cardHeight * Math.sin(maxPitch * Math.PI / 180)) / 2;
  const maxProjection = camera / (camera - radius - edgeDepth);
  // Turn the same vertical circle toward its side on narrow screens to keep the cards inside the stage.
  const horizontal = Math.min(radius * 0.965, Math.max(0, (width / 2 - 9) / maxProjection - cardWidth / 2));

  return {
    radius,
    horizontal,
    depth: Math.sqrt(radius ** 2 - horizontal ** 2),
    height: (radius * 2 + cardHeight) * 1.045 + 40,
  };
}

type WheelGeometry = ReturnType<typeof getCultureWheelGeometry>;

export function getCultureWheelPose(angle: number, geometry: WheelGeometry) {
  const side = Math.sin(angle);
  const vertical = Math.cos(angle);
  return {
    x: side * geometry.horizontal,
    y: -vertical * geometry.radius,
    z: side * geometry.depth,
    yaw: -side * maxYaw,
    pitch: vertical * maxPitch,
  };
}

function WheelCard({ card, index, count, phase, geometry, hovered, reduced }: {
  card: CultureCard;
  index: number;
  count: number;
  phase: MotionValue<number>;
  geometry: MotionValue<WheelGeometry>;
  hovered: RefObject<HTMLElement | null>;
  reduced: boolean;
}) {
  const angle = useOrbitAngle(phase, index, count, 0);
  const transform = useTransform(() => {
    const { x, y, z, yaw, pitch } = getCultureWheelPose(angle.get(), geometry.get());
    return `translate3d(${x}px, ${y}px, ${z}px) rotateY(${yaw}deg) rotateX(${pitch}deg)`;
  });
  const { Icon } = card;

  return (
    <motion.article className="culture-wheel-card" style={reduced ? undefined : { transform }}>
      <div
        className="culture-wheel-surface"
        onPointerEnter={event => { if (event.pointerType === 'mouse') hovered.current = event.currentTarget; }}
        onPointerLeave={event => { if (hovered.current === event.currentTarget) hovered.current = null; }}
        onPointerCancel={event => { if (hovered.current === event.currentTarget) hovered.current = null; }}
      >
        <div className="culture-wheel-card-heading">
          <span className="culture-wheel-icon"><Icon aria-hidden="true" /></span>
          <h3>{card.title}</h3>
        </div>
        <p>{card.desc}</p>
      </div>
    </motion.article>
  );
}

function WheelRotation({ phase, hovered }: { phase: MotionValue<number>; hovered: RefObject<HTMLElement | null> }) {
  useAnimationFrame(useCallback((_time: number, delta: number) => {
    if (!hovered.current) phase.set(phase.get() + continuousOrbitStep(delta, revolutionMs, 1));
  }, [hovered, phase]));
  return null;
}

export function CultureOrbit({ cards }: { cards: CultureCard[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const plane = useRef<HTMLDivElement>(null);
  const hovered = useRef<HTMLElement | null>(null);
  const hasAppeared = useInView(stage, { once: true });
  const reduced = Boolean(useReducedMotion());
  const phase = useMotionValue(15);
  const geometry = useMotionValue(getCultureWheelGeometry(1080, 308, 182));
  const height = useTransform(geometry, value => value.height);

  useLayoutEffect(() => {
    const viewport = stage.current;
    const stack = plane.current;
    const firstCard = stack?.firstElementChild as HTMLElement | null;
    if (reduced || !viewport || !stack || !firstCard) return;
    const fit = () => {
      const width = viewport.clientWidth;
      const cardWidth = firstCard.offsetWidth;
      const cardHeight = stack.offsetHeight;
      if (width && cardWidth && cardHeight) geometry.set(getCultureWheelGeometry(width, cardWidth, cardHeight));
    };
    fit();
    const observer = new ResizeObserver(fit);
    observer.observe(stack);
    observer.observe(firstCard);
    return () => observer.disconnect();
  }, [geometry, reduced]);

  return (
    <div className="culture-wheel" data-still={reduced}>
      {hasAppeared && !reduced && <WheelRotation phase={phase} hovered={hovered} />}
      <motion.div ref={stage} className="culture-wheel-stage" style={reduced ? undefined : { height, perspective: `${camera}px` }}>
        <div className="culture-wheel-plane" ref={plane}>
          {cards.map((card, index) => (
            <WheelCard key={card.id} card={card} index={index} count={cards.length} phase={phase} geometry={geometry} hovered={hovered} reduced={reduced} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
