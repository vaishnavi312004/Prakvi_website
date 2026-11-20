import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  Activity, BarChart3, CalendarDays, ChartNoAxesCombined, CheckCheck, ClipboardCheck,
  ClipboardList, Columns3, Flag, FolderKanban, Gauge, GitBranch, Handshake, ListTree,
  MessagesSquare, Milestone, Network, ShieldCheck, Target, Users, Workflow, Wrench,
} from 'lucide-react';
import { projectManagementData } from '../../data/projectManagementData';
import { servicesData } from '../../data/servicesData';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const serviceIconNames = [
  'CalendarDays', 'Target', 'ShieldCheck', 'MessagesSquare', 'BarChart3', 'Handshake',
] as const;
const journeyIcons = [ClipboardList, Users, Activity, ShieldCheck, Flag];
const featureIcons = [
  [Target, ListTree, CalendarDays, Users],
  [Network, Workflow, ShieldCheck, Milestone],
  [ChartNoAxesCombined, CheckCheck, ClipboardCheck, MessagesSquare],
  [FolderKanban, Columns3, GitBranch, MessagesSquare, Gauge],
];
const categoryIcons = [ListTree, Workflow, Gauge, Wrench];

const projectManagementService = servicesData.find(service => service.slug === 'project-management');
if (!projectManagementService) {
  throw new Error('Project Management service data is missing.');
}
if (projectManagementService.deliverySteps.length !== projectManagementData.process.steps.length) {
  throw new Error('Project Management process sources must have matching step counts.');
}

const processSteps = projectManagementData.process.steps.map((step, index) => {
  const serviceStep = projectManagementService.deliverySteps[index];
  if (!serviceStep) {
    throw new Error(`Project Management process detail is missing for step ${step.number}.`);
  }
  return {
    step: String(step.number).padStart(2, '0'),
    title: step.title,
    description: serviceStep.description,
    points: step.points,
  };
});

const services = projectManagementData.services.cards.map((service, index) => ({
  ...service,
  icon: serviceIconNames[index],
}));

export const ProjectManagementSections: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const { services: serviceContent, process, explorer } = projectManagementData;

  return (
    <div className="mobility-content project-content relative isolate overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="mobility-content-atmosphere pointer-events-none absolute inset-0"
        animate={reducedMotion ? undefined : { x: ['-2%', '2%', '-2%'], y: ['0%', '1%', '0%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      />

      <ArchitectureOfferingsWorkflow
        title={serviceContent.title}
        description={serviceContent.description}
        services={services}
        palette="project-management"
        illustrationCollection="project-management"
      />

      <EnterpriseArchitectureJourney
        sectionId="project-process"
        stepsLabel="Project Management process steps"
        icons={journeyIcons}
        title={process.title}
        description={process.description}
        steps={processSteps}
      />

      <ArchitectureCarousel
        sectionId="project-explorer"
        title={explorer.title}
        description={explorer.description}
        categories={explorer.tabs}
        icons={{ tabs: categoryIcons, panels: featureIcons }}
      />
    </div>
  );
};
