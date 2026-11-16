export interface StatMetric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

export const statsData = {
  kicker: 'Proven Impact',
  title: 'Delivering Measurable Outcomes Across Enterprises',
  subtitle: 'Verified engagement milestones reflecting long-term partnerships and engineering dependability.',
  metrics: [
    {
      value: 236,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Enterprise software, cloud infrastructure, analytics, and digital solutions delivered.',
    },
    {
      value: 100,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Trusted partnerships across enterprise technology, BFSI, healthcare, and logistics.',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years Experience',
      description: 'Sustained expertise in enterprise IT consulting, delivery, and specialized staffing.',
    },
    {
      value: 99,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistent service reliability, SLA adherence, and transparent project execution.',
    },
  ] as StatMetric[],
};
