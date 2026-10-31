# scale.com/evaluation/enterprise → /scale-clone/evaluation-enterprise

Captured 2026-10-31. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on an isolated Chrome tab (CDP 9230); Playwright with headless Chrome at 1440×900 and 390×844, scrolled in 50% viewport steps; the 38 production chunks downloaded and grepped.

Files: `app/scale-clone/evaluation-enterprise/page.tsx`, `components/scale-clone/evaluation-enterprise/*` (`FullBleedMedia`, `ArrowCta`, `BorderCta`, `Sections`, `content`, `icons`, `motion`, `styles.module.css`), `public/scale-clone/evaluation-enterprise/*`. QA: `reference-snapshots/scale-clone/qa/evaluation-enterprise/`.

The page is a hand-coded Next page built from shared slices: FullBleedMediaSection inside a ClipScrollSection (chunk `37xz28pjbnlx4.js`), and in chunk `0a0zz4e1l5m3e.js` FeaturesWithIcons (module 460138), ChecklistWithMedia (872447), the side-by-side list (497052) and BrowserMockup (720912). The FlatCta variants and intros are in `1h0nvyhf5gbrf.js`.

## REA evidence
- `analyze_web_bundle` (evidence `ev_a8b1e110…`): 38 scripts parsed, 0 failures, 698,718 AST nodes. Fingerprints: Next.js (turbopack runtime `turbopack-1byz1flvc-bu1.js`, `1uasl1k03j0me.js`, `0m6y-zqxv6dk8.js`) and React (`42ixmvih7808g.js`, `0tf-_wj6ckb5k.js`). Route candidates: `/_next/image`, `/static/images/components/side-by-side/media-placeholder.svg` (in the GSAP/vendor chunk `0sni47mcvnqwg.js`), and `/static/img/reskin/prefooter-default.jpg` (in the FullBleedMedia chunk `37xz28pjbnlx4.js`). WebGL extension lookups in `3kd41k7ews14b.js` come from the site-wide three.js chunk, but nothing on this page creates a canvas. The chunk graph has no static edges (turbopack runtime loading).
- `inspect_web_event_listeners`:
  - Hero `a.FlatCta` (arrow, `ev_18adfc62…`) and its sibling border CTA (`ev_db8434eb…`): each has a `mousedown` from `js.hs-analytics.net` (HubSpot analytics) and a React `click` from `42ixmvih7808g.js`. The hover sweeps come from React's delegated pointer handling, not from native listeners on the element.
  - `figure` (feature icon tile, `ev_9f113363…`), `article .rounded-2xl` (BrowserMockup frame, `ev_3de972d3…`) and `.ClipScrollSection` (`ev_82b98d96…`) have no listeners.
  - There's no canvas, slider, carousel, `pointermove` or cursor-reactive element on this page, so there is no mouse-position QA to do.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Spacing |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection, ClipScrollSection `startPercentage 0`, backdrop `bg-white`) | wrapper `pt-24 pb-10`; grid 12×`minmax(0,150px)` centred (8 cols on mobile), gap 8, `px-4`; card 1408×720 / 358×480, r24, `p-16` / `p-8`, content bottom-left, max-w 1152, gap 24. Image `genai-evaluation-for-enterprise.webp` (1920×1280, cover) on `#193a29`. Overlay `.media-overlay`: `linear-gradient(transparent 0%, #000 100%)` | h2 header2 `clamp(2rem,0.5rem+5vw,4rem)` / 1.05, −0.01em, white (64 → 32); body1 20/1.5 → 16/1.45 white | CTAs row `flex-col gap-4 md:flex-row`: arrow CTA 154×40 (white, r8, `pl-4 py-1 pr-1`, chevron tile 32 r6 black); border CTA 104×39 (1px white, r6, `px-4 py-2`), label 14/1.5 500 |
