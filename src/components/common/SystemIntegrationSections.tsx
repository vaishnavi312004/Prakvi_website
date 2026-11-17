import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity, ArrowLeftRight, Boxes, Building2, Cloud, CodeXml,
  Container, Database, DatabaseZap, GitBranch, HardDrive, Layers,
  Network, Plug, Rocket, Search, Server, Settings2, ShieldCheck,
  TestTube2, Truck, Workflow,
} from 'lucide-react';
import { systemIntegrationData } from '../../data/systemIntegrationData';
import { ServicePracticeSections } from './ServicePracticeSections';

const serviceIcons = [Network, Cloud, ArrowLeftRight, Workflow, ShieldCheck];
const journeyIcons = [Search, Network, Settings2, TestTube2, Rocket, Activity];
const featureIcons = [
  [Building2, Server, Layers, Cloud, Truck],
  [Workflow, ArrowLeftRight, Plug, Network, Boxes],
  [Database, Server, DatabaseZap, Database, HardDrive],
  [GitBranch, Container, Cloud, Workflow, CodeXml, Rocket],
];

const IntegrationNetwork: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const nodes = [[38, 62], [162, 38], [266, 96], [88, 182], [230, 236]];
  return (
    <svg className="integration-intro-network" viewBox="0 0 300 300" fill="none" aria-hidden="true">
      <path d="M38 62L162 38L266 96L230 236L88 182L38 62M162 38L88 182L266 96M88 182L230 236" stroke="#008fe5" strokeOpacity="0.16" />
      <motion.path
        d="M38 62L162 38L266 96L230 236L88 182L38 62M162 38L88 182L266 96"
        stroke="#22c5f3" strokeWidth="2" strokeDasharray="8 28" strokeOpacity="0.52"
        animate={reducedMotion ? undefined : { strokeDashoffset: [0, -72] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />
      {nodes.map(([cx, cy], index) => (
        <g key={index}>
          <circle cx={cx} cy={cy} r="13" fill="#dcefff" stroke="#008fe5" strokeOpacity="0.26" />
          <motion.circle cx={cx} cy={cy} r="4" fill={index === 3 ? '#ff914d' : '#008fe5'} animate={reducedMotion ? undefined : { opacity: [0.5, 1, 0.5] }} transition={{ duration: 5, delay: index * 0.6, repeat: Infinity }} />
        </g>
      ))}
    </svg>
  );
};

export const SystemIntegrationSections: React.FC = () => (
  <ServicePracticeSections
    content={systemIntegrationData}
    serviceIcons={serviceIcons}
    featureIcons={featureIcons}
    journeyIcons={journeyIcons}
    idPrefix="integration"
    explorerLabel="System Integration"
    className="integration-content"
    connectedServices
    introDecoration={<IntegrationNetwork />}
  />
);
