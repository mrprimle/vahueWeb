# scale.com/generative-ai-data-engine: clone spec

Source: https://scale.com/generative-ai-data-engine, captured 2026-10-31 at 1440×900 and 390×844 with Playwright (computed styles, after scrolling in half-viewport steps) and the production Turbopack chunks (downloaded and grepped).
Clone: `app/scale-clone/generative-ai-data-engine/page.tsx` + `components/scale-clone/generative-ai-data-engine/*`. Live: http://localhost:3100/scale-clone/generative-ai-data-engine/

All copy is placeholder (`{/* TODO: Vahue copy */}`). Type uses Vahue's `font-display` / `font-mono` at Scale's sizes. The body tracking is −0.01em everywhere unless noted.

## Libraries found on this page
| Library | Version | Use here |
|---|---|---|
| GSAP + ScrollTrigger + SplitText | 3.15.0 | ClipScrollSection scrub, AnimatedText intros, testimonial panel scrub |
| Lenis | 1.3.21 | global smooth scroll (already provided by `app/scale-clone/layout.tsx`) |
| Keen Slider | 6.x | demo carousel and resources carousel |
| react-fast-marquee | n/a | mobile logo row (replaced by a CSS marquee at the library default of 50px/s) |
| Wistia | n/a | demo video player (not embedded; poster and play button only) |

No three.js, Rive, Embla or pointer-reactive canvas on this page.

## Sections, top to bottom
Container: `max-w-[1472px] px-6` (24px). A standard slice is `pt-8 pb-10 md:pt-10` (32/40 → 40/40).

| # | Section | Layout | Type / spacing |
|---|---|---|---|
| 1 | **Hero** (FullBleedMediaSection in a ClipScrollSection, `startPercentage 0`) | wrapper `pt-24 pb-10`; 12-col grid with `px-4` (16px); card 1408×720 (mobile 358×480), `rounded-3xl`, content `p-16` (mobile `p-8`), `items-end`; text stack `gap-6 max-w-[72rem]` | H2 `clamp(2rem, 0.5rem+5vw, 4rem)` / 1.05, white. Body 20/30 (mobile 16/23.2), white. Overlay `linear-gradient(transparent → #000)`. Image bg `#193A29`, `object-cover` |
| 2 | **Logo strip** | lead `max-w-[698px] mb-12 px-4`, 16/26.4, `#374151`, link `#008EFF` 500 with arrow `group-hover:translate-x-1` (0.3s ease-out); desktop `ul max-w-[1280px] px-8 justify-around min-h-[52px]`; mobile marquee, items `ml-12` | logos are neutral tiles at 100×20, 108×18, 77×28 (TODO) |
| 3 | **Section header** (Product overview) | `max-w-3xl mx-auto text-center mb-10 md:mt-12` | eyebrow mono 12/24, +1px, uppercase, `#525252`, `mb-5`; H2 48/60 (lg), 30/41.25 (mobile); lead 20/32 (lg) or 16/25.6, `black/70`, `mt-4 lg:mt-2` |
| 4 | **Expertise panel** | `bg-white/10 rounded-2xl` box, full-width PNG 1392×722 | illustration with baked-in text (`expertise.png`) |
| 5 | **Testimonial** (ClientTestimonials) | `pt-20 pb-16 md:pb-20`; grid `px-3` / `lg:px-6`; evergreen `#193A29` panel `rounded-2xl`; inner 12-col (`gap-2`), `lg:py-20`, mobile `p-8 gap-8`. Left col `col-start-2 span-1`: mono heading 12/16.5 500 uppercase + square logo button (`max-w-[152px] p-4 border-white rounded-lg`, white fill, 12px name `#193A29`). Quote `col-start-5 span-7` | Quote 40/44, −0.05em (mobile 24/28), first-line indent 160px (mobile 100px). Name 18/22.5 500 (mobile 16/20), right-aligned on lg. Role tag: white `rounded-[4px] px-2 py-1`, mono 10px uppercase `#193A29`, 6px triangle icon. Mobile: logo button 80×80 `p-3` below the quote |
| 6 | **Overview split** | `grid lg:grid-cols-2 gap-8 lg:gap-16 items-center`; lilac radial glow behind (`::before`, two radial gradients `#d1aad714` / `#d1aad729`) | H3 20/32.5 500 black; image box `p-1 rounded-2xl bg-white/10`, image 656×407 |
| 7 | **Lifecycle** (Build AI) | header + full-width PNG panel 1392×729 | `lifecycle.png` (diagram with baked-in labels) |
| 8 | **Key features** | header + `flex flex-wrap gap-16 md:gap-x-6 md:gap-y-20 xl:gap-x-14`; items `basis-full lg:basis-1/4 md:max-w-[368px] grow` → 3 per row at 1440 | icon tile 44×44 `rounded-lg bg-black/[0.09] border-black/10`, 22px Material icons; H4 24/36 `mt-6`; body 16/24 `#525252` `mt-4` |
| 9 | **Demos** | header (no lead); `flex-col gap-y-10`; big player `aspect-video rounded-2xl bg-#f2f2f2` (hidden < 640); play disc 96px (72 mobile) `bg-black/50 → /70` on hover (0.2s); Keen carousel of 3 | slide: frame `p-[5px] rounded-16` with a 2px `#fff3` inner border, thumb 384×214 `rounded-[11px]`; title 24/31.92 `mt-2 mb-3`. Inactive slides `sm:opacity-50 hover:opacity-70` (0.3s). Mobile: slide is the play button itself, plus 10px dots (active white, others `#37383B`) |
| 10 | **Resources** | header + Keen carousel (`overflow-x-hidden` wrapper), glow behind at 30% opacity (`-top-[80%] -bottom-[20%]`) | card image `aspect-[389/243] rounded-lg bg-black`; kicker 14/23.94 500 `#D1AAD7`, `pt-6`; title 24/31.92 `mt-1 line-clamp-2` |
| 11 | **Pre-footer** (FullBleedMediaSection, `startPercentage 10`) | wrapper `pt-16 pb-8`; same card as the hero, no body line | H2 as hero; image `prefooter.jpg` |

