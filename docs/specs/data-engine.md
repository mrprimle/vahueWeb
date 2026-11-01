# /data-engine

Live source: https://scale.com/data-engine at 1440x900, 800x900 and 390x844 (touch), 2026-11-01. Menu label here: All Workflows. Page: `app/data-engine/page.tsx`, `components/pages/data-engine/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). This page adds two libraries Scale bundles in chunk `1a9k8nwrsxal6.js` (module 386218): `@headlessui/react` 2.2.9 (`Transition`) and `react-type-animation` 3.2.0. Versions were picked, not read from Scale's bundle; the measured chat timing below matches. Keen Slider and its CSS (`3sk9m3eqw4ah3.css`) come from the `keen-slider` package.

No new shared components. The page reuses `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `ClientTestimonials`, `PageThemeSetter`. Page-only ports: `ChatWindow` (386218), `BuildAiSection` (819615, 611557, 269185), `ResourcesCarousel` (382790, wheel plugin 29713), `SectionTitle` (1900), case study markup (554920). CSS modules `OpfpwG_box__chat`, `_5fl2pa_background` and the styled-jsx `build-ai-chat-window-light` block are in `data-engine.module.css`.

The page is mostly server-rendered markup in Scale's RSC payload, so most strings are not in any chunk.

## Sections
Tops and heights at 1440, Scale then ours. All values measured after a full scroll.

| # | Section | Top | Height | Height at 390 |
|---|---|---|---|---|
| 1 | Hero (478135 non-globe branch, `startPercentage` 0) | 39.3, 39.3 | 856, 856 | 616, 616 |
| 2 | Logo row | 895.3, 895.3 | 144, 144 | 120, 120 |
| 3 | Best in business, 4 cards | 1039.3, 1039.3 | 890, 890 | 1477.9, 1477.9 |
| 4 | Case study | 1929.3, 1929.3 | 500, 500 | 638.2, 638.2 |
| 5 to 10 | Grey wrapper: chat showcase, diagram and 4 steps, 4 type cards, 4 resources, testimonial, pre-footer | 2429.3, 2429.3 | 4472.2, 4470.7 | 5324.6, 5323.4 |
| | Page height | | 7800, 7799 | 9639, 9638 |

Remaining element-level deltas are text widths (Aeonik vs Aeonik Pro, or new copy) and the testimonial's mono label, which sets on 3 lines on Scale and 2 here (DM Mono). No overflow at either width.

## Interaction inventory
Listeners: REA `inspect_web_event_listeners`, plus `DOMDebugger.getEventListeners` over all 554 `main` nodes (see Other tooling). React handlers are delegated to the root, so element-level results show only native listeners.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero and pre-footer roots, `article`, `#build-ai`, `.ClientTestimonials`, logo `ul` | any | None. REA `ev_1bab15a9…`, `ev_265a971c…`, `ev_bc5f9502…`, `ev_24a78ff5…`, `ev_848c16e4…` | | No hover, no pointer tracking | Pointer grid at 11 scroll stops, 42 points each: no style change beyond CTA washes and the chat's own clock, both |
| Hero text | load | ScrollTrigger `top center`, retroactive | 540431, 947153 | Lines and words from AnimatedText | Line y from trigger, 305ms: 49.6 vs 30.9; 611ms: 6.2 vs 3.9, both 0 by 1223. Sampling starts at a different frame; word opacity .79 vs .80, .98 vs .98 |
| Hero CTA | load | gsap, delay .5 | 961870 `filledWhiteArrow` | .85s, `power3.out` | Opacity .1465, .8631, .9958, 1 at the same steps, equal; radius 1, 7, 8, 8 equal |
| Hero media | scroll | ScrollTrigger scrub `top bottom` to `center center` | 540431 | Scale 1.25 to 1; clip 0 | 1.0139 at top, 1 at 304, equal |
| Pre-footer clip and media | scroll | Same, `startPercentage` 10 | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | y 5472: 3.327% vs 3.321%, 1.1664 vs 1.166. y 5776: 1.451% vs 1.444%. 0 at 6080, both |
| Testimonial panel | scroll | ScrollTrigger scrub | 685963 | 90% to 100% | y 4560: 90.14 vs 90.14. y 4864: 98.60 vs 98.60. y 5168: 99.97 vs 99.97 |
| Quote and name | in view | ScrollTrigger | 685963 | Line flip, chip | Ported, same flip matrix at the same scroll stops. One testimonial: no arrows |
| Chat loop | timer, from mount | `useState` steps, not scroll | 386218 | Start 1s. Question 40ms a key +-50%, 300ms, step 4. Dots 60ms, 500ms holds, step 5. Panel 300ms in, 1s, swap, 2s, 200ms out. Answer 150ms in, 2s, restart | Question to panel 3.76s vs 3.86s (random keys). Panel to answer 3.56s vs 3.56s. Answer to restart 2.44s vs 2.44s |
| Ranking pills | step 6 | Class change, 300ms ease-out | 386218 | `translate-y` 80, -34, -33 from `sm` | Last frame before the panel unmounts: 79.87, -34, -32.95 vs 79.47, -34, -32.78; same wash, same text colour |
| FlatCta wash, label | pointerenter, leave, re-enter | React, shared | 892855 | Fill 300ms, arrow 600ms, label .9 | Enter 38.38%, 9.20%, .16% vs 38.40%, 9.21%, .16%. Leave -61.6, -90.8, -99.8 equal. Arrow -30.60, -17.40 vs -30.61, -17.40 |
| CTA focus | Tab | Browser default plus `focus:outline-1` | 463059 | First Tab lands on the announcement link, both | Equal |
| Resource cards from `lg` | hover | None | 382790 | Cursor pointer only | Equal |
| Testimonial tab | hover, click, ArrowRight | React, shared | 685963 | One testimonial, already active | No change, both |
| Keen Slider below `lg` | touch drag, 390 | `touchstart`, `touchmove`, `touchend`. REA `ev_c0c416a3…` | 577476, 382790 | `snap`, `perView` 1.05, spacing 24 | Slide 1: 0, -32, -80, -128, -176, -224, -298.5, -335.9, -346.7, -348.5, -348.6, equal |
| Same | short drag, 390 | Same | | Springs back in 500ms | -701.1, -698.7, -697.5, -697.2, -697.1, equal |
| Same | mouse drag, 800 | `mousedown`, `mousemove`, `mouseup` | | `free`, `perView` 2, cursor grabbing then grab | -270, -355.5, -447.4, -528.1, -598.5, -668.4, -718.6, -760.8, -776 vs -270, -355.6, -447.5, -528.2, -598.5, -668.4, -718.7, -760.8, -776 |
| Same | Tab, 800 | `keydown`, `focusin` on the wrapper | 382790 | Moves one slide, clamps | 0, -388, -776, -776, equal |
| Same | horizontal wheel, 800 | `wheel` | 29713 | Plugin ported | Track stays at 0 for `deltaX` 60 x 6 on both |
| Logo row | swipe, 390 | Native `overflow-x-auto` | | | Scroll width 961 in 342, equal |
| Section theme | | `PageThemeSetter theme="light"` | 243385 | No dark sections | Equal |

