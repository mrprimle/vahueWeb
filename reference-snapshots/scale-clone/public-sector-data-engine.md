# scale.com/public-sector-data-engine → /scale-clone/public-sector-data-engine

Captured 2026-10-31 with Playwright (headless Chrome, 1440×900 and 390×844, scrolled in 50% viewport steps) and the production chunks downloaded from the page (`1h0nvyhf5gbrf.js` AnimatedText, `37xz28pjbnlx4.js` FullBleedMediaSection/ClipScrollSection/AnimatedFlatCta, `3_bsw0kgw5l_w.js` ClientTestimonials, `30w17vppvfdah.js` VideoGallery/ResourcesSlider/Keen Slider).

Files: `app/scale-clone/public-sector-data-engine/page.tsx`, `components/scale-clone/public-sector-data-engine/*`, `public/scale-clone/public-sector-data-engine/*`. QA: `reference-snapshots/scale-clone/qa/public-sector-data-engine/`.

This page is an older Plasmic page: only the two full-bleed media bands and the testimonial use the new GSAP components. The section headers, feature cards, checklist and sliders have no scroll reveals.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Spacing |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection in ClipScrollSection) | wrapper `pt-24 pb-10`; 12-col grid `minmax(0,150px)`, gap 8, side padding 16 (both sizes); card 1408×720 / 358×480, radius 24, `p-16` / `p-8`, content bottom-left, max-w 1152, gap 24. Media: cover image (bg `#193a29`) + overlay `linear-gradient(#0000,#000)` | h2 `clamp(2rem,0.5rem+5vw,4rem)` / 1.05, −0.01em, white; body 20/1.5 → 16/1.45 white | CTA 154×40 |
| 2 | Logo wall | `.container` (max 1280, px 32 ≥1024, px 24 below); lead line centred, max-w 698, `mb-12`; desktop `ul` justify-between, 5 logos; mobile marquee (react-fast-marquee, 50px/s, `ml-12` per logo) | lead 16/1.65 `#374151`; link `#008eff` 500 + `→` (hover translate-x 4px, 0.3s) | section `pt-10 pb-10` (mobile `pt-8`) |
| 3 | Product overview | SectionHeader (max-w 768, `md:mt-12 mb-10`) + flex-wrap cards, `gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`, card `basis-full md:max-w-[368px] lg:basis-1/4` | eyebrow mono 12/24 +1px uppercase `#525252`, `mb-5`; h2 48/1.25 (lg), 40/1.375 (md), 30/1.375; lead 20/1.6 → 16/1.6 black/70, `mt-2`/`mt-4`; card h4 24/1.5, body 16/1.5 `#525252` | icon tile 44×44 r8, bg black/9%, 1px black/10%; h4 `mt-6`; p `mt-4` |
| 4 | Why (ChecklistWithMedia) | `flex md:flex-row gap-[54px] mt-12 max-w-[1216px]`, list `md:w-5/12` gap 24, image `md:w-7/12 p-2` (raster 1944×1740) | item title 16/1.5 500; body 14/1.5 black/70 | check dot 22 round, 12px glyph black/70; `hr mt-6` between items |
| 5 | Testimonial (ClientTestimonials) | wrapper `pt-8 pb-10 md:pt-10`; section `pt-20 pb-16 md:pb-20`; grid 12×`minmax(0,150px)` gap 8 px 24 (mobile 8 cols, px 12); slate panel `#839CB2` r16 absolutely centred; inner `lg:py-20`, mobile `p-8` flex-col gap 32; eyebrow col-start 2 (stack justify-end, tile 109×109 under it); quote col 5–11; name + role pill right-aligned | eyebrow mono 12/1.375 500 uppercase white; quote 40/44 −0.05em (mobile 24/28) with 160px (100px) indent; name 18/1.25 500 (16 mobile); pill mono 10 uppercase slate on white, 6px triangle | quote/name stack `gap-16`; panel 1392×612 at 1440 |
| 6 | Demos (VideoGallery) | header (eyebrow black); main player `aspect-video` r16 bg `#f2f2f2` (hidden <640); play disc 96 (72 mobile) black/50 → black/70 hover 0.2s; Keen slider below `gap-y-10`; thumbnails in `.videoThumbnail` frame (5px padding, r16, 2px `#fff3` inner border), 384×235 r11 | slide h4 24/1.33, `mt-2 mb-3` | mobile: slides are players, dots 10px (`#fff` active, `#37383B`) |
| 7 | Resources (ResourcesSlider) | header in container; slider starts at container left (`pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]`) and bleeds to the right edge; card image `aspect-[389/243]` r8 bg black | tag 14/1.71 500 `#D1AAD7`; h5 24/1.33 line-clamp-2 `mt-1` | `pt-6` under image |
| 8 | Prefooter (FullBleedMediaSection) | wrapper `mt-16 pb-8`, backdrop `bg-gray-50`; same card as hero, no body | h2 as hero | — |

