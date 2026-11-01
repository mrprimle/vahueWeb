# /evaluation/public-sector

Live source: https://scale.com/evaluation/public-sector, 2026-11-01. Menu label here: **For Regulated Teams** (finance, insurance, healthcare B2B), per Mike's 22:46 direction. Scale's structure and motion are kept; government and Super Intelligence content is replaced in the same slots. Stack: [../stack.md](../stack.md), chrome: [_chrome.md](_chrome.md).

Files: `app/evaluation/public-sector/page.tsx`, `components/pages/evaluation-public-sector/` (`EvaluationPublicSectorPage.tsx`, `content.ts`, `content.scale.ts`, `icons.ts`, `types.ts`). New in `components/site/shared`: `FeatureCards.tsx`, `NewButtonLink.tsx` (+ CSS module), `BrowserFrame.tsx`; `ChecklistWithMedia.tsx` gained the `mockup` branch.

## Stack on this page
The page's RSC payload loads these client modules: 243385 PageThemeSetter, 478135 hero (non-globe branch, wraps 540431), 970272 LogoCloud, 15518 FeatureCards, 460138 FeaturesWithIcons, 872447 ChecklistWithMedia with 720912 browser frame, 408298 NewButtonLink, 540431 FullBleedMediaSection. No WebGL scene renders: 478135 only mounts the globe for `media[0]._type === 'meshGlobe'`, and this page passes an image. REA `analyze_web_bundle`: 58 of 58 scripts parsed.

## Sections
Heights in px, Scale and ours equal within 1.5 at 1920, 1440, 1280, 1023, 768, 767, 640 and 390.

| # | Section | Module | 1440 top, height | 390 top, height | Changes with width |
|---|---|---|---|---|---|
| 1 | Hero, `pt-24 pb-10` | 478135 > 540431 | 135.3, 720 | 197.8, 480 | Media 720 to 480 tall below `md`; CTAs stack below `md` |
| 2 | Logos, `!py-12` | 970272 | 895.3, 222.4 | 717.8, 241.8 | Row from `md`, marquee below it |
| 3 | Test Diverse AI Techniques, `!py-16` | 1900 markup, 15518 | 1117.6, 806.4 | 959.5, 1324.1 | 2 columns from `md` |
| 4 | Why Test & Evaluate AI, `!py-16` | 1900 markup, 460138 | 1924.1, 560 | 2283.6, 978 | Flex wrap, 3 across from `lg` |
| 5 | Methodology, `!py-16` | 1900 markup, 872447, 720912, 408298 | 2484.1, 856.3 | 3261.6, 1196.7 | Row from `md`, stacked below it |
| 6 | Why Vahue cards, `!py-16` | 1900 markup, article grid | 3340.3, 1096 | 4458.3, 2434.1 | 1, 2 from `md`, 3 from `lg` |
| 7 | Pre-footer, `mt-16 pb-8` | 540431 | 4500.3, 720 | 6956.5, 480 | Same as hero |

## Interaction inventory

