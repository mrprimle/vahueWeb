# /public-sector-data-engine

Live source: https://scale.com/public-sector-data-engine at 1920, 1450, 1440, 1280, 1100, 1024, 800, 768, 700, 640 and 390 (touch) wide, 2026-11-01. Menu label here: For Government. Page: `app/public-sector-data-engine/page.tsx`, `components/pages/public-sector-data-engine/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). No new package. Most of the page is server-rendered markup in the RSC payload. Icons are inline paths from that markup.

New shared port: `ChecklistWithMedia` (module 872447), added to stack.md. `SectionTitle` gained an additive `inheritColor` prop: Scale's demos block on this page leaves the overtitle and title colours to the page. `gray-50` was added to the `@source inline` line in `globals.css`, for the pre-footer backdrop.

Reused: `FullBleedMediaSection`, `LogoCloud`, `FeaturesWithIcons`, `SectionTitle`, `ClientTestimonials`, `ResourcesCarousel`, `PageThemeSetter`. `VideoGallery` is imported from `components/pages/generative-ai-data-engine`, since module 482270 is the same on both pages.

## Sections
Tops and heights at 1440, Scale then ours, filled page, after a full scroll.

| # | Section | Module | Top | Height | Height at 390 |
|---|---|---|---|---|---|
| 1 | Hero | 478135 non-globe, 540431, `startPercentage` 0 | 39.3, 39.3 | 856, 856 | 616, 616 |
| 2 | Logo row and customers link, 5 logos | 970272, 922998 | 895.3, 895.3 | 217.4, 217.4 | 235.8, 235.8 |
| 3 | Product overview, 3 features | 1900, 460138 `columns` 3 | 1112.6, 1112.6 | 528, 528 | 1040.4, 1040.4 |
| 4 | Why, checklist and diagram | 1900, 872447 | 1640.6, 1640.6 | 1020.3, 1020.4 | 1188.1, 1188.2 |
| 5 | Testimonial, cloud-slate panel | 685963 default theme | 2660.9, 2661 | 852, 851 | 969.4, 968.4 |
| 6 | Demos gallery | 1900, 482270, 832862 | 3513, 3512.1 | 1272.9, 1272.9 | 588.7, 588.7 |
| 7 | Resources, 4 items | 1900, 382790 | 4785.9, 4785 | 674.4, 674.4 | 571.3, 571.3 |
| 8 | Pre-footer, `gray-50` backdrop | 540431, default `startPercentage` 10 | 5524.3, 5523.3 | 752, 752 | 512, 512 |

Other widths, filled page:
- 800, 768, 700, 1100, 1280, 1450 and 1920: clone checked, every section within 1px except the 1px of the testimonial heading. The filled page was re-measured at 800, within 1px.
- 1024: testimonial 1047.2 vs 997.4. One quote line wraps earlier on Scale, in the clone too, with Scale's own string: a font gap. Every other section is within 1px.
- 640: overview 920.4 vs 894.8 and why 1239.9 vs 1219. Overview's subtitle takes 2 lines on Scale and 1 here, also in the clone. Why's second item takes 3 lines on Scale and 2 here.

Total page height also differs at some widths: 800 (7751 vs 7628), 1024, 1100. Past the differences above it is all in the footer, which `_chrome.md` lists as not sampled at those widths. No overflow at any width.

## Interaction inventory
Listeners: REA `inspect_web_event_listeners` plus `DOMDebugger.getEventListeners` over all `main` nodes. React handlers are delegated to the root, so element results show only native listeners. On Scale, `mousedown` capture comes from HubSpot analytics (`4823527.js`) and bare `click` is React's iOS click trap (`42ixmvih7808g.js`).

