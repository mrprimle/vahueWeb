// Same shape as content.scale.ts. Keep rule: page and UI strings stay Scale's with the brand swapped. Tag slugs are
// Scale's routes, labels follow the site's menu mapping. Every post below is a placeholder for Mike's real posts.
import type { BlogContent } from './types'

export const content: BlogContent = {
  meta: {
    title: 'Blog | Vahue',
    description: 'Company updates and technology articles from Vahue.',
    categoryTitle: '{name} | Blog | Vahue',
    categoryDescription: 'Vahue blog posts about {name}.',
  },
  hero: {
    overtitle: 'Vahue',
    title: 'Blog',
    description: 'Company updates and technology articles from Vahue.',
  },
  ui: {
    all: 'All',
    more: 'More',
    searchAria: 'Search',
    search: 'Search...',
    shortcut: '⌘K',
    searchPlaceholder: 'Search posts...',
    cancel: 'Cancel',
    escape: 'Esc',
    noResultsBefore: 'No results for “',
    noResultsAfter: '”',
    recentPosts: 'Recent posts',
    resultOne: 'result',
    resultMany: 'results',
    navigate: '↑↓ Navigate',
    open: '↵ Open',
    searchHint: '⌘K to search',
    morePosts: 'More Posts',
    noResultsFound: 'No results found',
    loadMore: 'Load more',
  },
  tags: [
    { id: '5k7gs459lwdbH0j4AyeW8w', name: 'Testing & Evals', slug: 'testing-evals' },
    { id: '5k7gs459lwdbH0j4AyeWE0', name: 'Operations', slug: 'robotics' },
    { id: '5k7gs459lwdbH0j4AyeWJ4', name: 'Services', slug: 'global' },
    { id: '5k7gs459lwdbH0j4AyeWO8', name: 'Regulated', slug: 'defense' },
    { id: '5k7gs459lwdbH0j4AyeWTC', name: 'Voice Agents', slug: 'autonomous-vehicle' },
    { id: '7C11lhdHH1sdLwfCVL2wSS', name: 'Experts', slug: 'experts' },
    { id: 'c3959b44-8ace-404d-83a0-30bdfbe74162', name: 'Policy', slug: 'policy' },
    { id: 'category.company', name: 'Company', slug: 'company' },
    { id: 'category.customers', name: 'Customers', slug: 'customers' },
    { id: 'category.partnerships', name: 'Partnerships', slug: 'partnerships' },
    { id: 'category.product', name: 'Product', slug: 'product' },
    { id: 'category.research', name: 'Research', slug: 'research' },
    { id: 'z5xsJl35cVFkXOiyqJ9e3h', name: 'Healthcare', slug: 'healthcare' },
    { id: 'z5xsJl35cVFkXOiyqJ9e5X', name: 'Enterprise', slug: 'enterprise' },
    { id: 'z5xsJl35cVFkXOiyqJ9e7N', name: 'Scale-ups', slug: 'public-sector' },
    { id: 'ebb49f19-f5a1-4749-996f-a0868b73621b', name: 'Podcast', slug: 'podcast' },
    { id: 'd5035e24-2b55-4622-aea7-2ab7ff048b81', name: 'Data', slug: 'data' },
    // Scale's CMS lists Company and Research twice. These two slots hold the remaining segments, on their own routes.
    { id: '366d4c1c-0ee2-4a22-aa36-45f62f2e8725', name: 'Insurance', slug: 'insurance' },
    { id: 'df35d7fa-13b3-475a-98d6-3d4883f97f48', name: 'Revenue Teams', slug: 'revenue-teams' },
  ],
  bento: [
    { slug: 'expanding-forward-deployed-teams-for-operations-leaders', image: '/blog/tile-1.webp', alt: '', imageGradientOverlay: true, variantOverride: 'overlay' },
    { slug: 'introducing-shadow-mode', image: '/blog/tile-2-filled.webp', alt: '', imageGradientOverlay: true },
    { slug: 'long-term-investment-in-professional-services', image: '/blog/tile-3-filled.webp', alt: '', imageGradientOverlay: true },
    { slug: 'open-for-business-in-mid-market-insurance', image: '/blog/tile-4-filled.webp', alt: '', imageGradientOverlay: true },
    { slug: 'personalised-support-at-every-scale', image: '/blog/tile-5.webp', alt: '', imageGradientOverlay: true },
  ],
  posts: [
    { slug: 'expanding-forward-deployed-teams-for-operations-leaders', title: 'Vahue Expands Its Commitment to Scale-ups with a Forward-Deployed Team for Operations Leaders', category: { name: 'Company', slug: 'company' }, categories: ['company', 'enterprise'], date: '2026-10-30T17:23:00.000Z' }, // PLACEHOLDER
    { slug: 'introducing-shadow-mode', title: 'Introducing Shadow Mode', category: { name: 'Policy', slug: 'policy' }, categories: ['policy', 'product', 'testing-evals'], date: '2026-10-28T16:00:00.000Z' }, // PLACEHOLDER
    { slug: 'long-term-investment-in-professional-services', title: 'Vahue’s Long-term Investment in Professional Services', category: { name: 'Services', slug: 'global' }, categories: ['global', 'company'], date: '2026-10-28T10:30:00.000Z' }, // PLACEHOLDER
    { slug: 'open-for-business-in-mid-market-insurance', title: 'Vahue is Open for Business in Mid-market Insurance', category: null, categories: ['insurance'], date: '2026-10-26T11:45:00.000Z' }, // PLACEHOLDER
    { slug: 'personalised-support-at-every-scale', title: 'Personalised Support at Every Scale', category: { name: 'Policy', slug: 'policy' }, categories: ['policy', 'autonomous-vehicle', 'revenue-teams'], date: '2026-10-19T12:50:00.000Z' }, // PLACEHOLDER
    { slug: 'building-a-real-time-claims-agent-for-a-mid-market-insurer', title: 'How a Mid-market Insurer and Vahue Are Building a Real-Time Claims Agent With Baselines', category: null, categories: ['insurance', 'customers'], date: '2026-10-15T14:41:00.000Z' }, // PLACEHOLDER
    { slug: 'bringing-operated-agents-to-enterprises', title: 'Vahue Collaborates With Partners to Bring Operated Agents to Enterprises', category: { name: 'Company', slug: 'company' }, categories: ['company', 'enterprise', 'partnerships'], date: '2026-10-15T14:40:00.000Z' }, // PLACEHOLDER
    { slug: 'building-trust-in-the-exception-queue', title: 'Building Trust in the Exception Queue', category: { name: 'Policy', slug: 'policy' }, categories: ['policy', 'robotics'], date: '2026-10-06T16:24:00.000Z' }, // PLACEHOLDER
    { slug: 'operations-must-build-its-testing-power', title: 'To Steer the AI Workforce, Operations Must Build Its Testing Power', category: { name: 'Company', slug: 'company' }, categories: ['company', 'testing-evals'], date: '2026-09-25T10:30:00.000Z' }, // PLACEHOLDER
    { slug: 'deploying-enterprise-ai-agents-with-your-existing-stack', title: 'Deploying enterprise AI agents with Vahue and your existing stack', category: null, categories: ['enterprise', 'partnerships'], date: '2026-09-22T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'why-you-need-to-red-team-your-enterprise-ai', title: 'Why You Need to Red Team Your Enterprise AI', category: { name: 'Enterprise', slug: 'enterprise' }, categories: ['enterprise', 'testing-evals'], date: '2026-09-16T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'which-work-is-worth-routing-to-a-human', title: 'In An Agentic World Where Automation Gets Cheap, Which Work Is Worth Routing to a Human?', category: { name: 'Enterprise', slug: 'enterprise' }, categories: ['enterprise', 'robotics', 'experts', 'podcast', 'revenue-teams'], date: '2026-09-15T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'building-ai-fluency-one-team-at-a-time', title: 'Ops: Building AI Fluency, One Cohort at a Time', category: null, categories: ['experts'], date: '2026-08-25T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'how-professional-firms-scale-expertise', title: 'How Professional Firms Scale Expertise', category: { name: 'Services', slug: 'global' }, categories: ['global', 'experts'], date: '2026-08-17T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'the-cost-of-control-agent-costs', title: 'The Cost of Control: Untangling the Myth and Realities of Agent Costs', category: { name: 'Services', slug: 'global' }, categories: ['global', 'data'], date: '2026-08-06T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'opening-the-forward-deployed-practice', title: 'Vahue Opens Its Forward-Deployed Practice to Lead Next Phase of Company’s Growth', category: { name: 'Company', slug: 'company' }, categories: ['company', 'public-sector'], date: '2026-07-30T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'scale-up-ai-strategy-to-production', title: 'Scale-up AI: Strategy to Production', category: { name: 'Scale-ups', slug: 'public-sector' }, categories: ['public-sector'], date: '2026-07-22T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'from-pilot-to-production-back-office-automation', title: 'From Pilot to Production: Vahue Takes Over a Stalled Back-office Automation', category: { name: 'Company', slug: 'company' }, categories: ['company', 'robotics', 'public-sector', 'customers'], date: '2026-07-16T15:00:00.000Z' }, // PLACEHOLDER
    { slug: 'exception-reports-diagnosing-agent-failures', title: 'Exception Reports: Diagnosing Agent Failures', category: { name: 'Research', slug: 'research' }, categories: ['research', 'testing-evals', 'product'], date: '2026-07-16T14:00:00.000Z' }, // PLACEHOLDER
    { slug: 'ai-decision-advantage-in-regulated-lending', title: 'AI Decision Advantage in Regulated Lending', category: { name: 'Regulated', slug: 'defense' }, categories: ['defense', 'policy'], date: '2026-07-16T13:00:00.000Z' }, // PLACEHOLDER
    { slug: 'regional-health-network-reliable-ai-for-better-healthcare', title: 'Regional Health Network + Vahue: Reliable AI for Better Healthcare', category: { name: 'Enterprise', slug: 'enterprise' }, categories: ['enterprise', 'healthcare', 'defense', 'customers'], date: '2026-07-15T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'document-first-ai-building-from-the-ground-up', title: 'Document-First AI: Building From the Ground Up', category: { name: 'Services', slug: 'global' }, categories: ['global', 'data', 'insurance'], date: '2026-07-08T12:00:00.000Z' }, // PLACEHOLDER
    { slug: 'advancing-ai-evaluation-for-claims-intake', title: 'Vahue Partners with a Mid-market Insurer to Advance AI Evaluation for Claims Intake', category: { name: 'Policy', slug: 'policy' }, categories: ['policy', 'research', 'insurance', 'partnerships'], date: '2026-07-07T13:00:00.000Z' }, // PLACEHOLDER
    { slug: 'agents-can-now-improve-other-agents', title: 'Agents Can Now Improve Other Agents', category: { name: 'Research', slug: 'research' }, categories: ['research', 'podcast', 'autonomous-vehicle', 'product'], date: '2026-07-07T12:00:00.000Z' }, // PLACEHOLDER
  ],
}
