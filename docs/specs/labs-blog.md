# /labs/blog (labs.scale.com/blog)

Live source: https://labs.scale.com/blog on 2026-11-02, 1440x900 and 390x844, plus a width sweep. Stack: [../stack.md](../stack.md), section labs.scale.com. Chrome: `components/site/labs/`, mounted by `app/labs/layout.tsx`, see [labs.md](labs.md). Scale's strings: `components/pages/labs-blog/content.scale.ts`. Rendered: `content.ts` beside it. All data is a static snapshot; the page makes no external request at runtime (`ext []` in the QA run).

## Stack on this page
Same build as `/labs`: Next.js App Router, Turbopack, Tailwind v4, Inter and Geist Mono. REA found 35 of 35 scripts parsed. The page is one client component, `BlogList` 835536, with `useCategoryFilter` 622866 and `CategoryFilterPills` 353007, all in `3d2wpwokq5chh.js`. Props from the flight payload: `posts` (28), `enablePeopleLinks: false`. No Lenis (wheel lands at once, `/` only has it), no framer-motion `ScrollReveal`, no GSAP, no images in the section. `lucide-react` icons only.

## Section
One section, `BlogList`, in `<main>`: `[Blog]` heading, blurb, filter pills, column heads, year groups with count, rows, per-row intro panel, "n posts found", empty state.

Heights. Scale and clone equal. Fill is shorter because it has 24 posts, not 28.

| | Scale, clone | Fill |
|---|---|---|
| 1440 header | 57 | 57 |
| 1440 section | 4437.8 | 3912.8 |
| 1440 footer | 175 | 175 |
| 1440 document | 4670 | 4145 |
| 390 section | 2743.5 | 2447.5 |
| 390 document | 3084 | 2788 |

The difference is exactly the four left-out rows: 525 at 1440 (121.5, 121.5, 141, 141), 296 at 390 (74 x 4). Every one of the 24 kept slots has the same row height as Scale at both widths, compared slot by slot. So line wraps held.

Width sweep, clone vs Scale (document, section, visible rows and panels, first pill x), all equal: 320, 360, 430, 640, 767, 768, 1024, 1279, 1280, 1400, 1450, 1920. Examples: 767 is 2785, 768 is 5490, 1024 is 5022, 1400 is 4670.

| Width | What changes |
|---|---|
| Below 768 | Stacked 3-column row, date 80px; pills scroll sideways in a strip, `-mx-6`; intro panels closed until tapped |
| 768 (`md`) | 5-column table, sort buttons appear, pills wrap; intros all visible, see below |
| 1024 (`lg`) | Side padding 40 |
| 1400 | Content capped at `max-w-[1400px]` |

