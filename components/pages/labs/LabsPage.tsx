import { ScrollReveal } from '@/components/site/labs/ScrollReveal'
import type { LabsLogoContent } from '@/components/site/labs/types'
import { BlogSection, HeroSection, JobsSection, LeaderboardsSection, ResearchSection } from './Sections'
import type { LabsHomeContent } from './types'

/** labs.scale.com `/`. The hero has no reveal; the other four slices each sit in a ScrollReveal. Chrome comes from app/labs/layout.tsx. */
export function LabsPage({ content, logo }: { content: LabsHomeContent; logo: LabsLogoContent }) {
  return (
    <>
      <HeroSection content={content.hero} logo={logo} />
      <ScrollReveal>
        <LeaderboardsSection content={content.leaderboards} />
      </ScrollReveal>
      <ScrollReveal>
        <ResearchSection content={content.papers} />
      </ScrollReveal>
      <ScrollReveal>
        <BlogSection content={content.blog} />
      </ScrollReveal>
      <ScrollReveal>
        <JobsSection content={content.jobs} />
      </ScrollReveal>
    </>
  )
}
