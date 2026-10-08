import Showcase from '@/components/home/restored/Showcase'
import Situations from '@/components/home/Situations'
import ContextArc from '@/components/home/ContextArc'
import HowItWorks from '@/components/home/HowItWorks'
import TryIt from '@/components/home/TryIt'
import { ResultStat } from '@/components/home/StackAndResult'
import { Engage, Concerns, ProductTeams, Founder, FinalCta } from '@/components/home/Closing'

export default function Home() {
  return (
    <>
      {/* Scale-style hero + Scale/Attio sections, restored from the motion study */}
      <Showcase />
      {/* Practice-led sections */}
      <Situations />
      <ContextArc />
      <HowItWorks />
      <TryIt />
      <ResultStat />
      <Engage />
      <Concerns />
      <ProductTeams />
      <Founder />
      <FinalCta />
    </>
  )
}
