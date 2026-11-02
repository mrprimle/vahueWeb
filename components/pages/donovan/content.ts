// Copy for /donovan ("Support and Voice Agents" in the menu). Method: vahue-positioning-copy-source.md. Scale's copy stays, brand words swap, and a string changes by only a couple of words where it can't stay.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import type { DonovanContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: DonovanContent = {
  meta: {
    title: 'Support and Voice Agents for Operations Teams | Vahue',
    description: 'Vahue empowers operations teams to deploy specialized Agents for business-critical workflows.',
  },
  hero: {
    headline: 'Support and Voice Agents',
    body: 'Deploy specialized AI Agents for business-critical workflows.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/support-floor.jpg' },
  },
  logos: [
    { alt: 'Logo', width: 65, height: 45 }, // PLACEHOLDER
    { alt: 'Logo', width: 48, height: 63 }, // PLACEHOLDER
    { alt: 'Logo', width: 68, height: 53 }, // PLACEHOLDER
    { alt: 'Logo', width: 79, height: 22 }, // PLACEHOLDER
    { alt: 'Logo', width: 70, height: 16 }, // PLACEHOLDER
  ],
  overview: {
    overtitle: 'Product Overview',
    title: 'Customize, Evaluate, and Deploy Support and Voice Agents',
    subtitle: 'Deploy custom-tailored AI agents from concept to production in record time with Vahue. Put advanced agentic capabilities in the hands of your team when and where they need it most.',
    cards: [
      {
        title: 'Agent Factory',
        body: 'Use Vahue’s orchestration layer and connectors to build and customize AI agents with a no-code interface by accessing data sources, creating knowledge bases, leveraging state-of-the-art models, assigning agent instructions, and connecting agents to existing systems and tools.',
        mock: {
  "t": [
    "Support Agent",
    "/",
    "Agent Factory",
    "Draft",
    "Deploy",
    "Assistant",
    "Tools",
    "Settings",
    "System Prompt",
    "You are a customer intelligence analyst. Analyze documents accurately and always cite sources.",
    "Knowledge Base",
    "Order History Data",
    "Returns Policy Documents",
    "Support Operations DB",
    "Llama 3.3 70B Instruct",
    "Active Pipeline",
    "Helpdesk Connector",
    "Source",
    "Knowledge Base",
    "Retrieval",
    "Reranker",
    "Filter",
    "Llama 3.3 70B",
    "LLM",
    "Output Preview",
    "Based on helpdesk data from Q4 2024, the returns queue in the specified region shows rising volume with 3 key order issues identified..." // PLACEHOLDER
  ],
  "w": []
},
      },
      {
        title: 'Test & Evaluate',
        body: 'Compare model responses and performance metrics from leading models to determine which model is best suited for your use case and workflow, backed by rigorous testing frameworks that prioritize reliability, security, and alignment with your AI readiness goals.',
        mock: {
  "t": [
    "Models",
    "/",
    "Compare Models",
    "Model 1",
    "Vahue Gemma 7B Instruct",
    "Model 2",
    "Llama 3.1 70B Instruct",
    "Compare Metrics",
    "Compare Responses",
    "Metric",
    "Gemma 7B",
    "Winner",
    "Llama 70B",
    "Factual accuracy",
    "0.81", // PLACEHOLDER
    "0.91", // PLACEHOLDER
    "Hallucination rate",
    "0.24", // PLACEHOLDER
    "0.14", // PLACEHOLDER
    "Context recall",
    "0.71", // PLACEHOLDER
    "0.79", // PLACEHOLDER
    "Latency p95",
    "1.4s", // PLACEHOLDER
    "2.1s" // PLACEHOLDER
  ],
  "w": [
    "81%", // PLACEHOLDER
    "91%", // PLACEHOLDER
    "24%", // PLACEHOLDER
    "14%", // PLACEHOLDER
    "71%", // PLACEHOLDER
    "79%", // PLACEHOLDER
    "55%", // PLACEHOLDER
    "80%" // PLACEHOLDER
  ]
},
      },
      {
        title: 'Agent Library',
        body: 'Discover and operationalize agents and applications designed to multiply your team’s capacity, aligned with your support policies and engineered for accountability, speed, and scale.',
        mock: {
  "t": [
    "Agent Library",
    "Discover AI Agents optimized for business-critical workflows",
    "Search for agents and applications...",
    "All",
    "Support",
    "Voice",
    "Analysis",
    "Reports",
    "Order Status Agent",
    "Multi-tool analysis of orders, returns and tabular customer data",
    "Exhaustive Search",
    "Discover all relevant documents across knowledge bases",
    "Booking Agent",
    "Answer, qualify and book every caller while intent is live",
    "Escalation Chat",
    "Real-time ticket analysis and escalation monitoring",
    "Queue Analyst",
    "Analyze queue data and craft detailed operational reports",
    "Address Extraction",
    "Extract delivery data from unstructured customer text"
  ],
  "w": []
},
      },
    ],
  },
  foundation: {
    overtitle: 'Why Vahue',
    title: 'Foundation of AI Agents',
    subtitle: 'Discover the core building blocks that power effective production-ready AI agents.',
    top: [
      { icon: 'applications', label: 'Vahue Applications' },
      { icon: 'assistants', label: 'Vahue Assistants' },
      { icon: 'agents', label: 'Vahue Agents' },
    ],
    bottom: [
      { icon: 'models', label: 'Models' },
      { icon: 'buildingBlocks', label: 'Building Blocks' },
      { icon: 'evaluations', label: 'Evaluations' },
      { icon: 'dataFlywheel', label: 'Data Flywheel' },
      { icon: 'monitoring', label: 'Monitoring & Insights' },
      { icon: 'guardrails', label: 'Guardrails & Redteaming' },
    ],
  },
  tabs: [
  {
    "label": "Ingest Data",
    "content": " - Access fresh customer data with Vahue’s prebuilt data connectors. \n - Securely interact with your documents via local upload, cloud, or API.\n - Leverage data connectors to external systems like your CRM.",
    "image": {
      "src": "/donovan/channels-tiles.png",
      "alt": "Ingest Data",
      "width": 992,
      "height": 445,
      "cover": true
    }
  },
  {
    "label": "Agentic RAG",
    "content": "- Curate knowledge bases so Vahue’s AI Agents only interact with relevant data.\n- Observe Agent chain-of-thought reasoning to validate adherence to standard operating procedures.",
    "video": {
      "src": "/donovan/resolve.mp4", // PLACEHOLDER
      "poster": "/donovan/resolve.jpg"
    }
  },
  {
    "label": "Agent Library",
    "content": "- Access out-of-the-box AI Agents, Applications, and Assistants designed to support workflows including: coding assistance, report-writing, and insight discovery.\n- Leverage custom agents for your support organization including agents created for each support team. \n- Orchestrate multi-agent coordination — specialized to collaborate on specific tasks. \n",
    "image": {
      "src": "/donovan/agent-library.jpg", // PLACEHOLDER
      "alt": "Agent Library",
      "width": 1896,
      "height": 912,
      "cover": true
    }
  },
  {
    "label": "Agent Interaction",
    "content": "- Ensure your team has visibility into previous queries with thread sharing.\n- Iterate with Vahue through thread forking — creating a new thread while still preserving the original queries. ",
    "video": {
      "src": "/donovan/handoff.mp4", // PLACEHOLDER
      "poster": "/donovan/handoff.jpg"
    }
  },
  {
    "label": "Report Generation",
    "content": "- Draft summaries, handovers, QBRs, SOPs, or other reports with pre-existing templates.\n- Accelerate writing reports that align with the tone and style guide all while using the latest available information.\n",
    "video": {
      "src": "/donovan/review.mp4", // PLACEHOLDER
      "poster": "/donovan/review.jpg"
    }
  }
],
  overmatch: {
    overtitle: 'Why Vahue',
    title: 'Achieve AI Advantage',
    subtitle: 'Your competitors aren’t waiting to deploy AI systems. Ensure lasting advantage with the most advanced, production-ready AI capabilities your team has in its toolkit.',
    features: [
  {
    "icon": "expertise",
    "title": "AI Expertise",
    "subtitle": "Vahue works with the leading commercial foundation model providers and brings lessons learned to our customer engagements."
  },
  {
    "icon": "performance",
    "title": "Model Performance",
    "subtitle": "One of Vahue’s core competencies is model fine-tuning. Vahue can customize models specific to your use case or leverage pre-existing models like Meta Llama."
  },
  {
    "icon": "time",
    "title": "Time to Value",
    "subtitle": "Access no-code tools to customize AI agents on your own without reliance on external developers."
  },
  {
    "icon": "flexibility",
    "title": "Flexibility",
    "subtitle": "Select your preferred method for agent and model deployment and hosting. Seamlessly embed Vahue with your existing applications and tools."
  },
  {
    "icon": "traceability",
    "title": "Traceability",
    "subtitle": "Transparent detailed reasoning helps users understand the steps and resources AI agents used to arrive at an answer."
  },
  {
    "icon": "agnostic",
    "title": "Model Agnostic",
    "subtitle": "Leverage your preferred model provider with Vahue. Select models that account for business parameters like cost, speed, and expert capabilities."
  }
],
  },
  trusted: {
    overtitle: 'Supported Environments',
    title: 'Trusted & Secure',
    subtitle: 'Vahue is available on private and isolated company networks.',
    features: [
  {
    "icon": "check",
    "title": "Private Cloud",
    "subtitle": "SOC 2 and ISO 27001 Certified"
  },
  {
    "icon": "check",
    "title": "Private Networks",
    "subtitle": "Ready to run on secure company networks"
  },
  {
    "icon": "check",
    "title": "Cloud Agnostic",
    "subtitle": "Kubernetes containerized platform"
  }
],
  },
  prefooter: {
    headline: 'The future of your industry starts here',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Try Vahue', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/prefooter.webp' },
  },
}
