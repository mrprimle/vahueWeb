# labs.scale.com/papers clone spec

| | |
|---|---|
| Source | https://labs.scale.com/papers (labs Next 16 app, see [labs-stack.md](./labs-stack.md)) |
| Clone | `/scale-clone/labs-papers/` |
| Page | `app/scale-clone/labs-papers/page.tsx` (wrapped in `<LabsShell>`, no `smoothScroll`: labs runs Lenis on `/` only) |
| Components | `components/scale-clone/labs-papers/` (`LabsPapers.tsx`, `content.ts`) |
| Shared chrome | `components/scale-clone/labs-shared/` (header with `[PAPERS]` active, footer, search stand-in, `labsHref`). Not modified |
| Assets | `public/scale-clone/labs-papers/<slug>.webp`: 88 Sanity preview images, fit inside 464 px, WebP q72, 1.3 MB total |
| Static snapshot | captured 2026-11-01 from the RSC payload (`ResearchTable` props `papers[]`, `enablePeopleLinks:false`): 88 papers with `_id, title, slug, date, dateSort, categories, authors, authorSlugs→authorNames, image`, in server order. No runtime API calls |

## Libraries (REA `analyze_web_bundle` `ev_a789d61f93293a0fa85926172fea348c2ce52f06b19ce242ceb9a5233a07c0a5`, 30 scripts, parse complete)
- Same stack as the labs home: Next.js 16.3.6 Turbopack, React, Tailwind v4, lucide (`ArrowRight`, `ArrowUpDown`), `next/image`, Inkeep (lazy), HubSpot dialog in the footer.
- No Lenis on this route, and no framer `ScrollReveal`: the page's `<main>` holds one bare `<section>` (no `opacity:0` wrappers in SSR).
- Page component: `ResearchTable` (chunk `2khvrmlfrtnxz.js`, module 782200) with `useCategoryFilter` (622866) and `CategoryFilterPills` (353007).

## Listener map
| Target | Events | Source |
|---|---|---|
| `[role=link]` rows | only React's root-delegated `click` (`3k3q0u73winx8.js:0:45840`), REA `inspect_web_event_listeners` `ev_1d30d682b3860e93332843d050c88a2b36a681137de65601632dd043b93cc98a` | handlers are React props in module 782200: `onClick`, `onKeyDown` (Enter), `onMouseEnter` (md+ rows) |
| pills, sort buttons | React `onClick` | 353007, 782200 |
| `document` | ⌘/Ctrl+K search | header (595877), shared |

## Logic (module 782200, reproduced verbatim)
- State: `sortField` `"date"` (default), `sortDir` `"desc"`, `activeIndex` 0, `activeCategory` `"All"`.
- Options: `["All", ...new Set(papers.flatMap(p => p.categories))]`, which gives `All, Safety & Oversight, Multimodal, Agents, Enterprise, Evaluation and Alignment, Post-Training, Reasoning, Science of Data, Computer Vision`.
- Filter: `categories.includes(active)`. Sort over a copy (stable):
  - date: `new Date(dateSort || date)` difference
  - category: `categories[0].localeCompare`
  - title: `title.localeCompare`
  - `desc` negates
- Header button click: same field toggles the direction; another field sets the field with `asc`. Both reset `activeIndex` to 0. A pill click also resets it to 0.
- The `ArrowUpDown` icon (10 px, `#737373`) shows only on the active sort field and doesn't show the direction.
- Row mouseenter (md+ rows only) sets `activeIndex`. It isn't reset on leave.
- Row click or Enter: labs does `router.push('/papers/<slug>')` (every paper has a slug, so nothing opens in a new tab). The clone does `location.assign(labsHref('/papers/<slug>'))`, which goes to the live labs detail page.
- Authors: `authorSlugs` names joined `", "` as plain spans (people links are disabled on labs).
- Count `"{n} paper(s) found"` and an empty state `"No papers found in this category."` (no category is empty in the snapshot).

## Sections (one section; 1440 / 390, measured equal on both)
| Element | 1440 (top left w h) | 390 | Notes |
|---|---|---|---|
| section | 57 · 1440×6694 | 57 · 390×9879 | `border-b #d4d4d4`, `max-w-1400 px-6 lg:px-10 pt-16 pb-20` |
| h1 `[PAPERS]` | 121 60 · 1320×21 | 121 24 | 14/21 500, tracking .35px, uppercase, mb-6 |
| intro | 166 60 · 672×46 | 166 24 · 342×68 | 14/22.75 `#525252`, `max-w-2xl`, mb-12 |
| pills | 260 · All 40×32, last at x 1014 | 282, horizontal strip scrollWidth 1123 / 390 | 12/18, `px-3 py-1.5`; active `border-ink bg-#f5f5f5`, idle `border-#d9d9d9 #525252`. Wrapper `mb-10 border-b #e5e5e5 pb-5`; mobile `-mx-6 overflow-x-auto px-6` |
| table head | 353 · 1008×31 | 375 · 342×31 | md+ grid `100px / 1fr / 100px / 28px`, sort buttons 12/18 600 uppercase with a dot; mobile grid `70px / 1fr / 28px` static spans |
| rows | 384, 70 px each, last at 6558 | 406, 95 px each, last at 9718 | Date mono 12 `#737373`; title 14/21 500, 2-line clamp; authors 12 `#a3a3a3` truncated (md+); category 12 `#737373` truncated; arrow 14 px (12 px mobile); `border-b #e5e5e5`, hover `#fafafa` |
| preview | 353 1100 · 280×280, `sticky top-20` (80 px when scrolled) | hidden (<lg) | `border #e5e5e5`; layers crossfade by opacity (instant because of the `html.loaded *` override); image `inset-6 object-contain`; title below 12/18 500, mt-3 |
| count | 6652 | 9837 | 12/18 `#737373`, mt-6 |
| footer | 6751 · h 175 | 9936 · h 283 | shared LabsFooter |

