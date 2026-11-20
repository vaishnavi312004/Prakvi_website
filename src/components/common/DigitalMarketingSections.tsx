import {
  ChartNoAxesColumnIncreasing, ClipboardCheck, Code2, Facebook, FileSearch, FileText, Flame,
  Instagram, Linkedin, Link2, Mail, Megaphone, Mic, PenLine, Presentation, Search, Send,
  Share2, Smartphone, TrendingUp, Twitter, Video, Wrench, Youtube,
} from 'lucide-react';
import type { ServiceItem } from '../../types';
import { ArchitectureCarousel } from './ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from './ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from './EnterpriseArchitectureJourney';

const marketingIcons = {
  tabs: [Search, Megaphone, PenLine, Wrench],
  panels: [
    [FileText, Link2, Smartphone, Code2, ClipboardCheck, Search],
    [Facebook, Instagram, Twitter, Linkedin, Youtube],
    [PenLine, Video, Mail, Mic, Send, Presentation],
    [ChartNoAxesColumnIncreasing, Flame, FileSearch, TrendingUp, Share2, Mail],
  ],
};

export function DigitalMarketingSections({ service }: { service: ServiceItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow title={service.offeringsTitle ?? ''} description={service.offeringsSubtitle ?? service.shortDesc}
        services={service.capabilities} palette="digital-marketing" illustrationCollection="digital-marketing" />
      <EnterpriseArchitectureJourney sectionId="digital-marketing-process" title={service.processTitle ?? ''}
        description={service.processSubtitle ?? ''} steps={service.deliverySteps} />
      <ArchitectureCarousel title={service.stackTitle ?? service.title} description={service.stackSummary}
        categories={service.stackTabs ?? []} icons={marketingIcons} variant="digital-marketing" />
    </>
  );
}
