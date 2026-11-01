# /generative-ai-data-engine

Live source: https://scale.com/generative-ai-data-engine at 1440x900, 1100x900, 800x900, 700x900 and 390x844 (touch), 2026-11-01. Menu label here: Back-office Sync. Page: `app/generative-ai-data-engine/page.tsx`, `components/pages/generative-ai-data-engine/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). No new package. `react-fast-marquee` (module 922998) is ported into `LogoCloud`, not installed: the version string is not in Scale's bundle.

New shared ports, added to stack.md: `LogoCloud`, `FeaturesWithIcons`, `SectionTitle`, `GlowBackground`, `ResourcesCarousel`, `keenWheelControls`. Page-only ports: `VideoGallery` (482270) and its Wistia player (832862), CSS module `rEiMFa`. Reused: `FullBleedMediaSection`, `ClientTestimonials`, `PageThemeSetter`. Most of the page is server-rendered markup in the RSC payload. Icons are inline paths from that markup.

## Sections
Tops and heights at 1440, Scale then ours, filled page, after a full scroll.

| # | Section | Module | Top | Height | Height at 390 |
|---|---|---|---|---|---|
| 1 | Hero | 478135 non-globe, 540431, `startPercentage` 0 | 39.3, 39.3 | 856, 856 | 616, 616 |
| 2 | Logo row and customers link | 970272, 922998 | 895.3, 895.3 | 206.4, 206.4 | 200.8, 200.8 |
| 3 | Product overview title | 1900 | 1101.6, 1101.6 | 344, 344 | 315.6, 315.6 |
| 4 | Capabilities image | 605500 | 1445.6, 1445.6 | 801.8, 802.1 | 249.3, 249.4 |
| 5 | Testimonial, evergreen panel | 685963 | 2247.4, 2247.7 | 723.2, 722.2 | 804.8, 803.8 |
| 6 | Text and image with glow | 799808 variant none | 2970.6, 2970 | 494.6, 493.8 | 481.2, 481.2 |
| 7 | Title and loop diagram | 1900 | 3465.2, 3463.8 | 1133.2, 1133.3 | 510.3, 510.3 |
| 8 | Key features, 6 items | 460138 | 4598.4, 4597.2 | 812, 812 | 1657.7, 1657.7 |
| 9 | Demos gallery | 482270, 832862 | 5410.4, 5409.2 | 1370.9, 1370.9 | 547.4, 547.4 |
| 10 | Resources, 2 items | 382790 | 6781.3, 6780.1 | 728.8, 728.8 | 617.9, 617.9 |
| 11 | Pre-footer | 540431, default `startPercentage` 10 | 7510.1, 7508.8 | 816, 816 | 576, 576 |

800 and 1100 wide: every section within 1px of Scale. The -1 on the testimonial is the mono heading, 3 lines on Scale and 2 here (DM Mono). Total page height differs by more at 800 (9573 vs 9450) and 1100 (8824 vs 8802), all of it in the footer, which `_chrome.md` lists as not sampled at those widths. No overflow at any width.

