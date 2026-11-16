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
        <motion.button type="button" aria-label="Scroll back to top" title="Back to top"
          onClick={scrollToTop}
          className="back-to-top"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: reducedMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reducedMotion ? undefined : { y: -5, scale: 1.05 }}
          whileTap={reducedMotion ? undefined : { scale: 0.94 }}>
          <span className="back-to-top-sheen" aria-hidden="true" />
          <motion.span className="relative flex items-center justify-center"
            animate={reducedMotion ? { y: 0 } : { y: [0, -3, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ArrowUp size={21} strokeWidth={2.2} aria-hidden="true" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
