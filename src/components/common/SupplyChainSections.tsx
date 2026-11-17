import React from 'react';
import {
  BarChart3, Boxes, BrainCircuit, ChartNoAxesCombined, CircleGauge,
  Cloud, Factory, Globe2, Handshake, Network, PackageCheck,
  PackageSearch, Plug, Radar, RotateCcw, Route, ShieldCheck,
  Smartphone, Truck, Warehouse,
} from 'lucide-react';
import { supplyChainData } from '../../data/supplyChainData';
import { ServicePracticeSections } from './ServicePracticeSections';

const serviceIcons = [Truck, Warehouse, ChartNoAxesCombined, Handshake, Network];
const journeyIcons = [ChartNoAxesCombined, Handshake, Factory, Truck, RotateCcw];
const featureIcons = [
  [ChartNoAxesCombined, Factory, CircleGauge, Network],
  [Truck, Warehouse, Route, Globe2],
  [PackageSearch, BarChart3, PackageCheck, Boxes],
  [BrainCircuit, Plug, Radar, ShieldCheck, Smartphone, Cloud],
];

export const SupplyChainSections: React.FC = () => (
  <ServicePracticeSections
    content={supplyChainData}
    serviceIcons={serviceIcons}
    featureIcons={featureIcons}
    journeyIcons={journeyIcons}
    idPrefix="scm"
    explorerLabel="Supply Chain Management"
    className="scm-content"
    connectedServices
  />
);
