import { motion, useReducedMotion } from 'motion/react';
import {
  Activity, ArrowLeftRight, Boxes, Building2, Cloud, CodeXml, Container, Database, DatabaseZap,
  GitBranch, HardDrive, Layers, Network, Plug, Rocket, Search, Server, Settings2, ShieldCheck,
  TestTube2, Truck, Workflow,
} from 'lucide-react';
import { systemIntegrationData } from '../../data/systemIntegrationData';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const solutions = systemIntegrationData.services.cards.map((card, index) => ({
  ...card,
  icon: ['Network', 'Server', 'GitBranch', 'Plug', 'ShieldCheck'][index],
}));
const journeyIcons = [Search, Network, Settings2, TestTube2, Rocket, Activity];
const categoryIcons = {
  tabs: [Building2, Workflow, Database, GitBranch],
  panels: [
    [Building2, Server, Layers, Cloud, Truck],
    [Workflow, ArrowLeftRight, Plug, Network, Boxes],
    [Database, Server, DatabaseZap, Database, HardDrive],
    [GitBranch, Container, Cloud, Workflow, CodeXml, Rocket],
  ],
};
const processSteps = systemIntegrationData.process.steps.map(({ number, ...step }) => ({
  ...step,
  step: String(number).padStart(2, '0'),
}));
const networkNodes = [[38, 62], [162, 38], [266, 96], [230, 236], [88, 182]];
const networkPath = 'M38 62L162 38L266 96L230 236L88 182L38 62M162 38L88 182L266 96M88 182L230 236';

export function SystemIntegrationSections() {
  const reduced = useReducedMotion();
  const { services, process, explorer } = systemIntegrationData;

  return (
    <div className="mobility-content integration-content relative isolate overflow-hidden">
      <motion.div aria-hidden="true" className="mobility-content-atmosphere pointer-events-none absolute inset-0"
        animate={reduced ? undefined : { x: ['-2%', '2%', '-2%'], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }} />
      <div className="relative">
        <svg className="integration-intro-network" viewBox="0 0 300 300" fill="none" aria-hidden="true">
          <path d={networkPath} stroke="#008fe5" strokeOpacity="0.16" />
          <motion.path d={networkPath} stroke="#22c5f3" strokeWidth="2" strokeDasharray="8 28"
            strokeOpacity="0.52" animate={reduced ? undefined : { strokeDashoffset: [0, -72] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
          {networkNodes.map(([cx, cy], index) => (
            <g key={cx}>
              <circle cx={cx} cy={cy} r="13" fill="#dcefff" stroke="#008fe5" strokeOpacity="0.26" />
              <motion.circle cx={cx} cy={cy} r="4" fill={index === 3 ? '#ff914d' : '#008fe5'}
                animate={reduced ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 5, delay: index * 0.6, repeat: Infinity }} />
            </g>
          ))}
        </svg>
        <ArchitectureOfferingsWorkflow id="capabilities" title={services.title} description={services.description}
          services={solutions} palette="integration"
          illustrationCollection="system-integration" />
      </div>
      <EnterpriseArchitectureJourney sectionId="integration-process" title={process.title}
        description={process.description} steps={processSteps} icons={journeyIcons}
        stepsLabel="System Integration process steps" traceOnScroll />
      <ArchitectureCarousel sectionId="integration-explorer" title={explorer.title} description={explorer.description}
        categories={explorer.tabs} icons={categoryIcons} interactiveNodes />
    </div>
  );
}
