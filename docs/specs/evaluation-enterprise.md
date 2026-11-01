# /evaluation/enterprise

Live source: https://scale.com/evaluation/enterprise, 2026-11-01. Menu label here: For Enterprise. Page: `app/evaluation/enterprise/page.tsx`, `components/pages/evaluation-enterprise/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` `ev_69af641e…`: 45 of 45 scripts parsed, Next.js and React fingerprints, 6 route strings, no WebMCP, source maps not requested. `inspect_web_page` `ev_4b7442dc…`: 974 DOM nodes. Scale preloads the three.js chunks but this page has no WebGL, pinning, Keen, Embla or pointer effects.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `FeaturesWithIcons`, `ChecklistWithMedia`, `BrowserFrame`, `SectionTitle`, `PageThemeSetter`. New and shared: `shared/AlternatingImageRows.tsx` (module 497052, Scale's export has no name).

## Sections
Heights, Scale and filled are equal at every width listed. Measured after hydration.

| # | Section | Module | 1920 | 1440 | 1280 | 1100 | 1024 | 1023 | 900 | 768 | 767 | 640 | 480 | 390 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero, non-globe, `startPercentage` 0, media box | 478135, 540431 | 720 | 720 | 720 | 720 | 720 | 720 | 720 | 720 | 480 | 480 | 480 | 480 |
| 2 | The challenge, 3 features | 1900, 460138 | 652 | 652 | 652 | 652 | 652 | 798.2 | 798.2 | 1101.2 | 880.4 | 906 | 1020.9 | 1070.5 |
| 3 | The solution, image and checklist | 1900, 872447 | 876 | 876 | 876 | 818.3 | 791.5 | 721.3 | 678 | 757.2 | 1030.2 | 953.4 | 986.6 | 957.8 |
| 4 | How it works, 5 rows | 1900, 497052, 720912 | 3300.7 | 3247.7 | 2982.4 | 2684 | 2558 | 5106.5 | 4698.6 | 4261.1 | 3906 | 3526.2 | 3073.4 | 2923.9 |
| 5 | Pre-footer, `startPercentage` 10 | 540431 | 720 | 720 | 720 | 720 | 720 | 720 | 720 | 720 | 480 | 480 | 480 | 480 |

Also equal at 1450 and 1279. Differences of 0.1 to 0.2px come from rounding. No horizontal overflow at any width. Boxes compared: sections, articles, images, headings, paragraphs.

Layout changes by width: rows are 2 columns from `lg` (1024), one column below, text above the image only by source order; `md` (768) switches the checklist to a row, the feature gap and the 720 media height; features become `basis-1/4` from `lg`; `xl` (1280) widens the feature gap.

Differences outside this page's files, both shared chrome:
- Footer: document height is 21px shorter at 1024 and 1023 and 28px shorter at 768. Section tops and heights are equal, so the delta is in the footer's filled copy. The clone showed 7px at 768, before the shared footer copy changed.
- Announcement bar: at 480 the filled line wraps one row more than Scale's, so the whole page sits 20px lower. Section heights stay equal.

## Interaction inventory
Same script on both sites (`motion.cjs` in the scratchpad `ee` folder), real wheel and pointer input, headless.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero, pre-footer section | scroll | None direct: `.FullBleedMediaSection` `ev_bd02b7a7…`, `.ClipScrollSection` `ev_f9f50c83…`. Scrub via ScrollTrigger | 540431, 656598 | Media scale 1.25 to 1, `top bottom` to `center center` | Pre-footer at 1440: 1.2136, 1.0747, 1 vs 1.2139, 1.075, 1. Fine steps 1.158, 1.1858, 1.2136, 1.2414 vs 1.1583, 1.1861, 1.2139, 1.2417 (about 1px of scroll offset). At 390: 1.1839, 1.0245, 1, equal |
| Hero media | scroll 0 | Same | 478135 | Start scale from progress at load | 1.0139 at 1440, 1.006 at 390, equal |
| Hero text | load | ScrollTrigger, retroactive `onEnter` | 540431, 947153 | Lines rise and fade, 0.2s stagger between headline and body | Same curve once started; start time follows hydration (Scale 2.2 to 8.9s, ours about .4s here) |
| Hero, pre-footer CTA | reveal | Same | 961870 | Delay .5s, .85s | CTA starts after text: 500, 500, 498ms vs 500, 499, 501ms over 3 loads. Pre-footer samples at 1440, opacity .391, .658, .825 vs .394, .658, .825 |
| Pre-footer text | wheel into `top center` | ScrollTrigger | 947153 | As hero | Text opacity .344, .59, .76, .87, .937 vs .344, .59, .763, .871, .938. `y` 176.3, 110.1, 64.5 vs 176.3, 110.1, 63.8 |
| Primary CTA | hover | React delegated, on `a`: HubSpot `mousedown` plus `click`, `ev_5acbe884…` | 892855 | Fill and arrow slide | Fill translate -100, -67.1, -42.3, -25.6, -14.1, -6.6% vs -100, -67.1, -42.2, -25.6, -14.1, -6.6%; arrow half of that, equal |
| Secondary CTA | hover | Same | 892855 | Fill from below, label scale .9 | 100, 46.5, 16.1, 2.8, 0% vs 100, 46.4, 16.1, 2.8, 0%; scale .938, .912, .902, .9, equal |
| CTA | Tab | Native | 463059 | | Focus lands on Learn more, both |
| Section roots, feature icons | hover, click | None: section `ev_6099c782…`, figure `ev_76502686…`. Rows `article` none `ev_7a5ca213…`, hero section none `ev_ff838385…` | static | No reveal, no hover | Frames equal at every stage |
| Row images | load | `error`, `load` only, `ev_964215f6…` | next/image | No motion | Boxes equal |
| Smooth scroll | wheel | Lenis, `ev_418ac3bb…`, `ev_6032cc61…` (`advance`, `raf`) | 2d7ykwtxp | Shared | Scroll positions equal at every wheel step |

