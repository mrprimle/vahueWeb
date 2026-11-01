# scale.com/enterprise clone spec

Route: `/scale-clone/enterprise/` · Page: `app/scale-clone/enterprise/page.tsx` · Components: `components/scale-clone/enterprise/` · Assets: `public/scale-clone/enterprise/` · QA: `reference-snapshots/scale-clone/qa/enterprise/`

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + system Chrome, 50%-viewport scroll sweeps, computed styles and inline transforms read live), REA on an isolated Chrome tab (CDP 9230), production chunks fetched and grepped locally. The clone renders Scale's own copy so wraps and section heights line up.

## Reuse (template for Vahue /operations and the banking / retail / distribution industry pages)
`EnterprisePage({ content?, media? })` renders the whole body. `content: EnterpriseContent` (`content.ts`) has one optional slice per section (`hero`, `pullApart`, `bridge`, `blog`, `logoCloud`, `stats`, `testimonials`, `race`, `pillars`, `poweredBy`, `trusted`, `prefooter`); leave a slice out to drop the section. Every section component takes its slice as `content` and can be used on its own. Media is optional everywhere: omit `image` / `video` and pass a `media` ReactNode (`EnterpriseMedia` slots: bridge, race, pillars, poweredBy, trusted, prefooter) for own SVG / three.js / dot-texture visuals. Logos (`bridge.logos`, `trusted.logos`) take `src` or render neutral placeholder tiles; hero nodes take an optional `image` (falls back to the node colour); blog posts take `image` or `background`; `pullApart.cardVideo` puts footage in the WebGL card (Scale's licensed iStock clip is not shipped); `FullBleedMedia` takes `as="h1"` for a page header. The clone's data is `enterpriseContent`. Colours are CSS custom properties with Scale's values as fallbacks (`--ent-bg`, `--ent-fg`, `--ent-band`, `--ent-accent`, … listed in `EnterprisePage.tsx`; the logo-cloud scene reads `--ent-cloud-*`), so a page re-skins the layout by setting them on an ancestor. Extra optional hooks: `hero.ctaTheme`, `bridge.textLogos`, `logoCloud.labels` (text on the sphere tiles), `pullApart.cardMark` (mark image on the scene card), `trusted.textLogos` (names in the glass-card tiles), `testimonials.plain` (no quotation marks: stated case results, not quotes), `testimonials.textLogos` (names in the tab tiles) and `testimonials.mobileQuoteLines` (below lg the quotes stack in one grid cell, so reserve Scale's panel height when the content is shorter); `trusted.logos: []` drops the logo column. Users: `/operations` and `/industries/{banking-financial-services,retail-ecommerce,distribution-manufacturing}` (`components/operations/`, `components/industry/enterprise/`), all 12 sections in Scale's colours (no `--ent-*` override, strict parity, 2026-10-31); QA in `qa/vahue-{operations,banking,retail,distribution}/`.

## Libraries (REA `analyze_web_bundle`, evidence `ev_5cb19f52…`)
- 46 scripts parsed, 0 failures. Next.js (high, `next-runtime`, Turbopack), React (medium). GSAP 3.15 + ScrollTrigger + SplitText (`2d7ykwtxp_8ed.js`, AnimatedText module 668761 in `1h0nvyhf5gbrf.js`), Lenis (site settings, `scale-motion-stack.md`), three r181 (`3kd41k7ews14b.js`, WebGL extension probes), Embla (BlogPreview3D, bundled in `0sni47mcvnqwg.js`), react-device-detect (`isDesktop` hook, module 263942 in `058pnujclak3f.js`).
- Page chunks: `0sni47mcvnqwg.js` (EnterpriseHero 291143, EnterprisePullApart 322473 + its scene, BlogPreview3D 62032, LogoCloud 151755, EnterpriseBuiltToBeTrusted, scene assets `/static/assets/videos/Istock-1433448278.mp4`, `/static/assets/textures/logo.png`), `2k1qlgdxlbmz1.js` (CardGrid, BaseCardScroll 598042/317967, Pillars), `058pnujclak3f.js` (EnterpriseBridge 676267), `37xz28pjbnlx4.js` (ClipScrollSection 656598, FullBleedMediaSection 540431), `3x8z3_0hhtdcb.js` (ClientTestimonials).
- CMS slices (RSC payload, in order): enterpriseHeroSlice, enterprisePullApartSlice, enterpriseBridge, blogPreview, logoCloud, section>cardGrid (stats), clientTestimonials, twoColumnTextWithVideo (enterpriseRace), enterprisePillars, enterprisePoweredBy, enterpriseBuiltToBeTrusted, fullBleedMediaSection (no `startPercentage` → default 10).

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Source |
|---|---|---|
| `.LogoCloud canvas` | `pointerdown`, `pointermove`, `pointerup`, `pointercancel` (drag-rotate) + `pointerdown`/`pointercancel`/`contextmenu`/`wheel` + `webglcontextlost/restored/creationerror` | `0sni47mcvnqwg.js` (scene), `3rls9s4y8-e83.js` (three controls, disabled), `3kd41k7ews14b.js:304` (three renderer). ev `ev_7fba34dba63…` |
| `.EnterprisePullApart canvas` | `pointerdown`/`pointercancel`/`contextmenu`/`wheel` (controls, `enabled=false`) + webgl context events | `3rls9s4y8-e83.js`, `3kd41k7ews14b.js`. Pointer parallax is a window `pointermove`. ev `ev_001e33c864d…` |
| BlogPreview3D Embla viewport | `click` (capture), `dragstart`, `mousedown`, `touchstart/move/end/cancel` (touchmove non-passive), `contextmenu` | Embla in `0sni47mcvnqwg.js`. ev `ev_e8bdbdd5e21…` |
| Hero nodes / CTAs | none on the node (React root-delegated `onMouseEnter`/`onPointerEnter`; FlatCta is a React state machine, see the interaction inventory) | — |

