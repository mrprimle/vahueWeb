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
| Heading + body (AnimatedText cascade, SplitText `words,lines`, `mask: lines`) | section `top center` (end `bottom 20%`), runs once, retroactiveOnEnter | — | lines `yPercent 400, opacity 0`, words `x 30%`; colour `#72CE7B` → `#79648C` → own colour; line i at 0.08·i | lines 1s `power3.out`; words 0.9s, stagger 0.03; colour `power1.inOut` | — |
| Body | same | — | same cascade, +0.2s (`animateIn({delay: .2*t})`) | | |
| Arrow CTA `filledWhiteArrow` | same, `animateIn({duration: .85, delay: .5})` | — | `autoAlpha 0, scaleX 0, borderRadius 0` → `1, 1, 8`; counter scaleX 0 → 1 at +0.1; label opacity at 0.75; chevron `x −6 → 0` | 0.85s `power2.out` / chevron `power3.inOut` | — |
| Border CTA `fadeIn` | same call, delay 0.5 | — | `autoAlpha 0 → 1` | 0.85s `power2.out` | — |
| Arrow CTA hover | pointer enter / leave (FlatCta state machine) | — | 35% sheet `−100% → 0 → +100%` (x), snaps back to −100% on the 680ms timer; chevron track `−50% → 0`, snaps back on leave | CSS 600ms ease-out | — |
| Border CTA hover | pointer enter / leave (same state machine) | — | 30% sheet `translateY(100%) → 0 → −100%`, snaps back to +100% on the 680ms timer; label `scale 0.9` (CSS group-hover) | CSS 300ms ease-out | — |

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

## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab. `analyze_web_bundle` (`ev_11df960a1b34…`, 45/45 scripts parsed, 0 failures). The chunks were compared by sha256: FlatCta/AnimatedText `1h0nvyhf5gbrf.js` (`10b2627a…`) and FullBleed/ClipScrollSection/useScrollTrigger `37xz28pjbnlx4.js` (`b234eef5…`) are byte-identical to the copies read in the rlenvironments and automotive audits, so their FlatCta findings carry over. The page slices are in `0a0zz4e1l5m3e.js` (`dfe245ca…`). `inspect_web_event_listeners` ran on every section root and interactive child (ids below). Then Playwright ran identical inputs on scale.com, the clone and `/strategy` (script `scratchpad/ee-audit/qa.js`) at 1440×900:
- hero and pre-footer CTA hover, leave and re-enter for both CTAs, sampled every 100ms (border every 50ms on enter)
- the hero media at 5 scroll positions
- the pre-footer scrub at 10 points
- a jump straight to the page bottom (the pre-footer intro must still play)
- a 3×3 mouse grid over every section (transform, opacity, translate, background and text colour of every visible node before and after)

QA images: `qa/evaluation-enterprise/interactions/<name>-{scale,clone,vahue}.jpg`.

Page-wide listeners: `html` has a passive `scroll` from GSAP ScrollTrigger (`1h0nvyhf5gbrf.js`) plus OneTrust `keydown`/`click` (`ev_e505e87b5aa9…`). From the source: useScrollTrigger (210104) adds `pageshow` and `visibilitychange`; PageTheme adds `pagehide`/`beforeunload`/`pageshow`/`focus`/`visibilitychange` (header theme, shared chrome). This page has no video, so ResponsiveVideo's listeners are absent. The mouse grid found **no pointer-tracking effect** on any section of the three pages (0 nodes changed on all 5 sections).

