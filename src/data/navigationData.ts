import { sortCatalog, enterpriseServiceOrder, businessServiceOrder, productOrder } from './catalogOrder';
import { servicesData } from './servicesData';
import { productsData } from './productsData';
import { insightsData } from './insightsData';
import { jobsData } from './careersData';

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

export type NavSectionKey = 'who' | 'what' | 'how' | 'careers';

export interface TreeNavNode {
  id: string;
  label: string;
  path?: string;
  iconName?: string;
  children?: TreeNavNode[];
}

export interface NavTreeSection {
  key: NavSectionKey;
  label: string;
  href: string;
  nodes: TreeNavNode[];
}

export const navigationData = {
  mainNav: [
    { label: 'WHO WE ARE', path: '/about', hasDropdown: true },
    { label: 'WHAT WE DO', path: '/services', hasDropdown: true },
    { label: 'HOW WE HELP', path: '/case-studies', hasDropdown: true },
    { label: 'CAREERS', path: '/careers', hasDropdown: true },
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

  enterpriseSolutions: sortCatalog([
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
  ] as SolutionLink[], enterpriseServiceOrder),

  businessSolutions: sortCatalog([
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
  ] as SolutionLink[], businessServiceOrder),

  products: sortCatalog([
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      description: 'Turn raw enterprise data into predictive, actionable insights',
      path: '/products/data-analytics',
      iconName: 'Database',
    },
    {
      id: 'hr-management-system',
      title: 'HR Management System',
      description: 'Employee lifecycle automation',
      path: '/products/hr-management-system',
      iconName: 'Users',
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
  ] as SolutionLink[], productOrder),

  headerCta: {
    label: "Let's Talk",
    path: '/contact',
  },
};

function buildServiceTreeNodes(category: 'enterprise' | 'business'): TreeNavNode[] {
  const catalogNode: TreeNavNode = {
    id: `what-${category}-all`,
    label:
      category === 'enterprise'
        ? 'All Enterprise Solutions Overview'
        : 'All Business Solutions Overview',
    path: `/services?category=${category}`,
  };

  const practiceNodes: TreeNavNode[] = servicesData
    .filter((service) => service.category === category)
    .map((service) => ({
      id: `what-${category}-${service.slug}`,
      label: service.title,
      iconName: service.iconName,
      children: [
        {
          id: `what-${category}-${service.slug}-overview`,
          label: `${service.title} Overview`,
          path: `/services/${service.slug}`,
        },
        ...service.capabilities.map((cap, idx) => ({
          id: `what-${category}-${service.slug}-cap-${idx}`,
          label: cap.title,
          path: `/services/${service.slug}#capabilities`,
        })),
      ],
    }));

  return [catalogNode, ...practiceNodes];
}

function buildProductTreeNodes(): TreeNavNode[] {
  const catalogNode: TreeNavNode = {
    id: 'what-products-all',
    label: 'All Products Portfolio',
    path: '/products',
  };

  const productNodes: TreeNavNode[] = productsData.map((product) => ({
    id: `what-product-${product.slug}`,
    label: product.name,
    iconName: product.iconName,
    children: [
      {
        id: `what-product-${product.slug}-overview`,
        label: `${product.name} Overview`,
        path: `/products/${product.slug}`,
      },
      ...product.features.map((feature, idx) => ({
        id: `what-product-${product.slug}-feat-${idx}`,
        label: feature.split('—')[0].trim(),
        path: `/products/${product.slug}#features`,
      })),
    ],
  }));

  return [catalogNode, ...productNodes];
}

function buildCareerDepartmentNodes(): TreeNavNode[] {
  const departments = Array.from(new Set(jobsData.map((job) => job.department)));
  return [
    {
      id: 'careers-open-all',
      label: `All Open Positions (${jobsData.length})`,
      path: '/careers#open-positions',
    },
    ...departments.map((department) => {
      const deptJobs = jobsData.filter((job) => job.department === department);
      const encodedDept = encodeURIComponent(department);
      return {
        id: `careers-dept-${department.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        label: department,
        children: deptJobs.map((job) => ({
          id: `careers-job-${job.id}`,
          label: job.title,
          path: `/careers?dept=${encodedDept}#open-positions`,
        })),
      };
    }),
  ];
}

