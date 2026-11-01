# scale.com/global-public-sector → /scale-clone/global-public-sector

Captured 2026-11-01. Tools: REA (`analyze_web_bundle` with script sources, `inspect_web_event_listeners`) on a CDP 9230 tab (closed afterwards), production chunks / CSS / RSC payload downloaded with curl, Playwright (headless Chrome) at 1440×900 and 390×844 with the same scripts on both sites (`measure.js`, `inter.js`, `pair.js` in the session scratchpad).

Files: `app/scale-clone/global-public-sector/page.tsx`, `components/scale-clone/global-public-sector/*`, `public/scale-clone/global-public-sector/*` (512 KB). QA: `reference-snapshots/scale-clone/qa/global-public-sector/` (`<w>-NN.jpg` = Scale left, clone right, one per viewport of scroll) and `qa/global-public-sector/interactions/<name>-{scale,clone}.jpg`.

`GlobalPublicSectorPage({ content?, media? })` renders the page; `content: GlobalPublicSectorContent` (`content.ts`) has one optional slice per section (`hero`, `trusted`, `foundations`, `value`, `testimonials`, `stats`, `portfolio`, `video`, `useCases`, `prefooter`). `media.hero` / `media.prefooter` replace the photos. Colours are CSS variables on `.root` (`gps.module.css`: `--gps-fg-1/3/6`, `--gps-line`, `--gps-card`, `--gps-card-2`, `--gps-panel`, `--gps-glow`). Scale's own copy is shipped so QA lines up.

## REA evidence
- `analyze_web_bundle` `ev_3f81ef2e9532…`: 48/48 scripts parsed, 0 failures; Next.js (Turbopack) + React.
  - Shared chunks unchanged since earlier audits: `1h0nvyhf5gbrf.js` `10b2627a…` (FlatCta 892855, AnimatedText 668761) and `37xz28pjbnlx4.js` `b234eef5…` (FullBleed 540431, pageHero 478135, useScrollTrigger 210104, useScrollTimeline 681201). So the FlatCta state machine (680 ms reset, fill on CSS translate), `#86bff2` focus outline, retroactive intro (end `bottom 20%`), `useRefreshOnPageGrow` and onUpdate-only media scale are reused via the evaluation-model-developers `FullBleedMedia` (itself ported from careers/experts).
  - `2xfd582q915vr.js` `a640704c…`: BaseCardScroll 317967/598042, CardGrid + Card 540409, LinkCard 874328, ClientTestimonials 685963, WistiaPlayer/ResponsiveVideo 832862.
  - Page chunk `25a4rb779kpr2.js` `3d879daf…`: HowScaleDeliversGrid 927726, FeatureList 497052 (+ BrowserMockup 720912), VideoGallery 482270, SectionHeader 1900, AISolutionsGrid 297990, TestimonialSection 763867 (styled-jsx `9d874581593444fe`), UseCaseTabs 623453, CSS-module maps 271623 (`_5VC0Rq_*`) / 886537 (`rEiMFa_*`), wheel plugin 29713.
  - CSS: `0npdyq12us3md.css` (`_5VC0Rq_tabs`, `rEiMFa_*`, `_5fl2pa_background*`), `3ektzubma58z1.css` (type tokens, scale-gray palette, `.media-overlay` = `linear-gradient(#0000,#000)`).
