import Showcase, { SmoothScroll, UnifiedContext } from '@/components/home/restored/Showcase'
import Situations from '@/components/home/Situations'
import ContextArc from '@/components/home/ContextArc'
import HowItWorks from '@/components/home/HowItWorks'
import TryIt from '@/components/home/TryIt'
import { Engage, Concerns, ProductTeams, Founder, FinalCta } from '@/components/home/Closing'
import { Outcomes, Journal } from '@/components/home/Proof'

export default function Home() {
  return (
    <>
      <SmoothScroll />
      {/* 1. Hero: framed slogan, layer sequence with both services, 5 → 1 result */}
      <Showcase />
      {/* 2. Where are you today (triggers) */}
      <Situations />
      {/* 3. Five vendors → one system */}
      <ContextArc />
      {/* 4. What that one system holds: Unified Context, signals, connections, API, pinned quote */}
      <UnifiedContext />
      {/* 5. How it runs: pinned layers */}
      <HowItWorks />
      {/* 6. Try it */}
      <TryIt />
      {/* 7. Engagement, concerns, product teams */}
      <Engage />
      <Concerns />
      <ProductTeams />
      {/* 8. Links kept from the live homepage */}
      <Outcomes />
      <Journal />
      {/* 9. Founder and final call */}
      <Founder />
      <FinalCta />
    </>
  )
}
