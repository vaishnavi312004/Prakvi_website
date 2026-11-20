import { ProductItem } from '../types';
import { generatedImages } from '../assets/images';
import { hrManagementData } from './hrManagementData';

export const dataAnalyticsSolutions = [
  {
    title: 'Descriptive Analytics',
    description: 'Understand past trends, patterns, and performance through real-time dashboards and reporting.',
    icon: 'TrendingUp',
  },
  {
    title: 'Diagnostic Analytics',
    description: 'Identify the "why" behind business trends, uncover hidden correlations, and optimize operations.',
    icon: 'Search',
  },
  {
    title: 'Predictive Analytics',
    description: 'Use AI and machine learning to forecast future outcomes, mitigate risks, and seize new opportunities.',
    icon: 'BarChart3',
  },
  {
    title: 'Prescriptive Analytics',
    description: 'Move beyond insights to actionable strategies that enhance efficiency and maximize ROI.',
    icon: 'Target',
  },
  {
    title: 'Big Data Processing',
    description: 'Handle large-scale datasets with cloud-powered analytics, ensuring speed, accuracy, and scalability.',
    icon: 'Server',
  },
  {
    title: 'Self-Service BI',
    description: 'Empower teams with intuitive data visualization tools and interactive dashboards for informed decision-making.',
    icon: 'BarChart3',
  },
];

export const vendorManagementSolutions = [
  {
    title: 'Seamless Vendor Onboarding',
    description: 'Automate registrations, approvals, and document verification to onboard vendors effortlessly.',
    icon: 'Users',
  },
  {
    title: 'Centralized Vendor Database',
    description: 'Maintain a single source of truth with real-time vendor data, contracts, and compliance records.',
    icon: 'Server',
  },
  {
    title: 'Automated Procurement & Workflows',
    description: 'Streamline purchase orders, approvals, invoicing, and payments to enhance efficiency.',
    icon: 'GitBranch',
  },
  {
    title: 'Performance Monitoring & SLA Tracking',
    description: 'Evaluate vendor KPIs, contract adherence, and service levels with real-time analytics.',
    icon: 'TrendingUp',
  },
  {
    title: 'Risk & Compliance Management',
    description: 'Ensure adherence to regulatory standards, mitigate risks and enforce contractual obligations.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Seamless Integrations',
    description: 'Connect VMS with ERP, finance, and supply chain systems for end-to-end visibility.',
    icon: 'Plug',
  },
  {
    title: 'Data-Driven Insights',
    description: 'Leverage AI-powered analytics for vendor evaluation, cost optimization, and risk assessment.',
    icon: 'BarChart3',
  },
];

export const relationshipManagementSolutions = [
  {
    title: 'Sales Automation',
    description: 'Shorten sales cycles with AI-driven lead scoring, automated follow-ups, and seamless deal tracking.',
    icon: 'GitBranch',
  },
  {
    title: 'Marketing Automation',
    description: 'Targeted campaigns, analyze customer behavior, and personalize engagement across multiple channels.',
    catalogDescription: 'Run targeted campaigns, analyze customer behavior, and personalize engagement across multiple channels.',
    icon: 'Smartphone',
  },
  {
    title: 'Customer Support & Helpdesk',
    description: 'Improve response times with ticketing systems, self-service portals, and AI-powered chatbots.',
    icon: 'Headset',
  },
  {
    title: '360° Customer View',
    description: 'Gain real-time insights into customer interactions, purchase history, and preferences for smarter decision-making.',
    icon: 'Users',
  },
  {
    title: 'Cloud-Based & Scalable',
    description: 'Our CRM solutions grow with your business, ensuring secure, flexible, and on-the-go accessibility.',
    icon: 'Server',
  },
  {
    title: 'Seamless Integration',
    description: 'Connect effortlessly with ERP, e-commerce, social media, and third-party applications for a unified workflow.',
    icon: 'Plug',
  },
];

