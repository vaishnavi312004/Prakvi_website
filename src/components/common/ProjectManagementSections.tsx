import React from 'react';
import {
  Activity, BarChart3, CalendarDays, ChartNoAxesCombined, CheckCheck,
  ClipboardCheck, ClipboardList, Columns3, Flag, FolderKanban,
  Gauge, GitBranch, Handshake, ListTree, MessagesSquare,
  Milestone, Network, Rocket, ShieldCheck, Target, Users, Workflow,
} from 'lucide-react';
import { projectManagementData } from '../../data/projectManagementData';
import { ServicePracticeSections } from './ServicePracticeSections';

const serviceIcons = [CalendarDays, Target, ShieldCheck, MessagesSquare, BarChart3, Handshake];
const journeyIcons = [ClipboardList, Users, Activity, ShieldCheck, Flag];
const featureIcons = [
  [Target, ListTree, CalendarDays, Users],
  [Network, Workflow, ShieldCheck, Milestone],
  [ChartNoAxesCombined, CheckCheck, ClipboardCheck, MessagesSquare],
  [FolderKanban, Columns3, GitBranch, MessagesSquare, Gauge],
];

export const ProjectManagementSections: React.FC = () => (
  <ServicePracticeSections
    content={projectManagementData}
    serviceIcons={serviceIcons}
    featureIcons={featureIcons}
    journeyIcons={journeyIcons}
    idPrefix="project"
    explorerLabel="Project Management"
    className="project-content"
    connectedServices
    showIntroduction={false}
  />
);
