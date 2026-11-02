# /blog and /blog/category/<slug>

Live source: https://scale.com/blog and its 17 category routes, read 2026-11-02 at 1440x900 and 390x844, geometry also at 640, 768, 1024, 1280, 1920. Menu label: Blog. QA sheets: scratchpad `new-qa/blog/` (`clone-*`, `fill-*`, state sheets).

## Stack
Next 16.4.2 App Router. Static snapshot: no CMS and no Algolia at runtime. Category routes are `generateStaticParams` with `dynamicParams = false`. Shared ports, see [../stack.md](../stack.md): 808358 (`BlogPreview`, with `captionFullBleed`, `fullWidth`, `pageThemeOverride: light`), 280239 and 189756, 317967 (`BaseCard`), 947153, 243385, 995634. Page modules on Scale, chunk `126gr-esjog6p.js` (the same code also ships as `3dnh8g0pvq60q.js`): 507457 (`BlogFilterBar`, tag pills, More panel, phone rail, search modal), 813045 (list filter and load more), 603626 (`PostList`), 473665 (react-icons `y_`, `MG`, `pA`, drawn inline).

Files: `app/blog/page.tsx`, `app/blog/category/[slug]/page.tsx`, `app/blog/[slug]/page.tsx` (stub), `components/pages/blog/` (`BlogPage.tsx`, `BlogFilterBar.tsx`, `BlogPostList.tsx`, `types.ts`, `content.scale.ts`, `content.ts`), `public/blog/`.

Route facts from the RSC payload: the page sets theme light, renders `BlogPreview` from the first 5 posts on `/blog` only with `bentoCount: 5`, and category routes get the same hero with `activeCategory` and no bento. Scale's Header gets a `border` prop that module 511174 never reads.

## REA evidence
Private headless Chrome on 9283, closed and deleted after use. Exports of 770 to 880 MB were read by module and deleted.

| Tool | Scope | Evidence |
|---|---|---|
| `analyze_web_bundle`, script sources on | 51 of 51 scripts parsed, no failures. Next and React fingerprints, Algolia `/1/indexes/*/queries` | `ev_b714ddbfea3b3e30…` |
| `inspect_web_event_listeners` | `html` | `ev_bd0ce82375645b76…`: passive `scroll` (`1h0nvyhf5gbrf.js`), OneTrust `keydown`, `click` |
| same | `body` | `ev_98ab04d13047e3ad…`: passive `touchstart` |
| same | filter section root | `ev_e039a61e13dc1ae1…`: none |
| same | `section.BlogPreview` | `ev_54fc04f9ce6f49e0…`: none |
| same | `.BlogPreview__slot .BaseCard` | `ev_d99bce5f3b81c352…`: none |
| same | `a.BlogPreviewTile` | `ev_277beac6a6848fe6…`: HubSpot `mousedown`, React root `click` |
| same | list row | `ev_d4b7488a4e12d2c3…`: same two |
| same | desktop pill | `ev_331bd49423fe0655…`: same two |
| same | rail pill | `ev_b2076bb2fa4ee428…`: same two |
| same | search button | `ev_d40e8bd2855f91b3…`: same two |
| same | More button | `ev_5c39cdc3b61d217c…`: same two |
| same | open panel link | `ev_92f738b8b9bc4f93…`: same two |
| same | Load more | `ev_aa55a9f4c3d03e51…`: same two |
| same | modal root | `ev_242c32aa94b1fe34…`: none (React delegated `onMouseDown`) |
| same | modal input | `ev_e54fce7b8376efa1…`: React `invalid`, FullStory `select` |
| same | modal result link | `ev_3b44a45ff3f0ddd9…`: HubSpot `mousedown`, React root `click` |
| `observe_web_execution`, 25 s: wheel, pill hover, More, search, keys, typing, ⌘K, tile hover | `ev_c152e57b49430445…` | Calls: 507457 (757), 808358 (229), 947153 (84), 892855 (44), 681201, 210104, 995634, 243385, 317967, 280239 |
| same, 13 s: wheel through the bento, row hover, Load more, 390 rail, sheet open and Cancel | `ev_f4cea1a07b0fa9b5…` | Calls: 808358 (723), 947153 (780), 189756 (342), 507457 (164), 317967 (97), 280239 (88), 603626 (21), 813045 (4) |

The first `observe` window, `ev_b28127962b38b15c…`, is wheel only: OneTrust's filter swallowed the pointer. `ev_5d4375daadc2e4db…` is empty, the tab had navigated away. Both are discarded. Each observe response exceeded the MCP budget, so the record was exported and read by module. `capture_browser_scenario` not used: the windows ran with real Playwright input over CDP.

