import React from 'react';
import { Check } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { homeData } from '../../data/homeData';
import './WhyPrakviBenefits.css';

export const WhyPrakviBenefits: React.FC = () => {
  const reducedMotion = useReducedMotion();

  return (
    <motion.ul
      className="mt-7 grid grid-flow-col auto-cols-[min(75vw,14rem)] snap-x snap-proximity gap-3 overflow-x-auto p-1 pb-4 focus-visible:outline-accent xl:grid-flow-row xl:grid-cols-6 xl:overflow-visible"
      aria-label="Why choose Prakvi"
      role="list"
      tabIndex={0}
      initial={reducedMotion ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {homeData.whyPrakvi.pillars.map((item, index) => (
        <motion.li
          className="why-prakvi-benefit flex min-w-0 snap-start flex-col items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-[0_6px_18px_rgba(15,23,42,0.045)]"
          key={item.id}
          variants={{
            hidden: { opacity: 0, y: 14 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.12, ease: 'easeOut' }}
        >
          <span className="why-prakvi-benefit__badge grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-100 text-green-900">
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold leading-snug text-foreground">{item.title}</span>
            <span className="mt-1 block text-xs leading-relaxed text-muted">{item.description}</span>
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
};