export const productsData: ProductItem[] = [
  {
    id: 'data-analytics',
    slug: 'data-analytics',
    name: 'Data Analytics',
    tagline: 'Turn Data into Actionable Business Insights',
    shortDesc:
      'Collect, process, and interpret complex data with AI-driven algorithms, predictive analytics, and interactive dashboards to uncover patterns and accelerate growth.',
    fullDesc:
      "In today's data-driven world, the right insights give your business a competitive edge. Prakvi offers end-to-end data analytics services in India to help organizations collect, process, and interpret complex data for smarter decisions. Using advanced analytics tools, AI-driven algorithms, and industry expertise, we uncover patterns, predict trends, and optimize performance, turning raw data into strategies that drive growth and profitability.",
    features: dataAnalyticsSolutions.map(({ title, description }) =>
      `${title} — ${description.replace(/"([^"]+)"/g, '“$1”')}`,
    ),
    benefits: [],
    useCases: [],
    architecturePoints: [],
    deliverySteps: [
      {
        step: '01',
        title: 'Business Understanding & Goal Setting',
        description:
          'We begin by aligning with your business objectives and understanding your unique challenges. This step sets the foundation for a data strategy that delivers relevant, impactful insights.',
      },
      {
        step: '02',
        title: 'Data Collection & Integration',
        description:
          'We gather data from diverse sources, internal systems, third-party platforms, and beyond. Our team ensures seamless integration and readiness for advanced analytics.',
      },
      {
        step: '03',
        title: 'Data Cleansing & Preparation',
        description:
          'We clean, standardize, and transform raw data to ensure accuracy and consistency. This critical phase paves the way for reliable modeling and meaningful analysis.',
      },
      {
        step: '04',
        title: 'Advanced Analytics & Modeling',
        description:
          'Our data scientists apply statistical techniques and machine learning models to uncover patterns, correlations, and forecasts that drive strategic decisions.',
      },
      {
        step: '05',
        title: 'Insightful Visualization & Reporting',
        description:
          'We transform complex findings into intuitive dashboards and visual reports, delivering clarity and accessibility for all stakeholders, from analysts to executives.',
      },
      {
        step: '06',
        title: 'Continuous Improvement & Action',
        description:
          "Our journey doesn't end at delivery. We enable iterative learning, ongoing optimization, and alignment with evolving business goals, fueling long-term success through data.",
      },
    ],
    stackTitle: 'Data Analytics – Turning Data into Actionable Insights',
    stackSummary:
      "Unearth the hidden narratives within your data and transform them into strategic imperatives with Prakvi's Data Analytics services. We don't just generate reports, we architect insightful journeys, revealing patterns and predictions that empower you to make informed decisions.",
    stackTabs: [
      {
        label: 'Data Modeling',
        items: ['Data Architecture', 'ETL Processes', 'Data Warehousing', 'Schema Design'],
      },
      {
        label: 'Predictive Analytics',
        items: ['Forecast Modeling', 'Machine Learning', 'Regression Analysis', 'Cluster Analysis'],
      },
      {
        label: 'Visualization',
        items: ['Power BI', 'Tableau', 'Google Data Studio', 'Looker'],
      },
      {
        label: 'Platforms & Tools',
        items: ['Python', 'SQL', 'R', 'Azure Synapse', 'AWS Redshift'],
      },
    ],
    stats: [
      { label: 'Core Modules', value: '6 Suites' },
      { label: 'Methodology', value: '6-Stage' },
      { label: 'BI Engines', value: 'Power BI / Tableau' },
      { label: 'Deployment', value: 'Cloud-Ready' },
    ],
    iconName: 'BarChart2',
    badge: 'Business Intelligence Tools',
    image: generatedImages.serviceBiAnalytics3d,
  },
  {
    id: 'hr-management-system', slug: 'hr-management-system',
    name: 'HR Management System', tagline: 'Simplify the Employee Lifecycle',
    shortDesc: 'Centralize employee records, onboarding, attendance, leave, and HR workflows.',
    fullDesc: hrManagementData.heroDescription,
    features: ['Employee directory and records', 'Onboarding and offboarding workflows', 'Attendance and leave management', 'Payroll input preparation', 'Employee self-service requests', 'HR reports and approval tracking'],
    benefits: [],
    useCases: [],
    architecturePoints: [],
    stats: [{ label: 'Focus', value: 'Employee Lifecycle' }, { label: 'Workflows', value: 'HR Operations' }],
    iconName: 'Users', badge: 'Employee Lifecycle Automation', image: generatedImages.serviceStaffingTeam,
  },
  {
    id: 'vendor-management',
    slug: 'vendor-management',
    name: 'Vendor Management',
    tagline: 'Streamline Supplier Relationships with Prakvi’s Vendor Management System',
    shortDesc:
      'Centralize vendor data, automate procurement workflows, monitor SLAs, manage contract lifecycles, and strengthen supplier governance.',
    fullDesc:
      'Effective vendor management is key to cost savings and quality assurance. Prakvi offers a comprehensive Vendor Management System (VMS) in India to centralize vendor data, track performance, streamline procurement, and ensure compliance. Our platform supports vendor onboarding, contract renewal, and lifecycle management with automated workflows, real-time analytics, and secure cloud access to reduce risks and strengthen vendor relationships.',
    features: vendorManagementSolutions.map(({ title, description }) => `${title} — ${description}`),
    benefits: [],
    useCases: [],
    architecturePoints: [],
    deliverySteps: [
      {
        step: '01',
        title: 'Assessment & Strategy',
        description:
          'We begin by evaluating your current vendor management practices, identifying challenges, and aligning the VMS strategy with your business goals for optimal results.',
      },
      {
        step: '02',
        title: 'Platform Design & Customization',
        description:
          'Our team designs a tailored VMS framework that includes procurement automation, contract workflows, and compliance structures specific to your operational needs.',
      },
      {
        step: '03',
        title: 'System Development & Integration',
        description:
          'We build and integrate the VMS with your existing infrastructure, ensuring real-time data flow, scalability, and seamless interaction with procurement and finance systems.',
      },
      {
        step: '04',
        title: 'Testing & Validation',
        description:
          'Thorough validation is conducted to ensure the VMS is reliable and secure. This includes performance testing, vendor onboarding simulations, and compliance checks.',
      },
      {
        step: '05',
        title: 'Deployment & User Training',
        description:
          'The system is deployed with proper configuration, access controls, and training sessions for stakeholders to ensure effective adoption and immediate operational impact.',
      },
      {
        step: '06',
        title: 'Ongoing Optimization & Support',
        description:
          'Post-launch, we offer continuous support, performance analytics, and feature enhancements to adapt the VMS as your business evolves and vendor dynamics shift.',
      },
    ],
    stackTitle: 'Vendor Management System (VMS)',
    stackSummary:
      'Optimize, automate, and elevate your vendor ecosystem with a powerful, strategic platform.',
    stackTabs: [
      {
        label: 'Procurement',
        items: ['Automated Purchase Requests', 'Supplier Onboarding', 'Sourcing Workflow', 'Vendor Portal', 'Automated Approvals'],
      },
      {
        label: 'Contract Management',
        items: ['Digital Contracts', 'Lifecycle Tracking', 'Renewal Alerts', 'Obligation Management', 'Centralized Repository'],
      },
      {
        label: 'Performance Monitoring',
        items: ['KPI Dashboards', 'Vendor Rating System', 'Performance Audits', 'Compliance Tracking', 'Risk Mitigation Tools'],
      },
      {
        label: 'Efficiency Tools',
        items: ['Process Automation', 'Collaboration Features', 'Real-time Insights', 'Mobile Access', 'Secure Infrastructure'],
      },
    ],
    stats: [
      { label: 'VMS Modules', value: '7 Core' },
      { label: 'Delivery Model', value: '6-Phase' },
      { label: 'Access', value: 'Cloud & Mobile' },
      { label: 'ERP Sync', value: 'Real-Time' },
    ],
    iconName: 'ShieldCheck',
    badge: 'Partner Onboarding & Tracking',
    image: generatedImages.serviceArchitecture3d,
  },
  {
    id: 'relationship-management',
    slug: 'relationship-management',
    name: 'Relationship Management',
    tagline: 'Strengthen Customer Connections with Prakvi’s Relationship Management Solutions',
    shortDesc:
      'Centralize customer data, automate sales & marketing workflows, track interactions with a 360° customer view, and boost conversions.',
    fullDesc:
      "In today's competitive market, strong relationships with customers and partners are vital. Prakvi's CRM software in India centralizes customer data, tracks interactions, and personalizes communication to boost loyalty and sales conversions. With real-time analytics, automated workflows, and cloud accessibility, our relationship management solutions help businesses enhance engagement, improve support, and drive long-term growth.",
    features: relationshipManagementSolutions.map(({ title, description, catalogDescription }) =>
      `${title} — ${catalogDescription ?? description}`,
    ),
    benefits: [],
    useCases: [],
    architecturePoints: [],
    deliverySteps: [
      {
        step: '01',
        title: 'Assessment & Strategy',
        description:
          'We begin by evaluating your current systems, customer touchpoints, and engagement strategies. This phase involves identifying gaps, defining KPIs, and outlining a CRM roadmap tailored to your business goals.',
      },
      {
        step: '02',
        title: 'Design & Customization',
        description:
          'Our team designs a CRM architecture that fits your business workflow. We customize modules, user interfaces, and data fields to create a seamless, brand-aligned customer experience platform.',
      },
      {
        step: '03',
        title: 'Integration & Automation',
        description:
          'We integrate the CRM system with your existing tools (email, marketing, support, etc.) and automate repetitive processes, ensuring consistent customer interactions and reducing manual effort.',
      },
      {
        step: '04',
        title: 'Data Migration & Validation',
        description:
          'We securely migrate customer data from legacy systems, ensuring data integrity and minimal downtime. All records are cleansed, validated, and structured for unified customer views.',
      },
      {
        step: '05',
        title: 'Training & Go-Live',
        description:
          'Before launch, we provide hands-on training to your team, enabling smooth adoption. The system goes live with real-time monitoring, performance checks, and full stakeholder support.',
      },
      {
        step: '06',
        title: 'Ongoing Support & Optimization',
        description:
          'Post-launch, we deliver continuous support, performance tuning, feature enhancements, and insights from analytics to help you deepen customer relationships and drive ROI.',
      },
    ],
    stackTitle: 'Customer Relationship Management (CRM) Tools',
    stackSummary:
      'Elevate customer engagement through personalized CRM implementation and optimization',
    stackTabs: [
      {
        label: 'Customer Insights',
        items: ['Behavioral Analytics', 'Customer Segmentation', '360° Customer View'],
      },
      {
        label: 'Automation & Workflows',
        items: ['Automated Workflows', 'Email Campaign Automation', 'Lead Scoring & Alerts'],
      },
      {
        label: 'Data Management',
        items: ['Unified Data Repository', 'Data Privacy & Compliance', 'Real-Time Sync'],
      },
      {
        label: 'CRM Platforms',
        items: ['HubSpot', 'Salesforce', 'Zoho CRM', 'Microsoft Dynamics 365', 'Freshsales'],
      },
    ],
    stats: [
      { label: 'Core Suites', value: '6 Modules' },
      { label: 'Implementation', value: '6-Stage' },
      { label: 'Customer View', value: '360° Unified' },
      { label: 'CRM Ecosystems', value: '5+ Platforms' },
    ],
    iconName: 'Briefcase',
    badge: 'Client & Contact CRM Tools',
    image: generatedImages.serviceMarketingWeb3d,
  },
];
