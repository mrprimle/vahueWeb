# scale.com/docs → /scale-clone/docs

"Documentation" in Scale's Resources menu links to `https://scale.com/docs`. It does **not** redirect: Vercel proxies
a **Mintlify** site there (theme `mint`, client 0.0.4044, Vite/rolldown bundle `/_mintlify/assets/index-B2TY3ua1.js`
+ `initial-vendor-qAl-_E2i.js`, CSS `index-BSPJDRoU.css`, React 19 + Base UI popups, Tailwind v4 classes).

- **Real landing URL:** `https://scale.com/docs` (HTTP 200, no redirect), page "Getting Started with Scale - Scale
  Documentation", source file `docs/index.mdx`, last modified 2026-05-15.
- **Canonical:** `https://api-reference.scale.com/docs` (Mintlify subdomain `scale-full-docs`, repo `scaleapi/documentation`).
- Snapshot date 2026-11-01. Static snapshot of the landing only; every other docs page links to the live site.

## Files

| Path | Role |
|---|---|
| `app/scale-clone/docs/page.tsx` | route, passes `scaleDocsContent` |
| `components/scale-clone/docs/DocsPage.tsx` | shell: navbar, tabs, layout, TOC, content, pagination, hotkeys, theme state |
| `components/scale-clone/docs/DocsSidebar.tsx` | sidebar nav (`NavItems` shared with the mobile drawer) |
| `components/scale-clone/docs/DocsSearch.tsx` | search dialog + static search (`searchRecords`, `highlight`) |
| `components/scale-clone/docs/DocsThemeMenu.tsx` | navbar theme menu + mobile `ThemePill` |
| `components/scale-clone/docs/DocsAssistant.tsx` | assistant sheet (desktop), bottom drawer (mobile), floating "Ask a question..." bar |
| `components/scale-clone/docs/DocsMobileNav.tsx` | mobile nav drawer |
| `components/scale-clone/docs/usePresence.ts` | Base UI `data-starting-style` / `data-ending-style` mount/unmount contract |
| `components/scale-clone/docs/icons.tsx` | Mintlify `mi-mint-1-*` icons (sprite + lazily added search icons, captured from the live DOM) |
| `components/scale-clone/docs/content.ts` | content contract `DocsContent` + Scale copy |
| `components/scale-clone/docs/searchIndex.json` | 256 records (40 pages + headings), 36 KB |
| `components/scale-clone/docs/docs.module.css` | all styles, light + dark tokens |
| `components/scale-clone/shared/CloneChrome.tsx` | hides the shared Scale header/footer/Lenis on routes with their own chrome (`/scale-clone/docs`) |
| `public/scale-clone/docs/scale-wordmark{,-dark}.svg` | Mintlify logo assets (3.5 KB each) |

