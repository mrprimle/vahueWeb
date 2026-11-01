import Hero from './Hero'
import Intro from './Intro'
import Flywheel from './Flywheel'
import { Stack, TrustCards, TwoColumn } from './Sections'
import { Blog, Demo, Differentiators, Faqs, Security, Testimonials } from './Lower'
import s from './styles.module.css'

const ASSET = '/templates/genai-portfolio'

// Structural clone of scale.com/genai-portfolio (sections top to bottom). Spec: reference-snapshots/scale-clone/genai-portfolio.md
export default function GenAiPortfolioPage() {
  return (
    <main className={`${s.page} bg-black font-display`}>
      <Hero />
      <Intro />
      {/* TODO: Vahue copy */}
      <TwoColumn
        headingSpacer
        left={<h4 className={`${s.header4} !leading-9`}>Use frontier models where they matter, and open-weight models where they fit.</h4>}
        right={
          <p className="leading-6">
            Vahue Post-Training turns open-weight models into focused specialists for your own workloads, so you get
            full control and strong quality at a fraction of what frontier models cost.
          </p>
        }
        cta="Talk to our team"
        ctaColumn="right"
      />
      <Stack />
      <TrustCards />
      <Flywheel />
      {/* TODO: Vahue copy */}
      <TwoColumn
        video={`${ASSET}/dialect.mp4`}
        left={
          <h4 className={`${s.header4} !leading-9`}>
            Your Dialect grows out of the feedback loop, teaching AI to reason like your strongest people.
          </h4>
        }
        right={
          <div className="leading-6">
            <p>At heart, Vahue Dialect is a decision map that sets you apart from the</p>
            <p>
              rest of the field. It tracks not only how data moves but how calls get made. As your decision layer
              improves, the reasoning is learned and encoded from expert judgement, until it runs as independently as
              your guardrails allow.
            </p>
          </div>
        }
        cta="Learn more"
        ctaColumn="left"
      />
      <Differentiators />
      <Security />
      <Testimonials />
      <Demo />
      <Faqs />
      <Blog />
    </main>
  )
}