## Deviations from Scale
- **Fonts:** see stack.md. New copy also changes text widths.
- **`pageTheme`-driven classes** are kept, though this page is always light.
- **Case study tile:** `bg-evergreen` replaces TIME's red. The logo tile is 240 x 75, Scale's rendered box (`height: auto` on a 240 x 96 image).
- **Images replaced at fill:** resource tile 1 was OpenAI's mark, now a neutral icon at 280 x 228. The training-loop diagram had Scale's process baked in, now `diagram-workflow.webp`, redrawn at the same 1920 x 1005 and layout with the Back-office Sync steps. Logos removed from `public/`; recover them from commit 7b500fa to re-check the clone.
- **Pre-footer image:** downscaled from 7952 to 1920 wide.
- **Image quality:** Scale requests `q=85` for the two large images. Here they use Next's default 75: 85 is not in `images.qualities`, and `next.config.ts` is outside this page.

## REA evidence
Live page, 47 of 47 scripts parsed, no failures: `analyze_web_bundle` `ev_43864d21fdb3dec7040d9536d473b1153dd1fbaec677891f634d5dee69c04106`.

Execution, 55s precise coverage with the same scripted drive on both pages (chat, CTA hover, testimonial scroll, then slider drag and Tab at 800 wide):
- Scale: `observe_web_execution` `ev_1ae16a1292d95da7327146ecb5115d5bceaef82dd5709503f956f3a4fab3c0a7`
- Ours, on the dev server: `observe_web_execution` `ev_20559ffe55aa79f6e556d57c77cff9577842ff269ea97de012b0c8b31112dcfc`

Both results exceed REA's 10 MB response limit, so they were read from `export_evidence_bundle` output. Module attribution is from offsets into the retained source. On ours, the dev build's module markers put some functions under the neighbouring file, so counts below were matched by function name and source.

Listeners, `inspect_web_event_listeners`: `.keen-slider` `ev_c0c416a31ec2dd40f6d4b82abebf0bf37cd57301b0951249b9fba0a5ab7d6482`. No listeners on `.ClipScrollSection` `ev_1bab15a9090379ad5271f4bce31db219fb54719f8d8d06009996a9f6ffc747fa`, `article` `ev_265a971c732dc836bd4be8491de3d0a8e2278df8f1686307cbc2140a455522aa`, `#build-ai` `ev_bc5f9502dd622e37dd9830a27158b225db42f816df94792ebf0ac9e5e4e2bf69`, `.ClientTestimonials` `ev_24a78ff54859dc6ef2222ccf41fe3e7cc2137b3becc7b214a118f1682d92cea4`, logo `ul` `ev_848c16e488d2a055d88b4ffd2bb2db85979eb35bea62d131c719f232e1c3a8de`.

