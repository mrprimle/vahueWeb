# scale.com/enterprise/insurance → /scale-clone/enterprise-insurance

Captured 2026-10-31 at 1440×900 and 390×844 (Playwright + system Chrome, page scrolled in 50%-viewport steps so every slice mounts) and with REA against an isolated Chrome tab (CDP 9230). Page height: 5170px at 1440 on both Scale and the clone.

Files: `app/scale-clone/enterprise-insurance/page.tsx`, `components/scale-clone/enterprise-insurance/{FullBleedMedia,FlatCta,LogoCarousel,VideoFeatures,Sections}.tsx`, `animatedText.ts`, `insurance.module.css`. FullBleedMedia / FlatCta / animatedText are copies of the security clone's ports; this page's props were re-read from the bundle (below).

## REA evidence
- `analyze_web_bundle` (include_script_sources, evidence `ev_e77acc39…cb9ce`): 46 scripts parsed, 0 failures; fingerprints Next.js (`next-runtime`, high) and React (`react-runtime`, medium); Turbopack chunk `turbopack-1byz1flvc-bu1.js`. Chunks I then fetched and grepped: GSAP `version:"3.15.0"` in `2d7ykwtxp_8ed.js`; Next `16.4.2` in `0m6y-zqxv6dk8.js`; ClipScrollSection + FullBleedMediaSection in `37xz28pjbnlx4.js`; LogoCarousel + FeaturesWithIcons in `01xb85jkvr5_y.js`; Features (video cards), Modal and glass Button in `17ea4hx823ss4.js`. three.js (r181) is in the shared vendor chunk `3kd41k7ews14b.js` but no canvas mounts on this page.
- `inspect_web_event_listeners`:
  - `a.FlatCta` (hero CTA): only a HubSpot analytics `mousedown`; hover is CSS + React root-delegated pointer events.
  - `button[aria-label="Play video"]`: HubSpot `mousedown` + a direct `click` from `42ixmvih7808g.js` (react-dom) → opens the video modal.
  - `a.bg-custom-gradient` (glass button): HubSpot `mousedown` + `click` (react-dom); hover entirely CSS.
  - `.ClipScrollSection`: no listeners (driven by ScrollTrigger on window/Lenis).
  - No canvas, no slider, no pointermove handlers on this page.

## Sections (top → bottom, 1440 / 390)
| # | Section | Layout | Type / spacing |
|---|---|---|---|
| 1 | PageHeader → FullBleedMedia (hero) | wrapper `pb-10 pt-24` (40/96, same on mobile); ClipScrollSection `px-4`, card 1408×720 (358×480 mobile), radius 24, padding 64 (32 mobile), content bottom-aligned, max-w 72rem | h2 `clamp(2rem,.5rem+5vw,4rem)` 64/1.05 (32 mobile), −0.01em, white; body1 20/1.5 (16/1.45 mobile); gap 24; FlatCta arrow white (8px radius, 32px black icon box). Overlay `.media-overlay` = `linear-gradient(#0000,#000)` (overrides bg-black/45). Image bg `#193A29`. |
| 2 | LogoCarousel | slice `py-8` (32), container 1472 / px-24 | copy 16/26.4 black/70, max-w 698, mb 40; desktop 64px row, 2 groups (4 + 3 logos) justify-between; mobile overflow-x row gap-40 px-24 |
| 3 | FeaturesWithIcons “3 blind spots” | slice py 80 (72 mobile); centred header `max-w-3xl mb-10 md:mt-12` | empty mono overtitle (0 tall, 12/24 +1px, mb 20); h2 48/1.25 (30/1.375 mobile, 42 md), weight 400; sub 20/1.6 mt 8 (16/1.6 mt 16) black/70. Cards: flex-wrap gap 64 / md gap-y 80 gap-x 24 / xl gap-x 56, basis-1/4 max 368. Icon 44×44 radius 8, bg black/9%, 1px black/10% border, 22px MD outline icon. h4 24/36 mt 24; body 16/24 #525252 mt 16 |
| 4 | FeaturesWithIcons “how insurers…” | as 3, plus glass pill button mt 32 | glass: 32px tall, 1px rim `to-br #9a9a9a→#1a1a1a→#6a6a6a`, inner `linear-gradient(#1a1a1a,#1a1a1a), linear-gradient(#0000,#0a0a0a)`, blur 4px, inset 0 1px 1px white/10; label 14/20 500, px 17 py 8, “→” ml 4. Card titles wrap to 2 lines (`whitespace-pre-line`). |
| 5 | Features (video cards) “Fuel your AI strategy” | 2-col grid gap 56 (md 24; mobile 1-col gap 56), cards 668 wide | image 3:2, radius 8 (wrapper 12), 64px play button bg black/40 → /60 (colours transition 150ms); title 24/36 mt 48 (mt 32 mobile); body 16/26.4 black/70 mt 12 |
| 6 | Pre-footer FullBleedMedia | wrapper `pt-16 pb-8` (64/32); same card as hero, headline only + “Book a demo”-style FlatCta | |
| — | Footer | shared `ScaleFooter` | |

