# scale.com/evaluation/public-sector → /scale-clone/evaluation-public-sector

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a tab in the shared CDP 9230 Chrome (closed afterwards); Playwright `connectOverCDP` on that tab for the DOM tree and computed styles; headless Chrome (under the browser lock) for side-by-side QA at 1440×900 and 390×844; the page's chunks and CSS curled and grepped.

Files: `app/scale-clone/evaluation-public-sector/page.tsx`, `components/scale-clone/evaluation-public-sector/*`:
- `EvaluationPublicSectorPage.tsx` takes `{ content, theme? }`
- `content.ts` holds the content contract and `scaleEvaluationPublicSectorContent` (Scale's own copy)
- `FullBleedMedia.tsx`, `Sections.tsx`, `Marquee.tsx`, `icons.tsx`, `eps.module.css`

The FlatCta (`../about/FlatCta`) and AnimatedText port (`../about/animatedText`) are imported from the about clone, which is the latest audited copy of the same chunks. Assets are in `public/scale-clone/evaluation-public-sector/` (540 KB). QA images are in `qa/evaluation-public-sector/`.

Theme: every colour reads an `--eps-*` variable set on `.root` in `eps.module.css`; the defaults are Scale's light palette. The variables are `--eps-bg`, `--eps-fg`, `--eps-muted` (#525252), `--eps-lead` (gray-700 #374151), `--eps-link` (#008eff), `--eps-card` (black/5), `--eps-line` (black/10), `--eps-tile` (black/9), `--eps-mock` (#0b0b0b), `--eps-btn` / `--eps-btn-hover` (#333 / #000), `--eps-media-bg` (#193a29) and `--eps-prefooter-bg` (gray-50 #f9fafb).

## REA evidence
- `analyze_web_bundle` (`ev_191ce854c87f55b3…`) parsed 58/58 scripts with 0 failures (867,513 AST nodes) and fingerprinted Next.js (turbopack) + React.
  - Shared chunks checked by sha256 against earlier audits:
    - `1h0nvyhf5gbrf.js` = `10b2627a…` (AnimatedText / FlatCta hover)
    - `37xz28pjbnlx4.js` = `b234eef5…` (FullBleedMediaSection, ClipScrollSection, useScrollTrigger, FlatCta intros)
    - Both are byte-identical to the copies read on about / careers / evaluation-enterprise, so their findings carry over.
  - The page slices come from the CMS-renderer chunks shared with generative-ai-data-engine / donovan: `059q_ihpcslaa.js` (5.1 MB), `2oqqgjzhyolwf.js`, `19p53ufb3n98_.js`, `055kw1f0p2ydh.js`.
  - `30w17vppvfdah.js` (Keen) and `3d2zty6gdk3do.js` (WheelControls) are loaded but nothing on this page instantiates a slider.
  - `3kd41k7ews14b.js` (three.js, site-wide) is loaded but nothing on this page creates a canvas.
  - Route candidates: `/static/img/reskin/prefooter-default.jpg` (37xz28) and `/static/images/components/side-by-side/media-placeholder.svg`.
- `inspect_web_event_listeners`:
  - Hero `a.FlatCta`: `ev_890485c8fc9c2089…`
  - "Read more" link: `ev_c791d51c05c2dc86…`
  - Both have only HubSpot `mousedown` (`js.hs-analytics.net`) + React `click` (`42ixmvih7808g.js`); hover comes from React's delegated pointer events (FlatCta) or plain CSS (Read more).
  - No listeners on the Why Scale `article` (`ev_5c9c8701b8a14233…`), the mobile `.rfm-marquee-container` (`ev_db9ed7454edb7951…`) or the technique card (`ev_c89085180d1a563e…`).
- Intro eases read from `37xz28pjbnlx4.js`: `let a="#ffffff",i="power2.out",s="power3.out",o="power3.inOut"`.
  - `filledWhiteArrow` uses `s` (root/counter) and `o` (chevron).
  - `fadeIn` uses `s` (`autoAlpha 1, duration .85, ease s`).
  - The hero's CtaGroup renders `Y(E,{variant:"arrow",introAnimation:"filledWhiteArrow"}), Y(R,{variant:"border",introAnimation:"fadeIn"})`.
  - Note: the evaluation-enterprise spec lists `power2.out` for these intros; the chunk says `power3.out`.

## Sections, top to bottom (desktop / mobile)

| # | Section | Layout | Type | Notes |
|---|---|---|---|---|
| 1 | Hero (FullBleedMediaSection, `startPercentage 0`, ClipScrollSection `bg-white`) | wrapper `pb-10! pt-24!`; ClipScrollSection `px-4!`; card 1408×720 / 358×480, r24, `p-16` / `p-8`, content bottom-left `max-w-[72rem] gap-6`. Image `public-sector-test-evaluation.webp` (1920×1280, cover) on `#193a29`; `.media-overlay` computes to `linear-gradient(transparent, #000)` (beats `bg-black/45`) | h2 `header2` clamp(2rem,.5rem+5vw,4rem)/1.05 white (64 → 32); p `body1` 20/30 → 16/1.45 white | CTA row `flex-col gap-4 md:flex-row`: arrow "Book a Demo" 154×40 (white, r8 after intro) + border "Learn more" 104×39 (1px white, r6, `h-max`) |
| 2 | Logo strip (Section `!py-12`) | lead `max-w-[698px] mb-12 px-4` centred; ≥768 `ul.container` (max 1280, px-8) `flex justify-around gap-8 sm:min-h-[52px]`; <768 react-fast-marquee, items `ml-12` | lead 16/26.4 `#374151`; link `text-link` #008eff 500 + `→` (font-unicode) | logos CDAO 79×22 and White House 65×45, `brightness-0` |
| 3 | Test Diverse SI Techniques (SectionHeader + two cards) | Section `!py-16`, container `max-w-[1472px] px-6`; header `max-w-3xl mb-10 md:mt-12`; grid 1 / md 2, gap-6; card flex-col r16, 1px black/10, bg black/5; media `p-4 pb-0`, img h-320 r12 cover (650 wide at 1440); body `p-6` | eyebrow geist-mono 12/24 +1px uppercase #525252 `mb-5`; h2 30/1.375 → md 40 → lg 48/1.25; lead 16 → lg 20 / 1.6 black/70; card h4 18/29.7 600; p 14/22.75 black/70 `mt-2` | — |
| 4 | Why Test & Evaluate SI (SectionHeader + FeaturesWithIcons) | `flex flex-wrap gap-16 md:gap-y-20 md:gap-x-6 xl:gap-x-14`; item `grow basis-full md:max-w-[368px] lg:basis-1/4` (x 24 / 448 / 872) | h4 24/36 400 `mt-6`; p 16/24 #525252 `mt-4` | figure 44×44 r8 black/9 + 1px black/10; MdVerifiedUser / MdAutorenew / MdSearchOff at 22 |
| 5 | Test & Evaluation Methodology (SectionHeader + ChecklistWithMedia with BrowserMockup) | row `flex-col md:flex-row gap-[54px] mt-12 items-center max-w-[1216px]`; media `md:w-7/12` (678); list `md:w-5/12 gap-6` (484) | h3 `text-3xl heading` 30/45 400; item title 16/24 500 (the empty 14px body `<p>` still renders, so each item is 56 tall); tick 22 round black/9 + MdCheck 12 black/70 | mockup r16, 1px white/10, `#0b0b0b`; bar `px-3 py-2 gap-2`, dots svg w-10, "nucleus.scale.com" 12/18 white/40; img `img-rag-methodology.png` (1944×1296) r12 h-auto. CTA: legacy `TdsvaW_button--primary --black` "Read more →" 117×38, r10, 14/20 500, `px-[17px] py-[8px]` |
| 6 | Why Scale (SectionHeader + 6 cards) | grid 1 / md 2 / lg 3, gap-6; article `min-h-[310px] flex-col r16 border black/10 bg black/5 p-6`; icon box `mb-12 flex-1 center` black/70 | h4 18/29.7 600; p 14/22.75 black/70 `mt-3` | MdTune, MdPersonSearch, MdBarChart, MdGpsFixed, MdGridView, MdShield at 72 |
| 7 | Pre-footer (FullBleedMediaSection, `startPercentage 10`, ClipScrollSection `bg-gray-50`) | wrapper `mt-16! pb-8`; same card as the hero; `prefooter.jpg` | h2 "Enable AI safety today!" | one arrow CTA "Book a Demo" |

Header and footer come from the shared clone layout. The header stays light (no `data-nav-theme`).

Measured at 1440 (Scale / clone):
- Top of each block: hero 39/39, logos 895/895, techniques 1118/1118, why 1924/1924, methodology 2484/2484, why-scale 3340/3340, pre-footer 4500/4500, footer 5252/5252; document 6151/6151.
- All 11 h4s, 23 paragraphs, 6 articles, every image and all three CTAs land within 1 px, apart from two balanced headers 2–5 px narrower (text-balance with a different face).

At 390:
- Every block top matches: logos 718, techniques 960, why 2284, methodology 3262, why-scale 4458, pre-footer 6956, footer 7468.
- The document is 8829 vs 8789. The 40 px difference is in the shared footer, as on evaluation-enterprise.

## Motion

| Element | Trigger | start → end | From → to | Ease / duration / stagger | Scrub / pin |
|---|---|---|---|---|---|
| Hero / pre-footer clip | ClipScrollSection | `top bottom` → `center center` | `inset(0.5·startPercentage% round 1.5rem)` → 0 (hero 0, pre-footer 5% → 0) | linear map | onUpdate + onRefresh |
| Hero / pre-footer media | FullBleedMediaSection `<section>` | same | scale 1.25 → 1 (`mapRange`, clamped), set in onUpdate only | linear | onUpdate |
| Headline + body (AnimatedText default) | section `top center`, end `bottom 20%`, retroactiveOnEnter, once | — | SplitText `lines,words` masked; lines yPercent 400 / opacity 0, words x 30%; colour #72CE7B → #79648C → own colour; body +0.2s | lines 1s power3.out at 0.08·i; words 0.9s power3.out stagger 0.03 | — |
| Arrow CTA `filledWhiteArrow` | same call, delay 0.5 | — | root autoAlpha 0, scaleX 0, radius 0 → 1/1/8; counter scaleX 0 → 1 at +0.1; label opacity at 0.75; chevron x −6 → 0 | 0.85s power3.out; chevron power3.inOut | — |
| Border CTA `fadeIn` | same timeline, position 0 | — | autoAlpha 0 → 1 | 0.85s power3.out | — |
| Mobile logo marquee | — | — | each copy translateX 0 → −100% | linear, duration = width / 50 px/s (6.84s at 390), infinite | — |

The SectionHeaders, cards, FeaturesWithIcons, checklist and Why Scale grid have no motion on Scale: no AnimatedText class and no tweens.

Under `prefers-reduced-motion` the clone doesn't split or tween anything. CTAs show at rest, the clip and scale stay at their resting values, and the marquee stops. Scale's react-fast-marquee doesn't stop; the clone stops it because of the project rule.

## Libraries / versions
- GSAP 3.15 with ScrollTrigger and SplitText (`gsap.context`, reverted on unmount).
- Lenis from the shared clone layout (lerp 0.14).
- react-fast-marquee is reproduced in CSS (`Marquee.tsx` + `.rfm*` in `eps.module.css`) with its defaults:
  - speed 50, no autoFill, no pause
  - two copies, each `min-width: 100%`
  - duration measured with a ResizeObserver
- No Keen, Embla, three.js, Rive or video on this page.

## Assets (`public/scale-clone/evaluation-public-sector/`, 540 KB)
- `hero.webp`: 1920×1280, `/static/img/reskin/headers/public-sector-test-evaluation.webp`, 69 KB
- `img-computer-vision-eval.webp` (1752×1140) and `img-generative-ai-eval.webp` (1752×1141)
- `img-rag-methodology.webp`: the 1944×1296 PNG re-encoded at 1400 px, q85, 66 KB
- `prefooter.jpg`: `/static/img/reskin/prefooter.jpg`, 2400 px, copied from evaluation-enterprise
- Material glyphs and the mockup dots are inlined in `icons.tsx`.
- The customer logos (CDAO, White House) aren't shipped. Same-size neutral tiles stand in; `content.logos.items[].src` can supply real ones.
- The page has no video.

## QA
- Layout passes: `qa/evaluation-public-sector/{1440|390}-{scale|clone}-NN.jpg`, one screenshot per 50% of the viewport (14 stops at 1440, 21 at 390). The OneTrust banner is hidden.
- The page returns 200 and the clone logs no console errors. Scale logs its own 404/401 and OptinMonster errors.
- Interaction images are in `qa/evaluation-public-sector/interactions/`.

## Interaction inventory
Method: identical inputs on both sites with `scratchpad/eps-audit/qa.js` (`int` mode) and `mq.js`, at 1440 and 390:
- hover / leave sampled every 100 ms on both hero CTAs
- the customers link and the Read more button, sampled at 0 / 150 / 600 ms
- hero media at scroll 0 / 150 / 300 / 450 / 600
- pre-footer scrub at 10 points (root top 900 → 360)
- a jump straight to the page bottom (the pre-footer intro must still play)
- a 3×3 mouse grid over every section, comparing transform, opacity, colour, background, translate and scale of every visible node before and after
- the mobile marquee sampled every 500 ms

Page-wide listeners:
- `html` passive `scroll` (ScrollTrigger)
- useScrollTrigger `pageshow` / `visibilitychange`
- OneTrust `keydown` / `click`, deliberately left out

The mouse grid changed 0 nodes on every section on both sites. The only exception is the logo row at 390, which moves by itself (the marquee) on both.

### 1 · Hero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| media | scroll | ScrollTrigger via `html` scroll | 37xz28 mod 540431 | scale 1.25 → 1. At scroll 0 / 150 / 300 / 450 / 600: Scale 1.0139 / 1 / 1 / 1 / 1 at 1440 (1.006 at 390). The clone is identical | yes | `{1440,390}-scale/clone-00` |
| headline / body / CTAs intro | scroll `top center` | useScrollTrigger (210104) retroactive | 37xz28 / 1h0nvyhf | as in the Motion table | yes | — |
| FlatCta arrow "Book a Demo" | pointerenter / leave | React; HubSpot `mousedown` (`ev_890485c8…`) | 1h0nvyhf mod 892855 | wash −100% → 0 → +100% at 600 ms ease-out, snapping back on the 680 ms timer; chevron track −50% → 0, snapping back on leave. Enter: Scale −1, −.612, −.315, −.161, −.066, −.011, 0 / clone −1, −.558, −.315, −.161, −.066, −.011, 0. Leave: Scale 0, .388, .652, .839, .934, .985, 1, −1 / clone identical | yes | `*-hero-arrow-hover-*` |
| FlatCta border "Learn more" | pointerenter / leave | React + HubSpot | 892855 | wash translateY 100% → 0 → −100% at 300 ms, snapping back on the 680 ms timer; label `scale .9`. Enter (wash y / label scale): Scale .974/1, .389/.931, .088/.904, .026/.9 / clone .974/1, .39/.931, .088/.904, .026/.9. Leave: Scale −.559/.969, −.836/.993, −.923/1 …, back to .974 at 700 ms / clone identical | yes. **Fixed during QA**: added `h-max` (the clone's border CTA stretched to 40 px in the flex row) and the label scale (the shared about FlatCta has no border-label hover) | `*-hero-border-hover-*` |

### 2 · Logo strip
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Meet our customers →" | hover | none (CSS) | LogoStrip | arrow `group-hover:translate-x-1` at 300 ms ease-out: 3.36 px at 150 ms, 4 px after (Scale animates `translate`, the clone `transform`, with the same values). Colour stays rgb(0,142,255) on both: Scale's unlayered `.text-link` beats its `hover:text-blue-700` | yes. **Fixed during QA**: dropped the hover colour the clone first had | `*-customers-hover-*` |
| mobile marquee | none (CSS animation) | none (`ev_db9ed745…`) | react-fast-marquee | 6.84s linear; both copies 342 wide, moving 25 px per 500 ms on both sites | yes | `390-marquee-*` |

### 3 · Techniques · 4 · Why Test · 6 · Why Scale
No listeners (`ev_c8908518…`, `ev_5c9c8701…`), no hover styles, and no scroll or pointer effects. The mouse grid changed 0 nodes. Nothing to reproduce.

### 5 · Methodology
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| "Read more →" (legacy button) | hover | HubSpot `mousedown` + React `click` (`ev_c791d51c…`), hover in CSS | `TdsvaW_button--primary/--black` | background #333 → #000 and border 0.3s (ease). The arrow has only `duration-300`: its `transition-translate` class matches no rule, so it transitions `all 0.3s ease` and translates 4 px. Scale: bg rgb(10,10,10) and 3.21 px at 150 ms, then #000 and 4 px; the clone gives the same values | yes | `*-readMore-hover-*` |
| focus | keyboard | — | — | `focus-visible:outline outline-[rgba(255,255,255,.64)] outline-offset-[3px] rounded-xl` | yes (CSS) | — |

### 7 · Pre-footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 540431 + ClipScrollSection | 10 points, root top 900 → 360: inset 5 / 4.630 / 4.259 / 3.889 / 3.519 / 3.148 / 2.778 / 2.407 / 2.037 / 1.667 % with scale 1.25 / 1.2315 / 1.213 / 1.1944 / 1.1759 / 1.1574 / 1.1389 / 1.1204 / 1.1019 / 1.0833. Scale and the clone give identical values | yes | `*-prefooter-scrub-*` |
| intro after jumping to the bottom | scroll | useScrollTrigger retroactive | 210104 | heading opacity 1, CTA opacity 1, radius 8px, width 154 on both | yes | — |
| FlatCta arrow | pointerenter / leave | React + HubSpot | 892855 | same as the hero | yes | — |

## Remaining gaps
- Fonts are Vahue's. Line breaks match everywhere except at 390, where "Bespoke GenAI & SI Evaluation Sets" wraps to 2 lines (Scale: 1). The card keeps `min-h-[310px]`, so nothing moves.
- The `→` glyphs (font-unicode = Aeonik on Scale) use system-ui, so the Read more button is 120 px wide vs 117 at 390 and 122 vs 117 at 1440 before the fix.
- The imagery is still Scale's: the hero render, two product screenshots, the "GP" RAG dashboard and the prefooter photo. The customer logos are tiles, and the mockup URL reads "nucleus.scale.com" (Scale's text, kept for QA).
- Links point at clone routes: `/scale-clone/demo/`, `/scale-clone/public-sector-data-engine/`, `/scale-clone/blog/` (Scale: the white-paper post), and `/scale-clone/` (Scale: /customers).
- `oml:` (short-landscape) variants are not reproduced.
- HubSpot `mousedown` analytics and OneTrust listeners are third-party and deliberately left out.
