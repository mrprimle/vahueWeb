# scale.com/data-engine → /scale-clone/data-engine

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + Chrome; production JS chunks fetched and grepped). This is an older-style Scale page: CMS blocks plus two Plasmic `FullBleedMediaSection`s. There's no WebGL, no pinning and no Rive. Every section sits between the shared header and footer.

Files: `app/scale-clone/data-engine/page.tsx`, `components/scale-clone/data-engine/*` (styles in `dataEngine.module.css`), assets in `public/scale-clone/data-engine/`, QA shots in `reference-snapshots/scale-clone/qa/data-engine/`.

## Global
- Body is white. Everything after the case study sits in a full-width `#f2f2f2` band, which also wraps the testimonial and the pre-footer CTA.
- Tracking is −0.01em everywhere. The quote uses −0.05em and the overtitle +1px.
- Containers: the first sections use `px-6`, full width. The band sections use `max-w-[1472px] px-6`. The inner content column is 1216px (1280 with `lg:px-8`).
- Section rhythm: `pb-14 md:pb-20` (56/80). Section headers: overtitle (mb 20), then title, then subtitle (mt 16 → lg mt 8), with 40px (`mb-10`) below; Build AI uses 64.

## Sections (top → bottom)

| # | Section | Layout (desktop / mobile) | Type | Notes |
|---|---|---|---|---|
| 1 | Hero `FullBleedMediaSection` | wrapper `pt-24 pb-10`, clip wrapper `px-4`, card radius 24, `p-16` / `p-8`, min-h 720 / 480, content bottom-left, max-w 72rem, gap 24 | h2 `clamp(2rem, .5rem+5vw, 4rem)` / 1.05; p 20/30 → 16/23.2 | photo `hero.webp` object-cover; overlay = `linear-gradient(#0000, #000)` only (`.media-overlay` cancels `bg-black/45`; see REA verification) |
| 2 | Logo strip | `pt-10 pb-14 md:pb-20`, `justify-around`, gap 40 (48 on mobile, horizontal scroll, `min-w-max`) | n/a | 7 logos at 90×23, 100×24, 100×20, 112×20, 111×23, 60×24, 100×24 → neutral `bg-black/10` tiles (TODO) |
| 3 | "Best in the business" | `#f2f2f2` card, radius 16, padding 48/40/24; grid `minmax(0,.95fr) minmax(560px,1.05fr)`, gap 40; right side is a 2×2 card grid, gap 16 (12 on mobile) | h2 40/50 → 24/25.2; p 16/24 → 14/18.9 `#575757`; card h3 24/36 → 22/23.1 `#212121` | illustration min-h 560 (360 on mobile), max-w 760; cards white, radius 12, `p-8`/`p-6`, min-h 200, `justify-between`; corner glyph 17px in `#79648C` `#A8927C` `#273252` `#193A29` |
| 4 | Case study | grid `minmax(320px,.85fr) minmax(0,1.15fr)`, gap 16; red panel `#E7131A`, radius 16, min-h 420 / 280; text column `p-12/p-10/p-6`, `justify-between`, gap 48 | mono 13 → 10 uppercase `#575757`; h3 40/50 → 24/25.2 | customer wordmark → white/25 placeholder tile (TODO); black fill CTA |
| 5 | Build AI | `py-14 md:py-20`; header `mb-16`; `lg:flex-row-reverse`, gap 64, `justify-content:flex-start`; text column 466px; chat window 649×402 (aspect 649/402, full width on mobile, `mb-9`) | overtitle mono 12/24 +1px `#525252`; title 30 → 42 (md) → 48/60 (lg); sub 16 → 20 / 1.6, black/70; side title 32/48 → 36/45 (xl); muted `#a1a1aa` | chat light skin: white, radius 10; pills `rgba(0,0,0,.04)` with a 1px black/12 border; gradient ring `97deg #fff,#9a77ff,#4d7df7,#e151ff,#fff759` |
| 6 | One-stop shop | header `mb-10`; diagram max-w 980 (1920×1006 grid); features `mt-12`, mono label, then a grid (`md:2`, `xl:4` columns, gap 32) | feature h3 24/36, body 16/24 `#575757` | diagram redrawn as SVG (Scale ships a raster); Material check icon 20px |
| 7 | Annotation types | 4 columns (`xl`) / 2 (`md`) / 1, gap 16; card white, radius 12, `p-8`/`p-6`, min-h 320; head block min-h 136; icon tile 44px `#f2f2f2`, radius 8 | h3 24/36 (mt 32); list `space-y-4`, 16/24 `#575757`, 16px checks | Material icons: text_fields, image, videocam, view_in_ar |
| 8 | Resources | lg: 2 columns, xl: 4, gap 24; below lg: Keen Slider; card image aspect 389/243, radius 8, black bg | tag 14/1.71 500 `#D1AAD7`; h5 24/1.33, line-clamp 2 | white radial glow layer `-top-[80%] -bottom-[20%]`, opacity .3 |
| 9 | Testimonial | outer bg `#f9fafb`, `pt-20 pb-16/20`, `px-6` (12px on mobile); slate `#839CB2` panel radius 16; 12-column grid, gap 8, `lg:py-20`; label + tab button in column 2, quote in columns 5–11 | quote 40/44, −0.05em (24/28 on mobile) with a 160px indent (100 on mobile); label mono 12/16.5 500 uppercase; name 18 → 16 500; chip mono 10 uppercase on white | tab button square 108px (80px on mobile), black fill, 1px border, radius 8 |
| 10 | Pre-footer `FullBleedMediaSection` | same as the hero; backdrop `#f9fafb`; image bg `#193A29`; wrapper `pb-14 md:pb-20` inside the gray band | h2 as in the hero | white arrow CTA plus white border CTA (stacked on mobile) |

