# scale.com/security clone spec

Route: `/scale-clone/security/` · Page: `app/scale-clone/security/page.tsx` · Components: `components/scale-clone/security/` · Assets: `public/scale-clone/security/` · QA: `reference-snapshots/scale-clone/qa/security/`

Captured 2026-10-31 at 1440×900 and 390×844 (computed styles after a 50%-viewport scroll sweep), REA on an isolated Chrome tab (CDP 9230), production chunks grepped locally.

## Libraries (REA `analyze_web_bundle`, evidence `ev_9cfd2c75…`)
- 46 scripts parsed, 0 failures. Fingerprints: Next.js (high, `next-runtime`, Turbopack chunk `turbopack-1byz1flvc-bu1.js`, `version:"16.4.2"` in `0m6y-zqxv6dk8.js`), React (medium).
- GSAP **3.15.0** (`2d7ykwtxp_8ed.js`), ScrollTrigger + SplitText (AnimatedText module 668761 in `1h0nvyhf5gbrf.js`), Lenis (shared site settings, see `scale-motion-stack.md`). three.js chunk `3kd41k7ews14b.js` loads site-wide but there is **no canvas on this page**. No carousel, no Rive on this page.
- Chunks that own this page's motion: `058pnujclak3f.js` / `0c1-uups1drfu.js` (ScrollRevealSection, module 756386), `37xz28pjbnlx4.js` (ClipScrollSection + FullBleedMediaSection 540431 + AnimatedFlatCta 961870), `2k1qlgdxlbmz1.js` (CardGrid + BaseCardScroll 598042).

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Source |
|---|---|---|
| Promo `a.FlatCta[href="/public-sector"]` | `mousedown` (passive false), `click` | HubSpot analytics `hs-analytics.net …4823527.js:18443`; Next Link router `42ixmvih7808g.js:20015` |
| Pre-footer `.FullBleedMediaSection a.FlatCta` | `mousedown`, `click` | same two (analytics + router) |
| `a[href^="mailto:"]` | `mousedown`, `click` | same two |
| `.LinkCard` (CardGrid card) | none | cards are not links on this page |
| `.ScrollRevealSection` | none | motion is ScrollTrigger-driven (window scroll via Lenis) |

FlatCta hover is React's delegated `pointerenter/leave` at the root (not visible on the node) → CSS transitions (fill 600ms ease-out from `-translate-x-full`, chevron track 600ms).

## Sections (top → bottom, 1440 / 390)
1. **Hero** `FullBleedMediaSection` in `ClipScrollSection`, wrapper `pt-24 pb-10` (mobile `pt-12`), `px-4`. Card 1408×720 (mobile 358×480), radius 24, `p-16` (mobile `p-8`), content bottom-left max-w 72rem, gap 24. H2 header2 64/1.05 −0.01em (32 mobile) white; body1 20/1.5 (16/1.45) `text-balance`. Empty CTA row still renders (adds a 24px gap). Media bg `#193A29`, overlay `linear-gradient(#0000, #000)`. Image `hero.webp` 1400×1050 object-cover.
2. **Commitment** `section py-120 (72)` white, container max-w 1472 `px-6`. SectionHeader: overtitle 12/24 +1px uppercase mono `#525252` mb 20; title 48/1.25 (42 md, 30/1.375 mobile), centered on mobile. CardGrid `py-24 (py-12)`: 3 columns, gap 8, cards 458.67×435 `#f2f2f2`, radius 16 (8 <1280), padding 40 (24 <1280), gap 64 (24 md / 20). Icon box 64 (40 mobile) radius 12 `bg-black/6`, Material icons 32px lock `#79648C`, shield `#A8927C`, public `#839CB2`. Title 24/1.5 (18/1.35 <1280). Description 16/24 `#212121`, top-aligned, equal min-height.
3. **Compliance** `ScrollRevealSection`: backdrop `#f2f2f2`, black panel origin-top (see motion). Content `py-120 (72)` white. SectionHeader with right-hand subtitle (20/1.6 white/70, `md:flex-row md:items-end gap-6`). Grid `md:grid-cols-2 gap-4`; articles `rounded-2xl border-white/10 bg-white/5 p-10 (p-8)`, `sm:flex-row gap-6`; badge box 64 `rounded-lg bg-white/10` with a 40px logo; h3 24/1.5 (22/1.05); body3 14/22.75 white/70 with an underlined link.
4. **Promos** `section bg #f2f2f2 py-120 (72)`; `grid md:grid-cols-2 gap-6`; cards `min-h-600 rounded-2xl bg/border #839cb2`, content `p-10 gap-5`: detail-mono 13 (10) black/50, header3 40/1.25 (24/1.05) black, body2 16/1.5 (14/1.35) black/70, outlined arrow FlatCta (1px black, radius 6, 50px tall, icon box transparent). Image 288×288 bottom-right (`capitol.webp` object-cover top; `shield.webp` object-contain).
5. **Disclosure** `py-120 (72)`, centered column gap 16: detail-mono `#929292`, H2 header2 max-w-xl black, body1 max-w-md `#929292` with underlined mailto.
6. **Pre-footer** FullBleedMediaSection (`pb-8`), H2 header2 2 lines + white "arrow" FlatCta (radius 8, 40px, black 32px icon box). Image `prefooter.jpg` (downscaled to 2400w from 7952w).

