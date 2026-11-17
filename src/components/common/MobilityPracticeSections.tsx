import React from 'react';
import { ClipboardCheck, Cloud, Compass, Fingerprint, Headset, Laptop, LockKeyhole, MonitorCog, Network, Settings2, ShieldCheck, Smartphone, Users, Wrench } from 'lucide-react';
import { mobilityPracticeData } from '../../data/mobilityPracticeData';
import { ServicePracticeSections } from './ServicePracticeSections';

const serviceIcons = [Compass, ShieldCheck, ClipboardCheck, Network, Headset];
const featureIcons = [[Smartphone, Users, Cloud], [Laptop, Settings2, Wrench], [ShieldCheck, Fingerprint, LockKeyhole], [MonitorCog, Smartphone, Laptop, Settings2]];

export const MobilityPracticeSections: React.FC = () => (
  <ServicePracticeSections content={mobilityPracticeData} serviceIcons={serviceIcons} featureIcons={featureIcons} idPrefix="mobility" explorerLabel="Mobility Practice" />
);
