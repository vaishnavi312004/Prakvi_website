export interface ContactTopic {
  id: string;
  label: string;
}

export const contactData = {
  kicker: 'Contact Us',
  title: "Let's Start Your Digital Transformation",
  subtitle:
    'Ready to take your business to the next level? Get in touch with our experts for a free consultation.',
  serviceTopics: [
    { id: 'staffing', label: 'Staffing & Workforce Solutions' },
    { id: 'cloud', label: 'Cloud Services & Infrastructure Management' },
    { id: 'bi-analytics', label: 'Business Intelligence & Data Analytics' },
    { id: 'enterprise-arch', label: 'Enterprise Architecture & System Integration' },
    { id: 'mobility', label: 'Mobility Practice (BYOD & CYOD)' },
    { id: 'web-mobile', label: 'Web Design, Enterprise Solution & Mobile Apps' },
    { id: 'digital-marketing', label: 'Digital Marketing & Branding' },
    { id: 'products', label: 'Data Analytics, VMS & CRM Platforms' },
    { id: 'consulting', label: 'IT Consulting, Project Management & Accounting' },
  ] as ContactTopic[],
  supportCommitment: {
    responseTime: '24/7 Support Available',
    phone: '+91-11-24626660',
    email: 'info@prakvi.com',
  },
};
