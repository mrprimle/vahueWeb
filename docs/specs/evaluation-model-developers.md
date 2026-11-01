# /evaluation/model-developers

Live source: https://scale.com/evaluation/model-developers at 1440x900 and 390x844 (touch), plus geometry and pairs at 768 and 1024 and geometry at 1280 and 1920, 2026-11-01. Menu label here: Audit in Two Weeks. Page: `app/evaluation/model-developers/page.tsx`, `components/pages/evaluation-model-developers/`. Scale's strings: `content.scale.ts`. Rendered: `content.ts`.

## Stack
Same as [../stack.md](../stack.md). Fingerprint from `analyze_web_bundle` with sources (`ev_2d184002…`): Next.js and React, 47 of 47 scripts parsed, no failures. The page is mostly server-rendered: its structure and most strings sit in the RSC payload, and the four card grids are module 830843 in `1zwo72ehg4xzu.js`, which holds their strings inline and a styled-jsx block (copied to `evaluation.module.css`). Three.js and the 975 KB chunk load on Scale's page, but no section uses them.

Reused: `FullBleedMediaSection` (with `ClipScrollSection`, `AnimatedText`, `AnimatedFlatCta`, `FlatCta`, `ResponsiveImage`), `CardGrid` with `LinkCard` and `BaseCard`, `SectionTitle`, `ClientTestimonials`, `RichText`, `PageThemeSetter`. Nothing new in `components/site`. Page-only: the grid wrapper (`m` in 830843), the icons (473665, paths read from `2qomgocduultg.js`), the resource tiles (inline in the RSC payload).

Tiles in `ClientTestimonials` show the client's name on Scale when there is no logo, so items pass `nameTile: true`.

## Sections
Tops and heights at 1440, Scale then filled page, after a full scroll with images loaded. `tsc --noEmit` reports nothing in this page's files.

| # | Section | Module | Top | Height | Height at 390 |
|---|---|---|---|---|---|
| 1 | Hero, image | 478135 non-globe, 540431, `startPercentage` 0 | 39.3, 39.3 | 856, 856 | 616, 616 |
| 2 | Challenges, 3 cards, no body | 1900, 830843, 540409, 874328, 317967 | 895.3, 895.3 | 726.1, 726.1 | 952.4, 952.4 |
| 3 | Why, 5 cards | same | 1621.3, 1621.3 | 1223.6, 1223.6 | 1702.5, 1702.5 |
| 4 | Risks, 6 cards | same | 2844.9, 2844.9 | 1111.7, 1111.7 | 1611.2, 1611.2 |
| 5 | Experts, taxonomy image, 5 cards | same | 3956.6, 3956.6 | 1818.5, 1818.5 | 1772.5, 1772.5 |
| 6 | Testimonials, 2 | 685963 | 5775.1, 5775.1 | 803.2, 802.2 | 945.5, 944.5 |
| 7 | Resources, 4 tiles | inline, Next `Link` and `Image` | 6578.3, 6577.3 | 642.2, 642.2 | 1587.3, 1587.3 |
| 8 | Pre-footer | 540431, `mt-16! pb-8` | 7284.5, 7283.5 | 752, 752 | 512, 512 |
| | Page height | | | 8935, 8934 | 11225, 11224 |

Other widths, Scale then filled, page height:
- **1920:** 9005, 9005. Equal in every section.
- **1280:** 9072, 9071. The 1px is the testimonials panel.
- **1024:** 8851, 8824 on the first reading, 8851, 8845 on the last. The testimonials panel is 905.6 vs 899.8 (clone: 904.6). All card and tile rows are equal.
- **768:** 9900, 9839. The testimonials panel is 851.7 vs 818.9, and was the same 818.9 on the clone with Scale's text: one quote line fewer, Aeonik vs Aeonik Pro. The rest of the gap is the shared footer.

The filled text was tuned so wraps hold at 390: "enterprise teams deploying agents" and a slightly longer second quote each restore the one line a shorter draft had lost.

## Layout changes by width
| Width | Change | Checked |
|---|---|---|
| below 768 | Cards and tiles stack, testimonial tiles go under the quote (80px, sliding on `x`), smaller hero and pre-footer | 390, equal |
| 768 | Cards 2 columns (`!important` rule in the grid wrapper), tiles 2 columns, hero 720 tall, card padding 2rem | 768, equal |
| 1024 | Cards 3 columns, testimonial tiles beside the quote (sliding on `y`) | 1024, equal |
| 1280 | Tiles 4 columns, card padding 3rem | 1280 geometry, equal |
| 1472 and up | Container stops at 1472 | 1920 geometry, equal |

