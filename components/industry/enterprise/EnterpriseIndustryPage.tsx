import SmoothScroll from '@/components/home/scroll-hero/SmoothScroll'
import EnterprisePage from '@/components/scale-clone/enterprise/EnterprisePage'
import { AuditLog, MonthlyReport, PhaseTrack, Pipeline, ReviewQueue, Rings } from '@/components/enterprise-vahue/Media'
import { buildIndustryContent, type IndustryConfig } from './build'

/*
 * Industry landing on the scale.com/enterprise layout (template clone: components/scale-clone/enterprise, spec
 * reference-snapshots/scale-clone/enterprise.md), the same composition as /operations: EnterprisePage with Vahue
 * content and own visuals, in Scale's own colours (--ent-* tokens at the clone defaults). Used by /industries/banking-financial-services,
 * /industries/retail-ecommerce and /industries/distribution-manufacturing (configs in this folder).
 *
 * Section mapping (clone -> page), all 12 sections in Scale's order: hero graph -> systems the agents work in;
 * pull-apart -> the industry problem and the answer; bridge -> positioning + named clients, with a pipeline visual;
 * blog carousel -> the industry workflows (+ a case study to make Scale's 4); logo cloud -> named clients; stats ->
 * 5 verified case results; testimonials -> 3 verified case summaries; race -> monthly report; pillars -> Audit, Pilot,
 * Operate; powered by -> review queue with industry items; built to be trusted -> audit log with industry lines;
 * pre-footer CTA.
 */
export default function EnterpriseIndustryPage({ config }: { config: IndustryConfig }) {
  return (
    // The site navbar is sticky (88px; light on these routes, see Navbar.tsx): pull the full-viewport hero up under it.
    <div className="-mt-[88px] bg-white text-black">
      <SmoothScroll />
      <EnterprisePage
        content={buildIndustryContent(config)}
        media={{
          bridge: <Pipeline inputs={config.pipeline.inputs} target={config.pipeline.target} />,
          race: <MonthlyReport />,
          pillars: <PhaseTrack />,
          poweredBy: <ReviewQueue rows={config.queue} />,
          trusted: <AuditLog lines={config.log} />,
          prefooter: <Rings />,
        }}
      />
    </div>
  )
}