Header and footer come from the shared clone layout.

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero + prefooter clip | ClipScrollSection root | `top bottom` → `center center` | `clip-path: inset(5% round 1.5rem)` → `inset(0% …)` (startPercentage 10 × 0.5) | linear map of progress | onUpdate (no tween) |
| Hero + prefooter media | section | `top bottom` → `center center` | `scale 1.25` → `1` | linear | scrub |
| Full-bleed heading + body (AnimatedText default intro) | section `top center`, once, retroactive | — | lines `yPercent 400, opacity 0`, words `x 30%, opacity 0`, colour `#72CE7B` → line i at `0.08·i`: line `yPercent 0, opacity 1` 1s; words at +0.04 `x 0, opacity 1` 0.9s stagger 0.03; colour → `#79648C` (+0.22 line / +0.238 words, 0.3276s / 0.29484s) → own colour (0.4524s / 0.40716s) | `power3.out` (moves), `power1.inOut` (colour) | — |
| Body | same | — | same, delay 0.2s | | |
| CTA "filledWhiteArrow" intro | same, delay 0.5s | — | root `autoAlpha 0, scaleX 0, borderRadius 0` (origin left) → `1, 1, 8`; inner counter `scaleX 0 → 1` at +0.1; label opacity at 0.75; chevron `x −6 → 0` | root `power2.out` 0.85s; chevron `power3.inOut` 0.85s | — |
| CTA hover | pointerenter / leave | — | 35% current-colour sheet `-100% → 0` on enter, `0 → +100%` on leave (then snaps back); chevron track `-50% → 0` | CSS `ease-out` 600ms | — |
| Testimonial panel | inner column | `top bottom` → `bottom 75%` | `width 90%` → `100%` | `power3.out`, 1.15 | scrub |
| Testimonial quote | wrapper `top 80%`, once | — | lines (masked) `rotationX −90, yPercent 108, transformPerspective 900, origin 50% 100%` → `0, 0` | `power2.out` 0.48s, stagger 0.05, delay 0.35 | — |
| Testimonial name | same | — | same flip | delay 0.5 | — |
| Testimonial tile fill | same | — | `y 100% → 0` | 0.3s | — |
| Testimonial role pill | same | — | text types in (Scale `animateToText`) | approximated: clip reveal 0.6s `power2.out`, delay 0.35 | — |
| Demo slides | hover / select | — | inactive 50% → 70% hover → 100% active | CSS opacity 0.3s | — |
| Main player | slide change | — | `fadeIn` keyframe 0 → 1 | 0.6s ease-out | — |
| Resources track | Keen `created` (or 1s fallback) | — | opacity 0.5 → 1 | 0.3s ease-in-out | — |
| Mobile logo marquee | always | — | `translateX(0 → −50%)` of doubled row | linear, 50px/s | — |

`pinOnExit` is off for this testimonial, so the pinned exit (`top top → +=1.5·vh`, `y −15vh`, opacity → 0) in the component is not used on this page.

### Keen Slider options
- Demos: `rubberband: false`; `<640` perView 1 / spacing 32 / snap (Scale passes `centered: true`, which Keen v6 ignores); 640–767 perView 2 free; 768–1040 perView 3.1 snap; ≥1041 perView 3 snap.
- Resources: `initial 0, mode snap, rubberband false, perView 1.05 / spacing 24`; ≥640 1.4 free; ≥768 2 free; ≥1280 2.8 free. Cursor `grab` / `grabbing`; Tab / Shift+Tab step slides.

## Libraries / versions
GSAP 3.15 (ScrollTrigger, SplitText), Lenis (shared clone layout, lerp 0.14), Keen Slider (`keen-slider/react`), react-fast-marquee on Scale (replaced by a CSS keyframe marquee at the same 50px/s). No three.js, Embla or Rive on this page.

## Assets (`public/scale-clone/public-sector-data-engine/`)
- `hero.webp`: hero map image (1920×1078)
- `why-scale.png`: checklist illustration (1944×1740)
- `prefooter.jpg`: prefooter photo (downscaled from 7952 px to 2400 px wide)
- Icons (Material laptop / sparkles / trend / check, chevron, play, triangle) are inlined from the source markup in `icons.tsx`.
- Not shipped: customer logos (neutral tiles), the four resource thumbnails (they carry Scale, partner and DoD marks; plain black tiles), the three demo posters (Scale product UI with baked-in titles; dark gradient panels stand in for them).

## QA
Screenshots at every 100% viewport over the page body, both sites, at 1440 and 390, plus `1440-*-hero-intro.jpg` (sampled mid-intro) and `1440-clone-cta-hover.jpg`.
- Hero intro sampled on both sites mid-animation: line `translate(0, ~300%)`, words `translate(30%)`, colour `rgb(114,206,123)`. They match.
- Testimonial panel width when its top is 900 / 700 / 500px from the viewport top: Scale 1253 / 1345 / 1382, clone 1253 / 1351 / 1385.
- CTA hover sweep: −154px → 0 over about 600ms, and back on leave.
- Section offsets match apart from copy length (placeholder strings wrap differently) and the shared header's announcement bar, which adds 39px above the hero in the clone.
- No console errors. `npx tsc --noEmit` is clean for these files.

## Remaining gaps
- Placeholder imagery: the demo posters and resource thumbnails are plain panels (see Assets), and the logo wall uses tiles.
- `why-scale.png` is still Scale's diagram, and its labels are Scale copy. It needs a Vahue replacement.
- Testimonial role pill: Scale types the text in (`animateToText`); the clone uses a left-to-right clip reveal.
- The Wistia player is not reproduced. The play buttons are inert.
- On mobile, Scale's active demo dot is white on a white page, so it's invisible. This is copied as-is.
- The resources radial wash (white on white, opacity 30, invisible) is omitted.