## Motion
| Element | Trigger | Start → End | From → To | Ease / dur | Notes |
|---|---|---|---|---|---|
| ClipScrollSection clip (pre-footer) | wrapper | top bottom → center center | `inset(5% round 1.5rem)` → `inset(0%)` | linear (progress) | startPercentage 10 ×0.5; hero observed at `inset(0%)` (startPercentage 0) |
| FullBleedMedia media | section | top bottom → center center | scale 1.25 → 1 | linear (progress) | module 540431 `v(progress,0,1,1.25,1)` |
| FullBleedMedia text | section | top center, once, retroactive | AnimatedText intro, h2 delay 0, body delay 0.2 | see AnimatedText | lines `yPercent 400→0` 1s power3.out, 0.08/line; words `x 30%→0` 0.9s, stagger 0.03; colour tint #72CE7B→#79648C→final; line masks with 0.12em descender compensation |
| Pre-footer CTA | same | — | filledWhiteArrow: scaleX 0→1, radius 0→8, autoAlpha | 0.85s power3.out, delay 0.5 | counter scaleX +0.1s, arrow x −6→0 power3.inOut |
| BaseCard (×3) | card | top bottom → top 50% | scale 0.96 → 1, opacity 0 → 1 | progress staggered r=min(0.1,0.85/(n−1)), window [i·r, i·r+1−(n−1)·r], eased power2.out | origin center; directionalEntrance off |
| Card icon box | CardGrid section | top bottom, once, retroactive | `clip-path inset(0 100% 0 0 round 10px)` → `inset(0 round 10px)` | 0.5s power1.out, delay 0.125 + 0.1i | icon opacity 0→1 1s power1.out +0.1 |
| Card title / description | same | — | AnimatedText intro | delay 0.125+0.1i, description +0.14 | |
| ScrollReveal panel | section | top bottom → top top | `l = map(p, .5..1)`; scaleX `1−2·24/width` (12 under 768) → 1 over l 0..0.8; top radii 16 → 0 | linear (progress), quickSetter | sampled mid-scroll: scroll 1500 → scaleX 0.970648, r 14.0889 on both Scale and clone |
| FlatCta hover | pointer | — | fill `-translateX(100%)`→0 (opacity .35/.30); chevron track −50%→0 | 600ms `cubic-bezier(0,0,.2,1)` | label scale .9 (300ms) on non-arrow variants |

All tweens respect `prefers-reduced-motion` (text starts visible, panel full width, no scrubs) and are cleaned up via `gsap.context().revert()` + `SplitText.revert()`.

Mid-scroll sample (1440, BaseCard transform/opacity) Scale vs clone: scroll 500 → 0.9912/0.78, 0.9842/0.61, 0.9742/0.36 vs 0.9915/0.79, 0.9849/0.62, 0.9757/0.39.

## Assets (`public/scale-clone/security/`)
`hero.webp` (1400×1050), `capitol.webp` (1254²), `shield.webp` (1254², "shield-nobg"), `prefooter.jpg` (2400×1103, downscaled). Not shipped: Scale logo, the four certification badges (SOC 2 / ISO / DISA / FedRAMP marks → neutral 40px placeholder tiles, TODO). Icons are inline Material Design paths (same as Scale's react-icons).

## QA
Screenshots every 100% viewport (both widths): `1440-{scale,clone}-00..06.jpg`, `390-{scale,clone}-00..09/08.jpg`. Page height 1440: Scale 5923 = clone 5923; every section top matches to the pixel (hero h2 614, sections 895/1907/2951/3791/4273, footer 5025). 390: main 6250 = 6250; section tops match (670, 1958, 4170, 5538, 5839). No console errors; 200 on the dev server.

## Remaining gaps
- Placeholder copy wraps differently from Scale's text in a few places (hero title/body on mobile, card descriptions), which moves a few lines by ±1 line height inside fixed-height blocks.
- Certification badges are placeholder tiles (third-party marks not shipped).
- Scale's lazy `next/image` for the promo images / pre-footer didn't load in headless captures; the clone shows the images, which is the intended live state.
- AnimatedText `animateIn({ duration: 2 })` call in CardGrid: Scale's default AnimatedText timeline uses fixed per-line durations, so the `duration` argument isn't modelled.
- 390 page total differs by 40px, all in the shared footer (1360 on Scale vs 1320 in the shared `ScaleFooter`), not this page.