Page height: 6926 (1440) and 10219 (390) on both.

## Motion
| What | Trigger | Params | Clone |
|---|---|---|---|
| Hover colours (pills, sort buttons, rows) | hover | 200 ms ease-in-out (`html.loaded *` override) | `LabsLoaded`. Pill at 100 ms: `rgb(50,50,50)` / border `rgb(117,117,117)` on both; sort button `rgb(49,49,49)` vs `rgb(50,50,50)` |
| Preview swap | row mouseenter | `transition-opacity duration-300`, killed by the override, so instant | same |
| Reveal / smooth scroll | — | none on this route | none |

## Interaction inventory
Method:
- REA (`ev_a789d61f…` bundle, `ev_1d30d682…` row listeners) and the module 782200/353007 source.
- Playwright with identical inputs on both sites at 1440×900 and 390×844 (`scratchpad/labs-qa/papers.js`). For each step it logs the visible row count, the first and last rows, the visible preview layer, the preview title, the count text and which header shows the sort icon.
- QA images are in `qa/labs-papers/{scale,clone}-{1440,390}-sNN.jpg` (every 50% viewport: 1440 every 2nd, 390 every 4th) and `qa/labs-papers/interactions/`.

### [PAPERS] section
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| filter pill | click | React onClick | 353007 / 622866 | filter by `categories.includes`, `activeIndex` reset to 0. Counts: All 88, Agents 20, Computer Vision 9, Enterprise 6, Safety & Oversight 46, Reasoning 19 | yes (same rows, order and count on both) | `*-filter-agents.jpg` |
| filter pill | hover | CSS | 353007 | idle → `border-ink text-ink`, 200 ms | yes (100 ms sample equal) | — |
| pill strip (<md) | touch / scroll-x | native overflow | 353007 | `-mx-6 px-6 overflow-x-auto`, width 1123 | yes | `*-390-pills-scrolled.jpg` |
| sort Date / Title / Category | click | React onClick | 782200 | toggle/asc rules above, icon on the active field. Verified sequence: Title asc → Title desc → Category asc → Date asc → Date desc | yes (identical first/last rows at every step) | `*-sort-date-asc.jpg` |
| sort button | hover | CSS | 782200 | `hover:text-#525252`, 200 ms | yes | — |
| row (md+) | mouseenter | React | 782200 | sets the preview layer and title; kept after mouseleave | yes (rows 3 and 7, and after leave, equal) | `*-hover-row3.jpg` |
| row | hover | CSS | 782200 | bg `#fafafa`, 200 ms | yes | — |
| preview | scroll | CSS sticky | 782200 | `sticky top-20`: top 80 at scrollY 2400 on both | yes | `*-sticky-row30.jpg` |
| row | click / Enter (tabIndex 0) | React | 782200 | `router.push('/papers/<slug>')` | yes: navigates to `https://labs.scale.com/papers/distressbench` on both | `*-focus-row0.jpg` |
| filter after hover | hover row 5, then pick Reasoning | — | 782200 | preview resets to the first filtered row (ARCA) | yes | — |
| header search / menu / newsletter | — | shared | labs-shared | see labs.md | yes (shared) | — |

## QA
- 20 geometry and type probes at 1440 and 390 match exactly (positions, sizes, font size, line height, weight, colours), including page height.
- The interaction state log matches line for line at both widths.
- 0 console errors on both.
- Side-by-side screenshots match. The only visible difference is the Next dev indicator.
- One difference: labs sets the default `border-color` of every element to `#d9d9d9` (Tailwind v4 base), where the repo's Tailwind 3 preflight gives `#e5e7eb`. No element on this page draws a border without an explicit colour, so nothing renders differently.

## Remaining gaps
- Paper detail pages (`/papers/<slug>`) and the people links aren't cloned. Rows open the live labs.scale.com page.
- Previews are 464 px WebP instead of `next/image` up to 3840 px. They render 232 px inside the 280 px box, so they're sharp at 2x.
- Search is the shared static stand-in. The index is the 88 papers, not Inkeep.
- The snapshot is static. New papers on labs won't appear until the content is re-captured.
