# /enterprise/healthcare

Live source: https://scale.com/enterprise/healthcare, 2026-11-01. Menu label here: Healthcare. Page: `app/enterprise/healthcare/page.tsx`, `components/pages/enterprise-healthcare/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`. Clone commit: 582772f. Clone assets the filled page does not use (Scale logos, X-ray and MRI photos, headshots, Scale-branded posters, video excerpts) were removed at fill: recover them from that commit to re-check the clone.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` `ev_ba58bfe7…`: 47 of 47 scripts parsed, Next.js and React fingerprints, no WebMCP, source maps not requested. `inspect_web_page` `ev_a56208ef…`. No WebGL on this page: three.js chunks are preloaded only.

Reused: `FullBleedMediaSection`, `ClientTestimonials` (`metrics`), `BlogPreview`, `HeadlineWithCta`, `RichText`, `LogoMarquee`, `ResponsiveImage`, `PageThemeSetter`, `SectionThemeWatcher`. New and shared: `TabbedPanel` (591798), `SgpStack` (290276), `BlogVideoDialog` (808358's dialog). Additive shared edits: `videoUrl` on `BlogPreview`, `imageBackgroundColor` on `FullBleedMediaSection` (Scale's per-image palette colour while the image loads). Page-only: `OrderGuidanceMockup` (453596), `SchedulingMockup` (218184), `CustomAgentsMockup` (69472), `LayerIllustration` (892353, `animation: "gsap"`), `icons.tsx` (the 18 react-icons Material paths from 473665).

## Sections
Order from the RSC payload. Heights below are measured after a real wheel pass, because text animations re-lay lines when they split.

| # | Section | Module | 1440 | 1280 | 1100 | 1024 | 1023 | 768 | 640 | 390 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero, non-globe, `startPercentage` 0, gradient overlay, logo marquee | 478135, 540431 | 720 | 720 | 720 | 720 | 720 | 720 | 480 | 480 |
| 2 | Tabbed panel, 3 tabs with live mock UIs | 591798, 453596, 218184, 69472 | equal | equal | equal | equal | equal | equal | equal | equal |
| 3 | Testimonial with metric | 685963 | 738.2 vs 737.2 | 782 vs 781 | 869.7 vs 868.7 | 913.5 vs 912.5 | 823.1 vs 822.1 | 886.8 vs 885.8 | 814.2 vs 813.2 | 994.3 vs 993.3 |
| 4 | Reliability layer, 3 cards and floating layers | 290276, 892353 | 839 | 839 | 874.3 vs 857.1 | 937.8 | 1530.1 | 1542.7 | 1356.9 | 1150.3 |
| 5 | Fuel Your AI Strategy, 3 tiles, 2 play video | 808358 | 970.3 | 932.8 | 890.6 | 872.8 | 1944.5 | 1546.1 | 1453.6 | 1048.9 |
| 6 | Trust, heading and 8 badges | inline, 925107, 669677 | 425.6 | 398 | 395.8 | 387.4 | 387.3 | 439.2 | 674.3 | 551.7 |
| 7 | Pre-footer, `headlineWidth: narrow` | 540431 | 720 | 720 | 720 | 720 | 720 | 720 | 480 | 480 |

Also measured after reveal at 1920, 900, 767 and 480: equal apart from the causes below (1920 fully equal). No horizontal overflow at any width.

Layout changes by width: the panel goes from column to row at `lg` (1024), the media box from `aspect-[4/3]` to `aspect-square`, the mock's scheduling grid to two columns at `lg`. Stack cards go from column to row at `oml` and into the right 7 columns at `lg`, the illustration from flow to absolute at `lg`. Tiles lose the overlay variant and show 3 at most below 1024. Trust moves to a row from `md`. Testimonial tabs move into the left column from `lg`.

Differences that remain:
- Testimonial 1px below Scale everywhere, on clone and filled: the chip's inline-block line box under DM Mono, the Aeonik Mono stand-in (font gap, stack.md).
- 1100 only, filled: the stack is 17px shorter, as "Case-based evals and healthcare ops experts" wraps one line less than Scale's string there. Other wordings broke 390 or 1280, so this one stays.
- Shared chrome, not chased per the brief: footer at 1100, 1024, 768, and the announcement bar at 480 (page 20px lower, heights equal).

