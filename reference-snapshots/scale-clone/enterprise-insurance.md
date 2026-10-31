# scale.com/enterprise/insurance → /scale-clone/enterprise-insurance

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + system Chrome, page scrolled in 50%-viewport steps so every slice mounts) and with REA against an isolated Chrome tab (CDP 9230). Page height: 5170px at 1440 on both Scale and the clone.

Files: `app/scale-clone/enterprise-insurance/page.tsx`, `components/scale-clone/enterprise-insurance/{FullBleedMedia,FlatCta,LogoCarousel,VideoFeatures,Sections}.tsx`, `animatedText.ts`, `insurance.module.css`. FullBleedMedia / FlatCta / animatedText are copies of the security clone's ports; this page's props were re-read from the bundle (below).

## REA evidence
- `analyze_web_bundle` (include_script_sources, evidence `ev_e77acc39…cb9ce`): 46 scripts parsed, 0 failures; fingerprints Next.js (`next-runtime`, high) and React (`react-runtime`, medium); Turbopack chunk `turbopack-1byz1flvc-bu1.js`. Chunks I then fetched and grepped: GSAP `version:"3.15.0"` in `2d7ykwtxp_8ed.js`; Next `16.4.2` in `0m6y-zqxv6dk8.js`; ClipScrollSection + FullBleedMediaSection in `37xz28pjbnlx4.js`; LogoCarousel + FeaturesWithIcons in `01xb85jkvr5_y.js`; Features (video cards), Modal and glass Button in `17ea4hx823ss4.js`. three.js (r181) is in the shared vendor chunk `3kd41k7ews14b.js` but no canvas mounts on this page.
- `inspect_web_event_listeners`:
  - `a.FlatCta` (hero CTA): only a HubSpot analytics `mousedown`; hover is CSS + React root-delegated pointer events.
  - `button[aria-label="Play video"]`: HubSpot `mousedown` + a direct `click` from `42ixmvih7808g.js` (react-dom) → opens the video modal.
  - `a.bg-custom-gradient` (glass button): HubSpot `mousedown` + `click` (react-dom); hover entirely CSS.
  - `.ClipScrollSection`: no listeners (driven by ScrollTrigger on window/Lenis).
  - No canvas, no slider, no pointermove handlers on this page.

## Sections (top → bottom, 1440 / 390)
| # | Section | Layout | Type / spacing |
|---|---|---|---|
| 1 | PageHeader → FullBleedMedia (hero) | wrapper `pb-10 pt-24` (40/96, same on mobile); ClipScrollSection `px-4`, card 1408×720 (358×480 mobile), radius 24, padding 64 (32 mobile), content bottom-aligned, max-w 72rem | h2 `clamp(2rem,.5rem+5vw,4rem)` 64/1.05 (32 mobile), −0.01em, white; body1 20/1.5 (16/1.45 mobile); gap 24; FlatCta arrow white (8px radius, 32px black icon box). Overlay `.media-overlay` = `linear-gradient(#0000,#000)` (overrides bg-black/45). Image bg `#193A29`. |
| 2 | LogoCarousel | slice `py-8` (32), container 1472 / px-24 | copy 16/26.4 black/70, max-w 698, mb 40; desktop 64px row, 2 groups (4 + 3 logos) justify-between; mobile overflow-x row gap-40 px-24 |
| 3 | FeaturesWithIcons “3 blind spots” | slice py 80 (72 mobile); centred header `max-w-3xl mb-10 md:mt-12` | empty mono overtitle (0 tall, 12/24 +1px, mb 20); h2 48/1.25 (30/1.375 mobile, 42 md), weight 400; sub 20/1.6 mt 8 (16/1.6 mt 16) black/70. Cards: flex-wrap gap 64 / md gap-y 80 gap-x 24 / xl gap-x 56, basis-1/4 max 368. Icon 44×44 radius 8, bg black/9%, 1px black/10% border, 22px MD outline icon. h4 24/36 mt 24; body 16/24 #525252 mt 16 |
| 4 | FeaturesWithIcons “how insurers…” | as 3, plus glass pill button mt 32 | glass: 32px tall, 1px rim `to-br #9a9a9a→#1a1a1a→#6a6a6a`, inner `linear-gradient(#1a1a1a,#1a1a1a), linear-gradient(#0000,#0a0a0a)`, blur 4px, inset 0 1px 1px white/10; label 14/20 500, px 17 py 8, “→” ml 4. Card titles wrap to 2 lines (`whitespace-pre-line`). |
| 5 | Features (video cards) “Fuel your AI strategy” | 2-col grid gap 56 (md 24; mobile 1-col gap 56), cards 668 wide | image 3:2, radius 8 (wrapper 12), 64px play button bg black/40 → /60 (colours transition 150ms); title 24/36 mt 48 (mt 32 mobile); body 16/26.4 black/70 mt 12 |
| 6 | Pre-footer FullBleedMedia | wrapper `pt-16 pb-8` (64/32); same card as hero, headline only + “Book a demo”-style FlatCta | |
| — | Footer | shared `ScaleFooter` | |

