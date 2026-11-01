import { CONTROL_FEATURES, PHASES } from '@/lib/automation-content'
import { getCaseStudy } from '@/lib/case-studies'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EvalModelDevPage from '@/components/templates/evaluation-model-developers/EvalModelDevPage'
import type { EvalModelDevContent, TestimonialItem } from '@/components/templates/evaluation-model-developers/content'

/*
 * Vahue /evaluation/model-developers on the scale.com/evaluation/model-developers layout
 * (components/templates/evaluation-model-developers, spec reference-snapshots/scale-clone/evaluation-model-developers.md).
 * Same eight sections, order, roles and counts; Scale's colours and motion. Only copy and media change:
 *   - repositioned as how Vahue evaluates agents for teams building their own AI, from PHASES, CONTROL_FEATURES and the
 *     workflow guardrails in lib/automation-content.ts
 *   - the testimonial slot holds case outcomes from lib/case-studies.ts, without quotation marks: they are not quotes
 *   - no metric slots on this page, so no placeholder metrics; the only figures come from the Exaware and PioGroup cases
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const CONTROL = Object.fromEntries(CONTROL_FEATURES.map((f) => [f.title, f.body]))

// The case's published title, summary and last outcome, to come close to Scale's quote length.
const caseItem = (slug: string): TestimonialItem[] => {
  const c = getCaseStudy(slug)
  if (!c) return []
  return [{ name: c.client, title: `${c.service}, ${c.disclosure.toLowerCase()}`, quote: `${c.title}. ${c.summary}` }]
}

export const vahueEvalModelDevContent: EvalModelDevContent = {
  hero: {
    headline: 'Evaluation for Teams Building AI', // page copy
    body: 'Accuracy reviews and safety checks for your agents.', // page copy
    cta: { label: 'Book an Audit', href: CONTACT },
    image: '/img/careers/office-3.jpg',
  },
  challenges: {
    header: { eyebrow: 'Evaluation Challenges', title: 'Agents Without a Baseline Never Earn More Scope' }, // page copy
    // page copy
    cards: [
      { icon: 'dataset', title: 'No recorded baseline, so nobody can say if the agent beats the process it replaced.' },
      { icon: 'tooling', title: 'Outputs judged by feel, with no queue, no threshold and no record of what a person changed.' },
      { icon: 'consistency', title: 'Accuracy measured once at launch, while model updates quietly change the results.' },
    ],
  },
  whyScale: {
    header: {
      eyebrow: 'Why Vahue',
      title: 'Accuracy You Can Review Every Month', // page copy
      body: 'Vahue evaluates your agents against a baseline recorded on your own data, so your team can see how each one performs, where it fails and what to fix next, across model updates and changes in volume.', // page copy
    },
    cards: [
      { icon: 'evalSets', title: 'Recorded Baselines', body: 'Volume, minutes per item, error rate and cost, recorded on your own data before any agent runs.' }, // from PHASES Audit
      { icon: 'raters', title: 'Accuracy Reviews', body: `${PHASES[1].body.split('. ')[1]} Reviews then continue every month.` }, // second sentence: page copy
      { icon: 'product', title: 'Results Dashboard', body: CONTROL['Results dashboard'] },
      { icon: 'targeted', title: 'Confidence Thresholds', body: CONTROL['Review queues'] },
      { icon: 'reporting', title: 'Reviewer Agreement', body: 'Agreement with reviewers is tracked every week, so an agent’s scope grows only on evidence, never on assumption.' }, // from scoring-decisions steps and guardrails
    ],
  },
  risks: {
    header: { eyebrow: 'RISKS', title: 'Key Identifiable Risks of Agents', body: 'Our reviews look for failures in six categories.' }, // page copy
    // page copy, from the workflow guardrails
    cards: [
      { icon: 'misinformation', title: 'Wrong Answers', body: 'Agents producing false, unsourced or inaccurate results, including figures with no traceable query.' },
      { icon: 'advice', title: 'Unapproved Actions', body: 'Agents moving money, customers or data without a person signing off, or acting beyond the role they were given.' },
      { icon: 'bias', title: 'Inconsistent Decisions', body: 'Different outcomes for the same case, with no explanation stored against either.' },
      { icon: 'privacy', title: 'Privacy', body: 'Showing a user data their role cannot see, disclosing personal details, or sending records outside your environment.' },
      { icon: 'cyber', title: 'Prompt Manipulation', body: 'A malicious input in a document or message steering an agent past its limits.' },
      { icon: 'substances', title: 'Silent Drift', body: 'Accuracy falling after a model update or a change in your data, with nobody told.' },
    ],
  },
  experts: {
    header: {
      eyebrow: 'CHECKS', // page copy
      title: 'Red-Team Style Checks', // page copy
      body: 'Vahue’s engineers try to break each agent before your team relies on it, and turn what they find into guardrails.', // page copy
    },
    figure: { src: '/img/control/agent-checks.svg', alt: 'Red-team style checks, such as prompt injection and permission probing, connected to the failures they catch.' },
    cards: [
      { icon: 'staff', title: 'Senior Engineers', body: 'A team of 17 and a network of 15+ specialists ship agents with evals and guardrails, and test them the same way.' }, // page copy, from public/llms.txt
      { icon: 'libraries', title: 'Cases from Your Work', body: 'Real documents, edge cases and past decisions from your workflow make up the set each agent is checked against.' }, // page copy
      { icon: 'adversarial', title: 'Adversarial Inputs', body: 'Injection attempts, malformed documents and permission probes test the limits set for each agent.' }, // page copy
      { icon: 'whiteHouse', title: 'Production Proof', body: 'Exaware’s NOC agents recorded zero unauthorized execution in UAT and staging, under explicit execution controls.' }, // case: exaware-governed-noc-agents
      { icon: 'research', title: 'Approvals and Dry Runs', body: CONTROL['Approvals and dry runs'] },
    ],
  },
  testimonials: {
    heading: 'Don’t just take our word for it',
    plainText: true,
    theme: { hex: '#839CB2', contrast: '#000000' },
    items: [...caseItem('exaware-governed-noc-agents'), ...caseItem('piogroup-employee-assistant')],
  },
  resources: {
    header: { eyebrow: 'RESOURCES', title: 'Learn More About Our Evaluation Work' }, // page copy
    posts: [
      { title: 'Governed NOC Agents for Faster Incident Resolution', category: 'Case Study', href: '/case-studies/exaware-governed-noc-agents/', image: '/img/nav/caseStudies.svg' },
      { title: 'Deploying LLMs Securely in Enterprise Environments', category: 'Blog', href: '/blog/secure-llm-deployment-enterprise/', image: '/img/nav/blogIcon.svg' },
      { title: 'Security and the Control Layer', category: 'Security', href: '/security/', image: '/img/nav/ai-leaderboard.svg' }, // page copy
      { title: 'How We Operate Your Agents, Month to Month', category: 'Operate', href: '/operations/', image: '/img/nav/labs.svg' }, // page copy
    ],
  },
  prefooter: {
    headline: 'Measure your agents today!', // page copy
    cta: { label: 'Book an Audit', href: CONTACT },
    image: '/img/careers/office-4.jpg',
  },
}

export default function VahueEvaluationModelDevelopersPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <EvalModelDevPage content={vahueEvalModelDevContent} />
    </div>
  )
}
