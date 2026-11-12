export interface ContactTopic {
  id: string;
  label: string;
}

export const contactData = {
  kicker: 'Start a Dialogue',
  title: 'Consult With Our Practice Leaders',
  subtitle:
    'Whether scoping a multi-region cloud deployment, augmenting specialized healthcare IT pods, or modernizing enterprise legacy apps, our senior architects are available.',
  serviceTopics: [
    { id: 'cloud', label: 'Enterprise Cloud & DevOps Migration' },
    { id: 'staffing', label: 'Workforce Augmentation & Staffing' },
    { id: 'mobility', label: 'Mobility Practice (BYOD & CYOD)' },
    { id: 'custom-dev', label: 'Application & Enterprise Solutions' },
    { id: 'bi-analytics', label: 'Business Intelligence & Data Analytics' },
    { id: 'cybersecurity', label: 'Security & Infrastructure Management' },
    { id: 'products', label: 'Proprietary Software Suite Demo' },
    { id: 'other', label: 'General Corporate / Strategic Advisory' },
  ] as ContactTopic[],
  budgetRanges: [
    { id: 'tier-1', label: '$25,000 – $50,000' },
    { id: 'tier-2', label: '$50,000 – $150,000' },
    { id: 'tier-3', label: '$150,000 – $500,000' },
    { id: 'tier-4', label: '$500,000+' },
    { id: 'exploratory', label: 'Scoping / Retainer Discussion' },
  ],
  supportCommitment: {
    responseTime: '< 24 Hours Guaranteed',
    consultationLead: 'Direct Senior Architect Scoping',
    ndaProvided: 'Mutual NDA prior to architectural discovery',
  },
};
