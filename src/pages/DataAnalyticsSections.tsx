import {
  Brain, ChartLine, ChartNoAxesCombined, ChartPie, ChartScatter, Cloud, Code2, Database,
  GitBranch, LayoutDashboard, Network, Search, Settings2, Warehouse,
} from 'lucide-react';
import { ArchitectureCarousel } from '../components/common/ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { dataAnalyticsSolutions } from '../data/productsData';
import type { ProductItem } from '../types';
import './DataAnalyticsSections.css';

export const dataAnalyticsProcessId = 'data-analytics-process';
const categoriesId = 'data-analytics-categories';

const categoryIcons = {
  tabs: [Network, ChartLine, LayoutDashboard, Database],
  panels: [
    [Network, Database, Warehouse, Settings2],
    [ChartLine, Brain, ChartNoAxesCombined, ChartPie],
    [ChartNoAxesCombined, ChartScatter, LayoutDashboard, Search],
    [Code2, Database, ChartScatter, GitBranch, Cloud],
  ],
};

export function DataAnalyticsSections({ product }: { product: ProductItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow
        id="features"
        title="Our Data Analytics Solutions"
        description="We offer comprehensive data analytics solutions tailored to your business needs"
        services={dataAnalyticsSolutions}
        illustrationCollection="data-analytics"
      />
      <EnterpriseArchitectureJourney
        sectionId={dataAnalyticsProcessId}
        title="Why Choose Prakvi for Data Analytics?"
        description="We reveal patterns, trends, and opportunities hidden within your data"
        steps={product.deliverySteps ?? []}
        stepsLabel="Data Analytics process steps"
      />
      <ArchitectureCarousel
        sectionId={categoriesId}
        title={product.stackTitle ?? product.name}
        description={product.stackSummary}
        categories={product.stackTabs ?? []}
        icons={categoryIcons}
      />
    </>
  );
}
