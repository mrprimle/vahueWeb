# labs.scale.com/jobs clone spec

| | |
|---|---|
| Source | https://labs.scale.com/jobs (labs Next 16 app, see [labs-stack.md](./labs-stack.md)) |
| Clone | `/scale-clone/labs-jobs/` |
| Page | `app/scale-clone/labs-jobs/page.tsx` (wrapped in `<LabsShell>`, no `smoothScroll`: labs runs Lenis on `/` only) |
| Components | `components/scale-clone/labs-jobs/`: `LabsJobs.tsx` (JobsList, server component: it has no state), `content.ts` (data) |
| Shared chrome | `components/scale-clone/labs-shared/` (header with no active item, because labs has no `[JOBS]` nav entry; footer, newsletter `LabsDialog`, search stand-in). Not modified |
| Assets | none (only the inline lucide `ArrowDown`) |
| Static snapshot | **captured 2026-11-01** from the RSC payload. The server passes `JobsList` a `greenhouseJobs` prop with 11 Greenhouse rows for the Research department, in server order. Only `id, title, location.name, updated_at, absolute_url` are kept. All rows have `updated_at` 2026-10-22T14:10:38-04:00, so every date shows `10.22.2026`. JobsList's built-in fallback list (6 placeholder rows, `absolute_url "#"`, used only when the prop is empty) and its empty state are kept as `fallbackJobs` / `empty`. No runtime API calls. Re-capture by decoding `self.__next_f` and reading the `$L17` (`JobsList`) props |

## Libraries
REA `analyze_web_bundle` `ev_3113be788f7d87d4dc780e4459307e73847afaf33663931d9124ed0528969fdc` (32 scripts, parse complete).
- Same labs stack: Next.js 16.3.6 Turbopack, React, Tailwind v4, lucide-react, HubSpot newsletter dialog in the footer, Inkeep (lazy, `25n1aq7vxfxt3.js` 1.5 MB).
- No Lenis on this route, no framer `ScrollReveal` (the SSR `<main>` has no `opacity:0` wrappers), and no GSAP.
- The page is a server component that renders `<main class="mx-auto max-w-[1400px] px-6 lg:px-10 py-14">` around a single client component, `JobsList` (chunk `0yqh0pl17sga4.js`, sha256 `c739deaa…412db12`, module 163195). The same chunk holds `UnifiedHeader` (595877), lucide `ArrowDown` (562653) and `Search`.
- JobsList has no hooks, so it is effectively static. Rows are Next `Link`s to absolute Greenhouse URLs with `target="_blank"`. Next's `linkClicked` leaves non-`_self` targets to the browser and doesn't prefetch external hrefs, so the clone uses plain `<a>`.

## Listener map
| Target | Events | Evidence | Source |
|---|---|---|---|
| job row `<a>` (`main a[href*=greenhouse]`) | only React's root-delegated `click` (`3k3q0u73winx8.js:0:45840`) | `inspect_web_event_listeners` `ev_25bde6d321445b9d51232a080c507fe5e13f544629cd10b2808adb348a6249e8` | Next Link `onClick`: lets the browser open the new tab |
| `document` | `keydown` ⌘/Ctrl+K (search) | module source | header 595877 (shared) |

## Logic (module 163195, reproduced)
- `jobs = greenhouseJobs?.length > 0 ? greenhouseJobs : fallback`.
- The date is `r(updated_at)`: `MM.DD.YYYY` from UTC getters. It is not `first_published`.
- Two lists are rendered from the same array:
  - a md+ grid list, `hidden md:grid`
  - a <md stacked list, `md:hidden`, with keys `m-<id>`
- Empty state: `No open positions at the moment. Check back soon.` (`py-10 text-center`). It can't appear on labs, because the fallback list is used when the prop is empty.

## Section (one section; 1440 / 390, every probe equal on both sites)
| Element | Markup | 1440 (top left w h) | 390 |
|---|---|---|---|
| main wrapper | `mx-auto max-w-1400 px-6 lg:px-10 py-14` | 57 · padding 56 | same |
| h1 `[Jobs]` | 12/18 500, tracking .025em (0.3 px), uppercase, ink, mb-2 | 113 60 · 1320×18 | 113 24 · 342×18 |
| intro | 12/18 `#737373`, `max-w-xl` (576), mb-10 | 139 60 · 576×36 | 139 24 · 342×36 |
| head (md+) | grid `100px 1fr 1fr 24px` gap-x-4, pb-3, `border-b ink`. Labels `• Date / • Position / • Location`: 12/18 600 uppercase, 4 px ink dot, gap-1.5 | 215 · 1320×31; cols x 60 / 176 / 766 | — |
| head (<md) | grid `1fr 24px` gap-x-3, `• Position` (gap-1) | — | 215 · 342×31 |
| row (md+) | `<a target=_blank>` grid, py-3, `border-b #e5e5e5`, hover `bg-#fafafa`, `cursor-pointer group`. Date Geist Mono 12 `#737373`; title 12/18 500 ink uppercase; location 12 `#737373` uppercase; ArrowDown 14 px `#737373`, right-aligned | 246, 43 px each, 11 rows, last at 676 | — |
| row (<md) | grid `1fr 24px`; title 12/18 500 uppercase block; second line `location · <mono date>` 12 `#737373` mt-0.5, location not uppercased; arrow (no hover nudge) | — | 246, 99 px each (63 for one-line titles), last at 1038 |
| footer | shared LabsFooter | 775 · h 175 | 1157 · h 283 |