## Interaction inventory
REA: `analyze_web_bundle` `ev_ce988f82308070822e9ef0ae…`, `inspect_web_page` `ev_eb288aad1361aa86…`. Listeners with `inspect_web_event_listeners`: `html` `ev_6c9a8d65…`, `body` `ev_a9009bf7…`, `main section` `ev_3789d611…`, row `ev_e76caf25…`, pill strip `ev_3746043c…`, year label `ev_da4811e0…`, header `ev_ad62f38e…` (all 0, React delegates); first button `ev_641814dd…` and first link `ev_c7a0863d…` (one `click` each, in `3k3q0u73winx8.js`, React's own). Execution during a real run of filter, sort, row click, hover and wheel: `observe_web_execution` `ev_a118de0e508560e0…`, 6s, one-tab headless Chrome on port 9271 driven through CDP. Counts in `3d2wpwokq5chh.js` for that run: pill `onClick` 2, `toggleSort` 2, desktop row `onClick` 2, mobile row `onClick` 0 (not used at 1440), people link map 0, `router.push` branch not reached.

| Element | Input | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|
| Pills | click | 353007, 622866 | Single select. Options are `All` plus categories in order of first appearance. Filters by `categories.includes` | All 11 pills at both widths: same found counts, year groups and document height |
| Pills | hover | CSS | `hover:border-ink hover:text-ink`, .2s through `html.loaded *` | End `rgb(17,17,17)` for both, same transition list |
| Pill strip | overflow, below 768 | CSS | `overflow-x-auto`, `w-max` | `[390, 1265, auto]` on Scale and clone |
| Date, Title, Category | click | 835536 `D`, `u` | Same field flips direction. New field: `date` starts desc, others asc. Arrow only on the active one | 7 clicks: same order, year order, arrow flags. Date asc puts 2025 first |
| Authors head | none | 835536 | Not a button | Equal |
| Year row | none | 835536 | `n posts`, `1 post` | Equal, including after a filter |
| Row, 390 | tap | 835536 | One open at a time, tap again closes. Panel shows or hides at once | Panel 130 tall, then 169 on row 2, closed: doc 3214, 3253, 3084 equal |
| Row, 1440 | click | 835536 | **Only the chevron turns.** `md:grid` is later in the CSS than `hidden`, so all intros stay visible at `md` and up. Ported as is | 28 panels visible before and after, doc unchanged, both |
| Chevron | click | 835536 | `rotate-180`. `transition-transform duration-200` is beaten by `html.loaded *`, so it jumps | 180deg from the first sample, transition list equal |
| Open state | filter | 835536 | Open row is kept in state through a filter change | Equal |
| Row | hover | CSS | `bg-neutral-50`, .2s | Alpha .055, .36, .64, .945 vs .056, .359, .641, .944 at the same steps |
| Read post | hover | CSS | `hover:text-neutral-600` | `rgb(82,82,82)` vs `lab(34.924 0 0)`, the same colour |
| Read post | click | 835536 | Scale goes to `/blog/<slug>` | Ours stays on `/labs/blog`, see Deviations |
| Row without intro | click | 835536 | Arrow icon, `router.push` | Ported, not driven: every post has an intro |
| Keyboard | Tab | native | Rows are not focusable. Pills, sort buttons and visible Read post links are. No focus ring in the section beyond the browser's `outline: auto` | First 22 stops same at 1440; same at 390 apart from chrome text |
| Page | wheel | native | No Lenis on this route | `wheel(500)` lands on 500 at the first sample, both |
| Reveal | scroll | none | No reveal on this page | Section opacity 1, no transform, both |

Header, footer, search and newsletter are the labs chrome, inventoried in [labs.md](labs.md). `[BLOG]` shows as the current route in the nav, as on Scale.

Measuring catch: Scale takes about 3.9s to hydrate on a cold load, and swaps fonts late. Clicks before that do nothing on Scale, and widths are off by up to 2px. All numbers above were taken after hydration and `document.fonts.ready`. With that, text widths are equal to the pixel (pill 88.06, title 446.47, year 33.61).

## Visual check
Sheets are outside the repo: scratchpad `new-qa/labs-blog/`, folders `clone` (6 sheets) and `filled` (9 sheets). All opened. Pairs at first paint, at rest, every 50% viewport with real wheel input, and with filter, title sort, chevron, open row and scrolled pill strip. By eye:
- Clone: same apart from the logo.
- Fill: same layout and rhythm, shorter by the four rows. Pill order differs, see Copy mapping.
- On first paint at 390 Scale's logo is still blank, as it is an image file; ours is inline.

## Deviations from Scale
- **Post pages:** Scale links each post to `/blog/<slug>`, which doesn't exist here. "Read post" points at `/labs/blog`, so on this page it does nothing. Same choice as `/labs`.
- **24 posts, not 28,** by the brief's cap on long lists. Scale's rows 11, 21, 23, 27 are out, chosen so that every category and both year groups stay.
- **Search:** `searchIndex.ts` now also indexes the 20 posts that aren't on `/labs`.
- `CategoryFilterPills` is the same module as on `/labs/papers`. Each page keeps its private copy, as papers doesn't export it.
- REA `capture_browser_scenario` failed twice with `cleanup_failed` (launch and connect), as on `/labs`. Interactions were driven with Playwright and through CDP instead. `export_web_scripts`, `trace_web_module_imports`, `trace_web_source_location` not used: Turbopack ids aren't ES imports, no source maps ship, chunks were fetched with curl. `compare_web_screenshots` not used: pairs were compared by eye and by geometry.

## Copy mapping
Keep rule. Counted slot by slot against `content.scale.ts`: 72 strings, 30 verbatim after Scale to Vahue, 35 light, 7 rewritten.
- 14 fixed strings (meta, heading, blurb, columns, counts, empty, Read post): all verbatim.
- 10 category labels: 6 verbatim, 4 swapped: Physical AI to Operations, Multimodal to Voice, Post-Training to Baselines, Science of Data to Science of Context. The last three match `/labs/papers`.
- 48 post strings: 10 verbatim, 31 light, 7 rewritten. This is below the 80% aim on purpose: the list is mostly robotics, clinical, drug discovery, cybersecurity and reinforcement-learning topics, which the no-niche rule replaces. Templates, word counts and storytelling stay. Word count is within 15% on all but two: titles 3 and 4 run longer because they must equal the `/labs` blog cards.
- Pill order follows the data, so Agents comes first and Operations moves to sixth: `/labs` already shows post 1 as Agents.

## Placeholders
24 `// PLACEHOLDER` lines in `content.ts`, one per post: titles, dates, categories, `Full Name` authors at Scale's count per post, intros and all numbers in them. Posts 1 to 4 equal the blog cards on `/labs`.

## Gaps
- Touch swipe on the pill strip not driven: the strip was moved with `scrollLeft`. It's plain native overflow.
- Only Chrome was tested.
- No post detail pages.
- Favicon: same one 404 as the main site.
