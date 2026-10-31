# scale.com/physical-ai: clone spec

Source: https://scale.com/physical-ai. Clone: `/scale-clone/physical-ai/` (`app/scale-clone/physical-ai/page.tsx` → `components/scale-clone/physical-ai/`).
Captured 2026-10-31 at 1440×900 and 390×844 with Playwright (computed styles, mid-animation sampling) and the page's production chunks (`37xz28pjbnlx4.js`, `1h0nvyhf5gbrf.js`, `197mu5y2fw9hi.js`, CSS `3ektzubma58z1.css`, `0npdyq12us3md.css`).

The header and footer are shared and not part of this spec. All type is the display face (Scale: Aeonik) except eyebrows, the testimonial heading and the role chip (mono). Tracking is −0.01em everywhere unless noted. Copy is placeholder (`content.ts`, marked `TODO: Vahue copy`), sized so every block wraps to the same number of lines as Scale's at both widths.

## Sections, top to bottom

Y positions are relative to the hero top (1440 / 390). After QA the clone matches every section top and height at both widths.

| # | Section | Layout | Type / spacing |
|---|---|---|---|
| 1 | **Hero** (FullBleedMediaSection in ClipScrollSection, `startPercentage 0`) | wrapper `pt-24 pb-10`; 16px side gutter; card 1408×720 (358×480 mobile), radius 24, `clip-path: inset(0 round 1.5rem)`; padding 64 (32 mobile); content bottom-aligned, `flex-col gap-6`, max-w 72rem | H2 `clamp(2rem, .5rem+5vw, 4rem)` / 1.05, white. Body 20/1.5 (16/1.45 mobile). CTA arrow pill (below). Logo strip: `mt-4 gap-2 max-w-md`, 6px triangle + 10px uppercase +0.05em label `#929292`; marquee `opacity .4`, gap 32, logos ≤70×28. Media: `#193A29` fill, image cover, overlay `bg-black/45` + `linear-gradient(#0000, #000)` |
| 2 | **Product overview** | legacy section `pt-16 pb-16 md:pt-20`; container max 1280, px 24 / 32 (1216 content); header `max-w-3xl md:mt-12 mb-10` centred | Eyebrow 12/24 mono +1px uppercase (black here, `#525252` elsewhere), `mb-5`. H2 48/1.25 (30/1.375 mobile; 40 at md). 2-col grid `gap-x-14 gap-y-12`; item `flex gap-4`: 44×44 icon tile (radius 8, `bg black/9%`, 1px `black/10%`, 22px icon), h4 24/1.5 regular, p `mt-4` 16/1.5 `#525252` |
| 3 | **Client testimonials** (evergreen) | `pt-20 pb-20` (pb 64 mobile); 12-col grid gap 8, px 24 (8 cols, px 12 mobile); panel bg `#193A29` radius 16, width 90%→100%; inner `lg:py-20`, `p-8` mobile. Left column col 2 (109px): heading, tiles (109² , radius 8, 1px white, gap 8, `mb-2`), arrows (50² at 1440, 40² mobile, radius 6). Right: cols 5–11, `flex-col justify-between gap-16` | Heading 12/1.375 mono medium uppercase. Quote 40/44 (24/28 mobile), tracking −0.05em, first-line indent 160px (100 mobile), line masks add 0.12em → 48.8px pitch. Name 18/1.25 medium (16 mobile), right-aligned at lg. Role chip mono 10px, white bg, evergreen text, radius 4, `p-1 px-2`. Mobile: header row (heading w-1/2 + arrows), quote stack (grid-area 1/1, height = longest quote), name, 80px tile row |
| 4 | **Use case** | legacy section; 2-col grid `gap-12` (`gap-8` mobile), items centred | h3 24/1.5 medium `mb-4`; p 16/1.5 gray-700 (`#364153`), `mb-4` between. Isometric PNG 584 wide, natural ratio, in `rounded-2xl` wrapper (overflow visible ≥md) |
| 5 | **Key features: embodiments** | legacy section; header with 20/1.6 subtitle (`black/70`, `lg:mt-2`); 3-col grid `xl:gap-x-10 gap-y-14` (`md:gap-6`, 1 col mobile gap 56) | Card image 4:3, radius 12 + `::after` 1px `#fff3` hairline, img radius 8; title `mt-12` (`mt-8` mobile) 24/1.5; body `mt-3` 16/1.65 `black/70` |
| 6 | **Environments** | as 5, eyebrow empty (keeps its 20px margin) | as 5 |
| 7 | **Annotations + chart** | legacy section; row 1 media-left 2-col `gap-12`; row 2 `mt-16` text-left | Multimodal screenshot 584×427. Chart: `aspect-video` `#080808` radius 12, SVG 580×360 (axes `rgba(255,255,255,.7)` 1.5px, labels 13px), three log curves `#E05533` / `#7B6FF0` / `#52C041` (ceilings .4/.65/.9, stroke 2.5) |
| 8 | **The difference** | legacy section, no eyebrow; `flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; items `basis-1/4 grow md:max-w-[368px]` (368 wide at 1440, x 112/536/960) | icon tile, h4 `mt-6` 24/1.5, p `mt-4` 16/1.5 `#525252` |
| 9 | **Prefooter** (FullBleedMediaSection, `startPercentage 10`) | wrapper `pt-16 pb-8`, backdrop gray-50 `#f9fafb`; same card as hero, no body/logos | H2 as hero; CTAs: arrow pill + border button (1px white, radius 6, `px-4 py-2`, 14px medium) |

