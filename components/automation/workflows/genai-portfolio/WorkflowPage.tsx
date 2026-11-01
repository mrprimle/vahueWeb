import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import { PHASES, POSITIONING, type Workflow } from '@/lib/automation-content'
import { getCaseStudy, type CaseStudy } from '@/lib/case-studies'
import Hero from './Hero'
import Intro from './Intro'
import Flywheel from './Flywheel'
import { Stack, TrustCards, TwoColumn } from './Sections'
import { Blog, Demo, Differentiators, Faqs, Integrations, Results, type DiffRow } from './Lower'
import s from './styles.module.css'

/*
 * /automations/knowledge-agents on the scale.com/genai-portfolio layout, strict parity with the clone
 * (components/templates/genai-portfolio/GenAiPortfolioPage.tsx): all 13 sections in Scale's order and colours
 * (black hero, intro, white two-column, black stack, evergreen cards, #eaeaea flywheel, white two-column with media,
 * white differentiators, #c7c7c7 security, foundry-tan testimonials, black demo, #f2f2f2 FAQ, black blog).
 * Scale's scene videos are replaced by Vahue's own SVG drawings on the same pin / scrub params.
 * Source: lib/automation-content.ts (WORKFLOWS 'knowledge-agents', POSITIONING, PHASES, CONTROL_FEATURES),
 * lib/case-studies.ts and the /blog posts; text written for this page is listed in the strict-parity report.
 */

const cases = ['piogroup-employee-assistant', 'exaware-governed-noc-agents', 'rfi-response-automation'].map((c) => getCaseStudy(c)).filter((c): c is CaseStudy => Boolean(c))
const CTA = { href: '/contact/', label: 'Book an Audit' }

const DIFF_ROWS: DiffRow[] = [
  {
    label: 'Sourced, cited answers',
    cells: [
      { m: 'A', note: 'Every answer cites the documents or the logged query it came from.' },
      { m: 'P', note: 'Many cite documents, but rarely the database query behind a number.' },
      { m: 'P', note: 'Possible, but citations across every source take real build effort.' },
      { m: 'P', note: 'Finds the documents; staff still have to assemble the answer.' },
    ],
  },
  {
    label: 'Access rights respected',
    cells: [{ m: 'A', note: 'The agent reads only what the person asking could already open.' }, { m: 'P' }, { m: 'P' }, { m: 'A' }],
  },
  {
    label: 'No figure without a query',
    cells: [{ m: 'A', note: 'Numbers come only from logged queries against your own databases.' }, { m: 'N' }, { m: 'P' }, { m: 'N' }],
  },
  {
    label: 'Answers in Slack or Teams',
    cells: [{ m: 'A', note: 'Staff ask in the chat tools they already use, or in a browser.' }, { m: 'P' }, { m: 'P' }, { m: 'N' }],
  },
  {
    label: 'Operated after launch',
    cells: [
      { m: 'A', note: 'We run the agents day to day, with a monthly report against the baseline.' },
      { m: 'N' },
      { m: 'P', note: 'Depends on your team’s spare capacity to keep running it.' },
      { m: 'N' },
    ],
  },
]

