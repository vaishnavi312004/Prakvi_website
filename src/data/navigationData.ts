export interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
}

export interface SolutionLink {
  id: string;
  title: string;
  description: string;
  path: string;
  iconName: string;
  badge?: string;
}

export const navigationData = {
  mainNav: [
    { label: 'WHO WE ARE', path: '/about', hasDropdown: true },
    { label: 'WHAT WE DO', path: '/services', hasDropdown: true },
    { label: 'HOW WE HELP', path: '/case-studies', hasDropdown: true },
    { label: 'CAREERS', path: '/careers' },
  ] as NavItem[],

  whoWeAreLinks: [
    {
      id: 'about-company',
      title: 'About Prakvi',
      description: 'Our story, mission, vision, core values, and engineering heritage',
      path: '/about',
      iconName: 'Building2',
    },
    {
      id: 'recognition',
      title: 'Why Choose Prakvi',
      description: '236+ projects delivered, 100+ clients, 15+ years of enterprise trust',
      path: '/about#recognition',
      iconName: 'Award',
    },
    {
      id: 'offices',
      title: 'Offices & Delivery Centers',
      description: 'New Delhi headquarters & Nashik operations center',
      path: '/contact',
      iconName: 'MapPin',
    },
    {
      id: 'join-team',
      title: 'Life at Prakvi & Careers',
      description: 'Culture, open engineering roles & talent opportunities',
      path: '/careers',
      iconName: 'Users',
    },
  ] as SolutionLink[],

  howWeHelpLinks: [
    {
      id: 'all-services',
      title: 'All 17 Enterprise & Business Services',
      description: 'Explore staffing, cloud, analytics, mobility, consulting & delivery',
      path: '/services',
      iconName: 'Layers',
    },
    {
      id: 'all-products',
      title: 'Proprietary Software Platforms',
      description: 'Data Analytics, Vendor Management & Relationship Management',
      path: '/products',
      iconName: 'Database',
    },
    {
      id: 'case-studies',
      title: 'Case Studies & Client Impact',
      description: 'How we solve operational complexity for modern enterprises',
      path: '/case-studies',
      iconName: 'Briefcase',
    },
    {
      id: 'insights',
      title: 'Insights & Research',
      description: 'Architecture perspectives across AI, cloud, security & talent',
      path: '/insights',
      iconName: 'BookOpen',
    },
  ] as SolutionLink[],

  enterpriseSolutions: [
    {
      id: 'staffing',
      title: 'Staffing',
      description: 'Professional workforce sourcing & specialized IT talent',
      path: '/services/staffing',
      iconName: 'User',
    },
    {
      id: 'mobility-practice',
      title: 'Mobility Practice (BYOD & CYOD)',
      description: 'Secure enterprise mobile frameworks & endpoint protection',
      path: '/services/mobility-practice',
      iconName: 'Smartphone',
    },
    {
      id: 'business-intelligence',
      title: 'Business Intelligence',
      description: 'Actionable intelligence through modern data pipelines',
      path: '/services/business-intelligence',
      iconName: 'BarChart3',
    },
    {
      id: 'supply-chain-management',
      title: 'Supply Chain Management',
      description: 'Logistics visibility, ERP integration & inventory tracking',
      path: '/services/supply-chain-management',
      iconName: 'Truck',
    },
    {
      id: 'workforce-solution',
      title: 'Workforce Solution',
      description: 'Global talent pods, contingent staffing & HR execution',
      path: '/services/workforce-solution',
      iconName: 'Users',
    },
    {
      id: 'system-integration',
      title: 'System Integration',
      description: 'Unified multi-platform environments and API bridges',
      path: '/services/system-integration',
      iconName: 'Plug',
    },
    {
      id: 'cloud-services',
      title: 'Cloud Services',
      description: 'Cloud migration, Kubernetes orchestration & hybrid FinOps',
      path: '/services/cloud-services',
      iconName: 'Cloud',
    },
    {
      id: 'business-analytics',
      title: 'Business Analytics',
      description: 'Predictive modeling and executive decision dashboards',
      path: '/services/business-analytics',
      iconName: 'PieChart',
    },
    {
      id: 'infrastructure-management',
      title: 'Infrastructure Management',
      description: '24/7 high-availability NOC/SOC operations & maintenance',
      path: '/services/infrastructure-management',
      iconName: 'Server',
    },
    {
      id: 'accounting',
      title: 'Accounting',
      description: 'Financial ERP integrations, compliance & reporting',
      path: '/services/accounting',
      iconName: 'Receipt',
    },
    {
      id: 'enterprise-architecture',
      title: 'Enterprise Architecture',
      description: 'Strategic blueprinting and modernization roadmaps',
      path: '/services/enterprise-architecture',
      iconName: 'Layers',
    },
    {
      id: 'it-consulting',
      title: 'IT Consulting',
      description: 'Advisory on digital transformation and tech stack choices',
      path: '/services/it-consulting',
      iconName: 'Headphones',
    },
    {
      id: 'project-management',
      title: 'Project Management',
      description: 'Agile PMO, sprint governance & reliable delivery',
      path: '/services/project-management',
      iconName: 'CheckSquare',
    },
  ] as SolutionLink[],

  businessSolutions: [
    {
      id: 'web-design',
      title: 'Web Design',
      description: 'Clean responsive UI/UX and accessible digital design',
      path: '/services/web-design',
      iconName: 'PenTool',
    },
    {
      id: 'enterprise-solution',
      title: 'Enterprise Solution',
      description: 'Custom portal and scalable web application development',
      path: '/services/enterprise-solution',
      iconName: 'Code2',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'SEO, SEM, B2B lead generation & omni-channel campaigns',
      path: '/services/digital-marketing',
      iconName: 'Megaphone',
    },
    {
      id: 'mobile-app-development',
      title: 'Mobile App Development',
      description: 'Native iOS & Android cross-platform engineering',
      path: '/services/mobile-app-development',
      iconName: 'Smartphone',
    },
  ] as SolutionLink[],

  products: [
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Turn raw enterprise data into predictive, actionable insights',
      path: '/products/data-analytics',
      iconName: 'Database',
    },
    {
      id: 'vendor-management',
      title: 'Vendor Management',
      description: 'Centralized supplier onboarding, procurement & SLA control',
      path: '/products/vendor-management',
      iconName: 'Handshake',
    },
    {
      id: 'relationship-management',
      title: 'Relationship Management',
      description: 'Unified 360° customer CRM, automation & sales pipelines',
      path: '/products/relationship-management',
      iconName: 'Contact',
    },
  ] as SolutionLink[],

  headerCta: {
    label: "Let's Talk",
    path: '/contact',
  },
};
