# /guides

Live source: https://scale.com/guides, 2026-11-02. Menu label here: Guides (Resources column). Page: `app/guides/page.tsx`, `components/pages/guides/`. Scale's strings: `content.scale.ts`. Rendered strings: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` `ev_ebf6534f…` with script sources: 50 of 50 scripts parsed, Next.js and React fingerprints, no WebMCP, source maps not requested (none are shipped). `inspect_web_page` `ev_1f2259aa…`: 944 DOM nodes, 50 scripts, 53 resources, one page image, no workers.

The page is server rendered on Scale. Its RSC payload has only one client component in the body: `FullBleedMediaSection` (`$La1`, props read from `self.__next_f`). The book grid exists only as markup plus the CSS module `cfo7JW`, found in `2h0gxg24im1sd.css` and in no JS chunk. So no GSAP, Keen or Embla on this page's own sections.

Reused: `FullBleedMediaSection`, `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `ResponsiveImage`, `Logo`. New and page-only: `Book.module.css`, Scale's module rules copied as they are.

## Sections
Heights are equal to Scale at every width listed, for both the clone and the filled page. Measured after hydration. Boxes compared: sections, overtitle, heading, paragraph, grid, first, second and last book, logo box, number, pre-footer, its heading and CTA. No horizontal overflow at any width.

| # | Section | Module | 1920 | 1728 | 1536 | 1440 | 1280 | 1279 | 1024 | 1023 | 768 | 767 | 640 | 639 | 390 | 320 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Intro: overtitle, title, body | RSC | 496 | 496 | 496 | 496 | 496 | 496 | 496 | 486.2 | 486.2 | 320.4 | 320.4 | 320.4 | 346 | 371.6 |
| 2 | 12 books | RSC, `cfo7JW` | 1321.8 | 1321.8 | 1321.8 | 1320.6 | 1314.6 | 1757.8 | 1740.8 | 2637.4 | 2599.1 | 2598.9 | 2580 | 5298.4 | 5149.1 | 5107.1 |
| 3 | Pre-footer, `startPercentage` 10, in a `pb-8` wrapper | 540431 | 752 | 752 | 752 | 752 | 752 | 752 | 752 | 752 | 752 | 512 | 512 | 512 | 512 | 512 |

Layout changes by width:
- Book grid: 1 column below `sm` (640), 2 from `sm`, 3 from `lg` (1024), 4 from `xl` (1280). The book is fixed at 280 x 376 with `margin: 2.5%`, so it sits left in its cell and the margin grows with the cell. Container caps at 1472, so the grid centres from about 1500.
- Intro: `md` (768) adds `md:mt-12` and `md:mb-20` and moves the heading to 40px, `lg` (1024) to 48px with a 20px body.
- Pre-footer media: 480 tall below `md`, 720 from `md`.
- Book title: `header5-regular` is 22/23.1 below `md`, 24/36 from `md`. Number label: 10px below `md`, 13.008px from `md`.

Differences outside this page's files, both shared chrome:
- Footer: document height is 52px shorter at 320, 28px at 768, 21px at 1023 and 1024. Section tops and heights are equal. Known shared item, handled in the lead's final pass.
- Scale's own load is slow: a 1.5s sample at 1280 and 1920 caught Scale before hydration (no announcement bar, fallback mono font, CTA not yet hidden). A 6s sample at 1280 gives the same 39.25 and 3616 on both, so this is not a difference.

## Interaction inventory
Same scripts on both sites, real wheel and pointer input, headless at 1440x900 and 390x844.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Book cover | hover enter | None on the cover `ev_fe73d70e…`, CSS only | `cfo7JW` | `transform: perspective(2000px) rotateY(-30deg)`, `box-shadow: 10px 0 10px -5px #00000030`, `.3s ease-out`, `transform-origin: 0` | m11 at 45ms steps 1, .996, .958, .936, .904, .877, .866, equal at 390. 1440 follows the same curve at its sample phases; computed origin `0px 188px`, duration and easing equal |
| Book `effect` | hover | Same | `cfo7JW` | Width 20 to 40, `.3s ease-out` | 20, 23.5, 31.1, 33.7, 36.9, 39.1, 40, equal |
| Book `light` | hover | Same | `cfo7JW` | Opacity .1 to 1, width 90% to 70%, `.3s ease-out` | Opacity .1, .26, .602, .716, .86, .96, 1 vs .1, .26, .602, .716, .859, .96, 1. Width 252 to 196, equal |
| Book cover | hover leave, re-enter | Same | `cfo7JW` | CSS transition reverses from the live value | Leave .866, .909, .954, .981, equal. Re-enter .988, .961, .938, .903, .875, .866 vs .988, .971, .938, .903, .875, .866; the one gap is a 45ms sample landing on another frame |
| Book link | click | On `a`: HubSpot `mousedown`, React root `click` in `42ixmvih7808g.js` `ev_668de720…`. No page handler | next/link | Navigates. HubSpot is not built here | Scale opens the guide. Ours opens the closest site page, see Gaps |
| Book link | Tab, focus | Native | next/link | Browser default ring: `outline: auto 1px`, `rgb(0, 95, 204)` | Equal. Tab order: 12 books in order after the header's two CTAs, then footer links |
| Book inside | none | None `ev_b6dcba12…` | `cfo7JW` | Static page stack and shadow | Equal in frames |
| Intro, grid sections | none | None `ev_55522876…`, `ev_c4c99d88…` | RSC | No reveal, no hover, no scroll motion | Frames equal |
| Pre-footer clip | wheel | None on `.ClipScrollSection` `ev_026aeefd…`. Scrub via ScrollTrigger | 656598 | Inset 5% to 0, `round 24px`, `top bottom` to `center center` | 11 stops at 10%: 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1, .5, 0, equal at 1440 and 390 |
| Pre-footer image | wheel | Same | 540431 | Scale 1.25 to 1, same range | Image box 1760 x 900, 1585.7 x 810.9, 1408 x 720, equal |
| Pre-footer heading | wheel into `top center` | None on `h2` `ev_3aba83f2…`. ScrollTrigger, `AnimatedText` | 947153 | Word opacity and x | First word opacity at 87ms steps .1778, .453, .6545, .7931, .8993, .9507 vs .1778, .453, .6525, .7931, .8993, .9507 |
| Pre-footer CTA | reveal | Same | 961870 | Delay .5s, .85s | Opacity from the reveal start .0732, .3939, .6208 vs .0732, .3906, .6208. At stop 6, .444 vs .444, width 68.4 vs 68.5. Final 154.2 vs 154.3 |
| Pre-footer CTA | hover enter, leave | On `a`: HubSpot `mousedown`, React root `click` `ev_c2bb09fb…`. Hover is React delegated | 892855 | Fill and arrow, 600ms ease-out | Fill -100, -61.2, -34.8, -18.2, -7.8, -2.1, 0 vs -100, -61.2, -34.8, -18.2, -7.8, -2.1, 0. Leave 0, 38.8, 65.2, 81.8, equal |
| Book link | touch tap at 390, Enter key at 1440 | Same as click | next/link | Navigates, no page handler | Scale `/guides/data-labeling-annotation-guide` both; ours `/data-engine` both (Gaps) |
| Page roots | scroll, touch | `html` scroll passive, OneTrust keydown and click `ev_502ea351…`; `body` touchstart passive `ev_48132510…`, both `1h0nvyhf5gbrf.js` | shared | Shared chrome listeners, already ported | Unchanged |
| Smooth scroll | wheel | Lenis, shared | 2d7ykwtxp | Shared | Scroll positions at each stop 956, 1037, 1118… equal |

