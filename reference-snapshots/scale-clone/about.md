# scale.com/about clone spec

Route: `/scale-clone/about/` · Page: `app/scale-clone/about/page.tsx` · Components: `components/scale-clone/about/` · Assets: `public/scale-clone/about/` · QA: `reference-snapshots/scale-clone/qa/about/`

Captured 2026-11-01 at 1440×900 and 390×844: computed styles after a 50%-viewport sweep, 10-point scrub samples per animated section, REA on an isolated Chrome tab (CDP 9230, closed afterwards), production chunks and CSS fetched and pretty-printed locally, RSC payload parsed from the page HTML.

Clone only: no Vahue page is built from it. The layout still takes content as a prop. `AboutPage({ content, theme })` renders every section from an `AboutContent` object. Scale's copy lives in `scaleAboutContent` in `content.ts`. Colours read `--abt-*` variables, listed in `AboutPage.tsx`.

## Libraries (REA `analyze_web_bundle`, evidence `ev_bb0a2808cb80…`)
- 56 scripts parsed, 0 failures. Next.js (high, `next-runtime`, Turbopack), React (medium).
- Motion and libraries:
  - GSAP 3.15 + ScrollTrigger + SplitText (`2d7ykwtxp_8ed.js`, AnimatedText 668761 in `1h0nvyhf5gbrf.js`)
  - Lenis 1.3.21 (`2fbrdg5m4_g_8.js`)
  - Keen Slider 6 (`2vj2iettvig10.js`, the gallery)
  - react-fast-marquee (module 922998, the mobile logo row)
  - three r181 (`3kd41k7ews14b.js`) loads site-wide, but this page has no canvas and no Rive.
- **Shared-chunk check (sha256).** Each hash is compared with the earlier audits:
  - `1h0nvyhf5gbrf.js` `10b2627a…` (FlatCta 892855, CMSLink 737900, AnimatedText) and `37xz28pjbnlx4.js` `b234eef5…` (FullBleedMediaSection 540431, pageHero 478135, ClipScrollSection, useScrollTrigger 210104) are byte-identical to the security / guides / careers audits. So the FlatCta state machine (fill on CSS `translate`, 680ms reset, re-entry snap), the `#86bff2` focus outline on internal CTAs, the retroactive intro trigger and "media scale only in onUpdate" are ported as-is, from the careers clone's audited copies.
  - `2k1qlgdxlbmz1.js` `bb51ad26…` (CardGrid 540409, LinkCard 874328, HeadlineWithCta 925107), `3x8z3_0hhtdcb.js` `89a4cc62…` (BlogPreview 808358 / 189756), `0sni47mcvnqwg.js` `0e137e33…` (Section 698764, slice renderer) and `2fbrdg5m4_g_8.js` `c8dcfe22…` (Lenis) are the same files read in the enterprise / healthcare / genai-portfolio audits.
  - Two chunks are new to this page: `0orpgukdq33u3.js` `6cb512b8…` (LogoCloud 970272, VideoWithImages 939985, react-fast-marquee 922998) and `268a4ug0aebtb.js` `c8bcbaba…` (ScrollRevealSection 756386, SectionThemeTracker 995634).
- The Material icons load at runtime from `/api/icons/md/<Name>`, which returns react-icons IconTree JSON (loader chunk `02xgyk1hhxsba.js`). The clone inlines the eight paths in `icons.tsx`.

