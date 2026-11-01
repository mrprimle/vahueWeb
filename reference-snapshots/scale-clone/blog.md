# scale.com/blog clone spec

Routes: `/scale-clone/blog/` (`app/scale-clone/blog/page.tsx`) and `/scale-clone/blog/category/<slug>/` (`app/scale-clone/blog/category/[slug]/page.tsx`, 17 static params) · Components: `components/scale-clone/blog/` · Assets: `public/scale-clone/blog/` · QA: `reference-snapshots/scale-clone/qa/blog/`

Captured 2026-11-01 at 1440×900 and 390×844 (computed styles, every 50%-viewport sweep, scripted interactions), REA on a fresh CDP 9230 tab (closed afterwards), production chunks downloaded and read locally, RSC payload of `/blog` and all 17 category pages parsed.

The layout is reusable: `BlogPage({ content, activeCategory?, as? })` renders everything from a `BlogContent` object (`content.ts`, Scale's copy in `scaleBlogContent`), so Vahue's `/blog` can pass its own posts, tags, bento images, hrefs and labels (see "Reuse").

## Libraries (REA `analyze_web_bundle`, evidence `ev_fd734f31c7fc…`)
- 51 scripts parsed, 0 failures. Next.js (high, Turbopack), React (medium). GSAP 3.15 + ScrollTrigger + SplitText (AnimatedText module 668761 in `1h0nvyhf5gbrf.js`), Lenis 1.3.21 (`2fbrdg5m4_g_8.js`). three.js chunk loads site-wide; no canvas, carousel or Rive on this page.
- Algolia lite client 5.53.0 bundled in the page chunk (app `LX5V19E6HJ`, index `scale_com_lx5v19e6hj_pages`); endpoint `/1/indexes/*/queries` (REA routes). It's the only network call the page makes on interaction.
- **sha256 check against earlier audits**: `1h0nvyhf5gbrf.js` `10b2627a…` (FlatCta 892855 / CMSLink 737900 / AnimatedText 668761) and `37xz28pjbnlx4.js` `b234eef5…` are byte-identical to the files read in the security / guides / careers audits; Lenis `2fbrdg5m4_g_8.js` `c8dcfe22…` identical. `37xz28` only arrives through link prefetch: /blog has **no FullBleedMediaSection, no FlatCta in the body and no pre-footer**, so the FlatCta state machine, the #86bff2 CMSLink outline and the retroactive FullBleed intro have nothing to attach to here (the header's FlatCtas are the shared chrome).
- Page chunks: `126gr-esjog6p.js` `3d61753d…` (507457 BlogIndexHeader: tag bar + Algolia + BlogSearchModal; 813045 BlogPostList; 603626 PostList), `3dnh8g0pvq60q.js` `c63de419…` (808358 BlogPreview, 189756 slot table, 598042/317967 BaseCard, 280239 CategoryIcon, 167360 grid CSS module `gUrnSq_*`, 995634 section-theme manager). `3l92lj3k2zf2y.js` / `3x8z3_0hhtdcb.js` are the category-route copies of the same modules (prefetched).

## Page structure (RSC)
`Header border` → `main.font-sans > div.min-h-screen.bg-white`:
1. hero `section.bg-white.pt-20.md:pt-36.pb-6` → `flex col gap-5 max-w-[860px]`: `p.detail-mono` gray-60 "Scale AI", `h1.header2` black "Blog", `p.body1` gray-30 `max-w-[520px]`.
2. `Suspense(fallback div.pb-6.md:pb-8.h-10)` → 507457 `{ tags (19, CMS order, Company and Research twice), posts (164), activeCategory }`.
3. 808358 BlogPreview `{ posts: 5 entries, pageThemeOverride "light", captionFullBleed true, fullWidth true }`; entry 0 has `variantOverride "overlay"`, all have `imageGradientOverlay true`.
4. `Suspense(fallback div.py-16)` → 813045 `{ posts, tags, bentoCount 5 }`.
5. 995634 (section theme; no dark sections on /blog).
Category pages (`/blog/category/<slug>`): same hero and tag bar with `activeCategory`, **no bento**, list `{ posts: category posts, activeCategory }` (bentoCount 0, no "More Posts"). A post belongs to a category when its primary `category.slug` or any of its `categories` matches (checked against all 17 live category pages, order preserved).

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Evidence |
|---|---|---|
| `section.BlogPreview` | none | `ev_81010d3570fd…` |
| bento tile `a.BlogPreviewTile` | HubSpot `mousedown` (`4823527.js:28:18443`), Next Link `click` (`42ixmvih7808g.js:0:20015`) | `ev_0372bd7beeee…` |
| tag pill `a[href^="/blog/category/"]` | same two | `ev_0513e589a80d…` |
| "More" `button.rounded-full` | same two (React click delegated) | `ev_fe1b2aae2b08…` |
| search `button.w-56` | same two | `ev_3babf63a9f2e…` |
| list row `.divide-y > a` | same two | `ev_0cc3af7fb0ca…` |
| "Load more" | same two | `ev_4b56223fde18…` |
| document / window (from the chunks) | `mousedown` on document while "More" is open (507457); `keydown` on window for ⌘K (always) and for Esc / ↑ / ↓ / Enter while the modal is open; per-slot IntersectionObserver (808358); ScrollTrigger + Lenis on window | source read |

## Sections (1440 / 390)
Global type: detail-mono 13.008/1.2 (10/1.2) uppercase; header2 64/1.05 (32) −0.01em; body1 20/1.5 (16/1.45) −0.01em; colours gray-30 `#575757`, gray-60 `#929292`, gray-80 `#C7C7C7`, gray-90 `#EAEAEA`, gray-95 `#F2F2F2`.

1. **Hero**: section y 39 (under the announcement bar), eyebrow 183, h1 219 (67 tall), sub 306 (1 line, 520 wide). 390: h1 214, sub 267.
2. **Tag bar** `pb-6 md:pb-8`:
   - ≥768: row `flex md:items-center md:gap-4`; pills `px-3 py-1.5 rounded-full detail-mono` (28 tall), "All" + first 5 tags (Testing & Evals, Robotics, Global, Defense, Autonomous Vehicle), then "More ⌄" (button, same pill). Active `bg-black text-white`, idle gray-95/gray-30, hover gray-90, `transition-colors` 150ms, `focus:outline-none`. Search button `w-56` (224×40) `pl-3 pr-4 py-2 rounded-xl border gray-80`, 18px search icon, "Search...", ⌘K chip (`text-xs bg gray-95 rounded px-1.5 py-0.5`); hover border gray-30 + text black.
   - "More" panel: `absolute top-full left-0 mt-1.5 w-52` (208×509), white, 1px gray-80, radius 12, `shadow-lg`, `py-1`, z 50, no open animation; items (14, incl. the duplicate Company / Research) `px-4 py-2.5 detail-mono` 36 tall, gray-30, hover gray-95 + black; the active one gray-95 black with "✓". Chevron `rotate-180` while open (150ms). When the active tag is in "More", the button turns black and shows its name.
   - <768: rail `-mx-4 px-4`, `overflow-x-auto` without scrollbar, every tag (24 tall pills), `aria-current="page"` on the active pill(s); round search button 40×28 (`aria-label="Search"`).
3. **Bento** BlogPreview `section py-12 md:py-16 overflow-hidden isolate` (y 432, 777 tall at 1440). Grid `gUrnSq_grid gUrnSq_gridProportional`: 4 columns, `grid-auto-rows minmax(4.5cqi, auto)`, gap `0.625cqi`, slots `min-height 17cqi`, grid areas from the slot table (1/1/5/3, 1/3/6/5, 5/1/7/3, 6/3/7/4, 6/4/7/5) → 692×286, 692×360, 692×354, 341×280, 341×280. <1024: single column, 16px row gap, 4 tiles (342×280 at 390).
   - Tile `a.BlogPreviewTile rounded-2xl overflow-hidden @container/tile` inside BaseCard. Overlay variant (tiles 0–1 on desktop): image on `bg-neutral-900`, two-stop top/bottom shade, h3 32/38 regular white. Caption variant (tiles 2–4, all tiles <1024): image + `bg-gradient-to-t from-black/60 via-black/10`, h3 medium `leading-snug tracking-tight`, font size from the wrapper `clamp(1rem, max(4, 10 − 0.06·len)cqw, 2.5rem)` (40/55 on Qatar, 26.55 on UAE) or 1.375rem on mobile. Category chip top-left `left-5 top-5`: 26px swatch (slot colour; Scale's categories carry no colour) with the 8px white mark + 11px mono label.
   - Text tone: on desktop the cover is sampled at 64×64 in `requestIdleCallback`; a bright cover (Qatar) turns the chip label neutral-950 (`rgb(16,16,16)`), measured on both. Mobile skips the sampling (all white).
4. **List** `section pb-12 md:pb-16`: "More Posts" 13/19.5 medium +0.1em gray-30 `mb-10`; rows `divide-y gray-90`, `py-6 md:py-9 px-4 -mx-4`, hover gray-95 (150ms); date `md:w-20` 13 uppercase +0.05em gray-60 ("Oct 2026", en-US short month, America/Los_Angeles); h3 28/38.5 black balance, row-hover gray-30; category right-hand (≥768) or under the title. 10 rows, "Load more" (`px-6 py-3 rounded-xl border gray-80 detail-mono gray-30`, hover border gray-30 + black) adds 10; all 159 after 15 clicks. `?q=` filters by title / category name, shows "N results", drops the bento offset.
5. **Search modal** (portal to body, z 999): overlay `bg-black/60`; ≥768 panel `max-w-2xl rounded-2xl` at `pt-[12vh]` (672×617 at y 196), <768 bottom sheet `rounded-t-2xl max-h-[90svh]` with a 36×4 handle (390×601 at y 243). Header row `px-5 py-4 border-b gray-90`: 20px icon, search input (`@tailwindcss/forms` base: 8px 12px padding, 1px border, radius 0; focused it keeps the plugin's `#2563eb` border because the ring is removed but not the border colour; 48 tall at 1440, 41 at 390), clear "×" when non-empty, "Esc" chip (≥768) / "Cancel" (<768). List `max-h-[55vh]` overflow auto `overscroll-contain`; label "Recent posts" / "N results"; rows `px-5 py-3.5` 70 tall (61 at 390): body2 title (query highlighted with `mark bg-black/10`), detail-mono category, date (≥768). Footer (≥768) "↑↓ Navigate · ↵ Open · ⌘K to search".

## Motion
| Element | Trigger | Start → End | From → To | Ease / dur | Notes |
|---|---|---|---|---|---|
| Bento card (BaseCardViewportEntrance, scaleDir "none") | slot IntersectionObserver, threshold 0.12, rootMargin `0 0 −6% 0`, one-shot | — | `{scale 1, opacity 0, x 0, y 16}` → `{1, 1, 0, 0}` (cards already in view at layout are set final) | 0.6s, delay 0.05·min(i,3), **power1.out** | Scale passes `ease: "cubic-bezier(0.23, 1, 0.32, 1)"`, which GSAP can't parse, so the tween falls back to GSAP's default power1.out. Measured at 390 (tile 2, 50ms steps): opacity Scale .085 .240 .289 .503 .614 .710 .793 .861 .916 .958 .985 .999, clone .056 .208 .349 .479 .593 .692 .774 .849 .907 .951 .980 .997 (same curve, sampling phase) |
| Bento title | same visibility | — | AnimatedText default intro (`animateIn({ delay .05, duration 1.2 })`; the default intro ignores duration) | lines yPercent 400→0 1s power3.out (+0.08/line), words x 30%→0 0.9s stagger .03, tint #72CE7B→#79648C→final | first line translateY 121 → 0 at 390 on both (30.25px line ×4) |
| Bento image wrapper | ScrollTrigger trigger = card | top bottom → center center, scrub true | scale 1.08 → 1 (mapRange, clamped) | linear | willChange `transform` while active, `auto` after. 1440 tile 2 at 10 scroll steps: 1.0661 1.0595 1.0528 1.0463 1.0397 1.033 1.0264 1.0198 1.0131 1.0066 1 on **both**; 390 tile 3: 1.08 1.072 1.0641 … 1.008 1 on both |
| Bento image hover | pointer over the image wrapper | — | `scale` 1 → 1.05 | 1s `cubic-bezier(0,0,.2,1)` | the chip and title boxes (z-10) are outside the hover group, so hovering the title doesn't zoom. Samples at 250 / 500 / 1000ms: Scale 1.0264 / 1.0407 / 1.0500, clone 1.0236 / 1.0393 / 1.0499 |
| Pills / rows / buttons | hover | — | colours | 150ms `cubic-bezier(.4,0,.2,1)` | Tailwind v4 hover only on `(hover: hover)` |
| "More" chevron | click | — | rotate 0 ↔ 180° | 150ms | |
| Mobile rail | mount + category change | — | `[aria-current]` scrolled to centre | smooth | /blog/category/research at 390: scrollLeft 925 Scale / 903 clone (pill widths, font) |

No other scroll or reveal motion on the page (hero and list are static). Reduced motion: titles visible (`.pending` only applies under `no-preference`), no entrance, no scrub.

## Data and assets
- `snapshot.ts`: all 164 posts of the `/blog` RSC payload (slug, title, ISO date, primary category, `categories`), Scale's order. Category pages are derived from it with Scale's rule. No runtime CMS fetch.
- `public/scale-clone/blog/<slug>.webp` ×5: the bento covers, 1600 wide (Sanity originals 1920–5864 wide), 22–185 KB.
- Post links go to `https://scale.com/blog/<slug>` (`hrefs.postBase`; no post pages in the clone), pills to `/scale-clone/blog/category/<slug>/`.

## Reuse (Vahue /blog)
- `BlogPage({ content, activeCategory, as })`; `content: BlogContent` = `{ hero, tags, posts, bento, bentoCount, hrefs, labels }` (plain data, server-safe). `bento[]` takes `{ slug, image, imageAlt?, variantOverride?, imageGradientOverlay?, swatch? }`; `hrefs` = `{ all, categoryBase, postBase, trailingSlash? }` (or per-post `href`); `labels` holds every UI string (pills, list, search modal).
- Category route: copy `app/scale-clone/blog/category/[slug]/page.tsx` with the Vahue content.
- The `titleOnly` slot variant (Scale's slot 0 default, overridden on /blog) is rendered as caption; set `variantOverride` on the first entry as Scale does.

## QA
Side-by-side composites (Scale left, clone right) every 50% viewport: `1440-00..06.jpg`, `390-00..11.jpg`. Interaction shots: `interactions/<w>-{tile-hover,more-open,row-hover,search-open,search-typed,cat-top}-{scale,clone}.jpg`. Scripts: `scratchpad/blog-audit/pw/{probe,qa,dbg,dbg2,sweep}.js`.
- 1440: document 3465 = 3465. Every anchor matches: pills 366, bento 432 (777 tall), slots 496 / 496 / 791 / 865 / 865 with identical sizes, "More Posts" 1209, first row 1269, Load more 2461, footer 2567. After one "Load more": 20 rows, 4580 tall, scroll unchanged (2032) on both; all: 159 rows, 20344 on both. `/blog/category/research`: 2590 = 2590, 10 rows, More button black "Research".
- 390: anchors match down to the list (hero, rail 339, bento 390 + 4×280 tiles, label 1654, first row 1713); the 10 list rows wrap a little shorter in the Vahue face (row 0 231 vs 230; document 5234 vs 5156, of which 40 is the shared footer).
- Clone: 200, no console errors or warnings during load, scroll and the interaction run.

## Interaction inventory (2026-11-01)

Method: REA listeners on each section root and child (table above); handlers traced to modules 507457 / 813045 / 603626 / 808358 / 317967 / 189756 / 668761 in the downloaded chunks (sha256 above). Playwright drove identical inputs on scale.com and the clone (fresh page per part, OneTrust hidden): card entrance sampled every 50ms, image scrub at 10 scroll steps, image hover (bare image, then over the title, then leave) at 250/500/1000ms, pill / More / item hover, More open / item hover / outside click / toggle, search open (Lenis state, html overflow, focus), wheel outside the panel and over the list, ↓↓, 9×↓, ↑, typing, no-match, clear, Esc, ⌘K, backdrop click, Enter, row hover, Load more (once and to the end), programmatic focus on every focusable, category page rail.

### Fixes in this pass (vs the WIP clone)
- Scale's copy, 164-post snapshot, the 5 real bento covers, Scale's 19 tags and the category routes (WIP had placeholder text, 19 invented tags, gradient thumbs and in-place filtering).
- Card entrance ease power1.out (WIP used the literal cubic-bezier through CustomEase, which Scale never gets).
- Image hover moved to the image wrapper's group and to the `scale` property (WIP zoomed on any hover of the tile, including the title, on `transform`).
- Desktop text-tone sampling (Qatar chip label turns dark) and the white overlay shade for bright overlay covers.
- 5th tile appears after hydration on desktop only (useSyncExternalStore, server snapshot undefined), not with CSS.
- Search modal stops Lenis (`html.lenis-stopped`, overflow clip) instead of `data-lenis-prevent`; Enter navigates; forms-plugin input box with the blue focus border; title-only matching; ⌘K chip line box (search button 40 tall).
- `?q=` list filter + "N results" + "No results found"; list wrapped in Suspense with Scale's `py-16` fallback.
- Focus: pills, search, More, Esc / Cancel / clear and modal rows `outline-style: none` (app preflight gave a 3px ring on buttons); tiles, rows and More items show the UA ring at 1px offset (app `a { outline }` reset hid it); buttons default cursor.
- Mobile rail scrolls the active pill into view on mount too (Scale's effect has no mount guard).

### 1 · Hero
Static server markup, no listeners. Reproduced.

### 2 · Tag bar (507457 `n`)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| pill (Link) | hover / click / focus | HubSpot `mousedown` + Next `click` (`ev_0513e589a80d…`) | 507457 | idle `#F2F2F2`/`#575757` → hover `#EAEAEA` 150ms, cursor pointer on both; click navigates to the category route; focus outline-style none | yes | `*-cat-top-*` |
| "More" button | hover / click | HubSpot + React click (`ev_fe1b2aae2b08…`) | 507457 | hover `#EAEAEA`, cursor default; click toggles; panel 208×509 at +6px, items 36px, item hover `#F2F2F2` + black: identical; chevron rotate 180° | yes | `1440-more-open-*` |
| "More" panel | document mousedown outside | document listener (source) | 507457 | outside mousedown closes; mousedown on the button itself doesn't, its click toggles closed (both) | yes | — |
| More item | click | Next Link + `onClick` close | 507457 | navigates and closes | yes | — |
| search button | hover / click / focus | HubSpot + React (`ev_3babf63a9f2e…`) | 507457 | 224×40, border `#C7C7C7` → `#575757`, text → black; opens the modal; outline none | yes (**fixed** height, outline) | — |
| mobile rail | mount / category change | — | 507457 `useEffect([l2])` | `scrollIntoView({ block nearest, inline center, smooth })` on the first `[aria-current]` | yes (**fixed** mount) | `390-cat-top-*` |
| ⌘K / Ctrl+K | keydown | window (source) | 507457 default | toggles the modal, preventDefault | yes | — |

### 3 · Bento (808358 / 317967 / 189756)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section root | — | none (`ev_81010d3570fd…`) | 808358 | IntersectionObserver per slot (0.12, `0 0 −6% 0`), reset when the tile list changes | yes | — |
| card | scroll into view | IO | 317967 `BaseCardViewportEntrance` | see Motion (power1.out 0.6s, y 16, delay 0.05·min(i,3)) | yes (**fixed** ease) | — |
| title | scroll into view | IO | 668761 | AnimatedText default intro, delay .05 | yes | — |
| image wrapper | scroll | ScrollTrigger | 808358 | 1.08 → 1 scrub, identical samples | yes | — |
| image | pointer over bare image | CSS `group-hover/caption` | 808358 | `scale` 1.05, 1s ease-out; not over title/chip | yes (**fixed**) | `*-tile-hover-*` |
| tile link | click / focus | HubSpot + Next `click` (`ev_0372bd7beeee…`) | 808358 | cursor pointer; UA focus ring (offset 1px) | yes (**fixed** ring) | — |
| cover tone | idle callback | — | 808358 | desktop only; Qatar → chip label `rgb(16,16,16)` on both | yes (**added**) | — |

### 4 · List (813045 / 603626)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| row | hover / focus / click | HubSpot + Next `click` (`ev_0cc3af7fb0ca…`) | 603626 | bg `#F2F2F2`, title `#575757`, 150ms; cursor pointer; UA ring | yes (**fixed** ring) | `*-row-hover-*` |
| Load more | hover / click | HubSpot + React (`ev_4b56223fde18…`) | 813045 | border `#575757` + black, cursor default; +10 rows, scroll unchanged; hidden at the end (159) | yes | — |
| `?q=` | URL | `useSearchParams` | 813045 | title / category filter, "N results", no bento offset, "No results found" | yes (**added**) | — |

### 5 · Search modal (507457 `w`)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| open | button / ⌘K | — | 507457 | Lenis `stop()` → `html.lenis.lenis-stopped`, html overflow `clip`, scroll 0 kept; input focused after 50ms; "Recent posts" = first 8 posts | yes (**fixed**) | `*-search-open-*` |
| wheel | outside the panel / over the list | Lenis (stopped) | Lenis + `allowNestedScroll` | outside: page doesn't move (0 on both); over the list at 1440: list scrollTop 0 → 78 (its max), page 0, on both | yes | — |
| keys | ↓ / ↑ / Enter / Esc | window keydown (source) | 507457 | ↓ clamps at the last row and scrolls it into view (`nearest`, list 66 on both); a stationary pointer over a row re-highlights it after each scroll (Chrome's synthetic mouseover; same on both); Enter closes and navigates; Esc closes and restarts Lenis | yes | — |
| typing | input | React onChange | 507457 | 200ms debounce, 8 hits, "N result(s)", highlight `mark`, clear "×", "No results for “…”" | partly: local title match on the snapshot instead of Algolia (see gaps). "research": the same 3 posts on both (order differs) | `*-search-typed-*` |
| overlay | mousedown on the backdrop | React onMouseDown | 507457 | closes | yes | — |
| result row | hover / click | React onMouseEnter + Link | 507457 | hover highlights (bg `#F2F2F2`), click closes + navigates | yes | — |

## Remaining gaps
- Fonts: Vahue display / mono instead of Aeonik / Aeonik Mono, so mono pills run a little narrower (the "More" button sits at x 661 vs 675) and the 390 list rows wrap slightly differently (document 5156 vs 5234, 40px of it the shared footer).
- Search: Scale queries Algolia (relevance ranking, typo tolerance, whole-site blog index with 129 hits for "scale"; "nvidia" returns 0 there). The clone filters the 164-post snapshot by title, keeps index order and caps at 8; same debounce, labels and keys.
- No post pages: post links and Enter go to scale.com.
- Category swatches use the slot colours (Scale's category objects carry no colour today, so it does the same).
- `titleOnly` bento variant not built (unused on /blog).
- The dev-only Next.js indicator shows in the clone screenshots.

## REA evidence
- `analyze_web_bundle` `ev_fd734f31c7fc0abb…` (51 scripts, Algolia routes, chunk hashes).
- `inspect_web_event_listeners`: BlogPreview root `ev_81010d3570fd…`, tile `ev_0372bd7beeee…`, pill `ev_0513e589a80d…`, More `ev_fe1b2aae2b08…`, search `ev_3babf63a9f2e…`, row `ev_0cc3af7fb0ca…`, Load more `ev_4b56223fde18…`.
- Source modules read: 507457, 813045, 603626 (`126gr-esjog6p.js`); 808358, 189756, 317967/598042, 280239, 167360, 995634 (`3dnh8g0pvq60q.js`); 668761 AnimatedText (`1h0nvyhf5gbrf.js`); 367272 media-query hook.
