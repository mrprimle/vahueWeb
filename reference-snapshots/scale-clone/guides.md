# scale.com/guides → /scale-clone/guides

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + system Chrome, scrolled in 50%-viewport steps), plus REA against an isolated CDP tab (port 9230).

Files: `app/scale-clone/guides/page.tsx`, `components/scale-clone/guides/{GuidesPage.tsx, FullBleedMedia.tsx, FlatCta.tsx, animatedText.ts, guides.module.css}`, `public/scale-clone/guides/prefooter.jpg`.

## What the page is

An index page with a fixed list of 12 guides drawn as "books". **There are no filters, tabs, search or pagination on scale.com/guides.** The cards are server-rendered; their hover is pure CSS. The only JS motion on the page body is the shared pre-footer.

## Sections (top to bottom)

### 1. Hero (CMS SectionHeader)
- `section.py-16 md:py-24` (64 / 96px) > `max-w-[1472px] px-6` container > centred column `max-w-3xl text-center mb-10 md:mb-20 md:mt-12`.
- Overtitle: mono, 12px / 24px, +1px tracking, uppercase, `#525252`, mb 20.
- H1: 30px / 1.375 (mobile), 42px (md), 48px / 1.25 (lg), weight 400, −0.01em, black, balanced.
- Sub: 16px / 1.6 → 20px / 1.6 (lg), `text-black/70`, mt 16 → 8 (lg), balanced.
- Measured positions match: h1 at y 227 (1440) / 210 (390); p at 295 / 267.

### 2. Book grid
- `section.pb-20` > container > `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8` (columns 324px at 1440).
- Each card `a.book`: 280×376, `margin: 2.5%` (of the grid cell), so it sits 8px in at 1440 and is left-aligned (not centred) on mobile.
  - `.bookCover`: absolute, z 1, radius 2px, `transform-origin: 0`, `transition: transform .3s ease-out, box-shadow .3s ease-out`. Colour cycles through 5: `#212121, #193A29, #273252, #79648C, #A8927C`.
  - Inner `absolute inset-0 p-8 flex-col justify-between`: top row = 80×20 brand mark (left) + index `01`… (detail-mono, 10px → 13px at md, 1.2, uppercase, white/50); bottom = h3 (header5-regular: 22px / 1.05 → 24px / 1.5 at md, weight 400, white, balanced).
  - `.effect` (spine sheen): 20px wide, ml 8, `linear-gradient(90deg,#fff3,#fff0)`, width transition .3s.
  - `.light`: 90% wide, right-aligned, opacity .1, `linear-gradient(90deg,#fff0,#fff3)`, radius 3.
  - `.bookInside` (page block behind the cover): white, 1px `#d4d4d4`, radius 3, width calc(100% − 2px), height 96%, top 2%, page-edge stack of inset shadows plus `0 20px 25px #4a4a8b1a, 0 10px 10px #4a4a8b0a`.
- **Hover** (CSS only): cover `transform: perspective(2000px) rotateY(-30deg)` + `box-shadow: 10px 0 10px -5px #00000030`; `.effect` width → 40px; `.light` opacity → 1, width → 70%. Sampled computed transform on both sites: `matrix3d(0.866025, 0, 0.5, -0.00025, …)`.
- Clone adds the same state on `:focus-visible` (keyboard parity; Scale has none).

### 3. Pre-footer (FullBleedMediaSection in ClipScrollSection)
- `div.pb-8` > ClipScrollSection (`px-4`, white backdrop) > clip container > `section` radius 24 > `relative p-8 md:p-16 min-h-[480px] md:min-h-[720px] flex items-end`.
- Text block `max-w-[72rem] gap-6`: h2 header2 `clamp(2rem, 0.5rem + 5vw, 4rem)` / 1.05, −0.01em, white; CTA row `flex-col md:flex-row gap-4`.
- CTA: FlatCta `arrow` variant, theme white (bg white, label 14px/500, 32px black icon box radius 6, chevron track slides on hover 600ms).
- Media: `prefooter.jpg`, object-cover, bg `#193A29`; overlay `.media-overlay` = `linear-gradient(#0000, #000)` (its `background` shorthand cancels the `bg-black/45` class).
- 1408×720 at 1440; 358×480 at 390.

## Motion table

| Element | Trigger | Start → End | From → To | Ease / duration | Notes |
|---|---|---|---|---|---|
| Book cover | `:hover` | — | `none` → `perspective(2000px) rotateY(-30deg)`, shadow | `ease-out` 0.3s | CSS module `cfo7JW_*`, no JS |
| Book spine `.effect` | `:hover` | — | width 20 → 40px | ease-out 0.3s | |
| Book `.light` | `:hover` | — | opacity .1 → 1, width 90% → 70% | ease-out 0.3s | |
| Pre-footer clip | ClipScrollSection wrapper | `top bottom` → `center center` (scrubbed via onUpdate) | `clip-path: inset(5% round 1.5rem)` → `inset(0%)` | linear | `startPercentage: 10` (default, not overridden), `startScale: 1`, `borderRadius: 1.5`; live sample: `inset(5% …)` at entry, inner `transform: scale(1)` |
| Pre-footer media | `section` | `top bottom` → `center center` | scale 1.25 → 1 | linear (mapRange) | live sample: media box 1760×900 over a 1408×720 section at entry (= 1.25) |
| Pre-footer h2 | `section`, `top center`, retroactive onEnter, once | — | AnimatedText: lines `yPercent 400, opacity 0` → 0/1 (1s power3.out, 0.08 per line); words `x 30%` → 0 (0.9s power3.out, stagger 0.03); colour tint #72CE7B → #79648C → CSS colour | delay 0 | SplitText `lines,words`, mask lines, descender compensation 0.12em |
| Pre-footer CTA | same | — | `filledWhiteArrow`: root `autoAlpha 0, scaleX 0, radius 0` → 1/1/8 (0.85s power3.out); counter scaleX 0 → 1 at +0.1; label opacity at +0.75; arrow x −6 → 0 (power3.inOut) | delay 0.5 | `introAnimation:"filledWhiteArrow"` passed explicitly for the primary CTA |
| Lenis | layout-level | — | — | lerp 0.14 | shared (app/scale-clone/layout.tsx) |

