// Copy for /genai-portfolio ("Knowledge Agents" in the menu). Copy rule: keep Scale's line unless it is false for Vahue, then
// swap only those words (local positioning source, sections 0, 5, 7 and 8). Same shape and counts as content.scale.ts. PLACEHOLDER lines are for Mike.
import type { GenAiContent } from './types'

const DIR = '/genai-portfolio'
const NEUTRAL = '/site/nav/neutral.svg'

export const content: GenAiContent = {
  meta: { title: 'Knowledge Agents | Vahue', description: 'Accelerate and scale Generative AI across your enterprise with the platform to transform your data into customized enterprise-ready Generative AI applications.' },
  hero: {
    headline: "Reliable infrastructure is at the core of what we do. ",
    subtitle: [{ text: "Vahue Knowledge Agents gives teams the tools to build, deploy, and continuously improve agents that reason over your data, run reliably at scale, and get smarter every time they're used." }],
    logos: [
      { key: 'logo-1', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-2', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-3', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-4', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-5', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-6', alt: 'Logo' }, // PLACEHOLDER
      { key: 'logo-7', alt: 'Logo' }, // PLACEHOLDER
    ],
    video: { webm: `${DIR}/hero.webm`, mov: `${DIR}/hero.mov`, poster: `${DIR}/hero-poster.webp`, aspectRatio: '1080 / 1080' },
    scrollLabel: 'Scroll to explore',
  },
  intro: {
    headline: "Run your entire agent lifecycle in one place.",
    body: [{ text: "Most teams stitch together various tools and call it a stack. Vahue gives you a unified foundation – from data pipelines to live agent monitoring – built to work cohesively from day one." }],
    counterLabel: 'STEP',
    scrollLabel: 'Scroll to explore',
    steps: [
      { title: "Connect Data", description: [{ text: "Connect to enterprise data from your sources, wherever they live. Our engine ingests, labels, and structures it, getting it AI-ready with your data staying right where it is." }] },
      { title: "Build + Execute", description: [{ text: "Deploy, host, and orchestrate agents that reason over your data. Implementation supports long-running async workflows, multi-agent coordination, and any model (again with no vendor lock-in)." }] },
      { title: "Evaluate + Monitor", description: [{ text: "Automated and human feedback is received to manage, debug, and improve agent performance through semantic layer monitoring, evaluation scoring, and full trace transparency, so you get visibility in real time." }] },
      { title: "Learn + Improve", description: [{ text: "Human feedback is ingested back into the model engine as a learning signal. Operations telemetry becomes training data, making the agent self-improving over time, so your systems keep pace with the frontier without rebuilding from scratch." }] },
    ],
  },
  postTraining: {
    anchorId: 'post-training',
    left: [{ style: 'h4', text: "Leverage the frontier where you need to, and open weight models where you can." }],
    right: [{ text: "Vahue post-training turns open-weight models into specialists, giving you control and performance at a fraction of the cost of frontier models." }, { text: "" }],
    cta: { text: "Talk to our team", url: "/demo" },
  },
  stack: {
    headline: "You own the stack. Vahue works inside it.",
    subtitle: [{ text: "Vahue works agnostically across your current tools, frameworks and models. No migrating.\nNo switch in providers." }],
    cards: [
      { title: "Your data", description: [{ text: "Connect to data sources like Confluence, SharePoint, S3, and more. Vahue structures that data through optimized bespoke pipelines, not a generic one." }], colorClass: 'text-archive-purple' },
      { title: "Your Cloud", description: [{ text: "Deploy securely within your own VPC. Full support for AWS, Azure, and GCP with enterprise-grade governance at every layer." }], colorClass: 'text-foundry-tan' },
      { title: "Your models", description: [{ text: "Test, fine-tune, and deploy across all major models — OpenAI, Google, Meta, Mistral, and more. Switch without rebuilding. Optimize without starting over." }], colorClass: 'text-cloud-slate' },
    ],
    video: { webm: `${DIR}/stack.webm`, mov: `${DIR}/stack.mov`, poster: `${DIR}/stack-poster.webp`, aspectRatio: '1080 / 1080', name: 'stack' },
  },
  trust: {
    heading: "Agents are easy to build and hard to trust. (That’s where we come in.)",
    cards: [
      { title: "All Your Data. AI-Ready.", description: [{ text: "Every agent is built and tested against your specific enterprise standards — your workflows, your rules, your definition of good — before it ever touches production." }] },
      { title: "Agent execution + operation", description: [{ text: "Vahue manages the full complexity of running agents at enterprise scale — long running, async, and multi-agent workflows — so your team can focus on outcomes, not operations." }] },
      { title: "Reliable and trustworthy deployment", description: [{ text: "Every agent that goes into production comes with a full audit trail, source-cited outputs, and enterprise-specific oversight built in so you always know what your AI did and why." }] },
    ],
  },
  flywheel: {
    headline: "The more you use it the smarter it gets.",
    body: [{ text: "Vahue captures behavioral data from institutional knowledge, encodes expert judgement, continuously improves agent performance over time. The result: agents that make better outputs, without requiring manual retraining cycles." }],
    labels: { performance: 'PERFORMANCE OVER TIME', process: 'THE FLYWHEEL PROCESS' },
    steps: [
      { title: "Usage becomes data", description: [{ style: 'h4', text: "Every query, decision, and outcome is captured and structured automatically. Nothing is wasted." }] },
      { title: "Human in the loop", description: [{ style: 'h4', text: "Capture human feedback and transform raw usage signals into structured, high-quality data." }] },
      { title: "Data fuels improvement", description: [{ style: 'h4', text: "Real usage data is converted into targeted improvements; no manual work, no waiting." }] },
      { title: "Improvement compounds", description: [{ style: 'h4', text: "Higher-quality agents get used more. More usage generates better data. The cycle continues." }] },
    ],
  },
  dialect: {
    left: [{ style: 'h4', text: "Your decision layer emerges from the feedback loop. Shaping AI to think like your best employees." }],
    right: [{ text: "" }, { text: "At its core, your Vahue decision layer is a map that sets you apart from the" }, { text: "" }, { text: "" }, { text: "competition. It doesn’t just track how data flows, but how decisions are made. As your decision layer improves, the ‘why’ is learned and encoded by expert judgements, eventually becoming as autonomous as your guardrails allow it." }, { text: "" }],
    cta: { text: "Learn more", url: '/blog' },
    video: { url: `${DIR}/dialect.mp4` },
  },
  differentiators: {
    heading: "Our Differentiators",
    capabilitiesLabel: 'Capabilities',
    categories: [{ id: 'vahue', label: "Vahue Agents" }, { id: 'opensource', label: "Open Source" }, { id: 'inhouse', label: "In House Builds" }, { id: 'modelbuilder', label: "Model Builder" }],
    capabilities: [
      {
        label: "Long-running async agents",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Vahue’s Agentic Infrastructure layer (agents plus Operate) natively enables long-running agents designed for complex tasks." }] },
          { id: 'opensource', applicable: 'notApplicable', note: [{ text: "Open source frameworks lack the managed infrastructure and enterprise support needed for reliable, long-running async agents at production scale." }] },
          { id: 'inhouse', applicable: 'partialApplicable', note: [{ text: "Success depends on your team’s internal bandwidth and expertise to build and maintain this infrastructure." }] },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Continuous learning flywheel",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "With Vahue, your models and systems improve over time through ongoing human feedback and co-developed IP you own." }] },
          { id: 'opensource', applicable: 'partialApplicable', note: [{ text: "Open source tooling can support feedback loops, but requires significant internal investment to build pipelines that continuously improve model quality." }] },
          { id: 'inhouse', applicable: 'partialApplicable', note: [{ text: "Building a reliable learning flywheel is complex and resource-intensive. We’ve found this is the kind of nested complexity that stalls in-house efforts." }] },
          { id: 'modelbuilder', applicable: 'partialApplicable', note: [{ text: "Possible, but requires significant custom infrastructure. Most teams struggle to sustain it over time." }] },
        ],
      },
      {
        label: "Built-in evaluation & benchmarking",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Eval-driven development is core to reliable AI. We draw on our expertise in deploying for regulated industries and on private evals, baselines run on your own cases." }] },
          { id: 'opensource', applicable: 'partialApplicable' },
          { id: 'inhouse', applicable: 'notApplicable' },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Enterprise compliance & governance",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Vahue's partnership model includes compliance, data governance, and IP ownership structures suited for regulated industries." }] },
          { id: 'opensource', applicable: 'notApplicable', note: [{ text: "Open source tools have no built-in compliance framework. You're responsible for all security, governance, and regulatory requirements." }] },
          { id: 'inhouse', applicable: 'partialApplicable' },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Human-in-the-loop oversight",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Reliable AI is built around human + AI collaboration, which is baked into Vahue." }] },
          { id: 'opensource', applicable: 'notApplicable' },
          { id: 'inhouse', applicable: 'notApplicable' },
          { id: 'modelbuilder', applicable: 'partialApplicable' },
        ],
      },
    ],
  },
  security: {
    heading: "Security that holds up to regulated industries",
    labels: ['Enterprise Security Review Passed', 'SOC 2 Type II', 'ISO 27001', 'GDPR Compliant Deployment'], // PLACEHOLDER: same certification slots as Scale, confirm before shipping
    link: { text: "View safety standards", url: "/security" },
    image: { path: `${DIR}/security.svg` },
  },
  testimonials: {
    heading: "Trusted by industry leaders", // PLACEHOLDER
    items: [
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "Customers used to wait two to five days for a reply. Now our agent resolves 97% of conversations instantly, and we didn't need a third hire. I genuinely don't think we'd function without it." }, // PLACEHOLDER
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "We wanted to not just stand up a demo or POC, but deploy production-ready use cases and infrastructure. With Vahue Knowledge Agents, we were able to quickly launch our first use case: a GenAI solution that makes it easy for our users to get information out of our Enterprise Data Hub. This is enabling data-driven decision making and shortening the time to insights from days or weeks down to seconds." }, // PLACEHOLDER
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "Vahue is really the backbone of our AI success. It's critical and I'm excited to keep building forward that relationship and delivering more for our company." }, // PLACEHOLDER
    ],
  },
  demo: {
    headline: "See how Vahue can transform your business",
    subtitle: [{ text: "Our team will walk you through Vahue in the context of your actual environment not a generic demo." }],
    cta: { text: "Talk to an expert", url: "/demo" },
    images: [{ path: `${DIR}/demo-1.svg` }, { path: `${DIR}/demo-2.webp` }, { path: `${DIR}/demo-3.webp` }],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    ctaText: 'Talk to an expert',
    ctaHref: '/demo',
    items: [
      { question: "Is there any vendor lock-in?", answer: [{ text: "Vahue's flexible, interoperable, and largely open-source technology toolkit ensures no platform lock-in, with your enterprise retaining full ownership of their data and agent code." }], includeCta: true },
      { question: "Will I still own my IP?", answer: [{ text: "Yes. You retain full ownership of your data, business logic, and any custom AI solutions we build for you. Vahue owns the underlying platform infrastructure and technical frameworks, but your solution is yours. No vendor lock-in, ever." }], includeCta: true },
      { question: "How do I measure reliability?", answer: [{ text: "Vahue's Context Engine provides high-quality, production-aligned evaluation datasets in days, ensuring models and agentic applications perform as expected." }], includeCta: true },
      { question: "What is safeguarding against bad actors?", answer: [{ text: "Vahue’s expertise in model behavior uniquely positions us to ensure application reliability in a way that competitors cannot. We are the industry leading experts in GenAI red teaming." }], includeCta: true },
    ],
  },
  blog: {
    heading: [{ style: 'h2', text: "Dive deeper" }],
    posts: [
      { title: "Introducing Audits: The Missing Layer Between AI and Enterprise Trust", url: '/blog', category: { name: 'Product', color: { hex: '#575757' } }, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      // As on Scale: this tile and the fourth have an image only, no title, no link.
      { title: '', image: `${DIR}/blog-2.webp`, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { title: "How do you make fundamentally nondeterministic agents trustable? | Human in the Loop: Episode 18", url: '/blog', image: `${DIR}/blog-3.webp`, textColor: 'dark', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { title: '', image: `${DIR}/blog-4.webp`, textColor: 'light', imageGradientOverlay: true, titleOnly: false }, // PLACEHOLDER
      { title: "Hidden Risks in Finance's Most Common GenAI Starting Point", url: '/blog', image: NEUTRAL, category: { name: 'Finance', color: null }, titleOnly: false }, // PLACEHOLDER
    ],
  },
}