REA execution window: `observe_web_execution` `ev_a4e8e5ff…`, 14s in a one-tab headless Chrome on a private port, during a book hover, leave and 40 wheel steps to the pre-footer. It finished but overran the MCP response budget, so I exported the bundle, kept this one record and deleted the 715 MB export. Coverage shows GSAP, Lenis and React running, and no book-specific code exists to hit, which fits the CSS-only finding.

`capture_browser_scenario` failed twice with `cleanup_incomplete` (`Analysis operation timed out after 1000ms`), once connected to the private Chrome and once launched, so the click was checked with Playwright instead. `compare_web_captures` and `compare_web_screenshots` take complete captures inline, which did not fit the transport; Playwright frames and numeric samples replace them. `trace_web_source_location` needs a source map, and Scale ships none.

## Visual check
Side-by-side sheets in the scratchpad `new-qa/guides/`, all opened: first paint and every 50% viewport at 1440 and 390, every 10% through the pre-footer range at both, hover frames at both, breakpoint frames at 640, 1024, 1280, for clone and filled. Same corners from the first frame, same direction of movement, same header cover. Differences by eye are the two below.

## Deviations from Scale
- **Cover logo:** `Logo` wordmark in Scale's 80 x 18 (20 from `xl`) box. Same box, different mark, as in the header.
- **Mono font:** DM Mono stands in for Aeonik Mono: `01` is 15.6 wide vs 16.1 at 1440. Listed in stack.md.
- **Nested main:** Scale nests a second `<main>` inside the first. Here it is left out, as a second `main` is invalid and changes nothing visible.
- **Header login:** shared chrome, Log in goes to `/demo`.

