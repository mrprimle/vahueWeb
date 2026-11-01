# /enterprise/insurance

Live source: https://scale.com/enterprise/insurance, 2026-11-01. Menu label here: Insurance. Page: `app/enterprise/insurance/page.tsx`, `components/pages/enterprise-insurance/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` `ev_53effea6…`: 43 of 43 scripts parsed, Next.js and React fingerprints, 3 route strings, no WebMCP, source maps not requested. `inspect_web_page` `ev_3a1cf36c…`. Scale preloads the three.js chunks, but this page has no WebGL, pinning, Keen, Embla or pointer effects. The payload adds `html { scroll-behavior: smooth; }` on this route, kept.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `FeaturesWithIcons`, `SectionTitle` (additive `cta` slot), `PageThemeSetter`. New and shared: `shared/LogoCarousel.tsx` (236943), `shared/VideoFeatures.tsx` (450359 with 582844 and the Wistia branch of 832862, local file branch added), `GlassButtonLink` in `shared/NewButtonLink.tsx` (408298 glass branch, through CTAs 51051).

## Sections
Heights, Scale and filled. Measured after hydration, equal at every width except the one marked. No horizontal overflow at any width.

| # | Section | Module | 1920 | 1440 | 1280 | 1100 | 1024 | 1023 | 900 | 768 | 767 | 640 | 480 | 390 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Hero, non-globe, `startPercentage` 0, `pt-24 pb-10` | 478135, 540431 | 856 | 856 | 856 | 856 | 856 | 856 | 856 | 856 | 616 | 616 | 616 | 616 |
| 2 | Logo carousel, `!py-8` | 236943 | 194.4 | 194.4 | 194.4 | 194.4 | 194.4 | 194.4 | 194.4 | 194.4 | 193 | 193 | 219.4 | 219.4 |
| 3 | Blind spots, 3 features | 1900, 460138 | 620 | 620 | 620 | 620 | 620 | 788.6 | 788.6 | 1060.6 (ours 1115.6) | 894.8 | 894.8 | 984.1 | 1033.7 |
| 4 | Solutions, CTA, 3 features | 1900, 51051, 460138 | 784 | 784 | 784 | 784 | 784 | 1029.2 | 1029.2 | 1313.2 | 1061.7 | 1111.3 | 1147.3 | 1298.1 |
| 5 | Fuel your AI strategy, 2 video features | 1900, 450359 | 972.8 | 962.1 | 908.8 | 848.8 | 823.4 | 798.4 | 793.4 | 775.8 | 1540.7 | 1397.7 | 1220.4 | 1162.8 |
| 6 | Pre-footer, `pt-16 pb-8`, `startPercentage` 10 | 540431 | 816 | 816 | 816 | 816 | 816 | 816 | 816 | 816 | 576 | 576 | 576 | 576 |

Filled differs by up to 0.1px in section 2 below `md` (tile boxes round differently from images).

Layout changes by width: `lg` (1024) sets features to `basis-1/4` and one row, and the two video features to `gap-14`. `md` (768) switches the media box to 720, the video features to 2 columns, the logos from one scrolling row to the cross-fading pages, and the heading to `text-4.5xl`. Below `md` everything stacks. `xl` (1280) widens the feature gap.

Remaining differences, all from Aeonik vs Aeonik Pro, none changing a height except 768:
- 768 only: "Insurance's 3 Most Expensive Blind Spots" needs 721.3px on one line and the box is 720, Scale's needs 719.8. It wraps, so section 3 is 55px taller at 768 and 769 (heading 110 tall at 769, 55 at 770). From 770 up it is equal.
- `→`: Aeonik's arrow is longer than Aeonik Pro's. "Meet our customers →" is 161.4 wide vs 156.1, "View all applications →" is 177.8 vs 173.2. Same in every page using the glyph.
- 390: pre-footer headline balances to 2 lines where Scale's has 3. 1100: one feature paragraph takes 2 lines where Scale's takes 3. No height change.

