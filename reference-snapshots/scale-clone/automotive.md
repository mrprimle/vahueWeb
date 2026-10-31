# scale.com/automotive → /scale-clone/automotive

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + Chrome, 50% viewport scroll steps; production JS and CSS chunks fetched and grepped). REA was used for the bundle fingerprint and the listener map (details below). This is an older-style page built from code (`2kbgdjj-19374.js` holds the page component inline), not Plasmic CMS. It has two `FullBleedMediaSection`s, one tabbed media block, a feature grid with video modals, a Keen Slider and a react-fast-marquee logo strip on mobile. There's no WebGL, no pinning, no SplitText on body copy and no Rive.

Files: `app/scale-clone/automotive/page.tsx`, `components/scale-clone/automotive/*` (styles in `automotive.module.css`), assets in `public/scale-clone/automotive/`, QA shots in `reference-snapshots/scale-clone/qa/automotive/`.

## Global
- The body is white throughout. The containers use Scale's `container`: max-w 1280, padding 24 (32 from lg), centred. Every section from the overview on is `container py-16` (64/64).
- Section header (`SectionHeader`, light theme): `max-w-3xl` centred, `mb-10 md:mb-20 md:mt-12`. The overtitle is mono 12/24, +1px, uppercase, `#525252`, mb 20; the block keeps its 20px even when empty. Title 30/1.375 → 42 (md) → 48/1.25 (lg), black, weight 400, −0.01em. Sub 16/1.6 → 20 (lg), black/70, mt 16 → 8 (lg).
- Tracking is −0.01em everywhere. Weight is 400, and 500 for checklist titles, tags and CTAs.

## Sections (top → bottom)

| # | Section | Layout (desktop / mobile) | Type | Notes |
|---|---|---|---|---|
| 1 | Hero `FullBleedMediaSection` (page-header variant) | wrapper `pt-24 pb-10`, `px-4`, card radius 24, `p-16` / `p-8`, min-h 720 / 480, content bottom-left, max-w 72rem, gap 24 | h2 `clamp(2rem,.5rem+5vw,4rem)`/1.05 (64 → 32); p 20/30 → 16/23.2 | `hero.webp` (1920×1078) object-cover on `#193A29`; `.media-overlay` = `linear-gradient(#0000,#000)` only. Its `background` shorthand cancels `bg-black/45`, as the computed style confirms. One white arrow CTA. |
| 2 | Logo cloud | `py-10 md:py-14`. md+: `container`, `flex justify-around`, gap 32, min-h 52; <md: react-fast-marquee | n/a | 2 logos (92×40, 96×32) → `bg-black/10` tiles (TODO). Mobile marquee: 2 copies, each min-w 100%, items `ml-12`, default speed 50px/s |
| 3 | Overview (ChecklistWithMedia) | header, then `flex md:flex-row gap-[54px] mt-12 items-center max-w-[1216px]`; left `md:w-5/12` flex-col gap 24; right `md:w-7/12 p-2` | item title 16/24 500 black; body 14/21 black/70 | check chip 22px round, `bg-black/[.09]`, 1px black/10 border, 12px Material check black/70; `hr mt-6 border-white/10` between items (invisible on white). Diagram 662×553 (2085×1740 PNG) |
| 4 | "How to Build" + Supported Data | header (overtitle), then a panel `mt-10 bg-[#cc76ff]/[0.02]`; inner `relative flex flex-col-reverse lg:flex-row-reverse lg:gap-16`; text column `xl:min-w-[466px] xl:max-w-[466px]`; pink glow layer `absolute inset-0 opacity-50` | title 32/48 → 36/45 (xl) `#010101`; sub 16/24 zinc-400; body 16/24 gray-500, mb 32 | tabs: pill track `border #ffffff26` radius 100, p 4, 14/22; tab `px-4 py-2`, active black / others black/50, 1px black/15 dividers at 50% height (hidden next to the active tab). Media (xl): panel container `absolute -left-24 top-1/2`, media `absolute top-1/2 translate(40px,-50%)`, 649×402, `shadow-super`, 3D frame `border #D1AAD7/16` radius 10, other frames radius 8. Mobile: media above the tabs, `mb-9`. CTA: glass pill, h 32, 1px gradient ring (`to-br #9a9a9a → #1a1a1a → #6a6a6a`), fill `#1a1a1a`, 14/20 500 white, `px-[17px] py-2`, arrow ml 4 |
| 5 | Phases (Features, numbers) | header (+sub), `mt-10`, grid 1 / md 2 (gap 24) / lg 3; xl gap-x 40, gap-y 56 | title 24/36 (mt 32 → 48 lg, ml 44); body 16/26.4 black/70, mt 12, ml 44; number 12/18 600 Inter in a 22px chip at −40px | media 3:2 radius 8 in a `.feature` radius 12 wrapper with a 1px `#fff3` inset border; centred 64px play button `bg-black/40` → `/60` (150ms) opens a modal: `w-[95vw] md:w-[80vw] lg:w-[70vw] max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl`, 16:9 Mux HLS video |
| 6 | Why (FeaturesWithIcons) | header (overtitle + sub), `mt-10`, `flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14`; items `basis-full md:max-w-[368px] lg:basis-1/4 grow` | h4 24/36 black, mt 24; p 16/24 `#525252`, mt 16 | icon tile 44px radius 8, `bg-black/[.09]`, 1px black/10 border, 22px Material icons (whatshot, speed, bolt) |
| 7 | Resources | `relative py-16`; header in `container`; slider wrapper `mt-10 pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`, `overflow-x-hidden` | tag 14/1.71 500 `#D1AAD7`; h5 24/1.33, line-clamp 2 | Keen Slider at every width (no desktop grid on this page); card image aspect 389/243, radius 8, black bg; white glow layer `-top-[80%] -bottom-[20%] opacity-30` |
| 8 | Foundation model | header (title only), then `flex md:flex-row items-center gap-16 mt-12`, halves | label mono 12/24 +1px uppercase black; h2 30/45 → 36/45 (lg); p 16/24 zinc-400; link 16/24 black, `hover:text-gray-600` | image 576×324 (1920×1079) radius 8 |
| 9 | Pre-footer `FullBleedMediaSection` | wrapper `mt-16 pb-8`, then as the hero | h2 as the hero | `prefooter` image on `#193A29`; white arrow CTA plus white border CTA (stacked on mobile) |

