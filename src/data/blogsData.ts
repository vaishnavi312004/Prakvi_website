import { generatedImages } from '../assets/images';

export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  title: string;
  description: string;
  publishedDate: string;
  author: string;
  coverImage: string;
  content: string[];
}

export const blogsData: BlogPost[] = [
  {
    id: 'ai-beyond-the-pilot',
    slug: 'ai-beyond-the-pilot',
    category: 'Artificial Intelligence',
    title: 'Taking AI Beyond the Pilot: A Practical Path to Enterprise Value',
    description: 'A practical look at the data foundations, governance, and team habits that help AI move from promising demo to everyday business value.',
    publishedDate: 'November 18, 2026',
    author: 'Prakvi Insights Team',
    coverImage: generatedImages.serviceBiAnalytics3d,
    content: [
      'AI programs create lasting value when they are connected to a real operational need. Start with a focused workflow, define the decision or task that should improve, and agree on a measurable outcome before choosing a model.',
      'Reliable data access, clear ownership, and thoughtful human review are what turn a promising pilot into a dependable capability. Teams can then expand in measured stages, learning from real usage while keeping quality and security visible.',
    ],
  },
  {
    id: 'analytics-that-drive-decisions',
    slug: 'analytics-that-drive-decisions',
    category: 'Data Science & Analytics',
    title: 'From Dashboards to Decisions: Making Business Analytics Actionable',
    description: 'Explore how well-designed metrics and predictive signals can help teams act sooner and make confident, evidence-led decisions.',
    publishedDate: 'November 12, 2026',
    author: 'Prakvi Data Practice',
    coverImage: generatedImages.aboutInnovationStudio,
    content: [
      'A dashboard is most useful when it answers a question a team needs to act on. Connecting a small set of trusted measures to the decisions behind them makes reporting clearer and keeps attention on outcomes.',
      'Predictive analysis can add useful context by showing where conditions may be heading. Pairing those signals with business expertise helps teams test scenarios, prioritize action, and keep improving the underlying data.',
    ],
  },
  {
    id: 'cloud-built-for-change',
    slug: 'cloud-built-for-change',
    category: 'Cloud Computing',
    title: 'Building a Cloud Foundation That Can Adapt as Your Business Grows',
    description: 'A straightforward guide to balancing scalability, resilience, and cost visibility in a modern cloud environment.',
    publishedDate: 'November 6, 2026',
    author: 'Prakvi Cloud Practice',
    coverImage: generatedImages.serviceCloud3d,
    content: [
      'Cloud platforms give organizations room to scale, but growth is easier to manage when architecture decisions are tied to clear service needs. Start with reliability, security, and performance requirements for each workload.',
      'A practical cloud foundation makes ownership and cost visible. Teams can standardize common patterns, automate routine operations, and review usage regularly so that the environment evolves with the business.',
    ],
  },
  {
    id: 'cybersecurity-as-a-practice',
    slug: 'cybersecurity-as-a-practice',
    category: 'Cybersecurity',
    title: 'Cybersecurity Is a Practice: Strengthening Everyday Resilience',
    description: 'See how layered controls, clear response plans, and regular review can make security part of daily operations.',
    publishedDate: 'October 29, 2026',
    author: 'Prakvi Security Practice',
    coverImage: generatedImages.serviceMobileDevices3d,
    content: [
      'Security resilience grows through consistent habits. Knowing which assets matter most, keeping access current, and applying updates on a reliable schedule reduce avoidable exposure.',
      'Preparation matters as much as prevention. A clear incident plan, practiced by the people responsible for response, helps an organization contain disruption and return to normal operations with less uncertainty.',
    ],
  },
  {
    id: 'digital-transformation-with-purpose',
    slug: 'digital-transformation-with-purpose',
    category: 'Digital Transformation',
    title: 'Digital Transformation With Purpose: Start With the Work',
    description: 'Technology change works best when it simplifies real processes and gives people a clear reason to adopt new tools.',
    publishedDate: 'October 21, 2026',
    author: 'Prakvi Transformation Team',
    coverImage: generatedImages.serviceMarketingWeb3d,
    content: [
      'Successful transformation begins with understanding how work happens today. Mapping friction points with the people closest to them helps teams focus investment on improvements that matter.',
      'A phased approach supports adoption and learning. Teams can test changes, measure the effect, and refine processes as they go instead of treating technology rollout as the finish line.',
    ],
  },
  {
    id: 'technology-trends-that-matter',
    slug: 'technology-trends-that-matter',
    category: 'Technology Trends',
    title: 'Technology Trends Worth Watching in the Year Ahead',
    description: 'A grounded perspective on emerging technology and how to separate useful opportunities from passing noise.',
    publishedDate: 'October 14, 2026',
    author: 'Prakvi Technology Council',
    coverImage: generatedImages.introEnterpriseCampus,
    content: [
      'New technology creates opportunity, but not every trend belongs on every roadmap. The strongest starting point is a business challenge that matters, followed by a small experiment with clear success measures.',
      'Organizations that keep learning can respond to change without chasing every announcement. Shared evaluation criteria and regular roadmap reviews help leaders invest in capabilities that fit their needs and risk tolerance.',
    ],
  },
];
