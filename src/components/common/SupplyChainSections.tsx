import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  BarChart3, Boxes, BrainCircuit, ChartNoAxesCombined, CircleGauge, Cloud, Factory, Globe2,
  Handshake, Network, PackageCheck, PackageSearch, Plug, Radar, RotateCcw, Route, ShieldCheck,
  Smartphone, Truck, Warehouse,
} from 'lucide-react';
import { supplyChainData } from '../../data/supplyChainData';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const serviceIconNames = [
  'Truck', 'Warehouse', 'ChartNoAxesCombined', 'Handshake', 'Network',
] as const;
const journeyIcons = [ChartNoAxesCombined, Handshake, Factory, Truck, RotateCcw];
const featureIcons = [
  [ChartNoAxesCombined, Factory, CircleGauge, Network],
  [Truck, Warehouse, Route, Globe2],
  [PackageSearch, BarChart3, PackageCheck, Boxes],
  [BrainCircuit, Plug, Radar, ShieldCheck, Smartphone, Cloud],
];
const categoryIcons = [ChartNoAxesCombined, Truck, PackageSearch, BrainCircuit];
const processSteps = supplyChainData.process.steps.map(step => ({
  step: String(step.number).padStart(2, '0'),
  title: step.title,
  points: step.points,
}));
const services = supplyChainData.services.cards.map((service, index) => ({
  ...service,
  icon: serviceIconNames[index],
}));

export const SupplyChainSections: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { services: serviceContent, process, explorer } = supplyChainData;

  return (
    <div className="mobility-content scm-content relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="mobility-content-atmosphere pointer-events-none absolute inset-0"
        animate={reducedMotion ? undefined : { x: ['-2%', '2%', '-2%'], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ArchitectureOfferingsWorkflow
        id="capabilities"
        title={serviceContent.title}
        description={serviceContent.description}
        services={services}
        palette="supply"
        illustrationCollection="supply-chain-management"
      />

      <EnterpriseArchitectureJourney
        sectionId="scm-process"
        stepsLabel="Supply Chain Management process steps"
        icons={journeyIcons}
        title={process.title}
        description={process.description}
        steps={processSteps}
      />

      <ArchitectureCarousel
        sectionId="scm-explorer"
        title={explorer.title}
        description={explorer.description}
        categories={explorer.tabs}
        icons={{ tabs: categoryIcons, panels: featureIcons }}
      />
    </div>
  );
};