Breakpoints: 768 (md: section top padding, 2-col cards), 1024 (lg: 2/3-col grids, testimonial desktop grid, H2 48), 1280 (xl gaps). The testimonial switches tile slide axis at `max-width: 768px`.

## Motion

Libraries on the page: GSAP 3.15.0 (ScrollTrigger, SplitText), Lenis 1.3.21 (lerp 0.14, run by the shared clone layout), React/Next. No three.js, carousel library or Rive on this page. No cursor-reactive elements; pointer interaction is limited to CTA/arrow hovers and testimonial clicks.

| Element | Trigger | Start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero + prefooter clip (ClipScrollSection) | outer wrapper | `top bottom` → `center center` | `clip-path: inset(startPercentage/2 % round 1.5rem)` → `inset(0%)` (hero 0 → 0, prefooter 5% → 0) | linear map of progress | `scrub: true` |
| Hero + prefooter media | section | `top bottom` → `center center` | `scale 1.25` → `1` | linear map | `scrub: true` |
| Hero/prefooter intro | section | `top center`, once, retroactive | — | CTAs `animateIn({duration .85, delay .5})`; headline then body `animateIn` with `delay .2 × i` | no |
| AnimatedText default (H2, body) | via intro | — | SplitText `lines,words`, masked lines (+0.12em pad/−0.12em margin). Lines `yPercent 400, opacity 0` → 0/1; words `x 30%, opacity 0` → 0/1; colour `#72CE7B` → `#79648C` → CSS colour | per line `i`: line at `.08i`, 1s `power3.out`; line colour at +.22 (.3276s) then .4524s `power1.inOut`; words at +.04, .9s `power3.out` stagger .03, colour at +.198 (.29484s) then .40716s | no |
| CTA "filledWhiteArrow" intro | via intro | — | root `autoAlpha 0, scaleX 0, radius 0` (origin left) → 1/1/8; inner `scaleX 0→1`; label opacity 0→1; arrow `x −6→0` | root .85s `power3.out` at 0; inner .85s at .1; label at .75; arrow .85s `power3.inOut` | no |
| CTA "fadeIn" intro (border) | via intro | — | `autoAlpha 0 → 1` | .85s `power3.out` | no |
| CTA hover (arrow) | pointer | — | 35% `currentColor` wash `-translate-x-full → 0`, exits `→ translate-x-full`, resets after 680ms; arrow strip `-50% → 0` | CSS 600ms ease-out | no |
| CTA hover (border) | pointer | — | 30% wash `translate-y-full → 0`, exits up; label `scale .9` | CSS 300ms ease-out | no |
| Logo marquee | mount | — | `translate(0) → translate(-50%)` over 2 copies | CSS 40s linear infinite (motion-safe) | no |
| Testimonial panel bg | panel | `top bottom` → `bottom 75%` | `width 90% → 100%` | `power3.out` (dur 1.15) | `scrub: true` |
| Testimonial select | section | `top 80%`, once | index −1 → 0 | — | no |
| Quote / name flip (customAnimation `d`) | index change | — | in: lines `rotationX −90, yPercent 108` (perspective 900, origin 50% 100%) → 0; out: `rotationX 90, yPercent −max(108, (h+pad+1)/h·(900+h)/900·100)` | .48s `power2.out` stagger .05; old quote out at 0, new quote in at .35s; old name out .5s, new name in .5s | no |
| Role chip | index change | — | width → 20px, swap text, text opacity → 1, width → text + 26px | .5s `power3.out` (opacity .5s none), delay .05 | no |
| Logo tiles | index change | — | white fill `y ±100% → 0` (desktop) / `x` (mobile) | .3s | no |
| Arrow buttons | hover | — | bg `white/0 → white`, colour white → evergreen, border → transparent | .3s | no |
| Model chart | IntersectionObserver 25% | — | `stroke-dashoffset len → 0`; labels opacity 0 → 1 | 1.6s `cubic-bezier(.4,0,.2,1)`, delays 0/.3/.6; labels .5s ease at delay+1.45s | no |