## Motion

| Element | Trigger / start → end | From → to | Ease / duration / stagger | Mode |
|---|---|---|---|---|
| ClipScrollSection (pre-footer) | wrapper `top bottom` → `center center` | `clip-path: inset(5% round 1.5rem)` → `inset(0%)` (FullBleed passes `startPercentage: 10`, ×0.5) | linear map | scrub (onUpdate progress) |
| ClipScrollSection (hero) | same | none: the page-header variant passes `startPercentage: 0` | n/a | n/a |
| FullBleed media scale | same | none: FullBleedMediaSection passes `startScale: 1`. The data-engine clone's 1.25 → 1 doesn't apply. | n/a | n/a |
| FullBleed headline / body | section `top center`, retroactive | AnimatedText intro (SplitText `lines,words`, mask lines): lines `yPercent 400, opacity 0` → 0/1 over 1s, power3.out, at 0.08·i; words `x 30%` → 0 over 0.9s, stagger 0.03; tint `#72CE7B` → `#79648C` → CSS colour. Body delay 0.2 | see left | one-shot |
| FullBleed CTAs | same, delay 0.5 | arrow CTA: root `autoAlpha 0, scaleX 0, radius 0` → `1, 1, 8px`, inner scaleX at +0.1, arrow `x −6→0`; border CTA `autoAlpha 0→1` | power3.out 0.85s | one-shot |
| Tab indicator | tab change (headless-ui Tab.Group onChange) | `left/width/height` → selected tab's offsets | `Power2.inOut` 0.2s, timeline `{autoRemoveChildren, smoothChildTiming}` | tween |
| Tab text colour / dividers | same | text black/50 ↔ black (`transition-colors 200ms`); divider `scaleY 1 → 0` (100ms) | CSS | n/a |
| Tab media | n/a | `transition-transform duration-1000 ease-out` (static translate) | CSS | n/a |
| Text tab highlights | panel mount | 4 colour groups (`#ECA6FA`, `#E7FE53`, `#DBC6FC`, `#B2FCD2`) `autoAlpha 0, y 10` → `1, 0`; first delay 0.5, then `'>'` | `Power2.inOut` 0.6s, stagger 0.03 | one-shot |
| Glass CTA hover | :hover | ring `scale 1.02` + glow `0 0 20px rgba(255,255,255,.12)`; fill brightness 1.15 + inset highlight; sheen `before` opacity 0→1, translate(8px,−8px); arrow `translateX(4px)` | 0.5s `cubic-bezier(0,0,.2,1)` (arrow 0.3s) | CSS |
| Play button | :hover | `bg-black/40 → /60` | 150ms | CSS |
| FlatCta hover | pointerenter / leave | currentColor layer slides in from below (from the left on the arrow CTA), then out the opposite side; label `scale .9`; arrow track −50% → 0 | 300ms (600ms arrow), `cubic-bezier(0,0,.2,1)` | CSS |
| Keen Slider (resources) | drag | `mode: snap`, `perView 1.05`, `spacing 24`, `rubberband: false`; ≥640 free 1.4, ≥768 free 2, ≥1280 free 2.8; cursor switches between grab and grabbing; track opacity .5 → 1 on `created` (1s fallback), 0.3s ease-in-out | n/a | n/a |
| Logo marquee (<768) | always | `translateX(0 → −100%)` per copy, duration = width / 50px·s⁻¹ | linear, infinite | CSS |

