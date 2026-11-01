# scale.com/events → /scale-clone/events

Route: `/scale-clone/events/` · Page: `app/scale-clone/events/page.tsx` · Components: `components/scale-clone/events/` · Assets: none (the calendar icon is inline lucide SVG; `public/scale-clone/events/calendar-days.svg` is a copy) · QA: `reference-snapshots/scale-clone/qa/events/`

Captured 2026-11-01 at 1440×900 and 390×844: REA against an isolated Chrome tab (CDP 9230), the page HTML + RSC payload and the page chunk fetched with curl, then Playwright + system Chrome for geometry, computed styles, a 50%-viewport scroll sweep and per-frame samples of every interaction. Copy is Scale's own, from a static snapshot, so QA lines up.

## Reusable page component
`EventsPage({ content, as? })` (`EventsPage.tsx`, server component; `as` defaults to `main`) renders the whole page from an `EventsContent` object (`content.ts`):

- `hero: { title, lede }`
- `upcoming: EventItem[]`
- `past: { title, subtitle, events: EventItem[], initial = 6, step = 6, moreLabel = 'Show more events' }`
- `EventItem: { id, type, date, title, description, href, cta? }`
  - `date` is the rendered label ("November 1, 2026", "April 23-27, 2026", "Date TBD")
  - `type` may be empty (the past card then shows the date alone)
  - `href`: an `http(s)` URL opens in a new tab (`target=_blank rel="noopener noreferrer"`); anything else is a `next/link`. This is Scale's link rule.
  - `cta` defaults to "Learn more". Scale also uses "Register Now", "Watch Now", "Book a Demo" and "Learn More".

`scaleEventsContent` is Scale's copy. `scaleEvents.ts` holds the static snapshot (2026-11-01 06:15 UTC): 13 upcoming and 75 past events. Nothing is fetched at runtime.
- Upcoming cards are server-rendered on Scale, so they were read from the HTML.
- Past events are the `events` prop of `PastEventsList` in the RSC payload. Their dates are resolved the way Scale's card does it: `startDateLabel`, else "Date TBD" when `datesTBD` and there is no start, else `Intl.DateTimeFormat('en-US', {month:'long', day:'numeric', year:'numeric', timeZone:'UTC'})`.
- Scale's 4 internal event pages (`/events/<slug>`) are `#` in the snapshot, as on the other clones.

A Vahue `/events` can pass its own `content` and keep the layout and interactions.

**The list moves.** Scale's CMS changed during the capture: "Scale at MWC Doha 2026" was added as the third upcoming card between two fetches. Re-snapshot before any later QA, or compare geometry only.

## Libraries (REA `analyze_web_bundle`)
- Evidence `ev_f2acac6cc875…`: 50/50 scripts parsed, 0 failures, 713,606 AST nodes. Fingerprints: Next.js (high), React (medium).
- The site shell loads GSAP 3.15 (`2d7ykwtxp_8ed.js`, sha256 `994fce59…`), Lenis (`2fbrdg5m4_g_8.js` `c8dcfe22…`), three r181 and the shared chunks. **Nothing in this page's body uses them**: there is no ScrollTrigger, SplitText, carousel, canvas or Rive.
- Shared chunks by sha256, byte-identical to the earlier audits:
  - `1h0nvyhf5gbrf.js` `10b2627a…`: FlatCta / CMSLink / AnimatedText
  - `37xz28pjbnlx4.js` `b234eef5…`: FullBleed / useScrollTrigger
  - None of their components render in this page's body. FlatCta appears only in the shared header (already fixed in `ScaleHeader`). There is no CMSLink, so there are no `#86bff2` focus outlines, and there is no FullBleed or retroactive intro to port.
- Page module: `PastEventsList` (module 187078, `0saoa1o-3163r.js`, `11644334…`, 4,056 bytes), plus `LightPageTheme` (889229), which resets the nav theme on unmount.

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Evidence |
|---|---|---|
| `main section` (hero) | none | `ev_00fbaa911b49…` |
| `#upcoming` | none | `ev_5bfa9375533d…` |
| `#past` | none | `ev_6a639156f02f…` |
| `#upcoming a` (card) | `mousedown` capture (HubSpot analytics `4823527.js:28:18443`) only | `ev_aebb15b51dd4…` |
| `#past button` (Show more) | React `click` (`42ixmvih7808g.js:0:20015`) + HubSpot `mousedown` | `ev_c912176263c4…` |
| `html` | OneTrust `keydown` and `click` (×2) only. No ScrollTrigger `scroll` listener, unlike pages with reveals | `ev_be9f6bcca991…` |