Legacy sections (2, 4–8) have no scroll motion on scale.com.

Verified in the clone by sampling inline transforms mid-animation against scale.com: hero line `yPercent` / colour curves, CTA `scaleX`, prefooter clip (`5% → 4.698% → 2.846% → 1.611% → 0%` at scrollY 5200/5500/5800/6000/6300) and media scale (`1.25 → 1.2349 → 1.1423 → 1.0806 → 1`), and testimonial bg width (1253 → 1329 → 1387 → 1392 px at scrollY 500/800/1100/1400) all match to the pixel. Reduced motion: no splits or scrubs, clip at 0, testimonials swap by opacity.

## Assets (`public/scale-clone/physical-ai/`)

- `hero-robotics-lab.webp` (1920×1078), `prefooter.webp` (1920×882, re-encoded from Scale's 7952px JPEG via its image endpoint)
- `use-case.png` (isometric illustration, 564×332 source), `img-multimodal.webp`
- `img-embodiment-1..3.webp`, `img-environment-1..3.webp`
- `icons/icon-*.svg`: the nine Material outline icons used in the feature tiles (also inlined in `icons.tsx`)
- Not downloaded: Scale logo, customer logos (hero strip uses neutral 70×18 placeholder tiles inside the 70×28 logo bounds).

## QA

Screenshots in `reference-snapshots/scale-clone/qa/physical-ai/`: `1440-{scale,clone}-00..10` (every 80% of the viewport), `390-{scale,clone}-00..08` (every 125%). Section tops and heights match Scale at both widths (verified by script, not only by eye). Page returns 200, no console errors, `tsc` clean for these files.

## Remaining gaps

- On Scale, clicking a testimonial arrow also scrolls the section into view with Lenis (`scrollTo(section, { offset: -24 })`). The shared layout doesn't expose its Lenis instance, so the clone skips this scroll.
- On Scale, the testimonial flip-in starts about 100ms later after a click than in the clone (React/Lenis overhead on their side). Durations, eases and staggers match.
- The model chart's curves stay hidden until the chart is 25% in view. On Scale they are fully drawn until then and snap back to draw in, which looks like a flash. Not reproduced.
- Testimonial tiles show the client name. Scale's code supports client logos in the tiles, but this page uses names only.
- Hero logo strip uses placeholder tiles (TODO: partner logos).
- Scale's `lg:line-clamp-8` on the quotes is not applied. The placeholder quotes fit in 8 lines, and `max-h-[8lh]` with `overflow-y: clip` is kept.
- Scale's screenshots include their cookie banner overlay (not part of the page).