export const navigationTrees: Record<NavSectionKey, NavTreeSection> = {
  who: {
    key: 'who',
    label: 'Who We Are',
    href: '/about',
    nodes: [
      {
        id: 'who-about',
        label: 'About Prakvi',
        iconName: 'Building2',
        children: [
          { id: 'who-about-overview', label: 'About Prakvi Overview', path: '/about' },
          { id: 'who-about-story', label: 'Our Story is Your Success', path: '/about#story' },
          { id: 'who-about-mission', label: 'Our Mission & Our Vision', path: '/about#mission-vision' },
          { id: 'who-about-values', label: 'Our Core Values', path: '/about#values' },
          { id: 'who-about-culture', label: 'Our Culture', path: '/about#culture' },
        ],
      },
      {
        id: 'who-why',
        label: 'Why Choose Prakvi',
        iconName: 'Award',
        children: [
          {
            id: 'who-why-recognition',
            label: 'Recognition & Achievements',
            path: '/about#recognition',
          },
          {
            id: 'who-why-overview',
            label: 'Enterprise Delivery Trust',
            path: '/about',
          },
        ],
      },
      {
        id: 'who-offices',
        label: 'Offices & Delivery Centers',
        iconName: 'MapPin',
        children: [
          {
            id: 'who-offices-contact',
            label: 'Contact & Consultation',
            path: '/contact',
          },
          {
            id: 'who-offices-delhi',
            label: 'Delhi Office (Headquarters)',
            path: '/contact?office=delhi-office',
          },
          {
            id: 'who-offices-nashik',
            label: 'Nashik Office (Regional Hub)',
            path: '/contact?office=nashik-office',
          },
        ],
      },
      {
        id: 'who-life',
        label: 'Life at Prakvi & Careers',
        iconName: 'Users',
        children: [
          {
            id: 'who-life-careers',
            label: 'Careers at Prakvi',
            path: '/careers',
          },
          {
            id: 'who-life-culture',
            label: 'Employee Experience & Benefits',
            path: '/careers#culture',
          },
        ],
      },
    ],
  },

  what: {
    key: 'what',
    label: 'What We Do',
    href: '/services',
    nodes: [
      {
        id: 'what-enterprise',
        label: 'Enterprise Solutions',
        iconName: 'Layers',
        children: buildServiceTreeNodes('enterprise'),
      },
      {
        id: 'what-business',
        label: 'Business Solutions',
        iconName: 'Code2',
        children: buildServiceTreeNodes('business'),
      },
      {
        id: 'what-products',
        label: 'Products',
        iconName: 'Database',
        children: buildProductTreeNodes(),
      },
    ],
  },

  how: {
    key: 'how',
    label: 'How We Help',
    href: '/case-studies',
    nodes: [
      {
        id: 'how-services',
        label: 'All 17 Enterprise & Business Services',
        iconName: 'Layers',
        children: [
          { id: 'how-services-all', label: 'All Services Catalog', path: '/services' },
          {
            id: 'how-services-enterprise',
            label: 'Enterprise Solutions (13 Practices)',
            path: '/services?category=enterprise',
          },
          {
            id: 'how-services-business',
            label: 'Business Solutions (4 Practices)',
            path: '/services?category=business',
          },
        ],
      },
      {
        id: 'how-products',
        label: 'Proprietary Software Platforms',
        iconName: 'Database',
        children: [
          { id: 'how-products-all', label: 'All Products Portfolio', path: '/products' },
          ...productsData.map((product) => ({
            id: `how-product-${product.slug}`,
            label: product.name,
            path: `/products/${product.slug}`,
          })),
        ],
      },
      {
        id: 'how-case-studies',
        label: 'Case Studies & Client Impact',
        iconName: 'Briefcase',
        path: '/case-studies',
      },
      {
        id: 'how-insights',
        label: 'Insights & Research',
        iconName: 'BookOpen',
        children: [
          { id: 'how-insights-all', label: 'All Insights & Articles', path: '/insights' },
          ...insightsData.map((article) => ({
            id: `how-insight-${article.slug}`,
            label: article.title,
            path: `/insights/${article.slug}`,
          })),
        ],
      },
    ],
  },

  careers: {
    key: 'careers',
    label: 'Careers',
    href: '/careers',
    nodes: [
      {
        id: 'careers-culture',
        label: 'Life & Culture at Prakvi',
        iconName: 'Users',
        children: [
          { id: 'careers-overview', label: 'Careers Overview', path: '/careers' },
          {
            id: 'careers-benefits',
            label: 'Employee Experience & Benefits',
            path: '/careers#culture',
          },
          {
            id: 'careers-hiring',
            label: '5-Stage Hiring Journey',
            path: '/careers#hiring-journey',
          },
        ],
      },
      {
        id: 'careers-positions',
        label: 'Open Positions',
        iconName: 'Briefcase',
        children: buildCareerDepartmentNodes(),
      },
    ],
  },
};