Measured values are the clone stage, which has the same code and Scale's strings, unless marked filled.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| `.FullBleedMediaSection`, logo `ul`, `figure`, checklist root, `.ClientTestimonials`, gallery root | any | None. `ev_284fe7cf…`, `ev_e1ba1101…`, `ev_5bafbaab…`, `ev_91315eb4…`, `ev_a01f78d0…`, `ev_f45e2b5f…` | | No hover, no pointer tracking | Pointer grid at 800px scroll steps: changes only on hero CTA wash, play button, pre-footer CTA, both |
| `html`, `body` | scroll, touchstart | Lenis, GSAP, plus OneTrust on Scale. `ev_4e03a42c…`, `ev_311e8fc5…` | chrome | | Same apart from OneTrust |
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words | Same curve, Scale starts later because the load is slower: line y 45.8, 9.7 vs 3.6, .04 at different phases. Both end at 0 |
| Hero CTA | load | gsap, delay .5 | 961870 | .85s, `power3.out` | Ends at opacity 1, radius 8, both. Scale's samples started after its slow load |
| Hero media | scroll | ScrollTrigger scrub | 540431 | 1.25 to 1 | 1.0139 at top, 1 at y 304, equal |
| Pre-footer clip and media | scroll | ScrollTrigger scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | y 4864: 3.519% vs 3.512%. y 5168: 1.642% vs 1.636%. 0 at 5472, both. Scale 1.1759, 1.0821 vs 1.1756, 1.0818. The offset is the 1px page shift. Filled: same values |
| Testimonial panel | scroll | ScrollTrigger scrub | 685963 | 90% to 100% | y 2128: 97.531% vs 97.536%. y 2432: 99.864% vs 99.865%. Filled: same values |
| Quote and chip | in view | ScrollTrigger | 685963 | Line flip, chip | Chip 114, 138 on Scale's string vs 107, 134 in the clone (font), 104 filled, where the width follows "ROLE, COMPANY" |
| Testimonial tab | hover, click, ArrowRight, Tab | React, `ev_ee154b82…` | 685963 | One tab, shows the client's name | 108.66 square, selected. Nothing changes; click moves focus to the button, both. Filled: same |
| Customers link arrow | hover, leave | CSS, `ev_d9509d31…` | 426764 | `translate-x-1`, 300ms ease-out | Enter 1.77, 2.98, 3.63, 3.94, 4 vs 2.14, 3.18, 3.63, 3.94, 4. Leave 2.23, 1.02, .37 equal |
| Customers link colour | hover | None | 426764 | `hover:text-blue-700` never wins, see `/generative-ai-data-engine` | rgb(0,142,255) throughout, both |
| Logo row, phone | timer | CSS animation | 922998 | 50px/s, two copies, no pause | 15.76s, width 788, 5 tiles and margins equal. Steps of 25px per 500ms, both |
| Gallery play button | hover | CSS | 832862 | `bg-black/50` to `/70`, 200ms, `ev_26507664…` | .5, .59, .68, .7 vs .5, .55, .67, .7 |
| Gallery play button | focus | Native | 832862 | Default focus ring | rgb(0,95,204) auto 1px, both |
| Gallery play button | click | React | 832862 | Swaps to the player, Wistia iframe `?autoPlay=1` | Same iframe URL in the clone. Filled: local `<video>`, as on `/generative-ai-data-engine` |
| Gallery slide | hover, not active | CSS | 482270 | `hover:opacity-70`, 300ms, base .5 | .5, .535, .655, .69, .7 equal. Leave .7, .665, .561, .51, .5 equal |
| Gallery slide | click | React, `ev_d9d3e6c8…` | 482270 | Sets active, autoplays, native smooth `scrollTo` to root top - 16 | y 3969 to 3729, 3968 to 3728. Player fades in .6s: .26, .56, .77, .94, 1 vs .30, .56, .77, .94, 1 |
| Gallery slider | drag, 700 | `ev_8fb978c5…` | 577476, 482270 | Snap, `perView` 2 | -225 at release, -296.7, -342 equal. Cursor `grabbing`, `grab`, equal |
| Gallery slider | drag, 800, 1100, 1440 | Same | | `perView` 3.1 or 3 | Locked at 0 on 3 slides, cursor stays `default`, both |
| Gallery slider | touch, 390 | Same | | Each slide is a player, dots below | 0, -32, -80, -128, -176, -224, -313.7, -358.7, -371.7, -374, equal |
| Gallery dots | tap, 390 | React | 482270 | `moveToIdx` | -597.6, -709.9, -742.3, -747.7, -748 vs -597.8, -709.9, -742.3, -747.7, -748 |
| Resources slider | mouse drag | `ev_a3cdfc14…`, `ev_7b2e3626…` | 382790 | `free`, `perView` 1.4, 2, 2.8 | 1440: -225, -295.8, -370.4 … clamp -579.43 vs -225, -296.2, -371.4 … -579.43. 1100 equal to the digit. Cursor `grabbing`, `grab`, equal |
| Resources slider | mouse drag, 700 | Same | | Same | -225, -296.7, -373.6, -441.1 vs -225, -284.8, -348.8, -404.7: same release, lower release velocity on this run, as the dev machine was under load. 800 and 1100 agree to under 1px on the same run |
| Resources slider | touch, 390 | Same | | Snap, 1.05 | 0 … -224, -312.2, -356.4, -369.2, -371.3, -371.43, equal |
| Resources slider | wheel | Plugin | 29713 | Horizontal only | 0 for `deltaX` 60 x 6, both |
| Resources slider | Tab | `keydown`, `focusin` on wrapper, `ev_0018baa0…` | 382790 | Moves one slide | 2 and 3 handler calls, both (table below) |
| FlatCta wash, arrow | enter, leave | React, `ev_ac43b555…` | 892855 | Fill 300ms, arrow 600ms | Enter -55.8, -31.5, -16.1 vs -61.2, -34.8, -18.2, phase differs. Leave 38.8, 65.2, 81.8 equal |
| Section theme | | `PageThemeSetter theme="light"` | 243385 | No dark sections | Equal |

