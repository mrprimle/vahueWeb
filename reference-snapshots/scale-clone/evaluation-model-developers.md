# scale.com/evaluation/model-developers → /scale-clone/evaluation-model-developers

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a CDP 9230 tab (closed afterwards); curl'd production chunks and the RSC payload; Playwright (headless Chrome) at 1440×900 and 390×844 for layout, and an identical-input interaction script on both pages (`scratchpad/emd/tools/inter.js`, `measure.js`).

Files: `app/scale-clone/evaluation-model-developers/page.tsx`, `components/scale-clone/evaluation-model-developers/*` (`EvalModelDevPage`, `FullBleedMedia`, `CardGrid`, `Sections`, `Testimonials`, `content`, `icons`, `styles.module.css`), `public/scale-clone/evaluation-model-developers/*` (244 KB). QA: `reference-snapshots/scale-clone/qa/evaluation-model-developers/` (+ `interactions/`).

The page is hand-coded Next (not Sanity slices): the closest existing clone in structure is **experts** (hero 478135, LinkCard CardGrid, ClientTestimonials, pre-footer 540431), not evaluation-enterprise (whose FeaturesWithIcons / ChecklistWithMedia / BrowserMockup slices do not appear here). The clone reuses the experts FullBleedMedia / CardGrid / Testimonials ports (adapted: image hero, backdrop prop, 1/2/3-col grid, theme-coloured testimonials), plus the shared careers FlatCta, rlenvironments motion helpers (prepareCascade / playCascade / retroactiveEnter / whenVisible), physical-ai AnimatedText (flip) and `useRefreshOnPageGrow`.

## REA evidence
- `analyze_web_bundle` `ev_3a4900effc9c…`: 47/47 scripts parsed, 0 failures, 709,592 AST nodes. Next.js (turbopack) + React fingerprints. Routes `/_next/image`, `/static/img/reskin/prefooter-default.jpg` (37xz28pjbnlx4.js). No canvas / WebGL use on this page (3kd41k7ews14b.js is the site-wide three chunk).
- Chunk identity (sha256): FlatCta / AnimatedText `1h0nvyhf5gbrf.js` `10b2627a…` and FullBleed / ClipScrollSection / useScrollTrigger `37xz28pjbnlx4.js` `b234eef5…` are byte-identical to earlier audits; `3x8z3_0hhtdcb.js` `89a4cc62…` (healthcare / experts audits) also loads. Page-specific: `1zwo72ehg4xzu.js` `1f44ec5b…` (module 830843: the four EvaluationLinkCardGrids + styled-jsx `5ec3ee9bcd5f0f78`) and `0b4nb0uzhfrdc.js` `9ac33c3f…` (CardGrid 540409, LinkCard 874328, ClientTestimonials 685963). Those three modules were diffed against the security (`0c1-uups1drfu.js`) and enterprise (`3x8z3_0hhtdcb.js`) copies: only minifier renames. BaseCardScroll 598042 read from `2k1qlgdxlbmz1.js` (`bb51ad26…`).
- RSC payload props: hero `478135 { headline, body, cta "Book a Demo" /demo, backdrop white, media img-hero-monitor.webp }` in wrapper `pb-10! pt-24!`; ClientTestimonials `685963 { heading "Don’t just take our word for it", backdropColor white/#010101, 2 testimonials }` with **no colorTheme** (default cloud-slate `#839CB2`, contrastColor `#000000`); pre-footer `540431 { headline "Enable the safety of LLMs today!", cta, backdrop gray-50, media prefooter.webp }` in `mt-16! pb-8`.
- `inspect_web_event_listeners`:
  - `.evaluation-link-card-grid .LinkCard` (`ev_669d24e9a15a…`): no listeners.
  - Resource link `a.block[href*=leaderboard]` (`ev_ed0dc7e22571…`): HubSpot `mousedown` + React root `click` only.
  - `.ClientTestimonials button[aria-label="Next testimonial"]` (`ev_6304091a660e…`): HubSpot `mousedown` + React `click`; hover is React `onMouseEnter/Leave` → gsap.
  - Taxonomy `img[alt^="Red team"]` (`ev_41a6ec62d41b…`): React `load`/`error` only.
  - Page-wide (from source, as in earlier audits): ScrollTrigger passive `scroll`, useScrollTrigger `pageshow`/`visibilitychange`, CardGrid `visibilitychange` (deferred intro), OneTrust.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Notes |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection compact 478135, ClipScrollSection `startPercentage 0`, backdrop white) | wrapper `pt-24 pb-10`; card 1408×720 / 358×480, r24, `p-16` / `p-8`, content bottom-left, max-w 72rem, gap 24; image `img-hero-monitor.webp` 1920×1280 cover on `#193A29`; overlay `linear-gradient(#0000, #000)` | h2 header2 `clamp(2rem,.5rem+5vw,4rem)`/1.05 white (64 → 32); body1 20/1.5 → 16/1.45 | one CTA: FlatCta arrow white "Book a Demo" |
