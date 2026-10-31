# scale.com/rlenvironments → /scale-clone/rlenvironments

Captured 2026-10-31. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on an isolated Chrome tab (CDP 9230), Playwright with headless Chrome at 1440×900 and 390×844 (scrolled in 50% viewport steps), and the production chunks and CSS downloaded from the page.

Files: `app/scale-clone/rlenvironments/page.tsx`, `components/scale-clone/rlenvironments/*`, `public/scale-clone/rlenvironments/*`. QA: `reference-snapshots/scale-clone/qa/rlenvironments/`.

The page is a hand-coded Next page (`3za68ndmpk06v.js`, page module 799680), not CMS slices. It composes shared components: FullBleedMediaSection (478135 `compact`, 540431), SectionHeader (1900), CardGrid + LinkCard + BaseCard (540409 / 874328 / 598042), a side-by-side list (497052) and EnterprisePillars (909085).

## REA evidence
- `analyze_web_bundle` (evidence `ev_067a0d58…`): 47 scripts parsed, 0 failures. Fingerprints: Next.js (turbopack runtime `turbopack-1byz1flvc-bu1.js`) and React. Route candidates found in the chunks: `/static/pages/rlenvironments/rl_enviroment_hero.webp`, `/static/img/reskin/prefooter.webp`, `/static/img/reskin/prefooter-default.jpg`, `/_next/image`. Chunk graph: the page module is in `3za68ndmpk06v.js`, the CardGrid and EnterprisePillars are in `1pr295x5wseyf.js`, FullBleedMedia and the ScrollTrigger hooks (210104, 681201) are in `37xz28pjbnlx4.js`, AnimatedText is in `1h0nvyhf5gbrf.js`, GSAP/three are in `0sni47mcvnqwg.js` / `3kd41k7ews14b.js`. The three.js chunk is site-wide; nothing on this page uses it.
- `inspect_web_event_listeners`:
  - `a.FlatCta` (`ev_d0fb29b9…`): only a `mousedown` from `js.hs-analytics.net` (HubSpot analytics). The hover sweep is React's delegated pointer handling, not a native listener.
  - `.LinkCard` (`ev_c3a9ea41…`) and `.BaseCard` (`ev_b84a945a…`): no listeners. The cards are scroll-driven only, with no hover state (`hoveredColor` is unset).
  - `.EnterprisePillars video` (`ev_ab4c35d4…`) and the hero `video`: React media listeners (`play`, `pause`, `timeupdate`, `loadedmetadata`…) from the react-dom chunk `42ixmvih7808g.js`. They are plain autoplay loops with no custom interaction.
  - No canvas, slider, carousel, `pointermove` or cursor-reactive element exists on this page.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Spacing |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection `compact`, ClipScrollSection `startPercentage 0`) | wrapper `pt-12 md:pt-24 pb-10`; grid 8 cols / 12×`minmax(0,150px)` centred, gap 8, `px-4`; card 1408×720 / 358×480, r24, `p-16` / `p-8`, content bottom-left, max-w 1152, gap 24. Media: autoplay muted loop video (1924×1076) with poster, bg `#193a29`, overlay flat `bg-black/45` | h2 `clamp(2rem,0.5rem+5vw,4rem)` / 1.05, −0.01em, white; body1 20/1.5 → 16/1.45 | CTA 154×40 (FlatCta white, chevron tile 32 r6) |