REA execution windows: `observe_web_execution` `ev_418ac3bb…` (hero CTA hover, Tab, wheel) and `ev_6032cc61…` (wheel to pre-footer, CTA hover), in a one-tab headless Chrome. Both finished but overran the MCP response limit, so they were read from an export, then deleted (560 MB). They report 7 of 122 scripts as active: Lenis, the React runtime, 474053, 883495 and third-party trackers. The FlatCta and AnimatedText modules do not appear, so hover and reveal params rest on reading the chunks and on the Playwright samples above, not on coverage. `compare_web_screenshots`, `capture_browser_scenario` and the source-map tools were not used: visual pairs were read by eye and Scale ships no maps.

One `inspect_web_event_listeners` call used a selector that matched nothing (`ev_297811944…`, checklist wrapper), so the checklist's own root has no direct listener evidence. It holds no handlers in module 872447.

## Copy
46 strings: 41 unchanged (89%), 5 changed lightly, 0 rewritten. Above the 80% target because `/evaluation` is listed as "keep almost all" in the copy source, and nothing on this page is military, government or niche.
- Meta title: Scale AI to Vahue.
- Image alt: Scale GP to Vahue.
- How it works title and subtitle: "Scale GenAI Portfolio" to "Vahue Knowledge Agents", the menu's name for `/genai-portfolio`. Verb agreement changes. A no-break space keeps the name on one line.
- Measure your AI: "Scale's industry leading proprietary benchmark datasets" to "Vahue's private baselines built on your own cases" (copy source section 5). 21 words vs 19.

Placeholders, 2 `// PLACEHOLDER` lines: the market figures in the challenge subtitle (10%, 30%, "number one reason") and the browser frame host `app.vahue.ai`.

## Images
Scale's files, in `public/evaluation-enterprise/`. Five have baked Scale text, edited into `*-filled.webp` at the same size: hero (laptop screen label), bridge-trust-gap (title and legend), measure-your-ai (score title and 3 rubric chips), set-your-own-bar and deploy (logotype). `verify-hitl` and `iterate` are unbranded and unchanged. The pre-footer is reduced from 7952 to 1920 wide. The edit used Helvetica Neue where the screenshots use Inter, not visible at display size. The mock figures inside the images ("outranking 60%", "85") stay as illustrative UI.

## Visual check
Sheets in `new-qa/evaluation-enterprise`: first paint 6 frames, every 50% of the viewport with real wheel input, pre-footer range going back up at 20% viewport steps, at 1440 and 390, clone and filled, 40 sheets plus one heading sheet at 1440, 1100, 768, 390. All opened. Clone is equal to Scale by eye. Filled differs only in copy and the edited images.

Differences seen by eye:
- First paint: Scale hydrates later on the network, so the same wall-clock frame shows an earlier reveal stage here. Both are the same frames in sequence.
- First paint, shared chrome: in the first frame before hydration our announcement bar is not yet in place and the header sits at y 0 over it. It settles by the second frame. Scale's earliest captured frame came later, after hydration, so there is no matching Scale frame for this state. Scale's bar behaviour is covered in the `/public-sector-data-engine` spec.
- At 1440 the how-it-works heading breaks "How Vahue Knowledge Agents / Evaluate Applications" against Scale's "How the Scale GenAI Portfolio / Evaluates Applications": same 2 lines. Same 3 lines at 390.

## Gaps
- Fine scrub steps of the pre-footer were sampled at 10% of the viewport, while frames were kept at every other step.
- Fonts: font gap as in stack.md. No text delta changed a height on this page.