### 1 · Hero (FullBleedMediaSection, startPercentage 0)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| media (image) | scroll | ScrollTrigger via `html` scroll; `section.FullBleedMediaSection` has no listeners (`ev_41a2e0a6bcba…`) | `37xz28pjbnlx4.js` mod 540431 | scale 1.25 → 1 over root `top bottom → center center`. Unlike the rlenvironments video hero, this hero is an image: the ref sits on a plain `div` around ResponsiveImage, so the scale **does** apply. Measured at scroll 0/150/300/450/600: Scale 1.0139 / 1 / 1 / 1 / 1, clone identical; clip `inset(0%)` throughout | yes (exact, kept) | `hero-scroll-300-*` |
| overlay | — | — | 540431 | the class list carries `bg-black/45` (overlayVariant "flat"), but `.media-overlay` resets it: computed `rgba(0,0,0,0)` + `linear-gradient(transparent → #000)` on Scale and both clones | yes | — |
| headline / body / CTAs intro | scroll `top center` | useScrollTrigger (210104), `retroactiveOnEnter` | `37xz28pjbnlx4.js` / `1h0nvyhf5gbrf.js` | AnimatedText cascade (body +0.2s); CTAs `animateIn({duration .85, delay .5})`; retroactive refresh check `progress > 0 \|\| scroll ≥ start − 1`, default end `bottom 20%` | yes. **Fixed**: added the retroactive refresh check (the clone used a plain `once` trigger) | — |
| FlatCta arrow | pointerenter / pointerleave | React `onPointerEnter/Leave`; the node only has a HubSpot `mousedown` (`ev_3ecaa759ab59…`) | `1h0nvyhf5gbrf.js` mod 892855 | wash −100% → 0 → +100%, snaps back on the 680ms timer (the `transform` transitionend check never matches Tailwind 4 `translate`); re-entry snaps it back first; strip −50% → 0, snaps back on leave; 600ms ease-out | yes. **Fixed**: ported the rlenvironments state machine (the clone's 4-phase version eased the strip back over 600ms and had no re-entry snap) | `cta-hero-arrow-hover-*`, `cta-hero-arrow-leave-*` |
| FlatCta border | pointerenter / pointerleave | React; HubSpot `mousedown` (`ev_2813cd04e537…`) | 892855 | 30% wash `translateY(100%) → 0 → −100%`, snaps back on the 680ms timer, re-entry snap; 300ms ease-out; label `group-hover:scale-90` 300ms ease-out | yes. **Fixed**: the clone reset the wash after 360ms (Scale holds it at −100% until ~700ms) and had no re-entry snap | `cta-hero-border-hover-*`, `cta-hero-border-leave-*` |

Samples, wash position as a fraction of its size (pre-footer, where the page is idle):
- Arrow enter 0–700ms: Scale −0.894, −0.464, −0.229, −0.092, 0; clone −0.811, −0.285, −0.142, −0.055, 0 (one frame earlier). Leave: Scale 0, 0.441, 0.685, 0.908, 0.979, 1, then −1 at 600ms; clone 0, 0.389, 0.653, 0.86, 0.947, 0.995, 1.002, then −1.002 at 700ms. Hero (second run): Scale enter −1, −0.612, −0.315, −0.161, −0.045, −0.007, 0 / clone −1.002, −0.613, −0.349, −0.161, −0.045, −0.007, 0; re-enter Scale −1, −0.736, −0.423, −0.229 / clone −1.002, −0.738, −0.423, −0.23.
- Border, wash y / label scale: enter Scale 1/.981, .558/.946, .204/.916, .092/.907, .015/.901, 0/.9; clone 1/.981, .559/.946, .205/.916, .092/.907, .028/.902, .002/.9. Leave Scale 0/.9, −.616/.969, −.908/.993, −1/1 ×3, then +1 at 600–700ms; clone identical. Re-enter 150ms into a leave: Scale 1/.965, 1/.934, .558/.916, .315/.906; clone 1/.966, 1/.934, .558/.916, .315/.906.

### 2 · The challenge · 3 · The solution · 4 · How it works
No listeners (section root `ev_0f042913566c…`, `figure` `ev_8b571879c11c…`, `article` `ev_2473ebe52b16…`; images only carry React `load`/`error`, `ev_cb2acd81a0cf…`), no hover styles, no scroll or pointer effects. The mouse grid changed 0 nodes on Scale, the clone and `/strategy`. Matched (none).

### 5 · Pre-footer (FullBleedMediaSection, startPercentage 10)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 540431 + ClipScrollSection | clip `inset(5% → 0)`, image `scale 1.25 → 1`. 10 points (root top 900 → 360): Scale 4.994 / 4.617 / 4.247 / 3.877 … 1.654% with scale 1.2497 / 1.2309 / 1.2123 / 1.1938 … 1.0827; clone 5 / 4.630 / 4.259 / 3.889 … 1.667% with 1.25 / 1.2315 / 1.213 / 1.1944 … 1.0833 (1px of Lenis lag) | yes | `prefooter-scrub-5-*` |
| intro | scroll `top center` | useScrollTrigger, retroactive | as on the hero | jumping straight to the page bottom: heading, words and both CTAs end at opacity 1 on all three pages | yes (fixed with the hero) | — |
| FlatCta arrow + border | pointerenter / leave | HubSpot `mousedown` + React | 892855 | as on the hero | yes (fixed with the hero) | `cta-prefooter-{arrow,border}-*` |

### Vahue `/strategy`
It uses the copied components in `components/strategy-audit/`, and the same four fixes were ported (ArrowCta, BorderCta, FullBleedMedia retroactive intro, `retroactiveEnter` in motion.ts). Measured with the same script: arrow leave 0, 0.387, 0.651, 0.875, 0.963, 0.995, then −0.998 at 600ms; re-enter −0.998, −0.735, −0.422, −0.204; border leave and re-enter identical to Scale's (−.616/.969, −.908/.993 … 1/.966, 1/.934, .559/.916, .315/.906); hero media 1.012 at scroll 0, then 1; pre-footer scrub identical to the clone. The bottom jump plays the pre-footer intro, the mouse grid found 0 changes, and there are no console errors.

### Not reproduced
- Nothing on this page is missing. `oml:` (short-landscape) variants are still out of scope, as noted under Remaining gaps.
- HubSpot's `mousedown` analytics and OneTrust's listeners are third-party and deliberately left out.