| 2 | Evaluation Challenges | shell `pt-8 md:pt-10 pb-10`, container `max-w-[1472px] px-6`; SectionHeader `mb-8 md:mb-10 md:mt-12 max-w-3xl` centred; grid 3 LinkCards (no description) | eyebrow mono 12/24 +1px uppercase `#525252` mb-5; h2 2.5rem → md 3rem → lg 3.25rem / 1.08, max-w 760 | card 458.67×402 at 1440 (`#f2f2f2`, r16 / r8 < xl), padding 48 / 32 (md) / 24; gap 64 / 24 (md) / 20 |
| 3 | Why Scale | same; header body 18/1.55 black/60 max-w 760 (`[&_p]` overrides beat `lg:text-xl`); 5 cards (3 + 2) | card title header5 24/1.5 (18/1.35 < 1280); description 16/24 `#212121` | descriptions top-aligned: the LinkCard's `CMSLink` div has no height, so the inner `h-full` is auto |
| 4 | Risks | same; 6 cards (3 + 3) | | |
| 5 | Experts | same; taxonomy figure `mb-10 rounded-lg border-black/10 bg-[#f5f5f3] p-6 md:p-10`, image box `aspect-[1129/480]` object-contain (1392×637 box at 1440); 5 cards | | |
| 6 | ClientTestimonials (default variant, cloud-slate) | wrapper `pt-8 md:pt-10 pb-10`; root `pt-20 pb-16 md:pb-20` white; panel `#839CB2` r16, `lg:grid-inner-12`; heading + name tiles col 2 (109² at 1440; bottom row 80² at 390); quote cols 5–11 with 160 / 100 px indent | heading mono 12/16.5 500 white; quote header3 40/44 −0.05em (24/28 mobile) white; name 18 (16) medium white; chip mono 10 uppercase, white bg, `#839CB2` text | tiles: border/fill/inactive text `#000`, active text `#839CB2`, label text-xs 500 truncate; arrows 1px `#000` border + `#000` icon |
| 7 | Resources | same shell + header (no body); `grid gap-6 md:grid-cols-2 xl:grid-cols-4` (330 wide at 1440) | media `aspect-[389/243] rounded-lg #f5f5f3 p-6` with 112 px icon; category 14/1.71 500 `#525252`; h5 24/1.33 `#111` line-clamp-2, `pt-5` / `mt-1` | plain links, no hover styling |
| 8 | Pre-footer (540431, `startPercentage 10`, backdrop `#f9fafb`) | wrapper `mt-16 pb-8`; same card, `prefooter.webp` | h2 header2 | CTA "Book a Demo" |

Measured section tops at 1440 (Scale / clone): hero 135 / 135, challenges 895 / 895, why 1621 / 1621, risks 2845 / 2845, experts 3957 / 3957, testimonials 5815 / 5815, resources 6578 / 6578; document 8935 / 8936. Every h2, h5, p, card, button and image rect is within 2 px except the three challenge-card titles (109 vs 112 px, face metrics) and the testimonial heading (3 lines / 50 px on Scale vs 2 lines / 33 px: the mono face is narrower; tiles sit 7 px higher). At 390: every block within 4 px down to the footer (document 11225 / 11189; the 36 px is in the shared footer).

## Motion

