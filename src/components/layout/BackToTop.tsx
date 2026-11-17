import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from './SmoothScroll';

export const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const update = () => setVisible(window.scrollY > 320);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Scroll back to top"
          title="Back to top"
          onClick={scrollToTop}
          className="back-to-top"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.85 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: 'spring', stiffness: 420, damping: 28 }
          }
          whileHover={reducedMotion ? undefined : { y: -4, scale: 1.06 }}
          whileTap={reducedMotion ? undefined : { scale: 0.91 }}
        >
          <span className="back-to-top-sheen" aria-hidden="true" />
          <motion.span
            className="relative flex items-center justify-center"
            animate={reducedMotion ? { y: 0 } : { y: [0, -2.5, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowUp size={21} strokeWidth={2.2} aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
