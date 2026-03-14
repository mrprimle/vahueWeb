import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ContactContainer from '@/components/engineering/ContactContainer'

// ─── Types ────────────────────────────────────────────────────
interface IndustryPageData {
  slug: string
  title: string
  headline: string
  subheadline: string
  description: string
  metaDescription: string
  problems: {
    sectionTitle: string
    items: { title: string; description: string }[]
  }
  services: {
    sectionTitle: string
    sectionSubtitle: string
    items: { title: string; description: string; icon: string }[]
  }
  stack: {
    sectionTitle: string
    categories: { label: string; tools: string[] }[]
  }
  process: {
    sectionTitle: string
    steps: { step: string; title: string; description: string }[]
  }
  differentiators: { title: string; description: string }[]
  faq: { question: string; answer: string }[]
  ctaTitle: string
  ctaSubtitle: string
}

// ─── Data ─────────────────────────────────────────────────────
const industryPages: Record<string, IndustryPageData> = {
  'ai-data-engineering': {
    slug: 'ai-data-engineering',
    title: 'AI & Data Engineering Solutions',
    headline: 'AI & Data Engineering That Delivers Business Outcomes',
    subheadline: 'From model training to production deployment, we build intelligent systems that actually ship. Data pipelines, LLM integrations, and ML infrastructure that scales with your ambition.',
    description: 'Your data and AI initiatives shouldn\'t stall at the prototype stage. We engineer production-grade intelligent systems — from real-time data pipelines to custom LLM applications — that create measurable business value, not just impressive demos.',
    metaDescription: 'Vahue AI & data engineering solutions: production ML systems, data pipelines, LLM integration, and analytics infrastructure. From prototype to production for AI-native companies.',
    problems: {
      sectionTitle: 'Why AI & data projects fail to deliver ROI',
      items: [
        {
          title: 'Your AI prototype never made it to production',
          description: 'The Jupyter notebook demo looked great. Six months later, it\'s still not in your product. The gap between a data science experiment and a reliable production feature is where most AI companies lose momentum — and investor confidence.',
        },
        {
          title: 'Your data infrastructure can\'t support your AI ambitions',
          description: 'Your models need clean, real-time data. Your pipelines deliver stale, incomplete, duplicated data. Every time your data team tries to build something new, they spend 80% of their time fighting infrastructure instead of creating value.',
        },
        {
          title: 'You\'re burning through cloud credits with no optimization',
          description: 'GPU costs are spiraling. Model inference is expensive. Your training runs waste compute on bad hyperparameters. Without proper ML infrastructure, you\'re paying 3x what you should for every prediction your model makes.',
        },
        {
          title: 'Your team can build models but can\'t ship products',
          description: 'You have brilliant data scientists, but nobody who can build the API, the monitoring, the feature store, or the retraining pipeline. The "last mile" of AI — from model to product — is where your team gets stuck.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build for AI & data companies',
      sectionSubtitle: 'End-to-end engineering for companies where data and AI are the product, not just a feature.',
      items: [
        {
          title: 'Production ML Systems',
          description: 'Model serving infrastructure, A/B testing frameworks, automated retraining pipelines, and monitoring systems. We take your models from notebooks to production with proper MLOps practices.',
          icon: '🧠',
        },
        {
          title: 'Data Pipeline Architecture',
          description: 'Reliable, scalable data infrastructure using Airflow, Spark, dbt, and streaming technologies. Real-time and batch pipelines that deliver clean data to every team that needs it.',
          icon: '🔄',
        },
        {
          title: 'LLM Application Development',
          description: 'Custom LLM applications with RAG, fine-tuning, and prompt engineering. Built for accuracy, cost-efficiency, and user adoption — not just impressive demos.',
          icon: '💬',
        },
        {
          title: 'Analytics & BI Infrastructure',
          description: 'Data warehouses, semantic layers, and self-service analytics platforms. We build the infrastructure that lets your entire organization make data-driven decisions.',
          icon: '📊',
        },
        {
          title: 'Feature Stores & ML Infrastructure',
          description: 'Centralized feature computation, storage, and serving for your ML models. Consistent features between training and inference, with versioning and monitoring built in.',
          icon: '⚡',
        },
        {
          title: 'Data Quality & Governance',
          description: 'Automated data validation, lineage tracking, access controls, and compliance frameworks. Trust your data so your stakeholders can trust your insights.',
          icon: '✅',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our AI & data stack',
      categories: [
        { label: 'ML/AI', tools: ['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenAI', 'LangChain', 'MLflow'] },
        { label: 'Data Processing', tools: ['Apache Spark', 'dbt', 'Apache Flink', 'Polars', 'Pandas'] },
        { label: 'Orchestration', tools: ['Airflow', 'Prefect', 'Dagster', 'Kubeflow', 'Ray'] },
        { label: 'Storage', tools: ['Snowflake', 'BigQuery', 'Databricks', 'Delta Lake', 'Pinecone'] },
        { label: 'Streaming', tools: ['Kafka', 'Kafka Connect', 'Debezium', 'Redis Streams'] },
        { label: 'Infrastructure', tools: ['Kubernetes', 'Docker', 'Terraform', 'AWS', 'GCP'] },
      ],
    },
    process: {
      sectionTitle: 'How we deliver for AI & data companies',
      steps: [
        {
          step: '01',
          title: 'Architecture Assessment',
          description: 'We audit your current data and ML infrastructure. We identify bottlenecks, reliability issues, and missed optimization opportunities. You get a prioritized roadmap with clear ROI estimates.',
        },
        {
          step: '02',
          title: 'Foundation Build',
          description: 'We establish reliable data pipelines, proper orchestration, and core ML infrastructure. This foundation eliminates the "firefighting" and lets your team focus on high-value work.',
        },
        {
          step: '03',
          title: 'Production Hardening',
          description: 'We build monitoring, alerting, cost optimization, and automated recovery. Your AI systems become reliable production services, not fragile experiments.',
        },
        {
          step: '04',
          title: 'Scale & Transfer',
          description: 'We optimize for growth, document everything, and train your team. The infrastructure becomes yours to extend and evolve independently.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Full-stack AI engineers, not just data scientists',
        description: 'Our engineers build the API, the infrastructure, the frontend, AND the ML pipeline. No handoff gaps. No "that\'s not my job." One team that owns the entire stack.',
      },
      {
        title: 'Production mindset from day one',
        description: 'We don\'t build experiments. We build production systems with monitoring, fallbacks, cost controls, and SLAs. Every feature we ship is built to run reliably at scale.',
      },
      {
        title: 'Cost-optimized AI infrastructure',
        description: 'We\'ve reduced cloud costs by 40–60% for AI companies through proper GPU utilization, model optimization, caching strategies, and smart infrastructure choices.',
      },
    ],
    faq: [
      {
        question: 'Can you work with our existing data science team?',
        answer: 'That\'s our preferred model. We complement your data scientists with production engineering skills — building the infrastructure, APIs, and deployment systems they need to ship their models.',
      },
      {
        question: 'What if we\'re starting from scratch with AI?',
        answer: 'We help AI-first startups establish their entire data and ML infrastructure from the ground up. We\'ve done it multiple times and know how to build foundations that scale.',
      },
      {
        question: 'How do you handle data security and privacy?',
        answer: 'We implement encryption, access controls, PII handling, and audit trails from day one. We\'ve worked with GDPR, HIPAA, and SOC 2 requirements across multiple AI companies.',
      },
      {
        question: 'What\'s the typical engagement timeline?',
        answer: 'Quick infrastructure wins in 2–4 weeks. A solid production foundation in 2–3 months. Ongoing scaling and optimization as your product grows. We scope precisely during discovery.',
      },
    ],
    ctaTitle: 'Your AI should be in production, not in a notebook.',
    ctaSubtitle: 'Talk to engineers who bridge the gap between data science and production.',
  },

  'healthtech': {
    slug: 'healthtech',
    title: 'HealthTech Software Development',
    headline: 'Healthcare Software Development Services',
    subheadline: 'Developing software for healthcare is about understanding the deeply personal nature of medical care. Our team creates solutions that connect care providers with patients, streamline complex medical workflows, and handle sensitive health data with the security it demands.',
    description: 'From telemedicine platforms to clinical workflow automation, health data analytics to patient engagement apps — we build healthcare software that meets the technical requirements of the industry while keeping the human element at its core.',
    metaDescription: 'Vahue healthcare software development: HIPAA-compliant platforms, telemedicine, EHR integration, clinical workflows, and health data analytics. Senior healthcare engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'Challenges we help healthcare companies solve',
      items: [
        {
          title: 'Legacy systems holding back patient care',
          description: 'Your clinical workflows are trapped in systems designed decades ago. Paper-based processes persist alongside fragmented digital tools that don\'t talk to each other. Every workaround your staff creates is a risk to patient safety and care quality.',
        },
        {
          title: 'Compliance complexity paralyzes development',
          description: 'HIPAA, HITECH, FDA regulations, SOC 2 — the compliance landscape in healthcare is a minefield. Your development team moves slowly because every feature requires security reviews, and a single misstep could mean millions in fines and lost patient trust.',
        },
        {
          title: 'Interoperability is a nightmare',
          description: 'HL7 FHIR promises seamless data exchange, but the reality is messy. Your EHR integrations break, data mapping is incomplete, and every new partner connection takes months. Patients suffer when their data can\'t follow them between providers.',
        },
        {
          title: 'Finding engineers who understand healthcare',
          description: 'You need developers who don\'t just write code — they understand clinical workflows, patient data sensitivity, regulatory requirements, and the stakes of getting it wrong. That combination is nearly impossible to hire for.',
        },
      ],
    },
    services: {
      sectionTitle: 'Healthcare software solutions we build',
      sectionSubtitle: 'Technology that respects the complexity of healthcare while making it simpler for providers and patients.',
      items: [
        {
          title: 'Telemedicine & Virtual Care Platforms',
          description: 'HIPAA-compliant video consultation platforms, remote patient monitoring systems, and virtual care workflows. Secure, reliable, and designed for the real-world chaos of clinical environments.',
          icon: '🏥',
        },
        {
          title: 'EHR/EMR Integration & Development',
          description: 'HL7 FHIR-compliant integrations with Epic, Cerner, Allscripts, and other EHR systems. Custom clinical documentation tools, order management systems, and interoperability layers.',
          icon: '📋',
        },
        {
          title: 'Patient Engagement & Digital Health',
          description: 'Patient portals, appointment scheduling, medication adherence apps, and health education platforms. Tools that actually improve patient outcomes, not just check a digital transformation box.',
          icon: '💙',
        },
        {
          title: 'Clinical Workflow Automation',
          description: 'Automate repetitive clinical and administrative tasks — from prior authorizations to referral management to documentation. Free up your clinicians to focus on what they were trained for: patient care.',
          icon: '⚡',
        },
        {
          title: 'Health Data Analytics & AI',
          description: 'Population health analytics, predictive modeling for patient outcomes, clinical decision support systems, and medical imaging AI. Turning health data into actionable clinical insights.',
          icon: '📊',
        },
        {
          title: 'Compliance & Security Engineering',
          description: 'HIPAA/HITECH compliance implementation, security architecture, encryption, audit logging, and penetration testing. We build compliance into the architecture, not as an afterthought.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our healthcare tech stack',
      categories: [
        { label: 'Interoperability', tools: ['HL7 FHIR', 'HL7 v2', 'DICOM', 'CDA', 'SMART on FHIR'] },
        { label: 'Backend', tools: ['Node.js', 'Python', 'Java', 'Go', 'NestJS', 'Django'] },
        { label: 'Frontend', tools: ['React', 'React Native', 'TypeScript', 'Next.js'] },
        { label: 'Cloud & Security', tools: ['AWS (HIPAA)', 'Azure Healthcare', 'GCP', 'Vault', 'SOC 2'] },
        { label: 'Data & AI', tools: ['PostgreSQL', 'MongoDB', 'Snowflake', 'TensorFlow', 'PyTorch'] },
        { label: 'DevOps', tools: ['Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'DataDog'] },
      ],
    },
    process: {
      sectionTitle: 'How we deliver healthcare software',
      steps: [
        {
          step: '01',
          title: 'Clinical Discovery',
          description: 'We learn your clinical workflows, regulatory requirements, and integration landscape. We interview stakeholders — from physicians to compliance officers — to understand what success looks like.',
        },
        {
          step: '02',
          title: 'Compliant Architecture',
          description: 'We design systems with HIPAA compliance, data security, and interoperability built into the foundation. Not retrofitted. Threat models, data flow diagrams, and compliance controls from day one.',
        },
        {
          step: '03',
          title: 'Iterative Development',
          description: 'Agile sprints with continuous clinical validation. We build, test with real healthcare professionals, iterate based on clinical feedback, and ship incrementally.',
        },
        {
          step: '04',
          title: 'Validation & Compliance',
          description: 'Thorough security testing, compliance validation, and clinical workflow verification. We help you prepare for HIPAA audits, SOC 2 certification, and regulatory submissions.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Engineers who understand healthcare',
        description: 'Our team has built systems for telehealth platforms, clinical trials management, and health data analytics. We speak HL7, understand clinical workflows, and know why a 3-second delay in an ER dashboard is unacceptable.',
      },
      {
        title: 'Compliance built in, not bolted on',
        description: 'We don\'t build first and worry about HIPAA later. Security, encryption, access controls, and audit logging are architectural decisions made on day one. This saves months of rework and reduces risk.',
      },
      {
        title: 'Patient-centered design thinking',
        description: 'Technology in healthcare serves people at their most vulnerable. We design for accessibility, simplicity, and trust — because the best healthcare software is the kind patients actually use.',
      },
    ],
    faq: [
      {
        question: 'Are you HIPAA compliant?',
        answer: 'Yes. We implement HIPAA-compliant development practices, sign BAAs (Business Associate Agreements), and our engineers are trained in healthcare data handling. We\'ve built multiple systems that have passed HIPAA audits.',
      },
      {
        question: 'Can you integrate with our existing EHR system?',
        answer: 'Yes. We have experience integrating with Epic, Cerner, Allscripts, and other major EHR platforms via HL7 FHIR, HL7 v2, and custom APIs. We handle the messy reality of healthcare interoperability.',
      },
      {
        question: 'How do you handle PHI (Protected Health Information)?',
        answer: 'We implement encryption at rest and in transit, role-based access controls, audit logging, automatic session management, and data minimization principles. PHI handling is a core architectural consideration, not an afterthought.',
      },
      {
        question: 'What healthcare compliance frameworks do you work with?',
        answer: 'HIPAA/HITECH, SOC 2, FDA 21 CFR Part 11, GDPR (for health data), and ISO 27001. We tailor our compliance approach to your specific regulatory requirements and target markets.',
      },
      {
        question: 'Can you help with FDA-regulated software?',
        answer: 'Yes. We have experience with SaMD (Software as a Medical Device) development, including FDA 510(k) and De Novo pathways. We implement IEC 62304 software lifecycle processes and design controls.',
      },
    ],
    ctaTitle: 'Healthcare deserves better software. Let\'s build it.',
    ctaSubtitle: 'Talk to engineers who understand both code and clinical workflows.',
  },

  'b2b-saas': {
    slug: 'b2b-saas',
    title: 'B2B SaaS Development',
    headline: 'Engineering for B2B SaaS That Scales',
    subheadline: 'Multi-tenant architectures, complex integrations, and workflow automation. We help vertical SaaS companies ship faster without compromising on the depth that makes your product valuable.',
    description: 'B2B SaaS isn\'t consumer tech with a pricing page. Your customers demand customization, integrations, compliance, and reliability. We build the engineering foundations that let you deliver enterprise-grade software without an enterprise-sized team.',
    metaDescription: 'Vahue B2B SaaS development: multi-tenant architecture, API development, integrations, workflow automation, and scalable infrastructure for vertical SaaS companies.',
    problems: {
      sectionTitle: 'The engineering challenges killing B2B SaaS growth',
      items: [
        {
          title: 'Every enterprise customer wants something custom',
          description: 'Your biggest customers need custom fields, custom workflows, custom integrations. Your product wasn\'t designed for this level of configurability, so every customization request becomes a feature branch that never merges. You\'re building n products instead of one.',
        },
        {
          title: 'Your integration backlog is 6 months long',
          description: 'Salesforce, HubSpot, Slack, custom APIs — every deal requires an integration you don\'t have. Your competitors win because they connect to the customer\'s existing stack. You lose because "it\'s on the roadmap."',
        },
        {
          title: 'Multi-tenancy is an afterthought',
          description: 'You started with single-tenant deploys because it was easier. Now you\'re managing 50 separate instances, each slightly different. Infrastructure costs are 5x what they should be, and one customer\'s bug is everyone\'s emergency.',
        },
        {
          title: 'Your dev team can\'t keep up with product ambitions',
          description: 'You have 200 features on the roadmap and 5 engineers. Every quarter, you ship 10% of what you promised. Your churn rate reflects it. You need to double your engineering output without doubling your burn rate.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build for B2B SaaS companies',
      sectionSubtitle: 'Engineering that turns your product into a platform customers build their business on.',
      items: [
        {
          title: 'Multi-Tenant Architecture',
          description: 'Proper multi-tenancy: data isolation, tenant-specific configurations, feature flags, usage-based billing, and performance isolation. One codebase that serves every customer correctly.',
          icon: '🏗️',
        },
        {
          title: 'Integration Platform & APIs',
          description: 'RESTful and GraphQL APIs, webhook systems, OAuth integrations, and embedded iPaaS capabilities. Turn your integration backlog into a competitive advantage with a platform approach.',
          icon: '🔗',
        },
        {
          title: 'Workflow Automation Engine',
          description: 'Configurable workflow builders, rule engines, and automation systems that let customers customize behavior without engineering effort. The flexibility enterprises demand, built once.',
          icon: '⚡',
        },
        {
          title: 'Admin & Analytics Dashboards',
          description: 'Customer-facing analytics, admin panels, usage dashboards, and reporting tools. Self-service capabilities that reduce support tickets and increase product stickiness.',
          icon: '📊',
        },
        {
          title: 'Billing & Subscription Infrastructure',
          description: 'Usage-based billing, tiered pricing, seat management, and enterprise invoicing. Integrated with Stripe, Chargebee, or custom solutions that match your go-to-market.',
          icon: '💳',
        },
        {
          title: 'Security & Compliance',
          description: 'SOC 2 readiness, SSO/SAML integration, role-based access controls, audit logging, and data residency. The table-stakes security that enterprise buyers require before signing.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our B2B SaaS stack',
      categories: [
        { label: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Storybook'] },
        { label: 'Backend', tools: ['Node.js', 'NestJS', 'Python', 'Go', 'GraphQL', 'tRPC'] },
        { label: 'Databases', tools: ['PostgreSQL', 'Redis', 'Elasticsearch', 'ClickHouse'] },
        { label: 'Infrastructure', tools: ['AWS', 'Kubernetes', 'Terraform', 'Docker', 'Vercel'] },
        { label: 'Integrations', tools: ['Stripe', 'Twilio', 'SendGrid', 'OAuth', 'Webhooks'] },
        { label: 'Tooling', tools: ['LaunchDarkly', 'Segment', 'Datadog', 'Sentry', 'PostHog'] },
      ],
    },
    process: {
      sectionTitle: 'How we scale B2B SaaS products',
      steps: [
        {
          step: '01',
          title: 'Product & Architecture Review',
          description: 'We analyze your current product architecture, technical debt, and growth bottlenecks. We identify what\'s blocking your next stage of growth and create a prioritized engineering plan.',
        },
        {
          step: '02',
          title: 'Foundation Strengthening',
          description: 'We fix the architectural issues that slow everything else down: proper multi-tenancy, API design, testing infrastructure, and deployment automation. This phase unblocks everything after it.',
        },
        {
          step: '03',
          title: 'Feature Velocity',
          description: 'With the foundation solid, our embedded engineers join your team to accelerate feature delivery. Sprint-by-sprint, we ship the features your customers and prospects are waiting for.',
        },
        {
          step: '04',
          title: 'Platform Maturity',
          description: 'We build the platform capabilities — integrations, automation, extensibility — that turn your product from a tool into the system of record your customers can\'t live without.',
        },
      ],
    },
    differentiators: [
      {
        title: 'We\'ve scaled SaaS products before',
        description: 'Our engineers have built multi-tenant platforms serving thousands of companies. We know the architecture patterns that work at 10 customers and still work at 10,000.',
      },
      {
        title: 'Product-minded engineers',
        description: 'We don\'t just ship features — we understand unit economics, churn drivers, and what makes enterprise buyers sign. Our engineers ask "why" before writing code.',
      },
      {
        title: 'Embedded, not outsourced',
        description: 'Our engineers work in your repos, attend your standups, and debate architecture in your Slack. They\'re your team — we just handle the hiring, payroll, and retention.',
      },
    ],
    faq: [
      {
        question: 'Can you help us move from single-tenant to multi-tenant?',
        answer: 'Yes. We\'ve done this migration multiple times. We use an incremental approach — shared services first, then data isolation, then full multi-tenancy — so you never stop shipping features during the transition.',
      },
      {
        question: 'What stage SaaS companies do you work with?',
        answer: 'From seed-stage startups building their MVP to Series B+ companies scaling to enterprise. Our engagement model adapts: embedded engineers for early-stage, larger teams for growth-stage.',
      },
      {
        question: 'How quickly can engineers start contributing?',
        answer: 'Most of our engineers ship their first meaningful PR within the first week. By week two, they\'re fully integrated and contributing at the pace of your best team members.',
      },
      {
        question: 'Do you handle DevOps and infrastructure too?',
        answer: 'Yes. Full-stack means full-stack: frontend, backend, infrastructure, CI/CD, monitoring, and security. We don\'t stop at the application layer.',
      },
    ],
    ctaTitle: 'Your SaaS product needs to ship faster.',
    ctaSubtitle: 'Talk to engineers who\'ve scaled B2B platforms from 10 to 10,000 customers.',
  },

  'fintech': {
    slug: 'fintech',
    title: 'FinTech Software Development',
    headline: 'FinTech Software Development Services',
    subheadline: 'Building financial technology means operating in a world where a single decimal point error or a moment of downtime can cost millions. We develop software for companies that move money, manage risk, and navigate complex regulatory environments — from payment processors and neobanks to crypto platforms and insurance tech.',
    description: 'Our FinTech engineering teams understand that financial software demands a fundamentally different approach. Every line of code must account for transaction integrity, regulatory compliance, security threats, and the expectations of users who trust you with their financial lives.',
    metaDescription: 'Vahue FinTech software development: payment systems, banking platforms, crypto infrastructure, trading systems, and regulatory compliance engineering. Senior FinTech engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'Why financial software is different',
      items: [
        {
          title: 'Regulatory compliance is eating your roadmap',
          description: 'PSD2, PCI DSS, SOX, AML/KYC, MiCA — every market you enter comes with a new alphabet soup of regulations. Your compliance team flags issues faster than your engineers can fix them, and every new feature requires a regulatory impact assessment.',
        },
        {
          title: 'Your transaction system can\'t handle what\'s coming',
          description: 'Your payment processing works today, but Black Friday volumes, international expansion, or a new product launch will break it. Idempotency, exactly-once processing, and distributed transactions aren\'t in your codebase because nobody on your team has built them before.',
        },
        {
          title: 'Security isn\'t a feature — it\'s existential',
          description: 'One breach and you lose your banking license, your customers, and your company. Your security posture was designed for a Series A startup, but you\'re handling real money now. The gap between where you are and where you need to be keeps widening.',
        },
        {
          title: 'Integration with legacy financial infrastructure',
          description: 'SWIFT, SEPA, ACH, card networks, core banking systems — the financial world runs on protocols designed before the internet. Every integration is a multi-month project that requires engineers who understand both modern APIs and legacy financial messaging.',
        },
      ],
    },
    services: {
      sectionTitle: 'FinTech solutions we build',
      sectionSubtitle: 'Engineering for companies where money moves, risk is managed, and trust is everything.',
      items: [
        {
          title: 'Payment Processing Systems',
          description: 'High-throughput payment rails, multi-currency processing, payment orchestration layers, and reconciliation engines. Built for the volume, speed, and accuracy that financial transactions demand.',
          icon: '💸',
        },
        {
          title: 'Banking & Neobank Platforms',
          description: 'Core banking modules, account management, transaction processing, and customer onboarding flows. Integrated with banking-as-a-service providers or built from the ground up.',
          icon: '🏦',
        },
        {
          title: 'Crypto & DeFi Infrastructure',
          description: 'Exchange platforms, wallet infrastructure, smart contract integration, and blockchain analytics. We build crypto products that bridge the gap between Web3 technology and traditional finance.',
          icon: '🪙',
        },
        {
          title: 'Risk & Compliance Engineering',
          description: 'AML/KYC automation, transaction monitoring, fraud detection systems, and regulatory reporting. Compliance infrastructure that scales with your business without slowing down your product.',
          icon: '📋',
        },
        {
          title: 'Trading & Investment Platforms',
          description: 'Real-time market data processing, order management systems, portfolio analytics, and robo-advisory engines. Low-latency systems built for the demands of financial markets.',
          icon: '📈',
        },
        {
          title: 'InsurTech & Lending Platforms',
          description: 'Underwriting engines, claims processing automation, credit scoring systems, and loan origination platforms. Automating complex financial decisions with accuracy and auditability.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our FinTech stack',
      categories: [
        { label: 'Backend', tools: ['Go', 'Java', 'Python', 'Node.js', 'Rust', 'Kotlin'] },
        { label: 'Databases', tools: ['PostgreSQL', 'TimescaleDB', 'Redis', 'ClickHouse', 'DynamoDB'] },
        { label: 'Messaging', tools: ['Apache Kafka', 'RabbitMQ', 'AWS SQS', 'Redis Streams'] },
        { label: 'Security', tools: ['Vault', 'HSM', 'OAuth/OIDC', 'PCI DSS', 'WAF'] },
        { label: 'Payments', tools: ['Stripe', 'Adyen', 'SWIFT', 'SEPA', 'ACH', 'Open Banking APIs'] },
        { label: 'Infrastructure', tools: ['AWS', 'Kubernetes', 'Terraform', 'Datadog', 'PagerDuty'] },
      ],
    },
    process: {
      sectionTitle: 'How we deliver FinTech software',
      steps: [
        {
          step: '01',
          title: 'Regulatory & Technical Discovery',
          description: 'We map your regulatory landscape, integration requirements, and technical architecture. We identify compliance gaps, security risks, and scalability constraints before writing a line of code.',
        },
        {
          step: '02',
          title: 'Secure Architecture Design',
          description: 'Threat modeling, data flow mapping, and compliance-first architecture. We design for PCI DSS, SOC 2, and your specific regulatory framework from the foundation up.',
        },
        {
          step: '03',
          title: 'Incremental Delivery',
          description: 'We ship in small, auditable increments with comprehensive testing, security reviews, and compliance validation at every step. No "big bang" launches in financial software.',
        },
        {
          step: '04',
          title: 'Production & Compliance',
          description: 'Monitoring, alerting, incident response, and continuous compliance validation. We help you maintain your security posture and regulatory compliance as you scale.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Engineers who understand financial systems',
        description: 'Our team has built payment processors, trading platforms, and banking infrastructure. We understand double-entry bookkeeping, settlement cycles, and why you can\'t just "retry" a failed financial transaction.',
      },
      {
        title: 'Compliance as code, not paperwork',
        description: 'We implement compliance controls as automated tests, infrastructure policies, and monitoring rules. When auditors come, evidence is generated automatically — not assembled in a panic.',
      },
      {
        title: 'Zero-tolerance security culture',
        description: 'Every PR gets a security review. Every deployment includes vulnerability scanning. Every engineer understands the OWASP FinTech threat landscape. Security isn\'t a separate team — it\'s how we build.',
      },
    ],
    faq: [
      {
        question: 'Do you have experience with PCI DSS compliance?',
        answer: 'Yes. We\'ve built PCI DSS Level 1 compliant systems, including payment processing environments with proper network segmentation, encryption, and audit logging. We help minimize your cardholder data environment to reduce compliance scope.',
      },
      {
        question: 'Can you integrate with banking APIs and card networks?',
        answer: 'Yes. We have experience with Stripe, Adyen, Plaid, Open Banking APIs (PSD2), SWIFT, SEPA, ACH, and various card network integrations. We handle the complexity of legacy financial protocols.',
      },
      {
        question: 'How do you handle transaction consistency?',
        answer: 'We implement idempotent operations, distributed transaction patterns (saga, outbox), event sourcing, and proper reconciliation mechanisms. Financial data integrity is a non-negotiable architectural requirement.',
      },
      {
        question: 'What about cryptocurrency and blockchain projects?',
        answer: 'We have experience with wallet infrastructure, exchange platforms, smart contract integration (EVM-compatible), and blockchain analytics. We build crypto products with the same security and compliance rigor as traditional finance.',
      },
      {
        question: 'Do you work with regulated financial institutions?',
        answer: 'Yes. We\'ve worked with licensed payment institutions, e-money providers, and banks. We understand regulatory frameworks across EU (PSD2, MiCA), US (FinCEN, state MSB), and UK (FCA) jurisdictions.',
      },
    ],
    ctaTitle: 'Financial software that moves money safely and scales reliably.',
    ctaSubtitle: 'Talk to FinTech engineers who\'ve built for banks, exchanges, and payment processors.',
  },

  'legaltech-insurtech': {
    slug: 'legaltech-insurtech',
    title: 'LegalTech & InsurTech Software Development',
    headline: 'Software That Modernizes Legal & Insurance Operations',
    subheadline: 'Document automation, claims processing, contract intelligence, and underwriting engines. We help legal firms and insurance companies replace manual processes with intelligent systems — without breaking compliance.',
    description: 'Legal and insurance industries run on documents, decisions, and deadlines. Every process that\'s still manual is a risk, a cost, and a competitive disadvantage. We build software that automates the routine so your professionals can focus on the complex.',
    metaDescription: 'Vahue LegalTech & InsurTech development: contract automation, claims processing, document AI, underwriting engines, and compliance systems for legal and insurance companies.',
    problems: {
      sectionTitle: 'What\'s holding legal & insurance companies back',
      items: [
        {
          title: 'Your professionals spend 60% of their time on admin',
          description: 'Lawyers drafting boilerplate. Adjusters re-keying claim data. Underwriters copying information between systems. Your highest-paid professionals are doing work that software should handle — and your clients are paying for it.',
        },
        {
          title: 'Document chaos is your biggest risk',
          description: 'Thousands of contracts with different terms, expiration dates, and renewal clauses scattered across shared drives, email, and filing cabinets. Missing a clause renewal or a regulatory deadline isn\'t just expensive — it\'s negligent.',
        },
        {
          title: 'Claims processing is still painfully manual',
          description: 'Every claim touches 5 systems, requires 3 approvals, and takes 2 weeks. Your customers expect Amazon-speed resolution but get 1990s-era workflows. Meanwhile, fraudulent claims slip through because nobody has time to review properly.',
        },
        {
          title: 'Legacy systems lock you into the past',
          description: 'Your policy administration system is 15 years old. Your case management software hasn\'t been updated since 2018. Every new requirement means expensive customization from a vendor who knows you can\'t leave. Innovation is impossible when you\'re trapped.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build for legal & insurance companies',
      sectionSubtitle: 'Intelligent automation that respects the complexity of regulated industries.',
      items: [
        {
          title: 'Contract Intelligence & Automation',
          description: 'AI-powered contract review, automated drafting from templates, clause extraction, risk scoring, and obligation tracking. Turn your contract library from a liability into a strategic asset.',
          icon: '📄',
        },
        {
          title: 'Claims Processing Automation',
          description: 'End-to-end claims lifecycle management: intake, assessment, adjudication, and settlement. Automated routing, fraud detection, and document verification that cuts processing time by 70%.',
          icon: '⚡',
        },
        {
          title: 'Underwriting & Risk Engines',
          description: 'Data-driven underwriting models, automated risk scoring, portfolio analysis tools, and pricing optimization. Replace gut instinct with explainable, auditable risk decisions.',
          icon: '📊',
        },
        {
          title: 'Document Management & AI',
          description: 'Intelligent document parsing, OCR, classification, and data extraction. Custom-trained models that understand legal and insurance terminology, clause structures, and form formats.',
          icon: '🔍',
        },
        {
          title: 'Case & Matter Management',
          description: 'Modern case management platforms with workflow automation, deadline tracking, collaboration tools, and client portals. Replace spreadsheets and shared drives with purpose-built systems.',
          icon: '📁',
        },
        {
          title: 'Compliance & Regulatory Reporting',
          description: 'Automated regulatory filings, compliance monitoring, audit trail generation, and policy administration. Stay ahead of regulatory changes without drowning in manual reporting.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our LegalTech & InsurTech stack',
      categories: [
        { label: 'AI & NLP', tools: ['OpenAI', 'Claude', 'spaCy', 'Hugging Face', 'Tesseract OCR', 'LangChain'] },
        { label: 'Backend', tools: ['Python', 'Node.js', 'Java', 'NestJS', 'Django', 'FastAPI'] },
        { label: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
        { label: 'Databases', tools: ['PostgreSQL', 'Elasticsearch', 'MongoDB', 'Redis'] },
        { label: 'Cloud', tools: ['AWS', 'Azure', 'Kubernetes', 'Terraform', 'Docker'] },
        { label: 'Integrations', tools: ['DocuSign', 'Salesforce', 'SAP', 'ACORD', 'RESTful APIs'] },
      ],
    },
    process: {
      sectionTitle: 'How we modernize legal & insurance operations',
      steps: [
        {
          step: '01',
          title: 'Process Mapping',
          description: 'We shadow your professionals, map their actual workflows (not the documented ones), and identify the highest-impact automation opportunities. We quantify the ROI of each improvement.',
        },
        {
          step: '02',
          title: 'Pilot Automation',
          description: 'We pick one high-impact, low-risk process and automate it end-to-end. This pilot proves the approach, builds internal buy-in, and delivers ROI within weeks, not months.',
        },
        {
          step: '03',
          title: 'Scale & Integrate',
          description: 'We expand automation across workflows, integrate with your existing systems (CMS, PAS, ERP), and build the data layer that connects everything together.',
        },
        {
          step: '04',
          title: 'Continuous Improvement',
          description: 'We measure outcomes, retrain AI models on your data, and continuously improve accuracy and coverage. The system gets smarter as your organization uses it.',
        },
      ],
    },
    differentiators: [
      {
        title: 'We understand regulated industries',
        description: 'Our team has built software for law firms, insurance carriers, and regulatory bodies. We know that "move fast and break things" doesn\'t work when you\'re handling privileged communications or insurance reserves.',
      },
      {
        title: 'AI that augments, not replaces',
        description: 'We build AI tools that make your professionals faster and more accurate — not black boxes that make decisions they can\'t explain. Human-in-the-loop by design, because accountability matters.',
      },
      {
        title: 'ROI-driven engagement',
        description: 'Every project starts with a business case. We measure time saved, error rates reduced, and processing costs eliminated. If we can\'t quantify the value, we won\'t build it.',
      },
    ],
    faq: [
      {
        question: 'Can your AI handle our specific document types?',
        answer: 'Yes. We custom-train models on your actual documents — contracts, policies, claims forms, legal briefs. The more domain-specific the training data, the more accurate the results. We typically achieve 90%+ accuracy within the first iteration.',
      },
      {
        question: 'How do you handle attorney-client privilege and data confidentiality?',
        answer: 'We implement strict access controls, encryption, and data isolation. We can work within your infrastructure so data never leaves your environment. All our engineers sign NDAs and confidentiality agreements.',
      },
      {
        question: 'What\'s the typical ROI timeline?',
        answer: 'Most clients see measurable ROI within 3–6 months. Document processing automation typically delivers the fastest returns — we\'ve seen 70% reductions in processing time within the first quarter.',
      },
      {
        question: 'Can you integrate with our existing case/policy management system?',
        answer: 'Yes. We build integration layers that connect with existing systems via APIs, database connections, or file-based interfaces. We\'ve integrated with all major legal and insurance platforms.',
      },
    ],
    ctaTitle: 'Your operations should run as fast as your industry demands.',
    ctaSubtitle: 'Talk to engineers who build intelligent systems for legal and insurance.',
  },

  'real-estate': {
    slug: 'real-estate',
    title: 'Real Estate Software Development',
    headline: 'PropTech That Handles Real Estate\'s Messy Reality',
    subheadline: 'Property platforms, transaction systems, and marketplace solutions. Real estate runs on relationships, paperwork, and timing — we build the technology that makes all three work better.',
    description: 'Real estate is one of the largest asset classes on Earth, yet most of the industry still runs on spreadsheets, PDF contracts, and phone calls. We build software that digitizes property operations, automates transactions, and creates data-driven advantages for companies ready to move faster.',
    metaDescription: 'Vahue real estate software development: property platforms, CRM, transaction management, marketplace solutions, and PropTech for real estate companies and investors.',
    problems: {
      sectionTitle: 'What\'s broken in real estate technology',
      items: [
        {
          title: 'Your transaction process lives in email and spreadsheets',
          description: 'From offer to close, your deals pass through 15 people, 30 documents, and zero centralized systems. Deals fall apart because someone missed an email. Status updates require calling three people. Every transaction is a controlled chaos — and "controlled" is generous.',
        },
        {
          title: 'Your data is siloed across a dozen systems',
          description: 'MLS data in one system, CRM in another, financial models in spreadsheets, property documents in email. Your team spends hours copying data between tools, and nobody has a single source of truth for any property, deal, or client.',
        },
        {
          title: 'Your marketplace looks like it was built in 2015',
          description: 'Your search is slow, your listings are stale, and your UX can\'t compete with Zillow or the new VC-backed competitor in your niche. Users bounce because your platform feels outdated, and every lost visitor is a lost deal.',
        },
        {
          title: 'Scaling operations means scaling headcount',
          description: 'Every new market, every additional property type, every new investment vehicle requires more people doing the same manual work. Your margins shrink as you grow because your operations don\'t scale — they just multiply.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build for real estate companies',
      sectionSubtitle: 'Technology that turns your real estate operations into a competitive moat.',
      items: [
        {
          title: 'Property Marketplace Platforms',
          description: 'Listing portals, property search with map-based UX, lead capture systems, and intelligent matching. Fast, beautiful, and designed to convert visitors into inquiries.',
          icon: '🏠',
        },
        {
          title: 'Transaction Management Systems',
          description: 'End-to-end deal tracking from offer to close. Document management, milestone tracking, e-signatures, compliance checklists, and automated notifications that keep every deal on track.',
          icon: '📋',
        },
        {
          title: 'CRM & Lead Management',
          description: 'Real estate-specific CRM with contact management, deal pipelines, automated follow-ups, and marketing automation. Built for the way agents, brokers, and investors actually work.',
          icon: '👥',
        },
        {
          title: 'Property Management Platforms',
          description: 'Tenant portals, maintenance request tracking, rent collection, lease management, and owner reporting. Multi-property, multi-market platforms that scale with your portfolio.',
          icon: '🔑',
        },
        {
          title: 'Investment & Analytics Tools',
          description: 'Portfolio analytics, deal underwriting models, market comparison tools, and investor reporting dashboards. Data-driven decision making for real estate investment.',
          icon: '📊',
        },
        {
          title: 'Integrations & Data Aggregation',
          description: 'MLS/IDX integration, property data APIs, public records, mortgage calculators, and third-party service connections. A unified data layer that eliminates the spreadsheet chaos.',
          icon: '🔗',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our PropTech stack',
      categories: [
        { label: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Mapbox', 'Tailwind CSS'] },
        { label: 'Backend', tools: ['Node.js', 'Python', 'NestJS', 'Django', 'GraphQL'] },
        { label: 'Databases', tools: ['PostgreSQL', 'PostGIS', 'Elasticsearch', 'Redis', 'MongoDB'] },
        { label: 'Cloud', tools: ['AWS', 'Vercel', 'Kubernetes', 'Terraform', 'CloudFront CDN'] },
        { label: 'Integrations', tools: ['MLS/RETS/IDX', 'DocuSign', 'Stripe', 'Twilio', 'Zapier'] },
        { label: 'AI & Maps', tools: ['OpenAI', 'Mapbox GL', 'Google Maps', 'Computer Vision', 'NLP'] },
      ],
    },
    process: {
      sectionTitle: 'How we build PropTech that works',
      steps: [
        {
          step: '01',
          title: 'Market & Operations Discovery',
          description: 'We learn your market niche, transaction workflows, and competitive landscape. We interview your agents, investors, or property managers to understand what actually happens — not just what\'s supposed to happen.',
        },
        {
          step: '02',
          title: 'MVP & Validation',
          description: 'We build the minimum viable product that delivers the most important value. For marketplaces, that\'s search and listing quality. For transaction tools, it\'s workflow tracking. We validate with real users fast.',
        },
        {
          step: '03',
          title: 'Iterate & Integrate',
          description: 'We expand features based on user feedback, integrate with MLS/property data sources, and connect with the tools your team already uses. Every sprint adds measurable value.',
        },
        {
          step: '04',
          title: 'Scale & Optimize',
          description: 'We optimize performance for growing data volumes, expand to new markets, and build the automation that lets you scale operations without scaling headcount proportionally.',
        },
      ],
    },
    differentiators: [
      {
        title: 'We understand real estate workflows',
        description: 'Our team has built platforms for brokerages, property managers, real estate investors, and PropTech startups. We know the difference between residential and commercial workflows, and why "just build a marketplace" is never simple.',
      },
      {
        title: 'Geo-data and search expertise',
        description: 'Map-based search, spatial queries with PostGIS, location intelligence, and property data aggregation. We build the search and discovery experiences that keep users coming back.',
      },
      {
        title: 'Speed to market',
        description: 'Real estate moves fast and windows close. We ship MVPs in 6–8 weeks so you can validate your idea, close your fundraise, or capture the market opportunity before it disappears.',
      },
    ],
    faq: [
      {
        question: 'Can you integrate with our MLS?',
        answer: 'Yes. We have experience with RETS, RESO Web API, and IDX feeds from major MLS providers. We handle the complexity of MLS data normalization, photo processing, and real-time listing updates.',
      },
      {
        question: 'How do you handle property data from multiple sources?',
        answer: 'We build data aggregation layers that normalize property data from MLS, public records, tax assessor databases, and third-party APIs into a unified, queryable format.',
      },
      {
        question: 'Can you build a marketplace that competes with major portals?',
        answer: 'We can\'t outspend Zillow, but we can out-focus them. We build niche marketplaces (commercial, luxury, investment, international) that deliver a better experience for specific audiences. That\'s how you win.',
      },
      {
        question: 'What about mobile apps for agents and tenants?',
        answer: 'Yes. We build cross-platform mobile apps (React Native) and PWAs for agents, tenants, investors, and property managers. Mobile-first design for people who work in the field, not behind a desk.',
      },
    ],
    ctaTitle: 'Real estate needs better technology. Let\'s build yours.',
    ctaSubtitle: 'Talk to engineers who\'ve built platforms for brokerages, investors, and PropTech startups.',
  },
}

// ─── Static Params ────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(industryPages).map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = industryPages[slug]
  if (!page) return {}
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: `${page.title} | Vahue`,
      description: page.metaDescription,
      url: `https://vahue.ai/industries/${page.slug}`,
    },
  }
}

// ─── Breadcrumbs ──────────────────────────────────────────────
function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && <span className="text-gray-300">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-[#3b82f6] transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[#1d1d1f]">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}

// ─── Page Component ───────────────────────────────────────────
export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = industryPages[slug]

  if (!page) {
    notFound()
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Background gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(ellipse 120% 80% at 50% 0%, 
                  rgba(48, 94, 255, 0.48) 0%, 
                  rgba(79, 98, 248, 0.42) 20%, 
                  rgba(99, 102, 241, 0.36) 40%, 
                  rgba(110, 100, 245, 0.24) 55%, 
                  rgba(118, 98, 248, 0.15) 70%, 
                  transparent 90%
                )
              `,
            }}
          />
          <div className="relative w-full max-w-7xl mx-auto px-6 md:px-8 pt-32 md:pt-40 pb-16 md:pb-24">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Industries', href: '/' },
                { label: page.title },
              ]}
            />

            <div className="max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-dark leading-[1.08] uppercase mb-6">
                {page.headline}
              </h1>
              <p className="text-lg md:text-xl text-dark/70 mb-4 max-w-3xl leading-relaxed">
                {page.subheadline}
              </p>
              <p className="text-base text-dark/50 mb-8 max-w-2xl leading-relaxed">
                {page.description}
              </p>
              <Link
                href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-primary text-white font-medium text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Book a Call
                <svg
                  className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap gap-6 md:gap-10 items-center text-xs md:text-sm text-dark/50 font-medium">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#38BDF8]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                ISO 27001 Certified
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#38BDF8]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Top 1% on Clutch
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#38BDF8]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                GDPR Compliant
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[#38BDF8]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Engineers in &lt; 2 Weeks
              </div>
            </div>
          </div>
        </section>

        {/* ── Problems ─────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#fafafa]">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 leading-tight">
              {page.problems.sectionTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {page.problems.items.map((problem, index) => (
                <div
                  key={index}
                  className="group border border-[#F4F5F6] rounded-[32px] p-3 bg-[#F4F5F680]"
                >
                  <div className="bg-white rounded-[24px] p-6 md:p-8 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.08)]">
                    <div className="flex items-start gap-4 mb-4">
                      <span className="text-2xl font-bold gradient-text-animated flex-shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1d1d1f] leading-snug">
                        {problem.title}
                      </h3>
                    </div>
                    <p className="text-[#86868b] text-[15px] md:text-base leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────── */}
        <section className="bg-[#141414]">
          <div className="py-20 md:py-28">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
              <div className="max-w-3xl mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                  {page.services.sectionTitle}
                </h2>
                <p className="text-white/60 text-lg md:text-xl leading-relaxed">
                  {page.services.sectionSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {page.services.items.map((service, index) => (
                  <div
                    key={index}
                    className="bg-[#1e2530] rounded-3xl p-6 md:p-8 border border-[#2a3340] hover:bg-[#2d3a4a] hover:border-[#3d4f63] transition-all"
                  >
                    <span className="text-4xl mb-5 block">{service.icon}</span>
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                      {service.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA mid-page */}
              <div className="mt-16 text-center">
                <Link
                  href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 gradient-border-animated text-white font-medium text-sm uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#7c3aed]/20 transition-all duration-200 shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)]"
                >
                  Discuss Your Project
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tech Stack ───────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 leading-tight">
              {page.stack.sectionTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full mb-12" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.stack.categories.map((category) => (
                <div key={category.label}>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#86868b] mb-4">
                    {category.label}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {category.tools.map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 text-sm font-medium text-[#1d1d1f] bg-[#f5f5f7] rounded-full border border-gray-200 hover:border-[#3b82f6]/30 hover:bg-[#3b82f6]/5 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────── */}
        <section className="py-20 md:py-28 bg-[#fafafa]">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 leading-tight">
              {page.process.sectionTitle}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] rounded-full mb-12" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {page.process.steps.map((step) => (
                <div key={step.step} className="relative">
                  <div className="bg-white rounded-3xl p-6 md:p-8 h-full shadow-[0px_0px_12px_0px_rgba(0,0,0,0.06)] border border-gray-100">
                    <span className="text-5xl font-black gradient-text-animated block mb-4">
                      {step.step}
                    </span>
                    <h3 className="text-lg font-bold text-[#1d1d1f] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#86868b] text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Vahue ──────────────────────────────────── */}
        <section className="bg-[#141414]">
          <div className="py-20 md:py-28">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                Why Vahue
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-[#5EEAD4] to-[#3B82F6] rounded-full mb-12" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {page.differentiators.map((diff, index) => (
                  <div
                    key={index}
                    className="bg-[#1e2530] rounded-3xl p-6 md:p-8 border border-[#2a3340]"
                  >
                    <span className="text-3xl font-black gradient-text-animated-teal block mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-3 leading-snug">
                      {diff.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="bg-white py-20 md:py-28">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Left: Title + CTA */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-4 leading-tight">
                  Frequently Asked Questions
                </h2>
                <p className="text-[#86868b] text-base mb-8">
                  Can&apos;t find what you&apos;re looking for? Book a call and we&apos;ll answer everything.
                </p>
                <Link
                  href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[#3B82F6] transition-colors hover:text-[#2563eb]"
                >
                  Book a Call
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>

              {/* Right: FAQ items */}
              <div className="lg:col-span-2 space-y-0">
                {page.faq.map((item, index) => (
                  <details
                    key={index}
                    className="group border-b border-gray-200 last:border-b-0"
                  >
                    <summary className="flex items-center justify-between py-6 cursor-pointer list-none">
                      <h3 className="text-base md:text-lg font-semibold text-[#1d1d1f] pr-8">
                        {item.question}
                      </h3>
                      <svg
                        className="w-5 h-5 text-[#86868b] flex-shrink-0 transition-transform duration-200 group-open:rotate-45"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12M6 12h12" />
                      </svg>
                    </summary>
                    <p className="text-[#86868b] text-[15px] leading-relaxed pb-6 pr-8">
                      {item.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA Banner ────────────────────────────── */}
        <section className="bg-[#fafafa]">
          <div className="w-full max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
            <div className="bg-gradient-to-br from-[#8b5cf6]/10 via-[#6366f1]/10 to-[#3b82f6]/10 rounded-3xl p-8 md:p-12 lg:p-16 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1d1d1f] mb-4 leading-tight">
                {page.ctaTitle}
              </h2>
              <p className="text-[#86868b] text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                {page.ctaSubtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="https://calendly.com/mike_at_pletava/vahue-ai-discovery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 bg-primary text-white font-medium text-sm uppercase tracking-wider px-6 py-3 rounded-full transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
                >
                  Schedule a Call
                  <svg
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </Link>
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-2 bg-white text-dark font-medium text-sm uppercase tracking-wider px-6 py-3 rounded-full border-2 border-gray-200 transition-all hover:border-dark"
                >
                  Send a Message
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <ContactContainer />
      
    </>
  )
}
