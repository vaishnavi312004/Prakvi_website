import {
  Apple, Bot, Braces, Cable, Cloud, Code2, Container, Flame, GitBranch, Hammer, Layers,
  Origami, Server, Waypoints, Workflow,
} from 'lucide-react';
import type { ServiceItem } from '../../types';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const technologyIcons = {
  tabs: [Apple, Bot, Layers, Server],
  panels: [
    [Origami, Braces, Hammer],
    [Code2, Braces, Bot],
    [Waypoints, Layers, Flame, Code2],
    [GitBranch, Container, Workflow, Cloud, Cable],
  ],
};

export const mobileProcessId = 'mobile-app-development-process';

export function MobileAppDevelopmentSections({ service }: { service: ServiceItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow title={service.offeringsTitle ?? service.title}
        description={service.offeringsSubtitle} services={service.capabilities} palette="mobile-app" illustrationCollection="mobile-app-development" />
      <EnterpriseArchitectureJourney sectionId={mobileProcessId} title={service.processTitle ?? service.title}
        description={service.processSubtitle ?? ''} steps={service.deliverySteps} stepsLabel="Mobile App Development process steps" />
      <ArchitectureCarousel title={service.stackTitle ?? service.title} description={service.stackSummary}
        categories={service.stackTabs ?? []} icons={technologyIcons} variant="mobile-app" />
    </>
  );
}