/** Own media for the second two-column slot (Scale: dialect.mp4, 16:9): questions routed to experts become sources. */
function GapsToSources() {
  const q = ['Which suppliers are on hold?', 'What is our refund policy for B2B?', 'Who approves travel over budget?']
  return (
    <svg viewBox="0 0 1600 900" className="relative block aspect-video h-full min-h-full w-full md:min-h-0" role="img" aria-label="Unanswered questions go to an expert; their answer becomes a sourced document the agent cites next time.">
      <rect width="1600" height="900" fill="#f2f2f2" />
      {q.map((t, i) => (
        <g key={t} transform={`translate(120 ${220 + i * 170})`}>
          <rect width="440" height="110" rx="20" fill="#fff" />
          <text x="36" y="66" fontSize="28" fill="#212121">
            {t}
          </text>
        </g>
      ))}
      <g fill="none" stroke="#8a8a8a" strokeWidth="3">
        <path d="M560 275 C700 275 700 450 800 450" />
        <path d="M560 445 H800" />
        <path d="M560 615 C700 615 700 450 800 450" />
        <path d="M1040 450 H1160" strokeDasharray="10 10" />
      </g>
      <circle cx="920" cy="450" r="120" fill="#fff" />
      <text x="920" y="442" textAnchor="middle" fontSize="30" fill="#212121">
        Expert
      </text>
      <text x="920" y="482" textAnchor="middle" fontSize="22" fill="#8a8a8a">
        answers once
      </text>
      <g transform="translate(1180 300)">
        <rect width="300" height="300" rx="24" fill="#193a29" />
        <rect x="36" y="48" width="160" height="16" rx="8" fill="#fff" opacity=".9" />
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x="36" y={96 + i * 32} width={[228, 200, 228, 150, 190][i]} height="10" rx="5" fill="#fff" opacity=".35" />
        ))}
        <text x="36" y="270" fontSize="22" fill="#fff">
          New source
        </text>
      </g>
    </svg>
  )
}