Page height: 950 at 1440 and 1440 at 390, on both sites.

## Motion
| What | Trigger | Params | Clone |
|---|---|---|---|
| Row background | hover | `transition-colors` overridden by `html.loaded *` to 200 ms ease-in-out. Samples are equal on both: 100 ms `rgba(250,250,250,.64)`, 200 ms `#fafafa`, leave at 100 ms `.5`, 400 ms transparent | `LabsLoaded` (shared) |
| ArrowDown nudge (md+) | row hover | `group-hover:translate-y-0.5`, which Tailwind v4 compiles to `translate: 0 2px`. It is instant, because the override drops `transform`/`translate` from `transition` | `group-hover:[translate:0_2px]`: the computed `translate` is `0px 2px` and the svg top is 348 on both |
| Reveal / smooth scroll | — | none on this route | none |

## Interaction inventory
Method:
- REA evidence above, plus module 163195 read from the curl'd chunk (`scratchpad/labs-jobs-dl/chunks/`).
- Playwright with identical inputs on both sites at 1440×900 and 390×844 (mobile + touch at 390). Scripts: `scratchpad/labs-qa/jobs.js`, `jobs2.js`.
- QA images:
  - `qa/labs-jobs/{scale,clone}-{1440,390}-sNN.jpg` (every 50% viewport)
  - `qa/labs-jobs/interactions/{scale,clone}-{1440,390}-{row-hover,focus-row0}.jpg`

### [JOBS] section
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| job row | hover (mouse path into row 3, sampled 0/100/200/400 ms, then leave) | CSS | 163195 | bg `#fafafa` 200 ms ease-in-out; `cursor: pointer` | yes (same samples) | `*-row-hover.jpg` |
| job row arrow (md+) | hover | CSS | 163195 | `translate: 0 2px`, instant | yes | `*-1440-row-hover.jpg` |
| job row arrow (<md) | tap / hover | — | 163195 | no group-hover class on the mobile arrow | yes | `*-390-row-hover.jpg` |
| job row | click | React root `click` → Next Link (`ev_25bde6d3…`) | 163195 | opens `job-boards.greenhouse.io/scaleai/jobs/<id>` in a new tab (`noopener noreferrer`, `window.opener === null`); the page stays put | yes (popup URL and opener equal on both) | — |
| job row | Tab / Shift+Tab / Enter | native | UA | tab order is header links → search → 11 rows → footer. Focus ring is the UA default `auto 1px rgb(0,95,204)`, offset 1 px | yes (after a fix, see QA) | `*-focus-row0.jpg` |
| ⌘K / search button | keydown / click | `document` keydown | 595877 (shared) | opens search: Inkeep on labs, the static stand-in in the clone, indexing the 11 jobs (`[JOBS]`, opens the posting in a new tab) | stand-in (shared). Headless labs didn't show the Inkeep modal within 1.5 s, so only the clone dialog was checked | — |
| header / mobile menu / newsletter | — | shared | labs-shared | see labs.md | yes (shared) | — |

There are no filters, sort controls, expandable rows or carousels on this page. JobsList renders a flat list with no state.

## QA
- 22 geometry and type probes per width match exactly at 1440 and 390: header, h1, intro, both table heads, dot, row cells, mono date, arrow, rows 0/1/8/last, footer, row count, hrefs, text and page height. The only probe differences are the font-family names (`inter` vs `labsInter`, same InterVariable / Geist Mono files) and the default `border-color` (`#d9d9d9` vs `#e5e7eb`) on elements that draw no border.
- The side-by-side screenshots are identical. The JPEG byte sizes of the 1440 interaction shots are equal.
- 0 console errors on both.
- Fixes during QA:
  - Focus ring. The Vahue global `a { outline: 2px solid transparent; outline-offset: 2px }` hid the focus ring on the rows. The rows now use `focus-visible:[outline:auto_1px_-webkit-focus-ring-color] [outline-offset:1px]`, which gives the same computed outline as labs.
  - Arrow nudge. It switched from `transform` to the `translate` property, so the computed values match Tailwind v4.

## Remaining gaps
- The job list is a static 2026-11-01 snapshot. Labs fetches Greenhouse on the server, so new or closed postings won't show until the content is re-captured.
- Job detail pages are Greenhouse's own site. Rows link to the live postings.
- Search is the shared static stand-in, not Inkeep.
- The shared header and footer links in the clone have the same hidden focus ring, because of the global `a` outline rule. Labs shows the UA ring there. This is in `labs-shared`, which this task doesn't touch, so it's left for the lead.
- The app root layout (`app/layout.tsx`) wraps every route in its own `<main>`, so the labs header and footer sit inside an outer `<main>` in the clone (labs: `div > header, main, footer`). Nothing renders differently, but `main a` selectors also match the chrome links in the clone. The QA scripts scope job rows by `href*=greenhouse` for this reason.
