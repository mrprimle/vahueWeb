# labs.scale.com stack (REA, 2026-11-01)

labs.scale.com is a separate site from scale.com. It has its own Next app, CSS system, header and footer, and it
shares none of scale.com's chunks or motion libraries: no GSAP, ScrollTrigger, SplitText, Keen or Embla. All five
labs clones share this stack: `labs`, `labs-papers`, `labs-leaderboard`, `labs-blog` and `labs-jobs`.

Evidence: REA `analyze_web_bundle` `ev_4dd6a911bd9264d6…` (30 scripts, parse complete) and
`inspect_web_event_listeners` `ev_a09eea92f118…` (hero) and `ev_55bb590619a9…` (blog carousel). The chunk sources
were also downloaded with curl so their code could be read (`scratchpad/labs-dl/chunks/`).

## Framework
| Item | Value | Evidence |
|---|---|---|
| Framework | Next.js App Router 16.3.6, Turbopack build (`/_next/static/immutable/chunks/*`, `turbopack-*.js`), RSC payload | `3k3q0u73winx8.js` ("16.3.6"), REA vendor fingerprint |
| Source path | `/vercel/path0/apps/labs/app/(home)/…`, a monorepo app deployed on Vercel | WGSL module header in `10l5gu25zzpir.js` |
| CMS | Sanity (`cdn.sanity.io/images/50zba0eo/labs/…`) through `next/image` | SSR markup |
| CSS | Tailwind **v4** (`@supports color-mix`, `--tw-*`, `--spacing` calc), shadcn/ui + Radix (Dialog), cmdk; KaTeX and Plotly styles bundled | `3mzo0hj4e57ag.css` (118 KB), `3j59e9cio-0ok.css` |
| Fonts | `inter` = InterVariable (`--font-brand`, `--font-sans`, `--font-body`) and GeistMono Variable (`--font-geist-mono` → `--font-mono`). Both are self-hosted woff2 under OFL | `@font-face` in the CSS, `<link rel=preload>` |
| Icons | lucide-react (search, menu, x, arrow-right, arrow-down, chevron-left/right) | SSR `class="lucide lucide-*"` |
| Search | Inkeep `InkeepModalSearchAndChat`, a 1.5 MB lazy chunk (`25n1aq7vxfxt3.js`, `1j-kp-07hrdzk.js`) that loads after mount (`ssr:false`). Settings: apiKey `bb21…`, `primaryBrandColor #6a5df9`, forced light mode, overlay zIndex 1e4, placeholder "Search Scale Labs", `maxResults 40`, `debounceTimeMs 300`, links open in a new tab, AI chat avatar `/images/triangle-nav-logo.png` | `2bejownx-dgf7.js` module 595877 |
| Forms | HubSpot embed (`portalId 4823527`; newsletter form `e0060b3b-d3cc-4193-b24c-9ca1a4adc1ce`) inside a Radix Dialog | `043v05hl3en9y.js` module 385368 |
| Analytics | GTM `GTM-K5V8KH6D` and a first-party `/62f5bf111a09ed24/script.js` | SSR |

## Design tokens (Tailwind v4 theme)
- Colours:
  - `--color-ink #111`, `--color-ink-dim #333`, `--color-ink-faint #999`, `--color-hairline #d9d9d9`
  - neutral-50 to 800 use the Tailwind hex values (`#fafafa #f5f5f5 #e5e5e5 #d4d4d4 #a3a3a3 #737373 #525252 #262626`)
  - `--radius: 0rem`, so every `rounded-*` derived from it is 0
- Type: these line heights differ from the Tailwind defaults, so the clone uses explicit `leading-[…]`:

  | Size | Value / line height |
  |---|---|
  | `--text-xs` | .75rem / **1.5** |
  | `--text-sm` | .875rem / **1.5** |
  | `--text-base` | 1rem / 1.65 |
  | `--text-2xl` | 1.5rem / **1.5** |
  | `--text-3xl` | 1.875rem / **1.5** |
  | `--text-4xl` | 2.25rem / **1.25** |

  - leading: `snug 1.375`, `relaxed 1.625`, `tight 1.25`
  - tracking: `wide .025em`, `wider .05em`
- Default transition: `.15s cubic-bezier(.4,0,.2,1)`. **Global override:** `@media (prefers-reduced-motion:no-preference){ html.loaded *{transition:background-color .2s ease-in-out, border-color .2s ease-in-out, color .2s ease-in-out} }`.
  - `html.loaded` is added 100 ms after mount (ThemeProvider, `2ri_cj1i8zivb.js`).
  - From then on, every hover colour change runs 200 ms ease-in-out.
  - Opacity and transform utilities change instantly, because `transition-opacity` / `transition-transform` lose to the higher-specificity rule. Examples: the paper preview crossfade and the arrow nudges.
