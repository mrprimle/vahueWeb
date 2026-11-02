# /public-sector/national-security

Live source: https://scale.com/public-sector/national-security at 1440x900 and 390x844, 2026-11-01. Menu label here: Regulated Industries (finance, insurance, healthcare B2B). Page: `app/public-sector/national-security/page.tsx`, `components/pages/public-sector-national-security/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` with sources, `ev_22ba6714…`: 47 of 47 scripts parsed, Next.js and React fingerprints. WebCodecs and three.js chunks load here too, though this page's scenes show static images: coverage shows Scale still decoding frames behind them (`outputFrame` 1394, `setFrame` 905).

Page-only ports in `NationalSecurityPage.tsx`: `NatSecHero` 831675, `NatSecStatsPanel` 298718, `NatSecHowToBuy` 109486, two Sections 698764. `national-security.module.css` holds Scale's `lBBaeq` CSS module. `icons.tsx` holds the `react-icons/md` paths from the live DOM (Scale loads the set through a dynamic import, 255416).

Reused: `SteppedVideo` in its `headingPinned` and `stepsOnly` image layouts (first page to drive them), `CardGrid`, `HeadlineWithCta`, `BaseCard`, `ClipScrollSection`, `BlogPreview`, `FullBleedMediaSection`, `FlatCta`, `AnimatedText`, `RichText`, `SectionTheme`. `BlogPreview3D` (62032) is imported from `components/pages/enterprise`.

