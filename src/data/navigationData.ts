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
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services', hasDropdown: true },
    { label: 'Products', path: '/products' },
    { label: 'Careers', path: '/careers' },
    { label: 'Insights', path: '/insights' },
    { label: 'Contact', path: '/contact' },
  ] as NavItem[],

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
      title: 'DataPulse Analytics',
      description: 'AI-assisted enterprise reporting & executive dashboard suite',
      path: '/products/data-analytics',
      iconName: 'Database',
    },
    {
      id: 'hr-management-system',
      title: 'TalentCore HRMS',
      description: 'Full employee lifecycle, payroll and compliance platform',
      path: '/products/hr-management-system',
      iconName: 'Users',
    },
    {
      id: 'vendor-management',
      title: 'NexVendor VMS',
      description: 'Supplier lifecycle, onboarding and SLA tracking platform',
      path: '/products/vendor-management',
      iconName: 'Handshake',
    },
    {
      id: 'relationship-management',
      title: 'ClientSync CRM',
      description: 'Enterprise relationship management & deal pipeline engine',
      path: '/products/relationship-management',
      iconName: 'Contact',
    },
  ] as SolutionLink[],

  headerCta: {
    label: 'Get Started',
    path: '/contact',
  },
};