## Page structure (RSC, CMS slices in `.CMSSliceRenderer.rootPageRenderer`)
`PageTheme light` → `Header border` →
1. `pageHero` (478135): FullBleedMediaSection `{...props, startPercentage: 0}` in `pb-10! pt-24!`, headline "About", media `about.webp`, backdrop white.
2. `section` (698764, white, marginVertical medium, contentWidth medium) > `headlineWithCta` (headerTag h1, the mission line + subtitle).
3. `section#headquarters-photo` (server markup): `next/image` 1216×689 + caption.
4. `section#trusted-by` (server markup): SectionHeader "Trusted by / Powering the world's leading AI" + LogoCloud (`carousel false`, `showCopy false`, 4 logos).
5. ScrollRevealSection (756386, `backdropClassName "bg-scale-gray-90 md:bg-transparent"`, `contentContainerColor white`) > CardGrid "What we do" (3 `linkCard`, `animationDirection up`, `iconSize md`, `directionalEntrance false`).
6. `section` (698764, black, `pageThemeOverride dark`, marginVertical none, `parallaxFadeOut true`) > CardGrid "Scale at a glance" (`headerSize lg`, `fluidLayout`, `animationDirection down`, `directionalEntrance true`, `iconSize sm`, 5 `card`s with evergreen icon tiles).
7. `section#headquarters-carousel` (`bg-white py-8 md:py-12`) > VideoWithImages (939985, 5 office photos, `showVideo false`).
8. `blogPreview` (808358) "Scale In The News", `pageThemeOverride light`, 5 static posts: posts 0 and 1 have `variantOverride overlay`, and every post has `textColor light`. Posts 0, 1 and 3 have `imageGradientOverlay`. All links are external.
9. `fullBleedMediaSection` "Join us. Shape the future of AI." (CTA "View Open Roles" → `/careers`, default startPercentage 10, animated CTA) → spacer `h-8 bg-white`.
10. SectionThemeTracker (995634) and the footer.

## Listener map (REA `inspect_web_event_listeners`)
| Element | Listeners | Evidence | Source |
|---|---|---|---|
| `.keen-slider` | `mousedown` / `mousemove` / `mouseup` / `mouseleave`, `touchstart` (passive) / `touchmove` / `touchend` / `touchcancel`, `dragstart`, `click`, `ksDragStart` / `ksDrag` / `ksDragEnd` | `ev_94804481b3f5…` | Keen Slider in `2vj2iettvig10.js` |
| `.BlogPreview a` (news tiles) | `mousedown` | `ev_cc44203410da…` | HubSpot analytics only. Plain external `<a target=_blank>` |
| `.FullBleedMediaSection a` (pre-footer CTA) | `mousedown`, `click` | `ev_f49fabbecee8…` | HubSpot + Next Link router (`42ixmvih7808g.js`). Hover is React-delegated `pointerenter/leave` (FlatCta 892855) |
| `.LinkCard` (What we do) | none | `ev_45dcdd09a11b…` | Cards carry no link and no `hoveredColor` |
| `.Section` | none | `ev_fd15f7b548d9…` | Motion is ScrollTrigger on the Lenis-driven window scroll |
| window / document | Lenis `wheel` / `touch*`; ScrollTrigger; SectionThemeTracker `scroll` (Lenis `on('scroll')`) + `resize` + `section-theme:remeasure` | from chunk source | `2fbrdg5m4_g_8.js`, `268a4ug0aebtb.js` |

## Sections (top → bottom, 1440 / 390)
Global: `p` and headings carry letter-spacing −0.01em. Colours: gray-10 `#212121`, gray-60 `#929292`, gray-90 `#EAEAEA`, gray-95 `#F2F2F2`, evergreen `#193A29`, overtitle `#525252`, CardGrid ink `#010101`. Grid: `grid-layout-mobile` (8 cols, gap 8, px 24) / `grid-layout-desktop` (12 × `minmax(0,150px)` centred), which gives 108.66px columns at 1440.