- RSC props: hero `478135 { headline, body, cta "Book a Demo", backdrop white, media headers/global-public-sector.webp }` in `pb-10! pt-24!`; stats `CardGrid 540409 { cards ×3 (iconName MdEditDocument / MdSchool / MdSecurity), theme light, iconSize sm, fluidLayout, animationDirection up }`; `VideoGallery { videos: [{ src: scaleai.wistia.com/medias/bl1zetxbah, cover "" }] }`; `UseCaseTabs { overtitle "Use cases", cases ×2 }`; pre-footer `540431 { headline, cta "Book a Meeting", backdrop white, media prefooter.webp }` in `pt-16! pb-8`. HowScaleDeliversGrid, TestimonialSection and AISolutionsGrid carry their data in the page chunk.
- `inspect_web_event_listeners` (all delegated; no direct pointer/scroll listeners on page elements):
  - `._5VC0Rq_tabs button` `ev_961c28f56f01…`, `.rEiMFa_section button` `ev_b29d6c246d4d…`, `.ClientTestimonials button[role=tab]` `ev_194059f51990…`: HubSpot `mousedown` + React root `click` only.
  - `.BaseCard` `ev_55f8f9b4bdab…` and `[role=table]` `ev_c23342217571…`: none.
  - Window/document (from source): useScrollTrigger `pageshow` + `visibilitychange`; CardGrid `visibilitychange`; Keen Slider (mobile video strip) mouse/touch + non-passive `wheel` from the wheel plugin; ScrollTrigger's passive scroll; Lenis (shared layout, lerp 0.14).

## Libraries
GSAP 3.15 (ScrollTrigger, SplitText via AnimatedText), Lenis (shared layout), Keen Slider 6 (mobile video strip, wheel plugin), Wistia iframe embed on click. No three/Rive/Embla on this page.

## Sections (Scale vs clone, px from page top)

| # | Section | Layout | Type | 1440 top / height | 390 top / height |
|---|---|---|---|---|---|
| 1 | Hero FullBleedMediaSection (478135, startPercentage 0) | wrapper `pt-24 pb-10`, ClipScroll `px-4`, card r24 min-h 720/480, `p-16`/`p-8`; `hero.webp` on `#193A29`, overlay `linear-gradient(#0000,#000)` | h2 header2 clamp(2rem,.5rem+5vw,4rem)/1.05 white; body1 20/1.5 (16/1.45); FlatCta arrow/white "Book a Demo" | 135 / 720 both | 198 / 480 both |
| 2 | Trusted AI (SectionHeader left + FeatureList) | `section.py-24`, container `max-w-[1472px] ps-6 pe-6`; header `md:flex-row md:items-end md:gap-6`, `!mb-0`, empty overtitle (mb 20); cloud-slate `#839CB2` panel `mt-36 rounded-3xl p-16 pt-0 md:px-36 md:pt-16 md:pb-32`; article `lg:grid-cols-2 gap-8 lg:gap-16`, image `01.png` plain (500×334) | h3 30/1.375 → 40 → 48/1.25 balance; p 16 → 20 / 1.6 black/70; h4 24 → 30 semibold /1.25; p 16 relaxed black/70 | 895 / 1120 both | 718 / 1082 both |
| 3 | Foundations | `section.relative.py-20.overflow-hidden`; header centred `!mb-24 !max-w-[840px]`; strip `rounded-2xl border #c7c7c7 bg #f2f2f2 flex-col sm:flex-row`, 1px dividers; screenshots `scale-[1.4] origin-top-left invert` under bottom h-2/5 + right w-1/5 fades; `_5fl2pa_background-white` (2 faint white radial gradients) at opacity .25 | h4 header5 24/1.5 (22/1.05) `#212121`; p body2 16/1.5 (14/1.35) `#575757` | 2016 / 955 both | 1800 / 1479 both |
| 4 | How Scale Delivers Value (SectionHeader + CardGrid 540409, columns 3) | `section.py-20`; header `!max-w-[730px] !mb-0`; CardGrid `py-12 xl:py-24`, `lg:grid grid-cols-3 gap-8px` (flex column below lg); Card `#f2f2f2` r16 (r8 <1280), `p-8` (24 <1280), gaps 20/64; icon tile 64² r6 `bg-black/5`, 32px glyph black/70 | title header5 24/1.5 (18/1.35 <1280) `#212121`; body body2 `#575757` | 2971 / 1224 both; cards 379 wide at x 64/531/997 both | 3279 / 1734 both |
| 5 | ClientTestimonials (685963, one testimonial, default cloud-slate) | `pt-20 pb-16 md:pb-20`; panel bg `#839CB2` r16; one tile (black fill, cloud-slate name), **no arrows** (`lg:justify-end`); quote cols 5–11 | quote 40/44 −0.05em (24/28), name 18 medium, chip mono 10 | 4194 / 723 (clone 722) | 5013 / 836 (835) |
| 6 | Stats CardGrid (fluid, iconSize sm) | `bg-white py-12 md:py-20 grid-layout-mobile md:grid-layout-desktop`, col 2–11 / xl 3–10; `grid-cols-6`, `@container` cells `lg:col-span-2` with `lg:min-h-[calc(100cqw*268/320)]` | label mono 14/21 uppercase `#929292`; value 40/44 (32/1.05) mb 8; line 16/24 `#929292` | 4998 / 452 both | 5897 / 609 both |
| 7 | Solutions Portfolio (AISolutionsGrid) | `section.py-20`; header `!max-w-none !mb-12` (no overtitle); md+: table of 10 `grid-layout-desktop py-6` rows alternating white / `#f2f2f2`, 1px `#c7c7c7` top rules, 8px dots; <md: 4 rows + toggle | category body1 20/1.5 `#212121`; chips 14/21 px-16 py-8 r8 border `#c7c7c7` bg `#f2f2f2` `#575757`; header row body2 `#575757`; "Coming soon" italic `#929292` | 5530 / 1225 both | 6554 / 890 both |
| 8 | VideoGallery (Wistia) | `section.py-12` > container > `bg-white/10 p-4 rounded-2xl`; ≥640 the main player (aspect-video r16, `fadeIn` .6s); <640 a Keen strip with the player + 1 dot | play disc 96 (72 <640) `bg-black/50` → `/70` on hover | 6755 / 893 both | 7443 / 388 both |
| 9 | Use cases (UseCaseTabs) | `section.relative.py-20.overflow-hidden`, radial `rgba(113,77,255,.08)` glow; pill tab bar (sm+) / dots (<sm); card r16 border `#c7c7c7` bg `#f2f2f2`, `lg:grid-cols-2`, image `object-contain grayscale p-6 lg:p-10` min-h 300 / 560 | counter detail-mono 13/1.2 (10); h3 header2 64/1.05 (32); stats header3 40 (24) leading-none + detail 12/1.2; Challenge / Key Outcomes detail-mono + body2 with 12px ticks | 7648 / 1077 both | 7832 / 1307 both |
| 10 | Pre-footer FullBleedMediaSection (540431, startPercentage 10) | wrapper `pt-16 pb-8`, backdrop white; `prefooter.webp` | h2 header2 white; FlatCta "Book a Meeting" | 8788 / 720 both | 9203 / 480 both |

