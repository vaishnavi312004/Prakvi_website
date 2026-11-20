import {
  Bell, ChartLine, Cloud, Compass, Database, DatabaseZap, Eye, Grid2X2, Headset, Leaf, Lock,
  Mail, Network, PanelsTopLeft, RefreshCw, Rocket, Settings, Users,
} from 'lucide-react';
import { ArchitectureCarousel } from '../components/common/ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { relationshipManagementSolutions } from '../data/productsData';
import type { ProductItem } from '../types';
import './RelationshipManagementSections.css';

export const relationshipManagementProcessId = 'relationship-management-process';
const categoriesId = 'relationship-management-categories';
const stepIcons = [Compass, PanelsTopLeft, Network, DatabaseZap, Rocket, Headset];
const categoryIcons = {
  tabs: [ChartLine, Settings, Database, Cloud],
  panels: [
    [ChartLine, Users, Eye],
    [Settings, Mail, Bell],
    [Database, Lock, RefreshCw],
    [Network, Cloud, PanelsTopLeft, Grid2X2, Leaf],
  ],
};

export function RelationshipManagementSections({ product }: { product: ProductItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow id="features" title="Our CRM Solutions"
        description="We offer comprehensive CRM Solutions tailored to your business needs"
        services={relationshipManagementSolutions} illustrationCollection="relationship-management" />
      <EnterpriseArchitectureJourney sectionId={relationshipManagementProcessId} title="Key Features of Our Relationship Management System"
        description="Transforming your customer data into meaningful engagement"
        steps={product.deliverySteps ?? []} stepsLabel="Relationship Management System features" icons={stepIcons} />
      <ArchitectureCarousel sectionId={categoriesId} title={product.stackTitle ?? product.name}
        description={product.stackSummary} categories={product.stackTabs ?? []} icons={categoryIcons} />
    </>
  );
}
