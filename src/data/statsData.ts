export interface StatMetric {
  value: number;
  suffix: string;
  label: string;
  description: string;
  tag: string;
}

export const statsData = {
  kicker: 'Verified Impact',
  title: 'Proven Scale & Performance Benchmarks',
  subtitle: 'Quantifiable operational outcomes delivered across international enterprise clients.',
  metrics: [
    {
      value: 236,
      suffix: '+',
      label: 'Projects Delivered',
      description: 'End-to-end enterprise software, cloud pipelines, and digital solutions executed globally.',
      tag: 'Global Delivery',
    },
    {
      value: 100,
      suffix: '+',
      label: 'Enterprise Clients',
      description: 'Trusted partnerships spanning healthcare, banking, logistics, retail, and tech enterprises.',
      tag: 'Client Retention',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Deep institutional domain experience in strategic IT consulting and specialized staffing.',
      tag: 'Track Record',
    },
    {
      value: 99,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistent SLA delivery, transparent governance, and agile multi-disciplinary support.',
      tag: 'SLA Adherence',
    },
  ] as StatMetric[],
  auditDisclaimer: '*Verified client engagements and performance benchmarks (provisional company audit)',
};