export default function WorkflowPage({ workflow }: { workflow: Workflow }) {
  const [connect, ask, answer, improve] = workflow.steps
  return (
    // Vahue's navbar is sticky (88px, transparent at the top): pull the full-screen black hero up under it,
    // as Scale's overlay header sits over its hero.
    <div className={`${s.page} -mt-[88px] overflow-x-clip bg-black font-display text-white`}>
      <SmoothScroll />

      <Hero
        headline={workflow.headline}
        body={`${workflow.summary} No more answers that live in a few people’s heads.`}
        tools={workflow.tools}
      />

      <Intro
        heading="Keep every answer tied to its source."
        body="Most teams search five tools, then ask the one person who knows. Knowledge agents give staff one place to ask, and every answer cites the page or query behind it."
        sources={workflow.tools}
        steps={[
          {
            title: 'Connect Sources',
            body: `${connect.body} Nothing is copied into a new system, and each person still sees only what they could already open, wherever it lives today.`,
          },
          {
            title: 'Ask in Chat',
            body: `${ask.body} Staff ask in plain English and get an answer in seconds instead of waiting for the one expert who knows where it is.`,
          },
          {
            title: 'Answer + Cite',
            body: `${answer.body} Any figure can be traced back to the query that produced it and checked by a person before it is relied on.`,
          },
          {
            title: 'Learn + Improve',
            body: `${improve.body} Experts answer only new questions, and the sources grow from what staff actually ask, week after week.`,
          },
        ]}
      />

      <TwoColumn
        headingSpacer
        left={<h2 className={`${s.header4} !leading-9`}>{POSITIONING.line}</h2>}
        right={<p className="leading-6">{POSITIONING.promise}</p>}
        cta={CTA}
        ctaColumn="right"
      />

      <Stack
        title="Your sources stay. We answer from them."
        subtitle="Knowledge agents plug into the documents, wikis and databases you already run. No migration. No new tool to learn."
        cards={[
          { title: 'Your documents', body: 'Connect SharePoint, wikis and file shares with their existing permissions; every answer cites the page it came from.' },
          { title: 'Your databases', body: 'Snowflake and Power BI figures come from logged queries, so no number appears without a source you can trace.' },
          { title: 'Your chat tools', body: 'Staff ask in Slack, Teams or a browser and get sourced answers in seconds instead of waiting for an expert.' },
        ]}
      />

      <TrustCards
        heading="Chatbots are easy to set up and hard to trust. (That’s the part we handle.)"
        cards={[
          {
            title: 'Every answer, sourced',
            body: 'Each answer cites the documents or the logged query it came from, so staff can check it before they rely on it in front of a customer or a board.',
          },
          {
            title: 'Access rights respected',
            body: 'The agent only reads what the person asking could already open, across SharePoint, wikis and databases, so answers never widen anyone’s access.',
          },
          {
            title: 'Operated after launch',
            body: 'After the pilot we run the agents day to day: monitoring, accuracy reviews and model updates, with a monthly report read against the baseline.',
          },
        ]}
      />

      <Flywheel
        heading="The more it’s asked, the better it answers."
        body="Every question is logged, gaps go to the right expert, and their answers become new sources. The outcome: answers that keep improving, with no retraining rounds to run."
        labels={['Answers over time', 'The answer loop']}
        steps={[
          { title: 'Questions become data', body: 'Every question, answer and source is logged, so you see what staff actually ask.' },
          { title: 'Experts in the loop', body: 'Unanswered or low-confidence questions go to the right expert instead of a guess.' },
          { title: 'Gaps become sources', body: 'An expert’s answer becomes a sourced document; no manual retraining, no wait.' },
          { title: 'Answers keep improving', body: 'Better answers get used more. More use shows the next gaps. The loop keeps turning.' },
        ]}
      />

      <TwoColumn
        media={<GapsToSources />}
        left={<h2 className={`${s.header4} !leading-9`}>Your knowledge base grows out of the questions staff ask, not out of a documentation project.</h2>}
        right={
          <div className="leading-6">
            <p>Unanswered questions are logged and routed to the person who knows.</p>
            <p>
              Their answer becomes a sourced document the agent can cite the next time, so each expert answers a question
              once and the knowledge base fills the gaps that matter first, as independently as your controls allow.
            </p>
          </div>
        }
        cta={{ href: '/case-studies/piogroup-employee-assistant/', label: 'See a client result' }}
        ctaColumn="left"
      />

      <Differentiators
        title="Vahue Differentiators"
        capability="Capabilities"
        categories={['Vahue', 'Off-the-Shelf Chatbot', 'In-House Build', 'Enterprise Search']}
        rows={DIFF_ROWS}
      />

      <Integrations
        title="Security that clears your IT review"
        link={{ href: '/security/', label: 'See security standards +' }}
        badges={['Role-based access', 'Permission-aware answers', 'Full audit log', 'Your cloud or ours']}
        image="/img/careers/office-3.jpg"
      />

      <Results
        label={'Results from\nnamed clients'}
        items={cases.map((c) => ({ quote: c.summary, name: c.client, note: c.disclosure, metric: c.metric, href: `/case-studies/${c.slug}/` }))}
      />

      <Demo
        eyebrow=""
        title="See what knowledge agents change for your team"
        body="We’ll show you an agent on your own documents rather than a canned demo."
        cta={CTA}
        cards={PHASES.map((p) => ({ eyebrow: p.length, title: p.name, body: p.body }))}
      />

      <Faqs
        title="Frequently Asked Questions"
        cta={CTA}
        items={[
          {
            q: 'Who can see what?',
            a: <p>Answers respect each user’s access rights. The agent reads only what the person asking could already open, in every connected source.</p>,
          },
          {
            q: 'Where do the numbers come from?',
            a: <p>Every answer cites its sources, and no figure appears without a traceable, logged query against your own databases.</p>,
          },
          {
            q: 'Can it run in our own cloud?',
            a: <p>Yes. Deploy in your VPC or on-premises when data cannot leave, or in ours when it can, with the same controls either way.</p>,
          },
          { q: 'How do we start?', a: <p>{PHASES[0].body}</p> },
        ]}
      />

      <Blog
        heading="Keep reading"
        posts={[
          { href: '/blog/secure-llm-deployment-enterprise/', tag: 'AI & Machine Learning', title: 'Deploying LLMs Securely in Enterprise Environments' },
          { href: '/blog/claude-fable-5-agentic-ai/', title: 'What it feels like to work with Fable', image: '/img/blog/agentic-flexibility-assets.webp' },
          { href: '/blog/aeo-content-system/', title: 'Your Content Is Invisible to AI. Here Is the System That Fixes It.', image: '/img/blog/aeo-system-cover.png' },
          { href: '/blog/trumps-ai-order-decoded/', title: 'Trump’s AI order, decoded', image: '/img/blog/blog4.avif' },
          { href: '/blog/code-data-sources-for-llm-training/', tag: 'AI & ML', title: 'Evaluating Code Data Sources for Training Large Language Models', image: '/img/blog/blog2.jpg' },
        ]}
      />
    </div>
  )
}