## Interaction inventory
Listeners: REA `inspect_web_event_listeners`, plus `DOMDebugger.getEventListeners` over all 414 `main` nodes. React handlers are delegated to the root, so element results show only native listeners. On Scale, `mousedown` capture on links and buttons comes from HubSpot analytics (`js.hs-analytics.net`) and bare `click` is React's iOS click trap.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero root, logo `ul`, `h3`, `figure`, gallery root, `.ClientTestimonials` | any | None. REA `ev_dddbf652…`, `ev_24a18340…`, `ev_9121ed83…`, `ev_b2839cd9…`, `ev_705c86c5…`, `ev_7308da04…` | | No hover, no pointer tracking | Pointer grid at 11 scroll stops, 42 points each: changes only on the hero CTA wash, play button and pre-footer CTA, both (grid run on the clone) |
| `html`, `body` | scroll, touchstart | Lenis, GSAP. `ev_d744ea51…`, `ev_cd3b0b40…` | chrome | | Same set via CDP |
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words | Same curve. Scale starts later because the load is slower: line y 7.03 at 1380ms vs 4.79 at 871ms, word opacity .972 vs .978. Next sample .95 vs .10, so the sampling phase differs. Both reach 0 |
| Hero CTA | load | gsap, delay .5 | 961870 | .85s, `power3.out` | Opacity .84, .994, 1 vs .85, .996, 1 at the same phase; radius 7, 8, 8 equal |
| Hero media | scroll | ScrollTrigger scrub | 540431 | 1.25 to 1 | 1.0139 at top, 1 at y 304, equal |
| Pre-footer clip and media | scroll | ScrollTrigger scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | y 6688: 4.914% vs 4.907%. y 6992: 3.037% vs 3.031%. y 7296: 1.160% vs 1.154%. 0 at 7600, both. Scale 1.2457, 1.1519, 1.058 vs 1.2454, 1.1515, 1.0577 |
| Testimonial panel | scroll | ScrollTrigger scrub | 685963 | 90% to 100% | y 1824: 99.39%, equal. y 2128: 99.9985%, equal |
| Quote and chip | in view | ScrollTrigger | 685963 | Line flip, chip | Chip runs in the same steps: 151, 162 on Scale's string, 97, 104 on ours, width follows the label. One testimonial: no arrows |
| Testimonial tab | hover, click, ArrowRight, Tab | React, `ev_7deeb753…` | 685963 | One tab, shows the client's name | 108.66 square, selected, fill at 0. Hover, click and ArrowRight change nothing. Click moves focus to the button, Tab keeps it on a button, both |
| Customers link arrow | hover, leave | CSS only, `ev_fd6b1a83…` | 426764 | `translate-x-1`, 300ms ease-out | Enter 2.14, 3.18, 3.82, 4 vs 1.77, 3.18, 3.63, 3.94, 4. Leave 1.86, .82, .26 vs 2.23, 1.02, .37 (60ms sampling, phase differs) |
| Customers link colour | hover | None | 426764 | Scale's `hover:text-blue-700` loses to `.text-link` in its CSS order, so it never changes. The class is omitted here for the same result | rgb(0,142,255) throughout, both |
| Logo row, phone | timer | CSS animation | 922998 | 50px/s, `translateX(0 to -100%)`, two copies, no pause | Duration 8.58s, width 429, 6 tiles at 48px margin, equal. -155.1, -181.0, -206.0 vs -155.1, -180.1, -205.1 at 500ms steps |
| Gallery play button | hover | CSS | 832862 | `bg-black/50` to `/70`, 200ms | .5, .59, .67, .70 vs .5, .55, .67, .70 |
| Gallery play button | click, Enter | React, `ev_b4f5fa0e…` | 832862 | Swaps to the player in the same box, 1392 x 783 | Scale iframe `?autoPlay=1`, ours (filled) `<video autoplay controls>`. Clone: same iframe URL, verified |
| Gallery slide | hover, not active | CSS | 482270 | `hover:opacity-70`, 300ms, base .5 from `sm` | .5, .535, .655, .694, .7 vs .5, .535, .639, .69, .7. Leave .699, .608, .533, .503 vs .7, .665, .561, .51 |
| Gallery slide | click | React, `ev_5e1393b8…` | 482270 | Sets active, autoplays, native smooth `scrollTo` to root top - 16 | y 5902 to 5563, 5902 to 5563. Player fades in .6s `ease-out`: .3, .59, .80, .96, 1 vs .38, .62, .84, .97, 1 |
| Gallery slider | drag, 700 | `ev_f17011b8…` | 577476, 482270 | Snap, `perView` 2 | -225 at release, then -296.3, -342 vs -296.8, -342. Cursor `grabbing`, `grab`, equal |
| Gallery slider | drag, 800, 1100, 1440 | Same | | `perView` 3.1 or 3 | Locked at 0 on 3 slides, cursor stays `default`, both |
| Gallery slider | touch, 390 | Same | | Each slide is a player, dots below | 0, -32, -80, -128, -176, -224, then -313.8, -358.7/-362.3, -374, both |
| Gallery dots | tap, 390 | React | 482270 | `moveToIdx` | -597.5, -709.8, -742.3, -747.9, -748 vs -597.6, -709.9, -742.3, -747.7, -748. Active dot is white on white on Scale too |
| Resources slider | mouse drag, 700 | `ev_c76addab…`, `ev_ed6641db…` | 382790 | `free`, `perView` 1.4 | -225, -289.7 clamp, equal |
| Resources slider | touch, 390 | Same | | Snap, 1.05 | 0 … -224, -288.07, -320.2, -331.14, equal |
| Resources slider | wheel | Plugin | 29713 | Horizontal only | 0 for `deltaX` 60 x 6, both |
| Resources slider | Tab | `keydown`, `focusin` on wrapper | 382790 | Moves one slide | 2 and 2 handler calls on both (table below) |
| FlatCta wash, arrow | enter, leave | React, shared | 892855 | Fill 300ms, arrow 600ms | Enter -61.19, -31.48, -16.08 vs -61.17, -34.81, -18.18. Leave 38.8, 65.2, 81.8 equal |
| Section theme | | `PageThemeSetter theme="light"` | 243385 | No dark sections | Equal |

