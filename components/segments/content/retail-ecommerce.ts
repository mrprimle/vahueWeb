import type { SegmentContent } from '../types'

export const retailEcommerceContent: SegmentContent = {
  slug: '/industries/retail-ecommerce',
  code: 'I-04',
  eyebrow: 'Retail & eCommerce',
  title: 'Make your catalog, inventory, and stores AI-agent ready.',
  oneLiner:
    'We modernize retail stacks so agents — yours and your customers\' — can safely read inventory, catalog, pricing, and logistics in real time, and turn commerce into a reliable autonomous channel.',
  heroIntro:
    'From agent-ready digital shelves and APIs to edge intelligence in stores, and from merchandising and search copilots to agentic checkout — architected for scale, security, and the coming world where AI does the shopping.',
  coreJob: {
    title: 'Turn fragmented commerce data into an agent-ready revenue engine.',
    body: 'The next channel isn\'t another storefront — it\'s autonomous agents transacting on behalf of shoppers and operators. We modernize the foundations: product, inventory, pricing, promos, logistics, and store data — so external AI agents can discover, trust, and act on them, while internal copilots lift merchandisers, CX, and ops.',
    bullets: [
      'Agent-ready catalog + digital shelf: structured, semantic, permissioned APIs.',
      'Inventory, pricing, and promo agents with real-time, policy-aware actions.',
      'Merchandising & search copilots that actually understand your assortment.',
      'Edge intelligence for in-store experiences, associates, and loss prevention.',
      'Agentic checkout & CX: conversational commerce, returns, and post-purchase.',
    ],
    ctaLabel: 'Scope an agent-ready workflow',
  },
  ahas: [
    {
      title: 'Your catalog becomes an API agents actually use',
      body: 'Semantic attributes, images, policies, inventory, and pricing exposed with trust signals — so external and internal agents can reason, not guess.',
    },
    {
      title: 'Merchandisers and CX stop firefighting',
      body: 'Copilots handle bulk setup, PDP hygiene, returns, and routine tickets. Your humans focus on brand, margin, and judgment calls.',
    },
    {
      title: 'Stores become smart without a rip-and-replace',
      body: 'Edge agents layer on top of existing POS, RFID, and cameras — turning each store into a real-time data product for ops, LP, and experience.',
    },
  ],
  values: [
    { metric: '+15%', label: 'PDP conversion' },
    { metric: '−40%', label: 'CX handle time' },
    { metric: '3×', label: 'merch velocity' },
    { metric: '−20%', label: 'shrink + OOS' },
  ],
  triggers: [
    'ChatGPT, Perplexity, and shopping agents now send real traffic — and you don\'t know what they see.',
    'Merchandising and catalog ops can\'t keep up with SKU and channel growth.',
    'CX volume and handle time are squeezing margin.',
    'Store ops still run on spreadsheets and radios.',
    'A competitor just shipped conversational commerce on your category.',
  ],
  emotions: [
    'Anxious about being disintermediated by AI shopping agents.',
    'Frustrated by legacy PIM / OMS / POS stacks that resist modern tooling.',
    'Tired of \'AI\' vendor demos that don\'t survive a real assortment.',
    'Pressured on margin, on-time delivery, and customer experience at once.',
    'Excited by what real-time, store-level intelligence could unlock.',
  ],
  pains: [
    'Catalog data that\'s inconsistent across channels, markets, and locales.',
    'Inventory, promos, and pricing updates lagging the customer.',
    'Search + recommendations that don\'t understand synonyms or intent.',
    'CX queues drowning in simple, policy-answerable questions.',
    'Store data trapped in POS and RFID silos.',
  ],
  microJobs: [
    {
      key: 'agent-ready-catalog',
      title: 'Agent-ready catalog & APIs',
      oneLiner:
        'Semantic, permissioned product + policy APIs exposed safely to external and internal agents.',
      deliverables: ['Semantic schema', 'Agent-safe API layer', 'Trust + auth', 'Feed observability'],
      outcome: 'AI channel-ready',
    },
    {
      key: 'merch-search-copilot',
      title: 'Merchandising & search copilot',
      oneLiner:
        'Agents draft PDPs, enrich attributes, tune search, and flag assortment gaps at scale.',
      deliverables: ['PDP generator', 'Attribute enrichment', 'Search tuning', 'Gap dashboards'],
      outcome: '3× velocity',
    },
    {
      key: 'pricing-promo-inventory',
      title: 'Pricing, promo & inventory agents',
      oneLiner:
        'Policy-aware agents for price changes, promo setup, and real-time inventory reasoning.',
      deliverables: ['Policy layer', 'Action tools', 'Simulation + rollback', 'Audit log'],
      outcome: '+ margin control',
    },
    {
      key: 'cx-returns-agent',
      title: 'CX, returns & post-purchase',
      oneLiner:
        'Conversational agent grounded on policy, order, and product — with human escalation built in.',
      deliverables: ['Grounded chat', 'Order + returns tools', 'Escalation flow', 'QA + eval set'],
      outcome: '−40% handle time',
    },
    {
      key: 'store-edge-intelligence',
      title: 'Store edge intelligence',
      oneLiner:
        'Real-time agents over POS, RFID, and cameras for ops, LP, and associate enablement.',
      deliverables: ['Edge pipeline', 'Associate app', 'LP signals', 'Ops dashboards'],
      outcome: '−20% shrink + OOS',
    },
  ],
  pointB: {
    emotions: ['Confident', 'Modern', 'Agent-ready', 'In control of margin', 'Winning the next channel'],
    snapshot:
      'Your catalog, inventory, and pricing are exposed as first-class APIs external agents can trust. Merchandising, search, and CX ship with copilots. Stores stream real-time signal to ops and LP. New channels — including AI shopping agents — plug in without another rebuild.',
    bigJobs: [
      'Turn autonomous commerce into a reliable, measurable revenue channel.',
      'Make merchandising, CX, and ops scale faster than SKU and order count.',
      'Stand up store-level real-time intelligence without replacing POS or RFID.',
    ],
  },
  barriers: [
    {
      objection: 'Our PIM / OMS / POS stack is too legacy to touch.',
      response:
        'We wrap, don\'t replace. Agent-ready APIs and semantic layers sit on top of what you have; we modernize on a runway instead of a big-bang program.',
    },
    {
      objection: 'Exposing product data to AI agents sounds risky.',
      response:
        'We ship permissioned, auditable agent APIs with rate limits, trust signals, and abuse detection. You control who sees what and prove it later.',
    },
    {
      objection: 'We already have search / recsys / CX vendors.',
      response:
        'Good — we layer on them. We target the workflows they leave weak: attribute quality, policy reasoning, long-tail CX, and merchandiser-side automation.',
    },
    {
      objection: 'We don\'t believe AI shopping agents will move real revenue.',
      response:
        'Maybe not tomorrow — but being readable to them is free upside and near-term SEO + discoverability gains. The cost of not being agent-ready grows every quarter.',
    },
  ],
  competitors: [
    {
      name: 'Horizontal commerce platforms',
      blurb: 'Great at storefronts, thin on agent-readiness and cross-system automation.',
    },
    {
      name: 'Search / recsys point vendors',
      blurb: 'Tune one surface; leave the catalog, policy, and CX agent problem untouched. We connect the dots.',
    },
    {
      name: 'In-house modernization programs',
      blurb: 'Often stall on legacy cores. We bring senior AI-native engineers who ship around them.',
    },
  ],
}