**CTA (FlatCta "arrow")**: white `rounded-lg`, height 40, `pl-4 py-1 pr-1 gap-4`; label 14/21 500 capitalized; 32×32 black `rounded-md` chip with a 200%-wide chevron strip. Hover is a JS state machine (chunk `1h0nvyhf5gbrf.js`, module 892855), not CSS `:hover`: on `pointerenter` a `bg-current` wash at opacity 0.35 slides `translateX(-100%)` → `0` and the strip `-50%` → `0` (both 600ms `cubic-bezier(0,0,0.2,1)`); on `pointerleave` the wash keeps going to `+100%` (exits right), then snaps back to `-100%` with the transition off on `transitionend` (or after 680ms) and is released after two rAFs; the strip snaps straight back to `-50%` (transition none). Re-entering while the wash is leaving snaps it to the start first. The label does not scale (the `group-hover/cta:scale-90` rule is only on the fill/border variants).

## Motion table
| Element | Trigger | Start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| ClipScrollSection clip (hero, pre-footer) | section | `top bottom` → `center center` | `clip-path: inset(0.5·start% round 1.5rem)` → `inset(0%)` (hero 0%, pre-footer 5%) | linear map of `progress` | onUpdate (scrub-like), no pin |
| Media layer scale (hero, pre-footer) | section | `top bottom` → `center center` | `scale 1.25` → `1` | linear map of `progress` | onUpdate |
| Hero/pre-footer headline + body (AnimatedText default) | section | `top center`, retroactive, once | SplitText `words, lines`, mask lines (+0.12em pad). Lines `yPercent 400, opacity 0` → 0/1; words `x 30%, opacity 0` → 0/1; colour `#72CE7B` → `#79648C` → CSS colour | lines 1s `power3.out` at 0.08·i; words 0.9s `power3.out` stagger 0.03 at line+0.04; colour 0.3276s + 0.4524s `power1.inOut` (+0.22s). Body plays 0.2s after the headline | — |
| CTA intro ("filledWhiteArrow") | same | delay 0.5 | root `autoAlpha 0, scaleX 0, radius 0` (origin left) → 1/1/8px; counter `scaleX 0` → 1 (at +0.1); text opacity in at 0.75s; arrow `x −6` → 0 | 0.85s `power3.out`; arrow `power3.inOut` | — |
| Testimonial panel width | panel wrapper | `top bottom` → `bottom 75%` | `width 90%` → `100%` | `power3.out` | `scrub: true` |
| Testimonial quote | section | `top 80%`, once | lines `transformPerspective 900, origin 50% 100%, rotationX −90, yPercent 108` → 0 | 0.48s `power2.out`, stagger 0.05, delay 0.35 | — |
| Testimonial name | same | — | same flip | delay 0.5 | — |
| Role tag (`ClientName.animateToText`) | same | — | tag width → 20px; text swapped in and measured; text opacity → 1; width → text + 26px | 0.5s `power3.out` (delay 0.05), then 10ms pause, opacity 0.5s linear alongside width 0.5s `power3.out` | — |
| Logo tab fill | same | — | white fill `y 100%` (`x 100%` when `max-width: 768px`) → 0; tab colour white → `#193A29` | fill 0.3s GSAP default `power1.out`; colour `transition-all` 150ms | — |
| Demo poster swap | slide click / slide change | — | CSS `fadeIn` opacity 0 → 1 | 0.6s ease-out | — |
| Demo slide click (≥ 640px) | click | — | big player autoplays (Wistia iframe), page smooth-scrolls the gallery to 16px from the top | `window.scrollTo({behavior:'smooth'})`, about 250–300ms | — |
| Logo marquee (mobile) | — | — | translateX 0 → −50% | linear, 8.6s loop (50px/s) | — |