## Interaction inventory
Same script on both sites (`motion.cjs`, scratchpad `hc`), real wheel, pointer and keyboard, headless, at 1440 and 390, clone and filled.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero, pre-footer | scroll | None direct `ev_55b6c2de…`. ScrollTrigger | 540431, 656598 | Media scale 1.25 to 1, `top bottom` to `center center` | Hero at 0: 1.0139, 1.006 at 390, equal. Pre-footer at 1440: 1.25, 1.1806, 1.1111, 1.0417, 1, equal. At 390 the first sample 1.2489 vs 1.25, then 1.1703, 1.0906, 1.011, 1, equal |
| Hero logos | load | None. CSS `logo-marquee` | 880750 | 40s | Same animation and duration |
| Tab buttons | click | Native `mousedown` plus `click` from trackers, React delegated `ev_494adbce…`. Root none `ev_3272291c…` | 591798 | State swap, no panel motion; 150ms `transition-colors` on the button | Colours and label opacity equal mid-transition, `rgba(242,242,242,.165)` and `.835` |
| Tab button | hover | None | 591798 | No hover state | `rgba(0,0,0,0)`, equal |
| Tab CTA | hover | React delegated | 591798 | `hover:opacity-70` | 1, .79, .70, equal |
| Referral mock | in view at .3 | None on root `ev_0d7ae790…`, IntersectionObserver | 453596 | Steps 450ms, chips then 5 fields, pause 3200ms, restart | Step sequence 5 chips then 5 fields, same 450ms cadence, phase within one 100ms sample |
| Scheduling mock | in view at .3 | None `ev_6b692b24…`. Button `mousedown` only `ev_c2aa1204…` (tracker, `tabIndex -1`) | 218184 | Every 4000ms: fade out 300ms, swap at 220ms | Dip starts at the same sample, 3.9s after the tab opens; .38, .07, .65, .93 vs .26, .04, .72, .97 (sampling phase) |
| Custom agents mock | in view at .3, once | None `ev_d6a9f38a…` | 69472 | Back card 700ms, `translate` 8px; front 700ms, delay 150ms, 16px | .23, .48, .66 and 6.13, 4.13, 2.75px on both in the same phase |
| Testimonial panel | scroll | None `ev_feca6857…`. Buttons `mousedown`, `click` `ev_6db7dd27…` | 685963 | Width 90% to 100%, `top bottom` to `bottom 75%` | 90, 94.13, 98.20, 99.67, 99.98, 100 equal within .005 |
| Stack background | scroll | None `ev_233dacf2…` | 290276 | Scale .98 to 1 with `scrub: true`, `top bottom` to `bottom 75%` | 11 points equal to 4 decimals at both widths |
| Stack cards | `top 85%`, back | None `ev_8d003e50…` | 290276 | Text animation 947153 export F. Cards pass no `cardIndex`, so delay is 0 for all on Scale as well | Same frames; `.SgpStack article` opacity 1 after reveal, equal |
| Floating layers | in view | None `ev_3e0cffce…` | 892353 | `y` -6, sine.inOut, yoyo, half of 6.5, 8.5, 7s, delays 4, 2.5, 0 | At 390, -3.98, -3.75, -2.42 on both, then within .04. Layer boxes and scale equal |
| Blog section | scroll, in view | None `ev_d181135f…` | 808358 | Tile zoom 1.08 to 1, title reveal | Same frames |
| Video tile | hover | `mousedown`, `click` `ev_dc6b60c9…` | 808358 | Image scale 1.05 over 1000ms, play badge 1.1 over 300ms | 1.0205, 1.03225, 1.04 and 1.0776, 1.1, equal |
| Video tile | click | Radix on Scale, own dialog here | 808358, 832862 | Box `w-[70vw]` centred, overlay black/70 with blur, focus moves in | 216, 138.1, 1008 x 623.9; 9.8, 279, 370.5 x 286.1 at 390, equal |
| Video dialog | Escape, overlay click | Radix on Scale | 808358 | Closes, focus returns to the tile | Equal |
| Video dialog | wheel | Lenis keeps listening | | Scale's page scrolls behind the dialog | 318px after a 400 wheel, both. Kept on purpose |
| Trust, badges | none | None `ev_8e9d21fe…`. Image `error`, `load` only `ev_d5f646f2…` | static | Grayscale, opacity .35 | Equal |
| CTA links | hover | `mousedown`, `click` `ev_34ad8281…` | 892855 | As other pages | Shared, verified on `/enterprise` |
| `html`, `body` | scroll, keydown, touchstart | `ev_8afe97ae…` (scroll, keydown), `ev_c4289aa4…` (touchstart) | runtime, trackers | No page logic | Nothing to port |