## Deviations from Scale
- **Fonts:** see stack.md. New copy also changes text widths. Customers link is 161.4 wide vs 156.3, in the clone too.
- **Demos:** Scale embeds Wistia and fetches thumbnails from Wistia's oEmbed on mount. The clone keeps the iframe with local covers, so it makes no oEmbed call. The filled page plays a local `<video>`, in the branch where Scale has a YouTube player, because the Wistia videos are Scale's. `src` also accepts a Wistia URL, so Mike can paste real ones.
- **Image quality:** Scale asks for `q` 80 to 100. Next's default 75 here, as on `/data-engine`: other values are not in `images.qualities`.
- **Keen `centered: true`:** Scale passes it on phones. Keen 6 ignores it, and the type rejects it, so it is left out. Transforms are equal.
- **Wheel listeners in dev:** 2 per slider here, 1 on Scale. React StrictMode runs the slider's mount twice in dev only. A production build was not measured.
- **Prefooter:** downscaled from 7952 to 1920 wide, same file as `/data-engine`.

## REA evidence
Live page, 56 of 56 scripts parsed: `analyze_web_bundle` `ev_152531cb9521847eb1fee2c944ad08c0d74d7e255306f0f394e390669d2d3e00`. `inspect_web_page` `ev_0d9a5b2fa6ee0d74ad6565051f5e6ab3360c8fde7be72612c5506b7e092f77a7` (82 scripts, 15 resources; status `policy_filtered`, so third-party sections are withheld).

Execution, 50s precise coverage with the same scripted drive on both pages (hero CTA, testimonial scroll, slide hover and click, then resources drag, Tab and gallery drag at 700 wide):
- Scale: `observe_web_execution` `ev_d5f740c070daff39d58e07644d94907bfe88591467c8880113b79ef8f6634756`
- Ours, dev server, clone stage: `observe_web_execution` `ev_211dd13dce9b40cdcc54f66f03e9c166b9b0075ca643fdef3aa28d013b2393ad`

Both exceed REA's 10 MB response limit, so they were read from `export_evidence_bundle` output (177 MB, deleted after extraction). Counts below come from offsets into the retained source.

| Function | Module | Scale | Ours |
|---|---|---|---|
| Gallery `dragStarted`, `dragEnded`, `slideChanged` | 482270 | 1, 1, 2 | 1, 1, 2 |
| Resources `dragStarted`, `dragEnded` | 382790 | 1, 1 | 1, 1 |
| Resources `keydown`, `focusin` | 382790 | 2, 2 | 2, 2 |
| Keen `emit` | 577476 | 516 | 525 |
| Wheel plugin handler | 29713 | 0 | 0 |

Listeners: as named in the inventory, plus `.rEiMFa_section .keen-slider` `ev_f17011b8c5a8219dc26a50d7e6ca88f5fa47e75269a24073f50b8678c462849d`, `a.keen-slider__slide` `ev_c76addab5c33199fdf68c2e723c8e6ac12eff556afdbf95eeb4b31f7d399f1f2`, link `ev_fd6b1a8337480e227fd04b99093331be6c02b06cbf10d3289c08c5ad5640003c`, tab `ev_7deeb75342c4507df3a28cbe4a4bdf11018e8b1204e1d77754084acfedf54f84`, play `ev_b4f5fa0ec7c229c2e59a774e58f7dde27e34733372b9d7ecc981c683e2e494ab`, slide `ev_5e1393b8…`.