| 2 | Features (SectionHeader + CardGrid) | container `max-w-[1472px] px-6`; header `max-w-3xl mb-10 md:mb-20 md:mt-12`; grid `py-12 xl:py-24`, `lg:grid-cols-4` gap 8 (flex-col gap 8 below lg); card bg `#f2f2f2` r16 (r8 below xl), `p-10` (24 below xl), gap 64 xl / 24 md / 20 | eyebrow mono 12/24 +1px uppercase `#525252` `mb-5`; h2 30/1.375 → md 40 → lg 48/1.25; card h5 24/1.5 (18/1.35 below xl); body 16/24 `#212121` | icon tile 64 (40 below md) r12 `bg-black/6`, Material glyph 32 in `#273252 / #193A29 / #79648C / #A8927C`. Masked lines add 0.125em between lines (title step 39, body step 26) |
| 3 | Overview | section bg `#f2f2f2` `py-16 md:py-24`; same header; `md:grid-cols-3` gap 24; card white r16, 1px `#eaeaea`; image `aspect-[4/3]` cover on `#eaeaea`; text `p-6` | h3 header5 24/1.5 (22/1.05 <768) `mb-3`; p 14/1.625 `#575757` | card 448×537 at 1440 |
| 4 | Capabilities (side-by-side) | `py-16 md:py-24`; items `space-y-14 md:space-y-24`; article `grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16`, text left then right; image frame r16, 1px black/10, white, `p-2`, `shadow-[0_18px_60px_rgba(0,0,0,0.08)]`, img r12 at its natural aspect (598×371 / 598×374) | h3 24/1.25 → md 30, **600**; p 16/1.625 black/70; text `max-w-[440px] space-y-5` | — |
| 5 | Environment types (EnterprisePillars) | `py-24` white; grid-layout (8 cols / 12×150 centred, gap 8, px 24); left `md:col-start-2 md:col-span-5` flex-col gap 24 with a square video (r16, 1200×1200 loop); right `md:col-start-8 md:col-span-4` flex-col gap 20 / 40 | overtitle detail-mono 13/1.2 (10 <768) `#929292`; h2 header2 64/1.05 (32); body1 20/1.5 `#575757` (16/1.45); card h5 24/1.5 (22/1.05); subtitle 16/1.5 (14 <768) | icon 40 r8 bg `#273252 / #193A29 / #839CB2`, glyph 20 white; heading block `pt-6 gap-6`; divider 1px `#eaeaea` `mt-5 md:mt-10` |
| 6 | Prefooter (FullBleedMediaSection, `startPercentage 10`) | wrapper `pb-8`; same card as the hero, image `prefooter.jpg` on `#193a29`, overlay `bg-black/45`, no body | h2 as hero | — |

Header and footer come from the shared clone layout. The header stays light: Scale mounts `PageTheme theme="light"`, and nothing on this page flips it, so there's no `data-nav-theme`.

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero / prefooter clip | ClipScrollSection root | `top bottom` → `center center` | `inset((1−p)·0.5·startPercentage % round 1.5rem)`: hero 0 (none), prefooter 5% → 0 | linear map | onUpdate |
| Hero / prefooter media | same | same | `scale 1.25 → 1` | linear | onUpdate |
| Heading + body (AnimatedText cascade) | section `top center`, once, retroactive | — | lines `yPercent 400, opacity 0`, words `x 30%`, colour `#72CE7B` → `#79648C` → own colour; line i at 0.08·i | lines 1s `power3.out`; words 0.9s stagger 0.03; colour `power1.inOut` | — |
| Body | same | — | same, +0.2s | | |
| CTA filledWhiteArrow | same, delay 0.5 | — | `autoAlpha 0, scaleX 0, radius 0` → `1, 1, 8`; chevron `x −6 → 0` | 0.85s `power2.out` / `power3.inOut` | — |
| CTA hover | pointerenter / leave | — | 35% sheet `−100% → 0 → +100%`; chevron track `−50% → 0` | CSS 600ms ease-out | — |
| Feature card (BaseCardScroll) | each card | `top bottom` → `top 50%` | `scale 0.96 → 1`, `opacity 0 → 1`; ≥1024px: x `−160` (col 1, origin right) / `+160` (col 4, origin left) → 0 | progress windowed per card: `l = min(0.1, 0.85/(n−1))`, card i maps `[i·l, i·l + 1 − (n−1)·l]`, then `power2.out` | scrub (onUpdate) |
| Feature icon tile | CardGrid section `top bottom`, once | — | `clip-path inset(0 100% 0 0 round 10px)` → `inset(0)` | 0.5s `power1.out`, delay 0.05·i + 0.125 | — |
| Feature glyph | same | — | opacity 0 → 1 | 1s `power1.out`, +0.05 | — |
| Feature title / body | same | — | AnimatedText cascade | title at +0.16, body at +0.34 | — |
| Env-type icon | section `top 80%`, once | — | opacity 0 → 1 | 0.5s (default ease) | — |
| Env-type headline / subtitle | same, `setTimeout(i·200ms)` | — | cascade | headline delay 0.2 (word stagger 0.06), subtitle delay 0.4 (0.03) | — |
| Env-type divider | same | — | `scaleX 0 → 1` (origin left) | 0.5s, delay 0.2·i + 0.2 | — |

