import FullBleedMedia from './FullBleedMedia'
import s from './guides.module.css'

/*
 * scale.com/guides body (between the shared header and footer). Spec: reference-snapshots/scale-clone/guides.md
 *
 * 1. CMS SectionHeader hero (py-16 md:py-24, centred max-w-3xl column, no scroll motion).
 * 2. Book grid: 1 / sm 2 / lg 3 / xl 4 columns, gap 32px, 12 "book" cards 280x376 with a pure-CSS
 *    3D page-turn hover (rotateY(-30deg) at perspective 2000px, 0.3s ease-out). No filters or tabs on Scale.
 * 3. Pre-footer FullBleedMediaSection inside a ClipScrollSection (scrubbed clip + media zoom, one-shot text/CTA intro).
 */

// Cover colours cycle in this order on Scale (book n uses COVERS[n % 5]).
const COVERS = ['#212121', '#193A29', '#273252', '#79648C', '#A8927C']

// Placeholder titles of similar length to Scale's (1 to 3 lines at 24px in a 216px column).
const BOOKS = [
  'Placeholder Topic: The Core Handbook',
  'Placeholder Models: A Field Guide',
  'Planning and Running Placeholder Program Rollouts',
  'Guide to Tools for Retail',
  'Guide to Visual Search Applications',
  'Guide to Large Text Systems',
  'Placeholder Systems for the Enterprise: From First Pilot to Rollout',
  'Guide to Tools for Insurers',
  'Guide to Ops in Banks',
  'Review and Testing Vision',
  'Guide to Tools for the Public Sector Agencies',
  'Enterprise Guide: Make vs. Partner',
]

// Neutral stand-in for the 80x20 brand mark printed on each Scale cover (TODO: Vahue mark).
function CoverMark() {
  return (
    <span aria-hidden="true" className="flex h-5 w-20 items-center gap-1.5">
      <span className="h-[15px] w-[15px] rounded-[2px] bg-white" />
      <span className="h-3 flex-1 rounded-[2px] bg-white/80" />
    </span>
  )
}

export default function GuidesPage() {
  return (
    <>
      <section className="py-16 md:py-24">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center justify-center text-center md:mb-20 md:mt-12">
            <div className="flex flex-col">
              <div className="flex flex-col">
                {/* TODO: Vahue copy */}
                <div className={`${s.overtitle} font-mono text-[#525252]`}>
                  <span>Library</span>
                </div>
                {/* TODO: Vahue copy */}
                <h1 className={`${s.sectionTitle} font-display font-normal text-black`}>Playbooks</h1>
              </div>
              {/* TODO: Vahue copy */}
              <p className={`${s.sectionSub} block w-full font-display font-normal text-black/70`}>
                Shipping placeholder systems takes work, so we wrote these playbooks to help teams move from first idea to a
                working rollout.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto w-full max-w-[1472px] px-6">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {BOOKS.map((title, i) => (
              <a key={i} href="#" className={s.book}>
                <div className={s.bookCover} style={{ backgroundColor: COVERS[i % COVERS.length] }}>
                  <div className="absolute inset-0 flex flex-col justify-between p-8 text-left">
                    <div className="flex items-start justify-between">
                      <CoverMark />
                      <span className={`${s.detailMono} font-mono text-white/50`}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    {/* TODO: Vahue copy */}
                    <h3 className={`${s.header5} font-display font-normal text-white`}>{title}</h3>
                  </div>
                  <div className={s.effect} />
                  <div className={s.light} />
                </div>
                <div className={s.bookInside} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="pb-8">
        <FullBleedMedia
          image="/templates/guides/prefooter.jpg"
          imageBg="#193A29"
          headline="Start shipping better work today."
          primary={{ label: 'Get In Touch', href: '#' }}
          backdrop="#fff"
        />
      </div>
    </>
  )
}