Keen Slider options (copied verbatim):
- Demos: `rubberband:false`; `≤639: perView 1, spacing 32, snap, centered`; `640–767: perView 2, free`; `768–1040: perView 3.1, snap`; `≥1041: perView 3, spacing 32, snap`. On scale.com `centered:true` sits in the v5-style key; the clone uses `origin:'center'`.
- Resources: `initial 0, snap, rubberband:false, perView 1.05, spacing 24`; `≥640: free, 1.4`; `≥768: free, 2`; `≥1280: free, 2.8`. Cursor is `grab` normally and `grabbing` while dragging. The track fades in (0.3s) once created.

Reduced motion: no splitting, no clip/scale, panel at 100%, logo tab shown active, marquee and transitions off, CTA strip parked at 0.
Cleanup: every effect uses `gsap.context` and reverts its SplitText instances on unmount.

## Assets (`public/scale-clone/generative-ai-data-engine/`)
`hero.webp` (1920×686), `expertise.png` (1188×616), `lifecycle.png` (1216×637), `product-overview.webp` (1920×1190, static), `prefooter.jpg` (1920×882), `resource-report.png` (640×400), `demo-1/2/3.jpg` (Wistia posters, 960×536). Feature icons are inlined react-icons Material paths (MIT). Not downloaded: Scale's logo, customer logos (Meta, Cohere, NTT) and the TIME case-study image, which carries a third-party brand. These show as neutral tiles.

## QA
Screenshots are in `reference-snapshots/scale-clone/qa/generative-ai-data-engine/` (`{1440|390}-{scale|clone}-NN.jpg`, one viewport per step). At 1440, section tops match within ±3px through the features block. After that, the clone sits about 27px higher because the shorter placeholder copy in the features grid wraps to fewer lines. At 390 the clone runs about 40–100px taller for the same reason: the placeholder copy wraps differently. No console errors on the clone.

## Remaining gaps
- The `expertise.png` and `lifecycle.png` illustrations carry Scale's baked-in English labels ("Scale Smart workspace…"). They need Vahue versions.
- The first resources card is a neutral tile, since the original is a customer-brand image.
- scale.com sometimes renders the resources carousel at `perView 2` at 1440 (breakpoint measured with the scrollbar). The clone follows the `2.8` state seen in most captures.
- Fonts are Vahue's, so line breaks and the quote's line count differ slightly from Scale's Aeonik.


## REA verification (2026-10-31)

