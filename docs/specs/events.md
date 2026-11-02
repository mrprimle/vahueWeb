# /events

Live source: https://scale.com/events, 2026-11-02. Menu label here: Events (Resources column). Page: `app/events/page.tsx`, `components/pages/events/`. Scale's strings: `content.scale.ts`. Rendered strings: `content.ts`. Snapshot only: no CMS call at runtime.

## Stack
Same as [../stack.md](../stack.md). REA `analyze_web_bundle` `ev_6ca42bec…` with script sources: 50 of 50 scripts parsed, Next.js and React fingerprints, no WebMCP, source maps not requested (none are shipped). `inspect_web_page` `ev_379cbfc7…`: 22 resources in scope, no workers.

The page is server rendered on Scale. Its RSC payload has two page-level client components: `PastEventsList` and `LightPageTheme`, both in `0saoa1o-3163r.js` (sha256 `116443343d7d32ef`). No GSAP, Keen or Embla on this page's own sections; Lenis and the header are the shared ones. The 75 past events ship in the RSC payload, so the list is client-side slicing, with no fetch.

Page-only ports: `PastEventsList.tsx` (module 187078), `EventLink.tsx` (its `l`), `LightPageTheme.tsx` (889229). Icon: `lucide-react` `CalendarDays`, the same paths. Nothing added to `components/site/shared`, so no new row in stack.md. Scale's CSS token `--token-4aOJf-4uXv6l` is 1.125rem, written as `text-[1.125rem]`. `.light-page` sets colour and background, written as utilities on the root; its `:where(...)` overrides match nothing on this page.

`cardImage` exists on every event in the payload but no component renders it, so the page has no images and `public/events/` does not exist.

## Sections
Heights in px, Scale vs ours equal at every width below for the filled page, except where listed. Measured after hydration with the announcement bar in.

| # | Section | Module | 1920 | 1440 | 1280 | 1024 | 900 | 768 | 640 | 390 | 320 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Intro: title, body | RSC | 406.7 | 406.7 | 406.7 | 406.7 | 406.7 | 406.7 | 362.8 | 389.8 | 389.8 |
| 2 | `#upcoming`: 13 cards | RSC | 3212 | 3212 | 3212 | 3310.7 | 4476 | 4476 | 7228 | 7303.8 | 8072.3 |
| 3 | `#past`: heading, 6 cards, button | 187078 | 1247.5 | 1247.5 | 1247.5 | 1351.4 | 1656.4 | 1708.4 | 2894.7 | 3058.9 | 3455.6 |

Grid: 1 column below `md`, 2 from `md`, 3 from `lg`. Upcoming card `min-h` 540, 620 from `md`; past card `min-h` 420. No horizontal overflow at any width.

Height differences, all text wrap or shared chrome:
- 1100 (between breakpoints, filled only): `#upcoming` 3230.5 vs 3234.9, `#past` 1325.5 vs 1299.5. One line of placeholder copy. Fixing it broke 1024, which matters more.
- 768: first upcoming description is 3 lines vs 4; the card stays 620.
- 320: some single cards differ by one line inside equal section totals.
- Footer: 12px shorter at 390, 28 at 768, 21 at 1024, 52 at 320. Known shared item for the lead's final pass.
- Scale's own load is slow: a sample can catch it before the bar or Aeonik arrives (1024 once read 3343.1, with the button 166.1 wide on the fallback font). QA waits for the bar.

## Interaction inventory
Same scripts on both sites, real wheel, pointer, key and touch input, headless at 1440x900 and 390x844.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Upcoming card | hover enter | None on the card but HubSpot `mousedown` `ev_2d85af9e…`. CSS only | RSC | `bg-[#f2f2f2]` to `#ececec`, 200ms, `cubic-bezier(.4,0,.2,1)` | 242, 239, 237, 236 at 50ms steps, equal |
| Upcoming card | hover leave, re-enter | Same | RSC | CSS reverses from the live value | 236, 239, 241, 242 equal; re-enter 237, 236 equal |
| Upcoming CTA `span` | card hover (`group-hover`) | None `ev_7ffee48a…` | RSC | `black/.04` to `black/.08`, 200ms | .0407, .0583, .0745, .0793, .08 vs .0407, .0583, .0745, .0793, .08 |
| Past card and CTA | hover | HubSpot only `ev_703ce06f…` | 187078 | Same values | 242, 239, 237, 236 and .0407 to .08, equal |
| Show more button | hover enter, leave | HubSpot `mousedown`, React root `click` in `42ixmvih7808g.js` `ev_8d6e9f76…` | 187078 | `black/.04` to `black/.08`, 200ms | .0407, .0583, .0745, .0793 and back, equal |
| Show more button | click | Coverage `ev_0bfbe956…`: `onClick` 1, `n` and `l` 12 (the 12 cards rendered) | 187078 | `useState(6)`, `+6` per click, no animation; button unmounts when `count >= length` | Clone: 12, 18, … 72, 75, then gone, equal. Filled: 11 then gone (Scale 12, button stays), see Deviations |
| Show more button | Enter, Space | Native button | 187078 | Same as click | Scale 12 both, ours 11 both. Focus stays on the button on Scale and falls to `body` on ours, as the button unmounts: the same code path on Scale's last click, not driven there |
| Show more button | touch tap at 390 | Same | 187078 | Same | 12 vs 11, width stays 390 |
| Cards, button | Tab, focus | Native | | `outline: auto 1px`; card offset 1px, button 0 | Equal. Order: 13 upcoming, 6 past, button, footer |
| Upcoming card | click | `EventLink` | 187078 `l`, RSC | http(s): new tab. Other: next/link | Scale opens `/events/scale-at-mwc-doha-2026` or the conference site; ours opens the site route |
| Section roots | none | None: intro `ev_dc56aecb…`, `#upcoming` `ev_d0995667…`, `#past` `ev_aa0bb35c…` | RSC | No reveal, no scroll motion, no pointer motion | Frames equal |
| Page roots | scroll, touch | `html`: OneTrust keydown and click `ev_b3959112…`. `body`: touchstart passive `ev_f85eb4d9…` | shared | OneTrust is not built; touchstart is shared | Unchanged |
| Page unmount | route change | React effect | 889229 | `resetPageTheme()` | Ported, not sampled. `RouteEffects` also resets |
| Smooth scroll, header reveal | wheel | Lenis, shared | 2d7ykwtxp, 511174 | Shared | Same frames, header hides on the same stops |