- The labs Tailwind build has no tailwindcss-animate utilities, so the shadcn `data-[state=open]:animate-in zoom-in-95 …` classes on DialogContent do nothing. Dialogs open and close instantly (measured: opacity 1, transform none 90 ms after the click).

## Motion and interaction libraries
| Library | Version | Where | Params |
|---|---|---|---|
| Lenis | **1.3.21** (`window.lenis.version`) | home route only: `if (pathname !== "/") return` (`2ri_cj1i8zivb.js`) | `new Lenis({ lerp: 0.1, smoothWheel: true })` with its own rAF loop `requestAnimationFrame(function t(n){ l.raf(n); requestAnimationFrame(t) })`, no GSAP ticker. Other options are defaults: wheelMultiplier 1, touchMultiplier 1, syncTouch false |
| framer-motion (`motion`) | bundled in `0403flr97lhsv.js`; version string not shipped | `ScrollReveal` (module 953971) | `initial {opacity:0, y:14}`, `whileInView {opacity:1, y:0}`, `viewport {once:true, amount:0.06}`, `transition {duration:0.5, delay:0, ease:[0.16,1,0.3,1]}` |
| @vgpu (Scale-internal WebGPU lib) + `@vgpu/wgsl-std` | n/a | home hero `WgslGridBg` (module 539120) | WGSL `grid-bg.wgsl` (simplex field, 80 px cells, pointer spotlight). Effect `hero-grid`, premultiplied blend, dpr [1,2], `mouse_radius 210`, strength eased `+= (target − s) * 0.12`, time in seconds, reduced motion freezes time at 8. Falls back to `AnimatedGridBg` (2D canvas) when `navigator.gpu` is missing or a GPU error occurs |
| Radix Dialog (shadcn) | n/a | newsletter dialog | `bg-black/80` overlay, `max-w-lg`, `rounded-none`, `border-neutral-200`, close X `h-3.5`, no animation (see above) |

GSAP, ScrollTrigger, SplitText, three.js, Keen Slider, Embla and Rive are **not** loaded on labs.
- The `three` and `rive` grep hits were false positives: d3 and Plotly identifiers.
- The blog carousel is a native `overflow-x-auto snap-x snap-mandatory scroll-smooth` strip with `scrollBy` buttons.

## Clone implementation (components/scale-clone/labs-shared/)
| File | Mirrors |
|---|---|
| `LabsShell.tsx` | labs root layout: fonts, tokens, header, `<main>`, footer. `smoothScroll` prop is for Lenis on the home page only; `searchItems` feeds the static search index |
| `LabsHeader.tsx` | UnifiedHeader: sticky h-14 `bg-white/70 backdrop-blur-xl`, bracketed nav with active state, ⌘K / Ctrl+K `document` keydown, mobile menu panel |
| `LabsSearch.tsx` | static stand-in for the Inkeep modal (same chrome; filters a static index, no API) |
| `LabsFooter.tsx` + `LabsDialog.tsx` + `countries.ts` | UnifiedFooter + Radix dialog + HubSpot form markup (validates, never posts) |
| `LabsLenis.tsx` | Lenis `{lerp:0.1, smoothWheel:true}`, own rAF loop. Repo has lenis 1.3.26 vs labs 1.3.21; behaviour identical in QA (wheel 400 px → 132/201/291/370/397 px at 50/100/200/400/800 ms on both) |
| `LabsLoaded.tsx` | the `html.loaded *` 200 ms transition override (scoped `html.labs-loaded`, removed on unmount) |
| `ScrollReveal.tsx` | framer ScrollReveal reproduced with IntersectionObserver (threshold .06) + WAAPI on the same cubic-bezier, because the repo has no framer-motion |
| `WgslGridBg.tsx` + `gridBgWgsl.ts` | hero WebGPU grid on the raw WebGPU API with Scale's WGSL verbatim (fullscreen-triangle vertex stage added) |
| `AnimatedGridBg.tsx` | 2D-canvas fallback, ported 1:1 (same float hash) |
| `labs.module.css`, `fonts.ts`, `icons.tsx`, `links.ts` | tokens, the fonts labs ships, lucide paths, route mapping (`/papers` → `/scale-clone/labs-papers/`, …) + Button variant classes |

Routing: `components/scale-clone/shared/CloneChrome.tsx` lists `/scale-clone/labs` and `labs-papers`, `labs-leaderboard`, `labs-blog` and `labs-jobs` in `OWN_CHROME`. The scale.com `ScaleHeader`, `ScaleFooter` and the scale.com Lenis (lerp 0.14 on the GSAP ticker) therefore don't render on labs routes.

Each later labs page wraps its content in `<LabsShell>` with no `smoothScroll` (labs runs Lenis on `/` only). It reuses `ScrollReveal`, the `BTN_*` classes and `labsHref`.