**Fingerprint:** REA `analyze_web_bundle` on a fresh CDP tab (127.0.0.1:9230, `include_script_sources: true`) — evidence `ev_fd1e722dad4c92e6…`, 45/45 scripts parsed, 0 failures; Next.js (Turbopack chunks) + React. Chunk graph: CMS-rendered page: `059q_ihpcslaa.js` (5.1 MB), `2oqqgjzhyolwf.js` (testimonial / demo sliders), `30w17vppvfdah.js` (Resources and Demos Keen sliders), `3hpmz3b0is2de.js`, `19p53ufb3n98_.js`, `239g4jr8_7s86.js`, `055kw1f0p2ydh.js`, `3d2zty6gdk3do.js` (WheelControls), `0oxj3l_iruc4b.js`, `1ws_ika9aqv1h.js`; shared `37xz28pjbnlx4.js`, `09t-e4mmc8vy5.js`, `1h0nvyhf5gbrf.js`, `0sle6wl7ucd3b.js`. No three.js/WebGL, Rive or Embla on this page.

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
| 225 | hero | inset(0%) | 1 |
| 6750 | pre-footer (top 845) | inset(4.66049%) | 1.233 |
| 6975 | pre-footer (top 620) | inset(3.2716%) | 1.1636 |
| 7200 | pre-footer (top 395) | inset(1.88272%) | 1.0941 |
| 7425 | pre-footer (top 170) | inset(0.493827%) | 1.0247 |
Overlay computed `background-color: rgba(0,0,0,0)`.

**Listener map (REA `inspect_web_event_listeners`, direct listeners on the first match):**
- `.keen-slider`: the Keen core set from `30w17vppvfdah.js`, plus a non-passive `wheel` from `3d2zty6gdk3do.js:665` (WheelControls plugin, module 29713). (ev_5cdb7ef3)
- `button[aria-label^="Play"]` (demo video), `button[aria-label^="Slide to"]` (testimonial dots), `[role=tab]`, `.FullBleedMediaSection a`: HubSpot `mousedown` (capture) plus `click` (`42ixmvih7808g.js`) only. (ev_7e944890, ev_90af7ffe, ev_9555c4d6, ev_73a47c30)

