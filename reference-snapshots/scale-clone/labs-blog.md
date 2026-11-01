# labs.scale.com/blog clone spec

| | |
|---|---|
| Source | https://labs.scale.com/blog (labs Next 16 app, see [labs-stack.md](./labs-stack.md)) |
| Clone | `/scale-clone/labs-blog/` |
| Page | `app/scale-clone/labs-blog/page.tsx` (wrapped in `<LabsShell>`, no `smoothScroll`: labs runs Lenis on `/` only) |
| Components | `components/scale-clone/labs-blog/` (`LabsBlog.tsx`, `content.ts`) |
| Shared chrome | `components/scale-clone/labs-shared/` (header with `[BLOG]` active, footer, search stand-in, `labsHref`). Not modified |
| Assets | none. The blog list renders no images (`coverImage` / `mainImage` are in the props but unused by `BlogList`) |
| Static snapshot | captured 2026-11-01 from the RSC payload (`BlogList` props `{posts[], enablePeopleLinks:false}`): 28 posts with `_id, title, slug.current, date, categories, authorNames, intro`, in server order. No runtime API calls |

## Libraries (REA `analyze_web_bundle` `ev_21db48932e10d5667a87b1639cba00b23ff885f60ec90062f0edfcacddbc3bf9`, 35 scripts, parse complete)
- Same stack as the labs home: Next.js 16.3.6 Turbopack, React, Tailwind v4, lucide (`ArrowUpDown`, `ChevronDown`, `ArrowRight`), Inkeep (lazy), HubSpot dialog in the footer.
- No Lenis on this route, no framer `ScrollReveal` (the `<main>` holds a bare `<section>` inside a Suspense boundary).
- Page component: `BlogList` (chunk `3d2wpwokq5chh.js`, module 835536) with `useCategoryFilter` (622866) and `CategoryFilterPills` (353007), the same filter modules as `/papers`.
- The scale.com chunk sha256 check (1h0nvyhf5gbrf.js, 37xz28pjbnlx4.js) does not apply: labs serves none of those chunks.
- There is no featured carousel, no cards and no pagination on this page: it is one sortable, filterable, year-grouped accordion table.

## Listener map
| Target | Events | Source |
|---|---|---|
| row `div.cursor-pointer` (both the md+ and the mobile variant) | only React's root-delegated `click` (`3k3q0u73winx8.js:0:45840`), REA `inspect_web_event_listeners` `ev_d8ed9879c96cd58bd15d056c25e931d198f0ba1157396dbd1e12413b5019fc4e` | React `onClick` in module 835536 (no `onKeyDown`, no `tabIndex`, no `onMouseEnter`) |
| pills, sort buttons | React `onClick` | 353007, 835536 |
| "Read post" | `next/link` | 835536 |
| `document` | ⌘/Ctrl+K search | header (595877), shared |

## Logic (module 835536, reproduced verbatim)
- State: `sortField` `"date"`, `sortDir` `"desc"`, `expanded` `null`, `activeCategory` `"All"`.
- Options: `["All", ...new Set(posts.flatMap(p => p.categories))]` = `All, Physical AI, Safety & Oversight, Agents, Evaluation and Alignment, Enterprise, Multimodal, Science of Data, Post-Training, Preparedness and Policy, Reasoning`.
- Sort (stable, on a copy): date `new Date(date)` difference; title `localeCompare`; category `categories[0].localeCompare` (posts with no category sort first in asc).
- Header click: same field toggles the direction; another field sets it with `desc` for date and `asc` for title / category (differs from `/papers`, which always uses `asc`). The `ArrowUpDown` icon (10 px `#737373`) shows only on the active field. Authors is a static label.
- Grouping: a `Map` keyed by `getUTCFullYear(new Date(date + "T00:00:00"))`, in sorted order; the year groups are re-sorted numerically only when sorting by date (date asc → `2025` first). Each group has a header: mono year 12/18 600 `#999` tracking .1em, a 1 px `#e5e5e5` rule, and `"{n} post(s)"` 12/18 `#d4d4d4`.
- Row click: `intro ? toggle expanded (key slug ?? _id, one open at a time) : router.push('/blog/<slug>')`. All 28 posts have an intro, so every row is an accordion with a `ChevronDown` that gets `rotate-180` when open.
- **Panel visibility quirk:** the panel has `pb-4 md:grid … hidden` when closed. `md:grid` wins over `hidden` at md+, so on desktop every intro and "Read post" link is always visible and a click only flips the chevron. Below md the panel really opens and closes. The clone keeps this (same class order; Tailwind 3 also emits responsive variants after base utilities).
- Filtering does not reset `expanded`.
- "Read post": `href /blog/<slug>`; the clone uses `labsHref`, so it goes to the live labs.scale.com post.
- Count `"{n} post(s) found"` and the empty state `"No posts found in this category."` (no category is empty in the snapshot).
- Dates: `toLocaleDateString('en-US', {month:'numeric', day:'numeric', year:'numeric'})` on the local-midnight parse (`10/29/2026`).

