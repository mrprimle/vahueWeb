# /labs (labs.scale.com/)

Live source: https://labs.scale.com/ on 2026-11-02, 1440x900 and 390x844, plus 640, 768, 1024, 1280 and 1450. Stack: [../stack.md](../stack.md), section labs.scale.com. Scale's strings: `components/pages/labs/content.scale.ts`, `components/site/labs/content.scale.ts`. Rendered: `content.ts` beside them. All data is a static snapshot; the page makes no external request at runtime (`external []` in the QA run).

## Sections and breakpoints
Heights at 1440 (Scale and ours equal): header 57, hero 603.4, leaderboards 438.4, papers 610.8, blog 322.9, jobs 531, footer 175, document 2738. At 390: hero 416.9, leaderboards 438.4, papers 757.2, blog 343.3, jobs 777, footer 283, document 3073.

| Width | What changes | Scale vs ours |
|---|---|---|
| 640 (`sm`) | Footer goes to a row: 265 to 175 tall | 2782 document, equal |
| 768 (`md`) | Desktop nav replaces burger, table grids replace stacked rows (row 71 to 50), hero padding up, jobs 4 columns | 2717 document, equal |
| 768 and below | Search modal is full-screen; close button shows below 768 | 0,0,768,900, input 536 wide, equal |
| 769 to 800 | Search modal is `min(90vw, 720px)` | 692 at 769 |
| 1024 (`lg`) | Hero padding and type up, side padding 40, jobs row one line | 2738 document, equal |
| 1280 (`xl`) | Paper preview column appears, 280 wide | equal |
| 1400 | Content capped at `max-w-[1400px]` | equal at 1450 and 1920 |

## Interaction inventory
REA: `analyze_web_bundle` `ev_65bdd537aa175325…`. Listeners: `html` `ev_1cfb409f…`, `body` `ev_3a1a46e2…`, canvas `ev_33059e29…`, header `ev_5f0a2685…`, hero section `ev_59efbdb0…` (all 0, handlers are React delegated or on the parent); carousel `ev_5d18759e…` (passive scroll); footer button `ev_92f0ef4a…`, paper link `ev_543c6937…`, search button `ev_31c55a45…` (React click). Execution during wheel, hover, carousel, dialog and search: `observe_web_execution` `ev_1e32b908…`, 9s, one-tab Chrome on port 9264 driven through CDP. Its response exceeded the 10 MB stdio budget, so the record is retained and I read the code from the chunks instead.

| Element | Input | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|
| Hero grid | time | 539120 | WGSL `grid-bg`, ~80px aligned cells, field drift `t*.06`, `t*-.045`, breathe `.6`, peak .09, line .05 | Same look at the same widths, frames differ by clock |
| Hero grid | pointermove, leave on section | 539120 | Spotlight radius 210, strength eases .12 per frame, `mouse` keeps last value | Same code path; checked by eye |
| Hero grid | no WebGPU or a device error | 726785 | Canvas 2D grid, 3.5% cells, 12s reseed, `Math.random` | Ported, verbatim logic |
| Reduced motion | media query | 539120 | One frame at time 8 | Ported, not sampled |
| Slices | scroll into view | 953971 | opacity 0 to 1, y 14 to 0, .5s, `[.16,1,.3,1]`, once, amount .06 | Trigger near y 255 to 263; opacity .467/7.38 then .669/3.94 vs .649/4.35 at the same scroll, within sample phase |
| Page | wheel | `2ri_cj1i8zivb.js` | Lenis lerp .1 on home only | 118, 210, 239, 270, 280 vs 118, 210, 239, 270, 280 |
| Paper row | mouseenter | 408028 | Switches preview and caption; stays after leave | `[0,0,0,1,0,0]` at once, equal; cross-fade is instant because `html.loaded *` beats `transition-opacity` |
| Paper row, leaderboard row, job row | hover | CSS | `bg-neutral-50`, .2s | `rgb(250,250,250)`, equal |
| Blog arrows | click | 274580 | `scrollBy(card + 24)`, smooth; Previous disabled at `scrollLeft <= 4`, Next at the end | x 0 to 316, disabled flags equal at 0, end and back |
| Blog | scroll, resize | 274580 | Passive listener updates arrows | Equal |
| Outline button | hover | 979543 | Fills ink, .2s | `.055, .13, .64, .87` on Scale; final colours and timing equal |
| Focus ring | Tab | 979543 | White 2px, `rgb(18,18,18)` 4px | Equal |
| Nav link | hover | 595877 | `text-ink bg-neutral-100`, .2s | Equal |
| Nav link | current route | 595877 | `<span aria-current>` with `bg-neutral-100` | On `/labs/papers`, not on Scale's home |
| Burger | click, below 768 | 595877 | Panel 111 tall, no animation | Header 168 tall, links at 73, 103, 133 |
| Search | ⌘K, Ctrl+K, button | 595877 | Opens; input focused; overlay and panel fade .15s; blur 4px; body scroll locked | 360,45,720,122 empty; 720,662 with results; 639.5 at 650 tall; equal |
| Search | typing | Inkeep | Debounce 300, up to 40 results, `All (n)` pill, first result active, bold term in the snippet | Same layout |
| Search | arrows, Enter, Esc, overlay click, hover | Inkeep | Moves active item, Enter opens in a new tab, Esc and overlay close | Ported from observed behaviour |
| Ask AI | toggle, trigger, Enter | Inkeep | Chat view: greeting, chip, input | 720 x 361 on Scale, see Gaps |
| Newsletter | title or button | 627256, 385368 | Dialog 512 x 348.5, instant (no animation CSS on Scale), overlay black 80% | All field rects equal |
| Newsletter | Submit with empty or bad fields | HubSpot | Error text under the field, height unchanged | Errors at 408 and 471.6 vs 408 and 471.6 |
| Newsletter | valid submit | HubSpot | Thanks text; nothing sent | Scale posts to HubSpot, see Gaps |
| Dialog | Esc, overlay, close | 523384 | Closes, focus returns | Equal |

