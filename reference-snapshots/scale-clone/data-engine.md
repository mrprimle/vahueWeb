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

## Interaction audit (2026-10-31)

**Method.** REA on a fresh CDP 9230 tab of scale.com/data-engine: `analyze_web_bundle` (ev_90613ecf7f84…, 40/40 scripts parsed), `inspect_web_event_listeners` on `html` (ev_aefa97a8…), `body` (ev_73599bba…), `.FullBleedMediaSection` (ev_dc97fe3a…), `#build-ai` (ev_0399da55…), `[role=tab]` (ev_5beeb813…), `.keen-slider` (ev_8a4075bd…). React handlers (onPointerEnter, onClick) are delegated to the root, so REA can't see them on the element; I traced them in the chunk sources instead (fetched by URL from the same chunk graph). Then Playwright (1440×900 and 390×844), with identical inputs on scale.com, `/scale-clone/data-engine/` and `/automations/`: hover enter/leave/re-enter on every in-page CTA, sampled at 0/60/120/200/320/700/900 ms; testimonial reveal sampled at 0–2200 ms; tab click; pre-footer scrub at 10 points; a 6×4 cursor grid sweep at 4 scroll depths (compared against the same wait without a sweep); Keen drag (−250 px over 300 ms), horizontal wheel (6 × deltaX 40) and Tab key. Scripts: `scratchpad/de-audit/qa-interactions.js`, `qa-tabclick.js`. Images: `qa/data-engine/interactions/`.

**Window / document level.** `html`: a passive `scroll` listener from ScrollTrigger's scroller cache (`1h0nvyhf5gbrf.js`) plus OneTrust `keydown`/`click`. `body`: one passive `touchstart` (ScrollTrigger). Keen adds a `window` `wheel` listener that preventDefaults while a drag is active. Lenis 1.3.21 runs through lenis/react (`useLenis`, module 255667). No `pointermove`/`mousemove` anywhere outside Keen, and no canvas/WebGL on this page (the three.js chunk `3kd41k7ews14b.js` is loaded but not mounted here). Cursor grid sweep: the number of elements whose transform changed with the sweep matched the no-mouse control on all three pages (29–41; those are the chat-demo timers), so there are **no cursor-driven effects**.

### 1. Hero FullBleedMediaSection
| Element | Input | Listener (REA) | Source module | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section / media | scroll | ScrollTrigger (html scroll, ev_aefa97a8) | `37xz28pjbnlx4.js` FullBleedMediaSection + ClipScrollSection | hero startPercentage 0 (no clip), media scale 1.25→1 `top bottom → center center` | yes (verified in the earlier pass) | `1440-*-rea-hero.jpg` |
| headline / body / CTA | enter `top center` | ScrollTrigger | `1h0nvyhf5gbrf.js` AnimatedText + FlatCta reveal | as in the Motion table | yes | n/a |
| "Book a Demo" CTA (arrow variant) | pointerenter / pointerleave | React delegated (none on the element, ev_dc97fe3a) | `1h0nvyhf5gbrf.js` module 892855 FlatCta | fill `translate-x` −100% → 0 → +100%, 600ms ease-out; reset on fill `transitionend` or after 680ms (snap with no transition, released after 2 rAF); re-entry while leaving snaps back first; chevron track −50% → 0 (600ms) on enter, **snaps back on leave** (transition none); fill opacity .35 (.30 on black fill / white border) | **fixed** (track used to slide back over 600ms; re-entry used to start from the exit side) | `1440-{scale,clone,vahue}-cta0-hover.jpg` |

Hover samples (fill % of its own size): Scale enter −100 / −89 / −51 / −35 / −18 / 0 at 0/60/120/200/320/700 ms; clone −100 / −81 / −56 / −35 / −16 / 0. Leave: Scale 0 → 19 → 44 → 65 → 84 → reset −100 by 700; clone 0 → 19 → 44 → 65 → 84 → −100. Re-enter 80 ms after leave: both start at −100, then −74 / −42 / −11 at 100/200/400 ms. Track after leave: −50% at once on both.