## Visual check
Side-by-side pairs at 1440 and 390, wheel-driven at 1440, every 50% of the viewport and every 10% inside the testimonial and pre-footer scrub ranges, plus first paint and load frames. Pairs viewed by eye, clone and filled. Same layout, direction and rounded corners from the first frame.

Differences seen:
- **First paint, shared chrome:** Scale does not server-render the announcement bar. Its hero first paints at y 96, then moves down 39px to 135 when the bar mounts. Ours server-renders the bar's height, so the hero starts at 135 and does not move, and the band stays white until hydration. This comes from the layout, so it applies to all pages. Mike or the lead to decide; not changed here.
- **Lenis settling:** a few frames sit up to 7px apart at the same stop, as the two pages were still settling when captured. Final positions match.
- **Fonts and copy:** the testimonial heading takes 2 lines here and 3 on Scale (DM Mono). The chip is narrower, following its label.

## REA evidence
Live page, 56 of 56 scripts parsed: `analyze_web_bundle` `ev_2f757b4746e5448c62c9ff47938dec47859a64444a9e41c844a5ef4d10c3fb98`. `inspect_web_page` `ev_77a619b3fba4b9abe9982d1c97f14516a52aa6e71b0addfae027c7df94f7f53f` (status `policy_filtered`).

Execution, 45s precise coverage with the same scripted drive on both pages (hero CTA, testimonial scroll, slide hover and click, then resources drag, Tab and gallery drag at 700 wide):
- Scale: `observe_web_execution` `ev_b2182fa6a9cda0d009c54f2a25b25a1ff3c0c11911917f63a0f8b2d76a2015ae`
- Ours, dev server, clone stage: `observe_web_execution` `ev_cf3a6755c99225d896e65a0ccaf0daf602935e46611a18286a219fe141050eb0`

Both exceed REA's 10 MB response limit, so they were read from `export_evidence_bundle` output (250 MB, deleted after extraction).

| Function | Module | Scale | Ours |
|---|---|---|---|
| Gallery `dragStarted`, `dragEnded`, `slideChanged` | 482270 | 1, 1, 1 | 1, 1, 2 |
| Resources `dragStarted`, `dragEnded` | 382790 | 1, 1 | 1, 1 |
| Resources `keydown`, `focusin` | 382790 | 2, 3 | 2, 3 |
| Keen `emit` | 577476 | 219 | 238 |

Both drives end with the same transforms: gallery -342, same resource positions. I did not find the cause of the extra `slideChanged` and the 19 extra `emit` calls in ours. `/generative-ai-data-engine` measured `slideChanged` 2 on both pages with the same drive, so this may be timing in a shared Chrome.

Listeners, not named in the inventory: `.keen-slider__slide` in the gallery `ev_d9d3e6c8facb0eae6f1ee7639c348cdf646babbb522db564e83270a491aff480`, resources slide `ev_7b2e362666049454539e7067790417cd91b38d2cfc70609e3a4e34c62f2a2a80`.