| 2 | The challenge (SectionHeader + FeaturesWithIcons) | `py-16`, container `max-w-[1472px] px-6`; header `max-w-3xl mb-10 md:mt-12`, centred; features `flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`, item `grow basis-full md:max-w-[368px] lg:basis-1/4` (368 wide at 1440, x 24 / 448 / 872) | eyebrow mono 12/24 +1px uppercase `#525252` `mb-5`; h2 30/1.375 → md 40 → lg 48/1.25; p `mt-4 lg:mt-2` 16 → lg 20 / 1.6 black/70; h4 24/1.5 `mt-6`; p 16/1.5 `#525252` `mt-4` | figure 44×44 r8, bg black/9, 1px black/10; Material glyph 22 in a 24 span (shield-x, help-outline, receipt paths) |
| 3 | The solution (SectionHeader + ChecklistWithMedia, media left, plain image, no dividers) | row `flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px] mx-auto`; media `md:w-7/12 p-2`, image 662×400 (1920×1160); list `md:w-5/12 flex-col gap-6` | title 16/1.5 500 black; body 14/1.5 black/70; `gap-2` | tick 22×22 round, black/9 + 1px black/10, MdCheck 12 black/70, `mt-0.5`, `gap-4` |
| 4 | How it works (SectionHeader + side-by-side list with BrowserMockup) | `space-y-14 md:space-y-24`; article `grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16`; text side alternates L/R/L/R/L (DOM order; on mobile the stack follows DOM order); text `max-w-[440px] space-y-5` | h3 24 → md 30 / 1.25, 600; p 16/1.625 black/70 | mockup: r16, 1px white/10, bg `#0b0b0b`; bar `px-3 py-2 gap-2` border-b white/10, three 10px dots (white/20) svg w-10, URL 12/1.5 white/40; image r12 at natural aspect (662×426…442 at 1440) |
| 5 | Prefooter (FullBleedMediaSection, `startPercentage 10`, backdrop `bg-gray-50` = `#f9fafb`) | wrapper `pt-16 pb-8`; same card as the hero, image `prefooter.jpg`, same gradient overlay, no body | h2 as hero | arrow CTA + border CTA (80 wide) |

Header and footer come from the shared clone layout. The header stays light because nothing on this page sits under a dark header, so there's no `data-nav-theme`.

Measured section tops at 1440, Scale vs clone: hero 39 / 39, challenge 895 / 895, solution 1547 / 1547, how-it-works 2423 / 2423, prefooter 5668 / 5668. Every h2, p, h4, article and image rect matches to within 1px, and the document is 7383 vs 7384 px tall. At 390 every body block matches to within 1px (articles 3162 / 3659 / 4139 / 4649 / 5155, prefooter image 5733). The only difference is the hero h2 (101 vs 108 px tall, see gaps).

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero / prefooter clip | ClipScrollSection root | `top bottom` → `center center` | `inset((1−p)·0.5·startPercentage % round 1.5rem)`: hero 0, prefooter 5% → 0 | linear map | onUpdate |
| Hero / prefooter media | same | same | `scale 1.25 → 1` (clamped map) | linear | onUpdate |
| Heading + body (AnimatedText cascade, SplitText `words,lines`, `mask: lines`) | section `top center`, once, retroactiveOnEnter | — | lines `yPercent 400, opacity 0`, words `x 30%`; colour `#72CE7B` → `#79648C` → own colour; line i at 0.08·i | lines 1s `power3.out`; words 0.9s, stagger 0.03; colour `power1.inOut` | — |
| Body | same | — | same cascade, +0.2s (`animateIn({delay: .2*t})`) | | |
| Arrow CTA `filledWhiteArrow` | same, `animateIn({duration: .85, delay: .5})` | — | `autoAlpha 0, scaleX 0, borderRadius 0` → `1, 1, 8`; counter scaleX 0 → 1 at +0.1; label opacity at 0.75; chevron `x −6 → 0` | 0.85s `power2.out` / chevron `power3.inOut` | — |
| Border CTA `fadeIn` | same call, delay 0.5 | — | `autoAlpha 0 → 1` | 0.85s `power2.out` | — |
| Arrow CTA hover | pointer enter / leave | — | 35% sheet `−100% → 0 → +100%` (x); chevron track `−50% → 0` | CSS 600ms ease-out | — |
| Border CTA hover | pointer enter / leave | — | 30% sheet `translate-y-full → 0 → −translate-y-full`; label `scale 0.9` | CSS 300ms ease-out | — |