## Sections
1. Hero: mono overtitle, `header2`, `body1`. 320.8 tall at 1440, 236 at 390.
2. Filter bar: 72 at 1440, 52 at 390. Desktop: All, the first 5 tags, More with the remaining 14, search button. Phone: All plus all 19 tags in a rail, search icon.
3. Bento: `BlogPreview` with 5 tiles, on `/blog` only. 777 at 1440, 1264 at 390 (first 4 tiles, as on Scale).
4. List: "More Posts" label on `/blog` only, 10 rows, Load more adds 10. 1357.6 at 1440, 2220 at 390.

## Interaction inventory

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Pill | hover | React root, CSS | 507457 | `transition-colors` 150ms, `#f2f2f2` to `#eaeaea` | Enter 242, 238, 235, 234 vs 242, 241, 235, 234 (sample phase); leave 234, 235, 241, 242 equal |
| Pill | click | React root, `ev_331bd494…` | 507457 | Client navigation to the category | Reaches the route, both |
| More | click | React, `ev_5c39cdc3…` | 507457 | Toggles panel, chevron `rotate` 0 to 180, 150ms | Panel 208 x 508.5, 14 items 35.6 each, same shadow, equal. Chevron end state and duration equal |
| More panel | mousedown outside | `document.addEventListener` | 507457 | Closes | 0 open, both |
| More panel item | hover | CSS | 507457 | Background and text 150ms | .176, .835, .97, 1 equal at matched samples |
| More panel item | click | React | 507457 | Closes and navigates | `/blog/category/policy`, both |
| More, active in panel | route | Props | 507457 | Button shows the active name in black, panel row gets ✓ on grey | Equal |
| Search button | hover | CSS | 507457 | Border and text 150ms | 199, 179, 105, 90, 87 vs 199, 179, 105, 91, 87 |
| Search modal | click, ⌘K, Ctrl+K | `window` `keydown`, 757 calls in `ev_c152e57b…` | 507457 | Toggles; portal to `body`; focus after 50ms; query reset; Lenis stopped | Input focused, query empty, wheel moves 0 while open, equal |
| Modal card | open | None, no animation | 507457 | 672 wide from `md`, `md:pt-[12vh]` | Card 384, 195.7, 672 x 616.6 equal |
| Modal | Escape, Esc button | `window` `keydown`, React | 507457 | Closes, Lenis starts | Scroll after close 158, both |
| Modal | backdrop click | React `onMouseDown`, `ev_242c32aa…` | 507457 | Scale's check is `target === currentTarget`, but the overlay child covers the root, so it never closes. Kept | Stays open, both |
| Modal rows | ArrowUp, ArrowDown, hover | `window` `keydown`, React | 507457 | Clamped, `scrollIntoView` nearest | Index 0, 1, 2, 1, 0, 0, 7 and list scroll 66, equal |
| Modal | Enter | `window` `keydown` | 507457 | Closes and pushes `/blog/<slug>` | Ours reached the post. Scale was still on `/blog` at the 2.5s sample; its source pushes the same route |
| Modal input | typing | React `onChange` | 507457 | 200ms debounce, 8 hits, highlighted `mark`, clear button | Scale queries Algolia, ours filters locally. Label, 8 rows, `mark`, clear equal. Hit order differs, see gaps |
| Modal input | no match | Same | 507457 | "No results for “x”" | 111.6 tall, same text |
| Phone sheet | tap search, Cancel | React | 507457 | Bottom sheet with grabber, `max-h-[90svh]`, radius 16 on top | Card 0, 242.7, 390 x 601.3 equal; closes, both |
| Rail | touch scroll | Native | 507457 | `overflow-x-auto`, hidden scrollbar | Scrolls to 300, both |
| Rail | route | `useEffect` on `activeCategory` | 507457 | Active pill `scrollIntoView` center, smooth | Data centred at 1405 vs 1339 clone, 1315 filled: pill widths differ. Same frame by eye |
| Rail pill | tap | React root, `ev_b2076bb2…` | 507457 | Client navigation | `/blog/category/global`, both |
| Tile image | scroll | ScrollTrigger scrub, `ev_f4cea1a0…` | 808358 | 1.08 to 1, `top bottom` to `center center` | 9 wheel stops, every tile: values equal as strings |
| Tile entrance | reveal | IntersectionObserver, threshold .12 | 808358, 317967 | Opacity, scale, text from 947153 | 9 stops equal |
| Tile image | hover | CSS | 808358 | `scale` 1 to 1.05, 1000ms `ease-out`, over the image only: the title block is a sibling of the hover group, so pointing at it does nothing. Same on Scale | Enter 1, 1.017, 1.028, 1.035, 1.040, 1.044, 1.047, 1.049, 1.05 equal. Leave 1.033, 1.022, 1.015 vs 1.033, 1.022, 1.016. Over title: none, both |
| List row | hover | CSS | 603626 | Row background and title colour 150ms | .176, .835, .97, 1 equal; title to `#575757` |
| Load more | hover, click | React, 4 calls in `ev_f4cea1a0…` | 813045 | Adds 10, hidden at the end, scroll kept | Scale 10, 20, 30, 40. Filled 10, 19, then gone |
| `?q=` | URL | `useSearchParams` | 813045 | Keeps the bento, hides "More Posts", shows "N results", filters title and category | 27 results on Scale. Filled 8. "No results found" when empty, both |
| Focus | Tab | Native | 507457, 603626 | Pills `outline: none`, rows and button default ring | Equal |

