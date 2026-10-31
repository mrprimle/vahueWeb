# scale.com/enterprise clone spec

Route: `/scale-clone/enterprise/` · Page: `app/scale-clone/enterprise/page.tsx` · Components: `components/scale-clone/enterprise/` · Assets: `public/scale-clone/enterprise/` · QA: `reference-snapshots/scale-clone/qa/enterprise/`

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + system Chrome, 50%-viewport scroll sweeps, computed styles and inline transforms read live), REA on an isolated Chrome tab (CDP 9230), production chunks fetched and grepped locally. The clone renders Scale's own copy so wraps and section heights line up.

## Reuse (template for Vahue /operations and the banking / retail / distribution industry pages)
`EnterprisePage({ content?, media? })` renders the whole body. `content: EnterpriseContent` (`content.ts`) has one optional slice per section (`hero`, `pullApart`, `bridge`, `blog`, `logoCloud`, `stats`, `testimonials`, `race`, `pillars`, `poweredBy`, `trusted`, `prefooter`); leave a slice out to drop the section. Every section component takes its slice as `content` and can be used on its own. Media is optional everywhere: omit `image` / `video` and pass a `media` ReactNode (`EnterpriseMedia` slots: bridge, race, pillars, poweredBy, trusted, prefooter) for own SVG / three.js / dot-texture visuals. Logos (`bridge.logos`, `trusted.logos`) take `src` or render neutral placeholder tiles; hero nodes take an optional `image` (falls back to the node colour); blog posts take `image` or `background`; `pullApart.cardVideo` puts footage in the WebGL card (Scale's licensed iStock clip is not shipped); `FullBleedMedia` takes `as="h1"` for a page header. The clone's data is `enterpriseContent`. Colours are CSS custom properties with Scale's values as fallbacks (`--ent-bg`, `--ent-fg`, `--ent-band`, `--ent-accent`, … listed in `EnterprisePage.tsx`; the logo-cloud scene reads `--ent-cloud-*`), so a page re-skins the layout by setting them on an ancestor. Extra optional hooks: `hero.ctaTheme`, `bridge.textLogos`, `logoCloud.labels` (text on the sphere tiles), `pullApart.cardMark` (mark image on the scene card); `trusted.logos: []` drops the logo column. First user: `/operations` (`components/operations/OperationsPage.tsx`, QA in `qa/vahue-operations/`).

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
| Hero nodes / CTAs | none on the node (React root-delegated pointer events; FlatCta hover is CSS) | — |

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
| Hero intro | page ready (~120ms) | — | nodes from (xStartOffset, yStartOffset), scale 0, opacity .4 → 0/1/1; image scale 5 → 1.2; clip `inset(10px round 10%)` → 0 | x/scale 2s, y 1s power4.inOut, delay node.delay; clip 1.6s power3.inOut | edges draw (dashoffset 1000 → 0, 1.2s power2.out, delay 1.1 + .05·target); black dash sweep 8s yoyo forever (delay 2 + .5i); headline/body/CTA animateIn .75/.8/.9 (CTA 1.2s) |
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
| FlatCta hover | pointer | — | 35% wash slides in from left, chevron strip; border variant 30% wash rises, label .9 | 600ms / 300ms ease-out | gray variant + `group-hover/card` black (hover devices only) |

Late-trigger fix: `FullBleedMedia` keeps the ResizeObserver re-measure from the data-engine family (observe `<body>`, `ScrollTrigger.refresh()` 150ms after `scrollHeight` changes), since the pinned hero/pull-apart, WebGL scenes, lazy media and SplitText all change the height after the triggers are measured. All tweens respect `prefers-reduced-motion` and are cleaned up with `gsap.context().revert()` / SplitText revert.

Mid-scroll stats sample (1440, container top → card [scale, x, y, opacity]): Scale 669: [1.0015, −4, 1, .97] [1.0058, 0, 5, .90] [1.0147, 39, 12, .75]; clone 680: [1.0022, −6, 2, .96] [1.0075, 0, 6, .88] [1.0178, 47, 14, .70] (same curve, 11px apart).

## Assets (`public/scale-clone/enterprise/`)
Hero node photos (7), blog-1..4, `bridge-stack.webm` (transparent), `race.mp4`, `pillars.mp4`, `powered-by-platform.png`, `trusted-panel.jpg`, `prefooter.jpg`, card icons (`icon-*.svg`), `pull-apart-curves.json` (scene curves). Not shipped: Scale/customer/agency logos (placeholder tiles), the iStock clip and logo texture in the pull-apart card (procedural grain + neutral chevron instead).

## QA (`qa/enterprise/`)
- `1440-sbs-00..41.jpg`, `390-sbs-00..36.jpg`: Scale (left) vs clone (right) every 50% viewport, top to footer.
- `1440-m01..m09-*.jpg`: cursor states (hero pointer top-left / bottom-right, hero CTA hover, node hover, blog card hover, logo-cloud drag + release, PoweredBy CTA hover, trusted card hover). The Scale side of these is dimmed by its cookie banner (the reject click didn't land in that run); the clone side shows the intended states.
- Fixed in this pass: stats card value block had an extra `lg:pt-6` and mask padding (+124px page height) → removed, stats now 852 = 852; trusted CTA-less card description was bottom-aligned → reserved CTA row; trusted ClipScroll end → "center bottom" (live behaviour); LinkCard hover fill and CTA hover only on hover devices (was sticky on touch); pillar h5 22/1.05 on mobile (was 20/1.5, +21px); gray CTA black-on-hover added.
- 200 on the dev server, no console errors on the clone (Scale itself logs a 404, a 401 and an OptinMonster warning).

## Remaining gaps
- Customer, agency and testimonial logos are placeholder tiles; the LogoCloud sphere tiles are blank.
- Pull-apart card: no background footage (licensed iStock) and a neutral chevron instead of Scale's logo texture (the scene accepts `cardVideoUrl`).
- `bridge-stack.webm` and some photos are Scale media (fine for the clone; Vahue pages must pass their own `media`).
- 390: the first testimonial quote breaks after "lot" on Scale and after "more" on the clone (sub-pixel font metrics; same font, size and tracking), one line shorter on the clone.
- Pillars video frame differs between captures (video time), not layout.
- Shared footer differs (shared `ScaleFooter`), not this page.