| # | Section | Top / height 1440 | Top / height 390 | Layout + type |
|---|---|---|---|---|
| 1 | Hero FullBleedMediaSection | 39 / 856 | 102 / 616 | Wrapper `pt-24 pb-10`. Card 1408×720 (358×480), radius 24, `p-16` (`p-8`). H2 header2 64/1.05 (32) white, bottom-left. Empty CTA row (24px gap). Media bg `#193A29`. `.media-overlay` = `linear-gradient(#0000, #000)`. No clip (startPercentage 0). |
| 2 | Mission (Section > HeadlineWithCta) | 895 / 483 | 718 / 421 | `py-16 md:py-32`, col 2–11 (md) / 3–10 (xl). HeadlineWithCta `flex-col gap-6 py-6 px-6`, centred. h1 header3-regular 40/1.25 (24/1.05), 877 wide. Subtitle RichText 16/1.5 (14/1.5, `max-md:text-sm`). |
| 3 | Headquarters photo | 1378 / 789 | 1139 / 321 | `pt-6 lg:pt-8 pb-[72px]`, `max-w-[1216px] px-4 lg:px-6`. Image 1168×657 (358×201), radius 16. Caption detail-mono 13/1.2 (10) `#929292` `mt-3`, centred. |
| 4 | Trusted by | 2167 / 436 | 1460 / 348 | `py-[72px] md:py-[120px]`, container `max-w-[1472px] px-6`. Header `max-w-3xl` centred, `mb-10`. Overtitle 12/24 +1px mono. Title 48/60 (30/41.25), balanced. md+: `ul.container` (max 1280, px 32) `flex justify-between items-center gap-8 min-h-[52px]`, logos at their box sizes 100×20, 108×18, 72×37, 60×24. <md: marquee row, items `ml-12`, 532px wide. |
| 5 | What we do (ScrollReveal > CardGrid) | 2603 / 690 | 1808 / 870 | Backdrop transparent (#EAEAEA under 768), white panel `origin-top`. CardGrid `py-12 xl:py-24`. h3 header3 40/50 (24/25.2) `mb-16` (48), `w-4/5 md:w-full`. Grid 3 cols gap 8 (stack <1024). LinkCard `#F2F2F2`, radius 16 (8 <1280), `p-10` (24 <1280), gap 64 / 24 / 20. Icon box 64 (40) radius 12, `bg-black/6`, 32px glyph `text-black/70`. Title 24/1.5 (18/1.35 <1280). Body 16/24 `#212121`. |
| 6 | Scale at a glance (black Section > fluid CardGrid) | 3292 / 792 | 2677 / 1033 | Col 3–10 (xl). CardGrid `py-12 xl:py-24`. h2 40/44 (32/1.05) `mb-16` (48). `grid-cols-6`: 3 cells `col-span-2` + 2 cells `col-span-3`, gap 8. `@container` cells with `lg:min-h-[calc(100cqw*268/320)]` / `[calc(100cqw*218/485)]`. Card `bg-white/13` radius 16 (8 <1280), `p-8` (24 <1280), gap 64 (20). Icon tile 32 radius 6 `#193A29`, 16px white glyph. Label mono 14/21 uppercase `#929292`. RichText `min-h-16`: value 40/44 (32/1.05) `mb-2`, body 16/24 `#929292`. Card 1 at 1440: 260 tall. |
| 7 | Office gallery (Keen) | 4084 / 337 | 3710 / 219 | `py-8 md:py-12`, wrapper `max-w-[1792px]`. Slides `aspect-video`, Keen sizes them: 428×241 at 1440 (perView 3.3, spacing 12) and 276×155 at 390 (1.4, 8). `.video-container`: radius 16, radial-gradient bg, `inset 0 0 317px #fff1` shadow, `::before` 2px `#fff3` border. Image inset 4px (`calc(100%-8px)`), radius 12, cover. |
| 8 | Scale In The News (BlogPreview) | 4421 / 994 | 3929 / 1360 | `py-12 md:py-16`, col 2–11. h2 64/1.05 (32) centred `mb-20` (32). Desktop grid 4 cols gap 8, `grid-auto-rows minmax(70px,auto)`. Slots (area / measured box): CNBC overlay `1/1/5/3` 575×304, Axios overlay `1/3/6/5` 575×444, CNN caption `5/1/7/3` 575×407, Bloomberg caption `6/3/7/4` 284×267, Semafor caption `6/4/7/5` 284×267. Overlay title 32/38 white. Caption tile `#F2F2F2 p-5`, image `aspect-video` radius 12, title 16/22 medium −0.025em `#101010`. Chip: 26px swatch (`#C4B8D4`, `#1D4133`, `#5A6B85`, `#A07862`, `#A3BED8`) + 11px mono label. <1024: one column, row-gap 16, first 4 posts only, all in the caption layout (288 tall). |
| 9 | Pre-footer FullBleedMediaSection | 5415 / 720 | 5290 / 480 | Card as in the hero. H2 "Join us. Shape the future of AI.". White arrow FlatCta "View Open Roles" 174×40, radius 8 after the intro. Then the `h-8` spacer. |

## Motion
| Element | Trigger | Start → End | From → To | Ease / dur | Notes |
|---|---|---|---|---|---|
| Hero media | section | top bottom → center center | scale 1.25 → 1 (onUpdate only) | linear | `matrix(1.0139)` at load (1440), `1.006` (390), both sites. Clip stays `inset(0 round 1.5rem)` (startPercentage 0) |
| Hero / pre-footer text | section `top center`, end `bottom 20%`, retroactive | — | AnimatedText intro: h2 delay 0 | lines yPercent 400→0 1s power3.out (+0.08/line), words x 30%→0 0.9s stagger 0.03, tint #72CE7B→#79648C | |
| Pre-footer clip | ClipScrollSection | top bottom → center center | `inset(5%)` → `inset(0%)` | linear | sampled 5 / 3.889 / 2.778 / 1.667 / 0.556 / 0% (1440) on both |
| Pre-footer CTA | intro | — | filledWhiteArrow: scaleX 0→1, radius 0→8, autoAlpha | 0.85s power3.out, delay 0.5 | |
| Mission h1 / subtitle | IntersectionObserver on HeadlineWithCta, rootMargin `0 0 -15% 0` | — | AnimatedText intro, delays 0.5 / 1 | as above | first-line opacity at 200ms steps after entry: 0, 0, 0, .30, .74, .93, .99, 1 on both |
| ScrollReveal panel | section | top bottom → top top | l = map(p, .5..1); scaleX map(l, 0..0.8, 1−2·24/w → 1); top radii 16 → 0 | linear | gutter 12 under 768 |
| What we do cards | card | top bottom → top 50% | scale .96→1, opacity 0→1 | staggered window r = 0.1, power2.out | |
| What we do intro | CardGrid `top bottom`, retroactive, waits on `visibilitychange` if hidden | — | heading animateIn(.125). LinkCard s = .05i + .125: icon clip `inset(0 100% 0 0 round 10px)`→0 (.5s power1.out), glyph opacity (1s, s+.05), title (s+.16), body (s+.34) | | |
| Stats parallaxFadeOut | Section | bottom 100% → bottom top (scrub) | Section yPercent 0→20 (power3.in = quart, dur 1, at 0); content column opacity 1→0 (none, dur .75, at .15) | | 1440 samples at section top −0.2/−0.5/−0.8/−1.1 vh: y 1.83/24.60/117.36/158.40 vs clone 1.78/24.31/116.49/158.73; opacity .763/.363/0/0 vs .766/.366/0/0 |
| Stats cards | card | top bottom → top 50% | scale 1.06→1, opacity 0→1, y 48→0, x −160/0/+160 → 0 (row edges, ≥1024; origin right/left centre) | staggered, power2.out | identical samples, e.g. at 0.6 vh: `1.0099 −26.35 7.91 .84` / `1.0219 0 17.53 .63` / `1.0411 109.59 32.88 .32` on both |
| Stats intro | CardGrid `top bottom`, retroactive | — | heading animateIn(.125); icon clip (.1i + .125), glyph (+.1), RichText (.1i + .125) | | |
| Header theme | SectionThemeTracker | scroll + 35 inside the stats Section's cached layout box | page theme dark (white header ink) | 50ms debounce | bounds measured at mount + 150ms after resize, so the parallax shift doesn't extend it |
| Gallery | Keen drag | — | translate3d per slide, snap to slide on release | Keen defaults (rubberband, `mode snap`) | see the interaction table |
| Logo marquee (<768) | CSS animation | — | translateX 0 → −100% per copy | linear, `row width / 50` s (10.64s) | no pause on hover |
| News tiles entrance | IO threshold .12, rootMargin `0 0 -6% 0` | — | opacity 0 / y 16 → 1 / 0 | .6s cubic-bezier(.23,1,.32,1), delay .05·min(i,3) | tiles in view on mount start visible |
| News tile title | tile visible | — | AnimatedText intro, delay .05 | | |
| News tile image | tile | top bottom → center center | scale 1.08 → 1 | linear | 11 points identical to 4 decimals at 1440 and 390 |
| News image hover | `group-hover/full-bleed` / `group/caption` (the image wrapper) | — | img `scale` 1 → 1.05 | 1000ms ease-out | 200ms samples 1.025 / 1.0378 / 1.0455 / 1.0491 / 1.05 on both |
| News heading | useScrollTrigger `top 80%`, retroactive | — | AnimatedText, delay .05 | | |

All tweens respect `prefers-reduced-motion`: text is visible, there are no scrubs, the marquee stops and the CTA transitions are off.

## Assets (`public/scale-clone/about/`, 1.0 MB)
- `hero.webp` 1600w (from 1920) and `headquarters.webp` 1600w.
- `office-1..5.webp`: 840w, since slides show at most 428px wide.
- `prefooter.webp` 1600w, q60.
- `news-cnbc|axios|cnn|bloomberg.webp` as served (1200 / 800w) and `news-semafor.webp` 1200w.
- Not shipped: the four customer logos (Meta, Cohere, Cisco, TIME). Neutral `bg-black/10` tiles hold their exact box sizes. `AboutLogo.src` takes a real mark (rendered `brightness-0`, as on Scale).

## Interaction inventory

Method: REA (`analyze_web_bundle` `ev_bb0a2808cb80…`; listener evidence ids in each table) and chunk source for window/document listeners. Then Playwright with identical inputs on scale.com and the clone, at 1440×900 and 390×844, with OneTrust hidden and a fresh load per run. Scripts: `scratchpad/about-audit/cap.js` (sweep, geometry, 10-point scrubs) and `int.js` (hover / drag / wheel / focus / timing). Raw numbers are in `cap-*.json` and `int-*.json` next to them. QA images: `qa/about/<w>-NN.jpg` (side by side, Scale left, every 50% viewport) and `qa/about/interactions/<w>-<name>-{scale,clone}.jpg`.

### 1 · Hero (pageHero → FullBleedMediaSection)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| media | scroll scrub | ScrollTrigger (window, Lenis) | 540431 | scale 1.25→1 `top bottom → center center`, onUpdate only. Load `1.0139` (1440) / `1.006` (390), 1 from 100px, on both | yes | `1440-00.jpg`, `390-00.jpg` |
| clip | — | — | ClipScrollSection | startPercentage 0: stays `inset(0% round 24px)` on both | yes | — |
| h2 "About" | intro `top center`, retroactive | useScrollTrigger 210104 | 668761 | delay 0, visible at load on both | yes | — |

### 2 · Mission (Section > HeadlineWithCta)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| h1 + subtitle | IntersectionObserver (rootMargin −15%) | none on the node | 925107 | delays .5 / 1. First-line opacity / y at 200ms steps: Scale 0/200, 0/200, 0/200, .30/140.2, .74/52.9, .93/14.1, .99/2.0, 1/0; clone 0/200, 0/200, 0/200, .30/139.6, .74/52.0, .93/14.0, .99/1.9, 1/0. Subtitle words .50 → .87 → .98 → 1 vs .51 → .87 → .98 → 1 | yes | `1440-02.jpg` |

### 3 · Headquarters photo · 4 · Trusted by
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| photo, caption, header | — | none (server markup) | SSR | static | yes | `1440-03..05.jpg` |
| desktop logos | — | none | 970272 | static `ul`, no links, no hover | yes (placeholder tiles) | `1440-05.jpg` |
| mobile marquee | time | CSS animation | 922998 | duration 10.64s on both; 1s moves −50.0px (Scale) / −50.8px (clone, sampling); hover doesn't pause (−25px in 500ms on both) | yes | `390-03.jpg` |

### 5 · What we do (ScrollRevealSection > CardGrid > LinkCard)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| panel | scroll scrub | ScrollTrigger | 756386 | 10 points identical. 1440: .9667/16 ×3, .975/12, .9917/4, 1/0. 390: .9385/16 ×3, .9538/12.02, .9846/4.01, 1/0 | yes | `1440-06.jpg` |
| 3 BaseCards | scroll scrub | ScrollTrigger | 598042 | identical, e.g. at 0.6 vh: `.9912 .78` / `.9846 .61` / `.9752 .38`; at 0.4: `1 1` / `.9995 .99` / `.9982 .96` | yes | — |
| icon / title / body | intro | ScrollTrigger + `visibilitychange` | 540409 / 874328 | s = .05i + .125 (see Motion) | yes | — |
| LinkCard | hover / focus | none (`ev_45dcdd09a11b…`) | 874328 | no link and no `hoveredColor`, so no hover state | n/a | — |

### 6 · Scale at a glance (Section parallaxFadeOut > fluid CardGrid)
| Element | Input | Listener | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| Section / content column | scroll scrub | ScrollTrigger (`ev_fd15f7b548d9…`: no node listeners) | 698764 | see Motion (yPercent 20 power3.in, opacity .75 at .15). 390 at −0.8 vh: y 22.71 / opacity .432 vs 22.23 / .437 | yes | `1440-07..08.jpg` |
| 5 cards | scroll scrub | ScrollTrigger | 598042 + 317967 | identical at 1440 (x ±160, origins right/left) and 390 (x 0) | yes | — |
| card height | layout | — | — | RichText without line-mask descender padding: card 260 / RichText 100 (1440), 166 / 65.59 (390) on both | yes (**fixed**: the descender padding gave +1.67px per card) | — |
| header theme | scroll | SectionThemeTracker `scroll` / `resize` | 995634 | header ink white while scroll + 35 is inside the section's layout box. Before / over / 200px after the section: black / white / black on both, at 1440 and 390 | yes (**fixed**: the shared header's element sampling stayed dark at 390 under the parallax-shifted section; the clone now ports the tracker, `SectionTheme.tsx`) | `*-nav-over-stats-*.jpg` |

