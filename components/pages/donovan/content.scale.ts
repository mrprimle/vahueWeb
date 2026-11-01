// Scale's strings for /donovan, read from the page's RSC payload on 2026-11-01. Same shape as content.ts.
import type { DonovanContent } from './types'

const WHITE = { tailwindClass: 'white', contrastColor: '#010101' }

export const content: DonovanContent = {
  meta: {
    title: 'Donovan: Super Intelligence (SI) Agents for the Public Sector | Scale',
    description: 'Scale Donovan empowers the public sector to field specialized Agents for mission-critical workflows.',
  },
  hero: {
    headline: 'Donovan',
    body: 'Deploy specialized Super Intelligence (SI) Agents for mission-critical workflows.',
    cta: { text: 'Book a Demo', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/hero.webp' },
  },
  logos: [
    { alt: 'White House', width: 65, height: 45 },
    { alt: 'US Army', width: 48, height: 63 },
    { alt: 'US Air Force', width: 68, height: 53 },
    { alt: 'CDAO', width: 79, height: 22 },
    { alt: 'Defense Innovation Unit', width: 70, height: 16 },
  ],
  overview: {
    overtitle: 'Product Overview',
    title: 'Customize, Evaluate, and Deploy Super Intelligence (SI) Agents',
    subtitle: 'Deploy mission-tailored SI agents from concept to combat in record time with Donovan. Put advanced agentic capabilities in the hands of warfighters when and where they need it most.',
    cards: [
      {
        title: 'Agent Factory',
        body: 'Use Donovan’s integration with SGP to build and customize SI agents with a no-code interface by accessing data sources, creating knowledge bases, leveraging state-of-the-art models, assigning agent instructions, and connecting agents to existing systems and tools.',
        mock: {
  "t": [
    "J1 Agent",
    "/",
    "Agent Factory",
    "Draft",
    "Deploy",
    "Assistant",
    "Tools",
    "Settings",
    "System Prompt",
    "You are a military intelligence analyst. Analyze documents accurately and always cite sources.",
    "Knowledge Base",
    "GDELT Event Data",
    "DoD Policy Documents",
    "Theatre Operations DB",
    "Llama 3.3 70B Instruct",
    "Active Pipeline",
    "GDELT Connector",
    "Source",
    "Knowledge Base",
    "Retrieval",
    "Reranker",
    "Filter",
    "Llama 3.3 70B",
    "LLM",
    "Output Preview",
    "Based on GDELT event data from Q4 2024, the situation in the specified region shows escalating activity with 3 key flash points identified..."
  ],
  "w": []
},
      },
      {
        title: 'Test & Evaluate',
        body: 'Compare model responses and performance metrics from leading models to determine which model is best suited for your mission and workflow, backed by rigorous testing frameworks that prioritize reliability, security, and alignment with DoW SI readiness goals.',
        mock: {
  "t": [
    "Models",
    "/",
    "Compare Models",
    "Model 1",
    "Scale Gemma 7B Instruct",
    "Model 2",
    "Llama 3.1 70B Instruct",
    "Compare Metrics",
    "Compare Responses",
    "Metric",
    "Gemma 7B",
    "Winner",
    "Llama 70B",
    "Factual accuracy",
    "0.81",
    "0.91",
    "Hallucination rate",
    "0.24",
    "0.14",
    "Context recall",
    "0.71",
    "0.79",
    "Latency p95",
    "1.4s",
    "2.1s"
  ],
  "w": [
    "81%",
    "91%",
    "24%",
    "14%",
    "71%",
    "79%",
    "55%",
    "80%"
  ]
},
      },
      {
        title: 'Agent Arsenal',
        body: 'Discover and operationalize agents and applications designed to force-multiply your organization, aligned with DoW ethics principles and engineered for accountability, speed, and scale.',
        mock: {
  "t": [
    "Agent Arsenal",
    "Discover SI Agents optimized for mission-critical workflows",
    "Search for agents and applications...",
    "All",
    "Intelligence",
    "Planning",
    "Analysis",
    "Reports",
    "GDELT Agent",
    "Multi-tool analysis of global events and tabular intelligence data",
    "Exhaustive Search",
    "Discover all relevant documents across knowledge bases",
    "Artillery Capabilities",
    "Analyze capabilities and produce mission announcements",
    "Flashpoint Chat",
    "Real-time intelligence analysis and threat monitoring",
    "Mission Analyst",
    "Analyze mission data and craft detailed operational reports",
    "Address Extraction",
    "Extract location data from unstructured intelligence text"
  ],
  "w": []
},
      },
    ],
  },
  foundation: {
    overtitle: 'Why Scale',
    title: 'Foundation of SI Agents',
    subtitle: 'Discover the core building blocks that power effective mission-ready SI agents.',
    top: [
      { icon: 'applications', label: 'Donovan Applications' },
      { icon: 'assistants', label: 'Donovan Assistants' },
      { icon: 'agents', label: 'Donovan Agents' },
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
    "content": " - Access fresh intelligence with Donovan’s prebuilt data connectors. \n - Securely interact with your documents via local upload, cloud, or API.\n - Leverage data connectors to external databases like GDELT.",
    "image": {
      "src": "/donovan/ingest.png",
      "alt": "Ingest Data",
      "width": 992,
      "height": 445,
      "cover": true
    }
  },
  {
    "label": "Agentic RAG",
    "content": "- Curate knowledge bases so Donovan’s SI Agents only interact with relevant data.\n- Observe Agent chain-of-thought reasoning to validate adherence to standard operating procedures.",
    "video": {
      "src": "https://scaleai.wistia.com/medias/li0o9v41to"
    }
  },
  {
    "label": "Agent Arsenal",
    "content": "- Access out-of-the-box SI Agents, Applications, and Assistants designed to support workflows including: coding assistance, report-writing, and insight discovery.\n- Leverage custom agents for your combatant command including agents created for each Joint Task Force. \n- Orchestrate multi-agent coordination — specialized to collaborate on specific tasks. \n",
    "image": {
      "src": "/donovan/agent-arsenal.webp",
      "alt": "Agent Arsenal",
      "width": 1896,
      "height": 912,
      "cover": true
    }
  },
  {
    "label": "Agent Interaction",
    "content": "- Ensure your task force has visibility into previous queries with thread sharing.\n- Iterate with Donovan through thread forking — creating a new thread while still preserving the original queries. ",
    "video": {
      "src": "https://scaleai.wistia.com/medias/ga7c6955yy"
    }
  },
  {
    "label": "Report Generation",
    "content": "- Draft COAs, SITREPs, AARs, OPORDs, or other reports with pre-existing templates.\n- Accelerate writing reports that align with the tone and style guide all while using the latest available information.\n",
    "video": {
      "src": "https://scaleai.wistia.com/medias/40g1gwnj23"
    }
  }
],
  overmatch: {
    overtitle: 'Why Scale',
    title: 'Achieve SI Overmatch',
    subtitle: 'Our adversaries aren’t waiting to field SI systems. Ensure decisive advantage with the most advanced, mission-ready SI capabilities the U.S. has in its toolkit.',
    features: [
  {
    "icon": "expertise",
    "title": "SI Expertise",
    "subtitle": "Scale works with the leading commercial foundation model providers and brings lessons learned to our public sector engagements."
  },
  {
    "icon": "performance",
    "title": "Model Performance",
    "subtitle": "One of Scale’s core competencies is model fine-tuning. Scale can customize models specific to your use case or leverage pre-existing models like Defense Llama."
  },
  {
    "icon": "time",
    "title": "Time to Value",
    "subtitle": "Access no-code tools to customize SI agents on your own without reliance on external developers."
  },
  {
    "icon": "flexibility",
    "title": "Flexibility",
    "subtitle": "Select your preferred method for agent and model deployment and hosting. Seamlessly embed Donovan with your existing applications and tools."
  },
  {
    "icon": "traceability",
    "title": "Traceability",
    "subtitle": "Transparent detailed reasoning helps users understand the steps and resources SI agents used to arrive at an answer."
  },
  {
    "icon": "agnostic",
    "title": "Model Agnostic",
    "subtitle": "Leverage your preferred model provider with Donovan. Select models that account for mission parameters like cost, speed, and expert capabilities."
  }
],
  },
  trusted: {
    overtitle: 'Supported Environments',
    title: 'Trusted & Secure',
    subtitle: 'Donovan is available on classified and air gapped networks.',
    features: [
  {
    "icon": "check",
    "title": "Unclassified/CUI GovCloud",
    "subtitle": "DISA IL4 and FedRAMP High Authorized"
  },
  {
    "icon": "check",
    "title": "Classified Networks",
    "subtitle": "Field-ready on secure government networks"
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
    secondaryCta: { text: 'Try Donovan', url: '/demo' },
    backdrop: WHITE,
    image: { path: '/donovan/prefooter.webp' },
  },
}
