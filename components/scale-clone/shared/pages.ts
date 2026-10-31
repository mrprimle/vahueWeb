// Every page in scale.com's top navigation, in menu order. Each one is cloned at /scale-clone/<slug>.
export type ClonePage = { slug: string; label: string; source: string; group: CloneGroup; section?: string }
export type CloneGroup = 'Products' | 'Solutions' | 'Research' | 'Resources'

export const CLONE_GROUPS: CloneGroup[] = ['Products', 'Solutions', 'Research', 'Resources']

export const CLONE_PAGES: ClonePage[] = [
  { slug: 'data-engine', label: 'Scale Data Engine', source: 'https://scale.com/data-engine', group: 'Products', section: 'Data' },
  { slug: 'generative-ai-data-engine', label: 'For Generative AI', source: 'https://scale.com/generative-ai-data-engine', group: 'Products', section: 'Data' },
  { slug: 'physical-ai', label: 'For Physical AI', source: 'https://scale.com/physical-ai', group: 'Products', section: 'Data' },
  { slug: 'public-sector-data-engine', label: 'For Government', source: 'https://scale.com/public-sector-data-engine', group: 'Products', section: 'Data' },
  { slug: 'automotive', label: 'For Automotive', source: 'https://scale.com/automotive', group: 'Products', section: 'Data' },
  { slug: 'rlenvironments', label: 'RL Environments', source: 'https://scale.com/rlenvironments', group: 'Products', section: 'Data' },
  { slug: 'experts', label: 'Experts', source: 'https://scale.com/experts', group: 'Products', section: 'Data' },
  { slug: 'genai-portfolio', label: 'Scale GenAI Portfolio', source: 'https://scale.com/genai-portfolio', group: 'Products', section: 'Applications' },
  { slug: 'donovan', label: 'Scale Donovan', source: 'https://scale.com/donovan', group: 'Products', section: 'Applications' },
  { slug: 'evaluation-model-developers', label: 'For Model Developers', source: 'https://scale.com/evaluation/model-developers', group: 'Products', section: 'Evaluation' },
  { slug: 'evaluation-public-sector', label: 'For Public Sector', source: 'https://scale.com/evaluation/public-sector', group: 'Products', section: 'Evaluation' },
  { slug: 'evaluation-enterprise', label: 'For Enterprise', source: 'https://scale.com/evaluation/enterprise', group: 'Products', section: 'Evaluation' },
  { slug: 'enterprise', label: 'Enterprise', source: 'https://scale.com/enterprise', group: 'Solutions' },
  { slug: 'public-sector', label: 'US Public Sector', source: 'https://scale.com/public-sector', group: 'Solutions' },
  { slug: 'global-public-sector', label: 'Global Public Sector', source: 'https://scale.com/global-public-sector', group: 'Solutions' },
  { slug: 'enterprise-insurance', label: 'Insurance', source: 'https://scale.com/enterprise/insurance', group: 'Solutions' },
  { slug: 'enterprise-healthcare', label: 'Healthcare', source: 'https://scale.com/enterprise/healthcare', group: 'Solutions' },
  { slug: 'public-sector-national-security', label: 'National Security', source: 'https://scale.com/public-sector/national-security', group: 'Solutions' },
  { slug: 'labs-papers', label: 'Research Papers', source: 'https://labs.scale.com/papers', group: 'Research' },
  { slug: 'labs-leaderboard', label: 'Frontier Leaderboards', source: 'https://labs.scale.com/leaderboard', group: 'Research' },
  { slug: 'labs', label: 'Labs', source: 'https://labs.scale.com/', group: 'Research' },
  { slug: 'labs-blog', label: 'Research Blog', source: 'https://labs.scale.com/blog', group: 'Research' },
  { slug: 'labs-jobs', label: 'Research Careers', source: 'https://labs.scale.com/jobs', group: 'Research' },
  { slug: 'about', label: 'About', source: 'https://scale.com/about', group: 'Resources' },
  { slug: 'security', label: 'Security', source: 'https://scale.com/security', group: 'Resources' },
  { slug: 'guides', label: 'Guides', source: 'https://scale.com/guides', group: 'Resources' },
  { slug: 'careers', label: 'Careers', source: 'https://scale.com/careers', group: 'Resources' },
  { slug: 'demo', label: 'Contact us', source: 'https://scale.com/demo', group: 'Resources' },
  { slug: 'blog', label: 'Blog', source: 'https://scale.com/blog', group: 'Resources' },
  { slug: 'events', label: 'Events', source: 'https://scale.com/events', group: 'Resources' },
  { slug: 'docs', label: 'Documentation', source: 'https://scale.com/docs', group: 'Resources' },
  { slug: 'partnership', label: 'Partnerships', source: 'https://scale.com/partnership', group: 'Resources' },
]

export const clonePath = (slug: string) => `/scale-clone/${slug}`