Differences outside this page's files, both shared chrome, known: document height 21px shorter at 1100, 1024 and 1023 and 28px shorter at 768 (footer); the page sits 20px lower at 480 (announcement bar). Section heights are equal.

## Interaction inventory
Same script on both sites (`motion.cjs` in the scratchpad `ins` folder), real wheel and pointer input, headless. Scale's handlers all read from the chunks named; React handlers are delegated, so elements carry only React's `click` stub and, once analytics loads, HubSpot's `mousedown`. `html` `ev_d1a981c4…` has only the passive `scroll` from `1h0nvyhf5gbrf.js`. `body` `ev_958ab2ab…`, inspected with the modal open, has the `touchstart` from the same chunk plus React's full delegated set, which the portal adds there.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero, pre-footer section | scroll | None direct: `.FullBleedMediaSection` `ev_152a57a0…`, `.ClipScrollSection` `ev_3b8544dd…`. Scrub via ScrollTrigger | 540431, 656598 | Media scale 1.25 to 1, `top bottom` to `center center`; clip inset 5% to 0 | Pre-footer at 1440, y 3060 up to 2700: 1.1142, 1.142, 1.1698, 1.1975, 1.2253, both. Inset 2.28, 2.84, 3.40, 3.95, 4.51, both. At 390: 1.2266, then 1.25, both |
| Hero media | scroll 0 | Same | 478135 | Start scale from progress at load | 1.0139 at 1440, 1.006 at 390, equal |
| Hero text | load | ScrollTrigger, retroactive `onEnter` | 540431, 947153 | Lines rise and fade, .2s stagger between headline and body | Opacity .329, .458, .596, .671, .736 vs .301, .431, .574, .679, .746 at near frames. Start time follows hydration (Scale 2.9s here, ours about .2s) |
| Hero CTA | reveal | Same | 961870 | Delay .5s, .85s | Width at matched opacity: 23.9, 55.9, 82.8, 104.1 vs 24.6, 56.5, 82.8, 104.1 |
| Hero CTA | hover | On `a` `ev_1c71d88b…`, pre-footer `ev_1a155d3d…` | 892855 | Fill and arrow slide | Same curve at 1440, phase-shifted by the sample start: fill -100, -61.2, -38.4, -22.9, -12.3 vs -100, -67.1, -42.3, -25.6, -14.1 |
| Logo pages | timer | None on `ul` `ev_be567404…` | 236943 | 4.5s after each page change; `transition-opacity` 700ms; incoming `delay-300` | Outgoing .98, .91, .79, .61, .43, .29 vs .98, .91, .79, .61, .38, .26 (50ms samples). In and out curves equal, period 4.5s both |
| Logo row, below `md` | wheel, touch | None on `ul.overflow-x-auto` `ev_412f9973…`: native overflow | 236943 | `scrollbar-none` | `scrollWidth` 1154, `clientWidth` 342, scrollLeft 300 after wheel 300, item boxes equal |
| "Meet our customers" | hover | Delegated, on `a` `ev_d188fe9b…` | 236943 | Underline, `target=_blank` | CSS only, same classes |
| "View all applications" | hover | Delegated, on `a` `ev_bd938656…` | 408298 | Wrapper scale 1.02 and glow, 500ms; inner sheen `translate(8px,-8px)`; arrow 4px, 300ms | Leave: scale 1.0112, 1.0056, 1.0028, 1.0008; sheen .915, .460, .185, .047; arrow 2.127, .430, .028, equal to about .001 |
| Play button | hover | Delegated, `ev_1a8f942b…` | 450359 | `bg-black/40` to `/60`, 150ms | .539, .594, .6, both |
| Play button | click | Delegated | 450359, 582844 | Overlay fade 350ms, then panel 350ms after .55s, scale 1.1 to 1; body `overflow: hidden` | Overlay 0, .36, .71, .91, 1 vs 0, .36, .66, .91, 1. Panel .43, .76, .97, 1 vs .36, .66, .91, 1 at about the same frames. Panel box 1008 x 589 at 1440 and 370.5 x 262.4 at 390, player 976 x 549 and 338.5 x 190.4, equal |
| Modal | Escape, close button, click outside | `document` keydown, delegated: `[role=dialog]` `ev_0da17869…`, `[data-dismiss=modal]` `ev_03ac6d7d…` | 582844 | Each closes at once, body overflow restored | All three close, both |
| Keyboard | Tab | Native | | Default focus order, from the hero CTA | Hero CTA, customers link, applications link, 2 play buttons, then the footer, both. The pre-footer CTA is skipped until revealed, both |

