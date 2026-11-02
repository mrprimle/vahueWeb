# /careers

Live source: https://scale.com/careers, 2026-11-02. Stack: [../stack.md](../stack.md). Scale's strings and board snapshot: `components/pages/careers/content.scale.ts`. Rendered strings: `content.ts`. Menu label: Careers.

REA, in a one-tab headless Chrome on port 9274, closed and deleted afterwards:
- `analyze_web_bundle` with sources: `ev_f9e8f559…`, 48 of 48 scripts parsed, no parse failures. It lists the three Greenhouse endpoints in `18ec6cjdps6ll.js`.
- `observe_web_execution` over 80s of real input (search, Escape, clear, dropdowns, department toggle, expand and collapse all, Apply, wheel): `ev_162832ff…`. The result exceeded REA's response budget, so the bundle was exported (751 MB), the record extracted, its coverage read per function, and the export deleted. See "Execution coverage".
- `inspect_web_event_listeners`: see the inventory.
- `capture_browser_scenario` not run: `observe_web_execution` covers the requirement. Trace tools not needed: no source maps are shipped and modules were read directly from curl'd chunks.

## Sections

Tops and heights equal to Scale at 1440 and 390, clone and filled. Page height is equal at both.

| # | Section | Module | 1440 top, height | 390 top, height |
|---|---|---|---|---|
| 0 | Hero, `pt-24!` wrapper | 540431, `animateCta: false`, default start | 39.3, 816 | 101.8, 576 |
| 1 | In The News, 3 cards | 1900, 756380, 892855 (`arrowOutline`, white) | 855.3, 927.2 | 677.8, 1032.9 |
| 2 | Our Mission, 2 columns of text | 1900, inline in the payload | 1782.5, 720 | 1710.7, 846.8 |
| 3 | Credos, 6 cards | 1900, inline | 2502.5, 1494 | 2557.5, 2349.9 |
| 4 | Benefits, 4 image cards | 1900, 15518 (`columns: 2`, `borderless`) | 3996.5, 1655.1 | 4907.4, 2783.9 |
| 5 | Open positions, job board, `#open-roles` | 1900, 442707, 165311, 242648 | 5651.6, 1895.8 | 7691.3, 1668.4 |
| 6 | University CTA, `mt-16! pb-8` wrapper | 540431 | 7611.3, 752 | 9423.7, 512 |

Layout changes by width: benefits and news go to 2 columns at `md`, credos at `sm`. The board toolbar stacks below `sm` (bar 178.7 tall, 72.9 from 640, 75 from `md`). Rows change padding at `md`, row text stacks below `sm`.

Filled, section heights by width compared with Scale: equal at 390, 639, 768, 1024, 1279, 1280, 1440, 1441, 1920. The rest is a line of wrap:

| Width | Section | Scale | Ours | Cause |
|---|---|---|---|---|
| 589, 590 | News | 1009.8 | 993.6 | Card title 1 wraps one line less, Vahue copy |
| 589, 590 | Mission | 710.3 | 729.2 | One line more, Vahue copy |
| 640 | Mission | 681.3 | 700.2 | One line more, Vahue copy |
| 640 | Credos | 1497.8 | 1478.9 | Font gap: the clone with Scale's copy has the same 1478.9 |
| 1023 | News | 994.2 | 958.2 | Font gap: the clone with Scale's copy has the same 958.2 |

Page height also differs at 768 and 1024 from the footer, a known shared issue the lead is handling.

New here: `FilterPosition.tsx` (page-level port of 442707, 165311, 242648) and `icons.ts` (paths from 473665). Everything else is a shared port. `@radix-ui/react-dropdown-menu` 2.2.1 was added: module 442707 inlines Radix DropdownMenu, the version isn't shipped, so 2.2.1 is chosen.

## Job board

Scale fetches Greenhouse in the browser on every load (`api.greenhouse.io/v1/boards/scaleai/jobs?content=true`, `/offices`, `/departments`). Here nothing calls Greenhouse: 0 requests measured.
- **Clone:** `content.scale.ts` holds a snapshot from 2026-11-02, 170 jobs that expand to 275 rows, one row per location, 15 departments, 21 locations. Only id, title, location, department and URLs are kept. Job descriptions, offices and the departments tree aren't needed by this page.
- **Filled:** 23 placeholder roles expand to 24 rows (one role has two locations, to keep the `;` split in use), across the same 15 departments, so the collapsed board has Scale's height. 6 locations.

`FilterPosition` still starts in its loading state and resolves on the first effect, as the fetch would. The fetch error branch is dead without a fetch and isn't ported. `specificPositions`, `settingCareers` and the `CFO Team`, `EPD`, `GTM` label map aren't ported either, since this page's payload and data don't reach them.

