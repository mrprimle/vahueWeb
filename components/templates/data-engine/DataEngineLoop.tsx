import { SectionHeader } from './StaticSections'
import { Check } from './icons'
import s from './dataEngine.module.css'

/*
 * "One-stop-shop" block. Scale ships the loop diagram as a 1920x1006 raster (lidar-viewer-desktop-light.webp);
 * it is redrawn here as an SVG on the same 1920x1006 grid so the labels can carry Vahue copy.
 */

const BOX = { fill: '#fff' }
const LINE = { stroke: '#8a8a8a', strokeWidth: 2, fill: 'none' }
const TITLE = { fontSize: 26, fill: '#111' }
const SMALL = { fontSize: 18, fill: '#6b6b6b' }

// TODO: Vahue copy (all diagram labels)
function LoopDiagram() {
  return (
    <svg viewBox="0 0 1920 1006" className="h-auto w-full font-display" role="img" aria-label="Placeholder loop diagram">
      <defs>
        <marker id="de-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 z" fill="#8a8a8a" />
        </marker>
      </defs>
      <rect width="1920" height="1006" fill="#f3f3f3" />

      {/* connectors */}
      <path d="M323 455 H471" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M808 455 H1110" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M1448 455 H1596" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M606 340 C606 255 690 198 803 189" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M1115 189 C1228 196 1310 255 1313 338" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M1313 568 C1310 650 1228 712 1117 720" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M805 720 C692 713 610 652 606 570" {...LINE} markerEnd="url(#de-arrow)" />
      <path d="M1727 513 V705" {...LINE} strokeDasharray="8 7" markerEnd="url(#de-arrow)" />
      <path d="M1543 753 H1119" {...LINE} strokeDasharray="8 7" markerEnd="url(#de-arrow)" />

      {/* side nodes */}
      <rect x="77" y="399" width="231" height="112" rx="44" {...BOX} />
      <text x="192.5" y="464" textAnchor="middle" {...TITLE}>
        Groundwork*
      </text>
      <rect x="1613" y="399" width="230" height="112" rx="44" {...BOX} />
      <text x="1728" y="464" textAnchor="middle" {...TITLE}>
        Release*
      </text>
      <rect x="1545" y="710" width="300" height="87" rx="43" fill="#fff" stroke="#cfcfcf" strokeWidth="1.5" strokeDasharray="7 6" />
      <text x="1695" y="762" textAnchor="middle" {...TITLE} fontSize={24}>
        Field reports
      </text>

      {/* loop nodes */}
      <g>
        <rect x="487" y="342" width="308" height="225" rx="36" {...BOX} />
        <text x="517" y="396" {...TITLE}>
          Tuning
        </text>
        <text x="517" y="426" {...SMALL}>
          (Guided adjustment)
        </text>
        <text x="517" y="511" {...SMALL}>
          Learns from worked examples
        </text>
        <text x="517" y="533" {...SMALL}>
          of the replies we want.
        </text>
      </g>
      <g>
        <rect x="1127" y="342" width="307" height="225" rx="36" {...BOX} />
        <text x="1157" y="396" {...TITLE}>
          Feedback
        </text>
        <text x="1157" y="426" {...SMALL}>
          (Learning from reviewer
        </text>
        <text x="1157" y="448" {...SMALL}>
          preference signals)
        </text>
        <text x="1157" y="511" {...SMALL}>
          Reviewer choices shape the
        </text>
        <text x="1157" y="533" {...SMALL}>
          final outputs.
        </text>
      </g>
      <g>
        <rect x="806" y="77" width="307" height="225" rx="36" {...BOX} />
        <text x="836" y="131" {...TITLE}>
          Stress Testing
        </text>
        <text x="836" y="246" {...SMALL}>
          Deliberate probing to surface
        </text>
        <text x="836" y="268" {...SMALL}>
          and close weak spots.
        </text>
      </g>
      <g>
        <rect x="806" y="607" width="307" height="225" rx="36" {...BOX} />
        <text x="836" y="661" {...TITLE}>
          Model Checks
        </text>
        <text x="836" y="754" {...SMALL}>
          Score the model on a wide
        </text>
        <text x="836" y="776" {...SMALL}>
          set of hard prompts to find
        </text>
        <text x="836" y="798" {...SMALL}>
          where it slips.
        </text>
      </g>

      <text x="960" y="917" textAnchor="middle" fontSize={22} fill="#6b6b6b">
        *Groundwork, follow-up tuning and release stay with the customer
      </text>
    </svg>
  )
}

// TODO: Vahue copy
const FEATURES = [
  { title: 'Creation', body: 'After first training, write detailed prompt and reply pairs from a blank page.' },
  { title: 'Feedback', body: 'Bring reviewer preferences to model outputs.' },
  { title: 'Stress Tests', body: 'Use adversarial prompting methods to find weak points.' },
  { title: 'Checks', body: 'Score your model on a broad set of difficult prompts to find gaps.' },
]

export default function DataEngineLoop() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          className="mb-10"
          over="What The Engine Does"
          title="One Place To Build Your Systems"
          sub="Placeholder paragraph explaining the loop of improving learning systems with accurate, varied and large inputs from specialists. Unlock better results with this engine."
        />
        <div className="mx-auto mt-12 max-w-[1216px]">
          <div className="mx-auto max-w-[980px]">
            <LoopDiagram />
          </div>
          <div className="mt-12">
            {/* TODO: Vahue copy */}
            <p className={`${s.detailMono} text-center font-mono text-[#575757]`}>Generative Engine Services</p>
            <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
              {FEATURES.map((f) => (
                <div key={f.title} className="flex items-start gap-4">
                  <Check className="mt-1 h-5 w-5 shrink-0 text-[#212121]" />
                  <div>
                    <h3 className={`${s.header5} font-normal text-[#212121]`}>{f.title}</h3>
                    <p className={`${s.body2} mt-3 text-[#575757]`}>{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