### 7 · Office gallery (VideoWithImages, Keen Slider)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| `.keen-slider` | mouse drag (−300px in 10 steps of 30ms from 60% width) | Keen `mousedown/move/up/leave`, `ksDrag*` (`ev_94804481b3f5…`) | 939985 options | cursor `grab` → `grabbing` mid-drag → `grab`. 1440 slide 0 x: −120 mid, then every 120ms after release −270 / −395 / −432.7 / −439.8 / −440 on both (loop, perView 3.3, spacing 12). 390: −120, −262.2, −281.0, −284.2, −284.3 on both (loop false, perView 1.4, spacing 8) | yes | `*-gallery-after-drag-*.jpg` |
| `.keen-slider` | flick right (+240px in 4×16ms) | as above | | 1440: back to slide 0 (0 / 12 / 24px). 390: stays on slide 1 (no loop) on both | yes | — |
| `.keen-slider` | wheel | none from Keen (no WheelControls plugin); Lenis on window | 2fbrdg5m4_g_8 | deltaY 300 scrolls the page +240 on both; deltaX 300 leaves the slides alone on both | yes | — |
| slides | hover / click | `click` (Keen capture after drag) | Keen | cursor `auto` at 1440 and `pointer` at 390 over the image on both (UA defaults). No links, so click does nothing | yes | — |
| touch drag | touch | `touchstart` (passive) / `touchmove` / `touchend` | Keen | same library and options; not driven with synthetic touch | yes (library) | — |

