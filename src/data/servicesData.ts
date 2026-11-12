import { ServiceItem } from '../types';

export const servicesData: ServiceItem[] = [
  // 1. Staffing
  {
    id: 'staffing',
    slug: 'staffing',
    title: 'Staffing',
    category: 'enterprise',
    tagline: 'Precision workforce sourcing bridging top technical and clinical talent with high-impact enterprises',
    shortDesc: 'Professional workforce sourcing across IT engineering, clinical healthcare staffing, contract placement, and executive talent acquisition.',
    fullDesc: 'Prakvi’s Staffing practice delivers precision-matched technical and clinical personnel. Whether augmenting mission-critical software initiatives, staffing healthcare informatics teams, or placing senior technology leadership, our proprietary vetting and delivery framework accelerates time-to-productivity while ensuring 100% regulatory compliance.',
    iconName: 'Users',
    badge: 'Enterprise Practice',
    businessChallenge: 'Severe specialized talent shortages, lengthy 60+ day recruitment cycles, high agency turnover, and compliance overhead threaten project execution timelines.',
    howWeHelp: 'We deploy an agile sourcing engine combining AI-assisted candidate screening, hands-on architectural interviews by practicing engineers, and rigorous background verification.',
    capabilities: [
      {
        title: 'IT & Software Engineering Staffing',
        description: 'Elite full-stack engineers, cloud architects, DevOps practitioners, cybersecurity specialists, and data scientists ready for rapid onboarding.',
        icon: 'Code2',
      },
      {
        title: 'Healthcare & Clinical Staffing',
        description: 'Licensed clinical specialists, medical billing experts, EHR/EMR implementation engineers, and health informatics professionals.',
        icon: 'Stethoscope',
      },
      {
        title: 'Contract & Contingent Staffing',
        description: 'Elastic workforce scaling for project surges, seasonal demands, and specialized modernization sprints.',
        icon: 'Clock',
      },
      {
        title: 'Direct Hire & Executive Search',
        description: 'Dedicated search campaigns for senior directors, VPs, and CXOs capable of leading enterprise digital transformation.',
        icon: 'Briefcase',
      },
    ],
    businessBenefits: [
      {
        title: '65% Faster Time-to-Fill',
        description: 'Pre-screened talent repositories enable candidate shortlists within 48 to 72 business hours.',
        metric: '72hr Shortlist',
      },
      {
        title: '98% Retention Rate',
        description: 'Rigorous cultural and technical alignment guarantees long-term engagement success.',
        metric: '98% Retention',
      },
    ],
    deliverySteps: [
      { step: '01', title: 'Talent Profiling', description: 'Collaborative requirements mapping covering technical competencies, culture fit, and timelines.' },
      { step: '02', title: 'Curated Sourcing', description: 'Targeted outreach across proprietary talent networks and vetted candidate benches.' },
      { step: '03', title: 'Architect-Led Vetting', description: 'Hands-on technical interviews conducted by experienced practitioners.' },
      { step: '04', title: 'Deployment & Support', description: 'Smooth day-one onboarding, equipment readiness, and ongoing performance check-ins.' },
    ],
    faqs: [
      { question: 'What domains does Prakvi specialize in?', answer: 'We specialize primarily in Enterprise IT, Cloud, Data Engineering, and Healthcare Informatics.' },
      { question: 'Do you offer contract-to-hire arrangements?', answer: 'Yes, we provide flexible contingent, contract-to-hire, and direct placement models.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
  },

  // 2. Mobility Practice (BYOD & CYOD)
  {
    id: 'mobility-practice',
    slug: 'mobility-practice',
    title: 'Mobility Practice (BYOD & CYOD)',
    category: 'enterprise',
    tagline: 'Unified endpoint security, containerization, and zero-trust mobile enablement for modern distributed teams',
    shortDesc: 'Flexible enterprise mobility frameworks supporting Bring-Your-Own-Device (BYOD) and Choose-Your-Own-Device (CYOD) with zero-trust security.',
    fullDesc: 'Modern enterprises must empower employees to work securely from any location on any device. Prakvi’s Mobility Practice establishes enterprise-grade MDM/MAM architectures, containerized corporate workspaces, cryptographic data isolation, and automated device lifecycle management that balance frictionless user experience with strict data sovereignty.',
    iconName: 'Smartphone',
    badge: 'Zero-Trust Mobile Practice',
    businessChallenge: 'Mobile workforce fragmentation exposes corporate assets to data leakage, unmanaged OS vulnerabilities, rogue network connections, and compliance violations.',
    howWeHelp: 'We engineer end-to-end mobility architectures leveraging Microsoft Intune, VMware Workspace ONE, Knox, and Jamf to enforce real-time contextual access control.',
    capabilities: [
      {
        title: 'BYOD Containerization',
        description: 'Isolate sensitive enterprise apps and data inside cryptographic sandboxes without intruding on employee personal privacy.',
        icon: 'Lock',
      },
      {
        title: 'CYOD Device Fleet Provisioning',
        description: 'Curated catalogs of pre-configured enterprise smartphones, laptops, and tablets with zero-touch enrollment.',
        icon: 'Laptop',
      },
      {
        title: 'Zero-Trust Mobile Access',
        description: 'Continuous biometric authentication, geofencing rules, and conditional access policies enforcing compliance.',
        icon: 'Shield',
      },
      {
        title: 'Automated Device Deprovisioning',
        description: 'Instant remote wipe of corporate data payloads upon employee offboarding or device loss without erasing personal photos.',
        icon: 'Trash2',
      },
    ],
    businessBenefits: [
      {
        title: '100% Data Loss Prevention',
        description: 'Encrypted containers prevent copy-paste leaks and unauthorized screenshots of confidential documents.',
        metric: 'Zero-Leakage',
      },
      {
        title: '40% Hardware Cost Reduction',
        description: 'Structured BYOD policies reduce capital equipment expenditure while boosting employee satisfaction.',
        metric: '40% TCO Savings',
      },
    ],
    deliverySteps: [
      { step: '01', title: 'Mobility Audit', description: 'Assessing fleet operating systems, endpoint risks, and regulatory compliance standards.' },
      { step: '02', title: 'Policy Architecture', description: 'Defining BYOD/CYOD governance rules, container parameters, and security baselines.' },
      { step: '03', title: 'MDM Deployment', description: 'Zero-touch cloud enrollment rollouts across iOS, Android, macOS, and Windows.' },
      { step: '04', title: '24/7 Threat Monitoring', description: 'Continuous mobile endpoint telemetry and automated anomaly containment.' },
    ],
    faqs: [
      { question: 'Can IT administrators view personal employee data under BYOD?', answer: 'No. Our MAM sandboxing strictly isolates corporate data; personal apps, photos, and messages remain completely invisible to administrators.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
  },

  // 3. Business Intelligence
  {
    id: 'business-intelligence',
    slug: 'business-intelligence',
    title: 'Business Intelligence',
    category: 'enterprise',
    tagline: 'Transforming complex data lakes into actionable executive insights and real-time operational visibility',
    shortDesc: 'Insights through data analytics, automated executive dashboards, cognitive reporting, and enterprise data warehousing.',
    fullDesc: 'Prakvi’s Business Intelligence practice helps enterprise leadership make confident, data-driven decisions. We design robust data warehouses, automated ETL pipelines, and interactive visual dashboards that unify fragmented ERP, CRM, and transactional systems into a single source of truth.',
    iconName: 'BarChart3',
    badge: 'Cognitive Analytics',
    businessChallenge: 'Data trapped in siloed departmental databases leads to contradictory reporting, delayed operational decisions, and missed revenue opportunities.',
    howWeHelp: 'We implement centralized data modeling, automated analytics workflows, and interactive Power BI, Tableau, and Snowflake architectures.',
    capabilities: [
      { title: 'Enterprise Data Warehousing', description: 'Scalable Snowflake, BigQuery, and Redshift repositories designed for high-concurrency analytical querying.' },
      { title: 'Executive Dashboards', description: 'Real-time KPI visualization, automated C-suite reports, and mobile executive scorecards.' },
      { title: 'Automated ETL/ELT Pipelines', description: 'Fault-tolerant ingestion pipelines connecting legacy databases with cloud analytics engines.' },
      { title: 'Predictive Trend Analysis', description: 'Statistical forecasting models that anticipate customer churn, revenue variance, and demand shifts.' },
    ],
    businessBenefits: [
      { title: '90% Faster Reporting Cycles', description: 'Eliminate manual spreadsheet consolidation with real-time automated data refreshes.', metric: 'Instant KPIs' },
      { title: 'Single Version of Truth', description: 'Standardized enterprise metrics eliminate conflicting departmental numbers.', metric: 'Unified Data' },
    ],
    deliverySteps: [
      { step: '01', title: 'Data Inventory', description: 'Cataloging source systems, data quality, and critical decision metrics.' },
      { step: '02', title: 'Warehouse Modeling', description: 'Designing dimensional data schemas and automated ingestion pipelines.' },
      { step: '03', title: 'Dashboard Engineering', description: 'Crafting intuitive visualizations tailored for executive and operational users.' },
      { step: '04', title: 'Self-Service Enablement', description: 'Empowering business teams with governed self-service exploratory analytics.' },
    ],
    faqs: [
      { question: 'Which BI platforms do you support?', answer: 'We support Microsoft Power BI, Tableau, Looker, Qlik, and custom web-embedded analytics.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },

  // 4. Supply Chain Management
  {
    id: 'supply-chain-management',
    slug: 'supply-chain-management',
    title: 'Supply Chain Management',
    category: 'enterprise',
    tagline: 'End-to-end logistics visibility, predictive demand planning, and resilient vendor network orchestration',
    shortDesc: 'Streamline operations & logistics with intelligent inventory forecasting, warehouse automation, and real-time shipment tracking.',
    fullDesc: 'Modern global supply chains require resilience, real-time visibility, and agility. Prakvi modernizes supply chain operations through IoT-enabled cargo tracking, predictive demand modeling, warehouse management system (WMS) integrations, and procurement optimization.',
    iconName: 'Truck',
    badge: 'Logistics Engineering',
    businessChallenge: 'Supply disruptions, inventory overstocking, blind transit spots, and manual supplier coordination cause severe margin erosion.',
    howWeHelp: 'We integrate ERP systems with real-time telematics, machine-learning demand forecasting, and automated supplier scorecards.',
    capabilities: [
      { title: 'Predictive Demand Forecasting', description: 'Machine learning algorithms that balance inventory levels against seasonal demand swings.' },
      { title: 'Warehouse Management (WMS)', description: 'Barcode/RFID integration, automated picking routes, and stock reconciliation systems.' },
      { title: 'Fleet & Cargo Telematics', description: 'Live GPS location, temperature monitoring for cold chains, and ETA variance alerts.' },
      { title: 'Supplier Collaboration Portals', description: 'Automated purchase order workflows, ASN generation, and delivery confirmation.' },
    ],
    businessBenefits: [
      { title: '25% Inventory Cost Reduction', description: 'Eliminate excess holding costs with just-in-time predictive replenishment.', metric: '25% Reduction' },
      { title: '99.4% Order Accuracy', description: 'Automated warehouse workflows virtually eliminate mispicks and delivery delays.', metric: '99.4% Accuracy' },
    ],
    deliverySteps: [
      { step: '01', title: 'Process Mapping', description: 'Benchmarking supplier lead times, warehouse throughput, and logistics bottlenecks.' },
      { step: '02', title: 'Systems Integration', description: 'Connecting ERP, carrier APIs, and inventory databases into a unified control tower.' },
      { step: '03', title: 'Pilot Rollout', description: 'Phased deployment across regional distribution centers with real-time feedback loops.' },
      { step: '04', title: 'Full Optimization', description: 'Automated routing rules and dynamic supplier allocation algorithms.' },
    ],
    faqs: [
      { question: 'Can you integrate with SAP and Oracle SCM?', answer: 'Yes, we have deep integration expertise with SAP SCM, Oracle NetSuite, Manhattan Associates, and custom logistics platforms.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
  },

  // 5. Workforce Solution
  {
    id: 'workforce-solution',
    slug: 'workforce-solution',
    title: 'Workforce Solution',
    category: 'enterprise',
    tagline: 'Strategic human capital optimization, organizational agility, and managed services governance',
    shortDesc: 'Optimize human capital management through skill matrix auditing, talent redeployment, productivity frameworks, and workforce analytics.',
    fullDesc: 'Prakvi’s Workforce Solutions empower global organizations to maximize team performance and operational flexibility. We combine workforce analytics, skill taxonomy mapping, vendor management programs (MSP), and performance governance to ensure your human capital matches strategic company targets.',
    iconName: 'UserCheck',
    badge: 'Human Capital Advisory',
    businessChallenge: 'High attrition, skill mismatches, invisible contingent spend, and lack of career development pathways hinder enterprise scaling.',
    howWeHelp: 'We design unified workforce planning models, internal mobility programs, and managed services provider (MSP) governance frameworks.',
    capabilities: [
      { title: 'Skills Taxonomy & Benchmarking', description: 'Cataloging enterprise technical competencies and mapping future-state talent readiness.' },
      { title: 'Managed Staffing Programs (MSP)', description: 'Centralized contingent supplier management with standardized rate cards and SLAs.' },
      { title: 'Productivity & Engagement Analytics', description: 'Data-driven insights into team collaboration patterns, burnout risks, and velocity.' },
      { title: 'Leadership Continuity Planning', description: 'Structured succession pipelines and talent development roadmaps for key operational roles.' },
    ],
    businessBenefits: [
      { title: '30% Reduction in Labor Overhead', description: 'Eliminate rogue contractor hiring and normalize cross-department vendor rates.', metric: '30% Cost Savings' },
      { title: 'Zero Talent Capability Gaps', description: 'Proactive reskilling and hiring programs keep engineering teams ahead of technology shifts.', metric: 'Future-Ready' },
    ],
    deliverySteps: [
      { step: '01', title: 'Workforce Audit', description: 'Analyzing headcount composition, bill rates, skill gaps, and contingent worker utilization.' },
      { step: '02', title: 'Strategic Framework', description: 'Designing talent governance protocols, vendor tiers, and retention incentives.' },
      { step: '03', title: 'Technology Deployment', description: 'Implementing VMS/HRMS tools to track workforce milestones in real time.' },
      { step: '04', title: 'Continuous Review', description: 'Quarterly talent reviews and proactive capability planning.' },
    ],
    faqs: [
      { question: 'How is this different from traditional recruitment?', answer: 'Workforce Solutions is a strategic operational practice that optimizes your entire human capital ecosystem, including permanent staff, contingent vendors, and internal mobility.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
  },

  // 6. System Integration
  {
    id: 'system-integration',
    slug: 'system-integration',
    title: 'System Integration',
    category: 'enterprise',
    tagline: 'Bridging disparate legacy architectures, SaaS platforms, and enterprise data backbones into a unified ecosystem',
    shortDesc: 'Unified tech environment integrating ERP, CRM, custom microservices, event streams, and legacy mainframe backbones.',
    fullDesc: 'Disconnected systems create operational drag, manual data re-entry, and security vulnerabilities. Prakvi’s System Integration practice designs enterprise service buses (ESB), event-driven architectures (Kafka), and robust REST/GraphQL API gateways that orchestrate seamless data flows across your entire software estate.',
    iconName: 'Plug',
    badge: 'Enterprise Architecture',
    businessChallenge: 'Enterprises struggle with brittle point-to-point connections, inconsistent syncs, duplicate records, and lack of real-time transactional visibility.',
    howWeHelp: 'We engineer loosely coupled, API-first integration layers with automated retry queues, transactional idempotency, and comprehensive audit trails.',
    capabilities: [
      { title: 'API Gateway & Management', description: 'Secure, rate-limited, and authenticated API gateways connecting legacy and cloud applications.' },
      { title: 'Event-Driven Message Buses', description: 'High-throughput Kafka and RabbitMQ pipelines enabling real-time asynchronous data propagation.' },
      { title: 'ERP & CRM Bi-directional Sync', description: 'Zero-latency reconciliation between SAP, Salesforce, NetSuite, and internal databases.' },
      { title: 'Legacy Mainframe Modernization', description: 'Non-disruptive microservice wrappers around heritage COBOL, AS400, and monolithic backbones.' },
    ],
    businessBenefits: [
      { title: 'Zero Data Duplication', description: 'Canonical data schemas ensure transactional accuracy across all enterprise systems.', metric: '100% Accuracy' },
      { title: '80% Faster Partner Onboarding', description: 'Standardized API contracts reduce partner integration times from months to days.', metric: 'Rapid Onboarding' },
    ],
    deliverySteps: [
      { step: '01', title: 'Architecture Discovery', description: 'Mapping data dependencies, message payloads, and protocol incompatibilities.' },
      { step: '02', title: 'Interface Specification', description: 'Drafting strict OpenAPI specifications and payload validation schemas.' },
      { step: '03', title: 'Middleware Engineering', description: 'Building containerized integration adapters with distributed tracing.' },
      { step: '04', title: 'Resilience Testing', description: 'Chaos engineering and failover testing to verify high-availability reliability.' },
    ],
    faqs: [
      { question: 'Do we need to rewrite our legacy applications?', answer: 'No. We specialize in non-invasive API facades and event bridges that modernize legacy assets without risky code rewrites.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },

  // 7. Cloud Services
  {
    id: 'cloud-services',
    slug: 'cloud-services',
    title: 'Cloud Services',
    category: 'enterprise',
    tagline: 'Scalable multi-cloud infrastructure, automated DevSecOps pipelines, and resilient cloud-native engineering',
    shortDesc: 'Scalable cloud infrastructure across AWS, Azure, and Google Cloud with Kubernetes orchestration and FinOps cost governance.',
    fullDesc: 'Prakvi’s Cloud Services division enables enterprises to modernize legacy workloads and build resilient cloud-native platforms. From complex hybrid-cloud migrations to automated CI/CD pipelines, container orchestration, and proactive FinOps cost optimization, we ensure your infrastructure scales securely and cost-effectively.',
    iconName: 'Cloud',
    badge: 'Multi-Cloud Architecture',
    businessChallenge: 'Skyrocketing unoptimized cloud bills, security misconfigurations, slow release cadences, and fear of vendor lock-in create operational inertia.',
    howWeHelp: 'We implement Infrastructure as Code (Terraform), Kubernetes cluster governance, 24/7 SRE monitoring, and FinOps spending guardrails.',
    capabilities: [
      { title: 'Cloud Migration & Modernization', description: 'Phased lift-and-shift, re-platforming, and microservices re-architecting for AWS, Azure, and GCP.' },
      { title: 'Kubernetes & Container Orchestration', description: 'Hardened EKS, AKS, and GKE clusters with automated horizontal scaling and service mesh.' },
      { title: 'DevSecOps & Automated CI/CD', description: 'Zero-touch deployment pipelines with integrated SAST/DAST security scanning.' },
      { title: 'FinOps Cost Optimization', description: 'Continuous cloud spend auditing, reserved instance planning, and resource rightsizing.' },
    ],
    businessBenefits: [
      { title: '99.99% Uptime Guarantee', description: 'Multi-region redundancy and auto-healing infrastructure guarantee continuous availability.', metric: '99.99% SLA' },
      { title: '35% Average Cloud Bill Reduction', description: 'FinOps governance eliminates orphaned resources and optimizes compute provisioning.', metric: '35% Savings' },
    ],
    deliverySteps: [
      { step: '01', title: 'Cloud Readiness Assessment', description: 'Evaluating workload dependencies, compliance constraints, and network latency.' },
      { step: '02', title: 'Landing Zone Architecture', description: 'Provisioning secure multi-account cloud landing zones with automated IAM policies.' },
      { step: '03', title: 'Workload Migration', description: 'Zero-downtime database replication and containerized application migration.' },
      { step: '04', title: 'Continuous SRE Governance', description: '24/7 observability, SLO tracking, and automated incident remediation.' },
    ],
    faqs: [
      { question: 'Can you manage multi-cloud deployments?', answer: 'Yes, we architect vendor-agnostic infrastructure using Terraform and Kubernetes spanning AWS, Azure, and GCP.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
  },

  // 8. Business Analytics
  {
    id: 'business-analytics',
    slug: 'business-analytics',
    title: 'Business Analytics',
    category: 'enterprise',
    tagline: 'Strategic data-driven decisions powered by statistical modeling, cohort analysis, and executive KPI intelligence',
    shortDesc: 'Strategic data-driven decisions that uncover operational efficiencies, identify revenue growth opportunities, and de-risk investments.',
    fullDesc: 'Transform raw numbers into strategic market advantages. Prakvi’s Business Analytics practice bridges enterprise domain knowledge with quantitative modeling. We uncover customer lifetime value drivers, operational margin leakages, and pricing elasticities so leaders can act with quantitative certainty.',
    iconName: 'PieChart',
    badge: 'Decision Intelligence',
    businessChallenge: 'Organizations drown in raw transactional data but lack granular insight into what truly drives profitability and customer churn.',
    howWeHelp: 'We engineer statistical regression models, customer segmentation matrices, and interactive revenue scenario models.',
    capabilities: [
      { title: 'Customer Segmentation & LTV Modeling', description: 'Behavioral clustering that reveals high-value buyer cohorts and retention triggers.' },
      { title: 'Pricing & Margin Elasticity', description: 'Econometric models simulating the margin impact of price adjustments and discounts.' },
      { title: 'Operational Efficiency Auditing', description: 'Process mining analytics uncovering workflow bottlenecks and throughput delays.' },
      { title: 'Scenario & Sensitivity Analysis', description: 'Interactive Monte Carlo models to stress-test financial projections against market risks.' },
    ],
    businessBenefits: [
      { title: '18% Margin Expansion', description: 'Identifying operational leakages and optimizing product mix directly boosts bottom-line profitability.', metric: '18% Margin Gain' },
      { title: 'Objective Decision-Making', description: 'Replace subjective boardroom debates with verified statistical proof points.', metric: 'Data-Backed' },
    ],
    deliverySteps: [
      { step: '01', title: 'Hypothesis Formulation', description: 'Collaborating with executive sponsors to frame the highest-value commercial questions.' },
      { step: '02', title: 'Data Extraction & Cleaning', description: 'Normalizing disparate transactional logs and resolving schema inconsistencies.' },
      { step: '03', title: 'Statistical Modeling', description: 'Executing regression, clustering, and sensitivity simulations.' },
      { step: '04', title: 'Strategic Recommendations', description: 'Presenting actionable commercial steps backed by interactive visual models.' },
    ],
    faqs: [
      { question: 'How is Business Analytics different from BI?', answer: 'While BI focuses on describing what happened in the past, Business Analytics investigates why it happened and what strategic actions will produce optimal future outcomes.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },

  // 9. Infrastructure Management
  {
    id: 'infrastructure-management',
    slug: 'infrastructure-management',
    title: 'Infrastructure Management',
    category: 'enterprise',
    tagline: 'Secure and maintain IT systems with 24/7 telemetry, automated patching, and proactive disaster recovery',
    shortDesc: 'Secure and maintain IT systems spanning on-premises data centers, private cloud clusters, and hybrid network backbones.',
    fullDesc: 'System outages and hardware degradation immediately disrupt operations and client trust. Prakvi’s Infrastructure Management practice provides 24/7/365 proactive monitoring, automated security patching, hypervisor administration, and multi-datacenter disaster recovery to ensure mission-critical stability.',
    iconName: 'Server',
    badge: 'Reliability Engineering',
    businessChallenge: 'Unplanned downtime, aging server hardware, unpatched vulnerabilities, and inadequate backup verification expose enterprises to catastrophic disruptions.',
    howWeHelp: 'We implement automated site reliability engineering (SRE), real-time APM telemetry (Datadog/Prometheus), and air-gapped immutable backup solutions.',
    capabilities: [
      { title: '24/7 Network & NOC Monitoring', description: 'Continuous ping, packet loss, bandwidth utilization, and firewall log monitoring.' },
      { title: 'Automated Patch Management', description: 'Zero-day vulnerability scanning and scheduled non-disruptive OS/firmware updates.' },
      { title: 'Disaster Recovery as a Service (DRaaS)', description: 'RTO < 15min and RPO < 5min failover systems with automated quarterly disaster drills.' },
      { title: 'Storage & Hypervisor Administration', description: 'SAN/NAS storage management, VMware/Hyper-V clustering, and IOPS performance tuning.' },
    ],
    businessBenefits: [
      { title: 'Zero Unplanned Downtime', description: 'Proactive component degradation alerts resolve hardware issues before system failure occurs.', metric: '100% Uptime Goal' },
      { title: 'Verified Cyber Recovery', description: 'Immutable ransomware-proof backups guarantee business continuity under any attack.', metric: 'Ransomware-Proof' },
    ],
    deliverySteps: [
      { step: '01', title: 'Infrastructure Inventory', description: 'Auditing physical servers, SAN storage, hypervisors, and network switches.' },
      { step: '02', title: 'Monitoring Instrumentation', description: 'Deploying agents and synthetic probes for real-time latency and health alerts.' },
      { step: '03', title: 'Runbook Automation', description: 'Scripting automated self-healing procedures for common service degradation events.' },
      { step: '04', title: '24/7 NOC Handover', description: 'Seamless monitoring coverage with SLA-guaranteed incident response times.' },
    ],
    faqs: [
      { question: 'Do you manage on-premises hardware as well as cloud?', answer: 'Yes, we provide unified hybrid management spanning physical colocation racks, on-premise data centers, and public clouds.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },

  // 10. Accounting
  {
    id: 'accounting',
    slug: 'accounting',
    title: 'Accounting',
    category: 'enterprise',
    tagline: 'Manage finance and compliance through automated financial workflows, tax reconciliation, and audit-ready governance',
    shortDesc: 'Manage finance and compliance with automated bookkeeping, GAAP/IFRS financial reporting, tax compliance, and payroll auditing.',
    fullDesc: 'Financial accuracy, regulatory compliance, and fiscal governance are fundamental to corporate longevity. Prakvi’s Accounting advisory delivers modern automated financial operations, multi-entity reconciliation, tax compliance audits, and ERP ledger integrations that eliminate manual spreadsheets and prepare leadership for institutional audits.',
    iconName: 'Receipt',
    badge: 'Financial Governance',
    businessChallenge: 'Manual reconciliations, delayed month-end closes, multi-currency conversion errors, and complex tax regulations risk penalties and investor friction.',
    howWeHelp: 'We automate general ledger entries, deploy automated bank reconciliation engines, and establish GAAP-compliant financial reporting protocols.',
    capabilities: [
      { title: 'Automated Month-End Close', description: 'Streamlined reconciliation pipelines that reduce closing cycles from 20 days to 3 business days.' },
      { title: 'Tax Compliance & Filing Support', description: 'Multi-jurisdictional sales tax, GST/VAT reconciliation, and corporate filing preparation.' },
      { title: 'Multi-Entity Financial Consolidation', description: 'Unified roll-up reporting across subsidiaries with automated intercompany eliminations.' },
      { title: 'Audit Preparation & Internal Controls', description: 'SOX/GAAP compliance frameworks and immutable financial paper trails for institutional auditors.' },
    ],
    businessBenefits: [
      { title: '70% Faster Financial Close', description: 'Automated rules and bank feeds allow leadership to view audited numbers on day 3 of the month.', metric: '3-Day Close' },
      { title: 'Zero Compliance Penalties', description: 'Disciplined statutory calendar management prevents late filings and regulatory fines.', metric: '100% Compliant' },
    ],
    deliverySteps: [
      { step: '01', title: 'Chart of Accounts Review', description: 'Restructuring financial categories to align with enterprise reporting standards.' },
      { step: '02', title: 'Automation Setup', description: 'Connecting ERP ledger with banking feeds, invoicing portals, and expense systems.' },
      { step: '03', title: 'Controls Implementation', description: 'Enforcing dual-authorization thresholds and segregation-of-duties protocols.' },
      { step: '04', title: 'Continuous Financial Support', description: 'Dedicated accounting specialists handling periodic reconciliations and reporting.' },
    ],
    faqs: [
      { question: 'Which accounting software do you integrate with?', answer: 'We integrate with SAP Financials, Oracle NetSuite, QuickBooks Enterprise, Sage Intacct, and custom ERP ledger modules.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=80',
  },

  // 11. Enterprise Architecture
  {
    id: 'enterprise-architecture',
    slug: 'enterprise-architecture',
    title: 'Enterprise Architecture',
    category: 'enterprise',
    tagline: 'Align tech with business goals through robust TOGAF blueprints, microservice design, and technology roadmap governance',
    shortDesc: 'Align tech with business goals through strategic TOGAF blueprinting, technical debt remediation, and target-state engineering.',
    fullDesc: 'Disorganized software growth creates brittle point-to-point dependencies and unmanageable complexity. Prakvi’s Enterprise Architecture practice establishes holistic TOGAF-aligned target architectures. We align business capabilities with technology investments, establish microservice boundaries, and de-risk major platform transitions.',
    iconName: 'Layers',
    badge: 'System Blueprinting',
    businessChallenge: 'Decades of fragmented software purchases result in overlapping systems, undocumented dependencies, and skyrocketing technical debt.',
    howWeHelp: 'We conduct architectural reviews, map business-to-IT capabilities, define target architectures, and enforce lightweight governance boards.',
    capabilities: [
      { title: 'Target-State Architecture Blueprints', description: 'Comprehensive 3-to-5 year technical blueprints balancing innovation with operational stability.' },
      { title: 'Microservices & Domain-Driven Design (DDD)', description: 'Decomposing legacy monoliths into bounded contexts with high cohesion and loose coupling.' },
      { title: 'Technology Stack Rationalization', description: 'Auditing redundant software licenses and consolidating tooling onto core platforms.' },
      { title: 'Architecture Review Boards (ARB)', description: 'Lightweight governance standards ensuring new engineering projects adhere to security and scalability norms.' },
    ],
    businessBenefits: [
      { title: '50% Faster Feature Delivery', description: 'Modular, well-bounded architectures allow independent teams to deploy features without cross-system breakages.', metric: '2x Velocity' },
      { title: 'Eliminate Redundant Spend', description: 'Rationalizing duplicate platforms saves millions in unused software licensing.', metric: 'Millions Saved' },
    ],
    deliverySteps: [
      { step: '01', title: 'Current-State Mapping', description: 'Documenting existing systems, data flows, integration contracts, and pain points.' },
      { step: '02', title: 'Capability Alignment', description: 'Connecting strategic business goals directly to technical capability requirements.' },
      { step: '03', title: 'Target Architecture Design', description: 'Authoring architectural blueprints, component specifications, and migration phases.' },
      { step: '04', title: 'Governance & Execution', description: 'Advising sprint teams through regular Architecture Review Board sessions.' },
    ],
    faqs: [
      { question: 'Do you follow TOGAF standards?', answer: 'Yes, our architects are TOGAF-certified and adapt formal enterprise architecture frameworks to pragmatic agile software environments.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  },

  // 12. IT Consulting
  {
    id: 'it-consulting',
    slug: 'it-consulting',
    title: 'IT Consulting',
    category: 'enterprise',
    tagline: 'Expert technology guidance, vendor-neutral evaluations, and strategic modernization roadmaps for C-level leaders',
    shortDesc: 'Expert technology guidance, digital modernization strategies, vendor evaluation, and cybersecurity governance.',
    fullDesc: 'Making high-stakes technology decisions requires impartial market knowledge and real-world implementation experience. Prakvi’s IT Consulting practice guides CIOs, CTOs, and enterprise leaders through digital transformation strategy, software RFP evaluations, technical due diligence, and cybersecurity posture reviews.',
    iconName: 'Headphones',
    badge: 'Strategic Advisory',
    businessChallenge: 'Conflicting vendor claims, aggressive sales pitches, and complex compliance frameworks create decision paralysis for IT leaders.',
    howWeHelp: 'We provide vendor-neutral scoring, total cost of ownership (TCO) benchmarks, risk assessments, and execution oversight.',
    capabilities: [
      { title: 'Digital Transformation Strategy', description: 'Actionable technology investment roadmaps linked directly to corporate EBITDA goals.' },
      { title: 'Vendor RFP Management & Scoring', description: 'Unbiased technical evaluations of software packages to ensure optimal contract pricing.' },
      { title: 'Cybersecurity & Posture Auditing', description: 'Comprehensive NIST and ISO 27001 vulnerability assessments and zero-trust roadmaps.' },
      { title: 'M&A Technical Due Diligence', description: 'Deep-dive code quality, cloud configuration, and technical debt audits for acquisitions.' },
    ],
    businessBenefits: [
      { title: 'Zero-Regret Technology Choices', description: 'Rigorous vendor-neutral technical scoring eliminates expensive contract mistakes.', metric: 'De-Risked Tech' },
      { title: 'Executive Clarity', description: 'Transparent architectural roadmaps provide board-ready justification for capital investments.', metric: 'Board-Ready' },
    ],
    deliverySteps: [
      { step: '01', title: 'Discovery & Stakeholder Interviews', description: 'Interviews with executives, department heads, and lead architects to define priorities.' },
      { step: '02', title: 'Maturity Benchmarking', description: 'Scoring technology readiness against industry peers and modern security baselines.' },
      { step: '03', title: 'Strategic Roadmap', description: 'Drafting sequenced 12-to-36 month migration blueprints with cost/benefit models.' },
      { step: '04', title: 'Steering Committee Oversight', description: 'Quarterly review boards ensuring program alignment and milestone adherence.' },
    ],
    faqs: [
      { question: 'Do you take commissions from software vendors?', answer: 'Never. Prakvi operates with complete fiduciary independence to ensure recommendations solely serve our clients’ interests.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
  },

  // 13. Project Management
  {
    id: 'project-management',
    slug: 'project-management',
    title: 'Project Management',
    category: 'enterprise',
    tagline: 'End-to-end project execution with disciplined Agile governance, milestone accountability, and risk mitigation',
    shortDesc: 'End-to-end project execution delivering complex software initiatives on time, within budget, and to institutional quality standards.',
    fullDesc: 'Complex enterprise initiatives fail when cross-functional dependencies, scope creep, and unclear milestone ownership go unmanaged. Prakvi’s Project Management practice deploys certified PMP and Agile Scrum Masters to establish transparent sprint cadences, proactive risk registers, and automated burndown reporting.',
    iconName: 'CheckSquare',
    badge: 'Agile Delivery Governance',
    businessChallenge: 'Over 65% of large-scale enterprise IT initiatives suffer from schedule delays, budget overruns, or misaligned scope requirements.',
    howWeHelp: 'We install disciplined Agile/Scrum delivery frameworks, automated velocity dashboards, and rigorous risk mitigation protocols.',
    capabilities: [
      { title: 'Agile & Scrum Program Execution', description: 'Two-week sprint cadences, daily standups, backlog grooming, and transparent velocity metrics.' },
      { title: 'Milestone & Budget Governance', description: 'Strict budget burn tracking, variance alarms, and proactive scope management.' },
      { title: 'Cross-Functional Stakeholder Alignment', description: 'Clear communication channels aligning engineering, product, legal, and executive teams.' },
      { title: 'Risk & Dependency Management', description: 'Early identification of critical path blockers and dynamic contingency planning.' },
    ],
    businessBenefits: [
      { title: '96% On-Time Delivery', description: 'Rigorous sprint tracking and proactive blocker removal ensure milestones are consistently met.', metric: '96% On-Time' },
      { title: 'Total Budget Predictability', description: 'Transparent burn-rate reporting eliminates surprise overages and scope creep.', metric: 'Zero Cost Overrun' },
    ],
    deliverySteps: [
      { step: '01', title: 'Charter & Scope Definition', description: 'Agreeing on measurable acceptance criteria, key deliverables, and project constraints.' },
      { step: '02', title: 'Sprint Cadence Setup', description: 'Configuring JIRA/Azure DevOps boards, automated burndown charts, and meeting cadences.' },
      { step: '03', title: 'Sprint Execution & QA', description: 'Managing iterative development cycles with continuous automated testing.' },
      { step: '04', title: 'Production Release & Retrospective', description: 'Structured deployment coordination and continuous improvement reviews.' },
    ],
    faqs: [
      { question: 'Can you work within our existing tooling?', answer: 'Yes, our project managers adapt smoothly to Jira, Azure DevOps, Asana, Monday, and enterprise PMO systems.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
  },

  // 14. Web Design
  {
    id: 'web-design',
    slug: 'web-design',
    title: 'Web Design',
    category: 'business',
    tagline: 'Creative, responsive UI/UX design that elevates brand authority and delivers intuitive enterprise customer journeys',
    shortDesc: 'Creative, responsive UI/UX that combines modern typography, micro-interactions, and conversion-focused design systems.',
    fullDesc: 'Your digital interface is the primary touchpoint for clients, partners, and talent. Prakvi’s Web Design practice crafts bespoke, high-converting digital experiences. We combine design psychology, responsive wireframing, robust Figma design systems, and WCAG accessibility standards to build visually commanding web products.',
    iconName: 'PenTool',
    badge: 'Design Systems & UI/UX',
    businessChallenge: 'Outdated, cluttered web layouts fail to communicate enterprise sophistication, leading to high bounce rates and lost credibility.',
    howWeHelp: 'We build tailored enterprise design systems, conduct user research, and craft pixel-perfect, responsive responsive prototypes.',
    capabilities: [
      { title: 'Enterprise Design Systems', description: 'Scalable component libraries, typography tokens, and color systems in Figma and Tailwind.' },
      { title: 'Responsive Mobile-First UI/UX', description: 'Flawless visual presentation adapted for smartphones, tablets, and 4K displays.' },
      { title: 'Interactive Wireframing & Prototyping', description: 'High-fidelity clickable prototypes that validate user flows before code is written.' },
      { title: 'Accessibility & WCAG 2.1 AA Compliance', description: 'High contrast ratios, screen-reader semantic structures, and keyboard navigation.' },
    ],
    businessBenefits: [
      { title: '3x Conversion Lift', description: 'Intuitive navigation and clear value propositions convert corporate visitors into qualified leads.', metric: '3x Leads' },
      { title: 'Unified Brand Consistency', description: 'Reusable design tokens guarantee brand consistency across all digital touchpoints.', metric: '100% Consistent' },
    ],
    deliverySteps: [
      { step: '01', title: 'Brand & UX Research', description: 'Studying target audience personas, competitor benchmarks, and brand guidelines.' },
      { step: '02', title: 'Information Architecture', description: 'Structuring sitemaps, intuitive navigation trees, and core user pathways.' },
      { step: '03', title: 'High-Fidelity Visual Design', description: 'Crafting responsive layouts, micro-interactions, and design tokens in Figma.' },
      { step: '04', title: 'Frontend Developer Handoff', description: 'Documenting component specs and animations for seamless engineering implementation.' },
    ],
    faqs: [
      { question: 'Do you create custom designs or use templates?', answer: 'All our corporate designs are 100% custom-crafted to reflect your brand identity and business objectives.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80',
  },

  // 15. Enterprise Solution
  {
    id: 'enterprise-solution',
    slug: 'enterprise-solution',
    title: 'Enterprise Solution',
    category: 'business',
    tagline: 'High-performance web development, custom portal engineering, and scalable enterprise SaaS backbones',
    shortDesc: 'Web development engineered for low latency, enterprise security, high concurrency, and seamless database integration.',
    fullDesc: 'Prakvi’s Enterprise Solution practice engineers custom web applications, client portals, and mission-critical SaaS platforms. Utilizing modern frameworks like React, TypeScript, Node.js, and cloud microservices, we build high-speed, secure, and resilient web architectures that scale with enterprise growth.',
    iconName: 'Code2',
    badge: 'Enterprise Web Development',
    businessChallenge: 'Slow, monolithic web applications suffer from frequent crashes, poor mobile responsiveness, and vulnerabilities under traffic surges.',
    howWeHelp: 'We develop modular, component-driven web architectures with server-side rendering, sub-second latency, and automated testing.',
    capabilities: [
      { title: 'Custom Enterprise Web Apps', description: 'Tailored workflow tools, transactional management consoles, and B2B client portals.' },
      { title: 'React, Next.js & TypeScript Engineering', description: 'Type-safe, component-driven frontend architectures optimized for lightning-fast rendering.' },
      { title: 'Secure REST & GraphQL APIs', description: 'High-throughput backend endpoints with JWT/OAuth2 authentication and rate limiting.' },
      { title: 'Progressive Web Apps (PWA)', description: 'Installable, offline-capable web applications delivering native-like mobile performance.' },
    ],
    businessBenefits: [
      { title: 'Sub-Second Page Loads', description: 'Optimized asset bundling and edge caching deliver instant page responses worldwide.', metric: '<1s Load Time' },
      { title: 'Enterprise Security Hardening', description: 'Rigorous protection against OWASP Top 10 vulnerabilities, XSS, and SQL injection.', metric: 'A+ Security' },
    ],
    deliverySteps: [
      { step: '01', title: 'Technical Scoping', description: 'Defining API contracts, database schemas, and performance benchmarks.' },
      { step: '02', title: 'Sprint-Based Development', description: 'Agile sprints with automated CI/CD builds and preview environments.' },
      { step: '03', title: 'Automated QA & Security', description: 'Unit, integration, and end-to-end regression testing with Cypress and Jest.' },
      { step: '04', title: 'Cloud Production Release', description: 'Zero-downtime deployment with global CDN acceleration and telemetry monitoring.' },
    ],
    faqs: [
      { question: 'What tech stack do you recommend for enterprise web development?', answer: 'We specialize in React, TypeScript, Tailwind CSS, Node.js, and cloud containerization on AWS or Azure.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80',
  },

  // 16. Digital Marketing
  {
    id: 'digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    category: 'business',
    tagline: 'SEO, SEM, and branding strategies that drive high-intent enterprise pipeline and domain authority',
    shortDesc: 'SEO, SEM, and branding that position your company as an industry thought leader and accelerate inbound lead generation.',
    fullDesc: 'In B2B technology, generic advertising fails. Prakvi’s Digital Marketing practice develops targeted, data-driven acquisition engines. We combine enterprise Search Engine Optimization (SEO), high-intent Search Engine Marketing (SEM), LinkedIn account-based marketing (ABM), and content branding to capture high-value contracts.',
    iconName: 'Megaphone',
    badge: 'Growth & Brand Acceleration',
    businessChallenge: 'High ad spend on low-intent clicks, invisible search rankings for high-value technical terms, and unmeasured marketing ROI.',
    howWeHelp: 'We execute multi-channel B2B campaigns focused on technical buyer personas, keyword intent mapping, and pipeline attribution.',
    capabilities: [
      { title: 'Enterprise Technical SEO', description: 'Site architecture audits, Schema.org rich snippets, Core Web Vitals optimization, and keyword rank acceleration.' },
      { title: 'Targeted B2B SEM & PPC', description: 'High-intent Google Search and LinkedIn ad campaigns targeting decision-makers at tier-1 accounts.' },
      { title: 'Content & Thought Leadership', description: 'Technical whitepapers, case study development, and research briefings that demonstrate expertise.' },
      { title: 'Full-Funnel Attribution Analytics', description: 'Connecting ad impressions and website visits directly to CRM pipeline revenue.' },
    ],
    businessBenefits: [
      { title: '240% Inbound Lead Growth', description: 'Targeting high-intent enterprise keywords generates qualified corporate RFP inquiries.', metric: '+240% Inbound' },
      { title: 'Lower Customer Acquisition Cost', description: 'Organic search rankings provide enduring compounding traffic without recurring ad spend.', metric: '45% Lower CAC' },
    ],
    deliverySteps: [
      { step: '01', title: 'Competitive & Keyword Audit', description: 'Identifying competitor keyword vulnerabilities and buyer search intent.' },
      { step: '02', title: 'Technical Optimization', description: 'Fixing crawl errors, enhancing page speed, and implementing structured data.' },
      { step: '03', title: 'Campaign Launch & ABM', description: 'Deploying tightly targeted paid search and social campaigns with custom landing pages.' },
      { step: '04', title: 'Continuous CRO & Attribution', description: 'A/B testing page copy and optimizing pipeline conversion rates.' },
    ],
    faqs: [
      { question: 'How quickly can we expect SEO results?', answer: 'While paid SEM generates immediate qualified traffic, enterprise SEO typically shows compounding organic rank acceleration within 3 to 6 months.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1200&q=80',
  },

  // 17. Mobile App Development
  {
    id: 'mobile-app-development',
    slug: 'mobile-app-development',
    title: 'Mobile App Development',
    category: 'business',
    tagline: 'iOS & Android custom apps engineered for native responsiveness, offline resilience, and enterprise API integration',
    shortDesc: 'iOS & Android custom apps built with React Native and native toolkits with biometric security and real-time sync.',
    fullDesc: 'Mobile applications require instantaneous responsiveness, intuitive ergonomics, and robust security. Prakvi develops cross-platform and native mobile apps for iOS and Android. Whether building customer-facing financial portals or internal field-service inspection tools, we ensure frictionless performance.',
    iconName: 'Smartphone',
    badge: 'Mobile Engineering',
    businessChallenge: 'Building separate native codebases doubles engineering costs, while poorly architected hybrid apps suffer from sluggish performance and crashes.',
    howWeHelp: 'We engineer performant React Native and Flutter codebases with native bridges, background synchronization, and enterprise MDM compliance.',
    capabilities: [
      { title: 'Cross-Platform React Native & Flutter', description: 'Single type-safe codebase delivering native 60fps performance across iOS and Android.' },
      { title: 'Native iOS (Swift) & Android (Kotlin)', description: 'Bespoke native engineering for hardware-intensive features, Bluetooth, and camera vision.' },
      { title: 'Offline-First Data Synchronization', description: 'Local SQLite/WatermelonDB storage with conflict-free automated cloud syncing upon reconnect.' },
      { title: 'Biometric & MDM Integration', description: 'Face ID, Touch ID, certificate pinning, and enterprise Mobile Device Management enrollment.' },
    ],
    businessBenefits: [
      { title: '50% Faster Time-to-Market', description: 'Single codebase sharing reduces development cycles and speeds app store approval.', metric: '2x Speed' },
      { title: '4.9 Star User Satisfaction', description: 'Fluid micro-interactions and resilient offline capability deliver exceptional user ratings.', metric: '4.9 Rating' },
    ],
    deliverySteps: [
      { step: '01', title: 'Mobile UX Architecture', description: 'Designing platform-compliant mobile navigation patterns for iOS and Android.' },
      { step: '02', title: 'Core App Engineering', description: 'Iterative sprint development with continuous test builds via TestFlight and Firebase.' },
      { step: '03', title: 'Security & Performance Audit', description: 'Penetration testing, memory leak profiling, and battery consumption optimization.' },
      { step: '04', title: 'App Store Submission', description: 'Managing Apple App Store and Google Play compliance review and publication.' },
    ],
    faqs: [
      { question: 'Do you handle the App Store and Google Play submission process?', answer: 'Yes, we manage the complete submission, compliance checks, privacy disclosures, and approval lifecycle.' },
    ],
    featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
  },
];