## Sections (one section; 1440 / 390, measured equal on both)
| Element | 1440 (top left w h) | 390 | Notes |
|---|---|---|---|
| section | 57 · 1440×4438 | 57 · 390×2744 | `border-b #d4d4d4`, `max-w-1400 px-6 lg:px-10 pt-16 pb-20` |
| h1 `[BLOG]` | 121 60 · 1320×21 | 121 24 | 14/21 500, tracking .35px, uppercase, mb-6 |
| intro | 166 60 · 672×23 | 166 24 · 342×46 | 14/22.75 `#525252`, `max-w-2xl`, mb-12 |
| pills | 237 · All 40×32, last at x 1191 | 260, horizontal strip scrollWidth 1265 | same pills as `/papers` |
| table head | 330 · 1320×31 | 353 · 342×31 | md+ grid `120px / 1fr / 110px / 1fr / 28px` (Date, Title, Category sort buttons, Authors label); mobile `80px / 1fr / 28px` |
| year header | 361 · h 51 (2026), 4180 (2025) | 384, 2553 | `py-4 border-b #e5e5e5` |
| rows | 412, 49 px (+ always-open panel at md+) | 435, 73 px | date mono 12 `#737373`; title 14/21 500 truncated; category / authors 12 `#737373` truncated; chevron 14 px (12 px mobile); hover `#fafafa` |
| panel | intro 12/19.5 `#525252` mb-3, "Read post →" 12 uppercase tracking .025em | same, only when open | `pb-4`, md+ grid `120px / 1fr / 28px` |
| count | 4396 | 2702 | 12/18 `#737373`, mt-6 |
| footer | 4495 · h 175 | 2801 · h 283 | shared LabsFooter |

Page height: 4670 (1440) and 3084 (390) on both.

## Motion
| What | Trigger | Params | Clone |
|---|---|---|---|
| Hover colours (pills, sort buttons, rows, Read post) | hover | 200 ms ease-in-out (`html.loaded *` override) | `LabsLoaded`. Pill at 100 ms `rgb(50,50,50)` / `rgb(117,117,117)`, sort `rgb(50,50,50)`, row `rgba(250,250,250,.5)` on both |
| Chevron rotate | click | `transition-transform duration-200`, killed by the override, so instant (labs: `rotate: 180deg`, clone: `transform: matrix(-1,0,0,-1,0,0)`; same pixels) | same, 50 ms sample already rotated on both |
| Reveal / smooth scroll | — | none on this route | none |

## Interaction inventory
Method:
- REA (`ev_21db4893…` bundle, `ev_d8ed9879…` row listeners) plus the module 835536 / 353007 / 622866 source read from the curl'd chunk.
- Playwright with identical inputs on both sites at 1440×900 and 390×844 (`scratchpad/labs-qa/blog.js`, outputs `blog-out*.txt`). For each step it logs visible row count, year headers, first two rows, last row, open panels, rotated chevrons, count text and the sort-icon header; the logs match line for line at both widths.
- QA images: `qa/labs-blog/{scale,clone}-{1440,390}-sNN.jpg` (every 2nd 50%-viewport step) and `qa/labs-blog/interactions/`.

### [BLOG] section
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| filter pill | click | React onClick | 353007 / 622866 | `categories.includes`. Counts: All 28, Physical AI 4 (one 2026 group), Post-Training 3 (2026: 2, 2025: 1), Reasoning 1 | yes (same rows, groups and counts) | `*-filter-physical.jpg` |
| filter pill | hover | CSS | 353007 | idle → `border-ink text-ink`, 200 ms | yes | — |
| pill strip (<md) | touch / scroll-x | native overflow | 353007 | `-mx-6 px-6 overflow-x-auto`, scrollWidth 1265; `scrollLeft = 400` lands instantly | yes (after fix 2) | `*-390-pills-scrolled.jpg` |
| sort Date / Title / Category | click | React onClick | 835536 | Title asc → Title desc → Category asc → Category desc → Date desc → Date asc (2025 group first) → Date desc; icon on the active field | yes (identical rows and group order at every step) | `*-sort-date-asc.jpg` |
| sort button | hover | CSS | 835536 | `hover:text-#525252`, 200 ms | yes | — |
| row | hover | CSS (Tailwind v4 `hover:` = `@media (hover:hover)`) | 835536 | bg `#fafafa`, 200 ms; no sticky hover after a tap on touch screens | yes (after fix 3) | `*-1440-hover-row2.jpg` |
| row | click | React onClick | 835536 | accordion, one open at a time, chevron `rotate-180` instantly; md+: panels always visible (quirk above); <md: open row1 → open row3 (row1 closes) → click row3 closes | yes | `*-open-row1.jpg` |
| Read post | hover / click | CSS / next/link | 835536 | `hover:text-#525252`; navigates to `/blog/<slug>` (clone: `https://labs.scale.com/blog/fineart`) | yes | — |
| header search / menu / newsletter | — | shared | labs-shared | see labs.md | yes (shared) | — |

## QA
- 20 geometry and type probes at 1440 and 390 match exactly (positions, sizes, font size, line height, weight, colour, letter spacing), including the page heights 4670 / 3084.
- The interaction state log matches line for line at both widths.
- 0 console errors on both.
- Side-by-side screenshots match; the only visible difference is the Next dev indicator.

Fixes made during QA:
1. `SortButton` was declared inside the component (remounted on every render, which broke a hover sample); hoisted to module scope.
2. The Vahue global `* { scroll-behavior: smooth }` made the mobile pill strip scroll smoothly (scrollLeft 358 instead of 400 after 200 ms). The strip now has `[scroll-behavior:auto]`. The same issue probably exists on `labs-papers`' strip (shared fix would belong in `labs.module.css`; not touched here because that file is shared).
3. labs' Tailwind v4 gates `hover:` behind `@media (hover:hover)`, the repo's Tailwind 3 does not, so tapped rows kept a grey hover background on mobile. The clone writes its hover utilities as `[@media(hover:hover){&:hover}]:…`.

## Remaining gaps
- Blog post pages (`/blog/<slug>`) and people links aren't cloned; Read post opens the live labs.scale.com page.
- Search is the shared static stand-in; the index is the 28 posts, not Inkeep.
- The snapshot is static. New posts on labs won't appear until the content is re-captured.
- Year grouping uses `getUTCFullYear` of a local-midnight parse exactly like labs, so a 1 January post would fall into the previous year for viewers east of UTC on both sites.