Not run: `capture_browser_scenario` and `inspect_web_page`. The first has no hover or drag action, so `observe_web_execution` covered the four interactions.

### Calls in the window
| Function | Module | Scale | Ours |
|---|---|---|---|
| Slider `dragStarted`, `dragEnded` | 382790 | 1, 1 | 1, 1 |
| Slider `keydown` Tab, `focusin` | 382790 | 3, 5 | 3, 5 |
| FlatCta enter, leave, 680ms timer, finish leave | 892855 | 2, 2, 2, 2 | 2, 2, 2, 2 |
| FlatCta `transitionend` | 892855 | 4 | 4 |
| Chat question done, dots done | 386218 | 5, 4 | 4, 4 |
| Chat panel `afterEnter`, `afterLeave` | 386218 | 4, 4 | 4, 5 |
| Chat answer `afterEnter` | 386218 | 4 | 5 |
| Testimonial `onEnter`, chip `animateToText` | 685963 | 1, 1 | 1, 1 |
| Hero and pre-footer media scrub `onUpdate` | 540431 | 73 | 75 |
| Hero and pre-footer reveal `onEnter` | 540431 | 16 | 12 |

Chat counts differ by one because the 55s window cuts the 12s loop at a different phase.

### Reconciled
- **Page code:** every function that ran in the page's modules has a counterpart in this build or the shared ports. No page code changed as a result of this pass.
- **Reveal `onEnter`, 16 vs 12:** cause not found. A second call before the reveal ends would restart it, so the pre-footer reveal was sampled at 100ms on both. Word opacity never dips on either, and text and CTA reach their end state by about 1.5s. Mid-curve values differ (line y at about 305ms: 64.5 vs 93.0), and CTA opacity at about 610ms is .39 vs .15. I read that as sampling phase within the 100ms step, not as a measured timing match.
- **Testimonial tab:** with one testimonial, hover, click and ArrowRight change nothing on either site. Click moves focus to the button on both; Tab then moves to the next link on both.
- **Wheel plugin 29713:** not called in either window. The horizontal wheel test in the table above is its only check.
- **Three.js and the 975 KB `0sni47mcvnqwg.js`:** both load on Scale's page, which has no `canvas`. They and 17 other chunks are absent from the coverage sample. REA states that absence does not prove zero execution, so this is not proof they stayed idle. Nothing on the page needs them.

### Differences left, outside this page
- **Favicon swap:** Scale's module 507085 points the SVG icon at `/favicon-dark.svg` or `/favicon-light.svg` from `prefers-color-scheme`. This repo has no favicon yet (`_chrome.md`). It belongs to the chrome and needs a Vahue icon.
- **Analytics:** GTM, FullStory, Segment, Dreamdata, LinkedIn, Facebook, X and HubSpot scripts run on Scale. `_chrome.md` already records them as not built.
- **Route prefetch:** Scale prefetches `_rsc` payloads for visible links. Ours requested none on the dev server. `next/link` prefetch only runs in production builds, and no production build was measured.

### Other tooling
Playwright and CDP also ran: `DOMDebugger.getEventListeners` on every `main` node, pointer grids, and the sampled curves. `new-qa/data-engine/instr.cjs` in the scratchpad holds the harness.

## Gaps
- `oml:` landscape was not driven.
- Real iOS was not driven: touch runs through CDP on Chrome.
- Headless UI and react-type-animation versions were chosen by behaviour, not read from Scale.

## Copy mapping
Hub page, so it sells all workflows and the Audit, Pilot and Operate offer. Best in business became the four promises from the research gap (accuracy check, baseline, capacity, control). The chat showcase became Knowledge Agents, with the ranking step shown as a reviewer choosing the right answer. The diagram and four steps became Back-office Sync (Watch, Match, Write, Report), the top job. Annotation types became the workflow types. Resources became stalled pilots, baselines, document intake and scoring. CTA "Build AI" became the menu label of its destination: Knowledge Agents, Back-office Sync. Generic labels are unchanged: "Customer Case Study", "Read customer story", "RESOURCES", "Don't just take our word for it".

Word counts are within 15% of Scale's for 73 of 82 strings. The exceptions, all one word off unless noted: "Measured From Day One" (the research's own line), the Write title, Treaty Review, Lab Reports, Vahue Back-office Sync, Learn More About Workflow Agents, the hidden blog description (32 vs 26), and the page meta title and description. The meta strings are not visible. The visible ones stay short because longer versions wrapped onto extra lines and changed section heights.

## Placeholders
`// PLACEHOLDER` in `content.ts`: 7 logo tiles, case study text and logo tile, testimonial name, role and quote. 12 lines. No numbers on this page.
