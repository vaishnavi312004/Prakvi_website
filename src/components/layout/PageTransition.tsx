import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 12, scale: 0.988, filter: 'blur(6px)' }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      }
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -8, scale: 0.992, filter: 'blur(4px)' }
      }
      transition={{
        duration: reducedMotion ? 0 : 0.36,
        ease: [0.32, 0.72, 0, 1],
      }}
      className={`theme-light w-full flex-1 ${className}`}
    >
      {children}
    </motion.div>
  );
};
