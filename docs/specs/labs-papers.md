# /labs/papers (labs.scale.com/papers)

Live source: https://labs.scale.com/papers on 2026-11-02, 1440x900 and 390x844, plus 640, 767, 768, 1023, 1024, 1279, 1280, 1450 and 1920. Stack: [../stack.md](../stack.md), section labs.scale.com. Scale's strings: `components/pages/labs-papers/content.scale.ts`. Rendered: `content.ts` beside it. Chrome comes from `app/labs/layout.tsx`. The page makes no external request at runtime: the data is a static snapshot.

## Sections and breakpoints
One slice, `ResearchTable` (module 782200, chunk `2khvrmlfrtnxz.js`, sha256 `220d769fc5f9b62a`), with `useCategoryFilter` 622866 and `CategoryFilterPills` 353007 from the same chunk. It renders directly in `<main>`, with no `ScrollReveal` and no Lenis on this route: the only motion is colour transitions.

Heights at 1440 (clone equal to Scale): header 57, section 6693.5 with 88 rows, row 70 (91 when the title wraps), footer 175, document 6926. At 390: section 9879.25, row 95 (71 with no category, 119 when the category line wraps), footer 283, document 10219. Filled, with 24 rows: document 2362 and 3260, the shorter length the brief allows for long lists.

| Width | What changes | Scale vs filled |
|---|---|---|
| Below 768 | Stacked rows, no sort buttons (plain `Date`, `Title` labels), pills in a horizontal scroller | Rects equal |
| 768 (`md`) | Sortable 4-column grid, pills wrap | Rects equal |
| 1024 (`lg`) | Preview column appears, 280 wide, `sticky top-20` | `[704, 392.5, 280, 328]` both |
| 1400 | Content capped at `max-w-[1400px]` | Equal at 1450 and 1920 |

Measured on the filled page at those widths, not on the clone. Heading, blurb, pill row, first row, preview and grid are equal at all 9. A few rows differ by one title line where the copy wraps differently: 2 rows at 640, 1 at 767, 3 at 768, 2 at 1024, 1 at 1279 and 1280. None at 390, 1023, 1440, 1450 or 1920.

## Interaction inventory
REA: `analyze_web_bundle` `ev_cbf68b8c547a93f8…` (23 of 23 scripts parsed), `inspect_web_page` `ev_d630b4a035dff9ae…`. Execution during hover, filter, sort, wheel and Tab: `observe_web_execution` `ev_7060c110f909d573…`, 9s, one-tab Chrome on port 9292 driven through CDP. Handler counts in that window: `onMouseEnter` 4, pill `onSelect` 2, sort `onClick` 4, sort comparator 1512.

Listeners: `html` `ev_4d3c24ea…`, `body` `ev_9a3b0907…`, section `ev_c03651f3…`, sticky preview `ev_42f38547…`, preview box `ev_45e1aa13…` have none. Pill `ev_5e0aa2b9…`, sort button `ev_8ecc17aa…`, desktop row `ev_f0bb6024…`, mobile row `ev_03b506a3…` each have only React's click stub from `3k3q0u73winx8.js`; the real handlers are delegated.

| Element | Input | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|
| Pill | click, tap | 353007, 622866 | Filters by category, resets the active row to 0. Options are `All` plus categories in first-seen order | 88, 46, 6, 20, 6, 52, 20, 19, 7, 9 found, equal on the clone |
| Pill | hover | 353007 | `border-ink text-ink`, .2s | `rgb(17,17,17)` both, clone |
| Active pill | state | 353007 | `border-ink text-ink bg-neutral-100`, .2s | 0, 100, 200ms samples and final `rgb(245,245,245)` equal within sample phase |
| Pills below 768 | swipe, tap | 353007 | `overflow-x-auto`, browser scrolls the tapped pill into view | Scroller 1123 vs 390 on the clone; 1059 filled, as labels differ |
| Sort button | click | 782200 | Same field flips direction, new field starts `asc`, resets active row. Starts on date `desc`. Arrow shows on the active field | Orders equal for title, category and date, both directions, clone |
| Sort button | focus after click | 782200 | Scale declares the button inside the component, so it remounts and focus drops to `body`. Kept on purpose | `BODY` both |
| Row, 768 and up | mouseenter | 782200 | Sets the preview and caption; stays after leave | Index 3 after hover and after leave, both |
| Preview | active change | 782200, `html.loaded *` | Opacity `+(active === i)`. `transition-opacity` is overridden, so the swap is instant | One image at opacity 1, both |
| Preview | scroll | CSS | `sticky top-20` | `[1100, 80, 280, 328]` at the end, both |
| Row | hover | CSS | `bg-neutral-50`, .2s | `rgb(250,250,250)`, same colour in `lab()` here |
| Row | click, Enter | 782200 | `router.push`; `window.open` in a new tab when a row has no slug | Scale goes to `/papers/distressbench` (252ms on click). Ours stays on the list, see Deviations |
| Row | Tab | 782200 | `tabIndex 0`, no ring (`outline none`) | Equal |
| Page | wheel | none | Native scroll, no Lenis | 500 at every sample, both; sampled after the jump |
| Empty state, `No image` tile | no data | 782200 | Ported | Not driven: no category is empty and every row has an image |

