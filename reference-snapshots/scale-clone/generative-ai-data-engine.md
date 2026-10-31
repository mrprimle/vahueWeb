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

**CTA (FlatCta "arrow")**: white `rounded-lg`, height 40, `pl-4 py-1 pr-1 gap-4`; label 14/21 500 capitalized; 32×32 black `rounded-md` chip with a 200%-wide chevron strip. Hover: a `bg-current` wash at opacity 0.35 slides from `translateX(-100%)` to `0`, and the strip goes from `-50%` to `0` (both 0.6s `cubic-bezier(0,0,0.2,1)`).

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
| Role tag | same | — | text types in (`animateToText`) | about 0.03s per character (estimated), delay 0.05 | — |
| Demo poster swap | slide click / slide change | — | CSS `fadeIn` opacity 0 → 1 | 0.6s ease-out | — |
| Logo marquee (mobile) | — | — | translateX 0 → −50% | linear, 8.6s loop (50px/s) | — |

Keen Slider options (copied verbatim):
- Demos: `rubberband:false`; `≤639: perView 1, spacing 32, snap, centered`; `640–767: perView 2, free`; `768–1040: perView 3.1, snap`; `≥1041: perView 3, spacing 32, snap`. On scale.com `centered:true` sits in the v5-style key; the clone uses `origin:'center'`.
- Resources: `initial 0, snap, rubberband:false, perView 1.05, spacing 24`; `≥640: free, 1.4`; `≥768: free, 2`; `≥1280: free, 2.8`. Cursor is `grab` normally and `grabbing` while dragging. The track fades in (0.3s) once created.

Reduced motion: no splitting, no clip/scale, panel at 100%, marquee and transitions off.
Cleanup: every effect uses `gsap.context` and reverts its SplitText instances on unmount.

## Assets (`public/scale-clone/generative-ai-data-engine/`)
`hero.webp` (1920×686), `expertise.png` (1188×616), `lifecycle.png` (1216×637), `product-overview.webp` (1920×1190, static), `prefooter.jpg` (1920×882), `resource-report.png` (640×400), `demo-1/2/3.jpg` (Wistia posters, 960×536). Feature icons are inlined react-icons Material paths (MIT). Not downloaded: Scale's logo, customer logos (Meta, Cohere, NTT) and the TIME case-study image, which carries a third-party brand. These show as neutral tiles.

## QA
Screenshots are in `reference-snapshots/scale-clone/qa/generative-ai-data-engine/` (`{1440|390}-{scale|clone}-NN.jpg`, one viewport per step). At 1440, section tops match within ±3px through the features block. After that, the clone sits about 27px higher because the shorter placeholder copy in the features grid wraps to fewer lines. At 390 the clone runs about 40–100px taller for the same reason: the placeholder copy wraps differently. No console errors on the clone.

## Remaining gaps
- The demo player is a poster plus play button only. The Wistia player isn't embedded (TODO).
- Keen plugins passed on scale.com (`[o.f]`, `[a.f]`, probably wheel/keyboard helpers) aren't reproduced. Only the Tab-key slide navigation in the resources carousel is missing.
- The role-tag typewriter timing is estimated; the `animateToText` source wasn't recovered.
- The `expertise.png` and `lifecycle.png` illustrations carry Scale's baked-in English labels ("Scale Smart workspace…"). They need Vahue versions.
- The first resources card is a neutral tile, since the original is a customer-brand image.
- scale.com sometimes renders the resources carousel at `perView 2` at 1440 (breakpoint measured with the scrollbar). The clone follows the `2.8` state seen in most captures.
- Fonts are Vahue's, so line breaks and the quote's line count differ slightly from Scale's Aeonik.
