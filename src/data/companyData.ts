export interface OfficeLocation {
  id: string;
  name: string;
  category: 'Headquarters' | 'Regional Hub' | 'International Client Desk';
  address: string[];
  city: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
  isPrimary?: boolean;
}

export const companyData = {
  name: 'Prakvi Techno Solutions Private Limited',
  shortName: 'Prakvi',
  tagline: "Engineering Tomorrow's Digital Enterprise",
  establishedYear: '2011',
  legalEntity: 'Private Limited Company (CIN Registered)',
  
  contact: {
    primaryEmail: 'info@prakvi.com',
    careerEmail: 'careers@prakvi.com',
    businessEmail: 'sales@prakvi.com',
    phone: '+91 40 4855 2345',
    altPhone: '+91 40 4855 2346',
    tollFree: '1800 200 4855',
    workingHours: 'Monday – Friday: 9:00 AM – 6:30 PM IST',
  },

  socialLinks: {
    linkedin: 'https://www.linkedin.com/company/prakvi-techno-solutions',
    twitter: 'https://twitter.com/prakvitechno',
    facebook: 'https://facebook.com/prakvitechno',
    instagram: 'https://instagram.com/prakvitechno',
    github: 'https://github.com/prakvi-techno',
  },

  offices: [
    {
      id: 'hyderabad-hq',
      name: 'Global Innovation & Delivery Center (HQ)',
      category: 'Headquarters',
      address: [
        'Plot No. 12 & 13, Mindspace Tech Park Zone',
        'Madhapur, HITEC City',
        'Hyderabad, Telangana 500081, India',
      ],
      city: 'Hyderabad',
      country: 'India',
      phone: '+91 40 4855 2345',
      email: 'hyd@prakvi.com',
      hours: 'Mon - Fri, 9:00 AM - 6:30 PM IST',
      isPrimary: true,
    },
    {
      id: 'bengaluru-tech',
      name: 'Cloud & Engineering Center of Excellence',
      category: 'Regional Hub',
      address: [
        'Level 4, Prestige Tech Cloud Park',
        'Outer Ring Road, Kadubeesanahalli',
        'Bengaluru, Karnataka 560103, India',
      ],
      city: 'Bengaluru',
      country: 'India',
      phone: '+91 80 4123 7890',
      email: 'blr@prakvi.com',
      hours: 'Mon - Fri, 9:00 AM - 6:30 PM IST',
    },
    {
      id: 'us-client-desk',
      name: 'North America Client Services & Consulting',
      category: 'International Client Desk',
      address: [
        'Suite 450, 100 Enterprise Way',
        'Dallas / Fort Worth Metroplex',
        'Texas 75038, United States',
      ],
      city: 'Texas',
      country: 'United States',
      phone: '+1 (469) 555-0198',
      email: 'usa@prakvi.com',
      hours: 'Mon - Fri, 8:00 AM - 5:00 PM CST',
    },
  ] as OfficeLocation[],

  /**
   * Reference business metrics from existing company collateral.
   * Marked as provisional and editable prior to final client audit.
   */
  verifiedImpactMetrics: [
    {
      value: 236,
      suffix: '+',
      label: 'Projects Delivered',
      description: 'End-to-end enterprise software, cloud, and digital solutions executed across global domains.',
      verifiedStatus: 'Provisional reference metric',
    },
    {
      value: 100,
      suffix: '+',
      label: 'Enterprise Clients',
      description: 'Trusted partnerships spanning healthcare, banking, logistics, retail, and tech enterprises.',
      verifiedStatus: 'Provisional reference metric',
    },
    {
      value: 15,
      suffix: '+',
      label: 'Years of Excellence',
      description: 'Deep institutional domain experience in strategic IT consulting and specialized staffing.',
      verifiedStatus: 'Provisional reference metric',
    },
    {
      value: 99,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistent SLA delivery, transparent governance, and agile multi-disciplinary support.',
      verifiedStatus: 'Provisional reference metric',
    },
  ],

  values: [
    {
      id: 'innovation',
      title: 'Continuous Innovation',
      short: 'Pioneering intelligent architectures and modern engineering patterns that create durable business advantage.',
      icon: 'Lightbulb',
    },
    {
      id: 'integrity',
      title: 'Uncompromising Integrity',
      short: 'Conducting every client engagement with transparent governance, data confidentiality, and ethical alignment.',
      icon: 'ShieldCheck',
    },
    {
      id: 'excellence',
      title: 'Technical Excellence',
      short: 'Zero-compromise engineering standards, rigorous QA, and resilient enterprise-grade execution.',
      icon: 'Award',
    },
    {
      id: 'collaboration',
      title: 'Collaborative Synergy',
      short: 'Acting as an empathetic extension of our clients’ internal teams, breaking down operational silos.',
      icon: 'Users',
    },
    {
      id: 'passion',
      title: 'Purpose-Driven Passion',
      short: 'Deep curiosity and relentless dedication to solving difficult business and architectural challenges.',
      icon: 'Sparkles',
    },
    {
      id: 'sustainability',
      title: 'Sustainable Growth',
      short: 'Building future-proof systems and nurturing long-term human talent pipelines for lasting resilience.',
      icon: 'Leaf',
    },
  ],

  culturePillars: [
    {
      title: 'Growth Mindset',
      desc: 'We cultivate an environment of continuous upskilling, hackathons, and certifications across emerging technologies.',
      metric: '100% sponsored learning paths',
    },
    {
      title: 'Results-Driven Autonomy',
      desc: 'Engineers and consultants are empowered to make strategic architecture decisions and own project outcomes.',
      metric: 'Outcome-oriented delivery',
    },
    {
      title: 'Collaborative Spirit',
      desc: 'Cross-functional squads pair seasoned architects with dynamic specialists to deliver integrated solutions.',
      metric: 'Multi-disciplinary squads',
    },
    {
      title: 'Agility & Speed',
      desc: 'Rapid prototyping and decoupled microservice architectures that compress time-to-market.',
      metric: 'Bi-weekly release cadences',
    },
    {
      title: 'Creativity in Problem Solving',
      desc: 'We look beyond off-the-shelf software to architect tailor-made digital competitive moats.',
      metric: 'Custom-engineered IP',
    },
    {
      title: 'Client-Centricity',
      desc: 'Our success is defined solely by measurable operational ROI, speed, and reliability for our enterprise partners.',
      metric: '99% SLA adherence',
    },
  ],

  // Structured placeholders for leadership profiles with no invented personas
  leadershipPlaceholders: [
    {
      role: 'Chief Executive Officer & Managing Director',
      unit: 'Executive Board',
      focus: 'Global strategy, enterprise transformation partnerships, and institutional growth.',
      placeholderLabel: 'Executive Profile [Under Company Review]',
    },
    {
      role: 'Chief Technology Officer',
      unit: 'Technology & Architecture Council',
      focus: 'Enterprise cloud blueprints, AI & data engineering, and modern mobility practices.',
      placeholderLabel: 'Executive Profile [Under Company Review]',
    },
    {
      role: 'Head of Global Workforce Solutions & Staffing',
      unit: 'Talent & Human Capital Practice',
      focus: 'Specialized healthcare staffing, executive search, and enterprise workforce augmentation.',
      placeholderLabel: 'Practice Leader [Under Company Review]',
    },
    {
      role: 'Vice President — Enterprise Solutions & Delivery',
      unit: 'Global Client Operations',
      focus: 'System integration, ERP, supply chain engineering, and delivery governance.',
      placeholderLabel: 'Practice Leader [Under Company Review]',
    },
  ],

  journeyMilestones: [
    {
      year: '2011',
      title: 'Foundational Inception',
      description: 'Prakvi Techno Solutions was established with a clear mandate to provide high-caliber IT consulting and specialized staffing in emerging technology ecosystems.',
      tag: 'Foundation',
    },
    {
      year: '2014',
      title: 'Enterprise Staffing & Healthcare Expansion',
      description: 'Expanded specialized talent operations into dedicated healthcare staffing, clinical IT, and cross-border permanent staffing divisions.',
      tag: 'Workforce Practice',
    },
    {
      year: '2017',
      title: 'Cloud & Infrastructure Practice Launch',
      description: 'Formalized enterprise cloud migration, managed infrastructure services, and 24/7 mission-critical NOC/SOC capabilities.',
      tag: 'Cloud Evolution',
    },
    {
      year: '2019',
      title: 'Mobility Practice & Enterprise Products',
      description: 'Introduced comprehensive BYOD/CYOD device management frameworks and initiated development of proprietary HRMS & Vendor Management suites.',
      tag: 'Product Suite',
    },
    {
      year: '2022',
      title: 'AI, Data Analytics & Digital Transformation',
      description: 'Scaled enterprise data analytics, business intelligence pipelines, and modern microservices web engineering for tier-1 enterprises.',
      tag: 'Intelligent Scale',
    },
    {
      year: '2025 – Present',
      title: 'Next-Gen Cognitive Enterprise Systems',
      description: 'Accelerating AI orchestration, cloud-native modernization, and end-to-end digital enterprise solutions for global clients.',
      tag: 'Next Horizon',
    },
  ],
};
