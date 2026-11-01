import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EventsPage from '@/components/scale-clone/events/EventsPage'
import type { EventsContent, EventItem } from '@/components/scale-clone/events/content'

/*
 * Vahue /events on the scale.com/events clone (components/scale-clone/events, spec
 * reference-snapshots/scale-clone/events.md). Same three sections in Scale's order and colours: centred hero,
 * #upcoming grid of tall cards, #past grid with "Show more events" (+6 from 6). Vahue fonts and navbar (light on this
 * route, see isLightCloneParityPage in Navbar.tsx).
 *
 * Events are Vahue's real ones, taken from the previous page (EventsClient): three past summits, none upcoming.
 * Nothing is invented, so the upcoming grid holds one status card (`upcomingEmpty`) and Show more stays hidden (3 < 6).
 * Vahue has no event pages or external event links, so every card links to /contact.
 * Copy written for this page is marked `// page copy`.
 */

const CONTACT = '/contact/'
const CTA = 'Contact us' // page copy

// From EventsClient (type "CONFERENCE" -> "Conference": the card's CSS uppercases it, as on Scale).
const PAST: EventItem[] = [
  {
    id: 'vahue-ai-summit-london-2026',
    type: 'Conference',
    date: 'May 30, 2026',
    title: 'Vahue AI Summit London',
    description:
      'A curated Vahue AI Summit in London featuring a shortlist of invited speakers from AI, Banking, Finance, Insurance, and Real Estate — bringing together industry leaders for focused conversation on practical AI adoption.',
    href: CONTACT,
    cta: CTA,
  },
  {
    id: 'vahue-ai-summit-la-2026',
    type: 'Conference',
    date: 'May 19, 2026',
    title: 'Vahue AI Summit Los Angeles',
    description:
      'A curated Vahue AI Summit in Los Angeles featuring a shortlist of invited speakers from AI, Banking, Finance, Insurance, and Real Estate — bringing together industry leaders for focused conversation on practical AI adoption.',
    href: CONTACT,
    cta: CTA,
  },
  {
    id: 'vahue-momentum-ai-sf-2026',
    type: 'Conference',
    date: 'May 16, 2026',
    title: 'Vahue Momentum AI San-Francisco',
    description:
      'A Vahue-hosted AI conference in San-Francisco bringing together business and technology leaders to explore real-world AI adoption and strategy.',
    href: CONTACT,
    cta: CTA,
  },
]

export const vahueEventsContent: EventsContent = {
  hero: {
    title: 'Events',
    lede: 'Meet the operators and engineers putting AI agents to work on real workflows.', // page copy
  },
  upcoming: [],
  upcomingEmpty: {
    id: 'no-upcoming',
    type: 'Upcoming', // page copy
    date: '',
    title: 'No events scheduled', // page copy
    // first sentence from EventsClient
    description: 'We do not have active event registration open right now. Ask us about the next one.', // page copy (2nd sentence)
    href: CONTACT,
    cta: CTA,
  },
  past: {
    title: 'Past Events',
    subtitle: 'Look back at the summits Vahue has hosted this year.', // page copy
    events: PAST,
    initial: 6,
    step: 6,
    moreLabel: 'Show more events',
  },
}

export default function VahueEventsPage() {
  return (
    // The site navbar is sticky and in the flow (89px, light on this route), so the hero section starts at 89px; on the
    // clone it starts at 102px below md and 39px from md. Shift the page so the h1 sits where it does on the clone
    // (measured: h1 top 246 at 390px, 199 at 768px and up).
    <div className="mt-[13px] bg-white md:-mt-[50px]">
      <SmoothScroll />
      <EventsPage content={vahueEventsContent} as="div" />
    </div>
  )
}