REA execution windows, in a one-tab headless Chrome: `observe_web_execution` `ev_272e6900…` (30s: wheel, 3 tabs, tile hover, dialog, Escape) and `ev_e4a40973…` (5s: 3 tab clicks). Both finished but overran the MCP response limit, so they were read from a 607 MB export, then deleted. Executed functions inside the modules, 5s and 30s window: TabbedPanel 3 and 3, order mock 9 and 9, scheduling 7 and 8, custom agents 11 and 12, SgpStack 4 and 3, layers 4 and 4. `capture_browser_scenario`, `compare_web_screenshots` and the source-map tools were not used: Playwright drove the input, pairs were read by eye, and Scale ships no maps. `window` listeners cannot be selected with the listener tool.

## Copy
Marketing strings, 41: 19 unchanged (46%), 20 changed lightly, 2 rewritten (the placeholder name and role). That is below the 80% target on purpose: nearly every Scale string here says clinical, and the brief limits healthcare to administrative workflows, so most lines swap one or two words inside Scale's sentence. Mock UI strings, 291: 176 unchanged, 88 light, 27 rewritten (clinical findings, procedures and orders became referrals, authorizations and paperwork in the same slots and order).

Swaps: Critical Decisions to Critical Workflows, Clinical Decision to Admin Workflow, clinicians to care teams, Order Guidance to Referral Intake, Deterioration Alert to Prior Authorization, Oncology Follow-Up to Referral Follow-Up, Radiology Safety Net to Referral Safety Net, SGP badges to Vahue and Agent names, EPIC EHR to EHR. Word choices were tuned so lines wrap as Scale's do ("our team is", "with each referral", "service and engineering").

Placeholders, 22 `// PLACEHOLDER` lines, all fictional until Mike fills them: 8 customer logos as neutral tiles, the testimonial (name, role, quote, metric, logo), case-study tile and 2 demo videos, mock figures, 8 certification badges.

## Images
Redrawn at Scale's sizes with the scene library other pages use (`niche/lib.js` in the scratchpad): `hero-admin` 1920x1080 and `prefooter-admin` 1920x983 replace X-ray and MRI photos, `referral-agent`, `agent-infrastructure` 1280x720 and `partnership` 1200x675 replace Scale-branded and Mayo posters. `layer-dashboard-admin` is drawn flat with admin eval suites and mapped onto the plane read from Scale's image (origin 90,460; u 735,-422; v 532,308). `layer-avatars-neutral` keeps Scale's network lines and paints neutral discs over the 13 headshots. `layer-diagram` is Scale's: it has no brand or clinical text. `certs/ccpa.webp` replaces FedRAMP. Videos are 6s loops of the posters, 102 KB and 16 KB.

## Visual check
Sheets in `new-qa/enterprise-healthcare`, Scale left, ours right: clone and filled, first paint 3 frames, every 50% of the viewport with real wheel input, tabs, tile hover, dialog at 1440 and 390, plus panel sheets at 1440, 1024, 1023 and 390. All opened. Clone is equal by eye. Filled differs only in copy and the images listed.

Differences seen by eye:
- First paint: Scale hydrates later on the network, so the same wall-clock frame shows an earlier reveal stage. The first frame here is before hydration with the bar not yet in place (shared chrome, lead's final pass).
- Dialog: Scale's video was buffering at the same moment; ours loads locally.
- 390, filled: the portrait crop of the hero and pre-footer art puts a card edge beside the text. Scale's photo sits behind its text in the same way; the text stays readable under the overlay.
- Clone video excerpts: 60s of Scale's 11:19 radiology video and all 125s of the other, at 640 wide, to keep to the 3 MB rule. Timeline length was the one visible clone difference.

## Deviations from Scale
- Radix Dialog is not installed, so `BlogVideoDialog` reproduces it: portal, classes, Escape, overlay click, focus trap and return, `data-scroll-locked`, `pointer-events: none`. Not reproduced: Radix `aria-hidden` on siblings.
- Fonts: font gap as in stack.md.

## Gaps
- Mobile touch on tabs (native horizontal scroll of the strip) and swipe in the player were not driven. Tile hover at 390 was sampled with a mouse.
- The third tile links to `/blog`, the stub for Scale's `/blog/mayo-clinic-scale`.
