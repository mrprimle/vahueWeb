import { guides } from '@/lib/guides'
import { vahueBlogPosts } from '@/components/blog/vahue-blog-content'
import type { LabsHomeContent } from '@/components/templates/labs/content'
import type { LabsPaper, LabsPapersContent } from '@/components/templates/labs-papers/content'
import type { LabsBlogContent, LabsBlogPost } from '@/components/templates/labs-blog/content'
import type { LabsJobsContent } from '@/components/templates/labs-jobs/content'
import type { LabsLeaderboard, LabsLeaderboardContent, LabsScore } from '@/components/templates/labs-leaderboard/content'
import type { LabsSearchItem } from '@/components/templates/labs-shared/LabsSearch'

/*
 * Content for the /labs routes (templates components/templates/labs*, specs reference-snapshots/scale-clone/labs*.md).
 * Real items only:
 *   - research counts: HANDOFF.md "Research summary", Vahue's analysis of 87 agency records. They are measured counts,
 *     not placeholder metrics. The two boards are the only ranked sets the summary holds.
 *   - papers and blog rows: the guide in lib/guides.ts and the six posts in components/blog/vahue-blog-content.ts.
 *     Excerpts, authors and covers are copied from app/blog/[slug]/page.tsx.
 *   - jobs: the one vacancy (components/careers/VacanciesPage.tsx). Its date is when the page first entered this repo.
 * Copy written for these pages is marked `// page copy`.
 */

const POST_META: Record<string, { excerpt: string; author: string; image: string }> = {
  'aeo-content-system': {
    excerpt: 'A practical AEO playbook for making articles, guides, case studies, and product pages easier for ChatGPT, Gemini, Google AI Overviews, Perplexity, Claude, and other AI engines to understand, cite, and remember your business.',
    author: 'Mike Doroshenko',
    image: '/img/blog/aeo-system-cover.png',
  },
  'claude-fable-5-agentic-ai': {
    excerpt: 'Claude Fable 5 is a new Mythos-class model for long-horizon agentic work. I tested the shift on the recent Nvidia\'s "Hack for Impact" hackathon in London — PowerRanger, an EV fleet flexibility agent. While getting a win in the Economics category, got a few quirks.',
    author: 'Mike Doroshenko',
    image: '/img/blog/agentic-flexibility-assets.webp',
  },
  'trumps-ai-order-decoded': {
    excerpt: 'A plain-English read of the June 2026 Executive Order on advanced AI innovation and security: the 30-day cyber sprint, voluntary frontier-model framework, and explicit bar on AI model licensing.',
    author: 'Mike Doroshenko',
    image: '/img/blog/blog4.avif',
  },
  'secure-llm-deployment-enterprise': {
    excerpt: 'A practical guide to integrating large language models with sensitive business data while staying compliant and secure.',
    author: 'Vahue Team',
    image: '/img/blog/blog1.jpg',
  },
  'code-data-sources-for-llm-training': {
    excerpt: 'A practical comparison of the major code dataset sources — from open-source repos to dedicated coding teams — and how to choose the right one.',
    author: 'Vahue Team',
    image: '/img/blog/blog2.jpg',
  },
  'human-written-code-llm-training': {
    excerpt: 'Why human-authored code remains essential for building reliable coding assistants — and where synthetic data falls short.',
    author: 'Vahue Team',
    image: '/img/blog/blog3.png',
  },
}

const ymd = (d: string) => d.slice(0, 10)
// Numeric parts from the string, so server and client print the same date in any timezone.
const slashDate = (d: string) => {
  const [y, m, day] = ymd(d).split('-').map(Number)
  return `${m}/${day}/${y}`
}
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const longDate = (d: string) => {
  const [y, m, day] = ymd(d).split('-').map(Number)
  return `${MONTHS[m - 1]} ${day}, ${y}`
}

const blogRows: LabsBlogPost[] = vahueBlogPosts.map((p) => ({
  _id: p.slug,
  title: p.title,
  slug: p.slug,
  date: ymd(p.date ?? ''),
  categories: p.category ? [p.category.name] : [],
  authorNames: [POST_META[p.slug].author],
  intro: POST_META[p.slug].excerpt,
  href: `/blog/${p.slug}/`,
}))

const paperRows: LabsPaper[] = [
  ...vahueBlogPosts.map((p) => ({
    _id: `post-${p.slug}`,
    title: p.title,
    slug: p.slug,
    date: slashDate(p.date ?? ''),
    dateSort: p.date ?? '',
    categories: p.category ? [p.category.name] : [],
    authors: POST_META[p.slug].author,
    authorNames: [POST_META[p.slug].author],
    image: POST_META[p.slug].image,
    href: `/blog/${p.slug}/`,
  })),
  ...guides.map((g) => ({
    _id: `guide-${g.slug}`,
    title: g.title,
    slug: g.slug,
    date: slashDate(g.dateISO),
    dateSort: `${g.dateISO}T12:00:00.000Z`,
    categories: [g.category],
    authors: g.author,
    authorNames: [g.author],
    image: '/img/guides/skills1.png',
    href: `/guides/${g.slug}/`,
  })),
].sort((a, b) => b.dateSort.localeCompare(a.dateSort))