## Interaction inventory
Same script on both sites (`new-qa/evaluation-model-developers/instr.cjs` in the scratchpad). React handlers are delegated to the root, so element-level REA results show only native listeners.

| Element | Input | Listener and evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Section roots, cards | any | None: `.FullBleedMediaSection` `ev_0fa0cc49…`, `.CardGrid` `ev_88bfe75e…`, `.LinkCard` `ev_9ddb471e…`, experts section `ev_76af2f55…`, `.ClientTestimonials` `ev_c84855bd…` | | No hover, no pointer tracking | Pointer grid at 10 scroll stops at 1440: 0 style changes on any node, both |
| Link cards | | Scale passes no `link`, so they are not links | 874328 | Tab skips them | Tab order equal, both |
| Hero text and CTA | load | ScrollTrigger `top center`, retroactive | 540431, 947153, 961870 | Lines and words, .2s between h2 and p, CTA .85s after .5 | Word `x` 32.102, 18.755, 11.528, 6.564 at 100ms vs 32.131, 19.252, 10.23, 6.073: same curve, frame phase |
| Hero | scroll | ScrollTrigger scrub `top bottom` to `center center` | 540431 | Media scale 1.25 to 1, already 1.014 at scroll 0 and 1 by scroll 50. Inset stays 0 (`startPercentage` 0) | 11 stops at 1440 and 390, identical strings on clone and filled |
| Cards | scroll | ScrollTrigger scrub | 317967 | Scale and opacity, `up`, no side entrance | 11 stops at 1440, 10 at 390, on grids 1 and 4, identical strings on clone and filled |
| Card icon, title, body | `top bottom`, once | ScrollTrigger | 874328 | Clip .5s, icon 1s, title at +.16, body at +.34, stagger .05 per card | Card 4 clip 51.27, 20.25, 3.46 vs 51.55, 20.25, 3.39 at about 133ms steps. Icon .1755, .3994, .5866 vs .1737, .3994, .5878 |
| Testimonials reveal | scroll | ScrollTrigger | 685963 | First tab fills in, chip widens | Tab fill 106.656 to 0, both. Chip 212 vs 206, Aeonik vs Aeonik Pro; 104 on the filled "Role, Company" |
| Next, Previous | hover | React, HubSpot `mousedown` on Scale only, `ev_e4f3e0a9…` | 685963 | Colours .3s | Mid-frame .3 vs .29 alpha, same end: `rgb(0,0,0)` fill, tab colour `rgb(131,156,178)` |
| Next, Previous | click | Same | 685963 | Quote flip, tab fill moves on `y` (`x` at 390) | Same states and transforms: active fill 0, other 106.656 or -106.656 at 1440, 78 or -78 at 390 |
| Testimonial tab | click | React | 685963 | Selects that item | Same at 1440. At 390 the script's click left the first item selected on both sites |
| Testimonial tab | ArrowLeft | None on Scale | 685963 | No change of item | Same selection. At 390 one sample 1.5s after the key had the active fill at `x` 24.17 on ours and 0 on Scale. Both were equal in the 8s sample. Seen once, cause not found |
| Testimonials | wait | | 685963 | No auto-rotate | Same selection after 8s, both |
| Resource tile | hover | HubSpot `mousedown` and React `click` on Scale, `ev_88eb0c36…` | Next `Link` | No hover style, `cursor: pointer` | Computed styles unchanged, both. Clamp 96/64, 32/32, 96/64, 32/32, equal |
| Taxonomy image | load, error | React, `ev_d378fafd…` | Next `Image` | Lazy | Same box, 1310 x 556.9 at 1440 |
| Pre-footer clip, media | scroll | ScrollTrigger scrub | 656598, 540431 | Inset 5% to 0, scale 1.25 to 1 | 13 stops at 1440, 12 at 390, identical strings on clone and filled |
| CTA wash and arrow | enter, leave | React | 892855 | Fill 600ms | Enter -61.2, -38.4, -20.4 vs -67.1, -38.4, -22.9 (frame phase). Leave 38.59 vs 38.56 |
| Page body | Tab | Native | | CTA, Previous, Next, 4 tiles, footer | Same order and same rings: `1px solid rgb(134,191,242)` on CTA and footer links, `auto 1px rgb(0,95,204)` on buttons and tiles |
| `html`, `body` | scroll, touch | `html` passive `scroll`, `body` passive `touchstart`, `ev_45485e4d…`, `ev_8d46092d…` | `1h0nvyhf5gbrf.js` | | Shared chrome |
| Swipe at 390 | touch | Lenis `syncTouch` | | | 507, 1014, 1522, 2029, 2536, 3044 vs 507, 1014, 1521, 2028, 2535, 3042 |