## Motion

| Element | Trigger / start → end | From → to | Ease / duration / stagger | Mode |
|---|---|---|---|---|
| ClipScrollSection (pre-footer; hero has startPercentage 0 = no clip) | wrapper `top bottom` → `center center` | `clip-path: inset(5% round 1.5rem)` → `inset(0%)` (startPercentage 10 × 0.5) | linear map | scrub (onUpdate progress) |
| FullBleed media | same | `scale 1.25 → 1` | linear map | scrub |
| FullBleed headline | section `top center`, retroactive onEnter | AnimatedText intro (below), delay 0 | | one-shot |
| FullBleed body | same | AnimatedText intro, delay 0.2 | | one-shot |
| Primary CTA ("filledWhiteArrow") | same, delay 0.5 | root `autoAlpha 0, scaleX 0, radius 0` → `1, 1, 8px` (origin left); inner `scaleX 0→1` at +0.1; arrow `x −6→0`; label `opacity 0→1` at 0.75 | power3.out 0.85s; arrow power3.inOut 0.85s | one-shot |
| Secondary CTA ("fadeIn") | same, delay 0.5 | `autoAlpha 0→1` | power3.out 0.85s | one-shot |
| AnimatedText (default intro) | per caller | SplitText `lines,words`, `mask: lines`, `wordsClass: word`. Lines `yPercent 400, opacity 0` → 0/1; words `x 30%, opacity 0` → 0/1; colour `#72CE7B` → `#79648C` → CSS colour | line: 1s power3.out at 0.08·i; colour +0.22 (0.3276s), then 0.4524s power1.inOut; words: 0.9s power3.out at +0.04, stagger 0.03; word colour +0.198 (0.29484s, then 0.40716s) | one-shot |
| Testimonial panel | panel wrapper `top bottom` → `bottom 75%` | `width 90% → 100%` | power3.out (1.15s) | scrub |
| Testimonial quote / name | section `top 80%` onEnter | AnimatedText (lines; masks padded ±0.12em) | delay 0.35 / 0.5 | one-shot |
| Chat demo | mount (+1s), then loops | 3: question pill `x −100%→0`, opacity, 300ms, types at 40ms/key ±50%, +300ms → 4: bubble `scale .95→1` 200ms, dots `.`/`..`/`...` held 500ms → 5: ranking panel `translateY 100% scale .95 → 0/1` 300ms; +1s → 6: pills swap (`translate-y-20`, `−34px` + highlight, `−33px`, 300ms ease-out); +2s → 8: panel leaves 200ms, bubble 150ms → 9: answer pill `scale .95→1` 150ms; +2s → 2 → 3 (question remounts and retypes) | CSS transitions, ease-out | timers |
| FlatCta hover | pointerenter / leave | `bg-current` layer (opacity .35, or .30 on black fill / white border) slides in from below (from the left on arrow CTAs) and out the top/right on leave; label `scale .9` (fill/border); arrow track `−50% → 0` | 300ms (600ms arrow), `cubic-bezier(0,0,.2,1)` | CSS |
| Keen Slider (resources, <1024px) | drag | `mode: snap`, `perView 1.05`, `spacing 24`, `rubberband: false`; ≥640 free 1.4, ≥768 free 2, ≥1280 free 2.8; cursor switches between grab and grabbing | n/a | n/a |

