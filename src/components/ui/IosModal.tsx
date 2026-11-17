import React, { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';

interface IosModalProps {
  open: boolean;
  onClose: () => void;
  ariaLabel?: string;
  maxWidthClass?: string;
  children: React.ReactNode;
}

export const IosModal: React.FC<IosModalProps> = ({
  open,
  onClose,
  ariaLabel = 'Modal dialog',
  maxWidthClass = 'max-w-lg',
  children,
}) => {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22, ease: [0.32, 0.72, 0, 1] }}
          onClick={onClose}
          className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto p-4 bg-slate-900/28 backdrop-blur-md"
        >
          <motion.div
            data-lenis-prevent
            initial={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.93, y: 20 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.95, y: 12 }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 400, damping: 30, mass: 0.9 }
            }
            onClick={(e) => e.stopPropagation()}
            className={`clay-card relative max-h-[calc(100dvh-2rem)] w-full ${maxWidthClass} overflow-y-auto rounded-[1.75rem] p-6 sm:p-8 text-foreground shadow-2xl`}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface/85 text-muted hover:bg-soft-blue hover:text-foreground active:scale-90 transition-all"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