Execution: `observe_web_execution` 14s precise coverage on Scale in a private one-tab Chrome, driven through the same target (CTA hover, wheel, glass hover, play hover and click, Escape): `ev_4bf8ed06…`, retained, 10.5 MB, over the MCP response limit. Not exported: an export writes all 349 retained session records. Behaviour above comes from the Playwright samples and reading modules 236943, 450359, 582844, 832862, 51051, 408298 and 478135 in chunks `01xb85jkvr5_y`, `17ea4hx823ss4`, `37xz28pjbnlx4`. No source maps ship, so `trace_web_source_location` does not apply.

## Visual check
Sheets in `new-qa/enterprise-insurance`: first paint 6 frames, every 50% of the viewport with real wheel input, pre-footer and section range back up at 10% viewport steps, thumbs, modal, logo row, glass button, at 1440 and 390, clone and filled, 44 sheets. All opened.

Seen by eye, beyond the text deltas above:
- First paint: Scale hydrates later on the network, so the same wall-clock frame shows an earlier reveal stage here. Hero and pre-footer images also arrive later on Scale, with the `#193A29` backdrop showing as a band meanwhile. Same frames in sequence.
- First paint, shared chrome: in the first frame before hydration our announcement bar is not yet in place. Known, lead's final pass.
- Modal: the Wistia frame is still blank on Scale at the capture moment while ours has started. Network timing only in the clone. Filled has a native `video` with its own control bar, Scale's has Wistia's.

## Copy mapping
Insurance stays Insurance: not a niche topic under Mike's rule, and research lists it as a vertical (first notice of loss, claims correspondence, treaty and policy review). 32 strings, alt text and URLs excluded: 30 verbatim after the brand swap, 2 light, 0 rewritten.

| Slot | Scale | Filled |
|---|---|---|
| Video feature titles | Scale AI Agentic Claims Processing, Scale AI Autonomous Customer Retention | Vahue AI …, same word count and wraps at every width. Counted as verbatim |
| Solutions item 2 | Scale case analysis with AI… | Expand case analysis with AI… "Scale" as a verb at the start of a line reads as the brand. "analyzed at scale" and "scale that expertise" stay |
| Strategy subtitle | Learn how we support AI Agents for Insurance | Learn how we run AI Agents for Insurance, the operate promise from the value proposition |

Links: `/customers` has no route here, so the link goes to `/enterprise`, as on the other filled pages.

## Placeholders
`// PLACEHOLDER` in `content.ts`, 10 lines: "Trusted by…" line, 7 logo tiles at the boxes Scale's logos render at, 2 videos. The videos are short drawn loops made from each thumb (`claims-filled.mp4`, `customer-retention-filled.mp4`, under 100 KB), standing in for Scale's two Wistia product videos. The clone keeps the Wistia iframes.

Images are Scale's files, downscaled where large (pre-footer 7952 to 1920 wide), none with Scale's brand. The customer retention thumb is an unbranded product mock titled "AI Legal Assistant", with invented companies, as on Scale.

## Gaps
- Fine scrub steps go through the pre-footer on the way up only.
- Wistia playback inside the iframe not driven past the frame load.
- `bullets`, `cta`, `overtitle`, `numbers` and `showBackground` of 450359 are not in `VideoFeatures`; `/automotive` keeps its numbered copy.

## Decisions for Mike
- Real claims and retention demo videos for the two slots.
- A real retention screenshot in place of the "AI Legal Assistant" mock, which reads as legal rather than insurance.
