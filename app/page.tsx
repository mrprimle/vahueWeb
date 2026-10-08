import HomeHero from '@/components/home/HomeHero'
import Situations from '@/components/home/Situations'
import ContextArc from '@/components/home/ContextArc'
import HowItWorks from '@/components/home/HowItWorks'
import TryIt from '@/components/home/TryIt'
import { StackStrip, ResultStat } from '@/components/home/StackAndResult'
import { ClientStory, Engage, Concerns, ProductTeams, Founder, FinalCta } from '@/components/home/Closing'

/**
 * Homepage — practice-first lineup (October 2026).
 * Section order and dark/light rhythm follow "Vahue homepage: sections and design".
 * Dark: hero, how it works, result, engage, product teams, final CTA. Light: everything that is read or tried.
 */
export default function Home() {
  return (
    <>
      <HomeHero />
      <Situations />
      <ContextArc />
      <HowItWorks />
      <TryIt />
      <StackStrip />
      <ResultStat />
      <ClientStory />
      <Engage />
      <Concerns />
      <ProductTeams />
      <Founder />
      <FinalCta />
    </>
  )
}
