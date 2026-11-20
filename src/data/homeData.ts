import { generatedImages } from '../assets/images';

export const homeData = {
  hero: {
    badge: 'Prakvi Techno Solutions Private Limited',
    title: 'Reliable Staffing & IT Solutions for Growing Businesses',
    description: 'Prakvi Techno Solutions Private Limited delivers reliable staffing and recruitment solutions to businesses across India. From IT staffing and contract recruitment to permanent hiring and workforce management, we help organisations find skilled professionals who match their business requirements. Our tailored talent acquisition approach simplifies hiring, improves workforce efficiency, and supports sustainable business growth. Whether you are a start-up, growing company, or established enterprise, Prakvi helps you build the right team with the right talent.',
    primaryCta: { label: 'Get a Staffing Consultation', path: '/contact' },
  },

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
  },

  services: {
    title: 'Comprehensive Staffing & Business Solutions',
    description: 'Find the right talent and technology solutions to help your business operate efficiently. Prakvi offers customised staffing, recruitment, HR and IT services designed to meet the changing needs of modern businesses across India.',
    cards: [
      {
        id: 'it-staffing',
        title: 'IT Staffing Solutions',
        description: 'Find qualified IT professionals for your organisation, including software developers, IT engineers, technical specialists, and other technology professionals. Our IT staffing solutions help businesses build capable teams for short-term projects and long-term requirements.',
        href: '/services/staffing',
        imageKey: 'staffing',
        category: 'Staffing',
      },
      {
        id: 'permanent-recruitment',
        title: 'Permanent Recruitment',
        description: 'Hire the right people for long-term business success. Our permanent recruitment services help organisations identify, evaluate, and recruit qualified candidates for entry-level, mid-level, and senior management positions across industries.',
        href: '/services/staffing#capabilities',
        imageKey: 'it-consulting',
        category: 'Recruitment',
      },
      {
        id: 'contract-staffing',
        title: 'Contract & Temporary Staffing',
        description: 'Manage changing workforce requirements with flexible staffing solutions. We help businesses source professionals for temporary assignments, contractual positions, seasonal requirements, and project-based engagements.',
        href: '/services/staffing#capabilities',
        imageKey: 'project-management',
        category: 'Staffing',
      },
      {
        id: 'workforce-management',
        title: 'Workforce Management',
        description: 'Improve workforce planning, resource allocation, and operational efficiency with customised workforce solutions. We help businesses manage staffing requirements and build teams aligned with their organisational goals.',
        href: '/services/workforce-solution',
        imageKey: 'workforce-solution',
        category: 'Workforce',
      },
      {
        id: 'human-resource-management',
        title: 'Human Resource Management',
        description: 'Simplify HR operations with technology-driven HRMS solutions. Manage employee information, attendance, payroll, recruitment, and performance-related processes through an integrated HR management platform.',
        href: '/products/hr-management-system',
        imageKey: 'hr-management-system',
        category: 'HR Technology',
      },
      {
        id: 'enterprise-it',
        title: 'Enterprise IT Solutions',
        description: 'Support your digital transformation with enterprise technology services, infrastructure management, cloud solutions, cybersecurity, CRM, and business technology consulting.',
        href: '/services/enterprise-solution',
        imageKey: 'enterprise-solution',
        category: 'IT Services',
      },
    ],
  },

  whyPrakvi: {
    title: 'Why Choose Prakvi for Staffing Solutions?',
    paragraphs: [
      'Finding the right talent is essential for business success. At Prakvi, we understand that every organisation has unique workforce requirements. Our staffing approach focuses on understanding your business needs, identifying suitable candidates, and supporting you throughout the recruitment process.',
      'We work towards helping businesses simplify recruitment, access relevant talent, and build productive teams.',
    ],
    pillars: [
      {
        id: 'industry-focused-recruitment',
        title: 'Industry-Focused Recruitment',
        description: 'Staffing support aligned with your industry and business requirements.',
        gallery: {
          image: '/assets/why-prakvi/business-partnership.webp',
          alt: 'Business and technology professionals collaborating on a laptop',
        },
      },
      {
        id: 'qualified-talent-pool',
        title: 'Qualified Talent Pool',
        description: 'Access to candidates with relevant qualifications, experience and skill sets.',
        gallery: {
          image: '/assets/why-prakvi/expert-team.webp',
          alt: 'IT professionals collaborating around a laptop in a modern office',
        },
      },
      {
        id: 'flexible-staffing-models',
        title: 'Flexible Staffing Models',
        description: 'Permanent, temporary, contractual and project-based recruitment options.',
        gallery: {
          image: '/assets/why-prakvi/it-infrastructure.webp',
          alt: 'Rows of enterprise servers in a data center',
        },
      },
      {
        id: 'streamlined-hiring-process',
        title: 'Streamlined Hiring Process',
        description: 'Structured sourcing, screening, shortlisting and interview coordination.',
        gallery: {
          image: '/assets/why-prakvi/security-practices.webp',
          alt: 'Close-up of circuit-board traces and components representing secure IT infrastructure',
        },
      },
      {
        id: 'business-oriented-solutions',
        title: 'Business-Oriented Solutions',
        description: 'Recruitment strategies designed around your workforce requirements.',
        gallery: {
          image: '/assets/why-prakvi/monitoring-support.webp',
          alt: 'Technology team working together at a computer',
        },
      },
      {
        id: 'ongoing-client-support',
        title: 'Ongoing Client Support',
        description: 'Continued communication and recruitment assistance throughout the engagement.',
        gallery: {
          image: '/images/services/relationship-management.jpg',
          alt: 'A professional interacting with a customer dashboard on a laptop',
        },
      },
    ],
  },

  contact: {
    title: "Let's Build Your Workforce Together",
    paragraphs: [
      'Looking for a reliable staffing agency? Connect with Prakvi Techno Solutions to discuss your recruitment and workforce requirements.',
      'Whether you need IT professionals, permanent employees, contract staff or specialised talent, our team is ready to understand your requirements and explore the right staffing approach for your business.',
    ],
  },
};