Page height 10439 (Scale) vs 10438 (clone) at 1440; 390: every section top within 1px; the remaining 41px is the shared footer (not this page).

## Motion
| Element | Trigger | From → to | Ease / duration | Source |
|---|---|---|---|---|
| Hero / pre-footer clip | ClipScroll `top bottom → center center` | `inset((1−p)·.5·startPercentage% round 1.5rem)` (hero 0, pre-footer 5% → 0) | linear | 540431 |
| Hero / pre-footer image | same, onUpdate only | scale 1.25 → 1 | linear | 540431 |
| Hero / pre-footer text + CTA | section `top center`, retroactive | AnimatedText cascade (body +.2s); CTA filledWhiteArrow (.85s power3.out, delay .5) | | 478135 / 540431 |
| Value + stat cards (BaseCardScroll) | card `top bottom → top 50%`, scrub | scale .96 → 1, opacity 0 → 1, window `l = min(.1, .85/(n−1))`, power2.out; no x (directionalEntrance false) | | 317967 |
| Card intro | CardGrid `top bottom`, retroactive, waits for a visible tab | icon tile clip `inset(0 100% 0 0 round 10px)` → 0 (.5s power1.out at .1i+.125); glyph opacity 1s (+.1); title cascade at .1i+.125; body / RichText +.14 (or +0 without a title) | | 540409 Card.animateIn |
| Testimonial | panel `top bottom → bottom 75%` scrub; section `top 80%` | bg width 90% → 100% (power3.out); select 0 → quote flips in (.48s power2.out, +.35s), name (+.5s), chip | | 685963 |
| Portfolio rules | section `top 80%` (hook default), once, not retroactive | scaleX 0 → 1, origin left, stagger .12, 1.2s | power2.out | 297990 |
| Portfolio categories | same | AnimatedText lines (mask lines) built-in intro, delay .08 i | power3.out | 297990 / 668761 |
| Use-case indicator | tab change | left / width / height → active tab | .2s power2.inOut | 623453 |
| Use-case content | tab change | opacity → 0 (CSS 180ms ease), swap after a 180ms timeout, → 1 | | 623453 |
| Mobile dots | tab change | width 6 ↔ 20, bg black/30 ↔ black | 200ms ease-out | 623453 |
| Portfolio toggle chevron | click | rotate 0 ↔ 180deg | 200ms | 297990 |
| Video player | mount | opacity 0 → 1 (`rEiMFa_fadeIn`) | .6s ease-out | 886537 |