| Element | Trigger | start → end | From → to | Ease / duration | Notes |
|---|---|---|---|---|---|
| Hero / pre-footer clip | ClipScrollSection | `top bottom` → `center center` | `inset((1−p)·0.5·startPercentage% round 1.5rem)`: hero 0, pre-footer 5% → 0 | linear | onUpdate |
| Hero / pre-footer media | same | same | scale 1.25 → 1 (image branch, so it applies on both) | linear | onUpdate only, no initial set |
| Headline + body + CTA intro | section `top center`, end `bottom 20%`, retroactiveOnEnter | — | AnimatedText cascade, body +0.2s; CTA `scaleX 0 → 1`, radius 0 → 8, autoAlpha, 0.85s delay 0.5 | power3.out | |
| BaseCard (every card) | card | `top bottom` → `top 50%`, scrub true | scale 0.96 → 1, opacity 0 → 1; staggered window `l = min(.1, .85/(n−1))` | power2.out on the mapped progress | origin centre, no x offset (directionalEntrance false) |
| Card icon tile / icon / title / description | grid `top bottom`, once, retroactive; waits for `visibilitychange` if hidden | — | tile `inset(0 100% 0 0 round 10px) → inset(0)` 0.5s power1.out at `0.05i + 0.125`; icon opacity 1s at +0.05; title cascade +0.16; description +0.18 | | LinkCard 874328 |
| Testimonial panel | panel | `top bottom` → `bottom 75%`, scrub | width 90% → 100% | power3.out | |
| Testimonial select | root `top 80%` | — | index −1 → 0; flip out/in (rotationX ±90, yPercent ∓108, 0.48s power2.out, stagger 0.05; new quote +0.35, names +0.5); chip width → 20 → text + 26 (0.5s power3.out) | | |
| Tile fill | index change | — | `#000` fill slides along y (desktop) / x (mobile), 0.3s | | |
| Arrow hover | mouseenter/leave | — | bg `#0000 → #000`, icon `#000 → #839CB2`, border `#000 → #0000`, 0.3s | gsap default | |
| FlatCta hover | pointerenter/leave | — | 35% wash `−100% → 0 → +100%`, 680ms reset; chevron track −50% → 0 | 600ms ease-out | shared state machine |

Section headers, the taxonomy figure and the resource grid have no motion (no AnimatedText class, no tweens). Under `prefers-reduced-motion` the clone renders everything at rest (CardGrid skips the scrub/intro; FullBleed skips clip/scale/intro; testimonials set the panel to 100%).

## Libraries
GSAP 3.15 (ScrollTrigger, SplitText) in `gsap.context`, Lenis from the shared clone layout (lerp 0.14, `window.__lenis` for the testimonial click-scroll). No Keen, Embla, three.js, Rive or video on this page.

## Assets (`public/scale-clone/evaluation-model-developers/`, 244 KB)
- `hero.webp` (1920×1280, 49 KB): `/static/images/pages/evaluation/model-developers/img-hero-monitor.webp`
- `red-team-taxonomy.webp` (1920×816, 136 KB): `…/red-team-taxonomy-light.webp`
- `resource-{leaderboard,test-evaluation,wmdp-risk,llama-partner}.png` (256², 1–4 KB)
- `prefooter.webp`: Scale's `/static/img/reskin/prefooter.webp` (7952×3654, 620 KB) downscaled — the 38 KB copy from the experts clone.
- Card icons: the 19 Material glyphs (24×24 paths) copied from the SSR markup into `icons.ts`, with Scale's per-card colours (`#79648C` / `#A8927C` / `#839CB2`).
- No video on this page, so nothing was posterised.

## QA
Layout screenshots every 100% viewport: `1440-{scale,clone}-00…09.jpg`, `390-{scale,clone}-00…13.jpg` (OneTrust hidden on Scale). Interaction captures in `interactions/` (`hero-cta-hover`, `cards-scrub-mid`, `resource-hover`, `testimonial-0`, `testimonial-1`, `prefooter-scrub`, each `-scale` / `-clone`). No console errors on the clone; page returns 200.

## Interaction inventory

Same inputs on both pages at 1440×900 (raw: `scratchpad/emd/inter-{scale,clone}.json`).

### 1 · Hero (478135)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| FlatCta arrow | pointerenter / leave | React delegated; HubSpot `mousedown` | 1h0nvyhf5gbrf.js 892855 | enter, wash x: Scale −1, −.558, −.315, −.161, −.066, −.011, 0 / clone identical; leave: Scale 0, .388, .652, .818, .934, .985, 1, −1, −1 / clone 0, .388, .652, .839, .934, .985, 1, −1, −1 | yes | `hero-cta-hover-*` |
| media | scroll | ScrollTrigger (`html` scroll) | 37xz28pjbnlx4.js 540431 | scale at scroll 0/150/300/450: 1.0139, 1, 1, 1 on both | yes | — |
| intro | scroll `top center` | useScrollTrigger 210104 retroactive | 37xz28pjbnlx4.js | cascade + CTA as in Motion | yes | — |

