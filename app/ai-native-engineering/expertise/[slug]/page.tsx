import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ContactContainer from '@/components/engineering/ContactContainer'

// ─── Types ────────────────────────────────────────────────────
interface ExpertisePageData {
  slug: string
  title: string
  headline: string
  subheadline: string
  description: string
  metaDescription: string
  // Problems / pain-points
  problems: {
    sectionTitle: string
    items: { title: string; description: string }[]
  }
  // What we deliver
  services: {
    sectionTitle: string
    sectionSubtitle: string
    items: { title: string; description: string; icon: string }[]
  }
  // Tech stack
  stack: {
    sectionTitle: string
    categories: { label: string; tools: string[] }[]
  }
  // Process steps
  process: {
    sectionTitle: string
    steps: { step: string; title: string; description: string }[]
  }
  // Why Vahue differentiators
  differentiators: { title: string; description: string }[]
  // FAQ
  faq: { question: string; answer: string }[]
  // CTA
  ctaTitle: string
  ctaSubtitle: string
}

// ─── Data ─────────────────────────────────────────────────────
const expertisePages: Record<string, ExpertisePageData> = {
  'ai-ml': {
    slug: 'ai-ml',
    title: 'AI/ML Engineering Services',
    headline: 'AI/ML Engineering That Ships to Production',
    subheadline: 'Not just prototypes. We build AI features your users actually adopt — copilots, automation workflows, RAG systems, and internal AI tools.',
    description: 'From fine-tuning LLMs to deploying production-grade ML pipelines, our AI engineers integrate intelligent capabilities into your product — not as experiments, but as real features that drive adoption and ROI.',
    metaDescription: 'Vahue AI/ML engineering services: LLM integration, RAG systems, AI copilots, ML pipelines, and production AI features. Senior AI engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'Why AI projects stall',
      items: [
        {
          title: 'Your POC worked. Production didn\'t.',
          description: 'You built a demo in a week. Six months later, it still isn\'t in production. The gap between a notebook prototype and a reliable, scalable AI feature is where most teams get stuck — hallucinations, latency, cost overruns, and no clear path to deployment.',
        },
        {
          title: 'Your team doesn\'t have ML infrastructure experience',
          description: 'Your developers are smart, but they\'ve never built a vector database at scale, fine-tuned a model for your domain, or set up guardrails for production LLM responses. Hiring full-time is slow and expensive for a capability you might need intermittently.',
        },
        {
          title: 'AI vendors sell black boxes, not solutions',
          description: 'You\'re getting pitched "AI transformation" by agencies that wrap ChatGPT in a UI and call it custom AI. You need engineers who understand embeddings, retrieval strategies, prompt engineering tradeoffs, and when NOT to use AI.',
        },
        {
          title: 'You\'re falling behind competitors who already ship AI',
          description: 'Your competitors have AI-powered features in production while your team is still evaluating tools. Every quarter without AI capabilities is market share you\'re not getting back.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build',
      sectionSubtitle: 'We don\'t sell "AI strategy decks." We write code, deploy models, and measure outcomes.',
      items: [
        {
          title: 'LLM Integration & Fine-Tuning',
          description: 'Custom LLM applications using OpenAI, Claude, Llama, or Mistral. Domain-specific fine-tuning, prompt engineering, and response quality optimization for your use case.',
          icon: '🧠',
        },
        {
          title: 'RAG Systems & Knowledge Bases',
          description: 'Retrieval-augmented generation pipelines that ground AI responses in your actual data. Vector databases, embedding strategies, and intelligent chunking for accurate, hallucination-free answers.',
          icon: '📚',
        },
        {
          title: 'AI Copilots & Automation',
          description: 'Internal tools and customer-facing copilots that actually reduce workload. From AI-assisted code review to automated document processing and intelligent workflow automation using n8n, LangChain, or custom orchestration.',
          icon: '⚡',
        },
        {
          title: 'ML Pipelines & Infrastructure',
          description: 'Production-grade ML infrastructure: model training pipelines, feature stores, experiment tracking, A/B testing frameworks, and automated retraining. Built to scale, not to demo.',
          icon: '🔧',
        },
        {
          title: 'Computer Vision & NLP',
          description: 'Image recognition, document parsing, OCR, sentiment analysis, and text classification systems deployed as reliable microservices with monitoring and fallback strategies.',
          icon: '👁️',
        },
        {
          title: 'AI Strategy & Architecture',
          description: 'Technical assessment of where AI adds real value in your product. Architecture design for AI features including cost modeling, latency requirements, and build-vs-buy analysis.',
          icon: '🎯',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our AI/ML stack',
      categories: [
        { label: 'LLMs & APIs', tools: ['OpenAI', 'Claude', 'OpenClaw', 'Llama 4', 'Mistral', 'Gemini', 'Whisper'] },
        { label: 'Frameworks', tools: ['LangChain', 'LlamaIndex', 'Haystack', 'Semantic Kernel', 'Hugging Face'] },
        { label: 'Vector DBs', tools: ['Pinecone', 'Weaviate', 'Qdrant', 'ChromaDB', 'pgvector'] },
        { label: 'ML Ops', tools: ['MLflow', 'Weights & Biases', 'DVC', 'Kubeflow', 'Ray'] },
        { label: 'Orchestration', tools: ['n8n', 'Airflow', 'Prefect', 'Temporal'] },
        { label: 'Languages', tools: ['Python', 'TypeScript', 'Rust'] },
      ],
    },
    process: {
      sectionTitle: 'How we deliver AI features',
      steps: [
        {
          step: '01',
          title: 'Technical Discovery',
          description: 'We audit your data, infrastructure, and product requirements. We identify where AI adds measurable value vs. where it\'s hype. You get a concrete plan, not a strategy deck.',
        },
        {
          step: '02',
          title: 'Rapid Prototype',
          description: 'Working proof of concept in 2–4 weeks using your actual data. We validate feasibility, measure accuracy, and estimate production costs before committing to a full build.',
        },
        {
          step: '03',
          title: 'Production Build',
          description: 'We build the real thing: proper error handling, guardrails, monitoring, fallback strategies, cost optimization, and user feedback loops. Not a demo — a product feature.',
        },
        {
          step: '04',
          title: 'Iterate & Scale',
          description: 'Continuous improvement based on real user data. Model retraining, prompt optimization, latency reduction, and feature expansion as adoption grows.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Production mindset, not research mindset',
        description: 'We\'ve shipped AI features used by millions. We optimize for reliability, cost, and user adoption — not just accuracy metrics on a test set.',
      },
      {
        title: 'We know when NOT to use AI',
        description: 'Not everything needs a neural network. We\'ll tell you when a rule engine or simple heuristic outperforms an LLM. That honesty saves you months and hundreds of thousands.',
      },
      {
        title: 'Full-stack AI engineers, not just data scientists',
        description: 'Our engineers build the API, the infrastructure, the frontend integration, AND the model pipeline. No handoff gaps between "the AI team" and "the product team."',
      },
    ],
    faq: [
      {
        question: 'How quickly can AI engineers join our team?',
        answer: 'Our in-house senior AI engineers can start within 1–2 weeks. For specialized roles, we source from our network of 175k+ engineers in under 2 weeks.',
      },
      {
        question: 'Do you work with our existing models or only build new ones?',
        answer: 'Both. We integrate with commercial APIs (OpenAI, Claude, etc.), fine-tune open-source models, or help optimize your existing ML infrastructure — whatever makes sense for your use case and budget.',
      },
      {
        question: 'What\'s the typical cost of an AI/ML engagement?',
        answer: 'It depends on scope. A focused RAG implementation might take 4–6 weeks with 1–2 engineers. A full ML infrastructure overhaul could be a 6-month engagement. We scope precisely during discovery so you know exactly what you\'re investing in.',
      },
      {
        question: 'How do you handle data security for AI projects?',
        answer: 'We work within your infrastructure whenever possible. When we use cloud APIs, we ensure data doesn\'t leave approved regions, implement PII redaction pipelines, and follow your compliance requirements (SOC 2, GDPR, HIPAA).',
      },
    ],
    ctaTitle: 'Ready to ship AI features that users actually adopt?',
    ctaSubtitle: 'Talk to our AI engineering team. No fluff, just technical depth.',
  },

  'high-load-systems': {
    slug: 'high-load-systems',
    title: 'High-Load Systems Engineering',
    headline: 'Systems Built for Millions of Operations',
    subheadline: 'Event-driven architectures, streaming pipelines, and backends where latency and throughput actually matter. Not overengineering — right engineering.',
    description: 'We design and build distributed systems that handle real-world scale. From sub-millisecond response times to processing millions of events per second, our engineers specialize in the architectures that don\'t break under pressure.',
    metaDescription: 'Vahue high-load systems engineering: event-driven architecture, streaming pipelines, distributed systems, and performance optimization. Senior systems engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'When your systems can\'t keep up',
      items: [
        {
          title: 'Your monolith is a bottleneck',
          description: 'Every deploy is a risk. One slow query takes down the entire application. Your team spends more time firefighting than building features. Scaling means throwing money at bigger servers, but the ceiling is approaching fast.',
        },
        {
          title: 'You\'re losing users to latency',
          description: 'Your API response times are climbing. Database queries that were fast at 10k users are crawling at 500k. Every 100ms of added latency costs you conversions, and your team doesn\'t know where to start optimizing.',
        },
        {
          title: 'Real-time features feel impossible',
          description: 'Your product needs live updates, streaming data, or event processing, but your architecture was designed for request-response. Bolting on WebSockets to a REST monolith is creating more problems than it solves.',
        },
        {
          title: 'You can\'t find engineers who\'ve built at scale',
          description: 'Your job postings sit open for months. The engineers who\'ve actually operated systems at 10M+ requests per minute aren\'t on the market — or they\'re priced out of your budget. You need that expertise without the permanent headcount.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build',
      sectionSubtitle: 'We don\'t just write fast code. We design systems that stay fast as they grow.',
      items: [
        {
          title: 'Event-Driven Architecture',
          description: 'Kafka, RabbitMQ, and custom event buses designed for your domain. Event sourcing, CQRS patterns, and saga orchestration that keep services decoupled and data consistent at scale.',
          icon: '⚡',
        },
        {
          title: 'Streaming Data Pipelines',
          description: 'Real-time data processing using Kafka Streams, Flink, or custom Go services. From ingesting millions of events per second to transforming and routing them with sub-second latency.',
          icon: '🌊',
        },
        {
          title: 'Microservices & Distributed Systems',
          description: 'Service decomposition that makes sense for your scale and team. gRPC communication, service mesh, circuit breakers, and distributed tracing that keeps your system observable and resilient.',
          icon: '🔗',
        },
        {
          title: 'Performance Optimization',
          description: 'Deep profiling and optimization of existing systems. Database query tuning, caching strategies (Redis, Memcached), connection pooling, and algorithmic improvements that deliver 10x–100x speedups.',
          icon: '🚀',
        },
        {
          title: 'Real-Time Communication',
          description: 'WebSocket infrastructure, Server-Sent Events, and real-time sync systems. Presence indicators, live collaboration features, and notification systems that scale to millions of concurrent connections.',
          icon: '📡',
        },
        {
          title: 'Load Testing & Chaos Engineering',
          description: 'We don\'t hope systems work at scale — we prove it. Custom load testing suites, failure injection, and resilience validation before your traffic spikes, not after.',
          icon: '🧪',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our high-load stack',
      categories: [
        { label: 'Languages', tools: ['Go', 'Rust', 'Java', 'TypeScript', 'C++'] },
        { label: 'Messaging', tools: ['Apache Kafka', 'RabbitMQ', 'NATS', 'Redis Streams', 'AWS SQS/SNS'] },
        { label: 'Databases', tools: ['PostgreSQL', 'ScyllaDB', 'ClickHouse', 'TimescaleDB', 'DynamoDB'] },
        { label: 'Caching', tools: ['Redis', 'Memcached', 'Hazelcast', 'Varnish'] },
        { label: 'Communication', tools: ['gRPC', 'WebSockets', 'GraphQL Subscriptions', 'SSE'] },
        { label: 'Observability', tools: ['Prometheus', 'Grafana', 'Jaeger', 'OpenTelemetry', 'Datadog'] },
      ],
    },
    process: {
      sectionTitle: 'How we approach high-load engineering',
      steps: [
        {
          step: '01',
          title: 'Architecture Assessment',
          description: 'We profile your current system under realistic load. We identify bottlenecks, single points of failure, and architectural constraints. You get a prioritized roadmap, not a rewrite proposal.',
        },
        {
          step: '02',
          title: 'Design & Prove',
          description: 'Architecture design with load models and capacity planning. We prototype critical paths and validate with load testing before committing to implementation.',
        },
        {
          step: '03',
          title: 'Incremental Migration',
          description: 'We don\'t do big-bang rewrites. We decompose strategically, migrate incrementally, and validate each phase under production-like conditions. Zero-downtime transitions.',
        },
        {
          step: '04',
          title: 'Operate & Optimize',
          description: 'Monitoring dashboards, alerting, runbooks, and on-call support. We help your team own the system with proper observability and operational tooling.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Engineers who\'ve operated at scale',
        description: 'Our team has built and operated systems handling 10M+ requests per minute, 1M+ concurrent WebSocket connections, and petabyte-scale data pipelines. We know what breaks and how to prevent it.',
      },
      {
        title: 'Right-sized architecture',
        description: 'We don\'t push microservices on a 3-person team or a monolith on a 50-person org. Architecture serves your team size, growth trajectory, and business constraints.',
      },
      {
        title: 'Incremental, not revolutionary',
        description: 'We migrate systems without stopping feature development. Your business keeps moving while the architecture evolves underneath.',
      },
    ],
    faq: [
      {
        question: 'Do we need to rewrite everything from scratch?',
        answer: 'Almost never. We specialize in incremental migrations — strangling the monolith piece by piece while your product keeps shipping. Full rewrites are risky and usually unnecessary.',
      },
      {
        question: 'What scale have your engineers worked at?',
        answer: 'Our engineers have built systems for fintech platforms processing 500k+ transactions/day, real-time gaming backends with 1M+ concurrent users, and IoT platforms ingesting billions of events daily.',
      },
      {
        question: 'How do you handle the transition to a distributed system?',
        answer: 'We use the strangler fig pattern: new services are built alongside the existing system, traffic is gradually shifted, and old components are retired only when the new ones are proven in production.',
      },
      {
        question: 'What if we don\'t know our actual performance requirements?',
        answer: 'That\'s common and fine. We start with load testing your current system to establish baselines, then model expected growth to determine realistic targets. No guessing — data-driven capacity planning.',
      },
    ],
    ctaTitle: 'Your system needs to handle what\'s coming next.',
    ctaSubtitle: 'Talk to engineers who\'ve built for millions of users.',
  },

  'cloud': {
    slug: 'cloud',
    title: 'Cloud & Platform Engineering',
    headline: 'Cloud Infrastructure That Doesn\'t Slow You Down',
    subheadline: 'Internal developer platforms, Kubernetes at scale, and reliability engineering. We help teams ship faster with infrastructure they can actually operate.',
    description: 'We build cloud infrastructure and developer platforms that accelerate your engineering teams. From Kubernetes orchestration to IaC pipelines, our platform engineers remove the friction between writing code and running it in production.',
    metaDescription: 'Vahue cloud & platform engineering: Kubernetes, Terraform, AWS/GCP/Azure, CI/CD, DevOps, and internal developer platforms. Senior cloud engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'When infrastructure becomes a blocker',
      items: [
        {
          title: 'Deploys take hours (or days)',
          description: 'Your CI/CD pipeline is held together with duct tape. Developers wait 45 minutes for builds, deployments require manual steps, and rollbacks are a prayer. Your infrastructure is your bottleneck, not your code.',
        },
        {
          title: 'Your cloud bill is growing faster than your revenue',
          description: 'You\'re running oversized instances, paying for idle resources, and nobody knows which team owns which service. Every month the bill surprises you, and "cloud cost optimization" stays on the backlog forever.',
        },
        {
          title: 'Every team reinvents infrastructure',
          description: 'Each team has their own deployment scripts, their own monitoring setup, their own way of managing secrets. There\'s no platform — just tribal knowledge and fragile shell scripts that nobody wants to touch.',
        },
        {
          title: 'You can\'t hire DevOps/platform engineers',
          description: 'Senior platform engineers are the hardest role to fill. The ones who understand Kubernetes at scale, can design internal developer platforms, and write proper Terraform — they\'re not responding to your LinkedIn messages.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build',
      sectionSubtitle: 'Infrastructure-as-code, not infrastructure-as-a-ticket-to-the-ops-team.',
      items: [
        {
          title: 'Kubernetes & Container Orchestration',
          description: 'Production-grade Kubernetes clusters: multi-tenant namespacing, auto-scaling, resource quotas, network policies, and upgrade strategies. EKS, GKE, or self-managed — designed for your team\'s maturity level.',
          icon: '☸️',
        },
        {
          title: 'Internal Developer Platforms',
          description: 'Self-service platforms that let developers deploy, monitor, and manage their services without filing tickets. Service catalogs, environment provisioning, and golden paths that enforce best practices without slowing teams down.',
          icon: '🏗️',
        },
        {
          title: 'Infrastructure as Code',
          description: 'Terraform modules, Pulumi stacks, and GitOps workflows (ArgoCD, Flux) that make infrastructure changes reviewable, auditable, and reversible. No more ClickOps in the AWS console.',
          icon: '📝',
        },
        {
          title: 'CI/CD Pipeline Engineering',
          description: 'From 45-minute builds to 5-minute deployments. Pipeline optimization, parallel testing, artifact caching, canary deployments, and progressive rollouts that make shipping safe and fast.',
          icon: '🔄',
        },
        {
          title: 'Cloud Architecture & Migration',
          description: 'Multi-cloud strategies, lift-and-shift to cloud-native migrations, and architecture redesign for cloud economics. We migrate without downtime and optimize from day one.',
          icon: '☁️',
        },
        {
          title: 'Site Reliability Engineering',
          description: 'SLO/SLI frameworks, error budgets, incident response automation, and operational runbooks. We build the observability and reliability practices that keep your systems healthy as they scale.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our cloud & platform stack',
      categories: [
        { label: 'Orchestration', tools: ['Kubernetes', 'Docker', 'Helm', 'Kustomize', 'Nomad'] },
        { label: 'IaC', tools: ['Terraform', 'Pulumi', 'AWS CDK', 'Crossplane', 'Ansible'] },
        { label: 'GitOps', tools: ['ArgoCD', 'Flux', 'GitHub Actions', 'GitLab CI', 'Jenkins'] },
        { label: 'Cloud Providers', tools: ['AWS', 'Google Cloud', 'Azure', 'DigitalOcean'] },
        { label: 'Observability', tools: ['Prometheus', 'Grafana', 'Datadog', 'PagerDuty', 'OpenTelemetry'] },
        { label: 'Security', tools: ['Vault', 'Cert-Manager', 'OPA/Gatekeeper', 'Trivy', 'Falco'] },
      ],
    },
    process: {
      sectionTitle: 'How we modernize your infrastructure',
      steps: [
        {
          step: '01',
          title: 'Infrastructure Audit',
          description: 'We review your current setup: CI/CD pipelines, cloud architecture, cost structure, and developer experience. You get an honest assessment of what\'s working, what\'s wasteful, and what\'s risky.',
        },
        {
          step: '02',
          title: 'Platform Design',
          description: 'Architecture for your internal developer platform tailored to your team size and maturity. We define golden paths, self-service capabilities, and migration strategies.',
        },
        {
          step: '03',
          title: 'Incremental Build',
          description: 'We build and migrate in phases. Each phase delivers immediate value — faster deploys, lower costs, better developer experience — while preparing the foundation for the next.',
        },
        {
          step: '04',
          title: 'Team Enablement',
          description: 'We don\'t build infrastructure your team can\'t operate. We document, train, and pair with your engineers until they own the platform confidently.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Platform engineers, not just DevOps',
        description: 'We don\'t just set up CI/CD and leave. We build internal platforms that make every developer on your team more productive. That\'s the difference between ops automation and platform engineering.',
      },
      {
        title: 'Cost-conscious by default',
        description: 'We build for cost efficiency from the start. Right-sizing, spot instances, reserved capacity planning, and FinOps practices that typically reduce cloud spend by 30–50%.',
      },
      {
        title: 'We build for handoff',
        description: 'Every piece of infrastructure we build is documented, tested, and designed for your team to own. We succeed when you don\'t need us anymore.',
      },
    ],
    faq: [
      {
        question: 'Should we use Kubernetes?',
        answer: 'Not always. For small teams (under 5 engineers), managed services like ECS, Cloud Run, or even a well-configured PaaS might be better. We\'ll recommend what fits your team size, workload, and operational capacity.',
      },
      {
        question: 'Can you work with our existing infrastructure?',
        answer: 'Absolutely. Most engagements start with improving what you have, not replacing it. We integrate with your existing CI/CD, cloud accounts, and tooling — then evolve incrementally.',
      },
      {
        question: 'How much can you reduce our cloud costs?',
        answer: 'Typical savings range from 30–50% through right-sizing, reserved instances, spot utilization, and eliminating idle resources. We\'ve seen cases where costs dropped 60%+ without any performance impact.',
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes. We offer dedicated platform engineers for ongoing infrastructure management, or we can train your team and transition to an advisory role. Flexible engagement models based on what you need.',
      },
    ],
    ctaTitle: 'Your infrastructure should accelerate your team, not slow it down.',
    ctaSubtitle: 'Talk to platform engineers who\'ve built for scale.',
  },

  'data-engineering': {
    slug: 'data-engineering',
    title: 'Data Engineering Services',
    headline: 'Data Pipelines That Run. Reliably. At Scale.',
    subheadline: 'Your data team is drowning in maintenance. We build pipelines, analytics backends, and ML infrastructure that run reliably — so your team can focus on insights, not firefighting.',
    description: 'We design and build the data infrastructure that powers your analytics, machine learning, and business intelligence. From raw data ingestion to production-grade feature stores, our data engineers build systems that deliver trustworthy data to every team that needs it.',
    metaDescription: 'Vahue data engineering services: data pipelines, ETL/ELT, analytics infrastructure, data warehousing, and ML data infrastructure. Senior data engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'When your data infrastructure breaks trust',
      items: [
        {
          title: 'Your pipelines break every Monday morning',
          description: 'Airflow DAGs fail silently. Data arrives late, incomplete, or duplicated. Your data team starts every week debugging pipelines instead of delivering insights. The "quick fix" list has been growing for months.',
        },
        {
          title: 'Nobody trusts the numbers',
          description: 'Marketing\'s dashboard shows different numbers than Finance\'s spreadsheet. Your CEO asks a simple question and gets three different answers. Data quality issues have eroded confidence in every report.',
        },
        {
          title: 'Your data warehouse is a swamp',
          description: 'Thousands of tables, no documentation, no ownership. Queries that should take seconds take minutes. Your analysts spend 80% of their time finding and cleaning data, and 20% actually analyzing it.',
        },
        {
          title: 'You can\'t support ML with your current infrastructure',
          description: 'Your data scientists want to train models, but there\'s no feature store, no experiment tracking, and no way to get production data into training pipelines without custom scripts that break monthly.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build',
      sectionSubtitle: 'Data infrastructure that\'s reliable, documented, and actually maintained.',
      items: [
        {
          title: 'Data Pipeline Architecture',
          description: 'ETL/ELT pipelines using Airflow, Prefect, or dbt that run reliably at scale. Incremental processing, idempotent operations, and proper error handling — not fragile cron jobs held together with hope.',
          icon: '🔄',
        },
        {
          title: 'Data Warehouse & Lakehouse',
          description: 'Modern analytical infrastructure on Snowflake, BigQuery, Databricks, or Redshift. Dimensional modeling, slowly changing dimensions, and query optimization that keeps your analysts productive.',
          icon: '🏛️',
        },
        {
          title: 'Real-Time Data Streaming',
          description: 'Kafka-based streaming architectures for real-time analytics, CDC pipelines, and event-driven data products. Sub-second data freshness for use cases where batch processing isn\'t fast enough.',
          icon: '⚡',
        },
        {
          title: 'Data Quality & Observability',
          description: 'Automated data quality checks, anomaly detection, lineage tracking, and alerting. Great Expectations, Monte Carlo, or custom validation frameworks that catch problems before your stakeholders do.',
          icon: '✅',
        },
        {
          title: 'ML Data Infrastructure',
          description: 'Feature stores, training data pipelines, experiment tracking, and model registries. The infrastructure your data scientists need to go from notebooks to production without reinventing the wheel.',
          icon: '🤖',
        },
        {
          title: 'Analytics Engineering',
          description: 'dbt models, semantic layers, and self-service analytics infrastructure. We transform raw data into clean, tested, documented datasets that business users can query confidently.',
          icon: '📊',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our data engineering stack',
      categories: [
        { label: 'Orchestration', tools: ['Airflow', 'Prefect', 'Dagster', 'dbt Cloud'] },
        { label: 'Processing', tools: ['Apache Spark', 'dbt', 'Apache Flink', 'Pandas', 'Polars'] },
        { label: 'Storage', tools: ['Snowflake', 'BigQuery', 'Databricks', 'Delta Lake', 'S3/GCS'] },
        { label: 'Streaming', tools: ['Apache Kafka', 'Kafka Connect', 'Debezium', 'AWS Kinesis'] },
        { label: 'Quality', tools: ['Great Expectations', 'dbt tests', 'Monte Carlo', 'Soda'] },
        { label: 'ML Infra', tools: ['MLflow', 'Feast', 'Weights & Biases', 'Ray', 'Kubeflow'] },
      ],
    },
    process: {
      sectionTitle: 'How we fix your data infrastructure',
      steps: [
        {
          step: '01',
          title: 'Data Audit',
          description: 'We map your data sources, pipelines, and consumers. We identify reliability issues, quality gaps, and architectural debt. You get a prioritized action plan with quick wins and long-term improvements.',
        },
        {
          step: '02',
          title: 'Foundation First',
          description: 'We fix the fundamentals: reliable ingestion, proper orchestration, basic quality checks, and documentation. This phase alone often eliminates 80% of your pipeline failures.',
        },
        {
          step: '03',
          title: 'Scale & Optimize',
          description: 'Once the foundation is solid, we build for growth: real-time pipelines, advanced transformations, feature stores, and self-service analytics layers.',
        },
        {
          step: '04',
          title: 'Enable Your Team',
          description: 'We document everything, train your team, and establish data engineering best practices. The goal is for your team to maintain and extend the infrastructure independently.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Engineers who own reliability',
        description: 'We don\'t build pipelines and walk away. We build monitoring, alerting, and runbooks so failures are caught and resolved automatically — or at least quickly.',
      },
      {
        title: 'Business-aware data modeling',
        description: 'We don\'t just move data. We understand your business context, model data for your actual analytical needs, and build semantic layers that business users can navigate without SQL knowledge.',
      },
      {
        title: 'Modern stack, pragmatic choices',
        description: 'We use best-in-class tools but don\'t over-engineer. If a simple dbt project solves your problem, we won\'t build a Spark cluster. Right tool, right scale.',
      },
    ],
    faq: [
      {
        question: 'Should we use Snowflake, BigQuery, or Databricks?',
        answer: 'It depends on your workload, team skills, and existing cloud provider. We help you evaluate options based on your actual requirements — not vendor marketing. We\'re cloud and tool agnostic.',
      },
      {
        question: 'How long does it take to fix our pipeline reliability?',
        answer: 'Quick wins (monitoring, alerting, critical bug fixes) typically take 2–4 weeks. A proper foundation (reliable orchestration, quality checks, documentation) is usually a 2–3 month effort.',
      },
      {
        question: 'Can you work alongside our existing data team?',
        answer: 'That\'s our preferred model. We embed with your team, work in your repositories, and follow your processes. Knowledge transfer happens naturally through daily collaboration, not a formal handoff.',
      },
      {
        question: 'Do you handle data governance and compliance?',
        answer: 'Yes. We implement access controls, data classification, PII handling, retention policies, and audit trails. We\'ve worked with GDPR, HIPAA, SOC 2, and PCI DSS requirements.',
      },
    ],
    ctaTitle: 'Your data should drive decisions, not debugging sessions.',
    ctaSubtitle: 'Talk to data engineers who build infrastructure that lasts.',
  },

  'team-extension': {
    slug: 'team-extension',
    title: 'Team Extension & Staff Augmentation',
    headline: 'Senior Engineers Who Ship From Day One',
    subheadline: 'Staff engineers, tech leads, and domain experts who integrate directly into your workflow. You manage priorities and keep product direction — we bring the expertise. No black-box outsourcing.',
    description: 'Vahue team extension gives you access to pre-vetted senior and staff-level engineers who embed into your existing team. They attend your standups, work in your repos, and deliver production code — the only difference is they sit in a different timezone.',
    metaDescription: 'Vahue team extension: senior engineers, staff engineers, and tech leads integrated into your team. React, TypeScript, Python, Node.js, Go, and more. Available in under 2 weeks.',
    problems: {
      sectionTitle: 'Why traditional hiring and outsourcing fail',
      items: [
        {
          title: 'Hiring takes 4 months. You need help now.',
          description: 'Your roadmap is slipping because you\'ve been "looking for a senior backend engineer" since Q1. By the time you find, interview, offer, and onboard someone, you\'ve lost two quarters of momentum.',
        },
        {
          title: 'Outsourcing agencies send juniors with senior titles',
          description: 'You\'ve been burned before. The "senior React developer" couldn\'t explain useEffect. The "architect" had never deployed to production. Outsourcing firms prioritize margin over match quality.',
        },
        {
          title: 'Fake developers are everywhere',
          description: 'Fake CVs, AI-assisted interviews, multiple jobs, ghost workers. You can\'t afford another "senior" who disappears when it\'s time to deliver. The industry\'s trust problem is your risk.',
        },
        {
          title: 'Scaling up and down is a nightmare',
          description: 'You need 3 extra engineers for a 6-month push, then 1 for maintenance. Full-time hires mean severance packages, morale issues, and legal complexity. You need flexible capacity, not permanent headcount.',
        },
      ],
    },
    services: {
      sectionTitle: 'How team extension works at Vahue',
      sectionSubtitle: 'Not a body shop. A curated team of engineers who care about your product.',
      items: [
        {
          title: 'Embedded Senior Engineers',
          description: 'Full-time developers who join your standups, work in your repos, and ship code to your production. React, TypeScript, Python, Node.js, Go, Elixir — matched to your stack and domain.',
          icon: '👨‍💻',
        },
        {
          title: 'Staff & Principal Engineers',
          description: 'Architectural guidance, technical leadership, and hands-on mentoring. When you need someone who can design systems, unblock teams, and raise the bar for your entire engineering org.',
          icon: '🎖️',
        },
        {
          title: 'Tech Leads & Engineering Managers',
          description: 'Interim or long-term technical leadership for teams that need direction. Sprint planning, architecture decisions, code review culture, and career development for your engineers.',
          icon: '🧭',
        },
        {
          title: 'QA & Testing Engineers',
          description: 'Manual and automation QA engineers who embed with your development team. Test strategy, framework setup, CI integration, and quality advocacy built into your development process.',
          icon: '🧪',
        },
        {
          title: 'Mobile Engineers (iOS & Android)',
          description: 'Native and cross-platform mobile developers for Swift, Kotlin, React Native, and Flutter. Ship mobile features with the same quality bar as your web product.',
          icon: '📱',
        },
        {
          title: 'Flexible Team Scaling',
          description: 'Ramp up for product launches, scale down after delivery. No long-term commitments required. Month-to-month flexibility with 2-week ramp-up for new engineers.',
          icon: '📈',
        },
      ],
    },
    stack: {
      sectionTitle: 'Technologies our engineers work with',
      categories: [
        { label: 'Frontend', tools: ['React', 'Next.js', 'TypeScript', 'Vue.js', 'Angular', 'Tailwind CSS'] },
        { label: 'Backend', tools: ['Node.js', 'Python', 'Go', 'Elixir', 'Java', 'NestJS', 'Django', 'FastAPI'] },
        { label: 'Mobile', tools: ['React Native', 'Swift', 'Kotlin', 'Flutter'] },
        { label: 'Databases', tools: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'DynamoDB'] },
        { label: 'Cloud & DevOps', tools: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD'] },
        { label: 'AI/ML', tools: ['OpenAI', 'LangChain', 'Python ML', 'Hugging Face', 'RAG'] },
      ],
    },
    process: {
      sectionTitle: 'From first call to first commit',
      steps: [
        {
          step: '01',
          title: 'Discovery Call',
          description: 'We understand your product, tech stack, team culture, and what "great" looks like for this role. This isn\'t a generic intake form — it\'s a technical conversation.',
        },
        {
          step: '02',
          title: 'Candidate Matching',
          description: 'Within 3–5 business days, we present 2–3 pre-vetted candidates from our in-house team or 175k+ engineer network. You interview them. You choose. No middlemen, no surprises.',
        },
        {
          step: '03',
          title: 'Embedded Onboarding',
          description: 'Your new team member joins your Slack, attends your standup, gets access to your repos. We handle contracts, payments, and HR — you manage the work directly.',
        },
        {
          step: '04',
          title: 'Ongoing Quality',
          description: 'Regular check-ins to ensure alignment, performance, and satisfaction — from both sides. If something isn\'t working, we resolve it fast or provide a replacement within a week.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Top 1% talent, verified',
        description: 'Every engineer goes through live coding, system design, and behavioral interviews conducted by our staff engineers. We reject 96% of candidates. No fake CVs. No AI-assisted interviews. Real engineers, verified personally.',
      },
      {
        title: 'Direct management, not a black box',
        description: 'You manage your developers directly — daily standups, sprint planning, code reviews. We handle payroll, benefits, and retention. It\'s your team, we just make it possible.',
      },
      {
        title: '2-week guarantee',
        description: 'If an engineer isn\'t the right fit within the first 2 weeks, we replace them at no additional cost. No questions asked. We\'re in the long-term relationship business, not the invoice business.',
      },
    ],
    faq: [
      {
        question: 'How quickly can engineers start?',
        answer: 'In-house senior engineers can start within 1–2 weeks. For specialized roles, we source from our network and present candidates within 3–5 business days, with starts typically 1–2 weeks after selection.',
      },
      {
        question: 'What timezone do your engineers work in?',
        answer: 'Our engineers are based in Eastern Europe (UTC+2/3), providing strong overlap with European business hours and 4–6 hours overlap with US East Coast. We can arrange shifted schedules for US West Coast teams.',
      },
      {
        question: 'What\'s the minimum engagement?',
        answer: 'We recommend a minimum of 3 months for meaningful impact, but we don\'t lock you into long-term contracts. Month-to-month flexibility after the initial period, with 30 days notice for offboarding.',
      },
      {
        question: 'How do you handle IP and confidentiality?',
        answer: 'All engineers sign NDAs and IP assignment agreements. Your code stays yours — we never reuse client code or share it between projects. We\'re ISO 27001 certified and fully GDPR compliant.',
      },
      {
        question: 'What if I need to scale the team quickly?',
        answer: 'We can add 1–2 engineers within 1–2 weeks and scale to 5+ within a month. For larger teams, we plan ramp-up schedules to ensure quality onboarding at every stage.',
      },
    ],
    ctaTitle: 'Stop waiting months for the right engineer.',
    ctaSubtitle: 'Talk to us. Your first candidate is 3 days away.',
  },

  'security-compliance': {
    slug: 'security-compliance',
    title: 'Security & Compliance Engineering',
    headline: 'Security Built In, Not Bolted On',
    subheadline: 'Payments infrastructure, identity platforms, and audit-ready architectures. We build systems where security and regulatory compliance are woven into the architecture — not added as an afterthought.',
    description: 'Our security engineers build systems that pass audits, protect user data, and meet regulatory requirements without crippling your development velocity. From SOC 2 readiness to PCI DSS compliance, we make security an enabler, not a blocker.',
    metaDescription: 'Vahue security & compliance engineering: SOC 2, PCI DSS, GDPR, HIPAA compliance. Identity platforms, payments infrastructure, and audit-ready architectures. Senior security engineers available in under 2 weeks.',
    problems: {
      sectionTitle: 'When security becomes an emergency',
      items: [
        {
          title: 'Your audit is in 3 months and you\'re not ready',
          description: 'SOC 2, PCI DSS, HIPAA — the compliance deadline is approaching and you\'re still missing half the controls. Your development team doesn\'t have security expertise, and consultants hand you checklists instead of implementations.',
        },
        {
          title: 'Your auth system is a ticking time bomb',
          description: 'Custom auth code written 4 years ago by someone who left. No MFA, no rate limiting, session tokens that never expire. Every security review flags it, but your team is too busy with features to fix it properly.',
        },
        {
          title: 'You\'re handling payments without proper infrastructure',
          description: 'Stripe handles the hard parts, but your system still touches PAN data, stores it in logs, or passes it through unsecured internal services. You\'re one incident away from losing your payment processing ability.',
        },
        {
          title: 'Security slows everything down',
          description: 'Security reviews take weeks. Every deployment requires manual approval from a security team that\'s understaffed and overwhelmed. Developers see security as a blocker, not an enabler. The result: people find workarounds.',
        },
      ],
    },
    services: {
      sectionTitle: 'What we build',
      sectionSubtitle: 'Engineering solutions for security problems, not PDF reports.',
      items: [
        {
          title: 'Identity & Access Management',
          description: 'OAuth 2.0/OIDC implementations, SSO integration, RBAC/ABAC authorization systems, and MFA rollouts. Built on proven frameworks (Auth0, Keycloak, or custom) with proper session management and token rotation.',
          icon: '🔐',
        },
        {
          title: 'Compliance Engineering (SOC 2, PCI, HIPAA)',
          description: 'We don\'t just prepare documentation — we implement the actual controls. Encryption at rest and in transit, access logging, audit trails, vulnerability management, and incident response automation.',
          icon: '📋',
        },
        {
          title: 'Payments Infrastructure',
          description: 'PCI DSS compliant payment flows, tokenization strategies, and secure payment processing architecture. We minimize your cardholder data environment and build proper isolation boundaries.',
          icon: '💳',
        },
        {
          title: 'Security Architecture & Code Review',
          description: 'Threat modeling, security architecture design, and deep code review focused on OWASP Top 10, injection vulnerabilities, and business logic flaws. We find the issues automated tools miss.',
          icon: '🔍',
        },
        {
          title: 'DevSecOps & Security Automation',
          description: 'SAST/DAST integration in CI/CD, dependency scanning, container security, secrets management (Vault), and automated compliance checks. Security that moves at the speed of your development.',
          icon: '⚙️',
        },
        {
          title: 'Encryption & Data Protection',
          description: 'End-to-end encryption, key management, PII tokenization, data classification, and DLP implementation. We protect your most sensitive data with defense-in-depth strategies.',
          icon: '🛡️',
        },
      ],
    },
    stack: {
      sectionTitle: 'Our security & compliance stack',
      categories: [
        { label: 'Identity', tools: ['OAuth 2.0/OIDC', 'Auth0', 'Keycloak', 'Okta', 'Azure AD'] },
        { label: 'Secrets & Encryption', tools: ['HashiCorp Vault', 'AWS KMS', 'Age/SOPS', 'Let\'s Encrypt'] },
        { label: 'Security Tooling', tools: ['Snyk', 'SonarQube', 'Trivy', 'OWASP ZAP', 'Burp Suite'] },
        { label: 'Compliance', tools: ['Vanta', 'Drata', 'AWS Config', 'Cloud Custodian'] },
        { label: 'Monitoring', tools: ['Falco', 'Wazuh', 'CloudTrail', 'GuardDuty', 'SIEM'] },
        { label: 'Frameworks', tools: ['SOC 2', 'PCI DSS', 'GDPR', 'HIPAA', 'ISO 27001'] },
      ],
    },
    process: {
      sectionTitle: 'How we build secure systems',
      steps: [
        {
          step: '01',
          title: 'Security Assessment',
          description: 'We audit your current architecture, codebase, and processes against your compliance targets. You get a gap analysis with prioritized remediation steps — critical issues first.',
        },
        {
          step: '02',
          title: 'Remediation & Implementation',
          description: 'We implement security controls: authentication hardening, encryption, access logging, vulnerability patching, and infrastructure hardening. Real engineering work, not just policy documents.',
        },
        {
          step: '03',
          title: 'Automation & Integration',
          description: 'We integrate security into your development pipeline: automated scanning, compliance checks, secret rotation, and security testing. Security becomes part of the workflow, not a gate.',
        },
        {
          step: '04',
          title: 'Audit Support & Maintenance',
          description: 'We prepare evidence, documentation, and technical explanations for auditors. Post-audit, we maintain the controls and ensure continuous compliance as your system evolves.',
        },
      ],
    },
    differentiators: [
      {
        title: 'Engineers who implement, not consultants who advise',
        description: 'We write code, configure infrastructure, and deploy security controls. You don\'t get a PDF of recommendations — you get a secure system.',
      },
      {
        title: 'Security that enables velocity',
        description: 'Our goal is to make security fast, not make development slow. Automated checks, self-service security tools, and DevSecOps practices that let your team ship confidently.',
      },
      {
        title: 'Compliance as a codebase, not a spreadsheet',
        description: 'We codify compliance controls as infrastructure-as-code, automated tests, and policy-as-code. When auditors come back next year, evidence generation is a CI/CD job, not a 3-month scramble.',
      },
    ],
    faq: [
      {
        question: 'How long does SOC 2 readiness take?',
        answer: 'For a typical startup, we can get you audit-ready in 8–12 weeks. This includes implementing controls, setting up monitoring, and preparing evidence. The actual audit timeline depends on your auditor.',
      },
      {
        question: 'Can you help us pass a specific audit?',
        answer: 'Yes. We\'ve helped companies pass SOC 2 Type II, PCI DSS Level 1, and HIPAA assessments. We work backwards from auditor requirements to ensure every control is properly implemented and evidenced.',
      },
      {
        question: 'Do we need a full-time security engineer?',
        answer: 'Not always. For most startups (under 50 engineers), a fractional security engineer or a focused engagement is more cost-effective. We can provide ongoing security support on a part-time basis.',
      },
      {
        question: 'What about penetration testing?',
        answer: 'We coordinate with specialized pen testing firms for formal assessments, but our engineers also perform continuous security reviews, threat modeling, and vulnerability assessments as part of the development process.',
      },
    ],
    ctaTitle: 'Security shouldn\'t be what keeps you up at night.',
    ctaSubtitle: 'Talk to engineers who make compliance painless.',
  },
}

// ─── Static Params ────────────────────────────────────────────
export function generateStaticParams() {
  return Object.keys(expertisePages).map((slug) => ({ slug }))
}

// ─── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const page = expertisePages[slug]
  if (!page) return {}
  return {
    title: page.title,
    description: page.metaDescription,
    openGraph: {
      title: `${page.title} | Vahue`,
      description: page.metaDescription,
      url: `https://vahue.ai/expertise/${page.slug}`,
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
export default async function ExpertisePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = expertisePages[slug]

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
                { label: 'Expertise', href: '/' },
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
                href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
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
                  href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
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
                  href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
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
                  href="https://calendly.com/vahue/meeting-with-mike-from-vahue"
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