### Scale quirks kept on purpose
- **The sticky bar doesn't stick.** It has `sticky top-0 z-10`, but the page wrapper is `relative overflow-x-hidden`, so it scrolls away: `barTop` -112, -432, -752 per 400 wheel on both. Same at 390.
- **Trigger labels never change.** The payload passes `customSelectedDepartments: []` and `customSelectedLocations: []`, and `[]` stays truthy, so "Departments (2)" and "in 2 depts" never appear. The selection still filters, and the trigger turns dark.
- **"Clear filters" doesn't reset the dropdowns.** The dropdown's own state only syncs when its `value` prop changes reference, which it never does, so triggers stay dark and ticked after clearing. Both sides measured `[true, true]`.
- **Departments don't auto-expand on filter**, for the same reason as the labels.
- **Filtering closes the menu** (Radix CheckboxItem default) and every change scrolls the board to the top of the viewport, including each keystroke.
- **Collapsed roles still take Tab focus:** the rows are only clipped by `grid-rows-[0fr]`.

## Interaction inventory

No page-specific scroll animation: the only motion from scroll is the two FullBleedMediaSection clips. Section roots have no listeners; board handlers are React delegated.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Section roots: news, mission, credos, benefits | none | None: `ev_9fa754…`, `ev_8bd234…`, `ev_a07725…`, `ev_db647d…`; `#open-roles` `ev_a8dff8…`; `.FullBleedMediaSection` `ev_e2bae1…` | | | |
| Hero and university clips | scroll | None direct, ScrollTrigger on Lenis | 540431, 656598 | Hero start clip, then 0; university 5% to 0, image scale 1.25 to 1 | 8 and 9 wheel stops at 1440 equal in every row. 390: `inset(4.98489%)`, `matrix(1.2492…)` at y 8582, equal at equal y |
| Hero CTA | click | React, anchor capture | 892855, 474053 | `smoothScrollTargetId: open-roles` | Lands 5651 at 1440, 7692 at 390, both; URL stays `/careers#open-roles` |
| News CTA | hover | Link: HubSpot `mousedown` capture and React `click` `ev_72e364…`, HubSpot not built | 892855 | `arrowOutline`, 600ms | -100, -61.2, -31.5, -16.1, -6.6, -1.1, 0 vs -100, -61.2, -34.8, -16.1, -6.6, -1.5, 0 (sample phase) |
| Search input | type | React. Direct: `invalid` and `select` only `ev_2d6c34…` (React root, FullStory) | 442707 | Filters from 3 characters, title contains, case-insensitive. Under 3: summary shows, no filtering | "en": SHOWING 275 ROLES at Scale, all rows. "eng": 129 roles in 5 departments, `matching "ENG"`; ours with the snapshot equal |
| Search input | Escape | React `onKeyDown` | 442707 | Clears | Bar 102.6 back to 75, both |
| Clear search | click | HubSpot and React `click` `ev_42f760…` | 442707 | Shows only with text | Equal |
| Search, filters | change | `scrollIntoView({behavior: 'smooth'})` on the board root | 442707 | Native smooth, not Lenis | 5575, 5909, 5983, 5999, 6000 vs 5575, 5909, 5983, 6000, 6000 |
| No results | | | 442707 | Two messages and two clear links | Heights 498.6 equal, strings equal |
| Trigger | pointer, keys | HubSpot `mousedown` capture `ev_782630…`, React for the rest | Radix DropdownMenu | Modal: `body` `pointer-events: none`, `data-scroll-locked`, `overflow: hidden`. `sideOffset` 6, `align: start`, `max-h-[60vh]` | Clone: rect 292, -42, 288, 540, side `top`, 15 items, both. Filled: same at y -41. Hover colours equal |
| Trigger | Enter, ArrowDown, Escape | React | Radix | Focus moves to first item, Escape returns focus to the trigger | Same sequence |
| Menu | open | `rovingFocusGroup.onEntryFocus`, `animationstart`, `animationcancel`, `animationend`, `focusScope.autoFocusOnMount` `ev_8d5203…` | Radix, `2uan9zgpesrbo.js` | | Same library |
| Menu item | hover, click | React `click` `ev_e5a83a…` | Radix, 442707 | `#f2f2f2`; closes on select; tick and dark trigger | Equal |
| Department row | click, Enter, Space | React `click`, HubSpot `mousedown` `ev_6eaea2…`. Grid: none `ev_4158…` | 442707 | `grid-rows` 0fr to 1fr, 300ms `cubic-bezier(0,0,.2,1)`; chevron rotates 180; `transitionend` then Lenis `resize` and ScrollTrigger refresh after 50ms | Open at 50ms steps: 37.5, 78.1, 95.7, 106.5, 112.2, 114 vs 37.5, 70.2, 95.7, 106.5, 112.2, 114. Close: 76.5, 43.8, 18.3, 7.5, 1.8, 0 vs 76.5, 43.7, 23.3, 7.5, 1.8, 0 (sample phase) |
| Department row | hover | CSS | 442707 | `scale-gray-95`, `transition-colors` | Equal |
| Expand all, Collapse all | click | HubSpot and React `click` `ev_b316ee…` | 442707 | Label flips when all open, counter "N of M expanded", refresh after 340ms + 50ms. Hidden with one department | Label and counter equal; expanded 17330.8 tall with Scale's data on both. No scroll movement when the button is on screen |
| Sticky bar | scroll | None `ev_582076…` | 442707 | `bg-white/90 backdrop-blur-sm`, doesn't stick (above) | `barTop` equal in all 12 rows within 1px |
| Role row | hover | Link: HubSpot and React `click` `ev_c808fb…` | 442707 | `scale-gray-90`, 150ms | .455, .92, .992, 1 vs .46, .92, .992, 1 |
| Role row | click | Next `Link` | 442707 | `/careers/<id>` on Scale, see "Decisions" | |
| Apply | click | HubSpot and React `click` `ev_d6d3a9…` | 442707 | `preventDefault`, `window.open(url, '_blank', 'noopener,noreferrer')` | Same 3 arguments, no navigation |
| Deep link | `?department=Engineering` | `popstate`, `location.search` | 161843 | Preselects filter, no expansion | SHOWING 66 ROLES, one row, both |
| Tab order | Tab | Native | 442707 | Search, triggers, Expand all, rows, Apply | Same 7 stops, same outlines |
| Touch at 390 | tap | Same | Radix, 442707 | Row, trigger, item | Menu 24, 358 wide, 506 tall, side `bottom`, closes on select, board to top: equal |