`window` listeners are not reachable: `inspect_web_event_listeners` takes a CSS selector.

REA execution windows, one-tab headless Chrome on private port 9291, closed and deleted afterwards. `observe_web_execution` overran the MCP response budget all three times but retained its record; I exported the bundle once (826 MB), kept the one record and deleted the export. `ev_4cc7f18e…` and `ev_a0e3f412…`: the click never reached the button (OneTrust filter, then the fixed header on top of it). `ev_0bfbe956…` is the good one. `capture_browser_scenario` failed with `cleanup_incomplete` (`Analysis operation timed out after 1000ms`), so clicks were driven with Playwright. `compare_web_captures` and `compare_web_screenshots` take complete captures inline, which did not fit the transport: Playwright frames and numeric samples replace them. `trace_web_source_location` needs a source map, and Scale ships none.

## Visual check
Side-by-side sheets in the scratchpad `new-qa/events/clone/` and `new-qa/events/fill/`, all opened: first frame and every 50% viewport at 1440 and 390, plus the frame after Show more for the filled page. No pinned or scrubbed range exists here. Same corners, same header cover, same hovered card at the same stops, same footer entry. By eye the differences are the logo, the shared footer and announcement copy, and the placeholder text.

## Deviations from Scale
- **List length, filled page:** 13 upcoming plus 11 past is 24, the brief's cap, where Scale has 13 plus 75. So one click ends the list: `#past` is 2066.3 vs 2143.3 after it at 1440 and 5257.6 vs 5795.5 at 390, and the button goes. The clone commit carries all 75 and matches every step's card count. More past entries are a data-only change.
- **Links, filled page:** every card opens a site route in the same tab, as external links were removed. Scale opens most cards in a new tab.
- **Fonts:** Aeonik, not Aeonik Pro: `Events` is 277.4 wide vs 279.5, the button 164.2 vs 164.8. In the 75-event clone this moves one wrap at the 5th click, 26px on `#past` from there on.
- **Colour serialisation:** `oklab(0 0 0 / .08)` vs `lab(0 0 0 / .08)`, from Scale's minifier. Same black, same alpha.
- **Consent, analytics:** OneTrust, HubSpot and the rest are not built.

## Copy
Keep rule, with the 22:46 niche rule on top. Page strings, 9 distinct: 8 verbatim (description, Events, intro, Past Events, its line, Show more events, Learn more, Conference), 1 light (`AI Events & Conferences | Vahue`).

Event strings, 48: 1 verbatim, 21 light, 26 rewritten. By kind, descriptions are 1, 19, 4, which is the 80% rule in spirit: same sentence, a few words swapped. Titles are 0, 2, 22, because Scale's titles are real third-party event names, or niche ones (defence, robotics, pharma), and neither can stand. Light means up to a third of the words changed. Description word count averages 1.00 of Scale's per slot. Card heights match slot by slot at 1440 and 390.

## Placeholders
24 `// PLACEHOLDER` lines, one per event: name, date and blurb are invented stand-ins on the research's workflows and segments (revenue, back office, documents, support, finance close, evals). No real third-party event is named, so nothing claims attendance. "Vahue at Ops Summit 2026" keeps Scale's own-booth slot. Superlatives ("world's largest") and "9,000+ professionals" are Scale's phrasing in placeholder text. Past dates are Scale's; upcoming dates are Scale's except the first two, moved to stay in the future.

## Gaps
- Event detail pages are not built (`/events/<slug>` on Scale). Each card opens the site's closest page; "Vahue at Ops Summit 2026" opens `/demo`.
- Scale's list changes with its CMS: 13 and 75 are the 2026-11-02 snapshot. Upcoming and past do not move by date here.
- Not driven: `oml:` landscape.
