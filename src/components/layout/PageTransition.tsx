import React, { useRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ServiceTextRevealContext, useServiceTextReveal } from '../common/useServiceTextReveal';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  revealServiceText?: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '', revealServiceText = false }) => {
  const reducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  useServiceTextReveal(ref, revealServiceText);

  return (
    <motion.div
      ref={ref}
      initial={
        reducedMotion
          ? { opacity: 0 }
          : revealServiceText
            ? { opacity: 0, y: 12, scale: 0.988 }
            : { opacity: 0, y: 12, scale: 0.988, filter: 'blur(6px)' }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : revealServiceText
            ? { opacity: 1, y: 0, scale: 1 }
            : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : revealServiceText
            ? { opacity: 0, y: -8, scale: 0.992 }
            : { opacity: 0, y: -8, scale: 0.992, filter: 'blur(4px)' }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.36,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`theme-light w-full flex-1 ${className}`}
    >
      <ServiceTextRevealContext.Provider value={revealServiceText}>
        {children}
      </ServiceTextRevealContext.Provider>
    </motion.div>
  );
};
