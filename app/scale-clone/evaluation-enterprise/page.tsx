import type { Metadata } from 'next'
import FullBleedMedia from '@/components/scale-clone/evaluation-enterprise/FullBleedMedia'
import { Challenge, HowItWorks, Solution } from '@/components/scale-clone/evaluation-enterprise/Sections'
import { ASSET, hero, prefooter } from '@/components/scale-clone/evaluation-enterprise/content'

export const metadata: Metadata = {
  title: 'GenAI Evaluation for Enterprise (Scale clone)',
}

// Structural clone of scale.com/evaluation/enterprise. Spec: reference-snapshots/scale-clone/evaluation-enterprise.md
export default function EvaluationEnterprisePage() {
  return (
    <main className="overflow-x-clip bg-white font-display text-black">
      <FullBleedMedia
        image={`${ASSET}/hero.webp`}
        title={hero.title}
        body={hero.body}
        primary={hero.primary}
        secondary={hero.secondary}
        startPercentage={0}
        backdropClassName="bg-white"
        wrapperClassName="pb-10 pt-24"
        priority
      />
      <Challenge />
      <Solution />
      <HowItWorks />
      <FullBleedMedia
        image={`${ASSET}/prefooter.jpg`}
        title={prefooter.title}
        primary={prefooter.primary}
        secondary={prefooter.secondary}
        startPercentage={10}
        backdropClassName="bg-[#f9fafb]"
        wrapperClassName="pb-8 pt-16"
      />
    </main>
  )
}
