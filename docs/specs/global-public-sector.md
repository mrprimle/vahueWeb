# /global-public-sector

Live source: https://scale.com/global-public-sector, 2026-11-01. Menu label here: **Professional Services** (research segment 3, knowledge-heavy expert teams), per Mike's 22:46 direction. Scale's structure and motion are kept; government copy and imagery are replaced in the same slots. Stack: [../stack.md](../stack.md), chrome: [_chrome.md](_chrome.md).

Files: `app/global-public-sector/page.tsx`, `components/pages/global-public-sector/` (`GlobalPublicSectorPage.tsx`, `SolutionsGrid.tsx`, `UseCaseTabs.tsx`, `content.ts`, `content.scale.ts`, `icons.ts`, `types.ts`). Nothing new in `components/site`. `TabsWithImages.module.css` (`.tabs`) and `generative-ai-data-engine/VideoGallery.tsx` are reused by import.

## Stack on this page
RSC payload modules: 243385 PageThemeSetter, 478135 hero (non-globe branch, wraps 540431), 497052 rows, 927726 > 540409 cards, 763867 > 685963 testimonial, 540409 stats (`fluidLayout`, `iconSize: sm`), 297990 AISolutionsGrid, 482270 VideoGallery, 623453 UseCaseTabs, 540431 pre-footer. Page-only ports: 297990, 623453, and the inline `AppScreenshot` columns of the RSC payload. REA `analyze_web_bundle`: 48 of 48 scripts parsed, no WebGL scene renders, no source maps ship.

## Sections
Heights in px, Scale and ours, at 1920, 1440, 1280, 1024, 1023, 768, 767, 640, 639 and 390. Equal within 1.5 unless listed under Gaps.

| # | Section | Module | 1440 top, height | 390 top, height | Changes with width |
|---|---|---|---|---|---|
| 1 | Hero, `pt-24 pb-10` | 478135 > 540431 | 39.3, 856 | 101.8, 616 | Media 720 to 480 tall below `md` |
| 2 | Trusted AI + Forward Deployed row, `py-24` | title block, 497052 (`plain` image) | 895.3, 1120.4 | 717.8, 1082.2 | Title row from `md`; panel padding from `md`; row 2 columns from `lg` |
| 3 | Foundations, 3 columns, glow | title block, 799808 | 2015.7, 955.2 | 1800, 1479.2 | Columns and dividers from `sm` |
| 4 | How Vahue Delivers Value | 927726 > 540409 | 2970.8, 1223.6 | 3279.1, 1734 | 3 columns from `lg`; card radius and padding change at `xl` |
| 5 | Testimonial, one client | 763867 > 685963 | 4194.5, 518.2 | 5013.1, 815.6 | Label and tab column from `lg`; tab moves under the quote below it |
| 6 | Stats | 540409 fluid | 4712.6, 612 | 5828.8, 704.8 | 3 across from `lg`, stacked below |
| 7 | Solutions Portfolio | 297990 | 5324.6, 1225 | 6533.5, 889.8 | Table from `md`; list with See all below it |
| 8 | Video | 482270 | 6549.6, 893 | 7423.4, 388.4 | Single player from `sm`; slider branch below it |
| 9 | Use cases | 623453 | 7442.6, 1076.6 | 7811.7, 1307.3 | Pill from `sm`, dots below; 2 columns from `lg` |
| 10 | Pre-footer, `pt-16 pb-8` | 540431 | 8519.2, 816 | 9119.1, 576 | Same as hero |

## Interaction inventory

| Element | Input | Listener and REA evidence | Source | Params | Measured, Scale vs ours |
|---|---|---|---|---|---|
| Page root, section roots, table, card grid, testimonial root, stats | none | 0 direct listeners: `ev_04b28d95…` (root), `ev_ffc7a908…` (`py-24`), `ev_51465d28…` (`relative py-20`), `ev_ec334322…` (CardGrid), `ev_729ca1eb…` (testimonial), `ev_39f8e0ad…` (stats), `ev_95bb9d02…` (table), `ev_78c151fd…` (`py-12`), `ev_d055afae…` (pre-footer) | | Delegated to React | Same |
| `body` | touchstart | `ev_d4dee9c0…` | Shared runtime | No page logic | Same |
| Tab button, play button | click, mousedown capture | `ev_59dad3f6…`, `ev_8cba3d94…`: React click, HubSpot mousedown (not built) | 623453, 482270 | | Navigation same |
| Tab pill | click | `onClick` to `y`; `observe_web_execution` `ev_4eae8204…`: `y`, its timeout body, the marker effect and `onClick` all executed under real clicks | 623453 | Marker left, width: .2s `power2.inOut`; panel opacity to 0 over 180ms, swap at 180ms, back to 1 | 1440: `left` 4, 8, 186, 218 vs 4, 8, 188, 221 (longer label); opacity 1, .14, .26, .95, 1 vs 1, .23, .26, .95, 1 at sampled phases; label colour curve equal |
| Dots | click, below `sm` | Same chain | 623453 | Width 6 to 20, 200ms ease-out; same fade | 20, 20, 7.5, 6 vs 20, 20, 7.5, 6; opacity 1, .23, .08, .95, 1 both |
| Solutions lines | scroll into view | `useInViewTrigger` defaults (`top 80%`), read from 297990 | 297990 | `scaleX` 0 to 1, stagger .12, 1.2s `power2.out`, origin left | Lines 1 to 3: .33, .07, 0 → .53, .32, .07 → .66, .50, .28 → .77, .64, .47 → .92, .85, .75 → 1 at 1.1s, equal to .01. This closure is not in the coverage extract of `ev_4eae8204…`, so the evidence here is the module text and the samples |
| Solutions labels | same trigger | 947153 (also exported as 668761) | 297990 | `animateIn` duration 1.1, delay .08 x row. Scale passes `ease`, which the module ignores | Opacity settled, equal |
| See all, Show less | click, below `md` | React | 297990 | 4 rows to 10; chevron rotates 200ms; hover colour | Height +833, rows 10, `rotate(180deg)`, equal |
| Delivers and stat cards | scroll into view | 540409, 317967 | Shared | Shared port | Opacity and scale 0/.960, .15/.967, .31/.972, .37/.975 vs 0/.960, .16/.967, .32/.973, .38/.975 |
| Play button | hover, click | CSS `group-hover`, React | 482270 | `bg-black/50` to `/70`, 200ms | .5, .67, .7 vs .5, .67, .7. Click: Wistia iframe on Scale; local `<video>` after fill |
| Testimonial tab | one item, no arrows | 685963 | Shared | Styled-jsx rule of 763867 kept | Name chip, flip and heights equal at 1440 and 390 |
| Hero, pre-footer | scroll, intro, hover | 540431, 961870, 892855 | Shared | Shared ports verified on `/evaluation/public-sector` | Frame pairs equal at every stage |
| Lenis wheel | wheel | Shared | 2d7ykwtxp | lerp .14, multiplier .8 | 21 stages at 1440 and 25 at 390: scroll positions equal, 450 … 9450, 422 … 10230 |