Hover is pure CSS (Tailwind `hover:` / `group-hover:`). React's `click` is delegated from the root.

## Sections
Body: `main.font-sans > div.light-page.overflow-x-hidden`. Containers are `container` (max 1280, px 24 / 32 from 1024).

**1. Hero** `section.flex.flex-col.items-center.justify-center.overflow-hidden pb-20 pt-36 md:pb-24 md:pt-40` → `container flex-col items-center gap-5 text-center`:
- h1: `text-6xl md:text-8xl font-medium leading-[1.08]`. That is 60/64.8 at 390 and 96/103.68 at 1440, −0.01em, black.
- Lede: 18/27, −0.18px, black/60, max-w 760, `md:whitespace-nowrap`.

**2. Upcoming** `section#upcoming.scroll-mt-28.pb-16` → grid with 1 / md 2 / lg 3 columns, gap 12. Card:
- `a.group` flex column, `min-h-540` (620 from md), radius 28, `bg #f2f2f2 → hover #ececec`, `p-10` (48 from md)
- Tile: 64×64, white, radius 8, lucide `calendar-days` 28px, stroke 1.8
- Body `mt-12 flex-col gap-8`:
  - meta row (gap 2.5): TYPE `·` DATE, 12/18, 500, 0.1em, uppercase, black/45; the dot is black/20
  - h3: 30/32.4, 500, `text-balance`
  - p: 18/29.25, black/60
- CTA span `mt-auto px-5 py-3 rounded-lg bg-black/4 → group-hover bg-black/8`, 14/21 500

**3. Past** `section#past.scroll-mt-28.py-16` → `PastEventsList`:
- Heading: h2 24/36 500, then sub `mt-2` 14/22.75 black/60. Then the grid, the same as upcoming.
- Card: `min-h-420`, `p-10` at all sizes.
  - Tile: 56×56 with `shadow-sm`, 24px icon.
  - Body `mt-20 gap-5`: meta `"DATE   TYPE"` (three spaces, `filter(Boolean)`), h3 24/25.92, p 16/26 black/60.
- `useState(6)`: 6 cards show, and `Show more events` (`mt-8` centred, `px-6 py-3 rounded-lg bg-black/4 → hover black/8`, 14/21 500, cursor default) adds 6 per click. The button unmounts once all 75 show, after 12 clicks.

No featured event, filters, tabs, carousels, or scroll or entrance motion.

## Motion
| Element | Trigger | From → To | Ease / duration |
|---|---|---|---|
| Card background | hover (CSS) | `#f2f2f2 → #ececec` and back | 200ms `cubic-bezier(.4,0,.2,1)` (Tailwind v4 `transition-colors`: color, background, border, outline-color, text-decoration, fill, stroke, gradient vars) |
| CTA span | card hover (`group-hover`) | black/4 → black/8 | same |
| Show more | hover | black/4 → black/8 | same |
| Focus ring | keyboard focus | UA `auto 1px` ring; `outline-color` fades from currentColor (black) to `rgb(0,95,204)` | same 200ms (outline-color is in the transition list) |
| Show more click | click / Enter / Space | 6 new cards mount in the same frame; no animation; scrollY unchanged | — |

Reduced motion: Scale has no `motion-reduce` variants here. The clone drops the 200ms colour transitions under `prefers-reduced-motion`; there is no other difference.

## QA (2026-11-01, `scratchpad/events-audit/qa.js`)
- **1440:**
  - Page height: Scale 5804 = clone 5804; footer at 4905.4 on both.
  - All 13 upcoming and the first 6 past card rects match to 0.1px, as do the tile, icon, h3, p, past heading and sub.
  - Text-width deltas of 0.3–2px come from font metrics: the h1 is 279.5 vs 277.4 and the CTA 110.6 vs 110.3. Every line break is the same.
- **390:**
  - Every upcoming and past card rect matches.
  - Page height 12215 vs 12175: the shared `ScaleFooter` is 40px shorter on mobile (known, see security.md).
