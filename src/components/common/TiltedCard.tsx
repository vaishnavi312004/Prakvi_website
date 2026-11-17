import React, { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

interface TiltedCardProps {
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  rotateAmplitude?: number;
  scaleOnHover?: number;
  glare?: number;
  shadow?: number;
  backContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const TiltedCardLayer = ({ depth = 30, children, className = '', style }: React.HTMLAttributes<HTMLDivElement> & { depth?: number }) => (
  <div className={`tilted-card-layer ${className}`} style={{ ...style, transform: `translateZ(${depth}px)`, transformStyle: 'preserve-3d' }}>{children}</div>
);

export default function TiltedCard({
  imageSrc, altText = '', captionText, containerHeight = '100%', containerWidth = '100%',
  imageHeight = '100%', imageWidth = '100%', rotateAmplitude = 12, scaleOnHover = 1.05,
  glare = 0.5, shadow = 0.5, backContent, children, className = '',
}: TiltedCardProps) {
  const reducedMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const glareTarget = useMotionValue(0);
  const spring = { stiffness: 220, damping: 24 };
  const rotateX = useSpring(x, spring);
  const rotateY = useSpring(y, spring);
  const scale = useSpring(scaleTarget, spring);
  const glareOpacity = useSpring(glareTarget, spring);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareBackground = useTransform([glareX, glareY], ([px, py]) => `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.85), transparent 65%)`);
  const reset = () => { x.set(0); y.set(0); scaleTarget.set(1); glareTarget.set(0); };
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    const py = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    x.set((0.5 - py) * rotateAmplitude * 2);
    y.set((px - 0.5) * rotateAmplitude * 2);
    scaleTarget.set(scaleOnHover);
    glareTarget.set(Math.max(0, Math.min(glare, 1)));
    glareX.set(px * 100); glareY.set(py * 100);
  };

  return (
    <div className={`tilted-card ${className}`} style={{ width: containerWidth, height: containerHeight, perspective: 1000 }} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className="tilted-card-motion" style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY, scale: reducedMotion ? 1 : scale, boxShadow: `0 14px 32px rgba(23,43,69,${Math.max(0, Math.min(shadow, 1)) * 0.18})` }}>
        <motion.div className="tilted-card-faces" animate={{ rotateY: flipped ? 180 : 0 }} transition={{ duration: reducedMotion ? 0 : 0.45 }}>
          <div className="tilted-card-front" inert={flipped} aria-hidden={flipped || undefined}>
            {imageSrc && <img className="tilted-card-image" src={imageSrc} alt={altText} loading="lazy" style={{ height: imageHeight, width: imageWidth }} />}
            {children}
            <motion.div aria-hidden="true" className="tilted-card-glare" style={{ opacity: reducedMotion ? 0 : glareOpacity, background: glareBackground }} />
          </div>
          {backContent && <div className="tilted-card-back" inert={!flipped} aria-hidden={!flipped}>{backContent}</div>}
        </motion.div>
      </motion.div>
      {captionText && <p className="mt-3 text-center text-sm text-muted">{captionText}</p>}
      {backContent && <button type="button" className="btn-secondary mt-3" onClick={() => { reset(); setFlipped(!flipped); }} aria-label={flipped ? 'Show front of card' : 'Show back of card'}>{flipped ? 'Show front' : 'Show details'}</button>}
    </div>
  );
}