### 8 · Scale In The News (BlogPreview)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| tiles | IO entrance | — | 808358 + 598042 | threshold .12, rootMargin −6%, .6s quint-out, delay .05·min(i,3) | yes | `1440-09..10.jpg` |
| tile image | scroll scrub | ScrollTrigger | 808358 | 1.08 → 1 `top bottom → center center`, 11 points identical (e.g. 1.0623 / 1.0642 at 0.6 vh) | yes | — |
| tile image | hover | CSS `group-hover` (no JS) | 808358 | pointing at the picture scales the img to 1.05 over 1s ease-out: 1.025 / 1.0378 / 1.0455 / 1.0491 / 1.05 at 200ms steps on both. Overlay title area: no zoom; caption tile picture: 1.05, on both | yes (**fixed**: the first build left it out, following the healthcare note, but on /about it fires) | `*-blog-hover-*.jpg` |
| tile link | hover / focus / click | HubSpot `mousedown` only (`ev_cc44203410da…`) | 808358 | cursor pointer; UA focus ring `auto 1px rgb(0,95,204)`; `target=_blank rel="noopener noreferrer"` on both | yes | — |
| mobile cap | resize | `useMediaQuery (max-width: 1023px)` | 189756 | 4 tiles under 1024, 5 above; SSR renders 4 on both | yes | `390-10..12.jpg` |