All of the above reverts on unmount (gsap.context + SplitText.revert). With reduced motion: no split, no clip or scale scrub, CTAs and text are visible immediately, the chat shows a still frame (step 6), and the hover fill still runs but the label scale and arrow slide don't.

## Libraries found
GSAP 3.15 (ScrollTrigger, SplitText), Lenis (the shared layout runs it at lerp 0.14), Keen Slider (resources carousel), headless-ui `Transition` plus `react-type-animation` (chat demo, reimplemented locally), styled-jsx. No three.js, Rive, Embla or pinning on this page.

## Assets (public/scale-clone/data-engine)
`hero.webp` (1920×1071), `the-business.webp` (1536×1024, transparent line illustration), `prefooter.jpg` (downscaled from 7952 to 2400px wide), `resource-02/03/04.png` (icon thumbnails), `llm-1.png`, and `avatar.jpg` (the Unsplash avatar Scale hotlinks). Skipped: Scale's logo, customer and investor logos, the TIME wordmark, and resource thumbnail 01 (an OpenAI mark). I also didn't use Scale's loop-diagram raster; its labels are Scale copy, so `DataEngineLoop.tsx` redraws it as SVG.

## QA
I compared 8 stops at 1440 and 10 at 390, each step 100% of the viewport, stopping at the footer. Section positions match within about 20px across the page: page body height is 6865 for the clone against 6901 for Scale, and 8222 against 8278 on mobile. Grid, card sizes, type scale and colours line up. No console errors on the clone. I sampled the hero mid-intro and caught a line at yPercent 58 with a green-to-purple tint, then settling at white with the clip finished.

## Remaining gaps
- Pre-footer image: on Scale the photo only covers the upper part of the card and the lower part is flat `#193A29` going to black. I couldn't find the cause in the CSS (the measured `<img>` is full size). The clone shows the full photo under the gradient overlay.
- The testimonial role chip uses Scale's `animateToText` scramble; it's static in the clone.
- Scale's ClientTestimonials can switch between several testimonials; this page has only one, so only one tab is built.
- The Keen Slider plugin Scale passes (keyboard Tab-to-next and focus snapping) isn't ported.
- All copy and links are placeholders (`TODO: Vahue copy`); the logo tiles, case-study wordmark tile and resource card 1 are placeholders too.


## REA verification (2026-10-31)

**Fingerprint:** REA `analyze_web_bundle` on a fresh CDP tab (127.0.0.1:9230, `include_script_sources: true`) — evidence `ev_f5b3722f23c9c302…`, 36/36 scripts parsed, 0 failures; Next.js (Turbopack chunks) + React. Chunk graph: page chunks `31xvc_-2ufv3i.js` (Keen + WheelControls), `1a9k8nwrsxal6.js`, `0pxfxpo1hc-6g.js` (Resources slider options); shared `37xz28pjbnlx4.js` (ClipScrollSection / FullBleedMediaSection), `09t-e4mmc8vy5.js` (GSAP core / ScrollTrigger), `1h0nvyhf5gbrf.js` (AnimatedText / SplitText), `0sle6wl7ucd3b.js` (nav), `42ixmvih7808g.js` (React runtime). No three.js/WebGL, Rive or Embla on this page.

**FullBleedMediaSection (read from chunk `37xz28pjbnlx4.js`, identical on all six pages):**
- `FullBleedMediaSection({ startPercentage = 10, overlayVariant = 'flat', ... })` renders `ClipScrollSection` with `startPercentage` and **`startScale: 1`**, so ClipScrollSection's own inner `scale()` stays 1 (it always reads `transform: scale(1)` live).
- FullBleedMediaSection **also runs its own scrub** on the `<section>`: `start 'top bottom' → end 'center center'`, `onUpdate: scale = mapRange(progress, 0, 1, 1.25, 1, clamp)` set on the media wrapper (image div or video). So the media **does** scale 1.25 → 1. The automotive note ("no media scale") is refuted for this page: live samples below show `matrix(1.233…)` → `1.1636` → `1.0941` → `1`.
- ClipScrollSection: trigger = its own wrapper div, `top bottom → center center`, `clip-path: inset(mapRange(p, 0, 1, 0.5·startPercentage, 0)% round 1.5rem)`.
- The hero is rendered with `startPercentage 0` (live hero clip reads `inset(0%)` at every scroll position). The pre-footer uses the default 10, so it runs 5% → 0.
- Overlay: SSR markup is `media-overlay … bg-black/45` (`overlayVariant 'flat'`), but `.media-overlay { background: linear-gradient(#0000 0%, #000 100%) }` (CSS chunk `3ektzubma58z1.css`) uses the `background` shorthand, which resets `background-color`. Computed `background-color` is `rgba(0, 0, 0, 0)` on both sections, so the overlay is **gradient only, with no 45% black** (confirms the automotive note).
- AnimatedText intro (chunk `1h0nvyhf5gbrf.js`): lines `yPercent 400, opacity 0` → 0/1, 1s power3.out at `0.08·i`; words `x 30%` → 0, 0.9s power3.out, stagger 0.03 at +0.04; tint `#72CE7B` → `#79648C` (0.3276s at +0.22) → CSS colour (0.4524s). The clone matches.

