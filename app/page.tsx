import Showcase from '@/components/home/restored/Showcase'
import Situations from '@/components/home/Situations'
import ContextArc from '@/components/home/ContextArc'
import HowItWorks from '@/components/home/HowItWorks'
import TryIt from '@/components/home/TryIt'
import { Engage, Concerns, ProductTeams, Founder, FinalCta } from '@/components/home/Closing'
import { Outcomes, Journal } from '@/components/home/Proof'

export default function Home() {
  return (
    <>
      {/* Scale-style hero, services and result, then the Attio-style Unified Context block */}
      <Showcase />
      {/* AJTBD sections */}
      <Situations />
      <ContextArc />
      <HowItWorks />
      <TryIt />
      <Engage />
      <Concerns />
      <ProductTeams />
      {/* Links kept from the live homepage: case studies and blog */}
      <Outcomes />
      <Journal />
      <Founder />
      <FinalCta />
    </>
  )
}
