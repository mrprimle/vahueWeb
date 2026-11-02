# /labs/jobs (labs.scale.com/jobs)

Live source: https://labs.scale.com/jobs on 2026-11-02, 1440x900 and 390x844, plus 640, 767, 768, 1024, 1280, 1450 and 1920. Stack: [../stack.md](../stack.md), section labs.scale.com. Chrome: `components/site/labs/`, mounted by `app/labs/layout.tsx`; see [labs.md](labs.md) for its interactions. Scale's strings: `components/pages/labs-jobs/content.scale.ts`. Rendered: `content.ts` beside it. Menu label: Research Careers.

## Stack on this route
Same build as the labs home (`analyze_web_bundle` `ev_0cec3689a3da3f23…`, 23 of 23 scripts parsed, Next.js and React fingerprints). The page is server-rendered: everything in `<main>` is in the HTML. No GSAP, no Lenis (route is not home, measured no `lenis` class), no framer-motion reveal (`main > div` has no inline style), no canvas, no WebGPU, no animation at all except CSS colour on hover. No filters, search box, sort, pagination or load more on Scale's page, so none here. Fonts InterVariable and Geist Mono on Scale, Inter and Geist Mono from Google here. `inspect_web_page` `ev_6b7542d1f4859bf9…`: 475 DOM nodes, no workers.

## Sections and heights
One section between chrome. Scale and ours are equal, on the clone and on the filled page.

| Part | 1440 | 390 |
|---|---|---|
| Header | 0, 57 tall | 0, 57 tall |
| Main | 57, 718 tall, content x 60 to 1380 | 57, 1100 tall, content x 24 to 366 |
| h1, blurb | 113 (18 tall), 139 (36 tall, 576 wide) | 113, 139 (36 tall, 342 wide) |
| Column header | 215, 31 tall | 215, 31 tall |
| Rows | 11 at 43 tall, from 246 | 11 at 99, 81 or 63 tall, from 246 |
| Footer | 775, 175 tall | 1157, 283 tall |
| Document | 950 (scroll range 50) | 1440 (scroll range 596) |

| Width | What changes | Scale vs ours, document |
|---|---|---|
| 640 and 767 | Mobile rows, footer in a row | 1170, equal |
| 768 (`md`) | Desktop rows and header; columns 100, 274, 274, 24; long cells wrap, rows 61 or 43 | 1076, equal |
| 1024 (`lg`) | Side padding 40; one row wraps | 968, equal |
| 1280 | Columns 100, 514, 514, 24 | 950, equal |
| 1450, 1920 | Content capped at 1400 | 950, first row x 65 and 300, equal |

`main` itself carries `mx-auto max-w-[1400px] px-6 lg:px-10 py-14` on Scale. `LabsChrome` owns a plain `<main>` here, so those classes are on a `<div>` inside it. Only `main`'s own box differs (x 20, 1400 wide vs x 0, 1440 wide at 1440); its content rect is identical. Colours compute as `lab()` here and `rgb()` on Scale from the Tailwind patch version; `lab(48.496 0 0)` is `rgb(115,115,115)`.

## Interaction inventory
Listeners with `inspect_web_event_listeners`: `html` `ev_eab30094…`, `body` `ev_a986d405…`, `header` `ev_e7b425fc…`, `main` `ev_7255cc9d…`, `h1` `ev_e92381ad…`, arrow svg `ev_7ae3a3cc…` (all 0). Desktop row `ev_c26046fd…`, mobile row `ev_b1a47785…`, footer button `ev_1497e97b…`: one click listener each, at `3k3q0u73winx8.js:0:45840`, which is React's empty `function tO(){}`, so handlers are React delegated. Execution during hover, wheel and Tab: `observe_web_execution` `ev_c4598d9c…`, 7s, one-tab headless Chrome on a private port driven through CDP. Nothing on the page reacts to pointer position.

