# /docs (scale.com/docs)

Live source: https://scale.com/docs on 2026-11-02, headless, at 1440x900 and 390x844 (with and without touch), plus 768, 1024, 1280, 1920 and 1440x700. Stack: [../stack.md](../stack.md), row `/docs`. Scale's strings: `components/pages/docs/content.scale.ts`. Rendered strings: `components/pages/docs/content.ts`.

## Stack
Mintlify client 0.0.4044, Vite with Rolldown, React 19.2.3, Tailwind 4.3.2, Base UI, root font 15px. REA calls Next.js too, which is wrong: the match is a `_next` path inside Mintlify's asset fallback list. The custom CSS declares Aeonik Medium from `mintlify.s3.us-west-1.amazonaws.com`, but that file has no `Access-Control-Allow-Origin`, so the font never loads. CDP `getPlatformFontsForNode` reports `.SF NS`, not custom, on every text node. We match what renders: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`, weight 500. No Aeonik on this route.

## What was cloned, what was left out
Scale's docs have **40 pages** (`/docs/sitemap.xml` and `api-reference.scale.com/llms.txt` agree): 20 in Documentation, 20 in API Reference.

Cloned: the landing page and its chrome, namely top bar, tabs, sidebar with its scroll area, search dialog, assistant panel and floating bar, theme menu, table of contents, pagination, mobile drawers. In light and dark.

Left out: the other **39 pages** (19 Documentation, 20 API Reference), with their body content, images, code panels and endpoint tables. `app/docs/[...slug]/page.tsx` holds their routes so no sidebar link is dead. These are stubs, not clones: same chrome, title, section label, pagination and a Placeholder note. Unknown paths return the site 404. Mintlify's `/llms.txt`, `.md` page views, `llms-full.txt`, MCP and agent cards are not built.

## Sections

| Section | Measured at 1440, Scale and ours equal | At 390 |
|---|---|---|
| Top bar | 105 tall, sticky, inner max 1380, columns 45 from edge, search 261.8, Ask 148.8 | Fixed, 112.5 tall, logo row 60, page row 52.5 |
| Sidebar | x 60, 270 wide, sticky at 105, rows 33.75, section titles 20.25/26.3, scroll height 1139 in 795 | Drawer |
| Header | h1 33.75/38.8, -0.84 tracking, lead 15/25.5 | h1 wraps to 2 lines, same |
| Body | h1 at 360.2 with 37.5 and 22.5 margins, cards 330.4 x 125.8, title 26.25/31.5 | Cards stack from 640 |
| Pagination | y 735.5, 18.75 tall | y 1165.4 |
| Floating bar | Sticky, 81.75 tall, box 59.25 | 80.25 tall, 16px input from 1024 down |
| Footer | Empty, 143.5 tall, 1px top rule | Same |
| Table of contents | x 1132.5, sticky at 142.5, from 1280 | None |
| Document | 980 | 1408 with touch, 1408 without |

Compared at 7 widths (1440, 390 touch, 390, 1024, 1280, 768, 1920): every box within 0.7px with Scale's copy, in clone and in fill apart from the h1's own width, which is longer text (377.9 vs 366.6) and wraps at the same points.

## Interaction inventory
REA evidence: bundle `ev_82b736176dac…`, page `ev_57b44705b771…`, execution during real input `ev_6f57f0a354e3…` (60s window, 26 requests). Listeners: `html` `ev_5a32b5dc3f79…` (0), `#navbar` `ev_72a2b8755095…` (0), `body` `ev_ea1b52004263…` (`reset` only), `#root` `ev_672c0b1dffe0…` (React delegates all input here), `#search-bar-entry` `ev_540b5cd2a796…`, `#assistant-entry` `ev_6ec1e9264d4d…`, theme trigger `ev_8826f09bd293…`, sidebar viewport `ev_8dee73288089…` (React plus `index-B2TY3ua1.js` 176:32605 scroll), group row `ev_34f8076dc8ba…`, card `ev_511531a9587b…`, TOC button `ev_c55c310b2ff7…`, heading `ev_fc73c88f2846…`, bar textarea `ev_32d22f64fe04…`, tab `ev_2c200d21d1f7…`, next link `ev_bdd9e4035f40…`. The interactive ones each hold one no-op React `click` root marker, `initial-vendor-qAl-_E2i.js` 7:14120; handlers run from `#root`.