**Live samples (Playwright, 1440×900, 225px steps, values read from inline style / computed transform):**

| scrollY | section | clip | media scale |
|---|---|---|---|
| 0 | hero (top 135) | inset(0%) | 1.0139 |
| 225 | hero | inset(0%) | 1 |
| 5400 | pre-footer (top 701) | inset(3.7716%) | 1.1886 |
| 5625 | pre-footer (top 476) | inset(2.38272%) | 1.1191 |
| 5850 | pre-footer (top 251) | inset(0.993827%) | 1.0497 |
| 6075 | pre-footer (top 26) | inset(0%) | 1 |
Overlay computed `background-color: rgba(0,0,0,0)` with the gradient as `background-image`, on both sections.

**Listener map (REA `inspect_web_event_listeners`, direct listeners on the first match):**
- `.keen-slider` (Resources): `click` (capture), `dragstart`, `ksDragStart/ksDrag/ksDragEnd`, `mousedown/mousemove/mouseleave/mouseup`, `touchstart` (passive), `touchmove/touchend/touchcancel`, all from `31xvc_-2ufv3i.js` (Keen core). There's also a non-passive **`wheel`** at `31xvc_-2ufv3i.js:665`, which is Scale's WheelControls plugin (module 29713, passed as `useKeenSlider(opts, [r.f])` in `0pxfxpo1hc-6g.js`). (ev_7e811ef5bf85891e)
- `[role=tab]` (annotation tabs), `button[aria-label^="Show testimonial"]`, `.FullBleedMediaSection a`: `mousedown` (capture) from HubSpot's `4823527.js` tracker plus `click` from `42ixmvih7808g.js`. That's analytics plus the framework; there's no motion handler on the element itself. (ev_c481d8fe, ev_08974605, ev_380efc2d)
- `.OpfpwG_box__chat` (chat window): no direct listeners. (ev_3caaca4f)
- No `pointermove`, canvas or WebGL on this page.

**Result:**
- **Fixed:** the hero clip. The clone clipped the hero 5% → 0 too. `FullBleedMedia` now takes `startPercentage` (default `priority ? 0 : 10`, because `app/scale-clone/data-engine/page.tsx` sits outside this pass's edit scope and only passes `priority` on the hero), so the hero is 0 and the pre-footer 10. The clip trigger is now the ClipScrollSection-equivalent wrapper, as on Scale.
- **Fixed:** the overlay. It was `rgba(0,0,0,.45)` plus the gradient, which made it too dark. It is now the gradient only.
- **Fixed:** added the Keen `WheelControls` plugin (`keenWheel.ts`) to the Resources slider, so trackpad horizontal swipes drag it as on Scale.
- **Confirmed:** media scale 1.25 → 1 on the section (`top bottom → center center`). The automotive agent's "no media scale" doesn't apply here. Also confirmed: the Keen options (`snap`, perView 1.05, spacing 24, `rubberband:false`, free 1.4/2/2.8 at 640/768/1280) and the AnimatedText and CTA intro values.
- Clone re-sampled after the fix (1440): hero `inset(0%)`, scale 1.0139 → 1. Pre-footer with its top at 450: clip `inset(2.22222%)`, scale 1.1111, identical to Scale at the same position. Overlay bg-color is transparent. No console errors, 200.
- QA re-shot: `qa/data-engine/1440-{scale,clone}-rea-hero.jpg` and `1440-{scale,clone}-rea-prefooter.jpg`.
- **Still unknown:** the pre-footer image covering only the upper part on Scale (listed under Remaining gaps) wasn't re-investigated.
