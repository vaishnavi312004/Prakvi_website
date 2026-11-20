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
  sections?: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
}

export const blogsData: BlogPost[] = [
  {
    id: 'enterprise-digital-transformation-strategy-consulting',
    slug: 'why-enterprise-needs-digital-transformation-strategy-consulting-now',
    category: 'Digital Transformation & Strategy',
    title: 'Why Your Enterprise Needs Digital Transformation Strategy Consulting Now!',
    description: 'A practical guide to aligning technology investment with business outcomes, modernizing operations, and building a transformation roadmap your people can deliver.',
    publishedDate: 'November 20, 2026',
    author: 'Prakvi Transformation Team',
    coverImage: generatedImages.serviceStaffingTeam,
    content: [],
    sections: [
      {
        heading: 'Transformation is a business decision before it is a technology decision',
        paragraphs: [
          'Digital transformation is often described as adopting cloud platforms, automating workflows, or adding artificial intelligence. Those tools can help, but they do not define success. The real goal is to improve how the enterprise serves customers, makes decisions, manages risk, and delivers work.',
          'A strategy consultant helps leadership connect those outcomes to a clear view of current operations. That means examining customer journeys, processes, data, applications, architecture, skills, and governance together. The result is a business-led direction for change instead of a collection of disconnected technology projects.',
        ],
      },
      {
        heading: 'Why the case for action is stronger now',
        paragraphs: [
          'Customer expectations, new digital capabilities, cyber risks, and pressure to make technology investments count are changing how organizations compete. Legacy systems and manual handoffs can make it harder to respond, while rapid adoption of new tools can create avoidable cost, complexity, and security gaps when teams move without shared priorities.',
          'The answer is not to modernize everything at once. It is to make deliberate choices about where change can create meaningful value, what foundations need attention, and how to sequence the work so the business can keep operating throughout the journey.',
        ],
      },
      {
        heading: 'What strategy consulting helps your enterprise do',
        paragraphs: [
          'An experienced consulting partner brings an outside perspective, structured discovery, and the facilitation needed to align business and technology leaders. Together, they can turn a broad ambition into a portfolio of initiatives with accountable owners, dependencies, investment ranges, and measurable outcomes.',
        ],
        bullets: [
          'Set a baseline for customer experience, process performance, data quality, technology health, and organizational readiness.',
          'Prioritize use cases by business value, feasibility, risk, and time to impact instead of by novelty alone.',
          'Define a target architecture and data approach that support integration, security, resilience, and responsible scaling.',
          'Build a sequenced roadmap with clear decision points, funding assumptions, and benefits owners.',
          'Plan communications, training, and adoption so new ways of working take hold across teams.',
        ],
      },
      {
        heading: 'Turn the roadmap into measurable progress',
        paragraphs: [
          'A useful roadmap starts with a small number of business outcomes, such as reducing cycle time, improving service availability, increasing digital self-service, or giving decision-makers more reliable information. Each initiative should have a named owner, a baseline, a target, and a way to review progress after launch.',
          'Deliver in manageable increments. Validate assumptions with pilots where uncertainty is high, strengthen shared foundations where multiple initiatives depend on them, and adjust priorities as evidence comes in. This approach protects momentum while giving leadership a clear view of value, delivery risk, and changing needs.',
        ],
      },
      {
        heading: 'Make people and governance part of the design',
        paragraphs: [
          'Transformation changes responsibilities, decisions, and daily routines. Involving the people who perform the work helps uncover practical constraints early and builds ownership for improvements. Leaders should also establish decision rights, security and data controls, architecture standards, and a regular forum for resolving cross-functional dependencies.',
          'Good governance enables teams to move with confidence. It provides guardrails and transparency without turning every decision into a lengthy approval process. Regular reviews keep initiatives tied to strategy and help the enterprise stop or reshape work that no longer delivers the expected value.',
        ],
      },
      {
        heading: 'Choose a partner who leaves your team stronger',
        paragraphs: [
          'Look for consultants who ask about business outcomes before recommending platforms, make assumptions explicit, and work directly with the people who will own delivery. A strong partner transfers knowledge, helps your leaders make informed trade-offs, and builds internal capability rather than creating long-term dependence.',
          'Digital transformation strategy consulting is most valuable when it gives your enterprise the clarity to act now and the discipline to adapt later. Start with the outcomes that matter, understand the realities of your current environment, and build a roadmap your organization can deliver one measurable step at a time.',
        ],
      },
    ],
  },
  {
    id: 'hidden-costs-legacy-infrastructure-modernisation',
    slug: 'the-hidden-costs-of-legacy-infrastructure-why-modernisation-cant-wait',
    category: 'Infrastructure Modernisation',
    title: 'The Hidden Costs of Legacy Infrastructure: Why Modernisation Can’t Wait',
    description: 'Legacy platforms can cost far more than their support contracts suggest. Learn how to uncover operational, security, and growth constraints—and modernise in controlled, business-led stages.',
    publishedDate: 'November 20, 2026',
    author: 'Prakvi Infrastructure Practice',
    coverImage: '/img/cloud_data_datacenter_1794479543953.jpg',
    content: [],
    sections: [
      {
        heading: 'The invoice is only part of the cost',
        paragraphs: [
          'A legacy platform can appear inexpensive when the budget counts only its licence, hosting, and maintenance fees. The wider cost is distributed across teams and systems: specialist support, manual workarounds, slow releases, repeated incidents, integration effort, and time spent keeping fragile components available.',
          'These costs are easy to miss because they sit in different budgets and are absorbed into everyday work. A system may still run reliably today while quietly limiting the speed, resilience, and service quality the business needs tomorrow.',
        ],
      },
      {
        heading: 'Where legacy costs accumulate',
        paragraphs: [
          'The most useful assessment looks beyond age. It examines how a platform affects operating outcomes, the people who support it, and the organization’s ability to change. Common sources of hidden cost include:',
        ],
        bullets: [
          'Operational fragility: specialist knowledge, manual recovery steps, and dependencies that make routine changes risky.',
          'Security and resilience exposure: unsupported components, delayed patching, limited recovery options, or controls that are difficult to evidence.',
          'Integration friction: custom interfaces and duplicated data that increase reconciliation work and make new services harder to connect.',
          'Delivery drag: long testing cycles and tightly coupled releases that slow product, process, and customer improvements.',
          'Workforce strain: experienced staff spending time on repetitive maintenance instead of modernization, automation, and higher-value work.',
          'Opportunity cost: projects delayed or redesigned because the current environment cannot meet a new performance, data, or service requirement.',
        ],
      },
      {
        heading: 'Build a fact-based case for change',
        paragraphs: [
          'Before selecting a replacement platform, establish a baseline. Combine technology inventory and support data with input from operations, security, finance, product teams, and the people who use the systems. Map critical business services to the applications, infrastructure, data, and third-party dependencies that support them.',
          'Estimate total cost of ownership across direct spend and the operational effort required to keep services running. Then measure service impact using indicators such as incident frequency, recovery time, release lead time, manual processing, change failure rate, and time spent on support. Use ranges and document assumptions where precise data is unavailable; a transparent estimate is more useful than false precision.',
        ],
      },
      {
        heading: 'Modernise the right workloads in the right way',
        paragraphs: [
          'Not every legacy system needs a full rewrite. A portfolio view helps leaders choose an approach that fits business value, technical condition, risk, and cost. Some workloads may be retired or consolidated; others may be retained with stronger controls, moved to a supported environment, replatformed, refactored, or replaced with a suitable product.',
          'Prioritise the services where exposure or business impact is highest, while checking dependencies before changing shared platforms. Sequence work so that foundational improvements—such as identity, network connectivity, observability, data quality, and integration patterns—can support more than one initiative.',
        ],
      },
      {
        heading: 'Reduce risk through incremental delivery',
        paragraphs: [
          'Modernisation can introduce risk when teams attempt too much change at once. Use bounded releases, representative pilots, automated testing, clear rollback plans, and parallel validation for critical data and workflows. Keep service owners involved in acceptance decisions, and coordinate cutovers with business calendars and operational readiness.',
          'Track outcomes after each release. A modernization initiative should show measurable change in service reliability, recovery, delivery speed, security posture, operating effort, or user experience. Review those results against the original baseline and adjust the next phase based on what the evidence shows.',
        ],
      },
      {
        heading: 'Make modernization an ongoing capability',
        paragraphs: [
          'A one-time migration does not remove the need for disciplined lifecycle management. Define ownership for architecture, platform health, patching, technical debt, and investment decisions. Establish regular portfolio reviews so that risks are visible early and teams can plan upgrades before support or capacity constraints become urgent.',
          'The cost of legacy infrastructure is ultimately measured in the choices it prevents and the effort it absorbs. By making those impacts visible, prioritising from business risk, and modernising in controlled stages, enterprises can protect today’s operations while creating room for future change.',
        ],
      },
    ],
  },
  {
    id: 'ai-beyond-the-pilot',
    slug: 'ai-beyond-the-pilot',
    category: 'Artificial Intelligence',
    title: 'Taking AI Beyond the Pilot: A Practical Path to Enterprise Value',
    description: 'A production-minded guide to selecting the right AI use case, preparing data and controls, integrating into real workflows, and proving value before scaling.',
    publishedDate: 'November 18, 2026',
    author: 'Prakvi AI & Data Practice',
    coverImage: '/img/about-collage/analytics-dashboard.jpg',
    content: [],
    sections: [
      {
        heading: 'A successful demo is not yet an enterprise capability',
        paragraphs: [
          'A pilot usually runs with a small group, a carefully chosen dataset, and close support from its builders. Production changes the conditions: the solution must work with real users, variable inputs, existing systems, business controls, and the operating teams responsible for service quality.',
          'Moving beyond the pilot means proving that AI improves a defined part of the business and can do so reliably, safely, and economically. The goal is not to deploy a model everywhere. It is to make a useful capability part of a workflow and sustain its performance over time.',
        ],
      },
      {
        heading: 'Start with a decision or task that matters',
        paragraphs: [
          'Choose a specific workflow where better prediction, classification, summarization, or assistance could improve an outcome. Talk with the people who perform the work to understand where time is lost, where decisions are difficult, what exceptions occur, and what a good result looks like.',
          'Set a baseline before development. Define a primary outcome such as reduced handling time, fewer avoidable errors, faster resolution, or improved service quality. Add guardrail measures for accuracy, rework, customer impact, and cost so that speed gains do not conceal a decline elsewhere.',
        ],
      },
      {
        heading: 'Prepare data, context, and system integration',
        paragraphs: [
          'AI outputs are only as useful as the information and context available to the system. Identify authoritative sources, confirm who may access them, and address freshness, quality, lineage, retention, and permissions. For retrieval-based applications, preserve links back to source material so users can review the evidence behind an answer.',
          'Design the full workflow, including how information enters, where the AI response goes, which systems are updated, and how exceptions return to a person. Integration, identity, logging, and failure handling belong in the initial design rather than being postponed until the model appears ready.',
        ],
      },
      {
        heading: 'Set quality and risk controls before release',
        paragraphs: [
          'Create an evaluation set from representative examples, including difficult cases and known failure modes. Measure task-specific quality and test across relevant user groups, formats, and operating conditions. For generative systems, review factual grounding, completeness, unsafe output, prompt injection, and the handling of missing information.',
          'Assign clear ownership for model and data changes, access controls, audit records, incident response, and human review. Define which outputs can be used automatically, which require approval, and when the system should abstain or escalate. The level of oversight should match the impact of an incorrect result.',
        ],
      },
      {
        heading: 'Operate AI like a live business service',
        paragraphs: [
          'A production AI solution needs monitoring for service availability, latency, cost, output quality, usage, and changes in input data or user behavior. Establish a way to capture feedback and investigate errors, along with named owners who can pause, roll back, or update the capability when performance falls outside agreed limits.',
          'Plan for model and prompt versioning, repeatable evaluations, secure deployment, and rollback before the first release. Keep a record of what changed and why. These practices help teams improve the system without losing track of the behavior that was reviewed and approved.',
        ],
      },
      {
        heading: 'Redesign the work and support adoption',
        paragraphs: [
          'AI creates value when it helps people complete work better, not when it adds another screen to an already crowded process. Map the current and future workflow, clarify what employees remain accountable for, and make it easy to correct or challenge an output. Provide role-based training and a clear route for reporting problems.',
          'Involve operations, security, legal, data, technology, and frontline users throughout delivery. Their early input often reveals process constraints and control requirements that a technical prototype cannot show. Adoption should be measured through sustained use and better outcomes, not access granted or accounts activated.',
        ],
      },
      {
        heading: 'Scale only when the evidence supports it',
        paragraphs: [
          'At each stage, compare results with the baseline and the full cost of delivery and operation. Include infrastructure, model usage, integration, review effort, support, and ongoing evaluation. If the benefits are uncertain or the risks remain high, refine the workflow, narrow the scope, or stop the effort and carry the learning forward.',
          'When a use case demonstrates durable value, expand in controlled steps. Reuse proven data patterns, evaluation methods, security controls, and operational practices, while validating the solution in each new context. This turns a one-off pilot into a repeatable enterprise capability—and keeps investment tied to outcomes the business can see.',
        ],
      },
    ],
  },
];