## Sections (top → bottom; tops at 1440 / 390, Scale = clone)
| # | Section | Top 1440 / 390 | Height 1440 / 390 | Notes |
|---|---|---|---|---|
| 1 | EnterpriseHero (pin-spacer) | 39 / 102 | 900 / 844 | `h-dvh`, headline 64/1 (xl) centred cols 5–8, body 16/1.5 max 75%, evergreen arrow FlatCta. 7 photo nodes pinned to a 1550×880 (390×844 mobile) design frame (`enterprise.module.css .node`), SVG edges #B5B5B5 + black travelling dash, mono labels with the slate triangle. "Scroll to explore" + arrow box bottom-right. |
| 2 | EnterprisePullApart | 939 / 946 | 4050 / 3798 | black, `h-[450vh]`, pinned `h-screen` WebGL scene (`pullApartScene.ts`), copy top 15vh / bottom 15vh (6vh md). |
| 3 | Bridge (Section, inset evergreen) | 4989 / 4744 | 796 / 851 | rounded-3xl #193A29 panel cols 2–11, transparent webm left, h3 32/40 −0.03em, body #C7C7C7, "Trusted by" + logo marquee (40s). |
| 4 | BlogPreview3D | 5785 / 5595 | 786 / 550 | h3 40/1.25 centred; Embla 3D carousel, slides min(405px, 80%) with −20% overlap, perspective 900; arrows (xl) / dots (<xl). |
| 5 | LogoCloud | 6571 / 6145 | 810 / 760 | #EAEAEA `h-[90vh]`, WebGL tile sphere cols 2–7, h3 40/1.25 cols 8–11. |
| 6 | Stats (black Section > CardGrid) | 7381 / 6904 | 852 / 1195 | h2 40/44, 3 + 2 fluid grid (`grid-cols-6`), cards `bg-white/13 rounded-2xl p-6 md:p-8 gap-5 md:gap-16`, icon 32 #193A29, mono label #929292, value h2 40/44 mb 8 + body #929292 in one AnimatedText (`min-h-16`, no top padding). |
| 7 | ClientTestimonials (cloud slate #839CB2) | 8233 / 8099 | 834 / 997 | mono heading, logo tabs (152 lg), arrows, flip quotes 40/44 −0.05em with 160px (100px mobile) indent, name + role chip. |
| 8 | TwoColumnTextWithVideo (enterpriseRace) | 9067 / 9096 | 1062 / 795 | h2 64/1.05, #C7C7C7 band py-24, lead h4 32/36 −0.03em, body 16/1.5, Learn More arrow link, video aspect-video rounded-2xl cols 3–11. |
| 9 | EnterprisePillars | 10129 / 9891 | 902 / 1233 | h3 40/1.25 + square video cols 2–6; items cols 8–11: 40px icon tile (#A8927C / #839CB2 / #193A29, Material people/hub/plagiarism), h5 24/1.5 (22/1.05 mobile), body 16/1.5 (14), dividers #EAEAEA. |
| 10 | EnterprisePoweredBy | 11031 / 11123 | 1347 / 1112 | #EAEAEA, h3 64/1.05 centred, body w-576, white arrow FlatCta; platform image ClipScroll (noClip, startScale .85) cols 3–10 (xl); two white cards `md:-translate-y-20` overlap the image. |
| 11 | EnterpriseBuiltToBeTrusted | 12378 / 12236 | 1416 / 1525 | h2 64/1.05; 800px (600) photo ClipScroll with parallax and a glass card (black/45, white/10 border, blur-xl, max-w 748, p 64/32), "Trusted by" + 3 agency tiles; 3 LinkCards #F2F2F2 radius 16 (8 <xl), p 40 (24 <xl), hover fill rises (#839CB2 / #A8927C / #79648C) and the gray fill CTA turns black/white (`group-hover/card`, 500ms). The description area is equalised across the row (`md:min-h(--cg-desc-min-h)`), so the CTA-less middle card keeps its description at the same y. |
| 12 | Pre-footer FullBleedMediaSection | 13858 / 13825 | 720 / 480 | `h-16` spacer, ClipScroll px-4, headline 64/1.05, white arrow FlatCta "Speak with an expert", `h-8` spacer. |

Page height (main + shared footer): 1440 Scale 15509 / clone 15511; 390 Scale 15697 / clone 15659 (shared footer and the one-line testimonial wrap below). Every section top above matches to ≤2px at 1440 and to within one text line at 390.

## Motion
| Element | Trigger | start → end | From → to | Ease / duration | Notes |
|---|---|---|---|---|---|
| Hero intro | page ready (~120ms) | — | nodes from (xStartOffset, yStartOffset), scale 0, opacity .4 → 0/1/1; image scale 5 → 1.2; clip `inset(10px round 10%)` → 0 | x/scale 2s, y 1s power4.inOut, delay node.delay; clip 1.6s power3.inOut | edges draw (dashoffset 1000 → 0, 1.2s power2.out, delay 1.1 + .05·target); black dash sweep 8s yoyo forever (delay 2 + .5i); headline/body/CTA animateIn .75/.8/.9 (CTA .85s: HeadlineWithCta ignores the 1.2 duration) |
| Hero pointer + idle | window `pointermove`, gsap.ticker | — | per node: smooth p at .3·C[i] (C = .027 .03 .01 .037 .02 .043 .046), offset p·20px·(1 + .4i)·smoothOut; idle sin/cos drift ·1.25·P[i], scale 1 + .05cos | smoothOut 0 → 1 over 4s sine.out from 1.7s | mobile: no pointer offset, drift ×.3. Hover: node 1.2, image 1.2 → 1 (.35s sine.inOut) |
| Hero scroll | hero | top top → bottom top, pin, pinSpacing false | yPercent 0 → −20 | power2.out, scrub | the black pull-apart slides over it |
| Pull-apart pin | content | top top → +4.5·innerHeight, pinSpacing false | `.parallaxOut` yPercent 0 → −25 at 2.2–3.7 of 3.7 | power2.inOut, scrub | scene progress = scrollY / (4.5·innerHeight) drives group scale 1.75 → .275, rotation (.5, .6), uProgress, y .165; text 0 visible in [.15, .35], text 1 in [.65, 1] |
| Pull-apart copy | scene windows | — | headline AnimatedText (delay .2), subheading "lift" (delay .5): lines yPercent 50 → 0 at .052i, words opacity stagger .025; out yPercent −50, .32s power2.in | | |
| Bridge panel | panel | top bottom → bottom 75% | width 90% → 100% | power3.out 1.15, scrub | video fades in 700ms when loaded; copy IO `rootMargin 0 0 -15% 0` → headline .5, body 1 |
| Blog carousel | section | top center (top 80% touch) | wrapper opacity 0 → 1 | 1.2s power2.out | heading animateIn .05; Embla loop/center; per-slide translateX(c·−d·100%) scale v, image 2v, z-index, opacity fade between 2a and 2.4a, nudge; autoplay 4.5s until touched |
| LogoCloud | section | top bottom → top center | group y −.5 → 0, scale .8 → 1 (progress ≥ .5) | eased per frame | drag: rotation += .004·d, inertia .02·last delta; idle spin steered by pointer; heading animateIn on enter |
| Stats cards (BaseCardScroll) | each card | top bottom → top 50% | scale 1.06 → 1, opacity 0 → 1, y 48 → 0, x ±160 → 0 (row edges, lg) | stagger r = min(.1, .85/(n−1)), power2.out on progress | heading .125; icon clip `inset(0 100% 0 0 round 10px)` → 0 (.5s power1.out, .1i + .125), glyph opacity 1s |
| Testimonials | panel / section | top bottom → bottom 75% (panel) ; top 80% (select 0) | panel width 90% → 100%; quotes flip (rotationX −90 → 0, yPercent 108, .48s power2.out, stagger .05) | | name flip at .5s; role chip shrinks to 20px, swaps text, grows; tile fill slides along y (x on mobile) .3s |
| Race | section | top 80% once | heading .35, lead .45, body .45, link .55 | AnimatedText | videos play in view |
| Pillars | section | top 80% once | heading; icon opacity .5s; item i copy after 200i ms (+.2 / +.4); divider scaleX 0 → 1 (.5s, .2i + .2) | | |
| PoweredBy image | ClipScroll | top bottom → center center | scale .85 → 1 (no clip) | linear | sampled: top 800 → .8711, 500 → .9345, 200 → .9979 (Scale = clone) |
| PoweredBy cards | each card | 0% 120% → top 50% | scale .96 → 1, x ∓160 → 0 (desktop) | power2.out on progress | icon pop opacity 0 / scale .3 → 1 (.85s power2.out), copy animateIn |
| Trusted photo | ClipScroll | top bottom → **center bottom** | clip `inset(5%)` → 0 round 1rem | linear | source says `isDesktop ? "center center" : "center bottom"`, but `isDesktop` is `{}` on first render and the trigger is built once, so the live page runs to "center bottom". Sampled: top 800 → 3.75%, 500 → 0 (Scale = clone) |
| Trusted parallax | section | top bottom → bottom top | photo scale 1.5 → 1.25, translateY 20% → −20% | linear | sampled scale 1.4656 / 1.4332 / 1.4008 / 1.3792 at tops 800/500/200/0 (Scale = clone) |
| Trusted cards | each card | top bottom → top 50% | scale .96 → 1, opacity 0 → 1 | stagger as above, power2.out | titles .075 + .045k, bodies +.14, CTAs fade .1k + .5 |
| Pre-footer clip | ClipScroll wrapper | top bottom → center center | `inset(5%)` → 0 round 1.5rem (startPercentage 10) | linear | sampled at section top 900/675/450/225/0: 5% / 3.611% / 2.222% / .833% / 0 (Scale = clone) |
| Pre-footer media | section | top bottom → center center | scale 1.25 → 1 | linear | 1.0417 at top 225 on both |
| Pre-footer text / CTA | section | top center, once | headline, body (+.2) AnimatedText; CTA "filledWhiteArrow" .85s delay .5 | power3.out | |
| AnimatedText default | — | — | SplitText lines,words masked; lines yPercent 400 → 0 (1s power3.out, .08i), words x 30% → 0 (.9s, stagger .03), tint #72CE7B → #79648C → CSS colour | | port in `AnimatedText.tsx` (`default`, `flip`, `lift`) |
| FlatCta hover | pointer | — | white arrow: 35% wash in from the left, out to the right, snaps back on the 680ms timer, chevron strip −50% → 0 (snaps back on leave); evergreen (hero): no wash, a black `mix-blend-multiply` layer 0 → .18 (300ms); gray fill (trusted cards): 35% wash rises, label .9; white outline: 30% | 600ms / 300ms ease-out | gray + `group-hover/card` black over 500ms (hover devices only). Full detail in the interaction inventory |

Late-trigger fix: `FullBleedMedia` keeps the ResizeObserver re-measure from the data-engine family (observe `<body>`, `ScrollTrigger.refresh()` 150ms after `scrollHeight` changes), since the pinned hero/pull-apart, WebGL scenes, lazy media and SplitText all change the height after the triggers are measured. All tweens respect `prefers-reduced-motion` and are cleaned up with `gsap.context().revert()` / SplitText revert.

Mid-scroll stats sample (1440, container top → card [scale, x, y, opacity]): Scale 669: [1.0015, −4, 1, .97] [1.0058, 0, 5, .90] [1.0147, 39, 12, .75]; clone 680: [1.0022, −6, 2, .96] [1.0075, 0, 6, .88] [1.0178, 47, 14, .70] (same curve, 11px apart).

## Assets (`public/scale-clone/enterprise/`)
Hero node photos (7), blog-1..4, `bridge-stack.webm` (transparent), `race.mp4`, `pillars.mp4`, `powered-by-platform.png`, `trusted-panel.jpg`, `prefooter.jpg`, card icons (`icon-*.svg`), `pull-apart-curves.json` (scene curves). Not shipped: Scale/customer/agency logos (placeholder tiles), the iStock clip and logo texture in the pull-apart card (procedural grain + neutral chevron instead).

## QA (`qa/enterprise/`)
- `1440-sbs-00..41.jpg`, `390-sbs-00..36.jpg`: Scale (left) vs clone (right) every 50% viewport, top to footer.
- `1440-m01..m09-*.jpg`: cursor states (hero pointer top-left / bottom-right, hero CTA hover, node hover, blog card hover, logo-cloud drag + release, PoweredBy CTA hover, trusted card hover). The Scale side of these is dimmed by its cookie banner (the reject click didn't land in that run); the clone side shows the intended states.
- Fixed in this pass: stats card value block had an extra `lg:pt-6` and mask padding (+124px page height) → removed, stats now 852 = 852; trusted CTA-less card description was bottom-aligned → reserved CTA row; trusted ClipScroll end → "center bottom" (live behaviour); LinkCard hover fill and CTA hover only on hover devices (was sticky on touch); pillar h5 22/1.05 on mobile (was 20/1.5, +21px); gray CTA black-on-hover added.
- 200 on the dev server, no console errors on the clone (Scale itself logs a 404, a 401 and an OptinMonster warning).

## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab (closed afterwards). `analyze_web_bundle` (`ev_e890f4b4646a…`, 47/47 scripts parsed, 0 failures). The 32 page chunks were re-downloaded and diffed against the copies the clone was built from: 29 unchanged, 3 new (shared vendor chunks), and none of the page modules changed. Shared chunks by sha256: FlatCta / AnimatedText `1h0nvyhf5gbrf.js` (`10b2627a…`) and FullBleed / ClipScrollSection / useScrollTrigger `37xz28pjbnlx4.js` (`b234eef5…`) are byte-identical to the copies read in the guides, enterprise-insurance and public-sector-data-engine audits, so their FlatCta and retroactive-intro findings carry over. Page modules: `0sni47mcvnqwg.js` (`0e137e33…`: EnterpriseHero 291143, LogoCloud scene, PullApart scene, BlogPreview3D 62032), `2k1qlgdxlbmz1.js` (`bb51ad26…`: HeadlineWithCta 925107, LinkCard, Pillars), `3x8z3_0hhtdcb.js` (`89a4cc62…`: ClientTestimonials), `3rls9s4y8-e83.js` (`ac4814e5…`: the three scene runtime, which dispatches `onMouseMove` from a window `pointermove`/`touchmove` as `{x: clientX/innerWidth, y: 1 − clientY/innerHeight}`).

`inspect_web_event_listeners` ran on every section root and interactive child (ids below). Window listeners can't be selected, so they were read from the chunk's `addEventListener` calls. Then Playwright ran identical inputs on scale.com, the clone and the four Vahue pages (script `scratchpad/ent-audit/qa.js`, 1440×900 and 390×844, OneTrust hidden with CSS so it can't swallow the pointer):
- hero pointer path: 5 positions, held 1.2s each, node transforms sampled every 100ms
- node hover/leave
- hero, PoweredBy and pre-footer CTA hover, leave, re-entry and focus
- pull-apart at 4 scroll points × 2 pointer corners
- Bridge panel width at 5 scroll points
- blog carousel: drag 300px in 6 steps of 50px/50ms, ArrowRight, Next arrow, card hover, card focus, autoplay after touch
- logo-cloud drag (40% of the canvas width in 10 steps of 50ms) and release
- testimonial tile hover, click (6 samples, 100ms apart), arrow hover and Next
- trusted-card hover on each card (4 samples, 150ms apart), leave and focus
- pre-footer scrub at 10 points
- a reload followed by a jump straight to the page bottom (retroactive intro)

QA images: `qa/enterprise/interactions/<w>-<name>-{scale,clone,ops,bank,retail,dist}.jpg`.

Page-wide listeners:
- `html`: `scroll` (ScrollTrigger, `1h0nvyhf5gbrf.js`) plus OneTrust `keydown`/`click` (`ev_87f14ea5158b…`).
- `body`: a passive `touchstart` (`ev_ab9495c50539…`).
- Window, from the chunk:
  - the hero `pointermove`
  - BlogPreview3D `keydown` (ArrowLeft/ArrowRight while the section is in its trigger range), `blur`/`focus`, and `visibilitychange` (autoplay pause)
  - the scene runtime's `pointermove`/`touchmove`/`resize`

### Fixes in this audit (clone; the Vahue pages render the same components)
- **FlatCta**: Scale's state machine from module 892855, ported as on the guides / enterprise-insurance clones. Changes:
  - re-entry snaps the wash back first
  - leave resets on the 680ms timer; the `transform` transitionend never matches because Scale's wash moves on the CSS `translate` property, and the clone now animates `translate` too
  - the chevron strip snaps back on leave
  - Scale's theme rules: the **evergreen hero CTA has no wash**, only a black `mix-blend-multiply` layer, opacity 0 → .18 on hover (300ms), with the content at z-2 and `isolate`. The clone used to slide a 35% wash. Wash opacity is .35 except for the white outline (.30); the gray card CTA was .30 and is now .35.
  - `as`: HeadlineWithCta CTAs (hero "Schedule a consult", PoweredBy "Learn More") are `<button type="button" aria-label>` elements with `onClick: router.push(url)` and no focus classes, so the UA focus ring shows. The trusted-card CTAs are buttons with no onClick; their click falls through to the card link. The pre-footer CTA stays a CMSLink `<a>` with `focus:outline-1 focus:outline-scale-skyblue` (1px #86bff2).
  - `motion-reduce:group-hover/cta:scale-100` on the label.
- **Hero CTA intro**: HeadlineWithCta's `animateIn` ignores the hero's `duration: 1.2` and runs the CTA at `{duration .85, delay .9}`. The clone ran it for 1.2s.
- **Hero resize**: Scale's ResizeObserver on the edges svg zeroes the idle clock, pauses the tick and resets each node-inner to 0/0/1. 250ms later it re-anchors, and it resumes after another 500ms. This was missing in the clone.
- **Trusted cards**: each LinkCard body is a CMSLink `<a>` (cursor pointer, 1px #86bff2 focus outline) when the card has a link, and a plain div otherwise. The clone had a div for every card.
- **Testimonial tiles**: Scale's `transition-all transition-duration-800` is not a valid utility, so the colour swap runs on the default 150ms. The clone ran it for 800ms. Click sample at ~100ms: Scale deselected tile rgb(11,13,15), selected rgb(121,144,164); clone after the fix rgb(22,26,30) / rgb(110,131,149), and rgb(11,13,15) / rgb(121,144,164) on `/industries/retail-ecommerce` (before the fix: rgb(127,152,173) / rgb(5,5,6)).
- **Pre-footer FullBleed**: the intro uses useScrollTrigger's end `bottom 20%` plus the retroactive refresh check (`progress > 0 || scroll ≥ start − 1`) instead of `once`. The media scale is set in `onUpdate` only, with no initial 1.25 and no `onRefresh`, as on Scale.

### 1 · EnterpriseHero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| graph nodes | window `pointermove` | window (chunk `0sni` @91111); `.EnterpriseHero` itself has none (`ev_9f0f1291a413…`) | 291143 | pointer `(clientX/innerWidth·2−1, clientY/innerHeight·2−1)`. Per node, smoothed at `.3·C[i]` (C .027 .03 .01 .037 .02 .043 .046) on the gsap ticker; offset `p·20px·(1+.4i)·smoothOut` (0 on mobile); idle `sin(.4t+1e4i)·(10+5i)·1.25·P[i]` with P .94 … 1.18. Node 6 x-shift over each 1.2s hold (TL → TR → BR → BL → centre, idle drift included): Scale −11.5 / 71.9 / 44.7 / −27.6 / 11.1 px, clone 5 / 58.8 / 35.9 / −32.5 / −5 px (same direction and size; the idle phase differs per run) | yes | `1440-hero-pointer-tl-*` |
| node image | `onMouseEnter` / `onMouseLeave` on the clip div | React | 291143 | node scale 1 → 1.2, image 1.2 → 1, .35s sine.inOut, reversed on leave. Samples every 100ms: Scale 1.042 / 1.139 / 1.198 / 1.2, clone 1.16 / 1.2 (the first sample lands later in the transition), back to 1 on leave on both | yes | — |
| resize | ResizeObserver on the edges svg | — | 291143 | clock 0, tick paused, node-inner reset, 250ms re-anchor, resume after 500ms | yes (**added**) | — |
| CTA "Schedule a consult" | pointerenter / leave, focus, click | React `onPointerEnter`/`onPointerLeave`; the REA selector for an anchor found nothing (`ev_bb6e01bac384…`) because it is a `<button>` | 892855 + HeadlineWithCta 925107 | evergreen: multiply layer opacity 0 → .18 (300ms); chevron strip −50% → 0 (600ms), snaps back on leave. At 200ms: Scale .10, strip −36.8%; clone .11, strip −33.5%. 1440 focus `auto 1px rgb(0,95,204)` (UA ring) on both; click → `router.push('/demo')` | yes (**fixed**: it was an `<a>` with a sliding wash and a 1.2s intro) | `1440-cta-hero-hover-*`, `390-cta-hero-hover-*` |
| scroll | ScrollTrigger pin | `html` scroll | 291143 | pin `top top → bottom top`, pinSpacing false, yPercent 0 → −20 | yes (unchanged) | — |

### 2 · EnterprisePullApart (WebGL)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| canvas | pointerdown / cancel / contextmenu / wheel | three OrbitControls-style listeners, `enabled = false` (`ev_fad2c88d8995…`) | `3rls9s4y8-e83.js` | inert | yes (none needed) | — |
| camera rig | window `pointermove` / `touchmove` → scene `onMouseMove` | scene runtime | 0sni @139548 | camera target `(map(x,−1..1)·.25·4, map(y)·.25·2, 5)`, lerp .06 per frame, looks at the origin | yes | `1440-pa-{25,80}-{tl,br}-*` |
| pinned scrub | scroll | `html` scroll | 0sni | progress = animatedScrollY / (4.5·innerHeight); group scale 1.75 → .275, rotation (.5, .6) cubic.inOut (= power2.inOut), uProgress, y .165; copy windows [.15, .35] and [.65, 1]. Screenshots at 25% / 80% match, apart from the card footage, which isn't shipped | yes | as above |

### 3 · EnterpriseBridge
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll scrub | ScrollTrigger | 058pnujclak3f 676267 | width 90% → 100%, `top bottom → bottom 75%`, power3.out. 5 points: Scale 90 / 94.19 / 98.88 / 99.93 / 100%, clone identical | yes | — |
| logo marquee | — | none (CSS 40s) | — | — | yes | — |

### 4 · BlogPreview3D (Embla)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| viewport | drag (mouse / touch) | `click` capture, `dragstart`, `mousedown`, `touchstart/move/end/cancel`, `contextmenu` (`ev_7a5408f5e3be…`); no `wheel` and no keyboard plugin | Embla in 0sni, `{dragFree:false, loop:true, align:"center"}` | per-slide layer `translateX(c·−.14·n·100%) scale(v)`, image `2v`, zIndex `100+900v`, opacity window, nudge. 1440 drag mid-sample (centre slide): Scale x 548, `translateX(−1.065%) scale(.9753)`; clone x 545, `translateX(−.947%) scale(.9776)`. After release both settle at x −72 / 161 / 518 / 874 / 1107 with identical transforms | yes | `1440-blog-after-drag-*`, `390-blog-after-drag-*` |
| wheel over the carousel | wheel | no `wheel` listener on the viewport (REA above) and no Embla wheel plugin | — | the wheel just scrolls the page; the clone registers none either | yes | — |
| keyboard | window `keydown` ArrowLeft/Right | window (0sni @30398) | 62032 | only while in the trigger range (`v.current`); ignores inputs; stops autoplay | yes (identical transforms after ArrowRight) | — |
| arrows (xl) / dots (<xl) | click | React | 62032 | `scrollPrev/Next` / `scrollTo(i)`, stop autoplay | yes (identical after Next) | — |
| autoplay | timer | `setInterval` 4.5s | 62032 | stops on pointerDown / arrows / keys; paused on `visibilitychange`, `blur` and hidden; off with reduced motion. No change in the 5s after a touch on either site | yes | — |
| card | hover / focus | CSS | 62032 | image `group-hover/card:scale-125` 500ms, arrow −100% → 0. Focus: Scale `outline-none` + `focus:outline-1` gives `outline-style: none`; the clone has a transparent outline: no visible ring on either | yes | `*-blog-card-hover-*` |

### 5 · LogoCloud (WebGL sphere)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| canvas | pointerdown / move / up / cancel (drag-rotate) | `0sni` @44599–44848, plus the inert controls and the webgl context events (`ev_33532e5d468b…`) | 151755 scene | left button only; rotation.y += .004·dx, rotation.x += .004·dy; cursor `grabbing` during the drag, `''` after (sampled on both); pointer capture; on release, if the spin > 3e-4 the target is .02·the last delta | yes | `1440-cloud-{idle,drag,release}-*` |
| idle spin | window pointer → scene `onMouseMove` | scene runtime | 151755 | target y = 35e-5 + (x−.5)·24e-5, x = 8e-5 − (y−.5)·24e-5 (y measured from the bottom); eased .03 per frame | yes | — |
| scroll | ScrollTrigger + `onScroll` | — | 151755 | group y −.5 → 0, scale .8 → 1 on progress clamped ≥ .5 (lerp .06); rotation −(−.82·(scrollY/max − .5)) | yes (unchanged) | — |

### 6 · Stats (CardGrid) · 8 · Race · 9 · Pillars
The markup has no hover/focus utilities on these sections apart from the Race "Learn More" text link, and the chunk shows no pointer handlers for them. They only have scroll scrubs and intros, already sampled in the Motion table (stats card curve, Scale vs clone; Race / Pillars intro "top 80%", once). They weren't driven with pointer inputs in this audit. Reproduced, unchanged.

### 7 · ClientTestimonials
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| logo tiles | click / hover | button: HubSpot `mousedown` (capture) + React `click` (`ev_7dcdcbb300b1…`) | 3x8z3 | fill slides on y (x below 769px), `.3s`, direction from the previous/next index; colour swap on `transition-all` (150ms default). Fill at ~100ms: Scale deselected 66.5px / selected −40.1px, clone 59.3 / −47.4 (1440); 390 on x: Scale 59.0 / −19.0, clone 49.0 / −29.0 | yes (**fixed** the 800ms colour transition) | `1440-tm-second-*`, `390-tm-second-*` |
| prev / next arrows | hover / click | React `onMouseEnter`/`onMouseLeave` + gsap | 3x8z3 | bg transparent → ink, colour → slate, border → transparent, .3s: `rgb(1,1,1) rgb(131,156,178) rgba(1,1,1,0)` on both; Next selects the following tile on both | yes | — |
| quotes / name / role chip | select | — | 3x8z3 | flip lines rotationX −90 → 0, .48s power2.out, stagger .05; chip `animateToText` | yes (unchanged) | — |

### 10 · EnterprisePoweredBy
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Learn More" CTA | hover / leave / click | React | 892855 + HeadlineWithCta | white arrow button: 35% wash. Enter at 200 / 400 / 600ms: Scale −38.4 / −9.2 / −.16%, clone −34.8 / −7.8 / −.37%. Leave: Scale 0, 38.8, 65.2, 81.8, 93.4, 98.5, 100, then −100% at 700ms; clone 0, 32.9, 74.4, 93.4, 98.9, 99.96, then −100% at 600ms (`/operations`: 0, 38.8, 65.2, 81.8, 92.2, 98.5, 100, −100%: sampling jitter); click → `router.push` | yes (**fixed**: it was an `<a>` with no re-entry snap) | `1440-cta-poweredby-hover-*` |
| image / cards | scroll | ScrollTrigger | 2k1qlgdxlbmz1 | ClipScroll scale .85 → 1; cards scale .96 → 1, x ∓160 | yes (unchanged) | — |

### 11 · EnterpriseBuiltToBeTrusted
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| LinkCard | hover | none on `.LinkCard` (`ev_9d17bf84eeb1…`); CSS `group/card` | 2k1qlgdxlbmz1 LinkCard | fill `scale-y-0 → 100`, origin-bottom, 500ms ease-out. Card 2 at 150 / 300 / 450 / 600ms: Scale .685 / .919 / .9976 / 1, clone .685 / .919 / .9976 / 1 | yes | `*-trusted-hover-0-*` |
| card CTA (gray fill button) | card hover | CSS `group-hover/card` | 892855 `as:"button"` | bg #EAEAEA → black, text → white, `transition-all` 500ms ease-out (rgb 74 / 19 / 1 / 0 at 150ms steps on both) | yes (**fixed**: `<a>` → button, wash .30 → .35) | — |
| card link | focus / click | CMSLink | — | cards 1 and 3 are `<a>` (`/security`, `/generative-ai-data-engine`) with focus `solid 1px rgb(134,191,242)`; card 2 has no link | yes (**fixed**: the cards were divs) | — |
| photo / parallax | scroll | ScrollTrigger | — | see the Motion table | yes (unchanged) | — |

### 12 · Pre-footer FullBleedMediaSection
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 37xz28 540431 | 10 points: clip 5 / 4.44 / 3.89 / 3.33 / 2.78 / 2.22 / 1.67 / 1.11 / .56 / 0%, scale 1.25 → 1 in 1/36 steps: Scale = clone, identical to 4 decimals | yes | — |
| intro | scroll `top center`, retroactive | useScrollTrigger 210104 | 37xz28 | reload + jump to the bottom: CTA visible, opacity 1 on Scale, the clone and all four Vahue pages | yes (**fixed**: `once` → Scale's refresh check) | — |
| CTA (white arrow `<a>`) | hover / leave / focus | React | 892855 | enter at 250 / 500 / 750ms: Scale −25.56 / −2.12 / 0%, clone −25.57 / −2.12 / 0%. Leave: Scale 0, 38.8, 65.2, 81.8, 93.4, 98.5, 100, −100%; clone 0, 38.8, 65.2, 81.8, 92.2, 97.9, 100, −100%. Focus `solid 1px rgb(134,191,242)` on both | yes | `1440-cta-prefooter-hover-*` |

### Vahue pages (`/operations`, `/industries/{banking-financial-services,retail-ecommerce,distribution-manufacturing}`)
These pages render `EnterprisePage` from this clone (`components/operations/OperationsPage.tsx`, `components/industry/enterprise/EnterpriseIndustryPage.tsx`), so every fix above applies to them with the same params. Measured with the same script (`/operations` full set at 1440; banking at 1440: CTA, trusted, pre-footer, retro; retail at 1440: CTA, testimonials, retro; distribution at 390: CTA, blog, testimonials, trusted):
- Hero CTA is a multiply button (.10 at 200ms, .18 at 600ms on `/operations`) with the UA focus ring. Node hover goes 1 → 1.2 and back to 1.
- Pull-apart text positions and the Bridge width scrub are identical to the clone (90 / 94.19 / 98.88 / 99.93 / 100%).
- Blog drag, key and Next end on the same transforms as Scale (x −72 / 161 / 518 / 874 / 1107). Logo-cloud cursor shows `grabbing` during the drag.
- Testimonial click colours: rgb(11,13,15) / rgb(121,144,164) at ~100ms on retail.
- Trusted fills .685 / .919 / .9976 / 1. Card links go to `/security/` with the skyblue focus outline.
- Pre-footer clip scrub matches Scale (5% → 0). There is no scale reading because these pages use a media slot instead of an image. The CTA focus outline is skyblue, and the retroactive intro plays.
- No console errors on any of the pages.

### Not reproducible / not measurable
- The WebGL uniforms on Scale (pull-apart `uProgress` and camera, logo-cloud rotation) aren't exposed on `window`. They were compared through the source (identical constants) and same-input screenshots, not as numbers.
- Hero idle drift is time-based (`sin`/`cos` of the run clock), so per-sample node values differ between runs. Only the pointer-driven component can be compared, by direction and size.

## Remaining gaps
- Customer, agency and testimonial logos are placeholder tiles; the LogoCloud sphere tiles are blank.
- Pull-apart card: no background footage (licensed iStock) and a neutral chevron instead of Scale's logo texture (the scene accepts `cardVideoUrl`).
- `bridge-stack.webm` and some photos are Scale media (fine for the clone; Vahue pages must pass their own `media`).
- 390: the first testimonial quote breaks after "lot" on Scale and after "more" on the clone (sub-pixel font metrics; same font, size and tracking), one line shorter on the clone.
- Pillars video frame differs between captures (video time), not layout.
- Shared footer differs (shared `ScaleFooter`), not this page.
