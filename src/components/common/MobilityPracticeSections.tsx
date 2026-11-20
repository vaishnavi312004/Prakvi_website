import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Cloud, Fingerprint, Laptop, LockKeyhole, MonitorCog, Settings2, ShieldCheck, Smartphone,
  Users, Wrench,
} from 'lucide-react';
import { mobilityPracticeData } from '../../data/mobilityPracticeData';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const featureIcons = [
  [Smartphone, Users, Cloud],
  [Laptop, Settings2, Wrench],
  [ShieldCheck, Fingerprint, LockKeyhole],
  [MonitorCog, Smartphone, Laptop, Settings2],
];
const categoryIcons = [Smartphone, Laptop, ShieldCheck, MonitorCog];
const processSteps = mobilityPracticeData.process.steps.map(step => ({
  step: String(step.number).padStart(2, '0'),
  title: step.title,
  description: step.description,
  points: step.points,
}));

export const MobilityPracticeSections: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { services, process, explorer } = mobilityPracticeData;

  return (
    <div className="mobility-content relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="mobility-content-atmosphere pointer-events-none absolute inset-0"
        animate={reducedMotion ? undefined : { x: ['-2%', '2%', '-2%'], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ArchitectureOfferingsWorkflow
        id="capabilities"
        title={services.title}
        description={services.description}
        services={services.cards}
        palette="mobility"
        illustrationCollection="mobility-practice"
      />

      <EnterpriseArchitectureJourney
        sectionId="mobility-process"
        stepsLabel="Mobility Practice process steps"
        title={process.title}
        description={process.description}
        steps={processSteps}
      />

      <ArchitectureCarousel
        sectionId="mobility-explorer"
        title={explorer.title}
        description={explorer.description}
        categories={explorer.tabs}
        icons={{ tabs: categoryIcons, panels: featureIcons }}
      />
    </div>
  );
};
