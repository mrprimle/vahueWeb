// Copy for /events. Keep first: page strings stay as Scale's, brand words swap. Same shape as content.scale.ts.
// Scale lists real third-party conferences with niche topics, so every event below is an invented stand-in on scale-up B2B AI
// automation, in the same slot, format and length. Names, dates and blurbs are PLACEHOLDER lines: Mike replaces them with real events.
// Scale's 75 past events become 11: with the 13 upcoming slots that is the brief's cap of 24, and 11 > 6 keeps "Show more events" working.
import type { EventsContent, PastEvent, UpcomingEvent } from './types'

const up = (href: string, dateLabel: string, title: string, description: string): UpcomingEvent => ({
  href,
  typeLabel: 'Conference',
  dateLabel,
  title,
  description,
  ctaLabel: 'Learn more',
})

const past = (id: string, href: string, dateLabel: string, title: string, description: string): PastEvent => ({
  id,
  href,
  dateLabel,
  typeLabel: 'Conference',
  title,
  description,
  ctaLabel: 'Learn more',
})

export const content: EventsContent = {
  meta: {
    title: 'AI Events & Conferences | Vahue',
    description: "Connect, engage, and learn from the world's top experts on AI & Machine Learning.",
  },
  intro: {
    title: 'Events',
    body: "Connect, engage, and learn from the world's top experts on AI & Machine Learning.",
  },
  upcoming: [
    up('/public-sector-data-engine', 'November 5, 2026', 'RevOps Day', 'An annual event that brings together visionary leaders from sales, finance, and technology'), // PLACEHOLDER
    up('/generative-ai-data-engine', 'November 6, 2026', 'Back Office North America', 'An operations event in New York focused on back-office automation and AI, bringing together COOs and technology leaders.'), // PLACEHOLDER
    up('/demo', 'November 8, 2026', 'Vahue at Ops Summit 2026', 'Join Vahue at Ops Summit 2026. See how the world’s busiest teams run reliable, measured AI.'), // PLACEHOLDER
    up('/enterprise', 'November 8, 2026', 'Ops Summit', 'Ops Summit brings together the global operations community to explore the latest innovations, ideas, and opportunities shaping the future of scale-ups.'), // PLACEHOLDER
    up('/evaluation/model-developers', 'November 9, 2026', 'AgentConf', 'An annual practitioner conference at the intersection of operations and machine learning, covering theory and practice of agent evals.'), // PLACEHOLDER
    up('/physical-ai', 'November 30, 2026', 'Intake Forum', 'Intake Forum is the world’s largest claims, invoice, and document conference'), // PLACEHOLDER
    up('/donovan', 'November 30, 2026', 'Support Ops Week', 'Support Ops Week will bring together the global support community for a week of innovation, learning, and collaboration'), // PLACEHOLDER
    up('/automotive', 'December 1, 2026', 'CFO Forum', 'The Finance Leaders Forum (CFO Forum) is a peer-led retreat where leaders assess month-end close, reporting, and automation in an evolving global landscape.'), // PLACEHOLDER
    up('/public-sector/national-security', 'December 1, 2026', 'Global Banking Ops Summit', 'The Global Banking Ops Summit is an elite forum where COOs and policymakers debate the macroeconomic, regulatory, and tech forces reshaping the future of finance.'), // PLACEHOLDER
    up('/genai-portfolio', 'December 6, 2026', 'Agents 2026', 'Agents 2026 is the world’s leading practitioner conference for AI and machine learning, gathering global engineers to share breakthroughs in production agent systems.'), // PLACEHOLDER
    up('/public-sector', 'December 7, 2026', 'Scale-up Finance Week 2026', 'Scale-up Finance Week is the sector’s premier operator summit, uniting global leaders to drive dialogue on AI, close automation, and sustainable finance.'), // PLACEHOLDER
    up('/data-engine', 'December 15, 2026', 'Applied AI Forum, Berlin', 'Applied AI Forum is a leading global forum uniting tech giants, startups, and researchers to tackle AI’s biggest challenges in governance and real-world deployment.'), // PLACEHOLDER
    up('/public-sector-data-engine', 'Date TBD', 'Retail AI Forum', 'A global festival in London where innovation in AI and retail operations converge to explore new possibilities and opportunities.'), // PLACEHOLDER
  ],
  past: {
    title: 'Past Events',
    body: 'Explore highlights and recordings from our previous events.',
    showMoreLabel: 'Show more events',
    events: [
      past('ops-forum-berlin', '/public-sector', 'October 26, 2026', 'Ops Forum, Berlin', 'The Future Operations Initiative convenes global leaders, investors, and operators in Berlin to shape the future of the global economy.'), // PLACEHOLDER
      past('ai-festival-amsterdam', '/enterprise', 'October 26, 2026', 'AI Festival, Amsterdam', 'AI Festival in Amsterdam brings together innovators, leaders, and AI pioneers to explore the technologies, ideas, and opportunities shaping the future of business.'), // PLACEHOLDER
      past('cx-annual-convention', '/donovan', 'October 25, 2026', 'CX Annual Convention', 'Get tangible solutions in just three days at CX Annual Convention.'), // PLACEHOLDER
      past('claims-expo', '/enterprise/insurance', 'October 20, 2026', 'Claims Expo', 'The Middle East’s leading biennial international exhibition for claims, policy, and underwriting teams'), // PLACEHOLDER
      past('portfolio-operators-forum', '/global-public-sector', 'October 19, 2026', 'Portfolio Operators Forum New York', 'The Portfolio Operators Forum is recognized as the premier global event for the community of operating and value-creation professionals'), // PLACEHOLDER
      past('fintech-ops-usa', '/automotive', 'October 18, 2026', 'Fintech Ops USA', 'The only event you need to connect, learn and do business in the world of fintech and payments.'), // PLACEHOLDER
      past('coo-forum', '/enterprise', 'October 12, 2026', 'COO Forum', 'The primary professional development forum and technology showcase for U.S. operations leaders and the global services industry.'), // PLACEHOLDER
      past('evals-2026', '/evaluation/enterprise', 'October 6, 2026', 'Evals 2026', 'Evals is a practitioner venue focused on the study of agent evaluation.'), // PLACEHOLDER
      past('retail-ops-fall', '/public-sector-data-engine', 'September 29, 2026', 'Retail Ops Fall', 'Join thousands of retail change makers in Nashville to strategize, connect, and future-proof your business'), // PLACEHOLDER
      past('insurtech-vegas', '/enterprise/insurance', 'September 29, 2026', 'Insurtech Vegas', 'The world’s largest insurance innovation conference, bringing together 9,000+ professionals across insurtech, P&C, life, and benefits.'), // PLACEHOLDER
      past('payments-ops-2026', '/automotive', 'September 28, 2026', 'Payments Ops 2026', 'The flagship annual conference for the global finance community, focusing on payments, reconciliation, cash management, and close.'), // PLACEHOLDER
    ],
  },
}
