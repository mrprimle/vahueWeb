import type { Metadata } from 'next'
import { CONTROL_FEATURES } from '@/lib/automation-content'
import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import FullBleedMedia from '@/components/security-page/FullBleedMedia'
import CardGrid from '@/components/security-page/CardGrid'
import ScrollReveal from '@/components/security-page/ScrollReveal'
import {
  CONTROL_ICONS,
  DataHandling,
  Disclosure,
  Promos,
  SectionHeader,
  WorkflowGuardrails,
} from '@/components/security-page/Sections'

const PAGE_URL = 'https://vahue.ai/security/'
const DESCRIPTION =
  'How Vahue keeps AI automation safe: review queues, approvals, role-based access, a full audit log, deployment in your cloud, and ISO 27001 certified data handling.'

export const metadata: Metadata = {
  title: 'Security',
  description: DESCRIPTION,
  openGraph: { title: 'Security | Vahue', description: DESCRIPTION, url: PAGE_URL },
  alternates: { canonical: PAGE_URL },
}

const cards = CONTROL_FEATURES.map((f) => ({ icon: CONTROL_ICONS[f.title], title: f.title, body: f.body }))

// Security page on the layout of the security clone (app/scale-clone/security, spec in
// reference-snapshots/scale-clone/security.md). Clone's light surfaces inverted to Vahue dark.
export default function SecurityPage() {
  return (
    <div className="overflow-x-hidden bg-bg font-display text-white">
      <SmoothScroll />
      {/* Vahue's navbar sits in the flow, so the clone's pt-24 hero gap is reduced */}
      <div className="pb-10 pt-6 md:pt-10">
        <FullBleedMedia
          level="h1"
          backdrop="#020202"
          image="/img/careers/office-5.jpg"
          imageAlt=""
          imageBg="#111"
          priority
          startPercentage={0}
          headline="Automation your risk team can sign off on"
          body="Agents propose, people approve. Every workflow we run has review queues, role-based access and a full audit log, and can run inside your own cloud."
        />
      </div>
      <section className="bg-bg py-[72px] md:py-[120px]">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <SectionHeader over="Controls" title="Built into every workflow we run" className="!mb-10 !mt-0" />
          <CardGrid cards={cards} />
        </div>
      </section>
      <ScrollReveal backdrop="#020202" panel="#0e0e10">
        <DataHandling />
      </ScrollReveal>
      <WorkflowGuardrails />
      <Promos />
      <Disclosure />
      <div className="pb-8">
        <FullBleedMedia
          backdrop="#020202"
          image="/img/careers/office-1.jpg"
          imageBg="#111"
          headline="Start with one workflow and the guardrails agreed up front"
          primary={{ label: 'Book a workflow audit', href: '/contact/' }}
        />
      </div>
    </div>
  )
}
