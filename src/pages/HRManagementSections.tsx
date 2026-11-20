import {
  Award, BarChart3, Brain, CalendarCheck, CalendarDays, ClipboardList, FileChartColumn,
  FileText, GraduationCap, HeartPulse, Megaphone, MessagesSquare, Receipt, RefreshCw, Target,
  UserPlus, Users, Wallet, Workflow,
} from 'lucide-react';
import { ArchitectureCarousel } from '../components/common/ArchitectureCarousel';
import { ArchitectureOfferingsWorkflow } from '../components/common/ArchitectureOfferingsWorkflow';
import { EnterpriseArchitectureJourney } from '../components/common/EnterpriseArchitectureJourney';
import { hrManagementData } from '../data/hrManagementData';
import './HRManagementSections.css';

export const hrManagementProcessId = 'hr-management-process';
const categoriesId = 'hr-management-categories';

const stepIcons = [UserPlus, CalendarCheck, Wallet, Target, MessagesSquare, BarChart3];
const categoryIcons = {
  tabs: [UserPlus, Wallet, Target, Users],
  panels: [
    [ClipboardList, FileText, CalendarDays, Users, Brain],
    [Wallet, FileText, Receipt, CalendarCheck, Workflow],
    [Target, BarChart3, FileChartColumn, MessagesSquare, GraduationCap],
    [HeartPulse, Megaphone, Users, RefreshCw, Award],
  ],
};

export function HRManagementSections() {
  return (
    <>
      <ArchitectureOfferingsWorkflow id="features" title={hrManagementData.solutionsTitle}
        description={hrManagementData.solutionsSubtitle} services={hrManagementData.solutions}
        illustrationCollection="hr-management-system" />
      <EnterpriseArchitectureJourney sectionId={hrManagementProcessId} title={hrManagementData.processTitle}
        description={hrManagementData.processSubtitle} steps={hrManagementData.steps}
        stepsLabel="HR Management System features" icons={stepIcons} />
      <ArchitectureCarousel sectionId={categoriesId} title={hrManagementData.categoriesTitle}
        description={hrManagementData.categoriesDescription} categories={hrManagementData.categories}
        icons={categoryIcons} />
    </>
  );
}