`html` (`ev_b544a7…`): `scroll` from GSAP's cache bump in `1h0nvyhf5gbrf.js`, OneTrust `click` and `keydown`, not built. `body` (`ev_65c562…`): ScrollTrigger's `touchstart`. Window listeners can't be selected by REA's CSS match, so they weren't read on this page; the Lenis ones are in `_chrome.md`.

### Later listeners (private Chrome, menu open, "en" in the search)
Menu item `ev_e5a83a…`: React `click` only. Clear search `ev_42f760…`, Expand all `ev_b316ee…`, Apply `ev_d6d3a9…`, mission link `ev_c7ec99…`: HubSpot `mousedown` capture, not built, and React `click`.

### Execution coverage (`ev_162832ff…`)
Read per function in `2hf-m2wen5p-4.js` (147 of 177 functions ran) over the driven window: search setter 9 calls, its change handler 7, Escape handler 9, clear button 1; dropdown toggle 3, department setter 2, location setter 1, `clearAllFilters` 1; department toggle 2, expand 1, collapse 1, grid `transitionend` 202; dropdown refresh path 8, list refresh 4; `window.open` handler 1. The `scrollIntoView` wrappers ran 2, 1, 9 and 1 times. In `18ec6cjdps6ll.js` 3 functions ran; I didn't attribute them.

An earlier window (`ev_f0842b…`) captured nothing useful: OneTrust swallowed the first click, and one before it (`ev_51ac32…`) ended on navigation. Measuring sessions hide OneTrust. They also serve the Greenhouse JSON fetched that day: one request took 22s, and Scale's board then missed a 25s wait in a probe, though I didn't establish that Greenhouse was the cause.

## Visual check
Sheets in the scratchpad's `new-qa/careers/`: `clone-1440-*`, `clone-390-*`, `filled-1440-*`, `filled-390-*` every 50% viewport from scroll 0 to the end through real wheel input, and `clone-states-*`, `filled-states-*` for board, dept-open, expand-all, filters, menu, one-dept, row-hover, search-2, search-3, search-none, sticky-mid, sticky-up. All opened. By eye: no difference in layout, corners, header coverage or state between Scale and ours, apart from the copy, the logo, the footer and menu images, and these:
- "Apply →" has a longer arrow: DM Mono stands in for Aeonik Mono (stack.md).
- `sticky-up` and `sticky-mid` show other rows in the filled sheets, as the board is shorter.

## Copy
`content.ts`: 87 strings. 71 verbatim after the brand swap, 13 light, 3 rewritten. That's 82% verbatim. The rewritten ones are the third press title and the two mission lines naming what Vahue runs in place of RLHF, annotation and LLM training data. Scale's "decisions" became "workflows" per the swap dictionary, which also keeps the wrap. "contributors" became "their people": the dictionary's words moved the row height at 1280. No military, government, robotics or autonomy words remain; "public sectors" and "government decisions" were swapped. Public Sector became Regulated Industries, matching the menu. University became Early Careers and "Join Graduate Engineer Careers".

## Placeholders
`// PLACEHOLDER` in `content.ts`, 32 lines:
- 23 roles, with locations.
- 1 link constant: rows and Apply go to `/demo`.
- 3 press cards: publication, title, link to `/blog`.
- 4 benefit cards: Vahue's actual benefits aren't confirmed, so the claims are Scale's.
- 1 university CTA headline.

Photos are Scale's office photos with no brand on them, kept for now.

## Decisions for Mike
- `/careers/<id>` and `/careers/university` don't exist here. In the clone, rows link to `/careers/<id>` and 404, and the CTA to `/careers/university` too. In the filled page rows and Apply go to `/demo`, and the CTA to `#open-roles`.
- Keep or fix Scale's board quirks above, especially "sticky" not sticking and Clear filters leaving the triggers dark.

## Gaps
- Lenis `resize` and ScrollTrigger refresh after toggles are ported from source and not sampled on their own. Heights after toggling are equal.
- Only the driver's sequence of filters was compared, not every combination.