REA evidence: `analyze_web_bundle` `ev_d29fd514…`. `observe_web_execution` during real input (wheel through the page, 2 tab clicks) `ev_4eae8204…`, on a one-tab headless Chrome on its own port; over the MCP response limit, so it was exported (624 MB), read by byte offset for chunk `25a4rb779kpr2.js`, and deleted. `ev_78ac6c5d…` is a 5-second window before input: ignore it. `inspect_web_page` ran, its result went over the inline limit and only confirmed the DOM. `capture_browser_scenario` was not run because the observation window covered the requirement. `trace_web_source_location` does not apply without source maps.

## Filled copy and images
120 strings: 59 unchanged after Scale to Vahue, 59 changed by a few words or a same-shape label, 2 rewritten (use case 2's subtitle and first benchmarking outcome). 500 of 636 words (79%) are Scale's own. The unchanged-string share is below 80% because this page's labels are government terms; Mike's 22:46 rule replaces those. Counts include solution chips.

Mapping: categories keep their order, colours and counts; Oil & Gas stays the empty "Coming soon" row, as Tax Advisory. Use case 1 follows research M016 (legal drafts), use case 2 follows M104 and M030 (RFI answers, cited knowledge). Copy was tuned so line counts equal Scale's, so heights hold.

Images (Scale originals stay in `public/global-public-sector/` for `content.scale.ts` only):
- `hero-professional.webp`, 1920 x 1280: replaces the national museum photo. Rendered scene: client report and "Ask your documents" panel.
- `case-contract-review.png`: Scale's illustration with the stamp's PERMIT label changed to REVIEW.
- `case-proposal-review.webp`: Scale's illustration with the robot arm replaced by a document stack and the generator's sparkle mark removed. Its background is baked to the panel's `#f2f2f2`, where Scale's is transparent.
- `video-cover-professional.webp`, `video-professional.mp4` (6s still, 15 KB): replace Scale's reel, which shows a ministry memo and a tax helpdesk. Caption reads "Applications in legal, consulting,", as Scale's poster cuts its sentence.
- `app-screenshot-*-filled.svg`: same SVGs with the text changed (housing, permits, imaging and government strings).
- `lifecycle.png`, `prefooter.webp`: kept.

Links: both CTAs go to `/demo`, as on Scale.

## Placeholders
19 lines with `// PLACEHOLDER`: client name, role and quote; 3 stats; video; 8 use case stats and 5 outcome lines carrying numbers, plus use case 1's subtitle. The "Experience supporting…" and "leading firms" claims are written as the offer, per Mike's 22:43 note; Mike should confirm them when real proof exists.

## Gaps
- **Font wraps, same on clone and fill:** at 1024 the Trusted heading takes 3 lines where Scale has 4 (60 shorter). At 640 and 639 one Delivers card is one line shorter (20.6). Aeonik vs Aeonik Pro, per stack.md.
- **Label width:** DM Mono is narrower than Aeonik Mono, so the testimonial label has `max-width: 96%` from `lg`, in the page's `<style>`. This keeps Scale's 3 lines at 1440 and 2 at 1920.
- **Second use case, inactive by default:** after clicking tab 2, the title takes 2 lines at 390 (22 shorter than Scale) and 4 at 1024 (67 taller). Other widths equal. Tab 2's pill is 239 wide, Scale's 220.
- **Footer at 768 and 1024:** shared chrome, the lead handles it.
- **Scale's pre-footer** shows its `#193A29` backdrop while its 7952px image decodes. Ours is 3000px and loads at once, so a frame with the green band only exists on Scale.
- **Not driven:** `oml:` landscape, real touch. Sheets cover 1440 and 390 with wheel input; the other eight widths were compared by numbers only.
- **Image optimizer cache:** the dev server's `/_next/image` cache keeps a replaced file under the same name, which is why the case images got new names.
