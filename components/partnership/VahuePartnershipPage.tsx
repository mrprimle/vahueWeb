import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import PartnershipPage from '@/components/templates/partnership/PartnershipPage'
import type { PartnershipContent } from '@/components/templates/partnership/content'

/*
 * Vahue /partnership on the scale.com/partnership layout (components/templates/partnership, spec
 * reference-snapshots/scale-clone/partnership.md). Same header and two cards, Scale's colours.
 * The site names no partners, so the cards describe the two ways to partner with Vahue and open /contact, and the logo
 * tiles hold Vahue's own mark. Copy on this page is all `// page copy`, for review.
 */
const VAHUE_MARK = { src: '/img/white-circle.svg', alt: '' }

export const vahuePartnershipContent: PartnershipContent = {
  // page copy
  title: 'Partner with Vahue',
  description:
    'Bring us a client with a high-volume workflow, or a tool their team already works in. We run the agents inside it, measured from day one, with review queues, approvals and a full audit log.',
  hrefBase: '/contact',
  emptyLabel: 'No partnerships found.',
  cardColors: ['#839CB2', '#A8927C'],
  linkLabel: 'Learn more',
  items: [
    {
      slug: 'referral',
      title: 'Referral partners',
      description: 'Bring us a client with one high-volume workflow. We audit, pilot and operate it.', // page copy
      logo: VAHUE_MARK,
      href: '/contact/',
    },
    {
      slug: 'technology',
      title: 'Technology partners',
      description: 'Your tool is where the work happens. We run agents inside it, under full control.', // page copy
      logo: VAHUE_MARK,
      href: '/contact/',
    },
  ],
}

export default function VahuePartnershipPage() {
  return (
    // Scale's first block starts 39px down at 1440 and 102px at 390 (its banner + header); the sticky navbar is 88px.
    <div className="bg-white pt-[13px] md:-mt-[50px] md:pt-0">
      <SmoothScroll />
      <PartnershipPage content={vahuePartnershipContent} />
    </div>
  )
}