const RECORDS = 87

// Research counts (HANDOFF.md). `href` is the workflow page that answers each job.
const JOBS = [
  { label: 'Cross-system back-office sync', count: 18, href: '/automations/back-office-sync/' },
  { label: 'Document intake', count: 17, href: '/automations/document-intake/' },
  { label: 'Knowledge Q&A', count: 14, href: '/automations/knowledge-agents/' },
  { label: 'Support and voice agents', count: 12, href: '/automations/support-agents/' },
  { label: 'Scoring and decisions', count: 11, href: '/automations/scoring-decisions/' },
  { label: 'Engineering enablement', count: 5, href: '/automations/engineering-enablement/' },
]
const TRIGGERS = [
  { label: 'Volume outgrew the team', count: 13 },
  { label: 'Stalled PoC or RPA', count: 9 },
  { label: 'Avoid hiring', count: 7 },
]

// Scale's bar palette, assigned by row (the template colours bars by a `company` code found in colorConfig).
const BAR_COLORS = ['#E27553', '#65C2B9', '#598DD2', '#E09A3B', '#A37CAD', '#E072AF']
const row = (label: string, count: number, i: number, display: string, tip: string): LabsScore => ({
  model: label,
  rank: i + 1,
  score: count,
  confidenceInterval_upper: 0,
  contaminationMessage: '',
  company: `row${i}`,
  isNew: false,
  deprecated: false,
  maxScore: RECORDS,
  display,
  tip,
})

const BOARDS: LabsLeaderboard[] = [
  {
    id: 'top-jobs',
    name: 'Top Jobs', // page copy
    description: `The jobs companies hire AI automation agencies to do, ranked by how many of the ${RECORDS} records name each one.`, // page copy
    category: 'jobs',
    deprecated: false,
    isSinglePage: false,
    icon: '',
    rows: JOBS.length,
    href: '/automations/',
    cta: 'See the six workflows', // page copy
    scores: JOBS.map((j, i) => row(j.label, j.count, i, `${j.count}/${RECORDS}`, `${j.count} of ${RECORDS} records`)),
  },
  {
    id: 'triggers',
    name: 'Triggers', // page copy
    description: 'What pushed companies to act, ranked by the number of records that name each trigger.', // page copy
    category: 'triggers',
    deprecated: false,
    isSinglePage: false,
    icon: '',
    rows: TRIGGERS.length,
    href: '/docs/#audit',
    cta: 'See how an Audit starts', // page copy
    scores: TRIGGERS.map((t, i) => row(t.label, t.count, i, String(t.count), `${t.count} records`)),
  },
]

export const vahueLabsLeaderboard: LabsLeaderboardContent = {
  capturedAt: '2026-11-01',
  categories: BOARDS,
  colorConfig: BAR_COLORS.map((color, i) => ({ code: `row${i}`, name: `row${i}`, color })),
  copy: {
    route: '/labs/leaderboard/',
    tabs: [
      { v: 'all', label: 'All' },
      { v: 'jobs', label: 'Jobs' },
      { v: 'triggers', label: 'Triggers' },
    ],
    hero: {
      overtitle: '[LEADERBOARDS]',
      title: 'what AI automation is hired for.', // page copy
      body: `Vahue's analysis of ${RECORDS} agency records: the jobs and the triggers behind them`, // page copy
      cta: 'Start Exploring',
      stats: [
        { label: 'Boards', value: String(BOARDS.length), body: 'The jobs companies hire agencies for, and the triggers that made them act.' }, // page copy
        { label: 'Records analysed', value: String(RECORDS), body: '9 EPAM cases, 11 Ciklum cases, plus 50 Clutch reviews and 17 case studies from 12 agencies.' }, // page copy
      ],
    },
    about: [
      // page copy, from HANDOFF.md "Research summary"
      { title: 'How we counted', body: `Vahue read ${RECORDS} published records: 9 EPAM cases, 11 Ciklum cases, and 50 Clutch reviews plus 17 case studies from 12 agencies ranked on Clutch and G2.` },
      { title: 'What a count means', body: 'A count is the number of records that name a job or trigger. It shows what agencies publish and clients review, not market share.' },
      { title: 'What the records leave out', body: 'Agencies rarely publish a baseline, handover is the top complaint, and almost nobody runs the agents after launch. That is why Vahue measures from day one.' },
    ],
    deprecatedLabel: 'Show Deprecated Leaderboards',
    deprecatedInfo: '',
    evaluate: {
      title: '[MEASURE YOUR WORKFLOW]', // page copy
      before: 'If you would like your own workflow measured, please contact ', // page copy
      email: 'human@vahue.ai',
      after: '. Every engagement starts with a two-week Audit that records the baseline: volume, minutes per item, error rate and cost.', // page copy, from PHASES
      button: 'Request an Audit', // page copy
      dialogTitle: 'Request an Audit', // page copy
      messagePlaceholder: 'Which workflow would you like measured?*', // page copy
      success: 'Your email app should now hold a draft to human@vahue.ai. Send it and a person will reply.', // page copy
      privacyHref: '/privacy-policy/',
    },
  },
}