**Result:**
- **Confirmed:** `startPercentage` 0 and 10, the gradient-only overlay, media scale 1.25 → 1, the Keen options for Resources and Demos, and the AnimatedText cascade.
- **Fixed:** the pre-footer ran late. Its clip and scale lagged Scale by about 0.15 progress (about 120px of scroll) because the ScrollTrigger positions went stale after content above grew. It now gets the same debounced ScrollTrigger refresh on document height change. Re-sampled: with its top at 450 it reads `inset(2.2284%)` and scale 1.1114, against Scale's 2.2222% and 1.1111.
- **Fixed:** added the WheelControls plugin (`keenWheel.ts`) to both Keen sliders.
- **Changed:** Demos mobile breakpoint, dropped `origin: 'center'`. Scale passes `centered: true`, which the bundled Keen v6 never reads (its track only reads `slides.origin`, default `auto`). With `perView 1` both give origin 0, so there's no visual change. It now matches the bundle literally.
- QA re-shot: `qa/generative-ai-data-engine/1440-{scale,clone}-rea-{hero,prefooter}.jpg` (the hero is unchanged, so it's kept for reference).
- **Still unknown:** none.

## Interaction inventory (audit 2026-10-31)

Method: REA on a fresh CDP 9230 tab (`analyze_web_bundle` ev_3d8413d5f05c…, 56/56 scripts parsed; `inspect_web_event_listeners` per section root and interactive child, ids below), handlers traced into the downloaded chunks. Then Playwright with identical inputs on scale.com, the clone and `/automations/back-office-sync` (script `scratchpad/gai-audit/qa.js`): CTA hover/leave sampled every 100ms, link hover, testimonial reveal sampled every 100ms for 2.5s at 1440 and 390, tab click, demo hover/drag/click/scroll, demo dots at 390, resources drag/wheel/Tab at 1440 and 390, pre-footer scrub at 10 points, and a 3×3 mouse grid over every section (computed `transform`/`translate`/`opacity` of every visible element before and after each move). QA images: `qa/generative-ai-data-engine/interactions/<name>-{scale,clone,vahue}.jpg`.

Page-wide listeners: `html` has a passive `scroll` and `body` a passive `touchstart` from GSAP Observer/ScrollTrigger (`1h0nvyhf5gbrf.js`, ev_58c5a746f36 / ev_857602b5ccf) plus OneTrust `keydown`/`click`. Lenis runs as a ReactLenis root (`2d7ykwtxp_8ed.js`: lerp 0.14, wheelMultiplier 0.8, allowNestedScroll, syncTouch on coarse pointers, ScrollTrigger scrollerProxy), which the clone layout's SmoothScroll mirrors. The 3×3 mouse grid found **no pointer-tracking effects** on any section on any of the three pages; the only pointer responses are the hovers below. The three.js chunks that load (`3kd41k7ews14b.js` etc.) belong to shared components that aren't on this page: no canvas renders.

### 1 · Hero (FullBleedMediaSection, startPercentage 0)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| section | scroll | none on the node (ev_42051aee65fb); ScrollTrigger via `html` scroll | `37xz28pjbnlx4.js` | clip `inset(0%)`, media scale 1.25 → 1 over `top bottom → center center` | yes | — |
| headline / body / CTA | scroll (`top center`, once) | ScrollTrigger | `1h0nvyhf5gbrf.js` | AnimatedText cascade, CTA "filledWhiteArrow" 0.85s after 0.5s | yes | — |
| FlatCta | pointerenter / pointerleave | React `onPointerEnter/Leave` | `1h0nvyhf5gbrf.js` mod 892855 | wash −100% → 0 → +100%, snap back on transitionend / 680ms; strip −50% → 0, snaps back; 600ms ease-out | yes (was CSS `:hover`, reversed on leave: **fixed**) | `cta-hover-300ms-*`, `cta-leave-200ms-*` |

Samples, wash x as a fraction of its width, enter at 0/100/200/300/400ms: Scale −1, −0.61, −0.32, −0.16, −0.05; clone −1, −0.56, −0.29, −0.14, −0.04. Leave at 100/300/600ms: Scale 0.39, 0.86, 1 → −1 by 700ms; clone 0.39, 0.86, −1 at 600ms. The strip snaps to −0.5 on the first leave frame on both.

### 2 · Logo strip
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Meet our customers" link | hover | CSS | `890803` link component | arrow `translate-x-1` (4px) 300ms ease-out; colour stays `#008EFF` (`text-link` beats `hover:text-blue-700`) | yes (the clone turned blue-700 on hover: **fixed**) | — |
| mobile marquee | — | — | react-fast-marquee | 50px/s | yes (CSS) | — |

### 3–4 · Product overview header, expertise panel
No listeners and no pointer or scroll effects. Matched (none).

### 5 · Testimonial (ClientTestimonials, 1 item)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll scrub | ScrollTrigger | `3hpmz3b0is2de.js` | width 90% → 100%, `top bottom → bottom 75%` | yes | — |
| root | scroll `top 80%` (sets active index −1 → 0) | ScrollTrigger hook | same | quote flip delay 0.35, name 0.5, role tag `animateToText` delay 0.05 | yes | `testimonial-{1440,390}-*` |
| logo tab (`role=tab`) | activation | React effect | same, component `u` | inactive: white outline + white label, fill off at y 100% (x 100% ≤ 768px); active: fill → 0 in 0.3s, label `#193A29` | yes (the clone showed it filled from the start: **fixed**) | same |
| role tag | activation | imperative `animateToText` | same, `ClientName` | width 26 → 20px (0.5s power3.out), text in, → text + 26px (0.5s) | yes (the clone used a typewriter: **fixed**) | same |
| logo tab | click | React `onClick` (ev_11bae90a57d: React click + HubSpot capture mousedown) | same | `lenis.scrollTo(root, {offset:-24})`, then select. Live: no scroll happens (the `useLenis()` instance is undefined there) and the index doesn't change | yes (no-op on both) | — |

Samples at 1440, fill y at 0/100/200/300ms after the trigger: Scale 1, 0.55, 0.16, 0; clone 0.88, 0.38, 0.08, 0. Tag width: Scale 26 → 20 (300ms) → 54/128/156/162 (500–800ms); clone 26 → 20 (300ms) → 74/109/123/126 (600–900ms). The end width differs only by copy and mono font. At 390 the fill slides on x: 1 → 0 on both.

### 6–8 · Overview split, lifecycle, key features
No listeners and no pointer or scroll effects (the lilac glow is static). Matched (none).

### 9 · Demos (VideoGallery)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `.keen-slider` | drag / touch / wheel | Keen core + WheelControls `wheel` (ev_b2d7dc5810c: `30w17vppvfdah.js` @1432, `3d2zty6gdk3do.js` @665) | `30w17vppvfdah.js` mod 482270 | breakpoints as above. At 1440, 3 slides at perView 3 give zero track length, so a drag doesn't start | yes (tx [0,32,64] before and after a 400px drag on both) | — |
| track cursor | — | state | same | starts `default` (≤ 3 videos), `grabbing` while dragging, `grab` after | yes (the clone started at `grab`: **fixed**) | — |
| slide | hover | CSS | same | inactive `sm:opacity-50 → hover:opacity-70`, 300ms | yes (needs `sm:hover:` under Tailwind 3) | `demos-hover-slide2-*` |
| slide | click (ev_0ff4b02b90b, React) | `onClick` | same | active = i; ≥ 640px: autoplay in the big player and `window.scrollTo` smooth to gallery top − 16px | yes (the clone only switched the poster: **fixed**; sectionTop 16 on both, smooth about 250–300ms) | `demos-after-click-*` |
| big player | click | `onClick` | mod 832862 | poster button → `fast.wistia.net/embed/iframe/<id>?autoPlay=1` | yes (media ids 4n8xcpuanb, 10r609ojj4, wtp2wcktbl) | same |
| slideChanged | drag / dot | Keen event | mod 482270 | active = abs, autoplay off | yes | — |
| dots (< 640px) | click | `onClick` | same | `moveToIdx(i)`, rendered once created | yes (dot 2 gives tx −374 on both) | `demos-390-*` |

### 10 · Resources
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `.keen-slider` | drag / wheel | Keen core + WheelControls | `30w17vppvfdah.js` mod 382790 | at 390, a 300px drag gives −270 mid-drag and snaps to −331 (index 1); wheel −360 returns to 0 | yes (identical numbers) | `resources-after-keys-390-*` |
| `.overflow-x-hidden` wrapper | `keydown` Tab / Shift+Tab | ev_1c8309c1692f (`30w17…` @20673) | same | `next()` / `prev()` | yes (**added**; 390: Tab gives −331, Shift+Tab gives 0 on both) | same |
| wrapper | `focusin` on the first/last card | ev_1c8309c1692f (@20753) | same | `moveToIdx(minIdx/maxIdx)` | yes (**added**) | same |
| track | created | Keen `created` + 1s fallback | same | opacity 0.5 → 1, inline `transition: opacity 0.3s ease-in-out` | yes (the clone started at 0 with no fallback: **fixed**) | `resources-after-keys-1440-*` |

### 11 · Pre-footer (startPercentage 10)
| Element | Input | Listener | Source | Params | Reproduced |
|---|---|---|---|---|---|
| section | scroll scrub | ScrollTrigger | `37xz28pjbnlx4.js` | clip 5% → 0, media scale 1.25 → 1 | yes |

10-point scrub, each page sampled through its own range. The clone values are linearly interpolated to Scale's sample tops. At top 821: Scale 4.5124% / scale 1.2256, clone 4.5124% / 1.2257. At top 497: Scale 2.5124% / 1.1256, clone 2.5124% / 1.1257. At top 335: Scale 1.5124% / 1.0756, clone 1.5124% / 1.0757. The Vahue page samples sit on the same line within 0.001%.

### Vahue page (`/automations/back-office-sync`, `components/automation/workflows/generative-ai-data-engine/`)
The same fixes, with the same params: the FlatCta state machine (hero and pre-footer), the ToolStrip link colour, the CaseHighlight logo tile reveal and `animateToText` metric tag, the Demos cursor, slide-click scroll and dots-after-create, the CaseSlider opacity 0.5 + fallback and Tab/focusin. Re-measured: identical numbers to the clone, except that the Vahue demo panels are static mocks, so there's no autoplay; the logo tile is a case-study link, so its click navigates where Scale's single tab does nothing; and the metric tag ends at 108px, which differs only by copy. No console errors on either local page.

### Can't be reproduced
- None blocking. The HubSpot/OneTrust/analytics listeners (capture `mousedown`, banner `keydown`) are third-party tracking and are deliberately left out.