Reduced motion: AnimatedText shows text immediately, card scrubs and the portfolio rules are skipped (rules set to scaleX 1); tab fades remain (CSS, as on Scale).

## Interaction inventory
Inputs identical on both sites (`inter.js`, 1440×900 and 390×844; raw: scratchpad `gps/out/inter-{scale,clone}.json`).

### 1 · Hero
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| FlatCta | pointerenter / leave, focus | React delegated + HubSpot `mousedown` | 1h0nvyhf 892855 | shared FlatCta (680 ms reset, wash −100% → 0 → +100%, `#86bff2` focus); same module as the evaluation-model-developers audit | yes | `1440-00` |
| clip / media / intro | scroll | ScrollTrigger | 37xz28 540431 / 478135 | startPercentage 0: no clip; scale 1.25 → 1 onUpdate | yes | `1440-00` |

### 2 · Trusted AI, 3 · Foundations
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| all | — | none | 1900 / 497052 / page RSC | static markup, no AnimatedText, no hover | yes | `1440-01`, `1440-02`, `1440-03` |

### 4 · How Scale Delivers Value (CardGrid)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| BaseCard | scroll scrub | ScrollTrigger; `.BaseCard` none (`ev_55f8f9b4bdab…`) | 317967 | grid top at 900/800/700/600/450/300 px: card 0 opacity/scale 0/.96, 0/.96, .816/.9926, .998/.9999, 1/1, 1/1; card 3 0/.96 throughout — **identical** on both | yes | `1440-03`, `1440-04` |
| icon tile / glyph / text | scroll once, retroactive, visibilitychange | ScrollTrigger + document `visibilitychange` | 540409 | tiles end at `inset(0% round 10px)` on both; delays .1i+.125 / +.1 / +.14 | yes | — |
| card | hover | none | 540409 | no hover styles on plain `card`s | n/a | — |

### 5 · ClientTestimonials
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| quote block | scroll `top 80%` | useScrollTrigger | 685963 | unselected quote is `lg:absolute`: block 0 px tall before entering, 288 px after — **0 → 288 on both** | yes (single-item branch; **fixed during build**: the multi-item port used a grid / line clamp and arrows) | `interactions/testimonial-*` |
| panel bg | scroll scrub | ScrollTrigger | 685963 | width 90% → 100%, `top bottom → bottom 75%` (same code as the evaluation-model-developers audit) | yes | — |
| tile | click / roving tabIndex | React `click` (`ev_194059f51990…`) | 685963 | one tile; click re-selects 0 + Lenis scroll to root (offset −24) | yes | — |
| arrows | — | — | 685963 | not rendered for one testimonial (`testimonials.length > 1` guard) | yes | — |

### 6 · Stats CardGrid
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| BaseCard / intro | scroll | ScrollTrigger | 540409 / 317967 | as section 4, iconSize sm (32 tile, 16 glyph), RichText animated as one block | yes | `1440-05` |