Additive shared edits: `RichSpan.strong` in `RichText` (Scale's `strong` mark, How to Buy body), the route in `routeTheme`.

## Sections
Heights in px, Scale then ours. Clone values were equal at every section at 1280, 1440, 1535, 1536, 1728 and 390. Filled values are the same at every section at those widths: page height at 1440 11221, 11221; at 390 11727, 11727; at 1280 11283, 11283; at 1536 10941, 10941. At 1024 and 768 only the shared footer differs (11756 vs 11735, 13668 vs 13641), as on the clone.

| # | Section | Module | 1440 | 390 |
|---|---|---|---|---|
| 1 | Hero, tilted image, logo marquee | 831675 | 900, 900 | 844, 844 |
| 2 | Challenges, pinned scene, 4 steps | 154479 `headingPinned` | 2475, 2475 | 2321, 2321 |
| 3 | Stats panel, 6 cards | 298718, 656598 | 894, 894 | 1348.4, 1348.4 |
| 4 | Trust, 4 cards on tan | 698764, 540409 | 1155.5, 1155.5 | 1514.7, 1514.7 |
| 5 | Title with CTA | 698764, 925107 | 378.7, 378.7 | 356.9, 356.9 |
| 6 | Flywheel, 4 steps | 154479 `stepsOnly` | 934.3, 934.3 | 844, 844 |
| 7 | Customers carousel | 62032 | 786, 786 | 598.4, 598.4 |
| 8 | How to Buy accordion | 109486 | 979.3, 979.3 | 908.4, 908.4 |
| 9 | Resources, 3 tiles | 808358 | 1044, 1044 | 1033.6, 1033.6 |
| 10 | Pre-footer | 540431 | 736, 736 | 496, 496 |

### Other widths
Layouts change at 768 (`md`), 1024 (`lg`, trust grid goes to 2 columns through 1535, blog grid area rules), 1280 (`xl`, flywheel row, card min-height), 1536 (trust 4 columns). Page height, Scale then clone: 1024: 11756, 11735. 1280: 11283, 11283. 1535: 11227, 11227. 1536: 10941, 10941. 1728: 10989, 10989. At 768: 13668, 13641. The gaps at 768 and 1024 are the shared footer (1472 vs 1444, 1151.6 vs 1130.6), which the lead handles. All page sections equal. One early Scale load at 768 reported a different layout (no announcement bar, h1 120 tall); a repeat gave 129.6, equal to ours, so that first sample is discarded. Horizontal overflow: none at any width. Landscape phone (`oml:`) was not driven.

## Interaction inventory
Same script on both sites (`new-qa/public-sector-national-security/instr.cjs` in the scratchpad), real wheel, mouse and key input. REA execution window `ev_fbcf4e0e…`, 120s on a one-tab headless Chrome while that script drove Scale. The response was over the MCP budget, so it was exported and read per module (module, functions, executed): 298718 1 of 1; 62032 239 of 284; 109486 7 of 9; 154479 116 of 155. Section roots have no direct listeners (`.NatSecHero` `ev_8c3cdf42…`, `.NatSecStatsPanel` `ev_e9de887b…`, `.SgpIntro` `ev_a1bba099…`, `.SgpFlywheel` `ev_bb67c49a…`, trust `ev_4416336f…`, `.BlogPreview3D` `ev_0681881e…`, slide layer `ev_106407d0…`, `.NatSecHowToBuy` `ev_a75160e3…`, `.BlogPreview` `ev_2fe7f62a…`, pre-footer `ev_8bccafba…`): React delegates. `body` `ev_dfdac296…`: one passive `touchstart` from `1h0nvyhf5gbrf.js`.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Hero text, image | load | None, `ev_8c3cdf42…` | 831675 | Set image opacity 0, text delay 1, image opacity 1s at 1.5 | Frames equal once settled. Scale's image can flash before hydration on a slow load (SSR opacity 1); ours has the same order |
| Logos | load | CSS | 831675 | Rise .8s `cubic-bezier(.22,.61,.36,1)`, delay 2.15 + .1 per logo; label at 2 | Same classes |
| Logo strip | always | CSS | 831675 | `logo-marquee` 40s linear infinite | Strings equal |
| Challenges pin | scroll | ScrollTrigger, `ev_a1bba099…` none direct | 154479 | `headingPinned`: section 2475 at 1440, `--ns-art-top` from text bottoms | pinTop -160.8 at y 1100, -162.8 at y 1102: same line |
| Step image | scrub | zustand | 154479 | Step at `(i+1)/(total+1)`, 500ms opacity | Same steps at same y. Sample rows that differ differ by wheel position only: y 1734 .524, y 1732 .517 |
| Step bars | scrub | ScrollTrigger | 154479 | Width per step to scaleX, called 4780 times in coverage | y 2047 .517, y 2049 .524 |
| Prev, next | click | React | 154479 | `lenis.scrollTo` step midpoint | Ends y 2042 and 1727 on both |
| Region | ArrowRight | React | 154479 | Step +1 | Ends y 2042 on both |
| Step nav | click | React | 154479 | Scrolls to step | Same state after 1.8s |
| Stats clip | scrub | ScrollTrigger, `ev_e9de887b…` none direct | 298718, 656598 | Start 10 at `md`, 1.5 below; scale 1 | y 2653: 4.2252%, y 2654: 4.2196%. 390: y 2997 both .357208% |
| Stats cards | scrub | ScrollTrigger | 298718, 317967 | Scale down 1.06, y 48, x ∓160 by column on desktop, end `top bottom-=276` or `-=188` | y 2921: .787, y 2922: .792. y 3188-3191: .741-.757 |
| Stats heading | `top 85%` | ScrollTrigger | 298718 | Delay .1 | Coverage `onEnter` count 5 |
| Trust cards | scrub | ScrollTrigger, `ev_4416336f…` none direct | 540409 | Directional entrance, `down` | y 4391: .957, y 4390: .956 |
| Flywheel open | enter | gsap | 154479 | Clip from 45.8154%, arrows fade | First frame strings equal. 390: 39.9497% equal |
| Flywheel arrows | click | React, `ev_bb67c49a…` none direct | 154479 | Counter, image fade 500ms | 02, 03, 04, 03 on both |
| Flywheel | ArrowRight | React | 154479 | Next | 04 on both |
| Carousel | idle | Embla, listeners `ev_b563a677…` (`click` capture, `dragstart`, `touchmove`, `touchend`, `touchstart`, `mousedown`, `touchcancel`, on the viewport from `0sni47mcvnqwg.js`) | 62032 | `loop`, `align: center`, 8 slides at desktop | Slide transforms equal to .01px |
| Carousel | arrows, drag, ArrowLeft | Same | 62032 | Tween callback called 904 times in coverage | After next: 58.68 vs 58.69 px; after key: same percent strings; drag settles at same slide |
| Carousel | dots at 390 | React | 62032 | `aria-current` | Equal |
| Slide link | hover | CSS | 62032 | Image 500ms `scale-125`, arrow slide | Shared port, verified on `/enterprise` |
| Accordion | click | React `ev_a7aebe07…`: `click` from `42ixmvih7808g.js`, plus HubSpot `mousedown` | 109486 | Height .5s `power2.out`, one open, plus rotates 300ms | Frames: 61/16, 27/40, 11/52, 1/59 vs 49/25, 22/45, 6/55, 2/59, phase. Ends 0/60 on both |
| Accordion | hover, Enter, focus | React, CSS | 109486 | 200ms colour; outline 2px, offset 2px | Colour, outline equal. Enter closes on both |
| Tiles | in view | IntersectionObserver, `ev_2fe7f62a…` none direct | 808358 | Shared port | Boxes equal at 1440, 1024, 390 |
| Pre-footer | scrub | ScrollTrigger | 540431 | Default 10 | Shared port, boxes equal |

Motion after fill: the same script gave the same step ends (y 2042, 1727), counters (02 to 04, back to 03), clip end strings, accordion start heights and focus ring at 1440 and 390. Not driven: tile hover curves, CTA hover on this page (verified as shared ports elsewhere). In a long scripted run the accordion's first tween paused on both sites after one frame (Scale about 500ms, ours over a second under dev mode). A clean run with a frame counter showed no pause on either, so it is load from the script's earlier steps, not a port difference. Not on this page: WebGL visible scenes, cursor effects.

## Visual check
Pairs at real wheel positions: first paint, every 50% viewport, every 10% through the pinned range, at 1440 and 390 for clone, at 1440, 390, 1024, 768, 1280 for filled. Sheets in `new-qa/public-sector-national-security/sheets/`. Clone pairs for 768 and 1280 were not produced, because `content.ts` was filled while that run was going: those widths were compared by numbers for the clone and by eye only when filled. All sheets were opened. Pairs that show different steps sit exactly on a step boundary (y 1569.25, 1884, 2199 at 1440), within a pixel of wheel position. One frame at 1280 (y 2964) showed a stray band of the stats image under the header; three repeats at and around that position did not, so it is a one-off capture artifact. The last title change (Missing Domain Context, which keeps Scale's 2 lines at 768 and 1280) came after the final shots and is checked by height only.

## Deviations from Scale
- **Font:** Aeonik, not Aeonik Pro, per stack.md. Scale's trust card titles use Aeonik Pro Medium through this page's own `@font-face`; Medium is not in Mike's licence set, so they are Regular with a .3px text stroke.
- **`isDesktop`:** Scale reads react-device-detect, so a desktop user agent gets ∓160 card entrance on any width, and a phone gets 0. Here a touch screen is "not desktop", same as the `/enterprise` carousel port. Playwright's phone emulation keeps a desktop user agent, so there Scale shows -160 and 8 carousel slides, ours 0 and 4; a real phone gets 0 and 4 on both.
- **Consent:** OneTrust skipped in measuring sessions.
- **Scale frames:** Scale decodes the intro bins even though images show. The port keeps this.

## Copy
Keep rule, plus Mike's 22:46 rule: defense wording becomes the regulated B2B job in the same slot, same format and length. SI became AI, doctrine became policies, mission became workflow or business, agency became domain or company, commanders became auditors, cleared engineers became embedded engineers. Scale Donovan became Vahue Knowledge Agents (link `/genai-portfolio`), Scale Data Engine became Vahue Context Engine (link `/data-engine`), the T&E Engine links to `/evaluation/public-sector` (For Regulated Teams). OTA & CDAO became Vendor Risk Review. Buy Direct carries Audit, Pilot and Operate.

88 strings, alt text and URLs excluded: 39 unchanged after Scale to Vahue and SI to AI, 41 changed by a few words, 8 rewritten (hero headline and subtitle, 2 case titles, certifications, 3 How to Buy answers). That is 44% unchanged, below the 80% target, because nearly every line on Scale's page names the military. Word count is within 15% except short labels (2 to 3 words).

`// PLACEHOLDER` in `content.ts`, 28 lines: hero trust line and label, 8 logo tiles, 6 stats, the 40% claim, 4 case studies, certifications, vendor risk and partners, 3 resources.

## Images
Scale's military photos are removed from `public/`; recover them from commit 72ff4ae to re-check the clone. Filled versions, same sizes and aspect, built from neutral photos already on this site's other pages:
- `hero-filled.webp`: same 4 tilted panels and geometry as Scale (skewY 30, 866 x 634, same offsets), showing homes, a meeting, a skyline, a risk queue.
- `stats-bg-filled`, `buy-filled`, `prefooter-filled` (darkened to 62% so the white headline reads), `rc1-4-filled`, `res1-3-filled`.
- `ch1-filled.svg` to `ch4-filled.svg`: Scale's diagrams with the DATA ENGINE label replaced by CONTEXT ENGINE as live text, in a system mono because an SVG in `<img>` can't load the page font.
- `fly1.webp` to `fly4.webp` stay: abstract, no brand or military content. The small triangles are generic glyphs in the diagram, though they resemble Scale's mark.

## Gaps
- 8 Scale logos are neutral tiles, as placeholders.
- The photos repeat ones on `/about`, `/enterprise/insurance` and others. Mike may want dedicated finance and healthcare photos.