### Reusable content contract
`DocsContent`: `siteName`, `logo {light,dark,alt}`, `linkBase` + `localPrefix` (live `/docs` hrefs → `/scale-clone/docs`,
everything else → `https://scale.com/docs/...`), `tabs`, `sidebar: NavSection[]` (pages + collapsible groups with
`expanded`), `activeHref`, `mobileTitle`, `page {title, description, heading, body, cards}`, `toc`, `next`,
`search {placeholder, records, limit 6, askLabel, askPrefix, askSuffix}`, `assistant {title, disclaimer, placeholder, offlineReply}`.
Everything is serialisable (server page → client component). Theme tokens are CSS custom properties on `.root`
(`--primary`, `--bg-light/-dark`, `--gray-50…950` as Mintlify's rgb triplets), dark via `[data-theme='dark']`.

## Libraries / stack (REA)

- REA `analyze_web_bundle` could not run with `include_script_sources:false` (schema requires `true`; the full run
  was skipped for size), so bundle facts come from the curl'd chunks: `index-B2TY3ua1.js` (750 KB) and the CSS.
- Mintlify UI primitives are **Base UI** (`data-base-ui-*`, `base-ui-disable-scrollbar`, Dialog / Menu / Combobox /
  Drawer / ScrollArea). The repo has no `@base-ui/react`, and adding a dependency would touch the shared
  `package.json`, so the clone reproduces the same behaviour by hand with the same parameters (see Motion).
- No GSAP, Lenis, Keen or Embla on this page. Scroll is **native** (the clone opts out of the shared Lenis + Scale
  header/footer through `CloneChrome`).
- Theme: Mintlify head script reads `localStorage.isDarkMode` (`light|dark|system`, legacy `true|false`) and toggles
  `html.dark`. The clone runs the same logic in an inline script on its own root (`data-theme`,
  `data-theme-preference`), so there's no flash, and doesn't touch the app's global `html.dark`.
- Font: docs.json asks for Aeonik (`aeonik-medium.woff2` on mintlify S3), but that request is **blocked by CORS on
  scale.com** (console error on every load), so the live page renders in the fallback (`.SF NS` on macOS; confirmed with
  CDP `CSS.getPlatformFontsForNode`). The clone uses the fallback stack directly (`-apple-system, …`), because the
  literal `Aeonik` would resolve to this repo's Aeonik face. Root `font-size:15px` (Scale custom CSS), so every rem is
  ×15 (values in the CSS are the resolved px); weight 500 on everything; `font-feature-settings: cv02 cv03 cv04 cv11`.

## Listener map (REA `inspect_web_event_listeners`)

| Selector | Evidence | Listeners |
|---|---|---|
| `#search-bar-entry` | `ev_9e643ef67230…` | none of its own; React delegation (`click` → `initial-vendor` 8:141) |
| `#root` | `ev_9feadab56557…` | the full React 19 delegated set (click, keydown, pointer*, focusin/out, scroll, wheel, …) from `initial-vendor-qAl-_E2i.js:8:28217/28310/28403` |
| `#sidebar-content > div` | `ev_9cf314117c3b…` | `scroll` ×2: React + Base UI ScrollArea (`index-B2TY3ua1.js:176:32605`, fade + scrollbar visibility) |
| `html` | `ev_7b4b929def9b…` | none |

Window-level behaviour read from the bundle: global hotkeys ⌘/Ctrl+K (search) and ⌘/Ctrl+I (assistant); the
floating assistant bar's `IntersectionObserver` on `footer#footer` (component `WO` in index-B2TY3ua1.js).

## Layout (1440×900, resolved px)

| Region | Scale = clone |
|---|---|
| Navbar | sticky (fixed < 1024), 60 px row + 45 px tabs row = 105; container max-w 1380, px 45 → logo x 75; logo 20 px high |
| Search / Ask buttons | three `flex-1` columns with `gap 15`; search x 510 w 262 h 33.75 r 11.25 ring 1px gray-400/30; Ask w 149 |
| Theme trigger | x 1335, 30×30, icon 15 |
| Tabs | 13.125 px, gap 22.5, active primary + 1.5 px underline, hover gray-800 + gray-200 underline |
| Sidebar | x 60 w 270, sticky top 105, h `100dvh-105`, inner pr 30, 30 px top fade; items 13.125/22.5, py 5.625 pl 15 r 11.25; group h3 20.25/1.3 mt 30 mb 9.375; nested pl 26.25 |
| Content | text x 370.5 w 675.75 (content-area flex 1, ml −45, pl 85.5); page title 33.75/1.15 ls −0.025em at y 144.4 |
| MDX | `#content` mt 30 mb 52.5 (flow-root, no margin collapse); h1 mt 37.5 mb 22.5 at y 360.2; p 15/25.5 margins 18.75 |
| Cards | 2-col grid (1 col < 640) gap 15, card r 15 border gray-950/10, px 22.5 py 18.75, title 26.25/1.2 gray-800, body 15/25.5 gray-600 |
| Pagination | y 735.5, "Overview" + 5.6 px chevron, 13.125 primary |
| Floating bar | sticky bottom, 81.75 tall (59.25 box + 22.5 pad), white `::before` 200 px |
| Footer | border-top gray-100, pt 37.5 pb 105 (empty) |
| TOC | xl+ only, x 1132.5, sticky top 142.5; "On this page" 26.25/31.5 gray-700, items 14/22.5 py 3.75 |

390×844: navbar fixed, logo row 60 + crumb row 52.5 (menu icon + "Getting Started with Scale"), content pt 150,
x 18.75, single-column cards; doc height 1408 on both.

Final geometry diff (QA r5, 16 selectors × 2 viewports): **0 differences** apart from the h1 colour notation
(`oklch(0.21 0.034 264.665)` vs `rgb(16,24,40)`, the same Tailwind v4 gray-900).

## Motion

| Element | Params (from Mintlify classes / runtime) | Clone |
|---|---|---|
| Search backdrop | black/40, opacity 250 ms `cubic-bezier(0.22,1,0.36,1)`, exit 150 ms | same |
| Search popup | scale .96→1 + opacity, 250 ms same curve, exit 150 ms; container p 15/22.5/45 (sm/md), popup mt 5.625, max-w 640, r 18.75 | same |
| Theme menu | scale .95 + opacity, 100 ms ease-out, `side bottom align end`, offset ≈2.5 px | same |
| Assistant sheet (desktop) | 368 px, maximize 576 px, no transition, 1 px `col-resize` edge | same; drag-resize clamped 368…50vw |
| Floating bar | hidden (`translate-y 100px`, opacity 0) while the footer intersects; 300 ms transition after the first IO callback; `invisible` while the assistant is open | same |
| Mobile nav drawer | Base UI Drawer, swipe left, `85dvw` (19–22 rem) + 3 rem bleed, 450 ms `cubic-bezier(0.32,0.72,0,1)`, exit 400 ms, backdrop black × 0.4 × (1 − swipe progress) | same; swipe-to-close at 25 % or > 0.5 px/ms |
| Mobile assistant drawer | bottom drawer `85dvh` + bleed, same timing, grab handle | same |
| Sidebar group chevron | rotate 0↔90°, 75 ms | same |
| Navbar | `data-is-opaque` on scroll: bg white/95 (dark bg/75) + 8 px backdrop blur, 500 ms colour transition | same |

## Interaction inventory

Method: REA listener map above, bundle reading for window-level handlers, then Playwright with identical inputs on
both sites (`scratchpad/docs-qa/qa.js`, report `r5/report.json`) and a clone-only functional script
(`docs-qa/func.js`, results `f4.log`) for the paths that would hit Scale's live services (sending chat messages).
QA images: `qa/docs/<w>-{scale,clone}-*.jpg` and `qa/docs/interactions/`.

### Navbar
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Search button | click, hover | React delegated (`ev_9e643ef6…`) | index chunk | opens dialog; hover ring gray-600/30, icon gray-800 | yes | `interactions/d-*-search-open.jpg` |
| ⌘K / Ctrl+K | keydown (window) | bundle hotkey | index chunk | toggles search | yes (both `cmdk: true`) | — |
| Ask Assistant | click, ⌘I | delegated + hotkey | index chunk | toggles sheet 368 px | yes (368 / 368) | `d-*-assistant.jpg` |
| Theme trigger | click / Enter / ArrowDown | Base UI Menu | index chunk | menu System/Light/Dark, check on active, arrows + Enter, Esc, outside click | yes (keyboard path verified: dark persisted) | `d-*-theme-menu.jpg` |
| Tabs | hover | CSS | — | gray-800 + gray-200 underline | yes | `d-*-hover-tab.jpg` |
| Mobile search / assistant / crumb row | click | delegated | — | open search / bottom drawer / nav drawer | yes | `m-*-search.jpg`, `m-*-assistant.jpg`, `m-*-nav.jpg` |

### Search dialog
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Input | type | Base UI Combobox | lazy chunk | results + "Ask Assistant · Can you tell me about *q*?", footer hints, 6 results | yes, over the static index (keyword ranking; Scale's server ranking differs, see gaps) | `d-*-search-data.jpg` |
| Results | ArrowUp/Down (looping), mouse move | Combobox | — | `data-highlighted` bg black/3 % | yes | `d-*-search-arrow.jpg` |
| Enter / Alt+Enter / Ask button | key, click | Combobox | — | opens result / asks assistant | yes (→ live-site URL; ask → sheet) | `interactions/float-submit.jpg` |
| Esc / backdrop click | key, click | Dialog | — | close, focus returns to trigger, page scroll locked while open | yes | — |

### Sidebar
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Page links | hover | CSS | — | bg gray-600/5; colour stays (Scale custom CSS `#sidebar a{color:inherit}`) | yes | `d-*-hover-side.jpg` |
| Group buttons | click | delegated | — | collapse/expand, chevron 75 ms | yes | `d-*-collapse.jpg` |
| Scroll area | scroll | Base UI ScrollArea (`ev_9cf31411…`) | 176:32605 | hidden native scrollbar, 30 px top fade | partly (no custom thumb) | — |

### Content
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| MDX h1 | hover, click | delegated | — | link chip (22.5 px, ml −37.5) fades in; click = hash + copy URL | yes | `d-*-hover-h1.jpg` |
| Cards | hover, click | delegated (`role=link`) | — | border → primary, whole card navigates | yes | `d-*-hover-card.jpg` |
| Pagination | hover | CSS | — | title gray-900, chevron gray-600 | yes | — |
| TOC | click, scroll | delegated + scroll-spy | — | smooth scroll + hash, active item primary; "On this page" scrolls to top | yes | — |

### Assistant
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Sheet maximize / close | click | delegated | — | 368 ↔ 576 px; the TOC column empties (gap kept) while open | yes (576 / 576) | `d-*-assistant.jpg` |
| Sheet edge | drag | pointer | — | col-resize | yes (+100 px → 468.5) | `interactions/sheet-resized.jpg` |
| Floating bar | footer IO, Enter | IO + delegated | `WO` | hide at footer, submit opens the sheet with the message | yes (not driven on Scale: it would send a real chat) | `interactions/float-submit.jpg` |
| Mobile drawer | swipe down, close | Base UI Drawer | — | 25 % / flick | yes | `m-*-assistant.jpg` |

### Mobile nav drawer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Drawer | swipe left, Esc, backdrop | Base UI Drawer | — | follows finger (x −45 → −145 mid-swipe), closes past 25 % | yes | `interactions/m-drawer-swipe.jpg` |
| Theme pill | click | delegated | — | system / light / dark | yes | `interactions/m-drawer-dark.jpg` |
| Tab switcher | click | Base UI Menu | — | Documentation / API Reference | yes | `interactions/m-drawer-tabs.jpg` |

## QA

- 1440×900 and 390×844, light and dark (`d-*-dark.jpg`), scroll 0 / 300 / bottom, every interaction above.
- Clone console: no errors. Scale console: the Aeonik CORS error on every load.
- Fixes during QA: content h1 margin collapse (`flow-root`); TOC title height (flex); global `h1–h3 {color:white; tracking-tight}`
  leaking into the sidebar headers and card titles; system font instead of the repo's Aeonik (paragraph wrap went
  from 7 to 8 lines like Scale); mobile textarea 15/22.5; link drag cancelling the drawer swipe (`pointercancel`); the theme menu and
  drawer focus once mounted (keyboard path); the TOC column empties while the assistant is open (Scale's layout);
  search icons replaced with the captured Mintlify ones; search crumbs `page › heading`.

## Remaining gaps

- **Search ranking:** Scale's search is server-side (Mintlify / Trieve, full-text + semantic). The clone searches
  page titles and headings only, keyword-ranked, so for "data" it returns the same six results as Scale in a different
  order, and content-only matches differ (e.g. "scale api").
- **Assistant:** no live AI; a sent question gets one fixed reply (`assistant.offlineReply`, see copy below).
  Starter questions, feedback buttons and attachments aren't wired.
- Base UI ScrollArea's custom scrollbar thumb isn't drawn (the native scrollbar is hidden, as on Scale).
- Mobile search breadcrumbs don't collapse the first crumb to "…" when they overflow.
- Every link except `/docs` (and its anchors) goes to the live `https://scale.com/docs/...`.

## Copy not from Scale

- `assistant.offlineReply`: "The assistant is not available in this static snapshot of the docs."