Section headers, Overview cards and Capabilities rows have no motion. Under `prefers-reduced-motion` nothing is split or tweened, dividers render full width, and the hero video is paused on its poster.

## Libraries / versions
GSAP 3.15 (ScrollTrigger, SplitText via `gsap.matchMedia`/`gsap.context`), and Lenis from the shared clone layout (lerp 0.14). This page uses no Keen, Embla, three.js scene or Rive.

## Assets (`public/scale-clone/rlenvironments/`)
- `hero.mp4` (5.4 MB, 1924×1076, from Scale's R2 bucket) and `hero.webp` poster (1920×1076)
- `environment-types.mp4` (4.4 MB, 1200×1200 line-art loop, from Sanity)
- `product-built-to-advance.webp`, `product-systems-signals.webp`, `product-rl-ready-data.webp` (1536×1024 UI illustrations)
- `capability-computer-use.webp` (598×371), `capability-tool-mcp.webp` (598×374): product UI screenshots
- `prefooter.jpg`: downscaled from 7952 px to 2400 px wide
- The seven Material glyphs and the FlatCta chevron are inlined from the page markup in `icons.tsx`. There's no Scale logo on this page body and no customer logo wall.

## QA
Screenshots of Scale and the clone at 1440×900 and 390×844 (every 50% of the viewport for the first two screens, then every 100%), in `qa/rlenvironments/` (`1440-scale-NN.jpg` / `1440-clone-NN.jpg`, `390-…`).
- Section offsets once images have loaded, at 1440, Scale vs clone: hero 39/39, features 943/943 (851 vs 825 tall), overview 1794/1768, capabilities 1421/1421 tall, environment types 982/982, prefooter 752/752. At 390: hero, capabilities and prefooter heights match; features is 1262 vs 1250, and the pillars are 1253 vs 1207 because the subtitles wrap differently. All the remaining deltas come from placeholder copy wrapping differently.
- Card scrub sampled with the first card's top at 800 / 700 / 600 / 500 px. Scale: `op .636 x −58.3`, `.370`, `0`, `0 x +160` → … → all 1. Clone: `op .640 x −57.5`, `.377`, `.009`, `0 x +160` → … → all 1. They match within Lenis lag.
- Capability images: before they load lazily, Next's width/height attributes (598×820 and 598×900) make the frames 886 and 972 px tall on Scale. Once loaded they are 401 and 404 px, which the clone reproduces.
- No console errors. `npx tsc --noEmit` is clean for these files. The page returns 200.

## Remaining gaps
- Placeholder copy (`content.ts`, all `TODO: Vahue copy`) changes some line wraps and therefore some section heights (−26 to −46 px).
- The imagery is still Scale's: the hero/product/capability renders, both videos and the prefooter photo. The two capability screenshots show Scale's internal "GUI/MCP Agent Executor" UI text, and they need Vahue replacements.
- The hero intro cascade reuses the measured AnimatedText implementation from the public-sector clone. I didn't re-sample it mid-animation on this page.
- `oml:` (Scale's short-landscape variant: pillars switch to a row, CardGrid drops its padding) is not reproduced.
- I didn't verify how Scale's hero video behaves under reduced motion. The clone pauses it, which leaves the poster or first frame showing.