const Wordmark = (
  <svg viewBox="0 0 834 115" role="img" aria-label="Vahue research" className="w-full max-w-[834px] h-auto">
    <circle cx="38" cy="62" r="38" fill="currentColor" />
    <text x="98" y="92" fontSize="104" fontWeight="700" fill="currentColor" textLength="726" lengthAdjust="spacingAndGlyphs">
      vahue research
    </text>
  </svg>
)

export const vahueLabsHome: LabsHomeContent = {
  hero: {
    logo: Wordmark,
    title: 'Research on Real AI Automation', // page copy
    body: `Vahue studies how AI automation works in practice. From ${RECORDS} agency records, we rank the jobs companies hire agents for and the triggers behind them.`, // page copy
  },
  leaderboards: {
    title: '[LEADERBOARDS]',
    intro: `Top jobs: Vahue's analysis of ${RECORDS} agency records`, // page copy
    items: JOBS.map((j) => ({ name: j.label, href: j.href, value: `${j.count}/${RECORDS}` })),
    more: '/leaderboard',
  },
  papers: {
    title: '[PAPERS]',
    intro: 'Guides and articles from the Vahue team covering agents, AI search, AI policy, secure deployment and the data behind coding models.', // page copy
    items: paperRows.slice(0, 6).map((p) => ({ date: p.date, title: p.title, categories: p.categories.join(', '), authors: p.authors, href: p.href, image: p.image })),
    more: '/papers',
  },
  blog: {
    title: '[BLOG]',
    intro: 'Insights, analysis, and updates from Vahue', // page copy
    posts: blogRows.map((p) => ({ category: p.categories[0], date: longDate(p.date), title: p.title, intro: p.intro ?? '', href: p.href ?? '' })),
  },
  jobs: {
    title: '[Jobs]',
    items: [{ date: '07.31.2026', title: 'Senior SMM', location: 'Fully remote', href: '/careers/senior-smm/' }],
    more: '/jobs',
  },
}

export const vahueLabsPapers: LabsPapersContent = {
  title: '[Papers]',
  intro: 'Guides and articles from the Vahue team covering agents, AI search, AI policy, secure deployment and the data behind coding models.', // page copy
  noun: 'publication', // page copy
  papers: paperRows,
}

export const vahueLabsBlog: LabsBlogContent = {
  title: '[Blog]',
  intro: 'Insights, analysis, and updates from Vahue on AI agents, AI search, policy and secure deployment.', // page copy
  posts: blogRows,
}

export const vahueLabsJobs: LabsJobsContent = {
  capturedAt: '2026-11-01',
  title: '[Jobs]',
  intro: 'Open positions at Vahue. Join us in running the busiest workflows of growing companies with AI agents.', // page copy
  empty: 'No open positions at the moment. Check back soon.',
  greenhouseJobs: [{ id: 1, title: 'Senior SMM', updated_at: '2026-07-31T12:00:00.000Z', location: { name: 'Fully remote' }, absolute_url: '/careers/senior-smm/' }],
  fallbackJobs: [],
}

export const vahueLabsSearch: LabsSearchItem[] = [
  ...paperRows.map((p) => ({ kind: '[PAPERS]', title: p.title, href: p.href, snippet: `${p.categories.join(', ')} ${p.date} ${p.authors}` })),
  ...JOBS.map((j) => ({ kind: '[LEADERBOARDS]', title: `Top Jobs: ${j.label}`, href: j.href, snippet: `${j.count} of ${RECORDS} records` })),
  ...TRIGGERS.map((t) => ({ kind: '[LEADERBOARDS]', title: `Triggers: ${t.label}`, href: '/labs/leaderboard/', snippet: `${t.count} records` })),
  ...blogRows.map((p) => ({ kind: '[BLOG]', title: p.title, href: p.href ?? '', snippet: p.intro ?? '' })),
  { kind: '[JOBS]', title: 'Senior SMM', href: '/careers/senior-smm/', snippet: 'Fully remote' },
]
