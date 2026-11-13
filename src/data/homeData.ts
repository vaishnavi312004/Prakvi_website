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
  trustBadges: string[];
}

export interface HomeIntroData {
  kicker: string;
  title: string;
  paragraphs: string[];
  proofPoints: string[];
  ctaText: string;
  ctaPath: string;
}

export interface TechnologyPillar {
  id: string;
  title: string;
  description: string;
  iconName: 'Server' | 'Smartphone' | 'Sparkles' | 'ShieldCheck';
  accentText: string;
}

export interface WhyPrakviPillar {
  id: string;
  title: string;
  description: string;
  metric: string;
}

export const homeData = {
  hero: {
    badge: 'Enterprise Technology & Workforce Solutions',
    headlinePrefix: "Engineering Tomorrow's",
    headlineHighlight: 'Digital Enterprise.',
    headlineSuffix: '',
    description:
      'Empowering global businesses through intelligent cloud engineering, resilient enterprise architectures, and agile digital workforce transformation.',
    primaryCta: {
      label: 'Explore Solutions',
      path: '/services',
    },
    secondaryCta: {
      label: 'Schedule Consultation',
      path: '/contact',
    },
    trustBadges: [
      'ISO 9001:2015 Certified',
      '500+ Enterprise Deployments',
      '99.9% Delivery SLA',
      '15+ Years Track Record',
    ],
  } as HomeHeroData,

  intro: {
    kicker: 'Who We Are',
    title: 'Architecting resilient technology platforms for market leaders worldwide.',
    paragraphs: [
      'Founded with a mission to bridge complex technology domains with measurable business value, Prakvi operates as an agile enterprise catalyst. From full-scale cloud migrations and specialized healthcare staffing to cognitive AI integrations and proprietary workforce software, we build systems designed to perform at global enterprise scale.',
      'We work as an embedded extension of your technology and executive teams, delivering transparent governance, predictable delivery velocity, and measurable ROI across every engagement.',
    ],
    proofPoints: [
      'CIN Registered Corporate Entity',
      'Global Innovation & Delivery Centers',
      'End-to-End Enterprise Architecture Governance',
    ],
    ctaText: 'Learn more about our journey & leadership',
    ctaPath: '/about',
  } as HomeIntroData,

  technologyShowcase: {
    kicker: 'Innovation Architecture',
    title: 'Technology That Moves Business Forward',
    description:
      'Our engineering foundation combines battle-tested cloud backbones, intelligent automation, and rigorous governance to give enterprises durable velocity.',
    pillars: [
      {
        id: 'cloud',
        title: 'Cloud Orchestration',
        description:
          'Multi-region auto-scaling Kubernetes fabrics with zero-trust network segregation and sub-second failover.',
        iconName: 'Server',
        accentText: '99.99% Availability Architecture',
      },
      {
        id: 'mobility',
        title: 'Distributed Mobility',
        description:
          'Hardware-backed BYOD/CYOD containerization protecting sensitive corporate IP across any endpoint device.',
        iconName: 'Smartphone',
        accentText: 'Zero-Trust Endpoint Shield',
      },
      {
        id: 'cognitive',
        title: 'Cognitive Intelligence',
        description:
          'Private VPC Retrieval-Augmented Generation (RAG) and predictive models trained exclusively on enterprise context.',
        iconName: 'Sparkles',
        accentText: 'Enterprise AI Modernization',
      },
      {
        id: 'security',
        title: 'Governed Security',
        description:
          'Automated continuous posture management compliant with SOC 2, HIPAA, ISO 27001, and GDPR mandates.',
        iconName: 'ShieldCheck',
        accentText: 'Audited Multi-Standard Compliance',
      },
    ] as TechnologyPillar[],
  },

  whyPrakvi: {
    kicker: 'The Prakvi Distinction',
    title: 'Why Global Enterprises Partner With Prakvi',
    description:
      'We combine direct architect-level engagement, transparent SLAs, and high-velocity engineering outcomes without bureaucratic agency overhead.',
    pillars: [
      {
        id: 'tech-expertise',
        title: 'Technical Expertise',
        description:
          'Practicing senior architects and certified cloud engineers evaluate every technical blueprint before implementation.',
        metric: 'Senior-only technical leads',
      },
      {
        id: 'client-focus',
        title: 'Client-Focused Delivery',
        description:
          'Transparent governance, shared Slack/Teams channels, and bi-weekly milestone reviews ensure total strategic alignment.',
        metric: 'Dedicated delivery governance',
      },
      {
        id: 'scalable-solutions',
        title: 'Scalable Solutions',
        description:
          'Microservice systems and staffing models that seamlessly expand from initial prototypes to global enterprise scale.',
        metric: 'Elastic cloud-native scale',
      },
      {
        id: 'business-understanding',
        title: 'Business Understanding',
        description:
          'Technology is mapped directly to operational P&L, customer retention, and quantifiable EBITDA margins.',
        metric: 'Direct ROI & P&L alignment',
      },
      {
        id: 'security-reliability',
        title: 'Security & Reliability',
        description:
          'Enterprise-grade encryption, zero-trust role-based access, and audited compliance built natively into every pipeline.',
        metric: 'Zero-trust security fabric',
      },
      {
        id: 'continuous-innovation',
        title: 'Continuous Innovation',
        description:
          'Active R&D pipelines bringing modern GenAI, cloud FinOps, and mobile endpoint innovations to our clients.',
        metric: 'Continuous R&D pipelines',
      },
    ] as WhyPrakviPillar[],
  },

  careersPreview: {
    kicker: 'Join Our Collective',
    title: "Build What's Next With Us.",
    description:
      'At Prakvi, we nurture autonomous problem solvers, cloud architects, and talent leaders. We provide fully funded certifications, high-impact enterprise projects, and an open, collaborative engineering culture.',
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