## Motion
| Element | Trigger | start → end | From → to | Ease / duration | Notes |
|---|---|---|---|---|---|
| Hero ClipScrollSection | wrapper | top bottom → center center | clip inset 0% (startPercentage **0**) | scrubbed (onUpdate) | `startScale: 1` passed by FullBleedMediaSection, so no container scale |
| Pre-footer ClipScrollSection | wrapper | top bottom → center center | clip `inset(5% round 1.5rem)` → `inset(0%)` (default startPercentage **10**, inset = 0.5×) | scrubbed | measured live: `inset(5% …)` before entering |
| FullBleedMedia image | section | top bottom → center center | scale 1.25 → 1 | linear map, `gsap.set` | hero reads 1.0139 at scrollY 0 (progress 0.944), matches |
| Headline / body (AnimatedText) | section | top center, once, retroactive | lines yPercent 400 / words x 30%, opacity 0 → 0, green #72CE7B → purple #79648C → CSS colour | 1s power3.out, lines +0.08s each, words stagger 0.03 | body delay 0.2 |
| FlatCta intro “filledWhiteArrow” | section | same | scaleX .4→1 / autoAlpha | 0.85s power3.out, delay 0.5 | |
| LogoCarousel | timer | — | group opacity 0 ↔ 1 | CSS 700ms, incoming `delay-300` | `setTimeout(…, 4500)` re-armed per change |
| Glass button | hover | — | scale 1.02, glow, brightness 1.15, sheen ::before translate(8px,−8px) | CSS 500ms ease-out; arrow translateX 4px 300ms | active scale .97 |
| Play button | hover / click | — | bg black/40 → /60; click opens modal | CSS 150ms | modal: overlay `#060606/70`, panel `w-[95vw] md:80vw lg:70vw max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl`, Esc / outside click closes, body scroll lock |

The FeaturesWithIcons and Features slices have no GSAP (no ScrollTrigger, no SplitText reveal): they're static on Scale and in the clone. Lenis is the shared one from `app/scale-clone/layout.tsx`. Reduced motion: no clip/scale scrub, text and CTAs render immediately, CSS transitions disabled.

## Libraries
GSAP 3.15.0 (ScrollTrigger, SplitText), Lenis (shared), React / Next.js 16.4.2 on Scale. No Keen / Embla / Rive / three.js scene on this page. The clone uses the installed gsap 3.15 only.

## Assets (`public/scale-clone/enterprise-insurance/`)
- `hero.webp` (1600×1200), from `/static/img/reskin/headers/insurance.webp`
- `prefooter.jpg` (downscaled to 2880 wide from the 7952×3654 original `/static/img/reskin/prefooter.jpg`)
- `feature-claims.webp` (Wistia thumbnail 1920×1080) and `feature-retention.webp` (958×1375): the two video-card posters
- Icons: the six Material Design outline icons are inlined in `Sections.tsx` (exact paths from the DOM); the play glyph and modal close glyph are inlined too.
- Not shipped: Scale logo/wordmark, customer logos (replaced by neutral tiles at the same rendered sizes), the Wistia videos (the modal shows an empty 16:9 placeholder).

## QA
Screens in `reference-snapshots/scale-clone/qa/enterprise-insurance/` (`1440-*` every 50% viewport, `390-*` every 100%). At 1440 the page height matches exactly (5170px) and every section lines up to the pixel at each stop, including the pre-footer clip state mid-scroll. At 390 the section tops match Scale (102 / 718 / 937 / 1971 / 3269 / 4432). The video modal opens and closes (Esc) and locks body scroll. There are no console errors with or without reduced motion.

## Remaining gaps
- Placeholder copy everywhere (marked `TODO: Vahue copy`); line counts were matched to Scale's, so heights hold.
- 390: every section top matches Scale; the mobile logo strip is 1px taller (220 vs 219) from the inline-tile line box.
- Logo group 2 tile sizes were estimated from the screenshot, not measured.
- The glass button's “→” uses Vahue's display face; Scale renders it with a `font-unicode` face, so the arrow is a little longer.
- Video modal shows a placeholder instead of a Wistia iframe (TODO: Vahue video).
- Scale's pre-footer JPEG (1.8 MB, baseline) is often still decoding in the Scale captures, so its lower part shows the `#193A29` fill; that is a load artifact on Scale's side, not a layout difference.