## Deviations from Scale
- **Inkeep and HubSpot:** both are live services. Rebuilt from measurements with static data. On Scale search returns fuzzy matches from the whole site, here it matches words in the snapshot, and an unmatched query shows "No results found." Ask AI answers with up to 3 links from the index, not an LLM. Submitting the newsletter shows the thanks text and sends nothing, so **Mike needs a form backend** before launch.
- **Links:** items link to their list routes (`/labs/papers`, `/labs/leaderboard`, `/labs/blog`, `/labs/jobs`), since detail routes don't exist yet. Job rows keep Scale's new tab.
- **WebGPU:** direct API, no `vgpu` wrapper. Same shader, uniforms, blending and frame logic.
- **Fonts:** Google's Inter and Geist Mono. The Submit arrow is 1.4px wider than Scale's.
- **Clone commit only:** the Ask AI icon was the v mark, not Scale's triangle, and search's "inkeep" was text.
- `capture_browser_scenario` failed with `cleanup_failed` over CDP (REA timeout); interactions were driven with Playwright instead. `export_web_scripts` and `trace_web_module_imports` not used: Turbopack ids are not ES imports, chunks were fetched with curl.
- WebGPU frames in headless with swiftshader sometimes composite blank in screenshots, on Scale and ours alike. It's the capture.

## Copy mapping
Keep rule. Counted path by path against `content.scale.ts`, without URLs and the country list: 130 strings, 87 verbatim after Scale to Vahue, 21 light, 22 rewritten. All 22 are `// PLACEHOLDER` data rows (paper and post titles, authors, job locations). Hero stays "Research to Advance AI"; its body and the papers blurb carry the positioning (real business agents, baselines, context). `[LEADERBOARDS]` reads `[AGENT EVALS]`, the site menu's name for `/labs/leaderboard`. `[Jobs]` stays, the menu's Research Careers names the page. Scale's clinical, drug discovery, robotics and frontier-risk items became support, intake, back-office and workflow-risk items.

## Placeholders
33 `// PLACEHOLDER` lines: 5 benchmark names, 6 papers (titles, dates, categories, `Full Name` authors, figures), 4 posts (12 lines: titles, dates, intros with numbers such as 40,000 and 718), 6 jobs plus the shared date and 2 location constants, the legal entity in the copyright line. `public/labs/figures/` holds six neutral diagrams at the box ratios of Scale's figures, in place of its paper images; the Scale logo and paper images are removed from `public`.

## Gaps
- Next labs pages: `/labs/papers`, `/labs/leaderboard`, `/labs/blog`, `/labs/jobs` already get this chrome as stubs. Their full lists should feed `searchIndex.ts`.
- Favicon: same one 404 as the main site.
- QA sheets are outside the repo (scratchpad `new-qa/labs/`, folders `clone`, `clone-w`, `filled`); all opened.