## Copy
19 strings, numbers excluded: 14 unchanged after Scale to Vahue (74%), 5 changed lightly, 0 rewritten. Below the 80% target because 5 of the 12 Scale titles are niche topics under Mike's 22:46 rule and the swap dictionary.
- 01 Data Labeling: The Authoritative Guide to Data Preparation: The Definitive Guide. "Definitive" keeps the title on 2 lines; "Authoritative" put "Data" alone on the first line.
- 02 Diffusion Models to Document Intake.
- 03 Training and Building Machine Learning Models to Evaluating and Building Reliable AI Agents.
- 05 Guide to Computer Vision Applications to Guide to Workflow Automation, 5 to 4 words, same 2 lines.
- 11 Guide to AI for the Intelligence Community to Guide to AI for the Revenue Team, same template. 3 lines become 2.
- Kept verbatim: 04 eCommerce, 06 Large Language Models, 07 Generative AI for the Enterprise, 08 Insurance, 09 Finance, 10 Test and Evaluation Vision, 12 Build vs. Buy, intro, pre-footer, CTA.

The titles line up with the footer's Guides column in `components/site/content.ts`: Data Preparation, AI Agent Evaluation, Document Intake, Guide to AI for eCommerce, Workflow Automation Guide, Large Language Models.

Placeholders, 12 `// PLACEHOLDER` lines, one per book: the guides themselves are not written.

## Images
One file: `public/guides/prefooter.webp`, Scale's own photo at 2000 wide, 54 KB, from 7952 x 3654. Blurred people in a station hall: no brand, nothing niche, so it stays in the filled page. Scale's page loads the JPEG of this photo; ours loads the WebP. Same `object-cover` box.

## Gaps
- Guide detail pages are not built. Scale's books open `/guides/<slug>`. Here each book opens the site's closest page: Data Preparation `/data-engine`, Document Intake `/physical-ai`, Agents `/evaluation/enterprise`, eCommerce and Revenue Team `/public-sector-data-engine`, Workflow Automation `/generative-ai-data-engine`, LLMs `/genai-portfolio`, Generative AI `/enterprise`, Insurance `/enterprise/insurance`, Finance `/automotive`, Test and Evaluation `/evaluation/model-developers`, Build vs. Buy `/public-sector`. The footer's guide links still point to `/guides`. For Mike to decide.
- Not driven: `oml:` landscape.