### 9 · Pre-footer FullBleedMediaSection
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip / media | scroll scrub | ScrollTrigger | 540431 | clip 5 → 0% identical at 1440. At 390: 3.731 / 2.455 / 1.178 vs 3.724 / 2.447 / 1.178 | yes | `1440-12.jpg` |
| CTA "View Open Roles" | pointerenter / leave / re-entry | HubSpot `mousedown` + Next Link `click` (`ev_f49fabbecee8…`); hover React-delegated | 892855 | fill on `translate`, wash .35. Enter at 200 / 400 / 600ms: −34.81 / −7.84 / −0.04% (Scale) vs −34.81 / −7.84 / 0%. Leave every 100ms: 0, 38.77, 65.20, 83.92, 93.40, 98.46, 100, −100% vs 0, 38.78, 65.18, 83.92, 93.41, 98.46, 100, −100%. Re-entry 150ms into a leave: −100, −89.42, −61.2 vs −100, −89.40, −67.1 (60ms sampling phase; the 390 run flipped it: −67.10 vs −61.20) | yes | `*-cta-prefooter-hover-*.jpg` |
| CTA | focus | — | 737900 | `solid 1px rgb(134,191,242)` on both | yes | — |
| intro | reload + jump to the bottom | useScrollTrigger retroactive | 210104 | h2 opacity 1, CTA `1 visible 8px` on both | yes | — |

