// Placeholder index data for the scale.com/blog clone. TODO: Vahue copy (titles, categories, dates).
// Title lengths roughly track Scale's so line counts and wrapping match.

export type Category = { slug: string; name: string }

// Scale shows 19 filter tags (the CMS list repeats two of them); first 5 are inline on desktop, the rest sit in "More".
export const CATEGORIES: Category[] = [
  { slug: 'methods-evals', name: 'Methods & Evals' },
  { slug: 'fieldwork', name: 'Fieldwork' },
  { slug: 'global', name: 'Global' },
  { slug: 'strategy', name: 'Strategy' },
  { slug: 'operations-teams', name: 'Operations Teams' },
  { slug: 'experts', name: 'Experts' },
  { slug: 'policy', name: 'Policy' },
  { slug: 'company', name: 'Company' },
  { slug: 'customers', name: 'Customers' },
  { slug: 'partnerships', name: 'Partnerships' },
  { slug: 'product', name: 'Product' },
  { slug: 'research', name: 'Research' },
  { slug: 'healthcare', name: 'Healthcare' },
  { slug: 'enterprise', name: 'Enterprise' },
  { slug: 'public-sector', name: 'Public Sector' },
  { slug: 'podcast', name: 'Podcast' },
  { slug: 'data', name: 'Data' },
  { slug: 'insights', name: 'Insights' },
  { slug: 'notes', name: 'Notes' },
]

const cat = (slug: string) => CATEGORIES.find((c) => c.slug === slug) ?? null

export type Post = {
  slug: string
  title: string
  date: string
  category: Category | null
}

let n = 0
const p = (title: string, date: string, category: string | null): Post => ({
  slug: `placeholder-post-${++n}`,
  title,
  date,
  category: category ? cat(category) : null,
})

// First 5 feed the bento (4 on < 1024px, where the 5th drops into the list as on Scale).
export const POSTS: Post[] = [
  p('Placeholder Expands Its Commitment to Learning with a National Teacher Credential Launch in Springfield', 'Oct 2026', 'company'),
  p('Introducing PlaceCheck', 'Oct 2026', 'policy'),
  p("Placeholder's Long-term Investment in Region", 'Oct 2026', 'global'),
  p('Placeholder is Open for Business in the Region', 'Oct 2026', null),
  p('Personalised Learning at National Placeholder', 'Oct 2026', 'policy'),
  p('How a Global Placeholder Company and Partner Are Building a Real-Time Copilot With Models', 'Oct 2026', null),
  p('Placeholder Collaborates With a Partner to Bring New Models to Enterprises', 'Oct 2026', 'company'),
  p('Building Trust at the Placeholder', 'Oct 2026', 'policy'),
  p('To Steer the Placeholder Frontier, Regulators Must Build Their Testing Power', 'Sep 2026', 'company'),
  p('Deploying enterprise placeholder agents with a cloud partner', 'Sep 2026', null),
  p('Why You Need to Stress Test Your Enterprise Systems', 'Sep 2026', 'enterprise'),
  p('In A World Where Automation Gets Cheap, Which Placeholder Work Is Worth Routing to a Human?', 'Sep 2026', 'enterprise'),
  p('PLACE: Building Placeholder Fluency, One Cohort at a Time', 'Aug 2026', null),
  p('How Public Institutions Scale Placeholder Expertise', 'Aug 2026', 'global'),
  p('The Cost of Control: Untangling the Myth and Realities of Sovereign Placeholders', 'Aug 2026', 'global'),
  p('A Field Guide to Placeholder Evaluation for Busy Teams', 'Aug 2026', 'methods-evals'),
  p('What We Learned Shipping Placeholder Agents to Production', 'Jul 2026', 'product'),
  p('Placeholder Research Notes: Measuring Reasoning at the Edge', 'Jul 2026', 'research'),
  p('Partnering With Placeholder Institutions on Safer Rollouts', 'Jul 2026', 'partnerships'),
  p('The Placeholder Podcast: Building Data Teams That Last', 'Jun 2026', 'podcast'),
  p('Inside the Placeholder Expert Network', 'Jun 2026', 'experts'),
  p('Placeholder in Healthcare: From Pilot to Daily Practice', 'Jun 2026', 'healthcare'),
  p('A Public Sector Playbook for Placeholder Adoption', 'May 2026', 'public-sector'),
  p('How Customers Use Placeholder Data to Ship Faster', 'May 2026', 'customers'),
  p('Placeholder Fieldwork: Notes From the Last Mile', 'May 2026', 'fieldwork'),
  p('Placeholder Strategy for the Next Decade of Systems', 'Apr 2026', 'strategy'),
  p('Operations Teams and the New Placeholder Workflow', 'Apr 2026', 'operations-teams'),
  p('Data Quality Is a Placeholder Problem, Not a Volume Problem', 'Apr 2026', 'data'),
]

// scale.com bento slots (module 189756): variant, grid area, entrance origin, category swatch.
// On /blog the first two tiles render as "overlay" (full-bleed image + top/bottom gradient, 32/38 title);
// the rest are "caption" (full-bleed image + bottom gradient, medium title sized by container width).
export type Slot = {
  variant: 'overlay' | 'caption'
  gridArea: string
  scaleOrigin: string
  swatch: string
}

export const SLOTS: Slot[] = [
  { variant: 'overlay', gridArea: '1 / 1 / 5 / 3', scaleOrigin: 'left center', swatch: '#C4B8D4' },
  { variant: 'overlay', gridArea: '1 / 3 / 6 / 5', scaleOrigin: 'right center', swatch: '#1D4133' },
  { variant: 'caption', gridArea: '5 / 1 / 7 / 3', scaleOrigin: 'left center', swatch: '#5A6B85' },
  { variant: 'caption', gridArea: '6 / 3 / 7 / 4', scaleOrigin: 'center center', swatch: '#A07862' },
  { variant: 'caption', gridArea: '6 / 4 / 7 / 5', scaleOrigin: 'right center', swatch: '#A3BED8' },
]

// Neutral stand-ins for the cover images (TODO: Vahue imagery). Dark enough that Scale's white titles read.
export const THUMBS = [
  'linear-gradient(135deg, #3a3a3a 0%, #1f1f1f 100%)',
  'linear-gradient(160deg, #4a4a4a 0%, #262626 100%)',
  'linear-gradient(120deg, #555 0%, #2b2b2b 100%)',
  'linear-gradient(150deg, #474747 0%, #232323 100%)',
  'linear-gradient(140deg, #5c5c5c 0%, #2e2e2e 100%)',
]