In the sampled run I scrolled in half-viewport steps and read the inline styles of everything in `main`. Apart from the AnimatedText intro and the pre-footer clip, Scale has no scroll reveals on this page. The clone was sampled mid-intro: a hero line caught at yPercent 309.65 → 29.47 → 0.09, tinted green → purple → white. The tab pill was caught at left 160 → 212 mid-tween. The pre-footer clip was caught at `inset(3.59%)`.

All of the above reverts on unmount (gsap.context, SplitText.revert, ResizeObserver disconnect, key listener removed). With reduced motion: no split, no clip scrub, no tab tween (it snaps), no text-tab stagger, no marquee, and CTA, glass and panel transitions are off.

## Libraries found (REA + chunk grep)
- REA `analyze_web_bundle` on the page (36 scripts, all parsed): Next.js (Turbopack chunks, webpack runtime) and React. Route strings: `/static/img/reskin/headers/automative-data-engine.webp` and `/static/img/reskin/prefooter.webp` in `2kbgdjj-19374.js` (the page component).
- GSAP 3.15 core and ScrollTrigger (`09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`); AnimatedText and SplitText intro (`1h0nvyhf5gbrf.js`); ClipScrollSection and FullBleedMediaSection (`37xz28pjbnlx4.js`).
- Keen Slider (`2vj2iettvig10.js` lib; options in `0vl8zp9uyr6-0.js`).
- headless-ui `Tab` (tabs); react-fast-marquee (`rfm-*`, mobile logos); prism-react-renderer (audio tab code); react-audio-player (audio tab).
- Lenis is shared (the clone layout runs it at lerp 0.14).
- Not present on this page: three.js/ShaderMaterial, Rive, Embla, pinning.

REA `inspect_web_event_listeners` listener map:
- `.keen-slider`: `click` (capture), `dragstart`, `ksDragStart/ksDrag/ksDragEnd`, `mousedown/move/up/leave`, `touchstart` (passive), `touchmove`, `touchend`, all from `2vj2iettvig10.js` (Keen).
- `.ekJjCG_tabs button` and the `.PrXvJq_feature` play button: a single `click` from `42ixmvih7808g.js`, which is React's root-delegated handler (headless-ui and the modal state).
- `main a.FlatCta`: no direct listeners (hover is React-delegated pointer events plus CSS).
- No `pointermove` or `wheel` handlers on page content, so there's no cursor-reactive section to sample at several mouse positions.

## Assets (public/scale-clone/automotive)
`hero.webp` (1920×1078), `prefooter.jpg` (downscaled from the 7952px `prefooter.webp` to 2400px wide), `lidar.jpg` (the 3D tab placeholder still), `living-room.webp` (Image tab), `map.webp` (Mapping tab), `phase-base/improvement/target.webp` (1152×912 product screenshots), `foundation-model.webp` (1920×1079), and `resource-guide.png` (chip render).

Skipped:
- customer logos (Valeo, Oshkosh)
- the webinar resource thumbnail (it has speaker photos and title text): placeholder tile
- the overview diagram PNG, which bakes Scale's labels and font into the image; redrawn as SVG in `Sections.tsx` with placeholder labels
- the Text tab SVG, whose text is glyph paths of Scale copy; redrawn with neutral bars and the same 4 highlight colours and timeline
- the Audio tab's Steve Jobs speech clip and transcript: simplified placeholder panel

## QA
Screenshots are 100%-viewport steps at both widths: 9 stops at 1440 and 11 at 390, Scale and clone, 40 files. Desktop matches to the pixel on every measured anchor: the page is 7451px tall on both, and every section h2, h4, h5 and image top lines up exactly (606, 1191, 2192, 2861, 3794, 4102, 4470, 4949, 5208, 5429, 6325). On mobile the page is 9272 against 9269 tall, and the anchors are within about 45px (the placeholder copy wraps differently). No console errors on the clone; the page returns 200; `tsc --noEmit` is clean for these files.

## Remaining gaps
- The 3D tab: Scale lazy-mounts a live `lidar-now.scale.com` iframe behind the placeholder still. The clone keeps the still.
- The Audio tab is a simplified placeholder panel. Scale's version plays an mp3 with a progress bar and reveals a JSON transcript.
- Phase video modals show the poster frame. Scale streams Mux HLS, and hls.js isn't installed (native HLS would only work in Safari).
- Phase number chips: Scale asks for `font-family: Inter`, which isn't loaded, so they render in the browser serif. The clone falls back to a sans face.
- At lg (1024–1279) the Supported Data media sits in normal flow beside the 47% text column, which I approximated. Only xl and mobile were QA'd.
- The FullBleed scroll behaviour comes from the source props, not from the data-engine clone: there's no media scale on either section, and no clip on the hero.
- Shared header: the clone and Scale both show the announcement bar on mobile, so the hero top matches at 198.
- All copy and links are placeholders (`TODO: Vahue copy`). The logos, the webinar thumbnail and the diagram labels are placeholders too.
