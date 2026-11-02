// Copy for /donovan (Support and Voice Agents). AJTBD copy in Scale's sections.
// Same shape and counts as content.scale.ts. Lines marked PLACEHOLDER are for Mike to replace with real data.
import { fitProofLogo } from '@/components/site/proofLogos'
import type { DonovanContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: DonovanContent = {
  meta: {
    title: 'Support and Voice Agents | Vahue',
    description: 'Vahue runs chat and voice agents that resolve routine requests around the clock and hand the rest to your team with context, measured against your baseline from day one.',
  },
  hero: {
    headline: 'Support and Voice Agents',
    body: 'For support teams running at maximum capacity: chat and voice agents that resolve routine requests around the clock and hand the rest to a person with context.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/support-floor.jpg' },
  },
  logos: [
    fitProofLogo('inspera', 68, 36), // FROM OLD SITE: confirm
    fitProofLogo('ica', 60, 30), // FROM OLD SITE: confirm
    fitProofLogo('svea-solar', 68, 36), // FROM OLD SITE: confirm
    fitProofLogo('qonto', 79, 22), // FROM OLD SITE: confirm
    fitProofLogo('wisestamp', 80, 20), // FROM OLD SITE: confirm
  ],
  overview: {
    overtitle: 'Service Overview',
    title: 'Build, Evaluate, and Run Support and Voice Agents',
    subtitle: 'Customers wait hours for a reply while your team answers the same questions again. We take agents tailored to your policies from concept to production, then keep running them, so every customer gets an answer when and where they need it.',
    cards: [
      {
        title: 'Agent Factory',
        body: 'We build your agents on your helpdesk, phone lines and knowledge bases: your policies as agent instructions, state-of-the-art models, and connections to your CRM, order and booking systems, so they can look up and act, not just reply.',
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
    "You are a support agent. Answer from approved policies and hand off to a person when unsure.",
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
        body: 'Test agents on your own past calls and tickets, not a demo. Listen back, see where each one handled a request well or got something wrong, and compare results with what your team did, before anything goes live.',
        mock: {
  "t": [
    "Models",
    "/",
    "Compare Models",
    "Model 1",
    "Tuned Gemma 7B Instruct",
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
        body: 'Start from agents for the requests that fill your queue: order status, bookings, returns and escalations. Each is aligned with your support policies and engineered for accountability, speed, and scale.',
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
    "Look up orders and returns, then answer or act within limits",
    "Policy Search",
    "Find the right answer across your knowledge bases",
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
      { icon: 'applications', label: 'Chat Agents' },
      { icon: 'assistants', label: 'Voice Agents' },
      { icon: 'agents', label: 'Ticket Agents' },
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
    "label": "Every Channel",
    "content": " - Answer calls, chat, email and tickets, with identity checks where needed. \n - Access fresh customer data through connectors to your helpdesk and CRM.\n - Securely connect your documents and policies via upload, cloud, or API.",
    "image": {
      "src": "/donovan/channels-tiles.png",
      "alt": "Every Channel",
      "width": 992,
      "height": 445,
      "cover": true
    }
  },
  {
    "label": "Resolve",
    "content": "- Agents look up orders, bookings or accounts and act within limits, so routine requests resolve end to end.\n- Observe Agent chain-of-thought reasoning to validate adherence to standard operating procedures.",
    "video": {
      "src": "/donovan/resolve.mp4", // PLACEHOLDER
      "poster": "/donovan/resolve.jpg"
    }
  },
  {
    "label": "Agent Library",
    "content": "- Start from agents designed for workflows including: order status, bookings, returns, and escalations.\n- Leverage custom agents for your support organization including agents created for each support team. \n- Orchestrate multi-agent coordination — specialized to collaborate on specific tasks. \n",
    "image": {
      "src": "/donovan/agent-library.jpg", // PLACEHOLDER
      "alt": "Agent Library",
      "width": 1896,
      "height": 912,
      "cover": true
    }
  },
  {
    "label": "Human Handoff",
    "content": "- Anything outside the agent's limits goes to a person with a summary, so nobody re-asks for context.\n- Customers can ask for a human at any time, and risky actions wait for one. ",
    "video": {
      "src": "/donovan/handoff.mp4", // PLACEHOLDER
      "poster": "/donovan/handoff.jpg"
    }
  },
  {
    "label": "Review and Report",
    "content": "- Listen back to calls and review escalations every week to set the next things to automate.\n- Get a monthly report against your baseline: resolution rate, response time, hours returned and cost.\n",
    "video": {
      "src": "/donovan/review.mp4", // PLACEHOLDER
      "poster": "/donovan/review.jpg"
    }
  }
],
  overmatch: {
    overtitle: 'Why Vahue',
    title: 'Achieve AI Advantage',
    subtitle: 'Your customers won’t wait two to five days for a reply. On one e-commerce platform, 24/7 AI support cut tickets by 60% and reached 95% CSAT. Support more customers with production-ready AI capabilities we run for you.', // FROM OLD SITE: confirm
    features: [
  {
    "icon": "expertise",
    "title": "AI Expertise",
    "subtitle": "Vahue works with the leading commercial foundation model providers and brings lessons learned to our customer engagements."
  },
  {
    "icon": "performance",
    "title": "Model Performance",
    "subtitle": "Voice agents that don’t sound like a robot. We tune on your real call transcripts, and can customize models specific to your use case or leverage pre-existing models like Meta Llama."
  },
  {
    "icon": "time",
    "title": "Time to Value",
    "subtitle": "Record your baseline in 2 weeks, then run on real calls and tickets in shadow mode within 4 to 6 weeks, without pulling in your developers."
  },
  {
    "icon": "flexibility",
    "title": "Flexibility",
    "subtitle": "Select your preferred method for agent and model deployment and hosting. Seamlessly embed Vahue with your helpdesk, phone system and existing tools."
  },
  {
    "icon": "traceability",
    "title": "Traceability",
    "subtitle": "Transparent detailed reasoning helps your team understand the steps and resources AI agents used to arrive at an answer."
  },
  {
    "icon": "agnostic",
    "title": "Model Agnostic",
    "subtitle": "Leverage your preferred model provider with Vahue. Select models that account for cost, speed, and quality, and see cost per resolution in every report."
  }
],
  },
  trusted: {
    overtitle: 'Supported Environments',
    title: 'Trusted & Secure',
    subtitle: 'Vahue runs in your cloud or on private company networks.',
    features: [
  {
    "icon": "check",
    "title": "Private Cloud",
    "subtitle": "SOC 2, ISO 27001, HIPAA and GDPR"
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
    headline: 'See it work on your own cases before it goes live.',
    cta: { text: 'Book a Demo', url: '/demo' },
    secondaryCta: { text: 'Talk to an Expert', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/prefooter.webp' },
  },
}