Not fully run:
- `capture_browser_scenario`, `ev_f9a77d006af6deb5307688d7123651eb41a31994a288b23767238d809ad94c68`: failed on my selector (strict mode, three matches), so only the page load was captured. The retry was rejected during an interruption and I did not repeat it. `observe_web_execution` covered the drive, and Playwright sampled the same clicks.
- `compare_web_captures`, `compare_web_screenshots`: not run, as they need complete results or PNGs passed inline. The DOM measurements and viewed pairs replaced them.
- `trace_web_source_location`: Scale serves no source maps. `trace_web_module_imports`: Turbopack module ids are outside native ES imports, so modules were read directly.

Other tooling: Playwright and CDP. Harness in the scratchpad: `new-qa/public-sector-data-engine/instr.cjs`, `geo.py`, `sheets.py`. Images: `new-qa/public-sector-data-engine/gen/make.cjs`. The watchdog may have removed these by now.

## Deviations from Scale
- **Fonts:** see stack.md. Customers link is 161.4 wide vs 156.3, in the clone too.
- **Image quality:** Scale asks for `q` 80 on the checklist image. Next's default 75 here, as on the other pages: other values are not in `images.qualities`.
- **Keen `centered: true`, wheel listeners in dev, Wistia oEmbed:** as on `/generative-ai-data-engine`.
- **`ChecklistWithMedia` `mockup` branch:** not ported, this page does not use it.

## Gaps
- Dev console on the filled page: the favicon 404 (`_chrome.md`) and Next's dev LCP hint for the hero.
- `oml:` landscape and real iOS were not driven. Touch runs through CDP on Chrome.
- Execution evidence was taken at the clone stage. The filled page reran geometry, curves and the visual pairs, not REA coverage.
- Motion sampled at 100ms in a dev build, under load from other agents: mid-curve values differ by phase, end states match.

## Copy mapping
Scale's page sells a data engine to defense and civilian agencies. Here it sells the same offer as the rest of the site to public-sector buyers: agents that run high-volume workflows, measured against a baseline. The research has no public-sector workflow of its own, so the substance comes from its public-service cases (North Yorkshire adoption, NSW Health planning, the Azerbaijan workshop) and two of its jobs: using AI in daily public-service work "without taking unmanaged data or quality risks", and regulated document work, where the criteria run coverage and accuracy, traceability, human review, then speed. The military and intelligence angle is gone.

- Hero and overview: "Agents for Government", matching the menu label. Federal, state and local replace defense, intelligence and civilian.
- Three features follow Scale's roles. Annotation became Document Intake, Curation became Knowledge Agents (ask, then prioritize gaps), Evaluation became Accuracy Reviews.
- "Why Scale" became "Why Vahue". The three checklist items are control features, baseline-first delivery and human review from `research.ts`.
- "Book a Demo" became "Book an Audit". "Meet our customers" points at `/public-sector`. The four blog tiles point at `/blog`, as their posts do not exist.
- Unchanged generic labels: "PRODUCT OVERVIEW", "Demos", "RESOURCES", "Blog", "Learn More About Our Work", "Don’t just take our word for it", "Meet our customers".

Word counts are within 15% of Scale's for 40 of 46 strings. The six exceptions, each one word off apart from the meta title: hero, overview and demos titles, two demo titles, meta title (4 vs 6). Line counts were matched first, so heights hold.

**Images replaced at fill**, removed from `public/` (recover from commit b855dad to re-check the clone):
- Hero: was a Scale product map with heat zones and small labels. Now an unlabelled dark district map with amber density at 1920 x 1078.
- Why diagram: **the frame, arrows and three line icons are still Scale's**, cropped from its 01.png. Only the labels are redrawn.
- Demo posters and videos: text-free app wireframes with a caption, on Scale's layout, 1920 x 938. Videos are 6s stills, about 10 KB each.
- Resource tiles (Scale and partner logos): neutral line drawings on black at 1152 x 720.
- Logos: neutral tiles at Scale's exact boxes.
- Kept: `prefooter.webp`, same file as the other pages.

## Placeholders
`// PLACEHOLDER` in `content.ts`, 16 lines: trust line, 5 logo tiles, testimonial name, role and quote, 3 demo videos, 4 blog tiles. The quote's "3 months" and "15 months" keep Scale's format and are not real figures.