| Element | Input | Listener and REA evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Section roots, `figure`, `article`, marquee container | none | 0 direct listeners: `ev_0010ae9c…` (hero), `ev_ab4bcd16…` (logos), `ev_27e7d691…` (`!py-16`), `ev_ef6c0c55…` (figure), `ev_896c29f8…` (article), `ev_a6629b69…` (marquee), `ev_ddc93530…` (main) | | No hover state on cards | Same |
| `html`, `body` | click, keydown, scroll, touchstart | `ev_21d99931…`: scroll from `1h0nvyhf5gbrf.js`, keydown and 2 click from OneTrust `otBannerSdk.js`. `ev_a9a76f44…`: touchstart from `1h0nvyhf5gbrf.js` | GSAP ScrollTrigger and Observer in the shared runtime; OneTrust | Scroll cache and pointer flag, no page logic | OneTrust not built (see `_chrome.md`) |
| Links in main | click, mousedown | `ev_23bae036…`, `ev_651fab67…`, `ev_10fb4951…`, `ev_6902584f…`: capture mousedown from `hs-analytics`, click from `42ixmvih7808g.js` (React) | HubSpot analytics, not built | No page logic | Navigation same |
| Images in `!py-16` | load, error | `ev_4f5f3bc6…`: `next/image` | 42ixmvih7808g | | Same |
| Hero headline, body | scroll into view, load | Reading module 540431; `useInViewTrigger` `top center`, retroactive | 540431, 947153 | AnimatedText, delay .2 x index | Shared port, already verified on `/about` |
| Hero CTAs | intro | 961870 | 540431 | Opacity .85s, delay .5 | 1440: 0, .215, .743, .909, .985, 1 vs 0, .537, .823, .951, .994, 1 at unaligned sample times, same shape. 390: 0, .005, .801, .95, .994 vs 0, 0, .447, .78, .942. Scale's start moves with its `load` time: in one earlier 390 run its intro had already finished by the first sample |
| Hero media | scroll | `useScrubTrigger` `top bottom` to `center center` | 540431 | Scale 1.25 to 1 | Rest 1.0139 at 1440 and 1.006 at 390 on first paint, equal; 1 from the first wheel stage, equal |
| Hero, pre-footer clip | scroll | 656598 | 540431 | Hero `startPercentage` 0; pre-footer 10 default, radius 1.5rem | Pre-footer inset 5%, 2.228%, 0 at 1440 and 3.353%, .166%, 0 at 390, equal |
| Pre-footer media | scroll | Same scrub | 540431 | 1.25 to 1 | 1.25, 1.1114, 1 at 1440; 1.1677, 1.0083, 1 at 390, equal |
| Primary CTA | hover (clone run) | 892855 | 961870 | Fill, arrow slide, label | Arrow -61.20, -34.81, -18.19, -7.84 vs -61.22, -34.80, -18.18, -7.83 |
| Secondary CTA | hover (clone run) | 892855 | 961870 | Border fill | Leave -61.64 vs -61.62; enter 38.4, 9.2 vs 31.5, 6.6, read as sample phase, not re-sampled at a finer step |
| Meet our customers | hover (clone run) | CSS | 970272 | Arrow translate-x-1, 300ms ease-out | 2.741, 3.736 vs 2.740, 3.736 |
| Read more | hover (clone run) | CSS | 408298 | Background `#333` to `#000`, arrow translate-x-1, .3s | 49, 17, 3 vs 51, 22, 4 and 2.66, 3.80 vs 2.30, 3.70: same curve, sample phase |
| Read more | keyboard focus | CSS | 408298 | Solid 1px, `rgba(255,255,255,.64)`, offset 3px, radius 12px | Equal |
| Logo marquee | below `md`, time | CSS animation | 922998 | 50px/s, no pause | Runs; positions at a moment differ with load time |
| Lenis wheel | wheel | Shared | 2d7ykwtxp | lerp .14, multiplier .8 | 12 stages at 1440: 449, 900, 1349 … 5250, equal in the final filled run |

`observe_web_execution` during real input (2 CTA hovers, 28 wheel steps, 1 button hover, final scrollY 5250): `ev_24f8f990acdc015966db271c9fddf88e555b664b8d7e50e1af5ec4006dc408fc`, one-tab headless Chrome on its own port. The record is over MCP's 10 MB response limit and was not exported, so its coverage ranges were not read: the handlers above come from reading the modules. Two earlier windows, `ev_252c1166…` and `ev_ddbfccd9…`, hold no input (background tab on 9230 ignores it) and should be ignored. `analyze_web_bundle`: `ev_ea107c8d…`. `capture_browser_scenario` was not run; `observe_web_execution` covered the requirement. No source maps ship, so `trace_web_source_location` does not apply.

## Filled copy and images
52 strings: 31 unchanged (60%), 16 changed by a few words (11 of them only Scale to Vahue or SI to AI), 5 rewritten for the regulated segment or to drop RAG from a heading. Below the 80% target because Scale's page repeats SI and government; counting the 11 brand and SI swaps as kept, 42 of 52 (81%).

Images: `hero-filled.webp` replaces the satellite grid and "Maritime ISR" with a neutral case dashboard whose values are zeros; `computer-vision-filled.webp` and `generative-ai-filled.webp` swap the wordmark; `methodology-filled.png` removes the product mark; `public/site/nav/evaluation-public-sector.webp` is the new hero, same 1024 x 683.

Links: `/customers` has no route, so "Meet our customers" goes to `/enterprise`. The white paper has no route, so "Read more" goes to `/blog`. "Learn more" goes to `/public-sector/national-security` (Regulated Industries).

## Placeholders
5 lines with `// PLACEHOLDER`: "Trusted by" line, 2 logo tiles, "Trusted by insurers, lenders…", mock browser host `evals.vahue.ai`.

## Gaps
- **Font:** Aeonik, not Aeonik Pro, per stack.md. At 1024 one card description in row 1 wraps one line earlier on Scale, so that row is 332.4 vs 310 and the page 22.4 shorter. "Meet our customers" and "Read more" are about 5px wider because the Aeonik arrow is wider.
- **Footer at 768:** 7px shorter than Scale from shared footer copy, not this page.
- **Not driven:** `oml:` landscape. At 390 the stages used `scrollTo` in a touch context, not touch or wheel input. Side-by-side sheets exist for 1440 and 390; the other seven widths were compared by numbers only.
- **Filled run hover:** the final run only counted identical samples (9 of 16 customers link, 10 of 16 Read more, 3 of 16 primary CTA, 0 of 16 article, where every difference on the article is `lab` vs `oklab` serialisation of the same colour). Per-frame values above are from the clone run. The hover code and classes did not change between them.
- **Scale originals:** `public/evaluation-public-sector/hero.webp` (satellites) and `logos/` (CDAO, White House) remain only for `content.scale.ts`.
