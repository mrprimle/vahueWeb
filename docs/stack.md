# Stack

Read from live scale.com on 2026-11-01 with REA (`analyze_web_bundle`, evidence `ev_d7cc728a0bb11db2…`, 52 of 52 scripts parsed, listeners `ev_7983bf50ef104d65…`), plus every chunk from all 27 scale.com pages (`curl`, then read by module). Earlier notes said Lenis `lerp .14` only and listed Rive: both were incomplete or wrong, see below.

| Layer | Scale | This repo | Evidence |
|---|---|---|---|
| Next.js (App Router, Turbopack) | 16.4.2 | 16.4.2 | `window.next={version:"16.4.2"}` in `0m6y-zqxv6dk8.js`; `turbopack-*.js` chunk |
| React | 19.3.0-canary-278794d7-20261002 | Same build: Next 16.4.2 vendors exactly that canary for the App Router. `react` 19.3.1 in package.json satisfies the peer range | `version` in `42ixmvih7808g.js`; `node_modules/next/dist/compiled/react` |
| Tailwind | v4 (`@layer properties`, `@theme` output). The build strips the banner, so the patch is not recoverable | 4.3.3, with `@tailwindcss/forms` and `@tailwindcss/typography`, both visible in Scale's CSS | `3ektzubma58z1.css` |
| GSAP | 3.15.0: ScrollTrigger, SplitText, MotionPathPlugin registered at root; `useGSAP`; CustomEase, Observer in chunks. No Draggable, Inertia, ScrollSmoother use, MorphSVG, DrawSVG | 3.15.0, `@gsap/react` | `registerPlugin(s.C,a.f,o.f,G)` in `2d7ykwtxp_8ed.js` |
| Lenis | 1.3.21, `lenis/react` root | 1.3.21 | `var e="1.3.21"` in `2fbrdg5m4_g_8.js` |
| three | r181 | 0.181.0 | `Tu,0,"181"` and `window.__THREE__` in `03y-xx97vmxcv.js` |
| Keen Slider | yes (6 chunks, version string not shipped) | 6.8.6 | `data-keen-slider-` |
| Embla | yes, 8.6-era options (`watchFocus`) | `embla-carousel-react` 8.6.0 | `dragThreshold:10` in `0sni47mcvnqwg.js` |
| Rive | **Not used.** No `rive`, `@rive-app`, `.riv` or state machine in any of the 122 chunks fetched (HTML and lazy references). The old note matched "derive" and "drive" | not installed | word-boundary scan |
| Others | Vidstack and prism-react-renderer (`/automotive`, in package.json), zustand (stores), clsx (`cn`, no tailwind-merge), lucide (icons), Headless UI `Transition` and react-type-animation (module 386218 in `1a9k8nwrsxal6.js`), Radix Dialog and Tooltip, react-spring (`2oqqgjzhyolwf.js`), TanStack Query, Sanity CMS, Plasmic CSS | zustand, clsx, lucide-react, `@headlessui/react` 2.2.9 and `react-type-animation` 3.2.0 (chat window, `/data-engine`; versions chosen, not read from Scale). `framer-motion` ^12.43.0 (`/experts` tabs; 12.x inferred from module 88653's props, no version string shipped). Add the rest only on the page that needs it | module census |
| Separate sites | `/docs` is Mintlify (`x-mint-proxy-version`). `labs.scale.com` is its own build: its page agents must fingerprint it first | `SEPARATE_CHROME_PREFIXES` in `components/site/SiteChrome.tsx` | response headers |

## Lenis and ScrollTrigger (exact, `2d7ykwtxp_8ed.js` function `eR`)
`ReactLenis root`, options `{ autoRaf: false, allowNestedScroll: true, autoResize: false, syncTouch: matchMedia('(pointer: coarse)').matches, lerp: 0.14, wheelMultiplier: 0.8 }`. `gsap.ticker` drives `lenis.raf`, `lagSmoothing(0)`. `ScrollTrigger.config({ limitCallbacks: false, autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load', syncInterval: 999999999, ignoreMobileResize: true })` and a `scrollerProxy` on `documentElement`. Body `ResizeObserver` and window resize refresh ScrollTrigger after 90ms. Already running in `components/site/SmoothScroll.tsx`: pages do not add their own. Measured: `wheel(500)` samples match Scale (172, 270, 325, 351, 372, 384 …).

## Fonts
Scale: `aeonik` (Aeonik Pro Regular, one 400 face), `aeonikBold` (separate family), `mono` (Aeonik Mono Regular). Weights 500 and 600 therefore land on the Regular face, with synthetic bold from 600.
Here: `app/fonts/Aeonik-Regular.otf` and `Aeonik-Bold.otf` from Mike's licence, same single-face setup and same CSS vars (`--font-aeonik`, `--font-aeonik-mono`). Aeonik Mono is not in the licensed set, so DM Mono stands in. Measured effect: nav labels about 0.5px narrower per word, testimonial chip 2 to 7px narrower, and long quotes can wrap one line earlier. Page agents: report such text deltas as a font gap, not a bug. Scale's slice-specific fonts (New Forest, Test Manuka and others) are not shipped.

## Base CSS
`app/globals.css` is generated from Scale's compiled CSS and holds nothing else: Tailwind theme and preflight, `forms` and `typography` plugins, Lenis CSS, Scale's `h1…p` base rule, body and `::selection` rules, `[data-theme]` nav tokens, `@theme` overrides (`text-*` line-heights differ from Tailwind's defaults, Scale's colours), the `oml:` variant, `xs` breakpoint and all custom classes as `@utility` (`header1…7`, `body1…3`, `detail-mono`, `cta`, `grid-layout-desktop`, `grid-inner-*`, `grid-padding`, `navigation-*`, `text-gradient*`, `media-overlay`…). Checked by compiling Scale's 4,115 class names against it: every class generates, values equal apart from Tailwind's own serialisation. `--breakpoint-3xl` is `90.625rem` (1450px), not `1450px`: Tailwind sorts a px breakpoint before the rem ones, so `lg:` overrode `3xl:`. Scale's CSS has 3xl after xl.

Use Scale's class strings verbatim, with three catches:
- Unitless arbitrary values such as `min-h-[480]` only work in Scale's production CSS minifier. Write `min-h-[480px]`.
- CMS-driven classes (`bg-${color}`) need the name in the `@source inline(...)` line of `globals.css`, or written out in full. Extend that line additively.
- Legacy classes from `1hv5k4cuirvfx.css` (`bg-zeitgeist-*`, `text-overtitle`, `elements-box__wrapper`) and CSS-module rules are not in `globals.css`. Move what a section needs into that section.

## Shared Scale components
Each is ported once from the module named. Before reimplementing something, check `sha256` of the chunk on your page: if your page loads the same chunk, or the module id matches, reuse the port. Modules are often copied into several chunks with different chunk hashes, so the module id is the reliable key. Per-page props (`startPercentage`, `startScale`, `headlineWidth`) live in the page's RSC payload: read them from `self.__next_f` in that page's HTML.

| Component | Path (`components/site/…`) | Scale module | Chunk (sha256 prefix) | On pages | Verified on |
|---|---|---|---|---|---|
| Header, mega-menus, drawer | `Header.tsx` | 511174 | `0sle6wl7ucd3b.js` (`3feec91c51f01f96`) | 27 of 27 | `/data-engine` |
| Footer, AnnouncementBar | `Footer.tsx`, `AnnouncementBar.tsx` | 260646, 677474 | `2psemgdyngpil.js` (`c1ee74222054e241`) | 27 of 27 | `/data-engine` |
| SmoothScroll, RouteEffects | `SmoothScroll.tsx`, `RouteEffects.tsx` | 474053 | `2d7ykwtxp_8ed.js` (`994fce5991b0fb35`) | 27 of 27 | wheel trace |
| FlatCta | `shared/FlatCta.tsx` | 892855 | `1h0nvyhf5gbrf.js` (`10b2627ad0b820eb`) | 27 of 27 | header CTA enter and leave, including the 680ms reset; label scale .9 |
| AnimatedText | `shared/AnimatedText.tsx` | 947153 | same | 27 of 27 | `/about` pre-footer: line, word, colour and opacity at 100ms steps equal to about 1% from the trigger on |
| CMSLink | `shared/CMSLink.tsx` | 463059 | same | 27 of 27 | footer, menus |
| useScrubTrigger, useInViewTrigger | `lib/useScrubTrigger.ts`, `lib/useInViewTrigger.ts` | 681201, 210104 | `37xz28pjbnlx4.js` (`b234eef59feb2f6d`), `0fwc0347bccaa.js` (`c762ac849333c351`) | 24 of 27 | through the sections below |
| ClipScrollSection | `shared/ClipScrollSection.tsx` | 656598 | `0fwc0347bccaa.js` | 24 of 27 | `/about` pre-footer: inset 5%, 3.89%, 2.78%, 1.67%, 0.56%, 0 at 1440, equal |
| FullBleedMediaSection | `shared/FullBleedMediaSection.tsx` | 540431 | same | 24 of 27 | `/about` pre-footer: 720 tall at 1440, 480 at 390 |
| AnimatedFlatCta | `shared/AnimatedFlatCta.tsx` | 961870 | same | 24 of 27 | `/about` pre-footer: opacity, scaleX and radius curves equal; arrow slide and wash on hover equal |
| LogoMarquee, LogoTile | `shared/LogoMarquee.tsx` | 880750 | same | 24 of 27 | not driven on a live page: tiles replace logos |
| ResponsiveVideo, ResponsiveImage | `shared/ResponsiveVideo.tsx`, `shared/ResponsiveImage.tsx` | 310080, 669677 | same, `1h0nvyhf5gbrf.js` | 24, 27 | image in menus and pre-footer; video ported, not driven |
| RichText | `shared/RichText.tsx` | 141280 | `1uasl1k03j0me.js` (`b36b8fd91379adfa`) | 27 of 27 | `/about` cards |
| BaseCard | `shared/BaseCard.tsx` | 317967 | `0b4nb0uzhfrdc.js` (`9ac33c3f0a680250`) | 13 | `/about`: scale and opacity curves within 0.006 |
| CardGrid, Card, LinkCard | `shared/CardGrid.tsx` | 540409, 874328 | same | 12 | `/about` "What we do": 380.9 x 383.8 cards, 689.8 grid, equal at 1440 |
| ClientTestimonials | `shared/ClientTestimonials.tsx` | 685963 | same | 14 | `/enterprise`: panel width curve within 1.1px, tabs and arrows equal, flip and chip sequence equal; height 817 vs 834 is font wrap |
| ScrollRevealSection | `shared/ScrollRevealSection.tsx` | 756386 | `058pnujclak3f.js` (`b0ed240d21441c66`) | 8 | ported, not driven live |
| SectionThemeWatcher, PageThemeSetter | `shared/SectionTheme.tsx` | 995634, 243385 | `058pnujclak3f.js`, `0_fm2xcv8_y2d.js` | 9, 6 | `/enterprise`: flips at scroll + 35 = dark section top, 50ms debounce; bar fades back on the same frames |
| ThreeCanvas | `shared/ThreeCanvas.tsx` | 955774 | `3rls9s4y8-e83.js` | home, `/experts` | hero runtime on `/`; OrbitControls attached as on Scale. `sceneProps` carries Scale's rest props to `preload`, `setup`, `onReady` |
| FullWidthCardCarousel | `shared/FullWidthCardCarousel.tsx` | 424625 | `0sni47mcvnqwg.js` | home | `/`: drag, arrows, keyboard equal |
| BlogPreview, CategoryIcon | `shared/BlogPreview.tsx` | 808358, 189756, 280239 | `3x8z3_0hhtdcb.js` | 9 | `/`: tiles and zoom equal. Video tile branch not ported |
| LogoCloud (with react-fast-marquee on phones) | `shared/LogoCloud.tsx` | 970272, 922998 | `3hpmz3b0is2de.js` | not counted | `/generative-ai-data-engine`: boxes, marquee 8.58s, 50px/s equal. Carousel branch not ported |
| FeaturesWithIcons | `shared/FeaturesWithIcons.tsx` | 460138 | same | 9 | `/generative-ai-data-engine`: 3 columns at 1440, stack at 390, equal. `bgImage` and bullets not ported |
| Vidstack player, Modal, video thumb | `pages/automotive/VideoPlayer.tsx`, `PhaseFeatures.tsx` (page-only for now) | 638474, 832862, 582844, 450359 | `1otcsenms2q_u.js`, `0vl8zp9uyr6-0.js`, `2vj2iettvig10.js` | not counted | `/automotive`: modal timing and close paths equal. `@vidstack/react` 1.15.7 chosen, Scale's patch not shipped in its bundle |
| SectionTitle | `shared/SectionTitle.tsx` | 1900 | `059q_ihpcslaa.js` | not counted | `/generative-ai-data-engine` |
| TabsWithImages, video thumb, modal (Wistia iframe or local file) | `shared/TabsWithImages.tsx` | 753553, 11972, 647980, 582844 | `1x2up343t82em.js` (`23a640e442324ac6`), `3d2zty6gdk3do.js` (`056791f36e8b0937`) | not counted | `/donovan`: pill, keys, dots, swipes, modal equal at 1440 and 390. `ctas` slot not ported |
| GlowBackground | `shared/GlowBackground.tsx` | 799808 (CSS module `_5fl2pa`) | `30w17vppvfdah.js` | not counted | `/generative-ai-data-engine` |
| ResourcesCarousel | `shared/ResourcesCarousel.tsx`, wheel plugin `shared/keenWheelControls.ts` | 382790, 29713 | same | not counted | `/generative-ai-data-engine`: `desktopGrid` off, drag and Tab equal. `/data-engine` keeps its own copy with the grid on |
| EnterprisePillars | `shared/EnterprisePillars.tsx` | 909085 | `1pr295x5wseyf.js` (`597efa5bbfb4cdb2`) | not counted | `/rlenvironments`: icon, rule and text curves equal, 982.2 tall at 1440, 1252.8 at 390. `iconName` branch not ported |
| HeadlineWithCta | `shared/HeadlineWithCta.tsx` | 925107 | same | 8 | `/rlenvironments`, manual animation without a CTA. Own-observer and CTA branches ported, not driven |
| ChecklistWithMedia | `shared/ChecklistWithMedia.tsx` | 872447 | `3_bsw0kgw5l_w.js` (`a08f46ff155ccd7b`) | not counted | `/public-sector-data-engine`: 3 items and image, equal at 11 widths. `mockup` branch (720912, `shared/BrowserFrame.tsx`): `/evaluation/public-sector`, equal at 9 widths |
| FeatureCards | `shared/FeatureCards.tsx` | 15518 | `2zjdhq90n1bat.js` | not counted | `/evaluation/public-sector`: 2 columns from `md`, equal at 9 widths. Borderless and 5-item branches ported, not driven |
| NewButtonLink | `shared/NewButtonLink.tsx`, CSS module `TdsvaW` | 408298 | `2vj2iettvig10.js` | not counted | `/evaluation/public-sector`: black button hover and focus ring equal. Glass, transparent and hash branches not ported (`/automotive` keeps its own glass copy) |
| AlternatingImageRows | `shared/AlternatingImageRows.tsx` | 497052 | `0a0zz4e1l5m3e.js` (`dfe245caffc06abb`) | not counted | `/evaluation/enterprise`: 5 rows equal at 14 widths. `plain` and default image branches ported, not driven |
| SteppedVideo (SgpIntro, SgpFlywheel), ActiveFrame, frame edges | `shared/stepped-video/` | 154479, 668130, 198863 | `0sni47mcvnqwg.js` | not counted | `/genai-portfolio`: WebCodecs bins in `public/static/video/active-frame/`, pins, steps, arrows, keys equal at 1440 and 390. Static-image and `stepsOnly`, `headingPinned` branches not driven |
| TwoColumnTextWithVideo | `shared/TwoColumnTextWithVideo.tsx` | 857484 | same | not counted | `/genai-portfolio`: both `videoFirst` slots, heights equal at 1440 and 390. Non-`videoFirst` branch not driven |
| Faqs | `shared/Faqs.tsx` | 966098 | `058pnujclak3f.js` (`b0ed240d21441c66`) | not counted | `/genai-portfolio`: height curve, clip and `aria-expanded` equal |
| TransparentVideo, ScrollToExplore | `shared/TransparentVideo.tsx`, `shared/ScrollToExplore.tsx` | 553471, 265985 | `1p75rvt-mr0xr.js`, `0sni47mcvnqwg.js` | not counted | `/genai-portfolio`. Safari branch not played |
| VideoGallery (page-level, shared by import) | `components/pages/generative-ai-data-engine/VideoGallery.tsx` | 482270, 832862 | `30w17vppvfdah.js` | not counted | `/generative-ai-data-engine`, `/public-sector-data-engine`: drag, click, dots equal |
| LogoCarousel | `shared/LogoCarousel.tsx` | 236943 | `01xb85jkvr5_y.js` (`dffba02723ca9734`) | not counted | `/enterprise/insurance`: pages of 4, 4.5s, 700ms cross-fade, native row below `md`, equal |
| VideoFeatures (Features with video thumb and modal, Wistia iframe or local file) | `shared/VideoFeatures.tsx` | 450359, 582844, 832862 | `17ea4hx823ss4.js` (`c43bcba50a21f636`) | not counted | `/enterprise/insurance`: 2 items, modal timing, close paths equal at 1440 and 390. `numbers`, bullets, `cta` not ported (`/automotive` keeps its own) |
| GlassButtonLink | `shared/NewButtonLink.tsx` | 408298 glass branch via 51051 | `17ea4hx823ss4.js` | not counted | `/enterprise/insurance`: hover curves equal. Width differs by the arrow glyph |

Other shared modules a page may meet, not ported yet because few pages use them: `MeshGlobeHero` 478135, plus everything in the 975 KB `0sni47mcvnqwg.js` (`SideBySide`, `TabbedPanel`, `MilestoneTimeline`…, 7 pages). If you port one, put it in `components/site/shared` and add a row here.

## Reading Scale's code
- Chunks are Turbopack: `push([..., <moduleId>, e=>{...}, ...])`. Find a module by a class name in it (`"FlatCta group/cta…"`) and read it directly. Fetching chunks with `curl` is cheaper than holding them in a browser.
- Dynamic imports appear as `static/immutable/chunks/<name>.js` inside chunks.
- OneTrust's dark filter covers scale.com in headless sessions and swallows pointer input. In Playwright: `page.route(/cookielaw|onetrust/, r => r.abort())`. This only skips the banner in a throwaway measuring session.
- Do not trust the first scroll sample at 390: scroll with `page.mouse.wheel` when a value looks static.