| Element | Input | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|
| Row, both widths | hover | CSS `hover:bg-neutral-50 transition-colors`, `html.loaded *` | background over .2s after the .1s `loaded` class | Alpha .13, .36 to .5, .77, .95 to .99, 1 at the same 47ms steps; leave .87, .5, .13 to .23, 0; end `rgb(250,250,250)`. Same curve, sample phase differs |
| Desktop arrow | hover on row | CSS `group-hover:translate-y-0.5` | translate `0px 2px`, instant: `html.loaded *` narrows transitions to colours, as on the home job rows | `0px 2px` at the first sample after enter, `none` at the first after leave, equal |
| Mobile arrow | none | Scale's class has no group-hover | | Same class string |
| Row | click | Next `Link`, `linkClicked` returns early when target isn't `_self` (`02jo0neetpcov.js`) | `target=_blank rel="noopener noreferrer"` | Same attributes. Ours opens `/careers#open-roles` in a new tab, checked by click. Scale's opens Greenhouse; attribute read, not clicked (see Not run) |
| Row | Tab | native focus ring | `auto rgb(0,95,204)` | Tab order logo, 3 nav items, search, rows; same outline and order at 1440 |
| Page | wheel | native scroll | no Lenis on this route | 0 to 50 at 1440 with real wheel input, equal; header stays at 0 (`sticky`) |
| Header | scroll | CSS `bg-white/70 backdrop-blur-xl` | | Blurred rows under the header look the same at 390 |
| Burger | click, below 768 | labs chrome | Header 168 tall | 168, equal |
| Search | Ctrl+K | labs chrome | Opens, input focused | Same layout by eye, nothing typed |
| Newsletter | footer button | labs chrome | Dialog | Opens and closes with Esc. Scale's form body didn't load because my QA run blocks HubSpot, so its shell shows a spinner; rects were checked in labs.md. Nothing typed or submitted |

## Deviations from Scale
- **Row destination:** Scale links each row to its Greenhouse posting. No job pages or applicant system here, so filled rows open `/careers#open-roles`, still in a new tab.
- **Heading:** `[Jobs]` on Scale, `[Research Careers]` here, following the menu. Title likewise. The `/labs` slice still reads `[Jobs]`, as labs.md decided; its first six roles match this page's first six rows.
- **`og:*` and canonical tags:** Scale has them, with an `/og` image route. Not added, same as `/labs` and `/labs/papers`.
- **Search:** the five rows that aren't on `/labs` were added to `components/site/labs/searchIndex.ts`.

## Copy mapping
Keep rule, counted path by path against `content.scale.ts` without URLs: 40 strings (meta 2, heading, blurb, 3 columns, 33 row cells). 24 verbatim after Scale to Vahue (description, blurb, 3 columns, 8 titles, 11 dates), 5 light, 11 rewritten. The rewritten ones are all location placeholders; without them, 24 of 29 stay, 83%.

| Scale | Here | Why |
|---|---|---|
| `[Jobs]`, `Jobs - Scale Labs…` | `[Research Careers]`, `Research Careers - Vahue Labs…` | Menu label |
| …Scientist, Post-Training | …Scientist, Agent Baselines | Same as `/labs`; Vahue doesn't train models |
| …Scientist, Frontier Risk Evaluations | …Scientist, Workflow Risk Evaluations | Same as `/labs`; no frontier-risk topic |
| …Scientist, Safety Post Training | …Scientist, Safety and Oversight | Model-training term; matches the labs category Safety & Oversight |

## Placeholders
15 `// PLACEHOLDER` lines in `content.ts`: all 11 rows (Scale's 11 kept, no invented extras), the shared date, the two `City, Country` location strings, the row link.

## Visual check
Sheets outside the repo, scratchpad `new-qa/labs-jobs/`, folders `clone` and `filled`: first paint, every 50% viewport, by real wheel at 1440 (2 stages, the scroll range is 50) and by scripted scroll at 390 (3 stages, mobile emulation takes no wheel), row hover, focus, 768 and 1024, plus burger, newsletter and search on filled. All opened. By eye the filled page differs only by copy, logo and the Scale spinner noted above. At 390 the blurb breaks a word earlier ("Join us in / advancing"), same 2 lines.

An early metric pass showed 768 and 640 differing by 36 and 18px. Cause: Scale's InterVariable hadn't finished loading when measured; rerun after `document.fonts` settled, those are equal.

## Not run, REA tools
- `capture_browser_scenario` failed twice with `cleanup_failed` (`browser_transport`, REA's 1000ms timeout), once in launch mode and once in connect mode. Real input went through Playwright over CDP and headless launches instead.
- `compare_web_screenshots` and `compare_web_captures` need complete base64 or capture payloads pasted inline; not used. Compared with the sheets and rect metrics.
- `export_web_scripts`, `trace_web_module_imports`, `trace_web_source_location`: not used. Turbopack ids aren't ES imports and no source maps ship; chunks were read directly.
- A Scale row was not clicked, to avoid loading Greenhouse. Reduced motion not sampled: nothing on the page animates beyond CSS colour, and Scale has no rule for it here. No touch hover test at 390.