### 2. Logo strip, 3. Best in the business, 6. One-stop shop, 7. Annotation types
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| all children | hover / click / scroll | none (static CMS markup, no hover classes in SSR) | n/a | n/a | n/a (nothing to reproduce) | n/a |

### 4. Case study
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Read customer story" (fill, black) | pointerenter / leave | React delegated | FlatCta 892855 | fill `translate-y` 100% → 0 → −100%, 300ms ease-out, opacity .30; label `scale .9` (300ms ease-out, CSS group-hover); same reset / re-entry rules | yes (re-entry fixed) | n/a |

Samples: enter 100 / 67 / 31.5 / 9.2 / 0 % at 0/60/120/200/320 ms on Scale, and 100 / 67 / 31.5 / 9.2 / 0 on the clone. Label 1 → .956 → .926 → .907 → .9 on both. Leave 0 / −33 / −68.5 / −91 / −100, then reset to 100 (both). Re-enter: 100 / 100 / 55.8 / 16.1 / 0 at 0/40/100/200/400 ms (both).

### 5. Build AI
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Book a Demo" fill + "Build AI" border CTAs | pointerenter / leave | React delegated | FlatCta 892855 | as in the case study (border: opacity .35) | yes | `1440-*-cta2-hover.jpg` |
| chat window `.OpfpwG_box__chat` | none (timers only; no listeners, ev from the earlier pass) | n/a | `1a9k8nwrsxal6.js` headless-ui Transition + react-type-animation | speed 60 (40ms/key), steps as in the Motion table; the container's `transition-transform duration-1000` never receives a transform | yes | n/a |

### 8. Resources (Keen Slider, below 1024px)
| Element | Input | Listener (REA ev_8a4075bd) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `.keen-slider` | mousedown/move/up/leave, touch*, dragstart, click (capture) | Keen core `31xvc_-2ufv3i.js` | module 577476 | snap perView 1.05 / spacing 24 / rubberband off; free 1.4 / 2 / 2.8 at 640 / 768 / 1280; snap release 500ms `1+(t-1)^5` | yes | `390-*-keen-after-drag.jpg` |
| `.keen-slider` | wheel (non-passive) | `31xvc_-2ufv3i.js:665` | module 29713 WheelControls | deltaX → ksDragStart/ksDrag/ksDragEnd, ends 50ms after the last event | yes | n/a |
| container cursor | dragStarted / dragEnded | Keen options | `0pxfxpo1hc-6g.js` module 382790 | `grabbing` / `grab` | yes | n/a |
| overflow wrapper | keydown Tab / Shift+Tab | addEventListener in a React effect | module 382790 | `slider.next()` / `prev()`, no preventDefault | **fixed** (was missing) | n/a |
| overflow wrapper | focusin on first / last slide | same | module 382790 | `moveToIdx(minIdx / maxIdx)` | **fixed** (was missing) | n/a |
| slider opacity | created / destroyed / 1s timer | React state | module 382790 | opacity .5 → 1, 0.3s ease-in-out; forced after 1s if `created` never fires; false on destroyed | **fixed** (timer and destroyed were missing) | n/a |

390 samples (slide 0 translateX): drag −279 at release, then −331 / −348 / −348.6 at 100/250/500 ms on Scale; the clone gives −279 / −331 / −348 / −348.6. Wheel −548.6 → −648.5 → −697.1 (identical). Tab key → −1028.3 on both.