Sampled on both pages (prefooter, top of the root at 900 / 700 / 500 / 300 / 100 / −100 px into the viewport). Scale: `inset 5% / 3.765% / 2.531% / 1.296% / 0.062% / 0`, scale `— / 1.1883 / 1.1265 / 1.0648 / 1.0031 / 1`. Clone: identical values. Mid-intro, the two CTAs share the same opacity on both pages (Scale 0.9579 / 0.9579; clone 0.2681 / 0.2681).

SectionHeaders, FeaturesWithIcons, ChecklistWithMedia and the side-by-side list have no motion on Scale (no AnimatedText class, no tweens). Under `prefers-reduced-motion` the clone doesn't split or tween anything: CTAs show at rest and the clip and scale stay at their resting values.

## Libraries / versions
GSAP 3.15 (ScrollTrigger and SplitText via `gsap.context`, reverted on unmount), and Lenis from the shared clone layout (lerp 0.14). This page uses no Keen, Embla, three.js scene, Rive or video.

## Assets (`public/scale-clone/evaluation-enterprise/`)
- `hero.webp` (1920×1280): `/static/img/reskin/headers/genai-evaluation-for-enterprise.webp`
- `img-bridge-trust-gap.webp` (1920×1160, the trust-curve chart)
- `img-measure-your-ai.webp`, `img-set-your-own-bar.webp`, `img-verify-hitl.webp`, `img-iterate.webp`, `img-deploy.webp` (1920×1236…1283, product UI screenshots)
- `prefooter.jpg`: the same `/static/img/reskin/prefooter.jpg`, downscaled to 2400 px wide (copied from the rlenvironments clone)
- Material glyphs, the FlatCta chevron and the mockup's traffic-light dots are inlined in `icons.tsx`. There's no Scale logo in the page body and no logo wall.

## QA
Screenshots in `qa/evaluation-enterprise/` (`1440-scale-NN.jpg` / `1440-clone-NN.jpg`, `390-…`): every 50% of the viewport for the first screen, then every 100%. 9 stops at 1440 and 10 at 390, 38 files in total. The OneTrust cookie banner is hidden in the Scale captures. No console errors on the clone. `npx tsc --noEmit` is clean for these files. The page returns 200.

## Remaining gaps
- Placeholder copy (`content.ts`, all `TODO: Vahue copy`) is length-matched, so wraps match at both widths except the mobile hero h2: 3 lines, 101 px vs Scale's 108 px. That's line-mask padding with a different face, and it moves the hero text up by 9 px.
- The imagery is still Scale's: the hero laptop render, the trust-gap chart ("With Scale GP…"), five product screenshots with Scale UI text and logo, and the prefooter photo. They need Vahue replacements. The mockup URL bar reads `app.vahue.example` (TODO).
- The 40 px difference in total height at 390 (7565 vs 7605) is in the shared footer, not this page.
- In the Scale capture the prefooter photo had only partly decoded at stop 07 (bottom band showing `#193a29`). That's a loading artifact, not a layout difference.
- I didn't re-sample the hero intro cascade mid-animation on Scale: it had finished before the page became scriptable in headless Chrome. The CTA intro values and the shared opacity of the two CTAs are confirmed from mid-intro samples and the chunk source.
- `oml:` (Scale's short-landscape variant) is not reproduced.