### 7 · Solutions Portfolio
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| row rules | scroll `top 80%`, once | ScrollTrigger (`[role=table]` none, `ev_c23342217571…`) | 297990 | rows 0/3/6/9 scaleX at 0/300/600/1200/2500 ms after the jump: Scale `.876 .490 0 0` → `.985 .834 .388 0` → `1 .977 .800 .307` → `1 1 .999 .943` → 1; clone `.885 .513 0 0` → `.987 .847 .418 0` → `1 .977 .800 .307` → `1 1 1 .949` → 1 | yes | `1440-06`, `1440-07` |
| categories | same | — | 297990 / 668761 | AnimatedText lines, delay .08 i; opacity 1 after on both | yes | — |
| "See all 10 categories" (<md) | click | React `click` | 297990 | 4 → 10 rows, label "Show less", chevron `rotate(180deg)` — identical | yes | `interactions/m-seeall-*` |

### 8 · VideoGallery
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| play button | hover | CSS `group-hover` | 832862 | disc `bg-black/50` → `/70`, 200 ms | yes | `1440-07`, `1440-08` |
| play button | click | React `click` (`ev_b29d6c246d4d…`) | 832862 | swaps to iframe `fast.wistia.net/embed/iframe/bl1zetxbah?autoPlay=1`, 1360×765 on both | yes | — |
| poster | load | `fetch` Wistia oEmbed on Scale | 482270 | clone ships the oEmbed thumbnail as `video-poster.webp` (no runtime API call) | static | — |
| mobile strip (<640) | drag / wheel | Keen + wheel plugin 29713 | 482270 | main player `display:none`, strip player 310 wide, 1 "Slide to 1" dot — identical | yes | `390-09` |

### 9 · Use cases
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tab | hover | none (no hover classes) | 623453 | no change on either site | yes | — |
| tab | click | React `click` (`ev_961c28f56f01…`) | 623453 | indicator left 4 → 218, width 214 → 220 (Scale) / 212 → 218 (clone; face width), .2s power2.inOut after the swap; content opacity 1 → 0 over 180ms → swap → 1. Scale samples lag the clone by ≈60ms in the headless run (its React commit is slower); timings in source are identical | yes | `interactions/usecase-2-*` |
| dots (<sm) | click | React `click` | 623453 | after selecting case 2: widths 6 / 20, colours black/30 / black on both | yes | `390-09` |
| keyboard | Tab / Enter | native buttons | 623453 | `focus:outline-none`; no arrow-key handling on Scale either | yes | — |

### 10 · Pre-footer
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + image | scroll scrub | ScrollTrigger | 540431 | root top at 900/780/660/540/420: inset 5 / 4.259 / 3.519 / 2.778 / 2.037 %, scale — / 1.213 / 1.1759 / 1.1389 / 1.1019: **identical** (Scale scales the media wrapper's parent, the shared port the wrapper itself; same visual) | yes | `1440-10`, `1440-11` |
| CTA | hover / focus | as hero | 892855 | shared | yes | — |

### Not reproduced
- HubSpot `mousedown` analytics, OneTrust and OptinMonster (third-party).

## QA
- 1440 and 390: every section top and height within 1px of Scale; cards, table rows, chips, video and use-case card at the same boxes. No console errors on the clone; the page returns 200.
- Fixed during QA: module-CSS `padding: 0 1.5rem` on the grid-layout classes was overriding Tailwind `py-*` (portfolio rows 38 → 87 px, stats wrapper missing 80 px) → `padding-inline`; chip/label line-height 20 → 21 (Scale's `text-sm` resolves to 14/21 there); feature h4 line-height (repo `leading-tight` is 1.1, Scale's 1.25); headings defaulted to white from the global `h1–h6` rule → explicit colours.

## Remaining gaps
- Fonts: Vahue faces (Aeonik is commercial). The mono testimonial heading wraps to 2 lines instead of 3 (tile 15px higher inside the panel, panel height equal); mono labels are 3–5px narrower; tab pills 2px narrower.
- Video: the ~15 s Wistia video is not shipped; the poster is the static oEmbed thumbnail (27 KB). Clicking play loads Scale's Wistia iframe, as on Scale.
- Media are Scale's (hero, Forward Deployed diagram, three app-screenshot SVGs, use-case illustrations, video poster, pre-footer), downscaled; a Vahue page must pass its own. The testimonial names a real person, as on Scale.
- `oml:` short-landscape variants are out of scope.
