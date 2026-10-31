// Placeholder event data with the same counts and text lengths as scale.com/events.
// TODO: Vahue copy (titles, dates, descriptions, links).

export type EventItem = {
  id: string
  type: string
  date: string
  title: string
  description: string
  href: string
}

// Scale lists 13 upcoming events (the last one "Date TBD").
const UPCOMING_SEED: [string, string, string][] = [
  ['Month 1, 2026', 'Placeholder Summit', 'An annual placeholder event that brings together leaders from several adjacent industries'],
  ['Month 4, 2026', 'Placeholder Network Forum', 'A placeholder industry event focused on automation and applied systems, bringing together operators and builders.'],
  ['Month 8, 2026', 'Vahue at Placeholder Week 2026', 'Join the team at Placeholder Week 2026. See how leading teams build dependable, well-governed systems.'],
  ['Month 8, 2026', 'Placeholder Expo', 'Placeholder Expo brings together a broad ecosystem to explore the latest ideas, tools, and opportunities shaping the future of the field.'],
  ['Month 9, 2026', 'Placeholder Conf', 'An annual academic placeholder conference at the intersection of two research fields, covering theory and practice.'],
  ['Month 30, 2026', 'Placeholder Training', 'A placeholder conference that is one of the largest gatherings for simulation and training'],
  ['Month 30, 2026', 'Placeholder Cloud Week', 'Placeholder Cloud Week will bring together the global builder community for a week of learning and collaboration'],
  ['Month 1, 2026', 'Placeholder Forum', 'A placeholder bipartisan retreat where leaders assess policy and strategy in an evolving global landscape and discuss what comes next.'],
  ['Month 1, 2026', 'Placeholder Finance Summit', 'A placeholder forum where executives and policymakers debate the economic, regulatory, and technology forces reshaping finance.'],
  ['Month 6, 2026', 'Placeholder Research 2026', 'A leading placeholder research conference, gathering researchers from around the world to share breakthroughs in their field.'],
  ['Month 7, 2026', 'Placeholder Capital Week 2026', "A placeholder region's premier investment summit, uniting global leaders to drive dialogue on technology, assets, and growth."],
  ['Month 15, 2026', 'Placeholder World Summit', 'A placeholder global forum uniting companies, startups, and researchers to tackle big challenges in governance and real-world deployment.'],
  ['Date TBD', 'Placeholder Festival', 'A placeholder global festival where innovation in technology and future ideas converge to explore new possibilities.'],
]

export const UPCOMING: EventItem[] = UPCOMING_SEED.map(([date, title, description], i) => ({
  id: `u${i}`,
  type: 'Conference',
  date,
  title,
  description,
  href: '#',
}))

// Scale lists 75 past events; 6 render first and "Show more events" adds 6 per click.
const PAST_TITLES = [
  'Placeholder Initiative',
  'Placeholder Festival, City',
  'Placeholder Annual Convention',
  'Placeholder Expo Region',
  'Placeholder Partners Forum City',
  'Placeholder 20/20 Region',
]
const PAST_DESCS = [
  'A placeholder initiative that convenes leaders, investors, and policymakers to shape the future of a global industry.',
  'A placeholder festival that brings together innovators, leaders, and pioneers to explore the technologies and ideas shaping business.',
  'Get practical placeholder takeaways in just three days at this annual convention.',
  'A placeholder biennial exhibition for security and civil defense in the region',
  'A placeholder forum recognised as a premier global event for the community of operating and value-creation professionals',
  'The only placeholder event you need to connect, learn and do business in this world.',
]

export const PAST: EventItem[] = Array.from({ length: 75 }, (_, i) => ({
  id: `p${i}`,
  type: 'Conference',
  date: `Month ${((28 - i) % 28) + 1}, ${2026 - Math.floor(i / 25)}`,
  title: PAST_TITLES[i % PAST_TITLES.length],
  description: PAST_DESCS[i % PAST_DESCS.length],
  href: '#',
}))
