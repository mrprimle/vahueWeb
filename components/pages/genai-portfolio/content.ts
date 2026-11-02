// Copy for /genai-portfolio (Knowledge Agents, research segment 3). AJTBD copy in Scale's sections: same shape and counts as content.scale.ts.
// PLACEHOLDER lines are for Mike.
import type { GenAiContent } from './types'

const DIR = '/genai-portfolio'
const NEUTRAL = '/site/nav/neutral.svg'

export const content: GenAiContent = {
  meta: { title: 'Knowledge Agents | Vahue', description: 'Vahue Knowledge Agents give your team sourced answers from your own documents and systems, inside Teams and Slack, measured against your baseline from day one.' },
  hero: {
    headline: "Sourced answers from your own data.",
    subtitle: [{ text: "Knowledge Agents for expert teams tired of answering the same questions. We build and run agents that give sourced answers from your documents and systems, inside Teams and Slack, and get smarter every time they're used." }],
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
    headline: "Run your entire knowledge workflow in one place.",
    body: [{ text: "Most teams keep answers in a few people's heads and five tools nobody can search. Vahue gives you one foundation – from connected sources to live agent monitoring – usable from day one." }],
    counterLabel: 'STEP',
    scrollLabel: 'Scroll to explore',
    steps: [
      { title: "Connect Data", description: [{ text: "Connect documents, wikis and databases, wherever they live. We ingest and structure them with existing permissions intact, getting them AI-ready with your data staying right where it is." }] },
      { title: "Ask + Answer", description: [{ text: "Staff ask in plain English, in Teams, Slack or a browser. Agents find the right context and answer with a citation for every claim; every number comes from a logged query, on any model (with no vendor lock-in)." }] },
      { title: "Evaluate + Monitor", description: [{ text: "We test on your own past questions before go-live, next to what your experts answered. After launch, evaluation scoring and full trace transparency show accuracy against your baseline in real time." }] },
      { title: "Learn + Improve", description: [{ text: "Expert corrections feed back as a learning signal, and unanswered questions become the next content to add. Vahue keeps running and improving the agents, so answers keep pace with your documents without rebuilding from scratch." }] },
    ],
  },
  postTraining: {
    anchorId: 'post-training',
    left: [{ style: 'h4', text: "Leverage the frontier where you need to, and open weight models where you can." }],
    right: [{ text: "We tune open-weight models into specialists on your own documents, giving you control and performance at a fraction of the cost of frontier models. Run cost is in every monthly report." }, { text: "" }],
    cta: { text: "Talk to our team", url: "/demo" },
  },
  stack: {
    headline: "You own the stack. Vahue works inside it.",
    subtitle: [{ text: "Vahue works agnostically across your current tools, frameworks and models. No migrating.\nNo switch in providers." }],
    cards: [
      { title: "Your data", description: [{ text: "Connect to data sources like Confluence, SharePoint, S3, and more, through bespoke pipelines, not a generic one. Answers respect each user's access rights." }], colorClass: 'text-archive-purple' },
      { title: "Your Cloud", description: [{ text: "Deploy securely within your own VPC. Full support for AWS, Azure, and GCP with enterprise-grade governance at every layer." }], colorClass: 'text-foundry-tan' },
      { title: "Your models", description: [{ text: "Test, fine-tune, and deploy across all major models — OpenAI, Google, Meta, Mistral, and more. Switch without rebuilding. Optimize without starting over." }], colorClass: 'text-cloud-slate' },
    ],
    video: { webm: `${DIR}/stack.webm`, mov: `${DIR}/stack.mov`, poster: `${DIR}/stack-poster.webp`, aspectRatio: '1080 / 1080', name: 'stack' },
  },
  trust: {
    heading: "Agents are easy to build and hard to trust. (That’s where we come in.)",
    cards: [
      { title: "All Your Data. AI-Ready.", description: [{ text: "Every agent is tested on your own past questions against your specific standards — your workflows, your rules, your definition of good — before it ever touches production." }] },
      { title: "Agent execution + operation", description: [{ text: "Vahue keeps running the agents after launch — monitoring, fixes and updates as your documents change — so nobody on your team works full-time just to maintain them." }] },
      { title: "Reliable and trustworthy deployment", description: [{ text: "Every agent that goes into production comes with a full audit trail, source-cited outputs, and enterprise-specific oversight built in so you always know what your AI did and why." }] },
    ],
  },
  flywheel: {
    headline: "The more you use it the smarter it gets.",
    body: [{ text: "Vahue captures what your experts know, from playbooks to the corrections they make, and continuously improves agent answers over time. The result: less reliance on tribal knowledge, without manual retraining cycles." }],
    labels: { performance: 'PERFORMANCE OVER TIME', process: 'THE FLYWHEEL PROCESS' },
    steps: [
      { title: "Usage becomes data", description: [{ style: 'h4', text: "Every question, answer, and outcome is captured and structured automatically. Nothing is wasted." }] },
      { title: "Human in the loop", description: [{ style: 'h4', text: "Experts correct answers where they already work. Each correction becomes high-quality data." }] },
      { title: "Data fuels improvement", description: [{ style: 'h4', text: "Corrections and open questions become targeted improvements; no manual work, no waiting." }] },
      { title: "Improvement compounds", description: [{ style: 'h4', text: "Better answers get used more. Usage makes better data. Experts handle only new questions." }] },
    ],
  },
  dialect: {
    left: [{ style: 'h4', text: "Your decision layer emerges from the feedback loop. Shaping AI to think like your best employees." }],
    right: [{ text: "" }, { text: "At its core, your Vahue decision layer is a map that sets you apart from the" }, { text: "" }, { text: "" }, { text: "competition. It doesn’t just track where answers live, but how decisions are made. As your decision layer improves, the ‘why’ is learned and encoded by expert judgements, eventually becoming as autonomous as your guardrails allow it." }, { text: "" }],
    cta: { text: "Learn more", url: '/blog' },
    video: { url: `${DIR}/dialect.mp4` },
  },
  differentiators: {
    heading: "Our Differentiators",
    capabilitiesLabel: 'Capabilities',
    categories: [{ id: 'vahue', label: "Vahue Agents" }, { id: 'opensource', label: "Agent Platforms" }, { id: 'inhouse', label: "In House Builds" }, { id: 'modelbuilder', label: "Dev Agencies" }],
    capabilities: [
      {
        label: "Someone runs it after launch",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Vahue runs, monitors and fixes your agents every month, and reports against the baseline we recorded before we started." }] },
          { id: 'opensource', applicable: 'notApplicable', note: [{ text: "Platforms leave setup, tuning, testing and cost-watching with your team. It can almost require someone full-time just to maintain and set up." }] },
          { id: 'inhouse', applicable: 'partialApplicable', note: [{ text: "Success depends on your team’s internal bandwidth and expertise to keep maintaining the agents." }] },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Continuous learning flywheel",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "With Vahue, your answers and systems improve over time through ongoing expert feedback and co-developed IP you own." }] },
          { id: 'opensource', applicable: 'partialApplicable', note: [{ text: "Platforms can support feedback loops, but your team does the tuning, testing and review that keep answers correct." }] },
          { id: 'inhouse', applicable: 'partialApplicable', note: [{ text: "Building a reliable learning flywheel is complex and resource-intensive. We’ve found this is the kind of nested complexity that stalls in-house efforts." }] },
          { id: 'modelbuilder', applicable: 'partialApplicable', note: [{ text: "Possible until handover. After that, most teams struggle to sustain it over time." }] },
        ],
      },
      {
        label: "Evaluation on your own cases",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Eval-driven development is core to reliable AI. We test every agent on your own past questions and record the baseline before it goes live." }] },
          { id: 'opensource', applicable: 'partialApplicable' },
          { id: 'inhouse', applicable: 'notApplicable' },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Enterprise compliance & governance",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Vahue's partnership model includes compliance, data governance, and IP ownership structures suited for regulated industries." }] },
          { id: 'opensource', applicable: 'partialApplicable', note: [{ text: "Platforms ship their own controls, but matching them to your permissions, data rules and audits stays with your team." }] },
          { id: 'inhouse', applicable: 'partialApplicable' },
          { id: 'modelbuilder', applicable: 'notApplicable' },
        ],
      },
      {
        label: "Human-in-the-loop oversight",
        categories: [
          { id: 'vahue', applicable: 'applicable', note: [{ text: "Reliable AI is built around human + AI collaboration, which is baked into Vahue." }] },
          { id: 'opensource', applicable: 'partialApplicable' },
          { id: 'inhouse', applicable: 'notApplicable' },
          { id: 'modelbuilder', applicable: 'partialApplicable' },
        ],
      },
    ],
  },
  security: {
    heading: "Security that holds up to regulated industries",
    labels: ['ISO 42001', 'SOC 2', 'ISO 27001', 'GDPR'],
    link: { text: "View safety standards", url: "/security" },
    image: { path: `${DIR}/security.svg` },
  },
  testimonials: {
    heading: "Trusted by industry leaders", // PLACEHOLDER
    items: [
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "Our experts answered the same questions every week, and meeting prep meant searching five tools. Now the answer arrives with its source, in Teams, in seconds. It's like having a personal analyst in your pocket." }, // PLACEHOLDER
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "We wanted to not just stand up a demo or POC, but deploy production-ready use cases and infrastructure. With Vahue Knowledge Agents, we were able to quickly launch our first use case: an agent that makes it easy for our users to get information out of our Enterprise Data Hub. This is enabling data-driven decision making and shortening the time to insights from days or weeks down to seconds." }, // PLACEHOLDER
      { clientName: 'Full Name', title: 'Role, Company', testimonial: "Vahue is really the backbone of our AI success. It's critical and I'm excited to keep building forward that relationship and delivering more for our company." }, // PLACEHOLDER
    ],
  },
  demo: {
    headline: "See it work on your own cases before it goes live.",
    subtitle: [{ text: "Our team will run the agents on your own past questions, in your actual environment, next to what your experts answered. Not a generic demo." }],
    cta: { text: "Talk to an expert", url: "/demo" },
    images: [{ path: `${DIR}/demo-1.svg` }, { path: `${DIR}/demo-2.webp` }, { path: `${DIR}/demo-3.webp` }],
  },
  faqs: {
    heading: "Frequently Asked Questions",
    ctaText: 'Talk to an expert',
    ctaHref: '/demo',
    items: [
      { question: "Is there any vendor lock-in?", answer: [{ text: "Vahue's flexible, interoperable, and largely open-source technology toolkit ensures no platform lock-in, with your enterprise retaining full ownership of their data and agent code." }], includeCta: true },
      { question: "Will I still own my IP?", answer: [{ text: "Yes. You retain full ownership of your data, business logic, and any custom AI solutions we build for you. Vahue owns the underlying technical frameworks, but your solution is yours. No vendor lock-in, ever." }], includeCta: true },
      { question: "How do I measure reliability?", answer: [{ text: "We record your baseline in the Audit, then test agents on your own past questions in the Pilot. Correct answers, coverage, exceptions and time saved are reported every month." }], includeCta: true },
      { question: "What stops an agent making things up?", answer: [{ text: "Proper guardrails. Agents answer only from your approved sources, cite every claim and say when they don't know, and anything risky goes to a person. We also red-team them against prompt attacks and data extraction before go-live." }], includeCta: true },
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