## QA
- Side by side, every 50% viewport: `qa/about/1440-00..15.jpg` and `390-00..16.jpg`, Scale left.
- **1440.** Every block lines up: hero 39/856, mission 895/483, photo 1378/789, trusted 2167/436, what-we-do 2603/690, stats 3292/792, gallery 4084/337, news 4421/994, pre-footer 5415/720, spacer 6135. Document 7066 on both.
  - Heading boxes match to the pixel: mission h1 877 wide at 1047, trusted h2 653 vs 654, news h2 1159×83.
  - The news slots match: 575×304 / 575×444 / 575×407 / 284×267 ×2.
  - Keen slides match: 428×241 at 0 / 12 / 24px offsets.
- **390.** Every block matches to the pixel through the pre-footer (102/616 … 5290/480). The document is 7162 vs 7122: the shared `ScaleFooter` is 1320 vs 1360 tall, a known gap.
- **Composites.** They were shot before the stats line-mask fix, so the clone's stats band is 2px (1440) / 3px (390) taller in them. That fix was later confirmed by `int.js` (card 260 = 260, 166 = 166).
- The clone returns 200 on the dev server, with no console errors or warnings during load, scroll, drag or hover. Scale logs 401/404 and OptinMonster noise.

## Remaining gaps
- **Customer logos.** The four marks are neutral placeholder tiles at the served box sizes. Pass `src` to show real marks.
- **Fonts.** The clone uses Vahue's display and mono faces instead of Aeonik / Aeonik Mono and Geist Mono. Mono captions run about 1px wider. Heading widths are within 1px.
- **CTA link.** The pre-footer CTA links to `/scale-clone/careers/` (Scale: `/careers`). Scale's page-transition router (`__scaleTransitionNavigate`) is site chrome and isn't ported.
- **Smooth scroll.** The app's global `* { scroll-behavior: smooth }` still applies to browser-initiated scrolls; the same note is in the careers spec.
- **Landscape `oml:` variants.** Scale's landscape-phone variants (`orientation: landscape and max-height: 500px`: `oml:py-10` on the mission Section, `oml:py-0` on CardGrid) aren't ported.
- **Keen touch.** Touch drags on the gallery use the same Keen build and options but weren't driven with synthetic touch events.

## REA evidence
- `analyze_web_bundle` `ev_bb0a2808cb80d90bbbb0ca4046a8123f45e07e4865d9b24e5daa20af744413c2` (56 scripts, 0 failures).
- `inspect_web_event_listeners`:
  - `.keen-slider` `ev_94804481b3f5bf18…`
  - `.BlogPreview a` `ev_cc44203410da6a75…`
  - `.FullBleedMediaSection a` `ev_f49fabbecee81689…`
  - `.LinkCard` `ev_45dcdd09a11b8361…`
  - `.Section` `ev_fd15f7b548d9a23b…`
- Source modules read:
  - `37xz28pjbnlx4.js`: 478135, 540431, 210104
  - `0sni47mcvnqwg.js`: 698764 Section with parallaxFadeOut
  - `2k1qlgdxlbmz1.js`: 925107, 540409, 874328
  - `268a4ug0aebtb.js`: 756386, 995634
  - `0orpgukdq33u3.js`: 970272, 939985, 922998
  - `3x8z3_0hhtdcb.js`: 808358, 189756
  - `1h0nvyhf5gbrf.js`: 668761 (AnimatedText `animateIn` duration only applies to the noSplit fade), 816332 setSectionTheme
- Scale CSS checked: `.PwGuRW_video-container`, `.gUrnSq_grid` / `_slot`, `.grid-layout-*`, `.header3-regular`, `.detail-mono`, `.container`.