### 2–5 · Card sections (EvaluationLinkCardGrid → CardGrid 540409 / LinkCard 874328 / BaseCardScroll 598042)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| BaseCard | scroll scrub | ScrollTrigger; `.LinkCard` none (`ev_669d24e9a15a…`) | 598042 | Why Scale grid, top at 900/800/700/600/450/300 px: card 0 opacity Scale 0, .714, .976, 1, 1, 1 / clone 0, .746, .982, 1, 1, 1; card 3 at 300: .452 / .529. The clone runs ~8 px (0.016 progress) ahead, consistently across cards (see gaps) | yes (≈8 px offset) | `cards-scrub-mid-*` |
| icon tile / icon / title | scroll, once | ScrollTrigger + `visibilitychange` | 540409 / 874328 | Risks grid, ms after entering: tile 0 right inset Scale 100, 84.6, 37.9, 4.3, 0 / clone 100, 89.9, 42.0, 6.2, 0 (≈15 ms later, after `document.fonts.ready`); icon opacity at 300/500/800 ms .26/.57/.87 vs .24/.55/.86 | yes | — |
| description alignment | — | — | 874328 (`CMSLink` wrapper) | description top inside every Why Scale card: 276 px on both. **Fixed during QA**: the experts port stretched the inner box, pushing 2-line descriptions one line lower | yes | — |
| LinkCard hover | pointer grid 3×3 | none | 874328 (no hoveredColor, no link) | 0 style changes on both | n/a | — |

### 6 · ClientTestimonials (685963, default cloud-slate theme)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel bg | scroll scrub | ScrollTrigger | 685963 | width ratio at root top 900/700/500/300/100: .9, .9484, .9876, .9987, 1 on both | yes | — |
| select on enter | scroll `top 80%` | useScrollTrigger | 685963 | tile 0 `#839CB2` selected, tile 1 fill at y 106.7 px; quote "Companies are…", chip "Director, Center for AI Safety" white bg / `#839CB2` (212 vs 206 px wide, face) | yes | `testimonial-0-*` |
| Next arrow hover | mouseenter | React + gsap (`ev_6304091a660e…`) | 685963 `o` | bg / icon / border every 100 ms: `#0000/#000/#000` → `.56/#495764/.44` → `.89/#758b9f/.11` → `#000/#839CB2/#0000` on both | yes | — |
| Next arrow click | click | React `click` | 685963 | Lenis scrolls the root to 136 px (offset −24 − scroll-mt-28): Scale 96, 131, 135, 136 / clone 90, 131, 135, 136 (250 ms steps); index 1, tiles swap, quote "The work Scale is doing…", chip "Former Chief Digital…" | yes | `testimonial-1-*` |
| Previous arrow / tiles | click | React | 685963 | back to index 0; old tile fill exits to −106.7 px on both | yes | — |
| keyboard | Tab | native | 685963 | active tile `tabIndex 0`, others −1; arrows are buttons | yes | — |

### 7 · Resources
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `a.block` ×4 | hover / click | HubSpot `mousedown` + React `click` (`ev_ed0dc7e22571…`) | page | no hover classes in Scale's markup; plain navigation | yes (static) | `resource-hover-*` |

### 8 · Pre-footer (540431, startPercentage 10)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 540431 | root top at 900/780/660/540/420: inset 5, 4.259, 3.519, 2.778, 2.037 %; scale 1.25, 1.213, 1.1759, 1.1389, 1.1019 — identical on both | yes | `prefooter-scrub-*` |
| intro | jump to page bottom | useScrollTrigger retroactive | 37xz28pjbnlx4.js | h2 opacity 1, CTA opacity 1 / visible on both | yes | — |
| FlatCta | pointer | as hero | 892855 | shared component | yes | — |

### Not reproduced
- HubSpot `mousedown` analytics and OneTrust listeners (third-party, deliberately left out).

## Remaining gaps
- BaseCard scrub runs ≈8 px (0.016 progress) ahead of Scale on every card. Scale's useScrollTrigger (681201) creates the trigger in a `useEffect` with an empty scrubbed timeline and refreshes it after two rAFs; the clone creates it in a layout effect with an `onRefresh` setter. Same start/end strings and easing; the cause of the 8 px (≈ the 0.96-scale shift of a 400 px card) is not pinned down.
- Face metrics: the challenge titles wrap 1 px/line taller; the testimonial heading wraps to 2 lines instead of 3 (narrower mono), so the tiles sit 7 px higher; the role chip is 3% narrower.
- Images are Scale's (hero monitor render, taxonomy chart, four resource icons, pre-footer photo); third-party names appear in the testimonials as on Scale. Links to Scale blog posts point at scale.com.
- `oml:` (short-landscape) variants are out of scope.