| Element | Input | Source | Params | Scale vs ours |
|---|---|---|---|---|
| Top bar fill | scroll | inline `applyNavbarTransition` | `data-is-opaque` past 50, color .5s, blur 8px | Wheel 20 x 5: false, false, true, true, true both; final colours equal |
| Search, Ask entries | hover | CSS | Ring `gray-400/30` to `gray-600/30`, icon gray-700 to 800, no transition | Equal |
| Theme trigger | click, Enter | Base UI Menu | Menu 120 wide, 2.5 under the trigger, right aligned, scale .95 and opacity .1s ease-out | Rect equal |
| Theme item | hover, arrows, Enter, Esc, outside click | Base UI Menu | Highlight `bg/5`, text 75%, active primary with check | Equal; focus returns to trigger |
| Theme | choose | inline script, `isDarkMode` | Stored `light`, `dark`, `system`; set before first paint; system follows the media query | Stored value equal; dark colours equal |
| Tab | hover, click | CSS, link | Underline gray-200 on hover, primary 1.5 when active | Equal. API tab swaps the sidebar |
| Sidebar row | hover | CSS | `gray-600/5` background, no transition | Equal |
| Sidebar group | click open | `index-B2TY3ua1.js` | Closes at once, no height animation; chevron rotates .15s | `aria-expanded`, list removed, chevron rect equal |
| Sidebar group | click closed | same | Opens and goes to the group's first page | Same route on both |
| Sidebar | wheel, hover | Base UI ScrollArea | Thumb and 3.75 track, 15 inset, opacity .15s, 0s while scrolling, thumb can be dragged | scrollTop 343, track 324.4,119.5,3.8,765, thumb 349.9,534, equal. Thumb drag is ours, not driven on Scale |
| Card | hover, Tab, Enter, click | CSS, React | Border primary, role link | Equal; click goes to `/docs/genai-data-engine` and the API intro as on Scale |
| Heading | hover | CSS | Anchor box fades in at x 333 | Equal by eye |
| Heading | click | React | Writes URL to clipboard, sets the hash, scrolls with `--scroll-mt` | Hash, clipboard text, y 80, equal |
| Pagination | hover | CSS | Title gray-900, chevron gray-600 | Equal |
| Floating bar | footer in view | `WO`, IntersectionObserver | Moves 100 down, opacity 0, .3s; first report has no transition, so it is hidden from load at 1440x900 | Opacity .967, .542, .162, .051, .001, 0 vs .967, .542, .224, .051, .001, 0 |
| Floating bar | focus | CSS | Border primary | Equal |
| Floating bar | Enter, send | `UO` | Opens the assistant with the message | Ours only: not typed on live Scale |
| Search | click, Cmd or Ctrl+K | `Ry` | Backdrop black 40%, dialog 640, scale .96 to 1 and opacity, .25s `cubic-bezier(.22,1,.36,1)`, close .15s; html scroll locked, input focused | Dialog rect, input, chip equal; opacity curve same at sample phase |
| Search | Esc, overlay click | `Wy` | Closes | Equal. Focus return: see Gaps |
| Search | typing, arrows, Enter, Alt+Enter, Ask chip | Mintlify API on Scale | Static title index here | Ours only: not typed on live Scale |
| Assistant | click, Cmd or Ctrl+I | `Ly` | 368 wide with no transition, input focused, content reflows, TOC goes, bar hidden; state in `chat-assistant-sheet-open` | Rects at 1440, 1600, 1920 equal |
| Assistant | maximize, grip drag | `Eb` 368, `Db` 576 | Toggles width, stored in `chat-assistant-sheet-width` | 576 equal. Grip drag is ported from code, not driven |
| Mobile page row | tap | Base UI Drawer | Drawer x -420 to -45, .45s `cubic-bezier(.32,.72,0,1)`, close .4s, backdrop 40% | Curve equal; Scale starts about 280ms later as it loads the chunk first |
| Drawer | backdrop tap, Esc, swipe | Base UI Drawer | Closes | Tap closes on both. Swipe is an approximation, not compared |
| Drawer | theme pill, tab menu | React | Pill 97.5 x 35.6; menu 300 x 80.75 | Equal |
| Assistant, mobile | tap, close, swipe | Base UI Drawer | Bottom sheet at y 126.6, 15 radius, handle 45 x 3.75, sparkle turns primary, input not focused | Rects equal. Swipe not compared |
| Hover on touch | | Tailwind v4 | All hover is `(hover: hover)` | Card stays plain after scroll on both |
| Tab key | | native | Skip link, logo, search, Ask, theme, 2 tabs, sidebar, active row | Same order on Scale, read from the probe; ours not stepped row by row |

