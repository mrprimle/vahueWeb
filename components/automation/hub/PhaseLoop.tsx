import { PHASES } from '@/lib/automation-content'
import { SectionHeader } from './StaticSections'
import { Check } from './icons'
import s from './hub.module.css'

/*
 * Audit -> Pilot -> Operate loop. Clone: "One-stop-shop" block (DataEngineLoop.tsx), whose SVG is drawn
 * on scale.com's 1920x1006 grid; node positions and connectors are unchanged, labels carry Vahue copy.
 */

const BOX = { fill: '#fff' }
const LINE = { stroke: '#8a8a8a', strokeWidth: 2, fill: 'none' }
const TITLE = { fontSize: 26, fill: '#111' }
const SMALL = { fontSize: 18, fill: '#6b6b6b' }

const [audit, pilot, operate] = PHASES

function LoopDiagram() {
  return (
    <svg
      viewBox="0 0 1920 1006"
      className="h-auto w-full font-display"
      role="img"
      aria-label="Engagement loop: your workflow goes through a two-week Audit, a four-to-six-week Pilot and monthly Operate; exceptions and a monthly accuracy review feed back into the next audit."
    >
      <defs>
        <marker id="hub-loop-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="9" markerHeight="9" orient="auto-start-reverse">
          <path d="M0 1 L9 5 L0 9 z" fill="#8a8a8a" />
        </marker>
      </defs>
      <rect width="1920" height="1006" fill="#f3f3f3" />

      {/* connectors */}
      <path d="M323 455 H471" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M808 455 H1110" {...LINE} strokeDasharray="2 8" markerEnd="url(#hub-loop-arrow)" />
      <path d="M1448 455 H1596" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M606 340 C606 255 690 198 803 189" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M1115 189 C1228 196 1310 255 1313 338" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M1313 568 C1310 650 1228 712 1117 720" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M805 720 C692 713 610 652 606 570" {...LINE} markerEnd="url(#hub-loop-arrow)" />
      <path d="M1727 513 V705" {...LINE} strokeDasharray="8 7" markerEnd="url(#hub-loop-arrow)" />
      <path d="M1543 753 H1119" {...LINE} strokeDasharray="8 7" markerEnd="url(#hub-loop-arrow)" />
      <text x="959" y="440" textAnchor="middle" {...SMALL} fontSize={16}>
        same baseline throughout
      </text>

      {/* side nodes */}
      <rect x="77" y="399" width="231" height="112" rx="44" {...BOX} />
      <text x="192.5" y="464" textAnchor="middle" {...TITLE}>
        Your workflow
      </text>
      <rect x="1613" y="399" width="230" height="112" rx="44" {...BOX} />
      <text x="1728" y="464" textAnchor="middle" {...TITLE}>
        Your systems
      </text>
      <rect x="1545" y="710" width="300" height="87" rx="43" fill="#fff" stroke="#cfcfcf" strokeWidth="1.5" strokeDasharray="7 6" />
      <text x="1695" y="762" textAnchor="middle" {...TITLE} fontSize={24}>
        Exceptions
      </text>

      {/* loop nodes */}
      <g>
        <rect x="487" y="342" width="308" height="225" rx="36" {...BOX} />
        <text x="517" y="396" {...TITLE}>
          {audit.name}
        </text>
        <text x="517" y="426" {...SMALL}>
          ({audit.length})
        </text>
        <text x="517" y="511" {...SMALL}>
          Map one workflow and
        </text>
        <text x="517" y="533" {...SMALL}>
          record the baseline.
        </text>
      </g>
      <g>
        <rect x="806" y="77" width="307" height="225" rx="36" {...BOX} />
        <text x="836" y="131" {...TITLE}>
          {pilot.name}
        </text>
        <text x="836" y="161" {...SMALL}>
          ({pilot.length})
        </text>
        <text x="836" y="246" {...SMALL}>
          Your data at real volume;
        </text>
        <text x="836" y="268" {...SMALL}>
          a person checks every output.
        </text>
      </g>
      <g>
        <rect x="1127" y="342" width="307" height="225" rx="36" {...BOX} />
        <text x="1157" y="396" {...TITLE}>
          {operate.name}
        </text>
        <text x="1157" y="426" {...SMALL}>
          ({operate.length})
        </text>
        <text x="1157" y="511" {...SMALL}>
          We run the agents
        </text>
        <text x="1157" y="533" {...SMALL}>
          day to day.
        </text>
      </g>
      <g>
        <rect x="806" y="607" width="307" height="225" rx="36" {...BOX} />
        <text x="836" y="661" {...TITLE}>
          Accuracy review
        </text>
        <text x="836" y="754" {...SMALL}>
          Monthly report against the
        </text>
        <text x="836" y="776" {...SMALL}>
          baseline; agree what to
        </text>
        <text x="836" y="798" {...SMALL}>
          automate next.
        </text>
      </g>

      <text x="960" y="917" textAnchor="middle" fontSize={22} fill="#6b6b6b">
        The target, and the point at which we stop, are agreed in the Audit before anything is built.
      </text>
    </svg>
  )
}

// Clone: 4 features, 1-2 word title + one short line each.
const FEATURES = [
  { title: audit.name, body: 'Map one workflow and record its baseline: volume, minutes, errors and cost.' },
  { title: pilot.name, body: 'Your own data at real volume, with a person checking every output.' },
  { title: operate.name, body: 'We run the agents day to day and report monthly against the baseline.' },
  { title: 'Next Workflow', body: 'Once accuracy holds, the same team takes on the next workflow.' },
]

export default function PhaseLoop() {
  return (
    <section className="pb-14 md:pb-20">
      <div className="mx-auto w-full max-w-[1472px] px-6">
        <SectionHeader
          className="mb-10"
          over="How We Work"
          title="Audit, Pilot, Then We Run It"
          sub="Every engagement starts with one workflow and a measured baseline: volume, minutes, errors and cost. We widen the scope only once the numbers hold."
        />
        <div className="mx-auto mt-12 max-w-[1216px]">
          <div className="mx-auto max-w-[980px]">
            <LoopDiagram />
          </div>
          <div className="mt-12">
            <p className={`${s.detailMono} text-center font-mono text-[#575757]`}>Engagement Phases</p>
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