Not run: `capture_browser_scenario` has no hover or drag action, so `observe_web_execution` covered the drive. `trace_web_source_location`: Scale serves no source maps. `trace_web_module_imports`: Turbopack module ids are outside native ES imports, so modules were read directly. `compare_web_screenshots`: the DOM measurements above replaced it.

### One mismatch in the REA drive
At the end of the drive, Scale's gallery sat at -342 and ours at -225, though `slideChanged` ran 2 and 2. Other agents share that Chrome, and I read this as the tab being in the background, where the slider's `requestAnimationFrame` does not run. I did not confirm that. The same drag in a headless session with no other tab ends at -342 on both (table above).

### Other tooling
Playwright and CDP: `DOMDebugger.getEventListeners` on every `main` node, pointer grids, sampled curves. Harness in the scratchpad: `new-qa/generative-ai-data-engine/instr.cjs`, `cmp2.py`. Diagrams and neutral images: `new-qa/generative-ai-data-engine/gen/make.cjs`.

## Gaps
- Dev console on the filled page: the favicon 404 (`_chrome.md`) and Next's dev image hints for the hero and the three thumbnails, which come from Scale's own image props.
- `oml:` landscape was not driven.
- Real iOS was not driven: touch runs through CDP on Chrome.
- Motion sampled at 100ms in a dev build: mid-curve values can differ by phase, end states match.
- Execution evidence was taken at the clone stage. The filled page reran geometry and the sampled curves, not REA coverage.

## Copy mapping
This page is the research's `back-office-sync` workflow (`template: 'generative-ai-data-engine'`), menu label Back-office Sync. Hero and overview carry the workflow headline and summary. The testimonial turns the workflow's before and after into a quote. The training-data paragraph became automation and human review. "Improve your models" became improve your close. Key features are the research's control features: results dashboard, review queues, access, accuracy reviews, approvals and audit log. Demos are three steps of the workflow. "Book a Demo" became "Book an Audit", as on `/data-engine`. "Meet our customers" points at `/enterprise` and the case study at `/enterprise`, since `/customers` is not a route here; the report points at `/guides`. Generic labels are unchanged: "PRODUCT OVERVIEW", "Key Features", "Demos", "RESOURCES", "Case Studies & Resources", "Don’t just take our word for it", "Meet our customers".

Word counts are within 15% of Scale's for 43 of 49 strings. The exceptions, one word off unless noted: hero, overview and demos titles ("Back-office Sync Agents" 3 vs 4), case study title, "Upholding approvals…" 7 vs 6, and the hidden meta title (4 vs 7). Longer titles wrapped onto extra lines at 390 and changed section heights.

**Images replaced at fill**, removed from `public/` (recover from commit fde0271 to re-check the clone):
- Hero: was a collage of Scale's research papers. Now a neutral field of records at 1920 x 686.
- Capabilities (Scale's 01.png): text and figures redrawn at 1188 x 616. **The dot map is still cropped from Scale's image.** Its highlighted dots and legend are placeholders, see below.
- Loop diagram (02.png): redrawn at 1216 x 637 with Watch, Match, Write, Report and the exception queue.
- Resource tiles (TIME and Zeitgeist): neutral at the same box.
- Demo thumbnails and videos: text-free app wireframes and 6s still videos, 3 KB to 8 KB each.
- Kept: `product-overview.webp` (abstract, no brand), `prefooter.webp`.

## Placeholders
`// PLACEHOLDER` in `content.ts`, 12 lines: trust line, 3 logo tiles, capabilities map, testimonial name, role and quote, 3 demo videos, case study row. Figures in the capabilities image: "14+ integrations" is the research's list of 14, "3+ systems per record" is its "three or more systems". The map shows Scale's coverage dots, not Vahue's regions.
