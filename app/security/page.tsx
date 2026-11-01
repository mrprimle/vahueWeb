import type { Metadata } from 'next'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import FullBleedMedia from '@/components/security-page/FullBleedMedia'
import CardGrid from '@/components/security-page/CardGrid'
import ScrollReveal from '@/components/security-page/ScrollReveal'
import { COMMITMENT, Compliance, Disclosure, Promos, SectionHeader } from '@/components/security-page/Sections'

const PAGE_URL = 'https://vahue.ai/security/'
const DESCRIPTION =
  'How Vahue keeps AI automation safe: review queues, approvals, role-based access, a full audit log, deployment in your cloud, and ISO 27001 certified data handling.'

export const metadata: Metadata = {
  title: 'Security',
  description: DESCRIPTION,
  openGraph: { title: 'Security | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

/*
 * /security in strict parity with the security clone (scale.com/security, spec
 * reference-snapshots/scale-clone/security.md): the same six sections in Scale's order and Scale's own colours
 * (white page, #f2f2f2 band, black ScrollReveal panel, slate promo cards); Vahue fonts, logo, photography and copy.
 * Section mapping: hero -> security at Vahue; commitment (3 cards) -> controls; compliance (4 cards) -> ISO 27001,
 * GDPR, deployment, code ownership; promos -> how we operate + the Exaware case; disclosure; pre-footer -> careers.
 */
export default function SecurityPage() {
  return (
    <div className="overflow-x-hidden bg-white font-display text-black">
      <SmoothScroll />
      {/* Vahue's navbar sits in the flow (light on this route, see Navbar.tsx), so the clone's pt-24 hero gap is reduced */}
      <div className="pb-10 pt-6 md:pt-10">
        <FullBleedMedia
          level="h1"
          backdrop="#fff"
          image="/img/careers/office-5.jpg"
          imageAlt=""
          imageBg="#193A29"
          priority
          startPercentage={0}
          headline="Security at Vahue" // page copy
          // page copy
          body="Our clients trust us to run agents inside the workflows their business depends on. That trust sets our rules: every agent ships with review queues, access limits and a full audit log."
        />
      </div>
      <section className="bg-white py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <SectionHeader over={COMMITMENT.over} title={COMMITMENT.title} className="!mb-10 !mt-0" />
          <CardGrid cards={COMMITMENT.cards} />
        </div>
      </section>
      <ScrollReveal backdrop="#f2f2f2" panel="#000">
        <Compliance />
      </ScrollReveal>
      <Promos />
      <Disclosure />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#fff"
          image="/img/careers/office-1.jpg"
          imageBg="#193A29"
          headline="Interested in joining Vahue’s engineering team?" // page copy
          primary={{ label: 'Go to Careers', href: '/careers/' }}
        />
      </div>
    </div>
  )
}