- **Fully expanded** (75 past cards, 1440): 16975 vs 16949. One later past card wraps one line less in the clone (the same font-metric delta). Not chased.
- **Sweep:** `qa/events/{1440,390}-{scale,clone}-NN.jpg` every 50% viewport.
- **Health:** the clone returns 200. The only console errors were requests aborted by the QA allowlist.

## Interaction inventory
Method: REA (above) on a fresh CDP 9230 tab, closed afterwards. Playwright then ran identical inputs on scale.com and the clone at 1440×900, sampling every value per animation frame in the page. On scale.com only scale.com GETs got through (analytics proxies, OneTrust, HubSpot and every POST were aborted). Cards were hovered and focused but never clicked. QA images: `qa/events/interactions/<name>-{scale,clone}.jpg`.

### Hero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section, h1, lede | any | none (`ev_00fbaa911b49…`) | — | static; no reveal, no SplitText | yes | `1440-*-00` |

### Upcoming cards
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| card `a` | hover | CSS only (`ev_aebb15b51dd4…`: HubSpot `mousedown` only) | `hover:bg-[#ececec] transition-colors duration-200` | per-frame on both: 34ms `241`, 68ms `239`, 102ms `237`, 134ms+ `236` (`#ececec`); leave mirrors it (146ms `242`) | yes | `hover-card-*` |
| CTA span | card hover / pointer on the span | — | `group-hover:bg-black/[0.08]` | black/4 → 8: the curve is the same frame for frame (Scale reports oklab, clone rgba). The pointer on the span keeps the card hovered | yes | `hover-card-*` |
| card `a` | cursor | — | — | pointer | yes | — |
| card `a` | Tab focus | — | UA `:focus-visible` (no focus classes; the app's global `a { outline: none }` is reverted on the card) | `auto 1px` ring, offset 1px; colour fades over 200ms: Scale 52ms `rgb(0,8,17)`, 119ms `(0,74,158)`, 219ms `(0,95,204)`; clone 55ms `(0,22,48)`, 123ms `(0,82,176)`, 223ms `(0,95,204)`. **Fixed**: the clone had an invented 2px black outline and no outline-color transition | yes | `focus-card-*` |
| card `a` | click | native | module 187078 link rule | external `http(s)` → new tab, `rel="noopener noreferrer"`; internal → next/link (Scale `/events/<slug>`, clone `#`) | yes (internal pages: no) | — |

### Past events
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| past card | hover / focus / click | as upcoming | `PastEventsList` card `n` | same 200ms colours; `shadow-sm` tile | yes | `after-more-*` |
| Show more | hover | CSS | `hover:bg-black/[0.08] transition-colors duration-200` | the same per-frame curve, settling at 217ms on both; cursor `default` (Tailwind v4 preflight). **Fixed**: the clone had `cursor: pointer` | yes | `hover-more-*` |
| Show more | click | React `click` (`ev_c912176263c4…`) | 187078: `onClick: () => s(e => e + 6)` | at frame 0 after the click: 12 cards, height 5804 → 6700, scrollY 4369 unchanged, new cards at opacity 1 (no animation) on both. 12 clicks to show all 75; then the button unmounts and focus falls to `<body>` on both | yes | `after-more-*` |
| Show more | Tab / Enter / Space | native button | — | UA ring `auto 1px rgb(0,95,204)` offset 0; Enter → 12, Space → 18 cards, and focus stays on the button | yes | `focus-more-*` |
| page growth | after Show more | — | Lenis autoResize (shell) | the clone also calls `useRefreshOnPageGrow` so ScrollTriggers from the shared nav theme (or a Vahue page's own sections) re-measure | yes | — |

### Shared chrome
The header (FlatCta Log in / Get Started, menus, announcement bar) and the footer are the shared `ScaleHeader` / `ScaleFooter`, audited on the earlier clones (see shared-chrome.md). This page uses the light nav (`LightPageTheme`), which is the default.

## Remaining gaps
- Font-metric text widths, under 2px per line. One extra wrapped line in the fully expanded past list at 1440 (26px).
- The shared footer is 40px shorter at 390 (known).
- Scale's internal event detail pages (`/events/<slug>`) are not cloned; those 4 cards link to `#`.
- The snapshot is a point in time. Scale's live list changes daily, as upcoming events move to past.