`capture_browser_scenario` failed twice with `cleanup_incomplete` in launch mode (REA's own 1000ms cleanup timeout), once with interactions and once with a single wait. Row navigation on Scale was checked with Playwright instead. `trace_web_module_imports` and `trace_web_source_location` not used: Turbopack ids are not ES imports and no source maps are public. `window` can't be selected by the listener tool, which takes CSS selectors. Header, footer, search and newsletter are `/labs` chrome, specified in [labs.md](labs.md), and were not re-instrumented here beyond search.

Touch in QA means Playwright's `tap`, on the pills only. A real swipe of the pill scroller was not driven.

## Deviations from Scale
- **Row destination:** Scale's `/papers/<slug>` detail pages have no route here, so rows push `/labs/papers` and appear to do nothing. `/labs` handles its paper links the same way.
- **Row count:** 88 on Scale and in `content.scale.ts`, 24 in `content.ts`. Document height is shorter for that reason alone.
- **Pill order and widths:** derived from the rows, as on Scale. Documents sits third because row 3 on `/labs` is a Documents paper, where Scale's Computer Vision comes last. Labels change pill widths.
- **Images:** `unoptimized`, as the neutral SVGs need no optimiser. Scale uses `/_next/image` from Sanity.
- **People links:** Scale's `enablePeopleLinks` is false on this page, so that branch is not ported. The `authors` string fallback isn't either: every row has an author list.
- **Colour strings:** Tailwind 4.3.3 serialises as `lab()`/`oklab()`, Scale's CSS as `rgb()`. Same colours.
- **Clone commit only:** 88 of Scale's figures in `public/labs-papers/`, removed in the fill.

## Copy mapping
Keep rule. 13 UI strings: 12 verbatim after Scale to Vahue, 1 light (`frontier model analysis` to `business agent analysis`). 9 category names: 5 verbatim, 4 light (Multimodal to Voice, Computer Vision to Documents, Post-Training to Baselines, Science of Data to Science of Context, the first three as on `/labs`). 24 paper titles: 0 verbatim, 17 light, 7 rewritten, all `// PLACEHOLDER`.

That is far below the 80% target on the rows, on purpose: a verbatim title would present Scale's published research as Vahue's. Each title keeps its slot's template and word count within about 2 words. Rows on drug discovery, patient safety, clinical records, national security and in-silico biology became quoting, support triage, claims, customer support and regulated finance. Rows 1 to 6 equal the papers on `/labs`.

Row 17 has no category, because Scale's slot has none. It shows only under `All`.

## Placeholders
25 `// PLACEHOLDER` lines: 24 rows (title, date, categories, `Full Name` authors, figure) and the figure helper. Figures repeat the six neutral diagrams from `public/labs/figures/`. Author counts follow Scale's, capped at 9 as on `/labs`.

## Gaps
- No paper detail pages.
- `components/site/labs/searchIndex.ts` now also indexes this page's rows, skipping those already on `/labs`. Checked: `TicketBench` is found, `ExceptionBench` appears once.
- Clone measured at 1440 and 390 only; the other widths were measured after the fill.
- QA sheets are outside the repo (scratchpad `new-qa/labs-papers/`, folders `clone-sheets`, `filled-sheets`); all 38 opened.