### 9. Testimonial (ClientTestimonials, `1a9k8nwrsxal6.js` module 685963)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll | ScrollTrigger | 685963 | width 90% → 100%, power3.out, scrub, `top bottom → bottom 75%` | yes | n/a |
| section | enter `top 80%` (hook module 210104) | ScrollTrigger | 685963 | state −1 → 0: nothing is selected before entry | **fixed** (clone rendered the selected state from the start) | `1440-*-testimonial-mid.jpg`, `-end.jpg` |
| quote, name | same | same | AnimatedText 668761 with customAnimation (`replaceBuiltIn: true`) | lines: transformPerspective 900, origin 50% 100%, rotationX −90, yPercent 108, opacity 1 → rotationX 0 / yPercent 0, 0.48s power2.out, stagger 0.05; delay .35 (quote) / .5 (name); no colour tint; descender compensation on both | **fixed** (clone used the default yPercent-400 + tint intro) | same |
| role chip (ClientName) | same | same | 685963 `animateToText` | renders empty (26px: padding + glyph); delay .05: width → 20 (0.5s power3.out), set text, opacity → 1 (0.5s none), width → textWidth + 26 (0.5s power3.out) | **fixed** (was static) | same |
| tab button `[role=tab]` | activation | ScrollTrigger → React state | 685963 | fill div y 100% → 0, 0.3s, GSAP default ease (x instead of y at ≤768px); label colour #000 → #839CB2 (`transition-all`) | **fixed** (was static black) | same |
| tab button | click | React delegated `onClick` (REA shows HubSpot mousedown + React root click, ev_5beeb813) | 685963 | Lenis `scrollTo(root, { offset: -24 })`; root keeps `scroll-mt-28`, which Lenis subtracts, so it lands at 136px | **fixed** (was a no-op) | `1440-*-tab-click.jpg` |

Reveal samples (section top placed at 500 from 1000; t from that scroll): Scale fill 106.7 → 57 → 17.6 → 0 px at 0/100/200/350 ms; line 0 rotationX −90 until ≈350 ms, then cos .82 at 500 and .999 at 700; chip 26 → 20 px, text from ≈700 ms, 131 px at 1000. The clone runs the same sequence about 300 ms earlier: fill done by 0–100 ms, line cos .39 / .86 / .996 at 100/200/350 ms, chip text by 350 and full width (128 px) by 700. The durations and curves match; the offset is Scale's own main-thread latency between the scroll and the React re-render (there's no debounce in module 210104). Tab click: Scale section top 46 → 102 → 130 → 135 → 136 at 0/100/300/600/1000 ms; the clone gives 66 → 106 → 130 → 135 → 136.

### 10. Pre-footer FullBleedMediaSection
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip wrapper / media | scroll | ScrollTrigger | 37xz28pjbnlx4.js | clip inset 5% → 0, media scale 1.25 → 1, `top bottom → center center` | yes | `1440-*-rea-prefooter.jpg` |
| arrow + border CTAs | pointerenter / leave | React delegated | FlatCta 892855 | as in the hero (arrow) and Build AI (border) | yes (fixed with the shared FlatCta) | n/a |

10-point scrub (wrapper top 900 → 0 in 100px steps), identical on Scale, the clone and /automations: clip 5 / 4.383 / 3.765 / 3.148 / 2.531 / 1.914 / 1.296 / 0.679 / 0.062 / 0 %; media scale 1.25 / 1.2191 / 1.1883 / 1.1574 / 1.1265 / 1.0957 / 1.0648 / 1.034 / 1.0031 / 1.

### Fixes in this pass
- `FlatCta.tsx`: ported Scale's state machine (transitionend or 680ms reset, re-entry snap, arrow track snaps back on leave); the CSS `:hover` track rule is removed.
- `Testimonial.tsx` + `animatedText.ts` (`'flip'` variant): unselected → selected on `top 80%`, tab fill slide + colour, flip line reveal, ClientName chip scramble, tab click → Lenis scroll (`scroll-mt-28`).
- `Resources.tsx`: Tab / Shift+Tab → next / prev, focusin edge snapping, 1s ready fallback, destroyed → not ready.
- `components/home/scroll-hero/SmoothScroll.tsx` exposes the Lenis instance as `window.__lenis`, standing in for Scale's `useLenis()` context.
- Same changes on `/automations` (`components/automation/hub/`: FlatCta, Testimonial, animatedText, Results, hub.module.css).

### Not reproducible / not applicable
- The ~300 ms reveal latency on scale.com is runtime jank, not a parameter.
- Prev/next testimonial arrows and their GSAP colour hover (module 685963 `a`) render only when there are more than 1 testimonial; this page has one, so they don't exist here.
- CMSLink `buttonHover` colour cascade (module 737900) is off for these CTAs (`buttonHover` false), so there's nothing to port.
