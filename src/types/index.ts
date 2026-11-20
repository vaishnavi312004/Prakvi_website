export interface ServiceStackTab {
  label: string;
  items: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: 'enterprise' | 'business' | 'products';
  shortDesc: string;
  fullDesc: string;
  tagline: string;
  iconName: string;
  badge?: string;
  offeringsTitle?: string;
  offeringsSubtitle?: string;
  businessChallenge: string;
  howWeHelp: string;
  capabilities: {
    title: string;
    description: string;
    icon?: string;
    points?: string[];
  }[];
  businessBenefits: {
    title: string;
    description: string;
    metric?: string;
  }[];
  processTitle?: string;
  processSubtitle?: string;
  deliverySteps: {
    step: string;
    title: string;
    description: string;
    points?: string[];
  }[];
  stackTitle?: string;
  stackSummary?: string;
  stackTabs?: ServiceStackTab[];
  faqs: {
    question: string;
    answer: string;
  }[];
  featuredImage: string;
}

export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  architecturePoints: string[];
  deliverySteps?: {
    step: string;
    title: string;
    description: string;
  }[];
  stackTitle?: string;
  stackSummary?: string;
  stackTabs?: ServiceStackTab[];
  stats: { label: string; value: string }[];
  iconName: string;
  badge?: string;
  image: string;
}

export interface JobItem {
  id: string;
  slug: string;
  title: string;
  department: 'Engineering' | 'Workforce Solutions' | 'Cloud & DevOps' | 'Consulting' | 'Product' | 'Quality Assurance';
  location: string;
  locationType: 'Hybrid' | 'Remote' | 'On-site';
  employmentType: 'Full-time' | 'Contract' | 'C2H';
  experienceLevel: string;
  postedDate: string;
  overview: string;
  responsibilities: string[];
  qualifications: string[];
  preferredSkills: string[];
  benefitsSummary: string[];
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  category: 'Artificial Intelligence' | 'Cloud Computing' | 'Cybersecurity' | 'Digital Transformation' | 'Enterprise Technology' | 'Recruitment & Workforce';
  publishedDate: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  featuredImage: string;
  tags: string[];
  content: {
    heading?: string;
    paragraphs: string[];
  }[];
}

export interface ContactSubmission {
  fullName: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  message: string;
  privacyConsent: boolean;
}
