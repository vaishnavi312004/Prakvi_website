import { generatedImages } from '../assets/images';

export interface HomeHeroData {
  badge: string;
  headlinePrefix: string;
  headlineHighlight: string;
  headlineSuffix: string;
  description: string;
  primaryCta: {
    label: string;
    path: string;
  };
  secondaryCta: {
    label: string;
    path: string;
  };
  highlights: {
    value: string;
    label: string;
  }[];
}

export interface HomeIntroData {
  kicker: string;
  title: string;
  paragraphs: string[];
  proofPoints: string[];
  ctaText: string;
  ctaPath: string;
  image: string;
}

export interface WhyPrakviPillar {
  id: string;
  title: string;
  description: string;
  iconName: 'Award' | 'CheckCircle2' | 'Clock' | 'TrendingUp' | 'ShieldCheck' | 'Layers';
}

export const homeData = {
  hero: {
    badge: 'Prakvi Techno Solutions Private Limited',
    headlinePrefix: 'Innovative',
    headlineHighlight: 'IT Solutions',
    headlineSuffix: 'for Modern Businesses',
    description:
      'At Prakvi, we deliver innovative IT solutions including AI-powered HRMS systems, digital marketing services, and enterprise solutions that streamline operations and enable data-driven decisions. Our expertise covers staffing services, workforce solutions, cloud and cybersecurity, mobile app development, CRM, data analytics, infrastructure management, and IT consulting—ensuring scalable, secure IT services that drive growth and efficiency.',
    primaryCta: {
      label: 'Explore Services',
      path: '/services',
    },
    secondaryCta: {
      label: 'Schedule Consultation',
      path: '/contact',
    },
    highlights: [
      { value: '99.9% Uptime', label: 'Guaranteed reliability' },
      { value: '24/7 Support', label: 'Always here to help' },
    ],
  } as HomeHeroData,

  intro: {
    kicker: 'About Prakvi',
    title: 'Driving Digital Transformation with Innovative Enterprise Solutions',
    paragraphs: [
      'At Prakvi, we believe technology should simplify, connect, and empower businesses. Since our inception, we have been delivering cutting-edge enterprise software solutions that help organizations of all sizes streamline operations, make data-driven decisions, and achieve sustainable growth.',
      'We combine technical expertise with business acumen to deliver solutions that not only work but drive real business value across staffing, cloud, analytics, and enterprise systems.',
    ],
    proofPoints: [
      'Innovation First — Pushing boundaries with cutting-edge solutions',
      'Client-Centric — Your success is our primary focus',
      'Quality Driven — Excellence in every detail we deliver',
    ],
    ctaText: 'Discover Our Story & Values',
    ctaPath: '/about',
    image: generatedImages.introEnterpriseCampus,
  } as HomeIntroData,

  featuredHomeServices: [
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description:
        'Transform your ideas into powerful, scalable web solutions with cutting-edge technology and expert craftsmanship.',
      path: '/services/digital-marketing',
      iconName: 'Monitor',
    },
    {
      id: 'enterprise-solution',
      title: 'Enterprise Solution',
      description:
        'In a business and IT context, Enterprise Solutions generally refers to large-scale, integrated systems or services designed to meet the complex needs of an entire organization, rather than just a small department or individual users.',
      path: '/services/enterprise-solution',
      iconName: 'Layers',
    },
    {
      id: 'infrastructure-management',
      title: 'Infrastructure Management',
      description:
        'Infrastructure management ensures efficient operation, maintenance, and security of IT systems and resources.',
      path: '/services/infrastructure-management',
      iconName: 'Server',
    },
    {
      id: 'staffing',
      title: 'Staffing Services',
      description:
        'Prakvi specializes in comprehensive workforce solutions that align with the evolving demands of diverse industries. Their staffing services form the core of what they do, delivering tailored staffing support that boosts efficiency, reduces costs, and supports long-term client success through customized talent solutions.',
      path: '/services/staffing',
      iconName: 'Users',
    },
    {
      id: 'hr-management-system',
      title: 'Human Resource Management',
      description:
        'Managing human resources efficiently is critical to business success. Prakvi’s HRMS (Human Resource Management System) is an all-in-one, AI-powered solution that simplifies recruitment, payroll, attendance, performance management, and employee engagement, all from a single, user-friendly platform.',
      path: '/products/hr-management-system',
      iconName: 'UserCheck',
    },
    {
      id: 'accounting',
      title: 'Accounting',
      description:
        'Accounting manages finances, payroll, recruitment, compliance, and employee well-being.',
      path: '/services/accounting',
      iconName: 'Receipt',
    },
  ],

  whyPrakvi: {
    kicker: 'Why Choose Prakvi?',
    title: 'Why Choose Prakvi?',
    description:
      'We combine technical expertise with business acumen to deliver solutions that not only work but drive real business value.',
    pillars: [
      {
        id: 'certified-it-professionals',
        title: 'Certified IT Professionals',
        description:
          'Seasoned engineers, cloud specialists, and certified consultants committed to dependable enterprise delivery.',
        iconName: 'Award',
      },
      {
        id: 'proven-track-record',
        title: 'Proven Track Record',
        description:
          'Consistent execution across enterprise IT, digital platforms, analytics, and specialized staffing engagements.',
        iconName: 'CheckCircle2',
      },
      {
        id: '24-7-monitoring-support',
        title: '24/7 Monitoring & Support',
        description:
          'Continuous operational oversight, proactive monitoring, and responsive technical assistance around the clock.',
        iconName: 'Clock',
      },
      {
        id: 'scalable-solutions',
        title: 'Scalable Solutions',
        description:
          'Architectures and workforce frameworks designed to scale smoothly alongside evolving business demand.',
        iconName: 'TrendingUp',
      },
      {
        id: 'cost-effective-services',
        title: 'Cost-Effective Services',
        description:
          'Streamlined delivery models and smart resource optimization that maximize return on technology investments.',
        iconName: 'Layers',
      },
      {
        id: 'industry-best-practices',
        title: 'Industry Best Practices',
        description:
          'Structured methodologies, security governance, and quality standards aligned with modern enterprise benchmarks.',
        iconName: 'ShieldCheck',
      },
    ] as WhyPrakviPillar[],
  },

  careersPreview: {
    kicker: 'Careers at Prakvi',
    title: "Build What's Next With Us.",
    description:
      'Join a collaborative team of engineers, cloud architects, analysts, and staffing specialists building enterprise technology and workforce solutions.',
    primaryCta: {
      label: 'Explore Open Positions',
      path: '/careers',
    },
    secondaryCta: {
      label: 'Our Culture & Values',
      path: '/about',
    },
    image: '/img/careers_culture_team_1794479543837.jpg',
  },
};