No drag, pointer-move, tabs or carousel on this page. Header, footer and Lenis behave as in `_chrome.md`.

## Layout at widths, filled page vs Scale
Section tops and heights equal at 390, 768, 1024, 1280, 1440 and 1920, with row heights equal too. Page height 3465 at 1440 and 5234 at 390. At 640 the list is 38.5 taller: one row wraps a line more, and the word lengths that fix it there break 768. Pills stay on the same number of lines at every width.

Clone with Scale's copy: equal at 1440. At 390 ours was 38.5 shorter: "Building Trust at the Frontier" fits on one line in Aeonik and takes two in Aeonik Pro. The clone was not measured at the other widths.

## Gaps and deviations
- **Search source:** Scale's modal queries Algolia across all posts and ranks by relevance, and shows the empty state while the request is pending. Ours matches title or category over the static list, in date order, with no pending state.
- **Post bodies:** `/blog/<slug>` is a stub with the title and a link back, so rows and tiles do not 404. Scale's post template is not cloned.
- **Fonts:** DM Mono for Aeonik Mono makes pills up to 5px narrower. See stack.md.
- **OneTrust, HubSpot, FullStory, analytics:** not built, as in `_chrome.md`.
- **First paint:** on Scale the filter bar is streamed and the list is client-only (`py-16` fallback in the HTML). Ours uses the same Suspense fallbacks. In `next dev` both are in the streamed HTML, so no fallback shows. A production prerender was not checked, page agents do not run builds: `useSearchParams` should leave the list client-only there, as on Scale.

## Copy mapping
Keep rule. Verbatim means equal after Scale to Vahue. 69 strings: 41 verbatim, 16 light, 12 changed.
- Page strings (meta, hero, UI labels): 26 of 26 verbatim.
- Tag labels: 12 of 19 verbatim. Robotics, Global, Defense, Autonomous Vehicle and Public Sector read Operations, Services, Regulated, Voice Agents and Scale-ups. The labels are short so the pills keep Scale's line count. Excluding post titles the page is 38 of 45 verbatim, 84%.
- Post titles, 24: 3 verbatim, 16 light, 5 rewritten. Each keeps the template of Scale's post in that slot, with a word count within 1 or 2 ("To Steer the AI Frontier, Washington Must…" reads "To Steer the AI Workforce, Operations Must…"). Military, government, sovereign and drug-discovery topics are gone.

Routes keep Scale's slugs, as the site does elsewhere, so `/blog/category/defense` is labelled Regulated. Scale's CMS lists Company and Research twice in `tags`, which shows as duplicates in its More panel. Those two slots became Insurance and Revenue Teams, on two extra routes: `/blog/category/insurance`, `/blog/category/revenue-teams`. Every tag route lists at least one post.

## Placeholders
`// PLACEHOLDER` on 24 lines in `content.ts`: all 24 posts (title, category, date, slug). Scale has 164 posts; the behaviour is unchanged, so category pages with fewer than 11 posts show no Load more, as Scale's do. Dates reuse the month pattern of Scale's slots.

Images: tiles 1 and 5 keep Scale's abstract art, no brand in them. Tile 2 (molecules), 3 (Doha photo) and 4 (UAE city) became neutral product visuals of the same size, cropped from `public/home/post-3`, `post-4`, `post-2`.