## Motion
| Element | Trigger | start → end | From → to | Ease / duration | Notes |
|---|---|---|---|---|---|
| Hero ClipScrollSection | wrapper | top bottom → center center | clip inset 0% (startPercentage **0**) | scrubbed (onUpdate) | `startScale: 1` passed by FullBleedMediaSection, so no container scale |
| Pre-footer ClipScrollSection | wrapper | top bottom → center center | clip `inset(5% round 1.5rem)` → `inset(0%)` (default startPercentage **10**, inset = 0.5×) | scrubbed | measured live: `inset(5% …)` before entering |
| FullBleedMedia image | section | top bottom → center center | scale 1.25 → 1 | linear map, `gsap.set` | hero reads 1.0139 at scrollY 0 (progress 0.944), matches |
| Headline / body (AnimatedText) | section | top center (end `bottom 20%`), runs once, retroactiveOnEnter | lines yPercent 400 / words x 30%, opacity 0 → 0, green #72CE7B → purple #79648C → CSS colour | 1s power3.out, lines +0.08s each, words stagger 0.03 | body delay 0.2 |
| FlatCta intro “filledWhiteArrow” | section | same | scaleX .4→1 / autoAlpha | 0.85s power3.out, delay 0.5 | |
| LogoCarousel | timer | — | group opacity 0 ↔ 1 | CSS 700ms, incoming `delay-300` | `setTimeout(…, 4500)` re-armed per change |
| Glass button | hover | — | scale 1.02, glow, brightness 1.15, sheen ::before translate(8px,−8px) | CSS 500ms ease-out (sheen 500ms default ease); arrow translateX 4px 300ms `ease` (`transition-translate` isn't a Tailwind class, so the arrow uses the initial `all`/`ease`) | active scale .97 |
| Play button | hover / click | — | bg black/40 → /60; click opens modal | CSS 150ms | modal: overlay `#060606/70` fades in 0.35s ease-out; dialog layer `showUp` (opacity 0 → 1, scale 1.1 → 1) 0.35s ease-out after 0.55s; panel `w-[95vw] md:80vw lg:70vw max-w-7xl rounded-2xl bg-white/15 backdrop-blur-xl`, Esc / close button / outside click closes, body scroll lock |

The FeaturesWithIcons and Features slices have no GSAP (no ScrollTrigger, no SplitText reveal): they're static on Scale and in the clone. Lenis is the shared one from `app/scale-clone/layout.tsx`. Reduced motion: no clip/scale scrub, text and CTAs render immediately, CSS transitions disabled.

## Libraries
GSAP 3.15.0 (ScrollTrigger, SplitText), Lenis (shared), React / Next.js 16.4.2 on Scale. No Keen / Embla / Rive / three.js scene on this page. The clone uses the installed gsap 3.15 only.

## Assets (`public/scale-clone/enterprise-insurance/`)
- `hero.webp` (1600×1200), from `/static/img/reskin/headers/insurance.webp`
- `prefooter.jpg` (downscaled to 2880 wide from the 7952×3654 original `/static/img/reskin/prefooter.jpg`)
- `feature-claims.webp` (Wistia thumbnail 1920×1080) and `feature-retention.webp` (958×1375): the two video-card posters
- Icons: the six Material Design outline icons are inlined in `Sections.tsx` (exact paths from the DOM); the play glyph and modal close glyph are inlined too.
- Not shipped: Scale logo/wordmark, customer logos (replaced by neutral tiles at the same rendered sizes), the Wistia videos (the modal shows an empty 16:9 placeholder).

## QA
Screens in `reference-snapshots/scale-clone/qa/enterprise-insurance/` (`1440-*` every 50% viewport, `390-*` every 100%). At 1440 the page height matches exactly (5170px) and every section lines up to the pixel at each stop, including the pre-footer clip state mid-scroll. At 390 the section tops match Scale (102 / 718 / 937 / 1971 / 3269 / 4432). The video modal opens and closes (Esc) and locks body scroll. There are no console errors with or without reduced motion.

## Remaining gaps
- Placeholder copy everywhere (marked `TODO: Vahue copy`); line counts were matched to Scale's, so heights hold.
- 390: every section top matches Scale; the mobile logo strip is 1px taller (220 vs 219) from the inline-tile line box.
- Logo group 2 tile sizes were estimated from the screenshot, not measured.
- The glass button's “→” uses Vahue's display face; Scale renders it with a `font-unicode` face, so the arrow is a little longer.
- Video modal shows a placeholder instead of a Wistia iframe (TODO: Vahue video).
- Scale's pre-footer JPEG (1.8 MB, baseline) is often still decoding in the Scale captures, so its lower part shows the `#193A29` fill; that is a load artifact on Scale's side, not a layout difference.

## Interaction inventory (audit 2026-11-01)

Method: REA on a fresh CDP 9230 tab (closed afterwards). `analyze_web_bundle` (`ev_d0157519196f…`, 46/46 scripts parsed, 0 failures). Chunks compared by sha256:
- FlatCta / AnimatedText `1h0nvyhf5gbrf.js` (`10b2627a…`) and FullBleed / ClipScrollSection / useScrollTrigger `37xz28pjbnlx4.js` (`b234eef5…`) are byte-identical to the copies read in the security, rlenvironments and evaluation-enterprise audits, so their FlatCta and intro findings carry over.
- Page slices: LogoCarousel + FeaturesWithIcons `01xb85jkvr5_y.js` (`dffba027…`); Features video cards, Modal and glass `NewButtonLink` `17ea4hx823ss4.js` (`c43bcba5…`). Modal CSS module `it_l1W_*` and Tailwind utilities read from the page stylesheets.
- The clone's FlatCta, FullBleedMedia and animatedText were byte-identical (bar the CSS import) to the security clone's pre-audit files, so the security FlatCta fix was ported verbatim.

`inspect_web_event_listeners` ran on every section root and interactive child (ids below). Then Playwright ran identical inputs on scale.com, the clone and `/industries/insurance` at 1440×900 (script `scratchpad/ins-audit/qa.js`):
- hero and pre-footer CTA hover, leave and re-enter, sampled every 100ms, plus keyboard focus
- hero media at 5 scroll positions; pre-footer scrub at 10 points after walking the whole page (late-trigger check)
- a jump straight to the page bottom (the pre-footer intro must still play)
- glass button hover (7 samples), press and leave
- "Meet our customers" link hover; logo carousel group opacity every 500ms for 12s
- play button hover, click, modal open (12 samples), close button, Esc
- a 3×3 mouse grid over every section (transform, opacity, translate, scale, background and text colour of every visible node before and after)
- the 390×844 mobile logo strip

QA images: `qa/enterprise-insurance/interactions/<name>-{scale,clone,vahue}.jpg`.

Page-wide listeners: `html` has a `scroll` from `1h0nvyhf5gbrf.js` (ScrollTrigger) plus OneTrust `keydown`/`click` (`ev_9bf547e2db80…`). The mouse grid found **no pointer-tracking effect** on any section, on all three pages. The only nodes that changed were the logo carousel groups, which were mid-crossfade on their 4.5s timer.

### 1 · Hero (FullBleedMediaSection, startPercentage 0)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip container | scroll | ScrollTrigger via `html` scroll; `.ClipScrollSection` has no listeners (`ev_370e520c34de…`) | `37xz28pjbnlx4.js` | startPercentage 0 → no clip | yes | — |
| media (image) | scroll | ScrollTrigger | 37xz28pjbnlx4 mod 540431 | scale 1.25 → 1 over `top bottom → center center`. Measured at scroll 0 / 150 / 300 / 450 / 600: Scale 1.0139 / 1 / 1 / 1 / 1, clone identical | yes | — |
| headline / body / CTA intro | scroll `top center` | useScrollTrigger (210104), retroactiveOnEnter | 37xz28pjbnlx4 / 1h0nvyhf5gbrf | AnimatedText cascade (body +0.2s); CTA `filledWhiteArrow` 0.85s, delay 0.5; end `bottom 20%`; refresh check `progress > 0 \|\| scroll ≥ start − 1` | yes. **Fixed**: the clone used `once` + `onRefresh progress > 0`; it now has Scale's end and the same refresh check (evaluation-enterprise port) | — |
| FlatCta arrow | pointerenter / pointerleave | React root-delegated; the node only has a HubSpot `mousedown` (`ev_d1af847442db…`) | 1h0nvyhf5gbrf mod 892855 | wash −100% → 0 → +100%, snaps back on the 680ms timer; re-entry snaps it back first; chevron strip −50% → 0, snaps back on leave; 600ms ease-out | yes. **Fixed**: ported the security state machine. Before the fix, the strip eased back over 600ms on leave and there was no re-entry snap. Samples: enter Scale −1, −.559, −.315, −.161, −.036, −.004, 0 / clone −1, −.558, −.315, −.161, −.036, −.004, 0; leave Scale 0, .388, .652, .859, .945, .993, 1, then −1 at 700ms / clone 0, .388, .685, .877, .964, .996, then −1 at 600ms (one 100ms sample of timer jitter); re-enter Scale −1, −.736, −.422, −.229 / clone −1, −.736, −.422, −.229 | `cta-hero-arrow-{hover,leave}-*` |
| FlatCta focus | keyboard focus | — | CMSLink (internal `/demo`) | `focus:outline-1 focus:outline-scale-skyblue` → `solid 1px rgb(134,191,242)` | yes. **Fixed** (was missing) | — |

### 2 · LogoCarousel
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| logo groups (md+) | timer | none (React `setTimeout`) | 01xb85jkvr5_y mod 236943 | `setTimeout(…, 4500)` re-armed per change; group `transition-opacity duration-700`, incoming `delay-300`. Measured switches: Scale ~1.5s / 6.0s / 10.5s after the test start, clone 1.5s / 6.0s / 10.4s | yes | — |
| “Meet our customers →” | hover | HubSpot `mousedown` + react-dom `click` (`ev_7a2ff0abaaf1…`) | 236943 | `hover:underline underline-offset-2`: `none 2px` → `underline 2px` on both | yes | — |
| mobile strip (<md) | touch / horizontal scroll | none (native overflow-x) | 236943 | `overflow-x-auto scrollbar-none gap-10 px-6` | yes (scrollWidth 1154 on Scale vs 1120 on the clone, from the estimated widths of the placeholder tiles 5–7: Scale's last three logos are 169×26, 242×43 and 183×63) | — |

### 3 · FeaturesWithIcons “3 blind spots” · 4 · FeaturesWithIcons “how insurers…”
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| icon cards | — | none | 01xb85jkvr5_y mod 460138 | static, no hover classes; the mouse grid changed 0 nodes | yes (none) | — |
| glass button | hover / press | HubSpot `mousedown` + react-dom `click` (`ev_9f254d451843…`) | 17ea4hx823ss4 `NewButtonLink` color glass | wrapper `hover:scale-[1.02]` + `shadow 0 0 20px white/12`, 500ms ease-out; inner `hover:brightness-[1.15]`, inset shadow `0 2px 4px white/25`, `active:scale-[.97] brightness-105`; `::before` sheen opacity 0 → 1 + `translate(8px,−8px)` 500ms; arrow `group-hover:translate-x-1` | yes. **Fixed**: the arrow used `cubic-bezier(.4,0,.2,1)`. `transition-translate` isn't a Tailwind class, so Scale's arrow runs on `duration-300` with the initial `all` / `ease`. The clone now uses 300ms `ease`. Leave at 150ms: Scale wrap 1.0071, brightness 1.0222, sheen .633 / 5.06px, arrow 0.79px; clone 1.0071, 1.0222, .633 / 5.07px, 0.79px. Press: brightness 1.05 on both. (On Scale, enter samples 100–400ms were stuck by a busy main thread; they end at the same 1.02 / 1.15 / 8px / 4px.) | `glass-hover-*` |

### 5 · Features (video cards) “Fuel your AI strategy”
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| play button | hover | HubSpot `mousedown` + react-dom `click` (`ev_3ffcd105cc44…`) | 17ea4hx823ss4 (Features) | `bg-black/40 → /60`, `transition-colors` 150ms: Scale .4 → .584 → .6, clone .4 → .537 → .6 | yes | — |
| play button → Modal | click | React `onClick` | 17ea4hx823ss4 Modal + CSS `it_l1W_*` | overlay `it_l1W_modalOverlay` opacity 0 → 1, 0.35s ease-out; dialog layer `it_l1W_modal` opacity 0, `showUp` (opacity 0 → 1, scale 1.1 → 1) 0.35s ease-out with a 0.55s delay, colour #000, text-align left; panel 1008×589 at 1440; body `overflow: hidden`; `keydown` Escape on document, close button, outside-`[data-modal]` click | yes. **Fixed**: the clone opened instantly. It now has both keyframe animations, and the content's `pt-4` is dropped (Scale's `{"pt-4": hideCloseButton}` is false here). Dialog opacity / scale at ~630ms: Scale (540ms) .078 / 1.092, (646ms) .548 / 1.045; clone (632ms) .362 / 1.064, (738ms) .71 / 1.029; fully in by ~900ms on both. Closing with the close button and with Esc works on both | `modal-open-*` |

### 6 · Pre-footer (FullBleedMediaSection, startPercentage 10)
| Element | Input | Listener (REA) | Source | Params | Reproduced | QA |
|---|---|---|---|---|---|---|
| clip + media | scroll scrub | ScrollTrigger | 540431 + ClipScrollSection | clip `inset(5% → 0)`, scale 1.25 → 1. 10 points, root top 900 → 360 (after the page walk): Scale (first point landed at 843) 4.648 / 4.630 / 4.259 / 3.889 / 3.519 / 3.148 / 2.778 / 2.407 / 2.037 / 1.667%, scale … 1.0833; clone 5 / 4.630 / 4.259 / … / 1.667%, 1.25 … 1.0833 (identical from point 2) | yes. **Late-trigger check**: no late start on the clone; `useRefreshOnPageGrow` was already wired | `prefooter-scrub-5-*` |
| intro | scroll `top center` | useScrollTrigger, retroactive | as on the hero | jumping straight to the bottom: CTA opacity 1 and the last split word at opacity 1 on all three pages | yes (fixed with the hero) | — |
| FlatCta arrow | pointerenter / leave + focus | HubSpot `mousedown` + React | 892855 | as on the hero | yes (fixed with the hero) | `cta-prefooter-arrow-{hover,leave}-*` |

### Vahue `/industries/insurance`
This page uses `components/industry/enterprise-insurance/`, copied from this clone. The same fixes were ported, with the same params: the FlatCta state machine and focus outline, the translate-based fill, the reduced-motion strip, the glass arrow `ease`, and the retroactive intro. It has no video modal: case cards link out. Measured with the same script:
- arrow enter −.894 … 0; leave 0, .388, .652, .859, .945, .989, 1, then −1 at 700ms; re-enter −1, −.736, −.422, −.229 (matches Scale); focus `solid 1px rgb(134,191,242)`
- pre-footer scrub identical to the clone; bottom jump plays the intro
- glass enter / leave identical to the clone (leave 150ms: 1.0071, arrow 0.79px)
- customers link underlines; case-card round button bg .4 → .6
- the mouse grid changed only the logo crossfade; no console errors

### Not reproduced
- The Wistia player inside the modal (placeholder 16:9 block; Scale's iframe autoplays).
- HubSpot `mousedown` analytics and OneTrust listeners: third-party, deliberately left out.
- Placeholder logo tiles 5–7 are estimated (mobile strip 34px narrower than Scale's).

