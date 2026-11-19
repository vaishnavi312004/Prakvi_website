import React from 'react';
import { Check } from 'lucide-react';
import { homeData } from '../../data/homeData';
import './WhyPrakviBenefits.css';

export const WhyPrakviBenefits: React.FC = () => {
  return (
    <ul className="grid grid-cols-1 gap-3 min-[400px]:grid-cols-2" aria-label="Why choose Prakvi">
      {homeData.whyPrakvi.pillars.map((item) => (
        <li
          className="why-prakvi-benefit flex min-h-[82px] items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-3 py-3 shadow-[0_6px_18px_rgba(15,23,42,0.045)]"
          key={item.id}
        >
          <span className="why-prakvi-benefit__badge grid h-8 w-8 shrink-0 place-items-center rounded-full bg-green-100 text-green-900">
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-bold leading-snug text-foreground">{item.title}</span>
            <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{item.description}</span>
          </span>
        </li>
      ))}
    </ul>
  );
};