Not on this page: drag and drop, Keen or Embla, canvas, cursor effects.

REA execution: `observe_web_execution`, `ev_cf6e5db3…`, during real pointer input (card hover, Next, tab click, tile hover). The first two windows, `ev_bec5154a…` and `ev_bcaf62b6…`, were on a background tab in the shared Chrome on 9230, where the page does not animate, so I ran this one in a separate one-tab headless Chrome on port 9241. Scale's app scripts with the most calls: `09t-e4mmc8vy5.js` 676, `2fbrdg5m4_g_8.js` (Lenis) 64, `1h0nvyhf5gbrf.js` 32, `2d7ykwtxp_8ed.js` 32. These counts are per script, not per module.

REA gaps: `capture_browser_scenario` failed twice with `cleanup_incomplete` (launch and connect modes), so Playwright drove the scenarios instead. `trace_web_source_location` was not run: no source maps are shipped.

## Visual check
Real wheel input, pairs at every 50% of the viewport plus 10% steps through the first cards, testimonials and pre-footer: 52 stops at 1440, 60 at 390, on clone and filled. 53 at 768 and 56 at 1024 on the filled page. First paint frames every 250ms at 1440 and 390. Sheets opened and read: `new-qa/evaluation-model-developers/sheets/` in the scratchpad.

Same by eye: direction of movement, what the header covers, rounded corners from the first frame, what is visible when. Differences:

- **First frames:** Scale's first capture at 1440 is still blank where ours has the hero's `#193A29` placeholder and text. At 390 Scale shows the placeholder too. The later frames run in the same order on both, so I read it as load timing (live site vs local dev server), not behaviour.
- **Hero screen, filled page only:** see Images below.
- **Footer title:** shared chrome now reads "important work" on fewer lines at 1024. In the 1024 pairs the scroll end differed (8083 vs 7961), but a later full-scroll reading gave 8851 vs 8845 with equal footer heights. The first reading may have caught another agent's footer edit; I did not confirm this. Not from this page's files.

## Copy mapping
Filled from `vahue-positioning-copy-source.md` (local only): keep first, swap a few words where Scale's line is false for Vahue, and its /evaluation line, "swap model developers for teams deploying agents". This replaced a first draft that rewrote far more.

71 strings: **53 unchanged** apart from the brand word (75%), **12 lightly changed**, **6 rewritten**. The 6 are the testimonials, which can't reuse real people's words or names; without them it is 53 of 65 (82%).

Lightly changed: page title, description, hero headline and body, why subtitle, "Dangerous Actions" and its body, red team staff number, the White House line, and three resource titles (SEAL, WMDP, Meta Llama 2 removed). "Audit" comes from the menu label, and "in two weeks" matches `PHASES`. Scale's "PIl" typo is corrected to "PII", and "SEAL" is dropped from the research card; both count as unchanged.

Kept on purpose, Mike may want to review: "at scale" stays as an idiom in the red team card. The page still speaks of LLMs, red teaming, bias and cyberattacks, as the copy source says to keep almost all of /evaluation.

CTA stays "Book a Demo" per the swap dictionary, where some earlier filled pages say "Book an Audit".

## Placeholders
`// PLACEHOLDER` in `content.ts`, 9 lines: red team staff number ("100s"), "selected by a mid-market insurer", "Mid-Market Launch Partner", and for the 2 testimonials the name, role and quote lines (6, with their figures 97% and 40%).

## Images
- **Hero:** Scale's image shows its own product UI with satellite imagery on the monitor. `hero-filled.webp` keeps the monitor and plinth at the same 1920x1280 and draws a neutral baseline dashboard on the screen, with zeroed figures. `hero.webp` stays for `content.scale.ts`.
- **Taxonomy:** Scale's image is kept as is. It names harms such as "Promotion of violence", which an operations buyer may find odd. Mike to decide.
- **Resource icons, pre-footer:** kept, nothing brand-baked.

## Links
Resource tiles go to `/labs/leaderboard`, `/blog`, `/guides`, `/blog`. All CTAs go to `/demo`.

## Gaps
- **Fonts:** see stack.md. Testimonial panel 1px shorter at 1440 and 390, chip 6px narrower.
- Header and footer behaviour was not re-driven on this page: see `_chrome.md`.
- Pointer grid ran at 1440 only. 390 is touch, and the page has no pointer handlers.