## Libraries / evidence

- REA `analyze_web_bundle` (evidence `ev_3d225b1bc491f229345bc1d0dd0e94a211389633a6f6377b607e3b3eb824db4d`): 50 scripts parsed, 0 failures; fingerprints Next.js (turbopack chunk `turbopack-1byz1flvc-bu1.js`) and React. Routes found include `/static/img/reskin/prefooter-default.jpg` (chunks `16de7iwtp9u2l`, `3dv487ny3arpm`, `37xz28pjbnlx4`).
- Versions grepped from the same chunks: GSAP **3.15.0** (`2d7ykwtxp_8ed.js`), Lenis **1.3.21** (`2fbrdg5m4_g_8.js`), Next 16.4.2 string in `0m6y-zqxv6dk8.js`. three.js is bundled (`3kd41k7ews14b.js`, WebGL extension probes) but nothing on this page mounts a canvas.
- Pre-footer source: chunk `37xz28pjbnlx4.js`, module 540431 (`FullBleedMediaSection` defaults `startPercentage:N=10`, `overlayVariant:"flat"`, scale tween `mapRange(progress,0,1,1.25,1)` on `start:"top bottom", end:"center center"`, text/CTA intro on `start:"top center"` with `retroactiveOnEnter`); FlatCta intros in module 961870 (same chunk).
- The book component's JS is not in any client chunk (`bookInside` / `cfo7JW` absent from all 40 downloaded chunks): it is a server component; the styles live in `2h0gxg24im1sd.css`.
- REA `inspect_web_event_listeners`:
  - `a[class*="_book"]` (evidence `ev_f4f0125adafc898a9f8c6434d5696f6c42f5a8d3dd0c29fdfd005ba334e4fa96`): `mousedown` (HubSpot analytics `js.hs-analytics.net`), `click` (Next Link, chunk `42ixmvih7808g.js`). No hover/pointer JS: the book animation is CSS-only.
  - `.FullBleedMediaSection a.FlatCta` (evidence `ev_647eeccd25cb2bc4e48a4a7c1741df487e86cc24f60b1ced67e2f3ad673bb681`): `mousedown` (analytics), `click` (Next Link). Hover fill is React state + CSS transitions (as in the other clones).
  - `.ClipScrollSection` (evidence `ev_7137f8ab87e1141a27962d48dd0341acd2fd5f495f14123b4e747a6c4970db05`): no listeners (ScrollTrigger-driven).
- No carousels (Keen/Embla), no SplitText outside the pre-footer h2, no Rive, no pointermove handlers on this page.

## Assets
- `public/scale-clone/guides/prefooter.jpg`: Scale's `/static/img/reskin/prefooter.jpg` (7952×3654) downscaled to 2560px wide, q75 (325 KB).
- Not shipped: the Scale wordmark SVG printed on every cover (80×20). Replaced by a neutral white square + bar tile of the same size (`CoverMark`, TODO Vahue mark).

## Shared components reused
`FullBleedMedia.tsx`, `FlatCta.tsx` and `animatedText.ts` are copies of the security clone's files (they port the same Scale modules). I re-checked every value they use against this page's own chunk (`37xz28pjbnlx4`, module 540431: same defaults, CTA intro `filledWhiteArrow`, no `startPercentage` override) and against live samples (clip inset 5%, media scale 1.25 at entry).

## QA
Screenshots in `reference-snapshots/scale-clone/qa/guides/` (`1440-{scale,clone}-00…06`, `390-{scale,clone}-00…09`, `1440-{scale,clone}-hover`).
- Body positions match to the pixel at both widths: h1, sub, first book, h3, index, pre-footer h2 (y 2381 at 1440, 5910 at 390), footer start (y 2608 at 1440, 6109 at 390). Page height 3506 at 1440 on both sites.
- Placeholder titles are tuned so each book wraps to the same number of lines as Scale's at 24px and 22px.
- Hover transform matrix identical on both.
- Clone: HTTP 200, no console errors; `tsc` clean for these files.

## Remaining gaps
- At 390 the page is 40px shorter (7429 vs 7469). The difference is entirely in the shared footer (its closing statement wraps to 3 lines instead of 4); the page body matches.
- The announcement bar above the header is owned by the shared header and wasn't visible in the clone's screenshots; body offsets still match.
- Book links point to `#` (Scale links to each guide's page).