## Deviations from Scale
- **Search and assistant have no backend.** Scale's search and assistant are Mintlify APIs. Search here matches words in page titles; rows follow Mintlify's loading skeleton, since the real result rows were not seen. Sending to the assistant adds a Placeholder reply, nothing leaves the page. Attach button is inert.
- **Sub-pages are stubs**, see above. The Placeholder pill in the sidebar and the note on stubs are ours, Scale has no such element.
- **No analytics:** Scale posts to `/_mintlify/api/v1/e` during normal use. Nothing here does.
- **Assets:** Mintlify's icons are inlined. The mobile magnifier is FontAwesome by mask on Scale, an inline path here. Scale's wordmarks shipped only in the clone commit and were removed with the fill.
- **Styling:** hand-written `docs.css` in px, not Mintlify's class strings, as its theme differs from the site's.

## Gaps
- **Search focus return:** Scale returned focus to the previously focused element in our run; ours to the search button. Not chased.
- **Stub API pages** do not have Scale's code panel layout, as those pages were left out.
- `capture_browser_scenario` failed twice with `cleanup_incomplete`, so that tool gives no evidence here. `observe_web_execution` and Playwright cover the same interactions. `export_web_scripts` and source-map tracing were not needed: chunks were read directly and no maps are published to this origin. Visual pairs were built in Playwright rather than `compare_web_screenshots`.
- Windows and Linux glyphs for the shortcut hints (`Ctrl+K`) are ported from code, not seen.
- The first sheet build had stitching artefacts on three sheets from reusing one browser page. Raw frames were fine, and those sheets were rebuilt and reopened.

## Copy mapping
82 strings: 54 unchanged, 7 with only Scale to Vahue, 15 labels swapped to the site's names, 2 lead paragraphs with 5 words changed (development to deployment, data to context, training data to context, pre-labeling to pre-processing), 1 card marked Placeholder, 3 with no Scale source (two stub notes, assistant reply).

Sections follow `components/site/content.ts`: GenAI Platform is Knowledge Agents (`/genai-portfolio`), GenAI Data Engine is Back-office Sync (`/generative-ai-data-engine`), Automotive Data Engine is Scoring and Decisions (`/automotive`), Nucleus is Agent Evals. The menu's leading "For" is dropped here, as it wraps the 20px sidebar title and moves every row below by 26px. Sensor Fusion and Image & Video are Document Intake and Support and Voice, under the no-niche rule. Taxonomy Service is Decision Rules, Fixless Audits is Quality Audits.

## Placeholders
`// PLACEHOLDER` on 7 lines in `content.ts`, one of them the `api()` helper behind all 21 API entries. On the page: 20 API Reference rows and the page note carry a Placeholder pill. API Compatibility Policy has no pill as the row would wrap, its page says so. The landing card reads "Placeholder API concepts and endpoint reference."

Slugs keep Scale's paths, apart from `/docs/api-reference/introduction-to-vahue-api`. `sensor-fusion-*`, `genai-*`, `pro-or-*`, `nucleus` and `fixless-audits` still appear in URLs.
