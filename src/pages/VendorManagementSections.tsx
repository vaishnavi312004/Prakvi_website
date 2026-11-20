import {
  Archive, BellRing, ChartNoAxesCombined, ClipboardCheck, Compass, FileCheck, FileClock,
  FileSignature, Gauge, GraduationCap, LayoutDashboard, Link2, MessagesSquare, Settings2,
  ShieldCheck, ShoppingCart, Smartphone, Star, UserCheck, Workflow,
} from 'lucide-react';
import { ArchitectureCarousel } from '../components/common/ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { vendorManagementSolutions } from '../data/productsData';
import type { ProductItem } from '../types';
import './VendorManagementSections.css';

export const vendorManagementProcessId = 'vendor-management-process';
const categoriesId = 'vendor-management-categories';
const stepIcons = [Compass, Settings2, Link2, ClipboardCheck, GraduationCap, Gauge];
const categoryIcons = {
  tabs: [ShoppingCart, FileSignature, Gauge, Settings2],
  panels: [
    [ShoppingCart, UserCheck, Workflow, LayoutDashboard, ClipboardCheck],
    [FileSignature, FileClock, BellRing, FileCheck, Archive],
    [LayoutDashboard, Star, ClipboardCheck, FileCheck, ShieldCheck],
    [Workflow, MessagesSquare, ChartNoAxesCombined, Smartphone, ShieldCheck],
  ],
};

export function VendorManagementSections({ product }: { product: ProductItem }) {
  return (
    <>
      <ArchitectureOfferingsWorkflow id="features" title="Prakvi VMS – A Smarter Way to Manage Vendors"
        description="We offer comprehensive Vendor Management System solutions tailored to your business needs"
        services={vendorManagementSolutions} illustrationCollection="vendor-management" />
      <EnterpriseArchitectureJourney sectionId={vendorManagementProcessId} title="Key Features of Our Vendor Management System"
        description="Optimize, automate, and elevate vendor operations for measurable business impact"
        steps={product.deliverySteps ?? []} stepsLabel="Vendor Management System features" icons={stepIcons} />
      <ArchitectureCarousel sectionId={categoriesId} title={product.stackTitle ?? product.name}
        description={product.stackSummary} categories={product.stackTabs ?? []} icons={categoryIcons} />
    </>
  );
}
